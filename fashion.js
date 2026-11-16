/* Supreme Digital Point — 👗 Fashion corner (ফ্যাশন কর্নার).
   Clothing is added in SDP Online › 👗 Fashion: each item has sizes / colours with their own stock (and price),
   fabric, fit, care, a size chart and a photo for each colour (publicCatalog: kind 'fashion', fashion {…}, variants […]).
   Here: the corner page (?view=fashion&g=Men&t=Jacket) with Men / Women / Kids tabs, type, size and price filters;
   size and colour buttons on the product page, the size chart, stock of the chosen size; the cart and the order
   keep the size / colour (item.vk, item.size, item.color) so the shop takes it from the right stock. */
(function () {
  'use strict';
  function G(n) { try { return eval(n); } catch (e) { return undefined; } }
  function E(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function J(s) { return E(String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function money(n) { var f = G('fmt'); return f ? f(n) : '৳' + n; }
  function prods() { return G('PRODUCTS') || []; }
  function isF(p) { return !!(p && p.kind === 'fashion'); }
  function vars(p) { return (p && Array.isArray(p.variants)) ? p.variants : []; }
  function items() { return prods().filter(isF); }
  var GENDERS = [['', 'সব', 'All'], ['Men', 'ছেলেদের', 'Men'], ['Women', 'মেয়েদের', 'Women'], ['Kids', 'বাচ্চাদের', 'Kids'], ['Unisex', 'সবার', 'Unisex']];
  var SZ = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL'];
  function szRank(s) { var i = SZ.indexOf(String(s).toUpperCase()); if (i >= 0) return i; var n = parseFloat(s); return isNaN(n) ? 900 : 100 + n; }
  function uniq(a) { return a.filter(function (x, i) { return x && a.indexOf(x) === i; }); }
  function sizes(p) { return uniq(vars(p).map(function (v) { return v.size; })); }
  function colors(p) { return uniq(vars(p).map(function (v) { return v.color; })); }
  function vOf(p, size, color) { return vars(p).find(function (v) { return v.size === size && (v.color || '') === (color || ''); }); }
  function vq(v) { return Math.max(0, Number(v && v.qty) || 0); }
  function sizeQty(p, size, color) { return vars(p).filter(function (v) { return v.size === size && (!color || v.color === color); }).reduce(function (s, v) { return s + vq(v); }, 0); }
  function colorQty(p, color, size) { return vars(p).filter(function (v) { return v.color === color && (!size || v.size === size); }).reduce(function (s, v) { return s + vq(v); }, 0); }
  function basePrice(p) { var f = G('effectivePrice'); return f ? f(p) : p.sellingPrice; }
  function onSale(p) { var f = G('isOnSale'); return f ? f(p) : false; }
  function priceOf(p, k) { var v = vars(p).find(function (x) { return x.k === k; }); return v && Number(v.price) > 0 && !onSale(p) ? Number(v.price) : basePrice(p); }
  function label(v) { return [v.size, v.color].filter(Boolean).join(', '); }

  var COLORS = { black: '#111827', 'কালো': '#111827', white: '#FFFFFF', 'সাদা': '#FFFFFF', 'off white': '#F5F1E6', cream: '#F3E9D2', beige: '#E8D9BC', navy: '#1E2A55', 'navy blue': '#1E2A55', blue: '#2563EB', 'নীল': '#2563EB', 'sky blue': '#7DD3FC', 'royal blue': '#1D4ED8', red: '#DC2626', 'লাল': '#DC2626', maroon: '#7F1D1D', 'মেরুন': '#7F1D1D', green: '#15803D', 'সবুজ': '#15803D', olive: '#556B2F', 'bottle green': '#0B4D2C', grey: '#9CA3AF', gray: '#9CA3AF', 'ash': '#B2B5B9', 'dark grey': '#4B5563', charcoal: '#374151', brown: '#7C4A21', 'coffee': '#5B3A21', chocolate: '#4E2A16', khaki: '#BDB28B', yellow: '#FACC15', 'হলুদ': '#FACC15', mustard: '#D4A017', orange: '#F97316', pink: '#EC4899', 'গোলাপি': '#EC4899', purple: '#7C3AED', 'বেগুনি': '#7C3AED', 'golden': '#D4AF37', silver: '#C0C0C0', teal: '#0D9488', 'mint': '#A7F3D0', 'peach': '#FBC4A3', 'lavender': '#C4B5FD' };
  function swatch(c) { var h = COLORS[String(c).toLowerCase().trim()]; return h ? 'background:' + h : 'background:conic-gradient(#F87171,#FBBF24,#34D399,#60A5FA,#A78BFA,#F87171)'; }

  /* ---------- styles ---------- */
  var css = document.createElement('style');
  css.textContent = [
    '.fx-hero{max-width:1180px;margin:0 auto 12px;border-radius:18px;padding:22px 20px;color:#fff;background:linear-gradient(120deg,var(--ink,#2A1820) 0%,#4A2235 55%,var(--brand,#D73B6A) 130%);position:relative;overflow:hidden}',
    '.fx-hero:after{content:"";position:absolute;right:-40px;top:-40px;width:220px;height:220px;border-radius:50%;background:rgba(255,255,255,.07)}',
    '.fx-hero h2{margin:0 0 4px;font-size:1.45rem;font-weight:900;letter-spacing:-.01em}.fx-hero p{margin:0;font-size:.86rem;color:#F4E6EC;max-width:640px}',
    '.fx-hero .fx-trust{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.fx-hero .fx-trust span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:4px 10px;font-size:.74rem;font-weight:700}',
    '.fx-tabs{max-width:1180px;margin:0 auto 10px;display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}',
    '.fx-tab{flex-shrink:0;border:1.5px solid var(--border,#EADFE3);background:#fff;border-radius:999px;padding:8px 16px;font-weight:800;font-size:.84rem;cursor:pointer;color:inherit}',
    '.fx-tab.on{background:var(--ink,#2A1820);border-color:var(--ink,#2A1820);color:#fff}.fx-tab small{font-weight:600;opacity:.7;margin-left:4px}',
    '.fx-row{max-width:1180px;margin:0 auto 8px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}',
    '.fx-chip{border:1px solid var(--border,#EADFE3);background:#fff;border-radius:10px;padding:6px 11px;font-size:.78rem;font-weight:700;cursor:pointer;color:inherit}',
    '.fx-chip.on{border-color:var(--brand-btn,#D73B6A);background:var(--brand-btn,#D73B6A);color:#fff}',
    '.fx-row .fx-lbl{font-size:.72rem;font-weight:800;color:var(--muted,#8A7A80);text-transform:uppercase;letter-spacing:.05em;margin-right:2px}',
    '.fx-row select{border:1px solid var(--border,#EADFE3);border-radius:10px;padding:6px 10px;font-size:.8rem;background:#fff}',
    '.fx-sizes{font-size:.68rem;color:var(--text2,#6B5A61);margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.fx-sizes b{font-weight:700;color:inherit}.fx-sizes s{opacity:.45}',
    '.fx-pick h4{margin:0 0 8px;font-size:.86rem;font-weight:800;display:flex;justify-content:space-between;align-items:center;gap:8px}',
    '.fx-pick h4 a{font-size:.78rem;font-weight:700;color:var(--brand-btn,#D73B6A);text-decoration:underline;cursor:pointer}',
    '.fx-opts{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}',
    '.fx-sz{min-width:48px;height:42px;padding:0 12px;border:1.5px solid var(--border,#EADFE3);border-radius:10px;background:#fff;font-weight:800;font-size:.88rem;cursor:pointer;color:inherit;position:relative}',
    '.fx-sz.on{border-color:var(--ink,#2A1820);background:var(--ink,#2A1820);color:#fff}',
    '.fx-sz.out{color:#B9AEB2;background:repeating-linear-gradient(135deg,#fff 0 6px,#F6F1F3 6px 12px);cursor:not-allowed}',
    '.fx-col{display:flex;align-items:center;gap:7px;height:40px;padding:0 12px 0 6px;border:1.5px solid var(--border,#EADFE3);border-radius:999px;background:#fff;font-weight:700;font-size:.82rem;cursor:pointer;color:inherit}',
    '.fx-col i{width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);display:inline-block}',
    '.fx-col.on{border-color:var(--ink,#2A1820);box-shadow:0 0 0 1px var(--ink,#2A1820)}.fx-col.out{opacity:.45}',
    '.fx-st{font-size:.8rem;font-weight:700;margin-top:-2px}.fx-st.ok{color:#047857}.fx-st.low{color:#C2410C}.fx-st.no{color:#B91C1C}',
    '.fx-facts{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:.84rem}.fx-facts dt{color:var(--muted,#8A7A80);font-weight:700}.fx-facts dd{margin:0}',
    '.fx-bg{position:fixed;inset:0;background:rgba(20,10,15,.55);z-index:400;display:flex;align-items:center;justify-content:center;padding:16px}',
    '.fx-box{background:#fff;border-radius:16px;max-width:560px;width:100%;max-height:88vh;overflow:auto;padding:18px}',
    '.fx-box h3{margin:0;font-size:1.05rem}.fx-x{border:0;background:#F3EDEF;border-radius:50%;width:34px;height:34px;font-size:1.1rem;cursor:pointer}',
    '.fx-tbl{width:100%;border-collapse:collapse;font-size:.84rem;margin-top:10px}.fx-tbl th,.fx-tbl td{border-bottom:1px solid #F0E7EA;padding:8px;text-align:center}.fx-tbl th{background:#FBF7F8;font-weight:800}',
    '.fx-tbl tr.on td{background:#FFF4F7;font-weight:800}',
    '.fx-home{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:14px;border-radius:18px;padding:16px 18px;color:#fff;cursor:pointer;background:linear-gradient(120deg,var(--ink,#2A1820),#4A2235 60%,var(--brand,#D73B6A))}',
    '.fx-home .fh-ic{font-size:2.2rem}.fx-home h2{margin:0;font-size:1.1rem;font-weight:900}.fx-home p{margin:2px 0 0;font-size:.8rem;color:#F4E6EC}.fx-home b.fh-go{margin-left:auto;background:#fff;color:var(--ink,#2A1820);border-radius:999px;padding:8px 14px;font-size:.8rem;white-space:nowrap}',
    '.fx-gtiles{max-width:1180px;margin:10px auto 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}',
    '.fx-gtile{background:#fff;border:1px solid var(--border,#EADFE3);border-radius:14px;padding:12px;cursor:pointer;text-align:center;font-weight:800;font-size:.86rem;color:inherit}.fx-gtile span{display:block;font-size:1.5rem}.fx-gtile small{display:block;font-weight:600;color:var(--muted,#8A7A80);font-size:.72rem}'
  ].join('\n');
  document.head.appendChild(css);

  /* ---------- corner page ---------- */
  function f() { var v = G('currentView') || {}; return v.f || (v.f = {}); }
  function setF(k, val) { var x = f(); x[k] = x[k] === val ? '' : val; if (k === 'g') x.t = ''; try { G('updateURL')(); } catch (e) {} G('renderView')(); }
  function corner() {
    var all = items(), x = f();
    if (!all.length) return '<section class="grid-section">' + hero(0) + '<div class="empty-state" style="padding:40px 16px">নতুন পোশাক শিগগিরই আসছে। <a href="#" onclick="goHome();return false" style="color:var(--brand-btn);font-weight:700">হোমে ফিরে যান</a></div></section>';
    var inG = all.filter(function (p) { return !x.g || (p.fashion || {}).gender === x.g || (x.g !== 'Kids' && (p.fashion || {}).gender === 'Unisex'); });
    var types = uniq(inG.map(function (p) { return (p.fashion || {}).type; })).sort();
    var szs = uniq([].concat.apply([], inG.map(sizes))).sort(function (a, b) { return szRank(a) - szRank(b); });
    var L = inG.filter(function (p) {
      if (x.t && (p.fashion || {}).type !== x.t) return false;
      if (x.s && !(sizeQty(p, x.s) > 0)) return false;
      if (x.stock && !((p.qty || 0) > 0)) return false;
      return true;
    });
    var by = { low: function (a, b) { return basePrice(a) - basePrice(b); }, high: function (a, b) { return basePrice(b) - basePrice(a); }, best: function (a, b) { return (b.unitsSold60d || 0) - (a.unitsSold60d || 0); }, new: function (a, b) { return String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')); } }[x.sort];
    L = by ? L.slice().sort(by) : L.slice().sort(function (a, b) { return ((b.qty || 0) > 0) - ((a.qty || 0) > 0) || (b.unitsSold60d || 0) - (a.unitsSold60d || 0); });
    var cnt = function (g) { return all.filter(function (p) { return !g || (p.fashion || {}).gender === g; }).length; };
    var gs = GENDERS.filter(function (g) { return !g[0] || cnt(g[0]); });
    var grid = G('buildProductGrid');
    return '<section class="grid-section">' + hero(all.length) +
      '<div class="fx-tabs">' + gs.map(function (g) { return '<button type="button" class="fx-tab' + ((x.g || '') === g[0] ? ' on' : '') + '" onclick="FASHION.set(\'g\',\'' + g[0] + '\')">' + g[1] + ' <small>' + g[2] + ' · ' + cnt(g[0]) + '</small></button>'; }).join('') + '</div>' +
      (types.length > 1 ? '<div class="fx-row"><span class="fx-lbl">ধরন</span>' + types.map(function (t) { return '<button type="button" class="fx-chip' + (x.t === t ? ' on' : '') + '" onclick="FASHION.set(\'t\',\'' + J(t) + '\')">' + E(t) + '</button>'; }).join('') + '</div>' : '') +
      (szs.length > 1 ? '<div class="fx-row"><span class="fx-lbl">সাইজ</span>' + szs.map(function (s) { return '<button type="button" class="fx-chip' + (x.s === s ? ' on' : '') + '" onclick="FASHION.set(\'s\',\'' + J(s) + '\')">' + E(s) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="fx-row"><select aria-label="Sort" onchange="FASHION.sort(this.value)">' + [['', 'Sort: Recommended'], ['new', 'New arrivals'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['best', 'Best selling']].map(function (o) { return '<option value="' + o[0] + '"' + ((x.sort || '') === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>' +
      '<button type="button" class="fx-chip' + (x.stock ? ' on' : '') + '" onclick="FASHION.set(\'stock\',\'1\')">In stock</button>' +
      ((x.t || x.s || x.stock || x.sort) ? '<button type="button" class="fx-chip" onclick="FASHION.clear()">✕ Clear</button>' : '') +
      '<span style="font-size:.78rem;color:var(--text2)">' + L.length + ' items</span></div>' +
      '<div class="pgrid">' + (grid ? grid(L) : '') + '</div></section>';
  }
  function hero(n) {
    var eps = G('EPS_ON');
    return '<div class="fx-hero"><h2>👗 Fashion Corner — ফ্যাশন কর্নার</h2><p>ছেলে, মেয়ে আর বাচ্চাদের পোশাক। সাইজ চার্ট দেখে নিজের সাইজ বেছে অর্ডার করুন' + (n ? ' — ' + n + 'টি আইটেম' : '') + '।</p>' +
      '<div class="fx-trust"><span>📏 প্রতিটা পোশাকে সাইজ চার্ট</span><span>💵 ক্যাশ অন ডেলিভারি</span>' + (eps ? '<span>💳 বিকাশ / নগদ / কার্ডে পেমেন্ট</span>' : '') + '<span>🚚 সারা দেশে ডেলিভারি</span></div></div>';
  }
  function homeTile() {
    var all = items(); if (!all.length) return '';
    var g = GENDERS.slice(1).map(function (x) { return [x, all.filter(function (p) { return (p.fashion || {}).gender === x[0]; }).length]; }).filter(function (x) { return x[1]; });
    var ic = { Men: '👔', Women: '👗', Kids: '🧸', Unisex: '👕' };
    return '<section class="sec"><div class="fx-home" onclick="FASHION.go()"><span class="fh-ic">👗</span><div><h2>Fashion Corner — ফ্যাশন কর্নার</h2><p>' + all.length + 'টি পোশাক · সাইজ চার্টসহ · ক্যাশ অন ডেলিভারি</p></div><b class="fh-go">দেখুন →</b></div>' +
      (g.length > 1 ? '<div class="fx-gtiles">' + g.map(function (x) { return '<button type="button" class="fx-gtile" onclick="FASHION.go(\'' + x[0][0] + '\')"><span>' + ic[x[0][0]] + '</span>' + x[0][1] + '<small>' + x[0][2] + ' · ' + x[1] + '</small></button>'; }).join('') + '</div>' : '') + '</section>';
  }
  function go(g) { var v = { name: 'fashion', f: g ? { g: g } : {} }; setCV(v); try { G('closeCatMenu')(); } catch (e) {} G('updateURL')(); window.scrollTo(0, 0); G('renderView')(); }
  function setCV(v) { try { eval('currentView = v'); } catch (e) {} }

  /* ---------- product card: sizes line + "Select size" ---------- */
  function sizeLine(p) {
    var s = sizes(p).sort(function (a, b) { return szRank(a) - szRank(b); }); if (!s.length) return '';
    return '<div class="fx-sizes">Size: ' + s.map(function (x) { return sizeQty(p, x) > 0 ? '<b>' + E(x) + '</b>' : '<s>' + E(x) + '</s>'; }).join(' · ') + '</div>';
  }

  /* ---------- product page ---------- */
  var SEL = { id: null, size: '', color: '' };
  function pdpBlock(p) {
    if (SEL.id !== p.id) {
      SEL = { id: p.id, size: '', color: '' };
      var cs = colors(p).filter(function (c) { return colorQty(p, c) > 0; }); if (cs.length === 1 || (colors(p).length && cs.length)) SEL.color = cs[0] || '';
      var ss = sizes(p).filter(function (s) { return sizeQty(p, s, SEL.color) > 0; }); if (sizes(p).length === 1 && ss.length) SEL.size = ss[0];
    }
    return '<div class="pdp-block fx-pick" id="fxPick">' + pickHtml(p) + '</div>' + facts(p);
  }
  function pickHtml(p) {
    var cs = colors(p), ss = sizes(p).sort(function (a, b) { return szRank(a) - szRank(b); }), ff = p.fashion || {};
    var h = '';
    if (cs.length) h += '<h4><span>রঙ: <b>' + E(SEL.color || 'বাছুন') + '</b></span></h4><div class="fx-opts">' + cs.map(function (c) { var q = colorQty(p, c); return '<button type="button" class="fx-col' + (SEL.color === c ? ' on' : '') + (q ? '' : ' out') + '" onclick="FASHION.pick(\'color\',\'' + J(c) + '\')"><i style="' + swatch(c) + '"></i>' + E(c) + '</button>'; }).join('') + '</div>';
    h += '<h4><span>সাইজ: <b>' + E(SEL.size || 'বাছুন') + '</b></span>' + (ff.sizeChart ? '<a onclick="FASHION.chart(\'' + p.id + '\')">📏 Size chart</a>' : '') + '</h4><div class="fx-opts">' + ss.map(function (s) { var q = sizeQty(p, s, cs.length ? SEL.color : ''); return '<button type="button" class="fx-sz' + (SEL.size === s ? ' on' : '') + (q ? '' : ' out') + '"' + (q ? '' : ' aria-disabled="true"') + ' onclick="FASHION.pick(\'size\',\'' + J(s) + '\')" title="' + (q ? q + ' in stock' : 'Sold out') + '">' + E(s) + '</button>'; }).join('') + '</div>';
    var v = SEL.size ? vOf(p, SEL.size, cs.length ? SEL.color : '') : null;
    if (v) { var q = vq(v); h += '<div class="fx-st ' + (q > 3 ? 'ok' : q ? 'low' : 'no') + '">' + (q > 3 ? '● এই সাইজ স্টকে আছে' : q ? '● মাত্র ' + q + 'টি বাকি' : '● এই সাইজ শেষ — অন্য সাইজ বা রঙ দেখুন') + (Number(v.price) > 0 && !onSale(p) && Number(v.price) !== basePrice(p) ? ' · এই সাইজের দাম ' + money(v.price) : '') + '</div>'; }
    else h += '<div class="fx-st" style="color:var(--muted)">' + (cs.length && !SEL.color ? 'রঙ আর ' : '') + 'সাইজ বেছে নিন</div>';
    if (ff.note) h += '<div style="font-size:.8rem;margin-top:8px;color:var(--text2)">💡 ' + E(ff.note) + '</div>';
    return h;
  }
  function facts(p) {
    var ff = p.fashion || {}, rows = [['Type', ff.type], ['For', ff.gender], ['Brand', ff.brand], ['Fabric', ff.fabric], ['Fit', ff.fit], ['Care', ff.care]].filter(function (r) { return r[1]; });
    if (!rows.length) return '';
    return '<div class="pdp-block"><div style="font-weight:800;margin-bottom:8px">Details</div><dl class="fx-facts">' + rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + E(r[1]) + '</dd>'; }).join('') + '</dl></div>';
  }
  function pick(kind, val) {
    var p = prods().find(function (x) { return x.id === SEL.id; }); if (!p) return;
    if (kind === 'size') { if (!(sizeQty(p, val, colors(p).length ? SEL.color : '') > 0)) { G('toast')('এই সাইজটা এখন নেই', 'error'); return; } SEL.size = val; }
    else {
      SEL.color = val;
      if (SEL.size && !(sizeQty(p, SEL.size, val) > 0)) SEL.size = '';
      var n = Number(((p.fashion || {}).colorPhoto || {})[val]) || 0; if (n > 0) { try { G('pdpSetImg')(n - 1); } catch (e) {} }
    }
    var el = document.getElementById('fxPick'); if (el) el.innerHTML = pickHtml(p);
    var pr = document.querySelector('.pdp-plain-price .pp'); var k = chosenKey(p); if (pr && k) pr.textContent = money(priceOf(p, k));
    var qe = document.getElementById('pdpQty'); var v = k && vars(p).find(function (x) { return x.k === k; }); if (qe && v && Number(qe.textContent) > vq(v)) qe.textContent = Math.max(1, vq(v));
  }
  function chosenKey(p) { var cs = colors(p); if (!SEL.size || (cs.length && !SEL.color)) return ''; var v = vOf(p, SEL.size, cs.length ? SEL.color : ''); return v ? v.k : ''; }
  function needPick(p) {
    var cs = colors(p);
    if (cs.length && !SEL.color) { G('toast')('আগে রঙ বেছে নিন', 'error'); return true; }
    if (!SEL.size) { G('toast')('আগে সাইজ বেছে নিন', 'error'); var e = document.getElementById('fxPick'); if (e) e.scrollIntoView({ block: 'center', behavior: 'smooth' }); return true; }
    return false;
  }
  function stepQty(delta) {   // the − / + on the product page: limit by the chosen size's stock
    var p = prods().find(function (x) { return x.id === SEL.id; }); var el = document.getElementById('pdpQty'); if (!p || !el) return;
    var k = chosenKey(p), v = k && vars(p).find(function (x) { return x.k === k; }), max = v ? vq(v) : (p.qty || 0);
    var n = Number(el.textContent) + delta; if (n < 1) n = 1; if (n > max) { G('toast')('এই সাইজের মাত্র ' + max + 'টি আছে', 'error'); n = Math.max(1, max); } el.textContent = n;
  }
  function add(id, buy) {
    var p = prods().find(function (x) { return x.id === id; }); if (!p) return;
    if (SEL.id !== id || needPick(p)) return;
    var k = chosenKey(p), v = vars(p).find(function (x) { return x.k === k; });
    if (!v || !(vq(v) > 0)) { G('toast')('এই সাইজটা এখন নেই', 'error'); return; }
    var qty = Math.max(1, Number((document.getElementById('pdpQty') || {}).textContent) || 1);
    var CART = G('CART'), key = id + '|' + k, price = priceOf(p, k);
    var ex = CART.find(function (c) { return c.key === key; });
    var inCart = ex ? ex.qty : 0;
    if (qty + (buy ? 0 : inCart) > vq(v)) { G('toast')('এই সাইজের মাত্র ' + vq(v) + 'টি আছে', 'error'); return; }
    if (ex) { ex.qty = buy ? Math.max(ex.qty, qty) : ex.qty + qty; ex.price = price; }
    else CART.push({ id: id, key: key, vk: k, size: v.size || '', color: v.color || '', name: p.name + ' (' + label(v) + ')', price: price, qty: qty, imageUrl: p.imageUrl || (p.images && !p.imgCount && p.images[0]) || '' });
    try { G('_setCartImg')(id); } catch (e) {}
    G('saveCart')(); G('toast')(p.name + ' (' + label(v) + ') কার্টে যোগ হয়েছে'); G('renderView')();
    try { G('gaEvent')('add_to_cart', { currency: 'BDT', value: price * qty, items: [{ item_id: id, item_name: p.name, item_variant: label(v), item_category: p.category || '', price: price, quantity: qty }] }); } catch (e) {}
    try { G('fbEvent')('AddToCart', { content_ids: [id], content_type: 'product_group', content_name: p.name, value: price * qty, currency: 'BDT' }); } catch (e) {}
    if (buy) G('openCheckout')();
  }
  /* stock of a cart line (a size of a fashion item, or the product) */
  function lineMax(c) { var p = prods().find(function (x) { return x.id === c.id; }); if (!p) return 0; if (c.vk) { var v = vars(p).find(function (x) { return x.k === c.vk; }); return v ? vq(v) : 0; } return p.qty || 0; }
  function cartProblem(cart) {   // before the order is placed: every line still in stock (sizes of one item counted apart, the item counted together)
    var per = {};
    for (var i = 0; i < cart.length; i++) {
      var c = cart[i], p = prods().find(function (x) { return x.id === c.id; });
      if (!p) return c.name + ' — এখন আর পাওয়া যাচ্ছে না';
      if (c.vk && lineMax(c) < c.qty) return c.name + ' — মাত্র ' + lineMax(c) + 'টি বাকি';
      per[c.id] = (per[c.id] || 0) + c.qty; if ((p.qty || 0) < per[c.id]) return c.name + ' — মাত্র ' + (p.qty || 0) + 'টি বাকি';
    }
    return '';
  }

  /* ---------- size chart ---------- */
  function chart(id) {
    var p = prods().find(function (x) { return x.id === id; }); if (!p) return; var sc = (p.fashion || {}).sizeChart; if (!sc) return;
    var bg = document.createElement('div'); bg.className = 'fx-bg'; bg.id = 'fxChart';
    bg.innerHTML = '<div class="fx-box" role="dialog" aria-label="Size chart"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><h3>📏 Size chart — ' + E(p.name) + '</h3><button class="fx-x" onclick="FASHION.closeChart()" aria-label="Close">×</button></div>' +
      '<div style="font-size:.78rem;color:var(--text2);margin-top:4px">মাপ ' + E(sc.unit || 'inch') + '-এ। নিজের একটা ভালো ফিট হওয়া জামা মেপে মিলিয়ে নিন।</div>' +
      '<div style="overflow-x:auto"><table class="fx-tbl"><thead><tr><th>Size</th>' + (sc.cols || []).map(function (c) { return '<th>' + E(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (sc.rows || []).map(function (r) { return '<tr' + (r.size === SEL.size ? ' class="on"' : '') + '><td><b>' + E(r.size) + '</b></td>' + (r.v || []).map(function (x) { return '<td>' + E(x || '–') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>' +
      '<div style="font-size:.8rem;margin-top:12px;line-height:1.55"><b>কীভাবে মাপবেন</b><br>Chest — বুকের সবচেয়ে চওড়া জায়গায় চারপাশে। Length — কাঁধের ওপর থেকে নিচ পর্যন্ত। Shoulder — এক কাঁধ থেকে আরেক কাঁধ। Waist — কোমরের চারপাশে।</div>' +
      '<div style="margin-top:12px;font-size:.8rem">সাইজ নিয়ে দ্বিধা? <a href="https://wa.me/8801614501860?text=' + encodeURIComponent('Size question: ' + p.name + '\n' + location.href) + '" target="_blank" rel="noopener" style="color:var(--brand-btn);font-weight:700">WhatsApp-এ জিজ্ঞেস করুন</a></div></div>';
    document.body.appendChild(bg);
  }
  function closeChart() { var e = document.getElementById('fxChart'); if (e) e.remove(); }

  window.FASHION = {
    isF: isF, items: items, corner: corner, homeTile: homeTile, go: go, set: setF, sizeLine: sizeLine,
    pdpBlock: pdpBlock, pick: pick, add: add, stepQty: stepQty, lineMax: lineMax, cartProblem: cartProblem, priceOf: priceOf,
    chart: chart, closeChart: closeChart,
    sort: function (v) { f().sort = v; G('renderView')(); },
    clear: function () { var x = f(); var g = x.g; Object.keys(x).forEach(function (k) { delete x[k]; }); if (g) x.g = g; G('updateURL')(); G('renderView')(); }
  };
  // the page may already be showing (opened at ?view=fashion, or a product of the corner) before this file loaded
  try { var cv = G('currentView'); if (cv && (cv.name === 'fashion' || cv.name === 'product' || cv.name === 'home')) setTimeout(function () { try { G('renderView')(); } catch (e) {} }, 0); } catch (e) {}
})();
