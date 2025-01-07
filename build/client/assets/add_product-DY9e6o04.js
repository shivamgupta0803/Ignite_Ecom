import{r as u,j as c}from"./jsx-runtime-56DGgGmo.js";import{S as U,c as F,a as V,I as N,B as Y}from"./input-CCVfWDD9.js";import{F as Z,a as G}from"./components-CUoXoAHT.js";var J=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],Q=J.reduce((e,t)=>{const r=u.forwardRef((i,s)=>{const{asChild:a,...n}=i,o=a?U:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),c.jsx(o,{...n,ref:s})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),W="Label",R=u.forwardRef((e,t)=>c.jsx(Q.label,{...e,ref:t,onMouseDown:r=>{var s;r.target.closest("button, input, select, textarea")||((s=e.onMouseDown)==null||s.call(e,r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));R.displayName=W;var L=R;const X=V("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),j=u.forwardRef(({className:e,...t},r)=>c.jsx(L,{ref:r,className:F(X(),e),...t}));j.displayName=L.displayName;const _=u.forwardRef(({className:e,...t},r)=>c.jsx("textarea",{className:F("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:r,...t}));_.displayName="Textarea";const K=()=>c.jsx("div",{children:c.jsxs(Z,{method:"post",className:"space-y-4",encType:"multipart/form-data",children:[c.jsxs("div",{children:[c.jsx(j,{children:"Name"}),c.jsx(N,{type:"text",name:"name",placeholder:"Enter product name...",required:!0})]}),c.jsxs("div",{children:[c.jsx(j,{children:"Actual Price"}),c.jsx(N,{type:"number",name:"actual_price",placeholder:"Enter Actual Price...",min:"0",required:!0})]}),c.jsxs("div",{children:[c.jsx(j,{children:"Discount Price"}),c.jsx(N,{type:"number",name:"discount_price",placeholder:"Enter Discount Price...",min:"0",required:!0})]}),c.jsxs("div",{children:[c.jsx(j,{children:"Content"}),c.jsx(_,{name:"content",placeholder:"Type your product description here.",required:!0})]}),c.jsxs("div",{children:[c.jsx(j,{children:"Photo"}),c.jsx(N,{type:"file",name:"image",accept:"image/*",required:!0})]}),c.jsx(Y,{type:"submit",children:"Submit"})]})}),ee=K;let te={data:""},re=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||te,ae=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,se=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,b=(e,t)=>{let r="",i="",s="";for(let a in e){let n=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+n+";":i+=a[1]=="f"?b(n,a):a+"{"+b(n,a[1]=="k"?"":t)+"}":typeof n=="object"?i+=b(n,t?t.replace(/([^,])+/g,o=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,o):o?o+" "+l:l)):a):n!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=b.p?b.p(a,n):a+":"+n+";")}return r+(t&&s?t+"{"+s+"}":s)+i},y={},q=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+q(e[r]);return t}return e},ie=(e,t,r,i,s)=>{let a=q(e),n=y[a]||(y[a]=(l=>{let d=0,p=11;for(;d<l.length;)p=101*p+l.charCodeAt(d++)>>>0;return"go"+p})(a));if(!y[n]){let l=a!==e?e:(d=>{let p,h,f=[{}];for(;p=ae.exec(d.replace(se,""));)p[4]?f.shift():p[3]?(h=p[3].replace(z," ").trim(),f.unshift(f[0][h]=f[0][h]||{})):f[0][p[1]]=p[2].replace(z," ").trim();return f[0]})(e);y[n]=b(s?{["@keyframes "+n]:l}:l,r?"":"."+n)}let o=r&&y.g?y.g:null;return r&&(y.g=y[n]),((l,d,p,h)=>{h?d.data=d.data.replace(h,l):d.data.indexOf(l)===-1&&(d.data=p?l+d.data:d.data+l)})(y[n],t,i,o),n},oe=(e,t,r)=>e.reduce((i,s,a)=>{let n=t[a];if(n&&n.call){let o=n(r),l=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=l?"."+l:o&&typeof o=="object"?o.props?"":b(o,""):o===!1?"":o}return i+s+(n??"")},"");function O(e){let t=this||{},r=e.call?e(t.p):e;return ie(r.unshift?r.raw?oe(r,[].slice.call(arguments,1),t.p):r.reduce((i,s)=>Object.assign(i,s&&s.call?s(t.p):s),{}):r,re(t.target),t.g,t.o,t.k)}let H,S,I;O.bind({g:1});let x=O.bind({k:1});function ne(e,t,r,i){b.p=t,H=e,S=r,I=i}function v(e,t){let r=this||{};return function(){let i=arguments;function s(a,n){let o=Object.assign({},a),l=o.className||s.className;r.p=Object.assign({theme:S&&S()},o),r.o=/ *go\d+/.test(l),o.className=O.apply(r,i)+(l?" "+l:"");let d=e;return e[0]&&(d=o.as||e,delete o.as),I&&d[0]&&I(o),H(d,o)}return s}}var le=e=>typeof e=="function",D=(e,t)=>le(e)?e(t):e,de=(()=>{let e=0;return()=>(++e).toString()})(),B=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ce=20,P=new Map,ue=1e3,M=e=>{if(P.has(e))return;let t=setTimeout(()=>{P.delete(e),w({type:4,toastId:e})},ue);P.set(e,t)},pe=e=>{let t=P.get(e);t&&clearTimeout(t)},T=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,ce)};case 1:return t.toast.id&&pe(t.toast.id),{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return e.toasts.find(a=>a.id===r.id)?T(e,{type:1,toast:r}):T(e,{type:0,toast:r});case 3:let{toastId:i}=t;return i?M(i):e.toasts.forEach(a=>{M(a.id)}),{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},A=[],k={toasts:[],pausedAt:void 0},w=e=>{k=T(k,e),A.forEach(t=>{t(k)})},me={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},fe=(e={})=>{let[t,r]=u.useState(k);u.useEffect(()=>(A.push(r),()=>{let s=A.indexOf(r);s>-1&&A.splice(s,1)}),[t]);let i=t.toasts.map(s=>{var a,n;return{...e,...e[s.type],...s,duration:s.duration||((a=e[s.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||me[s.type],style:{...e.style,...(n=e[s.type])==null?void 0:n.style,...s.style}}});return{...t,toasts:i}},he=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||de()}),E=e=>(t,r)=>{let i=he(t,e,r);return w({type:2,toast:i}),i.id},m=(e,t)=>E("blank")(e,t);m.error=E("error");m.success=E("success");m.loading=E("loading");m.custom=E("custom");m.dismiss=e=>{w({type:3,toastId:e})};m.remove=e=>w({type:4,toastId:e});m.promise=(e,t,r)=>{let i=m.loading(t.loading,{...r,...r==null?void 0:r.loading});return e.then(s=>(m.success(D(t.success,s),{id:i,...r,...r==null?void 0:r.success}),s)).catch(s=>{m.error(D(t.error,s),{id:i,...r,...r==null?void 0:r.error})}),e};var ge=(e,t)=>{w({type:1,toast:{id:e,height:t}})},ye=()=>{w({type:5,time:Date.now()})},xe=e=>{let{toasts:t,pausedAt:r}=fe(e);u.useEffect(()=>{if(r)return;let a=Date.now(),n=t.map(o=>{if(o.duration===1/0)return;let l=(o.duration||0)+o.pauseDuration-(a-o.createdAt);if(l<0){o.visible&&m.dismiss(o.id);return}return setTimeout(()=>m.dismiss(o.id),l)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[t,r]);let i=u.useCallback(()=>{r&&w({type:6,time:Date.now()})},[r]),s=u.useCallback((a,n)=>{let{reverseOrder:o=!1,gutter:l=8,defaultPosition:d}=n||{},p=t.filter(g=>(g.position||d)===(a.position||d)&&g.height),h=p.findIndex(g=>g.id===a.id),f=p.filter((g,C)=>C<h&&g.visible).length;return p.filter(g=>g.visible).slice(...o?[f+1]:[0,f]).reduce((g,C)=>g+(C.height||0)+l,0)},[t]);return{toasts:t,handlers:{updateHeight:ge,startPause:ye,endPause:i,calculateOffset:s}}},be=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ve=x`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,we=x`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,je=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ve} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${we} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ee=x`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ne=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ee} 1s linear infinite;
`,$e=x`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Pe=x`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ae=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Pe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ke=v("div")`
  position: absolute;
`,De=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Oe=x`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ce=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Oe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Se=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return t!==void 0?typeof t=="string"?u.createElement(Ce,null,t):t:r==="blank"?null:u.createElement(De,null,u.createElement(Ne,{...i}),r!=="loading"&&u.createElement(ke,null,r==="error"?u.createElement(je,{...i}):u.createElement(Ae,{...i})))},Ie=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Te=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ze="0%{opacity:0;} 100%{opacity:1;}",Me="0%{opacity:1;} 100%{opacity:0;}",Fe=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Re=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Le=(e,t)=>{let r=e.includes("top")?1:-1,[i,s]=B()?[ze,Me]:[Ie(r),Te(r)];return{animation:t?`${x(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${x(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},_e=u.memo(({toast:e,position:t,style:r,children:i})=>{let s=e.height?Le(e.position||t||"top-center",e.visible):{opacity:0},a=u.createElement(Se,{toast:e}),n=u.createElement(Re,{...e.ariaProps},D(e.message,e));return u.createElement(Fe,{className:e.className,style:{...s,...r,...e.style}},typeof i=="function"?i({icon:a,message:n}):u.createElement(u.Fragment,null,a,n))});ne(u.createElement);var qe=({id:e,className:t,style:r,onHeightUpdate:i,children:s})=>{let a=u.useCallback(n=>{if(n){let o=()=>{let l=n.getBoundingClientRect().height;i(e,l)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return u.createElement("div",{ref:a,className:t,style:r},s)},He=(e,t)=>{let r=e.includes("top"),i=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:B()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...i,...s}},Be=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,Ue=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:s,containerStyle:a,containerClassName:n})=>{let{toasts:o,handlers:l}=xe(r);return u.createElement("div",{style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...a},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},o.map(d=>{let p=d.position||t,h=l.calculateOffset(d,{reverseOrder:e,gutter:i,defaultPosition:t}),f=He(p,h);return u.createElement(qe,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Be:"",style:f},d.type==="custom"?D(d.message,d):s?s(d):u.createElement(_e,{toast:d,position:p}))}))},Ve=m;function Je(){const[e]=G(),t=e.get("success");return u.useEffect(()=>{t==="true"&&Ve.success("Product added successfully!")},[t]),c.jsx(c.Fragment,{children:c.jsxs("div",{className:"max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-4",children:[c.jsx("h2",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Add New Product"}),c.jsx(Ue,{position:"top-right",reverseOrder:!1}),c.jsx(ee,{})]})})}export{Je as default};
