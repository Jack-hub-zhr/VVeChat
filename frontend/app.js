/* ==========================================================
   VVeChat — frontend app v3 (clean rebuild)
   ========================================================== */

(() => {
  // ---------- config ----------
  const DEFAULT_PROD_API = 'https://vvechat.onrender.com';
  const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:3000'
    : (window.VVECHAT_API || DEFAULT_PROD_API);
  const IS_MOCK = !API_BASE && !!window.__mockBackend;

  // ---------- i18n strings (no function calls — safe) ----------
  const STRINGS = {
    zh: {
      auth_err_fill: '请填写用户名和密码',
      auth_loading_login: '登录中…',
      auth_loading_register: '注册中…',
      auth_ok_login: '登录成功！',
      auth_ok_register: '注册成功，已加入官方群！',
      err_network: '无法连接服务器',
      err_timeout: '服务器响应超时（可能在冷启动）',
      err_username_required: '用户名和密码不能为空',
      err_self: '不能加自己',
      err_already_friend: '已经是好友了',
      err_pending: '已发送过申请，等待对方处理',
      err_user_not_found: '该用户不存在',
      err_username_taken: '该用户名已被使用',
      err_username_len: '用户名长度需 2-24',
      err_password_len: '密码至少 4 位',
      err_account: '账号不存在',
      err_password_wrong: '密码错误',
      err_load: '加载失败',
      err_send: '发送失败',
      err_action: '操作失败',
      err_group_create_min: '至少选择 1 位好友',
      err_group_create_name: '请输入群名称',
      ok_friend_added: '已添加好友',
      ok_rejected: '已拒绝',
      ok_auto_friend: '对方也发过申请，已自动互加好友！',
      ok_request_sent: '申请已发送，等待对方处理',
      ok_group_created: '群创建成功',
      ok_joined: '已加入群',
      toast_copied: '已复制',
      toast_img_too_big: '图片超过 5MB',
      toast_img_only: '只支持图片',
      msg_deleted: '消息已删除',
      msg_deleted_title: '撤回这条消息？',
      empty: '暂无',
      no_friends_yet: '还没有好友',
      tap_magnifier_to_search: '点击右上角放大镜搜索',
      splash_hint: '（点击任意一处开始使用）',
      no_groups_yet: '还没有群聊',
      today: '今天',
      sent: '已发送',
      read: '已读',
      img_alt: '图片',
      type_image: '🖼  图片',
      new_msg: '新消息',
      online: '在线',
      friend: '好友',
      member_sub: '成员',
      group_sub: '群聊',
      official_sub: '系统通知、新人欢迎',
      reply: '回复',
      add: '加入',
      cancel: '取消',
      ok: '确定',
      profile_title: '我的资料',
      profile_username: '用户名',
      profile_bio: '个人简介',
      profile_bio_ph: '说点什么吧…',
      profile_color: '头像颜色',
      profile_bio_empty: '这个人很懒，什么都没写',
      profile_saved: '已保存',
      bio_sub: '好友',
      bio_online: '在线',
      me: '我',
      member: '成员',
      btn_pm: '私聊',
      btn_edit: '编辑资料',
      btn_msg: '发消息',
      btn_save: '保存',
      btn_refresh: '刷新',
      btn_back: '返回',
      btn_logout: '退出',
      btn_login: '登录',
      btn_register: '注册',
      btn_logout: '退出登录',
      confirm_logout: '确定要退出登录？',
      btn_accept: '同意',
      btn_reject: '拒绝',
      btn_delete: '撤回',
      btn_copy: '复制',
      btn_reply: '回复',
      btn_retry: '↻ 点此重试',
      toast_friend_req: '{0} 想加你为好友',
      toast_req_accepted: '对方接受了你的好友申请 🎉',
      toast_req_rejected: '对方拒绝了你的好友申请',
      toast_new_friend: '{0} 成为你的好友啦',
      toast_new_group: '你被拉入群：{0}',
      req_want: '想加你为好友 · ',
      loading: '加载中',
      group_count: '已选',
      group_min_hint: '至少 1 位好友',
      admin_login_title: '管理员登录',
      admin_active: '管理员已激活',
      admin_key_placeholder: '输入管理员密钥',
      admin_panel: '管理面板',
      admin_users: '用户',
      admin_groups: '群',
      admin_messages: '消息',
      admin_official_msgs: '官方群消息',
      admin_wipe_official: '清空官方群消息',
      admin_wipe_official_hint: '删除官方群内的所有消息（不可恢复）',
      admin_wipe_official_btn: '一键清空官方群',
      admin_batch: '批量删除',
      admin_batch_hint: '按群 ID / 发送者 / 关键字 / 仅官方群筛选',
      admin_group_id: '群 ID（可选）',
      admin_sender_id: '发送者 ID（可选）',
      admin_keyword: '内容包含',
      admin_official_only: '仅官方群',
      admin_preview: '预览',
      admin_execute: '执行删除',
      admin_logout: '退出管理员',
      admin_logout_btn: '退出',
      admin_need_login: '需要先登录管理员',
      admin_key_wrong: '密钥错误',
      admin_logged_out: '已退出管理员',
      confirm_wipe_official: '确定清空官方群所有消息？此操作不可恢复！',
      confirm_batch: '确定删除匹配的消息？',
      matched: '匹配',
      deleted: '已删除',
      wiped: '已清空',
      admin_delete: '管理员删除',
      admin_badge: '管理员',
      jack_delete: 'Jack 删除',
      jack_remove: '移除',
      confirm_jack_delete: '确定要删除这条消息？',
      confirm_delete_msg: '确定要删除这条消息？',
      admin_dev: '管理员 / 开发者',
      forward: '转发',
      forward_to: '转发到',
      reply: '引用',
      copied: '已复制',
      copy_failed: '复制失败',
      forwarded: '已转发',
      groups: '群聊',
      confirm_kick: '确定把 {0} 从群里移除？',
      removed: '已移除',
      rename_group: '重命名',
      rename_group_prompt: '新的群名称',
      rename_ok: '已修改',
      members: '成员',
      only_jack_rename_official: '只有 Jack 才能修改官方群名称',
    },
    en: {
      auth_err_fill: 'Please fill in username and password',
      auth_loading_login: 'Signing in…',
      auth_loading_register: 'Signing up…',
      auth_ok_login: 'Signed in!',
      auth_ok_register: 'Account created, joined official group!',
      err_network: 'Cannot reach server',
      err_timeout: 'Server timed out (likely cold start)',
      err_username_required: 'Username and password required',
      err_self: 'You cannot add yourself',
      err_already_friend: 'Already friends',
      err_pending: 'Request already sent',
      err_user_not_found: 'User not found',
      err_username_taken: 'Username already taken',
      err_username_len: 'Username must be 2-24 chars',
      err_password_len: 'Password must be at least 4 chars',
      err_account: 'Account not found',
      err_password_wrong: 'Wrong password',
      err_load: 'Failed to load',
      err_send: 'Failed to send',
      err_action: 'Action failed',
      err_group_create_min: 'Select at least 1 friend',
      err_group_create_name: 'Group name is required',
      ok_friend_added: 'Friend added',
      ok_rejected: 'Declined',
      ok_auto_friend: 'They also requested you — auto-friended!',
      ok_request_sent: 'Request sent, waiting',
      ok_group_created: 'Group created',
      ok_joined: 'Joined',
      toast_copied: 'Copied',
      toast_img_too_big: 'Image larger than 5MB',
      toast_img_only: 'Images only',
      msg_deleted: 'Message deleted',
      msg_deleted_title: 'Delete this message?',
      empty: 'Empty',
      no_friends_yet: 'No friends yet',
      tap_magnifier_to_search: 'Tap magnifier to search',
      splash_hint: '(Tap anywhere to start)',
      no_groups_yet: 'No groups yet',
      today: 'Today',
      sent: 'Sent',
      read: 'Read',
      img_alt: 'Image',
      type_image: '🖼  Image',
      new_msg: 'New message',
      online: 'Online',
      friend: 'Friend',
      member_sub: 'member',
      group_sub: 'Group',
      official_sub: 'Announcements & new members',
      reply: 'Reply',
      add: 'Join',
      cancel: 'Cancel',
      ok: 'OK',
      profile_title: 'My profile',
      profile_username: 'Username',
      profile_bio: 'Bio',
      profile_bio_ph: 'Say something…',
      profile_color: 'Avatar color',
      profile_bio_empty: 'This user is too lazy to write a bio',
      profile_saved: 'Saved',
      bio_sub: 'Friend',
      bio_online: 'Online',
      me: 'Me',
      member: 'Member',
      btn_pm: 'Message',
      btn_edit: 'Edit',
      btn_msg: 'Message',
      btn_save: 'Save',
      btn_refresh: 'Refresh',
      btn_back: 'Back',
      btn_logout: 'Log out',
      btn_login: 'Sign in',
      btn_register: 'Sign up',
      btn_logout: 'Log out',
      confirm_logout: 'Log out now?',
      btn_accept: 'Accept',
      btn_reject: 'Decline',
      btn_delete: 'Delete',
      btn_copy: 'Copy',
      btn_reply: 'Reply',
      btn_retry: '↻ Tap to retry',
      toast_friend_req: '{0} wants to be your friend',
      toast_req_accepted: 'They accepted your friend request 🎉',
      toast_req_rejected: 'They declined your friend request',
      toast_new_friend: '{0} is now your friend',
      toast_new_group: 'Added to group: {0}',
      req_want: 'wants to be your friend · ',
      loading: 'Loading',
      group_count: 'Selected',
      group_min_hint: 'at least 1 friend',
      admin_login_title: 'Admin login',
      admin_active: 'Admin active',
      admin_key_placeholder: 'Enter admin key',
      admin_panel: 'Admin panel',
      admin_users: 'Users',
      admin_groups: 'Groups',
      admin_messages: 'Messages',
      admin_official_msgs: 'Official group messages',
      admin_wipe_official: 'Wipe official group',
      admin_wipe_official_hint: 'Delete all messages in the official group (irreversible)',
      admin_wipe_official_btn: 'Wipe official group',
      admin_batch: 'Batch delete',
      admin_batch_hint: 'Filter by group ID / sender / keyword / official only',
      admin_group_id: 'Group ID (optional)',
      admin_sender_id: 'Sender ID (optional)',
      admin_keyword: 'Content contains',
      admin_official_only: 'Official group only',
      admin_preview: 'Preview',
      admin_execute: 'Execute delete',
      admin_logout: 'Logout admin',
      admin_logout_btn: 'Logout',
      admin_need_login: 'Admin login required',
      admin_key_wrong: 'Wrong key',
      admin_logged_out: 'Logged out from admin',
      confirm_wipe_official: 'Wipe all official group messages? This cannot be undone!',
      confirm_batch: 'Delete matching messages?',
      matched: 'Matched',
      deleted: 'Deleted',
      wiped: 'Wiped',
      admin_delete: 'Admin delete',
      admin_badge: 'Admin',
      jack_delete: 'Jack delete',
      jack_remove: 'Remove',
      confirm_jack_delete: 'Delete this message?',
      confirm_delete_msg: 'Delete this message?',
      admin_dev: 'Admin / Developer',
      forward: 'Forward',
      forward_to: 'Forward to',
      reply: 'Reply',
      copied: 'Copied',
      copy_failed: 'Copy failed',
      forwarded: 'Forwarded',
      groups: 'Groups',
      confirm_kick: 'Remove {0} from this group?',
      removed: 'Removed',
      rename_group: 'Rename',
      rename_group_prompt: 'New group name',
      rename_ok: 'Renamed',
      members: 'Members',
      only_jack_rename_official: 'Only Jack can rename the official group',
    },
  };

  // ---------- state ----------
  let lang = localStorage.getItem('vve:lang') || (navigator.language && !navigator.language.startsWith('zh') ? 'en' : 'zh');
  let authMode = 'login';
  const state = {
    user: null, token: null, socket: null,
    friends: [], groups: [], conversations: [],
    requests: [], unreadRequests: 0,
    recommended: [],
    currentChat: null, messagesByConv: {},
    online: new Set(),
    typingUsers: new Map(),
    pendingReply: null, pendingImage: null,
  };

  // ---------- i18n helpers ----------
  function t(key, ...args) {
    const s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.zh[key] || key;
    if (!args.length) return s;
    return s.replace(/\{(\d+)\}/g, (m, i) => args[Number(i)] ?? m);
  }
  function setLang(newLang) {
    if (!STRINGS[newLang]) newLang = 'zh';
    lang = newLang;
    localStorage.setItem('vve:lang', lang);
    document.documentElement.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    // Static elements with data-zh / data-en
    document.querySelectorAll('[data-zh]').forEach(el => {
      el.textContent = el.dataset[lang] || el.dataset.zh;
    });
    document.querySelectorAll('[data-zh-ph]').forEach(el => {
      el.placeholder = el.dataset[lang + 'Ph'] || el.dataset.zhPh;
    });
    // Lang toggle button label — shows the *current* language state
    document.querySelectorAll('.lang-toggle').forEach(b => {
      b.textContent = lang === 'zh' ? '中' : 'En';
      b.title = lang === 'zh' ? '当前中文 · 点击切到 English' : 'Currently English · Click to switch to 中文';
      b.dataset.state = lang;
    });
    // Re-render dynamic UI
    if (state.user) {
      renderAll();
      if (state.currentChat) { renderChatHeader(); renderMessages(); }
    } else {
      $('#auth-submit').textContent = authMode === 'login' ? t('btn_login') : t('btn_register');
    }
    // Live-translate / restore all dynamic user-generated content
    if (lang === 'en') translateVisibleContent();
    else restoreOriginals();
    // Show toast so user knows what just happened
    toast(lang === 'en' ? '🌐 已切到 English (实时翻译已启用)' : '🌐 已切到 中文 (原文)');
  }
  // ============================================================
  // Live translator — caches translations and shows them inline.
  // 1) Built-in dict for common Chinese strings
  // 2) Free MyMemory API for everything else (no key, rate-limited)
  // 3) Persistent localStorage cache (survives reloads)
  // 4) Restores original Chinese when switching back to 中文
  // ============================================================
  const TRANSLATE_DICT = {
    'VVeChat 官方群': 'VVeChat Official Group',
    'VVeChat 官方群聊': 'VVeChat Official Group',
    '官方': 'Official',
    '群聊': 'Group',
    '你好': 'Hello',
    '在吗': 'Are you there?',
    '在么': 'Are you there?',
    '好的': 'OK',
    '收到': 'Got it',
    '谢谢': 'Thanks',
    '再见': 'Bye',
    '拜拜': 'Bye',
    '嗯': 'Mm',
    '哈哈': 'Haha',
    '哈哈哈哈哈': 'Hahaha',
    '早': 'Morning',
    '早安': 'Good morning',
    '晚上好': 'Good evening',
    '嗨': 'Hi',
    '测试': 'Test',
    '朋友': 'Friend',
    '好友': 'Friend',
    '群': 'Group',
    '图片': 'Image',
    '今天': 'Today',
    '明天': 'Tomorrow',
    '昨天': 'Yesterday',
    '大家好': 'Hello everyone',
    '新年快乐': 'Happy New Year',
    '晚安': 'Good night',
    '吃饭了吗': 'Have you eaten?',
    '我现在有点忙': "I'm a bit busy right now",
    '稍等一下': 'Hold on a sec',
  };
  // Persistent cache (localStorage)
  const _TX_CACHE_KEY = 'vve:txcache:v1';
  let _txCache;
  try { _txCache = new Map(Object.entries(JSON.parse(localStorage.getItem(_TX_CACHE_KEY) || '{}'))); }
  catch { _txCache = new Map(); }
  const _txInFlight = new Set();
  function _txCacheSave() {
    try {
      const obj = Object.fromEntries(_txCache);
      const keys = Object.keys(obj);
      if (keys.length > 500) {
        const trimmed = {};
        keys.slice(-500).forEach(k => trimmed[k] = obj[k]);
        localStorage.setItem(_TX_CACHE_KEY, JSON.stringify(trimmed));
      } else {
        localStorage.setItem(_TX_CACHE_KEY, JSON.stringify(obj));
      }
    } catch (_) {}
  }
  async function translateText(text) {
    if (!text || typeof text !== 'string') return text;
    const trimmed = text.trim();
    if (!trimmed) return text;
    if (_txCache.has(trimmed)) return _txCache.get(trimmed);
    if (!/[\u4e00-\u9fa5]/.test(trimmed)) { _txCache.set(trimmed, trimmed); _txCacheSave(); return trimmed; }
    if (TRANSLATE_DICT[trimmed]) { _txCache.set(trimmed, TRANSLATE_DICT[trimmed]); _txCacheSave(); return TRANSLATE_DICT[trimmed]; }
    if (_txInFlight.has(trimmed)) return trimmed;
    _txInFlight.add(trimmed);
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed.slice(0, 500))}&langpair=zh-CN|en-US`;
      const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
      const j = await r.json();
      const out = j?.responseData?.translatedText;
      if (out && !out.toUpperCase().includes('MYMEMORY') && out.length < trimmed.length * 4 && out.length > 0) {
        _txCache.set(trimmed, out);
        _txCacheSave();
        return out;
      }
    } catch (_) {}
    _txInFlight.delete(trimmed);
    _txCache.set(trimmed, trimmed);
    return trimmed;
  }
  async function applyTranslation(el) {
    if (!el || !el.textContent) return;
    const original = el.dataset.tOrig || el.textContent;
    if (!el.dataset.tOrig) el.dataset.tOrig = original;
    if (!/[\u4e00-\u9fa5]/.test(original)) { el.classList.remove('translated'); return; }
    const translated = await translateText(original);
    if (translated && translated !== original) {
      el.textContent = translated;
      el.title = original;
      el.classList.add('translated');
      el.dataset.tState = 'en';
    }
  }
  // Restore original Chinese text on every translated element
  function restoreOriginals() {
    document.querySelectorAll('[data-t-state="en"]').forEach(el => {
      if (el.dataset.tOrig) {
        el.textContent = el.dataset.tOrig;
        el.classList.remove('translated');
        el.dataset.tState = 'zh';
      }
    });
  }
  // Translate one freshly-inserted element (used right after rendering)
  async function translateFreshElement(el) {
    if (!el || lang !== 'en') return;
    await applyTranslation(el);
  }
  async function translateVisibleContent() {
    const tasks = [];
    document.querySelectorAll('.t-translatable').forEach(el => {
      if (el.dataset.tState === 'en') return;
      const original = el.dataset.tOrig || el.textContent || '';
      if (original && /[\u4e00-\u9fa5]/.test(original)) {
        tasks.push(applyTranslation(el));
      }
    });
    if (!tasks.length) return;
    const BATCH = 4;
    for (let i = 0; i < tasks.length; i += BATCH) {
      await Promise.all(tasks.slice(i, i + BATCH));
      await new Promise(r => setTimeout(r, 80));
    }
  }

  // ---------- DOM helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function toast(msg, ms = 2200) {
    const t = $('#toast');
    t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.add('hidden'), ms);
  }
  function fmtTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return d.toTimeString().slice(0,5);
    return `${d.getMonth()+1}/${d.getDate()}`;
  }
  function initials(name) {
    if (!name) return '?';
    return /[\u4e00-\u9fa5]/.test(name) ? name.slice(-1) : name.slice(0,1).toUpperCase();
  }
  function shade(hex, percent) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return hex;
    let [r, g, b] = [parseInt(m[1],16), parseInt(m[2],16), parseInt(m[3],16)];
    r = Math.max(0, Math.min(255, r + (r * percent / 100)));
    g = Math.max(0, Math.min(255, g + (g * percent / 100)));
    b = Math.max(0, Math.min(255, b + (b * percent / 100)));
    return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
  }
  function currentPeerId(msg) {
    if (!state.user) return null;
    const m = String(msg.conv_id || '').match(/^u_(\d+)_(\d+)$/);
    if (!m) return null;
    return Number(m[1]) === state.user.id ? Number(m[2]) : Number(m[1]);
  }
  function userInfo(uid, m) {
    if (state.user && state.user.id === uid) return state.user;
    // If we have a message reference, use its sender info directly
    // (avoids stale friend cache showing wrong username like "息")
    if (m && m.sender_id === uid) {
      return { id: uid, username: m.sender_username, avatar_color: m.sender_avatar_color };
    }
    const f = state.friends.find(f => f.id === uid);
    if (f) return f;
    return { id: uid, username: t('new_msg') };
  }
  // Build an inline style for a user/chat avatar — uses avatar_color gradient.
  function avatarStyle(u) {
    if (!u) return '';
    if (u.avatar_color) return `background:linear-gradient(135deg, ${u.avatar_color}, ${shade(u.avatar_color, -25)});`;
    return '';
  }
  function avatarInner(u) { return escapeHtml(initials(u && u.username || '?')); }
  function isOnline(uid) { return uid && state.online.has(uid); }
  function showOffline() { $('#offline-banner')?.classList.remove('hidden'); }
  function hideOffline() { $('#offline-banner')?.classList.add('hidden'); }

  // ---------- API client (with timeout + retry) ----------
  const API_TIMEOUT = 65000;
  async function apiRaw(path, opts = {}) {
    if (IS_MOCK) {
      const method = (opts.method || 'GET').toUpperCase();
      const qs = {};
      if (method === 'GET' && path.includes('?')) {
        const [p, q] = path.split('?');
        path = p;
        for (const part of q.split('&')) {
          const [k, v] = part.split('=');
          qs[decodeURIComponent(k)] = decodeURIComponent(v || '');
        }
      }
      const r = window.__mockBackend.handle(method, path, qs, opts.body || null, state.token);
      if (r.status >= 400) throw new Error((r.body && r.body.error) || `HTTP ${r.status}`);
      return r.body;
    }
    const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
    if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
    const url = `${API_BASE}/api${path}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), API_TIMEOUT);
    let resp;
    try {
      resp = await fetch(url, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined, signal: ctrl.signal });
    } catch (e) {
      clearTimeout(timer);
      throw new Error(e.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK');
    }
    clearTimeout(timer);
    let data = null;
    try { data = await resp.json(); } catch {}
    if (!resp.ok) throw new Error((data && data.error) || `HTTP ${resp.status}`);
    return data;
  }
  async function api(path, opts = {}) {
    try { return await apiRaw(path, opts); }
    catch (e) {
      const retryable = (opts.retryable ?? true);
      if (retryable && (e.message === 'TIMEOUT' || e.message === 'NETWORK')) {
        await new Promise(r => setTimeout(r, 800));
        try { return await apiRaw(path, opts); }
        catch (e2) {
          if (e2.message === 'TIMEOUT') throw new Error(t('err_timeout'));
          if (e2.message === 'NETWORK') throw new Error(t('err_network'));
          throw e2;
        }
      }
      throw e;
    }
  }

  // ---------- admin (Jack-only, automatic via state.user.is_admin) ----------
  function isJack() { return state.user && state.user.is_admin; }
  async function jackWipeGroup(groupId) {
    return api(`/admin/messages/wipe-group/${groupId}`, { method: 'POST' });
  }
  async function jackBatchDelete(body) {
    return api('/admin/messages/batch', { method: 'POST', body });
  }
  async function jackWipeAll() {
    return api('/admin/wipe', { method: 'POST' });
  }
  async function jackRemoveMember(groupId, userId) {
    return api(`/admin/groups/${groupId}/members/${userId}`, { method: 'DELETE' });
  }
  async function jackDeleteMessage(id) {
    return api(`/messages/${id}`, { method: 'DELETE' });
  }

  // ---------- view switching ----------
  function showAuth() { $('#auth-view').classList.remove('hidden'); $('#app-view').classList.add('hidden'); document.body.classList.remove('app-active'); }
  function showApp()  { $('#auth-view').classList.add('hidden');  $('#app-view').classList.remove('hidden'); document.body.classList.add('app-active'); }

  // ----- Theme: auto / light / dark (driven by prefers-color-scheme + manual override) -----
  function applyTheme(mode) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const systemDark = mql.matches;
    const wantDark = mode === 'dark' || (mode === 'auto' && systemDark);
    document.body.classList.toggle('dark', wantDark);
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    document.body.classList.add('theme-' + mode);
    // Update checkmarks in the menu
    $$('.theme-menu-item').forEach(b => b.classList.toggle('active', b.dataset.theme === mode));
    if (window.LiquidGlass) { try { window.LiquidGlass.markDirty(); } catch (_) {} }
  }
  function initTheme() {
    let saved = 'auto';
    try { saved = localStorage.getItem('vve:theme') || 'auto'; } catch (_) {}
    applyTheme(saved);
    // Wire up the theme menu
    const wrap = $('#theme-menu-wrap');
    const toggle = $('#btn-theme-toggle');
    const menu = $('#theme-menu');
    if (toggle && menu && wrap) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
      $$('.theme-menu-item').forEach(b => b.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = b.dataset.theme;
        try { localStorage.setItem('vve:theme', mode); } catch (_) {}
        applyTheme(mode);
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }));
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!wrap.contains(e.target)) {
          menu.classList.add('hidden');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    // React to system theme change only when in 'auto' mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if ((localStorage.getItem('vve:theme') || 'auto') === 'auto') applyTheme('auto'); };
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else if (mql.addListener) mql.addListener(handler);
  }
  initTheme();
  function openModal(id) { $('#'+id)?.classList.remove('hidden'); }
  function closeModal(id) { $('#'+id)?.classList.add('hidden'); hideSuggestions(); }
  function switchAuthTab(mode) {
    authMode = mode;
    $$('.auth-card .tab').forEach(t => t.classList.toggle('active', t.dataset.tab === mode));
    $('#auth-submit').textContent = mode === 'login' ? t('btn_login') : t('btn_register');
    $('#auth-msg').textContent = '';
  }

  // ---------- avatar rendering ----------
  function avatarHtml(name, opts = {}) {
    const { size = '', online, color, group = false, official = false } = opts;
    const sz = size ? ' ' + size : '';
    const cls = ['avatar', sz, group ? 'group' : '', official ? 'official' : '', online ? 'online' : ''].filter(Boolean).join(' ');
    const dot = (group || official) ? '' : '<span class="online-dot"></span>';
    const bg = group ? '' : (color ? ` style="background:linear-gradient(135deg, ${color}, ${shade(color, -25)})"` : '');
    return `<div class="${cls}"${bg}>${escapeHtml(initials(name))}${dot}</div>`;
  }

  // ---------- rendering ----------
  function renderAll() { renderChats(); renderContacts(); renderBell(); renderTopbarAvatar(); }

  function renderTopbarAvatar() {
    const el = $('#topbar-avatar');
    if (!el || !state.user) return;
    const letter = initials(state.user.username);
    // Always show the user's first letter (or upload image if set)
    el.textContent = letter;
    el.setAttribute('data-letter', letter);
    if (state.user.avatar) {
      el.style.backgroundImage = `url('${state.user.avatar}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.style.backgroundColor = 'transparent';
    } else {
      el.style.backgroundImage = '';
      el.style.background = state.user.avatar_color
        ? `linear-gradient(135deg, ${state.user.avatar_color}, ${shade(state.user.avatar_color, -25)})`
        : '';
    }
    // Force white text + sizing inline so no CSS rule can hide the letter
    el.style.color = '#ffffff';
    el.style.fontSize = '13px';
    el.style.fontWeight = '700';
    el.style.lineHeight = '1';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    // Jack gets signature gold glow on topbar avatar
    el.classList.toggle('avatar-jack-glow', !!state.user.is_admin);
    // show Jack pill if this user is Jack — append to topbar-right (sibling of profile btn)
    const existing = $('#topbar-jack-pill');
    if (existing) existing.remove();
    if (state.user.is_admin) {
      const pill = document.createElement('span');
      pill.id = 'topbar-jack-pill';
      pill.className = 'admin-pill';
      pill.title = 'Jack 管理员';
      pill.textContent = '';  // ::before adds the shield, no text needed
      // insert before the profile button so layout flows: Jack | avatar | bell | plus | logout
      const profile = $('#btn-profile');
      if (profile && profile.parentElement) {
        profile.parentElement.insertBefore(pill, profile);
      } else {
        el.parentElement?.appendChild(pill);
      }
    }
  }

  function renderChats() {
    const list = $('#chats-list'); const empty = $('#chats-empty');
    list.innerHTML = '';
    if (!state.conversations.length) {
      empty.classList.remove('hidden');
      // Show "open official group" CTA if there's an official group available
      const cta = $('#chats-open-official');
      if (cta) {
        const official = state.groups.find(g => g.is_official);
        cta.classList.toggle('hidden', !official);
        cta.onclick = async () => {
          if (!official) return;
          try { await api(`/groups/${official.id}/join`, { method: 'POST' }); } catch (_) {}
          openChat('group', official.id, official.name, 1);
          refreshConversations();
        };
      }
      return;
    }
    empty.classList.add('hidden');
    const sorted = [...state.conversations].sort((a,b) => (b.is_official||0)-(a.is_official||0) || (b.last_at||0)-(a.last_at||0));
    for (const c of sorted) {
      const li = document.createElement('li');
      li.className = 'list-item';
      if (state.currentChat && state.currentChat.type===c.type && String(state.currentChat.id)===String(c.id)) li.classList.add('active');
      const isGroup = c.type==='group';
      const isOfficial = !!c.is_official;
      const online = c.type==='user' && isOnline(c.id);
      const ac = isGroup ? `avatar group ${isOfficial?'official':''}` : 'avatar';
      const preview = c.last_message ? c.last_message : (isGroup?(isOfficial?t('official_sub'):t('group_sub')):t('new_msg'));
      const officialTag = isOfficial ? `<span style="font-size:10px;background:rgba(245,158,11,0.14);color:#b45309;padding:2px 7px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);font-weight:600;">${t('group_sub')==='群聊'?'官方':'Off'}</span>` : '';
      const avatarBg = isGroup ? '' : avatarStyle(c);
      const dot = (isGroup || isOfficial) ? '' : `<span class="online-dot"></span>`;
      const avatarCls = [ac, online?'online':''].filter(Boolean).join(' ');
      const senderPrefix = c.last_sender_id && c.last_sender_id !== state.user.id && isGroup
        ? `<span style="color:var(--accent);font-weight:600;">${escapeHtml(userInfo(c.last_sender_id).username)}:</span> ` : '';
      const unreadHtml = c.unread > 0 ? `<span class="unread">${c.unread>99?'99+':c.unread}</span>` : '';
      li.innerHTML = `<div class="${avatarCls}"${avatarBg}>${escapeHtml(initials(c.username))}${dot}</div>
        <div class="meta"><div class="name t-translatable">${escapeHtml(c.username)} ${officialTag}</div>
        <div class="preview t-translatable">${senderPrefix}${escapeHtml(preview)}</div></div>
        <div class="time">${fmtTime(c.last_at)}</div>${unreadHtml}`;
      li.addEventListener('click', () => openChat(c.type, c.id, c.username, isOfficial));
      list.appendChild(li);
    }
  }

  function renderContacts() {
    const grpList = $('#groups-list'); grpList.innerHTML = '';
    for (const g of state.groups) {
      const li = document.createElement('li'); li.className = 'list-item';
      const ac = `avatar group ${g.is_official?'official':''}`;
      const officialTag = g.is_official ? `<span style="font-size:10px;background:rgba(245,158,11,0.14);color:#b45309;padding:2px 7px;border-radius:6px;border:1px solid rgba(245,158,11,0.30);font-weight:600;">${t('group_sub')==='群聊'?'官方':'Off'}</span>` : '';
      li.innerHTML = `<div class="${ac}">${escapeHtml(initials(g.name))}</div>
        <div class="meta"><div class="name t-translatable">${escapeHtml(g.name)} ${officialTag}</div>
        <div class="preview">${g.is_official?t('official_sub'):t('group_sub')}</div></div>`;
      li.addEventListener('click', () => openChat('group', g.id, g.name, g.is_official));
      grpList.appendChild(li);
    }
    const frList = $('#friends-list'); frList.innerHTML = '';
    if (!state.friends.length) {
      frList.innerHTML = `<li class="empty-hint"><p>${t('no_friends_yet') || '还没有好友'}</p><small>${t('tap_magnifier_to_search') || '点击右上角放大镜搜索'}</small></li>`;
    }
    for (const f of state.friends) {
      const li = document.createElement('li'); li.className = 'list-item';
      const online = isOnline(f.id);
      const bg = avatarStyle(f);
      const statusTag = online ? `<span style="font-size:10px;background:rgba(52,199,89,0.14);color:#15803d;padding:2px 7px;border-radius:6px;border:1px solid rgba(52,199,89,0.30);font-weight:600;">${t('online')}</span>` : '';
      li.innerHTML = `<div class="avatar ${online?'online':''}"${bg ? ` style="${bg}"` : ''}>${avatarInner(f)}<span class="online-dot"></span></div>
        <div class="meta"><div class="name t-translatable">${escapeHtml(f.username)} ${statusTag}</div>
        <div class="preview t-translatable">${escapeHtml(f.bio || (online?t('online'):t('friend')))}</div></div>`;
      li.addEventListener('click', () => openProfileModal(f));
      frList.appendChild(li);
    }
  }

  function renderBell() {
    const list = $('#bell-list'); const badge = $('#bell-badge');
    const pending = state.requests.filter(r => r.status==='pending');
    if (pending.length) { badge.classList.remove('hidden'); badge.textContent = pending.length>99?'99+':pending.length; }
    else badge.classList.add('hidden');
    if (!pending.length) { list.innerHTML = `<div class="empty-hint small"><p>${t('empty')}</p></div>`; return; }
    list.innerHTML = '';
    for (const r of pending) {
      const div = document.createElement('div'); div.className='req-item';
      div.innerHTML = `<div class="avatar sm">${escapeHtml(initials(r.from_username))}</div>
        <div class="meta"><div class="name">${escapeHtml(r.from_username)}</div>
        <div class="sub">${t('req_want')}${fmtTime(r.created_at)}</div></div>
        <div class="actions">
          <button class="btn btn-danger btn-sm" data-act="reject" data-id="${r.id}">${t('btn_reject')}</button>
          <button class="btn btn-ok btn-sm" data-act="accept" data-id="${r.id}">${t('btn_accept')}</button>
        </div>`;
      list.appendChild(div);
    }
  }

  // ---------- chat ----------
  async function refreshRecommended() {
    try {
      const r = await api('/groups/recommended');
      state.recommended = r.groups || [];
      renderRecommended();
    } catch (e) { console.error('refreshRecommended', e); }
  }
  function renderRecommended() {
    const list = $('#discover-list');
    list.innerHTML = '';
    if (!state.recommended.length) {
      $('#discover-empty').classList.remove('hidden');
      return;
    }
    $('#discover-empty').classList.add('hidden');
    for (const g of state.recommended) {
      const li = document.createElement('li'); li.className = 'list-item';
      const color = g.icon_color || '#8b5cf6';
      const bg = `background:linear-gradient(135deg, ${color}, ${shade(color, -25)});`;
      li.innerHTML = `<div class="avatar sm" style="${bg}">${escapeHtml((g.name || '?').slice(0,1))}</div>
        <div class="meta">
          <div class="name t-translatable">${escapeHtml(g.name)}</div>
          <div class="preview t-translatable">${escapeHtml(g.description || '')} · ${g.member_count || 0} ${lang==='zh'?'人':'members'}</div>
        </div>
        <button class="settings-action" data-gid="${g.id}" data-act="${g.joined ? 'open' : 'join'}" style="color:#3b82f6;">${g.joined ? (lang==='zh'?'打开':'Open') : (lang==='zh'?'加入':'Join')}</button>`;
      const act = li.querySelector('[data-act]');
      act.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (g.joined) {
          openChat('group', g.id, g.name, 0);
          state.currentChat = { type: 'group', id: g.id, title: g.name, isOfficial: 0 };
          $$('.pane').forEach(p => p.classList.toggle('active', p.id === 'pane-chats'));
        } else {
          try {
            await api(`/groups/${g.id}/join`, { method: 'POST' });
            toast(lang==='zh'?'已加入群聊':'Joined group');
            refreshGroups(); refreshRecommended();
          } catch (e) { toast(e.message); }
        }
      });
      // clicking the row itself opens the group (if already joined)
      li.addEventListener('click', () => {
        if (g.joined) {
          $$('.pane').forEach(p => p.classList.toggle('active', p.id === 'pane-chats'));
          $$('.tabbar .tab2').forEach(b => b.classList.toggle('active', b.dataset.pane === 'chats'));
          openChat('group', g.id, g.name, 0);
        }
      });
      list.appendChild(li);
    }
  }
  async function openGroupInfoModal() {
    const gid = state.currentChat.id;
    const g = state.groups.find(g => g.id === gid) || {};
    const isOfficial = !!g.is_official;
    const isOwner = g.owner_id === state.user.id;
    const isAdmin = isJack();
    const canManage = isOwner || isAdmin;

    // Build iOS-Settings style rows
    const wrap = $('#group-info-list');
    wrap.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'group-info-head';
    const gBg = g.icon_color ? `background:linear-gradient(135deg, ${g.icon_color || '#8b5cf6'}, ${shade(g.icon_color || '#8b5cf6', -25)});` : '';
    head.innerHTML = `<div class="gi-avatar" style="${gBg}">${escapeHtml((g.name || '?').slice(0,1))}</div>
      <div class="gi-name" id="gi-name">${escapeHtml(g.name || '—')}</div>
      <div class="gi-meta">${g.member_count || 0} ${lang==='zh'?'人':'members'}</div>`;
    wrap.appendChild(head);

    // Editable name row (群主 / 管理员)
    if (canManage) {
      const renameRow = document.createElement('div');
      renameRow.className = 'settings-row';
      renameRow.innerHTML = `<span class="settings-label">${lang==='zh'?'群名称':'Group name'}</span>
        <span class="settings-value" id="gi-rename-value">${escapeHtml(g.name || '—')}</span>
        <span class="settings-chevron">›</span>`;
      renameRow.addEventListener('click', () => doRenameGroup(g, renameRow));
      wrap.appendChild(renameRow);
    }

    // Pin toggle
    const pinRow = document.createElement('div');
    pinRow.className = 'settings-row';
    const pin = !!g.pinned;
    pinRow.innerHTML = `<span class="settings-label">${lang==='zh'?'置顶聊天':'Pin to top'}</span>
      <label class="settings-switch"><input type="checkbox" id="gi-pin" ${pin?'checked':''}><span></span></label>`;
    wrap.appendChild(pinRow);

    // Group announcement
    const annRow = document.createElement('div');
    annRow.className = 'settings-row';
    annRow.innerHTML = `<span class="settings-label">${lang==='zh'?'群公告':'Group notice'}</span>
      <span class="settings-value" id="gi-ann-value">${escapeHtml(g.announcement || (lang==='zh'?'未设置':'Not set'))}</span>
      <span class="settings-chevron">›</span>`;
    if (canManage) annRow.addEventListener('click', () => doEditAnnouncement(gid, annRow));
    wrap.appendChild(annRow);

    // Set notice link row
    if (canManage) {
      const setAnnRow = document.createElement('div');
      setAnnRow.className = 'settings-row';
      setAnnRow.innerHTML = `<span class="settings-label" style="color:#3b82f6;">${lang==='zh'?'设置公告':'Set notice'}</span>
        <span class="settings-chevron" style="color:#3b82f6;">›</span>`;
      setAnnRow.addEventListener('click', () => doEditAnnouncement(gid, annRow));
      wrap.appendChild(setAnnRow);
    }

    // Recommend group toggle (群主可开启)
    if (canManage) {
      const recRow = document.createElement('div');
      recRow.className = 'settings-row';
      recRow.innerHTML = `<span class="settings-label">${lang==='zh'?'推荐群聊':'Recommend group'}</span>
        <span class="settings-value" style="font-size:12px;color:var(--muted);">${lang==='zh'?'开启后出现在"推荐"列表':'Show in Discover'}</span>
        <label class="settings-switch"><input type="checkbox" id="gi-recommend" ${g.recommended?'checked':''}><span></span></label>`;
      wrap.appendChild(recRow);
    }

    // Members section header
    const mTitle = document.createElement('div');
    mTitle.className = 'section-title';
    mTitle.textContent = lang==='zh'?'群成员（' + (g.member_count||0) + '）':`Members (${g.member_count||0})`;
    wrap.appendChild(mTitle);

    // Members container
    const memberWrap = document.createElement('div');
    memberWrap.className = 'settings-group';
    memberWrap.id = 'group-info-members';
    wrap.appendChild(memberWrap);
    try {
      const r = await api(`/groups/${gid}/members`);
      memberWrap.innerHTML = '';
      for (const m of r.members) {
        const row = document.createElement('div'); row.className = 'settings-row';
        const bg = m.avatar_color ? `background:linear-gradient(135deg, ${m.avatar_color}, ${shade(m.avatar_color, -25)})` : '';
        const role = m.is_admin ? (lang==='zh'?'群主':'Owner') : (m.role === 1 ? (lang==='zh'?'群管':'Admin') : '');
        const right = [];
        if (m.id === state.user.id) right.push(`<span class="settings-value" style="font-size:12px;color:var(--muted);">${lang==='zh'?'我':'Me'}</span>`);
        if (role) right.push(`<span class="settings-value" style="font-size:12px;color:${m.is_admin?'#34d399':'#3b82f6'};">${role}</span>`);
        // action buttons for owner/admin managing others
        if (canManage && m.id !== state.user.id) {
          right.push(`<span class="settings-action danger" data-act="kick" data-uid="${m.id}">${lang==='zh'?'移除':'Remove'}</span>`);
        }
        row.innerHTML = `<div class="avatar sm" style="${bg}">${escapeHtml(initials(m.username))}</div>
          <div class="settings-label">${escapeHtml(m.username)}${m.is_admin?` <span class="admin-pill" style="font-size:9px;padding:1px 6px;"></span>`:''}</div>
          <div class="settings-trailing">${right.join('')}</div>`;
        const kick = row.querySelector('[data-act="kick"]');
        if (kick) kick.addEventListener('click', async (e) => {
          e.stopPropagation();
          if (!confirm((lang==='zh'?'确定把 ':'Remove ') + m.username + (lang==='zh'?' 从群里移除？':' from group?'))) return;
          try {
            await (isAdmin ? jackRemoveMember(gid, m.id) : api(`/groups/${gid}/members/${m.id}`, { method: 'DELETE' }));
            row.remove();
            toast(lang==='zh'?'已移除':'Removed');
            refreshGroups();
          } catch (e) { toast(e.message); }
        });
        memberWrap.appendChild(row);
      }
      // "Show more" link
      const more = document.createElement('div');
      more.className = 'settings-row settings-row-link';
      more.innerHTML = `<span class="settings-label" style="color:#3b82f6;">${lang==='zh'?'显示更多成员':'Show more members'}</span>`;
      more.addEventListener('click', () => toast(lang==='zh'?'已显示全部成员':'All members shown'));
      memberWrap.appendChild(more);
    } catch (e) { memberWrap.innerHTML = `<div class="empty-hint"><p>${escapeHtml(e.message)}</p></div>`; }

    // Bottom: dissolve / leave
    const bottom = document.createElement('div');
    bottom.className = 'group-info-bottom';
    if (isAdmin) {
      const dissolve = document.createElement('button');
      dissolve.className = 'settings-danger-btn';
      dissolve.textContent = lang==='zh'?'解散群聊':'Disband group';
      dissolve.addEventListener('click', () => doDisband(gid));
      bottom.appendChild(dissolve);
    }
    const leave = document.createElement('button');
    leave.className = 'settings-leave-btn';
    leave.textContent = lang==='zh'?'退出群聊':'Leave group';
    leave.addEventListener('click', () => doLeaveGroup(gid));
    bottom.appendChild(leave);
    wrap.appendChild(bottom);

    // Wire up pin + recommend
    pinRow.querySelector('#gi-pin')?.addEventListener('change', async (e) => {
      try {
        await api(`/groups/${gid}`, { method: 'PUT', body: { pinned: e.target.checked } });
        g.pinned = e.target.checked;
        toast(lang==='zh'?(e.target.checked?'已置顶':'已取消置顶'):(e.target.checked?'Pinned':'Unpinned'));
      } catch (e) { toast(e.message); e.target.checked = !e.target.checked; }
    });
    if (canManage) {
      wrap.querySelector('#gi-recommend')?.addEventListener('change', async (e) => {
        try {
          await api(`/groups/${gid}`, { method: 'PUT', body: { recommended: e.target.checked } });
          g.recommended = e.target.checked;
          toast(lang==='zh'?(e.target.checked?'已开启推荐':'已关闭推荐'):(e.target.checked?'Recommended':'Not recommended'));
        } catch (e) { toast(e.message); e.target.checked = !e.target.checked; }
      });
    }

    openModal('modal-group-info');
  }

  async function doRenameGroup(g, row) {
    const newName = prompt(lang==='zh'?'新的群名称':'New group name', g.name || '');
    if (!newName || !newName.trim() || newName.trim() === g.name) return;
    try {
      await api(`/groups/${g.id}`, { method: 'PUT', body: { name: newName.trim() } });
      g.name = newName.trim();
      $('#gi-name').textContent = g.name;
      row.querySelector('#gi-rename-value').textContent = g.name;
      renderChatHeader(); refreshGroups();
      toast(lang==='zh'?'已修改':'Saved');
    } catch (e) { toast(e.message); }
  }
  async function doEditAnnouncement(gid, row) {
    const cur = row.querySelector('#gi-ann-value')?.textContent || '';
    const v = prompt(lang==='zh'?'设置群公告':'Set group notice', cur === '未设置' ? '' : cur);
    if (v === null) return;
    try {
      await api(`/groups/${gid}`, { method: 'PUT', body: { announcement: v.slice(0, 200) } });
      row.querySelector('#gi-ann-value').textContent = v || (lang==='zh'?'未设置':'Not set');
      toast(lang==='zh'?'已设置':'Saved');
    } catch (e) { toast(e.message); }
  }
  async function doDisband(gid) {
    if (!confirm(lang==='zh'?'确定解散这个群聊？此操作不可撤销':'Disband this group? Cannot undo.')) return;
    try {
      await jackDisbandGroup(gid);
      closeModal('modal-group-info');
      refreshGroups(); refreshConversations();
      toast(lang==='zh'?'已解散':'Disbanded');
    } catch (e) { toast(e.message); }
  }
  async function doLeaveGroup(gid) {
    if (!confirm(lang==='zh'?'确定退出这个群聊？':'Leave this group?')) return;
    try {
      await api(`/groups/${gid}/leave`, { method: 'POST' });
      closeModal('modal-group-info');
      state.currentChat = null;
      $('#chat-window').classList.add('hidden');
      $('#chat-empty').classList.remove('hidden');
      refreshGroups(); refreshConversations();
      toast(lang==='zh'?'已退出':'Left');
    } catch (e) { toast(e.message); }
  }

  function setReplyTo(msg) {
    if (!msg) return;
    state.pendingReply = { id: msg.id, sender_username: msg.sender_username, content: msg.content, type: msg.type };
    $('#reply-preview-name').textContent = `${t('reply') || '引用'} ${msg.sender_username}`;
    $('#reply-preview-text').textContent = msg.type === 'image' ? (t('type_image') || '[图片]') : (msg.content || '').slice(0, 80);
    $('#reply-preview').classList.remove('hidden');
    $('#chat-input')?.focus();
  }
  async function openChat(type, id, title, isOfficial) {
    state.currentChat = {type, id, title, isOfficial};
    state.typingUsers.clear();
    state.pendingReply = null; state.pendingImage = null;
    $('#chat-empty').classList.add('hidden');
    $('#chat-window').classList.remove('hidden');
    $('#reply-preview').classList.add('hidden');
    $('#img-preview').classList.add('hidden');
    renderChatHeader();
    if (window.innerWidth <= 820) {
      $('.app-body')?.classList.add('chat-open');
      $('#chat-back')?.classList.add('mobile-show');
      $('.right-pane')?.classList.add('mobile-show');
    }
    await loadMessages();
    renderMessages(); scrollBottom();
    const {type:t, id:i} = state.currentChat;
    const arr = state.messagesByConv[convKey(t,i)] || [];
    if (arr.length) sendReadReceipt(arr[arr.length-1]);
    refreshConversations();
  }
  function convKey(type, id) { return `${type}:${id}`; }

  function renderChatHeader() {
    if (!state.currentChat) return;
    const { type, id, title, isOfficial } = state.currentChat;
    const titleEl = $('#chat-title');
    titleEl.textContent = title;
    titleEl.dataset.tOrig = title;
    titleEl.dataset.tState = 'zh';
    titleEl.classList.add('t-translatable');
    const sub = $('#chat-sub'); const avatar = $('#chat-avatar');
    if (type === 'user') {
      const f = state.friends.find(f => f.id === id);
      const online = isOnline(id);
      sub.innerHTML = online ? `<span style="color:var(--online);">● ${t('online')}</span>` : escapeHtml(f?.bio || t('friend'));
      const bg = avatarStyle(f);
      avatar.style.cssText = `cursor:pointer;${bg}`;
      avatar.className = `avatar sm ${online?'online':''}`;
      avatar.style.display = 'flex';
      avatar.textContent = f && f.avatar ? '' : initials(title);
      avatar.onclick = () => f && openProfileModal(f);
    } else {
      sub.textContent = isOfficial ? 'VVeChat Official' : t('group_sub');
      avatar.className = 'avatar sm group';
      avatar.style.cssText = isOfficial ? 'background:linear-gradient(135deg, #fde68a, #fb923c);' : '';
      avatar.style.display = 'flex';
      avatar.textContent = initials(title);
      avatar.onclick = null;
    }
    // admin badge in header (Jack)
    const adminBadge = isJack() ? `<span class="admin-pill admin-pill-inline" title="Jack 管理员"></span>` : '';
    if ($('#chat-title').parentElement) {
      const existing = $('#chat-title').parentElement.querySelector('.admin-pill');
      if (existing) existing.remove();
      if (adminBadge) $('#chat-title').insertAdjacentHTML('afterend', adminBadge);
    }
    // Jack can wipe any group's messages — show button when Jack and in a group
    const wipeBtn = $('#chat-admin-wipe');
    if (wipeBtn) {
      if (isJack() && type === 'group') wipeBtn.classList.remove('hidden');
      else wipeBtn.classList.add('hidden');
    }
  }

  async function loadMessages() {
    const {type,id} = state.currentChat;
    const key = convKey(type, id);
    const wrap = $('#chat-messages');
    const existing = state.messagesByConv[key] || [];
    if (existing.length === 0) wrap.innerHTML = `<div class="msg-system" style="opacity:0.7;">${t('loading')}…</div>`;
    try {
      const data = await api(`/messages?conv_type=${type}&conv_id=${id}&limit=100`);
      const fresh = data.messages || [];
      const maxFreshId = fresh.reduce((m, x) => Math.max(m, x.id || 0), 0);
      const newerFromCache = existing.filter(x => (x.id||0) > maxFreshId);
      state.messagesByConv[key] = [...fresh, ...newerFromCache];
    } catch (e) {
      if (existing.length === 0) {
        state.messagesByConv[key] = [];
        wrap.innerHTML = `<div class="msg-system" style="background:rgba(255,59,48,0.10);color:#b91c1c;">${escapeHtml(e.message)}</div>
          <div class="msg-system" style="cursor:pointer;" id="retry-load">${t('btn_retry')}</div>`;
        $('#retry-load')?.addEventListener('click', () => loadMessages());
      }
    }
  }
  function renderMessages() {
    if (!state.currentChat) return;
    const {type,id} = state.currentChat;
    const key = convKey(type, id);
    const arr = state.messagesByConv[key] || [];
    const wrap = $('#chat-messages'); wrap.innerHTML = '';
    let lastDate = '';
    for (const m of arr) {
      const d = new Date(m.created_at);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      if (dateStr !== lastDate) {
        const sep = document.createElement('div'); sep.className='msg-system'; sep.textContent=dateStr; wrap.appendChild(sep); lastDate=dateStr;
      }
      wrap.appendChild(renderMessageRow(m));
    }
  }
  function renderMessageRow(m) {
    const row = document.createElement('div');
    const mine = m.sender_id === state.user.id;
    const ctype = state.currentChat.type;
    // WeChat style: my messages on the right, others' on the left.
    // The receiver sees my message on THEIR left (mirror view).
    row.className = `msg-row ${mine ? 'me' : ''}`;
    row.dataset.msgId = m.id;
    // avatar — always show. Jack's avatar (sent OR received) gets the gold glow.
    const u = mine ? state.user : userInfo(m.sender_id, m);
    const bgStyle = u.avatar_color
      ? `background:linear-gradient(135deg, ${u.avatar_color}, ${shade(u.avatar_color, -25)});`
      : '';
    const isJackAvatar = u.username === 'Jack';
    const glowCls = isJackAvatar ? ' avatar-jack-glow' : '';
    const avatarHtml = `<div class="msg-avatar avatar sm${glowCls}" style="${bgStyle}">${escapeHtml(initials(u.username))}</div>`;
    // sender name — show for group chats when message is from someone else
    const senderName = ctype === 'group' && !mine
      ? `<div class="msg-meta"><span class="sender t-translatable">${escapeHtml(m.sender_username)}</span></div>`
      : '';
    const quoteHtml = m.reply_to ? renderQuote(m.reply_to) : '';
    let bubbleContent = '';
    if (m.is_deleted) bubbleContent = `<div class="msg-bubble deleted">${t('msg_deleted')}</div>`;
    else if (m.type === 'image') bubbleContent = `<div class="msg-bubble image-bubble"><img class="chat-img" src="${escapeHtml(m.content)}" alt="${t('img_alt')}" data-img="${escapeHtml(m.content)}" loading="lazy" /></div>`;
    else bubbleContent = `<div class="msg-bubble t-translatable">${escapeHtml(m.content)}</div>`;
    const time = new Date(m.created_at).toTimeString().slice(0,5);
    let receipt = '';
    if (mine && ctype === 'user' && !m.is_deleted) {
      const read = m.read_by && m.read_by.length > 0;
      receipt = `<span class="receipt ${read?'read':''}" title="${read?t('read'):t('sent')}">${read
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12l5 5L17 6"/><path d="M8 12l5 5L23 7" opacity="0.6"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12l5 5L17 6"/></svg>`}</span>`;
    }
    const metaHtml = `<div class="msg-meta"><span>${time}</span>${receipt}</div>`;
    row.innerHTML = `${avatarHtml}<div class="msg-content">${senderName}${quoteHtml}${bubbleContent}${metaHtml}</div>`;
    row.addEventListener('contextmenu', (e) => { e.preventDefault(); openContextMenu(e, m); });
    // (long-press removed — short tap is enough for everyone now)
    // Any user can short-tap a message to show the floating action bar
    // (forward / copy / delete-own / cancel)
    if (!m.is_deleted) {
      const bubbleEl = row.querySelector('.msg-bubble');
      if (bubbleEl) {
        bubbleEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (m.is_deleted) return;
          showMsgActionBar(row, m, e);
        });
      }
    }
    row.querySelectorAll('.chat-img').forEach(img => img.addEventListener('click', () => openLightbox(img.dataset.img)));
    return row;
  }

  // Floating action bar shown when ANY user short-taps a message
  // (forward / copy / delete / cancel). Delete is gated: Jack can delete
  // any message; regular users can only delete their own messages within 2 min.
  function showMsgActionBar(rowEl, m, evt) {
    document.querySelectorAll('.msg-action-bar').forEach(el => el.remove());
    const isJack = state.user && state.user.is_admin;
    const isMine = state.user && m.user_id === state.user.id;
    const ageMs = Date.now() - new Date(m.created_at).getTime();
    const canDelete = isJack || (isMine && ageMs < 2 * 60 * 1000);
    const canReply = !m.is_deleted;
    const bar = document.createElement('div');
    bar.className = 'msg-action-bar';
    // Each action button has a Chinese tooltip explaining what it does.
    // Tooltips are shown both via native title (hover) and a visible label
    // above each icon so they're always readable on touch devices.
    bar.innerHTML = `
      <button class="msg-action-btn msg-action-forward" data-tip="转发" title="转发 — 把这条消息发给其他好友或群聊" aria-label="转发">
        <span class="msg-action-label">转发</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/>
        </svg>
      </button>
      <button class="msg-action-btn msg-action-reply ${canReply ? '' : 'msg-action-disabled'}" data-tip="引用" title="引用 — 引用这条消息并回复（显示在发送的消息上方）" aria-label="引用" ${canReply ? '' : 'disabled'}>
        <span class="msg-action-label">引用</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
        </svg>
      </button>
      <button class="msg-action-btn msg-action-copy" data-tip="复制" title="复制 — 把消息内容复制到剪贴板" aria-label="复制">
        <span class="msg-action-label">复制</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>
      <button class="msg-action-btn msg-action-delete ${canDelete ? '' : 'msg-action-disabled'}" data-tip="${isJack ? '清除' : '撤回'}" title="${isJack ? '清除 — 管理员可永久清除任何消息' : '撤回 — 2 分钟内可撤回自己发送的消息'}" aria-label="${isJack ? '清除' : '撤回'}" ${canDelete ? '' : 'disabled'}>
        <span class="msg-action-label">${isJack ? '清除' : '撤回'}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
        </svg>
      </button>
      <button class="msg-action-btn msg-action-cancel" data-tip="取消" title="取消 — 关闭操作栏" aria-label="取消">
        <span class="msg-action-label">取消</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>`;
    document.body.appendChild(bar);
    const rect = rowEl.getBoundingClientRect();
    const barWidth = bar.offsetWidth || 320;
    const left = rect.left + rect.width / 2 - barWidth / 2;
    const top = rect.top - 6;
    bar.style.left = Math.max(8, Math.min(window.innerWidth - barWidth - 8, left)) + 'px';
    bar.style.top = Math.max(8, top - bar.offsetHeight - 8) + 'px';
    bar.querySelector('.msg-action-delete').addEventListener('click', async (ev) => {
      ev.stopPropagation();
      if (!canDelete) {
        toast(lang === 'zh' ? (isJack ? '该消息不能清除' : '该消息不能撤回') : (isJack ? 'Cannot clear this message' : 'Cannot recall this message'));
        bar.remove();
        return;
      }
      const confirmText = isJack
        ? (lang === 'zh' ? '确定要清除这条消息？（永久删除）' : 'Clear this message permanently?')
        : (lang === 'zh' ? '确定要撤回这条消息？' : 'Recall this message?');
      if (!confirm(confirmText)) { bar.remove(); return; }
      try {
        if (isJack) {
          await jackDeleteMessage(m.id);
        } else {
          await api(`/api/messages/${m.id}`, { method: 'DELETE' });
          s.emit('message:deleted', { id: m.id, scope: 'self' });
        }
        bar.remove();
        toast(isJack ? (lang === 'zh' ? '已清除' : 'Cleared') : (lang === 'zh' ? '已撤回' : 'Recalled'));
      } catch (e) { toast(e.message); bar.remove(); }
    });
    bar.querySelector('.msg-action-forward').addEventListener('click', (ev) => {
      ev.stopPropagation();
      bar.remove();
      openForwardModal(m);
    });
    bar.querySelector('.msg-action-reply').addEventListener('click', (ev) => {
      ev.stopPropagation();
      bar.remove();
      setReplyTo(m);
    });
    bar.querySelector('.msg-action-copy').addEventListener('click', async (ev) => {
      ev.stopPropagation();
      try { await navigator.clipboard.writeText(m.content || ''); toast(t('copied') || '已复制'); } catch (_) { toast(t('copy_failed') || '复制失败'); }
      bar.remove();
    });
    bar.querySelector('.msg-action-cancel').addEventListener('click', (ev) => { ev.stopPropagation(); bar.remove(); });
    setTimeout(() => {
      const dismiss = (e) => {
        if (!bar.contains(e.target)) { bar.remove(); document.removeEventListener('click', dismiss); }
      };
      document.addEventListener('click', dismiss);
    }, 50);
  }

  // Forward message to another chat (friend or group)
  function openForwardModal(m) {
    // Tear down any existing forward modal first (idempotent)
    document.getElementById('modal-forward')?.remove();
    // Build a proper modal with mask + card so it overlays the whole app
    const html = `<div class="modal-mask" data-close="modal-forward"></div>
      <div class="modal-card" role="dialog" aria-label="${t('forward_to') || '转发到'}">
        <div class="modal-head">
          <h3>${t('forward_to') || '转发到'}</h3>
          <button class="icon-btn icon-btn-sm modal-close" data-close="modal-forward" aria-label="${t('cancel') || '取消'}">×</button>
        </div>
        <div class="modal-body" style="max-height:50vh;overflow-y:auto;padding:0 4px;">
          <div class="section-title">${t('contacts') || '联系人'}</div>
          <div id="forward-friends"></div>
          <div class="section-title">${t('groups') || '群聊'}</div>
          <div id="forward-groups"></div>
        </div>
      </div>`;
    const modal = document.createElement('div');
    modal.id = 'modal-forward';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = html;
    document.body.appendChild(modal);
    // Populate target lists
    const friendsHtml = (state.friends || []).map(f => {
      const bg = avatarStyle(f);
      return `<div class="req-item" data-fid="${f.id}">
        <div class="avatar sm"${bg ? ` style="${bg}"` : ''}>${avatarInner(f)}</div>
        <div class="meta"><div class="name">${escapeHtml(f.username)}</div></div>
      </div>`;
    }).join('') || `<div class="empty-hint small"><p>${t('no_friends_yet') || '还没有好友'}</p></div>`;
    const groupsHtml = (state.groups || []).map(g => `<div class="req-item" data-gid="${g.id}">
      <div class="avatar sm group">${escapeHtml(initials(g.name))}</div>
      <div class="meta"><div class="name">${escapeHtml(g.name)}</div></div>
    </div>`).join('') || `<div class="empty-hint small"><p>${t('no_groups_yet') || '还没有群聊'}</p></div>`;
    modal.querySelector('#forward-friends').innerHTML = friendsHtml;
    modal.querySelector('#forward-groups').innerHTML = groupsHtml;
    // Click handlers
    modal.addEventListener('click', async (e) => {
      // close on mask click
      if (e.target.matches('[data-close="modal-forward"]')) {
        document.getElementById('modal-forward')?.remove();
        return;
      }
      const friendItem = e.target.closest('[data-fid]');
      const groupItem = e.target.closest('[data-gid]');
      if (friendItem) {
        const fid = friendItem.dataset.fid;
        await forwardToUser(fid, m);
        document.getElementById('modal-forward')?.remove();
      } else if (groupItem) {
        const gid = groupItem.dataset.gid;
        await forwardToGroup(gid, m);
        document.getElementById('modal-forward')?.remove();
      }
    });
  }
  async function forwardToUser(friendId, origMsg) {
    const me = state.user.id;
    const friend = state.friends.find(f => f.id === friendId);
    const prev = state.currentChat;
    state.currentChat = { type: 'user', id: friendId, title: friend?.username || '' };
    try {
      await sendMessage(origMsg.content, { type: origMsg.type || 'text', meta: origMsg.meta || null });
      toast(t('forwarded') || '已转发');
    } catch (e) { toast(e.message); }
    state.currentChat = prev;
  }
  async function forwardToGroup(gid, origMsg) {
    const prev = state.currentChat;
    const group = state.groups.find(g => g.id === gid);
    state.currentChat = { type: 'group', id: gid, title: group?.name || '' };
    try {
      await sendMessage(origMsg.content, { type: origMsg.type || 'text', meta: origMsg.meta || null });
      toast(t('forwarded') || '已转发');
    } catch (e) { toast(e.message); }
    state.currentChat = prev;
  }
  function renderQuote(q) {
    const text = q.type === 'image' ? t('type_image') : (q.content || '');
    const trunc = text.length > 40 ? text.slice(0,40) + '…' : text;
    return `<div class="msg-quote" data-reply-id="${q.id}"><span class="qname">${escapeHtml(q.sender_username)}</span><span class="qtext">${escapeHtml(trunc)}</span></div>`;
  }
  function scrollBottom() { const w = $('#chat-messages'); if (w) w.scrollTop = w.scrollHeight; }

  function sendReadReceipt(msg) {
    if (!state.currentChat || !msg || !state.user || msg.sender_id === state.user.id) return;
    const { type, id } = state.currentChat;
    if (state.socket && state.socket.emit) {
      state.socket.emit('message:read', { conv_type: type, conv_id: id, last_read_msg_id: msg.id });
    } else {
      api('/messages/read', { method:'POST', body: { conv_type: type, conv_id: id, last_read_msg_id: msg.id } }).catch(()=>{});
    }
  }

  async function sendMessage(content, opts = {}) {
    if (!state.currentChat) return;
    const { type, id } = state.currentChat;
    const payload = {
      conv_type: type, conv_id: id, content,
      type: opts.type || 'text',
      meta: opts.meta || null,
      reply_to: state.pendingReply ? state.pendingReply.id : null,
    };
    state.pendingReply = null; state.pendingImage = null;
    $('#reply-preview').classList.add('hidden');
    $('#img-preview').classList.add('hidden');
    if (state.socket && state.socket.emit) {
      state.socket.emit('message:send', payload, (ack) => {
        if (!ack.ok) toast(ack.error || t('err_send'));
        else {
          const key = convKey(type, id);
          const arr = state.messagesByConv[key] || [];
          if (!arr.find(x => x.id === ack.message.id)) arr.push(ack.message);
          state.messagesByConv[key] = arr;
          renderMessages(); scrollBottom();
        }
      });
    } else {
      try {
        const data = await api('/messages', { method:'POST', body: payload });
        const key = convKey(type, id);
        const arr = state.messagesByConv[key] || []; arr.push(data.message); state.messagesByConv[key] = arr;
        renderMessages(); scrollBottom(); refreshConversations();
      } catch(e) { toast(e.message); }
    }
  }

  // ---------- context menu ----------
  function openContextMenu(e, msg) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'ctx-menu';
    const isMine = msg.sender_id === state.user.id;
    const quickEmojis = ['❤️','👍','😂','🎉','😮','😢'];
    const emojiRow = quickEmojis.map(em => `<button class="emoji-cell" data-react="${em}">${em}</button>`).join('');
    let items = `<div class="ctx-emoji-row">${emojiRow}</div>`;
    items += `<button class="ctx-item" data-act="reply">${t('btn_reply')}</button>`;
    if (msg.type !== 'image') items += `<button class="ctx-item" data-act="copy">${t('btn_copy')}</button>`;
    if (isMine && !msg.is_deleted) items += `<button class="ctx-item danger" data-act="delete">${t('btn_delete')}</button>`;
    if (isJack() && !msg.is_deleted) items += `<button class="ctx-item danger" data-act="jack-delete" data-mid="${msg.id}">🛡 ${t('jack_delete')||'Jack 删除'}</button>`;
    menu.innerHTML = items;
    document.body.appendChild(menu);
    menu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
    menu.style.top = Math.min(e.clientY, window.innerHeight - 240) + 'px';
    menu.addEventListener('click', async (ev) => {
      const emBtn = ev.target.closest('[data-react]');
      const it = ev.target.closest('[data-act]');
      if (emBtn) { reactTo(msg.id, emBtn.dataset.react); closeContextMenu(); }
      else if (it) {
        if (it.dataset.act === 'reply') {
          state.pendingReply = { id: msg.id, sender_username: msg.sender_username, content: msg.content, type: msg.type };
          $('#reply-preview-name').textContent = `${t('reply')} ${msg.sender_username}`;
          $('#reply-preview-text').textContent = msg.type === 'image' ? t('type_image') : (msg.content || '').slice(0,60);
          $('#reply-preview').classList.remove('hidden');
          $('#chat-input').focus();
        } else if (it.dataset.act === 'copy') {
          try { await navigator.clipboard.writeText(msg.content); toast(t('toast_copied')); } catch { toast(t('err_action')); }
        } else if (it.dataset.act === 'delete') {
          if (confirm(t('msg_deleted_title'))) { await deleteMessage(msg.id); }
        } else if (it.dataset.act === 'jack-delete') {
          if (confirm(t('confirm_jack_delete') || '确定要删除这条消息？')) {
            try {
              await jackDeleteMessage(Number(it.dataset.mid));
              // remove from local state
              for (const key in state.messagesByConv) {
                state.messagesByConv[key] = state.messagesByConv[key].filter(m => m.id !== Number(it.dataset.mid));
              }
              const row = document.querySelector(`.msg-row[data-msg-id="${it.dataset.mid}"]`);
              if (row) row.remove();
              toast(t('msg_deleted'));
              refreshConversations();
            } catch (e) { toast(e.message); }
          }
        }
        closeContextMenu();
      }
    });
    setTimeout(() => document.addEventListener('click', closeContextMenu, { once: true }), 0);
  }
  function closeContextMenu() { $$('.ctx-menu').forEach(m => m.remove()); }

  async function reactTo(msgId, emoji) {
    if (state.socket && state.socket.emit) state.socket.emit('message:react', { id: msgId, emoji });
    else try { await api(`/messages/${msgId}/react`, { method:'POST', body: { emoji } }); } catch (e) { toast(e.message); }
  }
  async function deleteMessage(id) {
    if (state.socket && state.socket.emit) state.socket.emit('message:delete', { id }, ack => { if (!ack.ok) toast(ack.error || t('err_action')); });
    else try { await api(`/messages/${id}`, { method: 'DELETE' }); } catch (e) { toast(e.message); }
  }
  function openLightbox(src) {
    const lb = $('#lightbox');
    lb.innerHTML = `<img src="${escapeHtml(src)}" alt="" />`;
    lb.classList.remove('hidden');
    lb.onclick = () => lb.classList.add('hidden');
  }

  // ---------- search ----------
  let searchT = null, searchIndex = -1, searchResults = [];
  function initSearch() {
    const input = $('#search-input');
    if (!input) return;
    let dropdown = $('#search-suggestions');
    if (!dropdown) {
      const s = input.closest('.search');
      dropdown = document.createElement('div');
      dropdown.id = 'search-suggestions';
      dropdown.className = 'search-suggestions hidden';
      s.appendChild(dropdown);
    }
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      clearTimeout(searchT);
      if (!q) { hideSuggestions(); return; }
      searchT = setTimeout(() => doSmartSearch(q), 200);
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) hideSuggestions(); });
  }
  function hideSuggestions() {
    const d = $('#search-suggestions');
    if (d) d.classList.add('hidden');
    searchIndex = -1;
  }
  async function doSmartSearch(q) {
    const dropdown = $('#search-suggestions');
    dropdown.innerHTML = `<div class="suggestion-hint">${t('loading')}…</div>`;
    dropdown.classList.remove('hidden');
    try {
      const r = await api(`/users/search?q=${encodeURIComponent(q)}`);
      searchResults = r.users || [];
      showSuggestions(searchResults);
    } catch(e) {
      dropdown.innerHTML = `<div class="suggestion-hint">${escapeHtml(e.message)}</div>`;
    }
  }
  function showSuggestions(users) {
    const dropdown = $('#search-suggestions');
    if (!users.length) { dropdown.innerHTML = `<div class="suggestion-hint">${t('empty')}</div>`; return; }
    dropdown.innerHTML = '';
    for (const u of users) {
      const isFriend = state.friends.some(f=>f.id===u.id);
      const bg = avatarStyle(u);
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<div class="avatar sm"${bg ? ` style="${bg}"` : ''}>${avatarInner(u)}</div>
        <div class="meta"><div class="name">${escapeHtml(u.username)}</div></div>
        <div class="action-tag ${isFriend?'friend':''}">${isFriend?t('btn_msg'):t('new_msg')}</div>`;
      item.addEventListener('click', () => {
        hideSuggestions(); $('#search-input').value = '';
        if (isFriend) openChat('user', u.id, u.username, 0);
        else { $('#add-friend-username').value = u.username; openModal('modal-add-friend'); setTimeout(()=>$('#add-friend-username').focus(),80); }
      });
      dropdown.appendChild(item);
    }
  }

  // ---------- profile ----------
  function openProfileModal(user) {
    const isMe = user.id === state.user.id;
    $('#profile-title').textContent = isMe ? t('profile_title') : user.username;
    const bg = user.avatar_color ? `background:linear-gradient(135deg, ${user.avatar_color}, ${shade(user.avatar_color, -25)})` : '';
    const online = isOnline(user.id);
    $('#profile-body').innerHTML = `<div class="profile-head">
      <div class="avatar lg" style="${bg}">${escapeHtml(initials(user.username))}</div>
      <div class="name">${escapeHtml(user.username)} ${online ? `<span style="font-size:11px;color:#15803d;background:rgba(52,199,89,0.14);padding:2px 7px;border-radius:6px;border:1px solid rgba(52,199,89,0.30);font-weight:600;">${t('online')}</span>` : ''}</div>
      <div class="bio">${escapeHtml(user.bio || t('profile_bio_empty'))}</div>
      <div class="profile-actions">
        ${isMe ? `<button class="btn btn-primary btn-sm" id="btn-edit-profile">${t('btn_edit')}</button>
                 <button class="btn btn-danger btn-sm" id="btn-profile-logout">${t('btn_logout')}</button>`
                : `<button class="btn btn-primary btn-sm" id="btn-msg-friend">${t('btn_msg')}</button>`}
      </div></div>`;
    if (isMe) {
      $('#btn-edit-profile')?.addEventListener('click', openProfileEdit);
      $('#btn-profile-logout')?.addEventListener('click', () => {
        if (confirm(t('confirm_logout') || '确定要退出登录？')) { closeModal('modal-profile'); logout(); }
      });
    }
    else $('#btn-msg-friend')?.addEventListener('click', () => { closeModal('modal-profile'); openChat('user', user.id, user.username, 0); });
    openModal('modal-profile');
  }
  function openProfileEdit() {
    const current = state.user.avatar_color || '#5eead4';
    const initial = state.user.username.charAt(0).toUpperCase();
    // Avatar color is set at registration and is not user-editable.
    const previewStyle = `background:linear-gradient(135deg, ${current}, ${shade(current, -25)});`;
    const previewInner = escapeHtml(initials(state.user.username));
    $('#profile-body').innerHTML = `<form id="form-edit-profile">
      <div class="profile-head"><div class="avatar lg" id="edit-avatar-preview" style="${previewStyle}">${previewInner}</div></div>

      <div class="field" style="text-align:center;color:var(--muted);font-size:12px;">
        ${lang==='zh' ? '头像颜色在注册时随机分配，不可修改' : 'Avatar color is set at registration and is read-only'}
      </div>

      <label class="field"><span class="field-label">${t('profile_username')}</span><input id="edit-username" type="text" value="${escapeHtml(state.user.username)}" maxlength="24" /></label>
      <label class="field"><span class="field-label">${t('profile_bio')}</span><textarea id="edit-bio" rows="3" maxlength="200" placeholder="${t('profile_bio_ph')}">${escapeHtml(state.user.bio || '')}</textarea></label>
      <div class="modal-msg" id="edit-profile-msg"></div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close="modal-profile">${t('cancel')}</button>
        <button type="submit" class="btn btn-primary">${t('btn_save')}</button>
      </div></form>`;

    $('#form-edit-profile').addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = $('#edit-profile-msg'); msg.classList.remove('ok'); msg.textContent = '';
      const username = $('#edit-username').value.trim();
      const bio = $('#edit-bio').value.trim();
      try {
        const r = await api('/me', { method: 'PUT', body: { username, bio } });
        Object.assign(state.user, r.user);
        localStorage.setItem('vve:user', JSON.stringify(state.user));
        renderTopbarAvatar();
        msg.classList.add('ok'); msg.textContent = t('profile_saved');
        setTimeout(() => { closeModal('modal-profile'); openProfileModal(state.user); }, 600);
      } catch (err) { msg.textContent = err.message; }
    });
  }

  // ---------- create group ----------
  function openCreateGroup() {
    const picker = $('#group-member-picker');
    const count = $('#group-selected-count');
    count.textContent = `(${t('group_count')} 0)`;
    picker.innerHTML = '';
    if (!state.friends.length) {
      picker.innerHTML = `<div class="empty-hint small"><p>${t('empty')}</p></div>`;
    } else {
      for (const f of state.friends) {
        const row = document.createElement('div'); row.className = 'member-pick'; row.dataset.id = f.id;
        const bg = f.avatar_color ? `background:linear-gradient(135deg, ${f.avatar_color}, ${shade(f.avatar_color, -25)})` : '';
        row.innerHTML = `<div class="avatar sm" style="${bg}">${escapeHtml(initials(f.username))}</div>
          <div class="meta"><div class="name">${escapeHtml(f.username)}</div></div>
          <div class="check">✓</div>`;
        row.addEventListener('click', () => {
          row.classList.toggle('selected');
          count.textContent = `(${t('group_count')} ${$$('#group-member-picker .member-pick.selected').length})`;
        });
        picker.appendChild(row);
      }
    }
    $('#group-name').value = ''; $('#create-group-msg').textContent = '';
    openModal('modal-create-group');
  }

  // ---------- join group ----------
  function openJoinGroup() {
    $('#join-group-input').value = '';
    $('#join-group-results').innerHTML = `<div class="empty-hint"><p>${t('empty')}</p></div>`;
    openModal('modal-join-group');
    setTimeout(() => $('#join-group-input').focus(), 80);
  }
  let joinT = null;
  async function searchGroups(q) {
    if (!q) { $('#join-group-results').innerHTML = `<div class="empty-hint"><p>${t('empty')}</p></div>`; return; }
    try {
      const r = await api(`/groups/search?q=${encodeURIComponent(q)}`);
      renderJoinGroupResults(r.groups || []);
    } catch (e) {
      $('#join-group-results').innerHTML = `<div class="empty-hint"><p>${escapeHtml(e.message)}</p></div>`;
    }
  }
  function renderJoinGroupResults(groups) {
    const wrap = $('#join-group-results');
    if (!groups.length) { wrap.innerHTML = `<div class="empty-hint"><p>${t('empty')}</p></div>`; return; }
    wrap.innerHTML = '';
    for (const g of groups) {
      const li = document.createElement('div');
      li.className = 'list-item'; li.style.cursor = 'default';
      li.innerHTML = `<div class="avatar sm group">${escapeHtml(initials(g.name))}</div>
        <div class="meta"><div class="name">${escapeHtml(g.name)}</div><div class="preview">${g.member_count} ${t('member_sub')}</div></div>
        <button class="btn btn-ok btn-sm" data-join="${g.id}">${t('add')}</button>`;
      wrap.appendChild(li);
    }
    wrap.onclick = async (e) => {
      const b = e.target.closest('[data-join]');
      if (!b) return;
      b.disabled = true;
      const gid = Number(b.dataset.join);
      try {
        await api(`/groups/${gid}/join`, { method: 'POST' });
        await refreshGroups();
        await refreshConversations();
        renderAll();
        closeModal('modal-join-group');
        const g = state.groups.find(x => x.id === gid);
        if (g) openChat('group', g.id, g.name);
        toast(t('ok_joined') + ': ' + (g ? g.name : ''));
      } catch (err) { b.disabled = false; toast(err.message); }
    };
  }

  // ---------- image handling ----------
  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) { toast(t('toast_img_only')); return; }
    if (file.size > 5 * 1024 * 1024) { toast(t('toast_img_too_big')); return; }
    const reader = new FileReader();
    reader.onload = () => {
      state.pendingImage = reader.result;
      $('#img-preview-img').src = reader.result;
      $('#img-preview').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  // ---------- socket ----------
  function connectSocket() {
    if (!state.token) return;
    if (IS_MOCK) {
      const s = window.__mockBackend.socketConnect(state.token);
      state.socket = s;
      bindSocketEvents(s);
      return;
    }
    const s = io(API_BASE, { auth:{token: state.token}, transports:['websocket','polling'] });
    state.socket = s;
    bindSocketEvents(s);
  }
  function bindSocketEvents(s) {
    s.on('connect', () => { hideOffline(); if (state.currentChat) loadMessages().then(renderMessages); refreshConversations(); });
    s.on('disconnect', () => showOffline());
    s.on('message:new', onSocketMessage);
    s.on('message:deleted', onMessageDeleted);
    s.on('message:read', onMessageRead);
    s.on('typing:start', onTypingStart);
    s.on('typing:stop', onTypingStop);
    s.on('user:presence', onUserPresence);
    s.on('user:updated', onUserUpdated);
    s.on('friend:request', onFriendRequest);
    s.on('friend:request:resolved', onRequestResolved);
    s.on('friend:added', onFriendAdded);
    s.on('group:added', onGroupAdded);
    s.on('group:renamed', ({ groupId, name }) => {
      const g = state.groups.find(x => x.id === groupId);
      if (g) g.name = name;
      if (state.currentChat && state.currentChat.type === 'group' && state.currentChat.id === groupId) {
        renderChatHeader();
      }
      refreshGroups(); refreshConversations();
    });
  }
  function onSocketMessage(msg) {
    const isMine = msg.sender_id === state.user.id;
    const peerId = currentPeerId(msg);
    const key = convKey(msg.conv_type, msg.conv_type==='user' ? peerId : msg.conv_id);
    const arr = state.messagesByConv[key] || [];
    if (!arr.find(x => x.id === msg.id)) arr.push(msg);
    state.messagesByConv[key] = arr;
    if (!isMine) {
      const inChat = state.currentChat && state.currentChat.type===msg.conv_type &&
        ((msg.conv_type==='user' && state.currentChat.id===peerId) ||
         (msg.conv_type==='group' && state.currentChat.id===msg.conv_id));
      if (inChat) { renderMessages(); scrollBottom(); sendReadReceipt(msg); if (lang === 'en') translateVisibleContent(); }
      else refreshConversations();
    } else {
      refreshConversations(); if (lang === 'en') translateVisibleContent();
    }
  }
  function onMessageDeleted({ id, conv_type, conv_id }) {
    const peerId = currentPeerId({conv_id});
    const key = convKey(conv_type, conv_type==='user' ? peerId : conv_id);
    const arr = state.messagesByConv[key] || [];
    const m = arr.find(x => x.id === id);
    if (m) { m.is_deleted = true; m.content = ''; }
    if (state.currentChat && convKey(state.currentChat.type, state.currentChat.id) === key) renderMessages();
    refreshConversations();
  }
  function onMessageRead({ conv_type, conv_id, user_id, last_read_msg_id }) {
    if (user_id === state.user.id) return;
    const peerId = currentPeerId({conv_id});
    const key = convKey(conv_type, conv_type==='user' ? peerId : conv_id);
    const arr = state.messagesByConv[key] || [];
    for (const m of arr) {
      if (m.sender_id === state.user.id && m.id <= last_read_msg_id) {
        if (!m.read_by) m.read_by = [];
        if (!m.read_by.includes(user_id)) m.read_by.push(user_id);
      }
    }
    if (state.currentChat && convKey(state.currentChat.type, state.currentChat.id) === key) renderMessages();
  }
  function onUserPresence({ user_id, online }) {
    if (online) state.online.add(user_id); else state.online.delete(user_id);
    renderChats(); renderContacts();
    if (state.currentChat && state.currentChat.type==='user' && state.currentChat.id===user_id) renderChatHeader();
  }
  function onUserUpdated(u) {
    const f = state.friends.find(f => f.id === u.id);
    if (f) Object.assign(f, u);
    if (state.user && state.user.id === u.id) Object.assign(state.user, u);
    renderContacts();
  }
  function onFriendRequest(req) {
    state.requests.unshift({id:req.id, from_id:req.from.id, from_username:req.from.username, from_avatar:req.from.avatar, created_at:req.created_at});
    state.unreadRequests++; renderBell();
    toast(t('toast_friend_req', req.from.username));
  }
  function onRequestResolved(payload) {
    const r = state.requests.find(x => x.id===payload.id);
    if (r) {
      r.status = payload.accept ? 'accepted' : 'rejected';
      toast(payload.accept ? t('toast_req_accepted') : t('toast_req_rejected'));
      if (payload.accept) refreshFriends().then(refreshConversations);
    }
  }
  function onFriendAdded(u) {
    if (!state.friends.some(f => f.id===u.id)) {
      state.friends.push({id:u.id, username:u.username, avatar:u.avatar, bio:u.bio, avatar_color:u.avatar_color});
      renderContacts(); refreshConversations(); toast(t('toast_new_friend', u.username));
    }
  }
  function onGroupAdded(g) {
    if (!state.groups.some(x => x.id===g.groupId)) {
      state.groups.push({id:g.groupId, name:g.name, is_official:0, owner_id:null});
      renderContacts(); refreshConversations(); toast(t('toast_new_group', g.name));
    }
  }
  function onTypingStart({ conv_type, conv_id, user_id, username }) {
    if (user_id === state.user.id) return;
    const peerId = currentPeerId({conv_id});
    const key = convKey(conv_type, conv_type==='user' ? peerId : conv_id);
    if (state.currentChat && convKey(state.currentChat.type, state.currentChat.id) === key) {
      const existing = state.typingUsers.get(user_id);
      if (existing) clearTimeout(existing.timer);
      const timer = setTimeout(() => onTypingStop({ conv_type, conv_id, user_id }), 4000);
      state.typingUsers.set(user_id, { username, timer });
    }
  }
  function onTypingStop({ conv_type, conv_id, user_id }) {
    const t2 = state.typingUsers.get(user_id);
    if (t2) { clearTimeout(t2.timer); state.typingUsers.delete(user_id); }
  }

  // ---------- refresh ----------
  async function refreshFriends() { try { state.friends = (await api('/friends')).friends || []; } catch { state.friends = []; } }
  async function refreshGroups()  { try { state.groups  = (await api('/groups')).groups   || []; } catch { state.groups  = []; } }
  async function refreshRequests() { try { state.requests = (await api('/friend/requests')).requests || []; } catch { state.requests = []; } }
  async function refreshConversations() { try { state.conversations = (await api('/conversations')).conversations || []; renderChats(); } catch (e) { console.warn('conv refresh failed', e); } }
  async function refreshOnlineStatus() {
    const ids = [...state.friends.map(f => f.id), ...state.groups.map(g => g.id), state.user.id];
    if (!ids.length) return;
    try { const r = await api(`/users/status?ids=${ids.join(',')}`); state.online.clear(); for (const [uid, on] of Object.entries(r.status)) if (on) state.online.add(Number(uid)); } catch {}
  }
  async function refreshAll() {
    await Promise.all([refreshFriends(), refreshGroups(), refreshRequests(), refreshConversations()]);
    await refreshOnlineStatus();
    renderAll();
  }

  // ---------- bootstrap ----------
  function enterApp() {
    showApp();
    bindAppEvents();         // <-- always bind so refresh works
    renderTopbarAvatar();
    connectSocket();
    refreshAll();
  }
  function logout() {
    state.user=null; state.token=null; state.conversations=[]; state.friends=[]; state.groups=[]; state.requests=[];
    state.currentChat=null; state.messagesByConv={}; state.online.clear();
    localStorage.removeItem('vve:token'); localStorage.removeItem('vve:user');
    if (state.socket) state.socket.disconnect();
    showAuth();
    showSplashAgain();   // bring back the big-Hello splash on logout
  }
  function tryRestore() {
    const t = localStorage.getItem('vve:token');
    const u = localStorage.getItem('vve:user');
    if (t && u) { try { state.token=t; state.user=JSON.parse(u); enterApp(); } catch (e) { showAuth(); } }
    else showAuth();
  }

  // ---------- bind events ----------
  function bindAppEvents() {
    // theme toggle (light / dark / system)
    const tt = $('#btn-theme-toggle');
    if (tt) tt.addEventListener('click', () => {
      const current = localStorage.getItem('vve:theme') || 'auto';
      const next = current === 'light' ? 'dark' : current === 'dark' ? 'auto' : 'light';
      applyTheme(next);
      try { localStorage.setItem('vve:theme', next); } catch (_) {}
      if (window.toast) toast(next === 'auto' ? '跟随系统' : next === 'dark' ? '已切换到深色' : '已切换到浅色');
    });

    // language toggle button in main app topbar
    $$('#lang-btn-top').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setLang(lang === 'zh' ? 'en' : 'zh'); }));

    // tabs
    $$('.tabbar .tab2').forEach(btn => btn.addEventListener('click', () => {
      $$('.tabbar .tab2').forEach(b => b.classList.toggle('active', b === btn));
      const target = btn.dataset.pane;
      $$('.pane').forEach(p => p.classList.toggle('active', p.id === `pane-${target}`));
      if (target === 'contacts') renderContacts();
      if (target === 'discover') refreshRecommended();
    }));
    $('#btn-create-board')?.addEventListener('click', openCreateBoard);

    initSearch();

    // lang toggle
    $$('.lang-toggle').forEach(b => b.addEventListener('click', () => setLang(lang === 'zh' ? 'en' : 'zh')));

    // safety net: event delegation on topbar-right for all icon-btns
    // (handles the case where direct addEventListener somehow misses — e.g. on older WebKit)
    $('.topbar-right')?.addEventListener('click', (e) => {
      const btn = e.target.closest('button.icon-btn');
      if (!btn) return;
      if (btn._handled) return;     // already handled by direct listener
      // dispatch fallback
      if (btn.id === 'btn-profile') openProfileModal(state.user);
      else if (btn.id === 'btn-bell') { renderBell(); openModal('modal-bell'); }
      else if (btn.id === 'btn-plus') openModal('modal-plus');
      else if (btn.id === 'btn-logout') logout();
      else if (btn.id === 'btn-admin') {};  // (deprecated) Jack-only mode: no topbar admin button
    }, true);

    // chat header
    $('#chat-back')?.addEventListener('click', () => {
      state.currentChat = null;
      $('#chat-window').classList.add('hidden');
      $('#chat-empty').classList.remove('hidden');
      if (window.innerWidth <= 820) {
        $('.app-body')?.classList.remove('chat-open');
        $('#chat-back')?.classList.remove('mobile-show');
        $('.right-pane')?.classList.remove('mobile-show');
      }
      renderChats();
    });
    $('#chat-refresh')?.addEventListener('click', async () => {
      if (!state.currentChat) return;
      const btn = $('#chat-refresh');
      btn.style.transform = 'rotate(360deg)';
      btn.style.transition = 'transform 0.5s';
      await loadMessages(); renderMessages(); scrollBottom();
      setTimeout(() => { btn.style.transform = ''; btn.style.transition = ''; }, 500);
    });
    $('#chat-info')?.addEventListener('click', async () => {
      if (!state.currentChat) return;
      if (state.currentChat.type !== 'group') {
        const f = state.friends.find(f => f.id === state.currentChat.id);
        if (f) openProfileModal(f);
        return;
      }
      openGroupInfoModal();
    });

    // composer
    $('#chat-composer')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (state.pendingImage) { sendMessage(state.pendingImage, { type: 'image' }); $('#chat-input').value = ''; return; }
      const v = $('#chat-input').value.trim();
      if (!v) return;
      $('#chat-input').value = '';
      sendMessage(v);
    });
    $('#reply-preview-cancel')?.addEventListener('click', () => { state.pendingReply = null; $('#reply-preview').classList.add('hidden'); });
    $('#img-preview-cancel')?.addEventListener('click', () => { state.pendingImage = null; $('#img-preview').classList.add('hidden'); });
    $('#chat-input')?.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const it of items) {
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          const blob = it.getAsFile();
          if (blob) { e.preventDefault(); handleImageFile(blob); return; }
        }
      }
    });
    $('#attach-btn')?.addEventListener('click', () => $('#img-input').click());
    $('#img-input')?.addEventListener('change', (e) => { const f = e.target.files[0]; if (f) handleImageFile(f); e.target.value = ''; });

    // emoji picker (simplified)
    const EMOJIS = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗','😙','😚','🙂','🤗','🤩','🤔','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓','👍','👎','👌','✌️','🤞','🤟','🤘','👏','🙌','🙏','💪','❤️','🧡','💛','💚','💙','💜','🖤','🤍','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','🔥','✨','🎉','🎊','💯','💢','💥','💫','💦','💨'];
    $('#emoji-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      const p = $('#emoji-picker');
      if (p.classList.contains('hidden')) {
        p.innerHTML = `<div class="emoji-grid" style="grid-template-columns:repeat(8,1fr);">${EMOJIS.map(em => `<button class="emoji-cell" data-em="${em}">${em}</button>`).join('')}</div>`;
        p.classList.remove('hidden');
        p.onclick = (ev) => {
          const c = ev.target.closest('.emoji-cell');
          if (c) { const i = $('#chat-input'); i.value += c.dataset.em; i.focus(); }
        };
      } else { p.classList.add('hidden'); }
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('#emoji-picker') && !e.target.closest('#emoji-btn')) $('#emoji-picker')?.classList.add('hidden'); });

    // profile
    $('#btn-profile')?.addEventListener('click', (e) => { e.currentTarget._handled = true; openProfileModal(state.user); });

    // logout
    $('#btn-logout')?.addEventListener('click', (e) => { e.currentTarget._handled = true; logout(); });

    // Root console (Jack only)
    initRootConsole();

    // admin (deprecated old key system) — Jack-only mode uses regular auth
    // admin wipe button in chat header (Jack only)
    $('#chat-admin-wipe')?.addEventListener('click', async () => {
      if (!state.currentChat || state.currentChat.type !== 'group') return;
      if (!confirm(t('confirm_wipe_official') || '确定清空本群所有消息？此操作不可恢复！')) return;
      try {
        const r = await jackWipeGroup(state.currentChat.id);
        toast(t('wiped') + ' ' + r.deleted);
        // clear local cache
        state.messagesByConv[convKey('group', state.currentChat.id)] = [];
        renderMessages();
        refreshConversations();
      } catch (e) { toast(e.message); }
    });

    // ULTIMATE FALLBACK: document-level click delegation by data-action.
    // If anything above somehow missed, this still works.
    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-action]');
      if (!t) return;
      const act = t.dataset.action;
      if (act === 'open-admin') { /* deprecated */ e.preventDefault(); }
    });

    // plus menu (magnifier)
    $('#btn-plus')?.addEventListener('click', (e) => { e.currentTarget._handled = true; openModal('modal-plus'); });
    $$('#modal-plus .plus-action').forEach(btn => btn.addEventListener('click', () => {
      const act = btn.dataset.action;
      closeModal('modal-plus');
      if (act === 'friend') {
        $('#add-friend-username').value = ''; $('#add-friend-msg').textContent = '';
        openModal('modal-add-friend');
        setTimeout(() => $('#add-friend-username').focus(), 80);
      } else if (act === 'group') openCreateGroup();
      else if (act === 'join-group') openJoinGroup();
    }));

    // join group search
    $('#join-group-input')?.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      clearTimeout(joinT);
      if (!q) { $('#join-group-results').innerHTML = `<div class="empty-hint"><p>${t('empty')}</p></div>`; return; }
      joinT = setTimeout(() => searchGroups(q), 200);
    });

    // bell
    $('#btn-bell')?.addEventListener('click', (e) => { e.currentTarget._handled = true; renderBell(); openModal('modal-bell'); });
    $('#bell-list')?.addEventListener('click', async (e) => {
      const btn = e.target.closest('button[data-act]');
      if (!btn) return;
      const id = Number(btn.dataset.id), accept = btn.dataset.act === 'accept';
      btn.disabled = true;
      try {
        await api('/friend/respond', { method: 'POST', body: { requestId: id, accept } });
        state.requests = state.requests.filter(r => r.id !== id);
        renderBell();
        if (accept) { await refreshFriends(); await refreshConversations(); renderAll(); toast(t('ok_friend_added')); }
        else toast(t('ok_rejected'));
      } catch (err) { toast(err.message); btn.disabled = false; }
    });

    // add friend form
    $('#form-add-friend')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = $('#add-friend-username').value.trim();
      const msg = $('#add-friend-msg'); msg.classList.remove('ok'); msg.textContent = '';
      if (!username) { msg.textContent = t('err_username_required'); return; }
      try {
        const r = await api('/friend/request', { method: 'POST', body: { toUsername: username } });
        msg.classList.add('ok');
        msg.textContent = r.autoAccepted ? t('ok_auto_friend') : t('ok_request_sent');
        if (r.autoAccepted) { await refreshFriends(); await refreshConversations(); renderAll(); setTimeout(() => closeModal('modal-add-friend'), 900); }
        else setTimeout(() => closeModal('modal-add-friend'), 1500);
      } catch (err) { msg.textContent = err.message; }
    });

    // create group form
    $('#form-create-group')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = $('#group-name').value.trim();
      const msg = $('#create-group-msg'); msg.classList.remove('ok'); msg.textContent = '';
      const selected = $$('#group-member-picker .member-pick.selected').map(el => Number(el.dataset.id));
      if (!name) { msg.textContent = t('err_group_create_name'); return; }
      if (selected.length < 1) { msg.textContent = t('err_group_create_min'); return; }
      try {
        const r = await api('/groups', { method: 'POST', body: { name, memberIds: selected } });
        msg.classList.add('ok'); msg.textContent = t('ok_group_created');
        await refreshGroups(); await refreshConversations(); renderAll();
        setTimeout(() => { closeModal('modal-create-group'); openChat('group', r.group.id, r.group.name, 0); }, 600);
      } catch (err) { msg.textContent = err.message; }
    });

    // modal close
    $$('[data-close]').forEach(el => el.addEventListener('click', () => closeModal(el.dataset.close)));
    $$('.modal-mask').forEach(el => el.addEventListener('click', (e) => { if (e.target.closest('.modal')) closeModal(e.target.closest('.modal').id); }));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { $$('.modal:not(.hidden)').forEach(m => closeModal(m.id)); $('#emoji-picker')?.classList.add('hidden'); } });
  }

  // ---------- init ----------
  function init() {
    try {
      setLang(lang);
      switchAuthTab('login');
      initSplash();         // show full-screen Hello before auth (skipped if logged in)
      startHelloCycler();   // animate the auth tagline across languages
      $$('.lang-toggle, .lang-btn').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); setLang(lang === 'zh' ? 'en' : 'zh'); }));
      $$('.auth-card .tab').forEach(t => t.addEventListener('click', () => switchAuthTab(t.dataset.tab)));
      $('#auth-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = $('#auth-username').value.trim();
        const password = $('#auth-password').value;
        const msgEl = $('#auth-msg');
        msgEl.classList.remove('ok'); msgEl.textContent = '';
        if (!username || !password) { msgEl.textContent = t('auth_err_fill'); return; }
        const btn = $('#auth-submit');
        const orig = btn.textContent;
        btn.disabled = true;
        btn.textContent = authMode === 'login' ? t('auth_loading_login') : t('auth_loading_register');
        try {
          const data = await api(authMode === 'login' ? '/login' : '/register', { method: 'POST', body: { username, password } });
          state.user = data.user; state.token = data.token;
          localStorage.setItem('vve:token', state.token);
          localStorage.setItem('vve:user', JSON.stringify(state.user));
          msgEl.classList.add('ok');
          msgEl.textContent = authMode === 'login' ? t('auth_ok_login') : t('auth_ok_register');
          btn.textContent = '✓';
          setTimeout(() => { enterApp(); }, 300);
        } catch (err) {
          msgEl.textContent = err.message;
          btn.textContent = orig;
        } finally { btn.disabled = false; }
      });
      tryRestore();
    } catch (e) {
      console.error('VVeChat init error:', e);
      document.body.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap;">Init error:\n${e.stack || e.message}</pre>`;
    }
  }

  // ============================================================
  // Hello cycler — cycles "Hello" in different languages
  // like Apple's "Hello" boot screen
  // ============================================================
  const HELLOS = [
    { lang: 'zh', text: '你好' },
    { lang: 'en', text: 'Hello' },
    { lang: 'ja', text: 'こんにちは' },
    { lang: 'ko', text: '안녕하세요' },
    { lang: 'fr', text: 'Bonjour' },
    { lang: 'es', text: 'Hola' },
    { lang: 'de', text: 'Hallo' },
    { lang: 'it', text: 'Ciao' },
    { lang: 'pt', text: 'Olá' },
    { lang: 'ru', text: 'Привет' },
    { lang: 'ar', text: 'مرحبا' },
    { lang: 'hi', text: 'नमस्ते' },
    { lang: 'th', text: 'สวัสดี' },
    { lang: 'vi', text: 'Xin chào' },
  ];
  function startHelloCycler() {
    const el = $('#hello-cycler');
    if (el) { runCycler(el, 2200); }
    const big = $('#hello-splash-cycler');
    if (big) { runCycler(big, 2200); }
  }
  function runCycler(el, interval) {
    let idx = 0;
    const show = () => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        el.textContent = HELLOS[idx % HELLOS.length].text;
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        idx++;
      }, 250);
    };
    show();
    setInterval(show, interval);
  }

  // ============================================================
  // Hello splash — full-screen greeting shown on first visit /
  // after logout. Click anywhere to dismiss and reveal auth.
  // ============================================================
  let splashDismissed = false;
  function initSplash() {
    const splash = $('#hello-splash');
    if (!splash) return;
    // If user is already restored (has token), skip the splash.
    try {
      const hasSession = localStorage.getItem('vve:token') && localStorage.getItem('vve:user');
      if (hasSession) { splash.classList.add('hidden'); splashDismissed = true; return; }
    } catch (_) {}
    const dismiss = () => {
      if (splashDismissed) return;
      splashDismissed = true;
      splash.classList.add('hello-splash-out');
      setTimeout(() => splash.remove(), 500);
    };
    splash.addEventListener('click', dismiss);
    splash.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') dismiss(); });
    splash.focus();
  }
  function showSplashAgain() {
    // Called on logout — re-create the splash overlay
    splashDismissed = false;
    let splash = $('#hello-splash');
    if (splash) return; // already there
    splash = document.createElement('div');
    splash.id = 'hello-splash';
    splash.className = 'hello-splash';
    splash.setAttribute('role', 'button');
    splash.setAttribute('tabindex', '0');
    splash.innerHTML = `<div class="hello-splash-inner">
      <p id="hello-splash-cycler" class="hello-splash-text">${HELLOS[0].text}</p>
      <p class="hello-splash-hint">${lang === 'zh' ? '（点击任意一处开始使用）' : '(Tap anywhere to start)'}</p>
    </div>`;
    document.body.insertBefore(splash, document.body.firstChild);
    initSplash();
    if (!$('#hello-splash-cycler').dataset.cycling) {
      $('#hello-splash-cycler').dataset.cycling = '1';
      runCycler($('#hello-splash-cycler'), 2200);
    }
  }

  // ============================================================
  // start
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
