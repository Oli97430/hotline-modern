var Ch=Object.defineProperty;var Eh=(e,t,n)=>t in e?Ch(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Dc=(e,t,n)=>Eh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();var zh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function vd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ph(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var s=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return e[r]}})}),n}var yd={exports:{}},Ti={},bd={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xa=Symbol.for("react.element"),Mh=Symbol.for("react.portal"),Ih=Symbol.for("react.fragment"),Lh=Symbol.for("react.strict_mode"),Th=Symbol.for("react.profiler"),Oh=Symbol.for("react.provider"),Rh=Symbol.for("react.context"),_h=Symbol.for("react.forward_ref"),Dh=Symbol.for("react.suspense"),Ah=Symbol.for("react.memo"),Uh=Symbol.for("react.lazy"),Ac=Symbol.iterator;function Fh(e){return e===null||typeof e!="object"?null:(e=Ac&&e[Ac]||e["@@iterator"],typeof e=="function"?e:null)}var wd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},kd=Object.assign,jd={};function bs(e,t,n){this.props=e,this.context=t,this.refs=jd,this.updater=n||wd}bs.prototype.isReactComponent={};bs.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};bs.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Sd(){}Sd.prototype=bs.prototype;function _l(e,t,n){this.props=e,this.context=t,this.refs=jd,this.updater=n||wd}var Dl=_l.prototype=new Sd;Dl.constructor=_l;kd(Dl,bs.prototype);Dl.isPureReactComponent=!0;var Uc=Array.isArray,Nd=Object.prototype.hasOwnProperty,Al={current:null},Cd={key:!0,ref:!0,__self:!0,__source:!0};function Ed(e,t,n){var r,s={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Nd.call(t,r)&&!Cd.hasOwnProperty(r)&&(s[r]=t[r]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var u=Array(c),f=0;f<c;f++)u[f]=arguments[f+2];s.children=u}if(e&&e.defaultProps)for(r in c=e.defaultProps,c)s[r]===void 0&&(s[r]=c[r]);return{$$typeof:xa,type:e,key:a,ref:o,props:s,_owner:Al.current}}function $h(e,t){return{$$typeof:xa,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ul(e){return typeof e=="object"&&e!==null&&e.$$typeof===xa}function Bh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Fc=/\/+/g;function no(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Bh(""+e.key):t.toString(36)}function Ha(e,t,n,r,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case xa:case Mh:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+no(o,0):r,Uc(s)?(n="",e!=null&&(n=e.replace(Fc,"$&/")+"/"),Ha(s,t,n,"",function(f){return f})):s!=null&&(Ul(s)&&(s=$h(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Fc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",Uc(e))for(var c=0;c<e.length;c++){a=e[c];var u=r+no(a,c);o+=Ha(a,t,n,u,s)}else if(u=Fh(e),typeof u=="function")for(e=u.call(e),c=0;!(a=e.next()).done;)a=a.value,u=r+no(a,c++),o+=Ha(a,t,n,u,s);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Sa(e,t,n){if(e==null)return e;var r=[],s=0;return Ha(e,r,"","",function(a){return t.call(n,a,s++)}),r}function Hh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Gt={current:null},Va={transition:null},Vh={ReactCurrentDispatcher:Gt,ReactCurrentBatchConfig:Va,ReactCurrentOwner:Al};function zd(){throw Error("act(...) is not supported in production builds of React.")}$e.Children={map:Sa,forEach:function(e,t,n){Sa(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Sa(e,function(){t++}),t},toArray:function(e){return Sa(e,function(t){return t})||[]},only:function(e){if(!Ul(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$e.Component=bs;$e.Fragment=Ih;$e.Profiler=Th;$e.PureComponent=_l;$e.StrictMode=Lh;$e.Suspense=Dh;$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Vh;$e.act=zd;$e.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=kd({},e.props),s=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=Al.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(u in t)Nd.call(t,u)&&!Cd.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&c!==void 0?c[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){c=Array(u);for(var f=0;f<u;f++)c[f]=arguments[f+2];r.children=c}return{$$typeof:xa,type:e.type,key:s,ref:a,props:r,_owner:o}};$e.createContext=function(e){return e={$$typeof:Rh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Oh,_context:e},e.Consumer=e};$e.createElement=Ed;$e.createFactory=function(e){var t=Ed.bind(null,e);return t.type=e,t};$e.createRef=function(){return{current:null}};$e.forwardRef=function(e){return{$$typeof:_h,render:e}};$e.isValidElement=Ul;$e.lazy=function(e){return{$$typeof:Uh,_payload:{_status:-1,_result:e},_init:Hh}};$e.memo=function(e,t){return{$$typeof:Ah,type:e,compare:t===void 0?null:t}};$e.startTransition=function(e){var t=Va.transition;Va.transition={};try{e()}finally{Va.transition=t}};$e.unstable_act=zd;$e.useCallback=function(e,t){return Gt.current.useCallback(e,t)};$e.useContext=function(e){return Gt.current.useContext(e)};$e.useDebugValue=function(){};$e.useDeferredValue=function(e){return Gt.current.useDeferredValue(e)};$e.useEffect=function(e,t){return Gt.current.useEffect(e,t)};$e.useId=function(){return Gt.current.useId()};$e.useImperativeHandle=function(e,t,n){return Gt.current.useImperativeHandle(e,t,n)};$e.useInsertionEffect=function(e,t){return Gt.current.useInsertionEffect(e,t)};$e.useLayoutEffect=function(e,t){return Gt.current.useLayoutEffect(e,t)};$e.useMemo=function(e,t){return Gt.current.useMemo(e,t)};$e.useReducer=function(e,t,n){return Gt.current.useReducer(e,t,n)};$e.useRef=function(e){return Gt.current.useRef(e)};$e.useState=function(e){return Gt.current.useState(e)};$e.useSyncExternalStore=function(e,t,n){return Gt.current.useSyncExternalStore(e,t,n)};$e.useTransition=function(){return Gt.current.useTransition()};$e.version="18.3.1";bd.exports=$e;var y=bd.exports;const Kh=vd(y);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wh=y,Yh=Symbol.for("react.element"),Jh=Symbol.for("react.fragment"),Qh=Object.prototype.hasOwnProperty,qh=Wh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xh={key:!0,ref:!0,__self:!0,__source:!0};function Pd(e,t,n){var r,s={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Qh.call(t,r)&&!Xh.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Yh,type:e,key:a,ref:o,props:s,_owner:qh.current}}Ti.Fragment=Jh;Ti.jsx=Pd;Ti.jsxs=Pd;yd.exports=Ti;var i=yd.exports,Oo={},Md={exports:{}},mn={},Id={exports:{}},Ld={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(W,re){var he=W.length;W.push(re);e:for(;0<he;){var De=he-1>>>1,ve=W[De];if(0<s(ve,re))W[De]=re,W[he]=ve,he=De;else break e}}function n(W){return W.length===0?null:W[0]}function r(W){if(W.length===0)return null;var re=W[0],he=W.pop();if(he!==re){W[0]=he;e:for(var De=0,ve=W.length,Ze=ve>>>1;De<Ze;){var We=2*(De+1)-1,je=W[We],et=We+1,Ct=W[et];if(0>s(je,he))et<ve&&0>s(Ct,je)?(W[De]=Ct,W[et]=he,De=et):(W[De]=je,W[We]=he,De=We);else if(et<ve&&0>s(Ct,he))W[De]=Ct,W[et]=he,De=et;else break e}}return re}function s(W,re){var he=W.sortIndex-re.sortIndex;return he!==0?he:W.id-re.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,c=o.now();e.unstable_now=function(){return o.now()-c}}var u=[],f=[],m=1,b=null,x=3,N=!1,w=!1,C=!1,L=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function z(W){for(var re=n(f);re!==null;){if(re.callback===null)r(f);else if(re.startTime<=W)r(f),re.sortIndex=re.expirationTime,t(u,re);else break;re=n(f)}}function E(W){if(C=!1,z(W),!w)if(n(u)!==null)w=!0,Xe(I);else{var re=n(f);re!==null&&xt(E,re.startTime-W)}}function I(W,re){w=!1,C&&(C=!1,k(Q),Q=-1),N=!0;var he=x;try{for(z(re),b=n(u);b!==null&&(!(b.expirationTime>re)||W&&!Ke());){var De=b.callback;if(typeof De=="function"){b.callback=null,x=b.priorityLevel;var ve=De(b.expirationTime<=re);re=e.unstable_now(),typeof ve=="function"?b.callback=ve:b===n(u)&&r(u),z(re)}else r(u);b=n(u)}if(b!==null)var Ze=!0;else{var We=n(f);We!==null&&xt(E,We.startTime-re),Ze=!1}return Ze}finally{b=null,x=he,N=!1}}var D=!1,_=null,Q=-1,Ae=5,pe=-1;function Ke(){return!(e.unstable_now()-pe<Ae)}function pt(){if(_!==null){var W=e.unstable_now();pe=W;var re=!0;try{re=_(!0,W)}finally{re?kt():(D=!1,_=null)}}else D=!1}var kt;if(typeof v=="function")kt=function(){v(pt)};else if(typeof MessageChannel<"u"){var ht=new MessageChannel,ot=ht.port2;ht.port1.onmessage=pt,kt=function(){ot.postMessage(null)}}else kt=function(){L(pt,0)};function Xe(W){_=W,D||(D=!0,kt())}function xt(W,re){Q=L(function(){W(e.unstable_now())},re)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(W){W.callback=null},e.unstable_continueExecution=function(){w||N||(w=!0,Xe(I))},e.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ae=0<W?Math.floor(1e3/W):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(W){switch(x){case 1:case 2:case 3:var re=3;break;default:re=x}var he=x;x=re;try{return W()}finally{x=he}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(W,re){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var he=x;x=W;try{return re()}finally{x=he}},e.unstable_scheduleCallback=function(W,re,he){var De=e.unstable_now();switch(typeof he=="object"&&he!==null?(he=he.delay,he=typeof he=="number"&&0<he?De+he:De):he=De,W){case 1:var ve=-1;break;case 2:ve=250;break;case 5:ve=1073741823;break;case 4:ve=1e4;break;default:ve=5e3}return ve=he+ve,W={id:m++,callback:re,priorityLevel:W,startTime:he,expirationTime:ve,sortIndex:-1},he>De?(W.sortIndex=he,t(f,W),n(u)===null&&W===n(f)&&(C?(k(Q),Q=-1):C=!0,xt(E,he-De))):(W.sortIndex=ve,t(u,W),w||N||(w=!0,Xe(I))),W},e.unstable_shouldYield=Ke,e.unstable_wrapCallback=function(W){var re=x;return function(){var he=x;x=re;try{return W.apply(this,arguments)}finally{x=he}}}})(Ld);Id.exports=Ld;var Gh=Id.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Zh=y,hn=Gh;function J(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Td=new Set,Qs={};function Br(e,t){fs(e,t),fs(e+"Capture",t)}function fs(e,t){for(Qs[e]=t,e=0;e<t.length;e++)Td.add(t[e])}var er=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ro=Object.prototype.hasOwnProperty,em=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$c={},Bc={};function tm(e){return Ro.call(Bc,e)?!0:Ro.call($c,e)?!1:em.test(e)?Bc[e]=!0:($c[e]=!0,!1)}function nm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function rm(e,t,n,r){if(t===null||typeof t>"u"||nm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Zt(e,t,n,r,s,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Ft={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ft[e]=new Zt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ft[t]=new Zt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ft[e]=new Zt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ft[e]=new Zt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ft[e]=new Zt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ft[e]=new Zt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ft[e]=new Zt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ft[e]=new Zt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ft[e]=new Zt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Fl=/[\-:]([a-z])/g;function $l(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Fl,$l);Ft[t]=new Zt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Fl,$l);Ft[t]=new Zt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Fl,$l);Ft[t]=new Zt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ft[e]=new Zt(e,1,!1,e.toLowerCase(),null,!1,!1)});Ft.xlinkHref=new Zt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ft[e]=new Zt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Bl(e,t,n,r){var s=Ft.hasOwnProperty(t)?Ft[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(rm(t,n,s,r)&&(n=null),r||s===null?tm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var sr=Zh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Na=Symbol.for("react.element"),Yr=Symbol.for("react.portal"),Jr=Symbol.for("react.fragment"),Hl=Symbol.for("react.strict_mode"),_o=Symbol.for("react.profiler"),Od=Symbol.for("react.provider"),Rd=Symbol.for("react.context"),Vl=Symbol.for("react.forward_ref"),Do=Symbol.for("react.suspense"),Ao=Symbol.for("react.suspense_list"),Kl=Symbol.for("react.memo"),or=Symbol.for("react.lazy"),_d=Symbol.for("react.offscreen"),Hc=Symbol.iterator;function Ss(e){return e===null||typeof e!="object"?null:(e=Hc&&e[Hc]||e["@@iterator"],typeof e=="function"?e:null)}var wt=Object.assign,ro;function Rs(e){if(ro===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ro=t&&t[1]||""}return`
`+ro+e}var so=!1;function ao(e,t){if(!e||so)return"";so=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var s=f.stack.split(`
`),a=r.stack.split(`
`),o=s.length-1,c=a.length-1;1<=o&&0<=c&&s[o]!==a[c];)c--;for(;1<=o&&0<=c;o--,c--)if(s[o]!==a[c]){if(o!==1||c!==1)do if(o--,c--,0>c||s[o]!==a[c]){var u=`
`+s[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=c);break}}}finally{so=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Rs(e):""}function sm(e){switch(e.tag){case 5:return Rs(e.type);case 16:return Rs("Lazy");case 13:return Rs("Suspense");case 19:return Rs("SuspenseList");case 0:case 2:case 15:return e=ao(e.type,!1),e;case 11:return e=ao(e.type.render,!1),e;case 1:return e=ao(e.type,!0),e;default:return""}}function Uo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jr:return"Fragment";case Yr:return"Portal";case _o:return"Profiler";case Hl:return"StrictMode";case Do:return"Suspense";case Ao:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Rd:return(e.displayName||"Context")+".Consumer";case Od:return(e._context.displayName||"Context")+".Provider";case Vl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Kl:return t=e.displayName||null,t!==null?t:Uo(e.type)||"Memo";case or:t=e._payload,e=e._init;try{return Uo(e(t))}catch{}}return null}function am(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Uo(t);case 8:return t===Hl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function wr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Dd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function im(e){var t=Dd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ca(e){e._valueTracker||(e._valueTracker=im(e))}function Ad(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Dd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ni(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Fo(e,t){var n=t.checked;return wt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function Vc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=wr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ud(e,t){t=t.checked,t!=null&&Bl(e,"checked",t,!1)}function $o(e,t){Ud(e,t);var n=wr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Bo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Bo(e,t.type,wr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Kc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Bo(e,t,n){(t!=="number"||ni(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var _s=Array.isArray;function as(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+wr(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Ho(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(J(91));return wt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(J(92));if(_s(n)){if(1<n.length)throw Error(J(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:wr(n)}}function Fd(e,t){var n=wr(t.value),r=wr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Yc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function $d(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Vo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?$d(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ea,Bd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ea=Ea||document.createElement("div"),Ea.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ea.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Us={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},om=["Webkit","ms","Moz","O"];Object.keys(Us).forEach(function(e){om.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Us[t]=Us[e]})});function Hd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Us.hasOwnProperty(e)&&Us[e]?(""+t).trim():t+"px"}function Vd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Hd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var lm=wt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ko(e,t){if(t){if(lm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(J(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(J(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(J(61))}if(t.style!=null&&typeof t.style!="object")throw Error(J(62))}}function Wo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yo=null;function Wl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Jo=null,is=null,os=null;function Jc(e){if(e=ba(e)){if(typeof Jo!="function")throw Error(J(280));var t=e.stateNode;t&&(t=Ai(t),Jo(e.stateNode,e.type,t))}}function Kd(e){is?os?os.push(e):os=[e]:is=e}function Wd(){if(is){var e=is,t=os;if(os=is=null,Jc(e),t)for(e=0;e<t.length;e++)Jc(t[e])}}function Yd(e,t){return e(t)}function Jd(){}var io=!1;function Qd(e,t,n){if(io)return e(t,n);io=!0;try{return Yd(e,t,n)}finally{io=!1,(is!==null||os!==null)&&(Jd(),Wd())}}function Xs(e,t){var n=e.stateNode;if(n===null)return null;var r=Ai(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var Qo=!1;if(er)try{var Ns={};Object.defineProperty(Ns,"passive",{get:function(){Qo=!0}}),window.addEventListener("test",Ns,Ns),window.removeEventListener("test",Ns,Ns)}catch{Qo=!1}function cm(e,t,n,r,s,a,o,c,u){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var Fs=!1,ri=null,si=!1,qo=null,um={onError:function(e){Fs=!0,ri=e}};function dm(e,t,n,r,s,a,o,c,u){Fs=!1,ri=null,cm.apply(um,arguments)}function fm(e,t,n,r,s,a,o,c,u){if(dm.apply(this,arguments),Fs){if(Fs){var f=ri;Fs=!1,ri=null}else throw Error(J(198));si||(si=!0,qo=f)}}function Hr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Qc(e){if(Hr(e)!==e)throw Error(J(188))}function pm(e){var t=e.alternate;if(!t){if(t=Hr(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return Qc(s),e;if(a===r)return Qc(s),t;a=a.sibling}throw Error(J(188))}if(n.return!==r.return)n=s,r=a;else{for(var o=!1,c=s.child;c;){if(c===n){o=!0,n=s,r=a;break}if(c===r){o=!0,r=s,n=a;break}c=c.sibling}if(!o){for(c=a.child;c;){if(c===n){o=!0,n=a,r=s;break}if(c===r){o=!0,r=a,n=s;break}c=c.sibling}if(!o)throw Error(J(189))}}if(n.alternate!==r)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function Xd(e){return e=pm(e),e!==null?Gd(e):null}function Gd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Gd(e);if(t!==null)return t;e=e.sibling}return null}var Zd=hn.unstable_scheduleCallback,qc=hn.unstable_cancelCallback,hm=hn.unstable_shouldYield,mm=hn.unstable_requestPaint,Nt=hn.unstable_now,gm=hn.unstable_getCurrentPriorityLevel,Yl=hn.unstable_ImmediatePriority,ef=hn.unstable_UserBlockingPriority,ai=hn.unstable_NormalPriority,xm=hn.unstable_LowPriority,tf=hn.unstable_IdlePriority,Oi=null,Kn=null;function vm(e){if(Kn&&typeof Kn.onCommitFiberRoot=="function")try{Kn.onCommitFiberRoot(Oi,e,void 0,(e.current.flags&128)===128)}catch{}}var Tn=Math.clz32?Math.clz32:wm,ym=Math.log,bm=Math.LN2;function wm(e){return e>>>=0,e===0?32:31-(ym(e)/bm|0)|0}var za=64,Pa=4194304;function Ds(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ii(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var c=o&~s;c!==0?r=Ds(c):(a&=o,a!==0&&(r=Ds(a)))}else o=n&~s,o!==0?r=Ds(o):a!==0&&(r=Ds(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,a=t&-t,s>=a||s===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Tn(t),s=1<<n,r|=e[n],t&=~s;return r}function km(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function jm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Tn(a),c=1<<o,u=s[o];u===-1?(!(c&n)||c&r)&&(s[o]=km(c,t)):u<=t&&(e.expiredLanes|=c),a&=~c}}function Xo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function nf(){var e=za;return za<<=1,!(za&4194240)&&(za=64),e}function oo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function va(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Tn(t),e[t]=n}function Sm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Tn(n),a=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~a}}function Jl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Tn(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var nt=0;function rf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var sf,Ql,af,of,lf,Go=!1,Ma=[],pr=null,hr=null,mr=null,Gs=new Map,Zs=new Map,cr=[],Nm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xc(e,t){switch(e){case"focusin":case"focusout":pr=null;break;case"dragenter":case"dragleave":hr=null;break;case"mouseover":case"mouseout":mr=null;break;case"pointerover":case"pointerout":Gs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zs.delete(t.pointerId)}}function Cs(e,t,n,r,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[s]},t!==null&&(t=ba(t),t!==null&&Ql(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Cm(e,t,n,r,s){switch(t){case"focusin":return pr=Cs(pr,e,t,n,r,s),!0;case"dragenter":return hr=Cs(hr,e,t,n,r,s),!0;case"mouseover":return mr=Cs(mr,e,t,n,r,s),!0;case"pointerover":var a=s.pointerId;return Gs.set(a,Cs(Gs.get(a)||null,e,t,n,r,s)),!0;case"gotpointercapture":return a=s.pointerId,Zs.set(a,Cs(Zs.get(a)||null,e,t,n,r,s)),!0}return!1}function cf(e){var t=Ir(e.target);if(t!==null){var n=Hr(t);if(n!==null){if(t=n.tag,t===13){if(t=qd(n),t!==null){e.blockedOn=t,lf(e.priority,function(){af(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ka(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yo=r,n.target.dispatchEvent(r),Yo=null}else return t=ba(n),t!==null&&Ql(t),e.blockedOn=n,!1;t.shift()}return!0}function Gc(e,t,n){Ka(e)&&n.delete(t)}function Em(){Go=!1,pr!==null&&Ka(pr)&&(pr=null),hr!==null&&Ka(hr)&&(hr=null),mr!==null&&Ka(mr)&&(mr=null),Gs.forEach(Gc),Zs.forEach(Gc)}function Es(e,t){e.blockedOn===t&&(e.blockedOn=null,Go||(Go=!0,hn.unstable_scheduleCallback(hn.unstable_NormalPriority,Em)))}function ea(e){function t(s){return Es(s,e)}if(0<Ma.length){Es(Ma[0],e);for(var n=1;n<Ma.length;n++){var r=Ma[n];r.blockedOn===e&&(r.blockedOn=null)}}for(pr!==null&&Es(pr,e),hr!==null&&Es(hr,e),mr!==null&&Es(mr,e),Gs.forEach(t),Zs.forEach(t),n=0;n<cr.length;n++)r=cr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<cr.length&&(n=cr[0],n.blockedOn===null);)cf(n),n.blockedOn===null&&cr.shift()}var ls=sr.ReactCurrentBatchConfig,oi=!0;function zm(e,t,n,r){var s=nt,a=ls.transition;ls.transition=null;try{nt=1,ql(e,t,n,r)}finally{nt=s,ls.transition=a}}function Pm(e,t,n,r){var s=nt,a=ls.transition;ls.transition=null;try{nt=4,ql(e,t,n,r)}finally{nt=s,ls.transition=a}}function ql(e,t,n,r){if(oi){var s=Zo(e,t,n,r);if(s===null)vo(e,t,r,li,n),Xc(e,r);else if(Cm(s,e,t,n,r))r.stopPropagation();else if(Xc(e,r),t&4&&-1<Nm.indexOf(e)){for(;s!==null;){var a=ba(s);if(a!==null&&sf(a),a=Zo(e,t,n,r),a===null&&vo(e,t,r,li,n),a===s)break;s=a}s!==null&&r.stopPropagation()}else vo(e,t,r,null,n)}}var li=null;function Zo(e,t,n,r){if(li=null,e=Wl(r),e=Ir(e),e!==null)if(t=Hr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qd(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return li=e,null}function uf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gm()){case Yl:return 1;case ef:return 4;case ai:case xm:return 16;case tf:return 536870912;default:return 16}default:return 16}}var dr=null,Xl=null,Wa=null;function df(){if(Wa)return Wa;var e,t=Xl,n=t.length,r,s="value"in dr?dr.value:dr.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[a-r];r++);return Wa=s.slice(e,1<r?1-r:void 0)}function Ya(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ia(){return!0}function Zc(){return!1}function gn(e){function t(n,r,s,a,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ia:Zc,this.isPropagationStopped=Zc,this}return wt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ia)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ia)},persist:function(){},isPersistent:Ia}),t}var ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gl=gn(ws),ya=wt({},ws,{view:0,detail:0}),Mm=gn(ya),lo,co,zs,Ri=wt({},ya,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zs&&(zs&&e.type==="mousemove"?(lo=e.screenX-zs.screenX,co=e.screenY-zs.screenY):co=lo=0,zs=e),lo)},movementY:function(e){return"movementY"in e?e.movementY:co}}),eu=gn(Ri),Im=wt({},Ri,{dataTransfer:0}),Lm=gn(Im),Tm=wt({},ya,{relatedTarget:0}),uo=gn(Tm),Om=wt({},ws,{animationName:0,elapsedTime:0,pseudoElement:0}),Rm=gn(Om),_m=wt({},ws,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Dm=gn(_m),Am=wt({},ws,{data:0}),tu=gn(Am),Um={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$m={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Bm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=$m[e])?!!t[e]:!1}function Zl(){return Bm}var Hm=wt({},ya,{key:function(e){if(e.key){var t=Um[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ya(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Fm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zl,charCode:function(e){return e.type==="keypress"?Ya(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ya(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Vm=gn(Hm),Km=wt({},Ri,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nu=gn(Km),Wm=wt({},ya,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zl}),Ym=gn(Wm),Jm=wt({},ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),Qm=gn(Jm),qm=wt({},Ri,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xm=gn(qm),Gm=[9,13,27,32],ec=er&&"CompositionEvent"in window,$s=null;er&&"documentMode"in document&&($s=document.documentMode);var Zm=er&&"TextEvent"in window&&!$s,ff=er&&(!ec||$s&&8<$s&&11>=$s),ru=" ",su=!1;function pf(e,t){switch(e){case"keyup":return Gm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qr=!1;function eg(e,t){switch(e){case"compositionend":return hf(t);case"keypress":return t.which!==32?null:(su=!0,ru);case"textInput":return e=t.data,e===ru&&su?null:e;default:return null}}function tg(e,t){if(Qr)return e==="compositionend"||!ec&&pf(e,t)?(e=df(),Wa=Xl=dr=null,Qr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ff&&t.locale!=="ko"?null:t.data;default:return null}}var ng={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function au(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ng[e.type]:t==="textarea"}function mf(e,t,n,r){Kd(r),t=ci(t,"onChange"),0<t.length&&(n=new Gl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Bs=null,ta=null;function rg(e){Cf(e,0)}function _i(e){var t=Gr(e);if(Ad(t))return e}function sg(e,t){if(e==="change")return t}var gf=!1;if(er){var fo;if(er){var po="oninput"in document;if(!po){var iu=document.createElement("div");iu.setAttribute("oninput","return;"),po=typeof iu.oninput=="function"}fo=po}else fo=!1;gf=fo&&(!document.documentMode||9<document.documentMode)}function ou(){Bs&&(Bs.detachEvent("onpropertychange",xf),ta=Bs=null)}function xf(e){if(e.propertyName==="value"&&_i(ta)){var t=[];mf(t,ta,e,Wl(e)),Qd(rg,t)}}function ag(e,t,n){e==="focusin"?(ou(),Bs=t,ta=n,Bs.attachEvent("onpropertychange",xf)):e==="focusout"&&ou()}function ig(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return _i(ta)}function og(e,t){if(e==="click")return _i(t)}function lg(e,t){if(e==="input"||e==="change")return _i(t)}function cg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Rn=typeof Object.is=="function"?Object.is:cg;function na(e,t){if(Rn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Ro.call(t,s)||!Rn(e[s],t[s]))return!1}return!0}function lu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cu(e,t){var n=lu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=lu(n)}}function vf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?vf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function yf(){for(var e=window,t=ni();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ni(e.document)}return t}function tc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ug(e){var t=yf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&vf(n.ownerDocument.documentElement,n)){if(r!==null&&tc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,a=Math.min(r.start,s);r=r.end===void 0?a:Math.min(r.end,s),!e.extend&&a>r&&(s=r,r=a,a=s),s=cu(n,a);var o=cu(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var dg=er&&"documentMode"in document&&11>=document.documentMode,qr=null,el=null,Hs=null,tl=!1;function uu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;tl||qr==null||qr!==ni(r)||(r=qr,"selectionStart"in r&&tc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hs&&na(Hs,r)||(Hs=r,r=ci(el,"onSelect"),0<r.length&&(t=new Gl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=qr)))}function La(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Xr={animationend:La("Animation","AnimationEnd"),animationiteration:La("Animation","AnimationIteration"),animationstart:La("Animation","AnimationStart"),transitionend:La("Transition","TransitionEnd")},ho={},bf={};er&&(bf=document.createElement("div").style,"AnimationEvent"in window||(delete Xr.animationend.animation,delete Xr.animationiteration.animation,delete Xr.animationstart.animation),"TransitionEvent"in window||delete Xr.transitionend.transition);function Di(e){if(ho[e])return ho[e];if(!Xr[e])return e;var t=Xr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in bf)return ho[e]=t[n];return e}var wf=Di("animationend"),kf=Di("animationiteration"),jf=Di("animationstart"),Sf=Di("transitionend"),Nf=new Map,du="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Sr(e,t){Nf.set(e,t),Br(t,[e])}for(var mo=0;mo<du.length;mo++){var go=du[mo],fg=go.toLowerCase(),pg=go[0].toUpperCase()+go.slice(1);Sr(fg,"on"+pg)}Sr(wf,"onAnimationEnd");Sr(kf,"onAnimationIteration");Sr(jf,"onAnimationStart");Sr("dblclick","onDoubleClick");Sr("focusin","onFocus");Sr("focusout","onBlur");Sr(Sf,"onTransitionEnd");fs("onMouseEnter",["mouseout","mouseover"]);fs("onMouseLeave",["mouseout","mouseover"]);fs("onPointerEnter",["pointerout","pointerover"]);fs("onPointerLeave",["pointerout","pointerover"]);Br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Br("onBeforeInput",["compositionend","keypress","textInput","paste"]);Br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var As="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hg=new Set("cancel close invalid load scroll toggle".split(" ").concat(As));function fu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,fm(r,t,void 0,e),e.currentTarget=null}function Cf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var c=r[o],u=c.instance,f=c.currentTarget;if(c=c.listener,u!==a&&s.isPropagationStopped())break e;fu(s,c,f),a=u}else for(o=0;o<r.length;o++){if(c=r[o],u=c.instance,f=c.currentTarget,c=c.listener,u!==a&&s.isPropagationStopped())break e;fu(s,c,f),a=u}}}if(si)throw e=qo,si=!1,qo=null,e}function dt(e,t){var n=t[il];n===void 0&&(n=t[il]=new Set);var r=e+"__bubble";n.has(r)||(Ef(t,e,2,!1),n.add(r))}function xo(e,t,n){var r=0;t&&(r|=4),Ef(n,e,r,t)}var Ta="_reactListening"+Math.random().toString(36).slice(2);function ra(e){if(!e[Ta]){e[Ta]=!0,Td.forEach(function(n){n!=="selectionchange"&&(hg.has(n)||xo(n,!1,e),xo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ta]||(t[Ta]=!0,xo("selectionchange",!1,t))}}function Ef(e,t,n,r){switch(uf(t)){case 1:var s=zm;break;case 4:s=Pm;break;default:s=ql}n=s.bind(null,t,n,e),s=void 0,!Qo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function vo(e,t,n,r,s){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var c=r.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;c!==null;){if(o=Ir(c),o===null)return;if(u=o.tag,u===5||u===6){r=a=o;continue e}c=c.parentNode}}r=r.return}Qd(function(){var f=a,m=Wl(n),b=[];e:{var x=Nf.get(e);if(x!==void 0){var N=Gl,w=e;switch(e){case"keypress":if(Ya(n)===0)break e;case"keydown":case"keyup":N=Vm;break;case"focusin":w="focus",N=uo;break;case"focusout":w="blur",N=uo;break;case"beforeblur":case"afterblur":N=uo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=eu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Lm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Ym;break;case wf:case kf:case jf:N=Rm;break;case Sf:N=Qm;break;case"scroll":N=Mm;break;case"wheel":N=Xm;break;case"copy":case"cut":case"paste":N=Dm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=nu}var C=(t&4)!==0,L=!C&&e==="scroll",k=C?x!==null?x+"Capture":null:x;C=[];for(var v=f,z;v!==null;){z=v;var E=z.stateNode;if(z.tag===5&&E!==null&&(z=E,k!==null&&(E=Xs(v,k),E!=null&&C.push(sa(v,E,z)))),L)break;v=v.return}0<C.length&&(x=new N(x,w,null,n,m),b.push({event:x,listeners:C}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",x&&n!==Yo&&(w=n.relatedTarget||n.fromElement)&&(Ir(w)||w[tr]))break e;if((N||x)&&(x=m.window===m?m:(x=m.ownerDocument)?x.defaultView||x.parentWindow:window,N?(w=n.relatedTarget||n.toElement,N=f,w=w?Ir(w):null,w!==null&&(L=Hr(w),w!==L||w.tag!==5&&w.tag!==6)&&(w=null)):(N=null,w=f),N!==w)){if(C=eu,E="onMouseLeave",k="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(C=nu,E="onPointerLeave",k="onPointerEnter",v="pointer"),L=N==null?x:Gr(N),z=w==null?x:Gr(w),x=new C(E,v+"leave",N,n,m),x.target=L,x.relatedTarget=z,E=null,Ir(m)===f&&(C=new C(k,v+"enter",w,n,m),C.target=z,C.relatedTarget=L,E=C),L=E,N&&w)t:{for(C=N,k=w,v=0,z=C;z;z=Vr(z))v++;for(z=0,E=k;E;E=Vr(E))z++;for(;0<v-z;)C=Vr(C),v--;for(;0<z-v;)k=Vr(k),z--;for(;v--;){if(C===k||k!==null&&C===k.alternate)break t;C=Vr(C),k=Vr(k)}C=null}else C=null;N!==null&&pu(b,x,N,C,!1),w!==null&&L!==null&&pu(b,L,w,C,!0)}}e:{if(x=f?Gr(f):window,N=x.nodeName&&x.nodeName.toLowerCase(),N==="select"||N==="input"&&x.type==="file")var I=sg;else if(au(x))if(gf)I=lg;else{I=ig;var D=ag}else(N=x.nodeName)&&N.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(I=og);if(I&&(I=I(e,f))){mf(b,I,n,m);break e}D&&D(e,x,f),e==="focusout"&&(D=x._wrapperState)&&D.controlled&&x.type==="number"&&Bo(x,"number",x.value)}switch(D=f?Gr(f):window,e){case"focusin":(au(D)||D.contentEditable==="true")&&(qr=D,el=f,Hs=null);break;case"focusout":Hs=el=qr=null;break;case"mousedown":tl=!0;break;case"contextmenu":case"mouseup":case"dragend":tl=!1,uu(b,n,m);break;case"selectionchange":if(dg)break;case"keydown":case"keyup":uu(b,n,m)}var _;if(ec)e:{switch(e){case"compositionstart":var Q="onCompositionStart";break e;case"compositionend":Q="onCompositionEnd";break e;case"compositionupdate":Q="onCompositionUpdate";break e}Q=void 0}else Qr?pf(e,n)&&(Q="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Q="onCompositionStart");Q&&(ff&&n.locale!=="ko"&&(Qr||Q!=="onCompositionStart"?Q==="onCompositionEnd"&&Qr&&(_=df()):(dr=m,Xl="value"in dr?dr.value:dr.textContent,Qr=!0)),D=ci(f,Q),0<D.length&&(Q=new tu(Q,e,null,n,m),b.push({event:Q,listeners:D}),_?Q.data=_:(_=hf(n),_!==null&&(Q.data=_)))),(_=Zm?eg(e,n):tg(e,n))&&(f=ci(f,"onBeforeInput"),0<f.length&&(m=new tu("onBeforeInput","beforeinput",null,n,m),b.push({event:m,listeners:f}),m.data=_))}Cf(b,t)})}function sa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ci(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=Xs(e,n),a!=null&&r.unshift(sa(e,a,s)),a=Xs(e,t),a!=null&&r.push(sa(e,a,s))),e=e.return}return r}function Vr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function pu(e,t,n,r,s){for(var a=t._reactName,o=[];n!==null&&n!==r;){var c=n,u=c.alternate,f=c.stateNode;if(u!==null&&u===r)break;c.tag===5&&f!==null&&(c=f,s?(u=Xs(n,a),u!=null&&o.unshift(sa(n,u,c))):s||(u=Xs(n,a),u!=null&&o.push(sa(n,u,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var mg=/\r\n?/g,gg=/\u0000|\uFFFD/g;function hu(e){return(typeof e=="string"?e:""+e).replace(mg,`
`).replace(gg,"")}function Oa(e,t,n){if(t=hu(t),hu(e)!==t&&n)throw Error(J(425))}function ui(){}var nl=null,rl=null;function sl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var al=typeof setTimeout=="function"?setTimeout:void 0,xg=typeof clearTimeout=="function"?clearTimeout:void 0,mu=typeof Promise=="function"?Promise:void 0,vg=typeof queueMicrotask=="function"?queueMicrotask:typeof mu<"u"?function(e){return mu.resolve(null).then(e).catch(yg)}:al;function yg(e){setTimeout(function(){throw e})}function yo(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),ea(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ea(t)}function gr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function gu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ks=Math.random().toString(36).slice(2),Hn="__reactFiber$"+ks,aa="__reactProps$"+ks,tr="__reactContainer$"+ks,il="__reactEvents$"+ks,bg="__reactListeners$"+ks,wg="__reactHandles$"+ks;function Ir(e){var t=e[Hn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[tr]||n[Hn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gu(e);e!==null;){if(n=e[Hn])return n;e=gu(e)}return t}e=n,n=e.parentNode}return null}function ba(e){return e=e[Hn]||e[tr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Gr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(J(33))}function Ai(e){return e[aa]||null}var ol=[],Zr=-1;function Nr(e){return{current:e}}function ft(e){0>Zr||(e.current=ol[Zr],ol[Zr]=null,Zr--)}function it(e,t){Zr++,ol[Zr]=e.current,e.current=t}var kr={},Kt=Nr(kr),ln=Nr(!1),Dr=kr;function ps(e,t){var n=e.type.contextTypes;if(!n)return kr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in n)s[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function cn(e){return e=e.childContextTypes,e!=null}function di(){ft(ln),ft(Kt)}function xu(e,t,n){if(Kt.current!==kr)throw Error(J(168));it(Kt,t),it(ln,n)}function zf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(J(108,am(e)||"Unknown",s));return wt({},n,r)}function fi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||kr,Dr=Kt.current,it(Kt,e),it(ln,ln.current),!0}function vu(e,t,n){var r=e.stateNode;if(!r)throw Error(J(169));n?(e=zf(e,t,Dr),r.__reactInternalMemoizedMergedChildContext=e,ft(ln),ft(Kt),it(Kt,e)):ft(ln),it(ln,n)}var qn=null,Ui=!1,bo=!1;function Pf(e){qn===null?qn=[e]:qn.push(e)}function kg(e){Ui=!0,Pf(e)}function Cr(){if(!bo&&qn!==null){bo=!0;var e=0,t=nt;try{var n=qn;for(nt=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}qn=null,Ui=!1}catch(s){throw qn!==null&&(qn=qn.slice(e+1)),Zd(Yl,Cr),s}finally{nt=t,bo=!1}}return null}var es=[],ts=0,pi=null,hi=0,yn=[],bn=0,Ar=null,Xn=1,Gn="";function Pr(e,t){es[ts++]=hi,es[ts++]=pi,pi=e,hi=t}function Mf(e,t,n){yn[bn++]=Xn,yn[bn++]=Gn,yn[bn++]=Ar,Ar=e;var r=Xn;e=Gn;var s=32-Tn(r)-1;r&=~(1<<s),n+=1;var a=32-Tn(t)+s;if(30<a){var o=s-s%5;a=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Xn=1<<32-Tn(t)+s|n<<s|r,Gn=a+e}else Xn=1<<a|n<<s|r,Gn=e}function nc(e){e.return!==null&&(Pr(e,1),Mf(e,1,0))}function rc(e){for(;e===pi;)pi=es[--ts],es[ts]=null,hi=es[--ts],es[ts]=null;for(;e===Ar;)Ar=yn[--bn],yn[bn]=null,Gn=yn[--bn],yn[bn]=null,Xn=yn[--bn],yn[bn]=null}var pn=null,fn=null,gt=!1,Ln=null;function If(e,t){var n=wn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function yu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,pn=e,fn=gr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,pn=e,fn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ar!==null?{id:Xn,overflow:Gn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=wn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,pn=e,fn=null,!0):!1;default:return!1}}function ll(e){return(e.mode&1)!==0&&(e.flags&128)===0}function cl(e){if(gt){var t=fn;if(t){var n=t;if(!yu(e,t)){if(ll(e))throw Error(J(418));t=gr(n.nextSibling);var r=pn;t&&yu(e,t)?If(r,n):(e.flags=e.flags&-4097|2,gt=!1,pn=e)}}else{if(ll(e))throw Error(J(418));e.flags=e.flags&-4097|2,gt=!1,pn=e}}}function bu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;pn=e}function Ra(e){if(e!==pn)return!1;if(!gt)return bu(e),gt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!sl(e.type,e.memoizedProps)),t&&(t=fn)){if(ll(e))throw Lf(),Error(J(418));for(;t;)If(e,t),t=gr(t.nextSibling)}if(bu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){fn=gr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}fn=null}}else fn=pn?gr(e.stateNode.nextSibling):null;return!0}function Lf(){for(var e=fn;e;)e=gr(e.nextSibling)}function hs(){fn=pn=null,gt=!1}function sc(e){Ln===null?Ln=[e]:Ln.push(e)}var jg=sr.ReactCurrentBatchConfig;function Ps(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(J(309));var r=n.stateNode}if(!r)throw Error(J(147,e));var s=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var c=s.refs;o===null?delete c[a]:c[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(J(284));if(!n._owner)throw Error(J(290,e))}return e}function _a(e,t){throw e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function wu(e){var t=e._init;return t(e._payload)}function Tf(e){function t(k,v){if(e){var z=k.deletions;z===null?(k.deletions=[v],k.flags|=16):z.push(v)}}function n(k,v){if(!e)return null;for(;v!==null;)t(k,v),v=v.sibling;return null}function r(k,v){for(k=new Map;v!==null;)v.key!==null?k.set(v.key,v):k.set(v.index,v),v=v.sibling;return k}function s(k,v){return k=br(k,v),k.index=0,k.sibling=null,k}function a(k,v,z){return k.index=z,e?(z=k.alternate,z!==null?(z=z.index,z<v?(k.flags|=2,v):z):(k.flags|=2,v)):(k.flags|=1048576,v)}function o(k){return e&&k.alternate===null&&(k.flags|=2),k}function c(k,v,z,E){return v===null||v.tag!==6?(v=Eo(z,k.mode,E),v.return=k,v):(v=s(v,z),v.return=k,v)}function u(k,v,z,E){var I=z.type;return I===Jr?m(k,v,z.props.children,E,z.key):v!==null&&(v.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===or&&wu(I)===v.type)?(E=s(v,z.props),E.ref=Ps(k,v,z),E.return=k,E):(E=ei(z.type,z.key,z.props,null,k.mode,E),E.ref=Ps(k,v,z),E.return=k,E)}function f(k,v,z,E){return v===null||v.tag!==4||v.stateNode.containerInfo!==z.containerInfo||v.stateNode.implementation!==z.implementation?(v=zo(z,k.mode,E),v.return=k,v):(v=s(v,z.children||[]),v.return=k,v)}function m(k,v,z,E,I){return v===null||v.tag!==7?(v=Rr(z,k.mode,E,I),v.return=k,v):(v=s(v,z),v.return=k,v)}function b(k,v,z){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Eo(""+v,k.mode,z),v.return=k,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Na:return z=ei(v.type,v.key,v.props,null,k.mode,z),z.ref=Ps(k,null,v),z.return=k,z;case Yr:return v=zo(v,k.mode,z),v.return=k,v;case or:var E=v._init;return b(k,E(v._payload),z)}if(_s(v)||Ss(v))return v=Rr(v,k.mode,z,null),v.return=k,v;_a(k,v)}return null}function x(k,v,z,E){var I=v!==null?v.key:null;if(typeof z=="string"&&z!==""||typeof z=="number")return I!==null?null:c(k,v,""+z,E);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case Na:return z.key===I?u(k,v,z,E):null;case Yr:return z.key===I?f(k,v,z,E):null;case or:return I=z._init,x(k,v,I(z._payload),E)}if(_s(z)||Ss(z))return I!==null?null:m(k,v,z,E,null);_a(k,z)}return null}function N(k,v,z,E,I){if(typeof E=="string"&&E!==""||typeof E=="number")return k=k.get(z)||null,c(v,k,""+E,I);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Na:return k=k.get(E.key===null?z:E.key)||null,u(v,k,E,I);case Yr:return k=k.get(E.key===null?z:E.key)||null,f(v,k,E,I);case or:var D=E._init;return N(k,v,z,D(E._payload),I)}if(_s(E)||Ss(E))return k=k.get(z)||null,m(v,k,E,I,null);_a(v,E)}return null}function w(k,v,z,E){for(var I=null,D=null,_=v,Q=v=0,Ae=null;_!==null&&Q<z.length;Q++){_.index>Q?(Ae=_,_=null):Ae=_.sibling;var pe=x(k,_,z[Q],E);if(pe===null){_===null&&(_=Ae);break}e&&_&&pe.alternate===null&&t(k,_),v=a(pe,v,Q),D===null?I=pe:D.sibling=pe,D=pe,_=Ae}if(Q===z.length)return n(k,_),gt&&Pr(k,Q),I;if(_===null){for(;Q<z.length;Q++)_=b(k,z[Q],E),_!==null&&(v=a(_,v,Q),D===null?I=_:D.sibling=_,D=_);return gt&&Pr(k,Q),I}for(_=r(k,_);Q<z.length;Q++)Ae=N(_,k,Q,z[Q],E),Ae!==null&&(e&&Ae.alternate!==null&&_.delete(Ae.key===null?Q:Ae.key),v=a(Ae,v,Q),D===null?I=Ae:D.sibling=Ae,D=Ae);return e&&_.forEach(function(Ke){return t(k,Ke)}),gt&&Pr(k,Q),I}function C(k,v,z,E){var I=Ss(z);if(typeof I!="function")throw Error(J(150));if(z=I.call(z),z==null)throw Error(J(151));for(var D=I=null,_=v,Q=v=0,Ae=null,pe=z.next();_!==null&&!pe.done;Q++,pe=z.next()){_.index>Q?(Ae=_,_=null):Ae=_.sibling;var Ke=x(k,_,pe.value,E);if(Ke===null){_===null&&(_=Ae);break}e&&_&&Ke.alternate===null&&t(k,_),v=a(Ke,v,Q),D===null?I=Ke:D.sibling=Ke,D=Ke,_=Ae}if(pe.done)return n(k,_),gt&&Pr(k,Q),I;if(_===null){for(;!pe.done;Q++,pe=z.next())pe=b(k,pe.value,E),pe!==null&&(v=a(pe,v,Q),D===null?I=pe:D.sibling=pe,D=pe);return gt&&Pr(k,Q),I}for(_=r(k,_);!pe.done;Q++,pe=z.next())pe=N(_,k,Q,pe.value,E),pe!==null&&(e&&pe.alternate!==null&&_.delete(pe.key===null?Q:pe.key),v=a(pe,v,Q),D===null?I=pe:D.sibling=pe,D=pe);return e&&_.forEach(function(pt){return t(k,pt)}),gt&&Pr(k,Q),I}function L(k,v,z,E){if(typeof z=="object"&&z!==null&&z.type===Jr&&z.key===null&&(z=z.props.children),typeof z=="object"&&z!==null){switch(z.$$typeof){case Na:e:{for(var I=z.key,D=v;D!==null;){if(D.key===I){if(I=z.type,I===Jr){if(D.tag===7){n(k,D.sibling),v=s(D,z.props.children),v.return=k,k=v;break e}}else if(D.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===or&&wu(I)===D.type){n(k,D.sibling),v=s(D,z.props),v.ref=Ps(k,D,z),v.return=k,k=v;break e}n(k,D);break}else t(k,D);D=D.sibling}z.type===Jr?(v=Rr(z.props.children,k.mode,E,z.key),v.return=k,k=v):(E=ei(z.type,z.key,z.props,null,k.mode,E),E.ref=Ps(k,v,z),E.return=k,k=E)}return o(k);case Yr:e:{for(D=z.key;v!==null;){if(v.key===D)if(v.tag===4&&v.stateNode.containerInfo===z.containerInfo&&v.stateNode.implementation===z.implementation){n(k,v.sibling),v=s(v,z.children||[]),v.return=k,k=v;break e}else{n(k,v);break}else t(k,v);v=v.sibling}v=zo(z,k.mode,E),v.return=k,k=v}return o(k);case or:return D=z._init,L(k,v,D(z._payload),E)}if(_s(z))return w(k,v,z,E);if(Ss(z))return C(k,v,z,E);_a(k,z)}return typeof z=="string"&&z!==""||typeof z=="number"?(z=""+z,v!==null&&v.tag===6?(n(k,v.sibling),v=s(v,z),v.return=k,k=v):(n(k,v),v=Eo(z,k.mode,E),v.return=k,k=v),o(k)):n(k,v)}return L}var ms=Tf(!0),Of=Tf(!1),mi=Nr(null),gi=null,ns=null,ac=null;function ic(){ac=ns=gi=null}function oc(e){var t=mi.current;ft(mi),e._currentValue=t}function ul(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function cs(e,t){gi=e,ac=ns=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(on=!0),e.firstContext=null)}function jn(e){var t=e._currentValue;if(ac!==e)if(e={context:e,memoizedValue:t,next:null},ns===null){if(gi===null)throw Error(J(308));ns=e,gi.dependencies={lanes:0,firstContext:e}}else ns=ns.next=e;return t}var Lr=null;function lc(e){Lr===null?Lr=[e]:Lr.push(e)}function Rf(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,lc(t)):(n.next=s.next,s.next=n),t.interleaved=n,nr(e,r)}function nr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var lr=!1;function cc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function _f(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Zn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function xr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ye&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,nr(e,n)}return s=r.interleaved,s===null?(t.next=t,lc(r)):(t.next=s.next,s.next=t),r.interleaved=t,nr(e,n)}function Ja(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Jl(e,n)}}function ku(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?s=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xi(e,t,n,r){var s=e.updateQueue;lr=!1;var a=s.firstBaseUpdate,o=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var u=c,f=u.next;u.next=null,o===null?a=f:o.next=f,o=u;var m=e.alternate;m!==null&&(m=m.updateQueue,c=m.lastBaseUpdate,c!==o&&(c===null?m.firstBaseUpdate=f:c.next=f,m.lastBaseUpdate=u))}if(a!==null){var b=s.baseState;o=0,m=f=u=null,c=a;do{var x=c.lane,N=c.eventTime;if((r&x)===x){m!==null&&(m=m.next={eventTime:N,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var w=e,C=c;switch(x=t,N=n,C.tag){case 1:if(w=C.payload,typeof w=="function"){b=w.call(N,b,x);break e}b=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=C.payload,x=typeof w=="function"?w.call(N,b,x):w,x==null)break e;b=wt({},b,x);break e;case 2:lr=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,x=s.effects,x===null?s.effects=[c]:x.push(c))}else N={eventTime:N,lane:x,tag:c.tag,payload:c.payload,callback:c.callback,next:null},m===null?(f=m=N,u=b):m=m.next=N,o|=x;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;x=c,c=x.next,x.next=null,s.lastBaseUpdate=x,s.shared.pending=null}}while(!0);if(m===null&&(u=b),s.baseState=u,s.firstBaseUpdate=f,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else a===null&&(s.shared.lanes=0);Fr|=o,e.lanes=o,e.memoizedState=b}}function ju(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(J(191,s));s.call(r)}}}var wa={},Wn=Nr(wa),ia=Nr(wa),oa=Nr(wa);function Tr(e){if(e===wa)throw Error(J(174));return e}function uc(e,t){switch(it(oa,t),it(ia,e),it(Wn,wa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Vo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Vo(t,e)}ft(Wn),it(Wn,t)}function gs(){ft(Wn),ft(ia),ft(oa)}function Df(e){Tr(oa.current);var t=Tr(Wn.current),n=Vo(t,e.type);t!==n&&(it(ia,e),it(Wn,n))}function dc(e){ia.current===e&&(ft(Wn),ft(ia))}var yt=Nr(0);function vi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wo=[];function fc(){for(var e=0;e<wo.length;e++)wo[e]._workInProgressVersionPrimary=null;wo.length=0}var Qa=sr.ReactCurrentDispatcher,ko=sr.ReactCurrentBatchConfig,Ur=0,bt=null,It=null,_t=null,yi=!1,Vs=!1,la=0,Sg=0;function Bt(){throw Error(J(321))}function pc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Rn(e[n],t[n]))return!1;return!0}function hc(e,t,n,r,s,a){if(Ur=a,bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Qa.current=e===null||e.memoizedState===null?zg:Pg,e=n(r,s),Vs){a=0;do{if(Vs=!1,la=0,25<=a)throw Error(J(301));a+=1,_t=It=null,t.updateQueue=null,Qa.current=Mg,e=n(r,s)}while(Vs)}if(Qa.current=bi,t=It!==null&&It.next!==null,Ur=0,_t=It=bt=null,yi=!1,t)throw Error(J(300));return e}function mc(){var e=la!==0;return la=0,e}function Bn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?bt.memoizedState=_t=e:_t=_t.next=e,_t}function Sn(){if(It===null){var e=bt.alternate;e=e!==null?e.memoizedState:null}else e=It.next;var t=_t===null?bt.memoizedState:_t.next;if(t!==null)_t=t,It=e;else{if(e===null)throw Error(J(310));It=e,e={memoizedState:It.memoizedState,baseState:It.baseState,baseQueue:It.baseQueue,queue:It.queue,next:null},_t===null?bt.memoizedState=_t=e:_t=_t.next=e}return _t}function ca(e,t){return typeof t=="function"?t(e):t}function jo(e){var t=Sn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=It,s=r.baseQueue,a=n.pending;if(a!==null){if(s!==null){var o=s.next;s.next=a.next,a.next=o}r.baseQueue=s=a,n.pending=null}if(s!==null){a=s.next,r=r.baseState;var c=o=null,u=null,f=a;do{var m=f.lane;if((Ur&m)===m)u!==null&&(u=u.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var b={lane:m,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};u===null?(c=u=b,o=r):u=u.next=b,bt.lanes|=m,Fr|=m}f=f.next}while(f!==null&&f!==a);u===null?o=r:u.next=c,Rn(r,t.memoizedState)||(on=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do a=s.lane,bt.lanes|=a,Fr|=a,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function So(e){var t=Sn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do a=e(a,o.action),o=o.next;while(o!==s);Rn(a,t.memoizedState)||(on=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Af(){}function Uf(e,t){var n=bt,r=Sn(),s=t(),a=!Rn(r.memoizedState,s);if(a&&(r.memoizedState=s,on=!0),r=r.queue,gc(Bf.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||_t!==null&&_t.memoizedState.tag&1){if(n.flags|=2048,ua(9,$f.bind(null,n,r,s,t),void 0,null),Dt===null)throw Error(J(349));Ur&30||Ff(n,t,s)}return s}function Ff(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function $f(e,t,n,r){t.value=n,t.getSnapshot=r,Hf(t)&&Vf(e)}function Bf(e,t,n){return n(function(){Hf(t)&&Vf(e)})}function Hf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Rn(e,n)}catch{return!0}}function Vf(e){var t=nr(e,1);t!==null&&On(t,e,1,-1)}function Su(e){var t=Bn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},t.queue=e,e=e.dispatch=Eg.bind(null,bt,e),[t.memoizedState,e]}function ua(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Kf(){return Sn().memoizedState}function qa(e,t,n,r){var s=Bn();bt.flags|=e,s.memoizedState=ua(1|t,n,void 0,r===void 0?null:r)}function Fi(e,t,n,r){var s=Sn();r=r===void 0?null:r;var a=void 0;if(It!==null){var o=It.memoizedState;if(a=o.destroy,r!==null&&pc(r,o.deps)){s.memoizedState=ua(t,n,a,r);return}}bt.flags|=e,s.memoizedState=ua(1|t,n,a,r)}function Nu(e,t){return qa(8390656,8,e,t)}function gc(e,t){return Fi(2048,8,e,t)}function Wf(e,t){return Fi(4,2,e,t)}function Yf(e,t){return Fi(4,4,e,t)}function Jf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Qf(e,t,n){return n=n!=null?n.concat([e]):null,Fi(4,4,Jf.bind(null,t,e),n)}function xc(){}function qf(e,t){var n=Sn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&pc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Xf(e,t){var n=Sn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&pc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Gf(e,t,n){return Ur&21?(Rn(n,t)||(n=nf(),bt.lanes|=n,Fr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,on=!0),e.memoizedState=n)}function Ng(e,t){var n=nt;nt=n!==0&&4>n?n:4,e(!0);var r=ko.transition;ko.transition={};try{e(!1),t()}finally{nt=n,ko.transition=r}}function Zf(){return Sn().memoizedState}function Cg(e,t,n){var r=yr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ep(e))tp(t,n);else if(n=Rf(e,t,n,r),n!==null){var s=Xt();On(n,e,r,s),np(n,t,r)}}function Eg(e,t,n){var r=yr(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ep(e))tp(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,c=a(o,n);if(s.hasEagerState=!0,s.eagerState=c,Rn(c,o)){var u=t.interleaved;u===null?(s.next=s,lc(t)):(s.next=u.next,u.next=s),t.interleaved=s;return}}catch{}finally{}n=Rf(e,t,s,r),n!==null&&(s=Xt(),On(n,e,r,s),np(n,t,r))}}function ep(e){var t=e.alternate;return e===bt||t!==null&&t===bt}function tp(e,t){Vs=yi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function np(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Jl(e,n)}}var bi={readContext:jn,useCallback:Bt,useContext:Bt,useEffect:Bt,useImperativeHandle:Bt,useInsertionEffect:Bt,useLayoutEffect:Bt,useMemo:Bt,useReducer:Bt,useRef:Bt,useState:Bt,useDebugValue:Bt,useDeferredValue:Bt,useTransition:Bt,useMutableSource:Bt,useSyncExternalStore:Bt,useId:Bt,unstable_isNewReconciler:!1},zg={readContext:jn,useCallback:function(e,t){return Bn().memoizedState=[e,t===void 0?null:t],e},useContext:jn,useEffect:Nu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,qa(4194308,4,Jf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return qa(4194308,4,e,t)},useInsertionEffect:function(e,t){return qa(4,2,e,t)},useMemo:function(e,t){var n=Bn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Bn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Cg.bind(null,bt,e),[r.memoizedState,e]},useRef:function(e){var t=Bn();return e={current:e},t.memoizedState=e},useState:Su,useDebugValue:xc,useDeferredValue:function(e){return Bn().memoizedState=e},useTransition:function(){var e=Su(!1),t=e[0];return e=Ng.bind(null,e[1]),Bn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=bt,s=Bn();if(gt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),Dt===null)throw Error(J(349));Ur&30||Ff(r,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Nu(Bf.bind(null,r,a,e),[e]),r.flags|=2048,ua(9,$f.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Bn(),t=Dt.identifierPrefix;if(gt){var n=Gn,r=Xn;n=(r&~(1<<32-Tn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=la++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Sg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Pg={readContext:jn,useCallback:qf,useContext:jn,useEffect:gc,useImperativeHandle:Qf,useInsertionEffect:Wf,useLayoutEffect:Yf,useMemo:Xf,useReducer:jo,useRef:Kf,useState:function(){return jo(ca)},useDebugValue:xc,useDeferredValue:function(e){var t=Sn();return Gf(t,It.memoizedState,e)},useTransition:function(){var e=jo(ca)[0],t=Sn().memoizedState;return[e,t]},useMutableSource:Af,useSyncExternalStore:Uf,useId:Zf,unstable_isNewReconciler:!1},Mg={readContext:jn,useCallback:qf,useContext:jn,useEffect:gc,useImperativeHandle:Qf,useInsertionEffect:Wf,useLayoutEffect:Yf,useMemo:Xf,useReducer:So,useRef:Kf,useState:function(){return So(ca)},useDebugValue:xc,useDeferredValue:function(e){var t=Sn();return It===null?t.memoizedState=e:Gf(t,It.memoizedState,e)},useTransition:function(){var e=So(ca)[0],t=Sn().memoizedState;return[e,t]},useMutableSource:Af,useSyncExternalStore:Uf,useId:Zf,unstable_isNewReconciler:!1};function Mn(e,t){if(e&&e.defaultProps){t=wt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function dl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:wt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var $i={isMounted:function(e){return(e=e._reactInternals)?Hr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Xt(),s=yr(e),a=Zn(r,s);a.payload=t,n!=null&&(a.callback=n),t=xr(e,a,s),t!==null&&(On(t,e,s,r),Ja(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Xt(),s=yr(e),a=Zn(r,s);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=xr(e,a,s),t!==null&&(On(t,e,s,r),Ja(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Xt(),r=yr(e),s=Zn(n,r);s.tag=2,t!=null&&(s.callback=t),t=xr(e,s,r),t!==null&&(On(t,e,r,n),Ja(t,e,r))}};function Cu(e,t,n,r,s,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!na(n,r)||!na(s,a):!0}function rp(e,t,n){var r=!1,s=kr,a=t.contextType;return typeof a=="object"&&a!==null?a=jn(a):(s=cn(t)?Dr:Kt.current,r=t.contextTypes,a=(r=r!=null)?ps(e,s):kr),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=$i,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),t}function Eu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&$i.enqueueReplaceState(t,t.state,null)}function fl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},cc(e);var a=t.contextType;typeof a=="object"&&a!==null?s.context=jn(a):(a=cn(t)?Dr:Kt.current,s.context=ps(e,a)),s.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(dl(e,t,a,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&$i.enqueueReplaceState(s,s.state,null),xi(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function xs(e,t){try{var n="",r=t;do n+=sm(r),r=r.return;while(r);var s=n}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:s,digest:null}}function No(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function pl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ig=typeof WeakMap=="function"?WeakMap:Map;function sp(e,t,n){n=Zn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ki||(ki=!0,jl=r),pl(e,t)},n}function ap(e,t,n){n=Zn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){pl(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){pl(e,t),typeof r!="function"&&(vr===null?vr=new Set([this]):vr.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function zu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ig;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Kg.bind(null,e,t,n),t.then(e,e))}function Pu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Mu(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Zn(-1,1),t.tag=2,xr(n,t,1))),n.lanes|=1),e)}var Lg=sr.ReactCurrentOwner,on=!1;function qt(e,t,n,r){t.child=e===null?Of(t,null,n,r):ms(t,e.child,n,r)}function Iu(e,t,n,r,s){n=n.render;var a=t.ref;return cs(t,s),r=hc(e,t,n,r,a,s),n=mc(),e!==null&&!on?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,rr(e,t,s)):(gt&&n&&nc(t),t.flags|=1,qt(e,t,r,s),t.child)}function Lu(e,t,n,r,s){if(e===null){var a=n.type;return typeof a=="function"&&!Nc(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,ip(e,t,a,r,s)):(e=ei(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&s)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:na,n(o,r)&&e.ref===t.ref)return rr(e,t,s)}return t.flags|=1,e=br(a,r),e.ref=t.ref,e.return=t,t.child=e}function ip(e,t,n,r,s){if(e!==null){var a=e.memoizedProps;if(na(a,r)&&e.ref===t.ref)if(on=!1,t.pendingProps=r=a,(e.lanes&s)!==0)e.flags&131072&&(on=!0);else return t.lanes=e.lanes,rr(e,t,s)}return hl(e,t,n,r,s)}function op(e,t,n){var r=t.pendingProps,s=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},it(ss,dn),dn|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,it(ss,dn),dn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,it(ss,dn),dn|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,it(ss,dn),dn|=r;return qt(e,t,s,n),t.child}function lp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function hl(e,t,n,r,s){var a=cn(n)?Dr:Kt.current;return a=ps(t,a),cs(t,s),n=hc(e,t,n,r,a,s),r=mc(),e!==null&&!on?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,rr(e,t,s)):(gt&&r&&nc(t),t.flags|=1,qt(e,t,n,s),t.child)}function Tu(e,t,n,r,s){if(cn(n)){var a=!0;fi(t)}else a=!1;if(cs(t,s),t.stateNode===null)Xa(e,t),rp(t,n,r),fl(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,c=t.memoizedProps;o.props=c;var u=o.context,f=n.contextType;typeof f=="object"&&f!==null?f=jn(f):(f=cn(n)?Dr:Kt.current,f=ps(t,f));var m=n.getDerivedStateFromProps,b=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";b||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==r||u!==f)&&Eu(t,o,r,f),lr=!1;var x=t.memoizedState;o.state=x,xi(t,r,o,s),u=t.memoizedState,c!==r||x!==u||ln.current||lr?(typeof m=="function"&&(dl(t,n,m,r),u=t.memoizedState),(c=lr||Cu(t,n,c,r,x,u,f))?(b||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),o.props=r,o.state=u,o.context=f,r=c):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,_f(e,t),c=t.memoizedProps,f=t.type===t.elementType?c:Mn(t.type,c),o.props=f,b=t.pendingProps,x=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=jn(u):(u=cn(n)?Dr:Kt.current,u=ps(t,u));var N=n.getDerivedStateFromProps;(m=typeof N=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(c!==b||x!==u)&&Eu(t,o,r,u),lr=!1,x=t.memoizedState,o.state=x,xi(t,r,o,s);var w=t.memoizedState;c!==b||x!==w||ln.current||lr?(typeof N=="function"&&(dl(t,n,N,r),w=t.memoizedState),(f=lr||Cu(t,n,f,r,x,w,u)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=u,r=f):(typeof o.componentDidUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),r=!1)}return ml(e,t,n,r,a,s)}function ml(e,t,n,r,s,a){lp(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&vu(t,n,!1),rr(e,t,a);r=t.stateNode,Lg.current=t;var c=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=ms(t,e.child,null,a),t.child=ms(t,null,c,a)):qt(e,t,c,a),t.memoizedState=r.state,s&&vu(t,n,!0),t.child}function cp(e){var t=e.stateNode;t.pendingContext?xu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&xu(e,t.context,!1),uc(e,t.containerInfo)}function Ou(e,t,n,r,s){return hs(),sc(s),t.flags|=256,qt(e,t,n,r),t.child}var gl={dehydrated:null,treeContext:null,retryLane:0};function xl(e){return{baseLanes:e,cachePool:null,transitions:null}}function up(e,t,n){var r=t.pendingProps,s=yt.current,a=!1,o=(t.flags&128)!==0,c;if((c=o)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),it(yt,s&1),e===null)return cl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Vi(o,r,0,null),e=Rr(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=xl(n),t.memoizedState=gl,e):vc(t,o));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Tg(e,t,o,r,c,s,n);if(a){a=r.fallback,o=t.mode,s=e.child,c=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=br(s,u),r.subtreeFlags=s.subtreeFlags&14680064),c!==null?a=br(c,a):(a=Rr(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?xl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=gl,r}return a=e.child,e=a.sibling,r=br(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function vc(e,t){return t=Vi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Da(e,t,n,r){return r!==null&&sc(r),ms(t,e.child,null,n),e=vc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Tg(e,t,n,r,s,a,o){if(n)return t.flags&256?(t.flags&=-257,r=No(Error(J(422))),Da(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,s=t.mode,r=Vi({mode:"visible",children:r.children},s,0,null),a=Rr(a,s,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&ms(t,e.child,null,o),t.child.memoizedState=xl(o),t.memoizedState=gl,a);if(!(t.mode&1))return Da(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var c=r.dgst;return r=c,a=Error(J(419)),r=No(a,r,void 0),Da(e,t,o,r)}if(c=(o&e.childLanes)!==0,on||c){if(r=Dt,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,nr(e,s),On(r,e,s,-1))}return Sc(),r=No(Error(J(421))),Da(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Wg.bind(null,e),s._reactRetry=t,null):(e=a.treeContext,fn=gr(s.nextSibling),pn=t,gt=!0,Ln=null,e!==null&&(yn[bn++]=Xn,yn[bn++]=Gn,yn[bn++]=Ar,Xn=e.id,Gn=e.overflow,Ar=t),t=vc(t,r.children),t.flags|=4096,t)}function Ru(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ul(e.return,t,n)}function Co(e,t,n,r,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=s)}function dp(e,t,n){var r=t.pendingProps,s=r.revealOrder,a=r.tail;if(qt(e,t,r.children,n),r=yt.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ru(e,n,t);else if(e.tag===19)Ru(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(it(yt,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&vi(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Co(t,!1,s,n,a);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&vi(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Co(t,!0,n,null,a);break;case"together":Co(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Xa(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function rr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Fr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=br(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=br(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Og(e,t,n){switch(t.tag){case 3:cp(t),hs();break;case 5:Df(t);break;case 1:cn(t.type)&&fi(t);break;case 4:uc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;it(mi,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(it(yt,yt.current&1),t.flags|=128,null):n&t.child.childLanes?up(e,t,n):(it(yt,yt.current&1),e=rr(e,t,n),e!==null?e.sibling:null);it(yt,yt.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return dp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),it(yt,yt.current),r)break;return null;case 22:case 23:return t.lanes=0,op(e,t,n)}return rr(e,t,n)}var fp,vl,pp,hp;fp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vl=function(){};pp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Tr(Wn.current);var a=null;switch(n){case"input":s=Fo(e,s),r=Fo(e,r),a=[];break;case"select":s=wt({},s,{value:void 0}),r=wt({},r,{value:void 0}),a=[];break;case"textarea":s=Ho(e,s),r=Ho(e,r),a=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ui)}Ko(n,r);var o;n=null;for(f in s)if(!r.hasOwnProperty(f)&&s.hasOwnProperty(f)&&s[f]!=null)if(f==="style"){var c=s[f];for(o in c)c.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(Qs.hasOwnProperty(f)?a||(a=[]):(a=a||[]).push(f,null));for(f in r){var u=r[f];if(c=s!=null?s[f]:void 0,r.hasOwnProperty(f)&&u!==c&&(u!=null||c!=null))if(f==="style")if(c){for(o in c)!c.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&c[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(a||(a=[]),a.push(f,n)),n=u;else f==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,c=c?c.__html:void 0,u!=null&&c!==u&&(a=a||[]).push(f,u)):f==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(f,""+u):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(Qs.hasOwnProperty(f)?(u!=null&&f==="onScroll"&&dt("scroll",e),a||c===u||(a=[])):(a=a||[]).push(f,u))}n&&(a=a||[]).push("style",n);var f=a;(t.updateQueue=f)&&(t.flags|=4)}};hp=function(e,t,n,r){n!==r&&(t.flags|=4)};function Ms(e,t){if(!gt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ht(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Rg(e,t,n){var r=t.pendingProps;switch(rc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ht(t),null;case 1:return cn(t.type)&&di(),Ht(t),null;case 3:return r=t.stateNode,gs(),ft(ln),ft(Kt),fc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ra(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ln!==null&&(Cl(Ln),Ln=null))),vl(e,t),Ht(t),null;case 5:dc(t);var s=Tr(oa.current);if(n=t.type,e!==null&&t.stateNode!=null)pp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(J(166));return Ht(t),null}if(e=Tr(Wn.current),Ra(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Hn]=t,r[aa]=a,e=(t.mode&1)!==0,n){case"dialog":dt("cancel",r),dt("close",r);break;case"iframe":case"object":case"embed":dt("load",r);break;case"video":case"audio":for(s=0;s<As.length;s++)dt(As[s],r);break;case"source":dt("error",r);break;case"img":case"image":case"link":dt("error",r),dt("load",r);break;case"details":dt("toggle",r);break;case"input":Vc(r,a),dt("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},dt("invalid",r);break;case"textarea":Wc(r,a),dt("invalid",r)}Ko(n,a),s=null;for(var o in a)if(a.hasOwnProperty(o)){var c=a[o];o==="children"?typeof c=="string"?r.textContent!==c&&(a.suppressHydrationWarning!==!0&&Oa(r.textContent,c,e),s=["children",c]):typeof c=="number"&&r.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Oa(r.textContent,c,e),s=["children",""+c]):Qs.hasOwnProperty(o)&&c!=null&&o==="onScroll"&&dt("scroll",r)}switch(n){case"input":Ca(r),Kc(r,a,!0);break;case"textarea":Ca(r),Yc(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=ui)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=$d(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Hn]=t,e[aa]=r,fp(e,t,!1,!1),t.stateNode=e;e:{switch(o=Wo(n,r),n){case"dialog":dt("cancel",e),dt("close",e),s=r;break;case"iframe":case"object":case"embed":dt("load",e),s=r;break;case"video":case"audio":for(s=0;s<As.length;s++)dt(As[s],e);s=r;break;case"source":dt("error",e),s=r;break;case"img":case"image":case"link":dt("error",e),dt("load",e),s=r;break;case"details":dt("toggle",e),s=r;break;case"input":Vc(e,r),s=Fo(e,r),dt("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=wt({},r,{value:void 0}),dt("invalid",e);break;case"textarea":Wc(e,r),s=Ho(e,r),dt("invalid",e);break;default:s=r}Ko(n,s),c=s;for(a in c)if(c.hasOwnProperty(a)){var u=c[a];a==="style"?Vd(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Bd(e,u)):a==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&qs(e,u):typeof u=="number"&&qs(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Qs.hasOwnProperty(a)?u!=null&&a==="onScroll"&&dt("scroll",e):u!=null&&Bl(e,a,u,o))}switch(n){case"input":Ca(e),Kc(e,r,!1);break;case"textarea":Ca(e),Yc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+wr(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?as(e,!!r.multiple,a,!1):r.defaultValue!=null&&as(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ui)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ht(t),null;case 6:if(e&&t.stateNode!=null)hp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(J(166));if(n=Tr(oa.current),Tr(Wn.current),Ra(t)){if(r=t.stateNode,n=t.memoizedProps,r[Hn]=t,(a=r.nodeValue!==n)&&(e=pn,e!==null))switch(e.tag){case 3:Oa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Oa(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Hn]=t,t.stateNode=r}return Ht(t),null;case 13:if(ft(yt),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(gt&&fn!==null&&t.mode&1&&!(t.flags&128))Lf(),hs(),t.flags|=98560,a=!1;else if(a=Ra(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(J(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(J(317));a[Hn]=t}else hs(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ht(t),a=!1}else Ln!==null&&(Cl(Ln),Ln=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||yt.current&1?Lt===0&&(Lt=3):Sc())),t.updateQueue!==null&&(t.flags|=4),Ht(t),null);case 4:return gs(),vl(e,t),e===null&&ra(t.stateNode.containerInfo),Ht(t),null;case 10:return oc(t.type._context),Ht(t),null;case 17:return cn(t.type)&&di(),Ht(t),null;case 19:if(ft(yt),a=t.memoizedState,a===null)return Ht(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Ms(a,!1);else{if(Lt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=vi(e),o!==null){for(t.flags|=128,Ms(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return it(yt,yt.current&1|2),t.child}e=e.sibling}a.tail!==null&&Nt()>vs&&(t.flags|=128,r=!0,Ms(a,!1),t.lanes=4194304)}else{if(!r)if(e=vi(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ms(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!gt)return Ht(t),null}else 2*Nt()-a.renderingStartTime>vs&&n!==1073741824&&(t.flags|=128,r=!0,Ms(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Nt(),t.sibling=null,n=yt.current,it(yt,r?n&1|2:n&1),t):(Ht(t),null);case 22:case 23:return jc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?dn&1073741824&&(Ht(t),t.subtreeFlags&6&&(t.flags|=8192)):Ht(t),null;case 24:return null;case 25:return null}throw Error(J(156,t.tag))}function _g(e,t){switch(rc(t),t.tag){case 1:return cn(t.type)&&di(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return gs(),ft(ln),ft(Kt),fc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return dc(t),null;case 13:if(ft(yt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));hs()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ft(yt),null;case 4:return gs(),null;case 10:return oc(t.type._context),null;case 22:case 23:return jc(),null;case 24:return null;default:return null}}var Aa=!1,Vt=!1,Dg=typeof WeakSet=="function"?WeakSet:Set,le=null;function rs(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){St(e,t,r)}else n.current=null}function yl(e,t,n){try{n()}catch(r){St(e,t,r)}}var _u=!1;function Ag(e,t){if(nl=oi,e=yf(),tc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,c=-1,u=-1,f=0,m=0,b=e,x=null;t:for(;;){for(var N;b!==n||s!==0&&b.nodeType!==3||(c=o+s),b!==a||r!==0&&b.nodeType!==3||(u=o+r),b.nodeType===3&&(o+=b.nodeValue.length),(N=b.firstChild)!==null;)x=b,b=N;for(;;){if(b===e)break t;if(x===n&&++f===s&&(c=o),x===a&&++m===r&&(u=o),(N=b.nextSibling)!==null)break;b=x,x=b.parentNode}b=N}n=c===-1||u===-1?null:{start:c,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(rl={focusedElem:e,selectionRange:n},oi=!1,le=t;le!==null;)if(t=le,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,le=e;else for(;le!==null;){t=le;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var C=w.memoizedProps,L=w.memoizedState,k=t.stateNode,v=k.getSnapshotBeforeUpdate(t.elementType===t.type?C:Mn(t.type,C),L);k.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var z=t.stateNode.containerInfo;z.nodeType===1?z.textContent="":z.nodeType===9&&z.documentElement&&z.removeChild(z.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(J(163))}}catch(E){St(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,le=e;break}le=t.return}return w=_u,_u=!1,w}function Ks(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&yl(t,n,a)}s=s.next}while(s!==r)}}function Bi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function bl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function mp(e){var t=e.alternate;t!==null&&(e.alternate=null,mp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Hn],delete t[aa],delete t[il],delete t[bg],delete t[wg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function gp(e){return e.tag===5||e.tag===3||e.tag===4}function Du(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||gp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ui));else if(r!==4&&(e=e.child,e!==null))for(wl(e,t,n),e=e.sibling;e!==null;)wl(e,t,n),e=e.sibling}function kl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(kl(e,t,n),e=e.sibling;e!==null;)kl(e,t,n),e=e.sibling}var At=null,In=!1;function ir(e,t,n){for(n=n.child;n!==null;)xp(e,t,n),n=n.sibling}function xp(e,t,n){if(Kn&&typeof Kn.onCommitFiberUnmount=="function")try{Kn.onCommitFiberUnmount(Oi,n)}catch{}switch(n.tag){case 5:Vt||rs(n,t);case 6:var r=At,s=In;At=null,ir(e,t,n),At=r,In=s,At!==null&&(In?(e=At,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):At.removeChild(n.stateNode));break;case 18:At!==null&&(In?(e=At,n=n.stateNode,e.nodeType===8?yo(e.parentNode,n):e.nodeType===1&&yo(e,n),ea(e)):yo(At,n.stateNode));break;case 4:r=At,s=In,At=n.stateNode.containerInfo,In=!0,ir(e,t,n),At=r,In=s;break;case 0:case 11:case 14:case 15:if(!Vt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var a=s,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&yl(n,t,o),s=s.next}while(s!==r)}ir(e,t,n);break;case 1:if(!Vt&&(rs(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(c){St(n,t,c)}ir(e,t,n);break;case 21:ir(e,t,n);break;case 22:n.mode&1?(Vt=(r=Vt)||n.memoizedState!==null,ir(e,t,n),Vt=r):ir(e,t,n);break;default:ir(e,t,n)}}function Au(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Dg),t.forEach(function(r){var s=Yg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Pn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var a=e,o=t,c=o;e:for(;c!==null;){switch(c.tag){case 5:At=c.stateNode,In=!1;break e;case 3:At=c.stateNode.containerInfo,In=!0;break e;case 4:At=c.stateNode.containerInfo,In=!0;break e}c=c.return}if(At===null)throw Error(J(160));xp(a,o,s),At=null,In=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(f){St(s,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)vp(t,e),t=t.sibling}function vp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Pn(t,e),$n(e),r&4){try{Ks(3,e,e.return),Bi(3,e)}catch(C){St(e,e.return,C)}try{Ks(5,e,e.return)}catch(C){St(e,e.return,C)}}break;case 1:Pn(t,e),$n(e),r&512&&n!==null&&rs(n,n.return);break;case 5:if(Pn(t,e),$n(e),r&512&&n!==null&&rs(n,n.return),e.flags&32){var s=e.stateNode;try{qs(s,"")}catch(C){St(e,e.return,C)}}if(r&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,c=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&Ud(s,a),Wo(c,o);var f=Wo(c,a);for(o=0;o<u.length;o+=2){var m=u[o],b=u[o+1];m==="style"?Vd(s,b):m==="dangerouslySetInnerHTML"?Bd(s,b):m==="children"?qs(s,b):Bl(s,m,b,f)}switch(c){case"input":$o(s,a);break;case"textarea":Fd(s,a);break;case"select":var x=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var N=a.value;N!=null?as(s,!!a.multiple,N,!1):x!==!!a.multiple&&(a.defaultValue!=null?as(s,!!a.multiple,a.defaultValue,!0):as(s,!!a.multiple,a.multiple?[]:"",!1))}s[aa]=a}catch(C){St(e,e.return,C)}}break;case 6:if(Pn(t,e),$n(e),r&4){if(e.stateNode===null)throw Error(J(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(C){St(e,e.return,C)}}break;case 3:if(Pn(t,e),$n(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ea(t.containerInfo)}catch(C){St(e,e.return,C)}break;case 4:Pn(t,e),$n(e);break;case 13:Pn(t,e),$n(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(wc=Nt())),r&4&&Au(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Vt=(f=Vt)||m,Pn(t,e),Vt=f):Pn(t,e),$n(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!m&&e.mode&1)for(le=e,m=e.child;m!==null;){for(b=le=m;le!==null;){switch(x=le,N=x.child,x.tag){case 0:case 11:case 14:case 15:Ks(4,x,x.return);break;case 1:rs(x,x.return);var w=x.stateNode;if(typeof w.componentWillUnmount=="function"){r=x,n=x.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(C){St(r,n,C)}}break;case 5:rs(x,x.return);break;case 22:if(x.memoizedState!==null){Fu(b);continue}}N!==null?(N.return=x,le=N):Fu(b)}m=m.sibling}e:for(m=null,b=e;;){if(b.tag===5){if(m===null){m=b;try{s=b.stateNode,f?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=b.stateNode,u=b.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,c.style.display=Hd("display",o))}catch(C){St(e,e.return,C)}}}else if(b.tag===6){if(m===null)try{b.stateNode.nodeValue=f?"":b.memoizedProps}catch(C){St(e,e.return,C)}}else if((b.tag!==22&&b.tag!==23||b.memoizedState===null||b===e)&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===e)break e;for(;b.sibling===null;){if(b.return===null||b.return===e)break e;m===b&&(m=null),b=b.return}m===b&&(m=null),b.sibling.return=b.return,b=b.sibling}}break;case 19:Pn(t,e),$n(e),r&4&&Au(e);break;case 21:break;default:Pn(t,e),$n(e)}}function $n(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(gp(n)){var r=n;break e}n=n.return}throw Error(J(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(qs(s,""),r.flags&=-33);var a=Du(e);kl(e,a,s);break;case 3:case 4:var o=r.stateNode.containerInfo,c=Du(e);wl(e,c,o);break;default:throw Error(J(161))}}catch(u){St(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Ug(e,t,n){le=e,yp(e)}function yp(e,t,n){for(var r=(e.mode&1)!==0;le!==null;){var s=le,a=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Aa;if(!o){var c=s.alternate,u=c!==null&&c.memoizedState!==null||Vt;c=Aa;var f=Vt;if(Aa=o,(Vt=u)&&!f)for(le=s;le!==null;)o=le,u=o.child,o.tag===22&&o.memoizedState!==null?$u(s):u!==null?(u.return=o,le=u):$u(s);for(;a!==null;)le=a,yp(a),a=a.sibling;le=s,Aa=c,Vt=f}Uu(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,le=a):Uu(e)}}function Uu(e){for(;le!==null;){var t=le;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Vt||Bi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Vt)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Mn(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&ju(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ju(t,o,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var m=f.memoizedState;if(m!==null){var b=m.dehydrated;b!==null&&ea(b)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(J(163))}Vt||t.flags&512&&bl(t)}catch(x){St(t,t.return,x)}}if(t===e){le=null;break}if(n=t.sibling,n!==null){n.return=t.return,le=n;break}le=t.return}}function Fu(e){for(;le!==null;){var t=le;if(t===e){le=null;break}var n=t.sibling;if(n!==null){n.return=t.return,le=n;break}le=t.return}}function $u(e){for(;le!==null;){var t=le;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Bi(4,t)}catch(u){St(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(u){St(t,s,u)}}var a=t.return;try{bl(t)}catch(u){St(t,a,u)}break;case 5:var o=t.return;try{bl(t)}catch(u){St(t,o,u)}}}catch(u){St(t,t.return,u)}if(t===e){le=null;break}var c=t.sibling;if(c!==null){c.return=t.return,le=c;break}le=t.return}}var Fg=Math.ceil,wi=sr.ReactCurrentDispatcher,yc=sr.ReactCurrentOwner,kn=sr.ReactCurrentBatchConfig,Ye=0,Dt=null,zt=null,Ut=0,dn=0,ss=Nr(0),Lt=0,da=null,Fr=0,Hi=0,bc=0,Ws=null,an=null,wc=0,vs=1/0,Qn=null,ki=!1,jl=null,vr=null,Ua=!1,fr=null,ji=0,Ys=0,Sl=null,Ga=-1,Za=0;function Xt(){return Ye&6?Nt():Ga!==-1?Ga:Ga=Nt()}function yr(e){return e.mode&1?Ye&2&&Ut!==0?Ut&-Ut:jg.transition!==null?(Za===0&&(Za=nf()),Za):(e=nt,e!==0||(e=window.event,e=e===void 0?16:uf(e.type)),e):1}function On(e,t,n,r){if(50<Ys)throw Ys=0,Sl=null,Error(J(185));va(e,n,r),(!(Ye&2)||e!==Dt)&&(e===Dt&&(!(Ye&2)&&(Hi|=n),Lt===4&&ur(e,Ut)),un(e,r),n===1&&Ye===0&&!(t.mode&1)&&(vs=Nt()+500,Ui&&Cr()))}function un(e,t){var n=e.callbackNode;jm(e,t);var r=ii(e,e===Dt?Ut:0);if(r===0)n!==null&&qc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&qc(n),t===1)e.tag===0?kg(Bu.bind(null,e)):Pf(Bu.bind(null,e)),vg(function(){!(Ye&6)&&Cr()}),n=null;else{switch(rf(r)){case 1:n=Yl;break;case 4:n=ef;break;case 16:n=ai;break;case 536870912:n=tf;break;default:n=ai}n=Ep(n,bp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function bp(e,t){if(Ga=-1,Za=0,Ye&6)throw Error(J(327));var n=e.callbackNode;if(us()&&e.callbackNode!==n)return null;var r=ii(e,e===Dt?Ut:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Si(e,r);else{t=r;var s=Ye;Ye|=2;var a=kp();(Dt!==e||Ut!==t)&&(Qn=null,vs=Nt()+500,Or(e,t));do try{Hg();break}catch(c){wp(e,c)}while(!0);ic(),wi.current=a,Ye=s,zt!==null?t=0:(Dt=null,Ut=0,t=Lt)}if(t!==0){if(t===2&&(s=Xo(e),s!==0&&(r=s,t=Nl(e,s))),t===1)throw n=da,Or(e,0),ur(e,r),un(e,Nt()),n;if(t===6)ur(e,r);else{if(s=e.current.alternate,!(r&30)&&!$g(s)&&(t=Si(e,r),t===2&&(a=Xo(e),a!==0&&(r=a,t=Nl(e,a))),t===1))throw n=da,Or(e,0),ur(e,r),un(e,Nt()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(J(345));case 2:Mr(e,an,Qn);break;case 3:if(ur(e,r),(r&130023424)===r&&(t=wc+500-Nt(),10<t)){if(ii(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Xt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=al(Mr.bind(null,e,an,Qn),t);break}Mr(e,an,Qn);break;case 4:if(ur(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-Tn(r);a=1<<o,o=t[o],o>s&&(s=o),r&=~a}if(r=s,r=Nt()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Fg(r/1960))-r,10<r){e.timeoutHandle=al(Mr.bind(null,e,an,Qn),r);break}Mr(e,an,Qn);break;case 5:Mr(e,an,Qn);break;default:throw Error(J(329))}}}return un(e,Nt()),e.callbackNode===n?bp.bind(null,e):null}function Nl(e,t){var n=Ws;return e.current.memoizedState.isDehydrated&&(Or(e,t).flags|=256),e=Si(e,t),e!==2&&(t=an,an=n,t!==null&&Cl(t)),e}function Cl(e){an===null?an=e:an.push.apply(an,e)}function $g(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],a=s.getSnapshot;s=s.value;try{if(!Rn(a(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ur(e,t){for(t&=~bc,t&=~Hi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Tn(t),r=1<<n;e[n]=-1,t&=~r}}function Bu(e){if(Ye&6)throw Error(J(327));us();var t=ii(e,0);if(!(t&1))return un(e,Nt()),null;var n=Si(e,t);if(e.tag!==0&&n===2){var r=Xo(e);r!==0&&(t=r,n=Nl(e,r))}if(n===1)throw n=da,Or(e,0),ur(e,t),un(e,Nt()),n;if(n===6)throw Error(J(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Mr(e,an,Qn),un(e,Nt()),null}function kc(e,t){var n=Ye;Ye|=1;try{return e(t)}finally{Ye=n,Ye===0&&(vs=Nt()+500,Ui&&Cr())}}function $r(e){fr!==null&&fr.tag===0&&!(Ye&6)&&us();var t=Ye;Ye|=1;var n=kn.transition,r=nt;try{if(kn.transition=null,nt=1,e)return e()}finally{nt=r,kn.transition=n,Ye=t,!(Ye&6)&&Cr()}}function jc(){dn=ss.current,ft(ss)}function Or(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,xg(n)),zt!==null)for(n=zt.return;n!==null;){var r=n;switch(rc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&di();break;case 3:gs(),ft(ln),ft(Kt),fc();break;case 5:dc(r);break;case 4:gs();break;case 13:ft(yt);break;case 19:ft(yt);break;case 10:oc(r.type._context);break;case 22:case 23:jc()}n=n.return}if(Dt=e,zt=e=br(e.current,null),Ut=dn=t,Lt=0,da=null,bc=Hi=Fr=0,an=Ws=null,Lr!==null){for(t=0;t<Lr.length;t++)if(n=Lr[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=s,r.next=o}n.pending=r}Lr=null}return e}function wp(e,t){do{var n=zt;try{if(ic(),Qa.current=bi,yi){for(var r=bt.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}yi=!1}if(Ur=0,_t=It=bt=null,Vs=!1,la=0,yc.current=null,n===null||n.return===null){Lt=1,da=t,zt=null;break}e:{var a=e,o=n.return,c=n,u=t;if(t=Ut,c.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var f=u,m=c,b=m.tag;if(!(m.mode&1)&&(b===0||b===11||b===15)){var x=m.alternate;x?(m.updateQueue=x.updateQueue,m.memoizedState=x.memoizedState,m.lanes=x.lanes):(m.updateQueue=null,m.memoizedState=null)}var N=Pu(o);if(N!==null){N.flags&=-257,Mu(N,o,c,a,t),N.mode&1&&zu(a,f,t),t=N,u=f;var w=t.updateQueue;if(w===null){var C=new Set;C.add(u),t.updateQueue=C}else w.add(u);break e}else{if(!(t&1)){zu(a,f,t),Sc();break e}u=Error(J(426))}}else if(gt&&c.mode&1){var L=Pu(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Mu(L,o,c,a,t),sc(xs(u,c));break e}}a=u=xs(u,c),Lt!==4&&(Lt=2),Ws===null?Ws=[a]:Ws.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var k=sp(a,u,t);ku(a,k);break e;case 1:c=u;var v=a.type,z=a.stateNode;if(!(a.flags&128)&&(typeof v.getDerivedStateFromError=="function"||z!==null&&typeof z.componentDidCatch=="function"&&(vr===null||!vr.has(z)))){a.flags|=65536,t&=-t,a.lanes|=t;var E=ap(a,c,t);ku(a,E);break e}}a=a.return}while(a!==null)}Sp(n)}catch(I){t=I,zt===n&&n!==null&&(zt=n=n.return);continue}break}while(!0)}function kp(){var e=wi.current;return wi.current=bi,e===null?bi:e}function Sc(){(Lt===0||Lt===3||Lt===2)&&(Lt=4),Dt===null||!(Fr&268435455)&&!(Hi&268435455)||ur(Dt,Ut)}function Si(e,t){var n=Ye;Ye|=2;var r=kp();(Dt!==e||Ut!==t)&&(Qn=null,Or(e,t));do try{Bg();break}catch(s){wp(e,s)}while(!0);if(ic(),Ye=n,wi.current=r,zt!==null)throw Error(J(261));return Dt=null,Ut=0,Lt}function Bg(){for(;zt!==null;)jp(zt)}function Hg(){for(;zt!==null&&!hm();)jp(zt)}function jp(e){var t=Cp(e.alternate,e,dn);e.memoizedProps=e.pendingProps,t===null?Sp(e):zt=t,yc.current=null}function Sp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=_g(n,t),n!==null){n.flags&=32767,zt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Lt=6,zt=null;return}}else if(n=Rg(n,t,dn),n!==null){zt=n;return}if(t=t.sibling,t!==null){zt=t;return}zt=t=e}while(t!==null);Lt===0&&(Lt=5)}function Mr(e,t,n){var r=nt,s=kn.transition;try{kn.transition=null,nt=1,Vg(e,t,n,r)}finally{kn.transition=s,nt=r}return null}function Vg(e,t,n,r){do us();while(fr!==null);if(Ye&6)throw Error(J(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(J(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Sm(e,a),e===Dt&&(zt=Dt=null,Ut=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ua||(Ua=!0,Ep(ai,function(){return us(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=kn.transition,kn.transition=null;var o=nt;nt=1;var c=Ye;Ye|=4,yc.current=null,Ag(e,n),vp(n,e),ug(rl),oi=!!nl,rl=nl=null,e.current=n,Ug(n),mm(),Ye=c,nt=o,kn.transition=a}else e.current=n;if(Ua&&(Ua=!1,fr=e,ji=s),a=e.pendingLanes,a===0&&(vr=null),vm(n.stateNode),un(e,Nt()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(ki)throw ki=!1,e=jl,jl=null,e;return ji&1&&e.tag!==0&&us(),a=e.pendingLanes,a&1?e===Sl?Ys++:(Ys=0,Sl=e):Ys=0,Cr(),null}function us(){if(fr!==null){var e=rf(ji),t=kn.transition,n=nt;try{if(kn.transition=null,nt=16>e?16:e,fr===null)var r=!1;else{if(e=fr,fr=null,ji=0,Ye&6)throw Error(J(331));var s=Ye;for(Ye|=4,le=e.current;le!==null;){var a=le,o=a.child;if(le.flags&16){var c=a.deletions;if(c!==null){for(var u=0;u<c.length;u++){var f=c[u];for(le=f;le!==null;){var m=le;switch(m.tag){case 0:case 11:case 15:Ks(8,m,a)}var b=m.child;if(b!==null)b.return=m,le=b;else for(;le!==null;){m=le;var x=m.sibling,N=m.return;if(mp(m),m===f){le=null;break}if(x!==null){x.return=N,le=x;break}le=N}}}var w=a.alternate;if(w!==null){var C=w.child;if(C!==null){w.child=null;do{var L=C.sibling;C.sibling=null,C=L}while(C!==null)}}le=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,le=o;else e:for(;le!==null;){if(a=le,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Ks(9,a,a.return)}var k=a.sibling;if(k!==null){k.return=a.return,le=k;break e}le=a.return}}var v=e.current;for(le=v;le!==null;){o=le;var z=o.child;if(o.subtreeFlags&2064&&z!==null)z.return=o,le=z;else e:for(o=v;le!==null;){if(c=le,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Bi(9,c)}}catch(I){St(c,c.return,I)}if(c===o){le=null;break e}var E=c.sibling;if(E!==null){E.return=c.return,le=E;break e}le=c.return}}if(Ye=s,Cr(),Kn&&typeof Kn.onPostCommitFiberRoot=="function")try{Kn.onPostCommitFiberRoot(Oi,e)}catch{}r=!0}return r}finally{nt=n,kn.transition=t}}return!1}function Hu(e,t,n){t=xs(n,t),t=sp(e,t,1),e=xr(e,t,1),t=Xt(),e!==null&&(va(e,1,t),un(e,t))}function St(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vr===null||!vr.has(r))){e=xs(n,e),e=ap(t,e,1),t=xr(t,e,1),e=Xt(),t!==null&&(va(t,1,e),un(t,e));break}}t=t.return}}function Kg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Xt(),e.pingedLanes|=e.suspendedLanes&n,Dt===e&&(Ut&n)===n&&(Lt===4||Lt===3&&(Ut&130023424)===Ut&&500>Nt()-wc?Or(e,0):bc|=n),un(e,t)}function Np(e,t){t===0&&(e.mode&1?(t=Pa,Pa<<=1,!(Pa&130023424)&&(Pa=4194304)):t=1);var n=Xt();e=nr(e,t),e!==null&&(va(e,t,n),un(e,n))}function Wg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Np(e,n)}function Yg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(J(314))}r!==null&&r.delete(t),Np(e,n)}var Cp;Cp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ln.current)on=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return on=!1,Og(e,t,n);on=!!(e.flags&131072)}else on=!1,gt&&t.flags&1048576&&Mf(t,hi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Xa(e,t),e=t.pendingProps;var s=ps(t,Kt.current);cs(t,n),s=hc(null,t,r,e,s,n);var a=mc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,cn(r)?(a=!0,fi(t)):a=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,cc(t),s.updater=$i,t.stateNode=s,s._reactInternals=t,fl(t,r,e,n),t=ml(null,t,r,!0,a,n)):(t.tag=0,gt&&a&&nc(t),qt(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Xa(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Qg(r),e=Mn(r,e),s){case 0:t=hl(null,t,r,e,n);break e;case 1:t=Tu(null,t,r,e,n);break e;case 11:t=Iu(null,t,r,e,n);break e;case 14:t=Lu(null,t,r,Mn(r.type,e),n);break e}throw Error(J(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Mn(r,s),hl(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Mn(r,s),Tu(e,t,r,s,n);case 3:e:{if(cp(t),e===null)throw Error(J(387));r=t.pendingProps,a=t.memoizedState,s=a.element,_f(e,t),xi(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){s=xs(Error(J(423)),t),t=Ou(e,t,r,n,s);break e}else if(r!==s){s=xs(Error(J(424)),t),t=Ou(e,t,r,n,s);break e}else for(fn=gr(t.stateNode.containerInfo.firstChild),pn=t,gt=!0,Ln=null,n=Of(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(hs(),r===s){t=rr(e,t,n);break e}qt(e,t,r,n)}t=t.child}return t;case 5:return Df(t),e===null&&cl(t),r=t.type,s=t.pendingProps,a=e!==null?e.memoizedProps:null,o=s.children,sl(r,s)?o=null:a!==null&&sl(r,a)&&(t.flags|=32),lp(e,t),qt(e,t,o,n),t.child;case 6:return e===null&&cl(t),null;case 13:return up(e,t,n);case 4:return uc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ms(t,null,r,n):qt(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Mn(r,s),Iu(e,t,r,s,n);case 7:return qt(e,t,t.pendingProps,n),t.child;case 8:return qt(e,t,t.pendingProps.children,n),t.child;case 12:return qt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,a=t.memoizedProps,o=s.value,it(mi,r._currentValue),r._currentValue=o,a!==null)if(Rn(a.value,o)){if(a.children===s.children&&!ln.current){t=rr(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){o=a.child;for(var u=c.firstContext;u!==null;){if(u.context===r){if(a.tag===1){u=Zn(-1,n&-n),u.tag=2;var f=a.updateQueue;if(f!==null){f=f.shared;var m=f.pending;m===null?u.next=u:(u.next=m.next,m.next=u),f.pending=u}}a.lanes|=n,u=a.alternate,u!==null&&(u.lanes|=n),ul(a.return,n,t),c.lanes|=n;break}u=u.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(J(341));o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ul(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}qt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,cs(t,n),s=jn(s),r=r(s),t.flags|=1,qt(e,t,r,n),t.child;case 14:return r=t.type,s=Mn(r,t.pendingProps),s=Mn(r.type,s),Lu(e,t,r,s,n);case 15:return ip(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Mn(r,s),Xa(e,t),t.tag=1,cn(r)?(e=!0,fi(t)):e=!1,cs(t,n),rp(t,r,s),fl(t,r,s,n),ml(null,t,r,!0,e,n);case 19:return dp(e,t,n);case 22:return op(e,t,n)}throw Error(J(156,t.tag))};function Ep(e,t){return Zd(e,t)}function Jg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function wn(e,t,n,r){return new Jg(e,t,n,r)}function Nc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Qg(e){if(typeof e=="function")return Nc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Vl)return 11;if(e===Kl)return 14}return 2}function br(e,t){var n=e.alternate;return n===null?(n=wn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ei(e,t,n,r,s,a){var o=2;if(r=e,typeof e=="function")Nc(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Jr:return Rr(n.children,s,a,t);case Hl:o=8,s|=8;break;case _o:return e=wn(12,n,t,s|2),e.elementType=_o,e.lanes=a,e;case Do:return e=wn(13,n,t,s),e.elementType=Do,e.lanes=a,e;case Ao:return e=wn(19,n,t,s),e.elementType=Ao,e.lanes=a,e;case _d:return Vi(n,s,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Od:o=10;break e;case Rd:o=9;break e;case Vl:o=11;break e;case Kl:o=14;break e;case or:o=16,r=null;break e}throw Error(J(130,e==null?e:typeof e,""))}return t=wn(o,n,t,s),t.elementType=e,t.type=r,t.lanes=a,t}function Rr(e,t,n,r){return e=wn(7,e,r,t),e.lanes=n,e}function Vi(e,t,n,r){return e=wn(22,e,r,t),e.elementType=_d,e.lanes=n,e.stateNode={isHidden:!1},e}function Eo(e,t,n){return e=wn(6,e,null,t),e.lanes=n,e}function zo(e,t,n){return t=wn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=oo(0),this.expirationTimes=oo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=oo(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Cc(e,t,n,r,s,a,o,c,u){return e=new qg(e,t,n,c,u),t===1?(t=1,a===!0&&(t|=8)):t=0,a=wn(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},cc(a),e}function Xg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function zp(e){if(!e)return kr;e=e._reactInternals;e:{if(Hr(e)!==e||e.tag!==1)throw Error(J(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(cn(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(J(171))}if(e.tag===1){var n=e.type;if(cn(n))return zf(e,n,t)}return t}function Pp(e,t,n,r,s,a,o,c,u){return e=Cc(n,r,!0,e,s,a,o,c,u),e.context=zp(null),n=e.current,r=Xt(),s=yr(n),a=Zn(r,s),a.callback=t!=null?t:null,xr(n,a,s),e.current.lanes=s,va(e,s,r),un(e,r),e}function Ki(e,t,n,r){var s=t.current,a=Xt(),o=yr(s);return n=zp(n),t.context===null?t.context=n:t.pendingContext=n,t=Zn(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=xr(s,t,o),e!==null&&(On(e,s,o,a),Ja(e,s,o)),o}function Ni(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Vu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ec(e,t){Vu(e,t),(e=e.alternate)&&Vu(e,t)}function Gg(){return null}var Mp=typeof reportError=="function"?reportError:function(e){console.error(e)};function zc(e){this._internalRoot=e}Wi.prototype.render=zc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));Ki(e,t,null,null)};Wi.prototype.unmount=zc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$r(function(){Ki(null,e,null,null)}),t[tr]=null}};function Wi(e){this._internalRoot=e}Wi.prototype.unstable_scheduleHydration=function(e){if(e){var t=of();e={blockedOn:null,target:e,priority:t};for(var n=0;n<cr.length&&t!==0&&t<cr[n].priority;n++);cr.splice(n,0,e),n===0&&cf(e)}};function Pc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Yi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ku(){}function Zg(e,t,n,r,s){if(s){if(typeof r=="function"){var a=r;r=function(){var f=Ni(o);a.call(f)}}var o=Pp(t,r,e,0,null,!1,!1,"",Ku);return e._reactRootContainer=o,e[tr]=o.current,ra(e.nodeType===8?e.parentNode:e),$r(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var c=r;r=function(){var f=Ni(u);c.call(f)}}var u=Cc(e,0,!1,null,null,!1,!1,"",Ku);return e._reactRootContainer=u,e[tr]=u.current,ra(e.nodeType===8?e.parentNode:e),$r(function(){Ki(t,u,n,r)}),u}function Ji(e,t,n,r,s){var a=n._reactRootContainer;if(a){var o=a;if(typeof s=="function"){var c=s;s=function(){var u=Ni(o);c.call(u)}}Ki(t,o,e,s)}else o=Zg(n,t,e,s,r);return Ni(o)}sf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ds(t.pendingLanes);n!==0&&(Jl(t,n|1),un(t,Nt()),!(Ye&6)&&(vs=Nt()+500,Cr()))}break;case 13:$r(function(){var r=nr(e,1);if(r!==null){var s=Xt();On(r,e,1,s)}}),Ec(e,1)}};Ql=function(e){if(e.tag===13){var t=nr(e,134217728);if(t!==null){var n=Xt();On(t,e,134217728,n)}Ec(e,134217728)}};af=function(e){if(e.tag===13){var t=yr(e),n=nr(e,t);if(n!==null){var r=Xt();On(n,e,t,r)}Ec(e,t)}};of=function(){return nt};lf=function(e,t){var n=nt;try{return nt=e,t()}finally{nt=n}};Jo=function(e,t,n){switch(t){case"input":if($o(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Ai(r);if(!s)throw Error(J(90));Ad(r),$o(r,s)}}}break;case"textarea":Fd(e,n);break;case"select":t=n.value,t!=null&&as(e,!!n.multiple,t,!1)}};Yd=kc;Jd=$r;var ex={usingClientEntryPoint:!1,Events:[ba,Gr,Ai,Kd,Wd,kc]},Is={findFiberByHostInstance:Ir,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},tx={bundleType:Is.bundleType,version:Is.version,rendererPackageName:Is.rendererPackageName,rendererConfig:Is.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:sr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Xd(e),e===null?null:e.stateNode},findFiberByHostInstance:Is.findFiberByHostInstance||Gg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fa.isDisabled&&Fa.supportsFiber)try{Oi=Fa.inject(tx),Kn=Fa}catch{}}mn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ex;mn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Pc(t))throw Error(J(200));return Xg(e,t,null,n)};mn.createRoot=function(e,t){if(!Pc(e))throw Error(J(299));var n=!1,r="",s=Mp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Cc(e,1,!1,null,null,n,!1,r,s),e[tr]=t.current,ra(e.nodeType===8?e.parentNode:e),new zc(t)};mn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=Xd(t),e=e===null?null:e.stateNode,e};mn.flushSync=function(e){return $r(e)};mn.hydrate=function(e,t,n){if(!Yi(t))throw Error(J(200));return Ji(null,e,t,!0,n)};mn.hydrateRoot=function(e,t,n){if(!Pc(e))throw Error(J(405));var r=n!=null&&n.hydratedSources||null,s=!1,a="",o=Mp;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Pp(t,null,e,1,n!=null?n:null,s,!1,a,o),e[tr]=t.current,ra(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Wi(t)};mn.render=function(e,t,n){if(!Yi(t))throw Error(J(200));return Ji(null,e,t,!1,n)};mn.unmountComponentAtNode=function(e){if(!Yi(e))throw Error(J(40));return e._reactRootContainer?($r(function(){Ji(null,null,e,!1,function(){e._reactRootContainer=null,e[tr]=null})}),!0):!1};mn.unstable_batchedUpdates=kc;mn.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Yi(n))throw Error(J(200));if(e==null||e._reactInternals===void 0)throw Error(J(38));return Ji(e,t,n,!1,r)};mn.version="18.3.1-next-f1338f8080-20240426";function Ip(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ip)}catch(e){console.error(e)}}Ip(),Md.exports=mn;var nx=Md.exports,Wu=nx;Oo.createRoot=Wu.createRoot,Oo.hydrateRoot=Wu.hydrateRoot;function rx(){if(console&&console.warn){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];_r(t[0])&&(t[0]=`react-i18next:: ${t[0]}`),console.warn(...t)}}const Yu={};function El(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];_r(t[0])&&Yu[t[0]]||(_r(t[0])&&(Yu[t[0]]=new Date),rx(...t))}const Lp=(e,t)=>()=>{if(e.isInitialized)t();else{const n=()=>{setTimeout(()=>{e.off("initialized",n)},0),t()};e.on("initialized",n)}},Ju=(e,t,n)=>{e.loadNamespaces(t,Lp(e,n))},Qu=(e,t,n,r)=>{_r(n)&&(n=[n]),n.forEach(s=>{e.options.ns.indexOf(s)<0&&e.options.ns.push(s)}),e.loadLanguages(t,Lp(e,r))},sx=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const r=t.languages[0],s=t.options?t.options.fallbackLng:!1,a=t.languages[t.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(c,u)=>{const f=t.services.backendConnector.state[`${c}|${u}`];return f===-1||f===2};return n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!o(t.isLanguageChangingTo,e)?!1:!!(t.hasResourceBundle(r,e)||!t.services.backendConnector.backend||t.options.resources&&!t.options.partialBundledLanguages||o(r,e)&&(!s||o(a,e)))},ax=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return!t.languages||!t.languages.length?(El("i18n.languages were undefined or empty",t.languages),!0):t.options.ignoreJSONStructure!==void 0?t.hasLoadedNamespace(e,{lng:n.lng,precheck:(s,a)=>{if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!a(s.isLanguageChangingTo,e))return!1}}):sx(e,t,n)},_r=e=>typeof e=="string",ix=e=>typeof e=="object"&&e!==null,ox=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,lx={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},cx=e=>lx[e],ux=e=>e.replace(ox,cx);let zl={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:ux};const dx=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};zl={...zl,...e}},fx=()=>zl;let Tp;const px=e=>{Tp=e},hx=()=>Tp,mx={type:"3rdParty",init(e){dx(e.options.react),px(e)}},gx=y.createContext();class xx{constructor(){Dc(this,"getUsedNamespaces",()=>Object.keys(this.usedNamespaces));this.usedNamespaces={}}addUsedNamespaces(t){t.forEach(n=>{this.usedNamespaces[n]||(this.usedNamespaces[n]=!0)})}}const vx=(e,t)=>{const n=y.useRef();return y.useEffect(()=>{n.current=e},[e,t]),n.current},Op=(e,t,n,r)=>e.getFixedT(t,n,r),yx=(e,t,n,r)=>y.useCallback(Op(e,t,n,r),[e,t,n,r]),Ge=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{i18n:n}=t,{i18n:r,defaultNS:s}=y.useContext(gx)||{},a=n||r||hx();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new xx),!a){El("You will need to pass in an i18next instance by using initReactI18next");const E=(D,_)=>_r(_)?_:ix(_)&&_r(_.defaultValue)?_.defaultValue:Array.isArray(D)?D[D.length-1]:D,I=[E,{},!1];return I.t=E,I.i18n={},I.ready=!1,I}a.options.react&&a.options.react.wait!==void 0&&El("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const o={...fx(),...a.options.react,...t},{useSuspense:c,keyPrefix:u}=o;let f=s||a.options&&a.options.defaultNS;f=_r(f)?[f]:f||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(f);const m=(a.isInitialized||a.initializedStoreOnce)&&f.every(E=>ax(E,a,o)),b=yx(a,t.lng||null,o.nsMode==="fallback"?f:f[0],u),x=()=>b,N=()=>Op(a,t.lng||null,o.nsMode==="fallback"?f:f[0],u),[w,C]=y.useState(x);let L=f.join();t.lng&&(L=`${t.lng}${L}`);const k=vx(L),v=y.useRef(!0);y.useEffect(()=>{const{bindI18n:E,bindI18nStore:I}=o;v.current=!0,!m&&!c&&(t.lng?Qu(a,t.lng,f,()=>{v.current&&C(N)}):Ju(a,f,()=>{v.current&&C(N)})),m&&k&&k!==L&&v.current&&C(N);const D=()=>{v.current&&C(N)};return E&&a&&a.on(E,D),I&&a&&a.store.on(I,D),()=>{v.current=!1,E&&a&&E.split(" ").forEach(_=>a.off(_,D)),I&&a&&I.split(" ").forEach(_=>a.store.off(_,D))}},[a,L]),y.useEffect(()=>{v.current&&m&&C(x)},[a,u,m]);const z=[w,a,m];if(z.t=w,z.i18n=a,z.ready=m,m||!m&&!c)return z;throw new Promise(E=>{t.lng?Qu(a,t.lng,f,()=>E()):Ju(a,f,()=>E())})};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wx=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=(e,t)=>{const n=y.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:c="",children:u,...f},m)=>y.createElement("svg",{ref:m,...bx,width:s,height:s,stroke:r,strokeWidth:o?Number(a)*24/Number(s):a,className:["lucide",`lucide-${wx(e)}`,c].join(" "),...f},[...t.map(([b,x])=>y.createElement(b,x)),...Array.isArray(u)?u:[u]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kx=ee("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=ee("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=ee("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=ee("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=ee("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pl=ee("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=ee("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=ee("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=ee("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mc=ee("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=ee("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=ee("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ic=ee("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=ee("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rp=ee("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _p=ee("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lc=ee("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=ee("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx=ee("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=ee("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=ee("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=ee("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=ee("Forward",[["polyline",{points:"15 17 20 12 15 7",key:"1w3sku"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12",key:"jmiej9"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=ee("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=ee("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=ee("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=ee("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=ee("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=ee("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=ee("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=ee("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=ee("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=ee("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=ee("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=ee("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=ee("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=ee("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=ee("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=ee("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=ee("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=ee("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=ee("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=ee("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=ee("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=ee("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=ee("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=ee("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ml=ee("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=ee("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=ee("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=ee("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=ee("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Il=ee("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=ee("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=ee("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=ee("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=ee("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=ee("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=ee("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=ee("StretchHorizontal",[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2",key:"qdearl"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2",key:"1xrn6j"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=ee("Strikethrough",[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=ee("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=ee("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=ee("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=ee("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=ee("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=ee("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=ee("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=ee("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=ee("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=ee("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=ee("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=ee("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=ee("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=ee("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),Qp="hotline-server-favorites";function u0(){try{const e=localStorage.getItem(Qp);return e?JSON.parse(e):[]}catch{return[]}}function $a(e){localStorage.setItem(Qp,JSON.stringify(e))}function d0(){const[e,t]=y.useState(u0),n=y.useCallback((a,o,c)=>{t(u=>{const f=u.find(x=>x.address===a&&x.nickname===o);if(f){const x=u.map(N=>N.id===f.id?{...N,lastUsed:Date.now(),label:c||N.label}:N);return $a(x),x}const b=[{id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`,address:a,nickname:o,label:c,lastUsed:Date.now()},...u].slice(0,10);return $a(b),b})},[]),r=y.useCallback(a=>{t(o=>{const c=o.filter(u=>u.id!==a);return $a(c),c})},[]),s=y.useCallback((a,o)=>{t(c=>{const u=c.findIndex(m=>m.address===a&&m.nickname===o);if(u===-1)return c;const f=[...c];return f[u]={...f[u],lastUsed:Date.now()},f.sort((m,b)=>b.lastUsed-m.lastUsed),$a(f),f})},[]);return{favorites:e,addFavorite:n,removeFavorite:r,touchFavorite:s}}function f0({onConnect:e,isConnecting:t}){const{t:n}=Ge(),[r,s]=y.useState("localhost:9998"),[a,o]=y.useState(""),{favorites:c,addFavorite:u,removeFavorite:f}=d0(),m=N=>{N.preventDefault(),r&&a.trim()&&(u(r,a.trim()),e(r,a.trim()))},b=N=>{s(N.address),o(N.nickname)},x=N=>{u(N.address,N.nickname),e(N.address,N.nickname)};return i.jsxs("div",{className:"connect-overlay",children:[i.jsx("div",{className:"connect-bg-glow"}),i.jsxs("form",{className:"connect-dialog",onSubmit:m,children:[i.jsxs("div",{className:"connect-logo",children:[i.jsx("img",{src:"/logo.svg",alt:"Hotline Modern",className:"connect-logo-img"}),i.jsx("h1",{children:n("app.name")}),i.jsx("p",{className:"connect-subtitle",children:n("connect.title")})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.serverAddress")}),i.jsx("input",{type:"text",value:r,onChange:N=>s(N.target.value),placeholder:n("connect.serverPlaceholder"),disabled:t})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.nickname")}),i.jsx("input",{type:"text",value:a,onChange:N=>o(N.target.value),placeholder:n("connect.nicknamePlaceholder"),disabled:t,maxLength:32,autoFocus:!0})]}),i.jsx("button",{type:"submit",className:"connect-btn",disabled:t||!a.trim(),children:t?i.jsxs(i.Fragment,{children:[i.jsx(pa,{size:16,className:"connect-spinner"}),n("connect.connecting")]}):i.jsxs(i.Fragment,{children:[n("connect.button"),i.jsx("kbd",{className:"connect-kbd",children:"↵"})]})}),c.length>0&&i.jsxs("div",{className:"connect-favorites",children:[i.jsxs("div",{className:"connect-favorites-header",children:[i.jsx(Yp,{size:12}),i.jsx("span",{children:n("connect.recentServers")})]}),i.jsx("ul",{className:"connect-favorites-list",children:c.slice(0,5).map(N=>i.jsxs("li",{className:"connect-fav-item",children:[i.jsxs("button",{className:"connect-fav-btn",onClick:()=>b(N),title:N.address,children:[i.jsx("span",{className:"connect-fav-addr",children:N.address}),i.jsx("span",{className:"connect-fav-nick",children:N.nickname})]}),i.jsx("button",{className:"connect-fav-quick",onClick:()=>x(N),title:n("connect.quickConnect"),children:i.jsx(o0,{size:11})}),i.jsx("button",{className:"connect-fav-remove",onClick:()=>f(N.id),title:n("connect.removeFavorite"),children:i.jsx(Tt,{size:11})})]},N.id))})]})]}),i.jsx("style",{children:`
        .connect-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }
        .connect-bg-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .connect-dialog {
          position: relative;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 48px 40px 40px;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.3s ease;
          box-shadow: var(--shadow-lg);
        }
        .connect-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .connect-logo-img {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          box-shadow: 0 0 24px rgba(var(--accent-rgb), 0.2);
          animation: logoFloat 3s ease-in-out infinite;
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .connect-logo h1 {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.3px;
        }
        .connect-subtitle {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 400;
        }
        .connect-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .connect-field label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .connect-field input {
          padding: 10px 14px;
          font-size: 14px;
        }
        .connect-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--accent);
          color: #fff;
          padding: 12px 20px;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 14px;
          margin-top: 4px;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .connect-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.35);
        }
        .connect-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        .connect-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .connect-spinner {
          animation: spin 1s linear infinite;
        }
        .connect-kbd {
          font-size: 11px;
          font-weight: 500;
          opacity: 0.6;
          background: rgba(255, 255, 255, 0.1);
          padding: 1px 6px;
          border-radius: 3px;
          margin-left: 4px;
        }
        .connect-favorites {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 4px;
        }
        .connect-favorites-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .connect-favorites-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .connect-fav-item {
          display: flex;
          align-items: center;
          gap: 4px;
          animation: fadeIn 0.15s ease;
        }
        .connect-fav-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid transparent;
          transition: all var(--transition-fast);
          cursor: pointer;
          min-width: 0;
        }
        .connect-fav-btn:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
        }
        .connect-fav-addr {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .connect-fav-nick {
          font-size: 11px;
          color: var(--text-muted);
          flex-shrink: 0;
          margin-left: 8px;
        }
        .connect-fav-quick {
          padding: 6px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .connect-fav-quick:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .connect-fav-remove {
          padding: 6px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .connect-fav-remove:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
      `})]})}const qu=[{value:"available",label:"status.available",color:"#22c55e"},{value:"away",label:"status.away",color:"#eab308"},{value:"busy",label:"status.busy",color:"#ef4444"}];function p0({currentStatus:e,onStatusChange:t}){var s;const{t:n}=Ge(),r=((s=qu.find(a=>a.value===e))==null?void 0:s.color)||"#22c55e";return i.jsxs("div",{className:"status-selector",children:[i.jsx("span",{className:"status-dot-sel",style:{backgroundColor:r}}),i.jsx("select",{value:e,onChange:a=>t(a.target.value),className:"status-select",children:qu.map(a=>i.jsx("option",{value:a.value,children:n(a.label)},a.value))}),i.jsx("style",{children:`
        .status-selector {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .status-dot-sel {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background-color var(--transition-normal);
          box-shadow: 0 0 4px currentColor;
        }
        .status-select {
          font-size: 11px;
          padding: 2px 4px;
          border-radius: var(--radius-sm);
          background: transparent;
          color: var(--text-secondary);
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        .status-select:hover {
          color: var(--text-primary);
        }
      `})]})}function qp({status:e}){const t=e==="away"?"#eab308":e==="busy"?"#ef4444":"#22c55e";return i.jsx("span",{className:"user-status-dot",style:{backgroundColor:t},title:e,children:i.jsx("style",{children:`
        .user-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--bg-secondary);
          transition: background-color var(--transition-normal);
        }
      `})})}function h0({serverName:e,channels:t,activeChannel:n,activeDM:r,dmConversations:s,onSelectChannel:a,onSelectDM:o,onCreateChannel:c,onDeleteChannel:u,onDisconnect:f,canCreateChannel:m,unreadCounts:b,nickname:x,role:N,userStatus:w,mutedChannels:C,onToggleMute:L,onAdminPanel:k,typingChannels:v,onReorderChannels:z}){const{t:E}=Ge();return i.jsxs("aside",{className:"sidebar",children:[i.jsxs("div",{className:"sidebar-header",children:[i.jsx("h2",{children:e}),i.jsxs("div",{className:"sidebar-header-actions",children:[k&&N==="admin"&&i.jsx("button",{className:"sidebar-admin",onClick:k,title:E("admin.title"),children:i.jsx(Kp,{size:15})}),i.jsx("button",{className:"sidebar-disconnect",onClick:f,title:E("sidebar.disconnect"),children:i.jsx(Fp,{size:16})})]})]}),i.jsxs("div",{className:"sidebar-section",children:[i.jsxs("div",{className:"sidebar-section-header",children:[i.jsx("span",{children:E("sidebar.channels")}),m&&i.jsx("button",{className:"sidebar-add",onClick:c,title:E("sidebar.createChannel"),children:i.jsx(Hp,{size:14})})]}),i.jsx("ul",{className:"channel-list",children:t.map((I,D)=>i.jsxs("li",{className:`channel-item ${I.name===n&&!r?"active":""}`,onClick:()=>a(I.name),draggable:!!z,onDragStart:_=>{_.dataTransfer.setData("text/plain",String(D))},onDragOver:_=>{_.preventDefault(),_.currentTarget.classList.add("drag-over")},onDragLeave:_=>{_.currentTarget.classList.remove("drag-over")},onDrop:_=>{_.currentTarget.classList.remove("drag-over");const Q=parseInt(_.dataTransfer.getData("text/plain"));if(isNaN(Q)||Q===D||!z)return;const Ae=t.map(Ke=>Ke.name),[pe]=Ae.splice(Q,1);Ae.splice(D,0,pe),z(Ae)},children:[I.hasPassword?i.jsx(Ci,{size:14,className:"channel-icon"}):i.jsx(ka,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:I.name}),(v==null?void 0:v.includes(I.name))&&i.jsx("span",{className:"channel-typing-dot"}),(b[I.name]||0)>0&&i.jsx("span",{className:"channel-unread",children:b[I.name]}),(C==null?void 0:C.includes(I.name))&&i.jsx(ds,{size:11,className:"channel-muted-icon"}),i.jsx("span",{className:"channel-count",children:I.userCount}),L&&i.jsx("button",{className:"channel-mute-btn",onClick:_=>{_.stopPropagation(),L(I.name)},title:C!=null&&C.includes(I.name)?E("sidebar.unmute"):E("sidebar.mute"),children:i.jsx(ds,{size:11})}),m&&I.name!=="lobby"&&i.jsx("button",{className:"channel-delete",onClick:_=>{_.stopPropagation(),u(I.name)},title:E("sidebar.deleteChannel"),children:i.jsx(jr,{size:12})})]},I.name))}),s.length>0&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"sidebar-section-header dm-header",children:i.jsx("span",{children:E("sidebar.directMessages")})}),i.jsx("ul",{className:"channel-list",children:s.map(I=>i.jsxs("li",{className:`channel-item ${r===I.peerId?"active":""}`,onClick:()=>o(I.peerId),children:[i.jsx(Tc,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:I.peerNick}),I.unread>0&&i.jsx("span",{className:"channel-unread",children:I.unread})]},I.peerId))})]})]}),x&&i.jsxs("div",{className:"sidebar-footer",children:[i.jsx(qp,{status:w||"available"}),i.jsx("span",{className:"sidebar-nick",children:x}),i.jsx("span",{className:"sidebar-role","data-role":N,children:N})]}),i.jsx("style",{children:`
        .sidebar {
          width: 240px;
          min-width: 240px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .sidebar-header {
          padding: 16px 16px 14px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sidebar-header h2 {
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.2px;
          flex: 1;
        }
        .sidebar-header-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }
        .sidebar-admin {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-admin:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .sidebar-disconnect {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-disconnect:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .sidebar-section {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
        }
        .sidebar-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          margin-bottom: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .sidebar-section-header.dm-header {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }
        .sidebar-add {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .sidebar-add:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .channel-list {
          list-style: none;
        }
        .channel-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 16px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: background var(--transition-fast), color var(--transition-fast);
          font-size: 14px;
          margin: 1px 8px;
          border-radius: var(--radius-sm);
        }
        .channel-item:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .channel-item.active {
          background: var(--accent-dim);
          color: var(--accent);
          font-weight: 500;
        }
        .channel-item.drag-over {
          border-top: 2px solid var(--accent);
          padding-top: 4px;
        }
        .channel-item.active .channel-icon {
          color: var(--accent);
          opacity: 1;
        }
        .channel-icon {
          flex-shrink: 0;
          opacity: 0.7;
        }
        .channel-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 450;
        }
        .channel-count {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 500;
        }
        .channel-muted-icon {
          color: var(--text-muted);
          opacity: 0.5;
          flex-shrink: 0;
        }
        .channel-mute-btn {
          opacity: 0;
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .channel-item:hover .channel-mute-btn {
          opacity: 1;
        }
        .channel-mute-btn:hover {
          color: var(--accent);
        }
        .channel-delete {
          opacity: 0;
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .channel-item:hover .channel-delete {
          opacity: 1;
        }
        .channel-delete:hover {
          color: var(--danger);
        }
        .channel-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: typingPulse 1.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes typingPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .channel-unread {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          background: var(--accent);
          padding: 1px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
          line-height: 1.5;
          animation: fadeInScale 0.2s ease;
          box-shadow: 0 0 8px rgba(var(--accent-rgb), 0.3);
        }
        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }
        .sidebar-nick {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }
        .sidebar-role {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-muted);
        }
        .sidebar-role[data-role="admin"] { color: var(--role-admin); }
        .sidebar-role[data-role="operator"] { color: var(--role-operator); }
      `})]})}function m0({position:e,messageId:t,content:n,isOwn:r,canModerate:s,isBookmarked:a,onClose:o,onReply:c,onReact:u,onEdit:f,onDelete:m,onPin:b,onBookmark:x,onCopyText:N,onQuote:w,onForward:C}){const{t:L}=Ge(),k=y.useRef(null);y.useEffect(()=>{const I=_=>{k.current&&!k.current.contains(_.target)&&o()},D=_=>{_.key==="Escape"&&o()};return document.addEventListener("mousedown",I),document.addEventListener("keydown",D),()=>{document.removeEventListener("mousedown",I),document.removeEventListener("keydown",D)}},[o]);const v={position:"fixed",left:e.x,top:e.y,zIndex:300},z=()=>{navigator.clipboard.writeText(n),o()},E=()=>{w==null||w(),o()};return i.jsxs("div",{className:"ctx-menu",ref:k,style:v,children:[i.jsxs("button",{className:"ctx-item",onClick:()=>{c==null||c(t),o()},children:[i.jsx(Ml,{size:14}),i.jsx("span",{children:L("ctx.reply")})]}),i.jsxs("button",{className:"ctx-item",onClick:()=>{u==null||u(),o()},children:[i.jsx(qi,{size:14}),i.jsx("span",{children:L("ctx.react")})]}),i.jsxs("button",{className:"ctx-item",onClick:z,children:[i.jsx(Rp,{size:14}),i.jsx("span",{children:L("ctx.copy")})]}),i.jsxs("button",{className:"ctx-item",onClick:E,children:[i.jsx(Jx,{size:14}),i.jsx("span",{children:L("ctx.quote")})]}),C&&i.jsxs("button",{className:"ctx-item",onClick:()=>{C(t),o()},children:[i.jsx(Ap,{size:14}),i.jsx("span",{children:L("forward.title")})]}),x&&i.jsxs("button",{className:`ctx-item ${a?"active":""}`,onClick:()=>{x(t),o()},children:[i.jsx(fa,{size:14}),i.jsx("span",{children:L(a?"bookmarks.remove":"ctx.bookmark")})]}),r&&f&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"ctx-sep"}),i.jsxs("button",{className:"ctx-item",onClick:()=>{f(t),o()},children:[i.jsx(Bp,{size:14}),i.jsx("span",{children:L("ctx.edit")})]})]}),s&&b&&i.jsxs("button",{className:"ctx-item",onClick:()=>{b(t),o()},children:[i.jsx(ys,{size:14}),i.jsx("span",{children:L("ctx.pin")})]}),(r||s)&&m&&i.jsxs("button",{className:"ctx-item danger",onClick:()=>{m(t),o()},children:[i.jsx(jr,{size:14}),i.jsx("span",{children:L("ctx.delete")})]}),i.jsx("style",{children:`
        .ctx-menu {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 4px;
          min-width: 180px;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
        }
        .ctx-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          width: 100%;
          text-align: left;
          font-size: 13px;
          font-weight: 450;
          color: var(--text-primary);
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast), padding-left var(--transition-fast);
        }
        .ctx-item:hover {
          background: var(--bg-tertiary);
          padding-left: 14px;
        }
        .ctx-item.active {
          color: var(--accent);
        }
        .ctx-item.danger {
          color: var(--danger);
        }
        .ctx-item.danger:hover {
          background: var(--danger-dim);
        }
        .ctx-sep {
          height: 1px;
          background: var(--border);
          margin: 4px 8px;
        }
      `})]})}function g0(e){try{return new URL(e).hostname.replace("www.","")}catch{return e}}function x0(e){try{const t=new URL(e),n=t.pathname+t.search;return n.length>60?n.slice(0,57)+"...":n}catch{return""}}function v0(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}function y0({url:e}){const t=g0(e),n=x0(e),r=v0(e);return i.jsxs("a",{href:e,target:"_blank",rel:"noopener noreferrer",className:"link-preview",children:[i.jsx("div",{className:"link-preview-favicon",children:r?i.jsx("img",{src:r,alt:"",width:16,height:16,onError:s=>{s.target.style.display="none"}}):i.jsx(Up,{size:14})}),i.jsxs("div",{className:"link-preview-info",children:[i.jsx("span",{className:"link-preview-domain",children:t}),n&&n!=="/"&&i.jsx("span",{className:"link-preview-path",children:n})]}),i.jsx(Lc,{size:12,className:"link-preview-ext"}),i.jsx("style",{children:`
        .link-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius);
          text-decoration: none;
          max-width: 400px;
          transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .link-preview:hover {
          background: var(--bg-hover);
          border-color: var(--accent);
          transform: translateX(2px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .link-preview-favicon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-muted);
          border-radius: 4px;
          background: var(--bg-secondary);
          padding: 2px;
        }
        .link-preview-favicon img {
          border-radius: 2px;
        }
        .link-preview-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .link-preview-domain {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .link-preview-path {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .link-preview-ext {
          flex-shrink: 0;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .link-preview:hover .link-preview-ext {
          opacity: 1;
        }
      `})]})}const Po={keyword:["const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","import","export","from","default","async","await","try","catch","finally","throw","yield","of","in","this","super","static","public","private","protected","interface","type","enum","struct","impl","fn","pub","mod","use","crate","trait","where","mut","ref","self","match","loop","def","elif","pass","lambda","with","as","raise","except","True","False","None","func","go","defer","chan","select","package","range","map"],builtin:["console","window","document","Math","JSON","Array","Object","String","Number","Boolean","Promise","Map","Set","Error","null","undefined","true","false","nil","fmt","println","print","len","append","make"],type:["string","number","boolean","void","any","never","unknown","int","float","double","char","bool","i32","u32","i64","u64","f32","f64","usize","isize","Vec","Option","Result"]};function b0(e){var r,s,a;const t=e.split(`
`),n=[];for(let o=0;o<t.length;o++){const c=t[o],u=[];let f=c,m=0;for(;f.length>0;){const b=f.match(/^(["'`])(?:\\.|[^\\])*?\1/);if(b){u.push(i.jsx("span",{className:"code-string",children:b[0]},m++)),f=f.slice(b[0].length);continue}const x=f.match(/^(\/\/.*|#.*)/);if(x){u.push(i.jsx("span",{className:"code-comment",children:x[0]},m++)),f=f.slice(x[0].length);continue}const N=f.match(/^(0x[0-9a-fA-F]+|\d+\.?\d*)/);if(N&&(u.length===0||!/\w$/.test(((a=(s=(r=u[u.length-1])==null?void 0:r.props)==null?void 0:s.children)==null?void 0:a.toString())||""))){u.push(i.jsx("span",{className:"code-number",children:N[0]},m++)),f=f.slice(N[0].length);continue}const w=f.match(/^[a-zA-Z_]\w*/);if(w){const k=w[0];let v="";Po.keyword.includes(k)?v="code-keyword":Po.builtin.includes(k)?v="code-builtin":Po.type.includes(k)&&(v="code-type"),v?u.push(i.jsx("span",{className:v,children:k},m++)):u.push(i.jsx("span",{children:k},m++)),f=f.slice(k.length);continue}const C=f.match(/^[^\w\s]+/);if(C){u.push(i.jsx("span",{className:"code-punct",children:C[0]},m++)),f=f.slice(C[0].length);continue}const L=f.match(/^\s+/);if(L){u.push(i.jsx("span",{children:L[0]},m++)),f=f.slice(L[0].length);continue}u.push(i.jsx("span",{children:f[0]},m++)),f=f.slice(1)}n.push(i.jsxs("div",{className:"code-line",children:[i.jsx("span",{className:"code-line-number",children:o+1}),i.jsx("span",{className:"code-line-content",children:u})]},o))}return n}function w0({code:e,language:t}){const[n,r]=y.useState(!1),s=()=>{navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3)};return i.jsxs("div",{className:"code-block",children:[i.jsxs("div",{className:"code-block-header",children:[i.jsx("span",{className:"code-block-lang",children:t||"code"}),i.jsxs("button",{className:"code-block-copy",onClick:s,title:"Copy",children:[n?i.jsx(Mc,{size:12}):i.jsx(Rp,{size:12}),i.jsx("span",{children:n?"Copied!":"Copy"})]})]}),i.jsx("pre",{className:"code-block-body",children:i.jsx("code",{children:b0(e)})}),i.jsx("style",{children:`
        .code-block {
          margin-top: 8px;
          margin-bottom: 4px;
          border-radius: var(--radius);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          max-width: 600px;
          animation: fadeIn 0.15s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }
        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-subtle);
        }
        .code-block-lang {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: lowercase;
          font-family: var(--font-mono);
        }
        .code-block-copy {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-muted);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .code-block-copy:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .code-block-body {
          margin: 0;
          padding: 12px 0;
          overflow-x: auto;
          background: var(--bg-primary);
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.6;
        }
        .code-block-body code {
          display: block;
        }
        .code-line {
          display: flex;
          padding: 0 12px;
        }
        .code-line:hover {
          background: var(--bg-secondary);
        }
        .code-line-number {
          width: 32px;
          text-align: right;
          padding-right: 12px;
          color: var(--text-muted);
          opacity: 0.5;
          user-select: none;
          flex-shrink: 0;
          font-size: 11px;
        }
        .code-line-content {
          flex: 1;
          white-space: pre;
        }
        .code-keyword {
          color: #c678dd;
          font-weight: 500;
        }
        .code-builtin {
          color: #61afef;
        }
        .code-type {
          color: #e5c07b;
        }
        .code-string {
          color: #98c379;
        }
        .code-number {
          color: #d19a66;
        }
        .code-comment {
          color: #5c6370;
          font-style: italic;
        }
        .code-punct {
          color: var(--text-muted);
        }
        [data-theme="light"] .code-keyword { color: #a626a4; }
        [data-theme="light"] .code-builtin { color: #4078f2; }
        [data-theme="light"] .code-type { color: #c18401; }
        [data-theme="light"] .code-string { color: #50a14f; }
        [data-theme="light"] .code-number { color: #986801; }
        [data-theme="light"] .code-comment { color: #a0a1a7; }
      `})]})}function Xp(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t)}function k0(e){const t=Xp(e),n=t%360,r=(n+40+(t>>8)%60)%360;return[`hsl(${n}, 65%, 55%)`,`hsl(${r}, 55%, 45%)`]}function j0(e){const t=e.trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,2).toUpperCase()}function S0(e){const t=Xp(e),n=[];for(let r=0;r<9;r++)n.push(t>>r&1);return n}function Gp({userId:e,nickname:t,size:n=32}){const[r,s]=k0(e),a=j0(t),o=S0(e);return i.jsxs("div",{className:"user-avatar",style:{width:n,height:n,minWidth:n,background:`linear-gradient(135deg, ${r}, ${s})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"},title:t,children:[i.jsx("svg",{width:n,height:n,viewBox:"0 0 3 3",style:{position:"absolute",inset:0,opacity:.15},children:o.map((c,u)=>c?i.jsx("rect",{x:u%3,y:Math.floor(u/3),width:1,height:1,fill:"#fff"},u):null)}),i.jsx("span",{style:{fontSize:n*.38,fontWeight:700,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,0.2)",letterSpacing:"-0.5px",position:"relative",zIndex:1},children:a})]})}function Zp(e){const t=e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);if(t)return{type:"youtube",id:t[1]};const n=e.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);return n?{type:"twitter",id:n[1]}:null}function N0({videoId:e}){const t=`https://img.youtube.com/vi/${e}/mqdefault.jpg`;return i.jsxs("a",{href:`https://www.youtube.com/watch?v=${e}`,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-youtube",children:[i.jsxs("div",{className:"rich-embed-thumb",children:[i.jsx("img",{src:t,alt:"YouTube video",loading:"lazy"}),i.jsx("div",{className:"rich-embed-play",children:i.jsx(Yx,{size:20,fill:"#fff"})})]}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsxs("span",{className:"rich-embed-source",children:[i.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#ff0000",children:[i.jsx("path",{d:"M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"}),i.jsx("path",{fill:"#fff",d:"M9.5 15.5V8.5l6.5 3.5z"})]}),i.jsx("span",{children:"YouTube"})]}),i.jsx("span",{className:"rich-embed-id",children:e})]}),i.jsx(Lc,{size:11,className:"rich-embed-ext"})]})}function C0({tweetId:e,url:t}){return i.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-twitter",children:[i.jsx("div",{className:"rich-embed-twitter-icon",children:i.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:i.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsx("span",{className:"rich-embed-source",children:i.jsx("span",{children:"X (Twitter)"})}),i.jsxs("span",{className:"rich-embed-id",children:["Tweet #",e.slice(-6)]})]}),i.jsx(Lc,{size:11,className:"rich-embed-ext"})]})}function E0({url:e}){const t=Zp(e);return t?t.type==="youtube"&&t.id?i.jsx(N0,{videoId:t.id}):t.type==="twitter"&&t.id?i.jsx(C0,{tweetId:t.id,url:e}):null:null}function eh(e){return Zp(e)!==null}const z0=/\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi,Rc=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,Xi=/```(\w*)\n([\s\S]*?)```/g,th=/\bhttps?:\/\/[^\s]+/g;function Xu(e){const t=[];let n=0;const r=/(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\~\~[^~]+\~\~)|(@\w+)|(\b(https?:\/\/[^\s]+))/g;let s=0,a;for(;(a=r.exec(e))!==null;)a.index>s&&t.push(e.slice(s,a.index)),a[1]?t.push(i.jsx("a",{className:"msg-link",href:a[3],target:"_blank",rel:"noopener noreferrer",children:a[2]},n++)):a[4]?t.push(i.jsx("code",{className:"msg-code",children:a[4].slice(1,-1)},n++)):a[5]?t.push(i.jsx("strong",{children:a[5].slice(2,-2)},n++)):a[6]?t.push(i.jsx("em",{children:a[6].slice(1,-1)},n++)):a[7]?t.push(i.jsx("del",{children:a[7].slice(2,-2)},n++)):a[8]?t.push(i.jsx("span",{className:"msg-mention",children:a[8]},n++)):a[10]&&t.push(i.jsx("a",{className:"msg-link",href:a[10],target:"_blank",rel:"noopener noreferrer",children:a[10]},n++)),s=a.index+a[0].length;return s<e.length&&t.push(e.slice(s)),t}function P0(e){return/```[\s\S]*?```/.test(e)}function M0(e){const t=[];let n;const r=/```(\w*)\n([\s\S]*?)```/g;for(;(n=r.exec(e))!==null;)t.push({language:n[1]||"",code:n[2].trimEnd()});return t}function I0(e){return e.replace(Xi,"").trim()}function nh(e){const n=e.replace(Rc,"").replace(Xi,"").match(z0);return n?[...new Set(n)]:[]}function L0(e){const n=e.replace(Rc,"").replace(Xi,"").match(th)||[],r=nh(e);return n.filter(s=>!r.includes(s)&&!eh(s)).slice(0,3)}function T0(e){return(e.replace(Rc,"").replace(Xi,"").match(th)||[]).filter(r=>eh(r)).slice(0,2)}const O0=["👍","❤️","😂","👏","🔥","🤔"];function Ll({id:e,userId:t,nickname:n,content:r,role:s,timestamp:a,isOwn:o,edited:c,reactions:u,currentUserId:f,canModerate:m,onReact:b,onRemoveReact:x,onEdit:N,onDelete:w,onPin:C,onReply:L,onBookmark:k,isBookmarked:v,isPinned:z,replyContext:E,isGrouped:I,onImageClick:D,onQuote:_,onThreadOpen:Q,onForward:Ae}){const{t:pe,i18n:Ke}=Ge(),[pt,kt]=y.useState(!1),[ht,ot]=y.useState(!1),[Xe,xt]=y.useState(r),[W,re]=y.useState(!1),[he,De]=y.useState(null),ve=new Date(a),Ze=new Intl.DateTimeFormat(Ke.language,{hour:"2-digit",minute:"2-digit"}).format(ve),We=new Intl.DateTimeFormat(Ke.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(ve),je=`var(--role-${s})`,et=y.useMemo(()=>M0(r),[r]),Ct=y.useMemo(()=>P0(r)?I0(r):r,[r]),en=y.useMemo(()=>nh(r),[r]),Yt=y.useMemo(()=>L0(r),[r]),Jt=y.useMemo(()=>T0(r),[r]),tn=()=>{Xe.trim()&&Xe!==r&&(N==null||N(e,Xe.trim())),ot(!1)},Ot=me=>{const at=u==null?void 0:u.find(_n=>_n.emoji===me);at!=null&&at.users.includes(f)?x==null||x(e,me):b==null||b(e,me),re(!1)},xn=me=>{me.preventDefault(),De({x:me.clientX,y:me.clientY})};return i.jsxs("div",{className:`message ${o?"own":""} ${I?"grouped":""}`,onMouseEnter:()=>kt(!0),onMouseLeave:()=>{kt(!1),re(!1)},onContextMenu:xn,children:[E&&i.jsxs("div",{className:"message-reply-context",onClick:()=>Q==null?void 0:Q(e),style:Q?{cursor:"pointer"}:void 0,children:[i.jsx(Ml,{size:10,className:"reply-icon"}),i.jsx("span",{className:"reply-context-nick",children:E.nickname}),i.jsx("span",{className:"reply-context-text",children:E.content.slice(0,60)})]}),!I&&i.jsxs("div",{className:"message-header",children:[i.jsx(Gp,{userId:t,nickname:n,size:28}),i.jsx("span",{className:"message-nick",style:{color:je},children:n}),i.jsx("span",{className:"message-time",title:We,children:Ze}),c&&i.jsx("span",{className:"message-edited",children:pe("chat.edited")}),z&&i.jsx(ys,{size:11,className:"message-pin-badge"})]}),I&&pt&&i.jsx("span",{className:"message-time-inline",title:We,children:Ze}),ht?i.jsxs("div",{className:"message-edit-area",children:[i.jsx("input",{className:"message-edit-input",value:Xe,onChange:me=>xt(me.target.value),onKeyDown:me=>{me.key==="Enter"&&tn(),me.key==="Escape"&&ot(!1)},autoFocus:!0}),i.jsx("button",{className:"message-edit-save",onClick:tn,children:"OK"}),i.jsx("button",{className:"message-edit-cancel",onClick:()=>ot(!1),children:"ESC"})]}):i.jsxs(i.Fragment,{children:[Ct&&i.jsx("div",{className:"message-content",children:Ct.split(`
`).map((me,at)=>me.startsWith("> ")?i.jsx("div",{className:"msg-blockquote",children:Xu(me.slice(2))},at):i.jsxs("span",{children:[at>0&&`
`,Xu(me)]},at))}),et.map((me,at)=>i.jsx(w0,{code:me.code,language:me.language},`cb-${at}`)),en.length>0&&i.jsx("div",{className:"message-images",children:en.map((me,at)=>i.jsx("img",{src:me,alt:"",className:"message-img-preview",loading:"lazy",onClick:()=>D?D(me):window.open(me,"_blank")},at))}),Jt.length>0&&i.jsx("div",{className:"message-embeds",children:Jt.map((me,at)=>i.jsx(E0,{url:me},`embed-${at}`))}),Yt.length>0&&i.jsx("div",{className:"message-link-previews",children:Yt.map((me,at)=>i.jsx(y0,{url:me},`lp-${at}`))})]}),u&&u.length>0&&i.jsx("div",{className:"message-reactions",children:u.map(me=>i.jsxs("button",{className:`reaction-chip ${me.users.includes(f)?"own":""}`,onClick:()=>Ot(me.emoji),title:me.users.length.toString(),children:[i.jsx("span",{children:me.emoji}),i.jsx("span",{className:"reaction-count",children:me.users.length})]},me.emoji))}),pt&&!ht&&i.jsxs("div",{className:"message-actions",children:[i.jsx("button",{onClick:()=>L==null?void 0:L(e),title:"Reply",children:i.jsx(Ml,{size:13})}),i.jsx("button",{onClick:()=>re(me=>!me),title:"React",children:i.jsx(qi,{size:13})}),k&&i.jsx("button",{className:v?"action-bookmarked":"",onClick:()=>k(e),title:"Bookmark",children:i.jsx(fa,{size:13})}),o&&i.jsx("button",{onClick:()=>{ot(!0),xt(r)},title:"Edit",children:i.jsx(Bp,{size:13})}),(o||m)&&i.jsx("button",{className:"action-danger",onClick:()=>w==null?void 0:w(e),title:"Delete",children:i.jsx(jr,{size:13})}),m&&i.jsx("button",{onClick:()=>C==null?void 0:C(e),title:"Pin",children:i.jsx(ys,{size:13})})]}),W&&i.jsx("div",{className:"message-react-picker",children:O0.map(me=>i.jsx("button",{onClick:()=>Ot(me),children:me},me))}),he&&i.jsx(m0,{position:he,messageId:e,content:r,isOwn:o,canModerate:m||!1,isBookmarked:v,onClose:()=>De(null),onReply:L,onReact:()=>{re(!0),De(null)},onEdit:o?()=>{ot(!0),xt(r),De(null)}:void 0,onDelete:w,onPin:C,onBookmark:k,onCopyText:()=>{navigator.clipboard.writeText(r),De(null)},onQuote:()=>{_==null||_(r,n),De(null)},onForward:Ae}),i.jsx("style",{children:`
        .message {
          padding: 6px 16px;
          transition: background var(--transition-fast);
          position: relative;
        }
        .message:not(.grouped) {
          padding-top: 10px;
        }
        .message.grouped {
          padding-top: 1px;
          padding-bottom: 1px;
        }
        .message:hover {
          background: var(--bg-secondary);
        }
        .message-reply-context {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 0 4px 12px;
          border-left: 2px solid var(--accent);
          margin-bottom: 3px;
          font-size: 12px;
        }
        .reply-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }
        .reply-context-nick {
          font-weight: 600;
          color: var(--accent);
          flex-shrink: 0;
        }
        .reply-context-text {
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .message.own .message-nick {
          font-weight: 600;
        }
        .message-header {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }
        .message-nick {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.1px;
        }
        .message-time {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 400;
          opacity: 0.8;
        }
        .message-time-inline {
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 9px;
          color: var(--text-muted);
          opacity: 0;
          pointer-events: none;
          font-variant-numeric: tabular-nums;
        }
        .message:hover .message-time-inline {
          opacity: 0.7;
        }
        .message-edited {
          font-size: 10px;
          color: var(--text-muted);
          font-style: italic;
        }
        .message-pin-badge {
          color: var(--accent);
          opacity: 0.6;
          flex-shrink: 0;
        }
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .msg-blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 10px;
          margin: 4px 0;
          color: var(--text-secondary);
          font-style: italic;
          font-size: 13px;
        }
        .message-embeds {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rich-embed {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--danger);
          border-radius: var(--radius);
          text-decoration: none;
          max-width: 360px;
          transition: background var(--transition-fast), transform var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .rich-embed:hover {
          background: var(--bg-hover);
          transform: translateX(2px);
        }
        .rich-embed-youtube { border-left-color: #ff0000; }
        .rich-embed-twitter { border-left-color: #1d9bf0; }
        .rich-embed-thumb {
          position: relative;
          width: 80px;
          height: 45px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
        }
        .rich-embed-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rich-embed-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
          transition: background var(--transition-fast);
        }
        .rich-embed:hover .rich-embed-play {
          background: rgba(0,0,0,0.5);
        }
        .rich-embed-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rich-embed-source {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .rich-embed-id {
          font-size: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .rich-embed-twitter-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-primary);
        }
        .rich-embed-ext {
          flex-shrink: 0;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .rich-embed:hover .rich-embed-ext {
          opacity: 1;
        }
        .msg-code {
          font-family: var(--font-mono);
          font-size: 12px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          color: var(--accent);
        }
        .msg-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 450;
        }
        .msg-link:hover {
          text-decoration: underline;
        }
        .msg-mention {
          color: var(--accent);
          background: var(--accent-dim);
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 500;
          cursor: pointer;
        }
        .msg-mention:hover {
          background: rgba(var(--accent-rgb), 0.15);
        }
        .message-images {
          margin-top: 8px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .message-img-preview {
          max-width: 320px;
          max-height: 220px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          object-fit: cover;
          cursor: pointer;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .message-img-preview:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow-md);
        }
        .message-reactions {
          display: flex;
          gap: 4px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .reaction-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 13px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .reaction-chip:hover {
          background: var(--bg-hover);
          transform: scale(1.05);
        }
        .reaction-chip.own {
          border-color: var(--accent);
          background: var(--accent-dim);
        }
        .reaction-count {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
        }
        .message-actions {
          position: absolute;
          top: -4px;
          right: 16px;
          display: flex;
          gap: 1px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 3px;
          box-shadow: var(--shadow-md);
          animation: fadeIn 0.08s ease;
          z-index: 5;
        }
        .message-actions button {
          padding: 5px 7px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .message-actions button:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .message-actions button.action-danger:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .message-actions button.action-bookmarked {
          color: var(--accent);
        }
        .message-react-picker {
          position: absolute;
          top: -36px;
          right: 16px;
          display: flex;
          gap: 2px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 4px 6px;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
          z-index: 10;
        }
        .message-react-picker button {
          font-size: 18px;
          padding: 4px 5px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .message-react-picker button:hover {
          background: var(--bg-tertiary);
          transform: scale(1.15);
        }
        .message-edit-area {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-top: 4px;
        }
        .message-edit-input {
          flex: 1;
          padding: 6px 10px;
          font-size: 13px;
        }
        .message-edit-save, .message-edit-cancel {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .message-edit-save:hover {
          background: var(--accent);
          color: #fff;
        }
        .message-edit-cancel:hover {
          background: var(--bg-hover);
        }
      `})]})}const Gu=[{key:"smileys",emojis:["😀","😂","🤣","😍","🥰","😘","😎","🤔","🥳","😢","😡","😏","🤗","😴","🥺","😈"]},{key:"gestures",emojis:["👍","👎","👋","🙌","👏","🤝","🙏","💪","🫡","🤙","✌️","🤞","👀","🫶","✋","👊"]},{key:"symbols",emojis:["🔥","❤️","💯","⭐","🎉","🎊","🚀","⚡","✅","❌","💬","💡","🏆","💎","🌟","🎯"]},{key:"objects",emojis:["💻","📱","🎮","🎧","📸","🎬","🔒","🔑","📂","📌","🔔","⏰","🧪","🛠️","📊","🗂️"]}];function R0({onSelect:e,onClose:t}){var c;const{t:n}=Ge(),r=y.useRef(null),[s,a]=y.useState("");y.useEffect(()=>{const u=f=>{r.current&&!r.current.contains(f.target)&&t()};return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[t]);const o=s?[{key:"results",emojis:Gu.flatMap(u=>u.emojis).filter(u=>u.includes(s))}]:Gu;return i.jsxs("div",{ref:r,className:"emoji-picker",children:[i.jsx("input",{className:"emoji-search",type:"text",placeholder:n("chat.searchEmoji")||"Search...",value:s,onChange:u=>a(u.target.value),autoFocus:!0}),i.jsxs("div",{className:"emoji-grid-area",children:[o.map(u=>i.jsxs("div",{className:"emoji-category",children:[!s&&i.jsx("div",{className:"emoji-cat-label",children:n(`emoji.${u.key}`)||u.key}),i.jsx("div",{className:"emoji-grid",children:u.emojis.map(f=>i.jsx("button",{className:"emoji-item",onClick:()=>e(f),children:f},f))})]},u.key)),s&&((c=o[0])==null?void 0:c.emojis.length)===0&&i.jsx("div",{className:"emoji-empty",children:"No emoji found"})]}),i.jsx("style",{children:`
        .emoji-picker {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 10px;
          z-index: 100;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.12s ease;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .emoji-search {
          width: 100%;
          padding: 7px 10px;
          font-size: 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .emoji-search:focus {
          border-color: var(--accent);
        }
        .emoji-search::placeholder {
          color: var(--text-muted);
        }
        .emoji-grid-area {
          max-height: 240px;
          overflow-y: auto;
        }
        .emoji-category {
          margin-bottom: 4px;
        }
        .emoji-cat-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          padding: 4px 4px 2px;
        }
        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
        }
        .emoji-item {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .emoji-item:hover {
          background: var(--bg-tertiary);
          transform: scale(1.2);
        }
        .emoji-item:active {
          transform: scale(0.95);
        }
        .emoji-empty {
          padding: 24px 16px;
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
        }
      `})]})}function _0({users:e,filter:t,onSelect:n,selectedIndex:r}){const s=y.useRef(null),a=e.filter(o=>o.nickname.toLowerCase().startsWith(t.toLowerCase())).slice(0,6);return y.useEffect(()=>{var c;const o=(c=s.current)==null?void 0:c.children[r];o==null||o.scrollIntoView({block:"nearest"})},[r]),a.length===0?null:i.jsxs("div",{className:"mention-suggestions",children:[i.jsx("ul",{ref:s,children:a.map((o,c)=>i.jsxs("li",{className:`mention-item ${c===r?"active":""}`,onMouseDown:u=>{u.preventDefault(),n(o.nickname)},children:[i.jsxs("span",{className:"mention-nick",style:{color:`var(--role-${o.role})`},children:["@",o.nickname]}),i.jsx("span",{className:"mention-role",children:o.role})]},o.userId))}),i.jsx("style",{children:`
        .mention-suggestions {
          position: absolute;
          bottom: calc(100% + 4px);
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          z-index: 80;
          animation: fadeIn 0.1s ease;
          overflow: hidden;
        }
        .mention-suggestions ul {
          list-style: none;
          max-height: 200px;
          overflow-y: auto;
        }
        .mention-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          cursor: pointer;
          transition: background var(--transition-fast), border-color var(--transition-fast);
          border-left: 2px solid transparent;
        }
        .mention-item:hover {
          background: var(--bg-tertiary);
        }
        .mention-item.active {
          background: var(--accent-dim);
          border-left-color: var(--accent);
        }
        .mention-nick {
          font-size: 13px;
          font-weight: 600;
        }
        .mention-role {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 600;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
      `})]})}function D0({onFormat:e}){return i.jsxs("div",{className:"format-toolbar",children:[i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("**"),title:"Bold (Ctrl+B)",children:i.jsx(Cx,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("*"),title:"Italic (Ctrl+I)",children:i.jsx(_x,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("~~"),title:"Strikethrough",children:i.jsx(e0,{size:14})})]}),i.jsx("div",{className:"format-sep"}),i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("`"),title:"Code",children:i.jsx(Mx,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("[","[","](url)"),title:"Link",children:i.jsx(Ax,{size:14})})]}),i.jsx("style",{children:`
        .format-toolbar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 3px 8px;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .format-group {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .format-sep {
          width: 1px;
          height: 14px;
          background: var(--border);
          margin: 0 4px;
          opacity: 0.6;
        }
        .format-btn {
          color: var(--text-muted);
          padding: 5px 7px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .format-btn:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .format-btn:active {
          color: var(--accent);
          transform: scale(0.9);
        }
      `})]})}function A0({onSend:e,onCancel:t}){const{t:n}=Ge(),[r,s]=y.useState(!1),[a,o]=y.useState(0),[c,u]=y.useState(null),[f,m]=y.useState(null),b=y.useRef(null),x=y.useRef([]),N=y.useRef(0),w=y.useRef(0);y.useEffect(()=>(C(),()=>{N.current&&clearInterval(N.current),f&&URL.revokeObjectURL(f)}),[]);const C=async()=>{try{const z=await navigator.mediaDevices.getUserMedia({audio:!0}),E=new MediaRecorder(z,{mimeType:"audio/webm;codecs=opus"});b.current=E,x.current=[],E.ondataavailable=I=>{I.data.size>0&&x.current.push(I.data)},E.onstop=()=>{const I=new Blob(x.current,{type:"audio/webm"});u(I),m(URL.createObjectURL(I)),z.getTracks().forEach(D=>D.stop())},E.start(100),s(!0),w.current=Date.now(),N.current=window.setInterval(()=>{o(Math.floor((Date.now()-w.current)/1e3))},200)}catch{t()}},L=()=>{b.current&&r&&(b.current.stop(),s(!1),N.current&&clearInterval(N.current))},k=()=>{c&&e(c,a)},v=z=>{const E=Math.floor(z/60),I=z%60;return`${E}:${I.toString().padStart(2,"0")}`};return i.jsxs("div",{className:"voice-recorder",children:[i.jsxs("div",{className:"voice-recorder-indicator",children:[r&&i.jsx("span",{className:"voice-rec-dot"}),i.jsx("span",{className:"voice-rec-time",children:v(a)})]}),r&&i.jsx("div",{className:"voice-recorder-wave",children:Array.from({length:5}).map((z,E)=>i.jsx("span",{className:"voice-wave-bar",style:{animationDelay:`${E*.1}s`}},E))}),f&&!r&&i.jsx("audio",{className:"voice-recorder-preview",src:f,controls:!0}),i.jsxs("div",{className:"voice-recorder-actions",children:[r?i.jsx("button",{className:"voice-btn voice-stop",onClick:L,title:n("voice.stop"),children:i.jsx(Gx,{size:14})}):c?i.jsx("button",{className:"voice-btn voice-send",onClick:k,title:n("voice.send"),children:i.jsx(Qi,{size:14})}):i.jsx(pa,{size:14,className:"voice-loading"}),i.jsx("button",{className:"voice-btn voice-cancel",onClick:t,title:n("voice.cancel"),children:i.jsx(Tt,{size:14})})]}),i.jsx("style",{children:`
        .voice-recorder {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          animation: fadeIn 0.15s ease;
          box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .voice-recorder-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .voice-rec-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
          animation: recPulse 1s ease-in-out infinite;
        }
        @keyframes recPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .voice-rec-time {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--text-primary);
          min-width: 36px;
        }
        .voice-recorder-wave {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 20px;
        }
        .voice-wave-bar {
          width: 3px;
          height: 100%;
          border-radius: 2px;
          background: var(--accent);
          animation: waveBar 0.8s ease-in-out infinite alternate;
          opacity: 0.8;
        }
        .voice-wave-bar:nth-child(1) { animation-duration: 0.6s; height: 60%; }
        .voice-wave-bar:nth-child(2) { animation-duration: 0.9s; height: 90%; }
        .voice-wave-bar:nth-child(3) { animation-duration: 0.7s; height: 100%; }
        .voice-wave-bar:nth-child(4) { animation-duration: 1.0s; height: 75%; }
        .voice-wave-bar:nth-child(5) { animation-duration: 0.65s; height: 50%; }
        @keyframes waveBar {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        .voice-recorder-preview {
          height: 28px;
          flex: 1;
          max-width: 200px;
        }
        .voice-recorder-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: auto;
        }
        .voice-btn {
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          transition: all var(--transition-fast);
        }
        .voice-stop {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .voice-stop:hover {
          background: var(--danger);
          color: #fff;
        }
        .voice-send {
          color: #fff;
          background: var(--accent);
        }
        .voice-send:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .voice-cancel {
          color: var(--text-muted);
        }
        .voice-cancel:hover {
          color: var(--text-primary);
          background: var(--bg-secondary);
        }
        .voice-loading {
          animation: spin 1s linear infinite;
          color: var(--text-muted);
        }
      `})]})}function U0(e,t){const n=new Date(e),r=new Date,s=new Date(r.getFullYear(),r.getMonth(),r.getDate()),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()),o=(s.getTime()-a.getTime())/864e5;return o===0?t("chat.today"):o===1?t("chat.yesterday"):n.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}function F0({messages:e,activeChannel:t,channelTopic:n,currentUserId:r,currentRole:s,typingUsers:a,dmMode:o,onSendMessage:c,onSlashCommand:u,onTyping:f,onSearchOpen:m,onReact:b,onRemoveReact:x,onEdit:N,onDelete:w,onPin:C,onReply:L,replyTo:k,onCancelReply:v,onLoadHistory:z,historyLoading:E,hasMoreHistory:I,onFileUpload:D,canUpload:_,users:Q,onPinsOpen:Ae,onBookmarksOpen:pe,onBookmark:Ke,isBookmarked:pt,onChannelSettings:kt,onImageClick:ht,lastReadMessageId:ot,pinnedMessageIds:Xe,onQuote:xt,quotedText:W,onQuoteClear:re,onThreadOpen:he,onForward:De}){const{t:ve}=Ge(),[Ze,We]=y.useState(""),[je,et]=y.useState(!1),[Ct,en]=y.useState(null),[Yt,Jt]=y.useState(0),[tn,Ot]=y.useState(!1),[xn,me]=y.useState(0),[at,_n]=y.useState(null),[ar,nn]=y.useState(!1),Rt=y.useRef(null),rn=y.useRef(null),Dn=y.useRef(0),An=y.useRef(null),Un=y.useRef(0),$t=y.useRef(!1),vn=y.useRef(0);y.useEffect(()=>{W&&(We(W),re==null||re())},[W,re]);const rt=e.filter(H=>H.channel===t),Yn=y.useCallback(()=>{const H=rn.current;if(!H)return;const q=H.scrollHeight-H.scrollTop-H.clientHeight;Ot(q>80),q<=80&&me(0);const Je=H.querySelectorAll(".chat-date-separator");let tt=null;for(let Cn=Je.length-1;Cn>=0;Cn--){const Et=Je[Cn].getBoundingClientRect(),sn=H.getBoundingClientRect();if(Et.top<=sn.top+10){tt=Je[Cn].textContent||null;break}}_n(q>80?tt:null),!(E||!I||!z||$t.current)&&H.scrollTop<100&&rt.length>0&&($t.current=!0,Un.current=H.scrollHeight,z(t,rt[0].timestamp))},[t,rt,E,I,z]);y.useEffect(()=>{if($t.current&&!E){$t.current=!1;const H=rn.current;if(H){const q=H.scrollHeight;H.scrollTop=q-Un.current}}},[E,rt.length]);const Nn=y.useCallback(()=>{var H;(H=An.current)==null||H.click()},[]),Jn=y.useCallback(H=>{var Je;const q=(Je=H.target.files)==null?void 0:Je[0];q&&D&&D(q),H.target.value=""},[D]),G=y.useMemo(()=>{const H=[];let q="";for(const Je of rt){const tt=new Date(Je.timestamp).toDateString();tt!==q&&(q=tt,H.push({type:"separator",date:U0(Je.timestamp,ve),key:`sep-${tt}`})),H.push(Je)}return H},[rt,ve]);y.useEffect(()=>{var H;rt.length>vn.current&&(tn?me(q=>q+(rt.length-vn.current)):(H=Rt.current)==null||H.scrollIntoView({behavior:"smooth"})),vn.current=rt.length},[rt.length,tn]);const U=()=>{const H=Ze.trim();if(H){if(H.startsWith("/")&&u){const q=H.slice(1).split(/\s+/);u(q[0],q.slice(1))}else c(t,H);We("")}},X=H=>{We(H);const q=H.length,tt=H.slice(0,q).match(/@(\w*)$/);tt&&Q&&Q.length>0?(en(tt[1]),Jt(0)):en(null)},ye=H=>{const q=/@(\w*)$/;We(Je=>Je.replace(q,`@${H} `)),en(null)},st=y.useCallback((H,q,Je)=>{We(q&&Je?tt=>tt+q+"text"+Je:tt=>tt+H+"text"+H)},[]),S=H=>{if(Ct!==null){if(H.key==="ArrowDown"){H.preventDefault(),Jt(q=>q+1);return}if(H.key==="ArrowUp"){H.preventDefault(),Jt(q=>Math.max(0,q-1));return}if(H.key==="Tab"||H.key==="Enter"){H.preventDefault();const q=(Q||[]).filter(tt=>tt.nickname.toLowerCase().startsWith((Ct||"").toLowerCase())).slice(0,6),Je=Yt%Math.max(q.length,1);q[Je]&&ye(q[Je].nickname);return}if(H.key==="Escape"){en(null);return}}if(H.key==="Enter"&&!H.shiftKey){H.preventDefault(),U();return}f&&Date.now()-Dn.current>2e3&&(Dn.current=Date.now(),f())},ge=y.useCallback(H=>{We(q=>q+H),et(!1)},[]),we=a.filter(H=>o?H.targetId===r&&H.userId===o.peerId:H.channel===t&&H.userId!==r),be=we.length>0?we.length===1?ve("chat.typing",{name:we[0].nickname}):ve("chat.typingMultiple",{count:we.length}):null;return i.jsxs("div",{className:"chat-panel",children:[i.jsxs("div",{className:"chat-header",children:[i.jsx("span",{className:"chat-channel-name",onClick:o?void 0:kt,style:o?void 0:{cursor:"pointer"},children:o?`@ ${o.peerNick}`:`# ${t}`}),!o&&n&&i.jsx("span",{className:"chat-topic",onClick:kt,style:{cursor:"pointer"},children:n}),i.jsxs("div",{className:"chat-header-actions",children:[Ae&&i.jsx("button",{className:"chat-header-btn",onClick:Ae,title:ve("pins.title"),children:i.jsx(ys,{size:15})}),pe&&i.jsx("button",{className:"chat-header-btn",onClick:pe,title:ve("bookmarks.title"),children:i.jsx(fa,{size:15})}),m&&i.jsx("button",{className:"chat-header-btn",onClick:m,title:ve("search.title"),children:i.jsx(Il,{size:15})})]})]}),i.jsxs("div",{className:"chat-messages",ref:rn,onScroll:Yn,children:[at&&i.jsx("div",{className:"chat-sticky-date",children:i.jsx("span",{children:at})}),E&&i.jsxs("div",{className:"chat-history-loading",children:[i.jsx(pa,{size:14,className:"spinner"}),i.jsx("span",{children:ve("chat.loadingHistory")})]}),!E&&I===!1&&rt.length>0&&i.jsx("div",{className:"chat-history-end",children:ve("chat.historyStart")}),rt.length===0&&i.jsxs("div",{className:"chat-empty",children:[i.jsx("div",{className:"chat-empty-icon",children:"��"}),i.jsx("span",{children:ve("chat.noMessages")})]}),G.map(H=>{if("type"in H&&H.type==="separator")return i.jsx("div",{className:"chat-date-separator",children:i.jsx("span",{children:H.date})},H.key);const q=H,Je=s==="admin"||s==="operator",tt=q.replyTo?rt.find(zr=>zr.id===q.replyTo):void 0,Cn=rt.indexOf(q),Et=Cn>0?rt[Cn-1]:void 0,sn=Et!==void 0&&Et.userId===q.userId&&q.timestamp-Et.timestamp<12e4&&!q.replyTo,Fn=ot&&(Et==null?void 0:Et.id)===ot&&q.userId!==r,Er=q.replyTo&&he;return i.jsxs("div",{children:[Fn&&i.jsx("div",{className:"chat-unread-marker",children:i.jsx("span",{children:ve("chat.newMessages")})}),i.jsx(Ll,{id:q.id,userId:q.userId,nickname:q.nickname,content:q.content,role:q.role,timestamp:q.timestamp,isOwn:q.userId===r,edited:q.edited,reactions:q.reactions,currentUserId:r,canModerate:Je,onReact:b,onRemoveReact:x,onEdit:N,onDelete:w,onPin:C,onReply:L,onBookmark:Ke,isBookmarked:pt==null?void 0:pt(q.id),isPinned:Xe==null?void 0:Xe.includes(q.id),replyContext:tt?{nickname:tt.nickname,content:tt.content}:void 0,isGrouped:sn,onImageClick:ht,onQuote:xt,onThreadOpen:Er?()=>he(q.replyTo):void 0,onForward:De})]},q.id)}),i.jsx("div",{ref:Rt})]}),tn&&i.jsxs("button",{className:"scroll-to-bottom",onClick:()=>{var H;(H=Rt.current)==null||H.scrollIntoView({behavior:"smooth"}),Ot(!1),me(0)},children:[i.jsx(kx,{size:14}),xn>0&&i.jsx("span",{className:"scroll-badge",children:xn})]}),be&&i.jsxs("div",{className:"chat-typing",children:[i.jsxs("span",{className:"typing-dots",children:[i.jsx("span",{}),i.jsx("span",{}),i.jsx("span",{})]}),be]}),k&&i.jsxs("div",{className:"chat-reply-preview",children:[i.jsxs("span",{className:"reply-label",children:[ve("chat.replyingTo")," ",i.jsx("strong",{children:k.nickname})]}),i.jsx("span",{className:"reply-content",children:k.content.slice(0,80)}),i.jsx("button",{className:"reply-cancel",onClick:v,title:"Cancel",children:i.jsx("span",{children:"×"})})]}),ar&&i.jsx("div",{className:"chat-voice-area",children:i.jsx(A0,{onSend:(H,q)=>{const Je=new File([H],`voice-${Date.now()}.webm`,{type:"audio/webm"});D==null||D(Je),nn(!1)},onCancel:()=>nn(!1)})}),i.jsx(D0,{onFormat:st}),i.jsxs("div",{className:"chat-input-area",children:[_&&D&&i.jsxs(i.Fragment,{children:[i.jsx("button",{className:"chat-upload-btn",onClick:Nn,title:ve("files.upload"),children:i.jsx(ha,{size:18})}),i.jsx("input",{ref:An,type:"file",style:{display:"none"},onChange:Jn})]}),i.jsxs("div",{className:"chat-input-wrapper",children:[Ct!==null&&Q&&i.jsx(_0,{users:Q,filter:Ct,onSelect:ye,selectedIndex:Yt}),i.jsx("textarea",{className:"chat-input",value:Ze,onChange:H=>X(H.target.value),onKeyDown:S,placeholder:o?ve("chat.dmPlaceholder",{name:o.peerNick}):ve("chat.placeholder"),rows:1}),i.jsx("button",{className:"emoji-btn",onClick:()=>et(H=>!H),title:"Emoji",children:i.jsx(qi,{size:18})}),je&&i.jsx(R0,{onSelect:ge,onClose:()=>et(!1)})]}),!Ze.trim()&&_?i.jsx("button",{className:"chat-mic-btn",onClick:()=>nn(!0),title:ve("voice.record"),children:i.jsx(Hx,{size:18})}):i.jsx("button",{className:"chat-send-btn",onClick:U,disabled:!Ze.trim(),children:i.jsx(Qi,{size:18})})]}),i.jsx("style",{children:`
        .chat-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-width: 0;
          position: relative;
        }
        .chat-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-header-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .chat-header-btn {
          color: var(--text-muted);
          padding: 5px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .chat-header-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .chat-channel-name {
          font-size: 15px;
          font-weight: 600;
        }
        .chat-topic {
          font-size: 13px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
        }
        .chat-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--text-muted);
          font-size: 14px;
          gap: 8px;
          animation: fadeIn 0.3s ease;
        }
        .chat-empty-icon {
          font-size: 40px;
          opacity: 0.4;
          margin-bottom: 4px;
        }
        .chat-typing {
          padding: 4px 16px;
          font-size: 12px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          animation: fadeIn 0.15s ease;
        }
        .typing-dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
        }
        .typing-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: typingBounce 1.4s ease-in-out infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-reply-preview {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--bg-tertiary);
          border-left: 3px solid var(--accent);
          font-size: 12px;
          color: var(--text-secondary);
          animation: fadeIn 0.1s ease;
        }
        .reply-label {
          white-space: nowrap;
        }
        .reply-content {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-muted);
        }
        .reply-cancel {
          color: var(--text-muted);
          font-size: 16px;
          padding: 2px 6px;
          line-height: 1;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .reply-cancel:hover {
          color: var(--danger);
          background: var(--danger-dim);
        }
        .chat-input-area {
          padding: 12px 16px;
          display: flex;
          gap: 8px;
        }
        .chat-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .chat-input {
          flex: 1;
          padding: 10px 38px 10px 14px;
          resize: none;
          min-height: 38px;
          max-height: 120px;
          overflow-y: auto;
          line-height: 1.4;
          font-family: inherit;
          font-size: inherit;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus {
          border-color: var(--accent);
        }
        .chat-input::placeholder {
          color: var(--text-muted);
        }
        .emoji-btn {
          position: absolute;
          right: 8px;
          color: var(--text-muted);
          padding: 2px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .emoji-btn:hover {
          color: var(--accent);
        }
        .chat-send-btn {
          background: var(--accent);
          color: var(--bg-primary);
          padding: 8px 12px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .chat-send-btn:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0);
        }
        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .chat-date-separator {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin: 4px 0;
          gap: 12px;
        }
        .chat-date-separator::before,
        .chat-date-separator::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .chat-date-separator span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .chat-history-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .chat-history-loading .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .chat-history-end {
          text-align: center;
          padding: 16px 16px 8px;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }
        .chat-history-end::before,
        .chat-history-end::after {
          content: "";
          width: 24px;
          height: 1px;
          background: var(--border);
        }
        .chat-voice-area {
          padding: 8px 16px 0;
        }
        .chat-mic-btn {
          padding: 8px 12px;
          color: var(--text-muted);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          transition: color var(--transition-normal), background var(--transition-fast), transform var(--transition-fast);
        }
        .chat-mic-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
          transform: translateY(-1px);
        }
        .chat-upload-btn {
          padding: 8px;
          color: var(--text-muted);
          border-radius: var(--radius);
          transition: color var(--transition-normal), transform var(--transition-fast);
        }
        .chat-upload-btn:hover {
          color: var(--accent);
          transform: translateY(-1px);
        }
        .chat-upload-btn:active {
          transform: translateY(0);
        }
        .scroll-to-bottom {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-md);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background var(--transition-fast), box-shadow var(--transition-fast);
          animation: fadeIn 0.15s ease;
          z-index: 10;
        }
        .scroll-to-bottom:hover {
          background: var(--bg-tertiary);
          box-shadow: var(--shadow-lg);
        }
        .scroll-badge {
          background: var(--accent);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }
        .chat-sticky-date {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          justify-content: center;
          padding: 6px 0;
          pointer-events: none;
        }
        .chat-sticky-date span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 3px 12px;
          box-shadow: var(--shadow-sm);
          animation: fadeIn 0.15s ease;
        }
        .chat-unread-marker {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          margin: 4px 0;
          gap: 12px;
        }
        .chat-unread-marker::before,
        .chat-unread-marker::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--danger);
          opacity: 0.5;
        }
        .chat-unread-marker span {
          font-size: 10px;
          font-weight: 700;
          color: var(--danger);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
      `})]})}function $0({role:e}){switch(e){case"admin":return i.jsx(Yp,{size:11,style:{color:"var(--role-admin)"}});case"operator":return i.jsx(Wp,{size:11,style:{color:"var(--role-operator)"}});case"guest":return i.jsx(Ix,{size:11,style:{color:"var(--role-guest)"}});default:return i.jsx(r0,{size:11,style:{color:"var(--role-member)"}})}}function B0({users:e,currentUserId:t,currentRole:n,onKick:r,onBan:s,onOp:a,onDeop:o,onDM:c}){const{t:u}=Ge(),[f,m]=y.useState(null),[b,x]=y.useState({x:0,y:0}),N=y.useRef(null),w=n==="admin"||n==="operator";y.useEffect(()=>{const v=z=>{N.current&&!N.current.contains(z.target)&&m(null)};return document.addEventListener("mousedown",v),()=>document.removeEventListener("mousedown",v)},[]);const C=(v,z)=>{if(v===t)return;const E=z.target.getBoundingClientRect();x({x:E.left,y:E.bottom+4}),m(v===f?null:v)},L=[...e].sort((v,z)=>{var _,Q;const E={admin:0,operator:1,member:2,guest:3},I=(_=E[v.role])!=null?_:4,D=(Q=E[z.role])!=null?Q:4;return I!==D?I-D:v.nickname.localeCompare(z.nickname)}),k=e.find(v=>v.userId===f);return i.jsxs("aside",{className:"user-list",children:[i.jsxs("div",{className:"user-list-header",children:[i.jsx("span",{children:u("users.title")}),i.jsx("span",{className:"user-count",children:e.length})]}),i.jsx("ul",{className:"user-entries",children:L.map(v=>i.jsxs("li",{className:`user-entry ${v.userId!==t?"clickable":""} ${v.userId===t?"self":""}`,onClick:z=>C(v.userId,z),children:[i.jsxs("div",{className:"user-entry-avatar",children:[i.jsx(Gp,{userId:v.userId,nickname:v.nickname,size:22}),i.jsx(qp,{status:v.status})]}),i.jsx($0,{role:v.role}),i.jsx("span",{className:"user-nick",style:{color:`var(--role-${v.role})`},children:v.nickname})]},`${v.userId}-${v.nickname}`))}),f&&k&&i.jsxs("div",{ref:N,className:"user-menu",style:{position:"fixed",left:b.x,top:b.y},children:[i.jsxs("div",{className:"user-menu-header",children:[i.jsx("span",{className:"user-menu-nick",children:k.nickname}),i.jsx("span",{className:"user-menu-role",style:{color:`var(--role-${k.role})`},children:u(`roles.${k.role}`)})]}),i.jsxs("div",{className:"user-menu-pubkey",title:k.userId,children:[k.userId.slice(0,16),"..."]}),i.jsxs("div",{className:"user-menu-actions",children:[i.jsx("button",{onClick:()=>{c==null||c(f),m(null)},children:u("users.sendDM")}),w&&k.role!=="operator"&&i.jsx("button",{onClick:()=>{a==null||a(f),m(null)},children:u("roles.operator")}),w&&k.role==="operator"&&i.jsx("button",{onClick:()=>{o==null||o(f),m(null)},children:u("roles.member")}),w&&i.jsx("button",{onClick:()=>{r==null||r(f),m(null)},children:"Kick"}),w&&i.jsx("button",{className:"danger",onClick:()=>{s==null||s(f),m(null)},children:"Ban"})]})]}),i.jsx("style",{children:`
        .user-list {
          width: 200px;
          min-width: 200px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--border-subtle);
        }
        .user-list-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .user-list-header span:first-child {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .user-count {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-tertiary);
          padding: 1px 7px;
          border-radius: 10px;
        }
        .user-entries {
          list-style: none;
          overflow-y: auto;
          flex: 1;
          padding: 6px 0;
        }
        .user-entry {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 12px;
          font-size: 13px;
          margin: 1px 6px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .user-entry-avatar {
          position: relative;
          flex-shrink: 0;
        }
        .user-entry-avatar .status-dot {
          position: absolute;
          bottom: -1px;
          right: -1px;
          border: 1.5px solid var(--bg-secondary);
          border-radius: 50%;
        }
        .user-nick {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 450;
        }
        .user-entry.clickable {
          cursor: pointer;
        }
        .user-entry.clickable:hover {
          background: var(--bg-tertiary);
        }
        .user-entry.self {
          opacity: 0.7;
        }
        .user-menu {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 6px;
          min-width: 160px;
          z-index: 200;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.1s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .user-menu-header {
          padding: 8px 10px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .user-menu-nick {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .user-menu-role {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .user-menu-pubkey {
          padding: 2px 10px 8px;
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .user-menu-actions {
          padding-top: 4px;
        }
        .user-menu-actions button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 7px 10px;
          font-size: 13px;
          font-weight: 450;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: background var(--transition-fast);
        }
        .user-menu-actions button:hover {
          background: var(--bg-tertiary);
        }
        .user-menu-actions button.danger {
          color: var(--danger);
        }
        .user-menu-actions button.danger:hover {
          background: var(--danger-dim);
        }
      `})]})}function H0(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var rh={exports:{}};const V0={},K0=Object.freeze(Object.defineProperty({__proto__:null,default:V0},Symbol.toStringTag,{value:"Module"})),W0=Ph(K0);(function(e){(function(t){var n=function(d){var h,p=new Float64Array(16);if(d)for(h=0;h<d.length;h++)p[h]=d[h];return p},r=function(){throw new Error("no PRNG")},s=new Uint8Array(16),a=new Uint8Array(32);a[0]=9;var o=n(),c=n([1]),u=n([56129,1]),f=n([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=n([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),b=n([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),x=n([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),N=n([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function w(d,h,p,l){d[h]=p>>24&255,d[h+1]=p>>16&255,d[h+2]=p>>8&255,d[h+3]=p&255,d[h+4]=l>>24&255,d[h+5]=l>>16&255,d[h+6]=l>>8&255,d[h+7]=l&255}function C(d,h,p,l,g){var P,M=0;for(P=0;P<g;P++)M|=d[h+P]^p[l+P];return(1&M-1>>>8)-1}function L(d,h,p,l){return C(d,h,p,l,16)}function k(d,h,p,l){return C(d,h,p,l,32)}function v(d,h,p,l){for(var g=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,M=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,$=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Y=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,ue=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Be=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,ke=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,Se=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Le=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,ze=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Ne=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ee=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ce=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,ie=g,fe=P,ne=M,oe=$,ce=Y,Z=ue,O=te,R=Be,V=se,A=ke,F=Se,K=Le,xe=ze,Pe=Ne,Te=Ee,Me=Ce,j,_e=0;_e<20;_e+=2)j=ie+xe|0,ce^=j<<7|j>>>25,j=ce+ie|0,V^=j<<9|j>>>23,j=V+ce|0,xe^=j<<13|j>>>19,j=xe+V|0,ie^=j<<18|j>>>14,j=Z+fe|0,A^=j<<7|j>>>25,j=A+Z|0,Pe^=j<<9|j>>>23,j=Pe+A|0,fe^=j<<13|j>>>19,j=fe+Pe|0,Z^=j<<18|j>>>14,j=F+O|0,Te^=j<<7|j>>>25,j=Te+F|0,ne^=j<<9|j>>>23,j=ne+Te|0,O^=j<<13|j>>>19,j=O+ne|0,F^=j<<18|j>>>14,j=Me+K|0,oe^=j<<7|j>>>25,j=oe+Me|0,R^=j<<9|j>>>23,j=R+oe|0,K^=j<<13|j>>>19,j=K+R|0,Me^=j<<18|j>>>14,j=ie+oe|0,fe^=j<<7|j>>>25,j=fe+ie|0,ne^=j<<9|j>>>23,j=ne+fe|0,oe^=j<<13|j>>>19,j=oe+ne|0,ie^=j<<18|j>>>14,j=Z+ce|0,O^=j<<7|j>>>25,j=O+Z|0,R^=j<<9|j>>>23,j=R+O|0,ce^=j<<13|j>>>19,j=ce+R|0,Z^=j<<18|j>>>14,j=F+A|0,K^=j<<7|j>>>25,j=K+F|0,V^=j<<9|j>>>23,j=V+K|0,A^=j<<13|j>>>19,j=A+V|0,F^=j<<18|j>>>14,j=Me+Te|0,xe^=j<<7|j>>>25,j=xe+Me|0,Pe^=j<<9|j>>>23,j=Pe+xe|0,Te^=j<<13|j>>>19,j=Te+Pe|0,Me^=j<<18|j>>>14;ie=ie+g|0,fe=fe+P|0,ne=ne+M|0,oe=oe+$|0,ce=ce+Y|0,Z=Z+ue|0,O=O+te|0,R=R+Be|0,V=V+se|0,A=A+ke|0,F=F+Se|0,K=K+Le|0,xe=xe+ze|0,Pe=Pe+Ne|0,Te=Te+Ee|0,Me=Me+Ce|0,d[0]=ie>>>0&255,d[1]=ie>>>8&255,d[2]=ie>>>16&255,d[3]=ie>>>24&255,d[4]=fe>>>0&255,d[5]=fe>>>8&255,d[6]=fe>>>16&255,d[7]=fe>>>24&255,d[8]=ne>>>0&255,d[9]=ne>>>8&255,d[10]=ne>>>16&255,d[11]=ne>>>24&255,d[12]=oe>>>0&255,d[13]=oe>>>8&255,d[14]=oe>>>16&255,d[15]=oe>>>24&255,d[16]=ce>>>0&255,d[17]=ce>>>8&255,d[18]=ce>>>16&255,d[19]=ce>>>24&255,d[20]=Z>>>0&255,d[21]=Z>>>8&255,d[22]=Z>>>16&255,d[23]=Z>>>24&255,d[24]=O>>>0&255,d[25]=O>>>8&255,d[26]=O>>>16&255,d[27]=O>>>24&255,d[28]=R>>>0&255,d[29]=R>>>8&255,d[30]=R>>>16&255,d[31]=R>>>24&255,d[32]=V>>>0&255,d[33]=V>>>8&255,d[34]=V>>>16&255,d[35]=V>>>24&255,d[36]=A>>>0&255,d[37]=A>>>8&255,d[38]=A>>>16&255,d[39]=A>>>24&255,d[40]=F>>>0&255,d[41]=F>>>8&255,d[42]=F>>>16&255,d[43]=F>>>24&255,d[44]=K>>>0&255,d[45]=K>>>8&255,d[46]=K>>>16&255,d[47]=K>>>24&255,d[48]=xe>>>0&255,d[49]=xe>>>8&255,d[50]=xe>>>16&255,d[51]=xe>>>24&255,d[52]=Pe>>>0&255,d[53]=Pe>>>8&255,d[54]=Pe>>>16&255,d[55]=Pe>>>24&255,d[56]=Te>>>0&255,d[57]=Te>>>8&255,d[58]=Te>>>16&255,d[59]=Te>>>24&255,d[60]=Me>>>0&255,d[61]=Me>>>8&255,d[62]=Me>>>16&255,d[63]=Me>>>24&255}function z(d,h,p,l){for(var g=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,M=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,$=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Y=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,ue=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Be=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,ke=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,Se=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Le=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,ze=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Ne=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ee=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ce=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,ie=g,fe=P,ne=M,oe=$,ce=Y,Z=ue,O=te,R=Be,V=se,A=ke,F=Se,K=Le,xe=ze,Pe=Ne,Te=Ee,Me=Ce,j,_e=0;_e<20;_e+=2)j=ie+xe|0,ce^=j<<7|j>>>25,j=ce+ie|0,V^=j<<9|j>>>23,j=V+ce|0,xe^=j<<13|j>>>19,j=xe+V|0,ie^=j<<18|j>>>14,j=Z+fe|0,A^=j<<7|j>>>25,j=A+Z|0,Pe^=j<<9|j>>>23,j=Pe+A|0,fe^=j<<13|j>>>19,j=fe+Pe|0,Z^=j<<18|j>>>14,j=F+O|0,Te^=j<<7|j>>>25,j=Te+F|0,ne^=j<<9|j>>>23,j=ne+Te|0,O^=j<<13|j>>>19,j=O+ne|0,F^=j<<18|j>>>14,j=Me+K|0,oe^=j<<7|j>>>25,j=oe+Me|0,R^=j<<9|j>>>23,j=R+oe|0,K^=j<<13|j>>>19,j=K+R|0,Me^=j<<18|j>>>14,j=ie+oe|0,fe^=j<<7|j>>>25,j=fe+ie|0,ne^=j<<9|j>>>23,j=ne+fe|0,oe^=j<<13|j>>>19,j=oe+ne|0,ie^=j<<18|j>>>14,j=Z+ce|0,O^=j<<7|j>>>25,j=O+Z|0,R^=j<<9|j>>>23,j=R+O|0,ce^=j<<13|j>>>19,j=ce+R|0,Z^=j<<18|j>>>14,j=F+A|0,K^=j<<7|j>>>25,j=K+F|0,V^=j<<9|j>>>23,j=V+K|0,A^=j<<13|j>>>19,j=A+V|0,F^=j<<18|j>>>14,j=Me+Te|0,xe^=j<<7|j>>>25,j=xe+Me|0,Pe^=j<<9|j>>>23,j=Pe+xe|0,Te^=j<<13|j>>>19,j=Te+Pe|0,Me^=j<<18|j>>>14;d[0]=ie>>>0&255,d[1]=ie>>>8&255,d[2]=ie>>>16&255,d[3]=ie>>>24&255,d[4]=Z>>>0&255,d[5]=Z>>>8&255,d[6]=Z>>>16&255,d[7]=Z>>>24&255,d[8]=F>>>0&255,d[9]=F>>>8&255,d[10]=F>>>16&255,d[11]=F>>>24&255,d[12]=Me>>>0&255,d[13]=Me>>>8&255,d[14]=Me>>>16&255,d[15]=Me>>>24&255,d[16]=O>>>0&255,d[17]=O>>>8&255,d[18]=O>>>16&255,d[19]=O>>>24&255,d[20]=R>>>0&255,d[21]=R>>>8&255,d[22]=R>>>16&255,d[23]=R>>>24&255,d[24]=V>>>0&255,d[25]=V>>>8&255,d[26]=V>>>16&255,d[27]=V>>>24&255,d[28]=A>>>0&255,d[29]=A>>>8&255,d[30]=A>>>16&255,d[31]=A>>>24&255}function E(d,h,p,l){v(d,h,p,l)}function I(d,h,p,l){z(d,h,p,l)}var D=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function _(d,h,p,l,g,P,M){var $=new Uint8Array(16),Y=new Uint8Array(64),ue,te;for(te=0;te<16;te++)$[te]=0;for(te=0;te<8;te++)$[te]=P[te];for(;g>=64;){for(E(Y,$,M,D),te=0;te<64;te++)d[h+te]=p[l+te]^Y[te];for(ue=1,te=8;te<16;te++)ue=ue+($[te]&255)|0,$[te]=ue&255,ue>>>=8;g-=64,h+=64,l+=64}if(g>0)for(E(Y,$,M,D),te=0;te<g;te++)d[h+te]=p[l+te]^Y[te];return 0}function Q(d,h,p,l,g){var P=new Uint8Array(16),M=new Uint8Array(64),$,Y;for(Y=0;Y<16;Y++)P[Y]=0;for(Y=0;Y<8;Y++)P[Y]=l[Y];for(;p>=64;){for(E(M,P,g,D),Y=0;Y<64;Y++)d[h+Y]=M[Y];for($=1,Y=8;Y<16;Y++)$=$+(P[Y]&255)|0,P[Y]=$&255,$>>>=8;p-=64,h+=64}if(p>0)for(E(M,P,g,D),Y=0;Y<p;Y++)d[h+Y]=M[Y];return 0}function Ae(d,h,p,l,g){var P=new Uint8Array(32);I(P,l,g,D);for(var M=new Uint8Array(8),$=0;$<8;$++)M[$]=l[$+16];return Q(d,h,p,M,P)}function pe(d,h,p,l,g,P,M){var $=new Uint8Array(32);I($,P,M,D);for(var Y=new Uint8Array(8),ue=0;ue<8;ue++)Y[ue]=P[ue+16];return _(d,h,p,l,g,Y,$)}var Ke=function(d){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var h,p,l,g,P,M,$,Y;h=d[0]&255|(d[1]&255)<<8,this.r[0]=h&8191,p=d[2]&255|(d[3]&255)<<8,this.r[1]=(h>>>13|p<<3)&8191,l=d[4]&255|(d[5]&255)<<8,this.r[2]=(p>>>10|l<<6)&7939,g=d[6]&255|(d[7]&255)<<8,this.r[3]=(l>>>7|g<<9)&8191,P=d[8]&255|(d[9]&255)<<8,this.r[4]=(g>>>4|P<<12)&255,this.r[5]=P>>>1&8190,M=d[10]&255|(d[11]&255)<<8,this.r[6]=(P>>>14|M<<2)&8191,$=d[12]&255|(d[13]&255)<<8,this.r[7]=(M>>>11|$<<5)&8065,Y=d[14]&255|(d[15]&255)<<8,this.r[8]=($>>>8|Y<<8)&8191,this.r[9]=Y>>>5&127,this.pad[0]=d[16]&255|(d[17]&255)<<8,this.pad[1]=d[18]&255|(d[19]&255)<<8,this.pad[2]=d[20]&255|(d[21]&255)<<8,this.pad[3]=d[22]&255|(d[23]&255)<<8,this.pad[4]=d[24]&255|(d[25]&255)<<8,this.pad[5]=d[26]&255|(d[27]&255)<<8,this.pad[6]=d[28]&255|(d[29]&255)<<8,this.pad[7]=d[30]&255|(d[31]&255)<<8};Ke.prototype.blocks=function(d,h,p){for(var l=this.fin?0:2048,g,P,M,$,Y,ue,te,Be,se,ke,Se,Le,ze,Ne,Ee,Ce,ie,fe,ne,oe=this.h[0],ce=this.h[1],Z=this.h[2],O=this.h[3],R=this.h[4],V=this.h[5],A=this.h[6],F=this.h[7],K=this.h[8],xe=this.h[9],Pe=this.r[0],Te=this.r[1],Me=this.r[2],j=this.r[3],_e=this.r[4],He=this.r[5],Ve=this.r[6],Oe=this.r[7],Ue=this.r[8],Fe=this.r[9];p>=16;)g=d[h+0]&255|(d[h+1]&255)<<8,oe+=g&8191,P=d[h+2]&255|(d[h+3]&255)<<8,ce+=(g>>>13|P<<3)&8191,M=d[h+4]&255|(d[h+5]&255)<<8,Z+=(P>>>10|M<<6)&8191,$=d[h+6]&255|(d[h+7]&255)<<8,O+=(M>>>7|$<<9)&8191,Y=d[h+8]&255|(d[h+9]&255)<<8,R+=($>>>4|Y<<12)&8191,V+=Y>>>1&8191,ue=d[h+10]&255|(d[h+11]&255)<<8,A+=(Y>>>14|ue<<2)&8191,te=d[h+12]&255|(d[h+13]&255)<<8,F+=(ue>>>11|te<<5)&8191,Be=d[h+14]&255|(d[h+15]&255)<<8,K+=(te>>>8|Be<<8)&8191,xe+=Be>>>5|l,se=0,ke=se,ke+=oe*Pe,ke+=ce*(5*Fe),ke+=Z*(5*Ue),ke+=O*(5*Oe),ke+=R*(5*Ve),se=ke>>>13,ke&=8191,ke+=V*(5*He),ke+=A*(5*_e),ke+=F*(5*j),ke+=K*(5*Me),ke+=xe*(5*Te),se+=ke>>>13,ke&=8191,Se=se,Se+=oe*Te,Se+=ce*Pe,Se+=Z*(5*Fe),Se+=O*(5*Ue),Se+=R*(5*Oe),se=Se>>>13,Se&=8191,Se+=V*(5*Ve),Se+=A*(5*He),Se+=F*(5*_e),Se+=K*(5*j),Se+=xe*(5*Me),se+=Se>>>13,Se&=8191,Le=se,Le+=oe*Me,Le+=ce*Te,Le+=Z*Pe,Le+=O*(5*Fe),Le+=R*(5*Ue),se=Le>>>13,Le&=8191,Le+=V*(5*Oe),Le+=A*(5*Ve),Le+=F*(5*He),Le+=K*(5*_e),Le+=xe*(5*j),se+=Le>>>13,Le&=8191,ze=se,ze+=oe*j,ze+=ce*Me,ze+=Z*Te,ze+=O*Pe,ze+=R*(5*Fe),se=ze>>>13,ze&=8191,ze+=V*(5*Ue),ze+=A*(5*Oe),ze+=F*(5*Ve),ze+=K*(5*He),ze+=xe*(5*_e),se+=ze>>>13,ze&=8191,Ne=se,Ne+=oe*_e,Ne+=ce*j,Ne+=Z*Me,Ne+=O*Te,Ne+=R*Pe,se=Ne>>>13,Ne&=8191,Ne+=V*(5*Fe),Ne+=A*(5*Ue),Ne+=F*(5*Oe),Ne+=K*(5*Ve),Ne+=xe*(5*He),se+=Ne>>>13,Ne&=8191,Ee=se,Ee+=oe*He,Ee+=ce*_e,Ee+=Z*j,Ee+=O*Me,Ee+=R*Te,se=Ee>>>13,Ee&=8191,Ee+=V*Pe,Ee+=A*(5*Fe),Ee+=F*(5*Ue),Ee+=K*(5*Oe),Ee+=xe*(5*Ve),se+=Ee>>>13,Ee&=8191,Ce=se,Ce+=oe*Ve,Ce+=ce*He,Ce+=Z*_e,Ce+=O*j,Ce+=R*Me,se=Ce>>>13,Ce&=8191,Ce+=V*Te,Ce+=A*Pe,Ce+=F*(5*Fe),Ce+=K*(5*Ue),Ce+=xe*(5*Oe),se+=Ce>>>13,Ce&=8191,ie=se,ie+=oe*Oe,ie+=ce*Ve,ie+=Z*He,ie+=O*_e,ie+=R*j,se=ie>>>13,ie&=8191,ie+=V*Me,ie+=A*Te,ie+=F*Pe,ie+=K*(5*Fe),ie+=xe*(5*Ue),se+=ie>>>13,ie&=8191,fe=se,fe+=oe*Ue,fe+=ce*Oe,fe+=Z*Ve,fe+=O*He,fe+=R*_e,se=fe>>>13,fe&=8191,fe+=V*j,fe+=A*Me,fe+=F*Te,fe+=K*Pe,fe+=xe*(5*Fe),se+=fe>>>13,fe&=8191,ne=se,ne+=oe*Fe,ne+=ce*Ue,ne+=Z*Oe,ne+=O*Ve,ne+=R*He,se=ne>>>13,ne&=8191,ne+=V*_e,ne+=A*j,ne+=F*Me,ne+=K*Te,ne+=xe*Pe,se+=ne>>>13,ne&=8191,se=(se<<2)+se|0,se=se+ke|0,ke=se&8191,se=se>>>13,Se+=se,oe=ke,ce=Se,Z=Le,O=ze,R=Ne,V=Ee,A=Ce,F=ie,K=fe,xe=ne,h+=16,p-=16;this.h[0]=oe,this.h[1]=ce,this.h[2]=Z,this.h[3]=O,this.h[4]=R,this.h[5]=V,this.h[6]=A,this.h[7]=F,this.h[8]=K,this.h[9]=xe},Ke.prototype.finish=function(d,h){var p=new Uint16Array(10),l,g,P,M;if(this.leftover){for(M=this.leftover,this.buffer[M++]=1;M<16;M++)this.buffer[M]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(l=this.h[1]>>>13,this.h[1]&=8191,M=2;M<10;M++)this.h[M]+=l,l=this.h[M]>>>13,this.h[M]&=8191;for(this.h[0]+=l*5,l=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=l,l=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=l,p[0]=this.h[0]+5,l=p[0]>>>13,p[0]&=8191,M=1;M<10;M++)p[M]=this.h[M]+l,l=p[M]>>>13,p[M]&=8191;for(p[9]-=8192,g=(l^1)-1,M=0;M<10;M++)p[M]&=g;for(g=~g,M=0;M<10;M++)this.h[M]=this.h[M]&g|p[M];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,P=this.h[0]+this.pad[0],this.h[0]=P&65535,M=1;M<8;M++)P=(this.h[M]+this.pad[M]|0)+(P>>>16)|0,this.h[M]=P&65535;d[h+0]=this.h[0]>>>0&255,d[h+1]=this.h[0]>>>8&255,d[h+2]=this.h[1]>>>0&255,d[h+3]=this.h[1]>>>8&255,d[h+4]=this.h[2]>>>0&255,d[h+5]=this.h[2]>>>8&255,d[h+6]=this.h[3]>>>0&255,d[h+7]=this.h[3]>>>8&255,d[h+8]=this.h[4]>>>0&255,d[h+9]=this.h[4]>>>8&255,d[h+10]=this.h[5]>>>0&255,d[h+11]=this.h[5]>>>8&255,d[h+12]=this.h[6]>>>0&255,d[h+13]=this.h[6]>>>8&255,d[h+14]=this.h[7]>>>0&255,d[h+15]=this.h[7]>>>8&255},Ke.prototype.update=function(d,h,p){var l,g;if(this.leftover){for(g=16-this.leftover,g>p&&(g=p),l=0;l<g;l++)this.buffer[this.leftover+l]=d[h+l];if(p-=g,h+=g,this.leftover+=g,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(p>=16&&(g=p-p%16,this.blocks(d,h,g),h+=g,p-=g),p){for(l=0;l<p;l++)this.buffer[this.leftover+l]=d[h+l];this.leftover+=p}};function pt(d,h,p,l,g,P){var M=new Ke(P);return M.update(p,l,g),M.finish(d,h),0}function kt(d,h,p,l,g,P){var M=new Uint8Array(16);return pt(M,0,p,l,g,P),L(d,h,M,0)}function ht(d,h,p,l,g){var P;if(p<32)return-1;for(pe(d,0,h,0,p,l,g),pt(d,16,d,32,p-32,d),P=0;P<16;P++)d[P]=0;return 0}function ot(d,h,p,l,g){var P,M=new Uint8Array(32);if(p<32||(Ae(M,0,32,l,g),kt(h,16,h,32,p-32,M)!==0))return-1;for(pe(d,0,h,0,p,l,g),P=0;P<32;P++)d[P]=0;return 0}function Xe(d,h){var p;for(p=0;p<16;p++)d[p]=h[p]|0}function xt(d){var h,p,l=1;for(h=0;h<16;h++)p=d[h]+l+65535,l=Math.floor(p/65536),d[h]=p-l*65536;d[0]+=l-1+37*(l-1)}function W(d,h,p){for(var l,g=~(p-1),P=0;P<16;P++)l=g&(d[P]^h[P]),d[P]^=l,h[P]^=l}function re(d,h){var p,l,g,P=n(),M=n();for(p=0;p<16;p++)M[p]=h[p];for(xt(M),xt(M),xt(M),l=0;l<2;l++){for(P[0]=M[0]-65517,p=1;p<15;p++)P[p]=M[p]-65535-(P[p-1]>>16&1),P[p-1]&=65535;P[15]=M[15]-32767-(P[14]>>16&1),g=P[15]>>16&1,P[14]&=65535,W(M,P,1-g)}for(p=0;p<16;p++)d[2*p]=M[p]&255,d[2*p+1]=M[p]>>8}function he(d,h){var p=new Uint8Array(32),l=new Uint8Array(32);return re(p,d),re(l,h),k(p,0,l,0)}function De(d){var h=new Uint8Array(32);return re(h,d),h[0]&1}function ve(d,h){var p;for(p=0;p<16;p++)d[p]=h[2*p]+(h[2*p+1]<<8);d[15]&=32767}function Ze(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]+p[l]}function We(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]-p[l]}function je(d,h,p){var l,g,P=0,M=0,$=0,Y=0,ue=0,te=0,Be=0,se=0,ke=0,Se=0,Le=0,ze=0,Ne=0,Ee=0,Ce=0,ie=0,fe=0,ne=0,oe=0,ce=0,Z=0,O=0,R=0,V=0,A=0,F=0,K=0,xe=0,Pe=0,Te=0,Me=0,j=p[0],_e=p[1],He=p[2],Ve=p[3],Oe=p[4],Ue=p[5],Fe=p[6],mt=p[7],Qe=p[8],lt=p[9],ct=p[10],ut=p[11],jt=p[12],Pt=p[13],Mt=p[14],T=p[15];l=h[0],P+=l*j,M+=l*_e,$+=l*He,Y+=l*Ve,ue+=l*Oe,te+=l*Ue,Be+=l*Fe,se+=l*mt,ke+=l*Qe,Se+=l*lt,Le+=l*ct,ze+=l*ut,Ne+=l*jt,Ee+=l*Pt,Ce+=l*Mt,ie+=l*T,l=h[1],M+=l*j,$+=l*_e,Y+=l*He,ue+=l*Ve,te+=l*Oe,Be+=l*Ue,se+=l*Fe,ke+=l*mt,Se+=l*Qe,Le+=l*lt,ze+=l*ct,Ne+=l*ut,Ee+=l*jt,Ce+=l*Pt,ie+=l*Mt,fe+=l*T,l=h[2],$+=l*j,Y+=l*_e,ue+=l*He,te+=l*Ve,Be+=l*Oe,se+=l*Ue,ke+=l*Fe,Se+=l*mt,Le+=l*Qe,ze+=l*lt,Ne+=l*ct,Ee+=l*ut,Ce+=l*jt,ie+=l*Pt,fe+=l*Mt,ne+=l*T,l=h[3],Y+=l*j,ue+=l*_e,te+=l*He,Be+=l*Ve,se+=l*Oe,ke+=l*Ue,Se+=l*Fe,Le+=l*mt,ze+=l*Qe,Ne+=l*lt,Ee+=l*ct,Ce+=l*ut,ie+=l*jt,fe+=l*Pt,ne+=l*Mt,oe+=l*T,l=h[4],ue+=l*j,te+=l*_e,Be+=l*He,se+=l*Ve,ke+=l*Oe,Se+=l*Ue,Le+=l*Fe,ze+=l*mt,Ne+=l*Qe,Ee+=l*lt,Ce+=l*ct,ie+=l*ut,fe+=l*jt,ne+=l*Pt,oe+=l*Mt,ce+=l*T,l=h[5],te+=l*j,Be+=l*_e,se+=l*He,ke+=l*Ve,Se+=l*Oe,Le+=l*Ue,ze+=l*Fe,Ne+=l*mt,Ee+=l*Qe,Ce+=l*lt,ie+=l*ct,fe+=l*ut,ne+=l*jt,oe+=l*Pt,ce+=l*Mt,Z+=l*T,l=h[6],Be+=l*j,se+=l*_e,ke+=l*He,Se+=l*Ve,Le+=l*Oe,ze+=l*Ue,Ne+=l*Fe,Ee+=l*mt,Ce+=l*Qe,ie+=l*lt,fe+=l*ct,ne+=l*ut,oe+=l*jt,ce+=l*Pt,Z+=l*Mt,O+=l*T,l=h[7],se+=l*j,ke+=l*_e,Se+=l*He,Le+=l*Ve,ze+=l*Oe,Ne+=l*Ue,Ee+=l*Fe,Ce+=l*mt,ie+=l*Qe,fe+=l*lt,ne+=l*ct,oe+=l*ut,ce+=l*jt,Z+=l*Pt,O+=l*Mt,R+=l*T,l=h[8],ke+=l*j,Se+=l*_e,Le+=l*He,ze+=l*Ve,Ne+=l*Oe,Ee+=l*Ue,Ce+=l*Fe,ie+=l*mt,fe+=l*Qe,ne+=l*lt,oe+=l*ct,ce+=l*ut,Z+=l*jt,O+=l*Pt,R+=l*Mt,V+=l*T,l=h[9],Se+=l*j,Le+=l*_e,ze+=l*He,Ne+=l*Ve,Ee+=l*Oe,Ce+=l*Ue,ie+=l*Fe,fe+=l*mt,ne+=l*Qe,oe+=l*lt,ce+=l*ct,Z+=l*ut,O+=l*jt,R+=l*Pt,V+=l*Mt,A+=l*T,l=h[10],Le+=l*j,ze+=l*_e,Ne+=l*He,Ee+=l*Ve,Ce+=l*Oe,ie+=l*Ue,fe+=l*Fe,ne+=l*mt,oe+=l*Qe,ce+=l*lt,Z+=l*ct,O+=l*ut,R+=l*jt,V+=l*Pt,A+=l*Mt,F+=l*T,l=h[11],ze+=l*j,Ne+=l*_e,Ee+=l*He,Ce+=l*Ve,ie+=l*Oe,fe+=l*Ue,ne+=l*Fe,oe+=l*mt,ce+=l*Qe,Z+=l*lt,O+=l*ct,R+=l*ut,V+=l*jt,A+=l*Pt,F+=l*Mt,K+=l*T,l=h[12],Ne+=l*j,Ee+=l*_e,Ce+=l*He,ie+=l*Ve,fe+=l*Oe,ne+=l*Ue,oe+=l*Fe,ce+=l*mt,Z+=l*Qe,O+=l*lt,R+=l*ct,V+=l*ut,A+=l*jt,F+=l*Pt,K+=l*Mt,xe+=l*T,l=h[13],Ee+=l*j,Ce+=l*_e,ie+=l*He,fe+=l*Ve,ne+=l*Oe,oe+=l*Ue,ce+=l*Fe,Z+=l*mt,O+=l*Qe,R+=l*lt,V+=l*ct,A+=l*ut,F+=l*jt,K+=l*Pt,xe+=l*Mt,Pe+=l*T,l=h[14],Ce+=l*j,ie+=l*_e,fe+=l*He,ne+=l*Ve,oe+=l*Oe,ce+=l*Ue,Z+=l*Fe,O+=l*mt,R+=l*Qe,V+=l*lt,A+=l*ct,F+=l*ut,K+=l*jt,xe+=l*Pt,Pe+=l*Mt,Te+=l*T,l=h[15],ie+=l*j,fe+=l*_e,ne+=l*He,oe+=l*Ve,ce+=l*Oe,Z+=l*Ue,O+=l*Fe,R+=l*mt,V+=l*Qe,A+=l*lt,F+=l*ct,K+=l*ut,xe+=l*jt,Pe+=l*Pt,Te+=l*Mt,Me+=l*T,P+=38*fe,M+=38*ne,$+=38*oe,Y+=38*ce,ue+=38*Z,te+=38*O,Be+=38*R,se+=38*V,ke+=38*A,Se+=38*F,Le+=38*K,ze+=38*xe,Ne+=38*Pe,Ee+=38*Te,Ce+=38*Me,g=1,l=P+g+65535,g=Math.floor(l/65536),P=l-g*65536,l=M+g+65535,g=Math.floor(l/65536),M=l-g*65536,l=$+g+65535,g=Math.floor(l/65536),$=l-g*65536,l=Y+g+65535,g=Math.floor(l/65536),Y=l-g*65536,l=ue+g+65535,g=Math.floor(l/65536),ue=l-g*65536,l=te+g+65535,g=Math.floor(l/65536),te=l-g*65536,l=Be+g+65535,g=Math.floor(l/65536),Be=l-g*65536,l=se+g+65535,g=Math.floor(l/65536),se=l-g*65536,l=ke+g+65535,g=Math.floor(l/65536),ke=l-g*65536,l=Se+g+65535,g=Math.floor(l/65536),Se=l-g*65536,l=Le+g+65535,g=Math.floor(l/65536),Le=l-g*65536,l=ze+g+65535,g=Math.floor(l/65536),ze=l-g*65536,l=Ne+g+65535,g=Math.floor(l/65536),Ne=l-g*65536,l=Ee+g+65535,g=Math.floor(l/65536),Ee=l-g*65536,l=Ce+g+65535,g=Math.floor(l/65536),Ce=l-g*65536,l=ie+g+65535,g=Math.floor(l/65536),ie=l-g*65536,P+=g-1+37*(g-1),g=1,l=P+g+65535,g=Math.floor(l/65536),P=l-g*65536,l=M+g+65535,g=Math.floor(l/65536),M=l-g*65536,l=$+g+65535,g=Math.floor(l/65536),$=l-g*65536,l=Y+g+65535,g=Math.floor(l/65536),Y=l-g*65536,l=ue+g+65535,g=Math.floor(l/65536),ue=l-g*65536,l=te+g+65535,g=Math.floor(l/65536),te=l-g*65536,l=Be+g+65535,g=Math.floor(l/65536),Be=l-g*65536,l=se+g+65535,g=Math.floor(l/65536),se=l-g*65536,l=ke+g+65535,g=Math.floor(l/65536),ke=l-g*65536,l=Se+g+65535,g=Math.floor(l/65536),Se=l-g*65536,l=Le+g+65535,g=Math.floor(l/65536),Le=l-g*65536,l=ze+g+65535,g=Math.floor(l/65536),ze=l-g*65536,l=Ne+g+65535,g=Math.floor(l/65536),Ne=l-g*65536,l=Ee+g+65535,g=Math.floor(l/65536),Ee=l-g*65536,l=Ce+g+65535,g=Math.floor(l/65536),Ce=l-g*65536,l=ie+g+65535,g=Math.floor(l/65536),ie=l-g*65536,P+=g-1+37*(g-1),d[0]=P,d[1]=M,d[2]=$,d[3]=Y,d[4]=ue,d[5]=te,d[6]=Be,d[7]=se,d[8]=ke,d[9]=Se,d[10]=Le,d[11]=ze,d[12]=Ne,d[13]=Ee,d[14]=Ce,d[15]=ie}function et(d,h){je(d,h,h)}function Ct(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=253;l>=0;l--)et(p,p),l!==2&&l!==4&&je(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function en(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=250;l>=0;l--)et(p,p),l!==1&&je(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function Yt(d,h,p){var l=new Uint8Array(32),g=new Float64Array(80),P,M,$=n(),Y=n(),ue=n(),te=n(),Be=n(),se=n();for(M=0;M<31;M++)l[M]=h[M];for(l[31]=h[31]&127|64,l[0]&=248,ve(g,p),M=0;M<16;M++)Y[M]=g[M],te[M]=$[M]=ue[M]=0;for($[0]=te[0]=1,M=254;M>=0;--M)P=l[M>>>3]>>>(M&7)&1,W($,Y,P),W(ue,te,P),Ze(Be,$,ue),We($,$,ue),Ze(ue,Y,te),We(Y,Y,te),et(te,Be),et(se,$),je($,ue,$),je(ue,Y,Be),Ze(Be,$,ue),We($,$,ue),et(Y,$),We(ue,te,se),je($,ue,u),Ze($,$,te),je(ue,ue,$),je($,te,se),je(te,Y,g),et(Y,Be),W($,Y,P),W(ue,te,P);for(M=0;M<16;M++)g[M+16]=$[M],g[M+32]=ue[M],g[M+48]=Y[M],g[M+64]=te[M];var ke=g.subarray(32),Se=g.subarray(16);return Ct(ke,ke),je(Se,Se,ke),re(d,Se),0}function Jt(d,h){return Yt(d,h,a)}function tn(d,h){return r(h,32),Jt(d,h)}function Ot(d,h,p){var l=new Uint8Array(32);return Yt(l,p,h),I(d,s,l,D)}var xn=ht,me=ot;function at(d,h,p,l,g,P){var M=new Uint8Array(32);return Ot(M,g,P),xn(d,h,p,l,M)}function _n(d,h,p,l,g,P){var M=new Uint8Array(32);return Ot(M,g,P),me(d,h,p,l,M)}var ar=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function nn(d,h,p,l){for(var g=new Int32Array(16),P=new Int32Array(16),M,$,Y,ue,te,Be,se,ke,Se,Le,ze,Ne,Ee,Ce,ie,fe,ne,oe,ce,Z,O,R,V,A,F,K,xe=d[0],Pe=d[1],Te=d[2],Me=d[3],j=d[4],_e=d[5],He=d[6],Ve=d[7],Oe=h[0],Ue=h[1],Fe=h[2],mt=h[3],Qe=h[4],lt=h[5],ct=h[6],ut=h[7],jt=0;l>=128;){for(ce=0;ce<16;ce++)Z=8*ce+jt,g[ce]=p[Z+0]<<24|p[Z+1]<<16|p[Z+2]<<8|p[Z+3],P[ce]=p[Z+4]<<24|p[Z+5]<<16|p[Z+6]<<8|p[Z+7];for(ce=0;ce<80;ce++)if(M=xe,$=Pe,Y=Te,ue=Me,te=j,Be=_e,se=He,ke=Ve,Se=Oe,Le=Ue,ze=Fe,Ne=mt,Ee=Qe,Ce=lt,ie=ct,fe=ut,O=Ve,R=ut,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=(j>>>14|Qe<<18)^(j>>>18|Qe<<14)^(Qe>>>9|j<<23),R=(Qe>>>14|j<<18)^(Qe>>>18|j<<14)^(j>>>9|Qe<<23),V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,O=j&_e^~j&He,R=Qe&lt^~Qe&ct,V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,O=ar[ce*2],R=ar[ce*2+1],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,O=g[ce%16],R=P[ce%16],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,ne=F&65535|K<<16,oe=V&65535|A<<16,O=ne,R=oe,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=(xe>>>28|Oe<<4)^(Oe>>>2|xe<<30)^(Oe>>>7|xe<<25),R=(Oe>>>28|xe<<4)^(xe>>>2|Oe<<30)^(xe>>>7|Oe<<25),V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,O=xe&Pe^xe&Te^Pe&Te,R=Oe&Ue^Oe&Fe^Ue&Fe,V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,ke=F&65535|K<<16,fe=V&65535|A<<16,O=ue,R=Ne,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=ne,R=oe,V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,ue=F&65535|K<<16,Ne=V&65535|A<<16,Pe=M,Te=$,Me=Y,j=ue,_e=te,He=Be,Ve=se,xe=ke,Ue=Se,Fe=Le,mt=ze,Qe=Ne,lt=Ee,ct=Ce,ut=ie,Oe=fe,ce%16===15)for(Z=0;Z<16;Z++)O=g[Z],R=P[Z],V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=g[(Z+9)%16],R=P[(Z+9)%16],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,ne=g[(Z+1)%16],oe=P[(Z+1)%16],O=(ne>>>1|oe<<31)^(ne>>>8|oe<<24)^ne>>>7,R=(oe>>>1|ne<<31)^(oe>>>8|ne<<24)^(oe>>>7|ne<<25),V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,ne=g[(Z+14)%16],oe=P[(Z+14)%16],O=(ne>>>19|oe<<13)^(oe>>>29|ne<<3)^ne>>>6,R=(oe>>>19|ne<<13)^(ne>>>29|oe<<3)^(oe>>>6|ne<<26),V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,g[Z]=F&65535|K<<16,P[Z]=V&65535|A<<16;O=xe,R=Oe,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[0],R=h[0],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[0]=xe=F&65535|K<<16,h[0]=Oe=V&65535|A<<16,O=Pe,R=Ue,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[1],R=h[1],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[1]=Pe=F&65535|K<<16,h[1]=Ue=V&65535|A<<16,O=Te,R=Fe,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[2],R=h[2],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[2]=Te=F&65535|K<<16,h[2]=Fe=V&65535|A<<16,O=Me,R=mt,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[3],R=h[3],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[3]=Me=F&65535|K<<16,h[3]=mt=V&65535|A<<16,O=j,R=Qe,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[4],R=h[4],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[4]=j=F&65535|K<<16,h[4]=Qe=V&65535|A<<16,O=_e,R=lt,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[5],R=h[5],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[5]=_e=F&65535|K<<16,h[5]=lt=V&65535|A<<16,O=He,R=ct,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[6],R=h[6],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[6]=He=F&65535|K<<16,h[6]=ct=V&65535|A<<16,O=Ve,R=ut,V=R&65535,A=R>>>16,F=O&65535,K=O>>>16,O=d[7],R=h[7],V+=R&65535,A+=R>>>16,F+=O&65535,K+=O>>>16,A+=V>>>16,F+=A>>>16,K+=F>>>16,d[7]=Ve=F&65535|K<<16,h[7]=ut=V&65535|A<<16,jt+=128,l-=128}return l}function Rt(d,h,p){var l=new Int32Array(8),g=new Int32Array(8),P=new Uint8Array(256),M,$=p;for(l[0]=1779033703,l[1]=3144134277,l[2]=1013904242,l[3]=2773480762,l[4]=1359893119,l[5]=2600822924,l[6]=528734635,l[7]=1541459225,g[0]=4089235720,g[1]=2227873595,g[2]=4271175723,g[3]=1595750129,g[4]=2917565137,g[5]=725511199,g[6]=4215389547,g[7]=327033209,nn(l,g,h,p),p%=128,M=0;M<p;M++)P[M]=h[$-p+M];for(P[p]=128,p=256-128*(p<112?1:0),P[p-9]=0,w(P,p-8,$/536870912|0,$<<3),nn(l,g,P,p),M=0;M<8;M++)w(d,8*M,l[M],g[M]);return 0}function rn(d,h){var p=n(),l=n(),g=n(),P=n(),M=n(),$=n(),Y=n(),ue=n(),te=n();We(p,d[1],d[0]),We(te,h[1],h[0]),je(p,p,te),Ze(l,d[0],d[1]),Ze(te,h[0],h[1]),je(l,l,te),je(g,d[3],h[3]),je(g,g,m),je(P,d[2],h[2]),Ze(P,P,P),We(M,l,p),We($,P,g),Ze(Y,P,g),Ze(ue,l,p),je(d[0],M,$),je(d[1],ue,Y),je(d[2],Y,$),je(d[3],M,ue)}function Dn(d,h,p){var l;for(l=0;l<4;l++)W(d[l],h[l],p)}function An(d,h){var p=n(),l=n(),g=n();Ct(g,h[2]),je(p,h[0],g),je(l,h[1],g),re(d,l),d[31]^=De(p)<<7}function Un(d,h,p){var l,g;for(Xe(d[0],o),Xe(d[1],c),Xe(d[2],c),Xe(d[3],o),g=255;g>=0;--g)l=p[g/8|0]>>(g&7)&1,Dn(d,h,l),rn(h,d),rn(d,d),Dn(d,h,l)}function $t(d,h){var p=[n(),n(),n(),n()];Xe(p[0],b),Xe(p[1],x),Xe(p[2],c),je(p[3],b,x),Un(d,p,h)}function vn(d,h,p){var l=new Uint8Array(64),g=[n(),n(),n(),n()],P;for(p||r(h,32),Rt(l,h,32),l[0]&=248,l[31]&=127,l[31]|=64,$t(g,l),An(d,g),P=0;P<32;P++)h[P+32]=d[P];return 0}var rt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Yn(d,h){var p,l,g,P;for(l=63;l>=32;--l){for(p=0,g=l-32,P=l-12;g<P;++g)h[g]+=p-16*h[l]*rt[g-(l-32)],p=Math.floor((h[g]+128)/256),h[g]-=p*256;h[g]+=p,h[l]=0}for(p=0,g=0;g<32;g++)h[g]+=p-(h[31]>>4)*rt[g],p=h[g]>>8,h[g]&=255;for(g=0;g<32;g++)h[g]-=p*rt[g];for(l=0;l<32;l++)h[l+1]+=h[l]>>8,d[l]=h[l]&255}function Nn(d){var h=new Float64Array(64),p;for(p=0;p<64;p++)h[p]=d[p];for(p=0;p<64;p++)d[p]=0;Yn(d,h)}function Jn(d,h,p,l){var g=new Uint8Array(64),P=new Uint8Array(64),M=new Uint8Array(64),$,Y,ue=new Float64Array(64),te=[n(),n(),n(),n()];Rt(g,l,32),g[0]&=248,g[31]&=127,g[31]|=64;var Be=p+64;for($=0;$<p;$++)d[64+$]=h[$];for($=0;$<32;$++)d[32+$]=g[32+$];for(Rt(M,d.subarray(32),p+32),Nn(M),$t(te,M),An(d,te),$=32;$<64;$++)d[$]=l[$];for(Rt(P,d,p+64),Nn(P),$=0;$<64;$++)ue[$]=0;for($=0;$<32;$++)ue[$]=M[$];for($=0;$<32;$++)for(Y=0;Y<32;Y++)ue[$+Y]+=P[$]*g[Y];return Yn(d.subarray(32),ue),Be}function G(d,h){var p=n(),l=n(),g=n(),P=n(),M=n(),$=n(),Y=n();return Xe(d[2],c),ve(d[1],h),et(g,d[1]),je(P,g,f),We(g,g,d[2]),Ze(P,d[2],P),et(M,P),et($,M),je(Y,$,M),je(p,Y,g),je(p,p,P),en(p,p),je(p,p,g),je(p,p,P),je(p,p,P),je(d[0],p,P),et(l,d[0]),je(l,l,P),he(l,g)&&je(d[0],d[0],N),et(l,d[0]),je(l,l,P),he(l,g)?-1:(De(d[0])===h[31]>>7&&We(d[0],o,d[0]),je(d[3],d[0],d[1]),0)}function U(d,h,p,l){var g,P=new Uint8Array(32),M=new Uint8Array(64),$=[n(),n(),n(),n()],Y=[n(),n(),n(),n()];if(p<64||G(Y,l))return-1;for(g=0;g<p;g++)d[g]=h[g];for(g=0;g<32;g++)d[g+32]=l[g];if(Rt(M,d,p),Nn(M),Un($,Y,M),$t(Y,h.subarray(32)),rn($,Y),An(P,$),p-=64,k(h,0,P,0)){for(g=0;g<p;g++)d[g]=0;return-1}for(g=0;g<p;g++)d[g]=h[g+64];return p}var X=32,ye=24,st=32,S=16,ge=32,we=32,be=32,H=32,q=32,Je=ye,tt=st,Cn=S,Et=64,sn=32,Fn=64,Er=32,zr=64;t.lowlevel={crypto_core_hsalsa20:I,crypto_stream_xor:pe,crypto_stream:Ae,crypto_stream_salsa20_xor:_,crypto_stream_salsa20:Q,crypto_onetimeauth:pt,crypto_onetimeauth_verify:kt,crypto_verify_16:L,crypto_verify_32:k,crypto_secretbox:ht,crypto_secretbox_open:ot,crypto_scalarmult:Yt,crypto_scalarmult_base:Jt,crypto_box_beforenm:Ot,crypto_box_afternm:xn,crypto_box:at,crypto_box_open:_n,crypto_box_keypair:tn,crypto_hash:Rt,crypto_sign:Jn,crypto_sign_keypair:vn,crypto_sign_open:U,crypto_secretbox_KEYBYTES:X,crypto_secretbox_NONCEBYTES:ye,crypto_secretbox_ZEROBYTES:st,crypto_secretbox_BOXZEROBYTES:S,crypto_scalarmult_BYTES:ge,crypto_scalarmult_SCALARBYTES:we,crypto_box_PUBLICKEYBYTES:be,crypto_box_SECRETKEYBYTES:H,crypto_box_BEFORENMBYTES:q,crypto_box_NONCEBYTES:Je,crypto_box_ZEROBYTES:tt,crypto_box_BOXZEROBYTES:Cn,crypto_sign_BYTES:Et,crypto_sign_PUBLICKEYBYTES:sn,crypto_sign_SECRETKEYBYTES:Fn,crypto_sign_SEEDBYTES:Er,crypto_hash_BYTES:zr,gf:n,D:f,L:rt,pack25519:re,unpack25519:ve,M:je,A:Ze,S:et,Z:We,pow2523:en,add:rn,set25519:Xe,modL:Yn,scalarmult:Un,scalarbase:$t};function js(d,h){if(d.length!==X)throw new Error("bad key size");if(h.length!==ye)throw new Error("bad nonce size")}function eo(d,h){if(d.length!==be)throw new Error("bad public key size");if(h.length!==H)throw new Error("bad secret key size")}function Qt(){for(var d=0;d<arguments.length;d++)if(!(arguments[d]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function ja(d){for(var h=0;h<d.length;h++)d[h]=0}t.randomBytes=function(d){var h=new Uint8Array(d);return r(h,d),h},t.secretbox=function(d,h,p){Qt(d,h,p),js(p,h);for(var l=new Uint8Array(st+d.length),g=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+st]=d[P];return ht(g,l,l.length,h,p),g.subarray(S)},t.secretbox.open=function(d,h,p){Qt(d,h,p),js(p,h);for(var l=new Uint8Array(S+d.length),g=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+S]=d[P];return l.length<32||ot(g,l,l.length,h,p)!==0?null:g.subarray(st)},t.secretbox.keyLength=X,t.secretbox.nonceLength=ye,t.secretbox.overheadLength=S,t.scalarMult=function(d,h){if(Qt(d,h),d.length!==we)throw new Error("bad n size");if(h.length!==ge)throw new Error("bad p size");var p=new Uint8Array(ge);return Yt(p,d,h),p},t.scalarMult.base=function(d){if(Qt(d),d.length!==we)throw new Error("bad n size");var h=new Uint8Array(ge);return Jt(h,d),h},t.scalarMult.scalarLength=we,t.scalarMult.groupElementLength=ge,t.box=function(d,h,p,l){var g=t.box.before(p,l);return t.secretbox(d,h,g)},t.box.before=function(d,h){Qt(d,h),eo(d,h);var p=new Uint8Array(q);return Ot(p,d,h),p},t.box.after=t.secretbox,t.box.open=function(d,h,p,l){var g=t.box.before(p,l);return t.secretbox.open(d,h,g)},t.box.open.after=t.secretbox.open,t.box.keyPair=function(){var d=new Uint8Array(be),h=new Uint8Array(H);return tn(d,h),{publicKey:d,secretKey:h}},t.box.keyPair.fromSecretKey=function(d){if(Qt(d),d.length!==H)throw new Error("bad secret key size");var h=new Uint8Array(be);return Jt(h,d),{publicKey:h,secretKey:new Uint8Array(d)}},t.box.publicKeyLength=be,t.box.secretKeyLength=H,t.box.sharedKeyLength=q,t.box.nonceLength=Je,t.box.overheadLength=t.secretbox.overheadLength,t.sign=function(d,h){if(Qt(d,h),h.length!==Fn)throw new Error("bad secret key size");var p=new Uint8Array(Et+d.length);return Jn(p,d,d.length,h),p},t.sign.open=function(d,h){if(Qt(d,h),h.length!==sn)throw new Error("bad public key size");var p=new Uint8Array(d.length),l=U(p,d,d.length,h);if(l<0)return null;for(var g=new Uint8Array(l),P=0;P<g.length;P++)g[P]=p[P];return g},t.sign.detached=function(d,h){for(var p=t.sign(d,h),l=new Uint8Array(Et),g=0;g<l.length;g++)l[g]=p[g];return l},t.sign.detached.verify=function(d,h,p){if(Qt(d,h,p),h.length!==Et)throw new Error("bad signature size");if(p.length!==sn)throw new Error("bad public key size");var l=new Uint8Array(Et+d.length),g=new Uint8Array(Et+d.length),P;for(P=0;P<Et;P++)l[P]=h[P];for(P=0;P<d.length;P++)l[P+Et]=d[P];return U(g,l,l.length,p)>=0},t.sign.keyPair=function(){var d=new Uint8Array(sn),h=new Uint8Array(Fn);return vn(d,h),{publicKey:d,secretKey:h}},t.sign.keyPair.fromSecretKey=function(d){if(Qt(d),d.length!==Fn)throw new Error("bad secret key size");for(var h=new Uint8Array(sn),p=0;p<h.length;p++)h[p]=d[32+p];return{publicKey:h,secretKey:new Uint8Array(d)}},t.sign.keyPair.fromSeed=function(d){if(Qt(d),d.length!==Er)throw new Error("bad seed size");for(var h=new Uint8Array(sn),p=new Uint8Array(Fn),l=0;l<32;l++)p[l]=d[l];return vn(h,p,!0),{publicKey:h,secretKey:p}},t.sign.publicKeyLength=sn,t.sign.secretKeyLength=Fn,t.sign.seedLength=Er,t.sign.signatureLength=Et,t.hash=function(d){Qt(d);var h=new Uint8Array(zr);return Rt(h,d,d.length),h},t.hash.hashLength=zr,t.verify=function(d,h){return Qt(d,h),d.length===0||h.length===0||d.length!==h.length?!1:C(d,0,h,0,d.length)===0},t.setPRNG=function(d){r=d},function(){var d=typeof self<"u"?self.crypto||self.msCrypto:null;if(d&&d.getRandomValues){var h=65536;t.setPRNG(function(p,l){var g,P=new Uint8Array(l);for(g=0;g<l;g+=h)d.getRandomValues(P.subarray(g,g+Math.min(l-g,h)));for(g=0;g<l;g++)p[g]=P[g];ja(P)})}else typeof H0<"u"&&(d=W0,d&&d.randomBytes&&t.setPRNG(function(p,l){var g,P=d.randomBytes(l);for(g=0;g<l;g++)p[g]=P[g];ja(P)}))}()})(e.exports?e.exports:self.nacl=self.nacl||{})})(rh);var Y0=rh.exports;const sh=vd(Y0);var ah={exports:{}};(function(e){(function(t,n){e.exports?e.exports=n():(t.nacl||(t.nacl={}),t.nacl.util=n())})(zh,function(){var t={};function n(r){if(!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r))throw new TypeError("invalid encoding")}return t.decodeUTF8=function(r){if(typeof r!="string")throw new TypeError("expected string");var s,a=unescape(encodeURIComponent(r)),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o},t.encodeUTF8=function(r){var s,a=[];for(s=0;s<r.length;s++)a.push(String.fromCharCode(r[s]));return decodeURIComponent(escape(a.join("")))},typeof atob>"u"?typeof Buffer.from<"u"?(t.encodeBase64=function(r){return Buffer.from(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(Buffer.from(r,"base64"),0))}):(t.encodeBase64=function(r){return new Buffer(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(new Buffer(r,"base64"),0))}):(t.encodeBase64=function(r){var s,a=[],o=r.length;for(s=0;s<o;s++)a.push(String.fromCharCode(r[s]));return btoa(a.join(""))},t.decodeBase64=function(r){n(r);var s,a=atob(r),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o}),t})})(ah);var Ei=ah.exports;const ih="hotline-identity";function _c(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}function J0(){const e=sh.sign.keyPair();return{publicKey:e.publicKey,secretKey:e.secretKey}}function Q0(e){const t={publicKey:Ei.encodeBase64(e.publicKey),secretKey:Ei.encodeBase64(e.secretKey)};localStorage.setItem(ih,JSON.stringify(t))}function q0(){const e=localStorage.getItem(ih);if(!e)return null;try{const t=JSON.parse(e);return{publicKey:Ei.decodeBase64(t.publicKey),secretKey:Ei.decodeBase64(t.secretKey)}}catch{return null}}function X0(){const e=q0();if(e)return e;const t=J0();return Q0(t),t}function oh(e,t){const n=new TextEncoder().encode(e),r=sh.sign.detached(n,t);return _c(r)}function lh(e){return _c(e.publicKey)}function Tl(e){const t=_c(e.publicKey),n=Date.now().toString(),r=`${t}:${n}`,s=oh(r,e.secretKey);return{"X-Hotline-PublicKey":t,"X-Hotline-Signature":s,"X-Hotline-Timestamp":n}}function G0({serverAddress:e,identity:t,canUpload:n,canDownload:r}){const{t:s}=Ge(),[a,o]=y.useState(""),[c,u]=y.useState([]),[f,m]=y.useState(!1),x=`http://${e.replace(/:\d+$/,":9999")}`,N=async E=>{m(!0);try{const I=`${x}/files/${E}`,D=await fetch(I,{headers:Tl(t)});if(D.ok){const _=await D.json();u(_.entries||[]),o(E)}}catch{}finally{m(!1)}},w=E=>{if(E.isDir){const I=a?`${a}/${E.name}`:E.name;N(I)}else if(r){const I=a?`${a}/${E.name}`:E.name;window.open(`${x}/files/${I}`,"_blank")}},C=()=>{const E=a.split("/").filter(Boolean);E.pop(),N(E.join("/"))},L=async E=>{var Q;const I=(Q=E.target.files)==null?void 0:Q[0];if(!I)return;const D=new FormData;D.append("file",I);const _=a?`${a}/${I.name}`:I.name;await fetch(`${x}/files/${_}`,{method:"POST",headers:Tl(t),body:D}),N(a)},k=E=>E<1024?`${E} B`:E<1048576?`${(E/1024).toFixed(1)} KB`:`${(E/1048576).toFixed(1)} MB`,v=a?a.split("/").filter(Boolean):[],z=y.useRef(!1);return y.useEffect(()=>{z.current||(z.current=!0,N(""))},[]),i.jsxs("div",{className:"file-browser",children:[i.jsxs("div",{className:"file-header",children:[i.jsx("span",{children:s("files.title")}),n&&i.jsxs("label",{className:"file-upload-btn",children:[i.jsx(ha,{size:13}),i.jsx("input",{type:"file",hidden:!0,onChange:L})]})]}),v.length>0&&i.jsxs("div",{className:"file-breadcrumb",children:[i.jsx("button",{className:"breadcrumb-item",onClick:()=>N(""),children:"~"}),v.map((E,I)=>i.jsxs("span",{className:"breadcrumb-item",children:[i.jsx("span",{className:"breadcrumb-sep",children:"/"}),i.jsx("button",{onClick:()=>N(v.slice(0,I+1).join("/")),children:E})]},I))]}),i.jsxs("div",{className:"file-entries",children:[f&&i.jsxs("div",{className:"file-skeleton",children:[i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"})]}),!f&&a&&i.jsxs("div",{className:"file-entry",onClick:C,children:[i.jsx(Sx,{size:14,className:"file-icon up"}),i.jsx("span",{className:"file-name",children:".."})]}),!f&&c.map(E=>i.jsxs("div",{className:`file-entry ${E.isDir?"dir":""}`,onClick:()=>w(E),children:[E.isDir?i.jsx(Ox,{size:14,className:"file-icon folder"}):i.jsx(Lx,{size:14,className:"file-icon"}),i.jsx("span",{className:"file-name",children:E.name}),!E.isDir&&i.jsx("span",{className:"file-size",children:k(E.size)}),!E.isDir&&r&&i.jsx(_p,{size:12,className:"file-dl"})]},E.name)),!f&&c.length===0&&i.jsxs("div",{className:"file-empty",children:[i.jsx(Tx,{size:20,className:"file-empty-icon"}),i.jsx("span",{children:s("files.empty")})]})]}),i.jsx("style",{children:`
        .file-browser {
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          max-height: 300px;
        }
        .file-header {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .file-upload-btn {
          cursor: pointer;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .file-upload-btn:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .file-breadcrumb {
          padding: 0 16px 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1px;
        }
        .breadcrumb-item button {
          color: var(--text-muted);
          font-size: 11px;
          font-family: var(--font-mono);
          padding: 1px 3px;
          border-radius: 2px;
          transition: color var(--transition-fast);
        }
        .breadcrumb-item button:hover {
          color: var(--accent);
        }
        .breadcrumb-sep {
          color: var(--text-muted);
          opacity: 0.5;
          margin: 0 1px;
        }
        .file-entries {
          overflow-y: auto;
          flex: 1;
          padding-bottom: 4px;
        }
        .file-skeleton {
          padding: 8px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .skeleton-line {
          height: 20px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          animation: pulse 1.5s ease-in-out infinite;
        }
        .skeleton-line:nth-child(2) { width: 75%; }
        .skeleton-line:nth-child(3) { width: 60%; }
        .file-entry {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          cursor: pointer;
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          transition: background var(--transition-fast), transform var(--transition-fast);
          margin: 1px 6px;
          border-radius: var(--radius-sm);
        }
        .file-entry:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .file-entry:active {
          transform: scale(0.99);
        }
        .file-icon {
          flex-shrink: 0;
          color: var(--text-muted);
        }
        .file-icon.folder {
          color: var(--accent);
          opacity: 0.8;
        }
        .file-icon.up {
          color: var(--text-muted);
        }
        .file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .file-size {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .file-dl {
          color: var(--text-muted);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        .file-entry:hover .file-dl {
          opacity: 1;
        }
        .file-empty {
          padding: 20px 16px;
          color: var(--text-muted);
          font-size: 13px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .file-empty-icon {
          opacity: 0.3;
        }
      `})]})}function Z0({motd:e}){const{t}=Ge(),[n,r]=y.useState(!1),[s,a]=y.useState(!1);if(!e||n)return null;const o=e.length>120;return i.jsxs("div",{className:`server-banner ${s?"expanded":""}`,children:[i.jsxs("div",{className:"banner-main",children:[i.jsx(Rx,{size:14,className:"banner-icon"}),i.jsx("span",{className:"banner-label",children:t("server.motd")}),i.jsx("span",{className:"banner-text",children:s||!o?e:e.slice(0,120)+"…"}),i.jsxs("div",{className:"banner-actions",children:[o&&i.jsx("button",{className:"banner-expand",onClick:()=>a(c=>!c),title:s?"Collapse":"Expand",children:s?i.jsx(Px,{size:14}):i.jsx(zx,{size:14})}),i.jsx("button",{className:"banner-dismiss",onClick:()=>r(!0),title:"Dismiss",children:i.jsx(Tt,{size:14})})]})]}),i.jsx("style",{children:`
        .server-banner {
          background: var(--accent-dim);
          border-bottom: 1px solid rgba(var(--accent-rgb), 0.15);
          font-size: 13px;
          color: var(--accent);
          animation: slideDown 0.2s ease;
          overflow: hidden;
        }
        .banner-main {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
        }
        .banner-icon {
          flex-shrink: 0;
          opacity: 0.8;
        }
        .banner-label {
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          flex-shrink: 0;
        }
        .banner-text {
          color: var(--text-secondary);
          flex: 1;
          line-height: 1.4;
        }
        .server-banner.expanded .banner-text {
          white-space: pre-wrap;
        }
        .banner-actions {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-left: auto;
          flex-shrink: 0;
        }
        .banner-expand, .banner-dismiss {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
          display: flex;
        }
        .banner-expand:hover, .banner-dismiss:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `})]})}const e1=[{code:"en",label:"EN"},{code:"fr",label:"FR"}];function t1(){const{i18n:e,t}=Ge(),[n,r]=y.useState(()=>localStorage.getItem("hotline-theme")||"dark");y.useEffect(()=>{document.documentElement.setAttribute("data-theme",n),localStorage.setItem("hotline-theme",n)},[n]);const s=o=>{e.changeLanguage(o.target.value)},a=()=>r(o=>o==="dark"?"light":"dark");return i.jsxs("div",{className:"lang-selector",children:[i.jsx("button",{className:"theme-toggle",onClick:a,title:t("settings.theme"),children:n==="dark"?i.jsx(t0,{size:14}):i.jsx(Vx,{size:14})}),i.jsx(Up,{size:12,className:"lang-icon"}),i.jsx("select",{value:e.language.split("-")[0],onChange:s,children:e1.map(o=>i.jsx("option",{value:o.code,children:o.label},o.code))}),i.jsx("style",{children:`
        .lang-selector {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
        }
        .lang-icon {
          opacity: 0.5;
          flex-shrink: 0;
        }
        .lang-selector select {
          font-size: 11px;
          padding: 2px 4px;
          font-weight: 500;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .lang-selector select:hover {
          color: var(--text-primary);
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: color var(--transition-normal), background var(--transition-normal), transform var(--transition-fast);
        }
        .theme-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
          transform: rotate(15deg);
        }
      `})]})}function n1({onSubmit:e,onClose:t}){const{t:n}=Ge(),[r,s]=y.useState(""),[a,o]=y.useState(""),[c,u]=y.useState(""),f=m=>{m.preventDefault();const b=r.trim().toLowerCase().replace(/\s+/g,"-");b&&(e(b,a.trim(),c.trim()),t())};return i.jsxs("div",{className:"modal-overlay",onClick:t,children:[i.jsxs("form",{className:"modal-content",onClick:m=>m.stopPropagation(),onSubmit:f,children:[i.jsx("h3",{children:n("channel.create")}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.name")}),i.jsx("input",{type:"text",value:r,onChange:m=>s(m.target.value),placeholder:"general",autoFocus:!0,maxLength:32})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.topic")}),i.jsx("input",{type:"text",value:a,onChange:m=>o(m.target.value),placeholder:n("channel.topic"),maxLength:128})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.password")}),i.jsx("input",{type:"password",value:c,onChange:m=>u(m.target.value),placeholder:n("channel.passwordPlaceholder"),maxLength:64})]}),i.jsxs("div",{className:"modal-actions",children:[i.jsx("button",{type:"button",className:"modal-btn-cancel",onClick:t,children:n("channel.cancel")}),i.jsx("button",{type:"submit",className:"modal-btn-submit",disabled:!r.trim(),children:n("channel.submit")})]})]}),i.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fadeIn 0.15s ease;
        }
        .modal-content {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .modal-content h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .modal-field input {
          padding: 10px 12px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 8px;
        }
        .modal-btn-cancel {
          padding: 9px 16px;
          border-radius: var(--radius);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .modal-btn-cancel:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .modal-btn-submit {
          padding: 9px 20px;
          border-radius: var(--radius);
          background: var(--accent);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          transition: background var(--transition-normal), transform var(--transition-fast);
        }
        .modal-btn-submit:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .modal-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .modal-btn-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `})]})}function r1(e,t){if(!t||t.length<2)return[e];const n=[],r=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");let s=0,a,o=0;for(;(a=r.exec(e))!==null;)a.index>s&&n.push(e.slice(s,a.index)),n.push(i.jsx("mark",{className:"search-highlight",children:a[1]},o++)),s=a.index+a[0].length;return s<e.length&&n.push(e.slice(s)),n}function s1({onSearch:e,onClose:t,results:n,activeChannel:r}){const{t:s,i18n:a}=Ge(),[o,c]=y.useState(""),[u,f]=y.useState(!1),m=y.useRef(null),b=y.useRef(0);y.useEffect(()=>{var C;(C=m.current)==null||C.focus()},[]);const x=C=>{c(C),clearTimeout(b.current),C.length>=2&&(b.current=window.setTimeout(()=>{e(C,u?void 0:r)},300))},N=C=>{C.key==="Escape"&&t()},w=C=>new Intl.DateTimeFormat(a.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(C));return i.jsxs("div",{className:"search-panel",children:[i.jsxs("div",{className:"search-header",children:[i.jsx(Il,{size:16}),i.jsx("input",{ref:m,type:"text",className:"search-input",value:o,onChange:C=>x(C.target.value),onKeyDown:N,placeholder:s("search.placeholder")}),n.length>0&&i.jsx("span",{className:"search-count",children:n.length}),i.jsxs("label",{className:"search-scope",children:[i.jsx("input",{type:"checkbox",checked:u,onChange:C=>f(C.target.checked)}),i.jsx("span",{children:s("search.allChannels")})]}),i.jsx("button",{className:"search-close",onClick:t,children:i.jsx(Tt,{size:16})})]}),n.length>0&&i.jsx("ul",{className:"search-results",children:n.map(C=>i.jsxs("li",{className:"search-result-item",children:[i.jsxs("div",{className:"search-result-meta",children:[i.jsx("span",{className:"search-result-nick",children:C.nickname}),i.jsxs("span",{className:"search-result-channel",children:["#",C.channel]}),i.jsx("span",{className:"search-result-time",children:w(C.timestamp)})]}),i.jsx("div",{className:"search-result-content",children:r1(C.content,o)})]},C.id))}),o.length>=2&&n.length===0&&i.jsxs("div",{className:"search-empty",children:[i.jsx(Il,{size:20,className:"search-empty-icon"}),i.jsx("span",{children:s("search.noResults")})]}),i.jsx("style",{children:`
        .search-panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          z-index: 50;
          animation: slideDown 0.15s ease;
          max-height: 60%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }
        .search-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          font-weight: 450;
        }
        .search-input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }
        .search-count {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          background: var(--accent);
          padding: 2px 7px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          line-height: 1.4;
          animation: fadeIn 0.15s ease;
        }
        .search-scope {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .search-scope:hover {
          background: var(--bg-tertiary);
        }
        .search-scope input[type="checkbox"] {
          width: 14px;
          height: 14px;
          accent-color: var(--accent);
        }
        .search-close {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .search-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .search-results {
          list-style: none;
          overflow-y: auto;
          max-height: 300px;
        }
        .search-result-item {
          padding: 10px 16px;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .search-result-item:hover {
          background: var(--bg-tertiary);
        }
        .search-result-item:last-child {
          border-bottom: none;
        }
        .search-result-meta {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 3px;
        }
        .search-result-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .search-result-channel {
          font-size: 11px;
          color: var(--accent);
          font-weight: 500;
        }
        .search-result-time {
          font-size: 11px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .search-result-content {
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }
        .search-highlight {
          background: rgba(var(--accent-rgb), 0.2);
          color: var(--accent);
          border-radius: 2px;
          padding: 1px 3px;
          font-weight: 600;
          border-bottom: 1px solid rgba(var(--accent-rgb), 0.4);
        }
        .search-empty {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 13px;
          animation: fadeIn 0.2s ease;
        }
        .search-empty-icon {
          opacity: 0.4;
        }
      `})]})}function a1({status:e,reconnectIn:t}){const{t:n}=Ge();return e==="connected"?null:i.jsxs("div",{className:`connection-status ${e}`,children:[i.jsxs("div",{className:"connection-status-content",children:[e==="reconnecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot danger"}),i.jsx(i0,{size:13}),i.jsx("span",{children:n("connection.reconnecting",{seconds:t})})]}),e==="connecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(pa,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.connecting")})]}),e==="authenticating"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(pa,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.authenticating")})]})]}),e==="reconnecting"&&i.jsx("div",{className:"connection-progress",children:i.jsx("div",{className:"connection-progress-bar"})}),i.jsx("style",{children:`
        .connection-status {
          animation: slideDown 0.2s ease;
          overflow: hidden;
        }
        .connection-status-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 7px 16px;
          font-size: 12px;
          font-weight: 500;
        }
        .connection-status.reconnecting .connection-status-content {
          background: rgba(239, 68, 68, 0.06);
          color: var(--danger);
        }
        .connection-status.connecting .connection-status-content,
        .connection-status.authenticating .connection-status-content {
          background: rgba(6, 182, 212, 0.06);
          color: var(--accent);
        }
        .connection-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .connection-dot.danger { background: var(--danger); box-shadow: 0 0 6px var(--danger); }
        .connection-dot.accent { background: var(--accent); box-shadow: 0 0 6px var(--accent); }
        .connection-progress {
          height: 2px;
          background: rgba(239, 68, 68, 0.15);
          overflow: hidden;
        }
        .connection-progress-bar {
          height: 100%;
          background: var(--danger);
          animation: progressShrink 5s linear infinite;
          transform-origin: left;
        }
        @keyframes progressShrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `})]})}const ch="hotline_notif_prefs";function i1(){try{const e=localStorage.getItem(ch);if(e)return JSON.parse(e)}catch{}return{soundEnabled:!0,desktopEnabled:!0}}function o1(e){localStorage.setItem(ch,JSON.stringify(e))}function l1({prefs:e,onChange:t}){const{t:n}=Ge(),r=s=>{const a={...e,[s]:!e[s]};t(a),o1(a)};return i.jsxs("div",{className:"notif-settings",children:[i.jsx("button",{className:`notif-toggle ${e.soundEnabled?"active":"muted"}`,onClick:()=>r("soundEnabled"),title:e.soundEnabled?n("notif.muteSound"):n("notif.unmuteSound"),children:e.soundEnabled?i.jsx(s0,{size:15}):i.jsx(a0,{size:15})}),i.jsx("button",{className:`notif-toggle ${e.desktopEnabled?"active":"muted"}`,onClick:()=>r("desktopEnabled"),title:e.desktopEnabled?n("notif.muteDesktop"):n("notif.unmuteDesktop"),children:e.desktopEnabled?i.jsx(Pl,{size:15}):i.jsx(ds,{size:15})}),i.jsx("style",{children:`
        .notif-settings {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .notif-toggle {
          color: var(--text-muted);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .notif-toggle:hover {
          background: var(--bg-tertiary);
          transform: scale(1.1);
        }
        .notif-toggle.active {
          color: var(--text-secondary);
        }
        .notif-toggle.active:hover {
          color: var(--accent);
        }
        .notif-toggle.muted {
          color: var(--danger);
          opacity: 0.6;
        }
        .notif-toggle.muted:hover {
          opacity: 1;
          background: var(--danger-dim);
        }
      `})]})}function c1({messages:e,onRequestPins:t,onUnpin:n,onClose:r,activeChannel:s,canModerate:a}){const{t:o,i18n:c}=Ge();y.useEffect(()=>{t(s)},[s,t]);const u=f=>new Intl.DateTimeFormat(c.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(f));return i.jsxs("div",{className:"pinned-panel",children:[i.jsxs("div",{className:"pinned-header",children:[i.jsx(ys,{size:14}),i.jsx("span",{children:o("pins.title")}),i.jsx("span",{className:"pinned-count",children:e.length}),i.jsx("button",{className:"pinned-close",onClick:r,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"pinned-list",children:[e.length===0&&i.jsxs("div",{className:"pinned-empty",children:[i.jsx(ys,{size:20,className:"pinned-empty-icon"}),i.jsx("span",{children:o("pins.empty")})]}),e.map(f=>i.jsxs("div",{className:"pinned-item",children:[i.jsxs("div",{className:"pinned-item-header",children:[i.jsx("span",{className:"pinned-nick",children:f.nickname}),i.jsx("span",{className:"pinned-time",children:u(f.timestamp)}),a&&n&&i.jsx("button",{className:"pinned-unpin",onClick:()=>n(f.id,s),title:o("pins.unpin"),children:i.jsx(jr,{size:12})})]}),i.jsx("div",{className:"pinned-content",children:f.content})]},f.id))]}),i.jsx("style",{children:`
        .pinned-panel {
          position: absolute;
          top: 48px;
          right: 16px;
          width: 320px;
          max-height: 400px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 60;
          display: flex;
          flex-direction: column;
          animation: fadeInScale 0.15s ease;
          overflow: hidden;
        }
        .pinned-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pinned-count {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 2px 7px;
          border-radius: 10px;
        }
        .pinned-close {
          margin-left: auto;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .pinned-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .pinned-list {
          overflow-y: auto;
          flex: 1;
          padding: 6px;
        }
        .pinned-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .pinned-empty-icon {
          opacity: 0.3;
        }
        .pinned-item {
          padding: 10px 12px;
          border-radius: var(--radius);
          transition: background var(--transition-fast);
          margin-bottom: 2px;
        }
        .pinned-item:hover {
          background: var(--bg-tertiary);
        }
        .pinned-item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .pinned-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pinned-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .pinned-unpin {
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .pinned-item:hover .pinned-unpin {
          opacity: 1;
        }
        .pinned-unpin:hover {
          color: var(--danger);
        }
        .pinned-content {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `})]})}const uh="hotline_bookmarks";function Gi(){try{const e=localStorage.getItem(uh);return e?JSON.parse(e):[]}catch{return[]}}function dh(e){localStorage.setItem(uh,JSON.stringify(e))}function u1(e){const t=Gi();if(t.some(r=>r.id===e.id))return t;const n=[e,...t];return dh(n),n}function Zu(e){const t=Gi().filter(n=>n.id!==e);return dh(t),t}function Mo(e){return Gi().some(t=>t.id===e)}function d1({bookmarks:e,onRemove:t,onClose:n}){const{t:r,i18n:s}=Ge(),a=o=>new Intl.DateTimeFormat(s.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(o));return i.jsxs("div",{className:"bookmarks-panel",children:[i.jsxs("div",{className:"bookmarks-header",children:[i.jsx(fa,{size:14}),i.jsx("span",{children:r("bookmarks.title")}),i.jsx("span",{className:"bookmarks-count",children:e.length}),i.jsx("button",{className:"bookmarks-close",onClick:n,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"bookmarks-list",children:[e.length===0&&i.jsxs("div",{className:"bookmarks-empty",children:[i.jsx(fa,{size:20,className:"bookmarks-empty-icon"}),i.jsx("span",{children:r("bookmarks.empty")})]}),e.map(o=>i.jsxs("div",{className:"bookmark-item",children:[i.jsxs("div",{className:"bookmark-item-header",children:[i.jsx("span",{className:"bookmark-nick",children:o.nickname}),i.jsxs("span",{className:"bookmark-channel",children:["#",o.channel]}),i.jsx("span",{className:"bookmark-time",children:a(o.timestamp)}),i.jsx("button",{className:"bookmark-remove",onClick:()=>t(o.id),title:r("bookmarks.remove"),children:i.jsx(jr,{size:12})})]}),i.jsx("div",{className:"bookmark-content",children:o.content})]},o.id))]}),i.jsx("style",{children:`
        .bookmarks-panel {
          position: absolute;
          top: 48px;
          right: 16px;
          width: 340px;
          max-height: 420px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          z-index: 60;
          display: flex;
          flex-direction: column;
          animation: fadeInScale 0.15s ease;
          overflow: hidden;
        }
        .bookmarks-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .bookmarks-count {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-dim);
          padding: 2px 7px;
          border-radius: 10px;
        }
        .bookmarks-close {
          margin-left: auto;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .bookmarks-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .bookmarks-list {
          overflow-y: auto;
          flex: 1;
          padding: 6px;
        }
        .bookmarks-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 24px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .bookmarks-empty-icon {
          opacity: 0.3;
        }
        .bookmark-item {
          padding: 10px 12px;
          border-radius: var(--radius);
          transition: background var(--transition-fast);
          margin-bottom: 2px;
        }
        .bookmark-item:hover {
          background: var(--bg-tertiary);
        }
        .bookmark-item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .bookmark-nick {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .bookmark-channel {
          font-size: 10px;
          color: var(--accent);
          font-weight: 500;
        }
        .bookmark-time {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: auto;
        }
        .bookmark-remove {
          color: var(--text-muted);
          padding: 3px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .bookmark-item:hover .bookmark-remove {
          opacity: 1;
        }
        .bookmark-remove:hover {
          color: var(--danger);
        }
        .bookmark-content {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `})]})}function f1({channel:e,onSetTopic:t,onClose:n,canEdit:r}){const{t:s}=Ge(),[a,o]=y.useState(e.topic),c=()=>{a!==e.topic&&t(e.name,a.trim()),n()};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:"chsettings-modal",onClick:u=>u.stopPropagation(),children:[i.jsxs("div",{className:"chsettings-header",children:[i.jsx("div",{className:"chsettings-icon",children:e.hasPassword?i.jsx(Ci,{size:18}):i.jsx(ka,{size:18})}),i.jsxs("div",{children:[i.jsx("h3",{children:e.name}),i.jsx("span",{className:"chsettings-subtitle",children:s("channelSettings.title")})]})]}),i.jsxs("div",{className:"chsettings-info",children:[i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(Oc,{size:14}),i.jsxs("span",{children:[e.userCount," ",s("channelSettings.members")]})]}),e.hasPassword&&i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(Ci,{size:14}),i.jsx("span",{children:s("channelSettings.passwordProtected")})]})]}),i.jsxs("div",{className:"chsettings-field",children:[i.jsx("label",{children:s("channel.topic")}),r?i.jsx("textarea",{value:a,onChange:u=>o(u.target.value),placeholder:s("channelSettings.topicPlaceholder"),maxLength:256,rows:3}):i.jsx("div",{className:"chsettings-topic-display",children:e.topic||i.jsx("em",{className:"text-muted",children:s("channelSettings.noTopic")})})]}),i.jsxs("div",{className:"chsettings-actions",children:[i.jsx("button",{className:"modal-btn-cancel",onClick:n,children:s(r?"channel.cancel":"channelSettings.close")}),r&&i.jsx("button",{className:"modal-btn-submit",onClick:c,disabled:a===e.topic,children:s("channelSettings.save")})]})]}),i.jsx("style",{children:`
        .chsettings-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .chsettings-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .chsettings-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chsettings-header h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }
        .chsettings-subtitle {
          font-size: 12px;
          color: var(--text-muted);
        }
        .chsettings-info {
          display: flex;
          gap: 16px;
          padding: 12px 14px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
        }
        .chsettings-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .chsettings-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .chsettings-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .chsettings-field textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
        }
        .chsettings-topic-display {
          padding: 10px 12px;
          background: var(--bg-tertiary);
          border-radius: var(--radius);
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .chsettings-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 4px;
        }
        .chsettings-actions .modal-btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      `})]})}function p1({onDrop:e,enabled:t}){const{t:n}=Ge(),[r,s]=y.useState(!1),a=y.useRef(0),o=y.useCallback(m=>{var b;m.preventDefault(),t&&(a.current++,(b=m.dataTransfer)!=null&&b.types.includes("Files")&&s(!0))},[t]),c=y.useCallback(m=>{m.preventDefault(),a.current--,a.current===0&&s(!1)},[]),u=y.useCallback(m=>{m.preventDefault()},[]),f=y.useCallback(m=>{var x;if(m.preventDefault(),a.current=0,s(!1),!t)return;const b=(x=m.dataTransfer)==null?void 0:x.files[0];b&&e(b)},[t,e]);return y.useEffect(()=>(document.addEventListener("dragenter",o),document.addEventListener("dragleave",c),document.addEventListener("dragover",u),document.addEventListener("drop",f),()=>{document.removeEventListener("dragenter",o),document.removeEventListener("dragleave",c),document.removeEventListener("dragover",u),document.removeEventListener("drop",f)}),[o,c,u,f]),r?i.jsxs("div",{className:"drag-drop-overlay",children:[i.jsxs("div",{className:"drag-drop-zone",children:[i.jsx(ha,{size:40,className:"drag-drop-icon"}),i.jsx("span",{className:"drag-drop-text",children:n("files.dropHere")}),i.jsx("span",{className:"drag-drop-hint",children:"Images, documents, archives"})]}),i.jsx("style",{children:`
        .drag-drop-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 500;
          animation: fadeIn 0.15s ease;
        }
        .drag-drop-zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px 72px;
          border: 2px dashed var(--accent);
          border-radius: var(--radius-lg);
          background: rgba(var(--accent-rgb), 0.06);
          animation: fadeInScale 0.2s ease;
          box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.15);
        }
        .drag-drop-icon {
          color: var(--accent);
          animation: dragBounce 1.5s ease-in-out infinite;
          filter: drop-shadow(0 4px 12px rgba(var(--accent-rgb), 0.3));
        }
        .drag-drop-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .drag-drop-hint {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 400;
        }
        @keyframes dragBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `})]}):null}const h1=[{keys:"Ctrl + K",action:"shortcuts.search"},{keys:"Ctrl + B",action:"shortcuts.bold"},{keys:"Ctrl + I",action:"shortcuts.italic"},{keys:"Escape",action:"shortcuts.close"},{keys:"Enter",action:"shortcuts.send"},{keys:"Shift + Enter",action:"shortcuts.newline"},{keys:"@ + name",action:"shortcuts.mention"},{keys:"?",action:"shortcuts.showHelp"}];function m1({onClose:e}){const{t}=Ge();return i.jsxs("div",{className:"modal-overlay",onClick:e,children:[i.jsxs("div",{className:"shortcuts-modal",onClick:n=>n.stopPropagation(),children:[i.jsxs("div",{className:"shortcuts-header",children:[i.jsx(Dx,{size:18}),i.jsx("h3",{children:t("shortcuts.title")}),i.jsx("button",{className:"shortcuts-close",onClick:e,children:i.jsx(Tt,{size:16})})]}),i.jsx("div",{className:"shortcuts-list",children:h1.map(n=>i.jsxs("div",{className:"shortcut-row",children:[i.jsx("span",{className:"shortcut-action",children:t(n.action)}),i.jsx("span",{className:"shortcut-key-group",children:n.keys.split(" + ").map((r,s)=>i.jsxs("span",{children:[s>0&&i.jsx("span",{className:"shortcut-plus",children:"+"}),i.jsx("kbd",{className:"shortcut-key",children:r})]},s))})]},n.keys))})]}),i.jsx("style",{children:`
        .shortcuts-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 100%;
          max-width: 380px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        .shortcuts-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--text-primary);
        }
        .shortcuts-header h3 {
          font-size: 16px;
          font-weight: 700;
          flex: 1;
        }
        .shortcuts-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }
        .shortcuts-close:hover {
          color: var(--text-primary);
        }
        .shortcuts-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .shortcut-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }
        .shortcut-row:hover {
          background: var(--bg-tertiary);
        }
        .shortcut-action {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 450;
        }
        .shortcut-key-group {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }
        .shortcut-plus {
          font-size: 10px;
          color: var(--text-muted);
          padding: 0 2px;
        }
        .shortcut-key {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          padding: 3px 7px;
          border-radius: var(--radius-sm);
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
      `})]})}function g1({serverName:e,motd:t,onUpdateSettings:n,onRequestBanList:r,onUnban:s,onClose:a}){const{t:o}=Ge(),[c,u]=y.useState("settings"),[f,m]=y.useState(e),[b,x]=y.useState(t),[N,w]=y.useState(!1);y.useEffect(()=>{r()},[]);const C=()=>{n(f.trim(),b.trim()),w(!0),setTimeout(()=>w(!1),2e3)};return i.jsxs("div",{className:"modal-overlay",onClick:a,children:[i.jsxs("div",{className:"admin-panel",onClick:L=>L.stopPropagation(),children:[i.jsxs("div",{className:"admin-header",children:[i.jsx(Wp,{size:18}),i.jsx("h3",{children:o("admin.title")}),i.jsx("button",{className:"admin-close",onClick:a,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"admin-tabs",children:[i.jsxs("button",{className:`admin-tab ${c==="settings"?"active":""}`,onClick:()=>u("settings"),children:[i.jsx(Kp,{size:14}),o("admin.settings")]}),i.jsxs("button",{className:`admin-tab ${c==="bans"?"active":""}`,onClick:()=>u("bans"),children:[i.jsx(n0,{size:14}),o("admin.bans")]})]}),c==="settings"&&i.jsxs("div",{className:"admin-content",children:[i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.serverName")}),i.jsx("input",{type:"text",value:f,onChange:L=>m(L.target.value),maxLength:64})]}),i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.motd")}),i.jsx("textarea",{value:b,onChange:L=>x(L.target.value),rows:4,maxLength:512})]}),i.jsxs("button",{className:`admin-save ${N?"saved":""}`,onClick:C,children:[N?i.jsx(Mc,{size:14}):i.jsx(Vp,{size:14}),o(N?"admin.saved":"admin.save")]})]}),c==="bans"&&i.jsxs("div",{className:"admin-content",children:[i.jsx("p",{className:"admin-ban-info",children:o("admin.banInfo")}),i.jsx("div",{className:"admin-ban-empty",children:o("admin.noBans")})]})]}),i.jsx("style",{children:`
        .admin-panel {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0;
          width: 100%;
          max-width: 440px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .admin-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
          color: var(--text-primary);
        }
        .admin-header h3 {
          font-size: 16px;
          font-weight: 700;
          flex: 1;
        }
        .admin-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }
        .admin-close:hover {
          color: var(--text-primary);
        }
        .admin-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
        }
        .admin-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          transition: color var(--transition-fast), background var(--transition-fast);
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
        }
        .admin-tab:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .admin-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .admin-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-field label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .admin-field input {
          padding: 10px 12px;
          font-size: 14px;
        }
        .admin-field textarea {
          padding: 10px 12px;
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.4;
        }
        .admin-save {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 20px;
          background: var(--accent);
          color: #fff;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 13px;
          transition: background var(--transition-normal), transform var(--transition-fast), box-shadow var(--transition-fast);
          align-self: flex-start;
        }
        .admin-save:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
        }
        .admin-save.saved {
          background: #10b981;
          pointer-events: none;
        }
        .admin-ban-info {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .admin-ban-empty {
          text-align: center;
          padding: 20px;
          color: var(--text-muted);
          font-size: 13px;
        }
      `})]})}function x1({channelName:e,onSubmit:t,onCancel:n}){const{t:r}=Ge(),[s,a]=y.useState(""),[o,c]=y.useState(!1),u=()=>{if(!s.trim()){c(!0),setTimeout(()=>c(!1),500);return}t(s)};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:`channel-pw-modal ${o?"shake":""}`,onClick:f=>f.stopPropagation(),children:[i.jsx("div",{className:"channel-pw-icon",children:i.jsx(Ci,{size:24})}),i.jsx("h3",{className:"channel-pw-title",children:r("channel.passwordRequired")}),i.jsx("p",{className:"channel-pw-desc",children:r("channel.passwordDesc",{channel:e})}),i.jsxs("div",{className:"channel-pw-input-row",children:[i.jsx("input",{type:"password",className:"channel-pw-input",value:s,onChange:f=>a(f.target.value),onKeyDown:f=>{f.key==="Enter"&&u(),f.key==="Escape"&&n()},placeholder:r("channel.passwordPlaceholderJoin"),autoFocus:!0}),i.jsx("button",{className:"channel-pw-submit",onClick:u,disabled:!s.trim(),children:i.jsx(jx,{size:16})})]}),i.jsx("button",{className:"channel-pw-cancel",onClick:n,children:r("channel.cancel")})]}),i.jsx("style",{children:`
        .channel-pw-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 32px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: fadeInScale 0.2s ease;
          box-shadow: var(--shadow-lg);
          text-align: center;
        }
        .channel-pw-modal.shake {
          animation: headShake 0.5s ease;
        }
        .channel-pw-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--accent-dim);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
          box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15);
          animation: lockPulse 2s ease-in-out infinite;
        }
        @keyframes lockPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15); }
          50% { box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.25); }
        }
        .channel-pw-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .channel-pw-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .channel-pw-input-row {
          display: flex;
          gap: 8px;
          width: 100%;
          margin-top: 4px;
        }
        .channel-pw-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 14px;
          text-align: center;
          letter-spacing: 2px;
        }
        .channel-pw-submit {
          padding: 10px 14px;
          background: var(--accent);
          color: #fff;
          border-radius: var(--radius);
          transition: background var(--transition-normal), transform var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .channel-pw-submit:hover:not(:disabled) {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }
        .channel-pw-submit:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .channel-pw-cancel {
          font-size: 12px;
          color: var(--text-muted);
          padding: 4px 12px;
          transition: color var(--transition-fast);
        }
        .channel-pw-cancel:hover {
          color: var(--text-primary);
        }
        @keyframes headShake {
          0% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(5px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `})]})}function v1({src:e,onClose:t}){const[n,r]=y.useState(1),[s,a]=y.useState(0),[o,c]=y.useState(!1),u=y.useCallback(m=>{m.key==="Escape"&&t(),(m.key==="+"||m.key==="=")&&r(b=>Math.min(b+.25,4)),m.key==="-"&&r(b=>Math.max(b-.25,.5)),m.key==="r"&&a(b=>b+90)},[t]);y.useEffect(()=>(document.addEventListener("keydown",u),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",u),document.body.style.overflow=""}),[u]);const f=m=>{m.preventDefault();const b=m.deltaY>0?-.1:.1;r(x=>Math.max(.5,Math.min(4,x+b)))};return i.jsxs("div",{className:"lightbox-overlay",onClick:t,children:[i.jsxs("div",{className:"lightbox-toolbar",onClick:m=>m.stopPropagation(),children:[i.jsx("button",{onClick:()=>r(m=>Math.min(m+.25,4)),title:"Zoom in",children:i.jsx(l0,{size:16})}),i.jsx("button",{onClick:()=>r(m=>Math.max(m-.25,.5)),title:"Zoom out",children:i.jsx(c0,{size:16})}),i.jsx("button",{onClick:()=>a(m=>m+90),title:"Rotate",children:i.jsx(qx,{size:16})}),i.jsx("button",{onClick:()=>{r(1),a(0)},title:"Reset",children:i.jsx(Fx,{size:16})}),i.jsxs("span",{className:"lightbox-scale",children:[Math.round(n*100),"%"]}),i.jsx("a",{href:e,download:!0,className:"lightbox-download",title:"Download",onClick:m=>m.stopPropagation(),children:i.jsx(_p,{size:16})}),i.jsx("button",{className:"lightbox-close-btn",onClick:t,title:"Close (Esc)",children:i.jsx(Tt,{size:18})})]}),i.jsxs("div",{className:"lightbox-content",onClick:m=>m.stopPropagation(),onWheel:f,children:[!o&&i.jsx("div",{className:"lightbox-loading",children:i.jsx("div",{className:"lightbox-spinner"})}),i.jsx("img",{src:e,alt:"",className:`lightbox-img ${o?"loaded":""}`,style:{transform:`scale(${n}) rotate(${s}deg)`},onLoad:()=>c(!0),onDoubleClick:()=>{r(1),a(0)},draggable:!1})]}),i.jsx("style",{children:`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 600;
          animation: fadeIn 0.15s ease;
        }
        .lightbox-toolbar {
          position: absolute;
          top: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
          padding: 6px 10px;
          z-index: 601;
        }
        .lightbox-toolbar button, .lightbox-toolbar a {
          color: rgba(255, 255, 255, 0.7);
          padding: 6px;
          border-radius: var(--radius-sm);
          transition: color 0.15s, background 0.15s;
          display: flex;
          align-items: center;
        }
        .lightbox-toolbar button:hover, .lightbox-toolbar a:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .lightbox-scale {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          min-width: 36px;
          text-align: center;
          font-variant-numeric: tabular-nums;
        }
        .lightbox-close-btn {
          margin-left: 4px;
        }
        .lightbox-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: grab;
          overflow: hidden;
        }
        .lightbox-content:active {
          cursor: grabbing;
        }
        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: var(--radius);
          opacity: 0;
          transition: transform 0.2s ease, opacity 0.3s ease;
          user-select: none;
        }
        .lightbox-img.loaded {
          opacity: 1;
        }
        .lightbox-loading {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lightbox-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `})]})}function y1({rootMessage:e,replies:t,currentUserId:n,currentRole:r,onClose:s,onReact:a,onRemoveReact:o,onEdit:c,onDelete:u,onBookmark:f,isBookmarked:m,onImageClick:b}){const{t:x}=Ge(),N=r==="admin"||r==="operator";return i.jsxs("div",{className:"thread-panel",children:[i.jsxs("div",{className:"thread-panel-header",children:[i.jsx(Tc,{size:15}),i.jsx("span",{className:"thread-panel-title",children:x("thread.title")}),i.jsxs("span",{className:"thread-panel-count",children:[t.length," ",t.length===1?x("thread.reply"):x("thread.replies")]}),i.jsx("button",{className:"thread-panel-close",onClick:s,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"thread-panel-messages",children:[i.jsx("div",{className:"thread-root",children:i.jsx(Ll,{id:e.id,userId:e.userId,nickname:e.nickname,content:e.content,role:e.role,timestamp:e.timestamp,isOwn:e.userId===n,edited:e.edited,reactions:e.reactions,currentUserId:n,canModerate:N,onReact:a,onRemoveReact:o,onEdit:c,onDelete:u,onBookmark:f,isBookmarked:m==null?void 0:m(e.id),onImageClick:b})}),t.length>0&&i.jsx("div",{className:"thread-separator",children:i.jsxs("span",{children:[t.length," ",t.length===1?x("thread.reply"):x("thread.replies")]})}),t.map((w,C)=>{const L=C>0?t[C-1]:void 0,k=L!==void 0&&L.userId===w.userId&&w.timestamp-L.timestamp<12e4;return i.jsx(Ll,{id:w.id,userId:w.userId,nickname:w.nickname,content:w.content,role:w.role,timestamp:w.timestamp,isOwn:w.userId===n,edited:w.edited,reactions:w.reactions,currentUserId:n,canModerate:N,onReact:a,onRemoveReact:o,onEdit:c,onDelete:u,onBookmark:f,isBookmarked:m==null?void 0:m(w.id),isGrouped:k,onImageClick:b},w.id)})]}),i.jsx("style",{children:`
        .thread-panel {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 360px;
          background: var(--bg-primary);
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 40;
          animation: slideInRight 0.2s ease;
          box-shadow: var(--shadow-lg);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .thread-panel-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          background: var(--bg-secondary);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .thread-panel-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .thread-panel-count {
          font-size: 11px;
          color: var(--text-muted);
          margin-left: auto;
          margin-right: 8px;
        }
        .thread-panel-close {
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .thread-panel-close:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }
        .thread-panel-messages {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }
        .thread-root {
          padding-bottom: 8px;
          background: var(--bg-secondary);
          border-radius: var(--radius-sm);
          margin: 4px 8px;
        }
        .thread-separator {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          gap: 12px;
        }
        .thread-separator::before,
        .thread-separator::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .thread-separator span {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
      `})]})}const ti=[{key:"--accent",label:"Accent",default:"#6366f1"},{key:"--bg-primary",label:"Background",default:"#0f0f12"},{key:"--bg-secondary",label:"Surface",default:"#1a1a22"},{key:"--bg-tertiary",label:"Tertiary",default:"#24242e"},{key:"--text-primary",label:"Text",default:"#f0f0f5"},{key:"--text-muted",label:"Muted",default:"#6b6b80"},{key:"--border",label:"Border",default:"#2a2a35"},{key:"--danger",label:"Danger",default:"#ef4444"}],fh="hotline-custom-themes",zi="hotline-active-theme";function ph(){try{return JSON.parse(localStorage.getItem(fh)||"[]")}catch{return[]}}function ed(e){localStorage.setItem(fh,JSON.stringify(e))}function Ol(e){const t=document.documentElement;for(const[n,r]of Object.entries(e))if(t.style.setProperty(n,r),n==="--accent"){const s=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),o=parseInt(r.slice(5,7),16);t.style.setProperty("--accent-rgb",`${s}, ${a}, ${o}`)}}function b1(){const e=document.documentElement;for(const t of ti)e.style.removeProperty(t.key);e.style.removeProperty("--accent-rgb"),localStorage.removeItem(zi)}function w1({onClose:e}){const{t}=Ge(),[n,r]=y.useState(ph),[s,a]=y.useState(()=>{const C={};for(const L of ti){const k=getComputedStyle(document.documentElement).getPropertyValue(L.key).trim();C[L.key]=k||L.default}return C}),[o,c]=y.useState(""),[u,f]=y.useState(!1);y.useEffect(()=>{Ol(s)},[s]);const m=(C,L)=>{a(k=>({...k,[C]:L}))},b=()=>{if(!o.trim())return;const C={id:Date.now().toString(36),name:o.trim(),colors:{...s}},L=[...n,C];r(L),ed(L),localStorage.setItem(zi,C.id),f(!0),setTimeout(()=>f(!1),2e3)},x=C=>{a(C.colors),c(C.name),Ol(C.colors),localStorage.setItem(zi,C.id)},N=C=>{const L=n.filter(k=>k.id!==C);r(L),ed(L)},w=()=>{b1();const C={};for(const L of ti)C[L.key]=L.default;a(C)};return i.jsx("div",{className:"modal-overlay",onClick:e,children:i.jsxs("div",{className:"theme-editor",onClick:C=>C.stopPropagation(),children:[i.jsxs("div",{className:"theme-editor-header",children:[i.jsx($p,{size:18}),i.jsx("h3",{children:t("theme.title")}),i.jsx("button",{className:"theme-editor-close",onClick:e,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"theme-editor-body",children:[i.jsx("div",{className:"theme-colors",children:ti.map(C=>i.jsxs("div",{className:"theme-color-row",children:[i.jsx("label",{className:"theme-color-label",children:C.label}),i.jsxs("div",{className:"theme-color-input-wrap",children:[i.jsx("input",{type:"color",value:s[C.key]||C.default,onChange:L=>m(C.key,L.target.value),className:"theme-color-picker"}),i.jsx("input",{type:"text",value:s[C.key]||C.default,onChange:L=>m(C.key,L.target.value),className:"theme-color-hex",maxLength:7})]})]},C.key))}),i.jsxs("div",{className:"theme-save-row",children:[i.jsx("input",{type:"text",placeholder:t("theme.namePlaceholder"),value:o,onChange:C=>c(C.target.value),className:"theme-name-input"}),i.jsxs("button",{className:`theme-save-btn ${u?"saved":""}`,onClick:b,disabled:!o.trim(),children:[u?i.jsx(Mc,{size:14}):i.jsx(Vp,{size:14}),i.jsx("span",{children:t(u?"theme.saved":"theme.save")})]}),i.jsx("button",{className:"theme-reset-btn",onClick:w,title:t("theme.reset"),children:i.jsx(Qx,{size:14})})]}),n.length>0&&i.jsxs("div",{className:"theme-list",children:[i.jsx("span",{className:"theme-list-label",children:t("theme.saved_themes")}),n.map(C=>i.jsxs("div",{className:"theme-list-item",children:[i.jsx("div",{className:"theme-list-swatches",children:Object.values(C.colors).slice(0,4).map((L,k)=>i.jsx("span",{className:"theme-swatch",style:{background:L}},k))}),i.jsx("span",{className:"theme-list-name",onClick:()=>x(C),children:C.name}),i.jsx("button",{className:"theme-list-delete",onClick:()=>N(C.id),children:i.jsx(Tt,{size:12})})]},C.id))]})]}),i.jsx("style",{children:`
          .theme-editor {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 0;
            width: 100%;
            max-width: 400px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .theme-editor-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .theme-editor-header h3 {
            flex: 1;
            font-size: 15px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .theme-editor-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .theme-editor-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .theme-editor-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 400px;
            overflow-y: auto;
          }
          .theme-colors {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .theme-color-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .theme-color-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            min-width: 70px;
          }
          .theme-color-input-wrap {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .theme-color-picker {
            width: 28px;
            height: 28px;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            padding: 0;
            background: none;
          }
          .theme-color-hex {
            width: 72px;
            padding: 4px 8px;
            font-size: 11px;
            font-family: var(--font-mono);
            text-align: center;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
          }
          .theme-save-row {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .theme-name-input {
            flex: 1;
            padding: 8px 12px;
            font-size: 13px;
          }
          .theme-save-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 12px;
            background: var(--accent);
            color: #fff;
            border-radius: var(--radius-sm);
            font-size: 12px;
            font-weight: 600;
            transition: background var(--transition-fast), transform var(--transition-fast);
          }
          .theme-save-btn:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }
          .theme-save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
          .theme-save-btn.saved { background: #10b981; }
          .theme-reset-btn {
            padding: 8px;
            color: var(--text-muted);
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .theme-reset-btn:hover {
            color: var(--danger);
            background: var(--danger-dim);
          }
          .theme-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .theme-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .theme-list-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 8px;
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
            cursor: pointer;
          }
          .theme-list-item:hover {
            background: var(--bg-tertiary);
          }
          .theme-list-swatches {
            display: flex;
            gap: 2px;
          }
          .theme-swatch {
            width: 12px;
            height: 12px;
            border-radius: 3px;
            border: 1px solid var(--border);
          }
          .theme-list-name {
            flex: 1;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-primary);
          }
          .theme-list-delete {
            color: var(--text-muted);
            padding: 3px;
            border-radius: var(--radius-sm);
            opacity: 0;
            transition: opacity var(--transition-fast), color var(--transition-fast);
          }
          .theme-list-item:hover .theme-list-delete { opacity: 1; }
          .theme-list-delete:hover { color: var(--danger); }
        `})]})})}function k1(){const e=localStorage.getItem(zi);if(!e)return;const n=ph().find(r=>r.id===e);n&&Ol(n.colors)}function j1({messages:e,userCount:t,channelCount:n,serverName:r,onClose:s}){const{t:a}=Ge(),o=y.useMemo(()=>{const u=Date.now(),f=e.filter(L=>u-L.timestamp<36e5).length,m=e.filter(L=>u-L.timestamp<864e5).length,b={};for(const L of e)b[L.userId]||(b[L.userId]={nickname:L.nickname,count:0}),b[L.userId].count++;const x=Object.values(b).sort((L,k)=>k.count-L.count).slice(0,5),N={};for(const L of e)N[L.channel]=(N[L.channel]||0)+1;const w=Object.entries(N).sort(([,L],[,k])=>k-L).slice(0,5),C=new Array(24).fill(0);for(const L of e)if(u-L.timestamp<864e5){const k=new Date(L.timestamp).getHours();C[k]++}return{total:e.length,lastHour:f,last24h:m,topUsers:x,topChannels:w,hourly:C}},[e]),c=Math.max(...o.hourly,1);return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"stats-panel",onClick:u=>u.stopPropagation(),children:[i.jsxs("div",{className:"stats-header",children:[i.jsx(Jp,{size:18}),i.jsxs("h3",{children:[r," — ",a("stats.title")]}),i.jsx("button",{className:"stats-close",onClick:s,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"stats-body",children:[i.jsxs("div",{className:"stats-cards",children:[i.jsxs("div",{className:"stats-card",children:[i.jsx(Bx,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.total}),i.jsx("span",{className:"stats-card-label",children:a("stats.totalMessages")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(Oc,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:t}),i.jsx("span",{className:"stats-card-label",children:a("stats.onlineUsers")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(ka,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:n}),i.jsx("span",{className:"stats-card-label",children:a("stats.channels")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(Ic,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.lastHour}),i.jsx("span",{className:"stats-card-label",children:a("stats.lastHour")})]})]})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.activity24h")}),i.jsx("div",{className:"stats-chart",children:o.hourly.map((u,f)=>i.jsx("div",{className:"stats-bar-wrap",title:`${f}:00 — ${u} msgs`,children:i.jsx("div",{className:"stats-bar",style:{height:`${u/c*100}%`}})},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topContributors")}),i.jsx("ul",{className:"stats-ranking",children:o.topUsers.map((u,f)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",f+1]}),i.jsx("span",{className:"stats-rank-name",children:u.nickname}),i.jsx("span",{className:"stats-rank-count",children:u.count})]},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topChannels")}),i.jsx("ul",{className:"stats-ranking",children:o.topChannels.map(([u,f],m)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",m+1]}),i.jsxs("span",{className:"stats-rank-name",children:["#",u]}),i.jsx("span",{className:"stats-rank-count",children:f})]},m))})]})]}),i.jsx("style",{children:`
          .stats-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 480px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .stats-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 16px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .stats-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .stats-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .stats-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .stats-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 450px;
            overflow-y: auto;
          }
          .stats-cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .stats-card {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px;
            background: var(--bg-tertiary);
            border-radius: var(--radius);
            border: 1px solid var(--border-subtle);
            color: var(--accent);
          }
          .stats-card-info {
            display: flex;
            flex-direction: column;
          }
          .stats-card-value {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.2;
          }
          .stats-card-label {
            font-size: 10px;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.3px;
            font-weight: 500;
          }
          .stats-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .stats-section-title {
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .stats-chart {
            display: flex;
            align-items: flex-end;
            gap: 2px;
            height: 60px;
            padding: 4px 0;
          }
          .stats-bar-wrap {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: flex-end;
          }
          .stats-bar {
            width: 100%;
            background: var(--accent);
            border-radius: 2px 2px 0 0;
            min-height: 2px;
            opacity: 0.7;
            transition: opacity var(--transition-fast);
          }
          .stats-bar-wrap:hover .stats-bar {
            opacity: 1;
          }
          .stats-ranking {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .stats-ranking li {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 8px;
            border-radius: var(--radius-sm);
            font-size: 12px;
          }
          .stats-ranking li:hover {
            background: var(--bg-tertiary);
          }
          .stats-rank {
            font-weight: 700;
            color: var(--text-muted);
            width: 20px;
            font-size: 10px;
          }
          .stats-rank-name {
            flex: 1;
            font-weight: 500;
            color: var(--text-primary);
          }
          .stats-rank-count {
            font-size: 11px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
            background: var(--bg-tertiary);
            padding: 1px 6px;
            border-radius: 8px;
          }
        `})]})})}function S1({messageContent:e,messageAuthor:t,channels:n,currentChannel:r,onForward:s,onClose:a}){const{t:o}=Ge(),[c,u]=y.useState(""),[f,m]=y.useState(""),b=n.filter(N=>N.name!==r),x=()=>{c&&(s(c,f.trim()||void 0),a())};return i.jsx("div",{className:"modal-overlay",onClick:a,children:i.jsxs("div",{className:"forward-dialog",onClick:N=>N.stopPropagation(),children:[i.jsxs("div",{className:"forward-header",children:[i.jsx(Ap,{size:16}),i.jsx("h3",{children:o("forward.title")}),i.jsx("button",{className:"forward-close",onClick:a,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"forward-body",children:[i.jsxs("div",{className:"forward-preview",children:[i.jsx("span",{className:"forward-preview-author",children:t}),i.jsx("span",{className:"forward-preview-content",children:e.length>120?e.slice(0,120)+"...":e})]}),i.jsxs("div",{className:"forward-target",children:[i.jsx("label",{className:"forward-label",children:o("forward.sendTo")}),i.jsx("div",{className:"forward-channel-list",children:b.map(N=>i.jsxs("button",{className:`forward-channel-btn ${c===N.name?"selected":""}`,onClick:()=>u(N.name),children:[i.jsx(ka,{size:12}),i.jsx("span",{children:N.name})]},N.name))})]}),i.jsx("div",{className:"forward-comment",children:i.jsx("input",{type:"text",placeholder:o("forward.commentPlaceholder"),value:f,onChange:N=>m(N.target.value),className:"forward-comment-input",onKeyDown:N=>{N.key==="Enter"&&x()}})})]}),i.jsxs("div",{className:"forward-footer",children:[i.jsx("button",{className:"forward-cancel",onClick:a,children:o("forward.cancel")}),i.jsxs("button",{className:"forward-submit",onClick:x,disabled:!c,children:[i.jsx(Qi,{size:13}),i.jsx("span",{children:o("forward.send")})]})]}),i.jsx("style",{children:`
          .forward-dialog {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 420px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .forward-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .forward-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .forward-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .forward-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .forward-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .forward-preview {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border-radius: var(--radius);
            border-left: 3px solid var(--accent);
          }
          .forward-preview-author {
            font-size: 11px;
            font-weight: 700;
            color: var(--accent);
          }
          .forward-preview-content {
            font-size: 12px;
            color: var(--text-secondary);
            line-height: 1.4;
          }
          .forward-target {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .forward-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .forward-channel-list {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            max-height: 120px;
            overflow-y: auto;
          }
          .forward-channel-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            transition: all var(--transition-fast);
            cursor: pointer;
          }
          .forward-channel-btn:hover {
            color: var(--text-primary);
            border-color: var(--accent);
            background: var(--accent-dim);
          }
          .forward-channel-btn.selected {
            color: var(--accent);
            border-color: var(--accent);
            background: var(--accent-dim);
            font-weight: 600;
          }
          .forward-comment-input {
            width: 100%;
            padding: 8px 12px;
            font-size: 13px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            color: var(--text-primary);
            transition: border-color var(--transition-fast);
          }
          .forward-comment-input:focus {
            border-color: var(--accent);
            outline: none;
          }
          .forward-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 12px 20px;
            border-top: 1px solid var(--border);
          }
          .forward-cancel {
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 500;
            color: var(--text-muted);
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .forward-cancel:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .forward-submit {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 7px 14px;
            font-size: 12px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast), transform var(--transition-fast);
          }
          .forward-submit:hover:not(:disabled) {
            background: var(--accent-hover);
            transform: translateY(-1px);
          }
          .forward-submit:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        `})]})})}const hh="hotline-custom-emojis";function N1(){try{return JSON.parse(localStorage.getItem(hh)||"[]")}catch{return[]}}function td(e){localStorage.setItem(hh,JSON.stringify(e))}function C1({emojis:e,onUpload:t,onDelete:n,onClose:r}){const{t:s}=Ge(),[a,o]=y.useState(""),[c,u]=y.useState(null),[f,m]=y.useState(null),b=y.useRef(null),x=w=>{var k;const C=(k=w.target.files)==null?void 0:k[0];if(!C||!C.type.startsWith("image/")||C.size>256*1024)return;m(C);const L=URL.createObjectURL(C);u(L)},N=()=>{!f||!a.trim()||(t(a.trim().toLowerCase().replace(/\s+/g,"_"),f),o(""),u(null),m(null))};return i.jsx("div",{className:"modal-overlay",onClick:r,children:i.jsxs("div",{className:"custom-emoji-panel",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"custom-emoji-header",children:[i.jsx(ha,{size:16}),i.jsx("h3",{children:s("customEmoji.title")}),i.jsx("button",{className:"custom-emoji-close",onClick:r,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"custom-emoji-body",children:[i.jsxs("div",{className:"custom-emoji-upload-area",children:[i.jsx("div",{className:"custom-emoji-preview-zone",onClick:()=>{var w;return(w=b.current)==null?void 0:w.click()},children:c?i.jsx("img",{src:c,alt:"preview",className:"custom-emoji-preview-img"}):i.jsxs(i.Fragment,{children:[i.jsx(Hp,{size:20}),i.jsx("span",{children:s("customEmoji.selectImage")})]})}),i.jsx("input",{ref:b,type:"file",accept:"image/png,image/gif,image/webp",onChange:x,style:{display:"none"}}),i.jsxs("div",{className:"custom-emoji-upload-form",children:[i.jsx("input",{type:"text",value:a,onChange:w=>o(w.target.value),placeholder:s("customEmoji.namePlaceholder"),className:"custom-emoji-name-input",maxLength:20}),i.jsxs("button",{className:"custom-emoji-upload-btn",onClick:N,disabled:!f||!a.trim(),children:[i.jsx(ha,{size:12}),i.jsx("span",{children:s("customEmoji.upload")})]})]}),i.jsx("span",{className:"custom-emoji-hint",children:s("customEmoji.hint")})]}),e.length>0&&i.jsxs("div",{className:"custom-emoji-list",children:[i.jsx("span",{className:"custom-emoji-list-label",children:s("customEmoji.existing")}),i.jsx("div",{className:"custom-emoji-grid",children:e.map(w=>i.jsxs("div",{className:"custom-emoji-item",children:[i.jsx("img",{src:w.url,alt:w.name,className:"custom-emoji-img"}),i.jsxs("span",{className:"custom-emoji-item-name",children:[":",w.name,":"]}),i.jsx("button",{className:"custom-emoji-delete",onClick:()=>n(w.id),children:i.jsx(jr,{size:11})})]},w.id))})]})]}),i.jsx("style",{children:`
          .custom-emoji-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 400px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .custom-emoji-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .custom-emoji-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .custom-emoji-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .custom-emoji-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .custom-emoji-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-height: 400px;
            overflow-y: auto;
          }
          .custom-emoji-upload-area {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }
          .custom-emoji-preview-zone {
            width: 80px;
            height: 80px;
            border: 2px dashed var(--border);
            border-radius: var(--radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            color: var(--text-muted);
            font-size: 10px;
            cursor: pointer;
            transition: border-color var(--transition-fast), background var(--transition-fast);
          }
          .custom-emoji-preview-zone:hover {
            border-color: var(--accent);
            background: var(--accent-dim);
          }
          .custom-emoji-preview-img {
            width: 48px;
            height: 48px;
            object-fit: contain;
          }
          .custom-emoji-upload-form {
            display: flex;
            gap: 8px;
            width: 100%;
          }
          .custom-emoji-name-input {
            flex: 1;
            padding: 7px 10px;
            font-size: 12px;
          }
          .custom-emoji-upload-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 7px 12px;
            font-size: 11px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
          }
          .custom-emoji-upload-btn:hover:not(:disabled) {
            background: var(--accent-hover);
          }
          .custom-emoji-upload-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .custom-emoji-hint {
            font-size: 10px;
            color: var(--text-muted);
            text-align: center;
          }
          .custom-emoji-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .custom-emoji-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .custom-emoji-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .custom-emoji-item {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 8px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
          }
          .custom-emoji-img {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }
          .custom-emoji-item-name {
            font-size: 11px;
            font-family: var(--font-mono);
            color: var(--text-secondary);
          }
          .custom-emoji-delete {
            color: var(--text-muted);
            padding: 2px;
            border-radius: var(--radius-sm);
            opacity: 0;
            transition: opacity var(--transition-fast), color var(--transition-fast);
          }
          .custom-emoji-item:hover .custom-emoji-delete {
            opacity: 1;
          }
          .custom-emoji-delete:hover {
            color: var(--danger);
          }
        `})]})})}const mh="hotline-notif-filters";function E1(){try{const e=localStorage.getItem(mh);if(e)return JSON.parse(e)}catch{}return{mutedChannels:[],mutedUsers:[],onlyMentions:!1,quietHoursEnabled:!1,quietStart:"22:00",quietEnd:"08:00",keywords:[]}}function gh(e){localStorage.setItem(mh,JSON.stringify(e))}function z1({filters:e,channels:t,users:n,onChange:r,onClose:s}){const{t:a}=Ge(),[o,c]=y.useState(e),[u,f]=y.useState("");y.useEffect(()=>{r(o),gh(o)},[o,r]);const m=w=>{c(C=>({...C,mutedChannels:C.mutedChannels.includes(w)?C.mutedChannels.filter(L=>L!==w):[...C.mutedChannels,w]}))},b=w=>{c(C=>({...C,mutedUsers:C.mutedUsers.includes(w)?C.mutedUsers.filter(L=>L!==w):[...C.mutedUsers,w]}))},x=()=>{u.trim()&&(c(w=>({...w,keywords:[...w.keywords,u.trim()]})),f(""))},N=w=>{c(C=>({...C,keywords:C.keywords.filter(L=>L!==w)}))};return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"notif-filters",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"notif-filters-header",children:[i.jsx(Dp,{size:16}),i.jsx("h3",{children:a("notifFilters.title")}),i.jsx("button",{className:"notif-filters-close",onClick:s,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"notif-filters-body",children:[i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(Nx,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.onlyMentions")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.onlyMentionsDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.onlyMentions?"on":""}`,onClick:()=>c(w=>({...w,onlyMentions:!w.onlyMentions})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(ds,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.quietHours")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.quietHoursDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.quietHoursEnabled?"on":""}`,onClick:()=>c(w=>({...w,quietHoursEnabled:!w.quietHoursEnabled})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),o.quietHoursEnabled&&i.jsxs("div",{className:"nf-quiet-times",children:[i.jsx("input",{type:"time",value:o.quietStart,onChange:w=>c(C=>({...C,quietStart:w.target.value})),className:"nf-time-input"}),i.jsx("span",{className:"nf-time-sep",children:"→"}),i.jsx("input",{type:"time",value:o.quietEnd,onChange:w=>c(C=>({...C,quietEnd:w.target.value})),className:"nf-time-input"})]}),i.jsxs("div",{className:"nf-section",children:[i.jsx("span",{className:"nf-section-title",children:a("notifFilters.keywords")}),i.jsxs("div",{className:"nf-keyword-row",children:[i.jsx("input",{type:"text",value:u,onChange:w=>f(w.target.value),onKeyDown:w=>{w.key==="Enter"&&x()},placeholder:a("notifFilters.keywordPlaceholder"),className:"nf-keyword-input"}),i.jsx("button",{className:"nf-keyword-add",onClick:x,children:"+"})]}),o.keywords.length>0&&i.jsx("div",{className:"nf-keyword-list",children:o.keywords.map(w=>i.jsxs("span",{className:"nf-keyword-tag",onClick:()=>N(w),children:[w," ",i.jsx(Tt,{size:10})]},w))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(ka,{size:12})," ",a("notifFilters.mutedChannels")]}),i.jsx("div",{className:"nf-chip-list",children:t.map(w=>i.jsxs("button",{className:`nf-chip ${o.mutedChannels.includes(w)?"muted":""}`,onClick:()=>m(w),children:[o.mutedChannels.includes(w)?i.jsx(ds,{size:10}):i.jsx(Pl,{size:10}),i.jsx("span",{children:w})]},w))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(Tc,{size:12})," ",a("notifFilters.mutedUsers")]}),i.jsx("div",{className:"nf-chip-list",children:n.slice(0,20).map(w=>i.jsxs("button",{className:`nf-chip ${o.mutedUsers.includes(w.userId)?"muted":""}`,onClick:()=>b(w.userId),children:[o.mutedUsers.includes(w.userId)?i.jsx(ds,{size:10}):i.jsx(Pl,{size:10}),i.jsx("span",{children:w.nickname})]},w.userId))})]})]}),i.jsx("style",{children:`
          .notif-filters {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 440px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .notif-filters-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .notif-filters-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .notif-filters-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .notif-filters-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .notif-filters-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 450px;
            overflow-y: auto;
          }
          .nf-toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 8px 0;
          }
          .nf-toggle-info {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: var(--text-muted);
          }
          .nf-toggle-info > div {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .nf-toggle-label {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-primary);
          }
          .nf-toggle-desc {
            font-size: 11px;
            color: var(--text-muted);
          }
          .nf-switch {
            width: 36px;
            height: 20px;
            border-radius: 10px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            position: relative;
            transition: background var(--transition-fast), border-color var(--transition-fast);
            flex-shrink: 0;
          }
          .nf-switch.on {
            background: var(--accent);
            border-color: var(--accent);
          }
          .nf-switch-knob {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #fff;
            transition: transform var(--transition-fast);
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }
          .nf-switch.on .nf-switch-knob {
            transform: translateX(16px);
          }
          .nf-quiet-times {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 0 0 24px;
          }
          .nf-time-input {
            padding: 4px 8px;
            font-size: 12px;
            width: 100px;
          }
          .nf-time-sep {
            color: var(--text-muted);
            font-size: 12px;
          }
          .nf-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .nf-section-title {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .nf-keyword-row {
            display: flex;
            gap: 6px;
          }
          .nf-keyword-input {
            flex: 1;
            padding: 6px 10px;
            font-size: 12px;
          }
          .nf-keyword-add {
            padding: 6px 12px;
            background: var(--accent);
            color: #fff;
            border-radius: var(--radius-sm);
            font-weight: 700;
            font-size: 14px;
          }
          .nf-keyword-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .nf-keyword-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 3px 8px;
            font-size: 11px;
            font-weight: 500;
            color: var(--accent);
            background: var(--accent-dim);
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: background var(--transition-fast);
          }
          .nf-keyword-tag:hover {
            background: rgba(var(--accent-rgb), 0.15);
          }
          .nf-chip-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }
          .nf-chip {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 500;
            color: var(--text-secondary);
            background: var(--bg-tertiary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            transition: all var(--transition-fast);
          }
          .nf-chip:hover {
            border-color: var(--accent);
          }
          .nf-chip.muted {
            color: var(--danger);
            border-color: var(--danger);
            background: var(--danger-dim);
          }
        `})]})})}const xh="hotline-scheduled-messages";function P1(){try{return JSON.parse(localStorage.getItem(xh)||"[]")}catch{return[]}}function Io(e){localStorage.setItem(xh,JSON.stringify(e))}function M1({activeChannel:e,scheduledMessages:t,onSchedule:n,onDelete:r,onClose:s}){const{t:a}=Ge(),[o,c]=y.useState(""),[u,f]=y.useState("");y.useEffect(()=>{const w=new Date;w.setMinutes(w.getMinutes()+1);const C=w.toISOString().slice(0,16);f(C)},[]);const m=()=>{if(!o.trim()||!u)return;const w=new Date(u).getTime();if(w<=Date.now())return;const C={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),channel:e,content:o.trim(),scheduledTime:w,createdAt:Date.now()};n(C),c("")},b=t.filter(w=>w.channel===e),x=t.filter(w=>w.channel!==e),N=w=>new Date(w).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"scheduler-panel",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"scheduler-header",children:[i.jsx(Ic,{size:16}),i.jsx("h3",{children:a("scheduler.title")}),i.jsx("button",{className:"scheduler-close",onClick:s,children:i.jsx(Tt,{size:16})})]}),i.jsxs("div",{className:"scheduler-body",children:[i.jsxs("div",{className:"scheduler-form",children:[i.jsx("div",{className:"scheduler-form-row",children:i.jsxs("span",{className:"scheduler-channel-tag",children:["#",e]})}),i.jsx("textarea",{className:"scheduler-textarea",value:o,onChange:w=>c(w.target.value),placeholder:a("scheduler.placeholder"),rows:3}),i.jsxs("div",{className:"scheduler-time-row",children:[i.jsx(Ex,{size:13}),i.jsx("input",{type:"datetime-local",value:u,onChange:w=>f(w.target.value),className:"scheduler-datetime",min:new Date().toISOString().slice(0,16)}),i.jsxs("button",{className:"scheduler-submit",onClick:m,disabled:!o.trim()||!u,children:[i.jsx(Qi,{size:12}),i.jsx("span",{children:a("scheduler.schedule")})]})]})]}),b.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsxs("span",{className:"scheduler-list-label",children:[a("scheduler.pending")," — #",e]}),b.map(w=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsx("span",{className:"scheduler-item-time",children:N(w.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:w.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(w.id),children:i.jsx(jr,{size:12})})]},w.id))]}),x.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsx("span",{className:"scheduler-list-label",children:a("scheduler.otherChannels")}),x.map(w=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsxs("span",{className:"scheduler-item-channel",children:["#",w.channel]}),i.jsx("span",{className:"scheduler-item-time",children:N(w.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:w.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(w.id),children:i.jsx(jr,{size:12})})]},w.id))]})]}),i.jsx("style",{children:`
          .scheduler-panel {
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 440px;
            animation: fadeInScale 0.2s ease;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
          }
          .scheduler-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 20px;
            border-bottom: 1px solid var(--border);
            color: var(--accent);
          }
          .scheduler-header h3 {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }
          .scheduler-close {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast), background var(--transition-fast);
          }
          .scheduler-close:hover {
            color: var(--text-primary);
            background: var(--bg-tertiary);
          }
          .scheduler-body {
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: 420px;
            overflow-y: auto;
          }
          .scheduler-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .scheduler-form-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .scheduler-channel-tag {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent);
            background: var(--accent-dim);
            padding: 3px 8px;
            border-radius: var(--radius-sm);
          }
          .scheduler-textarea {
            width: 100%;
            padding: 10px 12px;
            font-size: 13px;
            resize: none;
            min-height: 60px;
            border-radius: var(--radius);
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            color: var(--text-primary);
            transition: border-color var(--transition-fast);
          }
          .scheduler-textarea:focus {
            border-color: var(--accent);
            outline: none;
          }
          .scheduler-time-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-muted);
          }
          .scheduler-datetime {
            flex: 1;
            padding: 6px 10px;
            font-size: 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            color: var(--text-primary);
          }
          .scheduler-submit {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 7px 12px;
            font-size: 11px;
            font-weight: 600;
            color: #fff;
            background: var(--accent);
            border-radius: var(--radius-sm);
            transition: background var(--transition-fast);
          }
          .scheduler-submit:hover:not(:disabled) {
            background: var(--accent-hover);
          }
          .scheduler-submit:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .scheduler-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
            border-top: 1px solid var(--border);
            padding-top: 12px;
          }
          .scheduler-list-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-muted);
          }
          .scheduler-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px;
            background: var(--bg-tertiary);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
          }
          .scheduler-item-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
          .scheduler-item-channel {
            font-size: 10px;
            font-weight: 600;
            color: var(--accent);
          }
          .scheduler-item-time {
            font-size: 10px;
            font-weight: 500;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }
          .scheduler-item-content {
            font-size: 12px;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .scheduler-item-delete {
            color: var(--text-muted);
            padding: 4px;
            border-radius: var(--radius-sm);
            transition: color var(--transition-fast);
            flex-shrink: 0;
          }
          .scheduler-item-delete:hover {
            color: var(--danger);
          }
        `})]})})}const vh="hotline-channel-order";function I1(){try{return JSON.parse(localStorage.getItem(vh)||"[]")}catch{return[]}}function L1(e){localStorage.setItem(vh,JSON.stringify(e))}function T1(e,t){if(t.length===0)return e;const n=[],r=[...e];for(const s of t){const a=r.findIndex(o=>o.name===s);a!==-1&&(n.push(r[a]),r.splice(a,1))}return[...n,...r]}function O1({toast:e,onDismiss:t}){const[n,r]=y.useState(!1);y.useEffect(()=>{const a=setTimeout(()=>{r(!0),setTimeout(()=>t(e.id),300)},3e3);return()=>clearTimeout(a)},[e.id,t]);const s=e.type==="join"?i.jsx(Ux,{size:13}):e.type==="leave"?i.jsx(Fp,{size:13}):null;return i.jsxs("div",{className:`toast-item toast-${e.type} ${n?"exiting":""}`,children:[s&&i.jsx("span",{className:"toast-icon",children:s}),i.jsx("span",{className:"toast-text",children:e.message}),i.jsx("button",{className:"toast-close",onClick:()=>{r(!0),setTimeout(()=>t(e.id),300)},children:i.jsx(Tt,{size:12})})]})}function R1({toasts:e,onDismiss:t}){return e.length===0?null:i.jsxs("div",{className:"toast-container",children:[e.slice(-5).map(n=>i.jsx(O1,{toast:n,onDismiss:t},n.id)),i.jsx("style",{children:`
        .toast-container {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 400;
          pointer-events: none;
        }
        .toast-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          animation: toastIn 0.25s ease;
          pointer-events: auto;
          white-space: nowrap;
        }
        .toast-item.exiting {
          animation: toastOut 0.3s ease forwards;
        }
        .toast-join .toast-icon { color: var(--success); }
        .toast-leave .toast-icon { color: var(--text-muted); }
        .toast-text {
          flex: 1;
        }
        .toast-close {
          color: var(--text-muted);
          padding: 2px;
          border-radius: var(--radius-sm);
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }
        .toast-item:hover .toast-close {
          opacity: 1;
        }
        .toast-close:hover {
          color: var(--text-primary);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(-10px) scale(0.95); }
        }
      `})]})}function _1(){const[e,t]=y.useState([]),n=y.useRef(0),r=y.useCallback((a,o)=>{const c=`toast-${++n.current}`;t(u=>[...u,{id:c,type:a,message:o,timestamp:Date.now()}])},[]),s=y.useCallback(a=>{t(o=>o.filter(c=>c.id!==a))},[]);return{toasts:e,addToast:r,dismissToast:s}}function D1(){const[e]=y.useState(()=>X0());return{identity:e,publicKeyHex:lh(e)}}function qe(e,t){return{type:e,id:crypto.randomUUID(),timestamp:Date.now(),payload:t}}function A1({identity:e,onError:t}){const n=y.useRef(null),r=y.useRef(null),s=y.useRef(0),a=y.useRef(""),o=y.useRef(""),[c,u]=y.useState("disconnected"),[f,m]=y.useState(null),[b,x]=y.useState([]),[N,w]=y.useState([]),[C,L]=y.useState([]),[k,v]=y.useState([]),[z,E]=y.useState([]),[I,D]=y.useState([]),[_,Q]=y.useState([]),[Ae,pe]=y.useState([]),[Ke,pt]=y.useState(0),[kt,ht]=y.useState(!1),[ot,Xe]=y.useState(!0),xt=y.useCallback(G=>{var X,ye,st;const U=JSON.parse(G.data);switch(U.type){case"auth.nonce":{const{nonce:S}=U.payload;u("authenticating");const ge=oh(S,e.secretKey),we=qe("auth",{publicKey:lh(e),signature:ge,nonce:S,nickname:o.current});(X=n.current)==null||X.send(JSON.stringify(we));break}case"auth.ok":{const S=U.payload;u("connected"),m({name:S.serverName,motd:S.motd,userId:S.userId,role:S.role});const ge=qe("channel.list",{});(ye=n.current)==null||ye.send(JSON.stringify(ge));const we=qe("user.list",{});(st=n.current)==null||st.send(JSON.stringify(we));break}case"auth.error":{const{reason:S}=U.payload;t==null||t(S);break}case"chat.message":{const S=U.payload;x(ge=>{if(ge.some(H=>H.id===U.id))return ge;const we={id:U.id,channel:S.channel,userId:S.userId,nickname:S.nickname,content:S.content,role:S.role,timestamp:U.timestamp,replyTo:S.replyTo},be=[...ge,we];return ge.length>0&&ge[ge.length-1].timestamp>U.timestamp&&be.sort((H,q)=>H.timestamp-q.timestamp),be.length>2e3?be.slice(be.length-2e3):be});break}case"channel.list":{const{channels:S}=U.payload;v(S||[]);break}case"user.list":{const{users:S}=U.payload;E(S||[]);break}case"user.joined":{const S=U.payload;E(ge=>[...ge.filter(be=>be.userId!==S.userId),{...S,status:"online"}]);break}case"user.left":{const S=U.payload;E(ge=>ge.filter(we=>we.userId!==S.userId));break}case"user.role_changed":{const{userId:S,role:ge}=U.payload;E(we=>we.map(be=>be.userId===S?{...be,role:ge}:be));break}case"dm.message":{const S=U.payload;w(ge=>{if(ge.some(H=>H.id===U.id))return ge;const we={id:U.id,from:S.from,to:S.to,nickname:S.nickname,content:S.content,role:S.role,timestamp:U.timestamp},be=[...ge,we];return ge.length>0&&ge[ge.length-1].timestamp>U.timestamp&&be.sort((H,q)=>H.timestamp-q.timestamp),be.length>1e3?be.slice(be.length-1e3):be});break}case"typing":{const S=U.payload;L(ge=>[...ge.filter(be=>be.userId!==S.userId||be.channel!==S.channel),{...S,expiry:Date.now()+3e3}]);break}case"chat.search_results":{const S=U.payload;D(S.results||[]);break}case"chat.edited":{const S=U.payload;x(ge=>ge.map(we=>we.id===S.messageId?{...we,content:S.content,edited:!0}:we));break}case"chat.deleted":{const S=U.payload;x(ge=>ge.filter(we=>we.id!==S.messageId));break}case"reaction.updated":{const S=U.payload;x(ge=>ge.map(we=>{if(we.id!==S.messageId)return we;const be=[...we.reactions||[]],H=be.findIndex(q=>q.emoji===S.emoji);if(S.action==="add")H>=0?be[H].users.includes(S.userId)||(be[H]={...be[H],users:[...be[H].users,S.userId]}):be.push({emoji:S.emoji,users:[S.userId]});else if(H>=0){const q=be[H].users.filter(Je=>Je!==S.userId);q.length===0?be.splice(H,1):be[H]={...be[H],users:q}}return{...we,reactions:be}}));break}case"pin.added":break;case"pin.removed":{Q(S=>S.filter(ge=>ge.id!==U.payload.messageId));break}case"pin.list":{const S=U.payload;Q(S.messages||[]);break}case"user.nick_changed":{const S=U.payload;E(ge=>ge.map(we=>we.userId===S.userId?{...we,nickname:S.newNick}:we));break}case"server.settings_updated":{const S=U.payload;m(ge=>ge&&{...ge,name:S.serverName,motd:S.motd});break}case"user.status_changed":{const S=U.payload;E(ge=>ge.map(we=>we.userId===S.userId?{...we,status:S.status}:we));break}case"channel.members":{const S=U.payload;pe(S.members||[]);break}case"chat.history":{const S=U.payload;ht(!1),Xe(S.hasMore),S.messages&&S.messages.length>0&&x(ge=>{const we=S.messages.map(q=>({id:q.id,channel:q.payload.channel,userId:q.payload.userId,nickname:q.payload.nickname,content:q.payload.content,role:q.payload.role,timestamp:q.timestamp,replyTo:q.payload.replyTo})),be=new Set(ge.map(q=>q.id));return[...we.filter(q=>!be.has(q.id)),...ge].sort((q,Je)=>q.timestamp-Je.timestamp)});break}case"error":{const S=U.payload;t==null||t(S.message);break}}},[e,t]),W=y.useCallback((G,U)=>{n.current&&n.current.close(),a.current=G,o.current=U,u("connecting"),x([]);const X=G.startsWith("wss://")?"":"ws://",ye=G.includes("://")?G:`${X}${G}/ws`,st=new WebSocket(ye);n.current=st,st.onopen=()=>{s.current=0,pt(0)},st.onmessage=xt,st.onclose=()=>{if(a.current){const S=s.current,ge=Math.min(1e3*Math.pow(2,S),3e4);s.current=S+1,u("reconnecting"),pt(Math.round(ge/1e3));const we=window.setInterval(()=>{pt(be=>be<=1?(clearInterval(we),0):be-1)},1e3);r.current=window.setTimeout(()=>{clearInterval(we),a.current&&W(a.current,o.current)},ge)}else u("disconnected")},st.onerror=()=>{t==null||t("Connection error")}},[xt,t]),re=y.useCallback(()=>{a.current="",r.current&&(clearTimeout(r.current),r.current=null),n.current&&(n.current.close(),n.current=null),u("disconnected"),m(null),x([]),w([]),L([]),v([]),E([])},[]),he=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("chat.send",{channel:G,content:U});n.current.send(JSON.stringify(ye))}},[]),De=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye={channel:G};U&&(ye.password=U);const st=qe("channel.join",ye);n.current.send(JSON.stringify(st))}},[]),ve=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("channel.leave",{channel:G});n.current.send(JSON.stringify(X))}},[]),Ze=y.useCallback((G,U,X)=>{var ye;if(((ye=n.current)==null?void 0:ye.readyState)===WebSocket.OPEN){const st=qe("channel.create",{name:G,topic:U,password:X||""});n.current.send(JSON.stringify(st))}},[]),We=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const U=qe("user.list",{});n.current.send(JSON.stringify(U))}},[]),je=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const U=qe("channel.list",{});n.current.send(JSON.stringify(U))}},[]),et=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("admin.kick",{userId:G});n.current.send(JSON.stringify(X))}},[]),Ct=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("admin.ban",{userId:G});n.current.send(JSON.stringify(X))}},[]),en=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("admin.op",{userId:G,role:U});n.current.send(JSON.stringify(ye))}},[]),Yt=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("admin.topic",{channel:G,topic:U});n.current.send(JSON.stringify(ye))}},[]),Jt=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("dm.send",{targetId:G,content:U});n.current.send(JSON.stringify(ye))}},[]),tn=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("typing",{channel:G,targetId:U||""});n.current.send(JSON.stringify(ye))}},[]),Ot=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("channel.delete",{name:G});n.current.send(JSON.stringify(X))}},[]),xn=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("chat.search",{query:G,channel:U||""});n.current.send(JSON.stringify(ye))}},[]),me=y.useCallback(()=>{D([])},[]),at=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("chat.edit",{messageId:G,content:U});n.current.send(JSON.stringify(ye))}},[]),_n=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("chat.delete",{messageId:G});n.current.send(JSON.stringify(X))}},[]),ar=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("reaction.add",{messageId:G,emoji:U});n.current.send(JSON.stringify(ye))}},[]),nn=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("reaction.remove",{messageId:G,emoji:U});n.current.send(JSON.stringify(ye))}},[]),Rt=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("pin.add",{messageId:G,channel:U});n.current.send(JSON.stringify(ye))}},[]),rn=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("pin.remove",{messageId:G,channel:U});n.current.send(JSON.stringify(ye))}},[]),Dn=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("pin.list",{channel:G});n.current.send(JSON.stringify(X))}},[]),An=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("user.nick",{nickname:G});n.current.send(JSON.stringify(X))}},[]),Un=y.useCallback((G,U,X)=>{var ye;if(((ye=n.current)==null?void 0:ye.readyState)===WebSocket.OPEN){const st=qe("chat.send",{channel:G,content:U,replyTo:X});n.current.send(JSON.stringify(st))}},[]),$t=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const ye=qe("admin.settings",{serverName:G,motd:U});n.current.send(JSON.stringify(ye))}},[]),vn=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const U=qe("admin.banlist",{});n.current.send(JSON.stringify(U))}},[]),rt=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("admin.unban",{publicKey:G});n.current.send(JSON.stringify(X))}},[]),Yn=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("user.status",{status:G});n.current.send(JSON.stringify(X))}},[]),Nn=y.useCallback(G=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const X=qe("channel.members",{channel:G});n.current.send(JSON.stringify(X))}},[]),Jn=y.useCallback((G,U)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){ht(!0);const ye=qe("chat.history",{channel:G,before:U,limit:50});n.current.send(JSON.stringify(ye))}},[]);return y.useEffect(()=>{const G=setInterval(()=>{L(U=>U.filter(X=>X.expiry>Date.now()))},1e3);return()=>clearInterval(G)},[]),y.useEffect(()=>()=>{r.current&&clearTimeout(r.current),n.current&&n.current.close()},[]),{status:c,serverInfo:f,messages:b,dmMessages:N,typingUsers:C,channels:k,users:z,searchResults:I,pinnedMessages:_,channelMembers:Ae,reconnectIn:Ke,historyLoading:kt,hasMoreHistory:ot,connect:W,disconnect:re,sendChat:he,sendDM:Jt,sendTyping:tn,joinChannel:De,leaveChannel:ve,createChannel:Ze,deleteChannel:Ot,requestUserList:We,requestChannelList:je,kickUser:et,banUser:Ct,setUserRole:en,setTopic:Yt,search:xn,clearSearch:me,editMessage:at,deleteMessage:_n,addReaction:ar,removeReaction:nn,pinMessage:Rt,unpinMessage:rn,requestPins:Dn,changeNickname:An,sendChatWithReply:Un,updateServerSettings:$t,requestBanList:vn,unbanUser:rt,setStatus:Yn,requestChannelMembers:Nn,loadHistory:Jn}}const yh="hotline_muted_channels";function U1(){try{const e=localStorage.getItem(yh);return e?JSON.parse(e):[]}catch{return[]}}function F1(e){localStorage.setItem(yh,JSON.stringify(e))}function $1(){const[e,t]=y.useState(U1),n=y.useCallback(s=>{t(a=>{const o=a.includes(s)?a.filter(c=>c!==s):[...a,s];return F1(o),o})},[]),r=y.useCallback(s=>e.includes(s),[e]);return{mutedChannels:e,toggleMute:n,isMuted:r}}function B1({timeout:e,onIdle:t,onActive:n,enabled:r}){const s=y.useRef(null),a=y.useRef(!1),o=y.useCallback(()=>{r&&(s.current&&clearTimeout(s.current),a.current&&(a.current=!1,n()),s.current=setTimeout(()=>{a.current=!0,t()},e))},[e,t,n,r]);y.useEffect(()=>{if(!r)return;const c=["mousedown","mousemove","keydown","scroll","touchstart","pointerdown"];return c.forEach(u=>document.addEventListener(u,o,{passive:!0})),o(),()=>{c.forEach(u=>document.removeEventListener(u,o)),s.current&&clearTimeout(s.current)}},[o,r])}const H1="Hotline Modern";function V1(e){const t=y.useRef(H1);y.useEffect(()=>(e>0?document.title=`(${e}) ${t.current}`:document.title=t.current,()=>{document.title=t.current}),[e]),y.useEffect(()=>{if(e===0||!document.hidden)return;let n=!0;const r=setInterval(()=>{document.title=n?`(${e}) ${t.current}`:"💬 New messages",n=!n},1500),s=()=>{document.hidden||(clearInterval(r),document.title=e>0?`(${e}) ${t.current}`:t.current)};return document.addEventListener("visibilitychange",s),()=>{clearInterval(r),document.removeEventListener("visibilitychange",s)}},[e])}const nd="hotline_compact_mode";function K1(){const[e,t]=y.useState(()=>{try{return localStorage.getItem(nd)==="true"}catch{return!1}});return y.useEffect(()=>{localStorage.setItem(nd,String(e)),e?document.documentElement.setAttribute("data-density","compact"):document.documentElement.removeAttribute("data-density")},[e]),{compact:e,toggleCompact:()=>t(r=>!r)}}function W1(){var F,K,xe,Pe,Te,Me,j,_e,He,Ve,Oe,Ue,Fe,mt,Qe,lt,ct,ut,jt,Pt,Mt;const{t:e}=Ge(),{identity:t}=D1(),[n,r]=y.useState("lobby"),[s,a]=y.useState(""),[o,c]=y.useState(""),[u,f]=y.useState(null),[m,b]=y.useState(!0),[x,N]=y.useState(!1),[w,C]=y.useState(!1),[L,k]=y.useState(!1),[v,z]=y.useState(!1),[E,I]=y.useState(!1),[D,_]=y.useState(!1),[Q,Ae]=y.useState(!1),[pe,Ke]=y.useState(null),[pt,kt]=y.useState(null),[ht,ot]=y.useState(null),[Xe,xt]=y.useState(Gi),[W,re]=y.useState(!1),[he,De]=y.useState(!1),[ve,Ze]=y.useState(null),[We,je]=y.useState(!1),[et,Ct]=y.useState(!1),[en,Yt]=y.useState(!1),[Jt,tn]=y.useState(!1),[Ot,xn]=y.useState(N1),[me,at]=y.useState(P1),[_n,ar]=y.useState(I1),[nn,Rt]=y.useState(null),[rn,Dn]=y.useState({}),[An,Un]=y.useState({}),[$t,vn]=y.useState({}),[rt,Yn]=y.useState(i1),[Nn,Jn]=y.useState(null),G=y.useRef(0),U=y.useRef(0),X=y.useRef(n),ye=y.useRef(s);y.useEffect(()=>{k1()},[]);const st=y.useCallback(T=>{f(T),setTimeout(()=>f(null),5e3)},[]),S=A1({identity:t,onError:st}),{mutedChannels:ge,toggleMute:we,isMuted:be}=$1(),{compact:H,toggleCompact:q}=K1(),{toasts:Je,addToast:tt,dismissToast:Cn}=_1(),Et=y.useMemo(()=>Object.values(rn).reduce((T,B)=>T+B,0)+Object.values($t).reduce((T,B)=>T+B,0),[rn,$t]);V1(Et);const sn=y.useRef([]);y.useEffect(()=>{if(S.status!=="connected")return;const T=S.users.map(de=>de.userId),B=sn.current,ae=B.map(de=>de.id);if(ae.length>0){for(const de of S.users)ae.includes(de.userId)||tt("join",`${de.nickname} joined`);for(const de of B)T.includes(de.id)||tt("leave",`${de.nick} left`)}sn.current=S.users.map(de=>({id:de.userId,nick:de.nickname}))},[S.users,S.status,tt]),B1({timeout:5*60*1e3,onIdle:y.useCallback(()=>{var B;const T=(B=S.users.find(ae=>{var de;return ae.userId===((de=S.serverInfo)==null?void 0:de.userId)}))==null?void 0:B.status;T&&T!=="away"&&(Jn(T),S.setStatus("away"))},[S]),onActive:y.useCallback(()=>{Nn&&(S.setStatus(Nn),Jn(null))},[S,Nn]),enabled:S.status==="connected"});const Fn=(T,B)=>{c(T),S.connect(T,B)},Er=T=>{const B=S.channels.find(de=>de.name===T);if(B!=null&&B.hasPassword&&T!==n){Ke(T);return}const ae=S.messages.filter(de=>de.channel===n);ae.length>0&&Un(de=>({...de,[n]:ae[ae.length-1].id})),a(""),r(T),S.joinChannel(T)},zr=T=>{pe&&(a(""),r(pe),S.joinChannel(pe,T),Ke(null))},js=T=>{a(T),vn(B=>({...B,[T]:0}))},eo=T=>{S.deleteChannel(T),n===T&&(r("lobby"),S.joinChannel("lobby"))},Qt=()=>{N(!0)},ja=(T,B,ae)=>{S.createChannel(T,B,ae),setTimeout(()=>{P(T),S.requestChannelList()},300)},d=y.useCallback((T,B)=>{const ae=de=>S.users.find(Re=>Re.nickname.toLowerCase()===de.toLowerCase());switch(T){case"kick":{const de=ae(B[0]||"");de&&S.kickUser(de.userId);break}case"ban":{const de=ae(B[0]||"");de&&S.banUser(de.userId);break}case"op":{const de=ae(B[0]||"");de&&S.setUserRole(de.userId,"operator");break}case"deop":{const de=ae(B[0]||"");de&&S.setUserRole(de.userId,"member");break}case"topic":{const de=B.join(" ");de&&S.setTopic(n,de);break}}},[S,n]),h=y.useRef(rt);y.useEffect(()=>{h.current=rt},[rt]);const p=y.useCallback(()=>{if(h.current.soundEnabled)try{const T=new AudioContext,B=T.createOscillator(),ae=T.createGain();B.connect(ae),ae.connect(T.destination),B.frequency.value=880,B.type="sine",ae.gain.value=.08,ae.gain.exponentialRampToValueAtTime(.001,T.currentTime+.15),B.start(),B.stop(T.currentTime+.15)}catch{}},[]);y.useEffect(()=>{X.current=n},[n]),y.useEffect(()=>{ye.current=s},[s]),y.useEffect(()=>{var T;if(S.messages.length>G.current){const B=S.messages.slice(G.current),ae=X.current,de=(T=S.serverInfo)==null?void 0:T.userId;let Re=!1;if(Dn(vt=>{const En={...vt};for(const zn of B)zn.channel!==ae&&zn.userId!==de&&(En[zn.channel]=(En[zn.channel]||0)+1,be(zn.channel)||(Re=!0));return En}),Re){p();const vt=B[B.length-1];vt&&vt.userId!==de&&!be(vt.channel)&&l(vt.nickname,vt.content)}}G.current=S.messages.length},[S.messages,be]),y.useEffect(()=>{var T;if(S.dmMessages.length>U.current){const B=S.dmMessages.slice(U.current),ae=(T=S.serverInfo)==null?void 0:T.userId,de=ye.current;for(const Re of B){const vt=Re.from===ae?Re.to:Re.from;vt!==de&&Re.from!==ae&&(vn(En=>({...En,[vt]:(En[vt]||0)+1})),p(),l(Re.nickname,Re.content))}}U.current=S.dmMessages.length},[S.dmMessages]);const l=y.useCallback((T,B)=>{if(h.current.desktopEnabled&&"Notification"in window){if(Notification.permission==="default"){Notification.requestPermission();return}Notification.permission==="granted"&&document.hidden&&new Notification(T,{body:B,icon:"/logo.svg"})}},[]),g=y.useMemo(()=>{var ae,de;const T=(ae=S.serverInfo)==null?void 0:ae.userId;if(!T)return[];const B=new Map;for(const Re of S.dmMessages){const vt=Re.from===T?Re.to:Re.from,En=Re.from===T?((de=S.users.find(to=>to.userId===vt))==null?void 0:de.nickname)||vt.slice(0,8):Re.nickname,zn=B.get(vt);(!zn||Re.timestamp>zn.ts)&&B.set(vt,{peerId:vt,peerNick:En,lastMessage:Re.content,unread:$t[vt]||0,ts:Re.timestamp})}return Array.from(B.values()).sort((Re,vt)=>vt.ts-Re.ts)},[S.dmMessages,(F=S.serverInfo)==null?void 0:F.userId,S.users,$t]),P=T=>{Dn(B=>({...B,[T]:0})),Er(T)},M=y.useMemo(()=>{var B;if(!s||!((B=S.serverInfo)!=null&&B.userId))return[];const T=S.serverInfo.userId;return S.dmMessages.filter(ae=>ae.from===T&&ae.to===s||ae.from===s&&ae.to===T).map(ae=>({id:ae.id,channel:"__dm__",userId:ae.from,nickname:ae.nickname,content:ae.content,role:ae.role,timestamp:ae.timestamp}))},[S.dmMessages,s,(K=S.serverInfo)==null?void 0:K.userId]);if(S.status==="disconnected"||S.status==="connecting")return i.jsx(f0,{onConnect:Fn,isConnecting:S.status==="connecting"});const $=()=>C(!0),Y=()=>{C(!1),S.clearSearch()};y.useEffect(()=>{const T=B=>{const ae=B.target,de=ae.tagName==="INPUT"||ae.tagName==="TEXTAREA"||ae.tagName==="SELECT";if((B.ctrlKey||B.metaKey)&&B.key==="k"&&(B.preventDefault(),C(Re=>!Re)),B.key==="?"&&!de&&(B.preventDefault(),_(Re=>!Re)),B.key==="Escape"){if(D){_(!1);return}if(w){Y();return}if(L){k(!1);return}if(v){z(!1);return}if(nn){Rt(null);return}}};return window.addEventListener("keydown",T),()=>window.removeEventListener("keydown",T)},[w,nn,D,L,v]);const ue=T=>{const B=(s?M:S.messages).find(ae=>ae.id===T);B&&Rt({id:B.id,nickname:B.nickname,content:B.content})},[te,Be]=y.useState(""),se=y.useCallback((T,B)=>{const ae=T.split(`
`).map(de=>`> ${de}`).join(`
`);Be(`${ae}
@${B} `)},[]),ke=y.useCallback((T,B)=>{if(!ve)return;const ae=B?`${B}

> **Forwarded from ${ve.author}:**
> ${ve.content}`:`> **Forwarded from ${ve.author}:**
> ${ve.content}`;S.sendChat(T,ae),Ze(null),tt("info",e("forward.sent"))},[ve,S,tt,e]),Se=y.useCallback(T=>{const B=S.messages.find(ae=>ae.id===T);B&&Ze({content:B.content,author:B.nickname})},[S.messages]),Le=y.useCallback((T,B)=>{const ae=URL.createObjectURL(B),de={id:Date.now().toString(36),name:T,url:ae},Re=[...Ot,de];xn(Re),td(Re)},[Ot]),ze=y.useCallback(T=>{const B=Ot.filter(ae=>ae.id!==T);xn(B),td(B)},[Ot]),Ne=y.useCallback(T=>{const B=[...me,T];at(B),Io(B)},[me]),Ee=y.useCallback(T=>{const B=me.filter(ae=>ae.id!==T);at(B),Io(B)},[me]);y.useEffect(()=>{const T=setInterval(()=>{const B=Date.now(),ae=me.filter(Re=>Re.scheduledTime<=B);if(ae.length===0)return;for(const Re of ae)S.sendChat(Re.channel,Re.content),tt("info",`Scheduled message sent to #${Re.channel}`);const de=me.filter(Re=>Re.scheduledTime>B);at(de),Io(de)},3e4);return()=>clearInterval(T)},[me,S,tt]);const Ce=y.useCallback(T=>{ar(T),L1(T)},[]),ie=y.useMemo(()=>T1(S.channels,_n),[S.channels,_n]),fe=(T,B)=>{nn?(S.sendChatWithReply(T,B,nn.id),Rt(null)):S.sendChat(T,B)},ne=T=>{S.setStatus(T)},oe=y.useCallback(async T=>{try{const B=Tl(t),ae=o.startsWith("wss://")?"https://":"http://",de=o.replace(/^wss?:\/\//,"").replace(/\/ws$/,"").replace(/:9998/,":9999"),Re=`${ae}${de}/files/uploads/`,vt=new FormData;vt.append("file",T);const En=await fetch(Re,{method:"POST",headers:B,body:vt});if(!En.ok){st("File upload failed");return}const zn=await En.json(),to=`${ae}${de}/files/${zn.path}`;S.sendChat(n,`[${zn.filename}](${to})`)}catch{st("File upload error")}},[o,n,S,st,t]),ce=y.useCallback(T=>{if(Mo(T))xt(Zu(T));else{const B=S.messages.find(ae=>ae.id===T);B&&xt(u1({id:B.id,channel:B.channel,nickname:B.nickname,content:B.content,timestamp:B.timestamp}))}},[S.messages]),Z=y.useCallback(T=>{xt(Zu(T))},[]),O=((xe=S.serverInfo)==null?void 0:xe.role)==="admin"||((Pe=S.serverInfo)==null?void 0:Pe.role)==="operator",R=((Te=S.serverInfo)==null?void 0:Te.role)==="admin"||((Me=S.serverInfo)==null?void 0:Me.role)==="operator",V=((j=S.serverInfo)==null?void 0:j.role)!=="guest",A=S.channels.find(T=>T.name===n);return i.jsxs("div",{className:"app-layout",children:[We&&i.jsx("div",{className:"mobile-sidebar-overlay",onClick:()=>je(!1)}),i.jsxs("div",{className:`app-sidebar-col ${We?"mobile-open":""}`,children:[i.jsx(h0,{serverName:((_e=S.serverInfo)==null?void 0:_e.name)||e("app.name"),channels:ie,activeChannel:n,activeDM:s,dmConversations:g,onSelectChannel:P,onSelectDM:js,onCreateChannel:Qt,onDeleteChannel:eo,onDisconnect:S.disconnect,canCreateChannel:O,unreadCounts:rn,nickname:(He=S.serverInfo)!=null&&He.userId&&((Ve=S.users.find(T=>{var B;return T.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:Ve.nickname)||"",role:((Oe=S.serverInfo)==null?void 0:Oe.role)||"",userStatus:(Ue=S.users.find(T=>{var B;return T.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:Ue.status,mutedChannels:ge,onToggleMute:we,onAdminPanel:()=>Ae(!0),typingChannels:S.typingUsers.filter(T=>{var B;return T.userId!==((B=S.serverInfo)==null?void 0:B.userId)}).map(T=>T.channel).filter(Boolean),onReorderChannels:Ce}),i.jsxs("div",{className:"app-sidebar-bottom",children:[i.jsx(p0,{currentStatus:((Fe=S.users.find(T=>{var B;return T.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:Fe.status)||"available",onStatusChange:ne}),i.jsx(l1,{prefs:rt,onChange:Yn}),i.jsx("button",{className:"compact-toggle",onClick:q,title:H?"Comfortable view":"Compact view",children:H?i.jsx(Zx,{size:14}):i.jsx(Xx,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>re(!0),title:e("theme.title"),children:i.jsx($p,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>De(!0),title:e("stats.title"),children:i.jsx(Jp,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>tn(!0),title:e("scheduler.title"),children:i.jsx(Ic,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Ct(!0),title:e("customEmoji.title"),children:i.jsx(qi,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Yt(!0),title:e("notifFilters.title"),children:i.jsx(Dp,{size:14})}),i.jsx(t1,{})]})]}),i.jsxs("main",{className:"app-main",children:[i.jsxs("div",{className:"mobile-header",children:[i.jsx("button",{className:"mobile-header-btn",onClick:()=>je(!0),children:i.jsx($x,{size:18})}),i.jsx("span",{className:"mobile-header-channel",children:s?((mt=g.find(T=>T.peerId===s))==null?void 0:mt.peerNick)||"DM":`#${n}`}),i.jsx("button",{className:"mobile-header-btn",onClick:()=>b(T=>!T),children:i.jsx(Oc,{size:18})})]}),i.jsx(a1,{status:S.status,reconnectIn:S.reconnectIn}),((Qe=S.serverInfo)==null?void 0:Qe.motd)&&i.jsx(Z0,{motd:S.serverInfo.motd}),u&&i.jsx("div",{className:"app-error",children:u}),i.jsxs("div",{className:"app-chat-row",children:[w&&i.jsx(s1,{onSearch:S.search,onClose:Y,results:S.searchResults,activeChannel:n}),L&&i.jsx(c1,{messages:S.pinnedMessages,onRequestPins:S.requestPins,onUnpin:O?S.unpinMessage:void 0,onClose:()=>k(!1),activeChannel:n,canModerate:O}),v&&i.jsx(d1,{bookmarks:Xe,onRemove:Z,onClose:()=>z(!1)}),i.jsx(F0,{messages:s?M:S.messages,activeChannel:n,channelTopic:A==null?void 0:A.topic,currentUserId:((lt=S.serverInfo)==null?void 0:lt.userId)||"",currentRole:(ct=S.serverInfo)==null?void 0:ct.role,typingUsers:S.typingUsers,dmMode:s?{peerId:s,peerNick:((ut=g.find(T=>T.peerId===s))==null?void 0:ut.peerNick)||s.slice(0,8)}:void 0,onSendMessage:s?(T,B)=>S.sendDM(s,B):fe,onSlashCommand:s?void 0:d,onTyping:()=>s?S.sendTyping("",s):S.sendTyping(n),onSearchOpen:$,onReact:S.addReaction,onRemoveReact:S.removeReaction,onEdit:S.editMessage,onDelete:S.deleteMessage,onPin:T=>S.pinMessage(T,n),onReply:ue,replyTo:nn,onCancelReply:()=>Rt(null),onLoadHistory:S.loadHistory,historyLoading:S.historyLoading,hasMoreHistory:S.hasMoreHistory,onFileUpload:R?oe:void 0,canUpload:R,users:S.users,onPinsOpen:()=>k(T=>!T),onBookmarksOpen:()=>z(T=>!T),onBookmark:ce,isBookmarked:Mo,onChannelSettings:()=>I(!0),onImageClick:kt,lastReadMessageId:An[n],pinnedMessageIds:S.pinnedMessages.map(T=>T.id),onQuote:se,quotedText:te,onQuoteClear:()=>Be(""),onThreadOpen:ot,onForward:Se}),ht&&(()=>{var ae,de;const T=S.messages.find(Re=>Re.id===ht);if(!T)return null;const B=S.messages.filter(Re=>Re.replyTo===ht);return i.jsx(y1,{rootMessage:T,replies:B,currentUserId:((ae=S.serverInfo)==null?void 0:ae.userId)||"",currentRole:(de=S.serverInfo)==null?void 0:de.role,onClose:()=>ot(null),onReact:S.addReaction,onRemoveReact:S.removeReaction,onEdit:S.editMessage,onDelete:S.deleteMessage,onBookmark:ce,isBookmarked:Mo,onImageClick:kt})})(),i.jsx("button",{className:"panel-toggle",onClick:()=>b(T=>!T),title:m?"Hide panel":"Show panel",children:m?i.jsx(Kx,{size:16}):i.jsx(Wx,{size:16})})]})]}),i.jsxs("div",{className:`app-right-panel ${m?"open":"closed"}`,children:[i.jsx(B0,{users:S.users,currentUserId:(jt=S.serverInfo)==null?void 0:jt.userId,currentRole:(Pt=S.serverInfo)==null?void 0:Pt.role,onKick:S.kickUser,onBan:S.banUser,onOp:T=>S.setUserRole(T,"operator"),onDeop:T=>S.setUserRole(T,"member"),onDM:js}),i.jsx(G0,{serverAddress:o,identity:t,canUpload:R,canDownload:V})]}),x&&i.jsx(n1,{onSubmit:ja,onClose:()=>N(!1)}),E&&A&&i.jsx(f1,{channel:A,onSetTopic:S.setTopic,onClose:()=>I(!1),canEdit:O}),D&&i.jsx(m1,{onClose:()=>_(!1)}),Q&&S.serverInfo&&i.jsx(g1,{serverName:S.serverInfo.name,motd:S.serverInfo.motd,onUpdateSettings:S.updateServerSettings,onRequestBanList:S.requestBanList,onUnban:S.unbanUser,onClose:()=>Ae(!1)}),pe&&i.jsx(x1,{channelName:pe,onSubmit:zr,onCancel:()=>Ke(null)}),pt&&i.jsx(v1,{src:pt,onClose:()=>kt(null)}),W&&i.jsx(w1,{onClose:()=>re(!1)}),he&&i.jsx(j1,{messages:S.messages,userCount:S.users.length,channelCount:S.channels.length,serverName:((Mt=S.serverInfo)==null?void 0:Mt.name)||e("app.name"),onClose:()=>De(!1)}),ve&&i.jsx(S1,{messageContent:ve.content,messageAuthor:ve.author,channels:S.channels,currentChannel:n,onForward:ke,onClose:()=>Ze(null)}),et&&i.jsx(C1,{emojis:Ot,onUpload:Le,onDelete:ze,onClose:()=>Ct(!1)}),en&&i.jsx(z1,{filters:E1(),channels:S.channels.map(T=>T.name),users:S.users,onChange:T=>{gh(T)},onClose:()=>Yt(!1)}),Jt&&i.jsx(M1,{activeChannel:n,scheduledMessages:me,onSchedule:Ne,onDelete:Ee,onClose:()=>tn(!1)}),i.jsx(p1,{onDrop:R?oe:()=>{},enabled:R}),i.jsx(R1,{toasts:Je,onDismiss:Cn}),i.jsx("style",{children:`
        .app-layout {
          display: flex;
          height: 100%;
          width: 100%;
        }
        .app-sidebar-col {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
        }
        .app-sidebar-bottom {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid var(--border);
        }
        .app-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .app-chat-row {
          flex: 1;
          display: flex;
          min-height: 0;
          position: relative;
        }
        .panel-toggle {
          position: absolute;
          right: 8px;
          top: 10px;
          color: var(--text-muted);
          padding: 5px;
          border-radius: var(--radius-sm);
          z-index: 2;
          transition: color var(--transition-normal), background var(--transition-normal);
        }
        .panel-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .app-right-panel {
          display: flex;
          flex-direction: column;
          width: 200px;
          min-width: 200px;
          border-left: 1px solid var(--border);
          background: var(--bg-secondary);
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      min-width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.2s ease;
          overflow: hidden;
        }
        .app-right-panel.closed {
          width: 0;
          min-width: 0;
          border-left: none;
          opacity: 0;
        }
        .app-error {
          padding: 8px 16px;
          background: var(--danger-dim);
          border-bottom: 1px solid var(--danger);
          color: var(--danger);
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          animation: slideDown 0.2s ease;
        }
        .compact-toggle {
          color: var(--text-muted);
          padding: 5px;
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .compact-toggle:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
      `})]})}const Ie=e=>typeof e=="string",Ls=()=>{let e,t;const n=new Promise((r,s)=>{e=r,t=s});return n.resolve=e,n.reject=t,n},rd=e=>e==null?"":""+e,Y1=(e,t,n)=>{e.forEach(r=>{t[r]&&(n[r]=t[r])})},J1=/###/g,sd=e=>e&&e.indexOf("###")>-1?e.replace(J1,"."):e,ad=e=>!e||Ie(e),Js=(e,t,n)=>{const r=Ie(t)?t.split("."):t;let s=0;for(;s<r.length-1;){if(ad(e))return{};const a=sd(r[s]);!e[a]&&n&&(e[a]=new n),Object.prototype.hasOwnProperty.call(e,a)?e=e[a]:e={},++s}return ad(e)?{}:{obj:e,k:sd(r[s])}},id=(e,t,n)=>{const{obj:r,k:s}=Js(e,t,Object);if(r!==void 0||t.length===1){r[s]=n;return}let a=t[t.length-1],o=t.slice(0,t.length-1),c=Js(e,o,Object);for(;c.obj===void 0&&o.length;)a=`${o[o.length-1]}.${a}`,o=o.slice(0,o.length-1),c=Js(e,o,Object),c&&c.obj&&typeof c.obj[`${c.k}.${a}`]<"u"&&(c.obj=void 0);c.obj[`${c.k}.${a}`]=n},Q1=(e,t,n,r)=>{const{obj:s,k:a}=Js(e,t,Object);s[a]=s[a]||[],s[a].push(n)},Pi=(e,t)=>{const{obj:n,k:r}=Js(e,t);if(n)return n[r]},q1=(e,t,n)=>{const r=Pi(e,n);return r!==void 0?r:Pi(t,n)},bh=(e,t,n)=>{for(const r in t)r!=="__proto__"&&r!=="constructor"&&(r in e?Ie(e[r])||e[r]instanceof String||Ie(t[r])||t[r]instanceof String?n&&(e[r]=t[r]):bh(e[r],t[r],n):e[r]=t[r]);return e},Kr=e=>e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var X1={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const G1=e=>Ie(e)?e.replace(/[&<>"'\/]/g,t=>X1[t]):e;class Z1{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const n=this.regExpMap.get(t);if(n!==void 0)return n;const r=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,r),this.regExpQueue.push(t),r}}const ev=[" ",",","?","!",";"],tv=new Z1(20),nv=(e,t,n)=>{t=t||"",n=n||"";const r=ev.filter(o=>t.indexOf(o)<0&&n.indexOf(o)<0);if(r.length===0)return!0;const s=tv.getRegExp(`(${r.map(o=>o==="?"?"\\?":o).join("|")})`);let a=!s.test(e);if(!a){const o=e.indexOf(n);o>0&&!s.test(e.substring(0,o))&&(a=!0)}return a},Rl=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!e)return;if(e[t])return e[t];const r=t.split(n);let s=e;for(let a=0;a<r.length;){if(!s||typeof s!="object")return;let o,c="";for(let u=a;u<r.length;++u)if(u!==a&&(c+=n),c+=r[u],o=s[c],o!==void 0){if(["string","number","boolean"].indexOf(typeof o)>-1&&u<r.length-1)continue;a+=u-a+1;break}s=o}return s},Mi=e=>e&&e.replace("_","-"),rv={type:"logger",log(e){this.output("log",e)},warn(e){this.output("warn",e)},error(e){this.output("error",e)},output(e,t){console&&console[e]&&console[e].apply(console,t)}};class Ii{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(t,n)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||rv,this.options=n,this.debug=n.debug}log(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"log","",!0)}warn(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","",!0)}error(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"error","")}deprecate(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(t,n,r,s){return s&&!this.debug?null:(Ie(t[0])&&(t[0]=`${r}${this.prefix} ${t[0]}`),this.logger[n](t))}create(t){return new Ii(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new Ii(this.logger,t)}}var Vn=new Ii;class Zi{constructor(){this.observers={}}on(t,n){return t.split(" ").forEach(r=>{this.observers[r]||(this.observers[r]=new Map);const s=this.observers[r].get(n)||0;this.observers[r].set(n,s+1)}),this}off(t,n){if(this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t].delete(n)}}emit(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];this.observers[t]&&Array.from(this.observers[t].entries()).forEach(o=>{let[c,u]=o;for(let f=0;f<u;f++)c(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(o=>{let[c,u]=o;for(let f=0;f<u;f++)c.apply(c,[t,...r])})}}class od extends Zi{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=t||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const n=this.options.ns.indexOf(t);n>-1&&this.options.ns.splice(n,1)}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,o=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let c;t.indexOf(".")>-1?c=t.split("."):(c=[t,n],r&&(Array.isArray(r)?c.push(...r):Ie(r)&&a?c.push(...r.split(a)):c.push(r)));const u=Pi(this.data,c);return!u&&!n&&!r&&t.indexOf(".")>-1&&(t=c[0],n=c[1],r=c.slice(2).join(".")),u||!o||!Ie(r)?u:Rl(this.data&&this.data[t]&&this.data[t][n],r,a)}addResource(t,n,r,s){let a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const o=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator;let c=[t,n];r&&(c=c.concat(o?r.split(o):r)),t.indexOf(".")>-1&&(c=t.split("."),s=n,n=c[1]),this.addNamespaces(n),id(this.data,c,s),a.silent||this.emit("added",t,n,r,s)}addResources(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const a in r)(Ie(r[a])||Array.isArray(r[a]))&&this.addResource(t,n,a,r[a],{silent:!0});s.silent||this.emit("added",t,n,r)}addResourceBundle(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},c=[t,n];t.indexOf(".")>-1&&(c=t.split("."),s=r,r=n,n=c[1]),this.addNamespaces(n);let u=Pi(this.data,c)||{};o.skipCopy||(r=JSON.parse(JSON.stringify(r))),s?bh(u,r,a):u={...u,...r},id(this.data,c,u),o.silent||this.emit("added",t,n,r)}removeResourceBundle(t,n){this.hasResourceBundle(t,n)&&delete this.data[t][n],this.removeNamespaces(n),this.emit("removed",t,n)}hasResourceBundle(t,n){return this.getResource(t,n)!==void 0}getResourceBundle(t,n){return n||(n=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(t,n)}:this.getResource(t,n)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const n=this.getDataByLanguage(t);return!!(n&&Object.keys(n)||[]).find(s=>n[s]&&Object.keys(n[s]).length>0)}toJSON(){return this.data}}var wh={processors:{},addPostProcessor(e){this.processors[e.name]=e},handle(e,t,n,r,s){return e.forEach(a=>{this.processors[a]&&(t=this.processors[a].process(t,n,r,s))}),t}};const ld={};class Li extends Zi{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),Y1(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Vn.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(t==null)return!1;const r=this.resolve(t,n);return r&&r.res!==void 0}extractFromKey(t,n){let r=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;r===void 0&&(r=":");const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let a=n.ns||this.options.defaultNS||[];const o=r&&t.indexOf(r)>-1,c=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!nv(t,r,s);if(o&&!c){const u=t.match(this.interpolator.nestingRegexp);if(u&&u.length>0)return{key:t,namespaces:Ie(a)?[a]:a};const f=t.split(r);(r!==s||r===s&&this.options.ns.indexOf(f[0])>-1)&&(a=f.shift()),t=f.join(s)}return{key:t,namespaces:Ie(a)?[a]:a}}translate(t,n,r){if(typeof n!="object"&&this.options.overloadTranslationOptionHandler&&(n=this.options.overloadTranslationOptionHandler(arguments)),typeof n=="object"&&(n={...n}),n||(n={}),t==null)return"";Array.isArray(t)||(t=[String(t)]);const s=n.returnDetails!==void 0?n.returnDetails:this.options.returnDetails,a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,{key:o,namespaces:c}=this.extractFromKey(t[t.length-1],n),u=c[c.length-1],f=n.lng||this.language,m=n.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(f&&f.toLowerCase()==="cimode"){if(m){const E=n.nsSeparator||this.options.nsSeparator;return s?{res:`${u}${E}${o}`,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:u,usedParams:this.getUsedParamsDetails(n)}:`${u}${E}${o}`}return s?{res:o,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:u,usedParams:this.getUsedParamsDetails(n)}:o}const b=this.resolve(t,n);let x=b&&b.res;const N=b&&b.usedKey||o,w=b&&b.exactUsedKey||o,C=Object.prototype.toString.apply(x),L=["[object Number]","[object Function]","[object RegExp]"],k=n.joinArrays!==void 0?n.joinArrays:this.options.joinArrays,v=!this.i18nFormat||this.i18nFormat.handleAsObject,z=!Ie(x)&&typeof x!="boolean"&&typeof x!="number";if(v&&x&&z&&L.indexOf(C)<0&&!(Ie(k)&&Array.isArray(x))){if(!n.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const E=this.options.returnedObjectHandler?this.options.returnedObjectHandler(N,x,{...n,ns:c}):`key '${o} (${this.language})' returned an object instead of string.`;return s?(b.res=E,b.usedParams=this.getUsedParamsDetails(n),b):E}if(a){const E=Array.isArray(x),I=E?[]:{},D=E?w:N;for(const _ in x)if(Object.prototype.hasOwnProperty.call(x,_)){const Q=`${D}${a}${_}`;I[_]=this.translate(Q,{...n,joinArrays:!1,ns:c}),I[_]===Q&&(I[_]=x[_])}x=I}}else if(v&&Ie(k)&&Array.isArray(x))x=x.join(k),x&&(x=this.extendTranslation(x,t,n,r));else{let E=!1,I=!1;const D=n.count!==void 0&&!Ie(n.count),_=Li.hasDefaultValue(n),Q=D?this.pluralResolver.getSuffix(f,n.count,n):"",Ae=n.ordinal&&D?this.pluralResolver.getSuffix(f,n.count,{ordinal:!1}):"",pe=D&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),Ke=pe&&n[`defaultValue${this.options.pluralSeparator}zero`]||n[`defaultValue${Q}`]||n[`defaultValue${Ae}`]||n.defaultValue;!this.isValidLookup(x)&&_&&(E=!0,x=Ke),this.isValidLookup(x)||(I=!0,x=o);const kt=(n.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&I?void 0:x,ht=_&&Ke!==x&&this.options.updateMissing;if(I||E||ht){if(this.logger.log(ht?"updateKey":"missingKey",f,u,o,ht?Ke:x),a){const W=this.resolve(o,{...n,keySeparator:!1});W&&W.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let ot=[];const Xe=this.languageUtils.getFallbackCodes(this.options.fallbackLng,n.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Xe&&Xe[0])for(let W=0;W<Xe.length;W++)ot.push(Xe[W]);else this.options.saveMissingTo==="all"?ot=this.languageUtils.toResolveHierarchy(n.lng||this.language):ot.push(n.lng||this.language);const xt=(W,re,he)=>{const De=_&&he!==x?he:kt;this.options.missingKeyHandler?this.options.missingKeyHandler(W,u,re,De,ht,n):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(W,u,re,De,ht,n),this.emit("missingKey",W,u,re,x)};this.options.saveMissing&&(this.options.saveMissingPlurals&&D?ot.forEach(W=>{const re=this.pluralResolver.getSuffixes(W,n);pe&&n[`defaultValue${this.options.pluralSeparator}zero`]&&re.indexOf(`${this.options.pluralSeparator}zero`)<0&&re.push(`${this.options.pluralSeparator}zero`),re.forEach(he=>{xt([W],o+he,n[`defaultValue${he}`]||Ke)})}):xt(ot,o,Ke))}x=this.extendTranslation(x,t,n,b,r),I&&x===o&&this.options.appendNamespaceToMissingKey&&(x=`${u}:${o}`),(I||E)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?x=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${u}:${o}`:o,E?x:void 0):x=this.options.parseMissingKeyHandler(x))}return s?(b.res=x,b.usedParams=this.getUsedParamsDetails(n),b):x}extendTranslation(t,n,r,s,a){var o=this;if(this.i18nFormat&&this.i18nFormat.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...r},r.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!r.skipInterpolation){r.interpolation&&this.interpolator.init({...r,interpolation:{...this.options.interpolation,...r.interpolation}});const f=Ie(t)&&(r&&r.interpolation&&r.interpolation.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let m;if(f){const x=t.match(this.interpolator.nestingRegexp);m=x&&x.length}let b=r.replace&&!Ie(r.replace)?r.replace:r;if(this.options.interpolation.defaultVariables&&(b={...this.options.interpolation.defaultVariables,...b}),t=this.interpolator.interpolate(t,b,r.lng||this.language||s.usedLng,r),f){const x=t.match(this.interpolator.nestingRegexp),N=x&&x.length;m<N&&(r.nest=!1)}!r.lng&&this.options.compatibilityAPI!=="v1"&&s&&s.res&&(r.lng=this.language||s.usedLng),r.nest!==!1&&(t=this.interpolator.nest(t,function(){for(var x=arguments.length,N=new Array(x),w=0;w<x;w++)N[w]=arguments[w];return a&&a[0]===N[0]&&!r.context?(o.logger.warn(`It seems you are nesting recursively key: ${N[0]} in key: ${n[0]}`),null):o.translate(...N,n)},r)),r.interpolation&&this.interpolator.reset()}const c=r.postProcess||this.options.postProcess,u=Ie(c)?[c]:c;return t!=null&&u&&u.length&&r.applyPostProcessor!==!1&&(t=wh.handle(u,t,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(r)},...r}:r,this)),t}resolve(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r,s,a,o,c;return Ie(t)&&(t=[t]),t.forEach(u=>{if(this.isValidLookup(r))return;const f=this.extractFromKey(u,n),m=f.key;s=m;let b=f.namespaces;this.options.fallbackNS&&(b=b.concat(this.options.fallbackNS));const x=n.count!==void 0&&!Ie(n.count),N=x&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),w=n.context!==void 0&&(Ie(n.context)||typeof n.context=="number")&&n.context!=="",C=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);b.forEach(L=>{this.isValidLookup(r)||(c=L,!ld[`${C[0]}-${L}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(c)&&(ld[`${C[0]}-${L}`]=!0,this.logger.warn(`key "${s}" for languages "${C.join(", ")}" won't get resolved as namespace "${c}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),C.forEach(k=>{if(this.isValidLookup(r))return;o=k;const v=[m];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(v,m,k,L,n);else{let E;x&&(E=this.pluralResolver.getSuffix(k,n.count,n));const I=`${this.options.pluralSeparator}zero`,D=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(x&&(v.push(m+E),n.ordinal&&E.indexOf(D)===0&&v.push(m+E.replace(D,this.options.pluralSeparator)),N&&v.push(m+I)),w){const _=`${m}${this.options.contextSeparator}${n.context}`;v.push(_),x&&(v.push(_+E),n.ordinal&&E.indexOf(D)===0&&v.push(_+E.replace(D,this.options.pluralSeparator)),N&&v.push(_+I))}}let z;for(;z=v.pop();)this.isValidLookup(r)||(a=z,r=this.getResource(k,L,z,n))}))})}),{res:r,usedKey:s,exactUsedKey:a,usedLng:o,usedNS:c}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(t,n,r,s):this.resourceStore.getResource(t,n,r,s)}getUsedParamsDetails(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],r=t.replace&&!Ie(t.replace);let s=r?t.replace:t;if(r&&typeof t.count<"u"&&(s.count=t.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!r){s={...s};for(const a of n)delete s[a]}return s}static hasDefaultValue(t){const n="defaultValue";for(const r in t)if(Object.prototype.hasOwnProperty.call(t,r)&&n===r.substring(0,n.length)&&t[r]!==void 0)return!0;return!1}}const Lo=e=>e.charAt(0).toUpperCase()+e.slice(1);class cd{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Vn.create("languageUtils")}getScriptPartFromCode(t){if(t=Mi(t),!t||t.indexOf("-")<0)return null;const n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(t){if(t=Mi(t),!t||t.indexOf("-")<0)return t;const n=t.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(t){if(Ie(t)&&t.indexOf("-")>-1){if(typeof Intl<"u"&&typeof Intl.getCanonicalLocales<"u")try{let s=Intl.getCanonicalLocales(t)[0];if(s&&this.options.lowerCaseLng&&(s=s.toLowerCase()),s)return s}catch{}const n=["hans","hant","latn","cyrl","cans","mong","arab"];let r=t.split("-");return this.options.lowerCaseLng?r=r.map(s=>s.toLowerCase()):r.length===2?(r[0]=r[0].toLowerCase(),r[1]=r[1].toUpperCase(),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Lo(r[1].toLowerCase()))):r.length===3&&(r[0]=r[0].toLowerCase(),r[1].length===2&&(r[1]=r[1].toUpperCase()),r[0]!=="sgn"&&r[2].length===2&&(r[2]=r[2].toUpperCase()),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Lo(r[1].toLowerCase())),n.indexOf(r[2].toLowerCase())>-1&&(r[2]=Lo(r[2].toLowerCase()))),r.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let n;return t.forEach(r=>{if(n)return;const s=this.formatLanguageCode(r);(!this.options.supportedLngs||this.isSupportedCode(s))&&(n=s)}),!n&&this.options.supportedLngs&&t.forEach(r=>{if(n)return;const s=this.getLanguagePartFromCode(r);if(this.isSupportedCode(s))return n=s;n=this.options.supportedLngs.find(a=>{if(a===s)return a;if(!(a.indexOf("-")<0&&s.indexOf("-")<0)&&(a.indexOf("-")>0&&s.indexOf("-")<0&&a.substring(0,a.indexOf("-"))===s||a.indexOf(s)===0&&s.length>1))return a})}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),Ie(t)&&(t=[t]),Array.isArray(t))return t;if(!n)return t.default||[];let r=t[n];return r||(r=t[this.getScriptPartFromCode(n)]),r||(r=t[this.formatLanguageCode(n)]),r||(r=t[this.getLanguagePartFromCode(n)]),r||(r=t.default),r||[]}toResolveHierarchy(t,n){const r=this.getFallbackCodes(n||this.options.fallbackLng||[],t),s=[],a=o=>{o&&(this.isSupportedCode(o)?s.push(o):this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`))};return Ie(t)&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&a(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&a(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&a(this.getLanguagePartFromCode(t))):Ie(t)&&a(this.formatLanguageCode(t)),r.forEach(o=>{s.indexOf(o)<0&&a(this.formatLanguageCode(o))}),s}}let sv=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],av={1:e=>+(e>1),2:e=>+(e!=1),3:e=>0,4:e=>e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,5:e=>e==0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5,6:e=>e==1?0:e>=2&&e<=4?1:2,7:e=>e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,8:e=>e==1?0:e==2?1:e!=8&&e!=11?2:3,9:e=>+(e>=2),10:e=>e==1?0:e==2?1:e<7?2:e<11?3:4,11:e=>e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3,12:e=>+(e%10!=1||e%100==11),13:e=>+(e!==0),14:e=>e==1?0:e==2?1:e==3?2:3,15:e=>e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2,16:e=>e%10==1&&e%100!=11?0:e!==0?1:2,17:e=>e==1||e%10==1&&e%100!=11?0:1,18:e=>e==0?0:e==1?1:2,19:e=>e==1?0:e==0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3,20:e=>e==1?0:e==0||e%100>0&&e%100<20?1:2,21:e=>e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0,22:e=>e==1?0:e==2?1:(e<0||e>10)&&e%10==0?2:3};const iv=["v1","v2","v3"],ov=["v4"],ud={zero:0,one:1,two:2,few:3,many:4,other:5},lv=()=>{const e={};return sv.forEach(t=>{t.lngs.forEach(n=>{e[n]={numbers:t.nr,plurals:av[t.fc]}})}),e};class cv{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=t,this.options=n,this.logger=Vn.create("pluralResolver"),(!this.options.compatibilityJSON||ov.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=lv(),this.pluralRulesCache={}}addRule(t,n){this.rules[t]=n}clearCache(){this.pluralRulesCache={}}getRule(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi()){const r=Mi(t==="dev"?"en":t),s=n.ordinal?"ordinal":"cardinal",a=JSON.stringify({cleanedCode:r,type:s});if(a in this.pluralRulesCache)return this.pluralRulesCache[a];let o;try{o=new Intl.PluralRules(r,{type:s})}catch{if(!t.match(/-|_/))return;const u=this.languageUtils.getLanguagePartFromCode(t);o=this.getRule(u,n)}return this.pluralRulesCache[a]=o,o}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}needsPlural(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return this.shouldUseIntlApi()?r&&r.resolvedOptions().pluralCategories.length>1:r&&r.numbers.length>1}getPluralFormsOfKey(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,r).map(s=>`${n}${s}`)}getSuffixes(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return r?this.shouldUseIntlApi()?r.resolvedOptions().pluralCategories.sort((s,a)=>ud[s]-ud[a]).map(s=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${s}`):r.numbers.map(s=>this.getSuffix(t,s,n)):[]}getSuffix(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=this.getRule(t,r);return s?this.shouldUseIntlApi()?`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s.select(n)}`:this.getSuffixRetroCompatible(s,n):(this.logger.warn(`no plural rule found for: ${t}`),"")}getSuffixRetroCompatible(t,n){const r=t.noAbs?t.plurals(n):t.plurals(Math.abs(n));let s=t.numbers[r];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(s===2?s="plural":s===1&&(s=""));const a=()=>this.options.prepend&&s.toString()?this.options.prepend+s.toString():s.toString();return this.options.compatibilityJSON==="v1"?s===1?"":typeof s=="number"?`_plural_${s.toString()}`:a():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?a():this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}shouldUseIntlApi(){return!iv.includes(this.options.compatibilityJSON)}}const dd=function(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,a=q1(e,t,n);return!a&&s&&Ie(n)&&(a=Rl(e,n,r),a===void 0&&(a=Rl(t,n,r))),a},To=e=>e.replace(/\$/g,"$$$$");class uv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Vn.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||(n=>n),this.init(t)}init(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});const{escape:n,escapeValue:r,useRawValueToEscape:s,prefix:a,prefixEscaped:o,suffix:c,suffixEscaped:u,formatSeparator:f,unescapeSuffix:m,unescapePrefix:b,nestingPrefix:x,nestingPrefixEscaped:N,nestingSuffix:w,nestingSuffixEscaped:C,nestingOptionsSeparator:L,maxReplaces:k,alwaysFormat:v}=t.interpolation;this.escape=n!==void 0?n:G1,this.escapeValue=r!==void 0?r:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=a?Kr(a):o||"{{",this.suffix=c?Kr(c):u||"}}",this.formatSeparator=f||",",this.unescapePrefix=m?"":b||"-",this.unescapeSuffix=this.unescapePrefix?"":m||"",this.nestingPrefix=x?Kr(x):N||Kr("$t("),this.nestingSuffix=w?Kr(w):C||Kr(")"),this.nestingOptionsSeparator=L||",",this.maxReplaces=k||1e3,this.alwaysFormat=v!==void 0?v:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(n,r)=>n&&n.source===r?(n.lastIndex=0,n):new RegExp(r,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(t,n,r,s){let a,o,c;const u=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},f=N=>{if(N.indexOf(this.formatSeparator)<0){const k=dd(n,u,N,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(k,void 0,r,{...s,...n,interpolationkey:N}):k}const w=N.split(this.formatSeparator),C=w.shift().trim(),L=w.join(this.formatSeparator).trim();return this.format(dd(n,u,C,this.options.keySeparator,this.options.ignoreJSONStructure),L,r,{...s,...n,interpolationkey:C})};this.resetRegExp();const m=s&&s.missingInterpolationHandler||this.options.missingInterpolationHandler,b=s&&s.interpolation&&s.interpolation.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:N=>To(N)},{regex:this.regexp,safeValue:N=>this.escapeValue?To(this.escape(N)):To(N)}].forEach(N=>{for(c=0;a=N.regex.exec(t);){const w=a[1].trim();if(o=f(w),o===void 0)if(typeof m=="function"){const L=m(t,a,s);o=Ie(L)?L:""}else if(s&&Object.prototype.hasOwnProperty.call(s,w))o="";else if(b){o=a[0];continue}else this.logger.warn(`missed to pass in variable ${w} for interpolating ${t}`),o="";else!Ie(o)&&!this.useRawValueToEscape&&(o=rd(o));const C=N.safeValue(o);if(t=t.replace(a[0],C),b?(N.regex.lastIndex+=o.length,N.regex.lastIndex-=a[0].length):N.regex.lastIndex=0,c++,c>=this.maxReplaces)break}}),t}nest(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s,a,o;const c=(u,f)=>{const m=this.nestingOptionsSeparator;if(u.indexOf(m)<0)return u;const b=u.split(new RegExp(`${m}[ ]*{`));let x=`{${b[1]}`;u=b[0],x=this.interpolate(x,o);const N=x.match(/'/g),w=x.match(/"/g);(N&&N.length%2===0&&!w||w.length%2!==0)&&(x=x.replace(/'/g,'"'));try{o=JSON.parse(x),f&&(o={...f,...o})}catch(C){return this.logger.warn(`failed parsing options string in nesting for key ${u}`,C),`${u}${m}${x}`}return o.defaultValue&&o.defaultValue.indexOf(this.prefix)>-1&&delete o.defaultValue,u};for(;s=this.nestingRegexp.exec(t);){let u=[];o={...r},o=o.replace&&!Ie(o.replace)?o.replace:o,o.applyPostProcessor=!1,delete o.defaultValue;let f=!1;if(s[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(s[1])){const m=s[1].split(this.formatSeparator).map(b=>b.trim());s[1]=m.shift(),u=m,f=!0}if(a=n(c.call(this,s[1].trim(),o),o),a&&s[0]===t&&!Ie(a))return a;Ie(a)||(a=rd(a)),a||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),a=""),f&&(a=u.reduce((m,b)=>this.format(m,b,r.lng,{...r,interpolationkey:s[1].trim()}),a.trim())),t=t.replace(s[0],a),this.regexp.lastIndex=0}return t}}const dv=e=>{let t=e.toLowerCase().trim();const n={};if(e.indexOf("(")>-1){const r=e.split("(");t=r[0].toLowerCase().trim();const s=r[1].substring(0,r[1].length-1);t==="currency"&&s.indexOf(":")<0?n.currency||(n.currency=s.trim()):t==="relativetime"&&s.indexOf(":")<0?n.range||(n.range=s.trim()):s.split(";").forEach(o=>{if(o){const[c,...u]=o.split(":"),f=u.join(":").trim().replace(/^'+|'+$/g,""),m=c.trim();n[m]||(n[m]=f),f==="false"&&(n[m]=!1),f==="true"&&(n[m]=!0),isNaN(f)||(n[m]=parseInt(f,10))}})}return{formatName:t,formatOptions:n}},Wr=e=>{const t={};return(n,r,s)=>{let a=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(a={...a,[s.interpolationkey]:void 0});const o=r+JSON.stringify(a);let c=t[o];return c||(c=e(Mi(r),s),t[o]=c),c(n)}};class fv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Vn.create("formatter"),this.options=t,this.formats={number:Wr((n,r)=>{const s=new Intl.NumberFormat(n,{...r});return a=>s.format(a)}),currency:Wr((n,r)=>{const s=new Intl.NumberFormat(n,{...r,style:"currency"});return a=>s.format(a)}),datetime:Wr((n,r)=>{const s=new Intl.DateTimeFormat(n,{...r});return a=>s.format(a)}),relativetime:Wr((n,r)=>{const s=new Intl.RelativeTimeFormat(n,{...r});return a=>s.format(a,r.range||"day")}),list:Wr((n,r)=>{const s=new Intl.ListFormat(n,{...r});return a=>s.format(a)})},this.init(t)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};this.formatSeparator=n.interpolation.formatSeparator||","}add(t,n){this.formats[t.toLowerCase().trim()]=n}addCached(t,n){this.formats[t.toLowerCase().trim()]=Wr(n)}format(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=n.split(this.formatSeparator);if(a.length>1&&a[0].indexOf("(")>1&&a[0].indexOf(")")<0&&a.find(c=>c.indexOf(")")>-1)){const c=a.findIndex(u=>u.indexOf(")")>-1);a[0]=[a[0],...a.splice(1,c)].join(this.formatSeparator)}return a.reduce((c,u)=>{const{formatName:f,formatOptions:m}=dv(u);if(this.formats[f]){let b=c;try{const x=s&&s.formatParams&&s.formatParams[s.interpolationkey]||{},N=x.locale||x.lng||s.locale||s.lng||r;b=this.formats[f](c,N,{...m,...s,...x})}catch(x){this.logger.warn(x)}return b}else this.logger.warn(`there was no format function for ${f}`);return c},t)}}const pv=(e,t)=>{e.pending[t]!==void 0&&(delete e.pending[t],e.pendingCount--)};class hv extends Zi{constructor(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=t,this.store=n,this.services=r,this.languageUtils=r.languageUtils,this.options=s,this.logger=Vn.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(r,s.backend,s)}queueLoad(t,n,r,s){const a={},o={},c={},u={};return t.forEach(f=>{let m=!0;n.forEach(b=>{const x=`${f}|${b}`;!r.reload&&this.store.hasResourceBundle(f,b)?this.state[x]=2:this.state[x]<0||(this.state[x]===1?o[x]===void 0&&(o[x]=!0):(this.state[x]=1,m=!1,o[x]===void 0&&(o[x]=!0),a[x]===void 0&&(a[x]=!0),u[b]===void 0&&(u[b]=!0)))}),m||(c[f]=!0)}),(Object.keys(a).length||Object.keys(o).length)&&this.queue.push({pending:o,pendingCount:Object.keys(o).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(a),pending:Object.keys(o),toLoadLanguages:Object.keys(c),toLoadNamespaces:Object.keys(u)}}loaded(t,n,r){const s=t.split("|"),a=s[0],o=s[1];n&&this.emit("failedLoading",a,o,n),!n&&r&&this.store.addResourceBundle(a,o,r,void 0,void 0,{skipCopy:!0}),this.state[t]=n?-1:2,n&&r&&(this.state[t]=0);const c={};this.queue.forEach(u=>{Q1(u.loaded,[a],o),pv(u,t),n&&u.errors.push(n),u.pendingCount===0&&!u.done&&(Object.keys(u.loaded).forEach(f=>{c[f]||(c[f]={});const m=u.loaded[f];m.length&&m.forEach(b=>{c[f][b]===void 0&&(c[f][b]=!0)})}),u.done=!0,u.errors.length?u.callback(u.errors):u.callback())}),this.emit("loaded",c),this.queue=this.queue.filter(u=>!u.done)}read(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,o=arguments.length>5?arguments[5]:void 0;if(!t.length)return o(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:n,fcName:r,tried:s,wait:a,callback:o});return}this.readingCalls++;const c=(f,m)=>{if(this.readingCalls--,this.waitingReads.length>0){const b=this.waitingReads.shift();this.read(b.lng,b.ns,b.fcName,b.tried,b.wait,b.callback)}if(f&&m&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,t,n,r,s+1,a*2,o)},a);return}o(f,m)},u=this.backend[r].bind(this.backend);if(u.length===2){try{const f=u(t,n);f&&typeof f.then=="function"?f.then(m=>c(null,m)).catch(c):c(null,f)}catch(f){c(f)}return}return u(t,n,c)}prepareLoading(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();Ie(t)&&(t=this.languageUtils.toResolveHierarchy(t)),Ie(n)&&(n=[n]);const a=this.queueLoad(t,n,r,s);if(!a.toLoad.length)return a.pending.length||s(),null;a.toLoad.forEach(o=>{this.loadOne(o)})}load(t,n,r){this.prepareLoading(t,n,{},r)}reload(t,n,r){this.prepareLoading(t,n,{reload:!0},r)}loadOne(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const r=t.split("|"),s=r[0],a=r[1];this.read(s,a,"read",void 0,void 0,(o,c)=>{o&&this.logger.warn(`${n}loading namespace ${a} for language ${s} failed`,o),!o&&c&&this.logger.log(`${n}loaded namespace ${a} for language ${s}`,c),this.loaded(t,o,c)})}saveMissing(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},c=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(n)){this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(r==null||r==="")){if(this.backend&&this.backend.create){const u={...o,isUpdate:a},f=this.backend.create.bind(this.backend);if(f.length<6)try{let m;f.length===5?m=f(t,n,r,s,u):m=f(t,n,r,s),m&&typeof m.then=="function"?m.then(b=>c(null,b)).catch(c):c(null,m)}catch(m){c(m)}else f(t,n,r,s,c,u)}!t||!t[0]||this.store.addResource(t[0],n,r,s)}}}const fd=()=>({debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:e=>{let t={};if(typeof e[1]=="object"&&(t=e[1]),Ie(e[1])&&(t.defaultValue=e[1]),Ie(e[2])&&(t.tDescription=e[2]),typeof e[2]=="object"||typeof e[3]=="object"){const n=e[3]||e[2];Object.keys(n).forEach(r=>{t[r]=n[r]})}return t},interpolation:{escapeValue:!0,format:e=>e,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}),pd=e=>(Ie(e.ns)&&(e.ns=[e.ns]),Ie(e.fallbackLng)&&(e.fallbackLng=[e.fallbackLng]),Ie(e.fallbackNS)&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&e.supportedLngs.indexOf("cimode")<0&&(e.supportedLngs=e.supportedLngs.concat(["cimode"])),e),Ba=()=>{},mv=e=>{Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(n=>{typeof e[n]=="function"&&(e[n]=e[n].bind(e))})};class ma extends Zi{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(super(),this.options=pd(t),this.services={},this.logger=Vn,this.modules={external:[]},mv(this),n&&!this.isInitialized&&!t.isClone){if(!this.options.initImmediate)return this.init(t,n),this;setTimeout(()=>{this.init(t,n)},0)}}init(){var t=this;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof n=="function"&&(r=n,n={}),!n.defaultNS&&n.defaultNS!==!1&&n.ns&&(Ie(n.ns)?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const s=fd();this.options={...s,...this.options,...pd(n)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...s.interpolation,...this.options.interpolation}),n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator);const a=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?Vn.init(a(this.modules.logger),this.options):Vn.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:typeof Intl<"u"&&(m=fv);const b=new cd(this.options);this.store=new od(this.options.resources,this.options);const x=this.services;x.logger=Vn,x.resourceStore=this.store,x.languageUtils=b,x.pluralResolver=new cv(b,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),m&&(!this.options.interpolation.format||this.options.interpolation.format===s.interpolation.format)&&(x.formatter=a(m),x.formatter.init(x,this.options),this.options.interpolation.format=x.formatter.format.bind(x.formatter)),x.interpolator=new uv(this.options),x.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},x.backendConnector=new hv(a(this.modules.backend),x.resourceStore,x,this.options),x.backendConnector.on("*",function(N){for(var w=arguments.length,C=new Array(w>1?w-1:0),L=1;L<w;L++)C[L-1]=arguments[L];t.emit(N,...C)}),this.modules.languageDetector&&(x.languageDetector=a(this.modules.languageDetector),x.languageDetector.init&&x.languageDetector.init(x,this.options.detection,this.options)),this.modules.i18nFormat&&(x.i18nFormat=a(this.modules.i18nFormat),x.i18nFormat.init&&x.i18nFormat.init(this)),this.translator=new Li(this.services,this.options),this.translator.on("*",function(N){for(var w=arguments.length,C=new Array(w>1?w-1:0),L=1;L<w;L++)C[L-1]=arguments[L];t.emit(N,...C)}),this.modules.external.forEach(N=>{N.init&&N.init(this)})}if(this.format=this.options.interpolation.format,r||(r=Ba),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=function(){return t.store[m](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=function(){return t.store[m](...arguments),t}});const u=Ls(),f=()=>{const m=(b,x)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),u.resolve(x),r(b,x)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initImmediate?f():setTimeout(f,0),u}loadResources(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ba;const s=Ie(t)?t:this.language;if(typeof t=="function"&&(r=t),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return r();const a=[],o=c=>{if(!c||c==="cimode")return;this.services.languageUtils.toResolveHierarchy(c).forEach(f=>{f!=="cimode"&&a.indexOf(f)<0&&a.push(f)})};s?o(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(u=>o(u)),this.options.preload&&this.options.preload.forEach(c=>o(c)),this.services.backendConnector.load(a,this.options.ns,c=>{!c&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),r(c)})}else r(null)}reloadResources(t,n,r){const s=Ls();return typeof t=="function"&&(r=t,t=void 0),typeof n=="function"&&(r=n,n=void 0),t||(t=this.languages),n||(n=this.options.ns),r||(r=Ba),this.services.backendConnector.reload(t,n,a=>{s.resolve(),r(a)}),s}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&wh.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1))for(let n=0;n<this.languages.length;n++){const r=this.languages[n];if(!(["cimode","dev"].indexOf(r)>-1)&&this.store.hasLanguageSomeTranslations(r)){this.resolvedLanguage=r;break}}}changeLanguage(t,n){var r=this;this.isLanguageChangingTo=t;const s=Ls();this.emit("languageChanging",t);const a=u=>{this.language=u,this.languages=this.services.languageUtils.toResolveHierarchy(u),this.resolvedLanguage=void 0,this.setResolvedLanguage(u)},o=(u,f)=>{f?(a(f),this.translator.changeLanguage(f),this.isLanguageChangingTo=void 0,this.emit("languageChanged",f),this.logger.log("languageChanged",f)):this.isLanguageChangingTo=void 0,s.resolve(function(){return r.t(...arguments)}),n&&n(u,function(){return r.t(...arguments)})},c=u=>{!t&&!u&&this.services.languageDetector&&(u=[]);const f=Ie(u)?u:this.services.languageUtils.getBestMatchFromCodes(u);f&&(this.language||a(f),this.translator.language||this.translator.changeLanguage(f),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(f)),this.loadResources(f,m=>{o(m,f)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?c(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(c):this.services.languageDetector.detect(c):c(t),s}getFixedT(t,n,r){var s=this;const a=function(o,c){let u;if(typeof c!="object"){for(var f=arguments.length,m=new Array(f>2?f-2:0),b=2;b<f;b++)m[b-2]=arguments[b];u=s.options.overloadTranslationOptionHandler([o,c].concat(m))}else u={...c};u.lng=u.lng||a.lng,u.lngs=u.lngs||a.lngs,u.ns=u.ns||a.ns,u.keyPrefix!==""&&(u.keyPrefix=u.keyPrefix||r||a.keyPrefix);const x=s.options.keySeparator||".";let N;return u.keyPrefix&&Array.isArray(o)?N=o.map(w=>`${u.keyPrefix}${x}${w}`):N=u.keyPrefix?`${u.keyPrefix}${x}${o}`:o,s.t(N,u)};return Ie(t)?a.lng=t:a.lngs=t,a.ns=n,a.keyPrefix=r,a}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const r=n.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,a=this.languages[this.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(c,u)=>{const f=this.services.backendConnector.state[`${c}|${u}`];return f===-1||f===0||f===2};if(n.precheck){const c=n.precheck(this,o);if(c!==void 0)return c}return!!(this.hasResourceBundle(r,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||o(r,t)&&(!s||o(a,t)))}loadNamespaces(t,n){const r=Ls();return this.options.ns?(Ie(t)&&(t=[t]),t.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{r.resolve(),n&&n(s)}),r):(n&&n(),Promise.resolve())}loadLanguages(t,n){const r=Ls();Ie(t)&&(t=[t]);const s=this.options.preload||[],a=t.filter(o=>s.indexOf(o)<0&&this.services.languageUtils.isSupportedCode(o));return a.length?(this.options.preload=s.concat(a),this.loadResources(o=>{r.resolve(),n&&n(o)}),r):(n&&n(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!t)return"rtl";const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],r=this.services&&this.services.languageUtils||new cd(fd());return n.indexOf(r.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return new ma(t,n)}cloneInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Ba;const r=t.forkResourceStore;r&&delete t.forkResourceStore;const s={...this.options,...t,isClone:!0},a=new ma(s);return(t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),["store","services","language"].forEach(c=>{a[c]=this[c]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},r&&(a.store=new od(this.store.data,s),a.services.resourceStore=a.store),a.translator=new Li(a.services,s),a.translator.on("*",function(c){for(var u=arguments.length,f=new Array(u>1?u-1:0),m=1;m<u;m++)f[m-1]=arguments[m];a.emit(c,...f)}),a.init(s,n),a.translator.options=s,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Wt=ma.createInstance();Wt.createInstance=ma.createInstance;Wt.createInstance;Wt.dir;Wt.init;Wt.loadResources;Wt.reloadResources;Wt.use;Wt.changeLanguage;Wt.getFixedT;Wt.t;Wt.exists;Wt.setDefaultNamespace;Wt.hasLoadedNamespace;Wt.loadNamespaces;Wt.loadLanguages;function gv(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ga(e){"@babel/helpers - typeof";return ga=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ga(e)}function xv(e,t){if(ga(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(ga(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function vv(e){var t=xv(e,"string");return ga(t)=="symbol"?t:t+""}function yv(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,vv(r.key),r)}}function bv(e,t,n){return t&&yv(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var kh=[],wv=kh.forEach,kv=kh.slice;function jv(e){return wv.call(kv.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e}var hd=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,Sv=function(t,n,r){var s=r||{};s.path=s.path||"/";var a=encodeURIComponent(n),o="".concat(t,"=").concat(a);if(s.maxAge>0){var c=s.maxAge-0;if(Number.isNaN(c))throw new Error("maxAge should be a Number");o+="; Max-Age=".concat(Math.floor(c))}if(s.domain){if(!hd.test(s.domain))throw new TypeError("option domain is invalid");o+="; Domain=".concat(s.domain)}if(s.path){if(!hd.test(s.path))throw new TypeError("option path is invalid");o+="; Path=".concat(s.path)}if(s.expires){if(typeof s.expires.toUTCString!="function")throw new TypeError("option expires is invalid");o+="; Expires=".concat(s.expires.toUTCString())}if(s.httpOnly&&(o+="; HttpOnly"),s.secure&&(o+="; Secure"),s.sameSite){var u=typeof s.sameSite=="string"?s.sameSite.toLowerCase():s.sameSite;switch(u){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o},md={create:function(t,n,r,s){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{path:"/",sameSite:"strict"};r&&(a.expires=new Date,a.expires.setTime(a.expires.getTime()+r*60*1e3)),s&&(a.domain=s),document.cookie=Sv(t,encodeURIComponent(n),a)},read:function(t){for(var n="".concat(t,"="),r=document.cookie.split(";"),s=0;s<r.length;s++){for(var a=r[s];a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(n)===0)return a.substring(n.length,a.length)}return null},remove:function(t){this.create(t,"",-1)}},Nv={name:"cookie",lookup:function(t){var n;if(t.lookupCookie&&typeof document<"u"){var r=md.read(t.lookupCookie);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupCookie&&typeof document<"u"&&md.create(n.lookupCookie,t,n.cookieMinutes,n.cookieDomain,n.cookieOptions)}},Cv={name:"querystring",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.search;!window.location.search&&window.location.hash&&window.location.hash.indexOf("?")>-1&&(r=window.location.hash.substring(window.location.hash.indexOf("?")));for(var s=r.substring(1),a=s.split("&"),o=0;o<a.length;o++){var c=a[o].indexOf("=");if(c>0){var u=a[o].substring(0,c);u===t.lookupQuerystring&&(n=a[o].substring(c+1))}}}return n}},Ts=null,gd=function(){if(Ts!==null)return Ts;try{Ts=window!=="undefined"&&window.localStorage!==null;var t="i18next.translate.boo";window.localStorage.setItem(t,"foo"),window.localStorage.removeItem(t)}catch{Ts=!1}return Ts},Ev={name:"localStorage",lookup:function(t){var n;if(t.lookupLocalStorage&&gd()){var r=window.localStorage.getItem(t.lookupLocalStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupLocalStorage&&gd()&&window.localStorage.setItem(n.lookupLocalStorage,t)}},Os=null,xd=function(){if(Os!==null)return Os;try{Os=window!=="undefined"&&window.sessionStorage!==null;var t="i18next.translate.boo";window.sessionStorage.setItem(t,"foo"),window.sessionStorage.removeItem(t)}catch{Os=!1}return Os},zv={name:"sessionStorage",lookup:function(t){var n;if(t.lookupSessionStorage&&xd()){var r=window.sessionStorage.getItem(t.lookupSessionStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupSessionStorage&&xd()&&window.sessionStorage.setItem(n.lookupSessionStorage,t)}},Pv={name:"navigator",lookup:function(t){var n=[];if(typeof navigator<"u"){if(navigator.languages)for(var r=0;r<navigator.languages.length;r++)n.push(navigator.languages[r]);navigator.userLanguage&&n.push(navigator.userLanguage),navigator.language&&n.push(navigator.language)}return n.length>0?n:void 0}},Mv={name:"htmlTag",lookup:function(t){var n,r=t.htmlTag||(typeof document<"u"?document.documentElement:null);return r&&typeof r.getAttribute=="function"&&(n=r.getAttribute("lang")),n}},Iv={name:"path",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(r instanceof Array)if(typeof t.lookupFromPathIndex=="number"){if(typeof r[t.lookupFromPathIndex]!="string")return;n=r[t.lookupFromPathIndex].replace("/","")}else n=r[0].replace("/","")}return n}},Lv={name:"subdomain",lookup:function(t){var n=typeof t.lookupFromSubdomainIndex=="number"?t.lookupFromSubdomainIndex+1:1,r=typeof window<"u"&&window.location&&window.location.hostname&&window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);if(r)return r[n]}},jh=!1;try{document.cookie,jh=!0}catch{}var Sh=["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"];jh||Sh.splice(1,1);function Tv(){return{order:Sh,lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"],convertDetectedLanguage:function(t){return t}}}var Nh=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};gv(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return bv(e,[{key:"init",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.services=n||{languageUtils:{}},this.options=jv(r,this.options||{},Tv()),typeof this.options.convertDetectedLanguage=="string"&&this.options.convertDetectedLanguage.indexOf("15897")>-1&&(this.options.convertDetectedLanguage=function(a){return a.replace("-","_")}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=s,this.addDetector(Nv),this.addDetector(Cv),this.addDetector(Ev),this.addDetector(zv),this.addDetector(Pv),this.addDetector(Mv),this.addDetector(Iv),this.addDetector(Lv)}},{key:"addDetector",value:function(n){return this.detectors[n.name]=n,this}},{key:"detect",value:function(n){var r=this;n||(n=this.options.order);var s=[];return n.forEach(function(a){if(r.detectors[a]){var o=r.detectors[a].lookup(r.options);o&&typeof o=="string"&&(o=[o]),o&&(s=s.concat(o))}}),s=s.map(function(a){return r.options.convertDetectedLanguage(a)}),this.services.languageUtils.getBestMatchFromCodes?s:s.length>0?s[0]:null}},{key:"cacheUserLanguage",value:function(n,r){var s=this;r||(r=this.options.caches),r&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(n)>-1||r.forEach(function(a){s.detectors[a]&&s.detectors[a].cacheUserLanguage(n,s.options)}))}}])}();Nh.type="languageDetector";const Ov={"app.name":"Hotline Modern","auth.connecting":"Connecting...","auth.authenticating":"Authenticating...","auth.connectionFailed":"Connection failed","auth.invalidSignature":"Invalid signature","connect.title":"Connect to Server","connect.serverAddress":"Server address","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Nickname","connect.nicknamePlaceholder":"Your nickname","connect.button":"Connect","connect.connecting":"Connecting...","sidebar.channels":"Channels","sidebar.createChannel":"Create channel","sidebar.disconnect":"Disconnect","sidebar.users":"Users","chat.placeholder":"Type a message...","chat.send":"Send","chat.noMessages":"No messages yet. Say hello!","chat.today":"Today","chat.yesterday":"Yesterday","chat.history":"Message history","channel.create":"Create Channel","channel.name":"Channel name","channel.topic":"Topic","channel.cancel":"Cancel","channel.submit":"Create","channel.password":"Password (optional)","channel.passwordPlaceholder":"Leave empty for public channel","users.online":"{{count}} user online","users.online_other":"{{count}} users online","users.title":"Users","files.title":"Files","files.upload":"Upload","files.download":"Download","files.empty":"No files","files.parentDir":"Parent directory","roles.admin":"Admin","roles.operator":"Operator","roles.member":"Member","roles.guest":"Guest","settings.title":"Settings","settings.language":"Language","settings.theme":"Theme","server.motd":"Message of the Day","error.disconnected":"Disconnected from server","error.reconnecting":"Reconnecting...","error.permissionDenied":"Permission denied","sidebar.directMessages":"Direct Messages","sidebar.deleteChannel":"Delete channel","chat.typing":"{{name}} is typing...","chat.typingMultiple":"{{count}} people are typing...","chat.dmPlaceholder":"Message {{name}}...","users.sendDM":"Send message","chat.edited":"(edited)","chat.replyingTo":"Replying to","search.title":"Search messages","search.placeholder":"Search messages...","search.allChannels":"All channels","search.noResults":"No results found","connection.reconnecting":"Reconnecting in {{seconds}}s...","connection.connecting":"Connecting...","connection.authenticating":"Authenticating...","notif.muteSound":"Mute sounds","notif.unmuteSound":"Unmute sounds","notif.muteDesktop":"Mute notifications","notif.unmuteDesktop":"Unmute notifications","status.available":"Available","status.away":"Away","status.busy":"Busy","chat.loadingHistory":"Loading older messages...","chat.historyStart":"Beginning of conversation","files.dropHere":"Drop file to upload","files.uploading":"Uploading...","chat.searchEmoji":"Search emoji...","emoji.smileys":"Smileys","emoji.gestures":"Gestures","emoji.symbols":"Symbols","emoji.objects":"Objects","pins.title":"Pinned Messages","pins.empty":"No pinned messages","pins.unpin":"Unpin","bookmarks.title":"Bookmarks","bookmarks.empty":"No bookmarks yet","bookmarks.remove":"Remove bookmark","channelSettings.title":"Channel Settings","channelSettings.members":"members","channelSettings.passwordProtected":"Password protected","channelSettings.topicPlaceholder":"Set a topic for this channel...","channelSettings.noTopic":"No topic set","channelSettings.save":"Save","channelSettings.close":"Close","profile.copyId":"Copy public key","profile.promote":"Promote to Operator","profile.demote":"Demote to Member","profile.kick":"Kick","profile.ban":"Ban","shortcuts.title":"Keyboard Shortcuts","shortcuts.search":"Search messages","shortcuts.bold":"Bold text","shortcuts.italic":"Italic text","shortcuts.close":"Close panel / Cancel","shortcuts.send":"Send message","shortcuts.newline":"New line","shortcuts.mention":"Mention a user","shortcuts.showHelp":"Show this help","admin.title":"Administration","admin.settings":"Settings","admin.bans":"Ban List","admin.serverName":"Server Name","admin.motd":"Message of the Day","admin.save":"Save Changes","admin.saved":"Saved!","admin.banInfo":"Banned users cannot reconnect to this server.","admin.noBans":"No banned users","sidebar.mute":"Mute channel","sidebar.unmute":"Unmute channel","channel.passwordRequired":"Password Required","channel.passwordDesc":"#{{channel}} is password protected","channel.passwordPlaceholderJoin":"Enter channel password","ctx.reply":"Reply","ctx.react":"Add Reaction","ctx.copy":"Copy Text","ctx.quote":"Quote","ctx.bookmark":"Bookmark","ctx.edit":"Edit Message","ctx.pin":"Pin Message","ctx.delete":"Delete Message","lightbox.zoomIn":"Zoom in","lightbox.zoomOut":"Zoom out","lightbox.rotate":"Rotate","lightbox.download":"Download","chat.newMessages":"New messages","connect.recentServers":"Recent servers","connect.quickConnect":"Quick connect","connect.removeFavorite":"Remove","voice.record":"Record voice message","voice.stop":"Stop recording","voice.send":"Send voice message","voice.cancel":"Cancel","thread.title":"Thread","thread.reply":"reply","thread.replies":"replies","theme.title":"Theme Editor","theme.save":"Save","theme.saved":"Saved!","theme.reset":"Reset to defaults","theme.namePlaceholder":"Theme name...","theme.saved_themes":"Saved themes","stats.title":"Server Statistics","stats.totalMessages":"Total messages","stats.onlineUsers":"Online users","stats.channels":"Channels","stats.lastHour":"Last hour","stats.activity24h":"Activity (24h)","stats.topContributors":"Top contributors","stats.topChannels":"Top channels","forward.title":"Forward Message","forward.sendTo":"Send to channel","forward.commentPlaceholder":"Add a comment (optional)...","forward.cancel":"Cancel","forward.send":"Forward","forward.sent":"Message forwarded","e2e.label":"E2E","e2e.encrypted":"End-to-end encrypted","e2e.notEncrypted":"Not encrypted","e2e.title":"End-to-End Encryption","e2e.description":"Messages are encrypted with Ed25519 keys. Only you and the recipient can read them.","e2e.yourKey":"Your key","e2e.peerKey":"Peer key","customEmoji.title":"Custom Emojis","customEmoji.selectImage":"Select image","customEmoji.namePlaceholder":"emoji_name","customEmoji.upload":"Upload","customEmoji.hint":"PNG, GIF or WebP. Max 256KB.","customEmoji.existing":"Custom emojis","notifFilters.title":"Notification Filters","notifFilters.onlyMentions":"Mentions only","notifFilters.onlyMentionsDesc":"Only notify when you're @mentioned or keywords match","notifFilters.quietHours":"Quiet hours","notifFilters.quietHoursDesc":"Mute all notifications during set hours","notifFilters.keywords":"Alert keywords","notifFilters.keywordPlaceholder":"Add a keyword...","notifFilters.mutedChannels":"Muted channels","notifFilters.mutedUsers":"Muted users","scheduler.title":"Schedule Messages","scheduler.placeholder":"Type your scheduled message...","scheduler.schedule":"Schedule","scheduler.pending":"Scheduled","scheduler.otherChannels":"Other channels"},Rv={"app.name":"Hotline Modern","auth.connecting":"Connexion...","auth.authenticating":"Authentification...","auth.connectionFailed":"Échec de la connexion","auth.invalidSignature":"Signature invalide","connect.title":"Se connecter au serveur","connect.serverAddress":"Adresse du serveur","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Pseudo","connect.nicknamePlaceholder":"Votre pseudo","connect.button":"Connexion","connect.connecting":"Connexion...","sidebar.channels":"Salons","sidebar.createChannel":"Créer un salon","sidebar.disconnect":"Déconnexion","sidebar.users":"Utilisateurs","chat.placeholder":"Écrire un message...","chat.send":"Envoyer","chat.noMessages":"Aucun message. Dites bonjour !","chat.today":"Aujourd'hui","chat.yesterday":"Hier","chat.history":"Historique des messages","channel.create":"Créer un salon","channel.name":"Nom du salon","channel.topic":"Sujet","channel.cancel":"Annuler","channel.submit":"Créer","channel.password":"Mot de passe (optionnel)","channel.passwordPlaceholder":"Laisser vide pour un salon public","users.online":"{{count}} utilisateur en ligne","users.online_other":"{{count}} utilisateurs en ligne","users.title":"Utilisateurs","files.title":"Fichiers","files.upload":"Téléverser","files.download":"Télécharger","files.empty":"Aucun fichier","files.parentDir":"Dossier parent","roles.admin":"Admin","roles.operator":"Opérateur","roles.member":"Membre","roles.guest":"Invité","settings.title":"Paramètres","settings.language":"Langue","settings.theme":"Thème","server.motd":"Message du jour","error.disconnected":"Déconnecté du serveur","error.reconnecting":"Reconnexion...","error.permissionDenied":"Permission refusée","sidebar.directMessages":"Messages privés","sidebar.deleteChannel":"Supprimer le salon","chat.typing":"{{name}} écrit...","chat.typingMultiple":"{{count}} personnes écrivent...","chat.dmPlaceholder":"Message à {{name}}...","users.sendDM":"Envoyer un message","chat.edited":"(modifié)","chat.replyingTo":"En réponse à","search.title":"Rechercher des messages","search.placeholder":"Rechercher...","search.allChannels":"Tous les salons","search.noResults":"Aucun résultat","connection.reconnecting":"Reconnexion dans {{seconds}}s...","connection.connecting":"Connexion...","connection.authenticating":"Authentification...","notif.muteSound":"Couper les sons","notif.unmuteSound":"Activer les sons","notif.muteDesktop":"Couper les notifications","notif.unmuteDesktop":"Activer les notifications","status.available":"Disponible","status.away":"Absent","status.busy":"Occupé","chat.loadingHistory":"Chargement des anciens messages...","chat.historyStart":"Début de la conversation","files.dropHere":"Déposer le fichier pour téléverser","files.uploading":"Téléversement...","chat.searchEmoji":"Chercher un emoji...","emoji.smileys":"Visages","emoji.gestures":"Gestes","emoji.symbols":"Symboles","emoji.objects":"Objets","pins.title":"Messages épinglés","pins.empty":"Aucun message épinglé","pins.unpin":"Désépingler","bookmarks.title":"Favoris","bookmarks.empty":"Aucun favori","bookmarks.remove":"Retirer le favori","channelSettings.title":"Paramètres du salon","channelSettings.members":"membres","channelSettings.passwordProtected":"Protégé par mot de passe","channelSettings.topicPlaceholder":"Définir un sujet pour ce salon...","channelSettings.noTopic":"Aucun sujet défini","channelSettings.save":"Enregistrer","channelSettings.close":"Fermer","profile.copyId":"Copier la clé publique","profile.promote":"Promouvoir opérateur","profile.demote":"Rétrograder membre","profile.kick":"Expulser","profile.ban":"Bannir","shortcuts.title":"Raccourcis clavier","shortcuts.search":"Rechercher des messages","shortcuts.bold":"Texte en gras","shortcuts.italic":"Texte en italique","shortcuts.close":"Fermer / Annuler","shortcuts.send":"Envoyer le message","shortcuts.newline":"Nouvelle ligne","shortcuts.mention":"Mentionner un utilisateur","shortcuts.showHelp":"Afficher cette aide","admin.title":"Administration","admin.settings":"Paramètres","admin.bans":"Liste des bannis","admin.serverName":"Nom du serveur","admin.motd":"Message du jour","admin.save":"Enregistrer","admin.saved":"Enregistré !","admin.banInfo":"Les utilisateurs bannis ne peuvent pas se reconnecter.","admin.noBans":"Aucun utilisateur banni","sidebar.mute":"Couper les notifications","sidebar.unmute":"Activer les notifications","channel.passwordRequired":"Mot de passe requis","channel.passwordDesc":"#{{channel}} est protégé par mot de passe","channel.passwordPlaceholderJoin":"Entrer le mot de passe","ctx.reply":"Répondre","ctx.react":"Ajouter une réaction","ctx.copy":"Copier le texte","ctx.quote":"Citer","ctx.bookmark":"Ajouter un favori","ctx.edit":"Modifier le message","ctx.pin":"Épingler le message","ctx.delete":"Supprimer le message","lightbox.zoomIn":"Zoom avant","lightbox.zoomOut":"Zoom arrière","lightbox.rotate":"Pivoter","lightbox.download":"Télécharger","chat.newMessages":"Nouveaux messages","connect.recentServers":"Serveurs récents","connect.quickConnect":"Connexion rapide","connect.removeFavorite":"Supprimer","voice.record":"Enregistrer un message vocal","voice.stop":"Arrêter","voice.send":"Envoyer le message vocal","voice.cancel":"Annuler","thread.title":"Fil de discussion","thread.reply":"réponse","thread.replies":"réponses","theme.title":"Éditeur de thème","theme.save":"Enregistrer","theme.saved":"Enregistré !","theme.reset":"Réinitialiser","theme.namePlaceholder":"Nom du thème...","theme.saved_themes":"Thèmes sauvegardés","stats.title":"Statistiques du serveur","stats.totalMessages":"Total messages","stats.onlineUsers":"Utilisateurs en ligne","stats.channels":"Salons","stats.lastHour":"Dernière heure","stats.activity24h":"Activité (24h)","stats.topContributors":"Top contributeurs","stats.topChannels":"Top salons","forward.title":"Transférer le message","forward.sendTo":"Envoyer vers le salon","forward.commentPlaceholder":"Ajouter un commentaire (optionnel)...","forward.cancel":"Annuler","forward.send":"Transférer","forward.sent":"Message transféré","e2e.label":"E2E","e2e.encrypted":"Chiffrement de bout en bout","e2e.notEncrypted":"Non chiffré","e2e.title":"Chiffrement de bout en bout","e2e.description":"Les messages sont chiffrés avec des clés Ed25519. Seuls vous et le destinataire pouvez les lire.","e2e.yourKey":"Votre clé","e2e.peerKey":"Clé du pair","customEmoji.title":"Emojis personnalisés","customEmoji.selectImage":"Choisir une image","customEmoji.namePlaceholder":"nom_emoji","customEmoji.upload":"Ajouter","customEmoji.hint":"PNG, GIF ou WebP. Max 256 Ko.","customEmoji.existing":"Emojis personnalisés","notifFilters.title":"Filtres de notifications","notifFilters.onlyMentions":"Mentions uniquement","notifFilters.onlyMentionsDesc":"Notifier uniquement quand vous êtes @mentionné ou un mot-clé correspond","notifFilters.quietHours":"Heures calmes","notifFilters.quietHoursDesc":"Couper toutes les notifications pendant les heures définies","notifFilters.keywords":"Mots-clés d'alerte","notifFilters.keywordPlaceholder":"Ajouter un mot-clé...","notifFilters.mutedChannels":"Salons coupés","notifFilters.mutedUsers":"Utilisateurs coupés","scheduler.title":"Programmer des messages","scheduler.placeholder":"Tapez votre message programmé...","scheduler.schedule":"Programmer","scheduler.pending":"Programmés","scheduler.otherChannels":"Autres salons"};Wt.use(Nh).use(mx).init({resources:{en:{translation:Ov},fr:{translation:Rv}},fallbackLng:"en",interpolation:{escapeValue:!1},detection:{order:["localStorage","navigator"],lookupLocalStorage:"hotline-language",caches:["localStorage"]}});Oo.createRoot(document.getElementById("root")).render(i.jsx(Kh.StrictMode,{children:i.jsx(W1,{})}));
