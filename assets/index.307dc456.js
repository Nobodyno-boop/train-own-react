const m=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};m();class b{constructor(e=!1){this.elements=[],this.tree=[],this.states=[],this.currentId="",this.count=0,this.base="",this.baseJsx=null,this.container=null,this.refreshMode=!1,this.frags={},this._frag="",this.debug=e}id(){return Math.random().toString(36).slice(2,7)}group(e){this.debug&&console.group(e)}groupEnd(){this.debug&&console.groupEnd()}log(...e){this.debug&&console.log(...e)}el(e,r,...t){var l;let n="-42";this.currentId!==""?n=this.currentId:(this.currentId=this.id(),n=this.currentId);let s=this._frag,o={node:e,props:{...r,__id:n,__frag:s},childs:t!=null?t:[],_t:e,id:n,parent:"",frag:s};if(typeof e=="function"){this.group(e.name);let a="";this.refreshMode?r!=null&&r.__frag&&(a=r.__frag.split("#")[1],this._frag=r.__frag):(this.currentId=this.id(),a=this.id(),this._frag=e.name+"#"+a);let d=e(r,t);return this._frag="",(l=this.frags[e.name])!=null||(this.frags[e.name]=[]),this.frags[e.name].push({id:a,tree:d,_t:e}),this.groupEnd(),d}return this.currentId="",o}render(e,r){this.container=r,this.baseJsx=e,this.group("start"),this.currentId=this.id();let t=e({});t.childs.length===0&&(t._t=jsx),this.groupEnd(),this.log(t),t.childs.flat().map(s=>this.patchParent(s,t.id)),this.tree=t;let n=this.toElement(t);r.replaceChildren(n)}patchParent(e,r){if(typeof e=="object")return e.parent=r,e!=null&&e.childs?e.childs.flat().map(t=>this.patchParent(t,e.id)):e}toElement(e,r){if(typeof e=="object"&&e._n){let o=null;if(e._n==="useMap"){let l=e.data();o=e.fn(l).map(d=>this.toElement(d))}else if(e._n==="useContext"){let l=e.data.map(d=>d()),a=e.fn(...l);o=this.toElement(a)}return o}else if(typeof e.node>"u")return document.createTextNode(e);let t=document.createElement(e.node),n=e.props;for(let o in n)if(o&&n.hasOwnProperty(o)){let l=n[o];if(l===!0)t.setAttribute(o,o);else if(l!==!1&&l!=null)if(o.startsWith("on")&&o.toLowerCase()in window)t.addEventListener(o.toLowerCase().substr(2),a=>l(a));else if(o.startsWith("__")){if(!this.debug)continue;typeof l=="function"?t.setAttribute(o,l(e.id)):t.setAttribute(o,l.toString())}else typeof l=="function"?t.setAttribute(o,l(e.id)):t.setAttribute(o,l.toString())}let s=e.childs.map(o=>this.mergeChilds(o,{...e,el:t})).flat();return t.append(...s),this.refreshMode||this.elements.push({...e,el:t}),t}mergeChilds(e,r){return Array.isArray(e)?e.map(t=>this.mergeChilds(t)):typeof e=="function"?document.createTextNode(e(r.id)):typeof e=="string"?document.createTextNode(e):this.toElement(e,r)}registerState(e){if(this.currentId!==""){let r={id:this.id(),el:this.currentId,value:e};return this.states.push(r),r}}getState(e,r){let t=this.states.find(n=>n.id===e);return r!==""&&(t.el=r),t?t.value:""}getParent(e){return this.tree.childs.find(r=>this._getParent(r,e,this.tree))}setState(e,r,t){this.refreshMode=!0;let n=this.states.find(s=>s.id===e);if(n&&(n.value=r,t)){let s=this.elements.find(o=>o.id===n.el);if(s.frag!==""){let o=s.frag.split("#"),l=this.frags[o[0]];if(l){let a=l.find(c=>c.id=o[1]),d=this.elements.find(c=>c.id===a.tree.id);if(d){let c=this.toElement(a.tree);d.el.replaceChildren(c)}}}else{let o=this.toElement(s);s.el.replaceChildren(o)}}this.refreshMode=!1}}const p=new b,x=()=>({events:{},emit(i,...e){var t;((t=this.events[i])!=null?t:[]).forEach(n=>n(...e))},on(i,e){var r,t;return(t=(r=this.events[i])==null?void 0:r.push(e))!=null||(this.events[i]=[e]),()=>{var n;this.events[i]=(n=this.events[i])==null?void 0:n.filter(s=>e!==s)}}}),u=x(),f=i=>{let e=Fr.registerState(i);return[(r="")=>Fr.getState(e.id,r),(r,t=!0)=>{Fr.setState(e.id,r,t)}]},v=(i,e)=>({fn:i,data:e,_n:"useMap"}),y=(i,...e)=>({fn:i,data:e,_n:"useContext"}),_=i=>{const[e,r]=f(!1),[t,n]=f("");return u.on("alert:message",s=>{n(s),r(!0),setTimeout(()=>{r(!1)},1e3*3)}),Fr.el("div",null,y((s,o)=>s?Fr.el("div",{class:"fade-in p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg ",role:"alert"},Fr.el("span",{class:"font-medium"},"Info")," ",o):Fr.el("div",{class:"invisible fade-in p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg ",role:"alert"},Fr.el("span",{class:"font-medium"},"Info")," ",o),e,t))},k=[{error_code:1,message:'No URL specified ("url" parameter is empty)'},{error_code:2,message:"Invalid URL submitted"},{error_code:3,message:"Rate limit reached. Wait a second and try again"},{error_code:4,message:"IP-Address has been blocked because of violating our terms of service"},{error_code:5,message:"shrtcode code (slug) already taken/in use"},{error_code:6,message:"Unknown error"},{error_code:7,message:'No code specified ("code" parameter is empty)'},{error_code:8,message:"Invalid code submitted (code not found/there is no such short-link)"},{error_code:9,message:"Missing required parameters"},{error_code:10,message:"Trying to shorten a disallowed Link. More information on disallowed links"}],g=i=>{var e;return(e=k.find(r=>r.error_code==i))!=null?e:{error_code:-1,message:"Internal app error"}},F="https://api.shrtco.de/v2/",w=async(i,e)=>new Promise((r,t)=>{fetch(i+E(e),{method:"POST"}).then(n=>n.json()).then(n=>{var s;if(n.ok)return r(n);t(g((s=n.error_code)!=null?s:-1))}).catch(n=>t(g(n.errorCode)))}),E=i=>{let e=[];for(const r in i)if(Object.hasOwnProperty.call(i,r)){const t=i[r];e.push(r+"="+t)}return"?"+e.reduce((r,t)=>r+"&"+t)};function I(i,e,r){var t=[],n=i;function s(o){setTimeout(function(){t.length>0?s():n=n+1},e);var l=t.shift();if(!l&&o){r.apply(o[0],o[1]);return}r.apply(l[0],l[1])}return function(){var l=this,a=Array.prototype.slice.call(arguments);if(n<=0){t.push([l,a]);return}n=n-1,s([l,a])}}const C=I(1,1e3,(i,e)=>{e(i)}),L=async(i,e)=>C(await w(F+"shorten",{url:i}).catch(e),e),S=i=>{const[e,r]=f(""),t=s=>{r(s.target.value,!1)},n=async()=>{await L(e(),s=>{s!=null&&s.error_code?u.emit("alert:message",s.message):u.emit("link:add",s)})};return Fr.el("div",{class:"mt-1"},Fr.el("input",{placeholder:"https://votreurl.com",onChange:t,class:"px-3 py-2 w-full bg-gray-50 text-gray-700 border focus:ring ring-indigo-300 rounded outline-none transition duration-100",value:e}),Fr.el("button",{onClick:n,class:"mt-2 inline-block font-bold bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"},"Cr\xE9e"))},h=()=>{let i=localStorage.getItem("links");return typeof i=="string"?JSON.parse(i):[]},P=i=>{let e=h();e.push(i),localStorage.setItem("links",JSON.stringify(e))},M=i=>{const e=()=>{},r=o=>{navigator.clipboard.writeText(o).then(()=>{u.emit("alert:message","Votre lien a \xE9t\xE9 copier dans votre presse-papier")})},t=()=>{r(i.link.full_short_link)},n=()=>{r(i.link.full_short_link2)},s=()=>{r(i.link.full_short_link3)};return Fr.el("div",{class:"p-1 rounded-sm w-50 h-25 m-1 bg-gray-900 text-white shadow-lg",onClick:e},Fr.el("div",null,"code :"," ",Fr.el("span",{class:"underline  font-bold decoration-indigo-500	"},i.link.code)),Fr.el("div",{class:"has-tooltip flex-none"},Fr.el("div",{class:"truncate"},i.link.original_link),Fr.el("span",{class:"tooltip rounded shadow-lg p-1 bg-indigo-500 text-white -mt-8 left-auto"},i.link.original_link)),Fr.el("div",{class:"mt-4 inline-flex space-x-3"},Fr.el("div",{onClick:t,class:"text-indigo-500 font-bold hover:underline cursor-pointer"},"Lien 1"),Fr.el("div",{onClick:n,class:"text-indigo-500 font-bold hover:underline cursor-pointer"},"Lien 2"),Fr.el("div",{onClick:s,class:"text-indigo-500 font-bold hover:underline cursor-pointer"},"Lien 3")))},N=()=>{let i=h();const[e,r]=f(i);return u.on("link:add",t=>{console.log(t),t!=null&&t.result&&(P(t.result),r(h()))}),Fr.el("div",null,Fr.el("div",{class:"flex flex-auto flex-wrap content-between place-content-center	"},v(t=>t.map(n=>Fr.el(M,{link:n})),e)))},A=(i,e)=>Fr.el("div",{class:"min-h-screen min-w-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col space-y-10 items-center "},e),O=i=>Fr.el(A,null,Fr.el(_,null),Fr.el("h1",{class:"m-11 text-9xl font-extrabold text-transparent uppercase tracking-tighest bg-gradient-to-r bg-conic-to-t from-white to-indigo-500 bg-clip-text"},"ShortU"),Fr.el("div",{class:"w-150 h-40 rounded bg-gray-900 text-white p-4 text-center flex flex-col drop-shadow-lg"},Fr.el("div",{class:"font-bold font-mono text-lg"},"Cr\xE9\xE9 votre lien coup\xE9 !"),Fr.el(S,null)),Fr.el("div",{class:"w-150 rounded bg-gray-900 text-white p-4 text-center flex flex-col drop-shadow-lg"},Fr.el("div",{class:"font-bold font-mono text-lg"},"Listes de vos liens"),Fr.el("div",null,Fr.el(N,null))),Fr.el("div",{class:"w-150 h-20 rounded bg-gray-900 text-white p-4 text-center flex justify-center	  drop-shadow-lg"},Fr.el("a",{href:"https://github.com/Nobodyno-boop/train-own-react"},Fr.el("img",{class:"w-10 h-10",src:"github.png",alt:""}))));window.Fr=p;const T=()=>{p.render(O,document.getElementById("app"))};T();