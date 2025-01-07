import{r as c,j as e}from"./jsx-runtime-56DGgGmo.js";import{q as w,t as j,v as f,w as v,_ as b,L as u,a as k,F as N,M,x as S,O as L,S as A}from"./components-CUoXoAHT.js";/**
 * @remix-run/react v2.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let g="positions";function C({getKey:t,...a}){let{isSpaMode:r}=w(),s=j(),n=f();v({getKey:t,storageKey:g});let o=c.useMemo(()=>{if(!t)return null;let i=t(s,n);return i!==s.key?i:null},[]);if(r)return null;let x=((i,m)=>{if(!window.history.state||!window.history.state.key){let d=Math.random().toString(32).slice(2);window.history.replaceState({key:d},"")}try{let h=JSON.parse(sessionStorage.getItem(i)||"{}")[m||window.history.state.key];typeof h=="number"&&window.scrollTo(0,h)}catch(d){console.error(d),sessionStorage.removeItem(i)}}).toString();return c.createElement("script",b({},a,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${x})(${JSON.stringify(g)}, ${JSON.stringify(o)})`}}))}/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),y=(...t)=>t.filter((a,r,s)=>!!a&&a.trim()!==""&&s.indexOf(a)===r).join(" ").trim();/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=c.forwardRef(({color:t="currentColor",size:a=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:n="",children:o,iconNode:x,...i},m)=>c.createElement("svg",{ref:m,...z,width:a,height:a,stroke:t,strokeWidth:s?Number(r)*24/Number(a):r,className:y("lucide",n),...i},[...x.map(([d,h])=>c.createElement(d,h)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(t,a)=>{const r=c.forwardRef(({className:s,...n},o)=>c.createElement(_,{ref:o,iconNode:a,className:y(`lucide-${H(t)}`,s),...n}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=l("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=l("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=l("Instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=l("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=l("ListPlus",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M18 9v6",key:"1twb98"}],["path",{d:"M21 12h-6",key:"bt1uis"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=l("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.456.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=l("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),R=[{header:"Main Menu",submenu:[{title:"Home",url:"/",icon:$},{title:"Dashboard",url:"/dashboard",icon:E},{title:"Calendar",url:"",icon:I},{title:"Search",url:"/search",icon:O},{title:"Settings",url:"#",icon:P}]},{header:"Add Lists",submenu:[{title:"Add Product",url:"/add_product",icon:p},{title:"Add Video",url:"/add_video",icon:p}]}],V=()=>e.jsxs("div",{className:"bg-gray-100 text-gray-900 w-64 h-screen fixed left-0 top-0 z-10 flex flex-col",children:[e.jsx("div",{className:"flex justify-center items-center h-16 bg-white shadow-md",children:e.jsx("img",{src:"HeadingLogo.png",alt:"Logo",className:"w-48 h-12"})}),e.jsx("div",{className:"flex-1 overflow-y-auto",children:R.map((t,a)=>e.jsxs("div",{className:"mb-6",children:[e.jsx("h3",{className:"text-md font-semibold bg-gray-900 text-white py-2 px-4 border-b border-gray-300",children:t.header}),e.jsx("ul",{className:"space-y-1",children:t.submenu.map((r,s)=>e.jsx("li",{children:e.jsxs(u,{to:r.url,className:"flex items-center space-x-3 py-2 px-4 text-gray-700 hover:bg-gray-300 hover:text-gray-900 rounded-md transition",children:[e.jsx(r.icon,{className:"w-5 h-5"}),e.jsx("span",{children:r.title})]})},s))})]},a))})]});function B({query:t,placeholder:a="Search..."}){const[r,s]=k();return e.jsx(e.Fragment,{children:e.jsx("header",{className:"bg-gradient-to-r bg-gray-100 p-4",children:e.jsxs("div",{className:"container mx-auto flex items-center justify-between",children:[e.jsx("div",{className:"flex items-center",children:e.jsx("div",{className:"ml-4 text-black text-lg font-bold",children:"Gupta Fireworks"})}),e.jsxs(N,{method:"get",className:"flex  lg:max-w-[500px] rounded-lg border-gray-400 border-opacity-65 border bg-gray-100 px-2",children:[e.jsx("input",{type:"text",name:"q",className:"flex w-full bg-transparent px-3 text-gray-700 rtl:text-right outline-0",placeholder:a,value:t,onChange:n=>s({q:n.target.value})}),e.jsx("div",{className:"border-gray-400 border-opacity-70 my-1 border-l"}),e.jsx("button",{type:"submit",className:"relative rounded-full bg-transparent px-2 py-3",children:"🔍"})]}),e.jsxs("div",{className:"hidden lg:flex items-center gap-6 text-black",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"})}),e.jsx("span",{children:"+91 9967667099"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"})}),e.jsx("span",{children:"shivamgupta08032001@gmail.com"})]})]}),e.jsxs("div",{className:"hidden lg:flex gap-4",children:[e.jsx(u,{to:"https://www.facebook.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Facebook",children:e.jsx(F,{size:30,className:"text-blue-600"})}),e.jsx(u,{to:"https://www.instagram.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Instagram",children:e.jsx(q,{size:30,className:"text-red-300"})}),e.jsx("a",{href:"https://www.whatsapp.com",target:"_blank",rel:"noopener noreferrer","aria-label":"WhatsApp",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",className:"w-8 h-8 text-green-500",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"})})})]})]})})})}function J(){return e.jsxs("html",{lang:"en",className:"h-full bg-gray-100",children:[e.jsxs("head",{children:[e.jsx(M,{}),e.jsx(S,{})]}),e.jsxs("body",{className:"h-full",children:[e.jsxs("div",{className:"flex h-full",children:[e.jsx("div",{className:"hidden md:block w-64",children:e.jsx(V,{})}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsx(B,{}),e.jsx("main",{className:"flex-1 p-1 bg-gray-50",children:e.jsx(L,{})})]})]}),e.jsx(C,{}),e.jsx(A,{})]})]})}export{J as default};
