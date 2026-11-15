/* Supreme Digital Point — growth tools in the shop (server: /mart/growth.php; settings: SDP Online › Mart Growth).
   • cart / wishlist of a device with Mart notifications on → abandoned-cart reminder, back in stock, price drop
   • after an order: coupon / referral count, first-order list, Meta Conversions API (same event id as the Pixel)
   • referral link (?ref=CODE) → the friend's discount at checkout; "Invite friends" card in My account
   • share buttons on the product page (Facebook, WhatsApp, Messenger, copy link) */
(function () {
  'use strict';
  var API = 'https://supremegroup.xyz/mart/growth.php';
  function cfg() { return window.MART_CFG || {}; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function post(a, body, keep) { return fetch(API + '?a=' + a, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: !!keep }).then(function (r) { return r.json(); }); }
  function E(s) { return typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function tk(n) { return typeof fmt === 'function' ? fmt(n) : '৳' + n; }

  /* the push subscription of this device ('' when notifications are off) */
  var epP = null;
  function ep() {
    if (epP) return epP;
    epP = (function () {
      try {
        if (!window.martPushOn || !martPushOn() || !navigator.serviceWorker) return Promise.resolve('');
        return navigator.serviceWorker.getRegistration('/').then(function (reg) { return reg ? reg.pushManager.getSubscription() : null; })
          .then(function (s) { return s ? s.endpoint : ''; }).catch(function () { return ''; });
      } catch (e) { return Promise.resolve(''); }
    })();
    epP.then(function (e) { if (!e) epP = null; });   // ask again later (notifications may be switched on meanwhile)
    return epP;
  }

  /* ---- cart & wishlist → server (only for devices that get Mart notifications) ---- */
  var T = {};
  window.martSync = function (kind) {
    clearTimeout(T[kind]);
    T[kind] = setTimeout(function () {
      var c = cfg(); if (kind === 'cart' ? c.cart === false : c.wish === false) return;
      ep().then(function (e) {
        if (!e) return;
        if (kind === 'cart') post('cart', { ep: e, total: typeof cartTotal === 'function' ? cartTotal() : 0, items: (typeof CART !== 'undefined' ? CART : []).map(function (x) { return { id: x.id, name: x.name, qty: x.qty }; }) }).catch(function () {});
        else {
          var P = typeof PRODUCTS !== 'undefined' ? PRODUCTS : []; if (!P.length) return;
          var items = (typeof WISHLIST !== 'undefined' ? WISHLIST : []).map(function (id) { var p = P.find(function (x) { return x.id === id; }); return p ? { id: id, p: typeof effectivePrice === 'function' ? effectivePrice(p) : p.sellingPrice, q: (p.qty || 0) > 0 } : null; }).filter(Boolean);
          post('wish', { ep: e, items: items }).catch(function () {});
        }
      });
    }, 2500);
  };
  // once a day: tell the server the current wishlist (the prices / stock it compares with)
  setTimeout(function () {
    var day = new Date().toISOString().slice(0, 10);
    if (ls('sm_wsync') === day) return;
    var tries = 0, t = setInterval(function () {
      if ((typeof PRODUCTS !== 'undefined' && PRODUCTS.length) || ++tries > 20) { clearInterval(t); if ((typeof WISHLIST !== 'undefined' ? WISHLIST : []).length) { martSync('wish'); ls('sm_wsync', day); } if ((typeof CART !== 'undefined' ? CART : []).length) martSync('cart'); }
    }, 1500);
  }, 4000);

  /* ---- after an order is saved ---- */
  function cookie(n) { var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)')); return m ? decodeURIComponent(m[1]) : ''; }
  window.martPlaced = function (orderId) {
    ep().then(function (e) { post('placed', { id: orderId, fbp: cookie('_fbp'), fbc: cookie('_fbc'), ep: e }, true).catch(function () {}); });
    ls('sm_ref', null);
  };

  /* ---- referral link: ?ref=CODE ---- */
  (function () {
    var m = location.search.match(/[?&]ref=([A-Za-z0-9]{4,12})/); if (!m) return;
    var code = m[1].toUpperCase(); ls('sm_ref', JSON.stringify({ c: code, at: Date.now() }));
    fetch(API + '?a=refinfo&r=' + encodeURIComponent(code)).then(function (r) { return r.json(); }).then(function (j) {
      if (!j.ok) return;
      var bar = document.createElement('div');
      bar.setAttribute('style', 'position:fixed;z-index:95;left:12px;right:12px;top:12px;max-width:520px;margin:0 auto;background:#15803D;color:#fff;border-radius:14px;padding:12px 40px 12px 14px;font-size:.88rem;line-height:1.45;box-shadow:0 10px 30px rgba(0,0,0,.25)');
      bar.innerHTML = '🎁 <b>আপনার বন্ধু আপনাকে ' + E(tk(j.off)) + ' ছাড় পাঠিয়েছেন!</b><br>প্রথম অর্ডারে (' + E(tk(j.min)) + '+) চেকআউটে নিজে থেকেই বসে যাবে।' +
        '<button aria-label="Close" style="position:absolute;right:8px;top:8px;background:none;border:0;color:#fff;font-size:1.3rem;cursor:pointer">×</button>';
      bar.querySelector('button').onclick = function () { bar.remove(); };
      document.body.appendChild(bar);
    }).catch(function () {});
  })();

  /* ---- "Invite friends" card in My account ---- */
  var REF = null, refBusy = false;
  function refShare(link) {
    var t = 'Supreme Digital Point থেকে কেনাকাটা করুন — আমার লিংকে প্রথম অর্ডারে ছাড় পাবেন: ' + link;
    return '<div class="g-share">' +
      '<a href="https://wa.me/?text=' + encodeURIComponent(t) + '" target="_blank" rel="noopener" style="background:#25D366">WhatsApp</a>' +
      '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link) + '" target="_blank" rel="noopener" style="background:#1877F2">Facebook</a>' +
      (/Android|iPhone|iPad/i.test(navigator.userAgent) ? '<a href="fb-messenger://share/?link=' + encodeURIComponent(link) + '" style="background:#0084FF">Messenger</a>' : '') +
      '<button type="button" onclick="martCopy(\'' + E(link) + '\')" style="background:#475569">লিংক কপি</button></div>';
  }
  window.martRefCard = function () {
    var c = cfg(); if (!c.ref || typeof ACCOUNT === 'undefined' || !ACCOUNT) return '';
    if (!REF && !refBusy && typeof auth !== 'undefined' && auth.currentUser) {
      refBusy = true;
      auth.currentUser.getIdToken().then(function (t) { return ep().then(function (e) { return post('myref', { idToken: t, ep: e }); }); })
        .then(function (j) { REF = j; var el = document.getElementById('gRefCard'); if (el) el.outerHTML = window.martRefCard(); }).catch(function () {}).then(function () { refBusy = false; });
    }
    if (!REF || !REF.on) return '<div class="acc-card" id="gRefCard"><div class="acc-hd"><h3>🎁 বন্ধুকে আমন্ত্রণ জানান</h3></div><p style="color:var(--muted);font-size:.85rem">লোড হচ্ছে…</p></div>';
    var rw = (REF.rewards || []).map(function (r) {
      return '<div style="display:flex;justify-content:space-between;gap:8px;border-top:1px solid var(--line);padding:7px 0;font-size:.84rem"><span><b style="font-family:monospace">' + E(r.code) + '</b> · ' + E(tk(r.value)) + ' ছাড় (' + E(tk(r.min)) + '+)</span><span style="color:' + (r.used ? '#6b7280' : r.live ? '#15803D' : '#B4321A') + '">' + (r.used ? 'ব্যবহার হয়েছে' : r.live ? r.till + ' পর্যন্ত' : 'মেয়াদ শেষ') + '</span></div>';
    }).join('');
    return '<div class="acc-card" id="gRefCard"><div class="acc-hd"><h3>🎁 বন্ধুকে আমন্ত্রণ জানান</h3></div>' +
      '<p style="font-size:.86rem;line-height:1.55;margin-bottom:8px">আপনার লিংকে বন্ধু প্রথম অর্ডারে <b>' + E(tk(REF.friendOff)) + ' ছাড়</b> পাবেন (' + E(tk(REF.friendMin)) + '+)। তাঁর অর্ডার ডেলিভারি হলে আপনি পাবেন <b>' + E(tk(REF.reward)) + ' ছাড়ের কুপন</b>।</p>' +
      '<div style="font-family:monospace;background:var(--tint,#f5f5f5);border-radius:10px;padding:8px 10px;font-size:.82rem;word-break:break-all">' + E(REF.link) + '</div>' + refShare(REF.link) +
      (REF.pending ? '<p style="font-size:.8rem;color:var(--muted);margin-top:8px">⏳ ' + REF.pending + 'টি বন্ধুর অর্ডার ডেলিভারির অপেক্ষায়</p>' : '') +
      (rw ? '<div style="margin-top:10px"><b style="font-size:.86rem">আপনার কুপন</b>' + rw + '</div>' : '') + '</div>';
  };
  window.martCopy = function (t) {
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { if (window.toast) toast('লিংক কপি হয়েছে'); })
      .catch(function () { window.prompt('লিংকটা কপি করুন:', t); });
  };

  /* ---- share buttons on the product page ---- */
  window.martShareRow = function (p) {
    if (cfg().share === false || !p) return '';
    var url = /^https:/.test(location.protocol) && !/localhost|127\.0\.0\.1/.test(location.host) && typeof shareUrl === 'function' ? shareUrl(p) : location.href;
    var t = p.name + ' — ' + tk(typeof effectivePrice === 'function' ? effectivePrice(p) : p.sellingPrice) + ' · Supreme Digital Point\n' + url;
    var tr = "try{gaEvent('share',{method:'%m',content_type:'product',item_id:'" + E(p.id) + "'});}catch(e){}";
    return '<div class="pdp-block"><div style="font-weight:800;margin-bottom:8px;font-size:.88rem">Share / শেয়ার করুন</div><div class="g-share">' +
      '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '" target="_blank" rel="noopener" style="background:#1877F2" onclick="' + tr.replace('%m', 'facebook') + '">Facebook</a>' +
      '<a href="https://wa.me/?text=' + encodeURIComponent(t) + '" target="_blank" rel="noopener" style="background:#25D366" onclick="' + tr.replace('%m', 'whatsapp') + '">WhatsApp</a>' +
      (/Android|iPhone|iPad/i.test(navigator.userAgent) ? '<a href="fb-messenger://share/?link=' + encodeURIComponent(url) + '" style="background:#0084FF" onclick="' + tr.replace('%m', 'messenger') + '">Messenger</a>' : '') +
      '<button type="button" style="background:#475569" onclick="martCopy(\'' + E(url) + '\');' + tr.replace('%m', 'copy') + '">Copy link</button></div></div>';
  };
  var st = document.createElement('style');
  st.textContent = '.g-share{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.g-share a,.g-share button{color:#fff;border:0;border-radius:10px;padding:8px 14px;font-weight:700;font-size:.82rem;text-decoration:none;cursor:pointer;font-family:inherit}' +
    '.ck-cp-on{display:flex;justify-content:space-between;align-items:center;gap:8px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:10px 12px;font-size:.86rem}';
  document.head.appendChild(st);
  // the product page / account page drawn before this file loaded → draw again with the buttons / card
  function redraw() { try { if (typeof currentView !== 'undefined' && ['product', 'account'].indexOf(currentView.name) >= 0 && typeof renderView === 'function') renderView(); } catch (e) {} }
  redraw(); document.addEventListener('martcfg', redraw);

  /* timed reminders on the server (it runs them at most every 10 minutes) */
  setTimeout(function () { try { fetch(API + '?a=tick').catch(function () {}); } catch (e) {} }, 7000);
})();
