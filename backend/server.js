/**
 * VVeChat backend
 * - Express REST API
 * - Socket.io realtime channel
 * - SQLite (better-sqlite3) for persistence
 * - JWT for auth
 */
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const { Server: SocketIOServer } = require('socket.io');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'vvechat-dev-secret-change-me';
const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'vvechat.db');

const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------- schema ----------
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS friends (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    owner_id INTEGER,
    is_official INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS group_members (
    group_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    joined_at INTEGER NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conv_type TEXT NOT NULL,         -- 'user' | 'group'
    conv_id INTEGER NOT NULL,        -- user_id (peer) or group_id
    sender_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conv_type, conv_id, created_at);

  CREATE TABLE IF NOT EXISTS friend_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user_id INTEGER NOT NULL,
    to_user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'accepted' | 'rejected'
    created_at INTEGER NOT NULL,
    FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_friend_requests_to ON friend_requests(to_user_id, status);
`);

// ---------- helpers ----------
function now() { return Date.now(); }
function userPublic(u) {
  return { id: u.id, username: u.username, avatar: u.avatar || null };
}
function ensureOfficialGroup() {
  const row = db.prepare('SELECT id FROM groups WHERE is_official = 1 LIMIT 1').get();
  if (row) return row.id;
  const info = db.prepare(
    'INSERT INTO groups (name, owner_id, is_official, created_at) VALUES (?, NULL, 1, ?)'
  ).run('VVeChat å®æ¹ç¾¤', now());
  return info.lastInsertRowid;
}
const OFFICIAL_GROUP_ID = ensureOfficialGroup();
console.log('[VVeChat] official group id =', OFFICIAL_GROUP_ID);

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.uid, username: payload.username };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// ---------- app ----------
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_, res) => res.json({ ok: true, name: 'VVeChat' }));

// register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'ç¨æ·ååå¯ç ä¸è½ä¸ºç©º' });
  if (username.length < 2 || username.length > 24) return res.status(400).json({ error: 'ç¨æ·åé¿åº¦é 2-24' });
  if (password.length < 4) return res.status(400).json({ error: 'å¯ç è³å° 4 ä½' });
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) return res.status(409).json({ error: 'è¯¥ç¨æ·åå·²è¢«æ³¨å' });

  const hash = bcrypt.hashSync(password, 10);
  const info = db.prepare(
    'INSERT INTO users (username, password_hash, avatar, created_at) VALUES (?, ?, ?, ?)'
  ).run(username, hash, null, now());
  const userId = info.lastInsertRowid;

  // every new user is auto-added to the official group
  db.prepare(
    'INSERT OR IGNORE INTO group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)'
  ).run(OFFICIAL_GROUP_ID, userId, now());

  const token = jwt.sign({ uid: userId, username }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: userPublic({ id: userId, username, avatar: null }) });
});

// login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'ç¨æ·ååå¯ç ä¸è½ä¸ºç©º' });
  const u = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!u) return res.status(401).json({ error: 'è´¦å·ä¸å­å¨' });
  if (!bcrypt.compareSync(password, u.password_hash)) {
    return res.status(401).json({ error: 'å¯ç éè¯¯' });
  }
  // ensure user is in official group
  db.prepare(
    'INSERT OR IGNORE INTO group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)'
  ).run(OFFICIAL_GROUP_ID, u.id, now());
  const token = jwt.sign({ uid: u.id, username: u.username }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: userPublic(u) });
});

// me
app.get('/api/me', authRequired, (req, res) => {
  const u = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!u) return res.status(404).json({ error: 'user not found' });
  res.json({ user: userPublic(u) });
});

// search users by username prefix
app.get('/api/users/search', authRequired, (req, res) => {
  const q = (req.query.q || '').toString().trim();
  if (!q) return res.json({ users: [] });
  const rows = db.prepare(
    'SELECT id, username, avatar FROM users WHERE username LIKE ? AND id != ? LIMIT 20'
  ).all(`${q}%`, req.user.id);
  res.json({ users: rows });
});

// friends
app.get('/api/friends', authRequired, (req, res) => {
  const rows = db.prepare(`
    SELECT u.id, u.username, u.avatar
    FROM friends f
    JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = ?
    ORDER BY u.username
  `).all(req.user.id);
  res.json({ friends: rows });
});

// groups (joined)
app.get('/api/groups', authRequired, (req, res) => {
  const rows = db.prepare(`
    SELECT g.id, g.name, g.is_official, g.owner_id
    FROM group_members gm
    JOIN groups g ON g.id = gm.group_id
    WHERE gm.user_id = ?
    ORDER BY g.is_official DESC, g.id ASC
  `).all(req.user.id);
  res.json({ groups: rows });
});

// create group
app.post('/api/groups', authRequired, (req, res) => {
  const { name, memberIds } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: 'ç¾¤åç§°ä¸è½ä¸ºç©º' });
  const ids = Array.isArray(memberIds) ? [...new Set(memberIds.map(Number))].filter(Boolean) : [];
  if (ids.length < 2) return res.status(400).json({ error: 'è³å°éæ© 2 ä¸ªæåï¼å«ä½ èªå·±ï¼' });

  const info = db.prepare(
    'INSERT INTO groups (name, owner_id, is_official, created_at) VALUES (?, ?, 0, ?)'
  ).run(name.trim(), req.user.id, now());
  const gid = info.lastInsertRowid;
  const memberSet = new Set([req.user.id, ...ids]);
  const insert = db.prepare(
    'INSERT OR IGNORE INTO group_members (group_id, user_id, joined_at) VALUES (?, ?, ?)'
  );
  const tx = db.transaction(() => {
    for (const uid of memberSet) insert.run(gid, uid, now());
  });
  tx();
  // notify all members
  for (const uid of memberSet) io.to(`user:${uid}`).emit('group:added', { groupId: gid, name: name.trim() });
  res.json({ group: { id: gid, name: name.trim(), is_official: 0, owner_id: req.user.id } });
});

// group members (with usernames)
app.get('/api/groups/:id/members', authRequired, (req, res) => {
  const gid = Number(req.params.id);
  const inGroup = db.prepare('SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?').get(gid, req.user.id);
  if (!inGroup) return res.status(403).json({ error: 'not in group' });
  const rows = db.prepare(`
    SELECT u.id, u.username, u.avatar
    FROM group_members gm
    JOIN users u ON u.id = gm.user_id
    WHERE gm.group_id = ?
    ORDER BY u.username
  `).all(gid);
  res.json({ members: rows });
});

// friend requests
app.post('/api/friend/request', authRequired, (req, res) => {
  const { toUsername } = req.body || {};
  if (!toUsername) return res.status(400).json({ error: 'è¯·è¾å¥å¯¹æ¹ç¨æ·å' });
  const target = db.prepare('SELECT * FROM users WHERE username = ?').get(toUsername);
  if (!target) return res.status(404).json({ error: 'è¯¥ç¨æ·ä¸å­å¨' });
  if (target.id === req.user.id) return res.status(400).json({ error: 'ä¸è½å èªå·±' });
  // already friends?
  const already = db.prepare('SELECT 1 FROM friends WHERE user_id = ? AND friend_id = ?').get(req.user.id, target.id);
  if (already) return res.status(400).json({ error: 'å·²ç»æ¯å¥½åäº' });
  // existing pending request from me to them?
  const pending = db.prepare(
    "SELECT id FROM friend_requests WHERE from_user_id = ? AND to_user_id = ? AND status = 'pending'"
  ).get(req.user.id, target.id);
  if (pending) return res.status(400).json({ error: 'å·²åéè¿ç³è¯·ï¼ç­å¾å¯¹æ¹å¤ç' });
  // reverse request: they sent me one â auto-mutual
  const reverse = db.prepare(
    "SELECT id FROM friend_requests WHERE from_user_id = ? AND to_user_id = ? AND status = 'pending'"
  ).get(target.id, req.user.id);
  if (reverse) {
    // accept it right away
    db.prepare("UPDATE friend_requests SET status = 'accepted' WHERE id = ?").run(reverse.id);
    const ts = now();
    db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id, created_at) VALUES (?, ?, ?)').run(req.user.id, target.id, ts);
    db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id, created_at) VALUES (?, ?, ?)').run(target.id, req.user.id, ts);
    io.to(`user:${req.user.id}`).emit('friend:added', { id: target.id, username: target.username, avatar: target.avatar });
    io.to(`user:${target.id}`).emit('friend:added', { id: req.user.id, username: req.user.username, avatar: null });
    return res.json({ ok: true, autoAccepted: true });
  }
  const info = db.prepare(
    'INSERT INTO friend_requests (from_user_id, to_user_id, status, created_at) VALUES (?, ?, ?, ?)'
  ).run(req.user.id, target.id, 'pending', now());
  io.to(`user:${target.id}`).emit('friend:request', {
    id: info.lastInsertRowid,
    from: { id: req.user.id, username: req.user.username, avatar: null },
    created_at: now(),
  });
  res.json({ ok: true, requestId: info.lastInsertRowid });
});

app.get('/api/friend/requests', authRequired, (req, res) => {
  const rows = db.prepare(`
    SELECT fr.id, fr.status, fr.created_at,
           u.id AS from_id, u.username AS from_username, u.avatar AS from_avatar
    FROM friend_requests fr
    JOIN users u ON u.id = fr.from_user_id
    WHERE fr.to_user_id = ? AND fr.status = 'pending'
    ORDER BY fr.created_at DESC
  `).all(req.user.id);
  res.json({ requests: rows });
});

app.post('/api/friend/respond', authRequired, (req, res) => {
  const { requestId, accept } = req.body || {};
  const id = Number(requestId);
  if (!id) return res.status(400).json({ error: 'invalid requestId' });
  const fr = db.prepare('SELECT * FROM friend_requests WHERE id = ?').get(id);
  if (!fr) return res.status(404).json({ error: 'ç³è¯·ä¸å­å¨' });
  if (fr.to_user_id !== req.user.id) return res.status(403).json({ error: 'æ ææä½' });
  if (fr.status !== 'pending') return res.status(400).json({ error: 'ç³è¯·å·²å¤ç' });
  const status = accept ? 'accepted' : 'rejected';
  db.prepare('UPDATE friend_requests SET status = ? WHERE id = ?').run(status, id);
  if (accept) {
    const ts = now();
    db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id, created_at) VALUES (?, ?, ?)').run(fr.from_user_id, fr.to_user_id, ts);
    db.prepare('INSERT OR IGNORE INTO friends (user_id, friend_id, created_at) VALUES (?, ?, ?)').run(fr.to_user_id, fr.from_user_id, ts);
    const me = db.prepare('SELECT id, username, avatar FROM users WHERE id = ?').get(req.user.id);
    const them = db.prepare('SELECT id, username, avatar FROM users WHERE id = ?').get(fr.from_user_id);
    io.to(`user:${fr.to_user_id}`).emit('friend:added', them);
    io.to(`user:${fr.from_user_id}`).emit('friend:added', me);
  }
  io.to(`user:${fr.from_user_id}`).emit('friend:request:resolved', { id, accept: !!accept });
  res.json({ ok: true });
});

// helper: normalize private chat so the same conversation row serves both peers
function userConvId(a, b) { return a < b ? `u_${a}_${b}` : `u_${b}_${a}`; }

// send a message (REST fallback; realtime goes through socket)
app.post('/api/messages', authRequired, (req, res) => {
  let { conv_type, conv_id, content } = req.body || {};
  if (!['user', 'group'].includes(conv_type)) return res.status(400).json({ error: 'invalid conv_type' });
  if (!content || !content.trim()) return res.status(400).json({ error: 'åå®¹ä¸è½ä¸ºç©º' });
  if (conv_type === 'group') {
    conv_id = Number(conv_id);
    const inGroup = db.prepare('SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?').get(conv_id, req.user.id);
    if (!inGroup) return res.status(403).json({ error: 'not in group' });
  } else {
    const peerId = Number(conv_id);
    const isFriend = db.prepare('SELECT 1 FROM friends WHERE user_id = ? AND friend_id = ?').get(req.user.id, peerId);
    if (!isFriend) return res.status(403).json({ error: 'not friends' });
    conv_id = userConvId(req.user.id, peerId);
  }
  const info = db.prepare(
    'INSERT INTO messages (conv_type, conv_id, sender_id, content, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(conv_type, conv_id, req.user.id, content.trim(), now());
  const msg = {
    id: info.lastInsertRowid,
    conv_type, conv_id,
    sender_id: req.user.id,
    sender_username: req.user.username,
    content: content.trim(),
    created_at: now(),
  };
  if (msg.conv_type === 'user') {
    io.to(`user:${req.user.id}`).emit('message:new', msg);
    // also fan out to the other side; we use normalized id, so emit to all in that room
    io.to(`user:${req.user.id}`).emit('message:new', msg);
    // emit to the peer (we still emit by raw user id so the peer's local echo listener fires)
  }
  // broadcast to both peers for private chat
  if (msg.conv_type === 'user') {
    // re-emit to both sides: sender is in own room; the peer â we look it up by parsing conv_id
    const m = msg.conv_id.match(/^u_(\d+)_(\d+)$/);
    const peer = m ? Number(m[1]) === req.user.id ? Number(m[2]) : Number(m[1]) : null;
    if (peer != null) io.to(`user:${peer}`).emit('message:new', msg);
    io.to(`user:${req.user.id}`).emit('message:new', msg);
  } else {
    const members = db.prepare('SELECT user_id FROM group_members WHERE group_id = ?').all(Number(conv_id));
    for (const mm of members) io.to(`user:${mm.user_id}`).emit('message:new', msg);
  }
  res.json({ message: msg });
});

// list messages for a conversation
app.get('/api/messages', authRequired, (req, res) => {
  const conv_type = req.query.conv_type;
  let conv_id = req.query.conv_id;
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  if (!['user', 'group'].includes(conv_type) || !conv_id) return res.status(400).json({ error: 'invalid query' });
  if (conv_type === 'group') {
    conv_id = Number(conv_id);
    const ok = db.prepare('SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?').get(conv_id, req.user.id);
    if (!ok) return res.status(403).json({ error: 'not in group' });
  } else {
    const peerId = Number(conv_id);
    const ok = db.prepare('SELECT 1 FROM friends WHERE user_id = ? AND friend_id = ?').get(req.user.id, peerId);
    if (!ok) return res.status(403).json({ error: 'not friends' });
    conv_id = userConvId(req.user.id, peerId);
  }
  const rows = db.prepare(`
    SELECT m.*, u.username AS sender_username
    FROM messages m
    JOIN users u ON u.id = m.sender_id
    WHERE m.conv_type = ? AND m.conv_id = ?
    ORDER BY m.id DESC LIMIT ?
  `).all(conv_type, conv_id, limit);
  res.json({ messages: rows.reverse() });
});

// conversations list â friends + groups with last message preview
app.get('/api/conversations', authRequired, (req, res) => {
  const uid = req.user.id;
  const friends = db.prepare(`
    SELECT u.id, u.username, u.avatar, 'user' AS type
    FROM friends f JOIN users u ON u.id = f.friend_id
    WHERE f.user_id = ? ORDER BY u.username
  `).all(uid);
  const groups = db.prepare(`
    SELECT g.id, g.name AS username, NULL AS avatar, 'group' AS type, g.is_official
    FROM group_members gm JOIN groups g ON g.id = gm.group_id
    WHERE gm.user_id = ? ORDER BY g.is_official DESC, g.id ASC
  `).all(uid);
  const all = [...friends, ...groups];
  // last message per conversation
  const lastUserStmt = db.prepare(`
    SELECT content, sender_id, created_at FROM messages
    WHERE conv_type = 'user' AND conv_id = ?
    ORDER BY id DESC LIMIT 1
  `);
  const lastGroupStmt = db.prepare(`
    SELECT content, sender_id, created_at FROM messages
    WHERE conv_type = 'group' AND conv_id = ?
    ORDER BY id DESC LIMIT 1
  `);
  for (const c of all) {
    const last = c.type === 'user' ? lastUserStmt.get(userConvId(uid, c.id)) : lastGroupStmt.get(c.id);
    c.last_message = last ? last.content : '';
    c.last_sender_id = last ? last.sender_id : null;
    c.last_at = last ? last.created_at : 0;
  }
  // also include the official group even if user is brand new (idempotent)
  res.json({ conversations: all });
});

// ---------- http + socket.io ----------
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('missing token'));
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    socket.user = { id: payload.uid, username: payload.username };
    next();
  } catch (e) { next(new Error('invalid token')); }
});

io.on('connection', (socket) => {
  const uid = socket.user.id;
  socket.join(`user:${uid}`);
  console.log(`[VVeChat] user ${uid} (${socket.user.username}) connected`);

  socket.on('message:send', (data, ack) => {
    try {
      let { conv_type, conv_id, content } = data || {};
      if (!['user', 'group'].includes(conv_type)) throw new Error('invalid conv_type');
      if (!content || !content.trim()) throw new Error('åå®¹ä¸è½ä¸ºç©º');
      if (conv_type === 'group') {
        conv_id = Number(conv_id);
        const ok = db.prepare('SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?').get(conv_id, uid);
        if (!ok) throw new Error('not in group');
      } else {
        const peerId = Number(conv_id);
        const ok = db.prepare('SELECT 1 FROM friends WHERE user_id = ? AND friend_id = ?').get(uid, peerId);
        if (!ok) throw new Error('not friends');
        conv_id = userConvId(uid, peerId);
      }
      const info = db.prepare(
        'INSERT INTO messages (conv_type, conv_id, sender_id, content, created_at) VALUES (?, ?, ?, ?, ?)'
      ).run(conv_type, conv_id, uid, content.trim(), now());
      const msg = {
        id: info.lastInsertRowid,
        conv_type, conv_id,
        sender_id: uid,
        sender_username: socket.user.username,
        content: content.trim(),
        created_at: now(),
      };
      if (conv_type === 'user') {
        const m = msg.conv_id.match(/^u_(\d+)_(\d+)$/);
        const peer = m ? (Number(m[1]) === uid ? Number(m[2]) : Number(m[1])) : null;
        io.to(`user:${uid}`).emit('message:new', msg);
        if (peer != null) io.to(`user:${peer}`).emit('message:new', msg);
      } else {
        const members = db.prepare('SELECT user_id FROM group_members WHERE group_id = ?').all(conv_id);
        for (const mm of members) io.to(`user:${mm.user_id}`).emit('message:new', msg);
      }
      ack && ack({ ok: true, message: msg });
    } catch (e) {
      ack && ack({ ok: false, error: e.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[VVeChat] user ${uid} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`[VVeChat] listening on http://0.0.0.0:${PORT}`);
});
