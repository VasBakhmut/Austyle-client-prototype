(() => {
  'use strict';
  const greetings={widget:'How can I help? Ask about products, choosing hardware or a technical issue.',technical_support:'Which model do you need help with? Select a model or enter its code.',product:'What would you like to know about this product?'};
  let config={apiUrl:'http://localhost:3001',documentUrls:{}}, state=null, products=[], returnFocus;
  // A state object is owned by exactly one scenario. Never store session UUIDs alone.
  const conversations = new Map();
  const keyFor = entry => entry.entryPoint === 'product' ? `product:${entry.productId}` : entry.entryPoint;
  function createConversation(entry) {
    return {...entry, key:keyFor(entry), messages:[], quickActions:[], input:'', contact:{},
      greeting:greetings[entry.entryPoint], busy:false, error:'', recover:false, requested:null};
  }
  const el=(tag,cls,text)=>{const e=document.createElement(tag); if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const save=()=>{}; // Full state is intentionally in memory only (contract v2).
  function button(text,fn,cls='ac-button'){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
  const host=el('div','ac-root'), launcher=button('Ask auSTYLE',()=>open({entryPoint:'widget'}),'ac-launcher'),panel=el('section','ac-panel');
  panel.hidden=true;panel.tabIndex=-1;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','auSTYLE assistant');launcher.setAttribute('aria-haspopup','dialog');launcher.setAttribute('aria-expanded','false');
  const head=el('header','ac-header'),identity=el('div'),close=button('×',hide,'ac-close');close.setAttribute('aria-label','Close assistant');identity.append(el('span','ac-eyebrow','ARCHITECTURAL HARDWARE'),el('h2','','Ask auSTYLE'));head.append(identity,close);
  const context=el('div','ac-context'),body=el('div','ac-body'),messages=el('div','ac-messages'),extras=el('div','ac-extras'),status=el('div','ac-error'),form=el('form','ac-compose'),input=el('textarea'),send=el('button','ac-send','Send'),footer=el('div','ac-footer');
  messages.setAttribute('role','log');messages.setAttribute('aria-live','polite');status.setAttribute('role','status');input.placeholder='Ask a question…';input.rows=2;input.maxLength=2000;input.setAttribute('aria-label','Your message');send.type='submit';form.append(input,send);footer.append(el('span','','AI assistant · Check important details'),button('New conversation',()=>{state.requested={entryPoint:state.entryPoint,...(state.productId?{productId:state.productId}:{})};render();},'ac-text-button'));body.append(messages,extras,status);panel.append(head,context,body,form,footer);host.append(launcher,panel);document.body.append(host);
  input.addEventListener('input',()=>{if(state){state.input=input.value;save();}});
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();form.requestSubmit();}});
  form.addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(text&&text.length<=2000)chat({message:text});});
  panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();hide();}if(e.key!=='Tab')return;const nodes=[...panel.querySelectorAll('button,input,textarea,a[href],select')].filter(n=>!n.disabled&&n.getClientRects().length),first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}});
  function hide(){panel.hidden=true;launcher.setAttribute('aria-expanded','false');returnFocus?.focus();}
  async function open(entry) {
    returnFocus=document.activeElement;
    const key=keyFor(entry);
    if(!conversations.has(key)) conversations.set(key,createConversation(entry));
    state=conversations.get(key);
    panel.hidden=false; launcher.setAttribute('aria-expanded','true');
    render(); close.focus();
    await ensureSession(state);
  }
  async function api(path,payload){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),60000);try{const r=await fetch(config.apiUrl.replace(/\/$/,'')+path,{method:payload===undefined?'GET':'POST',headers:payload===undefined?{}:{'Content-Type':'application/json'},body:payload===undefined?undefined:JSON.stringify(payload),signal:controller.signal});const data=await r.json().catch(()=>({}));if(!r.ok){const err=new Error(Array.isArray(data.message)?data.message.join(' '):data.message||'Request failed');err.status=r.status;throw err;}return data;}finally{clearTimeout(timer);}}
  function failure(e,conversation){conversation.recover=e.status===404||(e.status===400&&/limit|length/i.test(e.message));if(e.status===400)return e.message;if(e.status===404)return'This conversation is no longer available. Start a new conversation below.';if(e.status===409)return'This conversation is busy or has been handed to the team. Your message is saved. Start a new conversation if needed.';if(e.status===503)return'The service is temporarily unavailable. Your input is saved — please try again.';if(e.name==='AbortError')return'The request exceeded 60 seconds. Its outcome is unknown. Your input is saved; please wait before retrying.';return'Unable to reach the assistant. Your input is saved. Please check your connection and try again.';}
  async function start(entry) {
    const key=keyFor(entry);
    if(conversations.get(key)?.busy) return;
    const conversation=createConversation(entry);
    conversations.set(key,conversation);
    state=conversation; render();
    await ensureSession(conversation);
  }
  async function ensureSession(conversation=state) {
    if(conversation.id) return true;
    if(conversation.sessionPromise) return conversation.sessionPromise;
    conversation.busy=true; conversation.error=''; if(state===conversation) render();
    conversation.sessionPromise=(async()=>{
      try {
        const payload={entryPoint:conversation.entryPoint};
        if(conversation.entryPoint==='product') payload.productId=conversation.productId;
        const result=await api('/sessions',payload);
        if(!result.id) throw new Error('Missing session');
        conversation.id=result.id;
        conversation.quickActions=result.quickActions||[];
        conversation.chatMode=result.chatMode;
        return true;
      } catch(e) { conversation.error=failure(e,conversation); return false; }
      finally { conversation.busy=false; conversation.sessionPromise=null; if(state===conversation) render(); }
    })();
    return conversation.sessionPromise;
  }
  async function chat(payload,label,conversation=state) {
    if(conversation.busy||conversation.draft||conversation.ticket||conversation.requested) return;
    conversation.error=''; conversation.recover=false;
    if(!await ensureSession(conversation)) return;
    conversation.busy=true; if(state===conversation) render();
    try {
      const answer=await api('/chat',{sessionId:conversation.id,...payload});
      if(typeof answer.text!=='string') throw new Error('Invalid response');
      conversation.messages.push({role:'user',text:payload.message||label||payload.actionId},
        {role:'assistant',text:answer.text,sources:answer.sources||[]});
      conversation.quickActions=answer.quickActions||[];
      conversation.chatMode=answer.chatMode||conversation.chatMode;
      if(answer.escalate) conversation.draft=answer.draft||{summary:answer.text};
      conversation.input='';
    } catch(e) { conversation.error=failure(e,conversation); }
    finally {
      conversation.busy=false; if(state===conversation) render();
      if(state===conversation&&!panel.hidden) {
        if(!conversation.draft) input.focus();
        body.scrollTop=body.scrollHeight;
      }
    }
  }
  function renderIfActive(conversation){if(state===conversation)render();}
  function citation(s){const title=String(s.title||'Source');let url=s.url;if(typeof url!=='string')return el('span','ac-source',title);if(url.startsWith('/documents/'))url=config.documentUrls?.[url];try{const parsed=new URL(url,location.origin);if(!url||!['http:','https:'].includes(parsed.protocol))throw new Error();const a=el('a','ac-source',title);a.href=parsed.href;a.target='_blank';a.rel='noopener noreferrer';return a;}catch{return el('span','ac-source',title+' · document preview unavailable');}}
  function render(){if(!state)return;const {busy,error,recover,requested}=state;identity.querySelector('h2').textContent=state.entryPoint==='technical_support'?'Maintenance & Troubleshooting':state.entryPoint==='product'?'Product '+state.productId:'Ask auSTYLE';context.textContent=state.entryPoint==='product'?'Product '+state.productId:state.entryPoint==='technical_support'?'Technical support':'Products · Selection · Support';if(state.chatMode==='demo')context.append(el('span','ac-demo-label','Demo responses'));messages.replaceChildren(el('p','ac-bubble ac-assistant',state.greeting));for(const m of state.messages){const b=el('div','ac-bubble ac-'+m.role);b.append(el('div','',m.text));if(m.sources?.length){const sources=el('div','ac-sources');m.sources.forEach(s=>sources.append(citation(s)));b.append(sources);}messages.append(b);}if(busy)messages.append(el('p','ac-thinking','One moment…'));extras.replaceChildren();
    if(requested){const box=el('div','ac-notice');box.append(el('strong','','Start a new conversation?'),el('p','','Only this conversation will be reset. Your other chats will be kept.'),button('Keep current conversation',()=>{state.requested=null;render();}),button('Start new conversation',()=>start(requested)));extras.append(box);}
    else if(state.ticket)extras.append(el('div','ac-notice',state.ticket.delivery==='captured'?'Request saved for this demo; no email was sent.':'Your request has been sent to the team. They will reply by email.'));
    else if(state.draft)renderHandoff();
    else{if(state.entryPoint==='technical_support'&&!state.messages.length){const box=el('div','ac-models');box.append(el('p','','Enter your model code in the message box.'));if(products.length){box.append(el('small','','Available demo model'));products.forEach(p=>box.append(button(p.name+' · '+p.id,()=>chat({message:String(p.id)}),'ac-action')));}extras.append(box);}const actions=el('div','ac-actions');state.quickActions.forEach(a=>actions.append(button(a.label,()=>chat({actionId:a.id},a.label),'ac-action')));extras.append(actions);}
    status.replaceChildren();if(error)status.append(el('p','',error));if(!state.id&&!busy)status.append(button('Connect assistant',()=>ensureSession(state)));if(recover)status.append(button('Start new conversation',()=>start({entryPoint:state.entryPoint,...(state.productId?{productId:state.productId}:{})})));input.value=state.input||'';input.disabled=busy||!!state.draft||!!state.ticket||!!requested;send.disabled=input.disabled;form.hidden=!!state.draft||!!state.ticket;for(const b of extras.querySelectorAll('button'))b.disabled=busy;footer.querySelector('button').disabled=busy;
  }
  function renderHandoff(conversation=state){const state=conversation;const section=el('div','ac-handoff');section.append(el('h3','','Get help from our team'),el('p','',state.draft.summary||'Share this conversation with our team.'));const handoff=el('form');for(const[name,title,type]of[['name','Your name','text'],['email','Email address','email']]){const label=el('label','',title),field=el('input');field.type=type;field.name=name;field.required=true;field.autocomplete=name;field.value=state.contact[name]||'';field.maxLength=name==='name'?150:254;field.addEventListener('input',()=>{state.contact[name]=field.value;save();});label.append(field);handoff.append(label);}const label=el('label','ac-consent'),consent=el('input');consent.type='checkbox';consent.required=true;consent.checked=!!state.contact.consent;consent.addEventListener('change',()=>{state.contact.consent=consent.checked;save();});label.append(consent,document.createTextNode('I agree to share my contact details and this conversation with the auSTYLE team.'));const submit=el('button','ac-button',state.busy?'Submitting…':'Send request');submit.type='submit';handoff.append(label,submit);handoff.addEventListener('submit',async e=>{e.preventDefault();if(state.busy)return;state.busy=true;state.error='';render();try{const result=await api('/escalations',{sessionId:state.id,name:state.contact.name.trim(),email:state.contact.email.trim(),consent:state.contact.consent===true});if(!['sent','captured'].includes(result.delivery))throw new Error('Invalid delivery status');state.ticket=result;state.contact={};save();}catch(err){state.error=failure(err,state);}finally{state.busy=false;renderIfActive(conversation);}});section.append(handoff);extras.append(section);}
  function pageProductCode() {
    const valid=value=>typeof value==='string'&&/^[A-Za-z0-9-]{1,30}$/.test(value.trim())?value.trim():null;
    const find=node=>{
      if(!node||typeof node!=='object')return null;
      if(Array.isArray(node)){for(const child of node){const code=find(child);if(code)return code;}return null;}
      const types=Array.isArray(node['@type'])?node['@type']:[node['@type']];
      if(types.includes('Product')){const code=valid(node.sku)||valid(node.mpn);if(code)return code;}
      return find(node['@graph']);
    };
    for(const script of document.querySelectorAll('script[type="application/ld+json"]')){
      try{const code=find(JSON.parse(script.textContent));if(code)return code;}catch{}
    }
    const explicit=document.querySelector('[data-product-code]')?.getAttribute('data-product-code');
    const sku=document.querySelector('.sku')?.textContent;
    const title=document.querySelector('h1')?.textContent||'';
    return valid(explicit)||valid(sku)||valid(title.match(/#\s*([A-Za-z0-9-]{1,30})(?=\s|$|[\/,:])/)?.[1]);
  }
  function installEntries(){const heading=document.querySelector('h1');if(/^\/product\//.test(location.pathname)&&heading){const productId=pageProductCode();const box=el('div','ac-entry');const productButton=button('Ask about this product ↗',()=>open({entryPoint:'product',productId}),'ac-entry-button');productButton.disabled=!productId;box.append(el('span','',productId?'Need help with this product?':'Product code unavailable on this page.'),productButton);heading.insertAdjacentElement('afterend',box);}if(/^\/support(?:\/|$)/.test(location.pathname)&&heading){const box=el('div','ac-entry');box.append(el('span','','Installation or troubleshooting?'),button('Get technical help ↗',()=>open({entryPoint:'technical_support'}),'ac-entry-button'));heading.insertAdjacentElement('afterend',box);}}
  function installSupportLinks(){
    document.querySelectorAll('.menu-item-223 > ul').forEach(menu=>{
      if(menu.querySelector('[data-au-support]'))return;
      const item=el('li','menu-item menu-item-type-custom menu-item-au-support');
      const link=el('a','','Maintenance & Troubleshooting');
      link.href='/support/index.html#technical-support';
      link.dataset.auSupport='true';
      item.append(link);menu.append(item);
    });
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('[data-au-support]');
    if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();open({entryPoint:'technical_support'});
  });
  launcher.disabled=true;fetch('/chat-config.json').then(r=>r.ok?r.json():Promise.reject()).then(c=>{config={...config,...c};}).catch(()=>{}).finally(()=>{launcher.disabled=false;installEntries();installSupportLinks();if(location.hash==='#technical-support')open({entryPoint:'technical_support'});api('/products').then(result=>{products=Array.isArray(result)?result:[];if(!panel.hidden)render();}).catch(()=>{});});
})();
