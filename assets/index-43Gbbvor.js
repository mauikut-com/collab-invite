var q=Object.defineProperty;var F=(e,t,n)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var b=(e,t,n)=>(F(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function g(){}function I(e){return e()}function S(){return Object.create(null)}function y(e){e.forEach(I)}function B(e){return typeof e=="function"}function K(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function T(e){return Object.keys(e).length===0}function _(e,t){e.appendChild(t)}function V(e,t,n){e.insertBefore(t,n||null)}function M(e){e.parentNode&&e.parentNode.removeChild(e)}function $(e){return document.createElement(e)}function R(e){return document.createTextNode(e)}function z(){return R(" ")}function P(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function w(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function D(e){return Array.from(e.childNodes)}function A(e,t){e.value=t??""}let E;function m(e){E=e}const h=[],j=[];let p=[];const C=[],G=Promise.resolve();let k=!1;function H(){k||(k=!0,G.then(U))}function v(e){p.push(e)}const x=new Set;let d=0;function U(){if(d!==0)return;const e=E;do{try{for(;d<h.length;){const t=h[d];d++,m(t),J(t.$$)}}catch(t){throw h.length=0,d=0,t}for(m(null),h.length=0,d=0;j.length;)j.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];x.has(n)||(x.add(n),n())}p.length=0}while(h.length);for(;C.length;)C.pop()();k=!1,x.clear(),m(e)}function J(e){if(e.fragment!==null){e.update(),y(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(v)}}function Q(e){const t=[],n=[];p.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),p=t}const W=new Set;function X(e,t){e&&e.i&&(W.delete(e),e.i(t))}function Y(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),v(()=>{const c=e.$$.on_mount.map(I).filter(B);e.$$.on_destroy?e.$$.on_destroy.push(...c):y(c),e.$$.on_mount=[]}),r.forEach(v)}function Z(e,t){const n=e.$$;n.fragment!==null&&(Q(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ee(e,t){e.$$.dirty[0]===-1&&(h.push(e),H(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function te(e,t,n,o,r,c,u=null,a=[-1]){const s=E;m(e);const i=e.$$={fragment:null,ctx:[],props:c,update:g,not_equal:r,bound:S(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(s?s.$$.context:[])),callbacks:S(),dirty:a,skip_bound:!1,root:t.target||s.$$.root};u&&u(i.root);let f=!1;if(i.ctx=n?n(e,t.props||{},(l,O,...L)=>{const N=L.length?L[0]:O;return i.ctx&&r(i.ctx[l],i.ctx[l]=N)&&(!i.skip_bound&&i.bound[l]&&i.bound[l](N),f&&ee(e,l)),O}):[],i.update(),f=!0,y(i.before_update),i.fragment=o?o(i.ctx):!1,t.target){if(t.hydrate){const l=D(t.target);i.fragment&&i.fragment.l(l),l.forEach(M)}else i.fragment&&i.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor),U()}m(s)}class ne{constructor(){b(this,"$$");b(this,"$$set")}$destroy(){Z(this,1),this.$destroy=g}$on(t,n){if(!B(n))return g;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!T(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const re="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(re);function oe(e){let t,n,o,r,c,u,a,s;return{c(){t=$("main"),n=$("input"),o=z(),r=$("label"),c=R(`deal:
    `),u=$("input"),w(n,"type","text"),w(u,"type","checkbox"),w(u,"xxx","hide checkbox; style label to look like button")},m(i,f){V(i,t,f),_(t,n),A(n,e[1]),_(t,o),_(t,r),_(r,c),_(r,u),u.checked=e[0],a||(s=[P(n,"input",e[2]),P(u,"change",e[3])],a=!0)},p(i,[f]){f&2&&n.value!==i[1]&&A(n,i[1]),f&1&&(u.checked=i[0])},i:g,o:g,d(i){i&&M(t),a=!1,y(s)}}}function ie(){const e=new URLSearchParams(location.search);return{a:e.get("a"),d:e.get("d")!="n"}}function ce(e,t,n){let o,r,c=ie();function u(i,f){return`?a=${i}&d=${f}`}function a(){o=this.value,n(1,o),n(4,c)}function s(){r=this.checked,n(0,r),n(4,c)}return e.$$.update=()=>{e.$$.dirty&3&&history.replaceState({},"",u(o,r))},n(1,o=c.a),n(0,r=c.d),[r,o,a,s]}class ue extends ne{constructor(t){super(),te(this,t,ce,oe,K,{})}}new ue({target:document.getElementById("app")});
