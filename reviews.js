/* Supreme Digital Point — product reviews (stored by /mart/reviews.php; shown only after SDP staff publish them).
   • stars on product cards, rating + reviews on the product page, "Write a review"
   • ?review=CODE (the WhatsApp link staff send after delivery) → rate every item of that order → ✓ Verified buyer */
(function () {
  'use strict';
  var API = 'https://supremegroup.xyz/mart/reviews.php', REV = window.MART_REV = {}, LISTS = {};
  function E(s) { return typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function stars(n, size) { var r = Math.round(n * 2) / 2, h = ''; for (var i = 1; i <= 5; i++) h += '<span class="rv-st' + (r >= i ? ' on' : r >= i - .5 ? ' half' : '') + '">★</span>'; return '<span class="rv-stars"' + (size ? ' style="font-size:' + size + '"' : '') + '>' + h + '</span>'; }
  function when(t) { try { return new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return ''; } }

  var css = document.createElement('style');
  css.textContent = '.rv-stars{color:#E5E7EB;letter-spacing:1px;white-space:nowrap}.rv-st.on{color:#F59E0B}.rv-st.half{background:linear-gradient(90deg,#F59E0B 50%,#E5E7EB 50%);-webkit-background-clip:text;background-clip:text;color:transparent}' +
    '.pc-rate{display:flex;align-items:center;gap:4px;font-size:.7rem;color:var(--muted);margin-top:-2px}.pc-rate .rv-stars{font-size:.74rem}' +
    '.pdp-rate{display:inline-flex;align-items:center;gap:6px;margin-top:6px;font-size:.82rem;color:var(--muted);cursor:pointer}.pdp-rate b{color:var(--ink)}' +
    '.rv-head{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px}.rv-big{font-size:2.2rem;font-weight:800;color:var(--ink);line-height:1}' +
    '.rv-dist{flex:1;min-width:150px;font-size:.7rem;color:var(--muted)}.rv-dist div{display:flex;align-items:center;gap:6px}.rv-dist i{flex:1;height:6px;border-radius:9px;background:var(--line);overflow:hidden}.rv-dist i b{display:block;height:100%;background:#F59E0B}' +
    '.rv-item{border-top:1px solid var(--line);padding:11px 0}.rv-item .t{font-size:.86rem;margin-top:4px;white-space:pre-line;color:var(--ink)}.rv-item .m{font-size:.72rem;color:var(--muted);display:flex;gap:8px;flex-wrap:wrap;align-items:center}' +
    '.rv-ver{color:#15803D;font-weight:700}.rv-reply{margin-top:7px;background:var(--tint);border-radius:10px;padding:8px 10px;font-size:.8rem}.rv-write{background:var(--brand-btn);color:#fff;border:0;border-radius:11px;padding:10px 16px;font-weight:700;cursor:pointer}' +
    '.rv-pick{display:flex;gap:4px;font-size:2rem;cursor:pointer;user-select:none}.rv-pick span{color:#E5E7EB;transition:transform .1s}.rv-pick span.on{color:#F59E0B}.rv-pick span:hover{transform:scale(1.15)}' +
    '.rv-prod textarea,#rv_t{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;font:inherit;font-size:.84rem;background:#fff;color:var(--ink)}.rv-prod{border:1px solid var(--line);border-radius:14px;padding:12px;margin-bottom:12px}.rv-prod .n{font-weight:700;font-size:.88rem;margin-bottom:6px}.rv-done{color:#15803D;font-weight:700;font-size:.82rem}';
  document.head.appendChild(css);
  var bg = document.createElement('div'); bg.className = 'modal-bg'; bg.id = 'rvBg';
  bg.innerHTML = '<div class="modal" style="max-width:480px"><div class="modal-hd"><h3 id="rvTitle">Write a review</h3><button class="drawer-close" onclick="rvClose()">×</button></div><div class="modal-body" id="rvBody"></div></div>';
  document.body.appendChild(bg);
  window.rvClose = function () { bg.classList.remove('show'); };

  // ---- data ----
  fetch(API + '?a=summary').then(function (r) { return r.json(); }).then(function (j) { if (j && !j.error) { Object.assign(REV, j); if (Object.keys(j).length && typeof renderView === 'function') renderView(); } }).catch(function () {});
  function loadList(pid, force) {
    if (!force && LISTS[pid]) return Promise.resolve(LISTS[pid]);
    return fetch(API + '?a=list&pid=' + encodeURIComponent(pid)).then(function (r) { return r.json(); }).then(function (j) { LISTS[pid] = j; return j; });
  }

  // ---- product cards: ★ 4.5 (12) under the name ----
  var _card = window.productCard;
  if (typeof _card === 'function') window.productCard = function (p) {
    var h = _card.apply(this, arguments), r = p && REV[p.id]; if (!r) return h;
    var i = h.indexOf('class="pcard-name"'); if (i < 0) return h; var e = h.indexOf('</span>', i); if (e < 0) return h;
    return h.slice(0, e + 7) + '<div class="pc-rate">' + stars(r.a) + '<span>' + r.a + ' (' + r.n + ')</span></div>' + h.slice(e + 7);
  };
  // ---- product page ----
  var _pdp = window.buildProductDetail;
  if (typeof _pdp === 'function') window.buildProductDetail = function (id) {
    var h = _pdp.apply(this, arguments), r = REV[id];
    var k = h.indexOf('</h1>', h.indexOf('class="pdp-name"'));
    if (k > 0) h = h.slice(0, k + 5) + '<div class="pdp-rate" onclick="document.getElementById(\'pdpReviews\').scrollIntoView({behavior:\'smooth\'})">' + (r ? stars(r.a) + ' <b>' + r.a + '</b> · ' + r.n + ' review' + (r.n > 1 ? 's' : '') : '☆ No reviews yet — be the first') + '</div>' + h.slice(k + 5);
    var a = h.indexOf('<div class="pdp-block ask-row">');
    var block = '<div class="pdp-block" id="pdpReviews"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px"><div style="font-weight:800">⭐ Customer reviews</div><button class="rv-write" onclick="rvWrite(\'' + E(id) + '\')">✍️ Write a review</button></div><div id="pdpRevList" style="font-size:.82rem;color:var(--muted)">Loading reviews…</div></div>';
    h = a > 0 ? h.slice(0, a) + block + h.slice(a) : h + block;
    setTimeout(function () { fill(id); }, 0);
    return h;
  };
  function fill(pid) {
    loadList(pid).then(function (j) {
      var box = document.getElementById('pdpRevList'); if (!box) return;
      if (!j || !j.n) { box.innerHTML = 'No reviews yet. Bought this item? Tell others what you think.'; return; }
      var max = Math.max.apply(null, [5, 4, 3, 2, 1].map(function (s) { return j.dist[s] || 0; })) || 1;
      box.innerHTML = '<div class="rv-head"><div><div class="rv-big">' + j.avg + '</div>' + stars(j.avg, '1rem') + '<div style="font-size:.72rem">' + j.n + ' review' + (j.n > 1 ? 's' : '') + '</div></div>' +
        '<div class="rv-dist">' + [5, 4, 3, 2, 1].map(function (s) { return '<div>' + s + '★<i><b style="width:' + Math.round((j.dist[s] || 0) / max * 100) + '%"></b></i>' + (j.dist[s] || 0) + '</div>'; }).join('') + '</div></div>' +
        j.reviews.map(function (r) {
          return '<div class="rv-item"><div class="m">' + stars(r.stars) + '<b style="color:var(--ink)">' + E(r.name) + '</b>' + (r.verified ? '<span class="rv-ver">✓ Verified buyer</span>' : '') + '<span>' + when(r.at) + '</span></div><div class="t">' + E(r.text) + '</div>' +
            (r.reply ? '<div class="rv-reply"><b>Supreme Digital Point:</b> ' + E(r.reply) + '</div>' : '') + '</div>';
        }).join('');
    }).catch(function () { var box = document.getElementById('pdpRevList'); if (box) box.textContent = 'Could not load reviews.'; });
  }

  // ---- write a review (one product) ----
  function picker(id, v) { return '<div class="rv-pick" id="' + id + '" data-v="' + (v || 0) + '">' + [1, 2, 3, 4, 5].map(function (i) { return '<span data-s="' + i + '"' + (i <= v ? ' class="on"' : '') + '>★</span>'; }).join('') + '</div>'; }
  document.addEventListener('click', function (e) {
    var s = e.target.closest && e.target.closest('.rv-pick span'); if (!s) return;
    var box = s.parentNode, v = +s.dataset.s; box.dataset.v = v;
    box.querySelectorAll('span').forEach(function (x) { x.classList.toggle('on', +x.dataset.s <= v); });
    var lab = document.getElementById(box.id + '_l'); if (lab) lab.textContent = ['', 'Poor', 'Not good', 'OK', 'Good', 'Excellent!'][v];
  });
  function me() { var c = window.currentCustomer || (typeof currentCustomer !== 'undefined' ? currentCustomer : null) || {}; return c; }
  window.rvWrite = function (pid) {
    var p = (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []).find(function (x) { return x.id === pid; }) || { name: '' };
    document.getElementById('rvTitle').textContent = 'Write a review';
    document.getElementById('rvBody').innerHTML = '<div style="font-weight:700;font-size:.9rem;margin-bottom:8px">' + E(p.name) + '</div>' +
      '<div class="field"><label>Your rating *</label>' + picker('rv_s', 0) + '<div id="rv_s_l" style="font-size:.78rem;color:var(--muted);min-height:1em"></div></div>' +
      '<div class="field"><label>Your review *</label><textarea id="rv_t" rows="4" maxlength="1000" placeholder="How is the quality? Was it as described? Would you recommend it?"></textarea></div>' +
      '<div class="field"><label>Your name *</label><input id="rv_n" maxlength="60" value="' + E(me().name || '') + '" placeholder="Shown with your review"></div>' +
      '<div class="field"><label>Order code <span class="opt">(optional — adds a ✓ Verified buyer badge)</span></label><input id="rv_o" maxlength="10" placeholder="e.g. A7K92M" style="text-transform:uppercase"></div>' +
      '<p style="font-size:.72rem;color:var(--muted);margin:-4px 0 12px">Reviews appear after a quick check by our team. Your phone number is never shown.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" id="rv_go">Submit review</button></div>';
    bg.classList.add('show');
    document.getElementById('rv_go').onclick = function () { submitOne(pid, p.name, this); };
  };
  function post(body) {
    return fetch(API + '?a=submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || 'Could not send'); return j; }); });
  }
  function submitOne(pid, pname, btn) {
    var v = +document.getElementById('rv_s').dataset.v, t = document.getElementById('rv_t').value.trim(), n = document.getElementById('rv_n').value.trim(), o = document.getElementById('rv_o').value.trim().toUpperCase();
    if (!v) return toast('Tap the stars to rate', 'error'); if (t.length < 3) return toast('Write a few words', 'error'); if (!n) return toast('Write your name', 'error');
    btn.disabled = true; btn.textContent = 'Sending…';
    post({ pid: pid, pname: pname, stars: v, text: t, name: n, orderId: o, phone: me().phone || '' }).then(function (j) {
      document.getElementById('rvBody').innerHTML = '<div style="text-align:center;padding:10px 0 4px"><div style="font-size:2.4rem">🙏</div><p style="font-weight:700;margin:6px 0">Thank you for your review!</p><p style="font-size:.82rem;color:var(--muted)">It will appear on the product page after a quick check' + (j.verified ? ' — with a ✓ Verified buyer badge' : '') + '.</p><button class="btn btn-primary" style="margin-top:12px;width:100%" onclick="rvClose()">Done</button></div>';
    }).catch(function (e) { toast(e.message, 'error'); btn.disabled = false; btn.textContent = 'Submit review'; });
  }

  // ---- ?review=CODE: rate every item of a delivered order ----
  async function rateOrder(code) {
    document.getElementById('rvTitle').textContent = 'Rate your order #' + code;
    document.getElementById('rvBody').innerHTML = '<p style="color:var(--muted)">Loading your order…</p>'; bg.classList.add('show');
    try {
      var d = await db.collection('onlineOrders').doc(code).get();
      if (!d.exists) { document.getElementById('rvBody').innerHTML = '<p>Order #' + E(code) + ' was not found. Please check the link or <a href="https://wa.me/8801614501860" target="_blank">WhatsApp us</a>.</p>'; return; }
      var o = d.data(), seen = {}, items = (o.items || []).filter(function (i) { if (!i.productId || seen[i.productId]) return false; seen[i.productId] = 1; return true; });
      var done = []; try { done = (await (await fetch(API + '?a=reviewed&order=' + encodeURIComponent(code))).json()).pids || []; } catch (e) {}
      document.getElementById('rvBody').innerHTML = '<p style="font-size:.84rem;margin:0 0 12px">Assalamu alaikum' + (o.customerName ? ' <b>' + E(o.customerName) + '</b>' : '') + '! How were the items you got from Supreme Digital Point? Your review helps other shoppers. 🙏</p>' +
        items.map(function (it, i) {
          if (done.indexOf(it.productId) >= 0) return '<div class="rv-prod"><div class="n">' + E(it.name) + '</div><div class="rv-done">✓ Already reviewed — thank you!</div></div>';
          return '<div class="rv-prod" data-pid="' + E(it.productId) + '" data-name="' + E(it.name) + '"><div class="n">' + E(it.name) + '</div>' + picker('rvo_' + i, 0) + '<div id="rvo_' + i + '_l" style="font-size:.74rem;color:var(--muted);min-height:1em"></div>' +
            '<textarea rows="2" maxlength="1000" placeholder="A few words about this item (optional)" style="margin-top:6px"></textarea></div>';
        }).join('') +
        '<div class="field"><label>Your name *</label><input id="rvo_n" maxlength="60" value="' + E(o.customerName || '') + '"></div>' +
        '<div class="btn-row"><button class="btn btn-primary" id="rvo_go">Submit</button></div>';
      var go = document.getElementById('rvo_go'); if (!document.querySelector('.rv-prod[data-pid]')) { go.textContent = 'Close'; go.onclick = rvClose; return; }
      go.onclick = async function () {
        var name = document.getElementById('rvo_n').value.trim(); if (!name) return toast('Write your name', 'error');
        var list = [].slice.call(document.querySelectorAll('.rv-prod[data-pid]')).map(function (b) { return { pid: b.dataset.pid, pname: b.dataset.name, stars: +b.querySelector('.rv-pick').dataset.v, text: b.querySelector('textarea').value.trim() }; }).filter(function (x) { return x.stars; });
        if (!list.length) return toast('Tap the stars for at least one item', 'error');
        go.disabled = true; go.textContent = 'Sending…'; var ok = 0, ver = false;
        for (var k = 0; k < list.length; k++) { var x = list[k]; try { var j = await post({ pid: x.pid, pname: x.pname, stars: x.stars, text: x.text || ['', 'Poor', 'Not good', 'OK', 'Good', 'Excellent'][x.stars], name: name, orderId: code }); ok++; ver = ver || j.verified; } catch (e) { toast(e.message, 'error'); } }
        document.getElementById('rvBody').innerHTML = '<div style="text-align:center;padding:10px 0 4px"><div style="font-size:2.4rem">🙏</div><p style="font-weight:700;margin:6px 0">Thank you! ' + ok + ' review' + (ok > 1 ? 's' : '') + ' sent.</p><p style="font-size:.82rem;color:var(--muted)">They will appear after a quick check' + (ver ? ' with a ✓ Verified buyer badge' : '') + '.</p><button class="btn btn-primary" style="margin-top:12px;width:100%" onclick="rvClose()">Continue shopping</button></div>';
      };
    } catch (e) { document.getElementById('rvBody').innerHTML = '<p>Could not open the order: ' + E(e.message) + '</p>'; }
  }
  var rc = (new URLSearchParams(location.search).get('review') || '').trim().toUpperCase();
  if (/^[A-Z0-9]{4,12}$/.test(rc)) setTimeout(function () { rateOrder(rc); }, 1300);
})();
