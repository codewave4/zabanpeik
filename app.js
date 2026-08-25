/* ============================================================
   LANGUAGES DATA
============================================================ */
const LANGS = [
  ["auto","تشخیص خودکار","auto"],
  ["fa","فارسی","ir"],
  ["en","انگلیسی","gb"],
  ["ar","عربی","sa"],
  ["fr","فرانسوی","fr"],
  ["de","آلمانی","de"],
  ["es","اسپانیایی","es"],
  ["it","ایتالیایی","it"],
  ["pt","پرتغالی","pt"],
  ["ru","روسی","ru"],
  ["tr","ترکی استانبولی","tr"],
  ["zh","چینی","cn"],
  ["ja","ژاپنی","jp"],
  ["ko","کره‌ای","kr"],
  ["hi","هندی","in"],
  ["ur","اردو","pk"],
  ["he","عبری","il"],
  ["nl","هلندی","nl"],
  ["pl","لهستانی","pl"],
  ["sv","سوئدی","se"],
  ["id","اندونزیایی","id"],
  ["ms","مالایی","my"],
  ["th","تایلندی","th"],
  ["vi","ویتنامی","vn"],
  ["uk","اوکراینی","ua"],
  ["el","یونانی","gr"],
  ["cs","چکی","cz"],
  ["ro","رومانیایی","ro"],
  ["hu","مجارستانی","hu"],
  ["da","دانمارکی","dk"],
  ["fi","فنلاندی","fi"],
  ["no","نروژی","no"],
  ["bg","بلغاری","bg"],
  ["hr","کروات","hr"],
  ["sk","اسلواک","sk"],
  ["sl","اسلوونیایی","si"],
  ["lt","لیتوانیایی","lt"],
  ["lv","لتونیایی","lv"],
  ["et","استونیایی","ee"],
  ["sr","صربی","rs"],
  ["mk","مقدونی","mk"],
  ["sq","آلبانیایی","al"],
  ["hy","ارمنی","am"],
  ["az","آذربایجانی","az"],
  ["ka","گرجی","ge"],
  ["kk","قزاقی","kz"],
  ["uz","ازبکی","uz"],
  ["tg","تاجیکی","tj"],
  ["sw","سواحیلی","tz"],
  ["af","آفریقانس","za"],
  ["bn","بنگالی","bd"],
  ["ta","تامیلی","lk"],
  ["te","تلوگو","in"],
  ["ml","مالایالم","in"],
  ["si","سینهالی","lk"],
  ["my","برمه‌ای","mm"],
  ["km","خمری","kh"],
  ["lo","لائوسی","la"],
  ["tl","تاگالوگ","ph"],
  ["ne","نپالی","np"],
  ["mn","مغولی","mn"],
  ["ps","پشتو","af"],
  ["ku","کردی","iq"],
  ["ckb","کردی سورانی","iq"],
  ["sd","سندی","pk"],
  ["ug","اویغوری","cn"],
  ["yi","ییدیش",""],
  ["ga","ایرلندی","ie"],
  ["cy","ولزی","gb-wls"],
  ["eu","باسکی","es-pv"],
  ["ca","کاتالان","es-ct"],
  ["gl","گالیسی","es-ga"],
  ["mt","مالتی","mt"],
  ["is","ایسلندی","is"],
  ["lb","لوکزامبورگی","lu"],
  ["bs","بوسنیایی","ba"],
  ["eo","اسپرانتو",""],
  ["la","لاتین","va"],
  ["haw","هاوایی","us"],
  ["mi","مائوری","nz"],
  ["sm","ساموآیی","ws"],
  ["to","تونگایی","to"],
  ["fj","فیجیایی","fj"]
];
const LANG_MAP = Object.fromEntries(LANGS.map(l=>[l[0],l]));
const TTS_LOCALE_OVERRIDES = { fa:'fa-IR', en:'en-US', zh:'zh-CN', ja:'ja-JP', ko:'ko-KR', ur:'ur-PK', ar:'ar-SA' };

function flagUrl(cc){ 
  if(!cc) return 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/un.svg';
  return 'https://cdn.jsdelivr.net/gh/HatScripts/circle-flags/flags/' + cc + '.svg'; 
}
function ttsLocale(code){ return TTS_LOCALE_OVERRIDES[code] || (code + '-' + code.toUpperCase()); }

/* ============================================================
   STORAGE HELPERS
============================================================ */
const LS = {
  get(key, fallback){ try{ const v = localStorage.getItem(key); return v===null ? fallback : JSON.parse(v);}catch(e){ return fallback; } },
  set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
};

const state = {
  theme: LS.get('tf_theme','dark'),
  defaultFrom: LS.get('tf_default_from','auto'),
  defaultTo: LS.get('tf_default_to','en'),
  tone: LS.get('tf_tone','standard'),
  autoDetect: LS.get('tf_autodetect', true),
  ttsEnabled: LS.get('tf_tts', true),
  statsEnabled: LS.get('tf_stats', true),
  saveHistory: LS.get('tf_savehistory', true),
  history: LS.get('tf_history', [])
};

function persistSettings(){
  LS.set('tf_theme', state.theme);
  LS.set('tf_default_from', state.defaultFrom);
  LS.set('tf_default_to', state.defaultTo);
  LS.set('tf_tone', state.tone);
  LS.set('tf_autodetect', state.autoDetect);
  LS.set('tf_tts', state.ttsEnabled);
  LS.set('tf_stats', state.statsEnabled);
  LS.set('tf_savehistory', state.saveHistory);
}

/* ============================================================
   THEME
============================================================ */
const THEME_ORDER = ['dark','green','light'];
const THEME_LABELS = { dark:'تیره', green:'مشکی و سبز', light:'روشن' };
const THEME_COLORS = { dark:'#0c1220', green:'#000000', light:'#f3f5f9' };

function applyTheme(){
  document.documentElement.setAttribute('data-theme', state.theme);
  const txt = document.getElementById('themeValueText');
  if(txt) txt.textContent = THEME_LABELS[state.theme] || state.theme;
  const m = document.getElementById('metaTheme');
  if(m) m.setAttribute('content', THEME_COLORS[state.theme] || '#0c1220');
}

function cycleTheme(){
  const idx = THEME_ORDER.indexOf(state.theme);
  state.theme = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
  applyTheme(); persistSettings();
}

document.getElementById('themeToggle').addEventListener('click', cycleTheme);
document.getElementById('rowTheme').addEventListener('click', cycleTheme);
applyTheme();

/* ============================================================
   TOAST
============================================================ */
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('visible'), 1800);
}

/* ============================================================
   NAVIGATION
============================================================ */
const PAGE_META = {
  home: { title:'Translify', sub:'ترجمهٔ سریع، دقیق و حرفه‌ای بین بیش از ۱۰۰ زبان' },
  translate: { title:'ترجمه', sub:'ابزار ترجمهٔ سریع و حرفه‌ای' },
  history: { title:'تاریخچه', sub:'سابقهٔ ترجمه‌های شما' },
  settings: { title:'تنظیمات', sub:'شخصی‌سازی تجربهٔ ترجمه' },
  about: { title:'دربارهٔ ما', sub:'اطلاعات بیشتر دربارهٔ این پروژه' }
};

function goToPage(name){
  document.querySelectorAll('.page').forEach(p=> p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.page === name));
  const meta = PAGE_META[name];
  document.getElementById('pageTitle').textContent = meta.title;
  document.getElementById('pageSubtitle').textContent = meta.sub;
  if(name === 'history') renderHistoryPage();
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
}

document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> goToPage(btn.dataset.page));
});
document.getElementById('menuBtn').addEventListener('click', ()=> goToPage('settings'));

/* ============================================================
   TRANSLATE PANEL
============================================================ */
const panels = {};

function buildPanel(pageId, showExtras){
  const container = document.getElementById(pageId);
  const tpl = document.getElementById('translateTemplate');
  const node = tpl.content.cloneNode(true);
  container.appendChild(node);

  const el = (sel)=> container.querySelector('[data-el="'+sel+'"]');
  const p = {
    root: container,
    sourceText: el('sourceText'),
    charCount: el('charCount'),
    fromLabel: el('fromLabel'),
    toLabel: el('toLabel'),
    advancedBody: el('advancedBody'),
    ctaLabel: el('ctaLabel'),
    targetText: el('targetText'),
    statusCard: el('statusCard'),
    confChip: el('confChip'),
    statDetected: el('statDetected'),
    statTime: el('statTime'),
    statOut: el('statOut'),
    engineNote: el('engineNote'),
    altLoading: el('altLoading'),
    altChips: el('altChips'),
    explainBody: el('explainBody'),
    suggestionsBody: el('suggestionsBody'),
    recentBody: el('recentBody'),
    recentList: el('recentList'),
    extraSuggestions: el('extraSuggestions'),
    extraRecent: el('extraRecent'),
    from: state.defaultFrom,
    to: state.defaultTo,
    lastDetected: null,
    zen: false
  };

  if(!showExtras){
    p.extraSuggestions.style.display = 'none';
    p.extraRecent.style.display = 'none';
  }

  updateLangLabels(p);
  updateCharCount(p);

  container.querySelector('[data-action="paste"]').addEventListener('click', async ()=>{
    try{
      const txt = await navigator.clipboard.readText();
      p.sourceText.value = txt;
      updateCharCount(p);
    }catch(e){ showToast('اجازهٔ دسترسی به کلیپ‌بورد داده نشد'); }
  });
  container.querySelector('[data-action="clear"]').addEventListener('click', ()=>{
    p.sourceText.value = '';
    p.targetText.textContent = 'ترجمه اینجا نمایش داده می‌شود…';
    p.targetText.classList.add('placeholder');
    updateCharCount(p);
  });
  p.sourceText.addEventListener('input', ()=> updateCharCount(p));
  p.sourceText.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ runTranslate(p); }
  });

  const micBtn = container.querySelector('[data-action="mic"]');
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRec){
    micBtn.style.display = 'none';
  } else {
    let recognizer = null, listening = false;
    micBtn.addEventListener('click', ()=>{
      if(listening){ recognizer && recognizer.stop(); return; }
      const langCode = p.from === 'auto' ? (p.lastDetected || 'fa') : p.from;
      recognizer = new SpeechRec();
      recognizer.lang = ttsLocale(langCode);
      recognizer.interimResults = false;
      recognizer.maxAlternatives = 1;
      recognizer.onstart = ()=>{ listening = true; micBtn.classList.add('recording'); };
      recognizer.onerror = ()=>{ showToast('خطا در دریافت صدا'); };
      recognizer.onend = ()=>{ listening = false; micBtn.classList.remove('recording'); };
      recognizer.onresult = (ev)=>{
        const transcript = ev.results[0][0].transcript;
        p.sourceText.value = (p.sourceText.value ? p.sourceText.value + ' ' : '') + transcript;
        updateCharCount(p);
      };
      try{ recognizer.start(); } catch(e){ showToast('امکان استفاده از میکروفون نبود'); }
    });
  }

  container.querySelector('[data-action="pick-from"]').addEventListener('click', ()=> openLangSheet(p, 'from'));
  container.querySelector('[data-action="pick-to"]').addEventListener('click', ()=> openLangSheet(p, 'to'));
  container.querySelector('[data-action="swap"]').addEventListener('click', ()=>{
    const realFrom = p.from === 'auto' ? (p.lastDetected || 'en') : p.from;
    const t = p.to;
    p.from = t; p.to = realFrom;
    updateLangLabels(p);
    const s = p.sourceText.value;
    p.sourceText.value = p.targetText.classList.contains('placeholder') ? '' : p.targetText.textContent;
    p.targetText.textContent = s || 'ترجمه اینجا نمایش داده می‌شود…';
    p.targetText.classList.toggle('placeholder', !s);
    updateCharCount(p);
  });

  container.querySelector('[data-action="toggle-advanced"]').addEventListener('click', function(){
    this.classList.toggle('open');
    p.advancedBody.classList.toggle('open');
  });
  container.querySelector('[data-action="toggle-suggestions"]').addEventListener('click', function(){
    this.classList.toggle('open');
    p.suggestionsBody.classList.toggle('open');
  });
  container.querySelector('[data-action="toggle-recent"]').addEventListener('click', function(){
    this.classList.toggle('open');
    p.recentBody.classList.toggle('open');
    if(p.recentBody.classList.contains('open')) renderRecent(p);
  });

  container.querySelector('[data-action="translate"]').addEventListener('click', ()=> runTranslate(p));
  container.querySelector('[data-action="copy"]').addEventListener('click', (e)=> copyTarget(p, e.currentTarget));
  container.querySelector('[data-action="share"]').addEventListener('click', ()=> shareTarget(p));
  container.querySelector('[data-action="zen"]').addEventListener('click', (e)=>{
    p.zen = !p.zen;
    p.targetText.classList.toggle('zen', p.zen);
  });
  container.querySelector('[data-action="speak-target"]').addEventListener('click', ()=> speak(p.targetText.textContent, p.to));
  container.querySelector('[data-action="alt-meanings"]').addEventListener('click', ()=> showAlternatives(p));
  container.querySelector('[data-action="explain"]').addEventListener('click', ()=> explainWord(p));
  const seeAllBtn = container.querySelector('[data-action="see-all-history"]');
  if(seeAllBtn) seeAllBtn.addEventListener('click', ()=> goToPage('history'));

  panels[pageId] = p;
}

const RTL_LANGS = new Set(['fa','ar','ur','he','ps','sd','ug','ku','yi']);

function updateLangLabels(p){
  if(p.from === 'auto'){
    p.fromLabel.parentElement.querySelector('img')?.remove();
    p.fromLabel.textContent = 'تشخیص خودکار';
  } else {
    const l = LANG_MAP[p.from];
    setFieldFlag(p.fromLabel.parentElement, l);
    p.fromLabel.textContent = l ? l[1] : p.from;
  }
  const lt = LANG_MAP[p.to];
  setFieldFlag(p.toLabel.parentElement, lt);
  p.toLabel.textContent = lt ? lt[1] : p.to;

  const fromForDir = p.from === 'auto' ? (p.lastDetected || 'fa') : p.from;
  p.sourceText.style.direction = RTL_LANGS.has(fromForDir) ? 'rtl' : 'ltr';
  p.targetText.style.direction = RTL_LANGS.has(p.to) ? 'rtl' : 'ltr';
}

function setFieldFlag(field, lang){
  let img = field.querySelector('img');
  if(!lang){ if(img) img.remove(); return; }
  if(!img){
    img = document.createElement('img');
    field.insertBefore(img, field.firstChild);
  }
  img.src = flagUrl(lang[2]);
  img.alt = '';
}

function updateCharCount(p){
  const n = p.sourceText.value.length;
  p.charCount.textContent = n + ' / 5000';
  const short = isShortInput(p.sourceText.value);
  const altBtn = p.root.querySelector('[data-action="alt-meanings"]');
  const expBtn = p.root.querySelector('[data-action="explain"]');
  if(altBtn) altBtn.disabled = !short;
  if(expBtn) expBtn.disabled = !short;
}

function isShortInput(text){
  const t = text.trim();
  if(!t) return false;
  const words = t.split(/\s+/).filter(Boolean);
  return words.length <= 3 && t.length <= 30;
}

/* ============================================================
   LANGUAGE PICKER SHEET
============================================================ */
let sheetTarget = null;
const sheetOverlay = document.getElementById('sheetOverlay');
const sheetList = document.getElementById('sheetList');
const sheetSearchInput = document.getElementById('sheetSearchInput');
const sheetTitleEl = document.getElementById('sheetTitle');

function openLangSheet(panel, which){
  sheetTarget = { panel, which };
  sheetTitleEl.textContent = which === 'from' ? 'زبان مبدأ' : 'زبان مقصد';
  sheetSearchInput.value = '';
  renderSheetList('');
  sheetOverlay.classList.add('visible');
  setTimeout(()=> sheetSearchInput.focus(), 200);
}

function closeSheet(){ sheetOverlay.classList.remove('visible'); sheetTarget = null; }
sheetOverlay.addEventListener('click', (e)=>{ if(e.target === sheetOverlay) closeSheet(); });
sheetSearchInput.addEventListener('input', ()=> renderSheetList(sheetSearchInput.value.trim().toLowerCase()));

function renderSheetList(query){
  sheetList.innerHTML = '';
  const { panel, which } = sheetTarget || {};
  if(which === 'from'){
    const row = document.createElement('div');
    row.className = 'sheet-item' + (panel.from === 'auto' ? ' selected' : '');
    row.innerHTML = '<div class="auto-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2.5"/></svg></div><span>تشخیص خودکار</span>';
    row.addEventListener('click', ()=>{ panel.from = 'auto'; updateLangLabels(panel); closeSheet(); });
    sheetList.appendChild(row);
  }
  const filtered = LANGS.filter(l => !query || l[1].toLowerCase().includes(query) || l[0].includes(query));
  filtered.forEach(l=>{
    const current = which === 'from' ? panel.from : panel.to;
    const row = document.createElement('div');
    row.className = 'sheet-item' + (current === l[0] ? ' selected' : '');
    row.innerHTML = '<img src="'+flagUrl(l[2])+'" alt=""><span>'+l[1]+'</span>';
    row.addEventListener('click', ()=>{
      if(which === 'from') panel.from = l[0]; else panel.to = l[0];
      updateLangLabels(panel);
      closeSheet();
    });
    sheetList.appendChild(row);
  });
}

/* ============================================================
   TRANSLATION ENGINES
============================================================ */
function detectLanguage(text){
  const t = text.trim();
  if(!t) return 'en';
  if(/[\u3040-\u30ff]/.test(t)) return 'ja';
  if(/[\uac00-\ud7af]/.test(t)) return 'ko';
  if(/[\u4e00-\u9fff]/.test(t)) return 'zh';
  if(/[\u0600-\u06FF\u0750-\u077F]/.test(t)){
    if(/[ٹڈڑے]/.test(t)) return 'ur';
    if(/[پچژگ]/.test(t)) return 'fa';
    return 'ar';
  }
  if(/[\u0900-\u097F]/.test(t)) return 'hi';
  if(/[\u0400-\u04FF]/.test(t)) return 'ru';
  const lower = ' ' + t.toLowerCase() + ' ';
  const stop = {
    en:[' the ',' and ',' is ',' you ',' to ',' of ',' are '], fr:[' le ',' la ',' et ',' les ',' des ',' est '],
    de:[' der ',' die ',' und ',' das ',' ist ',' nicht '], es:[' el ',' la ',' y ',' los ',' es ',' que '],
    it:[' il ',' la ',' e ',' che ',' di ',' non '], pt:[' o ',' a ',' e ',' de ',' que ',' não '],
    nl:[' de ',' het ',' en ',' een ',' niet '], tr:[' ve ',' bir ',' bu ',' için ',' değil ']
  };
  let best='en', bestScore=0;
  for(const [lang, words] of Object.entries(stop)){
    const score = words.reduce((a,w)=> a + (lower.includes(w)?1:0), 0);
    if(score > bestScore){ bestScore = score; best = lang; }
  }
  return best;
}

function decodeEntities(s){ const t=document.createElement('textarea'); t.innerHTML=s; return t.value; }

async function tryGoogleTranslate(text, sl, tl){
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl='+sl+'&tl='+tl+'&dt=t&q='+encodeURIComponent(text);
  const res = await fetch(url);
  if(!res.ok) throw new Error('google-http-' + res.status);
  const data = await res.json();
  const translated = decodeEntities(data[0].map(chunk=> chunk[0]).join(''));
  const detected = data[2] || null;
  if(!translated) throw new Error('google-empty');
  return { translated, detected, engine: 'Google Translate' };
}

async function tryMyMemory(text, sl, tl){
  const url = 'https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair='+sl+'|'+tl;
  const res = await fetch(url);
  const data = await res.json();
  if(data && data.responseData && data.responseData.translatedText){
    return { translated: decodeEntities(data.responseData.translatedText), match: data.responseData.match, engine: 'MyMemory' };
  }
  throw new Error((data && data.responseDetails) || 'mymemory-failed');
}

async function translateText(text, fromCode, toCode){
  let sourceForApi = fromCode === 'auto' ? 'auto' : fromCode;
  try{
    const g = await tryGoogleTranslate(text, sourceForApi, toCode);
    const detected = fromCode === 'auto' ? (g.detected || detectLanguage(text)) : fromCode;
    return { translated: g.translated, detected, engine: g.engine, confidence: null };
  } catch(e){
    const detected = fromCode === 'auto' ? detectLanguage(text) : fromCode;
    const m = await tryMyMemory(text, detected, toCode);
    return { translated: m.translated, detected, engine: m.engine, confidence: m.match };
  }
}

/* ============================================================
   RUN TRANSLATE
============================================================ */
async function runTranslate(p){
  const text = p.sourceText.value.trim();
  if(!text){ showToast('ابتدا متنی وارد کنید'); return; }

  const btn = p.root.querySelector('[data-action="translate"]');
  btn.disabled = true;
  p.ctaLabel.textContent = 'در حال ترجمه…';

  try{
    const result = await translateText(text, p.from, p.to);
    const finalText = result.translated;
    p.lastDetected = result.detected;
    p.targetText.textContent = finalText;
    p.targetText.classList.remove('placeholder');

    if(state.statsEnabled){
      p.statusCard.style.display = 'block';
      p.confChip.textContent = result.confidence != null ? Math.round(result.confidence*100)+'%' : 'high';
      const detLang = LANG_MAP[result.detected];
      p.statDetected.innerHTML = (detLang ? '<img src="'+flagUrl(detLang[2])+'">' : '') + '<span>'+(detLang ? detLang[1] : result.detected)+'</span>';
      p.statTime.textContent = new Date().toLocaleTimeString('fa-IR', {hour:'2-digit', minute:'2-digit'});
      const outLang = LANG_MAP[p.to];
      p.statOut.innerHTML = (outLang ? '<img src="'+flagUrl(outLang[2])+'">' : '') + '<span>'+(outLang ? outLang[1] : p.to)+'</span>';
      p.engineNote.textContent = 'موتور ترجمه: ' + result.engine;
    } else {
      p.statusCard.style.display = 'none';
    }

    if(state.saveHistory){
      addHistoryEntry({ time: Date.now(), from: result.detected, to: p.to, src: text, tgt: finalText, fav:false });
      if(!p.recentBody.classList.contains('open') === false) renderRecent(p);
    }
    updateLangLabels(p);
  } catch(err){
    showToast('خطا در ترجمه — دوباره تلاش کنید');
  } finally {
    btn.disabled = false;
    p.ctaLabel.textContent = 'ترجمه کن';
  }
}

function copyTarget(p, btnEl){
  const txt = p.targetText.textContent;
  if(!txt || p.targetText.classList.contains('placeholder')) return;
  navigator.clipboard.writeText(txt).then(()=>{
    btnEl.classList.add('copied');
    setTimeout(()=> btnEl.classList.remove('copied'), 1200);
  }).catch(()=> showToast('کپی انجام نشد'));
}

function shareTarget(p){
  const txt = p.targetText.textContent;
  if(!txt || p.targetText.classList.contains('placeholder')) return;
  if(navigator.share){ navigator.share({ text: txt }).catch(()=>{}); }
  else { navigator.clipboard.writeText(txt); showToast('متن کپی شد (اشتراک‌گذاری در این مرورگر پشتیبانی نمی‌شود)'); }
}

function speak(text, langCode){
  if(!state.ttsEnabled || !('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = ttsLocale(langCode);
  window.speechSynthesis.speak(u);
}

/* ============================================================
   ALT MEANINGS + EXPLAIN
============================================================ */
async function showAlternatives(p){
  const text = p.sourceText.value.trim();
  if(!isShortInput(text)) return;
  const from = p.from === 'auto' ? (p.lastDetected || detectLanguage(text)) : p.from;
  if(from === p.to) return;
  p.altLoading.textContent = '… در حال جست‌وجو';
  p.altChips.innerHTML = '';
  try{
    const m = await tryMyMemory(text, from, p.to);
    const seen = new Set([m.translated.toLowerCase()]);
    const results = [m.translated];
    const url = 'https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair='+from+'|'+p.to;
    const res = await fetch(url);
    const data = await res.json();
    if(Array.isArray(data.matches)){
      data.matches.sort((a,b)=>(b.match||0)-(a.match||0)).forEach(mm=>{
        const c = (mm.translation||'').trim();
        if(!c || seen.has(c.toLowerCase()) || c.split(/\s+/).length>4) return;
        seen.add(c.toLowerCase()); results.push(c);
      });
    }
    p.altLoading.textContent = '';
    if(results.length <= 1){
      p.altChips.innerHTML = '<span style="font-size:12px; color:var(--text-dim2);">معنای جایگزین دیگری پیدا نشد.</span>';
    } else {
      results.slice(0,6).forEach(r=>{
        const chip = document.createElement('button');
        chip.className = 'alt-chip'; chip.type='button'; chip.textContent = r;
        chip.addEventListener('click', ()=>{ p.targetText.textContent = r; p.targetText.classList.remove('placeholder'); });
        p.altChips.appendChild(chip);
      });
    }
  } catch(e){
    p.altLoading.textContent = '';
    p.altChips.innerHTML = '<span style="font-size:12px; color:var(--text-dim2);">مشکلی پیش آمد.</span>';
  }
}

const POS_FA = { noun:'اسم', verb:'فعل', adjective:'صفت', adverb:'قید', pronoun:'ضمیر', preposition:'حرف‌اضافه', conjunction:'حرف‌ربط', interjection:'صوت', article:'حرف‌تعریف', numeral:'عدد', proper_noun:'اسم‌خاص' };

function stripTags(html){ const d=document.createElement('div'); d.innerHTML=html; return (d.textContent||'').trim(); }
function cleanWordForLookup(text){ return text.trim().split(/\s+/)[0].replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,''); }

async function translateSnippet(text, targetLang){
  try{
    const url = 'https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=en|'+targetLang;
    const res = await fetch(url); const data = await res.json();
    if(data && data.responseData && data.responseData.translatedText) return data.responseData.translatedText;
  }catch(e){}
  return null;
}

async function explainWord(p){
  const rawWord = (p.targetText.classList.contains('placeholder') ? '' : p.targetText.textContent) || p.sourceText.value;
  const word = cleanWordForLookup(rawWord.trim());
  if(!word) return;
  p.explainBody.innerHTML = '<div class="mini-loading">… در حال جست‌وجو</div>';
  try{
    const res = await fetch('https://en.wiktionary.org/api/rest_v1/page/definition/'+encodeURIComponent(word));
    if(!res.ok) throw new Error('nf');
    const data = await res.json();
    const candidateLangs = [p.to, p.from==='auto'?(p.lastDetected||'en'):p.from, 'en'];
    let matchedLang = candidateLangs.find(l => Array.isArray(data[l]) && data[l].length) || Object.keys(data)[0];
    if(!matchedLang || !data[matchedLang] || !data[matchedLang].length){
      p.explainBody.innerHTML = '<div style="font-size:12px; color:var(--text-dim2); margin-top:8px;">توضیحی پیدا نشد.</div>'; return;
    }
    let html = '';
    for(const block of data[matchedLang].slice(0,3)){
      const posFa = POS_FA[block.partOfSpeech] || block.partOfSpeech || '';
      const rawDefs = (block.definitions||[]).slice(0,2).map(d=>stripTags(d.definition)).filter(Boolean);
      if(!rawDefs.length) continue;
      const translated = await Promise.all(rawDefs.map(d=> translateSnippet(d,'fa')));
      html += '<div class="explain-entry">';
      if(posFa) html += '<span class="explain-pos">'+posFa+'</span>';
      html += '<ul class="explain-defs">';
      rawDefs.forEach((d,i)=>{
        const fa = translated[i];
        html += '<li>'+(fa?fa.replace(/</g,'&lt;'):d.replace(/</g,'&lt;'));
        if(fa) html += '<span class="explain-en">'+d.replace(/</g,'&lt;')+'</span>';
        html += '</li>';
      });
      html += '</ul></div>';
    }
    p.explainBody.innerHTML = html || '<div style="font-size:12px; color:var(--text-dim2); margin-top:8px;">توضیحی پیدا نشد.</div>';
  } catch(e){
    p.explainBody.innerHTML = '<div style="font-size:12px; color:var(--text-dim2); margin-top:8px;">توضیحی برای این کلمه پیدا نشد.</div>';
  }
}

/* ============================================================
   HISTORY
============================================================ */
function addHistoryEntry(entry){
  const last = state.history[0];
  if(last && last.src === entry.src && last.to === entry.to){
    last.time = entry.time; last.tgt = entry.tgt;
    LS.set('tf_history', state.history);
    return;
  }
  state.history.unshift(entry);
  if(state.history.length > 200) state.history.pop();
  LS.set('tf_history', state.history);
}

function toggleFav(idx){
  state.history[idx].fav = !state.history[idx].fav;
  LS.set('tf_history', state.history);
  renderHistoryPage();
}

function formatHistDate(ts){
  const d = new Date(ts);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate()-1);
  if(sameDay) return 'امروز';
  if(d.toDateString() === yest.toDateString()) return 'دیروز';
  try{ return d.toLocaleDateString('fa-IR', { day:'numeric', month:'long' }); }
  catch(e){ return d.toLocaleDateString(); }
}

function renderRecent(p){
  const items = state.history.slice(0,3);
  p.recentList.innerHTML = '';
  if(!items.length){
    p.recentList.innerHTML = '<div style="font-size:12px; color:var(--text-dim2); padding:8px 0;">هنوز ترجمه‌ای ثبت نشده.</div>';
    return;
  }
  items.forEach(it=>{
    const row = document.createElement('div');
    row.className = 'recent-item';
    row.innerHTML = '<span class="txt">'+escapeHtml(it.src)+'</span><span class="txt" style="color:var(--accent1)">'+escapeHtml(it.tgt)+'</span>';
    p.recentList.appendChild(row);
  });
}

function escapeHtml(s){ const d=document.createElement('div'); d.textContent = s; return d.innerHTML; }

function renderHistoryPage(){
  const listEl = document.getElementById('histList');
  const query = document.getElementById('histSearch').value.trim().toLowerCase();
  const onlyStarred = document.getElementById('histFilterOnly').value === 'starred';
  let items = state.history.map((it, idx)=> ({...it, idx}));
  if(query) items = items.filter(it => it.src.toLowerCase().includes(query) || it.tgt.toLowerCase().includes(query));
  if(onlyStarred) items = items.filter(it => it.fav);

  listEl.innerHTML = '';
  if(!items.length){
    listEl.innerHTML = '<div class="empty-state">هنوز ترجمه‌ای در تاریخچه ثبت نشده.</div>';
    return;
  }
  let lastGroup = null;
  items.forEach(it=>{
    const group = formatHistDate(it.time);
    if(group !== lastGroup){
      const sep = document.createElement('div');
      sep.className = 'date-sep'; sep.textContent = group;
      listEl.appendChild(sep);
      lastGroup = group;
    }
    const fromL = LANG_MAP[it.from], toL = LANG_MAP[it.to];
    const card = document.createElement('div');
    card.className = 'hist-card';
    card.innerHTML =
      '<div class="hist-top">'+
        '<div class="hist-pair">'+(fromL?fromL[0].toUpperCase():it.from)+' → '+(toL?toL[0].toUpperCase():it.to)+'</div>'+
        '<div class="hist-actions">'+
          '<button class="star-btn'+(it.fav?' starred':'')+'" aria-label="نشان"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.7 5.9 20.8l1.3-6.8-5-4.8 6.9-.9L12 2z"/></svg></button>'+
          '<button class="copy-btn2" aria-label="کپی"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="1.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/></svg></button>'+
        '</div>'+
      '</div>'+
      '<div class="hist-src">'+escapeHtml(it.src)+'</div>'+
      '<div class="hist-tgt">'+escapeHtml(it.tgt)+'</div>'+
      '<div class="hist-time">'+new Date(it.time).toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'})+'</div>';
    card.querySelector('.star-btn').addEventListener('click', ()=> toggleFav(it.idx));
    card.querySelector('.copy-btn2').addEventListener('click', (e)=>{
      navigator.clipboard.writeText(it.tgt).then(()=>{
        e.currentTarget.classList.add('copied');
        setTimeout(()=> e.currentTarget.classList.remove('copied'), 1000);
      });
    });
    listEl.appendChild(card);
  });
}

document.getElementById('histSearch').addEventListener('input', renderHistoryPage);
document.getElementById('histFilterOnly').addEventListener('change', renderHistoryPage);
document.getElementById('histFilterBtn').addEventListener('click', ()=>{
  const row = document.getElementById('histFilterRow');
  row.style.display = row.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('histClearBtn').addEventListener('click', ()=>{
  if(!state.history.length){ showToast('تاریخچه‌ای برای پاک کردن نیست'); return; }
  if(confirm('همهٔ تاریخچهٔ ترجمه‌ها پاک شود؟ این کار قابل بازگشت نیست.')){
    state.history = [];
    LS.set('tf_history', state.history);
    renderHistoryPage();
    showToast('تاریخچه پاک شد');
  }
});

/* ============================================================
   SETTINGS PAGE
============================================================ */
function wireToggle(id, key){
  const el = document.getElementById(id);
  const sync = ()=> el.classList.toggle('on', !!state[key]);
  sync();
  el.addEventListener('click', ()=>{
    state[key] = !state[key];
    sync();
    persistSettings();
  });
}

wireToggle('toggleAutoDetect','autoDetect');
wireToggle('toggleTTS','ttsEnabled');
wireToggle('toggleStats','statsEnabled');
wireToggle('toggleSaveHistory','saveHistory');

function refreshDefaultLangDisplays(){
  const fromEl = document.getElementById('defaultFromValue');
  const toEl = document.getElementById('defaultToValue');
  if(state.defaultFrom === 'auto'){
    fromEl.innerHTML = '<span>تشخیص خودکار</span><svg class="rowchev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';
  } else {
    const l = LANG_MAP[state.defaultFrom];
    fromEl.innerHTML = (l?'<img src="'+flagUrl(l[2])+'">':'')+'<span>'+(l?l[1]:state.defaultFrom)+'</span><svg class="rowchev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';
  }
  const lt = LANG_MAP[state.defaultTo];
  toEl.innerHTML = (lt?'<img src="'+flagUrl(lt[2])+'">':'')+'<span>'+(lt?lt[1]:state.defaultTo)+'</span><svg class="rowchev" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';
}

document.getElementById('rowDefaultFrom').addEventListener('click', ()=>{
  sheetTarget = { fakeSettings: 'from' };
  sheetTitleEl.textContent = 'زبان پیش‌فرض مبدأ';
  sheetSearchInput.value=''; sheetList.innerHTML='';
  const row = document.createElement('div');
  row.className = 'sheet-item';
  row.innerHTML = '<div class="auto-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2.5"/></svg></div><span>تشخیص خودکار</span>';
  row.addEventListener('click', ()=>{ state.defaultFrom='auto'; persistSettings(); refreshDefaultLangDisplays(); closeSheet(); });
  sheetList.appendChild(row);
  LANGS.forEach(l=>{
    const r = document.createElement('div'); r.className='sheet-item';
    r.innerHTML = '<img src="'+flagUrl(l[2])+'"><span>'+l[1]+'</span>';
    r.addEventListener('click', ()=>{ state.defaultFrom=l[0]; persistSettings(); refreshDefaultLangDisplays(); closeSheet(); });
    sheetList.appendChild(r);
  });
  sheetOverlay.classList.add('visible');
});

document.getElementById('rowDefaultTo').addEventListener('click', ()=>{
  sheetTarget = { fakeSettings: 'to' };
  sheetTitleEl.textContent = 'زبان پیش‌فرض مقصد';
  sheetSearchInput.value=''; sheetList.innerHTML='';
  LANGS.forEach(l=>{
    const r = document.createElement('div'); r.className='sheet-item';
    r.innerHTML = '<img src="'+flagUrl(l[2])+'"><span>'+l[1]+'</span>';
    r.addEventListener('click', ()=>{ state.defaultTo=l[0]; persistSettings(); refreshDefaultLangDisplays(); closeSheet(); });
    sheetList.appendChild(r);
  });
  sheetOverlay.classList.add('visible');
});

document.getElementById('rowPrivacy').addEventListener('click', ()=>{
  const box = document.getElementById('privacyBox');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('rowAboutLink').addEventListener('click', ()=> goToPage('about'));

/* ============================================================
   INIT
============================================================ */
buildPanel('page-home', true);
buildPanel('page-translate', false);
refreshDefaultLangDisplays();
goToPage('home');
