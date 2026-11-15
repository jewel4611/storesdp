/* Supreme Digital Point — "Tech store" home template.
   Picked by the owner in SDP POS › Store Theme › Home page layout (storeBanners/_theme → layout: 'tech').
   Layout: dark header with a wide search and quick buttons, a category link bar, a big slider with two side
   tiles, a grid of category cards, then Flash sale / Featured / New arrivals / Best sellers rows with arrows,
   a services band and all products. Every colour comes from the shop theme (the logo colours by default),
   so a special-day theme changes this layout too. 'classic' (or nothing) keeps the normal home page. */
(function () {
  'use strict';
  function G(n) { try { return eval(n); } catch (e) { return undefined; } }
  function E(s) { return typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function layout() { var d = G('THEME_DOC'); return d && d.layout === 'tech' ? 'tech' : 'classic'; }
  function on() { return document.body.classList.contains('lt-tech'); }

  var css = document.createElement('style');
  css.textContent = [
    /* header */
    'body.lt-tech .topbar{background:var(--ink);color:#fff;box-shadow:0 2px 14px rgba(0,0,0,.18)}',
    'body.lt-tech .brand-txt h1{color:#fff}body.lt-tech .brand-txt h1 span{color:var(--accent)}',
    'body.lt-tech .brand-txt p,body.lt-tech .deliver-line b{color:rgba(255,255,255,.72)}',
    'body.lt-tech .brand-mark{box-shadow:0 0 0 2px rgba(255,255,255,.18)}',
    'body.lt-tech .icon-btn{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16);color:#fff;border-radius:10px}',
    'body.lt-tech .icon-btn:hover{background:rgba(255,255,255,.18)}',
    'body.lt-tech .icon-btn.cart{background:var(--brand-btn);border-color:var(--brand-btn)}',
    'body.lt-tech .cart-badge{border-color:var(--ink)}',
    'body.lt-tech .search-input{background:#fff;border-radius:10px 0 0 10px;border:0;height:46px}',
    'body.lt-tech .search-row{padding-bottom:10px}',
    'body.lt-tech .search-field{display:flex}',
    'body.lt-tech .search-field .tl-sbtn{display:flex}',
    '.tl-sbtn{display:none;align-items:center;gap:6px;background:var(--brand-btn);color:#fff;font-weight:700;font-size:.85rem;padding:0 16px;border-radius:0 10px 10px 0;border:0;cursor:pointer;white-space:nowrap}',
    '.tl-sbtn:hover{background:var(--brand-deep)}',
    'body.lt-tech .search-input{border-radius:10px 0 0 10px}',
    '.tl-only{display:none!important}',
    '@media(min-width:1440px){body.lt-tech .tl-only{display:flex!important}}',
    'body.lt-tech .tl-pill{font-weight:700;letter-spacing:.01em}',
    'body.lt-tech .tl-pill b{color:var(--gold2);font-weight:800}',
    /* category link bar */
    '.tl-catnav{display:none}',
    'body.lt-tech .tl-catnav{display:block;background:#fff;border-bottom:1px solid var(--line)}',
    '.tl-catnav .in{max-width:1180px;margin:0 auto;display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:0 10px}',
    '.tl-catnav .in::-webkit-scrollbar{display:none}',
    '.tl-catnav a{flex:none;padding:11px 10px;font-size:.84rem;font-weight:700;color:var(--ink);text-decoration:none;border-bottom:2.5px solid transparent;white-space:nowrap}',
    '.tl-catnav a:hover,.tl-catnav a.on{color:var(--brand-btn);border-bottom-color:var(--brand-btn)}',
    /* hero: slider + two tiles */
    'body.lt-tech{background:#F4F5F7}',
    'body.lt-tech #slideshowWrap.tl-hero{display:grid;grid-template-columns:1fr;gap:12px}',
    '@media(min-width:900px){body.lt-tech #slideshowWrap.tl-hero{grid-template-columns:2.3fr 1fr}}',
    'body.lt-tech #slideshowWrap .slideshow{border-radius:14px;margin:0}',
    '.tl-side{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '@media(min-width:900px){.tl-side{grid-template-columns:1fr;grid-template-rows:1fr 1fr}}',
    '.tl-tile{position:relative;overflow:hidden;border-radius:14px;padding:16px;min-height:120px;display:flex;flex-direction:column;justify-content:center;gap:6px;cursor:pointer;color:#fff;border:0;text-align:left;font:inherit}',
    '.tl-tile .k{font-size:.68rem;font-weight:800;letter-spacing:.08em;opacity:.85}',
    '.tl-tile .h{font-size:1.15rem;font-weight:800;line-height:1.15;max-width:70%}',
    '.tl-tile .b{align-self:flex-start;margin-top:4px;font-size:.74rem;font-weight:800;padding:6px 11px;border-radius:999px;background:#fff}',
    '.tl-tile .ic{position:absolute;right:10px;bottom:6px;font-size:3.4rem;opacity:.95;filter:drop-shadow(0 6px 10px rgba(0,0,0,.18))}',
    '.tl-tile:after{content:"";position:absolute;right:-40px;top:-40px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.12)}',
    '.tl-tile.a{background:linear-gradient(135deg,var(--accent-ink),var(--accent))}.tl-tile.a .b{color:var(--accent-ink)}',
    '.tl-tile.b2{background:linear-gradient(135deg,var(--ink),var(--brand-deep))}.tl-tile.b2 .b{color:var(--brand-btn)}.tl-tile.b2 .k{color:var(--gold2);opacity:1}',
    /* section headings */
    '.tl-sec{max-width:1180px;margin:0 auto;padding:26px 16px 4px}',
    '.tl-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:12px}',
    '.tl-hd h2{font-size:1.3rem;font-weight:800;color:var(--ink);margin:0;display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
    '.tl-hd p{font-size:.8rem;color:var(--muted);margin:2px 0 0}',
    '.tl-nav{display:flex;gap:8px;align-items:center;flex:none}',
    '.tl-arw{width:34px;height:34px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--ink);font-size:1.1rem;cursor:pointer;display:none;align-items:center;justify-content:center}',
    '@media(min-width:700px){.tl-arw{display:flex}}',
    '.tl-arw:hover{border-color:var(--brand-btn);color:var(--brand-btn)}',
    '.tl-all{border:1px solid var(--line);background:#fff;color:var(--ink);font-weight:700;font-size:.8rem;padding:8px 13px;border-radius:999px;text-decoration:none;white-space:nowrap}',
    '.tl-all:hover{border-color:var(--brand-btn);color:var(--brand-btn)}',
    /* category cards */
    '.tl-cats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}',
    '@media(min-width:700px){.tl-cats{grid-template-columns:repeat(6,1fr)}}',
    '@media(min-width:1000px){.tl-cats{grid-template-columns:repeat(8,1fr);gap:12px}}',
    '.tl-cat{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 6px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;font:inherit;color:var(--ink);transition:transform .15s,box-shadow .15s,border-color .15s}',
    '.tl-cat:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(0,0,0,.08);border-color:var(--brand)}',
    '.tl-cat .ic{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.65rem;background:var(--brand-soft)}',
    '.tl-cat:nth-child(3n+2) .ic{background:var(--accent-soft)}.tl-cat:nth-child(3n) .ic{background:var(--gold-soft)}',
    '.tl-cat .n{font-size:.76rem;font-weight:700;text-align:center;line-height:1.2;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}',
    '.tl-cat .c{font-size:.66rem;color:var(--muted);margin-top:-4px}',
    /* product rows */
    '.tl-row{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:2px 2px 10px}',
    '.tl-row::-webkit-scrollbar{display:none}',
    '.tl-row>*{flex:0 0 46%;max-width:230px;scroll-snap-align:start}',
    '@media(min-width:700px){.tl-row>*{flex-basis:210px}}',
    '.tl-flash{background:linear-gradient(135deg,var(--ink),var(--brand-deep));border-radius:18px;padding:16px 14px 6px;margin-top:26px}',
    '.tl-flash .tl-hd h2{color:#fff}.tl-flash .tl-hd p{color:rgba(255,255,255,.7)}',
    '.tl-flash .tl-sec{padding:0}',
    '.tl-wrap{max-width:1180px;margin:0 auto;padding:0 16px}',
    '.tl-trust{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}',
    '@media(min-width:800px){.tl-trust{grid-template-columns:repeat(4,1fr)}}',
    '.tl-trust div{background:#fff;border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;gap:10px;align-items:center;font-size:.78rem;color:var(--muted)}',
    '.tl-trust .i{font-size:1.5rem;flex:none}.tl-trust b{display:block;color:var(--ink);font-size:.84rem}',
    '.tl-hd .flash-clock{display:inline-flex;gap:4px;margin-left:6px}.tl-hd .flash-clock span{background:var(--gold2);color:var(--ink);font-size:.74rem;font-weight:800;padding:4px 7px;border-radius:6px}',
    'body.lt-tech .topbar-actions a.desk-only[href="/"],body.lt-tech .topbar-actions button[onclick="openCatMenu()"]{display:none!important}',
    'body.lt-tech .top-search{max-width:640px}',
    '.tl-svc{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:linear-gradient(135deg,var(--accent-ink),var(--ink));border-radius:16px;padding:22px 24px;color:#fff}',
    '.tl-svc h3{font-size:1.15rem;font-weight:800;margin:0 0 4px}.tl-svc p{font-size:.84rem;opacity:.85;margin:0}',
    '.tl-svc button{background:var(--gold2);color:var(--ink);font-weight:800;border:0;border-radius:10px;padding:12px 20px;cursor:pointer}',
    /* phones: one slim header row — ☰ · logo · 🔍 · cart — the search opens under it */
    '.tl-mb{display:none}',
    '@media(max-width:899px){',
    ' body.lt-tech .tl-mb{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:transparent;border:0;color:#fff;cursor:pointer;flex:none}',
    ' body.lt-tech .tl-mb svg{width:24px;height:24px}',
    ' body.lt-tech .topbar-inner{padding:6px 10px;gap:4px}',
    ' body.lt-tech .brand{flex:1;justify-content:center;min-width:0}',
    ' body.lt-tech .brand-txt p{display:none}',
    ' body.lt-tech .brand-mark{width:36px;height:36px;border-radius:10px}',
    ' body.lt-tech .brand-txt h1{font-size:1rem}',
    ' body.lt-tech .topbar-actions{gap:2px}',
    ' body.lt-tech .topbar-actions button[onclick="openWishlist()"]{display:none}',
    ' body.lt-tech .icon-btn{background:transparent;border:0;min-height:40px;padding:0 9px}',
    ' body.lt-tech .icon-btn.cart{background:transparent}',
    ' body.lt-tech .icon-btn .ico{width:23px;height:23px}',
    ' body.lt-tech .cart-badge{top:-2px;right:-2px;width:18px;height:18px;font-size:.62rem}',
    ' body.lt-tech .search-row{display:none}',
    ' body.lt-tech.tl-sopen .search-row{display:block}',
    ' body.lt-tech .search-input{height:40px}',
    ' body.lt-tech .tl-catnav a{font-size:.78rem;padding:9px 8px}',
    ' body.lt-tech #slideshowWrap{padding:10px 10px 0}',
    ' .tl-side{gap:8px}.tl-tile{min-height:92px;padding:12px;border-radius:12px}.tl-tile .h{font-size:.92rem;max-width:80%}.tl-tile .k{font-size:.58rem}.tl-tile .b{font-size:.66rem;padding:5px 9px}.tl-tile .ic{font-size:2.3rem}',
    ' .tl-sec{padding:20px 10px 2px}.tl-wrap{padding:0 10px}',
    ' .tl-hd h2{font-size:1.08rem}.tl-hd p{font-size:.72rem}.tl-all{font-size:.72rem;padding:6px 10px}',
    ' .tl-cats{gap:8px}.tl-cat{padding:10px 4px 9px;gap:6px;border-radius:10px}.tl-cat .ic{width:44px;height:44px;font-size:1.4rem;border-radius:12px}.tl-cat .n{font-size:.68rem}.tl-cat .c{font-size:.6rem}',
    ' .tl-flash{margin-top:20px;padding:12px 10px 4px;border-radius:14px}',
    ' .tl-trust div{padding:9px;font-size:.68rem}.tl-trust b{font-size:.74rem}.tl-trust .i{font-size:1.2rem}',
    ' .tl-svc{padding:16px}.tl-svc h3{font-size:1rem}.tl-svc p{font-size:.76rem}',
    '}'
  ].join('\n');
  document.head.appendChild(css);

  function cats() {
    var P = G('PRODUCTS') || [], n = {};
    P.forEach(function (p) { if (p.category) n[p.category] = (n[p.category] || 0) + 1; });
    return Object.keys(n).sort(function (a, b) { return n[b] - n[a]; }).map(function (c) { return { name: c, count: n[c] }; });
  }
  function icon(c) { return typeof catIcon === 'function' ? catIcon(c) : '📦'; }
  function card(p, best) { return typeof productCard === 'function' ? productCard(p, best) : ''; }

  // ---------- header extras: search button, quick pills, category link bar ----------
  function header() {
    document.querySelectorAll('.search-field').forEach(function (f) {
      if (f.querySelector('.tl-sbtn')) return;
      var inp = f.querySelector('input'); if (!inp) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'tl-sbtn'; b.innerHTML = '🔍 Search';
      b.onclick = function () { inp.focus(); if (typeof onSearchInput === 'function') onSearchInput(inp); };
      f.appendChild(b);
    });
    var ti = document.querySelector('.topbar-inner');
    if (ti && !ti.querySelector('.tl-mb')) {
      var m = document.createElement('button'); m.type = 'button'; m.className = 'tl-mb'; m.setAttribute('aria-label', 'Menu');
      m.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      m.onclick = function () { openCatMenu(); };
      ti.insertBefore(m, ti.firstChild);
      var cartBtn = ti.querySelector('.icon-btn.cart');
      var sb = document.createElement('button'); sb.type = 'button'; sb.className = 'tl-mb'; sb.setAttribute('aria-label', 'Search');
      sb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
      sb.onclick = function () { var o = document.body.classList.toggle('tl-sopen'); if (o) { var i = document.getElementById('searchBox'); if (i) setTimeout(function () { i.focus(); }, 30); } };
      if (cartBtn) cartBtn.parentNode.insertBefore(sb, cartBtn);
    }
    var act = document.querySelector('.topbar-actions');
    if (act && !act.querySelector('.tl-pill')) {
      var mk = function (html, fn, label) { var b = document.createElement('button'); b.className = 'icon-btn tl-only tl-pill'; b.innerHTML = html; b.setAttribute('aria-label', label); b.onclick = fn; return b; };
      var first = act.firstElementChild;
      [mk('<b>⚡</b> Offers', function () { (G('PRODUCTS') || []).some(isOnSale) ? openSeeAll('flashsale') : openSeeAll('featured'); }, 'Offers'),
       mk('🛠️ Services', function () { openServices(); }, 'Services'),
       mk('📦 Track order', function () { if (typeof openTrackOrder === 'function') openTrackOrder(); else openMyOrders(); }, 'Track order')]
        .forEach(function (b) { act.insertBefore(b, first); });
    }
    var nav = document.getElementById('tlCatNav');
    if (!nav) {
      nav = document.createElement('nav'); nav.id = 'tlCatNav'; nav.className = 'tl-catnav'; nav.setAttribute('aria-label', 'Categories');
      nav.innerHTML = '<div class="in"></div>';
      var h = document.querySelector('header.topbar'); if (h) h.appendChild(nav);
    }
    var cv = G('currentView') || {};
    nav.firstChild.innerHTML = '<a href="#" data-c="" class="' + (cv.name === 'home' ? 'on' : '') + '">🏠 Home</a>' + cats().slice(0, 18).map(function (c) {
      return '<a href="#" data-c="' + E(c.name) + '" class="' + (cv.name === 'category' && cv.cat === c.name ? 'on' : '') + '">' + E(c.name) + '</a>';
    }).join('') + ((G('SERVICES') || []).length ? '<a href="#" data-s="1">Services</a>' : '');
    nav.firstChild.onclick = function (e) {
      var a = e.target.closest('a'); if (!a) return; e.preventDefault();
      if (a.dataset.s) openServices(); else if (a.dataset.c) openCategory(a.dataset.c); else goHome();
    };
  }

  // ---------- hero: the normal slider + two tiles beside it ----------
  function hero() {
    var w = document.getElementById('slideshowWrap'); if (!w) return;
    var old = w.querySelector('.tl-side'); if (old) old.remove();
    w.classList.toggle('tl-hero', on());
    if (!on()) return;
    var P = G('PRODUCTS') || [], S = G('SERVICES') || [];
    var sale = P.filter(isOnSale).length;
    var side = document.createElement('div'); side.className = 'tl-side';
    side.innerHTML =
      (S.length ? '<button class="tl-tile a" data-go="svc"><span class="k">FAST &amp; RELIABLE</span><span class="h">Book a Service</span><span class="b">Book now →</span><span class="ic">🛠️</span></button>'
                : '<button class="tl-tile a" data-go="feat"><span class="k">HAND-PICKED</span><span class="h">Featured products</span><span class="b">Shop now →</span><span class="ic">⭐</span></button>') +
      '<button class="tl-tile b2" data-go="' + (sale ? 'flash' : 'best') + '"><span class="k">' + (sale ? sale + ' ITEMS ON SALE' : 'MOST LOVED') + '</span><span class="h">' + (sale ? 'Flash Sale — today\'s deals' : 'Best sellers') + '</span><span class="b">' + (sale ? 'Grab the deal →' : 'See them →') + '</span><span class="ic">' + (sale ? '⚡' : '🔥') + '</span></button>';
    side.onclick = function (e) {
      var t = e.target.closest('[data-go]'); if (!t) return;
      ({ svc: function () { openServices(); }, feat: function () { openSeeAll('featured'); }, flash: function () { openSeeAll('flashsale'); }, best: function () { openSeeAll('bestsellers'); } })[t.dataset.go]();
    };
    w.appendChild(side);
  }

  // ---------- home body ----------
  var rowN = 0;
  function row(title, sub, items, view, best, extra) {
    if (!items.length) return '';
    var id = 'tlRow' + (++rowN);
    return '<section class="tl-sec"><div class="tl-hd"><div><h2>' + title + (extra || '') + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' +
      '<div class="tl-nav"><button class="tl-arw" aria-label="Scroll left" onclick="document.getElementById(\'' + id + '\').scrollBy({left:-440,behavior:\'smooth\'})">‹</button>' +
      '<button class="tl-arw" aria-label="Scroll right" onclick="document.getElementById(\'' + id + '\').scrollBy({left:440,behavior:\'smooth\'})">›</button>' +
      (view ? '<a href="#" class="tl-all" onclick="openSeeAll(\'' + view + '\');return false;">View all →</a>' : '') + '</div></div>' +
      '<div class="tl-row" id="' + id + '">' + items.map(function (p) { return card(p, best); }).join('') + '</div></section>';
  }
  function techHome() {
    rowN = 0;
    var P = G('PRODUCTS') || [], S = G('SERVICES') || [];
    var inStock = function (p) { return (p.qty || 0) > 0; };
    var flash = P.filter(isOnSale);
    var featured = P.filter(function (p) { return p.isFeatured && inStock(p); });
    var best = P.filter(function (p) { return (p.unitsSold60d || 0) > 0; }).sort(function (a, b) { return (b.unitsSold60d || 0) - (a.unitsSold60d || 0); });
    var dated = P.filter(function (p) { return inStock(p) && (p.createdAt || p.updatedAt); });
    var fresh = (dated.length >= 4 ? dated.sort(function (a, b) { return String(b.createdAt || b.updatedAt).localeCompare(String(a.createdAt || a.updatedAt)); }) : P.filter(inStock).slice().reverse()).slice(0, 12);
    var C = cats(), h = '';
    if (C.length) {
      h += '<section class="tl-sec"><div class="tl-hd"><div><h2>Featured Categories</h2><p>Explore our wide range of products</p></div>' +
        (C.length > 16 ? '<div class="tl-nav"><a href="#" class="tl-all" onclick="openCatMenu();return false;">All categories →</a></div>' : '') + '</div>' +
        '<div class="tl-cats">' + C.slice(0, 16).map(function (c) {
          return '<button type="button" class="tl-cat" onclick="openCategory(\'' + E(c.name).replace(/\\/g, '\\\\').replace(/&#39;/g, "\\'") + '\')"><span class="ic" aria-hidden="true">' + icon(c.name) + '</span><span class="n">' + E(c.name) + '</span><span class="c">' + c.count + ' items</span></button>';
        }).join('') + '</div></section>';
    }
    if (flash.length) h += '<div class="tl-wrap"><div class="tl-flash">' + row('⚡ Flash Sale', 'Limited time deals', flash.slice(0, 12), 'flashsale', false, typeof flashClock === 'function' ? flashClock() : '') + '</div></div>';
    h += '<section class="tl-sec"><div class="tl-trust"><div><span class="i">🚚</span><span><b>Nationwide delivery</b>Free in Tejgaon &amp; Paikpara</span></div><div><span class="i">💵</span><span><b>Cash on delivery</b>Pay when it arrives</span></div><div><span class="i">📱</span><span><b>bKash · Nagad · Card</b>Pay online securely</span></div><div><span class="i">✅</span><span><b>Live stock</b>Straight from our shop</span></div></div></section>';
    h += row('Featured Products', 'Hand-picked for you', featured.slice(0, 12), 'featured');
    h += row('New Arrivals', 'Just landed in our shop', fresh, '');
    h += row('Best Sellers', 'What everyone is buying', best.slice(0, 12), 'bestsellers', true);
    if (S.length) h += '<section class="tl-sec"><div class="tl-svc"><div><h3>Need a service, not a product?</h3><p>Printing, visa processing, ticketing, web development, repair &amp; more — get a quote in minutes.</p></div><button onclick="openServices()">Browse services →</button></div></section>';
    h += '<section class="grid-section"><div class="tl-hd" style="max-width:1180px;margin:0 auto 14px;padding:0 0"><div><h2>All Products</h2><p>' + P.length + ' items</p></div></div><div class="pgrid">' + (typeof buildProductGrid === 'function' ? buildProductGrid(P) : '') + '</div></section>';
    return h;
  }

  // ---------- hooks into the shop ----------
  var _home = window.buildHome;
  window.buildHome = function () { return on() ? techHome() : _home.apply(this, arguments); };
  var _slides = window.renderSlideshow;
  window.renderSlideshow = function () { var r = _slides.apply(this, arguments); hero(); return r; };
  var _view = window.renderView;
  window.renderView = function () { var r = _view.apply(this, arguments); if (on()) header(); return r; };
  function sync() {
    var want = layout() === 'tech';
    try { localStorage.setItem('sm_layout', want ? 'tech' : 'classic'); } catch (e) {}
    if (want === on()) { if (want) header(); return; }
    document.body.classList.toggle('lt-tech', want);
    if (want) header();
    hero();
    if ((G('currentView') || {}).name === 'home' && typeof renderView === 'function') renderView();
  }
  var _apply = window.applyTheme;
  window.applyTheme = function () { var r = _apply.apply(this, arguments); sync(); return r; };
  // first paint: use the last known layout so the page does not jump
  try { if (localStorage.getItem('sm_layout') === 'tech') { document.body.classList.add('lt-tech'); header(); hero(); } } catch (e) {}
  if (G('THEME_DOC')) sync();
  window.martLayoutRefresh = sync;
})();
