/**
 * Horizon Theme for CF-Server-Monitor
 * Flat & Clean Precision Minimalist Dashboard Style
 */

// ==================== 1. 多语言字典与常量 ====================
const I18N = {
  'zh-CN': {
    siteTitle: 'Horizon 监控面板',
    fleetWorth: '小鸡价值',
    fleetWorthSub: '共 {count} 台 · 剩余折合 ¥ {rem}',
    onlineNodes: '当前在线',
    onlineRatio: '在线率 {pct}% · 共 {total} 台',
    totalTraffic: '流量数据',
    totalTrafficSub: '下行 {rx} · 上行 {tx}',
    netSpeed: '网络速率',
    groupAll: '全部',
    groupUngrouped: '未分组',
    searchPlaceholder: '搜索节点、分组、系统或地区',
    emptyTitle: '没有匹配的服务器',
    emptyDesc: '可以尝试切换分类标签或修改搜索关键词。',
    online: '在线',
    offline: '离线',
    loading: '载入中',
    connecting: '连接中',
    live: '实时推送',
    polling: '轮询模式',
    disconnected: '连接断开',
    free: '免费',
    notSet: '未设置',
    daysLeft: '余{days}天',
    expired: '已过期',
    permanent: '永久',
    remainingWorth: '剩余价值',
    rate: '速率',
    traffic: '流量',
    activity: '活跃',
    valuation: '价值',
    cpu: 'CPU',
    ram: 'RAM',
    disk: 'Disk',
    swap: 'Swap',
    latency: '延迟',
    uptime: '运行时间',
    lastReport: '最后上报',
    panelSystem: '系统与硬件',
    panelMemory: '内存与存储',
    panelNetwork: '网络与连接',
    specCpu: 'CPU 型号',
    specCoresArch: '核心与架构',
    specOsKernel: '操作系统',
    specUptime: '运行时间',
    specLastUpdated: '最后上报',
    specNetSpeed: '当前速率',
    specTrafficMonth: '本月流量',
    specTrafficTotal: '累计总流量',
    specConns: '网络连接',
    specProcesses: '活跃进程',
    tabLoad: '系统负载',
    tabNetwork: '网络速率',
    tabPing: '延迟与丢包',
    tabDisk: '磁盘IO',
    h1: '1小时',
    h6: '6小时',
    h12: '12小时',
    h24: '24小时',
    h48: '2天',
    h96: '4天',
    h168: '7天',
    chartNoData: '暂无历史指标数据',
    ct: '电信',
    cu: '联通',
    cm: '移动',
    bd: 'BGP',
    read: '读取',
    write: '写入',
    speedIn: '下行速率',
    speedOut: '上行速率',
    back: '返回列表',
    admin: '管理后台',
    toggleTheme: '切换日间/夜间模式',
    unlimited: '无限制'
  },
  'en-US': {
    siteTitle: 'Horizon Monitor',
    fleetWorth: 'Fleet Valuation',
    fleetWorthSub: '{count} nodes · Remaining ¥ {rem}',
    onlineNodes: 'Online Nodes',
    onlineRatio: '{pct}% online · {total} total',
    totalTraffic: 'Total Traffic',
    totalTrafficSub: 'Down {rx} · Up {tx}',
    netSpeed: 'Network Speed',
    groupAll: 'All',
    groupUngrouped: 'Ungrouped',
    searchPlaceholder: 'Search node, group, OS, or region',
    emptyTitle: 'No matching servers found',
    emptyDesc: 'Try selecting a different group or refining search keywords.',
    online: 'Online',
    offline: 'Offline',
    loading: 'Loading',
    connecting: 'Connecting',
    live: 'Realtime',
    polling: 'Polling',
    disconnected: 'Disconnected',
    free: 'Free',
    notSet: 'Not Set',
    daysLeft: '{days}d left',
    expired: 'Expired',
    permanent: 'Lifetime',
    remainingWorth: 'Remaining Worth',
    rate: 'Speed',
    traffic: 'Traffic',
    activity: 'Active',
    valuation: 'Value',
    cpu: 'CPU',
    ram: 'RAM',
    disk: 'Disk',
    swap: 'Swap',
    latency: 'Latency',
    uptime: 'Uptime',
    lastReport: 'Last Report',
    panelSystem: 'System & Specs',
    panelMemory: 'Memory & Storage',
    panelNetwork: 'Network & Traffic',
    specCpu: 'CPU Model',
    specCoresArch: 'Cores & Arch',
    specOsKernel: 'Operating System',
    specUptime: 'System Uptime',
    specLastUpdated: 'Last Updated',
    specNetSpeed: 'Network Speed',
    specTrafficMonth: 'Monthly Traffic',
    specTrafficTotal: 'Cumulative Traffic',
    specConns: 'Connections',
    specProcesses: 'Processes',
    tabLoad: 'System Load',
    tabNetwork: 'Network Speed',
    tabPing: 'Latency & Loss',
    tabDisk: 'Disk IO',
    h1: '1h',
    h6: '6h',
    h12: '12h',
    h24: '24h',
    h48: '2d',
    h96: '4d',
    h168: '7d',
    chartNoData: 'No metric data available',
    ct: 'CT',
    cu: 'CU',
    cm: 'CM',
    bd: 'BGP',
    read: 'Read',
    write: 'Write',
    speedIn: 'Inbound',
    speedOut: 'Outbound',
    back: 'Back to List',
    admin: 'Admin',
    toggleTheme: 'Toggle Day/Night Mode',
    unlimited: 'Unlimited'
  }
};

const LANG = navigator.language && navigator.language.startsWith('zh') ? 'zh-CN' : 'zh-CN';
const t = (key, params = {}) => {
  let str = (I18N[LANG] && I18N[LANG][key]) || I18N['zh-CN'][key] || key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
};

// ==================== 2. 全局状态 State ====================
const state = {
  config: null,
  servers: [],
  serversMap: new Map(),
  stats: { total: 0, online: 0, offline: 0, globalSpeedIn: 0, globalSpeedOut: 0, globalNetTx: 0, globalNetRx: 0 },
  regionStats: {},
  sysConfig: {},
  selectedGroup: 'ALL',
  searchQuery: '',
  themeMode: localStorage.getItem('horizon_appearance') === 'light' ? 'light' : 'dark',
  currentRoute: { view: 'home', serverId: null },
  detailServer: null,
  detailHours: 24,
  detailTab: 'load',
  detailHistory: [],
  detailHiddenSeries: new Set(),
  wsState: 'connecting',
  isDemoMode: false,
  fxRates: {
    base: 'EUR',
    rates: { CNY: 7.8, USD: 1.08, HKD: 8.45, TWD: 34.5, JPY: 165.0, GBP: 0.85, EUR: 1.0 },
    loaded: false
  },
  lastWsMessageTime: 0
};

// ==================== 3. 基础工具函数 ====================
function safeNum(v, fallback = 0) {
  if (v == null || v === '' || v === false) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function calcPct(used, total) {
  const u = safeNum(used, 0);
  const t = safeNum(total, 0);
  if (!t || t <= 0) return 0;
  return clamp((u / t) * 100, 0, 100);
}

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
function fmtBytes(n, digits = 1) {
  const v = safeNum(n, 0);
  if (v === 0) return '0 B';
  let val = Math.abs(v);
  let i = 0;
  while (val >= 1024 && i < BYTE_UNITS.length - 1) {
    val /= 1024;
    i++;
  }
  const text = i === 0 ? String(Math.round(val)) : val.toFixed(digits);
  return `${v < 0 ? '-' : ''}${text} ${BYTE_UNITS[i]}`;
}

function fmtSpeed(n) {
  return fmtBytes(n, 1) + '/s';
}

function fmtMB(mb, digits = 1) {
  const v = safeNum(mb, 0);
  if (v >= 1024) return fmtBytes(v * 1024 * 1024, digits);
  return `${Math.round(v)} MB`;
}

// 格式化金额 (无多余的小数尾数)
function fmtPrice(amount, currency = '¥') {
  const n = safeNum(amount, 0);
  if (n === 0) return '0';
  const val = Math.round(n);
  return `${currency}${val}`;
}

// 流量限制字符串智能换算 (5000GB -> 5 TB / 4.9 TB, 1000GB -> 1 TB)
function parseTrafficBytes(val) {
  if (!val || val === '0' || val === 0) return 0;
  if (typeof val === 'number') return val;
  const s = String(val).trim().toUpperCase();
  const num = parseFloat(s);
  if (isNaN(num)) return 0;
  if (s.endsWith('PB') || s.endsWith('P')) return num * 1024 * 1024 * 1024 * 1024 * 1024;
  if (s.endsWith('TB') || s.endsWith('T')) return num * 1024 * 1024 * 1024 * 1024;
  if (s.endsWith('GB') || s.endsWith('G')) return num * 1024 * 1024 * 1024;
  if (s.endsWith('MB') || s.endsWith('M')) return num * 1024 * 1024;
  if (s.endsWith('KB') || s.endsWith('K')) return num * 1024;
  return num;
}

function fmtTrafficLimit(val) {
  const bytes = parseTrafficBytes(val);
  if (bytes <= 0) return '无限制';
  return fmtBytes(bytes, 1);
}

// 紧凑且精准的 RAM/Disk 详情格式 (例如 2.0G / 3.8G)
function fmtSizeDetail(usedMB, totalMB) {
  const u = safeNum(usedMB, 0);
  const t = safeNum(totalMB, 0);
  if (!t) return '--';
  if (t >= 1024) {
    const uG = (u / 1024).toFixed(1);
    const tG = (t / 1024).toFixed(1);
    return `${uG}G / ${tG}G`;
  }
  return `${Math.round(u)}M / ${Math.round(t)}M`;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function fmtDateTime(ts) {
  if (!ts) return '--';
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function fmtDuration(seconds) {
  const sec = Math.max(0, Math.floor(safeNum(seconds, 0)));
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  if (days > 0) return `${days}天 ${hours}时`;
  if (hours > 0) return `${hours}时 ${minutes}分`;
  return `${minutes}分`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isServerOnline(server) {
  if (!server) return false;
  if (typeof server.is_online === 'boolean') return server.is_online;
  const last = safeNum(server.last_updated || server.timestamp);
  if (!last) return false;
  const interval = safeNum(server.report_interval, 60);
  const threshold = Math.max(interval * 2500, 300000);
  return (Date.now() - last) <= threshold;
}

// ==================== 4. API Client & Turnstile 鉴权 ====================
function getApiBase() {
  const meta = document.querySelector('meta[name="apiBase"]');
  if (meta && meta.content) {
    const first = meta.content.split(',')[0].trim();
    if (first) return first.replace(/\/+$/, '');
  }
  if (window.__API_BASE__) {
    return String(window.__API_BASE__).replace(/\/+$/, '');
  }
  return window.location.origin;
}

const API_BASE = getApiBase();
const CRED_KEY = 'probe_ts_cred';

function getAuthToken() {
  try {
    return localStorage.getItem('jwt_token') || localStorage.getItem('token');
  } catch {
    return null;
  }
}

function loadTurnstileCred() {
  try {
    const raw = localStorage.getItem(CRED_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj.value || Date.now() - obj.savedAt > 55 * 60 * 1000) {
      localStorage.removeItem(CRED_KEY);
      return null;
    }
    return obj.value;
  } catch {
    return null;
  }
}

function saveTurnstileCred(val) {
  try {
    localStorage.setItem(CRED_KEY, JSON.stringify({ value: val, savedAt: Date.now() }));
  } catch {}
}

function authHeaders() {
  const headers = {};
  const token = getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const cred = loadTurnstileCred();
  if (cred) headers['X-Turnstile-Verified'] = cred;
  return headers;
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { ...authHeaders(), ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers });
  if (res.status === 403 && state.config && state.config.turnstile_enabled && !options._retried) {
    await ensureTurnstile();
    return request(path, { ...options, _retried: true });
  }
  if (!res.ok) {
    let errData = null;
    try { errData = await res.json(); } catch {}
    const err = new Error((errData && (errData.error || errData.message)) || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

let _tsScriptPromise = null;
function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve();
  if (_tsScriptPromise) return _tsScriptPromise;
  _tsScriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Turnstile script load error'));
    document.head.append(s);
  });
  return _tsScriptPromise;
}

let _tsVerifyPromise = null;
async function ensureTurnstile() {
  if (loadTurnstileCred()) return;
  if (_tsVerifyPromise) return _tsVerifyPromise;

  _tsVerifyPromise = (async () => {
    const siteKey = state.config?.turnstile_site_key;
    if (!siteKey) return;
    await loadTurnstileScript();

    await new Promise((resolve, reject) => {
      const root = document.getElementById('overlay-root') || document.body;
      const overlay = document.createElement('div');
      overlay.className = 'probe-overlay';
      overlay.innerHTML = `
        <div class="probe-dialog">
          <div class="probe-dialog-title">安全验证</div>
          <div class="probe-dialog-desc">站点已开启人机验证，请完成下方验证后查看探针数据。</div>
          <div class="ts-holder" id="ts-widget-holder"></div>
          <div class="probe-dialog-err" id="ts-err-box"></div>
        </div>
      `;
      root.appendChild(overlay);

      const holder = overlay.querySelector('#ts-widget-holder');
      const errBox = overlay.querySelector('#ts-err-box');

      try {
        window.turnstile.render(holder, {
          sitekey: siteKey,
          theme: state.themeMode === 'dark' ? 'dark' : 'light',
          callback: async (token) => {
            try {
              const res = await fetch(`${API_BASE}/api/config`, {
                headers: { 'X-Turnstile-Token': token, ...authHeaders() }
              });
              const data = await res.json();
              if (data.turnstile_verified) saveTurnstileCred(data.turnstile_verified);
              state.config = data;
              overlay.remove();
              resolve();
            } catch (e) {
              errBox.textContent = '验证失败，请重试';
              try { window.turnstile.reset(); } catch {}
            }
          },
          'error-callback': () => {
            errBox.textContent = '验证组件出错，请刷新重试';
          }
        });
      } catch (e) {
        overlay.remove();
        reject(e);
      }
    });
  })().finally(() => {
    _tsVerifyPromise = null;
  });

  return _tsVerifyPromise;
}

// ==================== 5. WebSocket 实时更新引擎 ====================
class MetricSocket {
  constructor({ scope = 'all', ids = [], onBatch, onState } = {}) {
    this.scope = scope;
    this.ids = ids;
    this.onBatch = onBatch || (() => {});
    this.onState = onState || (() => {});
    this._closed = false;
    this._retry = 0;
    this._ws = null;
    this._timer = null;
    this._pingTimer = null;

    this._onVisibility = () => {
      if (document.visibilityState === 'visible' && !this._closed) {
        if (!this._ws || this._ws.readyState > 1) {
          clearTimeout(this._timer);
          this._retry = 0;
          this._connect();
        }
      }
    };
    document.addEventListener('visibilitychange', this._onVisibility);
    this._connect();
  }

  _url() {
    let wsBase = API_BASE;
    if (wsBase.startsWith('https:')) wsBase = wsBase.replace('https:', 'wss:');
    else if (wsBase.startsWith('http:')) wsBase = wsBase.replace('http:', 'ws:');
    else wsBase = (location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host;
    return `${wsBase}/api/ws?subscribe=${encodeURIComponent(this.scope)}`;
  }

  _connect() {
    if (this._closed) return;
    this.onState('connecting');
    try {
      this._ws = new WebSocket(this._url());
    } catch {
      this._schedule();
      return;
    }

    this._ws.onopen = () => {
      this._retry = 0;
      this.onState('open');
      if (this.scope === 'all' && this.ids.length) this._sendSubscribe();
      this._pingTimer = setInterval(() => this._send({ type: 'ping', ts: Date.now() }), 25000);
    };

    this._ws.onmessage = (ev) => {
      state.lastWsMessageTime = Date.now();
      try {
        const msg = JSON.parse(ev.data);
        if (msg && msg.type === 'batchUpdate') this.onBatch(msg);
      } catch {}
    };

    this._ws.onclose = () => {
      this._cleanupPing();
      if (!this._closed) this._schedule();
    };

    this._ws.onerror = () => {
      try { this._ws?.close(); } catch {}
    };
  }

  _send(obj) {
    if (this._ws && this._ws.readyState === WebSocket.OPEN) {
      this._ws.send(JSON.stringify(obj));
    }
  }

  _sendSubscribe() {
    this._send({ type: 'subscribe', scope: 'all', ids: this.ids.slice(0, 500) });
  }

  setIds(ids) {
    this.ids = ids;
    if (this._ws && this._ws.readyState === WebSocket.OPEN) this._sendSubscribe();
  }

  _schedule() {
    this.onState('closed');
    const delay = Math.min(30000, 1000 * Math.pow(2, this._retry));
    this._retry++;
    this._timer = setTimeout(() => this._connect(), delay);
  }

  _cleanupPing() {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
  }

  close() {
    this._closed = true;
    clearTimeout(this._timer);
    this._cleanupPing();
    document.removeEventListener('visibilitychange', this._onVisibility);
    try { if (this._ws) this._ws.close(); } catch {}
  }
}

// ==================== 6. 汇率与小鸡价值/剩余价值计算 ====================
async function loadExchangeRates() {
  if (state.fxRates.loaded) return;
  try {
    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=EUR', { cache: 'force-cache' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        state.fxRates.rates = { ...data.rates, EUR: 1.0 };
        state.fxRates.loaded = true;
      }
    }
  } catch {}
}

function resolveCurrencyRate(currencySymbol) {
  const sym = String(currencySymbol || '').trim();
  const r = state.fxRates.rates;
  if (sym === '¥' || sym.toUpperCase() === 'CNY' || sym.toUpperCase() === 'RMB') return r.CNY || 7.8;
  if (sym === '$' || sym.toUpperCase() === 'USD') return r.USD || 1.08;
  if (sym === '€' || sym.toUpperCase() === 'EUR') return 1.0;
  if (sym.toUpperCase() === 'HKD' || sym === 'HK$') return r.HKD || 8.45;
  if (sym.toUpperCase() === 'TWD' || sym === 'NT$') return r.TWD || 34.5;
  if (sym.toUpperCase() === 'JPY' || sym === '円') return r.JPY || 165.0;
  if (sym.toUpperCase() === 'GBP' || sym === '£') return r.GBP || 0.85;
  return r.CNY || 7.8;
}

function computeServerMonthlyCost(server) {
  const p = safeNum(server?.price, 0);
  if (p <= 0) return 0;
  const cycle = String(server?.billing_cycle || 'month').toLowerCase().trim();
  if (cycle === 'year' || cycle === '1year' || cycle === '365') return p / 12;
  if (cycle === 'half-year' || cycle === '6month' || cycle === '180') return p / 6;
  if (cycle === 'quarter' || cycle === '3month' || cycle === '90') return p / 3;
  if (cycle === 'two-year' || cycle === '2year' || cycle === '730') return p / 24;
  if (cycle === 'three-year' || cycle === '3year' || cycle === '1095') return p / 36;
  const days = parseInt(cycle, 10);
  if (!isNaN(days) && days > 0) return (p / days) * 30;
  return p;
}

function computeRemainingWorth(server) {
  const p = safeNum(server?.price, 0);
  if (p <= 0 || !server?.expire_date) return null;
  const expTs = new Date(server.expire_date).getTime();
  if (isNaN(expTs)) return null;

  const now = Date.now();
  const diffDays = Math.ceil((expTs - now) / 86400000);
  if (diffDays <= 0) return { days: 0, worth: 0, expired: true };

  const cycle = String(server?.billing_cycle || 'month').toLowerCase().trim();
  let totalDays = 30;
  if (cycle.includes('year') || cycle === '365') totalDays = 365;
  else if (cycle.includes('half') || cycle === '180') totalDays = 182;
  else if (cycle.includes('quarter') || cycle === '90') totalDays = 90;
  else if (parseInt(cycle, 10) > 0) totalDays = parseInt(cycle, 10);

  const dailyRate = p / totalDays;
  const worth = Math.max(0, diffDays * dailyRate);
  return { days: diffDays, worth, expired: false };
}

function summarizeFleetWorth(servers) {
  let totalMonthlyCny = 0;
  let totalRemainingCny = 0;
  let hasPriceCount = 0;
  const cnyRate = state.fxRates.rates.CNY || 7.8;

  for (const s of servers) {
    const p = safeNum(s.price, 0);
    if (p > 0) {
      const monthly = computeServerMonthlyCost(s);
      const curRate = resolveCurrencyRate(s.currency);
      const eurVal = monthly / curRate;
      totalMonthlyCny += eurVal * cnyRate;

      const rem = computeRemainingWorth(s);
      if (rem && !rem.expired && rem.worth > 0) {
        const remEur = rem.worth / curRate;
        totalRemainingCny += remEur * cnyRate;
      }
      hasPriceCount++;
    }
  }
  return { totalMonthlyCny, totalRemainingCny, hasPriceCount };
}

// ==================== 7. 原生 SVG 图表渲染引擎 ====================
function buildSvgLineChart(series, options = {}) {
  const width = 960;
  const height = 280;
  const xLabels = Array.isArray(options.xLabels) ? options.xLabels : [];
  const padding = { top: 16, right: 20, bottom: xLabels.length ? 38 : 22, left: 54 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const validSeries = series.filter(s => !state.detailHiddenSeries.has(s.key) && Array.isArray(s.values));
  const totalPoints = Math.max(...validSeries.map(s => s.values.length), 0);

  if (!totalPoints || totalPoints < 2) {
    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="var(--text-soft)" font-size="13">${escapeHtml(t('chartNoData'))}</text></svg>`;
  }

  const allVals = validSeries.flatMap(s => s.values).filter(v => typeof v === 'number' && Number.isFinite(v));
  const minVal = options.min != null ? options.min : Math.min(0, ...allVals);
  let maxVal = options.max != null ? options.max : Math.max(1, ...allVals);
  if (maxVal === minVal) maxVal = minVal + 1;

  const getX = (idx) => padding.left + (idx / Math.max(totalPoints - 1, 1)) * innerW;
  const getY = (val) => padding.top + innerH - ((clamp(safeNum(val, 0), minVal, maxVal) - minVal) / (maxVal - minVal)) * innerH;

  const fmtY = options.fmtY || ((v) => String(Math.round(v)));

  const gridLines = [0, 0.33, 0.66, 1].map(ratio => {
    const yPos = (padding.top + innerH - innerH * ratio).toFixed(2);
    const val = minVal + (maxVal - minVal) * ratio;
    return `
      <line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}"></line>
      <text x="${padding.left - 8}" y="${(Number(yPos) + 3).toFixed(2)}" text-anchor="end">${escapeHtml(fmtY(val))}</text>
    `;
  }).join('');

  const axisLabels = xLabels.map(item => {
    const xPos = getX(item.index).toFixed(2);
    return `
      <g class="axis-label">
        <line x1="${xPos}" y1="${(padding.top + innerH).toFixed(2)}" x2="${xPos}" y2="${(padding.top + innerH + 4).toFixed(2)}"></line>
        <text x="${xPos}" y="${height - 6}" text-anchor="${item.anchor || 'middle'}">${escapeHtml(item.label)}</text>
      </g>
    `;
  }).join('');

  let areaSvg = '';
  let linesSvg = '';
  let pointsSvg = '';

  validSeries.forEach((s, sIdx) => {
    const pts = s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(2)},${getY(v).toFixed(2)}`).join(' ');
    const lineClass = sIdx === 1 ? 'line line--secondary' : sIdx === 2 ? 'line line--tertiary' : sIdx === 3 ? 'line line--quaternary' : 'line';
    const pointTone = sIdx === 1 ? 'secondary' : sIdx === 2 ? 'tertiary' : sIdx === 3 ? 'quaternary' : '';

    if (s.showArea !== false && sIdx === 0) {
      const areaPath = `${pts} L ${getX(s.values.length - 1).toFixed(2)},${(padding.top + innerH).toFixed(2)} L ${getX(0).toFixed(2)},${(padding.top + innerH).toFixed(2)} Z`;
      areaSvg = `<path class="area" d="${areaPath}"></path>`;
    }

    linesSvg += `<path class="${lineClass}" d="${pts}"></path>`;

    pointsSvg += s.values.map((v, i) => {
      const title = s.titles?.[i] || `${s.label}: ${fmtY(v)}`;
      return `<circle class="chart-point" data-tone="${pointTone}" cx="${getX(i).toFixed(2)}" cy="${getY(v).toFixed(2)}" r="2.5" data-note="${escapeHtml(title)}"></circle>`;
    }).join('');
  });

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <g class="grid">${gridLines}</g>
      <g class="axis">
        <line x1="${padding.left}" y1="${padding.top + innerH}" x2="${width - padding.right}" y2="${padding.top + innerH}"></line>
        ${axisLabels}
      </g>
      ${areaSvg}
      ${linesSvg}
      ${pointsSvg}
    </svg>
  `;
}

// ==================== 8. 页面渲染模块 ====================

// 8.1 顶部汇总统计方块
function renderGlobalStats() {
  const root = document.getElementById('global-stats');
  if (!root) return;

  const { total, online, globalSpeedIn, globalSpeedOut, globalNetTx, globalNetRx } = state.stats;
  const onlinePct = total > 0 ? Math.round((online / total) * 100) : 0;
  const { totalMonthlyCny, totalRemainingCny, hasPriceCount } = summarizeFleetWorth(state.servers);

  const cardsHtml = `
    <!-- 小鸡价值 (显示月折合与完整剩余价值) -->
    <article class="stat-box">
      <div class="stat-box__title">
        <span>${t('fleetWorth')}</span>
        <span class="metric-icon"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
      </div>
      <div class="stat-box__value">¥ ${Math.round(totalMonthlyCny)}<span style="font-size:0.75rem;font-weight:400;color:var(--text-muted);margin-left:4px;">/月</span></div>
      <div class="stat-box__sub">${t('fleetWorthSub', { count: hasPriceCount, rem: Math.round(totalRemainingCny) })}</div>
    </article>

    <!-- 当前在线 -->
    <article class="stat-box">
      <div class="stat-box__title">
        <span>${t('onlineNodes')}</span>
        <span class="metric-icon"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      </div>
      <div class="stat-box__value">${online} / ${total}</div>
      <div class="stat-box__sub">${t('onlineRatio', { pct: onlinePct, total })}</div>
    </article>

    <!-- 流量数据 -->
    <article class="stat-box">
      <div class="stat-box__title">
        <span>${t('totalTraffic')}</span>
        <span class="metric-icon"><svg viewBox="0 0 24 24"><path d="M7 7h10M7 7l3-3M7 7l3 3M17 17H7m10 0-3 3m3-3-3-3"/></svg></span>
      </div>
      <div class="stat-box__value">${fmtBytes(globalNetRx + globalNetTx, 2)}</div>
      <div class="stat-box__sub">${t('totalTrafficSub', { rx: fmtBytes(globalNetRx, 1), tx: fmtBytes(globalNetTx, 1) })}</div>
    </article>

    <!-- 网络速率 -->
    <article class="stat-box">
      <div class="stat-box__title">
        <span>${t('netSpeed')}</span>
        <span class="metric-icon"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6Z"/></svg></span>
      </div>
      <div class="stat-box__value">
        <span class="speed-item">↓ ${fmtSpeed(globalSpeedIn)}</span>
      </div>
      <div class="stat-box__sub">
        <span class="speed-item">↑ ${fmtSpeed(globalSpeedOut)}</span>
      </div>
    </article>
  `;

  root.innerHTML = cardsHtml;
}

// 8.2 分类标签栏 (纯文字加粗，无高亮色)
function renderGroupBar() {
  const container = document.getElementById('group-links');
  if (!container) return;

  const groupsSet = new Set();
  for (const s of state.servers) {
    if (s.server_group && s.server_group.trim()) groupsSet.add(s.server_group.trim());
  }
  const groups = Array.from(groupsSet);

  const items = [];
  items.push(`
    <span class="group-text-link ${state.selectedGroup === 'ALL' ? 'is-active' : ''}" data-group="ALL">
      ${t('groupAll')}
    </span>
  `);

  for (const g of groups) {
    items.push(`
      <span class="group-text-link ${state.selectedGroup === g ? 'is-active' : ''}" data-group="${escapeHtml(g)}">
        ${escapeHtml(g)}
      </span>
    `);
  }

  container.innerHTML = items.join('<span class="group-sep">|</span>');
}

// 8.3 节点列表与卡片渲染
function filteredServers() {
  let list = state.servers.slice();

  if (state.selectedGroup !== 'ALL') {
    list = list.filter(s => (s.server_group || '').trim() === state.selectedGroup);
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase().trim();
    list = list.filter(s => {
      const name = (s.name || '').toLowerCase();
      const group = (s.server_group || '').toLowerCase();
      const os = (s.os || '').toLowerCase();
      const region = (s.region || '').toLowerCase();
      const tags = (s.tags || '').toLowerCase();
      const cpu = (s.cpu_info || '').toLowerCase();
      return name.includes(q) || group.includes(q) || os.includes(q) || region.includes(q) || tags.includes(q) || cpu.includes(q);
    });
  }

  list.sort((a, b) => {
    const onlineA = isServerOnline(a) ? 1 : 0;
    const onlineB = isServerOnline(b) ? 1 : 0;
    if (onlineA !== onlineB) return onlineB - onlineA;
    const sortA = safeNum(a.sort_order, 0);
    const sortB = safeNum(b.sort_order, 0);
    if (sortA !== sortB) return sortA - sortB;
    return (a.name || '').localeCompare(b.name || '');
  });

  return list;
}

function renderServersGrid() {
  const grid = document.getElementById('servers-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  grid.className = 'card-grid';
  const list = filteredServers();

  if (list.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }
  if (emptyState) emptyState.classList.add('hidden');

  grid.innerHTML = list.map(server => renderServerCard(server)).join('');
}

// 渲染单个探针组件 (无进度条、流量智能转换至TB、无多余尾数、合理行高间距)
function renderServerCard(server) {
  const online = isServerOnline(server);
  const id = server.id;
  const name = server.name || 'Unnamed';
  const region = (server.region || 'UN').toUpperCase();
  const flagUrl = `/flags/${region.toLowerCase()}.svg`;

  const cpuPct = safeNum(server.cpu, 0);
  const ramPct = calcPct(server.ram_used, server.ram_total);
  const diskPct = calcPct(server.disk_used, server.disk_total);

  // RAM 和 Disk 详细规格文本 (例如: 2.0G / 3.8G)
  const ramDetailText = fmtSizeDetail(server.ram_used, server.ram_total);
  const diskDetailText = fmtSizeDetail(server.disk_used, server.disk_total);

  // 活跃：在线XX天 余XX天
  const days = server.boot_time ? Math.floor((Date.now() - safeNum(server.boot_time)) / 86400000) : 0;
  const uptimeText = online ? (days > 0 ? `在线 ${days}天` : '在线 <1天') : '离线';
  const remWorth = computeRemainingWorth(server);
  const remDaysText = remWorth ? (remWorth.expired ? '已过期' : `余 ${remWorth.days}天`) : '';
  const activityText = remDaysText ? `${uptimeText} · ${remDaysText}` : uptimeText;

  // 价值：购买价格 剩余价格 (无多余尾数，如 ¥38/月 · 剩余 ¥266)
  const priceVal = safeNum(server.price, 0);
  let priceText = '';
  if (priceVal > 0) {
    const cycle = server.billing_cycle === 'year' ? '年' : server.billing_cycle === 'half-year' ? '半年' : server.billing_cycle === 'quarter' ? '季' : '月';
    const buyPrice = `${fmtPrice(priceVal, server.currency || '¥')}${server.billing_cycle ? `/${cycle}` : ''}`;
    const remVal = remWorth ? fmtPrice(remWorth.worth, server.currency || '¥') : '--';
    priceText = `${buyPrice} · 剩余 ${remVal}`;
  } else if (priceVal === -1 || server.price === '0') {
    priceText = '免费 · 永久';
  } else {
    priceText = '--';
  }

  // 流量数据 (自动单位换算: 5000GB -> 4.9 TB, 1000GB -> 1 TB)
  const limitBytes = parseTrafficBytes(server.traffic_limit);
  let trafficValText = '';

  if (limitBytes > 0) {
    const monthlyUsed = safeNum(server.net_rx_monthly) + safeNum(server.net_tx_monthly);
    const tfPct = clamp((monthlyUsed / limitBytes) * 100, 0, 100);
    trafficValText = `${fmtBytes(monthlyUsed, 1)} / ${fmtTrafficLimit(server.traffic_limit)} · ${Math.round(tfPct)}%`;
  } else {
    const totalBytes = safeNum(server.net_rx) + safeNum(server.net_tx);
    trafficValText = totalBytes > 0 ? `累计 ${fmtBytes(totalBytes, 1)}` : '无限制';
  }

  // 平行放置延迟排版
  const fmtPing = (val) => (val != null ? `${Math.round(val)}ms` : '--');
  const pingTone = (val) => {
    if (val == null) return '';
    const num = Math.round(Number(val));
    return num < 80 ? 'ping-cell__val--good' : num < 180 ? 'ping-cell__val--med' : 'ping-cell__val--bad';
  };

  return `
    <article class="server-card" data-id="${escapeHtml(id)}">
      <div class="server-card__button" role="button" tabindex="0" onclick="location.hash = '#/server/${encodeURIComponent(id)}'">
        <!-- 行 1: 绿色呼吸点/红色呼吸点 探针名称 与 国旗 -->
        <div class="card-header">
          <div class="srv-title-group">
            <span class="pulse-dot ${online ? 'pulse-dot--online' : 'pulse-dot--offline'}" title="${online ? '在线' : '离线'}"></span>
            <span class="srv-name-text">${escapeHtml(name)}</span>
          </div>
          <span class="srv-flag">
            <img src="${flagUrl}" class="flag-image" alt="${region}" onerror="this.outerHTML='🌐'">
          </span>
        </div>

        <!-- 行 2: CPU RAM Disk 圆环与文字详情 -->
        <div class="dials">
          <div class="dial-group">
            <div class="circle-wrap" style="--pct: ${cpuPct}%">
              <div class="circle-inner">${cpuPct.toFixed(0)}%</div>
            </div>
            <div class="dial-label">CPU</div>
            <div class="dial-val">${server.cpu_cores ? `${server.cpu_cores}核` : '--'}</div>
          </div>

          <div class="dial-group">
            <div class="circle-wrap" style="--pct: ${ramPct}%">
              <div class="circle-inner">${ramPct.toFixed(0)}%</div>
            </div>
            <div class="dial-label">RAM</div>
            <div class="dial-val" title="内存：${ramDetailText}">${ramDetailText}</div>
          </div>

          <div class="dial-group">
            <div class="circle-wrap" style="--pct: ${diskPct}%">
              <div class="circle-inner">${diskPct.toFixed(0)}%</div>
            </div>
            <div class="dial-label">Disk</div>
            <div class="dial-val" title="磁盘：${diskDetailText}">${diskDetailText}</div>
          </div>
        </div>

        <!-- 分割线 1 -->
        <div class="card-divider"></div>

        <!-- 速率 -->
        <div class="card-info-row">
          <span class="info-label">
            <svg class="row-icon" viewBox="0 0 24 24"><path d="M7 10v12M7 10l-3 3M7 10l3 3M17 14V2m0 0 3 3m-3-3-3 3"/></svg>
            ${t('rate')}
          </span>
          <span class="info-val">↑ ${fmtSpeed(server.net_out_speed)}  ↓ ${fmtSpeed(server.net_in_speed)}</span>
        </div>

        <!-- 流量 (纯文本自动换算TB) -->
        <div class="card-info-row">
          <span class="info-label">
            <svg class="row-icon" viewBox="0 0 24 24"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/></svg>
            ${t('traffic')}
          </span>
          <span class="info-val">${trafficValText}</span>
        </div>

        <!-- 活跃: 在线XX天余XX天 -->
        <div class="card-info-row">
          <span class="info-label">
            <svg class="row-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            ${t('activity')}
          </span>
          <span class="info-val">${activityText}</span>
        </div>

        <!-- 价值: 购买价格 剩余价格 -->
        <div class="card-info-row">
          <span class="info-label">
            <svg class="row-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            ${t('valuation')}
          </span>
          <span class="info-val">${priceText}</span>
        </div>

        <!-- 分割线 2 -->
        <div class="card-divider"></div>

        <!-- 平行放置延迟 (4 列并排) -->
        <div class="parallel-pings">
          <div class="ping-cell">
            <span class="ping-cell__label">电信</span>
            <span class="ping-cell__val ${pingTone(server.ping_ct)}">${fmtPing(server.ping_ct)}</span>
          </div>
          <div class="ping-cell">
            <span class="ping-cell__label">联通</span>
            <span class="ping-cell__val ${pingTone(server.ping_cu)}">${fmtPing(server.ping_cu)}</span>
          </div>
          <div class="ping-cell">
            <span class="ping-cell__label">移动</span>
            <span class="ping-cell__val ${pingTone(server.ping_cm)}">${fmtPing(server.ping_cm)}</span>
          </div>
          <div class="ping-cell">
            <span class="ping-cell__label">BGP</span>
            <span class="ping-cell__val ${pingTone(server.ping_bd)}">${fmtPing(server.ping_bd)}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

// 8.4 详情页渲染
async function renderDetailPage() {
  const container = document.getElementById('detail-view');
  const serverId = state.currentRoute.serverId;
  if (!container || !serverId) return;

  const server = state.serversMap.get(serverId) || state.detailServer;
  if (!server) {
    container.innerHTML = `
      <div class="detail-top-bar">
        <h2 class="detail-node-name">${t('loading')}...</h2>
        <a class="detail-back-link" onclick="location.hash='#/'">← ${t('back')}</a>
      </div>
    `;
    return;
  }

  const online = isServerOnline(server);
  const region = (server.region || 'UN').toUpperCase();
  const flagUrl = `/flags/${region.toLowerCase()}.svg`;

  // 顶部标题栏
  const topBarHtml = `
    <div class="detail-title-side">
      <span class="pulse-dot ${online ? 'pulse-dot--online' : 'pulse-dot--offline'}"></span>
      <span class="detail-flag"><img src="${flagUrl}" class="flag-image" alt="${region}" onerror="this.outerHTML='🌐'"></span>
      <h2 class="detail-node-name">${escapeHtml(server.name || 'Unnamed')}</h2>
      <span class="detail-uuid">${escapeHtml(server.id)}</span>
    </div>
    <div class="detail-back-side">
      <a class="detail-back-link" onclick="location.hash='#/'">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
        <span>${t('back')}</span>
      </a>
    </div>
  `;
  document.getElementById('detail-header').innerHTML = topBarHtml;

  const ramPct = calcPct(server.ram_used, server.ram_total);
  const swapPct = calcPct(server.swap_used, server.swap_total);
  const diskPct = calcPct(server.disk_used, server.disk_total);

  // 3 个整合分组面板
  const specsHtml = `
    <div class="detail-panels-grid">
      <!-- 面板 1: 系统与硬件 -->
      <div class="detail-panel">
        <div class="detail-panel__title">
          <svg viewBox="0 0 24 24" class="icon-svg"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>
          <span>${t('panelSystem')}</span>
        </div>
        <div class="detail-panel__content spec-list">
          <div class="spec-item"><span class="spec-label">${t('specCpu')}</span><span class="spec-val">${escapeHtml(server.cpu_info || '--')}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specCoresArch')}</span><span class="spec-val">${server.cpu_cores ? `${server.cpu_cores} 核` : '--'} · ${escapeHtml(server.arch || 'x86_64')}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specOsKernel')}</span><span class="spec-val">${escapeHtml(server.os || 'Linux')}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specUptime')}</span><span class="spec-val">${server.boot_time ? fmtDuration((Date.now() - safeNum(server.boot_time)) / 1000) : '--'}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specLastUpdated')}</span><span class="spec-val">${server.last_updated ? fmtDateTime(server.last_updated) : '--'}</span></div>
        </div>
      </div>

      <!-- 面板 2: 内存与存储 -->
      <div class="detail-panel">
        <div class="detail-panel__title">
          <svg viewBox="0 0 24 24" class="icon-svg"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M6 18h12"/></svg>
          <span>${t('panelMemory')}</span>
        </div>
        <div class="detail-panel__content bars-list">
          <div class="bar-group">
            <div class="bar-group__meta">
              <span>RAM 内存</span>
              <span>${fmtMB(server.ram_used)} / ${fmtMB(server.ram_total)} (${ramPct.toFixed(1)}%)</span>
            </div>
            <div class="bar-group__track"><span style="width: ${ramPct}%"></span></div>
          </div>
          <div class="bar-group">
            <div class="bar-group__meta">
              <span>Swap 交换</span>
              <span>${fmtMB(server.swap_used)} / ${fmtMB(server.swap_total)} (${swapPct.toFixed(1)}%)</span>
            </div>
            <div class="bar-group__track"><span style="width: ${swapPct}%"></span></div>
          </div>
          <div class="bar-group">
            <div class="bar-group__meta">
              <span>Disk 存储</span>
              <span>${fmtMB(server.disk_used)} / ${fmtMB(server.disk_total)} (${diskPct.toFixed(1)}%)</span>
            </div>
            <div class="bar-group__track"><span style="width: ${diskPct}%"></span></div>
          </div>
        </div>
      </div>

      <!-- 面板 3: 网络与连接 -->
      <div class="detail-panel">
        <div class="detail-panel__title">
          <svg viewBox="0 0 24 24" class="icon-svg"><path d="M13 2 4 14h6l-1 8 9-12h-6Z"/></svg>
          <span>${t('panelNetwork')}</span>
        </div>
        <div class="detail-panel__content spec-list">
          <div class="spec-item"><span class="spec-label">${t('specNetSpeed')}</span><span class="spec-val">↓ ${fmtSpeed(server.net_in_speed)} · ↑ ${fmtSpeed(server.net_out_speed)}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specTrafficMonth')}</span><span class="spec-val">↓ ${fmtBytes(server.net_rx_monthly)} · ↑ ${fmtBytes(server.net_tx_monthly)}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specTrafficTotal')}</span><span class="spec-val">↓ ${fmtBytes(server.net_rx)} · ↑ ${fmtBytes(server.net_tx)}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specConns')}</span><span class="spec-val">TCP: ${server.tcp_conn || 0} · UDP: ${server.udp_conn || 0}</span></div>
          <div class="spec-item"><span class="spec-label">${t('specProcesses')}</span><span class="spec-val">${server.processes || '--'} 进程</span></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById('detail-specs').innerHTML = specsHtml;

  renderActiveDetailChart(server);
}

function renderActiveDetailChart(server) {
  const chartContainer = document.getElementById('detail-charts-container');
  if (!chartContainer) return;

  const history = state.detailHistory || [];

  const xLabels = [];
  const step = Math.max(1, Math.floor((history.length - 1) / 4));
  for (let i = 0; i < history.length; i += step) {
    const pt = history[i];
    const d = new Date(pt.timestamp);
    const label = state.detailHours <= 24 ? `${pad2(d.getHours())}:${pad2(d.getMinutes())}` : `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:00`;
    xLabels.push({ index: i, label });
  }

  // 顶部导航文字链接 (纯文字加粗，无高亮色)
  const navTabs = [
    { key: 'load', label: t('tabLoad') },
    { key: 'network', label: t('tabNetwork') },
    { key: 'ping', label: t('tabPing') },
    { key: 'disk', label: t('tabDisk') }
  ];

  const navTabsHtml = navTabs.map(item => `
    <span class="chart-nav-link ${state.detailTab === item.key ? 'is-active' : ''}" data-tab="${item.key}">
      ${item.label}
    </span>
  `).join('<span class="chart-nav-sep">|</span>');

  // 右上角时间跨度下拉框
  const hoursOptions = [
    { h: 1, label: t('h1') },
    { h: 6, label: t('h6') },
    { h: 12, label: t('h12') },
    { h: 24, label: t('h24') },
    { h: 48, label: t('h48') },
    { h: 96, label: t('h96') },
    { h: 168, label: t('h168') }
  ].map(opt => `<option value="${opt.h}" ${state.detailHours === opt.h ? 'selected' : ''}>${opt.label}</option>`).join('');

  let svgHtml = '';
  let legendHtml = '';
  let summaryText = '';

  if (!history.length) {
    svgHtml = `<svg class="chart-svg" viewBox="0 0 960 280"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="var(--text-soft)" font-size="13">${t('chartNoData')}</text></svg>`;
  } else if (state.detailTab === 'load') {
    const cpuSeries = {
      key: 'cpu',
      label: 'CPU',
      values: history.map(h => safeNum(h.cpu, 0)),
      titles: history.map(h => `${fmtDateTime(h.timestamp)} · CPU: ${safeNum(h.cpu).toFixed(1)}%`)
    };
    const ramSeries = {
      key: 'ram',
      label: 'RAM',
      values: history.map(h => calcPct(h.ram_used, server.ram_total)),
      titles: history.map(h => `${fmtDateTime(h.timestamp)} · RAM: ${fmtMB(h.ram_used)} (${calcPct(h.ram_used, server.ram_total).toFixed(1)}%)`)
    };

    svgHtml = buildSvgLineChart([cpuSeries, ramSeries], {
      min: 0,
      max: 100,
      fmtY: (v) => `${Math.round(v)}%`,
      xLabels
    });

    const latestCpu = cpuSeries.values[cpuSeries.values.length - 1] || 0;
    const latestRam = ramSeries.values[ramSeries.values.length - 1] || 0;
    summaryText = `CPU: ${latestCpu.toFixed(1)}% · RAM: ${latestRam.toFixed(1)}%`;

    legendHtml = `
      <div class="chart-legend">
        <span class="legend-item ${state.detailHiddenSeries.has('cpu') ? 'is-disabled' : ''}" data-key="cpu"><span class="legend-dot"></span>CPU 利用率</span>
        <span class="legend-item ${state.detailHiddenSeries.has('ram') ? 'is-disabled' : ''}" data-key="ram"><span class="legend-dot" style="background:var(--success)"></span>RAM 内存利用率</span>
      </div>
    `;
  } else if (state.detailTab === 'network') {
    const inSeries = {
      key: 'net_in',
      label: t('speedIn'),
      values: history.map(h => safeNum(h.net_in_speed, 0)),
      titles: history.map(h => `${fmtDateTime(h.timestamp)} · ↓ ${fmtSpeed(h.net_in_speed)}`)
    };
    const outSeries = {
      key: 'net_out',
      label: t('speedOut'),
      values: history.map(h => safeNum(h.net_out_speed, 0)),
      titles: history.map(h => `${fmtDateTime(h.timestamp)} · ↑ ${fmtSpeed(h.net_out_speed)}`)
    };

    svgHtml = buildSvgLineChart([inSeries, outSeries], {
      min: 0,
      fmtY: (v) => fmtSpeed(v),
      xLabels
    });

    const latestIn = inSeries.values[inSeries.values.length - 1] || 0;
    const latestOut = outSeries.values[outSeries.values.length - 1] || 0;
    summaryText = `↓ ${fmtSpeed(latestIn)} · ↑ ${fmtSpeed(latestOut)}`;

    legendHtml = `
      <div class="chart-legend">
        <span class="legend-item ${state.detailHiddenSeries.has('net_in') ? 'is-disabled' : ''}" data-key="net_in"><span class="legend-dot"></span>${t('speedIn')}</span>
        <span class="legend-item ${state.detailHiddenSeries.has('net_out') ? 'is-disabled' : ''}" data-key="net_out"><span class="legend-dot" style="background:var(--success)"></span>${t('speedOut')}</span>
      </div>
    `;
  } else if (state.detailTab === 'ping') {
    const ctSeries = { key: 'ct', label: '电信', values: history.map(h => safeNum(h.ping_ct, null)) };
    const cuSeries = { key: 'cu', label: '联通', values: history.map(h => safeNum(h.ping_cu, null)) };
    const cmSeries = { key: 'cm', label: '移动', values: history.map(h => safeNum(h.ping_cm, null)) };
    const bdSeries = { key: 'bd', label: 'BGP', values: history.map(h => safeNum(h.ping_bd, null)) };

    svgHtml = buildSvgLineChart([ctSeries, cuSeries, cmSeries, bdSeries], {
      min: 0,
      fmtY: (v) => `${Math.round(v)}ms`,
      xLabels
    });

    legendHtml = `
      <div class="chart-legend">
        <span class="legend-item ${state.detailHiddenSeries.has('ct') ? 'is-disabled' : ''}" data-key="ct"><span class="legend-dot"></span>中国电信</span>
        <span class="legend-item ${state.detailHiddenSeries.has('cu') ? 'is-disabled' : ''}" data-key="cu"><span class="legend-dot" style="background:var(--success)"></span>中国联通</span>
        <span class="legend-item ${state.detailHiddenSeries.has('cm') ? 'is-disabled' : ''}" data-key="cm"><span class="legend-dot" style="background:var(--warning)"></span>中国移动</span>
        <span class="legend-item ${state.detailHiddenSeries.has('bd') ? 'is-disabled' : ''}" data-key="bd"><span class="legend-dot" style="background:var(--danger)"></span>BGP / 全球</span>
      </div>
    `;
  } else if (state.detailTab === 'disk') {
    const readSeries = { key: 'read_bps', label: `${t('read')} (B/s)`, values: history.map(h => safeNum(h.disk?.read_bps || h.disk_read_bps, 0)) };
    const writeSeries = { key: 'write_bps', label: `${t('write')} (B/s)`, values: history.map(h => safeNum(h.disk?.write_bps || h.disk_write_bps, 0)) };

    svgHtml = buildSvgLineChart([readSeries, writeSeries], {
      min: 0,
      fmtY: (v) => fmtBytes(v) + '/s',
      xLabels
    });

    legendHtml = `
      <div class="chart-legend">
        <span class="legend-item ${state.detailHiddenSeries.has('read_bps') ? 'is-disabled' : ''}" data-key="read_bps"><span class="legend-dot"></span>磁盘读取速率</span>
        <span class="legend-item ${state.detailHiddenSeries.has('write_bps') ? 'is-disabled' : ''}" data-key="write_bps"><span class="legend-dot" style="background:var(--success)"></span>磁盘写入速率</span>
      </div>
    `;
  }

  chartContainer.innerHTML = `
    <article class="chart-card">
      <div class="chart-card-header">
        <div class="chart-nav-links" id="chart-nav-links">
          ${navTabsHtml}
        </div>
        <div class="chart-header-right">
          ${summaryText ? `<span class="chart-val-summary">${summaryText}</span>` : ''}
          <select id="detail-hour-select" class="hour-select">
            ${hoursOptions}
          </select>
        </div>
      </div>
      ${svgHtml}
      ${legendHtml}
    </article>
  `;
}

// 8.5 连接状态指示器
function updateConnectionState(st) {
  state.wsState = st;
  const el = document.getElementById('connection-status');
  if (!el) return;

  el.className = 'status-inline';
  if (state.isDemoMode) {
    el.classList.add('status-inline--live');
    el.textContent = '演示预览模式';
  } else if (st === 'open') {
    el.classList.add('status-inline--live');
    el.textContent = t('live');
  } else if (st === 'connecting') {
    el.classList.add('status-inline--connecting');
    el.textContent = t('connecting');
  } else if (st === 'fallback') {
    el.classList.add('status-inline--fallback');
    el.textContent = t('polling');
  } else {
    el.classList.add('status-inline--disconnected');
    el.textContent = t('disconnected');
  }
}

// ==================== 9. 外观主题切换 (按钮起点圆形波浪扩散动画) ====================
function applyAppearance() {
  const root = document.documentElement;
  const effective = state.themeMode === 'light' ? 'light' : 'dark';

  root.dataset.appearance = effective;

  const themeMeta = document.getElementById('theme-color-meta');
  if (themeMeta) {
    themeMeta.content = effective === 'dark' ? '#0b0f19' : '#f1f5f9';
  }

  const btnTheme = document.getElementById('btn-theme');
  if (btnTheme) {
    if (effective === 'dark') {
      btnTheme.innerHTML = `<svg viewBox="0 0 24 24" class="icon-svg"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07 7.07-1.41-1.41M6.34 6.34 4.93 4.93m14.14 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>`;
      btnTheme.title = '切换至日间模式';
    } else {
      btnTheme.innerHTML = `<svg viewBox="0 0 24 24" class="icon-svg"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>`;
      btnTheme.title = '切换至夜间模式';
    }
  }
}

function cycleAppearance(event) {
  const nextMode = state.themeMode === 'dark' ? 'light' : 'dark';

  const updateThemeDOM = () => {
    state.themeMode = nextMode;
    localStorage.setItem('horizon_appearance', state.themeMode);
    applyAppearance();
  };

  // 支持 View Transitions API 时，从点击按钮中心向外波浪扩散
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateThemeDOM();
    return;
  }

  let x = window.innerWidth - 45;
  let y = 25;

  if (event) {
    if (event.clientX && event.clientY) {
      x = event.clientX;
      y = event.clientY;
    } else if (event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    updateThemeDOM();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 480,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
}

// ==================== 10. 路由与数据加载 ====================
let metricSocket = null;
let pollingTimer = null;
let demoTickTimer = null;

function parseRoute() {
  const hash = window.location.hash || '#/';
  const match = hash.match(/^#\/server\/([^/?#]+)/);
  if (match) {
    return { view: 'detail', serverId: decodeURIComponent(match[1]) };
  }
  return { view: 'home', serverId: null };
}

async function handleRouteChange() {
  state.currentRoute = parseRoute();
  const homeView = document.getElementById('home-view');
  const detailView = document.getElementById('detail-view');

  if (state.currentRoute.view === 'detail') {
    if (homeView) homeView.classList.add('hidden');
    if (detailView) detailView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });

    await loadServerDetailData(state.currentRoute.serverId);
  } else {
    if (detailView) detailView.classList.add('hidden');
    if (homeView) homeView.classList.remove('hidden');

    renderGlobalStats();
    renderGroupBar();
    renderServersGrid();

    if (metricSocket && state.servers.length) {
      metricSocket.setIds(state.servers.map(s => s.id));
    }
  }
}

function generateDemoData() {
  const now = Date.now();
  const demoServers = [
    {
      id: 'srv-hk-01',
      name: 'HK-BGP-Pro-01',
      server_group: '亚太节点',
      tags: 'BGP,CN2,Direct',
      region: 'HK',
      os: 'Ubuntu 22.04 LTS',
      arch: 'x86_64',
      kernel_version: '6.8.0-36-generic',
      cpu_cores: 4,
      cpu_info: 'AMD EPYC 7763 64-Core Processor @ 2.45GHz',
      cpu: 18.5,
      ram_total: 8192,
      ram_used: 3420,
      swap_total: 2048,
      swap_used: 128,
      disk_total: 122880,
      disk_used: 34500,
      disk: { read_bps: 40960, write_bps: 20480, read_iops: 120, write_iops: 80, await_ms: 1.2, util: 4.5 },
      net_in_speed: 28450120,
      net_out_speed: 12450800,
      net_rx: 2450120000000,
      net_tx: 1450800000000,
      net_rx_monthly: 480120000000,
      net_tx_monthly: 280800000000,
      processes: 186,
      tcp_conn: 42,
      udp_conn: 12,
      ping_ct: 18, ping_cu: 24, ping_cm: 22, ping_bd: 35,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '38.00',
      billing_cycle: 'month',
      currency: '¥',
      expire_date: new Date(now + 210 * 86400000).toISOString().split('T')[0],
      traffic_limit: '1000GB',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 42 * 86400000),
      last_updated: now,
      is_online: true
    },
    {
      id: 'srv-jp-02',
      name: 'JP-TYO-Edge-02',
      server_group: '亚太节点',
      tags: 'IIJ,BGP',
      region: 'JP',
      os: 'Debian 12 (bookworm)',
      arch: 'x86_64',
      kernel_version: '6.1.0-18-amd64',
      cpu_cores: 2,
      cpu_info: 'Intel Xeon E5-2680 v4 @ 2.40GHz',
      cpu: 9.2,
      ram_total: 4096,
      ram_used: 1320,
      swap_total: 1024,
      swap_used: 0,
      disk_total: 61440,
      disk_used: 12400,
      disk: { read_bps: 10240, write_bps: 5120, read_iops: 45, write_iops: 20, await_ms: 0.8, util: 2.1 },
      net_in_speed: 15400000,
      net_out_speed: 8200000,
      net_rx: 1850120000000,
      net_tx: 920800000000,
      net_rx_monthly: 320120000000,
      net_tx_monthly: 180800000000,
      processes: 112,
      tcp_conn: 28,
      udp_conn: 6,
      ping_ct: 48, ping_cu: 52, ping_cm: 65, ping_bd: 60,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '180.00',
      billing_cycle: 'year',
      currency: '¥',
      expire_date: new Date(now + 145 * 86400000).toISOString().split('T')[0],
      traffic_limit: '2000GB',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 18 * 86400000),
      last_updated: now,
      is_online: true
    },
    {
      id: 'srv-us-03',
      name: 'US-LAX-GIA-03',
      server_group: '北美节点',
      tags: 'CN2-GIA,9929',
      region: 'US',
      os: 'Alpine Linux v3.19',
      arch: 'x86_64',
      kernel_version: '6.6.21-0-lts',
      cpu_cores: 8,
      cpu_info: 'AMD Ryzen 9 7950X 16-Core Processor',
      cpu: 24.8,
      ram_total: 16384,
      ram_used: 8850,
      swap_total: 4096,
      swap_used: 512,
      disk_total: 256000,
      disk_used: 115200,
      disk: { read_bps: 85000, write_bps: 45000, read_iops: 240, write_iops: 180, await_ms: 1.5, util: 6.8 },
      net_in_speed: 42100000,
      net_out_speed: 38200000,
      net_rx: 4850120000000,
      net_tx: 3920800000000,
      net_rx_monthly: 820120000000,
      net_tx_monthly: 710800000000,
      processes: 260,
      tcp_conn: 88,
      udp_conn: 34,
      ping_ct: 135, ping_cu: 142, ping_cm: 158, ping_bd: 145,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '12.50',
      billing_cycle: 'month',
      currency: '$',
      expire_date: new Date(now + 28 * 86400000).toISOString().split('T')[0],
      traffic_limit: '5000GB',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 95 * 86400000),
      last_updated: now,
      is_online: true
    },
    {
      id: 'srv-sg-04',
      name: 'SG-Sin-Premium-04',
      server_group: '亚太节点',
      tags: 'BGP,LowLatency',
      region: 'SG',
      os: 'Ubuntu 24.04 LTS',
      arch: 'aarch64',
      kernel_version: '6.8.0-28-generic',
      cpu_cores: 4,
      cpu_info: 'Ampere Altra Q80-30 @ 3.00GHz',
      cpu: 14.1,
      ram_total: 8192,
      ram_used: 2850,
      swap_total: 2048,
      swap_used: 0,
      disk_total: 102400,
      disk_used: 22000,
      disk: { read_bps: 25000, write_bps: 12000, read_iops: 80, write_iops: 50, await_ms: 0.9, util: 2.8 },
      net_in_speed: 18500000,
      net_out_speed: 9800000,
      net_rx: 1520000000000,
      net_tx: 890000000000,
      net_rx_monthly: 290000000000,
      net_tx_monthly: 140000000000,
      processes: 145,
      tcp_conn: 36,
      udp_conn: 10,
      ping_ct: 58, ping_cu: 68, ping_cm: 62, ping_bd: 70,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '5.99',
      billing_cycle: 'month',
      currency: '$',
      expire_date: new Date(now + 320 * 86400000).toISOString().split('T')[0],
      traffic_limit: '1500GB',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 33 * 86400000),
      last_updated: now,
      is_online: true
    },
    {
      id: 'srv-de-05',
      name: 'DE-FRA-Core-05',
      server_group: '欧洲节点',
      tags: 'Hetzner,10Gbps',
      region: 'DE',
      os: 'Debian 12',
      arch: 'x86_64',
      kernel_version: '6.1.0-13-amd64',
      cpu_cores: 6,
      cpu_info: 'AMD Ryzen 5 3600 6-Core Processor',
      cpu: 31.2,
      ram_total: 16384,
      ram_used: 11200,
      swap_total: 8192,
      swap_used: 1024,
      disk_total: 512000,
      disk_used: 285000,
      disk: { read_bps: 95000, write_bps: 65000, read_iops: 320, write_iops: 210, await_ms: 1.8, util: 8.5 },
      net_in_speed: 35000000,
      net_out_speed: 28000000,
      net_rx: 6200000000000,
      net_tx: 5100000000000,
      net_rx_monthly: 1200000000000,
      net_tx_monthly: 980000000000,
      processes: 290,
      tcp_conn: 120,
      udp_conn: 45,
      ping_ct: 168, ping_cu: 175, ping_cm: 190, ping_bd: 180,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '34.00',
      billing_cycle: 'month',
      currency: '€',
      expire_date: new Date(now + 180 * 86400000).toISOString().split('T')[0],
      traffic_limit: '20TB',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 140 * 86400000),
      last_updated: now,
      is_online: true
    },
    {
      id: 'srv-cn-06',
      name: 'CN-SHA-Core-06',
      server_group: '国内节点',
      tags: 'BGP,MultiLine',
      region: 'CN',
      os: 'CentOS Stream 9',
      arch: 'x86_64',
      kernel_version: '5.14.0-427.el9.x86_64',
      cpu_cores: 4,
      cpu_info: 'Intel Xeon Platinum 8269CY @ 2.50GHz',
      cpu: 12.0,
      ram_total: 8192,
      ram_used: 2400,
      swap_total: 2048,
      swap_used: 0,
      disk_total: 81920,
      disk_used: 18500,
      disk: { read_bps: 18000, write_bps: 9500, read_iops: 60, write_iops: 40, await_ms: 0.7, util: 1.8 },
      net_in_speed: 8500000,
      net_out_speed: 4200000,
      net_rx: 950000000000,
      net_tx: 520000000000,
      net_rx_monthly: 180000000000,
      net_tx_monthly: 95000000000,
      processes: 128,
      tcp_conn: 25,
      udp_conn: 8,
      ping_ct: 8, ping_cu: 12, ping_cm: 10, ping_bd: 15,
      loss_ct: 0, loss_cu: 0, loss_cm: 0, loss_bd: 0,
      price: '0',
      billing_cycle: 'month',
      currency: '¥',
      expire_date: '2099-12-31',
      traffic_limit: '0',
      ip_v4: '1',
      ip_v6: '1',
      boot_time: String(now - 60 * 86400000),
      last_updated: now,
      is_online: true
    }
  ];

  const totalIn = demoServers.reduce((sum, s) => sum + s.net_in_speed, 0);
  const totalOut = demoServers.reduce((sum, s) => sum + s.net_out_speed, 0);
  const totalRx = demoServers.reduce((sum, s) => sum + s.net_rx, 0);
  const totalTx = demoServers.reduce((sum, s) => sum + s.net_tx, 0);

  return {
    config: {
      site_title: 'Horizon Monitor · 本地预览',
      version: '2.8.6',
      is_public: true,
      theme_options: { default_appearance: 'Dark' }
    },
    servers: demoServers,
    stats: {
      total: demoServers.length,
      online: demoServers.length,
      offline: 0,
      globalSpeedIn: totalIn,
      globalSpeedOut: totalOut,
      globalNetRx: totalRx,
      globalNetTx: totalTx
    }
  };
}

function generateMockHistory(server, hours = 24) {
  const pointsCount = 50;
  const now = Date.now();
  const intervalMs = (hours * 3600 * 1000) / pointsCount;
  const history = [];
  const baseTime = now - hours * 3600 * 1000;

  for (let i = 0; i < pointsCount; i++) {
    const ts = baseTime + i * intervalMs;
    const wave = Math.sin(i / 5) * 8 + Math.cos(i / 3) * 4;
    const cpuVal = clamp(server.cpu + wave + (Math.random() * 6 - 3), 2, 98);
    const ramVal = clamp(server.ram_used + Math.sin(i / 8) * 400 + (Math.random() * 100 - 50), 200, server.ram_total);
    const inSpeed = Math.max(1024, server.net_in_speed + wave * 800000 + (Math.random() * 2000000 - 1000000));
    const outSpeed = Math.max(1024, server.net_out_speed + wave * 400000 + (Math.random() * 1000000 - 500000));

    history.push({
      timestamp: ts,
      cpu: cpuVal,
      ram_used: ramVal,
      net_in_speed: inSpeed,
      net_out_speed: outSpeed,
      ping_ct: server.ping_ct ? clamp(server.ping_ct + (Math.random() * 4 - 2), 2, 999) : null,
      ping_cu: server.ping_cu ? clamp(server.ping_cu + (Math.random() * 4 - 2), 2, 999) : null,
      ping_cm: server.ping_cm ? clamp(server.ping_cm + (Math.random() * 4 - 2), 2, 999) : null,
      ping_bd: server.ping_bd ? clamp(server.ping_bd + (Math.random() * 4 - 2), 2, 999) : null,
      disk: {
        read_bps: Math.max(1024, (server.disk?.read_bps || 10240) + (Math.random() * 8000 - 4000)),
        write_bps: Math.max(1024, (server.disk?.write_bps || 5120) + (Math.random() * 4000 - 2000))
      }
    });
  }
  return history;
}

async function loadServerDetailData(serverId) {
  try {
    if (state.isDemoMode) {
      const server = state.serversMap.get(serverId) || state.servers[0];
      state.detailServer = server;
      state.detailHistory = generateMockHistory(server, state.detailHours);
      renderDetailPage();
      return;
    }

    const [serverData, historyData] = await Promise.all([
      request(`/api/server?id=${encodeURIComponent(serverId)}`),
      request(`/api/history/all?id=${encodeURIComponent(serverId)}&hours=${state.detailHours}`)
    ]);

    state.detailServer = serverData;
    state.serversMap.set(serverId, serverData);
    state.detailHistory = Array.isArray(historyData) ? historyData : [];

    renderDetailPage();
  } catch {
    const server = state.serversMap.get(serverId) || state.servers[0];
    if (server) {
      state.detailServer = server;
      state.detailHistory = generateMockHistory(server, state.detailHours);
      renderDetailPage();
    }
  }
}

async function loadInitialData() {
  try {
    const res = await fetch(`${API_BASE}/api/config`, { headers: authHeaders() });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.config = await res.json();

    if (state.config?.site_title) {
      document.title = state.config.site_title;
      const titleEl = document.getElementById('site-title-text');
      if (titleEl) titleEl.textContent = state.config.site_title;
    }

    applyAppearance();

    const serversData = await request('/api/servers');
    state.servers = serversData.servers || [];
    state.serversMap = new Map(state.servers.map(s => [s.id, s]));
    state.stats = serversData.stats || state.stats;
    state.regionStats = serversData.regionStats || {};
    state.sysConfig = serversData.sysConfig || {};

    loadExchangeRates().then(() => {
      renderGlobalStats();
      renderServersGrid();
    });

    handleRouteChange();
    initWebSocket();
    startPollingWatchdog();
  } catch {
    // 纯静态本地预览环境或无后端服务时，静默启用本地演示数据，控制台干净无报错
    state.isDemoMode = true;

    const demo = generateDemoData();
    state.config = demo.config;
    state.servers = demo.servers;
    state.serversMap = new Map(state.servers.map(s => [s.id, s]));
    state.stats = demo.stats;

    applyAppearance();
    loadExchangeRates().then(() => {
      renderGlobalStats();
      renderServersGrid();
    });

    handleRouteChange();
    updateConnectionState('open');

    startDemoTick();
  }
}

function startDemoTick() {
  if (demoTickTimer) clearInterval(demoTickTimer);
  demoTickTimer = setInterval(() => {
    if (!state.isDemoMode) return;

    for (const s of state.servers) {
      const delta = (Math.random() - 0.48) * 3;
      s.cpu = clamp(s.cpu + delta, 3, 95);
      s.net_in_speed = Math.max(1024, s.net_in_speed + (Math.random() - 0.5) * 2000000);
      s.net_out_speed = Math.max(1024, s.net_out_speed + (Math.random() - 0.5) * 1500000);
    }

    state.stats.globalSpeedIn = state.servers.reduce((sum, s) => sum + s.net_in_speed, 0);
    state.stats.globalSpeedOut = state.servers.reduce((sum, s) => sum + s.net_out_speed, 0);

    if (state.currentRoute.view === 'home') {
      renderGlobalStats();
      renderServersGrid();
    }
  }, 3000);
}

function initWebSocket() {
  if (metricSocket) metricSocket.close();

  const ids = state.servers.map(s => s.id);
  metricSocket = new MetricSocket({
    scope: 'all',
    ids,
    onState: (st) => {
      updateConnectionState(st === 'open' ? 'open' : st === 'connecting' ? 'connecting' : 'closed');
    },
    onBatch: (msg) => {
      if (!msg || !Array.isArray(msg.updates)) return;

      let hasChange = false;
      for (const u of msg.updates) {
        const srv = state.serversMap.get(u.serverId);
        if (!srv) continue;

        for (const s of u.samples || []) {
          const m = s.data || s.payload || s.metrics || {};
          Object.assign(srv, m);
          srv.last_updated = s.ts || Date.now();
          hasChange = true;
        }
      }

      if (hasChange) {
        if (state.currentRoute.view === 'home') {
          renderGlobalStats();
          renderServersGrid();
        } else if (state.currentRoute.view === 'detail') {
          renderDetailPage();
        }
      }
    }
  });
}

function startPollingWatchdog() {
  if (pollingTimer) clearInterval(pollingTimer);
  pollingTimer = setInterval(async () => {
    if (state.isDemoMode) return;
    if (Date.now() - state.lastWsMessageTime > 15000) {
      updateConnectionState('fallback');
      try {
        if (state.currentRoute.view === 'home') {
          const res = await request('/api/servers');
          state.servers = res.servers || [];
          state.serversMap = new Map(state.servers.map(s => [s.id, s]));
          state.stats = res.stats || state.stats;
          renderGlobalStats();
          renderServersGrid();
        } else if (state.currentRoute.view === 'detail' && state.currentRoute.serverId) {
          const serverData = await request(`/api/server?id=${encodeURIComponent(state.currentRoute.serverId)}`);
          state.detailServer = serverData;
          state.serversMap.set(state.currentRoute.serverId, serverData);
          renderDetailPage();
        }
      } catch {}
    }
  }, 10000);
}

// ==================== 11. 事件绑定与初始化 ====================
function bindEvents() {
  document.getElementById('brand-link')?.addEventListener('click', () => {
    location.hash = '#/';
  });

  document.getElementById('btn-theme')?.addEventListener('click', (e) => {
    cycleAppearance(e);
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderServersGrid();
    });
  }

  document.getElementById('group-links')?.addEventListener('click', (e) => {
    const link = e.target.closest('.group-text-link');
    if (!link) return;
    state.selectedGroup = link.dataset.group || 'ALL';
    renderGroupBar();
    renderServersGrid();
  });

  // 详情页图表导航点击
  document.getElementById('detail-charts-container')?.addEventListener('click', (e) => {
    const navLink = e.target.closest('.chart-nav-link');
    if (navLink && navLink.dataset.tab) {
      state.detailTab = navLink.dataset.tab;
      if (state.detailServer) renderActiveDetailChart(state.detailServer);
      return;
    }

    const legendItem = e.target.closest('.legend-item');
    if (legendItem && legendItem.dataset.key) {
      const key = legendItem.dataset.key;
      if (state.detailHiddenSeries.has(key)) state.detailHiddenSeries.delete(key);
      else state.detailHiddenSeries.add(key);
      if (state.detailServer) renderActiveDetailChart(state.detailServer);
    }
  });

  // 详情页时间下拉框切换
  document.getElementById('detail-charts-container')?.addEventListener('change', async (e) => {
    if (e.target && e.target.id === 'detail-hour-select') {
      state.detailHours = parseInt(e.target.value, 10);
      if (state.currentRoute.serverId) {
        if (state.isDemoMode) {
          state.detailHistory = generateMockHistory(state.detailServer, state.detailHours);
          renderActiveDetailChart(state.detailServer);
        } else {
          try {
            const historyData = await request(`/api/history/all?id=${encodeURIComponent(state.currentRoute.serverId)}&hours=${state.detailHours}`);
            state.detailHistory = Array.isArray(historyData) ? historyData : [];
            renderActiveDetailChart(state.detailServer);
          } catch {}
        }
      }
    }
  });

  const tooltipRoot = document.getElementById('tooltip-root');
  let activeTooltip = null;

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-note]');
    if (!target) {
      if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
      return;
    }
    const note = target.dataset.note;
    if (!note) return;

    if (!activeTooltip) {
      activeTooltip = document.createElement('div');
      activeTooltip.className = 'tooltip-box';
      tooltipRoot.appendChild(activeTooltip);
    }
    activeTooltip.textContent = note;

    const rect = target.getBoundingClientRect();
    const top = rect.top - 32;
    const left = rect.left + rect.width / 2;
    activeTooltip.style.top = `${Math.max(10, top)}px`;
    activeTooltip.style.left = `${Math.max(10, left)}px`;
    activeTooltip.style.transform = 'translateX(-50%)';
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-note]');
    if (target && activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }
  });

  window.addEventListener('hashchange', handleRouteChange);
}

document.addEventListener('DOMContentLoaded', () => {
  applyAppearance();
  bindEvents();
  loadInitialData();
});
