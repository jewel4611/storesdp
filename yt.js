/* =====================================================================
   Locked YouTube player
   • The video plays inside our page; visitors cannot click through to
     YouTube (no YouTube controls, title, logo or suggestions are clickable).
   • Only our own buttons: Play / Pause, Sound on / off, Full screen.
   • Nothing is loaded from YouTube until the visitor presses Play
     (just the poster picture), so the page stays fast.
   Usage:  YTP.id(link) -> 11-character video id or ''
           YTP.mount(element, link, { title })
   ===================================================================== */
(function () {
  'use strict';
  if (window.YTP) return;
  function id(url) {
    const s = String(url || '').trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
    const m = s.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
    return m ? m[1] : '';
  }
  let css = false;
  function addCss() {
    if (css) return; css = true;
    const st = document.createElement('style');
    st.textContent = `
.ytp{position:relative;width:100%;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;user-select:none;-webkit-user-select:none}
.ytp:fullscreen{border-radius:0}
.ytp .ytp-frame{position:absolute;left:0;right:0;top:-60px;height:calc(100% + 120px);width:100%;border:0;pointer-events:none}
.ytp .ytp-poster{position:absolute;inset:0;background:#000 center/cover no-repeat;transition:opacity .25s}
.ytp .ytp-shield{position:absolute;inset:0;z-index:2;cursor:pointer;background:transparent}
.ytp .ytp-big{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;width:74px;height:74px;border-radius:50%;border:0;background:rgba(0,0,0,.62);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(0,0,0,.35)}
.ytp .ytp-big svg{width:34px;height:34px;margin-left:4px}
.ytp .ytp-big:hover{background:rgba(0,0,0,.8)}
.ytp .ytp-bar{position:absolute;left:0;right:0;bottom:0;z-index:4;display:flex;gap:6px;align-items:center;padding:8px 10px;background:linear-gradient(transparent,rgba(0,0,0,.65));opacity:0;transition:opacity .2s}
.ytp.playing:hover .ytp-bar,.ytp.paused .ytp-bar,.ytp.touch .ytp-bar{opacity:1}
.ytp .ytp-bar button{border:0;background:rgba(255,255,255,.16);color:#fff;width:36px;height:32px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center}
.ytp .ytp-bar button:hover{background:rgba(255,255,255,.3)}
.ytp .ytp-bar svg{width:18px;height:18px}
.ytp .ytp-bar .sp{flex:1}
.ytp .ytp-lbl{position:absolute;left:10px;top:10px;z-index:3;background:rgba(0,0,0,.55);color:#fff;font:600 12px/1 system-ui,sans-serif;padding:6px 9px;border-radius:6px;pointer-events:none}
.ytp.playing .ytp-lbl,.ytp.playing .ytp-big{display:none}
.ytp.playing .ytp-poster{opacity:0}
.ytp.paused .ytp-poster{opacity:.55}`;
    document.head.appendChild(st);
  }
  const I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm15.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3v-3h2v5h-5v-2z"/></svg>',
    again: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>'
  };
  function mount(el, url, opt) {
    const vid = id(url); if (!el || !vid) return null;
    opt = opt || {}; addCss();
    el.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'ytp';
    box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Video' + (opt.title ? ': ' + opt.title : ''));
    box.oncontextmenu = e => e.preventDefault();
    box.innerHTML = `<div class="ytp-poster" style="background-image:url('https://i.ytimg.com/vi/${vid}/hqdefault.jpg')"></div>
      <span class="ytp-lbl">▶ ${opt.label || 'Video'}</span>
      <div class="ytp-shield"></div>
      <button type="button" class="ytp-big" aria-label="Play video">${I.play}</button>
      <div class="ytp-bar"><button type="button" data-k="pp" aria-label="Play / pause">${I.play}</button><button type="button" data-k="mu" aria-label="Sound on / off">${I.vol}</button><span class="sp"></span><button type="button" data-k="fs" aria-label="Full screen">${I.full}</button></div>`;
    el.appendChild(box);
    if (matchMedia('(hover:none)').matches) box.classList.add('touch');
    let frame = null, state = 'idle', muted = false, ready = false, queue = [];
    const pp = box.querySelector('[data-k=pp]'), mu = box.querySelector('[data-k=mu]'), big = box.querySelector('.ytp-big');
    const send = (func, args) => { const m = JSON.stringify({ event: 'command', func, args: args || [] }); if (frame && ready) frame.contentWindow.postMessage(m, '*'); else queue.push(m); };
    const setState = s => { state = s; box.classList.toggle('playing', s === 'playing'); box.classList.toggle('paused', s === 'paused' || s === 'ended'); pp.innerHTML = s === 'playing' ? I.pause : I.play; big.innerHTML = s === 'ended' ? I.again : I.play; };
    function start() {
      if (frame) { send(state === 'ended' ? 'seekTo' : 'playVideo', state === 'ended' ? [0, true] : []); if (state === 'ended') send('playVideo'); setState('playing'); return; }
      frame = document.createElement('iframe');
      frame.className = 'ytp-frame';
      frame.title = opt.title || 'Video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.setAttribute('tabindex', '-1');
      frame.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&cc_load_policy=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
      frame.onload = () => { ready = true; frame.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: vid }), '*'); queue.splice(0).forEach(m => frame.contentWindow.postMessage(m, '*')); };
      box.insertBefore(frame, box.firstChild);
      setState('playing');
    }
    window.addEventListener('message', e => {
      if (!frame || e.source !== frame.contentWindow) return;
      let d; try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch (x) { return; }
      const ps = d && d.info && d.info.playerState;
      if (ps === 0) setState('ended'); else if (ps === 1) setState('playing'); else if (ps === 2 && state !== 'ended') setState('paused');
      if (d && d.info && typeof d.info.muted === 'boolean') { muted = d.info.muted; mu.innerHTML = muted ? I.mute : I.vol; }
    });
    const toggle = () => { if (state === 'playing') { send('pauseVideo'); setState('paused'); } else start(); };
    big.onclick = start;
    box.querySelector('.ytp-shield').onclick = toggle;
    pp.onclick = toggle;
    mu.onclick = () => { muted = !muted; send(muted ? 'mute' : 'unMute'); mu.innerHTML = muted ? I.mute : I.vol; };
    box.querySelector('[data-k=fs]').onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
      else if (box.webkitRequestFullscreen) box.webkitRequestFullscreen();
    };
    return box;
  }
  window.YTP = { id, mount };
})();
