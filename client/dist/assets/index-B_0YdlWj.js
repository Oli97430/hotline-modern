var Pp=Object.defineProperty;var Lp=(e,t,n)=>t in e?Pp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var fu=(e,t,n)=>Lp(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();var Ip=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Vc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function _p(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var s=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return e[r]}})}),n}var Kc={exports:{}},ki={},Wc={exports:{}},Oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var aa=Symbol.for("react.element"),Mp=Symbol.for("react.portal"),Op=Symbol.for("react.fragment"),Tp=Symbol.for("react.strict_mode"),Rp=Symbol.for("react.profiler"),Dp=Symbol.for("react.provider"),Ap=Symbol.for("react.context"),Up=Symbol.for("react.forward_ref"),$p=Symbol.for("react.suspense"),Fp=Symbol.for("react.memo"),Bp=Symbol.for("react.lazy"),du=Symbol.iterator;function Hp(e){return e===null||typeof e!="object"?null:(e=du&&e[du]||e["@@iterator"],typeof e=="function"?e:null)}var Yc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Qc=Object.assign,Jc={};function ls(e,t,n){this.props=e,this.context=t,this.refs=Jc,this.updater=n||Yc}ls.prototype.isReactComponent={};ls.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ls.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Xc(){}Xc.prototype=ls.prototype;function gl(e,t,n){this.props=e,this.context=t,this.refs=Jc,this.updater=n||Yc}var ml=gl.prototype=new Xc;ml.constructor=gl;Qc(ml,ls.prototype);ml.isPureReactComponent=!0;var pu=Array.isArray,Zc=Object.prototype.hasOwnProperty,xl={current:null},Gc={key:!0,ref:!0,__self:!0,__source:!0};function qc(e,t,n){var r,s={},a=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(a=""+t.key),t)Zc.call(t,r)&&!Gc.hasOwnProperty(r)&&(s[r]=t[r]);var u=arguments.length-2;if(u===1)s.children=n;else if(1<u){for(var c=Array(u),d=0;d<u;d++)c[d]=arguments[d+2];s.children=c}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)s[r]===void 0&&(s[r]=u[r]);return{$$typeof:aa,type:e,key:a,ref:i,props:s,_owner:xl.current}}function Vp(e,t){return{$$typeof:aa,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function vl(e){return typeof e=="object"&&e!==null&&e.$$typeof===aa}function Kp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var hu=/\/+/g;function $i(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Kp(""+e.key):t.toString(36)}function La(e,t,n,r,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case aa:case Mp:i=!0}}if(i)return i=e,s=s(i),e=r===""?"."+$i(i,0):r,pu(s)?(n="",e!=null&&(n=e.replace(hu,"$&/")+"/"),La(s,t,n,"",function(d){return d})):s!=null&&(vl(s)&&(s=Vp(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(hu,"$&/")+"/")+e)),t.push(s)),1;if(i=0,r=r===""?".":r+":",pu(e))for(var u=0;u<e.length;u++){a=e[u];var c=r+$i(a,u);i+=La(a,t,n,c,s)}else if(c=Hp(e),typeof c=="function")for(e=c.call(e),u=0;!(a=e.next()).done;)a=a.value,c=r+$i(a,u++),i+=La(a,t,n,c,s);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function da(e,t,n){if(e==null)return e;var r=[],s=0;return La(e,r,"","",function(a){return t.call(n,a,s++)}),r}function Wp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ut={current:null},Ia={transition:null},Yp={ReactCurrentDispatcher:Ut,ReactCurrentBatchConfig:Ia,ReactCurrentOwner:xl};function ef(){throw Error("act(...) is not supported in production builds of React.")}Oe.Children={map:da,forEach:function(e,t,n){da(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return da(e,function(){t++}),t},toArray:function(e){return da(e,function(t){return t})||[]},only:function(e){if(!vl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Oe.Component=ls;Oe.Fragment=Op;Oe.Profiler=Rp;Oe.PureComponent=gl;Oe.StrictMode=Tp;Oe.Suspense=$p;Oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Yp;Oe.act=ef;Oe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Qc({},e.props),s=e.key,a=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,i=xl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)Zc.call(t,c)&&!Gc.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&u!==void 0?u[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){u=Array(c);for(var d=0;d<c;d++)u[d]=arguments[d+2];r.children=u}return{$$typeof:aa,type:e.type,key:s,ref:a,props:r,_owner:i}};Oe.createContext=function(e){return e={$$typeof:Ap,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Dp,_context:e},e.Consumer=e};Oe.createElement=qc;Oe.createFactory=function(e){var t=qc.bind(null,e);return t.type=e,t};Oe.createRef=function(){return{current:null}};Oe.forwardRef=function(e){return{$$typeof:Up,render:e}};Oe.isValidElement=vl;Oe.lazy=function(e){return{$$typeof:Bp,_payload:{_status:-1,_result:e},_init:Wp}};Oe.memo=function(e,t){return{$$typeof:Fp,type:e,compare:t===void 0?null:t}};Oe.startTransition=function(e){var t=Ia.transition;Ia.transition={};try{e()}finally{Ia.transition=t}};Oe.unstable_act=ef;Oe.useCallback=function(e,t){return Ut.current.useCallback(e,t)};Oe.useContext=function(e){return Ut.current.useContext(e)};Oe.useDebugValue=function(){};Oe.useDeferredValue=function(e){return Ut.current.useDeferredValue(e)};Oe.useEffect=function(e,t){return Ut.current.useEffect(e,t)};Oe.useId=function(){return Ut.current.useId()};Oe.useImperativeHandle=function(e,t,n){return Ut.current.useImperativeHandle(e,t,n)};Oe.useInsertionEffect=function(e,t){return Ut.current.useInsertionEffect(e,t)};Oe.useLayoutEffect=function(e,t){return Ut.current.useLayoutEffect(e,t)};Oe.useMemo=function(e,t){return Ut.current.useMemo(e,t)};Oe.useReducer=function(e,t,n){return Ut.current.useReducer(e,t,n)};Oe.useRef=function(e){return Ut.current.useRef(e)};Oe.useState=function(e){return Ut.current.useState(e)};Oe.useSyncExternalStore=function(e,t,n){return Ut.current.useSyncExternalStore(e,t,n)};Oe.useTransition=function(){return Ut.current.useTransition()};Oe.version="18.3.1";Wc.exports=Oe;var S=Wc.exports;const Qp=Vc(S);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jp=S,Xp=Symbol.for("react.element"),Zp=Symbol.for("react.fragment"),Gp=Object.prototype.hasOwnProperty,qp=Jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,eh={key:!0,ref:!0,__self:!0,__source:!0};function tf(e,t,n){var r,s={},a=null,i=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)Gp.call(t,r)&&!eh.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Xp,type:e,key:a,ref:i,props:s,_owner:qp.current}}ki.Fragment=Zp;ki.jsx=tf;ki.jsxs=tf;Kc.exports=ki;var l=Kc.exports,go={},nf={exports:{}},tn={},rf={exports:{}},sf={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(H,le){var de=H.length;H.push(le);e:for(;0<de;){var Ie=de-1>>>1,Ue=H[Ie];if(0<s(Ue,le))H[Ie]=le,H[de]=Ue,de=Ie;else break e}}function n(H){return H.length===0?null:H[0]}function r(H){if(H.length===0)return null;var le=H[0],de=H.pop();if(de!==le){H[0]=de;e:for(var Ie=0,Ue=H.length,Xe=Ue>>>1;Ie<Xe;){var Ke=2*(Ie+1)-1,ke=H[Ke],ge=Ke+1,at=H[ge];if(0>s(ke,de))ge<Ue&&0>s(at,ke)?(H[Ie]=at,H[ge]=de,Ie=ge):(H[Ie]=ke,H[Ke]=de,Ie=Ke);else if(ge<Ue&&0>s(at,de))H[Ie]=at,H[ge]=de,Ie=ge;else break e}}return le}function s(H,le){var de=H.sortIndex-le.sortIndex;return de!==0?de:H.id-le.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var i=Date,u=i.now();e.unstable_now=function(){return i.now()-u}}var c=[],d=[],m=1,k=null,x=3,E=!1,P=!1,z=!1,G=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w(H){for(var le=n(d);le!==null;){if(le.callback===null)r(d);else if(le.startTime<=H)r(d),le.sortIndex=le.expirationTime,t(c,le);else break;le=n(d)}}function N(H){if(z=!1,w(H),!P)if(n(c)!==null)P=!0,Te(I);else{var le=n(d);le!==null&&Je(N,le.startTime-H)}}function I(H,le){P=!1,z&&(z=!1,b(q),q=-1),E=!0;var de=x;try{for(w(le),k=n(c);k!==null&&(!(k.expirationTime>le)||H&&!De());){var Ie=k.callback;if(typeof Ie=="function"){k.callback=null,x=k.priorityLevel;var Ue=Ie(k.expirationTime<=le);le=e.unstable_now(),typeof Ue=="function"?k.callback=Ue:k===n(c)&&r(c),w(le)}else r(c);k=n(c)}if(k!==null)var Xe=!0;else{var Ke=n(d);Ke!==null&&Je(N,Ke.startTime-le),Xe=!1}return Xe}finally{k=null,x=de,E=!1}}var D=!1,F=null,q=-1,Pe=5,he=-1;function De(){return!(e.unstable_now()-he<Pe)}function Ge(){if(F!==null){var H=e.unstable_now();he=H;var le=!0;try{le=F(!0,H)}finally{le?xt():(D=!1,F=null)}}else D=!1}var xt;if(typeof v=="function")xt=function(){v(Ge)};else if(typeof MessageChannel<"u"){var rt=new MessageChannel,Ae=rt.port2;rt.port1.onmessage=Ge,xt=function(){Ae.postMessage(null)}}else xt=function(){G(Ge,0)};function Te(H){F=H,D||(D=!0,xt())}function Je(H,le){q=G(function(){H(e.unstable_now())},le)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(H){H.callback=null},e.unstable_continueExecution=function(){P||E||(P=!0,Te(I))},e.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Pe=0<H?Math.floor(1e3/H):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(H){switch(x){case 1:case 2:case 3:var le=3;break;default:le=x}var de=x;x=le;try{return H()}finally{x=de}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(H,le){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var de=x;x=H;try{return le()}finally{x=de}},e.unstable_scheduleCallback=function(H,le,de){var Ie=e.unstable_now();switch(typeof de=="object"&&de!==null?(de=de.delay,de=typeof de=="number"&&0<de?Ie+de:Ie):de=Ie,H){case 1:var Ue=-1;break;case 2:Ue=250;break;case 5:Ue=1073741823;break;case 4:Ue=1e4;break;default:Ue=5e3}return Ue=de+Ue,H={id:m++,callback:le,priorityLevel:H,startTime:de,expirationTime:Ue,sortIndex:-1},de>Ie?(H.sortIndex=de,t(d,H),n(c)===null&&H===n(d)&&(z?(b(q),q=-1):z=!0,Je(N,de-Ie))):(H.sortIndex=Ue,t(c,H),P||E||(P=!0,Te(I))),H},e.unstable_shouldYield=De,e.unstable_wrapCallback=function(H){var le=x;return function(){var de=x;x=le;try{return H.apply(this,arguments)}finally{x=de}}}})(sf);rf.exports=sf;var th=rf.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nh=S,en=th;function J(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var af=new Set,As={};function _r(e,t){ts(e,t),ts(e+"Capture",t)}function ts(e,t){for(As[e]=t,e=0;e<t.length;e++)af.add(t[e])}var Vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),mo=Object.prototype.hasOwnProperty,rh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,gu={},mu={};function sh(e){return mo.call(mu,e)?!0:mo.call(gu,e)?!1:rh.test(e)?mu[e]=!0:(gu[e]=!0,!1)}function ah(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ih(e,t,n,r){if(t===null||typeof t>"u"||ah(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function $t(e,t,n,r,s,a,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=i}var Et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Et[e]=new $t(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Et[t]=new $t(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Et[e]=new $t(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Et[e]=new $t(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Et[e]=new $t(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Et[e]=new $t(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Et[e]=new $t(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Et[e]=new $t(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Et[e]=new $t(e,5,!1,e.toLowerCase(),null,!1,!1)});var yl=/[\-:]([a-z])/g;function kl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(yl,kl);Et[t]=new $t(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(yl,kl);Et[t]=new $t(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(yl,kl);Et[t]=new $t(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Et[e]=new $t(e,1,!1,e.toLowerCase(),null,!1,!1)});Et.xlinkHref=new $t("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Et[e]=new $t(e,1,!1,e.toLowerCase(),null,!0,!0)});function wl(e,t,n,r){var s=Et.hasOwnProperty(t)?Et[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(ih(t,n,s,r)&&(n=null),r||s===null?sh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Qn=nh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,pa=Symbol.for("react.element"),Dr=Symbol.for("react.portal"),Ar=Symbol.for("react.fragment"),bl=Symbol.for("react.strict_mode"),xo=Symbol.for("react.profiler"),of=Symbol.for("react.provider"),lf=Symbol.for("react.context"),Sl=Symbol.for("react.forward_ref"),vo=Symbol.for("react.suspense"),yo=Symbol.for("react.suspense_list"),jl=Symbol.for("react.memo"),Gn=Symbol.for("react.lazy"),uf=Symbol.for("react.offscreen"),xu=Symbol.iterator;function ps(e){return e===null||typeof e!="object"?null:(e=xu&&e[xu]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Object.assign,Fi;function js(e){if(Fi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Fi=t&&t[1]||""}return`
`+Fi+e}var Bi=!1;function Hi(e,t){if(!e||Bi)return"";Bi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),a=r.stack.split(`
`),i=s.length-1,u=a.length-1;1<=i&&0<=u&&s[i]!==a[u];)u--;for(;1<=i&&0<=u;i--,u--)if(s[i]!==a[u]){if(i!==1||u!==1)do if(i--,u--,0>u||s[i]!==a[u]){var c=`
`+s[i].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=i&&0<=u);break}}}finally{Bi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?js(e):""}function oh(e){switch(e.tag){case 5:return js(e.type);case 16:return js("Lazy");case 13:return js("Suspense");case 19:return js("SuspenseList");case 0:case 2:case 15:return e=Hi(e.type,!1),e;case 11:return e=Hi(e.type.render,!1),e;case 1:return e=Hi(e.type,!0),e;default:return""}}function ko(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ar:return"Fragment";case Dr:return"Portal";case xo:return"Profiler";case bl:return"StrictMode";case vo:return"Suspense";case yo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case lf:return(e.displayName||"Context")+".Consumer";case of:return(e._context.displayName||"Context")+".Provider";case Sl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case jl:return t=e.displayName||null,t!==null?t:ko(e.type)||"Memo";case Gn:t=e._payload,e=e._init;try{return ko(e(t))}catch{}}return null}function lh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ko(t);case 8:return t===bl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function dr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function cf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function uh(e){var t=cf(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){r=""+i,a.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ha(e){e._valueTracker||(e._valueTracker=uh(e))}function ff(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=cf(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ba(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function wo(e,t){var n=t.checked;return lt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function vu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=dr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function df(e,t){t=t.checked,t!=null&&wl(e,"checked",t,!1)}function bo(e,t){df(e,t);var n=dr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?So(e,t.type,n):t.hasOwnProperty("defaultValue")&&So(e,t.type,dr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function yu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function So(e,t,n){(t!=="number"||Ba(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ns=Array.isArray;function Jr(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+dr(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function jo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(J(91));return lt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ku(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(J(92));if(Ns(n)){if(1<n.length)throw Error(J(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:dr(n)}}function pf(e,t){var n=dr(t.value),r=dr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function wu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function hf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function No(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?hf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ga,gf=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ga=ga||document.createElement("div"),ga.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ga.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Us(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var zs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ch=["Webkit","ms","Moz","O"];Object.keys(zs).forEach(function(e){ch.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),zs[t]=zs[e]})});function mf(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||zs.hasOwnProperty(e)&&zs[e]?(""+t).trim():t+"px"}function xf(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=mf(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var fh=lt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Co(e,t){if(t){if(fh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(J(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(J(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(J(61))}if(t.style!=null&&typeof t.style!="object")throw Error(J(62))}}function Eo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zo=null;function Nl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Po=null,Xr=null,Zr=null;function bu(e){if(e=la(e)){if(typeof Po!="function")throw Error(J(280));var t=e.stateNode;t&&(t=Ni(t),Po(e.stateNode,e.type,t))}}function vf(e){Xr?Zr?Zr.push(e):Zr=[e]:Xr=e}function yf(){if(Xr){var e=Xr,t=Zr;if(Zr=Xr=null,bu(e),t)for(e=0;e<t.length;e++)bu(t[e])}}function kf(e,t){return e(t)}function wf(){}var Vi=!1;function bf(e,t,n){if(Vi)return e(t,n);Vi=!0;try{return kf(e,t,n)}finally{Vi=!1,(Xr!==null||Zr!==null)&&(wf(),yf())}}function $s(e,t){var n=e.stateNode;if(n===null)return null;var r=Ni(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var Lo=!1;if(Vn)try{var hs={};Object.defineProperty(hs,"passive",{get:function(){Lo=!0}}),window.addEventListener("test",hs,hs),window.removeEventListener("test",hs,hs)}catch{Lo=!1}function dh(e,t,n,r,s,a,i,u,c){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var Ps=!1,Ha=null,Va=!1,Io=null,ph={onError:function(e){Ps=!0,Ha=e}};function hh(e,t,n,r,s,a,i,u,c){Ps=!1,Ha=null,dh.apply(ph,arguments)}function gh(e,t,n,r,s,a,i,u,c){if(hh.apply(this,arguments),Ps){if(Ps){var d=Ha;Ps=!1,Ha=null}else throw Error(J(198));Va||(Va=!0,Io=d)}}function Mr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Sf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Su(e){if(Mr(e)!==e)throw Error(J(188))}function mh(e){var t=e.alternate;if(!t){if(t=Mr(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return Su(s),e;if(a===r)return Su(s),t;a=a.sibling}throw Error(J(188))}if(n.return!==r.return)n=s,r=a;else{for(var i=!1,u=s.child;u;){if(u===n){i=!0,n=s,r=a;break}if(u===r){i=!0,r=s,n=a;break}u=u.sibling}if(!i){for(u=a.child;u;){if(u===n){i=!0,n=a,r=s;break}if(u===r){i=!0,r=a,n=s;break}u=u.sibling}if(!i)throw Error(J(189))}}if(n.alternate!==r)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function jf(e){return e=mh(e),e!==null?Nf(e):null}function Nf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Nf(e);if(t!==null)return t;e=e.sibling}return null}var Cf=en.unstable_scheduleCallback,ju=en.unstable_cancelCallback,xh=en.unstable_shouldYield,vh=en.unstable_requestPaint,mt=en.unstable_now,yh=en.unstable_getCurrentPriorityLevel,Cl=en.unstable_ImmediatePriority,Ef=en.unstable_UserBlockingPriority,Ka=en.unstable_NormalPriority,kh=en.unstable_LowPriority,zf=en.unstable_IdlePriority,wi=null,_n=null;function wh(e){if(_n&&typeof _n.onCommitFiberRoot=="function")try{_n.onCommitFiberRoot(wi,e,void 0,(e.current.flags&128)===128)}catch{}}var kn=Math.clz32?Math.clz32:jh,bh=Math.log,Sh=Math.LN2;function jh(e){return e>>>=0,e===0?32:31-(bh(e)/Sh|0)|0}var ma=64,xa=4194304;function Cs(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Wa(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,a=e.pingedLanes,i=n&268435455;if(i!==0){var u=i&~s;u!==0?r=Cs(u):(a&=i,a!==0&&(r=Cs(a)))}else i=n&~s,i!==0?r=Cs(i):a!==0&&(r=Cs(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,a=t&-t,s>=a||s===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-kn(t),s=1<<n,r|=e[n],t&=~s;return r}function Nh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ch(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-kn(a),u=1<<i,c=s[i];c===-1?(!(u&n)||u&r)&&(s[i]=Nh(u,t)):c<=t&&(e.expiredLanes|=u),a&=~u}}function _o(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Pf(){var e=ma;return ma<<=1,!(ma&4194240)&&(ma=64),e}function Ki(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ia(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-kn(t),e[t]=n}function Eh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-kn(n),a=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~a}}function El(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-kn(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var Qe=0;function Lf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var If,zl,_f,Mf,Of,Mo=!1,va=[],sr=null,ar=null,ir=null,Fs=new Map,Bs=new Map,er=[],zh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Nu(e,t){switch(e){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":ar=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":Fs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bs.delete(t.pointerId)}}function gs(e,t,n,r,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[s]},t!==null&&(t=la(t),t!==null&&zl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Ph(e,t,n,r,s){switch(t){case"focusin":return sr=gs(sr,e,t,n,r,s),!0;case"dragenter":return ar=gs(ar,e,t,n,r,s),!0;case"mouseover":return ir=gs(ir,e,t,n,r,s),!0;case"pointerover":var a=s.pointerId;return Fs.set(a,gs(Fs.get(a)||null,e,t,n,r,s)),!0;case"gotpointercapture":return a=s.pointerId,Bs.set(a,gs(Bs.get(a)||null,e,t,n,r,s)),!0}return!1}function Tf(e){var t=wr(e.target);if(t!==null){var n=Mr(t);if(n!==null){if(t=n.tag,t===13){if(t=Sf(n),t!==null){e.blockedOn=t,Of(e.priority,function(){_f(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function _a(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Oo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);zo=r,n.target.dispatchEvent(r),zo=null}else return t=la(n),t!==null&&zl(t),e.blockedOn=n,!1;t.shift()}return!0}function Cu(e,t,n){_a(e)&&n.delete(t)}function Lh(){Mo=!1,sr!==null&&_a(sr)&&(sr=null),ar!==null&&_a(ar)&&(ar=null),ir!==null&&_a(ir)&&(ir=null),Fs.forEach(Cu),Bs.forEach(Cu)}function ms(e,t){e.blockedOn===t&&(e.blockedOn=null,Mo||(Mo=!0,en.unstable_scheduleCallback(en.unstable_NormalPriority,Lh)))}function Hs(e){function t(s){return ms(s,e)}if(0<va.length){ms(va[0],e);for(var n=1;n<va.length;n++){var r=va[n];r.blockedOn===e&&(r.blockedOn=null)}}for(sr!==null&&ms(sr,e),ar!==null&&ms(ar,e),ir!==null&&ms(ir,e),Fs.forEach(t),Bs.forEach(t),n=0;n<er.length;n++)r=er[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<er.length&&(n=er[0],n.blockedOn===null);)Tf(n),n.blockedOn===null&&er.shift()}var Gr=Qn.ReactCurrentBatchConfig,Ya=!0;function Ih(e,t,n,r){var s=Qe,a=Gr.transition;Gr.transition=null;try{Qe=1,Pl(e,t,n,r)}finally{Qe=s,Gr.transition=a}}function _h(e,t,n,r){var s=Qe,a=Gr.transition;Gr.transition=null;try{Qe=4,Pl(e,t,n,r)}finally{Qe=s,Gr.transition=a}}function Pl(e,t,n,r){if(Ya){var s=Oo(e,t,n,r);if(s===null)to(e,t,r,Qa,n),Nu(e,r);else if(Ph(s,e,t,n,r))r.stopPropagation();else if(Nu(e,r),t&4&&-1<zh.indexOf(e)){for(;s!==null;){var a=la(s);if(a!==null&&If(a),a=Oo(e,t,n,r),a===null&&to(e,t,r,Qa,n),a===s)break;s=a}s!==null&&r.stopPropagation()}else to(e,t,r,null,n)}}var Qa=null;function Oo(e,t,n,r){if(Qa=null,e=Nl(r),e=wr(e),e!==null)if(t=Mr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Sf(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Qa=e,null}function Rf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(yh()){case Cl:return 1;case Ef:return 4;case Ka:case kh:return 16;case zf:return 536870912;default:return 16}default:return 16}}var nr=null,Ll=null,Ma=null;function Df(){if(Ma)return Ma;var e,t=Ll,n=t.length,r,s="value"in nr?nr.value:nr.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===s[a-r];r++);return Ma=s.slice(e,1<r?1-r:void 0)}function Oa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ya(){return!0}function Eu(){return!1}function nn(e){function t(n,r,s,a,i){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=a,this.target=i,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(a):a[u]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?ya:Eu,this.isPropagationStopped=Eu,this}return lt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ya)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ya)},persist:function(){},isPersistent:ya}),t}var us={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=nn(us),oa=lt({},us,{view:0,detail:0}),Mh=nn(oa),Wi,Yi,xs,bi=lt({},oa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_l,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==xs&&(xs&&e.type==="mousemove"?(Wi=e.screenX-xs.screenX,Yi=e.screenY-xs.screenY):Yi=Wi=0,xs=e),Wi)},movementY:function(e){return"movementY"in e?e.movementY:Yi}}),zu=nn(bi),Oh=lt({},bi,{dataTransfer:0}),Th=nn(Oh),Rh=lt({},oa,{relatedTarget:0}),Qi=nn(Rh),Dh=lt({},us,{animationName:0,elapsedTime:0,pseudoElement:0}),Ah=nn(Dh),Uh=lt({},us,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),$h=nn(Uh),Fh=lt({},us,{data:0}),Pu=nn(Fh),Bh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Kh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vh[e])?!!t[e]:!1}function _l(){return Kh}var Wh=lt({},oa,{key:function(e){if(e.key){var t=Bh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Oa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_l,charCode:function(e){return e.type==="keypress"?Oa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Oa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Yh=nn(Wh),Qh=lt({},bi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Lu=nn(Qh),Jh=lt({},oa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_l}),Xh=nn(Jh),Zh=lt({},us,{propertyName:0,elapsedTime:0,pseudoElement:0}),Gh=nn(Zh),qh=lt({},bi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),eg=nn(qh),tg=[9,13,27,32],Ml=Vn&&"CompositionEvent"in window,Ls=null;Vn&&"documentMode"in document&&(Ls=document.documentMode);var ng=Vn&&"TextEvent"in window&&!Ls,Af=Vn&&(!Ml||Ls&&8<Ls&&11>=Ls),Iu=" ",_u=!1;function Uf(e,t){switch(e){case"keyup":return tg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $f(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ur=!1;function rg(e,t){switch(e){case"compositionend":return $f(t);case"keypress":return t.which!==32?null:(_u=!0,Iu);case"textInput":return e=t.data,e===Iu&&_u?null:e;default:return null}}function sg(e,t){if(Ur)return e==="compositionend"||!Ml&&Uf(e,t)?(e=Df(),Ma=Ll=nr=null,Ur=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Af&&t.locale!=="ko"?null:t.data;default:return null}}var ag={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ag[e.type]:t==="textarea"}function Ff(e,t,n,r){vf(r),t=Ja(t,"onChange"),0<t.length&&(n=new Il("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Is=null,Vs=null;function ig(e){Gf(e,0)}function Si(e){var t=Br(e);if(ff(t))return e}function og(e,t){if(e==="change")return t}var Bf=!1;if(Vn){var Ji;if(Vn){var Xi="oninput"in document;if(!Xi){var Ou=document.createElement("div");Ou.setAttribute("oninput","return;"),Xi=typeof Ou.oninput=="function"}Ji=Xi}else Ji=!1;Bf=Ji&&(!document.documentMode||9<document.documentMode)}function Tu(){Is&&(Is.detachEvent("onpropertychange",Hf),Vs=Is=null)}function Hf(e){if(e.propertyName==="value"&&Si(Vs)){var t=[];Ff(t,Vs,e,Nl(e)),bf(ig,t)}}function lg(e,t,n){e==="focusin"?(Tu(),Is=t,Vs=n,Is.attachEvent("onpropertychange",Hf)):e==="focusout"&&Tu()}function ug(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Si(Vs)}function cg(e,t){if(e==="click")return Si(t)}function fg(e,t){if(e==="input"||e==="change")return Si(t)}function dg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var bn=typeof Object.is=="function"?Object.is:dg;function Ks(e,t){if(bn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!mo.call(t,s)||!bn(e[s],t[s]))return!1}return!0}function Ru(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Du(e,t){var n=Ru(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ru(n)}}function Vf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Kf(){for(var e=window,t=Ba();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ba(e.document)}return t}function Ol(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function pg(e){var t=Kf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vf(n.ownerDocument.documentElement,n)){if(r!==null&&Ol(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,a=Math.min(r.start,s);r=r.end===void 0?a:Math.min(r.end,s),!e.extend&&a>r&&(s=r,r=a,a=s),s=Du(n,a);var i=Du(n,r);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hg=Vn&&"documentMode"in document&&11>=document.documentMode,$r=null,To=null,_s=null,Ro=!1;function Au(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ro||$r==null||$r!==Ba(r)||(r=$r,"selectionStart"in r&&Ol(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),_s&&Ks(_s,r)||(_s=r,r=Ja(To,"onSelect"),0<r.length&&(t=new Il("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=$r)))}function ka(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Fr={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionend:ka("Transition","TransitionEnd")},Zi={},Wf={};Vn&&(Wf=document.createElement("div").style,"AnimationEvent"in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),"TransitionEvent"in window||delete Fr.transitionend.transition);function ji(e){if(Zi[e])return Zi[e];if(!Fr[e])return e;var t=Fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Wf)return Zi[e]=t[n];return e}var Yf=ji("animationend"),Qf=ji("animationiteration"),Jf=ji("animationstart"),Xf=ji("transitionend"),Zf=new Map,Uu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function hr(e,t){Zf.set(e,t),_r(t,[e])}for(var Gi=0;Gi<Uu.length;Gi++){var qi=Uu[Gi],gg=qi.toLowerCase(),mg=qi[0].toUpperCase()+qi.slice(1);hr(gg,"on"+mg)}hr(Yf,"onAnimationEnd");hr(Qf,"onAnimationIteration");hr(Jf,"onAnimationStart");hr("dblclick","onDoubleClick");hr("focusin","onFocus");hr("focusout","onBlur");hr(Xf,"onTransitionEnd");ts("onMouseEnter",["mouseout","mouseover"]);ts("onMouseLeave",["mouseout","mouseover"]);ts("onPointerEnter",["pointerout","pointerover"]);ts("onPointerLeave",["pointerout","pointerover"]);_r("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));_r("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));_r("onBeforeInput",["compositionend","keypress","textInput","paste"]);_r("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));_r("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Es="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xg=new Set("cancel close invalid load scroll toggle".split(" ").concat(Es));function $u(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,gh(r,t,void 0,e),e.currentTarget=null}function Gf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var i=r.length-1;0<=i;i--){var u=r[i],c=u.instance,d=u.currentTarget;if(u=u.listener,c!==a&&s.isPropagationStopped())break e;$u(s,u,d),a=c}else for(i=0;i<r.length;i++){if(u=r[i],c=u.instance,d=u.currentTarget,u=u.listener,c!==a&&s.isPropagationStopped())break e;$u(s,u,d),a=c}}}if(Va)throw e=Io,Va=!1,Io=null,e}function tt(e,t){var n=t[Fo];n===void 0&&(n=t[Fo]=new Set);var r=e+"__bubble";n.has(r)||(qf(t,e,2,!1),n.add(r))}function eo(e,t,n){var r=0;t&&(r|=4),qf(n,e,r,t)}var wa="_reactListening"+Math.random().toString(36).slice(2);function Ws(e){if(!e[wa]){e[wa]=!0,af.forEach(function(n){n!=="selectionchange"&&(xg.has(n)||eo(n,!1,e),eo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wa]||(t[wa]=!0,eo("selectionchange",!1,t))}}function qf(e,t,n,r){switch(Rf(t)){case 1:var s=Ih;break;case 4:s=_h;break;default:s=Pl}n=s.bind(null,t,n,e),s=void 0,!Lo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function to(e,t,n,r,s){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var u=r.stateNode.containerInfo;if(u===s||u.nodeType===8&&u.parentNode===s)break;if(i===4)for(i=r.return;i!==null;){var c=i.tag;if((c===3||c===4)&&(c=i.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;i=i.return}for(;u!==null;){if(i=wr(u),i===null)return;if(c=i.tag,c===5||c===6){r=a=i;continue e}u=u.parentNode}}r=r.return}bf(function(){var d=a,m=Nl(n),k=[];e:{var x=Zf.get(e);if(x!==void 0){var E=Il,P=e;switch(e){case"keypress":if(Oa(n)===0)break e;case"keydown":case"keyup":E=Yh;break;case"focusin":P="focus",E=Qi;break;case"focusout":P="blur",E=Qi;break;case"beforeblur":case"afterblur":E=Qi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=zu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=Th;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=Xh;break;case Yf:case Qf:case Jf:E=Ah;break;case Xf:E=Gh;break;case"scroll":E=Mh;break;case"wheel":E=eg;break;case"copy":case"cut":case"paste":E=$h;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=Lu}var z=(t&4)!==0,G=!z&&e==="scroll",b=z?x!==null?x+"Capture":null:x;z=[];for(var v=d,w;v!==null;){w=v;var N=w.stateNode;if(w.tag===5&&N!==null&&(w=N,b!==null&&(N=$s(v,b),N!=null&&z.push(Ys(v,N,w)))),G)break;v=v.return}0<z.length&&(x=new E(x,P,null,n,m),k.push({event:x,listeners:z}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",x&&n!==zo&&(P=n.relatedTarget||n.fromElement)&&(wr(P)||P[Kn]))break e;if((E||x)&&(x=m.window===m?m:(x=m.ownerDocument)?x.defaultView||x.parentWindow:window,E?(P=n.relatedTarget||n.toElement,E=d,P=P?wr(P):null,P!==null&&(G=Mr(P),P!==G||P.tag!==5&&P.tag!==6)&&(P=null)):(E=null,P=d),E!==P)){if(z=zu,N="onMouseLeave",b="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(z=Lu,N="onPointerLeave",b="onPointerEnter",v="pointer"),G=E==null?x:Br(E),w=P==null?x:Br(P),x=new z(N,v+"leave",E,n,m),x.target=G,x.relatedTarget=w,N=null,wr(m)===d&&(z=new z(b,v+"enter",P,n,m),z.target=w,z.relatedTarget=G,N=z),G=N,E&&P)t:{for(z=E,b=P,v=0,w=z;w;w=Or(w))v++;for(w=0,N=b;N;N=Or(N))w++;for(;0<v-w;)z=Or(z),v--;for(;0<w-v;)b=Or(b),w--;for(;v--;){if(z===b||b!==null&&z===b.alternate)break t;z=Or(z),b=Or(b)}z=null}else z=null;E!==null&&Fu(k,x,E,z,!1),P!==null&&G!==null&&Fu(k,G,P,z,!0)}}e:{if(x=d?Br(d):window,E=x.nodeName&&x.nodeName.toLowerCase(),E==="select"||E==="input"&&x.type==="file")var I=og;else if(Mu(x))if(Bf)I=fg;else{I=ug;var D=lg}else(E=x.nodeName)&&E.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(I=cg);if(I&&(I=I(e,d))){Ff(k,I,n,m);break e}D&&D(e,x,d),e==="focusout"&&(D=x._wrapperState)&&D.controlled&&x.type==="number"&&So(x,"number",x.value)}switch(D=d?Br(d):window,e){case"focusin":(Mu(D)||D.contentEditable==="true")&&($r=D,To=d,_s=null);break;case"focusout":_s=To=$r=null;break;case"mousedown":Ro=!0;break;case"contextmenu":case"mouseup":case"dragend":Ro=!1,Au(k,n,m);break;case"selectionchange":if(hg)break;case"keydown":case"keyup":Au(k,n,m)}var F;if(Ml)e:{switch(e){case"compositionstart":var q="onCompositionStart";break e;case"compositionend":q="onCompositionEnd";break e;case"compositionupdate":q="onCompositionUpdate";break e}q=void 0}else Ur?Uf(e,n)&&(q="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(q="onCompositionStart");q&&(Af&&n.locale!=="ko"&&(Ur||q!=="onCompositionStart"?q==="onCompositionEnd"&&Ur&&(F=Df()):(nr=m,Ll="value"in nr?nr.value:nr.textContent,Ur=!0)),D=Ja(d,q),0<D.length&&(q=new Pu(q,e,null,n,m),k.push({event:q,listeners:D}),F?q.data=F:(F=$f(n),F!==null&&(q.data=F)))),(F=ng?rg(e,n):sg(e,n))&&(d=Ja(d,"onBeforeInput"),0<d.length&&(m=new Pu("onBeforeInput","beforeinput",null,n,m),k.push({event:m,listeners:d}),m.data=F))}Gf(k,t)})}function Ys(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ja(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=$s(e,n),a!=null&&r.unshift(Ys(e,a,s)),a=$s(e,t),a!=null&&r.push(Ys(e,a,s))),e=e.return}return r}function Or(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Fu(e,t,n,r,s){for(var a=t._reactName,i=[];n!==null&&n!==r;){var u=n,c=u.alternate,d=u.stateNode;if(c!==null&&c===r)break;u.tag===5&&d!==null&&(u=d,s?(c=$s(n,a),c!=null&&i.unshift(Ys(n,c,u))):s||(c=$s(n,a),c!=null&&i.push(Ys(n,c,u)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var vg=/\r\n?/g,yg=/\u0000|\uFFFD/g;function Bu(e){return(typeof e=="string"?e:""+e).replace(vg,`
`).replace(yg,"")}function ba(e,t,n){if(t=Bu(t),Bu(e)!==t&&n)throw Error(J(425))}function Xa(){}var Do=null,Ao=null;function Uo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $o=typeof setTimeout=="function"?setTimeout:void 0,kg=typeof clearTimeout=="function"?clearTimeout:void 0,Hu=typeof Promise=="function"?Promise:void 0,wg=typeof queueMicrotask=="function"?queueMicrotask:typeof Hu<"u"?function(e){return Hu.resolve(null).then(e).catch(bg)}:$o;function bg(e){setTimeout(function(){throw e})}function no(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),Hs(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Hs(t)}function or(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Vu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var cs=Math.random().toString(36).slice(2),Ln="__reactFiber$"+cs,Qs="__reactProps$"+cs,Kn="__reactContainer$"+cs,Fo="__reactEvents$"+cs,Sg="__reactListeners$"+cs,jg="__reactHandles$"+cs;function wr(e){var t=e[Ln];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Kn]||n[Ln]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Vu(e);e!==null;){if(n=e[Ln])return n;e=Vu(e)}return t}e=n,n=e.parentNode}return null}function la(e){return e=e[Ln]||e[Kn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Br(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(J(33))}function Ni(e){return e[Qs]||null}var Bo=[],Hr=-1;function gr(e){return{current:e}}function nt(e){0>Hr||(e.current=Bo[Hr],Bo[Hr]=null,Hr--)}function Ze(e,t){Hr++,Bo[Hr]=e.current,e.current=t}var pr={},Tt=gr(pr),Vt=gr(!1),Er=pr;function ns(e,t){var n=e.type.contextTypes;if(!n)return pr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in n)s[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Kt(e){return e=e.childContextTypes,e!=null}function Za(){nt(Vt),nt(Tt)}function Ku(e,t,n){if(Tt.current!==pr)throw Error(J(168));Ze(Tt,t),Ze(Vt,n)}function ed(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(J(108,lh(e)||"Unknown",s));return lt({},n,r)}function Ga(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||pr,Er=Tt.current,Ze(Tt,e),Ze(Vt,Vt.current),!0}function Wu(e,t,n){var r=e.stateNode;if(!r)throw Error(J(169));n?(e=ed(e,t,Er),r.__reactInternalMemoizedMergedChildContext=e,nt(Vt),nt(Tt),Ze(Tt,e)):nt(Vt),Ze(Vt,n)}var $n=null,Ci=!1,ro=!1;function td(e){$n===null?$n=[e]:$n.push(e)}function Ng(e){Ci=!0,td(e)}function mr(){if(!ro&&$n!==null){ro=!0;var e=0,t=Qe;try{var n=$n;for(Qe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}$n=null,Ci=!1}catch(s){throw $n!==null&&($n=$n.slice(e+1)),Cf(Cl,mr),s}finally{Qe=t,ro=!1}}return null}var Vr=[],Kr=0,qa=null,ei=0,sn=[],an=0,zr=null,Fn=1,Bn="";function yr(e,t){Vr[Kr++]=ei,Vr[Kr++]=qa,qa=e,ei=t}function nd(e,t,n){sn[an++]=Fn,sn[an++]=Bn,sn[an++]=zr,zr=e;var r=Fn;e=Bn;var s=32-kn(r)-1;r&=~(1<<s),n+=1;var a=32-kn(t)+s;if(30<a){var i=s-s%5;a=(r&(1<<i)-1).toString(32),r>>=i,s-=i,Fn=1<<32-kn(t)+s|n<<s|r,Bn=a+e}else Fn=1<<a|n<<s|r,Bn=e}function Tl(e){e.return!==null&&(yr(e,1),nd(e,1,0))}function Rl(e){for(;e===qa;)qa=Vr[--Kr],Vr[Kr]=null,ei=Vr[--Kr],Vr[Kr]=null;for(;e===zr;)zr=sn[--an],sn[an]=null,Bn=sn[--an],sn[an]=null,Fn=sn[--an],sn[an]=null}var qt=null,Gt=null,st=!1,yn=null;function rd(e,t){var n=on(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Yu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,qt=e,Gt=or(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,qt=e,Gt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=zr!==null?{id:Fn,overflow:Bn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=on(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,qt=e,Gt=null,!0):!1;default:return!1}}function Ho(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Vo(e){if(st){var t=Gt;if(t){var n=t;if(!Yu(e,t)){if(Ho(e))throw Error(J(418));t=or(n.nextSibling);var r=qt;t&&Yu(e,t)?rd(r,n):(e.flags=e.flags&-4097|2,st=!1,qt=e)}}else{if(Ho(e))throw Error(J(418));e.flags=e.flags&-4097|2,st=!1,qt=e}}}function Qu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;qt=e}function Sa(e){if(e!==qt)return!1;if(!st)return Qu(e),st=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Uo(e.type,e.memoizedProps)),t&&(t=Gt)){if(Ho(e))throw sd(),Error(J(418));for(;t;)rd(e,t),t=or(t.nextSibling)}if(Qu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Gt=or(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Gt=null}}else Gt=qt?or(e.stateNode.nextSibling):null;return!0}function sd(){for(var e=Gt;e;)e=or(e.nextSibling)}function rs(){Gt=qt=null,st=!1}function Dl(e){yn===null?yn=[e]:yn.push(e)}var Cg=Qn.ReactCurrentBatchConfig;function vs(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(J(309));var r=n.stateNode}if(!r)throw Error(J(147,e));var s=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(i){var u=s.refs;i===null?delete u[a]:u[a]=i},t._stringRef=a,t)}if(typeof e!="string")throw Error(J(284));if(!n._owner)throw Error(J(290,e))}return e}function ja(e,t){throw e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ju(e){var t=e._init;return t(e._payload)}function ad(e){function t(b,v){if(e){var w=b.deletions;w===null?(b.deletions=[v],b.flags|=16):w.push(v)}}function n(b,v){if(!e)return null;for(;v!==null;)t(b,v),v=v.sibling;return null}function r(b,v){for(b=new Map;v!==null;)v.key!==null?b.set(v.key,v):b.set(v.index,v),v=v.sibling;return b}function s(b,v){return b=fr(b,v),b.index=0,b.sibling=null,b}function a(b,v,w){return b.index=w,e?(w=b.alternate,w!==null?(w=w.index,w<v?(b.flags|=2,v):w):(b.flags|=2,v)):(b.flags|=1048576,v)}function i(b){return e&&b.alternate===null&&(b.flags|=2),b}function u(b,v,w,N){return v===null||v.tag!==6?(v=co(w,b.mode,N),v.return=b,v):(v=s(v,w),v.return=b,v)}function c(b,v,w,N){var I=w.type;return I===Ar?m(b,v,w.props.children,N,w.key):v!==null&&(v.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===Gn&&Ju(I)===v.type)?(N=s(v,w.props),N.ref=vs(b,v,w),N.return=b,N):(N=Fa(w.type,w.key,w.props,null,b.mode,N),N.ref=vs(b,v,w),N.return=b,N)}function d(b,v,w,N){return v===null||v.tag!==4||v.stateNode.containerInfo!==w.containerInfo||v.stateNode.implementation!==w.implementation?(v=fo(w,b.mode,N),v.return=b,v):(v=s(v,w.children||[]),v.return=b,v)}function m(b,v,w,N,I){return v===null||v.tag!==7?(v=Nr(w,b.mode,N,I),v.return=b,v):(v=s(v,w),v.return=b,v)}function k(b,v,w){if(typeof v=="string"&&v!==""||typeof v=="number")return v=co(""+v,b.mode,w),v.return=b,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case pa:return w=Fa(v.type,v.key,v.props,null,b.mode,w),w.ref=vs(b,null,v),w.return=b,w;case Dr:return v=fo(v,b.mode,w),v.return=b,v;case Gn:var N=v._init;return k(b,N(v._payload),w)}if(Ns(v)||ps(v))return v=Nr(v,b.mode,w,null),v.return=b,v;ja(b,v)}return null}function x(b,v,w,N){var I=v!==null?v.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return I!==null?null:u(b,v,""+w,N);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case pa:return w.key===I?c(b,v,w,N):null;case Dr:return w.key===I?d(b,v,w,N):null;case Gn:return I=w._init,x(b,v,I(w._payload),N)}if(Ns(w)||ps(w))return I!==null?null:m(b,v,w,N,null);ja(b,w)}return null}function E(b,v,w,N,I){if(typeof N=="string"&&N!==""||typeof N=="number")return b=b.get(w)||null,u(v,b,""+N,I);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case pa:return b=b.get(N.key===null?w:N.key)||null,c(v,b,N,I);case Dr:return b=b.get(N.key===null?w:N.key)||null,d(v,b,N,I);case Gn:var D=N._init;return E(b,v,w,D(N._payload),I)}if(Ns(N)||ps(N))return b=b.get(w)||null,m(v,b,N,I,null);ja(v,N)}return null}function P(b,v,w,N){for(var I=null,D=null,F=v,q=v=0,Pe=null;F!==null&&q<w.length;q++){F.index>q?(Pe=F,F=null):Pe=F.sibling;var he=x(b,F,w[q],N);if(he===null){F===null&&(F=Pe);break}e&&F&&he.alternate===null&&t(b,F),v=a(he,v,q),D===null?I=he:D.sibling=he,D=he,F=Pe}if(q===w.length)return n(b,F),st&&yr(b,q),I;if(F===null){for(;q<w.length;q++)F=k(b,w[q],N),F!==null&&(v=a(F,v,q),D===null?I=F:D.sibling=F,D=F);return st&&yr(b,q),I}for(F=r(b,F);q<w.length;q++)Pe=E(F,b,q,w[q],N),Pe!==null&&(e&&Pe.alternate!==null&&F.delete(Pe.key===null?q:Pe.key),v=a(Pe,v,q),D===null?I=Pe:D.sibling=Pe,D=Pe);return e&&F.forEach(function(De){return t(b,De)}),st&&yr(b,q),I}function z(b,v,w,N){var I=ps(w);if(typeof I!="function")throw Error(J(150));if(w=I.call(w),w==null)throw Error(J(151));for(var D=I=null,F=v,q=v=0,Pe=null,he=w.next();F!==null&&!he.done;q++,he=w.next()){F.index>q?(Pe=F,F=null):Pe=F.sibling;var De=x(b,F,he.value,N);if(De===null){F===null&&(F=Pe);break}e&&F&&De.alternate===null&&t(b,F),v=a(De,v,q),D===null?I=De:D.sibling=De,D=De,F=Pe}if(he.done)return n(b,F),st&&yr(b,q),I;if(F===null){for(;!he.done;q++,he=w.next())he=k(b,he.value,N),he!==null&&(v=a(he,v,q),D===null?I=he:D.sibling=he,D=he);return st&&yr(b,q),I}for(F=r(b,F);!he.done;q++,he=w.next())he=E(F,b,q,he.value,N),he!==null&&(e&&he.alternate!==null&&F.delete(he.key===null?q:he.key),v=a(he,v,q),D===null?I=he:D.sibling=he,D=he);return e&&F.forEach(function(Ge){return t(b,Ge)}),st&&yr(b,q),I}function G(b,v,w,N){if(typeof w=="object"&&w!==null&&w.type===Ar&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case pa:e:{for(var I=w.key,D=v;D!==null;){if(D.key===I){if(I=w.type,I===Ar){if(D.tag===7){n(b,D.sibling),v=s(D,w.props.children),v.return=b,b=v;break e}}else if(D.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===Gn&&Ju(I)===D.type){n(b,D.sibling),v=s(D,w.props),v.ref=vs(b,D,w),v.return=b,b=v;break e}n(b,D);break}else t(b,D);D=D.sibling}w.type===Ar?(v=Nr(w.props.children,b.mode,N,w.key),v.return=b,b=v):(N=Fa(w.type,w.key,w.props,null,b.mode,N),N.ref=vs(b,v,w),N.return=b,b=N)}return i(b);case Dr:e:{for(D=w.key;v!==null;){if(v.key===D)if(v.tag===4&&v.stateNode.containerInfo===w.containerInfo&&v.stateNode.implementation===w.implementation){n(b,v.sibling),v=s(v,w.children||[]),v.return=b,b=v;break e}else{n(b,v);break}else t(b,v);v=v.sibling}v=fo(w,b.mode,N),v.return=b,b=v}return i(b);case Gn:return D=w._init,G(b,v,D(w._payload),N)}if(Ns(w))return P(b,v,w,N);if(ps(w))return z(b,v,w,N);ja(b,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,v!==null&&v.tag===6?(n(b,v.sibling),v=s(v,w),v.return=b,b=v):(n(b,v),v=co(w,b.mode,N),v.return=b,b=v),i(b)):n(b,v)}return G}var ss=ad(!0),id=ad(!1),ti=gr(null),ni=null,Wr=null,Al=null;function Ul(){Al=Wr=ni=null}function $l(e){var t=ti.current;nt(ti),e._currentValue=t}function Ko(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function qr(e,t){ni=e,Al=Wr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ht=!0),e.firstContext=null)}function un(e){var t=e._currentValue;if(Al!==e)if(e={context:e,memoizedValue:t,next:null},Wr===null){if(ni===null)throw Error(J(308));Wr=e,ni.dependencies={lanes:0,firstContext:e}}else Wr=Wr.next=e;return t}var br=null;function Fl(e){br===null?br=[e]:br.push(e)}function od(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Fl(t)):(n.next=s.next,s.next=n),t.interleaved=n,Wn(e,r)}function Wn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var qn=!1;function Bl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ld(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Hn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function lr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ve&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,Wn(e,n)}return s=r.interleaved,s===null?(t.next=t,Fl(r)):(t.next=s.next,s.next=t),r.interleaved=t,Wn(e,n)}function Ta(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,El(e,n)}}function Xu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?s=a=i:a=a.next=i,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ri(e,t,n,r){var s=e.updateQueue;qn=!1;var a=s.firstBaseUpdate,i=s.lastBaseUpdate,u=s.shared.pending;if(u!==null){s.shared.pending=null;var c=u,d=c.next;c.next=null,i===null?a=d:i.next=d,i=c;var m=e.alternate;m!==null&&(m=m.updateQueue,u=m.lastBaseUpdate,u!==i&&(u===null?m.firstBaseUpdate=d:u.next=d,m.lastBaseUpdate=c))}if(a!==null){var k=s.baseState;i=0,m=d=c=null,u=a;do{var x=u.lane,E=u.eventTime;if((r&x)===x){m!==null&&(m=m.next={eventTime:E,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var P=e,z=u;switch(x=t,E=n,z.tag){case 1:if(P=z.payload,typeof P=="function"){k=P.call(E,k,x);break e}k=P;break e;case 3:P.flags=P.flags&-65537|128;case 0:if(P=z.payload,x=typeof P=="function"?P.call(E,k,x):P,x==null)break e;k=lt({},k,x);break e;case 2:qn=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,x=s.effects,x===null?s.effects=[u]:x.push(u))}else E={eventTime:E,lane:x,tag:u.tag,payload:u.payload,callback:u.callback,next:null},m===null?(d=m=E,c=k):m=m.next=E,i|=x;if(u=u.next,u===null){if(u=s.shared.pending,u===null)break;x=u,u=x.next,x.next=null,s.lastBaseUpdate=x,s.shared.pending=null}}while(!0);if(m===null&&(c=k),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else a===null&&(s.shared.lanes=0);Lr|=i,e.lanes=i,e.memoizedState=k}}function Zu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(J(191,s));s.call(r)}}}var ua={},Mn=gr(ua),Js=gr(ua),Xs=gr(ua);function Sr(e){if(e===ua)throw Error(J(174));return e}function Hl(e,t){switch(Ze(Xs,t),Ze(Js,e),Ze(Mn,ua),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:No(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=No(t,e)}nt(Mn),Ze(Mn,t)}function as(){nt(Mn),nt(Js),nt(Xs)}function ud(e){Sr(Xs.current);var t=Sr(Mn.current),n=No(t,e.type);t!==n&&(Ze(Js,e),Ze(Mn,n))}function Vl(e){Js.current===e&&(nt(Mn),nt(Js))}var it=gr(0);function si(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var so=[];function Kl(){for(var e=0;e<so.length;e++)so[e]._workInProgressVersionPrimary=null;so.length=0}var Ra=Qn.ReactCurrentDispatcher,ao=Qn.ReactCurrentBatchConfig,Pr=0,ot=null,wt=null,St=null,ai=!1,Ms=!1,Zs=0,Eg=0;function _t(){throw Error(J(321))}function Wl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!bn(e[n],t[n]))return!1;return!0}function Yl(e,t,n,r,s,a){if(Pr=a,ot=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ra.current=e===null||e.memoizedState===null?Ig:_g,e=n(r,s),Ms){a=0;do{if(Ms=!1,Zs=0,25<=a)throw Error(J(301));a+=1,St=wt=null,t.updateQueue=null,Ra.current=Mg,e=n(r,s)}while(Ms)}if(Ra.current=ii,t=wt!==null&&wt.next!==null,Pr=0,St=wt=ot=null,ai=!1,t)throw Error(J(300));return e}function Ql(){var e=Zs!==0;return Zs=0,e}function Pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return St===null?ot.memoizedState=St=e:St=St.next=e,St}function cn(){if(wt===null){var e=ot.alternate;e=e!==null?e.memoizedState:null}else e=wt.next;var t=St===null?ot.memoizedState:St.next;if(t!==null)St=t,wt=e;else{if(e===null)throw Error(J(310));wt=e,e={memoizedState:wt.memoizedState,baseState:wt.baseState,baseQueue:wt.baseQueue,queue:wt.queue,next:null},St===null?ot.memoizedState=St=e:St=St.next=e}return St}function Gs(e,t){return typeof t=="function"?t(e):t}function io(e){var t=cn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=wt,s=r.baseQueue,a=n.pending;if(a!==null){if(s!==null){var i=s.next;s.next=a.next,a.next=i}r.baseQueue=s=a,n.pending=null}if(s!==null){a=s.next,r=r.baseState;var u=i=null,c=null,d=a;do{var m=d.lane;if((Pr&m)===m)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var k={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(u=c=k,i=r):c=c.next=k,ot.lanes|=m,Lr|=m}d=d.next}while(d!==null&&d!==a);c===null?i=r:c.next=u,bn(r,t.memoizedState)||(Ht=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do a=s.lane,ot.lanes|=a,Lr|=a,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function oo(e){var t=cn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do a=e(a,i.action),i=i.next;while(i!==s);bn(a,t.memoizedState)||(Ht=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function cd(){}function fd(e,t){var n=ot,r=cn(),s=t(),a=!bn(r.memoizedState,s);if(a&&(r.memoizedState=s,Ht=!0),r=r.queue,Jl(hd.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||St!==null&&St.memoizedState.tag&1){if(n.flags|=2048,qs(9,pd.bind(null,n,r,s,t),void 0,null),jt===null)throw Error(J(349));Pr&30||dd(n,t,s)}return s}function dd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ot.updateQueue,t===null?(t={lastEffect:null,stores:null},ot.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function pd(e,t,n,r){t.value=n,t.getSnapshot=r,gd(t)&&md(e)}function hd(e,t,n){return n(function(){gd(t)&&md(e)})}function gd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!bn(e,n)}catch{return!0}}function md(e){var t=Wn(e,1);t!==null&&wn(t,e,1,-1)}function Gu(e){var t=Pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Gs,lastRenderedState:e},t.queue=e,e=e.dispatch=Lg.bind(null,ot,e),[t.memoizedState,e]}function qs(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ot.updateQueue,t===null?(t={lastEffect:null,stores:null},ot.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function xd(){return cn().memoizedState}function Da(e,t,n,r){var s=Pn();ot.flags|=e,s.memoizedState=qs(1|t,n,void 0,r===void 0?null:r)}function Ei(e,t,n,r){var s=cn();r=r===void 0?null:r;var a=void 0;if(wt!==null){var i=wt.memoizedState;if(a=i.destroy,r!==null&&Wl(r,i.deps)){s.memoizedState=qs(t,n,a,r);return}}ot.flags|=e,s.memoizedState=qs(1|t,n,a,r)}function qu(e,t){return Da(8390656,8,e,t)}function Jl(e,t){return Ei(2048,8,e,t)}function vd(e,t){return Ei(4,2,e,t)}function yd(e,t){return Ei(4,4,e,t)}function kd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function wd(e,t,n){return n=n!=null?n.concat([e]):null,Ei(4,4,kd.bind(null,t,e),n)}function Xl(){}function bd(e,t){var n=cn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Sd(e,t){var n=cn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Wl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function jd(e,t,n){return Pr&21?(bn(n,t)||(n=Pf(),ot.lanes|=n,Lr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ht=!0),e.memoizedState=n)}function zg(e,t){var n=Qe;Qe=n!==0&&4>n?n:4,e(!0);var r=ao.transition;ao.transition={};try{e(!1),t()}finally{Qe=n,ao.transition=r}}function Nd(){return cn().memoizedState}function Pg(e,t,n){var r=cr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Cd(e))Ed(t,n);else if(n=od(e,t,n,r),n!==null){var s=At();wn(n,e,r,s),zd(n,t,r)}}function Lg(e,t,n){var r=cr(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Cd(e))Ed(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var i=t.lastRenderedState,u=a(i,n);if(s.hasEagerState=!0,s.eagerState=u,bn(u,i)){var c=t.interleaved;c===null?(s.next=s,Fl(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=od(e,t,s,r),n!==null&&(s=At(),wn(n,e,r,s),zd(n,t,r))}}function Cd(e){var t=e.alternate;return e===ot||t!==null&&t===ot}function Ed(e,t){Ms=ai=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function zd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,El(e,n)}}var ii={readContext:un,useCallback:_t,useContext:_t,useEffect:_t,useImperativeHandle:_t,useInsertionEffect:_t,useLayoutEffect:_t,useMemo:_t,useReducer:_t,useRef:_t,useState:_t,useDebugValue:_t,useDeferredValue:_t,useTransition:_t,useMutableSource:_t,useSyncExternalStore:_t,useId:_t,unstable_isNewReconciler:!1},Ig={readContext:un,useCallback:function(e,t){return Pn().memoizedState=[e,t===void 0?null:t],e},useContext:un,useEffect:qu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Da(4194308,4,kd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Da(4194308,4,e,t)},useInsertionEffect:function(e,t){return Da(4,2,e,t)},useMemo:function(e,t){var n=Pn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Pn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Pg.bind(null,ot,e),[r.memoizedState,e]},useRef:function(e){var t=Pn();return e={current:e},t.memoizedState=e},useState:Gu,useDebugValue:Xl,useDeferredValue:function(e){return Pn().memoizedState=e},useTransition:function(){var e=Gu(!1),t=e[0];return e=zg.bind(null,e[1]),Pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ot,s=Pn();if(st){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),jt===null)throw Error(J(349));Pr&30||dd(r,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,qu(hd.bind(null,r,a,e),[e]),r.flags|=2048,qs(9,pd.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Pn(),t=jt.identifierPrefix;if(st){var n=Bn,r=Fn;n=(r&~(1<<32-kn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zs++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Eg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},_g={readContext:un,useCallback:bd,useContext:un,useEffect:Jl,useImperativeHandle:wd,useInsertionEffect:vd,useLayoutEffect:yd,useMemo:Sd,useReducer:io,useRef:xd,useState:function(){return io(Gs)},useDebugValue:Xl,useDeferredValue:function(e){var t=cn();return jd(t,wt.memoizedState,e)},useTransition:function(){var e=io(Gs)[0],t=cn().memoizedState;return[e,t]},useMutableSource:cd,useSyncExternalStore:fd,useId:Nd,unstable_isNewReconciler:!1},Mg={readContext:un,useCallback:bd,useContext:un,useEffect:Jl,useImperativeHandle:wd,useInsertionEffect:vd,useLayoutEffect:yd,useMemo:Sd,useReducer:oo,useRef:xd,useState:function(){return oo(Gs)},useDebugValue:Xl,useDeferredValue:function(e){var t=cn();return wt===null?t.memoizedState=e:jd(t,wt.memoizedState,e)},useTransition:function(){var e=oo(Gs)[0],t=cn().memoizedState;return[e,t]},useMutableSource:cd,useSyncExternalStore:fd,useId:Nd,unstable_isNewReconciler:!1};function xn(e,t){if(e&&e.defaultProps){t=lt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Wo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:lt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zi={isMounted:function(e){return(e=e._reactInternals)?Mr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=At(),s=cr(e),a=Hn(r,s);a.payload=t,n!=null&&(a.callback=n),t=lr(e,a,s),t!==null&&(wn(t,e,s,r),Ta(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=At(),s=cr(e),a=Hn(r,s);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=lr(e,a,s),t!==null&&(wn(t,e,s,r),Ta(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=At(),r=cr(e),s=Hn(n,r);s.tag=2,t!=null&&(s.callback=t),t=lr(e,s,r),t!==null&&(wn(t,e,r,n),Ta(t,e,r))}};function ec(e,t,n,r,s,a,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,i):t.prototype&&t.prototype.isPureReactComponent?!Ks(n,r)||!Ks(s,a):!0}function Pd(e,t,n){var r=!1,s=pr,a=t.contextType;return typeof a=="object"&&a!==null?a=un(a):(s=Kt(t)?Er:Tt.current,r=t.contextTypes,a=(r=r!=null)?ns(e,s):pr),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=zi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),t}function tc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zi.enqueueReplaceState(t,t.state,null)}function Yo(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Bl(e);var a=t.contextType;typeof a=="object"&&a!==null?s.context=un(a):(a=Kt(t)?Er:Tt.current,s.context=ns(e,a)),s.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Wo(e,t,a,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&zi.enqueueReplaceState(s,s.state,null),ri(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function is(e,t){try{var n="",r=t;do n+=oh(r),r=r.return;while(r);var s=n}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:s,digest:null}}function lo(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function Qo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Og=typeof WeakMap=="function"?WeakMap:Map;function Ld(e,t,n){n=Hn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){li||(li=!0,sl=r),Qo(e,t)},n}function Id(e,t,n){n=Hn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){Qo(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Qo(e,t),typeof r!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function nc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Og;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Qg.bind(null,e,t,n),t.then(e,e))}function rc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function sc(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Hn(-1,1),t.tag=2,lr(n,t,1))),n.lanes|=1),e)}var Tg=Qn.ReactCurrentOwner,Ht=!1;function Dt(e,t,n,r){t.child=e===null?id(t,null,n,r):ss(t,e.child,n,r)}function ac(e,t,n,r,s){n=n.render;var a=t.ref;return qr(t,s),r=Yl(e,t,n,r,a,s),n=Ql(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Yn(e,t,s)):(st&&n&&Tl(t),t.flags|=1,Dt(e,t,r,s),t.child)}function ic(e,t,n,r,s){if(e===null){var a=n.type;return typeof a=="function"&&!su(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,_d(e,t,a,r,s)):(e=Fa(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&s)){var i=a.memoizedProps;if(n=n.compare,n=n!==null?n:Ks,n(i,r)&&e.ref===t.ref)return Yn(e,t,s)}return t.flags|=1,e=fr(a,r),e.ref=t.ref,e.return=t,t.child=e}function _d(e,t,n,r,s){if(e!==null){var a=e.memoizedProps;if(Ks(a,r)&&e.ref===t.ref)if(Ht=!1,t.pendingProps=r=a,(e.lanes&s)!==0)e.flags&131072&&(Ht=!0);else return t.lanes=e.lanes,Yn(e,t,s)}return Jo(e,t,n,r,s)}function Md(e,t,n){var r=t.pendingProps,s=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ze(Qr,Zt),Zt|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ze(Qr,Zt),Zt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,Ze(Qr,Zt),Zt|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,Ze(Qr,Zt),Zt|=r;return Dt(e,t,s,n),t.child}function Od(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Jo(e,t,n,r,s){var a=Kt(n)?Er:Tt.current;return a=ns(t,a),qr(t,s),n=Yl(e,t,n,r,a,s),r=Ql(),e!==null&&!Ht?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Yn(e,t,s)):(st&&r&&Tl(t),t.flags|=1,Dt(e,t,n,s),t.child)}function oc(e,t,n,r,s){if(Kt(n)){var a=!0;Ga(t)}else a=!1;if(qr(t,s),t.stateNode===null)Aa(e,t),Pd(t,n,r),Yo(t,n,r,s),r=!0;else if(e===null){var i=t.stateNode,u=t.memoizedProps;i.props=u;var c=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=un(d):(d=Kt(n)?Er:Tt.current,d=ns(t,d));var m=n.getDerivedStateFromProps,k=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";k||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==r||c!==d)&&tc(t,i,r,d),qn=!1;var x=t.memoizedState;i.state=x,ri(t,r,i,s),c=t.memoizedState,u!==r||x!==c||Vt.current||qn?(typeof m=="function"&&(Wo(t,n,m,r),c=t.memoizedState),(u=qn||ec(t,n,u,r,x,c,d))?(k||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),i.props=r,i.state=c,i.context=d,r=u):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,ld(e,t),u=t.memoizedProps,d=t.type===t.elementType?u:xn(t.type,u),i.props=d,k=t.pendingProps,x=i.context,c=n.contextType,typeof c=="object"&&c!==null?c=un(c):(c=Kt(n)?Er:Tt.current,c=ns(t,c));var E=n.getDerivedStateFromProps;(m=typeof E=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u!==k||x!==c)&&tc(t,i,r,c),qn=!1,x=t.memoizedState,i.state=x,ri(t,r,i,s);var P=t.memoizedState;u!==k||x!==P||Vt.current||qn?(typeof E=="function"&&(Wo(t,n,E,r),P=t.memoizedState),(d=qn||ec(t,n,d,r,x,P,c)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,P,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,P,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=P),i.props=r,i.state=P,i.context=c,r=d):(typeof i.componentDidUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),r=!1)}return Xo(e,t,n,r,a,s)}function Xo(e,t,n,r,s,a){Od(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return s&&Wu(t,n,!1),Yn(e,t,a);r=t.stateNode,Tg.current=t;var u=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=ss(t,e.child,null,a),t.child=ss(t,null,u,a)):Dt(e,t,u,a),t.memoizedState=r.state,s&&Wu(t,n,!0),t.child}function Td(e){var t=e.stateNode;t.pendingContext?Ku(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ku(e,t.context,!1),Hl(e,t.containerInfo)}function lc(e,t,n,r,s){return rs(),Dl(s),t.flags|=256,Dt(e,t,n,r),t.child}var Zo={dehydrated:null,treeContext:null,retryLane:0};function Go(e){return{baseLanes:e,cachePool:null,transitions:null}}function Rd(e,t,n){var r=t.pendingProps,s=it.current,a=!1,i=(t.flags&128)!==0,u;if((u=i)||(u=e!==null&&e.memoizedState===null?!1:(s&2)!==0),u?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Ze(it,s&1),e===null)return Vo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,a?(r=t.mode,a=t.child,i={mode:"hidden",children:i},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=Ii(i,r,0,null),e=Nr(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Go(n),t.memoizedState=Zo,e):Zl(t,i));if(s=e.memoizedState,s!==null&&(u=s.dehydrated,u!==null))return Rg(e,t,i,r,u,s,n);if(a){a=r.fallback,i=t.mode,s=e.child,u=s.sibling;var c={mode:"hidden",children:r.children};return!(i&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=fr(s,c),r.subtreeFlags=s.subtreeFlags&14680064),u!==null?a=fr(u,a):(a=Nr(a,i,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,i=e.child.memoizedState,i=i===null?Go(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},a.memoizedState=i,a.childLanes=e.childLanes&~n,t.memoizedState=Zo,r}return a=e.child,e=a.sibling,r=fr(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Zl(e,t){return t=Ii({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Na(e,t,n,r){return r!==null&&Dl(r),ss(t,e.child,null,n),e=Zl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rg(e,t,n,r,s,a,i){if(n)return t.flags&256?(t.flags&=-257,r=lo(Error(J(422))),Na(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,s=t.mode,r=Ii({mode:"visible",children:r.children},s,0,null),a=Nr(a,s,i,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&ss(t,e.child,null,i),t.child.memoizedState=Go(i),t.memoizedState=Zo,a);if(!(t.mode&1))return Na(e,t,i,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var u=r.dgst;return r=u,a=Error(J(419)),r=lo(a,r,void 0),Na(e,t,i,r)}if(u=(i&e.childLanes)!==0,Ht||u){if(r=jt,r!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|i)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,Wn(e,s),wn(r,e,s,-1))}return ru(),r=lo(Error(J(421))),Na(e,t,i,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Jg.bind(null,e),s._reactRetry=t,null):(e=a.treeContext,Gt=or(s.nextSibling),qt=t,st=!0,yn=null,e!==null&&(sn[an++]=Fn,sn[an++]=Bn,sn[an++]=zr,Fn=e.id,Bn=e.overflow,zr=t),t=Zl(t,r.children),t.flags|=4096,t)}function uc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ko(e.return,t,n)}function uo(e,t,n,r,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=s)}function Dd(e,t,n){var r=t.pendingProps,s=r.revealOrder,a=r.tail;if(Dt(e,t,r.children,n),r=it.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&uc(e,n,t);else if(e.tag===19)uc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ze(it,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&si(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),uo(t,!1,s,n,a);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&si(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}uo(t,!0,n,null,a);break;case"together":uo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Aa(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Yn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Lr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=fr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=fr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Dg(e,t,n){switch(t.tag){case 3:Td(t),rs();break;case 5:ud(t);break;case 1:Kt(t.type)&&Ga(t);break;case 4:Hl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;Ze(ti,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ze(it,it.current&1),t.flags|=128,null):n&t.child.childLanes?Rd(e,t,n):(Ze(it,it.current&1),e=Yn(e,t,n),e!==null?e.sibling:null);Ze(it,it.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Dd(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Ze(it,it.current),r)break;return null;case 22:case 23:return t.lanes=0,Md(e,t,n)}return Yn(e,t,n)}var Ad,qo,Ud,$d;Ad=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};qo=function(){};Ud=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Sr(Mn.current);var a=null;switch(n){case"input":s=wo(e,s),r=wo(e,r),a=[];break;case"select":s=lt({},s,{value:void 0}),r=lt({},r,{value:void 0}),a=[];break;case"textarea":s=jo(e,s),r=jo(e,r),a=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Xa)}Co(n,r);var i;n=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var u=s[d];for(i in u)u.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(As.hasOwnProperty(d)?a||(a=[]):(a=a||[]).push(d,null));for(d in r){var c=r[d];if(u=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&c!==u&&(c!=null||u!=null))if(d==="style")if(u){for(i in u)!u.hasOwnProperty(i)||c&&c.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in c)c.hasOwnProperty(i)&&u[i]!==c[i]&&(n||(n={}),n[i]=c[i])}else n||(a||(a=[]),a.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,u=u?u.__html:void 0,c!=null&&u!==c&&(a=a||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(As.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&tt("scroll",e),a||u===c||(a=[])):(a=a||[]).push(d,c))}n&&(a=a||[]).push("style",n);var d=a;(t.updateQueue=d)&&(t.flags|=4)}};$d=function(e,t,n,r){n!==r&&(t.flags|=4)};function ys(e,t){if(!st)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Mt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ag(e,t,n){var r=t.pendingProps;switch(Rl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mt(t),null;case 1:return Kt(t.type)&&Za(),Mt(t),null;case 3:return r=t.stateNode,as(),nt(Vt),nt(Tt),Kl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Sa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,yn!==null&&(ol(yn),yn=null))),qo(e,t),Mt(t),null;case 5:Vl(t);var s=Sr(Xs.current);if(n=t.type,e!==null&&t.stateNode!=null)Ud(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(J(166));return Mt(t),null}if(e=Sr(Mn.current),Sa(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Ln]=t,r[Qs]=a,e=(t.mode&1)!==0,n){case"dialog":tt("cancel",r),tt("close",r);break;case"iframe":case"object":case"embed":tt("load",r);break;case"video":case"audio":for(s=0;s<Es.length;s++)tt(Es[s],r);break;case"source":tt("error",r);break;case"img":case"image":case"link":tt("error",r),tt("load",r);break;case"details":tt("toggle",r);break;case"input":vu(r,a),tt("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},tt("invalid",r);break;case"textarea":ku(r,a),tt("invalid",r)}Co(n,a),s=null;for(var i in a)if(a.hasOwnProperty(i)){var u=a[i];i==="children"?typeof u=="string"?r.textContent!==u&&(a.suppressHydrationWarning!==!0&&ba(r.textContent,u,e),s=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(a.suppressHydrationWarning!==!0&&ba(r.textContent,u,e),s=["children",""+u]):As.hasOwnProperty(i)&&u!=null&&i==="onScroll"&&tt("scroll",r)}switch(n){case"input":ha(r),yu(r,a,!0);break;case"textarea":ha(r),wu(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Xa)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=hf(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Ln]=t,e[Qs]=r,Ad(e,t,!1,!1),t.stateNode=e;e:{switch(i=Eo(n,r),n){case"dialog":tt("cancel",e),tt("close",e),s=r;break;case"iframe":case"object":case"embed":tt("load",e),s=r;break;case"video":case"audio":for(s=0;s<Es.length;s++)tt(Es[s],e);s=r;break;case"source":tt("error",e),s=r;break;case"img":case"image":case"link":tt("error",e),tt("load",e),s=r;break;case"details":tt("toggle",e),s=r;break;case"input":vu(e,r),s=wo(e,r),tt("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=lt({},r,{value:void 0}),tt("invalid",e);break;case"textarea":ku(e,r),s=jo(e,r),tt("invalid",e);break;default:s=r}Co(n,s),u=s;for(a in u)if(u.hasOwnProperty(a)){var c=u[a];a==="style"?xf(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&gf(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Us(e,c):typeof c=="number"&&Us(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(As.hasOwnProperty(a)?c!=null&&a==="onScroll"&&tt("scroll",e):c!=null&&wl(e,a,c,i))}switch(n){case"input":ha(e),yu(e,r,!1);break;case"textarea":ha(e),wu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+dr(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Jr(e,!!r.multiple,a,!1):r.defaultValue!=null&&Jr(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Xa)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Mt(t),null;case 6:if(e&&t.stateNode!=null)$d(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(J(166));if(n=Sr(Xs.current),Sr(Mn.current),Sa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ln]=t,(a=r.nodeValue!==n)&&(e=qt,e!==null))switch(e.tag){case 3:ba(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ba(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ln]=t,t.stateNode=r}return Mt(t),null;case 13:if(nt(it),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(st&&Gt!==null&&t.mode&1&&!(t.flags&128))sd(),rs(),t.flags|=98560,a=!1;else if(a=Sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(J(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(J(317));a[Ln]=t}else rs(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mt(t),a=!1}else yn!==null&&(ol(yn),yn=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||it.current&1?bt===0&&(bt=3):ru())),t.updateQueue!==null&&(t.flags|=4),Mt(t),null);case 4:return as(),qo(e,t),e===null&&Ws(t.stateNode.containerInfo),Mt(t),null;case 10:return $l(t.type._context),Mt(t),null;case 17:return Kt(t.type)&&Za(),Mt(t),null;case 19:if(nt(it),a=t.memoizedState,a===null)return Mt(t),null;if(r=(t.flags&128)!==0,i=a.rendering,i===null)if(r)ys(a,!1);else{if(bt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=si(e),i!==null){for(t.flags|=128,ys(a,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ze(it,it.current&1|2),t.child}e=e.sibling}a.tail!==null&&mt()>os&&(t.flags|=128,r=!0,ys(a,!1),t.lanes=4194304)}else{if(!r)if(e=si(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ys(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!st)return Mt(t),null}else 2*mt()-a.renderingStartTime>os&&n!==1073741824&&(t.flags|=128,r=!0,ys(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(n=a.last,n!==null?n.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=mt(),t.sibling=null,n=it.current,Ze(it,r?n&1|2:n&1),t):(Mt(t),null);case 22:case 23:return nu(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Zt&1073741824&&(Mt(t),t.subtreeFlags&6&&(t.flags|=8192)):Mt(t),null;case 24:return null;case 25:return null}throw Error(J(156,t.tag))}function Ug(e,t){switch(Rl(t),t.tag){case 1:return Kt(t.type)&&Za(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return as(),nt(Vt),nt(Tt),Kl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Vl(t),null;case 13:if(nt(it),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));rs()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return nt(it),null;case 4:return as(),null;case 10:return $l(t.type._context),null;case 22:case 23:return nu(),null;case 24:return null;default:return null}}var Ca=!1,Ot=!1,$g=typeof WeakSet=="function"?WeakSet:Set,ce=null;function Yr(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ht(e,t,r)}else n.current=null}function el(e,t,n){try{n()}catch(r){ht(e,t,r)}}var cc=!1;function Fg(e,t){if(Do=Ya,e=Kf(),Ol(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var i=0,u=-1,c=-1,d=0,m=0,k=e,x=null;t:for(;;){for(var E;k!==n||s!==0&&k.nodeType!==3||(u=i+s),k!==a||r!==0&&k.nodeType!==3||(c=i+r),k.nodeType===3&&(i+=k.nodeValue.length),(E=k.firstChild)!==null;)x=k,k=E;for(;;){if(k===e)break t;if(x===n&&++d===s&&(u=i),x===a&&++m===r&&(c=i),(E=k.nextSibling)!==null)break;k=x,x=k.parentNode}k=E}n=u===-1||c===-1?null:{start:u,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ao={focusedElem:e,selectionRange:n},Ya=!1,ce=t;ce!==null;)if(t=ce,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ce=e;else for(;ce!==null;){t=ce;try{var P=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(P!==null){var z=P.memoizedProps,G=P.memoizedState,b=t.stateNode,v=b.getSnapshotBeforeUpdate(t.elementType===t.type?z:xn(t.type,z),G);b.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var w=t.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(J(163))}}catch(N){ht(t,t.return,N)}if(e=t.sibling,e!==null){e.return=t.return,ce=e;break}ce=t.return}return P=cc,cc=!1,P}function Os(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&el(t,n,a)}s=s.next}while(s!==r)}}function Pi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function tl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Fd(e){var t=e.alternate;t!==null&&(e.alternate=null,Fd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ln],delete t[Qs],delete t[Fo],delete t[Sg],delete t[jg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Bd(e){return e.tag===5||e.tag===3||e.tag===4}function fc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Bd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Xa));else if(r!==4&&(e=e.child,e!==null))for(nl(e,t,n),e=e.sibling;e!==null;)nl(e,t,n),e=e.sibling}function rl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(rl(e,t,n),e=e.sibling;e!==null;)rl(e,t,n),e=e.sibling}var Nt=null,vn=!1;function Zn(e,t,n){for(n=n.child;n!==null;)Hd(e,t,n),n=n.sibling}function Hd(e,t,n){if(_n&&typeof _n.onCommitFiberUnmount=="function")try{_n.onCommitFiberUnmount(wi,n)}catch{}switch(n.tag){case 5:Ot||Yr(n,t);case 6:var r=Nt,s=vn;Nt=null,Zn(e,t,n),Nt=r,vn=s,Nt!==null&&(vn?(e=Nt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Nt.removeChild(n.stateNode));break;case 18:Nt!==null&&(vn?(e=Nt,n=n.stateNode,e.nodeType===8?no(e.parentNode,n):e.nodeType===1&&no(e,n),Hs(e)):no(Nt,n.stateNode));break;case 4:r=Nt,s=vn,Nt=n.stateNode.containerInfo,vn=!0,Zn(e,t,n),Nt=r,vn=s;break;case 0:case 11:case 14:case 15:if(!Ot&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var a=s,i=a.destroy;a=a.tag,i!==void 0&&(a&2||a&4)&&el(n,t,i),s=s.next}while(s!==r)}Zn(e,t,n);break;case 1:if(!Ot&&(Yr(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){ht(n,t,u)}Zn(e,t,n);break;case 21:Zn(e,t,n);break;case 22:n.mode&1?(Ot=(r=Ot)||n.memoizedState!==null,Zn(e,t,n),Ot=r):Zn(e,t,n);break;default:Zn(e,t,n)}}function dc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $g),t.forEach(function(r){var s=Xg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function mn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var a=e,i=t,u=i;e:for(;u!==null;){switch(u.tag){case 5:Nt=u.stateNode,vn=!1;break e;case 3:Nt=u.stateNode.containerInfo,vn=!0;break e;case 4:Nt=u.stateNode.containerInfo,vn=!0;break e}u=u.return}if(Nt===null)throw Error(J(160));Hd(a,i,s),Nt=null,vn=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){ht(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vd(t,e),t=t.sibling}function Vd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(mn(t,e),zn(e),r&4){try{Os(3,e,e.return),Pi(3,e)}catch(z){ht(e,e.return,z)}try{Os(5,e,e.return)}catch(z){ht(e,e.return,z)}}break;case 1:mn(t,e),zn(e),r&512&&n!==null&&Yr(n,n.return);break;case 5:if(mn(t,e),zn(e),r&512&&n!==null&&Yr(n,n.return),e.flags&32){var s=e.stateNode;try{Us(s,"")}catch(z){ht(e,e.return,z)}}if(r&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,i=n!==null?n.memoizedProps:a,u=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{u==="input"&&a.type==="radio"&&a.name!=null&&df(s,a),Eo(u,i);var d=Eo(u,a);for(i=0;i<c.length;i+=2){var m=c[i],k=c[i+1];m==="style"?xf(s,k):m==="dangerouslySetInnerHTML"?gf(s,k):m==="children"?Us(s,k):wl(s,m,k,d)}switch(u){case"input":bo(s,a);break;case"textarea":pf(s,a);break;case"select":var x=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var E=a.value;E!=null?Jr(s,!!a.multiple,E,!1):x!==!!a.multiple&&(a.defaultValue!=null?Jr(s,!!a.multiple,a.defaultValue,!0):Jr(s,!!a.multiple,a.multiple?[]:"",!1))}s[Qs]=a}catch(z){ht(e,e.return,z)}}break;case 6:if(mn(t,e),zn(e),r&4){if(e.stateNode===null)throw Error(J(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(z){ht(e,e.return,z)}}break;case 3:if(mn(t,e),zn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hs(t.containerInfo)}catch(z){ht(e,e.return,z)}break;case 4:mn(t,e),zn(e);break;case 13:mn(t,e),zn(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(eu=mt())),r&4&&dc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Ot=(d=Ot)||m,mn(t,e),Ot=d):mn(t,e),zn(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(ce=e,m=e.child;m!==null;){for(k=ce=m;ce!==null;){switch(x=ce,E=x.child,x.tag){case 0:case 11:case 14:case 15:Os(4,x,x.return);break;case 1:Yr(x,x.return);var P=x.stateNode;if(typeof P.componentWillUnmount=="function"){r=x,n=x.return;try{t=r,P.props=t.memoizedProps,P.state=t.memoizedState,P.componentWillUnmount()}catch(z){ht(r,n,z)}}break;case 5:Yr(x,x.return);break;case 22:if(x.memoizedState!==null){hc(k);continue}}E!==null?(E.return=x,ce=E):hc(k)}m=m.sibling}e:for(m=null,k=e;;){if(k.tag===5){if(m===null){m=k;try{s=k.stateNode,d?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(u=k.stateNode,c=k.memoizedProps.style,i=c!=null&&c.hasOwnProperty("display")?c.display:null,u.style.display=mf("display",i))}catch(z){ht(e,e.return,z)}}}else if(k.tag===6){if(m===null)try{k.stateNode.nodeValue=d?"":k.memoizedProps}catch(z){ht(e,e.return,z)}}else if((k.tag!==22&&k.tag!==23||k.memoizedState===null||k===e)&&k.child!==null){k.child.return=k,k=k.child;continue}if(k===e)break e;for(;k.sibling===null;){if(k.return===null||k.return===e)break e;m===k&&(m=null),k=k.return}m===k&&(m=null),k.sibling.return=k.return,k=k.sibling}}break;case 19:mn(t,e),zn(e),r&4&&dc(e);break;case 21:break;default:mn(t,e),zn(e)}}function zn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Bd(n)){var r=n;break e}n=n.return}throw Error(J(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Us(s,""),r.flags&=-33);var a=fc(e);rl(e,a,s);break;case 3:case 4:var i=r.stateNode.containerInfo,u=fc(e);nl(e,u,i);break;default:throw Error(J(161))}}catch(c){ht(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bg(e,t,n){ce=e,Kd(e)}function Kd(e,t,n){for(var r=(e.mode&1)!==0;ce!==null;){var s=ce,a=s.child;if(s.tag===22&&r){var i=s.memoizedState!==null||Ca;if(!i){var u=s.alternate,c=u!==null&&u.memoizedState!==null||Ot;u=Ca;var d=Ot;if(Ca=i,(Ot=c)&&!d)for(ce=s;ce!==null;)i=ce,c=i.child,i.tag===22&&i.memoizedState!==null?gc(s):c!==null?(c.return=i,ce=c):gc(s);for(;a!==null;)ce=a,Kd(a),a=a.sibling;ce=s,Ca=u,Ot=d}pc(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,ce=a):pc(e)}}function pc(e){for(;ce!==null;){var t=ce;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ot||Pi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ot)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:xn(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Zu(t,a,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Zu(t,i,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var k=m.dehydrated;k!==null&&Hs(k)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(J(163))}Ot||t.flags&512&&tl(t)}catch(x){ht(t,t.return,x)}}if(t===e){ce=null;break}if(n=t.sibling,n!==null){n.return=t.return,ce=n;break}ce=t.return}}function hc(e){for(;ce!==null;){var t=ce;if(t===e){ce=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ce=n;break}ce=t.return}}function gc(e){for(;ce!==null;){var t=ce;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Pi(4,t)}catch(c){ht(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){ht(t,s,c)}}var a=t.return;try{tl(t)}catch(c){ht(t,a,c)}break;case 5:var i=t.return;try{tl(t)}catch(c){ht(t,i,c)}}}catch(c){ht(t,t.return,c)}if(t===e){ce=null;break}var u=t.sibling;if(u!==null){u.return=t.return,ce=u;break}ce=t.return}}var Hg=Math.ceil,oi=Qn.ReactCurrentDispatcher,Gl=Qn.ReactCurrentOwner,ln=Qn.ReactCurrentBatchConfig,Ve=0,jt=null,vt=null,Ct=0,Zt=0,Qr=gr(0),bt=0,ea=null,Lr=0,Li=0,ql=0,Ts=null,Bt=null,eu=0,os=1/0,Un=null,li=!1,sl=null,ur=null,Ea=!1,rr=null,ui=0,Rs=0,al=null,Ua=-1,$a=0;function At(){return Ve&6?mt():Ua!==-1?Ua:Ua=mt()}function cr(e){return e.mode&1?Ve&2&&Ct!==0?Ct&-Ct:Cg.transition!==null?($a===0&&($a=Pf()),$a):(e=Qe,e!==0||(e=window.event,e=e===void 0?16:Rf(e.type)),e):1}function wn(e,t,n,r){if(50<Rs)throw Rs=0,al=null,Error(J(185));ia(e,n,r),(!(Ve&2)||e!==jt)&&(e===jt&&(!(Ve&2)&&(Li|=n),bt===4&&tr(e,Ct)),Wt(e,r),n===1&&Ve===0&&!(t.mode&1)&&(os=mt()+500,Ci&&mr()))}function Wt(e,t){var n=e.callbackNode;Ch(e,t);var r=Wa(e,e===jt?Ct:0);if(r===0)n!==null&&ju(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ju(n),t===1)e.tag===0?Ng(mc.bind(null,e)):td(mc.bind(null,e)),wg(function(){!(Ve&6)&&mr()}),n=null;else{switch(Lf(r)){case 1:n=Cl;break;case 4:n=Ef;break;case 16:n=Ka;break;case 536870912:n=zf;break;default:n=Ka}n=qd(n,Wd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Wd(e,t){if(Ua=-1,$a=0,Ve&6)throw Error(J(327));var n=e.callbackNode;if(es()&&e.callbackNode!==n)return null;var r=Wa(e,e===jt?Ct:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ci(e,r);else{t=r;var s=Ve;Ve|=2;var a=Qd();(jt!==e||Ct!==t)&&(Un=null,os=mt()+500,jr(e,t));do try{Wg();break}catch(u){Yd(e,u)}while(!0);Ul(),oi.current=a,Ve=s,vt!==null?t=0:(jt=null,Ct=0,t=bt)}if(t!==0){if(t===2&&(s=_o(e),s!==0&&(r=s,t=il(e,s))),t===1)throw n=ea,jr(e,0),tr(e,r),Wt(e,mt()),n;if(t===6)tr(e,r);else{if(s=e.current.alternate,!(r&30)&&!Vg(s)&&(t=ci(e,r),t===2&&(a=_o(e),a!==0&&(r=a,t=il(e,a))),t===1))throw n=ea,jr(e,0),tr(e,r),Wt(e,mt()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(J(345));case 2:kr(e,Bt,Un);break;case 3:if(tr(e,r),(r&130023424)===r&&(t=eu+500-mt(),10<t)){if(Wa(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){At(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=$o(kr.bind(null,e,Bt,Un),t);break}kr(e,Bt,Un);break;case 4:if(tr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var i=31-kn(r);a=1<<i,i=t[i],i>s&&(s=i),r&=~a}if(r=s,r=mt()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Hg(r/1960))-r,10<r){e.timeoutHandle=$o(kr.bind(null,e,Bt,Un),r);break}kr(e,Bt,Un);break;case 5:kr(e,Bt,Un);break;default:throw Error(J(329))}}}return Wt(e,mt()),e.callbackNode===n?Wd.bind(null,e):null}function il(e,t){var n=Ts;return e.current.memoizedState.isDehydrated&&(jr(e,t).flags|=256),e=ci(e,t),e!==2&&(t=Bt,Bt=n,t!==null&&ol(t)),e}function ol(e){Bt===null?Bt=e:Bt.push.apply(Bt,e)}function Vg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],a=s.getSnapshot;s=s.value;try{if(!bn(a(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function tr(e,t){for(t&=~ql,t&=~Li,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-kn(t),r=1<<n;e[n]=-1,t&=~r}}function mc(e){if(Ve&6)throw Error(J(327));es();var t=Wa(e,0);if(!(t&1))return Wt(e,mt()),null;var n=ci(e,t);if(e.tag!==0&&n===2){var r=_o(e);r!==0&&(t=r,n=il(e,r))}if(n===1)throw n=ea,jr(e,0),tr(e,t),Wt(e,mt()),n;if(n===6)throw Error(J(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,kr(e,Bt,Un),Wt(e,mt()),null}function tu(e,t){var n=Ve;Ve|=1;try{return e(t)}finally{Ve=n,Ve===0&&(os=mt()+500,Ci&&mr())}}function Ir(e){rr!==null&&rr.tag===0&&!(Ve&6)&&es();var t=Ve;Ve|=1;var n=ln.transition,r=Qe;try{if(ln.transition=null,Qe=1,e)return e()}finally{Qe=r,ln.transition=n,Ve=t,!(Ve&6)&&mr()}}function nu(){Zt=Qr.current,nt(Qr)}function jr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,kg(n)),vt!==null)for(n=vt.return;n!==null;){var r=n;switch(Rl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Za();break;case 3:as(),nt(Vt),nt(Tt),Kl();break;case 5:Vl(r);break;case 4:as();break;case 13:nt(it);break;case 19:nt(it);break;case 10:$l(r.type._context);break;case 22:case 23:nu()}n=n.return}if(jt=e,vt=e=fr(e.current,null),Ct=Zt=t,bt=0,ea=null,ql=Li=Lr=0,Bt=Ts=null,br!==null){for(t=0;t<br.length;t++)if(n=br[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,a=n.pending;if(a!==null){var i=a.next;a.next=s,r.next=i}n.pending=r}br=null}return e}function Yd(e,t){do{var n=vt;try{if(Ul(),Ra.current=ii,ai){for(var r=ot.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ai=!1}if(Pr=0,St=wt=ot=null,Ms=!1,Zs=0,Gl.current=null,n===null||n.return===null){bt=1,ea=t,vt=null;break}e:{var a=e,i=n.return,u=n,c=t;if(t=Ct,u.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,m=u,k=m.tag;if(!(m.mode&1)&&(k===0||k===11||k===15)){var x=m.alternate;x?(m.updateQueue=x.updateQueue,m.memoizedState=x.memoizedState,m.lanes=x.lanes):(m.updateQueue=null,m.memoizedState=null)}var E=rc(i);if(E!==null){E.flags&=-257,sc(E,i,u,a,t),E.mode&1&&nc(a,d,t),t=E,c=d;var P=t.updateQueue;if(P===null){var z=new Set;z.add(c),t.updateQueue=z}else P.add(c);break e}else{if(!(t&1)){nc(a,d,t),ru();break e}c=Error(J(426))}}else if(st&&u.mode&1){var G=rc(i);if(G!==null){!(G.flags&65536)&&(G.flags|=256),sc(G,i,u,a,t),Dl(is(c,u));break e}}a=c=is(c,u),bt!==4&&(bt=2),Ts===null?Ts=[a]:Ts.push(a),a=i;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var b=Ld(a,c,t);Xu(a,b);break e;case 1:u=c;var v=a.type,w=a.stateNode;if(!(a.flags&128)&&(typeof v.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(ur===null||!ur.has(w)))){a.flags|=65536,t&=-t,a.lanes|=t;var N=Id(a,u,t);Xu(a,N);break e}}a=a.return}while(a!==null)}Xd(n)}catch(I){t=I,vt===n&&n!==null&&(vt=n=n.return);continue}break}while(!0)}function Qd(){var e=oi.current;return oi.current=ii,e===null?ii:e}function ru(){(bt===0||bt===3||bt===2)&&(bt=4),jt===null||!(Lr&268435455)&&!(Li&268435455)||tr(jt,Ct)}function ci(e,t){var n=Ve;Ve|=2;var r=Qd();(jt!==e||Ct!==t)&&(Un=null,jr(e,t));do try{Kg();break}catch(s){Yd(e,s)}while(!0);if(Ul(),Ve=n,oi.current=r,vt!==null)throw Error(J(261));return jt=null,Ct=0,bt}function Kg(){for(;vt!==null;)Jd(vt)}function Wg(){for(;vt!==null&&!xh();)Jd(vt)}function Jd(e){var t=Gd(e.alternate,e,Zt);e.memoizedProps=e.pendingProps,t===null?Xd(e):vt=t,Gl.current=null}function Xd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Ug(n,t),n!==null){n.flags&=32767,vt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{bt=6,vt=null;return}}else if(n=Ag(n,t,Zt),n!==null){vt=n;return}if(t=t.sibling,t!==null){vt=t;return}vt=t=e}while(t!==null);bt===0&&(bt=5)}function kr(e,t,n){var r=Qe,s=ln.transition;try{ln.transition=null,Qe=1,Yg(e,t,n,r)}finally{ln.transition=s,Qe=r}return null}function Yg(e,t,n,r){do es();while(rr!==null);if(Ve&6)throw Error(J(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(J(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Eh(e,a),e===jt&&(vt=jt=null,Ct=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ea||(Ea=!0,qd(Ka,function(){return es(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=ln.transition,ln.transition=null;var i=Qe;Qe=1;var u=Ve;Ve|=4,Gl.current=null,Fg(e,n),Vd(n,e),pg(Ao),Ya=!!Do,Ao=Do=null,e.current=n,Bg(n),vh(),Ve=u,Qe=i,ln.transition=a}else e.current=n;if(Ea&&(Ea=!1,rr=e,ui=s),a=e.pendingLanes,a===0&&(ur=null),wh(n.stateNode),Wt(e,mt()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(li)throw li=!1,e=sl,sl=null,e;return ui&1&&e.tag!==0&&es(),a=e.pendingLanes,a&1?e===al?Rs++:(Rs=0,al=e):Rs=0,mr(),null}function es(){if(rr!==null){var e=Lf(ui),t=ln.transition,n=Qe;try{if(ln.transition=null,Qe=16>e?16:e,rr===null)var r=!1;else{if(e=rr,rr=null,ui=0,Ve&6)throw Error(J(331));var s=Ve;for(Ve|=4,ce=e.current;ce!==null;){var a=ce,i=a.child;if(ce.flags&16){var u=a.deletions;if(u!==null){for(var c=0;c<u.length;c++){var d=u[c];for(ce=d;ce!==null;){var m=ce;switch(m.tag){case 0:case 11:case 15:Os(8,m,a)}var k=m.child;if(k!==null)k.return=m,ce=k;else for(;ce!==null;){m=ce;var x=m.sibling,E=m.return;if(Fd(m),m===d){ce=null;break}if(x!==null){x.return=E,ce=x;break}ce=E}}}var P=a.alternate;if(P!==null){var z=P.child;if(z!==null){P.child=null;do{var G=z.sibling;z.sibling=null,z=G}while(z!==null)}}ce=a}}if(a.subtreeFlags&2064&&i!==null)i.return=a,ce=i;else e:for(;ce!==null;){if(a=ce,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Os(9,a,a.return)}var b=a.sibling;if(b!==null){b.return=a.return,ce=b;break e}ce=a.return}}var v=e.current;for(ce=v;ce!==null;){i=ce;var w=i.child;if(i.subtreeFlags&2064&&w!==null)w.return=i,ce=w;else e:for(i=v;ce!==null;){if(u=ce,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Pi(9,u)}}catch(I){ht(u,u.return,I)}if(u===i){ce=null;break e}var N=u.sibling;if(N!==null){N.return=u.return,ce=N;break e}ce=u.return}}if(Ve=s,mr(),_n&&typeof _n.onPostCommitFiberRoot=="function")try{_n.onPostCommitFiberRoot(wi,e)}catch{}r=!0}return r}finally{Qe=n,ln.transition=t}}return!1}function xc(e,t,n){t=is(n,t),t=Ld(e,t,1),e=lr(e,t,1),t=At(),e!==null&&(ia(e,1,t),Wt(e,t))}function ht(e,t,n){if(e.tag===3)xc(e,e,n);else for(;t!==null;){if(t.tag===3){xc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ur===null||!ur.has(r))){e=is(n,e),e=Id(t,e,1),t=lr(t,e,1),e=At(),t!==null&&(ia(t,1,e),Wt(t,e));break}}t=t.return}}function Qg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=At(),e.pingedLanes|=e.suspendedLanes&n,jt===e&&(Ct&n)===n&&(bt===4||bt===3&&(Ct&130023424)===Ct&&500>mt()-eu?jr(e,0):ql|=n),Wt(e,t)}function Zd(e,t){t===0&&(e.mode&1?(t=xa,xa<<=1,!(xa&130023424)&&(xa=4194304)):t=1);var n=At();e=Wn(e,t),e!==null&&(ia(e,t,n),Wt(e,n))}function Jg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Zd(e,n)}function Xg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(J(314))}r!==null&&r.delete(t),Zd(e,n)}var Gd;Gd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Vt.current)Ht=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ht=!1,Dg(e,t,n);Ht=!!(e.flags&131072)}else Ht=!1,st&&t.flags&1048576&&nd(t,ei,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Aa(e,t),e=t.pendingProps;var s=ns(t,Tt.current);qr(t,n),s=Yl(null,t,r,e,s,n);var a=Ql();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Kt(r)?(a=!0,Ga(t)):a=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Bl(t),s.updater=zi,t.stateNode=s,s._reactInternals=t,Yo(t,r,e,n),t=Xo(null,t,r,!0,a,n)):(t.tag=0,st&&a&&Tl(t),Dt(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Aa(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Gg(r),e=xn(r,e),s){case 0:t=Jo(null,t,r,e,n);break e;case 1:t=oc(null,t,r,e,n);break e;case 11:t=ac(null,t,r,e,n);break e;case 14:t=ic(null,t,r,xn(r.type,e),n);break e}throw Error(J(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:xn(r,s),Jo(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:xn(r,s),oc(e,t,r,s,n);case 3:e:{if(Td(t),e===null)throw Error(J(387));r=t.pendingProps,a=t.memoizedState,s=a.element,ld(e,t),ri(t,r,null,n);var i=t.memoizedState;if(r=i.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){s=is(Error(J(423)),t),t=lc(e,t,r,n,s);break e}else if(r!==s){s=is(Error(J(424)),t),t=lc(e,t,r,n,s);break e}else for(Gt=or(t.stateNode.containerInfo.firstChild),qt=t,st=!0,yn=null,n=id(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(rs(),r===s){t=Yn(e,t,n);break e}Dt(e,t,r,n)}t=t.child}return t;case 5:return ud(t),e===null&&Vo(t),r=t.type,s=t.pendingProps,a=e!==null?e.memoizedProps:null,i=s.children,Uo(r,s)?i=null:a!==null&&Uo(r,a)&&(t.flags|=32),Od(e,t),Dt(e,t,i,n),t.child;case 6:return e===null&&Vo(t),null;case 13:return Rd(e,t,n);case 4:return Hl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ss(t,null,r,n):Dt(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:xn(r,s),ac(e,t,r,s,n);case 7:return Dt(e,t,t.pendingProps,n),t.child;case 8:return Dt(e,t,t.pendingProps.children,n),t.child;case 12:return Dt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,a=t.memoizedProps,i=s.value,Ze(ti,r._currentValue),r._currentValue=i,a!==null)if(bn(a.value,i)){if(a.children===s.children&&!Vt.current){t=Yn(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var u=a.dependencies;if(u!==null){i=a.child;for(var c=u.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=Hn(-1,n&-n),c.tag=2;var d=a.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?c.next=c:(c.next=m.next,m.next=c),d.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Ko(a.return,n,t),u.lanes|=n;break}c=c.next}}else if(a.tag===10)i=a.type===t.type?null:a.child;else if(a.tag===18){if(i=a.return,i===null)throw Error(J(341));i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Ko(i,n,t),i=a.sibling}else i=a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===t){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}Dt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,qr(t,n),s=un(s),r=r(s),t.flags|=1,Dt(e,t,r,n),t.child;case 14:return r=t.type,s=xn(r,t.pendingProps),s=xn(r.type,s),ic(e,t,r,s,n);case 15:return _d(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:xn(r,s),Aa(e,t),t.tag=1,Kt(r)?(e=!0,Ga(t)):e=!1,qr(t,n),Pd(t,r,s),Yo(t,r,s,n),Xo(null,t,r,!0,e,n);case 19:return Dd(e,t,n);case 22:return Md(e,t,n)}throw Error(J(156,t.tag))};function qd(e,t){return Cf(e,t)}function Zg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function on(e,t,n,r){return new Zg(e,t,n,r)}function su(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gg(e){if(typeof e=="function")return su(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Sl)return 11;if(e===jl)return 14}return 2}function fr(e,t){var n=e.alternate;return n===null?(n=on(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Fa(e,t,n,r,s,a){var i=2;if(r=e,typeof e=="function")su(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Ar:return Nr(n.children,s,a,t);case bl:i=8,s|=8;break;case xo:return e=on(12,n,t,s|2),e.elementType=xo,e.lanes=a,e;case vo:return e=on(13,n,t,s),e.elementType=vo,e.lanes=a,e;case yo:return e=on(19,n,t,s),e.elementType=yo,e.lanes=a,e;case uf:return Ii(n,s,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case of:i=10;break e;case lf:i=9;break e;case Sl:i=11;break e;case jl:i=14;break e;case Gn:i=16,r=null;break e}throw Error(J(130,e==null?e:typeof e,""))}return t=on(i,n,t,s),t.elementType=e,t.type=r,t.lanes=a,t}function Nr(e,t,n,r){return e=on(7,e,r,t),e.lanes=n,e}function Ii(e,t,n,r){return e=on(22,e,r,t),e.elementType=uf,e.lanes=n,e.stateNode={isHidden:!1},e}function co(e,t,n){return e=on(6,e,null,t),e.lanes=n,e}function fo(e,t,n){return t=on(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function qg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ki(0),this.expirationTimes=Ki(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ki(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function au(e,t,n,r,s,a,i,u,c){return e=new qg(e,t,n,u,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=on(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bl(a),e}function em(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function ep(e){if(!e)return pr;e=e._reactInternals;e:{if(Mr(e)!==e||e.tag!==1)throw Error(J(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Kt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(J(171))}if(e.tag===1){var n=e.type;if(Kt(n))return ed(e,n,t)}return t}function tp(e,t,n,r,s,a,i,u,c){return e=au(n,r,!0,e,s,a,i,u,c),e.context=ep(null),n=e.current,r=At(),s=cr(n),a=Hn(r,s),a.callback=t!=null?t:null,lr(n,a,s),e.current.lanes=s,ia(e,s,r),Wt(e,r),e}function _i(e,t,n,r){var s=t.current,a=At(),i=cr(s);return n=ep(n),t.context===null?t.context=n:t.pendingContext=n,t=Hn(a,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=lr(s,t,i),e!==null&&(wn(e,s,i,a),Ta(e,s,i)),i}function fi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function vc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function iu(e,t){vc(e,t),(e=e.alternate)&&vc(e,t)}function tm(){return null}var np=typeof reportError=="function"?reportError:function(e){console.error(e)};function ou(e){this._internalRoot=e}Mi.prototype.render=ou.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));_i(e,t,null,null)};Mi.prototype.unmount=ou.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ir(function(){_i(null,e,null,null)}),t[Kn]=null}};function Mi(e){this._internalRoot=e}Mi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Mf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<er.length&&t!==0&&t<er[n].priority;n++);er.splice(n,0,e),n===0&&Tf(e)}};function lu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Oi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function yc(){}function nm(e,t,n,r,s){if(s){if(typeof r=="function"){var a=r;r=function(){var d=fi(i);a.call(d)}}var i=tp(t,r,e,0,null,!1,!1,"",yc);return e._reactRootContainer=i,e[Kn]=i.current,Ws(e.nodeType===8?e.parentNode:e),Ir(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var u=r;r=function(){var d=fi(c);u.call(d)}}var c=au(e,0,!1,null,null,!1,!1,"",yc);return e._reactRootContainer=c,e[Kn]=c.current,Ws(e.nodeType===8?e.parentNode:e),Ir(function(){_i(t,c,n,r)}),c}function Ti(e,t,n,r,s){var a=n._reactRootContainer;if(a){var i=a;if(typeof s=="function"){var u=s;s=function(){var c=fi(i);u.call(c)}}_i(t,i,e,s)}else i=nm(n,t,e,s,r);return fi(i)}If=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Cs(t.pendingLanes);n!==0&&(El(t,n|1),Wt(t,mt()),!(Ve&6)&&(os=mt()+500,mr()))}break;case 13:Ir(function(){var r=Wn(e,1);if(r!==null){var s=At();wn(r,e,1,s)}}),iu(e,1)}};zl=function(e){if(e.tag===13){var t=Wn(e,134217728);if(t!==null){var n=At();wn(t,e,134217728,n)}iu(e,134217728)}};_f=function(e){if(e.tag===13){var t=cr(e),n=Wn(e,t);if(n!==null){var r=At();wn(n,e,t,r)}iu(e,t)}};Mf=function(){return Qe};Of=function(e,t){var n=Qe;try{return Qe=e,t()}finally{Qe=n}};Po=function(e,t,n){switch(t){case"input":if(bo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Ni(r);if(!s)throw Error(J(90));ff(r),bo(r,s)}}}break;case"textarea":pf(e,n);break;case"select":t=n.value,t!=null&&Jr(e,!!n.multiple,t,!1)}};kf=tu;wf=Ir;var rm={usingClientEntryPoint:!1,Events:[la,Br,Ni,vf,yf,tu]},ks={findFiberByHostInstance:wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},sm={bundleType:ks.bundleType,version:ks.version,rendererPackageName:ks.rendererPackageName,rendererConfig:ks.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Qn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=jf(e),e===null?null:e.stateNode},findFiberByHostInstance:ks.findFiberByHostInstance||tm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var za=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!za.isDisabled&&za.supportsFiber)try{wi=za.inject(sm),_n=za}catch{}}tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rm;tn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!lu(t))throw Error(J(200));return em(e,t,null,n)};tn.createRoot=function(e,t){if(!lu(e))throw Error(J(299));var n=!1,r="",s=np;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=au(e,1,!1,null,null,n,!1,r,s),e[Kn]=t.current,Ws(e.nodeType===8?e.parentNode:e),new ou(t)};tn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=jf(t),e=e===null?null:e.stateNode,e};tn.flushSync=function(e){return Ir(e)};tn.hydrate=function(e,t,n){if(!Oi(t))throw Error(J(200));return Ti(null,e,t,!0,n)};tn.hydrateRoot=function(e,t,n){if(!lu(e))throw Error(J(405));var r=n!=null&&n.hydratedSources||null,s=!1,a="",i=np;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=tp(t,null,e,1,n!=null?n:null,s,!1,a,i),e[Kn]=t.current,Ws(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Mi(t)};tn.render=function(e,t,n){if(!Oi(t))throw Error(J(200));return Ti(null,e,t,!1,n)};tn.unmountComponentAtNode=function(e){if(!Oi(e))throw Error(J(40));return e._reactRootContainer?(Ir(function(){Ti(null,null,e,!1,function(){e._reactRootContainer=null,e[Kn]=null})}),!0):!1};tn.unstable_batchedUpdates=tu;tn.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Oi(n))throw Error(J(200));if(e==null||e._reactInternals===void 0)throw Error(J(38));return Ti(e,t,n,!1,r)};tn.version="18.3.1-next-f1338f8080-20240426";function rp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rp)}catch(e){console.error(e)}}rp(),nf.exports=tn;var am=nf.exports,kc=am;go.createRoot=kc.createRoot,go.hydrateRoot=kc.hydrateRoot;function im(){if(console&&console.warn){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Cr(t[0])&&(t[0]=`react-i18next:: ${t[0]}`),console.warn(...t)}}const wc={};function ll(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Cr(t[0])&&wc[t[0]]||(Cr(t[0])&&(wc[t[0]]=new Date),im(...t))}const sp=(e,t)=>()=>{if(e.isInitialized)t();else{const n=()=>{setTimeout(()=>{e.off("initialized",n)},0),t()};e.on("initialized",n)}},bc=(e,t,n)=>{e.loadNamespaces(t,sp(e,n))},Sc=(e,t,n,r)=>{Cr(n)&&(n=[n]),n.forEach(s=>{e.options.ns.indexOf(s)<0&&e.options.ns.push(s)}),e.loadLanguages(t,sp(e,r))},om=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const r=t.languages[0],s=t.options?t.options.fallbackLng:!1,a=t.languages[t.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const i=(u,c)=>{const d=t.services.backendConnector.state[`${u}|${c}`];return d===-1||d===2};return n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!i(t.isLanguageChangingTo,e)?!1:!!(t.hasResourceBundle(r,e)||!t.services.backendConnector.backend||t.options.resources&&!t.options.partialBundledLanguages||i(r,e)&&(!s||i(a,e)))},lm=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return!t.languages||!t.languages.length?(ll("i18n.languages were undefined or empty",t.languages),!0):t.options.ignoreJSONStructure!==void 0?t.hasLoadedNamespace(e,{lng:n.lng,precheck:(s,a)=>{if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!a(s.isLanguageChangingTo,e))return!1}}):om(e,t,n)},Cr=e=>typeof e=="string",um=e=>typeof e=="object"&&e!==null,cm=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,fm={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},dm=e=>fm[e],pm=e=>e.replace(cm,dm);let ul={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:pm};const hm=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ul={...ul,...e}},gm=()=>ul;let ap;const mm=e=>{ap=e},xm=()=>ap,vm={type:"3rdParty",init(e){hm(e.options.react),mm(e)}},ym=S.createContext();class km{constructor(){fu(this,"getUsedNamespaces",()=>Object.keys(this.usedNamespaces));this.usedNamespaces={}}addUsedNamespaces(t){t.forEach(n=>{this.usedNamespaces[n]||(this.usedNamespaces[n]=!0)})}}const wm=(e,t)=>{const n=S.useRef();return S.useEffect(()=>{n.current=e},[e,t]),n.current},ip=(e,t,n,r)=>e.getFixedT(t,n,r),bm=(e,t,n,r)=>S.useCallback(ip(e,t,n,r),[e,t,n,r]),ut=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{i18n:n}=t,{i18n:r,defaultNS:s}=S.useContext(ym)||{},a=n||r||xm();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new km),!a){ll("You will need to pass in an i18next instance by using initReactI18next");const N=(D,F)=>Cr(F)?F:um(F)&&Cr(F.defaultValue)?F.defaultValue:Array.isArray(D)?D[D.length-1]:D,I=[N,{},!1];return I.t=N,I.i18n={},I.ready=!1,I}a.options.react&&a.options.react.wait!==void 0&&ll("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const i={...gm(),...a.options.react,...t},{useSuspense:u,keyPrefix:c}=i;let d=s||a.options&&a.options.defaultNS;d=Cr(d)?[d]:d||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(d);const m=(a.isInitialized||a.initializedStoreOnce)&&d.every(N=>lm(N,a,i)),k=bm(a,t.lng||null,i.nsMode==="fallback"?d:d[0],c),x=()=>k,E=()=>ip(a,t.lng||null,i.nsMode==="fallback"?d:d[0],c),[P,z]=S.useState(x);let G=d.join();t.lng&&(G=`${t.lng}${G}`);const b=wm(G),v=S.useRef(!0);S.useEffect(()=>{const{bindI18n:N,bindI18nStore:I}=i;v.current=!0,!m&&!u&&(t.lng?Sc(a,t.lng,d,()=>{v.current&&z(E)}):bc(a,d,()=>{v.current&&z(E)})),m&&b&&b!==G&&v.current&&z(E);const D=()=>{v.current&&z(E)};return N&&a&&a.on(N,D),I&&a&&a.store.on(I,D),()=>{v.current=!1,N&&a&&N.split(" ").forEach(F=>a.off(F,D)),I&&a&&I.split(" ").forEach(F=>a.store.off(F,D))}},[a,G]),S.useEffect(()=>{v.current&&m&&z(x)},[a,c,m]);const w=[P,a,m];if(w.t=P,w.i18n=a,w.ready=m,m||!m&&!u)return w;throw new Promise(N=>{t.lng?Sc(a,t.lng,d,()=>N()):bc(a,d,()=>N())})};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Sm={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jm=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=(e,t)=>{const n=S.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:u="",children:c,...d},m)=>S.createElement("svg",{ref:m,...Sm,width:s,height:s,stroke:r,strokeWidth:i?Number(a)*24/Number(s):a,className:["lucide",`lucide-${jm(e)}`,u].join(" "),...d},[...t.map(([k,x])=>S.createElement(k,x)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nm=pe("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cm=pe("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Em=pe("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cl=pe("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zm=pe("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pm=pe("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=pe("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lm=pe("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Im=pe("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _m=pe("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mm=pe("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Om=pe("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const op=pe("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tm=pe("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rm=pe("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dm=pe("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Am=pe("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Um=pe("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lp=pe("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $m=pe("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fm=pe("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bm=pe("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hm=pe("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const di=pe("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=pe("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vm=pe("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const up=pe("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Km=pe("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wm=pe("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ym=pe("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qm=pe("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jm=pe("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cp=pe("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=pe("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xm=pe("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zm=pe("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fl=pe("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gm=pe("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qm=pe("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=pe("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dl=pe("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=pe("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=pe("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dp=pe("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uu=pe("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=pe("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=pe("StretchHorizontal",[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2",key:"qdearl"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2",key:"1xrn6j"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=pe("Strikethrough",[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=pe("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=pe("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cu=pe("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=pe("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=pe("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=pe("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=pe("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=pe("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=pe("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=pe("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=pe("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=pe("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);function h0({onConnect:e,isConnecting:t}){const{t:n}=ut(),[r,s]=S.useState("localhost:9998"),[a,i]=S.useState(""),u=c=>{c.preventDefault(),r&&a.trim()&&e(r,a.trim())};return l.jsxs("div",{className:"connect-overlay",children:[l.jsx("div",{className:"connect-bg-glow"}),l.jsxs("form",{className:"connect-dialog",onSubmit:u,children:[l.jsxs("div",{className:"connect-logo",children:[l.jsx("img",{src:"/logo.svg",alt:"Hotline Modern",className:"connect-logo-img"}),l.jsx("h1",{children:n("app.name")}),l.jsx("p",{className:"connect-subtitle",children:n("connect.title")})]}),l.jsxs("div",{className:"connect-field",children:[l.jsx("label",{children:n("connect.serverAddress")}),l.jsx("input",{type:"text",value:r,onChange:c=>s(c.target.value),placeholder:n("connect.serverPlaceholder"),disabled:t})]}),l.jsxs("div",{className:"connect-field",children:[l.jsx("label",{children:n("connect.nickname")}),l.jsx("input",{type:"text",value:a,onChange:c=>i(c.target.value),placeholder:n("connect.nicknamePlaceholder"),disabled:t,maxLength:32,autoFocus:!0})]}),l.jsx("button",{type:"submit",className:"connect-btn",disabled:t||!a.trim(),children:t?l.jsxs(l.Fragment,{children:[l.jsx(di,{size:16,className:"connect-spinner"}),n("connect.connecting")]}):l.jsxs(l.Fragment,{children:[n("connect.button"),l.jsx("kbd",{className:"connect-kbd",children:"↵"})]})})]}),l.jsx("style",{children:`
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
      `})]})}const jc=[{value:"available",label:"status.available",color:"#22c55e"},{value:"away",label:"status.away",color:"#eab308"},{value:"busy",label:"status.busy",color:"#ef4444"}];function g0({currentStatus:e,onStatusChange:t}){var s;const{t:n}=ut(),r=((s=jc.find(a=>a.value===e))==null?void 0:s.color)||"#22c55e";return l.jsxs("div",{className:"status-selector",children:[l.jsx("span",{className:"status-dot-sel",style:{backgroundColor:r}}),l.jsx("select",{value:e,onChange:a=>t(a.target.value),className:"status-select",children:jc.map(a=>l.jsx("option",{value:a.value,children:n(a.label)},a.value))}),l.jsx("style",{children:`
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
      `})]})}function pp({status:e}){const t=e==="away"?"#eab308":e==="busy"?"#ef4444":"#22c55e";return l.jsx("span",{className:"user-status-dot",style:{backgroundColor:t},title:e,children:l.jsx("style",{children:`
        .user-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--bg-secondary);
          transition: background-color var(--transition-normal);
        }
      `})})}function m0({serverName:e,channels:t,activeChannel:n,activeDM:r,dmConversations:s,onSelectChannel:a,onSelectDM:i,onCreateChannel:u,onDeleteChannel:c,onDisconnect:d,canCreateChannel:m,unreadCounts:k,nickname:x,role:E,userStatus:P,mutedChannels:z,onToggleMute:G,onAdminPanel:b}){const{t:v}=ut();return l.jsxs("aside",{className:"sidebar",children:[l.jsxs("div",{className:"sidebar-header",children:[l.jsx("h2",{children:e}),l.jsxs("div",{className:"sidebar-header-actions",children:[b&&E==="admin"&&l.jsx("button",{className:"sidebar-admin",onClick:b,title:v("admin.title"),children:l.jsx(fp,{size:15})}),l.jsx("button",{className:"sidebar-disconnect",onClick:d,title:v("sidebar.disconnect"),children:l.jsx(up,{size:16})})]})]}),l.jsxs("div",{className:"sidebar-section",children:[l.jsxs("div",{className:"sidebar-section-header",children:[l.jsx("span",{children:v("sidebar.channels")}),m&&l.jsx("button",{className:"sidebar-add",onClick:u,title:v("sidebar.createChannel"),children:l.jsx(Xm,{size:14})})]}),l.jsx("ul",{className:"channel-list",children:t.map(w=>l.jsxs("li",{className:`channel-item ${w.name===n&&!r?"active":""}`,onClick:()=>a(w.name),children:[w.hasPassword?l.jsx(pi,{size:14,className:"channel-icon"}):l.jsx(lp,{size:14,className:"channel-icon"}),l.jsx("span",{className:"channel-name",children:w.name}),(k[w.name]||0)>0&&l.jsx("span",{className:"channel-unread",children:k[w.name]}),(z==null?void 0:z.includes(w.name))&&l.jsx(cl,{size:11,className:"channel-muted-icon"}),l.jsx("span",{className:"channel-count",children:w.userCount}),G&&l.jsx("button",{className:"channel-mute-btn",onClick:N=>{N.stopPropagation(),G(w.name)},title:z!=null&&z.includes(w.name)?v("sidebar.unmute"):v("sidebar.mute"),children:l.jsx(cl,{size:11})}),m&&w.name!=="lobby"&&l.jsx("button",{className:"channel-delete",onClick:N=>{N.stopPropagation(),c(w.name)},title:v("sidebar.deleteChannel"),children:l.jsx(ca,{size:12})})]},w.name))}),s.length>0&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"sidebar-section-header dm-header",children:l.jsx("span",{children:v("sidebar.directMessages")})}),l.jsx("ul",{className:"channel-list",children:s.map(w=>l.jsxs("li",{className:`channel-item ${r===w.peerId?"active":""}`,onClick:()=>i(w.peerId),children:[l.jsx(Wm,{size:14,className:"channel-icon"}),l.jsx("span",{className:"channel-name",children:w.peerNick}),w.unread>0&&l.jsx("span",{className:"channel-unread",children:w.unread})]},w.peerId))})]})]}),x&&l.jsxs("div",{className:"sidebar-footer",children:[l.jsx(pp,{status:P||"available"}),l.jsx("span",{className:"sidebar-nick",children:x}),l.jsx("span",{className:"sidebar-role","data-role":E,children:E})]}),l.jsx("style",{children:`
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
      `})]})}function x0({position:e,messageId:t,content:n,isOwn:r,canModerate:s,isBookmarked:a,onClose:i,onReply:u,onReact:c,onEdit:d,onDelete:m,onPin:k,onBookmark:x,onCopyText:E,onQuote:P}){const{t:z}=ut(),G=S.useRef(null);S.useEffect(()=>{const N=D=>{G.current&&!G.current.contains(D.target)&&i()},I=D=>{D.key==="Escape"&&i()};return document.addEventListener("mousedown",N),document.addEventListener("keydown",I),()=>{document.removeEventListener("mousedown",N),document.removeEventListener("keydown",I)}},[i]);const b={position:"fixed",left:e.x,top:e.y,zIndex:300},v=()=>{navigator.clipboard.writeText(n),i()},w=()=>{P==null||P(),i()};return l.jsxs("div",{className:"ctx-menu",ref:G,style:b,children:[l.jsxs("button",{className:"ctx-item",onClick:()=>{u==null||u(t),i()},children:[l.jsx(fl,{size:14}),l.jsx("span",{children:z("ctx.reply")})]}),l.jsxs("button",{className:"ctx-item",onClick:()=>{c==null||c(),i()},children:[l.jsx(uu,{size:14}),l.jsx("span",{children:z("ctx.react")})]}),l.jsxs("button",{className:"ctx-item",onClick:v,children:[l.jsx(Om,{size:14}),l.jsx("span",{children:z("ctx.copy")})]}),l.jsxs("button",{className:"ctx-item",onClick:w,children:[l.jsx(Zm,{size:14}),l.jsx("span",{children:z("ctx.quote")})]}),x&&l.jsxs("button",{className:`ctx-item ${a?"active":""}`,onClick:()=>{x(t),i()},children:[l.jsx(ta,{size:14}),l.jsx("span",{children:z(a?"bookmarks.remove":"ctx.bookmark")})]}),r&&d&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"ctx-sep"}),l.jsxs("button",{className:"ctx-item",onClick:()=>{d(t),i()},children:[l.jsx(cp,{size:14}),l.jsx("span",{children:z("ctx.edit")})]})]}),s&&k&&l.jsxs("button",{className:"ctx-item",onClick:()=>{k(t),i()},children:[l.jsx(na,{size:14}),l.jsx("span",{children:z("ctx.pin")})]}),(r||s)&&m&&l.jsxs("button",{className:"ctx-item danger",onClick:()=>{m(t),i()},children:[l.jsx(ca,{size:14}),l.jsx("span",{children:z("ctx.delete")})]}),l.jsx("style",{children:`
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
      `})]})}const v0=/\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi,y0=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;function k0(e){const t=[];let n=0;const r=/(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(@\w+)|(\b(https?:\/\/[^\s]+))/g;let s=0,a;for(;(a=r.exec(e))!==null;)a.index>s&&t.push(e.slice(s,a.index)),a[1]?t.push(l.jsx("a",{className:"msg-link",href:a[3],target:"_blank",rel:"noopener noreferrer",children:a[2]},n++)):a[4]?t.push(l.jsx("code",{className:"msg-code",children:a[4].slice(1,-1)},n++)):a[5]?t.push(l.jsx("strong",{children:a[5].slice(2,-2)},n++)):a[6]?t.push(l.jsx("em",{children:a[6].slice(1,-1)},n++)):a[7]?t.push(l.jsx("span",{className:"msg-mention",children:a[7]},n++)):a[9]&&t.push(l.jsx("a",{className:"msg-link",href:a[9],target:"_blank",rel:"noopener noreferrer",children:a[9]},n++)),s=a.index+a[0].length;return s<e.length&&t.push(e.slice(s)),t}function w0(e){const n=e.replace(y0,"").match(v0);return n?[...new Set(n)]:[]}const b0=["👍","❤️","😂","👏","🔥","🤔"];function S0({id:e,nickname:t,content:n,role:r,timestamp:s,isOwn:a,edited:i,reactions:u,currentUserId:c,canModerate:d,onReact:m,onRemoveReact:k,onEdit:x,onDelete:E,onPin:P,onReply:z,onBookmark:G,isBookmarked:b,replyContext:v,isGrouped:w,onImageClick:N}){const{t:I,i18n:D}=ut(),[F,q]=S.useState(!1),[Pe,he]=S.useState(!1),[De,Ge]=S.useState(n),[xt,rt]=S.useState(!1),[Ae,Te]=S.useState(null),Je=new Date(s),H=new Intl.DateTimeFormat(D.language,{hour:"2-digit",minute:"2-digit"}).format(Je),le=new Intl.DateTimeFormat(D.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(Je),de=`var(--role-${r})`,Ie=S.useMemo(()=>k0(n),[n]),Ue=S.useMemo(()=>w0(n),[n]),Xe=()=>{De.trim()&&De!==n&&(x==null||x(e,De.trim())),he(!1)},Ke=ge=>{const at=u==null?void 0:u.find(Yt=>Yt.emoji===ge);at!=null&&at.users.includes(c)?k==null||k(e,ge):m==null||m(e,ge),rt(!1)},ke=ge=>{ge.preventDefault(),Te({x:ge.clientX,y:ge.clientY})};return l.jsxs("div",{className:`message ${a?"own":""} ${w?"grouped":""}`,onMouseEnter:()=>q(!0),onMouseLeave:()=>{q(!1),rt(!1)},onContextMenu:ke,children:[v&&l.jsxs("div",{className:"message-reply-context",children:[l.jsx(fl,{size:10,className:"reply-icon"}),l.jsx("span",{className:"reply-context-nick",children:v.nickname}),l.jsx("span",{className:"reply-context-text",children:v.content.slice(0,60)})]}),!w&&l.jsxs("div",{className:"message-header",children:[l.jsx("span",{className:"message-nick",style:{color:de},children:t}),l.jsx("span",{className:"message-time",title:le,children:H}),i&&l.jsx("span",{className:"message-edited",children:I("chat.edited")})]}),w&&F&&l.jsx("span",{className:"message-time-inline",title:le,children:H}),Pe?l.jsxs("div",{className:"message-edit-area",children:[l.jsx("input",{className:"message-edit-input",value:De,onChange:ge=>Ge(ge.target.value),onKeyDown:ge=>{ge.key==="Enter"&&Xe(),ge.key==="Escape"&&he(!1)},autoFocus:!0}),l.jsx("button",{className:"message-edit-save",onClick:Xe,children:"OK"}),l.jsx("button",{className:"message-edit-cancel",onClick:()=>he(!1),children:"ESC"})]}):l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"message-content",children:Ie}),Ue.length>0&&l.jsx("div",{className:"message-images",children:Ue.map((ge,at)=>l.jsx("img",{src:ge,alt:"",className:"message-img-preview",loading:"lazy",onClick:()=>N?N(ge):window.open(ge,"_blank")},at))})]}),u&&u.length>0&&l.jsx("div",{className:"message-reactions",children:u.map(ge=>l.jsxs("button",{className:`reaction-chip ${ge.users.includes(c)?"own":""}`,onClick:()=>Ke(ge.emoji),title:ge.users.length.toString(),children:[l.jsx("span",{children:ge.emoji}),l.jsx("span",{className:"reaction-count",children:ge.users.length})]},ge.emoji))}),F&&!Pe&&l.jsxs("div",{className:"message-actions",children:[l.jsx("button",{onClick:()=>z==null?void 0:z(e),title:"Reply",children:l.jsx(fl,{size:13})}),l.jsx("button",{onClick:()=>rt(ge=>!ge),title:"React",children:l.jsx(uu,{size:13})}),G&&l.jsx("button",{className:b?"action-bookmarked":"",onClick:()=>G(e),title:"Bookmark",children:l.jsx(ta,{size:13})}),a&&l.jsx("button",{onClick:()=>{he(!0),Ge(n)},title:"Edit",children:l.jsx(cp,{size:13})}),(a||d)&&l.jsx("button",{className:"action-danger",onClick:()=>E==null?void 0:E(e),title:"Delete",children:l.jsx(ca,{size:13})}),d&&l.jsx("button",{onClick:()=>P==null?void 0:P(e),title:"Pin",children:l.jsx(na,{size:13})})]}),xt&&l.jsx("div",{className:"message-react-picker",children:b0.map(ge=>l.jsx("button",{onClick:()=>Ke(ge),children:ge},ge))}),Ae&&l.jsx(x0,{position:Ae,messageId:e,content:n,isOwn:a,canModerate:d||!1,isBookmarked:b,onClose:()=>Te(null),onReply:z,onReact:()=>{rt(!0),Te(null)},onEdit:a?()=>{he(!0),Ge(n),Te(null)}:void 0,onDelete:E,onPin:P,onBookmark:G,onCopyText:()=>{navigator.clipboard.writeText(n),Te(null)},onQuote:()=>{}}),l.jsx("style",{children:`
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
        .message-content {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.45;
          word-break: break-word;
          white-space: pre-wrap;
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
      `})]})}const Nc=[{key:"smileys",emojis:["😀","😂","🤣","😍","🥰","😘","😎","🤔","🥳","😢","😡","😏","🤗","😴","🥺","😈"]},{key:"gestures",emojis:["👍","👎","👋","🙌","👏","🤝","🙏","💪","🫡","🤙","✌️","🤞","👀","🫶","✋","👊"]},{key:"symbols",emojis:["🔥","❤️","💯","⭐","🎉","🎊","🚀","⚡","✅","❌","💬","💡","🏆","💎","🌟","🎯"]},{key:"objects",emojis:["💻","📱","🎮","🎧","📸","🎬","🔒","🔑","📂","📌","🔔","⏰","🧪","🛠️","📊","🗂️"]}];function j0({onSelect:e,onClose:t}){var u;const{t:n}=ut(),r=S.useRef(null),[s,a]=S.useState("");S.useEffect(()=>{const c=d=>{r.current&&!r.current.contains(d.target)&&t()};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[t]);const i=s?[{key:"results",emojis:Nc.flatMap(c=>c.emojis).filter(c=>c.includes(s))}]:Nc;return l.jsxs("div",{ref:r,className:"emoji-picker",children:[l.jsx("input",{className:"emoji-search",type:"text",placeholder:n("chat.searchEmoji")||"Search...",value:s,onChange:c=>a(c.target.value),autoFocus:!0}),l.jsxs("div",{className:"emoji-grid-area",children:[i.map(c=>l.jsxs("div",{className:"emoji-category",children:[!s&&l.jsx("div",{className:"emoji-cat-label",children:n(`emoji.${c.key}`)||c.key}),l.jsx("div",{className:"emoji-grid",children:c.emojis.map(d=>l.jsx("button",{className:"emoji-item",onClick:()=>e(d),children:d},d))})]},c.key)),s&&((u=i[0])==null?void 0:u.emojis.length)===0&&l.jsx("div",{className:"emoji-empty",children:"No emoji found"})]}),l.jsx("style",{children:`
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
      `})]})}function N0({users:e,filter:t,onSelect:n,selectedIndex:r}){const s=S.useRef(null),a=e.filter(i=>i.nickname.toLowerCase().startsWith(t.toLowerCase())).slice(0,6);return S.useEffect(()=>{var u;const i=(u=s.current)==null?void 0:u.children[r];i==null||i.scrollIntoView({block:"nearest"})},[r]),a.length===0?null:l.jsxs("div",{className:"mention-suggestions",children:[l.jsx("ul",{ref:s,children:a.map((i,u)=>l.jsxs("li",{className:`mention-item ${u===r?"active":""}`,onMouseDown:c=>{c.preventDefault(),n(i.nickname)},children:[l.jsxs("span",{className:"mention-nick",style:{color:`var(--role-${i.role})`},children:["@",i.nickname]}),l.jsx("span",{className:"mention-role",children:i.role})]},i.userId))}),l.jsx("style",{children:`
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
      `})]})}function C0({onFormat:e}){return l.jsxs("div",{className:"format-toolbar",children:[l.jsxs("div",{className:"format-group",children:[l.jsx("button",{className:"format-btn",onClick:()=>e("**"),title:"Bold (Ctrl+B)",children:l.jsx(Pm,{size:14})}),l.jsx("button",{className:"format-btn",onClick:()=>e("*"),title:"Italic (Ctrl+I)",children:l.jsx(Fm,{size:14})}),l.jsx("button",{className:"format-btn",onClick:()=>e("~~"),title:"Strikethrough",children:l.jsx(s0,{size:14})})]}),l.jsx("div",{className:"format-sep"}),l.jsxs("div",{className:"format-group",children:[l.jsx("button",{className:"format-btn",onClick:()=>e("`"),title:"Code",children:l.jsx(Mm,{size:14})}),l.jsx("button",{className:"format-btn",onClick:()=>e("[","[","](url)"),title:"Link",children:l.jsx(Hm,{size:14})})]}),l.jsx("style",{children:`
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
      `})]})}function E0(e,t){const n=new Date(e),r=new Date,s=new Date(r.getFullYear(),r.getMonth(),r.getDate()),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()),i=(s.getTime()-a.getTime())/864e5;return i===0?t("chat.today"):i===1?t("chat.yesterday"):n.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}function z0({messages:e,activeChannel:t,channelTopic:n,currentUserId:r,currentRole:s,typingUsers:a,dmMode:i,onSendMessage:u,onSlashCommand:c,onTyping:d,onSearchOpen:m,onReact:k,onRemoveReact:x,onEdit:E,onDelete:P,onPin:z,onReply:G,replyTo:b,onCancelReply:v,onLoadHistory:w,historyLoading:N,hasMoreHistory:I,onFileUpload:D,canUpload:F,users:q,onPinsOpen:Pe,onBookmarksOpen:he,onBookmark:De,isBookmarked:Ge,onChannelSettings:xt,onImageClick:rt}){const{t:Ae}=ut(),[Te,Je]=S.useState(""),[H,le]=S.useState(!1),[de,Ie]=S.useState(null),[Ue,Xe]=S.useState(0),[Ke,ke]=S.useState(!1),[ge,at]=S.useState(0),Yt=S.useRef(null),Qt=S.useRef(null),Ft=S.useRef(0),R=S.useRef(null),fn=S.useRef(0),dn=S.useRef(!1),pn=S.useRef(0),ct=e.filter(re=>re.channel===t),vr=S.useCallback(()=>{const re=Qt.current;if(!re)return;const me=re.scrollHeight-re.scrollTop-re.clientHeight;ke(me>80),me<=80&&at(0),!(N||!I||!w||dn.current)&&re.scrollTop<100&&ct.length>0&&(dn.current=!0,fn.current=re.scrollHeight,w(t,ct[0].timestamp))},[t,ct,N,I,w]);S.useEffect(()=>{if(dn.current&&!N){dn.current=!1;const re=Qt.current;if(re){const me=re.scrollHeight;re.scrollTop=me-fn.current}}},[N,ct.length]);const Jn=S.useCallback(()=>{var re;(re=R.current)==null||re.click()},[]),Sn=S.useCallback(re=>{var W;const me=(W=re.target.files)==null?void 0:W[0];me&&D&&D(me),re.target.value=""},[D]),Jt=S.useMemo(()=>{const re=[];let me="";for(const W of ct){const T=new Date(W.timestamp).toDateString();T!==me&&(me=T,re.push({type:"separator",date:E0(W.timestamp,Ae),key:`sep-${T}`})),re.push(W)}return re},[ct,Ae]);S.useEffect(()=>{var re;ct.length>pn.current&&(Ke?at(me=>me+(ct.length-pn.current)):(re=Yt.current)==null||re.scrollIntoView({behavior:"smooth"})),pn.current=ct.length},[ct.length,Ke]);const hn=()=>{const re=Te.trim();if(re){if(re.startsWith("/")&&c){const me=re.slice(1).split(/\s+/);c(me[0],me.slice(1))}else u(t,re);Je("")}},On=re=>{Je(re);const me=re.length,T=re.slice(0,me).match(/@(\w*)$/);T&&q&&q.length>0?(Ie(T[1]),Xe(0)):Ie(null)},jn=re=>{const me=/@(\w*)$/;Je(W=>W.replace(me,`@${re} `)),Ie(null)},Tn=S.useCallback((re,me,W)=>{Je(me&&W?T=>T+me+"text"+W:T=>T+re+"text"+re)},[]),Nn=re=>{if(de!==null){if(re.key==="ArrowDown"){re.preventDefault(),Xe(me=>me+1);return}if(re.key==="ArrowUp"){re.preventDefault(),Xe(me=>Math.max(0,me-1));return}if(re.key==="Tab"||re.key==="Enter"){re.preventDefault();const me=(q||[]).filter(T=>T.nickname.toLowerCase().startsWith((de||"").toLowerCase())).slice(0,6),W=Ue%Math.max(me.length,1);me[W]&&jn(me[W].nickname);return}if(re.key==="Escape"){Ie(null);return}}if(re.key==="Enter"&&!re.shiftKey){re.preventDefault(),hn();return}d&&Date.now()-Ft.current>2e3&&(Ft.current=Date.now(),d())},Cn=S.useCallback(re=>{Je(me=>me+re),le(!1)},[]),Xt=a.filter(re=>i?re.targetId===r&&re.userId===i.peerId:re.channel===t&&re.userId!==r),En=Xt.length>0?Xt.length===1?Ae("chat.typing",{name:Xt[0].nickname}):Ae("chat.typingMultiple",{count:Xt.length}):null;return l.jsxs("div",{className:"chat-panel",children:[l.jsxs("div",{className:"chat-header",children:[l.jsx("span",{className:"chat-channel-name",onClick:i?void 0:xt,style:i?void 0:{cursor:"pointer"},children:i?`@ ${i.peerNick}`:`# ${t}`}),!i&&n&&l.jsx("span",{className:"chat-topic",onClick:xt,style:{cursor:"pointer"},children:n}),l.jsxs("div",{className:"chat-header-actions",children:[Pe&&l.jsx("button",{className:"chat-header-btn",onClick:Pe,title:Ae("pins.title"),children:l.jsx(na,{size:15})}),he&&l.jsx("button",{className:"chat-header-btn",onClick:he,title:Ae("bookmarks.title"),children:l.jsx(ta,{size:15})}),m&&l.jsx("button",{className:"chat-header-btn",onClick:m,title:Ae("search.title"),children:l.jsx(dl,{size:15})})]})]}),l.jsxs("div",{className:"chat-messages",ref:Qt,onScroll:vr,children:[N&&l.jsxs("div",{className:"chat-history-loading",children:[l.jsx(di,{size:14,className:"spinner"}),l.jsx("span",{children:Ae("chat.loadingHistory")})]}),!N&&I===!1&&ct.length>0&&l.jsx("div",{className:"chat-history-end",children:Ae("chat.historyStart")}),ct.length===0&&l.jsxs("div",{className:"chat-empty",children:[l.jsx("div",{className:"chat-empty-icon",children:"💬"}),l.jsx("span",{children:Ae("chat.noMessages")})]}),Jt.map(re=>{if("type"in re&&re.type==="separator")return l.jsx("div",{className:"chat-date-separator",children:l.jsx("span",{children:re.date})},re.key);const me=re,W=s==="admin"||s==="operator",T=me.replyTo?ct.find(Z=>Z.id===me.replyTo):void 0,ee=ct.indexOf(me),ve=ee>0?ct[ee-1]:void 0,qe=ve!==void 0&&ve.userId===me.userId&&me.timestamp-ve.timestamp<12e4&&!me.replyTo;return l.jsx(S0,{id:me.id,nickname:me.nickname,content:me.content,role:me.role,timestamp:me.timestamp,isOwn:me.userId===r,edited:me.edited,reactions:me.reactions,currentUserId:r,canModerate:W,onReact:k,onRemoveReact:x,onEdit:E,onDelete:P,onPin:z,onReply:G,onBookmark:De,isBookmarked:Ge==null?void 0:Ge(me.id),replyContext:T?{nickname:T.nickname,content:T.content}:void 0,isGrouped:qe,onImageClick:rt},me.id)}),l.jsx("div",{ref:Yt})]}),Ke&&l.jsxs("button",{className:"scroll-to-bottom",onClick:()=>{var re;(re=Yt.current)==null||re.scrollIntoView({behavior:"smooth"}),ke(!1),at(0)},children:[l.jsx(Nm,{size:14}),ge>0&&l.jsx("span",{className:"scroll-badge",children:ge})]}),En&&l.jsxs("div",{className:"chat-typing",children:[l.jsxs("span",{className:"typing-dots",children:[l.jsx("span",{}),l.jsx("span",{}),l.jsx("span",{})]}),En]}),b&&l.jsxs("div",{className:"chat-reply-preview",children:[l.jsxs("span",{className:"reply-label",children:[Ae("chat.replyingTo")," ",l.jsx("strong",{children:b.nickname})]}),l.jsx("span",{className:"reply-content",children:b.content.slice(0,80)}),l.jsx("button",{className:"reply-cancel",onClick:v,title:"Cancel",children:l.jsx("span",{children:"×"})})]}),l.jsx(C0,{onFormat:Tn}),l.jsxs("div",{className:"chat-input-area",children:[F&&D&&l.jsxs(l.Fragment,{children:[l.jsx("button",{className:"chat-upload-btn",onClick:Jn,title:Ae("files.upload"),children:l.jsx(cu,{size:18})}),l.jsx("input",{ref:R,type:"file",style:{display:"none"},onChange:Sn})]}),l.jsxs("div",{className:"chat-input-wrapper",children:[de!==null&&q&&l.jsx(N0,{users:q,filter:de,onSelect:jn,selectedIndex:Ue}),l.jsx("textarea",{className:"chat-input",value:Te,onChange:re=>On(re.target.value),onKeyDown:Nn,placeholder:i?Ae("chat.dmPlaceholder",{name:i.peerNick}):Ae("chat.placeholder"),rows:1}),l.jsx("button",{className:"emoji-btn",onClick:()=>le(re=>!re),title:"Emoji",children:l.jsx(uu,{size:18})}),H&&l.jsx(j0,{onSelect:Cn,onClose:()=>le(!1)})]}),l.jsx("button",{className:"chat-send-btn",onClick:hn,disabled:!Te.trim(),children:l.jsx(t0,{size:18})})]}),l.jsx("style",{children:`
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
      `})]})}function P0({role:e}){switch(e){case"admin":return l.jsx(n0,{size:11,style:{color:"var(--role-admin)"}});case"operator":return l.jsx(dp,{size:11,style:{color:"var(--role-operator)"}});case"guest":return l.jsx(Tm,{size:11,style:{color:"var(--role-guest)"}});default:return l.jsx(o0,{size:11,style:{color:"var(--role-member)"}})}}function L0({users:e,currentUserId:t,currentRole:n,onKick:r,onBan:s,onOp:a,onDeop:i,onDM:u}){const{t:c}=ut(),[d,m]=S.useState(null),[k,x]=S.useState({x:0,y:0}),E=S.useRef(null),P=n==="admin"||n==="operator";S.useEffect(()=>{const v=w=>{E.current&&!E.current.contains(w.target)&&m(null)};return document.addEventListener("mousedown",v),()=>document.removeEventListener("mousedown",v)},[]);const z=(v,w)=>{if(v===t)return;const N=w.target.getBoundingClientRect();x({x:N.left,y:N.bottom+4}),m(v===d?null:v)},G=[...e].sort((v,w)=>{var F,q;const N={admin:0,operator:1,member:2,guest:3},I=(F=N[v.role])!=null?F:4,D=(q=N[w.role])!=null?q:4;return I!==D?I-D:v.nickname.localeCompare(w.nickname)}),b=e.find(v=>v.userId===d);return l.jsxs("aside",{className:"user-list",children:[l.jsxs("div",{className:"user-list-header",children:[l.jsx("span",{children:c("users.title")}),l.jsx("span",{className:"user-count",children:e.length})]}),l.jsx("ul",{className:"user-entries",children:G.map(v=>l.jsxs("li",{className:`user-entry ${v.userId!==t?"clickable":""} ${v.userId===t?"self":""}`,onClick:w=>z(v.userId,w),children:[l.jsx(pp,{status:v.status}),l.jsx(P0,{role:v.role}),l.jsx("span",{className:"user-nick",style:{color:`var(--role-${v.role})`},children:v.nickname})]},`${v.userId}-${v.nickname}`))}),d&&b&&l.jsxs("div",{ref:E,className:"user-menu",style:{position:"fixed",left:k.x,top:k.y},children:[l.jsxs("div",{className:"user-menu-header",children:[l.jsx("span",{className:"user-menu-nick",children:b.nickname}),l.jsx("span",{className:"user-menu-role",style:{color:`var(--role-${b.role})`},children:c(`roles.${b.role}`)})]}),l.jsxs("div",{className:"user-menu-pubkey",title:b.userId,children:[b.userId.slice(0,16),"..."]}),l.jsxs("div",{className:"user-menu-actions",children:[l.jsx("button",{onClick:()=>{u==null||u(d),m(null)},children:c("users.sendDM")}),P&&b.role!=="operator"&&l.jsx("button",{onClick:()=>{a==null||a(d),m(null)},children:c("roles.operator")}),P&&b.role==="operator"&&l.jsx("button",{onClick:()=>{i==null||i(d),m(null)},children:c("roles.member")}),P&&l.jsx("button",{onClick:()=>{r==null||r(d),m(null)},children:"Kick"}),P&&l.jsx("button",{className:"danger",onClick:()=>{s==null||s(d),m(null)},children:"Ban"})]})]}),l.jsx("style",{children:`
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
      `})]})}function I0({serverAddress:e,publicKey:t,signature:n,canUpload:r,canDownload:s}){const{t:a}=ut(),[i,u]=S.useState(""),[c,d]=S.useState([]),[m,k]=S.useState(!1),E=`http://${e.replace(/:\d+$/,":9999")}`,P=async I=>{k(!0);try{const D=`${E}/files/${I}`,F=await fetch(D,{headers:{"X-Hotline-PublicKey":t,"X-Hotline-Signature":n}});if(F.ok){const q=await F.json();d(q.entries||[]),u(I)}}catch{}finally{k(!1)}},z=I=>{if(I.isDir){const D=i?`${i}/${I.name}`:I.name;P(D)}else if(s){const D=i?`${i}/${I.name}`:I.name;window.open(`${E}/files/${D}`,"_blank")}},G=()=>{const I=i.split("/").filter(Boolean);I.pop(),P(I.join("/"))},b=async I=>{var Pe;const D=(Pe=I.target.files)==null?void 0:Pe[0];if(!D)return;const F=new FormData;F.append("file",D);const q=i?`${i}/${D.name}`:D.name;await fetch(`${E}/files/${q}`,{method:"POST",headers:{"X-Hotline-PublicKey":t,"X-Hotline-Signature":n},body:F}),P(i)},v=I=>I<1024?`${I} B`:I<1048576?`${(I/1024).toFixed(1)} KB`:`${(I/1048576).toFixed(1)} MB`,w=i?i.split("/").filter(Boolean):[],N=S.useRef(!1);return S.useEffect(()=>{N.current||(N.current=!0,P(""))},[]),l.jsxs("div",{className:"file-browser",children:[l.jsxs("div",{className:"file-header",children:[l.jsx("span",{children:a("files.title")}),r&&l.jsxs("label",{className:"file-upload-btn",children:[l.jsx(cu,{size:13}),l.jsx("input",{type:"file",hidden:!0,onChange:b})]})]}),w.length>0&&l.jsxs("div",{className:"file-breadcrumb",children:[l.jsx("button",{className:"breadcrumb-item",onClick:()=>P(""),children:"~"}),w.map((I,D)=>l.jsxs("span",{className:"breadcrumb-item",children:[l.jsx("span",{className:"breadcrumb-sep",children:"/"}),l.jsx("button",{onClick:()=>P(w.slice(0,D+1).join("/")),children:I})]},D))]}),l.jsxs("div",{className:"file-entries",children:[m&&l.jsxs("div",{className:"file-skeleton",children:[l.jsx("div",{className:"skeleton-line"}),l.jsx("div",{className:"skeleton-line"}),l.jsx("div",{className:"skeleton-line"})]}),!m&&i&&l.jsxs("div",{className:"file-entry",onClick:G,children:[l.jsx(Em,{size:14,className:"file-icon up"}),l.jsx("span",{className:"file-name",children:".."})]}),!m&&c.map(I=>l.jsxs("div",{className:`file-entry ${I.isDir?"dir":""}`,onClick:()=>z(I),children:[I.isDir?l.jsx(Am,{size:14,className:"file-icon folder"}):l.jsx(Rm,{size:14,className:"file-icon"}),l.jsx("span",{className:"file-name",children:I.name}),!I.isDir&&l.jsx("span",{className:"file-size",children:v(I.size)}),!I.isDir&&s&&l.jsx(op,{size:12,className:"file-dl"})]},I.name)),!m&&c.length===0&&l.jsxs("div",{className:"file-empty",children:[l.jsx(Dm,{size:20,className:"file-empty-icon"}),l.jsx("span",{children:a("files.empty")})]})]}),l.jsx("style",{children:`
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
      `})]})}function _0({motd:e}){const{t}=ut(),[n,r]=S.useState(!1),[s,a]=S.useState(!1);if(!e||n)return null;const i=e.length>120;return l.jsxs("div",{className:`server-banner ${s?"expanded":""}`,children:[l.jsxs("div",{className:"banner-main",children:[l.jsx($m,{size:14,className:"banner-icon"}),l.jsx("span",{className:"banner-label",children:t("server.motd")}),l.jsx("span",{className:"banner-text",children:s||!i?e:e.slice(0,120)+"…"}),l.jsxs("div",{className:"banner-actions",children:[i&&l.jsx("button",{className:"banner-expand",onClick:()=>a(u=>!u),title:s?"Collapse":"Expand",children:s?l.jsx(_m,{size:14}):l.jsx(Im,{size:14})}),l.jsx("button",{className:"banner-dismiss",onClick:()=>r(!0),title:"Dismiss",children:l.jsx(xr,{size:14})})]})]}),l.jsx("style",{children:`
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
      `})]})}const M0=[{code:"en",label:"EN"},{code:"fr",label:"FR"}];function O0(){const{i18n:e,t}=ut(),[n,r]=S.useState(()=>localStorage.getItem("hotline-theme")||"dark");S.useEffect(()=>{document.documentElement.setAttribute("data-theme",n),localStorage.setItem("hotline-theme",n)},[n]);const s=i=>{e.changeLanguage(i.target.value)},a=()=>r(i=>i==="dark"?"light":"dark");return l.jsxs("div",{className:"lang-selector",children:[l.jsx("button",{className:"theme-toggle",onClick:a,title:t("settings.theme"),children:n==="dark"?l.jsx(a0,{size:14}):l.jsx(Ym,{size:14})}),l.jsx(Um,{size:12,className:"lang-icon"}),l.jsx("select",{value:e.language.split("-")[0],onChange:s,children:M0.map(i=>l.jsx("option",{value:i.code,children:i.label},i.code))}),l.jsx("style",{children:`
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
      `})]})}function T0({onSubmit:e,onClose:t}){const{t:n}=ut(),[r,s]=S.useState(""),[a,i]=S.useState(""),[u,c]=S.useState(""),d=m=>{m.preventDefault();const k=r.trim().toLowerCase().replace(/\s+/g,"-");k&&(e(k,a.trim(),u.trim()),t())};return l.jsxs("div",{className:"modal-overlay",onClick:t,children:[l.jsxs("form",{className:"modal-content",onClick:m=>m.stopPropagation(),onSubmit:d,children:[l.jsx("h3",{children:n("channel.create")}),l.jsxs("div",{className:"modal-field",children:[l.jsx("label",{children:n("channel.name")}),l.jsx("input",{type:"text",value:r,onChange:m=>s(m.target.value),placeholder:"general",autoFocus:!0,maxLength:32})]}),l.jsxs("div",{className:"modal-field",children:[l.jsx("label",{children:n("channel.topic")}),l.jsx("input",{type:"text",value:a,onChange:m=>i(m.target.value),placeholder:n("channel.topic"),maxLength:128})]}),l.jsxs("div",{className:"modal-field",children:[l.jsx("label",{children:n("channel.password")}),l.jsx("input",{type:"password",value:u,onChange:m=>c(m.target.value),placeholder:n("channel.passwordPlaceholder"),maxLength:64})]}),l.jsxs("div",{className:"modal-actions",children:[l.jsx("button",{type:"button",className:"modal-btn-cancel",onClick:t,children:n("channel.cancel")}),l.jsx("button",{type:"submit",className:"modal-btn-submit",disabled:!r.trim(),children:n("channel.submit")})]})]}),l.jsx("style",{children:`
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
      `})]})}function R0(e,t){if(!t||t.length<2)return[e];const n=[],r=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");let s=0,a,i=0;for(;(a=r.exec(e))!==null;)a.index>s&&n.push(e.slice(s,a.index)),n.push(l.jsx("mark",{className:"search-highlight",children:a[1]},i++)),s=a.index+a[0].length;return s<e.length&&n.push(e.slice(s)),n}function D0({onSearch:e,onClose:t,results:n,activeChannel:r}){const{t:s,i18n:a}=ut(),[i,u]=S.useState(""),[c,d]=S.useState(!1),m=S.useRef(null),k=S.useRef(0);S.useEffect(()=>{var z;(z=m.current)==null||z.focus()},[]);const x=z=>{u(z),clearTimeout(k.current),z.length>=2&&(k.current=window.setTimeout(()=>{e(z,c?void 0:r)},300))},E=z=>{z.key==="Escape"&&t()},P=z=>new Intl.DateTimeFormat(a.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(z));return l.jsxs("div",{className:"search-panel",children:[l.jsxs("div",{className:"search-header",children:[l.jsx(dl,{size:16}),l.jsx("input",{ref:m,type:"text",className:"search-input",value:i,onChange:z=>x(z.target.value),onKeyDown:E,placeholder:s("search.placeholder")}),n.length>0&&l.jsx("span",{className:"search-count",children:n.length}),l.jsxs("label",{className:"search-scope",children:[l.jsx("input",{type:"checkbox",checked:c,onChange:z=>d(z.target.checked)}),l.jsx("span",{children:s("search.allChannels")})]}),l.jsx("button",{className:"search-close",onClick:t,children:l.jsx(xr,{size:16})})]}),n.length>0&&l.jsx("ul",{className:"search-results",children:n.map(z=>l.jsxs("li",{className:"search-result-item",children:[l.jsxs("div",{className:"search-result-meta",children:[l.jsx("span",{className:"search-result-nick",children:z.nickname}),l.jsxs("span",{className:"search-result-channel",children:["#",z.channel]}),l.jsx("span",{className:"search-result-time",children:P(z.timestamp)})]}),l.jsx("div",{className:"search-result-content",children:R0(z.content,i)})]},z.id))}),i.length>=2&&n.length===0&&l.jsxs("div",{className:"search-empty",children:[l.jsx(dl,{size:20,className:"search-empty-icon"}),l.jsx("span",{children:s("search.noResults")})]}),l.jsx("style",{children:`
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
      `})]})}function A0({status:e,reconnectIn:t}){const{t:n}=ut();return e==="connected"?null:l.jsxs("div",{className:`connection-status ${e}`,children:[l.jsxs("div",{className:"connection-status-content",children:[e==="reconnecting"&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"connection-dot danger"}),l.jsx(f0,{size:13}),l.jsx("span",{children:n("connection.reconnecting",{seconds:t})})]}),e==="connecting"&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"connection-dot accent"}),l.jsx(di,{size:13,className:"spin"}),l.jsx("span",{children:n("connection.connecting")})]}),e==="authenticating"&&l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"connection-dot accent"}),l.jsx(di,{size:13,className:"spin"}),l.jsx("span",{children:n("connection.authenticating")})]})]}),e==="reconnecting"&&l.jsx("div",{className:"connection-progress",children:l.jsx("div",{className:"connection-progress-bar"})}),l.jsx("style",{children:`
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
      `})]})}const hp="hotline_notif_prefs";function U0(){try{const e=localStorage.getItem(hp);if(e)return JSON.parse(e)}catch{}return{soundEnabled:!0,desktopEnabled:!0}}function $0(e){localStorage.setItem(hp,JSON.stringify(e))}function F0({prefs:e,onChange:t}){const{t:n}=ut(),r=s=>{const a={...e,[s]:!e[s]};t(a),$0(a)};return l.jsxs("div",{className:"notif-settings",children:[l.jsx("button",{className:`notif-toggle ${e.soundEnabled?"active":"muted"}`,onClick:()=>r("soundEnabled"),title:e.soundEnabled?n("notif.muteSound"):n("notif.unmuteSound"),children:e.soundEnabled?l.jsx(u0,{size:15}):l.jsx(c0,{size:15})}),l.jsx("button",{className:`notif-toggle ${e.desktopEnabled?"active":"muted"}`,onClick:()=>r("desktopEnabled"),title:e.desktopEnabled?n("notif.muteDesktop"):n("notif.unmuteDesktop"),children:e.desktopEnabled?l.jsx(zm,{size:15}):l.jsx(cl,{size:15})}),l.jsx("style",{children:`
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
      `})]})}function B0({messages:e,onRequestPins:t,onUnpin:n,onClose:r,activeChannel:s,canModerate:a}){const{t:i,i18n:u}=ut();S.useEffect(()=>{t(s)},[s,t]);const c=d=>new Intl.DateTimeFormat(u.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(d));return l.jsxs("div",{className:"pinned-panel",children:[l.jsxs("div",{className:"pinned-header",children:[l.jsx(na,{size:14}),l.jsx("span",{children:i("pins.title")}),l.jsx("span",{className:"pinned-count",children:e.length}),l.jsx("button",{className:"pinned-close",onClick:r,children:l.jsx(xr,{size:16})})]}),l.jsxs("div",{className:"pinned-list",children:[e.length===0&&l.jsxs("div",{className:"pinned-empty",children:[l.jsx(na,{size:20,className:"pinned-empty-icon"}),l.jsx("span",{children:i("pins.empty")})]}),e.map(d=>l.jsxs("div",{className:"pinned-item",children:[l.jsxs("div",{className:"pinned-item-header",children:[l.jsx("span",{className:"pinned-nick",children:d.nickname}),l.jsx("span",{className:"pinned-time",children:c(d.timestamp)}),a&&n&&l.jsx("button",{className:"pinned-unpin",onClick:()=>n(d.id,s),title:i("pins.unpin"),children:l.jsx(ca,{size:12})})]}),l.jsx("div",{className:"pinned-content",children:d.content})]},d.id))]}),l.jsx("style",{children:`
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
      `})]})}const gp="hotline_bookmarks";function Ri(){try{const e=localStorage.getItem(gp);return e?JSON.parse(e):[]}catch{return[]}}function mp(e){localStorage.setItem(gp,JSON.stringify(e))}function H0(e){const t=Ri();if(t.some(r=>r.id===e.id))return t;const n=[e,...t];return mp(n),n}function Cc(e){const t=Ri().filter(n=>n.id!==e);return mp(t),t}function Ec(e){return Ri().some(t=>t.id===e)}function V0({bookmarks:e,onRemove:t,onClose:n}){const{t:r,i18n:s}=ut(),a=i=>new Intl.DateTimeFormat(s.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(i));return l.jsxs("div",{className:"bookmarks-panel",children:[l.jsxs("div",{className:"bookmarks-header",children:[l.jsx(ta,{size:14}),l.jsx("span",{children:r("bookmarks.title")}),l.jsx("span",{className:"bookmarks-count",children:e.length}),l.jsx("button",{className:"bookmarks-close",onClick:n,children:l.jsx(xr,{size:16})})]}),l.jsxs("div",{className:"bookmarks-list",children:[e.length===0&&l.jsxs("div",{className:"bookmarks-empty",children:[l.jsx(ta,{size:20,className:"bookmarks-empty-icon"}),l.jsx("span",{children:r("bookmarks.empty")})]}),e.map(i=>l.jsxs("div",{className:"bookmark-item",children:[l.jsxs("div",{className:"bookmark-item-header",children:[l.jsx("span",{className:"bookmark-nick",children:i.nickname}),l.jsxs("span",{className:"bookmark-channel",children:["#",i.channel]}),l.jsx("span",{className:"bookmark-time",children:a(i.timestamp)}),l.jsx("button",{className:"bookmark-remove",onClick:()=>t(i.id),title:r("bookmarks.remove"),children:l.jsx(ca,{size:12})})]}),l.jsx("div",{className:"bookmark-content",children:i.content})]},i.id))]}),l.jsx("style",{children:`
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
      `})]})}function K0({channel:e,onSetTopic:t,onClose:n,canEdit:r}){const{t:s}=ut(),[a,i]=S.useState(e.topic),u=()=>{a!==e.topic&&t(e.name,a.trim()),n()};return l.jsxs("div",{className:"modal-overlay",onClick:n,children:[l.jsxs("div",{className:"chsettings-modal",onClick:c=>c.stopPropagation(),children:[l.jsxs("div",{className:"chsettings-header",children:[l.jsx("div",{className:"chsettings-icon",children:e.hasPassword?l.jsx(pi,{size:18}):l.jsx(lp,{size:18})}),l.jsxs("div",{children:[l.jsx("h3",{children:e.name}),l.jsx("span",{className:"chsettings-subtitle",children:s("channelSettings.title")})]})]}),l.jsxs("div",{className:"chsettings-info",children:[l.jsxs("div",{className:"chsettings-stat",children:[l.jsx(l0,{size:14}),l.jsxs("span",{children:[e.userCount," ",s("channelSettings.members")]})]}),e.hasPassword&&l.jsxs("div",{className:"chsettings-stat",children:[l.jsx(pi,{size:14}),l.jsx("span",{children:s("channelSettings.passwordProtected")})]})]}),l.jsxs("div",{className:"chsettings-field",children:[l.jsx("label",{children:s("channel.topic")}),r?l.jsx("textarea",{value:a,onChange:c=>i(c.target.value),placeholder:s("channelSettings.topicPlaceholder"),maxLength:256,rows:3}):l.jsx("div",{className:"chsettings-topic-display",children:e.topic||l.jsx("em",{className:"text-muted",children:s("channelSettings.noTopic")})})]}),l.jsxs("div",{className:"chsettings-actions",children:[l.jsx("button",{className:"modal-btn-cancel",onClick:n,children:s(r?"channel.cancel":"channelSettings.close")}),r&&l.jsx("button",{className:"modal-btn-submit",onClick:u,disabled:a===e.topic,children:s("channelSettings.save")})]})]}),l.jsx("style",{children:`
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
      `})]})}function W0({onDrop:e,enabled:t}){const{t:n}=ut(),[r,s]=S.useState(!1),a=S.useRef(0),i=S.useCallback(m=>{var k;m.preventDefault(),t&&(a.current++,(k=m.dataTransfer)!=null&&k.types.includes("Files")&&s(!0))},[t]),u=S.useCallback(m=>{m.preventDefault(),a.current--,a.current===0&&s(!1)},[]),c=S.useCallback(m=>{m.preventDefault()},[]),d=S.useCallback(m=>{var x;if(m.preventDefault(),a.current=0,s(!1),!t)return;const k=(x=m.dataTransfer)==null?void 0:x.files[0];k&&e(k)},[t,e]);return S.useEffect(()=>(document.addEventListener("dragenter",i),document.addEventListener("dragleave",u),document.addEventListener("dragover",c),document.addEventListener("drop",d),()=>{document.removeEventListener("dragenter",i),document.removeEventListener("dragleave",u),document.removeEventListener("dragover",c),document.removeEventListener("drop",d)}),[i,u,c,d]),r?l.jsxs("div",{className:"drag-drop-overlay",children:[l.jsxs("div",{className:"drag-drop-zone",children:[l.jsx(cu,{size:40,className:"drag-drop-icon"}),l.jsx("span",{className:"drag-drop-text",children:n("files.dropHere")}),l.jsx("span",{className:"drag-drop-hint",children:"Images, documents, archives"})]}),l.jsx("style",{children:`
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
      `})]}):null}const Y0=[{keys:"Ctrl + K",action:"shortcuts.search"},{keys:"Ctrl + B",action:"shortcuts.bold"},{keys:"Ctrl + I",action:"shortcuts.italic"},{keys:"Escape",action:"shortcuts.close"},{keys:"Enter",action:"shortcuts.send"},{keys:"Shift + Enter",action:"shortcuts.newline"},{keys:"@ + name",action:"shortcuts.mention"},{keys:"?",action:"shortcuts.showHelp"}];function Q0({onClose:e}){const{t}=ut();return l.jsxs("div",{className:"modal-overlay",onClick:e,children:[l.jsxs("div",{className:"shortcuts-modal",onClick:n=>n.stopPropagation(),children:[l.jsxs("div",{className:"shortcuts-header",children:[l.jsx(Bm,{size:18}),l.jsx("h3",{children:t("shortcuts.title")}),l.jsx("button",{className:"shortcuts-close",onClick:e,children:l.jsx(xr,{size:16})})]}),l.jsx("div",{className:"shortcuts-list",children:Y0.map(n=>l.jsxs("div",{className:"shortcut-row",children:[l.jsx("span",{className:"shortcut-action",children:t(n.action)}),l.jsx("span",{className:"shortcut-key-group",children:n.keys.split(" + ").map((r,s)=>l.jsxs("span",{children:[s>0&&l.jsx("span",{className:"shortcut-plus",children:"+"}),l.jsx("kbd",{className:"shortcut-key",children:r})]},s))})]},n.keys))})]}),l.jsx("style",{children:`
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
      `})]})}function J0({serverName:e,motd:t,onUpdateSettings:n,onRequestBanList:r,onUnban:s,onClose:a}){const{t:i}=ut(),[u,c]=S.useState("settings"),[d,m]=S.useState(e),[k,x]=S.useState(t),[E,P]=S.useState(!1);S.useEffect(()=>{r()},[]);const z=()=>{n(d.trim(),k.trim()),P(!0),setTimeout(()=>P(!1),2e3)};return l.jsxs("div",{className:"modal-overlay",onClick:a,children:[l.jsxs("div",{className:"admin-panel",onClick:G=>G.stopPropagation(),children:[l.jsxs("div",{className:"admin-header",children:[l.jsx(dp,{size:18}),l.jsx("h3",{children:i("admin.title")}),l.jsx("button",{className:"admin-close",onClick:a,children:l.jsx(xr,{size:16})})]}),l.jsxs("div",{className:"admin-tabs",children:[l.jsxs("button",{className:`admin-tab ${u==="settings"?"active":""}`,onClick:()=>c("settings"),children:[l.jsx(fp,{size:14}),i("admin.settings")]}),l.jsxs("button",{className:`admin-tab ${u==="bans"?"active":""}`,onClick:()=>c("bans"),children:[l.jsx(i0,{size:14}),i("admin.bans")]})]}),u==="settings"&&l.jsxs("div",{className:"admin-content",children:[l.jsxs("div",{className:"admin-field",children:[l.jsx("label",{children:i("admin.serverName")}),l.jsx("input",{type:"text",value:d,onChange:G=>m(G.target.value),maxLength:64})]}),l.jsxs("div",{className:"admin-field",children:[l.jsx("label",{children:i("admin.motd")}),l.jsx("textarea",{value:k,onChange:G=>x(G.target.value),rows:4,maxLength:512})]}),l.jsxs("button",{className:`admin-save ${E?"saved":""}`,onClick:z,children:[E?l.jsx(Lm,{size:14}):l.jsx(e0,{size:14}),i(E?"admin.saved":"admin.save")]})]}),u==="bans"&&l.jsxs("div",{className:"admin-content",children:[l.jsx("p",{className:"admin-ban-info",children:i("admin.banInfo")}),l.jsx("div",{className:"admin-ban-empty",children:i("admin.noBans")})]})]}),l.jsx("style",{children:`
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
      `})]})}function X0({channelName:e,onSubmit:t,onCancel:n}){const{t:r}=ut(),[s,a]=S.useState(""),[i,u]=S.useState(!1),c=()=>{if(!s.trim()){u(!0),setTimeout(()=>u(!1),500);return}t(s)};return l.jsxs("div",{className:"modal-overlay",onClick:n,children:[l.jsxs("div",{className:`channel-pw-modal ${i?"shake":""}`,onClick:d=>d.stopPropagation(),children:[l.jsx("div",{className:"channel-pw-icon",children:l.jsx(pi,{size:24})}),l.jsx("h3",{className:"channel-pw-title",children:r("channel.passwordRequired")}),l.jsx("p",{className:"channel-pw-desc",children:r("channel.passwordDesc",{channel:e})}),l.jsxs("div",{className:"channel-pw-input-row",children:[l.jsx("input",{type:"password",className:"channel-pw-input",value:s,onChange:d=>a(d.target.value),onKeyDown:d=>{d.key==="Enter"&&c(),d.key==="Escape"&&n()},placeholder:r("channel.passwordPlaceholderJoin"),autoFocus:!0}),l.jsx("button",{className:"channel-pw-submit",onClick:c,disabled:!s.trim(),children:l.jsx(Cm,{size:16})})]}),l.jsx("button",{className:"channel-pw-cancel",onClick:n,children:r("channel.cancel")})]}),l.jsx("style",{children:`
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
      `})]})}function Z0({src:e,onClose:t}){const[n,r]=S.useState(1),[s,a]=S.useState(0),[i,u]=S.useState(!1),c=S.useCallback(m=>{m.key==="Escape"&&t(),(m.key==="+"||m.key==="=")&&r(k=>Math.min(k+.25,4)),m.key==="-"&&r(k=>Math.max(k-.25,.5)),m.key==="r"&&a(k=>k+90)},[t]);S.useEffect(()=>(document.addEventListener("keydown",c),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",c),document.body.style.overflow=""}),[c]);const d=m=>{m.preventDefault();const k=m.deltaY>0?-.1:.1;r(x=>Math.max(.5,Math.min(4,x+k)))};return l.jsxs("div",{className:"lightbox-overlay",onClick:t,children:[l.jsxs("div",{className:"lightbox-toolbar",onClick:m=>m.stopPropagation(),children:[l.jsx("button",{onClick:()=>r(m=>Math.min(m+.25,4)),title:"Zoom in",children:l.jsx(d0,{size:16})}),l.jsx("button",{onClick:()=>r(m=>Math.max(m-.25,.5)),title:"Zoom out",children:l.jsx(p0,{size:16})}),l.jsx("button",{onClick:()=>a(m=>m+90),title:"Rotate",children:l.jsx(Gm,{size:16})}),l.jsx("button",{onClick:()=>{r(1),a(0)},title:"Reset",children:l.jsx(Km,{size:16})}),l.jsxs("span",{className:"lightbox-scale",children:[Math.round(n*100),"%"]}),l.jsx("a",{href:e,download:!0,className:"lightbox-download",title:"Download",onClick:m=>m.stopPropagation(),children:l.jsx(op,{size:16})}),l.jsx("button",{className:"lightbox-close-btn",onClick:t,title:"Close (Esc)",children:l.jsx(xr,{size:18})})]}),l.jsxs("div",{className:"lightbox-content",onClick:m=>m.stopPropagation(),onWheel:d,children:[!i&&l.jsx("div",{className:"lightbox-loading",children:l.jsx("div",{className:"lightbox-spinner"})}),l.jsx("img",{src:e,alt:"",className:`lightbox-img ${i?"loaded":""}`,style:{transform:`scale(${n}) rotate(${s}deg)`},onLoad:()=>u(!0),onDoubleClick:()=>{r(1),a(0)},draggable:!1})]}),l.jsx("style",{children:`
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
      `})]})}function G0({toast:e,onDismiss:t}){const[n,r]=S.useState(!1);S.useEffect(()=>{const a=setTimeout(()=>{r(!0),setTimeout(()=>t(e.id),300)},3e3);return()=>clearTimeout(a)},[e.id,t]);const s=e.type==="join"?l.jsx(Vm,{size:13}):e.type==="leave"?l.jsx(up,{size:13}):null;return l.jsxs("div",{className:`toast-item toast-${e.type} ${n?"exiting":""}`,children:[s&&l.jsx("span",{className:"toast-icon",children:s}),l.jsx("span",{className:"toast-text",children:e.message}),l.jsx("button",{className:"toast-close",onClick:()=>{r(!0),setTimeout(()=>t(e.id),300)},children:l.jsx(xr,{size:12})})]})}function q0({toasts:e,onDismiss:t}){return e.length===0?null:l.jsxs("div",{className:"toast-container",children:[e.slice(-5).map(n=>l.jsx(G0,{toast:n,onDismiss:t},n.id)),l.jsx("style",{children:`
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
      `})]})}function e1(){const[e,t]=S.useState([]),n=S.useRef(0),r=S.useCallback((a,i)=>{const u=`toast-${++n.current}`;t(c=>[...c,{id:u,type:a,message:i,timestamp:Date.now()}])},[]),s=S.useCallback(a=>{t(i=>i.filter(u=>u.id!==a))},[]);return{toasts:e,addToast:r,dismissToast:s}}function t1(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var xp={exports:{}};const n1={},r1=Object.freeze(Object.defineProperty({__proto__:null,default:n1},Symbol.toStringTag,{value:"Module"})),s1=_p(r1);(function(e){(function(t){var n=function(f){var h,p=new Float64Array(16);if(f)for(h=0;h<f.length;h++)p[h]=f[h];return p},r=function(){throw new Error("no PRNG")},s=new Uint8Array(16),a=new Uint8Array(32);a[0]=9;var i=n(),u=n([1]),c=n([56129,1]),d=n([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=n([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),k=n([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),x=n([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),E=n([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function P(f,h,p,o){f[h]=p>>24&255,f[h+1]=p>>16&255,f[h+2]=p>>8&255,f[h+3]=p&255,f[h+4]=o>>24&255,f[h+5]=o>>16&255,f[h+6]=o>>8&255,f[h+7]=o&255}function z(f,h,p,o,g){var j,C=0;for(j=0;j<g;j++)C|=f[h+j]^p[o+j];return(1&C-1>>>8)-1}function G(f,h,p,o){return z(f,h,p,o,16)}function b(f,h,p,o){return z(f,h,p,o,32)}function v(f,h,p,o){for(var g=o[0]&255|(o[1]&255)<<8|(o[2]&255)<<16|(o[3]&255)<<24,j=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,C=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,A=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Q=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,fe=o[4]&255|(o[5]&255)<<8|(o[6]&255)<<16|(o[7]&255)<<24,ae=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Re=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,oe=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,ye=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,Se=o[8]&255|(o[9]&255)<<8|(o[10]&255)<<16|(o[11]&255)<<24,je=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,L=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,O=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Y=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,X=o[12]&255|(o[13]&255)<<8|(o[14]&255)<<16|(o[15]&255)<<24,V=g,ne=j,te=C,se=A,ue=Q,ie=fe,_=ae,M=Re,B=oe,U=ye,$=Se,K=je,xe=L,Ce=O,ze=Y,Ee=X,y,_e=0;_e<20;_e+=2)y=V+xe|0,ue^=y<<7|y>>>25,y=ue+V|0,B^=y<<9|y>>>23,y=B+ue|0,xe^=y<<13|y>>>19,y=xe+B|0,V^=y<<18|y>>>14,y=ie+ne|0,U^=y<<7|y>>>25,y=U+ie|0,Ce^=y<<9|y>>>23,y=Ce+U|0,ne^=y<<13|y>>>19,y=ne+Ce|0,ie^=y<<18|y>>>14,y=$+_|0,ze^=y<<7|y>>>25,y=ze+$|0,te^=y<<9|y>>>23,y=te+ze|0,_^=y<<13|y>>>19,y=_+te|0,$^=y<<18|y>>>14,y=Ee+K|0,se^=y<<7|y>>>25,y=se+Ee|0,M^=y<<9|y>>>23,y=M+se|0,K^=y<<13|y>>>19,y=K+M|0,Ee^=y<<18|y>>>14,y=V+se|0,ne^=y<<7|y>>>25,y=ne+V|0,te^=y<<9|y>>>23,y=te+ne|0,se^=y<<13|y>>>19,y=se+te|0,V^=y<<18|y>>>14,y=ie+ue|0,_^=y<<7|y>>>25,y=_+ie|0,M^=y<<9|y>>>23,y=M+_|0,ue^=y<<13|y>>>19,y=ue+M|0,ie^=y<<18|y>>>14,y=$+U|0,K^=y<<7|y>>>25,y=K+$|0,B^=y<<9|y>>>23,y=B+K|0,U^=y<<13|y>>>19,y=U+B|0,$^=y<<18|y>>>14,y=Ee+ze|0,xe^=y<<7|y>>>25,y=xe+Ee|0,Ce^=y<<9|y>>>23,y=Ce+xe|0,ze^=y<<13|y>>>19,y=ze+Ce|0,Ee^=y<<18|y>>>14;V=V+g|0,ne=ne+j|0,te=te+C|0,se=se+A|0,ue=ue+Q|0,ie=ie+fe|0,_=_+ae|0,M=M+Re|0,B=B+oe|0,U=U+ye|0,$=$+Se|0,K=K+je|0,xe=xe+L|0,Ce=Ce+O|0,ze=ze+Y|0,Ee=Ee+X|0,f[0]=V>>>0&255,f[1]=V>>>8&255,f[2]=V>>>16&255,f[3]=V>>>24&255,f[4]=ne>>>0&255,f[5]=ne>>>8&255,f[6]=ne>>>16&255,f[7]=ne>>>24&255,f[8]=te>>>0&255,f[9]=te>>>8&255,f[10]=te>>>16&255,f[11]=te>>>24&255,f[12]=se>>>0&255,f[13]=se>>>8&255,f[14]=se>>>16&255,f[15]=se>>>24&255,f[16]=ue>>>0&255,f[17]=ue>>>8&255,f[18]=ue>>>16&255,f[19]=ue>>>24&255,f[20]=ie>>>0&255,f[21]=ie>>>8&255,f[22]=ie>>>16&255,f[23]=ie>>>24&255,f[24]=_>>>0&255,f[25]=_>>>8&255,f[26]=_>>>16&255,f[27]=_>>>24&255,f[28]=M>>>0&255,f[29]=M>>>8&255,f[30]=M>>>16&255,f[31]=M>>>24&255,f[32]=B>>>0&255,f[33]=B>>>8&255,f[34]=B>>>16&255,f[35]=B>>>24&255,f[36]=U>>>0&255,f[37]=U>>>8&255,f[38]=U>>>16&255,f[39]=U>>>24&255,f[40]=$>>>0&255,f[41]=$>>>8&255,f[42]=$>>>16&255,f[43]=$>>>24&255,f[44]=K>>>0&255,f[45]=K>>>8&255,f[46]=K>>>16&255,f[47]=K>>>24&255,f[48]=xe>>>0&255,f[49]=xe>>>8&255,f[50]=xe>>>16&255,f[51]=xe>>>24&255,f[52]=Ce>>>0&255,f[53]=Ce>>>8&255,f[54]=Ce>>>16&255,f[55]=Ce>>>24&255,f[56]=ze>>>0&255,f[57]=ze>>>8&255,f[58]=ze>>>16&255,f[59]=ze>>>24&255,f[60]=Ee>>>0&255,f[61]=Ee>>>8&255,f[62]=Ee>>>16&255,f[63]=Ee>>>24&255}function w(f,h,p,o){for(var g=o[0]&255|(o[1]&255)<<8|(o[2]&255)<<16|(o[3]&255)<<24,j=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,C=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,A=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Q=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,fe=o[4]&255|(o[5]&255)<<8|(o[6]&255)<<16|(o[7]&255)<<24,ae=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Re=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,oe=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,ye=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,Se=o[8]&255|(o[9]&255)<<8|(o[10]&255)<<16|(o[11]&255)<<24,je=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,L=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,O=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Y=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,X=o[12]&255|(o[13]&255)<<8|(o[14]&255)<<16|(o[15]&255)<<24,V=g,ne=j,te=C,se=A,ue=Q,ie=fe,_=ae,M=Re,B=oe,U=ye,$=Se,K=je,xe=L,Ce=O,ze=Y,Ee=X,y,_e=0;_e<20;_e+=2)y=V+xe|0,ue^=y<<7|y>>>25,y=ue+V|0,B^=y<<9|y>>>23,y=B+ue|0,xe^=y<<13|y>>>19,y=xe+B|0,V^=y<<18|y>>>14,y=ie+ne|0,U^=y<<7|y>>>25,y=U+ie|0,Ce^=y<<9|y>>>23,y=Ce+U|0,ne^=y<<13|y>>>19,y=ne+Ce|0,ie^=y<<18|y>>>14,y=$+_|0,ze^=y<<7|y>>>25,y=ze+$|0,te^=y<<9|y>>>23,y=te+ze|0,_^=y<<13|y>>>19,y=_+te|0,$^=y<<18|y>>>14,y=Ee+K|0,se^=y<<7|y>>>25,y=se+Ee|0,M^=y<<9|y>>>23,y=M+se|0,K^=y<<13|y>>>19,y=K+M|0,Ee^=y<<18|y>>>14,y=V+se|0,ne^=y<<7|y>>>25,y=ne+V|0,te^=y<<9|y>>>23,y=te+ne|0,se^=y<<13|y>>>19,y=se+te|0,V^=y<<18|y>>>14,y=ie+ue|0,_^=y<<7|y>>>25,y=_+ie|0,M^=y<<9|y>>>23,y=M+_|0,ue^=y<<13|y>>>19,y=ue+M|0,ie^=y<<18|y>>>14,y=$+U|0,K^=y<<7|y>>>25,y=K+$|0,B^=y<<9|y>>>23,y=B+K|0,U^=y<<13|y>>>19,y=U+B|0,$^=y<<18|y>>>14,y=Ee+ze|0,xe^=y<<7|y>>>25,y=xe+Ee|0,Ce^=y<<9|y>>>23,y=Ce+xe|0,ze^=y<<13|y>>>19,y=ze+Ce|0,Ee^=y<<18|y>>>14;f[0]=V>>>0&255,f[1]=V>>>8&255,f[2]=V>>>16&255,f[3]=V>>>24&255,f[4]=ie>>>0&255,f[5]=ie>>>8&255,f[6]=ie>>>16&255,f[7]=ie>>>24&255,f[8]=$>>>0&255,f[9]=$>>>8&255,f[10]=$>>>16&255,f[11]=$>>>24&255,f[12]=Ee>>>0&255,f[13]=Ee>>>8&255,f[14]=Ee>>>16&255,f[15]=Ee>>>24&255,f[16]=_>>>0&255,f[17]=_>>>8&255,f[18]=_>>>16&255,f[19]=_>>>24&255,f[20]=M>>>0&255,f[21]=M>>>8&255,f[22]=M>>>16&255,f[23]=M>>>24&255,f[24]=B>>>0&255,f[25]=B>>>8&255,f[26]=B>>>16&255,f[27]=B>>>24&255,f[28]=U>>>0&255,f[29]=U>>>8&255,f[30]=U>>>16&255,f[31]=U>>>24&255}function N(f,h,p,o){v(f,h,p,o)}function I(f,h,p,o){w(f,h,p,o)}var D=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function F(f,h,p,o,g,j,C){var A=new Uint8Array(16),Q=new Uint8Array(64),fe,ae;for(ae=0;ae<16;ae++)A[ae]=0;for(ae=0;ae<8;ae++)A[ae]=j[ae];for(;g>=64;){for(N(Q,A,C,D),ae=0;ae<64;ae++)f[h+ae]=p[o+ae]^Q[ae];for(fe=1,ae=8;ae<16;ae++)fe=fe+(A[ae]&255)|0,A[ae]=fe&255,fe>>>=8;g-=64,h+=64,o+=64}if(g>0)for(N(Q,A,C,D),ae=0;ae<g;ae++)f[h+ae]=p[o+ae]^Q[ae];return 0}function q(f,h,p,o,g){var j=new Uint8Array(16),C=new Uint8Array(64),A,Q;for(Q=0;Q<16;Q++)j[Q]=0;for(Q=0;Q<8;Q++)j[Q]=o[Q];for(;p>=64;){for(N(C,j,g,D),Q=0;Q<64;Q++)f[h+Q]=C[Q];for(A=1,Q=8;Q<16;Q++)A=A+(j[Q]&255)|0,j[Q]=A&255,A>>>=8;p-=64,h+=64}if(p>0)for(N(C,j,g,D),Q=0;Q<p;Q++)f[h+Q]=C[Q];return 0}function Pe(f,h,p,o,g){var j=new Uint8Array(32);I(j,o,g,D);for(var C=new Uint8Array(8),A=0;A<8;A++)C[A]=o[A+16];return q(f,h,p,C,j)}function he(f,h,p,o,g,j,C){var A=new Uint8Array(32);I(A,j,C,D);for(var Q=new Uint8Array(8),fe=0;fe<8;fe++)Q[fe]=j[fe+16];return F(f,h,p,o,g,Q,A)}var De=function(f){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var h,p,o,g,j,C,A,Q;h=f[0]&255|(f[1]&255)<<8,this.r[0]=h&8191,p=f[2]&255|(f[3]&255)<<8,this.r[1]=(h>>>13|p<<3)&8191,o=f[4]&255|(f[5]&255)<<8,this.r[2]=(p>>>10|o<<6)&7939,g=f[6]&255|(f[7]&255)<<8,this.r[3]=(o>>>7|g<<9)&8191,j=f[8]&255|(f[9]&255)<<8,this.r[4]=(g>>>4|j<<12)&255,this.r[5]=j>>>1&8190,C=f[10]&255|(f[11]&255)<<8,this.r[6]=(j>>>14|C<<2)&8191,A=f[12]&255|(f[13]&255)<<8,this.r[7]=(C>>>11|A<<5)&8065,Q=f[14]&255|(f[15]&255)<<8,this.r[8]=(A>>>8|Q<<8)&8191,this.r[9]=Q>>>5&127,this.pad[0]=f[16]&255|(f[17]&255)<<8,this.pad[1]=f[18]&255|(f[19]&255)<<8,this.pad[2]=f[20]&255|(f[21]&255)<<8,this.pad[3]=f[22]&255|(f[23]&255)<<8,this.pad[4]=f[24]&255|(f[25]&255)<<8,this.pad[5]=f[26]&255|(f[27]&255)<<8,this.pad[6]=f[28]&255|(f[29]&255)<<8,this.pad[7]=f[30]&255|(f[31]&255)<<8};De.prototype.blocks=function(f,h,p){for(var o=this.fin?0:2048,g,j,C,A,Q,fe,ae,Re,oe,ye,Se,je,L,O,Y,X,V,ne,te,se=this.h[0],ue=this.h[1],ie=this.h[2],_=this.h[3],M=this.h[4],B=this.h[5],U=this.h[6],$=this.h[7],K=this.h[8],xe=this.h[9],Ce=this.r[0],ze=this.r[1],Ee=this.r[2],y=this.r[3],_e=this.r[4],Be=this.r[5],He=this.r[6],Le=this.r[7],$e=this.r[8],Fe=this.r[9];p>=16;)g=f[h+0]&255|(f[h+1]&255)<<8,se+=g&8191,j=f[h+2]&255|(f[h+3]&255)<<8,ue+=(g>>>13|j<<3)&8191,C=f[h+4]&255|(f[h+5]&255)<<8,ie+=(j>>>10|C<<6)&8191,A=f[h+6]&255|(f[h+7]&255)<<8,_+=(C>>>7|A<<9)&8191,Q=f[h+8]&255|(f[h+9]&255)<<8,M+=(A>>>4|Q<<12)&8191,B+=Q>>>1&8191,fe=f[h+10]&255|(f[h+11]&255)<<8,U+=(Q>>>14|fe<<2)&8191,ae=f[h+12]&255|(f[h+13]&255)<<8,$+=(fe>>>11|ae<<5)&8191,Re=f[h+14]&255|(f[h+15]&255)<<8,K+=(ae>>>8|Re<<8)&8191,xe+=Re>>>5|o,oe=0,ye=oe,ye+=se*Ce,ye+=ue*(5*Fe),ye+=ie*(5*$e),ye+=_*(5*Le),ye+=M*(5*He),oe=ye>>>13,ye&=8191,ye+=B*(5*Be),ye+=U*(5*_e),ye+=$*(5*y),ye+=K*(5*Ee),ye+=xe*(5*ze),oe+=ye>>>13,ye&=8191,Se=oe,Se+=se*ze,Se+=ue*Ce,Se+=ie*(5*Fe),Se+=_*(5*$e),Se+=M*(5*Le),oe=Se>>>13,Se&=8191,Se+=B*(5*He),Se+=U*(5*Be),Se+=$*(5*_e),Se+=K*(5*y),Se+=xe*(5*Ee),oe+=Se>>>13,Se&=8191,je=oe,je+=se*Ee,je+=ue*ze,je+=ie*Ce,je+=_*(5*Fe),je+=M*(5*$e),oe=je>>>13,je&=8191,je+=B*(5*Le),je+=U*(5*He),je+=$*(5*Be),je+=K*(5*_e),je+=xe*(5*y),oe+=je>>>13,je&=8191,L=oe,L+=se*y,L+=ue*Ee,L+=ie*ze,L+=_*Ce,L+=M*(5*Fe),oe=L>>>13,L&=8191,L+=B*(5*$e),L+=U*(5*Le),L+=$*(5*He),L+=K*(5*Be),L+=xe*(5*_e),oe+=L>>>13,L&=8191,O=oe,O+=se*_e,O+=ue*y,O+=ie*Ee,O+=_*ze,O+=M*Ce,oe=O>>>13,O&=8191,O+=B*(5*Fe),O+=U*(5*$e),O+=$*(5*Le),O+=K*(5*He),O+=xe*(5*Be),oe+=O>>>13,O&=8191,Y=oe,Y+=se*Be,Y+=ue*_e,Y+=ie*y,Y+=_*Ee,Y+=M*ze,oe=Y>>>13,Y&=8191,Y+=B*Ce,Y+=U*(5*Fe),Y+=$*(5*$e),Y+=K*(5*Le),Y+=xe*(5*He),oe+=Y>>>13,Y&=8191,X=oe,X+=se*He,X+=ue*Be,X+=ie*_e,X+=_*y,X+=M*Ee,oe=X>>>13,X&=8191,X+=B*ze,X+=U*Ce,X+=$*(5*Fe),X+=K*(5*$e),X+=xe*(5*Le),oe+=X>>>13,X&=8191,V=oe,V+=se*Le,V+=ue*He,V+=ie*Be,V+=_*_e,V+=M*y,oe=V>>>13,V&=8191,V+=B*Ee,V+=U*ze,V+=$*Ce,V+=K*(5*Fe),V+=xe*(5*$e),oe+=V>>>13,V&=8191,ne=oe,ne+=se*$e,ne+=ue*Le,ne+=ie*He,ne+=_*Be,ne+=M*_e,oe=ne>>>13,ne&=8191,ne+=B*y,ne+=U*Ee,ne+=$*ze,ne+=K*Ce,ne+=xe*(5*Fe),oe+=ne>>>13,ne&=8191,te=oe,te+=se*Fe,te+=ue*$e,te+=ie*Le,te+=_*He,te+=M*Be,oe=te>>>13,te&=8191,te+=B*_e,te+=U*y,te+=$*Ee,te+=K*ze,te+=xe*Ce,oe+=te>>>13,te&=8191,oe=(oe<<2)+oe|0,oe=oe+ye|0,ye=oe&8191,oe=oe>>>13,Se+=oe,se=ye,ue=Se,ie=je,_=L,M=O,B=Y,U=X,$=V,K=ne,xe=te,h+=16,p-=16;this.h[0]=se,this.h[1]=ue,this.h[2]=ie,this.h[3]=_,this.h[4]=M,this.h[5]=B,this.h[6]=U,this.h[7]=$,this.h[8]=K,this.h[9]=xe},De.prototype.finish=function(f,h){var p=new Uint16Array(10),o,g,j,C;if(this.leftover){for(C=this.leftover,this.buffer[C++]=1;C<16;C++)this.buffer[C]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(o=this.h[1]>>>13,this.h[1]&=8191,C=2;C<10;C++)this.h[C]+=o,o=this.h[C]>>>13,this.h[C]&=8191;for(this.h[0]+=o*5,o=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=o,o=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=o,p[0]=this.h[0]+5,o=p[0]>>>13,p[0]&=8191,C=1;C<10;C++)p[C]=this.h[C]+o,o=p[C]>>>13,p[C]&=8191;for(p[9]-=8192,g=(o^1)-1,C=0;C<10;C++)p[C]&=g;for(g=~g,C=0;C<10;C++)this.h[C]=this.h[C]&g|p[C];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,j=this.h[0]+this.pad[0],this.h[0]=j&65535,C=1;C<8;C++)j=(this.h[C]+this.pad[C]|0)+(j>>>16)|0,this.h[C]=j&65535;f[h+0]=this.h[0]>>>0&255,f[h+1]=this.h[0]>>>8&255,f[h+2]=this.h[1]>>>0&255,f[h+3]=this.h[1]>>>8&255,f[h+4]=this.h[2]>>>0&255,f[h+5]=this.h[2]>>>8&255,f[h+6]=this.h[3]>>>0&255,f[h+7]=this.h[3]>>>8&255,f[h+8]=this.h[4]>>>0&255,f[h+9]=this.h[4]>>>8&255,f[h+10]=this.h[5]>>>0&255,f[h+11]=this.h[5]>>>8&255,f[h+12]=this.h[6]>>>0&255,f[h+13]=this.h[6]>>>8&255,f[h+14]=this.h[7]>>>0&255,f[h+15]=this.h[7]>>>8&255},De.prototype.update=function(f,h,p){var o,g;if(this.leftover){for(g=16-this.leftover,g>p&&(g=p),o=0;o<g;o++)this.buffer[this.leftover+o]=f[h+o];if(p-=g,h+=g,this.leftover+=g,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(p>=16&&(g=p-p%16,this.blocks(f,h,g),h+=g,p-=g),p){for(o=0;o<p;o++)this.buffer[this.leftover+o]=f[h+o];this.leftover+=p}};function Ge(f,h,p,o,g,j){var C=new De(j);return C.update(p,o,g),C.finish(f,h),0}function xt(f,h,p,o,g,j){var C=new Uint8Array(16);return Ge(C,0,p,o,g,j),G(f,h,C,0)}function rt(f,h,p,o,g){var j;if(p<32)return-1;for(he(f,0,h,0,p,o,g),Ge(f,16,f,32,p-32,f),j=0;j<16;j++)f[j]=0;return 0}function Ae(f,h,p,o,g){var j,C=new Uint8Array(32);if(p<32||(Pe(C,0,32,o,g),xt(h,16,h,32,p-32,C)!==0))return-1;for(he(f,0,h,0,p,o,g),j=0;j<32;j++)f[j]=0;return 0}function Te(f,h){var p;for(p=0;p<16;p++)f[p]=h[p]|0}function Je(f){var h,p,o=1;for(h=0;h<16;h++)p=f[h]+o+65535,o=Math.floor(p/65536),f[h]=p-o*65536;f[0]+=o-1+37*(o-1)}function H(f,h,p){for(var o,g=~(p-1),j=0;j<16;j++)o=g&(f[j]^h[j]),f[j]^=o,h[j]^=o}function le(f,h){var p,o,g,j=n(),C=n();for(p=0;p<16;p++)C[p]=h[p];for(Je(C),Je(C),Je(C),o=0;o<2;o++){for(j[0]=C[0]-65517,p=1;p<15;p++)j[p]=C[p]-65535-(j[p-1]>>16&1),j[p-1]&=65535;j[15]=C[15]-32767-(j[14]>>16&1),g=j[15]>>16&1,j[14]&=65535,H(C,j,1-g)}for(p=0;p<16;p++)f[2*p]=C[p]&255,f[2*p+1]=C[p]>>8}function de(f,h){var p=new Uint8Array(32),o=new Uint8Array(32);return le(p,f),le(o,h),b(p,0,o,0)}function Ie(f){var h=new Uint8Array(32);return le(h,f),h[0]&1}function Ue(f,h){var p;for(p=0;p<16;p++)f[p]=h[2*p]+(h[2*p+1]<<8);f[15]&=32767}function Xe(f,h,p){for(var o=0;o<16;o++)f[o]=h[o]+p[o]}function Ke(f,h,p){for(var o=0;o<16;o++)f[o]=h[o]-p[o]}function ke(f,h,p){var o,g,j=0,C=0,A=0,Q=0,fe=0,ae=0,Re=0,oe=0,ye=0,Se=0,je=0,L=0,O=0,Y=0,X=0,V=0,ne=0,te=0,se=0,ue=0,ie=0,_=0,M=0,B=0,U=0,$=0,K=0,xe=0,Ce=0,ze=0,Ee=0,y=p[0],_e=p[1],Be=p[2],He=p[3],Le=p[4],$e=p[5],Fe=p[6],gt=p[7],Ye=p[8],ft=p[9],dt=p[10],pt=p[11],kt=p[12],Pt=p[13],Lt=p[14],It=p[15];o=h[0],j+=o*y,C+=o*_e,A+=o*Be,Q+=o*He,fe+=o*Le,ae+=o*$e,Re+=o*Fe,oe+=o*gt,ye+=o*Ye,Se+=o*ft,je+=o*dt,L+=o*pt,O+=o*kt,Y+=o*Pt,X+=o*Lt,V+=o*It,o=h[1],C+=o*y,A+=o*_e,Q+=o*Be,fe+=o*He,ae+=o*Le,Re+=o*$e,oe+=o*Fe,ye+=o*gt,Se+=o*Ye,je+=o*ft,L+=o*dt,O+=o*pt,Y+=o*kt,X+=o*Pt,V+=o*Lt,ne+=o*It,o=h[2],A+=o*y,Q+=o*_e,fe+=o*Be,ae+=o*He,Re+=o*Le,oe+=o*$e,ye+=o*Fe,Se+=o*gt,je+=o*Ye,L+=o*ft,O+=o*dt,Y+=o*pt,X+=o*kt,V+=o*Pt,ne+=o*Lt,te+=o*It,o=h[3],Q+=o*y,fe+=o*_e,ae+=o*Be,Re+=o*He,oe+=o*Le,ye+=o*$e,Se+=o*Fe,je+=o*gt,L+=o*Ye,O+=o*ft,Y+=o*dt,X+=o*pt,V+=o*kt,ne+=o*Pt,te+=o*Lt,se+=o*It,o=h[4],fe+=o*y,ae+=o*_e,Re+=o*Be,oe+=o*He,ye+=o*Le,Se+=o*$e,je+=o*Fe,L+=o*gt,O+=o*Ye,Y+=o*ft,X+=o*dt,V+=o*pt,ne+=o*kt,te+=o*Pt,se+=o*Lt,ue+=o*It,o=h[5],ae+=o*y,Re+=o*_e,oe+=o*Be,ye+=o*He,Se+=o*Le,je+=o*$e,L+=o*Fe,O+=o*gt,Y+=o*Ye,X+=o*ft,V+=o*dt,ne+=o*pt,te+=o*kt,se+=o*Pt,ue+=o*Lt,ie+=o*It,o=h[6],Re+=o*y,oe+=o*_e,ye+=o*Be,Se+=o*He,je+=o*Le,L+=o*$e,O+=o*Fe,Y+=o*gt,X+=o*Ye,V+=o*ft,ne+=o*dt,te+=o*pt,se+=o*kt,ue+=o*Pt,ie+=o*Lt,_+=o*It,o=h[7],oe+=o*y,ye+=o*_e,Se+=o*Be,je+=o*He,L+=o*Le,O+=o*$e,Y+=o*Fe,X+=o*gt,V+=o*Ye,ne+=o*ft,te+=o*dt,se+=o*pt,ue+=o*kt,ie+=o*Pt,_+=o*Lt,M+=o*It,o=h[8],ye+=o*y,Se+=o*_e,je+=o*Be,L+=o*He,O+=o*Le,Y+=o*$e,X+=o*Fe,V+=o*gt,ne+=o*Ye,te+=o*ft,se+=o*dt,ue+=o*pt,ie+=o*kt,_+=o*Pt,M+=o*Lt,B+=o*It,o=h[9],Se+=o*y,je+=o*_e,L+=o*Be,O+=o*He,Y+=o*Le,X+=o*$e,V+=o*Fe,ne+=o*gt,te+=o*Ye,se+=o*ft,ue+=o*dt,ie+=o*pt,_+=o*kt,M+=o*Pt,B+=o*Lt,U+=o*It,o=h[10],je+=o*y,L+=o*_e,O+=o*Be,Y+=o*He,X+=o*Le,V+=o*$e,ne+=o*Fe,te+=o*gt,se+=o*Ye,ue+=o*ft,ie+=o*dt,_+=o*pt,M+=o*kt,B+=o*Pt,U+=o*Lt,$+=o*It,o=h[11],L+=o*y,O+=o*_e,Y+=o*Be,X+=o*He,V+=o*Le,ne+=o*$e,te+=o*Fe,se+=o*gt,ue+=o*Ye,ie+=o*ft,_+=o*dt,M+=o*pt,B+=o*kt,U+=o*Pt,$+=o*Lt,K+=o*It,o=h[12],O+=o*y,Y+=o*_e,X+=o*Be,V+=o*He,ne+=o*Le,te+=o*$e,se+=o*Fe,ue+=o*gt,ie+=o*Ye,_+=o*ft,M+=o*dt,B+=o*pt,U+=o*kt,$+=o*Pt,K+=o*Lt,xe+=o*It,o=h[13],Y+=o*y,X+=o*_e,V+=o*Be,ne+=o*He,te+=o*Le,se+=o*$e,ue+=o*Fe,ie+=o*gt,_+=o*Ye,M+=o*ft,B+=o*dt,U+=o*pt,$+=o*kt,K+=o*Pt,xe+=o*Lt,Ce+=o*It,o=h[14],X+=o*y,V+=o*_e,ne+=o*Be,te+=o*He,se+=o*Le,ue+=o*$e,ie+=o*Fe,_+=o*gt,M+=o*Ye,B+=o*ft,U+=o*dt,$+=o*pt,K+=o*kt,xe+=o*Pt,Ce+=o*Lt,ze+=o*It,o=h[15],V+=o*y,ne+=o*_e,te+=o*Be,se+=o*He,ue+=o*Le,ie+=o*$e,_+=o*Fe,M+=o*gt,B+=o*Ye,U+=o*ft,$+=o*dt,K+=o*pt,xe+=o*kt,Ce+=o*Pt,ze+=o*Lt,Ee+=o*It,j+=38*ne,C+=38*te,A+=38*se,Q+=38*ue,fe+=38*ie,ae+=38*_,Re+=38*M,oe+=38*B,ye+=38*U,Se+=38*$,je+=38*K,L+=38*xe,O+=38*Ce,Y+=38*ze,X+=38*Ee,g=1,o=j+g+65535,g=Math.floor(o/65536),j=o-g*65536,o=C+g+65535,g=Math.floor(o/65536),C=o-g*65536,o=A+g+65535,g=Math.floor(o/65536),A=o-g*65536,o=Q+g+65535,g=Math.floor(o/65536),Q=o-g*65536,o=fe+g+65535,g=Math.floor(o/65536),fe=o-g*65536,o=ae+g+65535,g=Math.floor(o/65536),ae=o-g*65536,o=Re+g+65535,g=Math.floor(o/65536),Re=o-g*65536,o=oe+g+65535,g=Math.floor(o/65536),oe=o-g*65536,o=ye+g+65535,g=Math.floor(o/65536),ye=o-g*65536,o=Se+g+65535,g=Math.floor(o/65536),Se=o-g*65536,o=je+g+65535,g=Math.floor(o/65536),je=o-g*65536,o=L+g+65535,g=Math.floor(o/65536),L=o-g*65536,o=O+g+65535,g=Math.floor(o/65536),O=o-g*65536,o=Y+g+65535,g=Math.floor(o/65536),Y=o-g*65536,o=X+g+65535,g=Math.floor(o/65536),X=o-g*65536,o=V+g+65535,g=Math.floor(o/65536),V=o-g*65536,j+=g-1+37*(g-1),g=1,o=j+g+65535,g=Math.floor(o/65536),j=o-g*65536,o=C+g+65535,g=Math.floor(o/65536),C=o-g*65536,o=A+g+65535,g=Math.floor(o/65536),A=o-g*65536,o=Q+g+65535,g=Math.floor(o/65536),Q=o-g*65536,o=fe+g+65535,g=Math.floor(o/65536),fe=o-g*65536,o=ae+g+65535,g=Math.floor(o/65536),ae=o-g*65536,o=Re+g+65535,g=Math.floor(o/65536),Re=o-g*65536,o=oe+g+65535,g=Math.floor(o/65536),oe=o-g*65536,o=ye+g+65535,g=Math.floor(o/65536),ye=o-g*65536,o=Se+g+65535,g=Math.floor(o/65536),Se=o-g*65536,o=je+g+65535,g=Math.floor(o/65536),je=o-g*65536,o=L+g+65535,g=Math.floor(o/65536),L=o-g*65536,o=O+g+65535,g=Math.floor(o/65536),O=o-g*65536,o=Y+g+65535,g=Math.floor(o/65536),Y=o-g*65536,o=X+g+65535,g=Math.floor(o/65536),X=o-g*65536,o=V+g+65535,g=Math.floor(o/65536),V=o-g*65536,j+=g-1+37*(g-1),f[0]=j,f[1]=C,f[2]=A,f[3]=Q,f[4]=fe,f[5]=ae,f[6]=Re,f[7]=oe,f[8]=ye,f[9]=Se,f[10]=je,f[11]=L,f[12]=O,f[13]=Y,f[14]=X,f[15]=V}function ge(f,h){ke(f,h,h)}function at(f,h){var p=n(),o;for(o=0;o<16;o++)p[o]=h[o];for(o=253;o>=0;o--)ge(p,p),o!==2&&o!==4&&ke(p,p,h);for(o=0;o<16;o++)f[o]=p[o]}function Yt(f,h){var p=n(),o;for(o=0;o<16;o++)p[o]=h[o];for(o=250;o>=0;o--)ge(p,p),o!==1&&ke(p,p,h);for(o=0;o<16;o++)f[o]=p[o]}function Qt(f,h,p){var o=new Uint8Array(32),g=new Float64Array(80),j,C,A=n(),Q=n(),fe=n(),ae=n(),Re=n(),oe=n();for(C=0;C<31;C++)o[C]=h[C];for(o[31]=h[31]&127|64,o[0]&=248,Ue(g,p),C=0;C<16;C++)Q[C]=g[C],ae[C]=A[C]=fe[C]=0;for(A[0]=ae[0]=1,C=254;C>=0;--C)j=o[C>>>3]>>>(C&7)&1,H(A,Q,j),H(fe,ae,j),Xe(Re,A,fe),Ke(A,A,fe),Xe(fe,Q,ae),Ke(Q,Q,ae),ge(ae,Re),ge(oe,A),ke(A,fe,A),ke(fe,Q,Re),Xe(Re,A,fe),Ke(A,A,fe),ge(Q,A),Ke(fe,ae,oe),ke(A,fe,c),Xe(A,A,ae),ke(fe,fe,A),ke(A,ae,oe),ke(ae,Q,g),ge(Q,Re),H(A,Q,j),H(fe,ae,j);for(C=0;C<16;C++)g[C+16]=A[C],g[C+32]=fe[C],g[C+48]=Q[C],g[C+64]=ae[C];var ye=g.subarray(32),Se=g.subarray(16);return at(ye,ye),ke(Se,Se,ye),le(f,Se),0}function Ft(f,h){return Qt(f,h,a)}function R(f,h){return r(h,32),Ft(f,h)}function fn(f,h,p){var o=new Uint8Array(32);return Qt(o,p,h),I(f,s,o,D)}var dn=rt,pn=Ae;function ct(f,h,p,o,g,j){var C=new Uint8Array(32);return fn(C,g,j),dn(f,h,p,o,C)}function vr(f,h,p,o,g,j){var C=new Uint8Array(32);return fn(C,g,j),pn(f,h,p,o,C)}var Jn=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Sn(f,h,p,o){for(var g=new Int32Array(16),j=new Int32Array(16),C,A,Q,fe,ae,Re,oe,ye,Se,je,L,O,Y,X,V,ne,te,se,ue,ie,_,M,B,U,$,K,xe=f[0],Ce=f[1],ze=f[2],Ee=f[3],y=f[4],_e=f[5],Be=f[6],He=f[7],Le=h[0],$e=h[1],Fe=h[2],gt=h[3],Ye=h[4],ft=h[5],dt=h[6],pt=h[7],kt=0;o>=128;){for(ue=0;ue<16;ue++)ie=8*ue+kt,g[ue]=p[ie+0]<<24|p[ie+1]<<16|p[ie+2]<<8|p[ie+3],j[ue]=p[ie+4]<<24|p[ie+5]<<16|p[ie+6]<<8|p[ie+7];for(ue=0;ue<80;ue++)if(C=xe,A=Ce,Q=ze,fe=Ee,ae=y,Re=_e,oe=Be,ye=He,Se=Le,je=$e,L=Fe,O=gt,Y=Ye,X=ft,V=dt,ne=pt,_=He,M=pt,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=(y>>>14|Ye<<18)^(y>>>18|Ye<<14)^(Ye>>>9|y<<23),M=(Ye>>>14|y<<18)^(Ye>>>18|y<<14)^(y>>>9|Ye<<23),B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,_=y&_e^~y&Be,M=Ye&ft^~Ye&dt,B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,_=Jn[ue*2],M=Jn[ue*2+1],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,_=g[ue%16],M=j[ue%16],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,te=$&65535|K<<16,se=B&65535|U<<16,_=te,M=se,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=(xe>>>28|Le<<4)^(Le>>>2|xe<<30)^(Le>>>7|xe<<25),M=(Le>>>28|xe<<4)^(xe>>>2|Le<<30)^(xe>>>7|Le<<25),B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,_=xe&Ce^xe&ze^Ce&ze,M=Le&$e^Le&Fe^$e&Fe,B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,ye=$&65535|K<<16,ne=B&65535|U<<16,_=fe,M=O,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=te,M=se,B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,fe=$&65535|K<<16,O=B&65535|U<<16,Ce=C,ze=A,Ee=Q,y=fe,_e=ae,Be=Re,He=oe,xe=ye,$e=Se,Fe=je,gt=L,Ye=O,ft=Y,dt=X,pt=V,Le=ne,ue%16===15)for(ie=0;ie<16;ie++)_=g[ie],M=j[ie],B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=g[(ie+9)%16],M=j[(ie+9)%16],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,te=g[(ie+1)%16],se=j[(ie+1)%16],_=(te>>>1|se<<31)^(te>>>8|se<<24)^te>>>7,M=(se>>>1|te<<31)^(se>>>8|te<<24)^(se>>>7|te<<25),B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,te=g[(ie+14)%16],se=j[(ie+14)%16],_=(te>>>19|se<<13)^(se>>>29|te<<3)^te>>>6,M=(se>>>19|te<<13)^(te>>>29|se<<3)^(se>>>6|te<<26),B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,g[ie]=$&65535|K<<16,j[ie]=B&65535|U<<16;_=xe,M=Le,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[0],M=h[0],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[0]=xe=$&65535|K<<16,h[0]=Le=B&65535|U<<16,_=Ce,M=$e,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[1],M=h[1],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[1]=Ce=$&65535|K<<16,h[1]=$e=B&65535|U<<16,_=ze,M=Fe,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[2],M=h[2],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[2]=ze=$&65535|K<<16,h[2]=Fe=B&65535|U<<16,_=Ee,M=gt,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[3],M=h[3],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[3]=Ee=$&65535|K<<16,h[3]=gt=B&65535|U<<16,_=y,M=Ye,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[4],M=h[4],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[4]=y=$&65535|K<<16,h[4]=Ye=B&65535|U<<16,_=_e,M=ft,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[5],M=h[5],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[5]=_e=$&65535|K<<16,h[5]=ft=B&65535|U<<16,_=Be,M=dt,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[6],M=h[6],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[6]=Be=$&65535|K<<16,h[6]=dt=B&65535|U<<16,_=He,M=pt,B=M&65535,U=M>>>16,$=_&65535,K=_>>>16,_=f[7],M=h[7],B+=M&65535,U+=M>>>16,$+=_&65535,K+=_>>>16,U+=B>>>16,$+=U>>>16,K+=$>>>16,f[7]=He=$&65535|K<<16,h[7]=pt=B&65535|U<<16,kt+=128,o-=128}return o}function Jt(f,h,p){var o=new Int32Array(8),g=new Int32Array(8),j=new Uint8Array(256),C,A=p;for(o[0]=1779033703,o[1]=3144134277,o[2]=1013904242,o[3]=2773480762,o[4]=1359893119,o[5]=2600822924,o[6]=528734635,o[7]=1541459225,g[0]=4089235720,g[1]=2227873595,g[2]=4271175723,g[3]=1595750129,g[4]=2917565137,g[5]=725511199,g[6]=4215389547,g[7]=327033209,Sn(o,g,h,p),p%=128,C=0;C<p;C++)j[C]=h[A-p+C];for(j[p]=128,p=256-128*(p<112?1:0),j[p-9]=0,P(j,p-8,A/536870912|0,A<<3),Sn(o,g,j,p),C=0;C<8;C++)P(f,8*C,o[C],g[C]);return 0}function hn(f,h){var p=n(),o=n(),g=n(),j=n(),C=n(),A=n(),Q=n(),fe=n(),ae=n();Ke(p,f[1],f[0]),Ke(ae,h[1],h[0]),ke(p,p,ae),Xe(o,f[0],f[1]),Xe(ae,h[0],h[1]),ke(o,o,ae),ke(g,f[3],h[3]),ke(g,g,m),ke(j,f[2],h[2]),Xe(j,j,j),Ke(C,o,p),Ke(A,j,g),Xe(Q,j,g),Xe(fe,o,p),ke(f[0],C,A),ke(f[1],fe,Q),ke(f[2],Q,A),ke(f[3],C,fe)}function On(f,h,p){var o;for(o=0;o<4;o++)H(f[o],h[o],p)}function jn(f,h){var p=n(),o=n(),g=n();at(g,h[2]),ke(p,h[0],g),ke(o,h[1],g),le(f,o),f[31]^=Ie(p)<<7}function Tn(f,h,p){var o,g;for(Te(f[0],i),Te(f[1],u),Te(f[2],u),Te(f[3],i),g=255;g>=0;--g)o=p[g/8|0]>>(g&7)&1,On(f,h,o),hn(h,f),hn(f,f),On(f,h,o)}function Nn(f,h){var p=[n(),n(),n(),n()];Te(p[0],k),Te(p[1],x),Te(p[2],u),ke(p[3],k,x),Tn(f,p,h)}function Cn(f,h,p){var o=new Uint8Array(64),g=[n(),n(),n(),n()],j;for(p||r(h,32),Jt(o,h,32),o[0]&=248,o[31]&=127,o[31]|=64,Nn(g,o),jn(f,g),j=0;j<32;j++)h[j+32]=f[j];return 0}var Xt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function En(f,h){var p,o,g,j;for(o=63;o>=32;--o){for(p=0,g=o-32,j=o-12;g<j;++g)h[g]+=p-16*h[o]*Xt[g-(o-32)],p=Math.floor((h[g]+128)/256),h[g]-=p*256;h[g]+=p,h[o]=0}for(p=0,g=0;g<32;g++)h[g]+=p-(h[31]>>4)*Xt[g],p=h[g]>>8,h[g]&=255;for(g=0;g<32;g++)h[g]-=p*Xt[g];for(o=0;o<32;o++)h[o+1]+=h[o]>>8,f[o]=h[o]&255}function re(f){var h=new Float64Array(64),p;for(p=0;p<64;p++)h[p]=f[p];for(p=0;p<64;p++)f[p]=0;En(f,h)}function me(f,h,p,o){var g=new Uint8Array(64),j=new Uint8Array(64),C=new Uint8Array(64),A,Q,fe=new Float64Array(64),ae=[n(),n(),n(),n()];Jt(g,o,32),g[0]&=248,g[31]&=127,g[31]|=64;var Re=p+64;for(A=0;A<p;A++)f[64+A]=h[A];for(A=0;A<32;A++)f[32+A]=g[32+A];for(Jt(C,f.subarray(32),p+32),re(C),Nn(ae,C),jn(f,ae),A=32;A<64;A++)f[A]=o[A];for(Jt(j,f,p+64),re(j),A=0;A<64;A++)fe[A]=0;for(A=0;A<32;A++)fe[A]=C[A];for(A=0;A<32;A++)for(Q=0;Q<32;Q++)fe[A+Q]+=j[A]*g[Q];return En(f.subarray(32),fe),Re}function W(f,h){var p=n(),o=n(),g=n(),j=n(),C=n(),A=n(),Q=n();return Te(f[2],u),Ue(f[1],h),ge(g,f[1]),ke(j,g,d),Ke(g,g,f[2]),Xe(j,f[2],j),ge(C,j),ge(A,C),ke(Q,A,C),ke(p,Q,g),ke(p,p,j),Yt(p,p),ke(p,p,g),ke(p,p,j),ke(p,p,j),ke(f[0],p,j),ge(o,f[0]),ke(o,o,j),de(o,g)&&ke(f[0],f[0],E),ge(o,f[0]),ke(o,o,j),de(o,g)?-1:(Ie(f[0])===h[31]>>7&&Ke(f[0],i,f[0]),ke(f[3],f[0],f[1]),0)}function T(f,h,p,o){var g,j=new Uint8Array(32),C=new Uint8Array(64),A=[n(),n(),n(),n()],Q=[n(),n(),n(),n()];if(p<64||W(Q,o))return-1;for(g=0;g<p;g++)f[g]=h[g];for(g=0;g<32;g++)f[g+32]=o[g];if(Jt(C,f,p),re(C),Tn(A,Q,C),Nn(Q,h.subarray(32)),hn(A,Q),jn(j,A),p-=64,b(h,0,j,0)){for(g=0;g<p;g++)f[g]=0;return-1}for(g=0;g<p;g++)f[g]=h[g+64];return p}var ee=32,ve=24,qe=32,Z=16,we=32,be=32,Me=32,yt=32,et=32,Rn=ve,Ai=qe,Ui=Z,rn=64,Dn=32,gn=64,An=32,fs=64;t.lowlevel={crypto_core_hsalsa20:I,crypto_stream_xor:he,crypto_stream:Pe,crypto_stream_salsa20_xor:F,crypto_stream_salsa20:q,crypto_onetimeauth:Ge,crypto_onetimeauth_verify:xt,crypto_verify_16:G,crypto_verify_32:b,crypto_secretbox:rt,crypto_secretbox_open:Ae,crypto_scalarmult:Qt,crypto_scalarmult_base:Ft,crypto_box_beforenm:fn,crypto_box_afternm:dn,crypto_box:ct,crypto_box_open:vr,crypto_box_keypair:R,crypto_hash:Jt,crypto_sign:me,crypto_sign_keypair:Cn,crypto_sign_open:T,crypto_secretbox_KEYBYTES:ee,crypto_secretbox_NONCEBYTES:ve,crypto_secretbox_ZEROBYTES:qe,crypto_secretbox_BOXZEROBYTES:Z,crypto_scalarmult_BYTES:we,crypto_scalarmult_SCALARBYTES:be,crypto_box_PUBLICKEYBYTES:Me,crypto_box_SECRETKEYBYTES:yt,crypto_box_BEFORENMBYTES:et,crypto_box_NONCEBYTES:Rn,crypto_box_ZEROBYTES:Ai,crypto_box_BOXZEROBYTES:Ui,crypto_sign_BYTES:rn,crypto_sign_PUBLICKEYBYTES:Dn,crypto_sign_SECRETKEYBYTES:gn,crypto_sign_SEEDBYTES:An,crypto_hash_BYTES:fs,gf:n,D:d,L:Xt,pack25519:le,unpack25519:Ue,M:ke,A:Xe,S:ge,Z:Ke,pow2523:Yt,add:hn,set25519:Te,modL:En,scalarmult:Tn,scalarbase:Nn};function Xn(f,h){if(f.length!==ee)throw new Error("bad key size");if(h.length!==ve)throw new Error("bad nonce size")}function fa(f,h){if(f.length!==Me)throw new Error("bad public key size");if(h.length!==yt)throw new Error("bad secret key size")}function zt(){for(var f=0;f<arguments.length;f++)if(!(arguments[f]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function ds(f){for(var h=0;h<f.length;h++)f[h]=0}t.randomBytes=function(f){var h=new Uint8Array(f);return r(h,f),h},t.secretbox=function(f,h,p){zt(f,h,p),Xn(p,h);for(var o=new Uint8Array(qe+f.length),g=new Uint8Array(o.length),j=0;j<f.length;j++)o[j+qe]=f[j];return rt(g,o,o.length,h,p),g.subarray(Z)},t.secretbox.open=function(f,h,p){zt(f,h,p),Xn(p,h);for(var o=new Uint8Array(Z+f.length),g=new Uint8Array(o.length),j=0;j<f.length;j++)o[j+Z]=f[j];return o.length<32||Ae(g,o,o.length,h,p)!==0?null:g.subarray(qe)},t.secretbox.keyLength=ee,t.secretbox.nonceLength=ve,t.secretbox.overheadLength=Z,t.scalarMult=function(f,h){if(zt(f,h),f.length!==be)throw new Error("bad n size");if(h.length!==we)throw new Error("bad p size");var p=new Uint8Array(we);return Qt(p,f,h),p},t.scalarMult.base=function(f){if(zt(f),f.length!==be)throw new Error("bad n size");var h=new Uint8Array(we);return Ft(h,f),h},t.scalarMult.scalarLength=be,t.scalarMult.groupElementLength=we,t.box=function(f,h,p,o){var g=t.box.before(p,o);return t.secretbox(f,h,g)},t.box.before=function(f,h){zt(f,h),fa(f,h);var p=new Uint8Array(et);return fn(p,f,h),p},t.box.after=t.secretbox,t.box.open=function(f,h,p,o){var g=t.box.before(p,o);return t.secretbox.open(f,h,g)},t.box.open.after=t.secretbox.open,t.box.keyPair=function(){var f=new Uint8Array(Me),h=new Uint8Array(yt);return R(f,h),{publicKey:f,secretKey:h}},t.box.keyPair.fromSecretKey=function(f){if(zt(f),f.length!==yt)throw new Error("bad secret key size");var h=new Uint8Array(Me);return Ft(h,f),{publicKey:h,secretKey:new Uint8Array(f)}},t.box.publicKeyLength=Me,t.box.secretKeyLength=yt,t.box.sharedKeyLength=et,t.box.nonceLength=Rn,t.box.overheadLength=t.secretbox.overheadLength,t.sign=function(f,h){if(zt(f,h),h.length!==gn)throw new Error("bad secret key size");var p=new Uint8Array(rn+f.length);return me(p,f,f.length,h),p},t.sign.open=function(f,h){if(zt(f,h),h.length!==Dn)throw new Error("bad public key size");var p=new Uint8Array(f.length),o=T(p,f,f.length,h);if(o<0)return null;for(var g=new Uint8Array(o),j=0;j<g.length;j++)g[j]=p[j];return g},t.sign.detached=function(f,h){for(var p=t.sign(f,h),o=new Uint8Array(rn),g=0;g<o.length;g++)o[g]=p[g];return o},t.sign.detached.verify=function(f,h,p){if(zt(f,h,p),h.length!==rn)throw new Error("bad signature size");if(p.length!==Dn)throw new Error("bad public key size");var o=new Uint8Array(rn+f.length),g=new Uint8Array(rn+f.length),j;for(j=0;j<rn;j++)o[j]=h[j];for(j=0;j<f.length;j++)o[j+rn]=f[j];return T(g,o,o.length,p)>=0},t.sign.keyPair=function(){var f=new Uint8Array(Dn),h=new Uint8Array(gn);return Cn(f,h),{publicKey:f,secretKey:h}},t.sign.keyPair.fromSecretKey=function(f){if(zt(f),f.length!==gn)throw new Error("bad secret key size");for(var h=new Uint8Array(Dn),p=0;p<h.length;p++)h[p]=f[32+p];return{publicKey:h,secretKey:new Uint8Array(f)}},t.sign.keyPair.fromSeed=function(f){if(zt(f),f.length!==An)throw new Error("bad seed size");for(var h=new Uint8Array(Dn),p=new Uint8Array(gn),o=0;o<32;o++)p[o]=f[o];return Cn(h,p,!0),{publicKey:h,secretKey:p}},t.sign.publicKeyLength=Dn,t.sign.secretKeyLength=gn,t.sign.seedLength=An,t.sign.signatureLength=rn,t.hash=function(f){zt(f);var h=new Uint8Array(fs);return Jt(h,f,f.length),h},t.hash.hashLength=fs,t.verify=function(f,h){return zt(f,h),f.length===0||h.length===0||f.length!==h.length?!1:z(f,0,h,0,f.length)===0},t.setPRNG=function(f){r=f},function(){var f=typeof self<"u"?self.crypto||self.msCrypto:null;if(f&&f.getRandomValues){var h=65536;t.setPRNG(function(p,o){var g,j=new Uint8Array(o);for(g=0;g<o;g+=h)f.getRandomValues(j.subarray(g,g+Math.min(o-g,h)));for(g=0;g<o;g++)p[g]=j[g];ds(j)})}else typeof t1<"u"&&(f=s1,f&&f.randomBytes&&t.setPRNG(function(p,o){var g,j=f.randomBytes(o);for(g=0;g<o;g++)p[g]=j[g];ds(j)}))}()})(e.exports?e.exports:self.nacl=self.nacl||{})})(xp);var a1=xp.exports;const vp=Vc(a1);var yp={exports:{}};(function(e){(function(t,n){e.exports?e.exports=n():(t.nacl||(t.nacl={}),t.nacl.util=n())})(Ip,function(){var t={};function n(r){if(!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r))throw new TypeError("invalid encoding")}return t.decodeUTF8=function(r){if(typeof r!="string")throw new TypeError("expected string");var s,a=unescape(encodeURIComponent(r)),i=new Uint8Array(a.length);for(s=0;s<a.length;s++)i[s]=a.charCodeAt(s);return i},t.encodeUTF8=function(r){var s,a=[];for(s=0;s<r.length;s++)a.push(String.fromCharCode(r[s]));return decodeURIComponent(escape(a.join("")))},typeof atob>"u"?typeof Buffer.from<"u"?(t.encodeBase64=function(r){return Buffer.from(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(Buffer.from(r,"base64"),0))}):(t.encodeBase64=function(r){return new Buffer(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(new Buffer(r,"base64"),0))}):(t.encodeBase64=function(r){var s,a=[],i=r.length;for(s=0;s<i;s++)a.push(String.fromCharCode(r[s]));return btoa(a.join(""))},t.decodeBase64=function(r){n(r);var s,a=atob(r),i=new Uint8Array(a.length);for(s=0;s<a.length;s++)i[s]=a.charCodeAt(s);return i}),t})})(yp);var hi=yp.exports;const kp="hotline-identity";function wp(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}function i1(){const e=vp.sign.keyPair();return{publicKey:e.publicKey,secretKey:e.secretKey}}function o1(e){const t={publicKey:hi.encodeBase64(e.publicKey),secretKey:hi.encodeBase64(e.secretKey)};localStorage.setItem(kp,JSON.stringify(t))}function l1(){const e=localStorage.getItem(kp);if(!e)return null;try{const t=JSON.parse(e);return{publicKey:hi.decodeBase64(t.publicKey),secretKey:hi.decodeBase64(t.secretKey)}}catch{return null}}function u1(){const e=l1();if(e)return e;const t=i1();return o1(t),t}function pl(e,t){const n=new TextEncoder().encode(e),r=vp.sign.detached(n,t);return wp(r)}function gi(e){return wp(e.publicKey)}function c1(){const[e]=S.useState(()=>u1());return{identity:e,publicKeyHex:gi(e)}}function We(e,t){return{type:e,id:crypto.randomUUID(),timestamp:Date.now(),payload:t}}function f1({identity:e,onError:t}){const n=S.useRef(null),r=S.useRef(null),s=S.useRef(0),a=S.useRef(""),i=S.useRef(""),[u,c]=S.useState("disconnected"),[d,m]=S.useState(null),[k,x]=S.useState([]),[E,P]=S.useState([]),[z,G]=S.useState([]),[b,v]=S.useState([]),[w,N]=S.useState([]),[I,D]=S.useState([]),[F,q]=S.useState([]),[Pe,he]=S.useState([]),[De,Ge]=S.useState(0),[xt,rt]=S.useState(!1),[Ae,Te]=S.useState(!0),Je=S.useCallback(W=>{var ee,ve,qe;const T=JSON.parse(W.data);switch(T.type){case"auth.nonce":{const{nonce:Z}=T.payload;c("authenticating");const we=pl(Z,e.secretKey),be=We("auth",{publicKey:gi(e),signature:we,nonce:Z,nickname:i.current});(ee=n.current)==null||ee.send(JSON.stringify(be));break}case"auth.ok":{const Z=T.payload;c("connected"),m({name:Z.serverName,motd:Z.motd,userId:Z.userId,role:Z.role});const we=We("channel.list",{});(ve=n.current)==null||ve.send(JSON.stringify(we));const be=We("user.list",{});(qe=n.current)==null||qe.send(JSON.stringify(be));break}case"auth.error":{const{reason:Z}=T.payload;t==null||t(Z);break}case"chat.message":{const Z=T.payload;x(we=>we.some(be=>be.id===T.id)?we:[...we,{id:T.id,channel:Z.channel,userId:Z.userId,nickname:Z.nickname,content:Z.content,role:Z.role,timestamp:T.timestamp,replyTo:Z.replyTo}].sort((be,Me)=>be.timestamp-Me.timestamp));break}case"channel.list":{const{channels:Z}=T.payload;v(Z||[]);break}case"user.list":{const{users:Z}=T.payload;N(Z||[]);break}case"user.joined":{const Z=T.payload;N(we=>[...we.filter(Me=>Me.userId!==Z.userId),{...Z,status:"online"}]);break}case"user.left":{const Z=T.payload;N(we=>we.filter(be=>be.userId!==Z.userId));break}case"user.role_changed":{const{userId:Z,role:we}=T.payload;N(be=>be.map(Me=>Me.userId===Z?{...Me,role:we}:Me));break}case"dm.message":{const Z=T.payload;P(we=>we.some(be=>be.id===T.id)?we:[...we,{id:T.id,from:Z.from,to:Z.to,nickname:Z.nickname,content:Z.content,role:Z.role,timestamp:T.timestamp}].sort((be,Me)=>be.timestamp-Me.timestamp));break}case"typing":{const Z=T.payload;G(we=>[...we.filter(Me=>Me.userId!==Z.userId||Me.channel!==Z.channel),{...Z,expiry:Date.now()+3e3}]);break}case"chat.search_results":{const Z=T.payload;D(Z.results||[]);break}case"chat.edited":{const Z=T.payload;x(we=>we.map(be=>be.id===Z.messageId?{...be,content:Z.content,edited:!0}:be));break}case"chat.deleted":{const Z=T.payload;x(we=>we.filter(be=>be.id!==Z.messageId));break}case"reaction.updated":{const Z=T.payload;x(we=>we.map(be=>{if(be.id!==Z.messageId)return be;const Me=[...be.reactions||[]],yt=Me.findIndex(et=>et.emoji===Z.emoji);if(Z.action==="add")yt>=0?Me[yt].users.includes(Z.userId)||(Me[yt]={...Me[yt],users:[...Me[yt].users,Z.userId]}):Me.push({emoji:Z.emoji,users:[Z.userId]});else if(yt>=0){const et=Me[yt].users.filter(Rn=>Rn!==Z.userId);et.length===0?Me.splice(yt,1):Me[yt]={...Me[yt],users:et}}return{...be,reactions:Me}}));break}case"pin.added":break;case"pin.removed":{q(Z=>Z.filter(we=>we.id!==T.payload.messageId));break}case"pin.list":{const Z=T.payload;q(Z.messages||[]);break}case"user.nick_changed":{const Z=T.payload;N(we=>we.map(be=>be.userId===Z.userId?{...be,nickname:Z.newNick}:be));break}case"server.settings_updated":{const Z=T.payload;m(we=>we&&{...we,name:Z.serverName,motd:Z.motd});break}case"user.status_changed":{const Z=T.payload;N(we=>we.map(be=>be.userId===Z.userId?{...be,status:Z.status}:be));break}case"channel.members":{const Z=T.payload;he(Z.members||[]);break}case"chat.history":{const Z=T.payload;rt(!1),Te(Z.hasMore),Z.messages&&Z.messages.length>0&&x(we=>{const be=Z.messages.map(et=>({id:et.id,channel:et.payload.channel,userId:et.payload.userId,nickname:et.payload.nickname,content:et.payload.content,role:et.payload.role,timestamp:et.timestamp,replyTo:et.payload.replyTo})),Me=new Set(we.map(et=>et.id));return[...be.filter(et=>!Me.has(et.id)),...we].sort((et,Rn)=>et.timestamp-Rn.timestamp)});break}case"error":{const Z=T.payload;t==null||t(Z.message);break}}},[e,t]),H=S.useCallback((W,T)=>{n.current&&n.current.close(),a.current=W,i.current=T,c("connecting"),x([]);const ee=W.startsWith("wss://")?"":"ws://",ve=W.includes("://")?W:`${ee}${W}/ws`,qe=new WebSocket(ve);n.current=qe,qe.onopen=()=>{s.current=0,Ge(0)},qe.onmessage=Je,qe.onclose=()=>{if(a.current){const Z=s.current,we=Math.min(1e3*Math.pow(2,Z),3e4);s.current=Z+1,c("reconnecting"),Ge(Math.round(we/1e3));const be=window.setInterval(()=>{Ge(Me=>Me<=1?(clearInterval(be),0):Me-1)},1e3);r.current=window.setTimeout(()=>{clearInterval(be),a.current&&H(a.current,i.current)},we)}else c("disconnected")},qe.onerror=()=>{t==null||t("Connection error")}},[Je,t]),le=S.useCallback(()=>{a.current="",r.current&&(clearTimeout(r.current),r.current=null),n.current&&(n.current.close(),n.current=null),c("disconnected"),m(null),x([]),P([]),G([]),v([]),N([])},[]),de=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("chat.send",{channel:W,content:T});n.current.send(JSON.stringify(ve))}},[]),Ie=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve={channel:W};T&&(ve.password=T);const qe=We("channel.join",ve);n.current.send(JSON.stringify(qe))}},[]),Ue=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("channel.leave",{channel:W});n.current.send(JSON.stringify(ee))}},[]),Xe=S.useCallback((W,T,ee)=>{var ve;if(((ve=n.current)==null?void 0:ve.readyState)===WebSocket.OPEN){const qe=We("channel.create",{name:W,topic:T,password:ee||""});n.current.send(JSON.stringify(qe))}},[]),Ke=S.useCallback(()=>{var W;if(((W=n.current)==null?void 0:W.readyState)===WebSocket.OPEN){const T=We("user.list",{});n.current.send(JSON.stringify(T))}},[]),ke=S.useCallback(()=>{var W;if(((W=n.current)==null?void 0:W.readyState)===WebSocket.OPEN){const T=We("channel.list",{});n.current.send(JSON.stringify(T))}},[]),ge=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("admin.kick",{userId:W});n.current.send(JSON.stringify(ee))}},[]),at=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("admin.ban",{userId:W});n.current.send(JSON.stringify(ee))}},[]),Yt=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("admin.op",{userId:W,role:T});n.current.send(JSON.stringify(ve))}},[]),Qt=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("admin.topic",{channel:W,topic:T});n.current.send(JSON.stringify(ve))}},[]),Ft=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("dm.send",{targetId:W,content:T});n.current.send(JSON.stringify(ve))}},[]),R=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("typing",{channel:W,targetId:T||""});n.current.send(JSON.stringify(ve))}},[]),fn=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("channel.delete",{name:W});n.current.send(JSON.stringify(ee))}},[]),dn=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("chat.search",{query:W,channel:T||""});n.current.send(JSON.stringify(ve))}},[]),pn=S.useCallback(()=>{D([])},[]),ct=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("chat.edit",{messageId:W,content:T});n.current.send(JSON.stringify(ve))}},[]),vr=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("chat.delete",{messageId:W});n.current.send(JSON.stringify(ee))}},[]),Jn=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("reaction.add",{messageId:W,emoji:T});n.current.send(JSON.stringify(ve))}},[]),Sn=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("reaction.remove",{messageId:W,emoji:T});n.current.send(JSON.stringify(ve))}},[]),Jt=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("pin.add",{messageId:W,channel:T});n.current.send(JSON.stringify(ve))}},[]),hn=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("pin.remove",{messageId:W,channel:T});n.current.send(JSON.stringify(ve))}},[]),On=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("pin.list",{channel:W});n.current.send(JSON.stringify(ee))}},[]),jn=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("user.nick",{nickname:W});n.current.send(JSON.stringify(ee))}},[]),Tn=S.useCallback((W,T,ee)=>{var ve;if(((ve=n.current)==null?void 0:ve.readyState)===WebSocket.OPEN){const qe=We("chat.send",{channel:W,content:T,replyTo:ee});n.current.send(JSON.stringify(qe))}},[]),Nn=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){const ve=We("admin.settings",{serverName:W,motd:T});n.current.send(JSON.stringify(ve))}},[]),Cn=S.useCallback(()=>{var W;if(((W=n.current)==null?void 0:W.readyState)===WebSocket.OPEN){const T=We("admin.banlist",{});n.current.send(JSON.stringify(T))}},[]),Xt=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("admin.unban",{publicKey:W});n.current.send(JSON.stringify(ee))}},[]),En=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("user.status",{status:W});n.current.send(JSON.stringify(ee))}},[]),re=S.useCallback(W=>{var T;if(((T=n.current)==null?void 0:T.readyState)===WebSocket.OPEN){const ee=We("channel.members",{channel:W});n.current.send(JSON.stringify(ee))}},[]),me=S.useCallback((W,T)=>{var ee;if(((ee=n.current)==null?void 0:ee.readyState)===WebSocket.OPEN){rt(!0);const ve=We("chat.history",{channel:W,before:T,limit:50});n.current.send(JSON.stringify(ve))}},[]);return S.useEffect(()=>{const W=setInterval(()=>{G(T=>T.filter(ee=>ee.expiry>Date.now()))},1e3);return()=>clearInterval(W)},[]),S.useEffect(()=>()=>{r.current&&clearTimeout(r.current),n.current&&n.current.close()},[]),{status:u,serverInfo:d,messages:k,dmMessages:E,typingUsers:z,channels:b,users:w,searchResults:I,pinnedMessages:F,channelMembers:Pe,reconnectIn:De,historyLoading:xt,hasMoreHistory:Ae,connect:H,disconnect:le,sendChat:de,sendDM:Ft,sendTyping:R,joinChannel:Ie,leaveChannel:Ue,createChannel:Xe,deleteChannel:fn,requestUserList:Ke,requestChannelList:ke,kickUser:ge,banUser:at,setUserRole:Yt,setTopic:Qt,search:dn,clearSearch:pn,editMessage:ct,deleteMessage:vr,addReaction:Jn,removeReaction:Sn,pinMessage:Jt,unpinMessage:hn,requestPins:On,changeNickname:jn,sendChatWithReply:Tn,updateServerSettings:Nn,requestBanList:Cn,unbanUser:Xt,setStatus:En,requestChannelMembers:re,loadHistory:me}}const bp="hotline_muted_channels";function d1(){try{const e=localStorage.getItem(bp);return e?JSON.parse(e):[]}catch{return[]}}function p1(e){localStorage.setItem(bp,JSON.stringify(e))}function h1(){const[e,t]=S.useState(d1),n=S.useCallback(s=>{t(a=>{const i=a.includes(s)?a.filter(u=>u!==s):[...a,s];return p1(i),i})},[]),r=S.useCallback(s=>e.includes(s),[e]);return{mutedChannels:e,toggleMute:n,isMuted:r}}function g1({timeout:e,onIdle:t,onActive:n,enabled:r}){const s=S.useRef(null),a=S.useRef(!1),i=S.useCallback(()=>{r&&(s.current&&clearTimeout(s.current),a.current&&(a.current=!1,n()),s.current=setTimeout(()=>{a.current=!0,t()},e))},[e,t,n,r]);S.useEffect(()=>{if(!r)return;const u=["mousedown","mousemove","keydown","scroll","touchstart","pointerdown"];return u.forEach(c=>document.addEventListener(c,i,{passive:!0})),i(),()=>{u.forEach(c=>document.removeEventListener(c,i)),s.current&&clearTimeout(s.current)}},[i,r])}const m1="Hotline Modern";function x1(e){const t=S.useRef(m1);S.useEffect(()=>(e>0?document.title=`(${e}) ${t.current}`:document.title=t.current,()=>{document.title=t.current}),[e]),S.useEffect(()=>{if(e===0||!document.hidden)return;let n=!0;const r=setInterval(()=>{document.title=n?`(${e}) ${t.current}`:"💬 New messages",n=!n},1500),s=()=>{document.hidden||(clearInterval(r),document.title=e>0?`(${e}) ${t.current}`:t.current)};return document.addEventListener("visibilitychange",s),()=>{clearInterval(r),document.removeEventListener("visibilitychange",s)}},[e])}const zc="hotline_compact_mode";function v1(){const[e,t]=S.useState(()=>{try{return localStorage.getItem(zc)==="true"}catch{return!1}});return S.useEffect(()=>{localStorage.setItem(zc,String(e)),e?document.documentElement.setAttribute("data-density","compact"):document.documentElement.removeAttribute("data-density")},[e]),{compact:e,toggleCompact:()=>t(r=>!r)}}function y1(){var fa,zt,ds,f,h,p,o,g,j,C,A,Q,fe,ae,Re,oe,ye,Se,je;const{t:e}=ut(),{identity:t}=c1(),[n,r]=S.useState("lobby"),[s,a]=S.useState(""),[i,u]=S.useState(""),[c,d]=S.useState(null),[m,k]=S.useState(!0),[x,E]=S.useState(!1),[P,z]=S.useState(!1),[G,b]=S.useState(!1),[v,w]=S.useState(!1),[N,I]=S.useState(!1),[D,F]=S.useState(!1),[q,Pe]=S.useState(!1),[he,De]=S.useState(null),[Ge,xt]=S.useState(null),[rt,Ae]=S.useState(Ri),[Te,Je]=S.useState(null),[H,le]=S.useState({}),[de,Ie]=S.useState({}),[Ue,Xe]=S.useState(U0),[Ke,ke]=S.useState(null),ge=S.useRef(0),at=S.useRef(0),Yt=S.useRef(n),Qt=S.useRef(s),Ft=S.useCallback(L=>{d(L),setTimeout(()=>d(null),5e3)},[]),R=f1({identity:t,onError:Ft}),{mutedChannels:fn,toggleMute:dn,isMuted:pn}=h1(),{compact:ct,toggleCompact:vr}=v1(),{toasts:Jn,addToast:Sn,dismissToast:Jt}=e1(),hn=S.useMemo(()=>Object.values(H).reduce((L,O)=>L+O,0)+Object.values(de).reduce((L,O)=>L+O,0),[H,de]);x1(hn);const On=S.useRef([]);S.useEffect(()=>{if(R.status!=="connected")return;const L=R.users.map(X=>X.userId),O=On.current,Y=O.map(X=>X.id);if(Y.length>0){for(const X of R.users)Y.includes(X.userId)||Sn("join",`${X.nickname} joined`);for(const X of O)L.includes(X.id)||Sn("leave",`${X.nick} left`)}On.current=R.users.map(X=>({id:X.userId,nick:X.nickname}))},[R.users,R.status,Sn]),g1({timeout:5*60*1e3,onIdle:S.useCallback(()=>{var O;const L=(O=R.users.find(Y=>{var X;return Y.userId===((X=R.serverInfo)==null?void 0:X.userId)}))==null?void 0:O.status;L&&L!=="away"&&(ke(L),R.setStatus("away"))},[R]),onActive:S.useCallback(()=>{Ke&&(R.setStatus(Ke),ke(null))},[R,Ke]),enabled:R.status==="connected"});const jn=(L,O)=>{u(L),R.connect(L,O)},Tn=L=>{const O=R.channels.find(Y=>Y.name===L);if(O!=null&&O.hasPassword&&L!==n){De(L);return}a(""),r(L),R.joinChannel(L)},Nn=L=>{he&&(a(""),r(he),R.joinChannel(he,L),De(null))},Cn=L=>{a(L),Ie(O=>({...O,[L]:0}))},Xt=L=>{R.deleteChannel(L),n===L&&(r("lobby"),R.joinChannel("lobby"))},En=()=>{E(!0)},re=(L,O,Y)=>{R.createChannel(L,O,Y),setTimeout(()=>{qe(L),R.requestChannelList()},300)},me=S.useCallback((L,O)=>{const Y=X=>R.users.find(V=>V.nickname.toLowerCase()===X.toLowerCase());switch(L){case"kick":{const X=Y(O[0]||"");X&&R.kickUser(X.userId);break}case"ban":{const X=Y(O[0]||"");X&&R.banUser(X.userId);break}case"op":{const X=Y(O[0]||"");X&&R.setUserRole(X.userId,"operator");break}case"deop":{const X=Y(O[0]||"");X&&R.setUserRole(X.userId,"member");break}case"topic":{const X=O.join(" ");X&&R.setTopic(n,X);break}}},[R,n]),W=S.useRef(Ue);S.useEffect(()=>{W.current=Ue},[Ue]);const T=S.useCallback(()=>{if(W.current.soundEnabled)try{const L=new AudioContext,O=L.createOscillator(),Y=L.createGain();O.connect(Y),Y.connect(L.destination),O.frequency.value=880,O.type="sine",Y.gain.value=.08,Y.gain.exponentialRampToValueAtTime(.001,L.currentTime+.15),O.start(),O.stop(L.currentTime+.15)}catch{}},[]);S.useEffect(()=>{Yt.current=n},[n]),S.useEffect(()=>{Qt.current=s},[s]),S.useEffect(()=>{var L;if(R.messages.length>ge.current){const O=R.messages.slice(ge.current),Y=Yt.current,X=(L=R.serverInfo)==null?void 0:L.userId;let V=!1;if(le(ne=>{const te={...ne};for(const se of O)se.channel!==Y&&se.userId!==X&&(te[se.channel]=(te[se.channel]||0)+1,pn(se.channel)||(V=!0));return te}),V){T();const ne=O[O.length-1];ne&&ne.userId!==X&&!pn(ne.channel)&&ee(ne.nickname,ne.content)}}ge.current=R.messages.length},[R.messages,pn]),S.useEffect(()=>{var L;if(R.dmMessages.length>at.current){const O=R.dmMessages.slice(at.current),Y=(L=R.serverInfo)==null?void 0:L.userId,X=Qt.current;for(const V of O){const ne=V.from===Y?V.to:V.from;ne!==X&&V.from!==Y&&(Ie(te=>({...te,[ne]:(te[ne]||0)+1})),T(),ee(V.nickname,V.content))}}at.current=R.dmMessages.length},[R.dmMessages]);const ee=S.useCallback((L,O)=>{if(W.current.desktopEnabled&&"Notification"in window){if(Notification.permission==="default"){Notification.requestPermission();return}Notification.permission==="granted"&&document.hidden&&new Notification(L,{body:O,icon:"/logo.svg"})}},[]),ve=S.useMemo(()=>{var Y,X;const L=(Y=R.serverInfo)==null?void 0:Y.userId;if(!L)return[];const O=new Map;for(const V of R.dmMessages){const ne=V.from===L?V.to:V.from,te=V.from===L?((X=R.users.find(ue=>ue.userId===ne))==null?void 0:X.nickname)||ne.slice(0,8):V.nickname,se=O.get(ne);(!se||V.timestamp>se.ts)&&O.set(ne,{peerId:ne,peerNick:te,lastMessage:V.content,unread:de[ne]||0,ts:V.timestamp})}return Array.from(O.values()).sort((V,ne)=>ne.ts-V.ts)},[R.dmMessages,(fa=R.serverInfo)==null?void 0:fa.userId,R.users,de]),qe=L=>{le(O=>({...O,[L]:0})),Tn(L)},Z=S.useMemo(()=>{var O;if(!s||!((O=R.serverInfo)!=null&&O.userId))return[];const L=R.serverInfo.userId;return R.dmMessages.filter(Y=>Y.from===L&&Y.to===s||Y.from===s&&Y.to===L).map(Y=>({id:Y.id,channel:"__dm__",userId:Y.from,nickname:Y.nickname,content:Y.content,role:Y.role,timestamp:Y.timestamp}))},[R.dmMessages,s,(zt=R.serverInfo)==null?void 0:zt.userId]);if(R.status==="disconnected"||R.status==="connecting")return l.jsx(h0,{onConnect:jn,isConnecting:R.status==="connecting"});const we=()=>z(!0),be=()=>{z(!1),R.clearSearch()};S.useEffect(()=>{const L=O=>{const Y=O.target,X=Y.tagName==="INPUT"||Y.tagName==="TEXTAREA"||Y.tagName==="SELECT";if((O.ctrlKey||O.metaKey)&&O.key==="k"&&(O.preventDefault(),z(V=>!V)),O.key==="?"&&!X&&(O.preventDefault(),F(V=>!V)),O.key==="Escape"){if(D){F(!1);return}if(P){be();return}if(G){b(!1);return}if(v){w(!1);return}if(Te){Je(null);return}}};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[P,Te,D,G,v]);const Me=L=>{const O=(s?Z:R.messages).find(Y=>Y.id===L);O&&Je({id:O.id,nickname:O.nickname,content:O.content})},yt=(L,O)=>{Te?(R.sendChatWithReply(L,O,Te.id),Je(null)):R.sendChat(L,O)},et=L=>{R.setStatus(L)},Rn=S.useCallback(async L=>{try{const O=gi(t),Y=pl(O,t.secretKey),X=i.startsWith("wss://")?"https://":"http://",V=i.replace(/^wss?:\/\//,"").replace(/\/ws$/,"").replace(/:9998/,":9999"),ne=`${X}${V}/files/uploads/`,te=new FormData;te.append("file",L);const se=await fetch(ne,{method:"POST",headers:{"X-Hotline-PublicKey":O,"X-Hotline-Signature":Y},body:te});if(!se.ok){Ft("File upload failed");return}const ue=await se.json(),ie=`${X}${V}/files/${ue.path}`;R.sendChat(n,`[${ue.filename}](${ie})`)}catch{Ft("File upload error")}},[i,n,R,Ft,t]),Ai=S.useCallback(L=>{if(Ec(L))Ae(Cc(L));else{const O=R.messages.find(Y=>Y.id===L);O&&Ae(H0({id:O.id,channel:O.channel,nickname:O.nickname,content:O.content,timestamp:O.timestamp}))}},[R.messages]),Ui=S.useCallback(L=>{Ae(Cc(L))},[]),rn=gi(t),Dn=pl(rn,t.secretKey),gn=((ds=R.serverInfo)==null?void 0:ds.role)==="admin"||((f=R.serverInfo)==null?void 0:f.role)==="operator",An=((h=R.serverInfo)==null?void 0:h.role)==="admin"||((p=R.serverInfo)==null?void 0:p.role)==="operator",fs=((o=R.serverInfo)==null?void 0:o.role)!=="guest",Xn=R.channels.find(L=>L.name===n);return l.jsxs("div",{className:"app-layout",children:[l.jsxs("div",{className:"app-sidebar-col",children:[l.jsx(m0,{serverName:((g=R.serverInfo)==null?void 0:g.name)||e("app.name"),channels:R.channels,activeChannel:n,activeDM:s,dmConversations:ve,onSelectChannel:qe,onSelectDM:Cn,onCreateChannel:En,onDeleteChannel:Xt,onDisconnect:R.disconnect,canCreateChannel:gn,unreadCounts:H,nickname:(j=R.serverInfo)!=null&&j.userId&&((C=R.users.find(L=>{var O;return L.userId===((O=R.serverInfo)==null?void 0:O.userId)}))==null?void 0:C.nickname)||"",role:((A=R.serverInfo)==null?void 0:A.role)||"",userStatus:(Q=R.users.find(L=>{var O;return L.userId===((O=R.serverInfo)==null?void 0:O.userId)}))==null?void 0:Q.status,mutedChannels:fn,onToggleMute:dn,onAdminPanel:()=>Pe(!0)}),l.jsxs("div",{className:"app-sidebar-bottom",children:[l.jsx(g0,{currentStatus:((fe=R.users.find(L=>{var O;return L.userId===((O=R.serverInfo)==null?void 0:O.userId)}))==null?void 0:fe.status)||"available",onStatusChange:et}),l.jsx(F0,{prefs:Ue,onChange:Xe}),l.jsx("button",{className:"compact-toggle",onClick:vr,title:ct?"Comfortable view":"Compact view",children:ct?l.jsx(r0,{size:14}):l.jsx(qm,{size:14})}),l.jsx(O0,{})]})]}),l.jsxs("main",{className:"app-main",children:[l.jsx(A0,{status:R.status,reconnectIn:R.reconnectIn}),((ae=R.serverInfo)==null?void 0:ae.motd)&&l.jsx(_0,{motd:R.serverInfo.motd}),c&&l.jsx("div",{className:"app-error",children:c}),l.jsxs("div",{className:"app-chat-row",children:[P&&l.jsx(D0,{onSearch:R.search,onClose:be,results:R.searchResults,activeChannel:n}),G&&l.jsx(B0,{messages:R.pinnedMessages,onRequestPins:R.requestPins,onUnpin:gn?R.unpinMessage:void 0,onClose:()=>b(!1),activeChannel:n,canModerate:gn}),v&&l.jsx(V0,{bookmarks:rt,onRemove:Ui,onClose:()=>w(!1)}),l.jsx(z0,{messages:s?Z:R.messages,activeChannel:n,channelTopic:Xn==null?void 0:Xn.topic,currentUserId:((Re=R.serverInfo)==null?void 0:Re.userId)||"",currentRole:(oe=R.serverInfo)==null?void 0:oe.role,typingUsers:R.typingUsers,dmMode:s?{peerId:s,peerNick:((ye=ve.find(L=>L.peerId===s))==null?void 0:ye.peerNick)||s.slice(0,8)}:void 0,onSendMessage:s?(L,O)=>R.sendDM(s,O):yt,onSlashCommand:s?void 0:me,onTyping:()=>s?R.sendTyping("",s):R.sendTyping(n),onSearchOpen:we,onReact:R.addReaction,onRemoveReact:R.removeReaction,onEdit:R.editMessage,onDelete:R.deleteMessage,onPin:L=>R.pinMessage(L,n),onReply:Me,replyTo:Te,onCancelReply:()=>Je(null),onLoadHistory:R.loadHistory,historyLoading:R.historyLoading,hasMoreHistory:R.hasMoreHistory,onFileUpload:An?Rn:void 0,canUpload:An,users:R.users,onPinsOpen:()=>b(L=>!L),onBookmarksOpen:()=>w(L=>!L),onBookmark:Ai,isBookmarked:Ec,onChannelSettings:()=>I(!0),onImageClick:xt}),l.jsx("button",{className:"panel-toggle",onClick:()=>k(L=>!L),title:m?"Hide panel":"Show panel",children:m?l.jsx(Qm,{size:16}):l.jsx(Jm,{size:16})})]})]}),l.jsxs("div",{className:`app-right-panel ${m?"open":"closed"}`,children:[l.jsx(L0,{users:R.users,currentUserId:(Se=R.serverInfo)==null?void 0:Se.userId,currentRole:(je=R.serverInfo)==null?void 0:je.role,onKick:R.kickUser,onBan:R.banUser,onOp:L=>R.setUserRole(L,"operator"),onDeop:L=>R.setUserRole(L,"member"),onDM:Cn}),l.jsx(I0,{serverAddress:i,publicKey:rn,signature:Dn,canUpload:An,canDownload:fs})]}),x&&l.jsx(T0,{onSubmit:re,onClose:()=>E(!1)}),N&&Xn&&l.jsx(K0,{channel:Xn,onSetTopic:R.setTopic,onClose:()=>I(!1),canEdit:gn}),D&&l.jsx(Q0,{onClose:()=>F(!1)}),q&&R.serverInfo&&l.jsx(J0,{serverName:R.serverInfo.name,motd:R.serverInfo.motd,onUpdateSettings:R.updateServerSettings,onRequestBanList:R.requestBanList,onUnban:R.unbanUser,onClose:()=>Pe(!1)}),he&&l.jsx(X0,{channelName:he,onSubmit:Nn,onCancel:()=>De(null)}),Ge&&l.jsx(Z0,{src:Ge,onClose:()=>xt(null)}),l.jsx(W0,{onDrop:An?Rn:()=>{},enabled:An}),l.jsx(q0,{toasts:Jn,onDismiss:Jt}),l.jsx("style",{children:`
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
      `})]})}const Ne=e=>typeof e=="string",ws=()=>{let e,t;const n=new Promise((r,s)=>{e=r,t=s});return n.resolve=e,n.reject=t,n},Pc=e=>e==null?"":""+e,k1=(e,t,n)=>{e.forEach(r=>{t[r]&&(n[r]=t[r])})},w1=/###/g,Lc=e=>e&&e.indexOf("###")>-1?e.replace(w1,"."):e,Ic=e=>!e||Ne(e),Ds=(e,t,n)=>{const r=Ne(t)?t.split("."):t;let s=0;for(;s<r.length-1;){if(Ic(e))return{};const a=Lc(r[s]);!e[a]&&n&&(e[a]=new n),Object.prototype.hasOwnProperty.call(e,a)?e=e[a]:e={},++s}return Ic(e)?{}:{obj:e,k:Lc(r[s])}},_c=(e,t,n)=>{const{obj:r,k:s}=Ds(e,t,Object);if(r!==void 0||t.length===1){r[s]=n;return}let a=t[t.length-1],i=t.slice(0,t.length-1),u=Ds(e,i,Object);for(;u.obj===void 0&&i.length;)a=`${i[i.length-1]}.${a}`,i=i.slice(0,i.length-1),u=Ds(e,i,Object),u&&u.obj&&typeof u.obj[`${u.k}.${a}`]<"u"&&(u.obj=void 0);u.obj[`${u.k}.${a}`]=n},b1=(e,t,n,r)=>{const{obj:s,k:a}=Ds(e,t,Object);s[a]=s[a]||[],s[a].push(n)},mi=(e,t)=>{const{obj:n,k:r}=Ds(e,t);if(n)return n[r]},S1=(e,t,n)=>{const r=mi(e,n);return r!==void 0?r:mi(t,n)},Sp=(e,t,n)=>{for(const r in t)r!=="__proto__"&&r!=="constructor"&&(r in e?Ne(e[r])||e[r]instanceof String||Ne(t[r])||t[r]instanceof String?n&&(e[r]=t[r]):Sp(e[r],t[r],n):e[r]=t[r]);return e},Tr=e=>e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var j1={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const N1=e=>Ne(e)?e.replace(/[&<>"'\/]/g,t=>j1[t]):e;class C1{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const n=this.regExpMap.get(t);if(n!==void 0)return n;const r=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,r),this.regExpQueue.push(t),r}}const E1=[" ",",","?","!",";"],z1=new C1(20),P1=(e,t,n)=>{t=t||"",n=n||"";const r=E1.filter(i=>t.indexOf(i)<0&&n.indexOf(i)<0);if(r.length===0)return!0;const s=z1.getRegExp(`(${r.map(i=>i==="?"?"\\?":i).join("|")})`);let a=!s.test(e);if(!a){const i=e.indexOf(n);i>0&&!s.test(e.substring(0,i))&&(a=!0)}return a},hl=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!e)return;if(e[t])return e[t];const r=t.split(n);let s=e;for(let a=0;a<r.length;){if(!s||typeof s!="object")return;let i,u="";for(let c=a;c<r.length;++c)if(c!==a&&(u+=n),u+=r[c],i=s[u],i!==void 0){if(["string","number","boolean"].indexOf(typeof i)>-1&&c<r.length-1)continue;a+=c-a+1;break}s=i}return s},xi=e=>e&&e.replace("_","-"),L1={type:"logger",log(e){this.output("log",e)},warn(e){this.output("warn",e)},error(e){this.output("error",e)},output(e,t){console&&console[e]&&console[e].apply(console,t)}};class vi{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(t,n)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||L1,this.options=n,this.debug=n.debug}log(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"log","",!0)}warn(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","",!0)}error(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"error","")}deprecate(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(t,n,r,s){return s&&!this.debug?null:(Ne(t[0])&&(t[0]=`${r}${this.prefix} ${t[0]}`),this.logger[n](t))}create(t){return new vi(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new vi(this.logger,t)}}var In=new vi;class Di{constructor(){this.observers={}}on(t,n){return t.split(" ").forEach(r=>{this.observers[r]||(this.observers[r]=new Map);const s=this.observers[r].get(n)||0;this.observers[r].set(n,s+1)}),this}off(t,n){if(this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t].delete(n)}}emit(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];this.observers[t]&&Array.from(this.observers[t].entries()).forEach(i=>{let[u,c]=i;for(let d=0;d<c;d++)u(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(i=>{let[u,c]=i;for(let d=0;d<c;d++)u.apply(u,[t,...r])})}}class Mc extends Di{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=t||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const n=this.options.ns.indexOf(t);n>-1&&this.options.ns.splice(n,1)}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,i=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let u;t.indexOf(".")>-1?u=t.split("."):(u=[t,n],r&&(Array.isArray(r)?u.push(...r):Ne(r)&&a?u.push(...r.split(a)):u.push(r)));const c=mi(this.data,u);return!c&&!n&&!r&&t.indexOf(".")>-1&&(t=u[0],n=u[1],r=u.slice(2).join(".")),c||!i||!Ne(r)?c:hl(this.data&&this.data[t]&&this.data[t][n],r,a)}addResource(t,n,r,s){let a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const i=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator;let u=[t,n];r&&(u=u.concat(i?r.split(i):r)),t.indexOf(".")>-1&&(u=t.split("."),s=n,n=u[1]),this.addNamespaces(n),_c(this.data,u,s),a.silent||this.emit("added",t,n,r,s)}addResources(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const a in r)(Ne(r[a])||Array.isArray(r[a]))&&this.addResource(t,n,a,r[a],{silent:!0});s.silent||this.emit("added",t,n,r)}addResourceBundle(t,n,r,s,a){let i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},u=[t,n];t.indexOf(".")>-1&&(u=t.split("."),s=r,r=n,n=u[1]),this.addNamespaces(n);let c=mi(this.data,u)||{};i.skipCopy||(r=JSON.parse(JSON.stringify(r))),s?Sp(c,r,a):c={...c,...r},_c(this.data,u,c),i.silent||this.emit("added",t,n,r)}removeResourceBundle(t,n){this.hasResourceBundle(t,n)&&delete this.data[t][n],this.removeNamespaces(n),this.emit("removed",t,n)}hasResourceBundle(t,n){return this.getResource(t,n)!==void 0}getResourceBundle(t,n){return n||(n=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(t,n)}:this.getResource(t,n)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const n=this.getDataByLanguage(t);return!!(n&&Object.keys(n)||[]).find(s=>n[s]&&Object.keys(n[s]).length>0)}toJSON(){return this.data}}var jp={processors:{},addPostProcessor(e){this.processors[e.name]=e},handle(e,t,n,r,s){return e.forEach(a=>{this.processors[a]&&(t=this.processors[a].process(t,n,r,s))}),t}};const Oc={};class yi extends Di{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),k1(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=In.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(t==null)return!1;const r=this.resolve(t,n);return r&&r.res!==void 0}extractFromKey(t,n){let r=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;r===void 0&&(r=":");const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let a=n.ns||this.options.defaultNS||[];const i=r&&t.indexOf(r)>-1,u=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!P1(t,r,s);if(i&&!u){const c=t.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:t,namespaces:Ne(a)?[a]:a};const d=t.split(r);(r!==s||r===s&&this.options.ns.indexOf(d[0])>-1)&&(a=d.shift()),t=d.join(s)}return{key:t,namespaces:Ne(a)?[a]:a}}translate(t,n,r){if(typeof n!="object"&&this.options.overloadTranslationOptionHandler&&(n=this.options.overloadTranslationOptionHandler(arguments)),typeof n=="object"&&(n={...n}),n||(n={}),t==null)return"";Array.isArray(t)||(t=[String(t)]);const s=n.returnDetails!==void 0?n.returnDetails:this.options.returnDetails,a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,{key:i,namespaces:u}=this.extractFromKey(t[t.length-1],n),c=u[u.length-1],d=n.lng||this.language,m=n.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(d&&d.toLowerCase()==="cimode"){if(m){const N=n.nsSeparator||this.options.nsSeparator;return s?{res:`${c}${N}${i}`,usedKey:i,exactUsedKey:i,usedLng:d,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:`${c}${N}${i}`}return s?{res:i,usedKey:i,exactUsedKey:i,usedLng:d,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:i}const k=this.resolve(t,n);let x=k&&k.res;const E=k&&k.usedKey||i,P=k&&k.exactUsedKey||i,z=Object.prototype.toString.apply(x),G=["[object Number]","[object Function]","[object RegExp]"],b=n.joinArrays!==void 0?n.joinArrays:this.options.joinArrays,v=!this.i18nFormat||this.i18nFormat.handleAsObject,w=!Ne(x)&&typeof x!="boolean"&&typeof x!="number";if(v&&x&&w&&G.indexOf(z)<0&&!(Ne(b)&&Array.isArray(x))){if(!n.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const N=this.options.returnedObjectHandler?this.options.returnedObjectHandler(E,x,{...n,ns:u}):`key '${i} (${this.language})' returned an object instead of string.`;return s?(k.res=N,k.usedParams=this.getUsedParamsDetails(n),k):N}if(a){const N=Array.isArray(x),I=N?[]:{},D=N?P:E;for(const F in x)if(Object.prototype.hasOwnProperty.call(x,F)){const q=`${D}${a}${F}`;I[F]=this.translate(q,{...n,joinArrays:!1,ns:u}),I[F]===q&&(I[F]=x[F])}x=I}}else if(v&&Ne(b)&&Array.isArray(x))x=x.join(b),x&&(x=this.extendTranslation(x,t,n,r));else{let N=!1,I=!1;const D=n.count!==void 0&&!Ne(n.count),F=yi.hasDefaultValue(n),q=D?this.pluralResolver.getSuffix(d,n.count,n):"",Pe=n.ordinal&&D?this.pluralResolver.getSuffix(d,n.count,{ordinal:!1}):"",he=D&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),De=he&&n[`defaultValue${this.options.pluralSeparator}zero`]||n[`defaultValue${q}`]||n[`defaultValue${Pe}`]||n.defaultValue;!this.isValidLookup(x)&&F&&(N=!0,x=De),this.isValidLookup(x)||(I=!0,x=i);const xt=(n.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&I?void 0:x,rt=F&&De!==x&&this.options.updateMissing;if(I||N||rt){if(this.logger.log(rt?"updateKey":"missingKey",d,c,i,rt?De:x),a){const H=this.resolve(i,{...n,keySeparator:!1});H&&H.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let Ae=[];const Te=this.languageUtils.getFallbackCodes(this.options.fallbackLng,n.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Te&&Te[0])for(let H=0;H<Te.length;H++)Ae.push(Te[H]);else this.options.saveMissingTo==="all"?Ae=this.languageUtils.toResolveHierarchy(n.lng||this.language):Ae.push(n.lng||this.language);const Je=(H,le,de)=>{const Ie=F&&de!==x?de:xt;this.options.missingKeyHandler?this.options.missingKeyHandler(H,c,le,Ie,rt,n):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(H,c,le,Ie,rt,n),this.emit("missingKey",H,c,le,x)};this.options.saveMissing&&(this.options.saveMissingPlurals&&D?Ae.forEach(H=>{const le=this.pluralResolver.getSuffixes(H,n);he&&n[`defaultValue${this.options.pluralSeparator}zero`]&&le.indexOf(`${this.options.pluralSeparator}zero`)<0&&le.push(`${this.options.pluralSeparator}zero`),le.forEach(de=>{Je([H],i+de,n[`defaultValue${de}`]||De)})}):Je(Ae,i,De))}x=this.extendTranslation(x,t,n,k,r),I&&x===i&&this.options.appendNamespaceToMissingKey&&(x=`${c}:${i}`),(I||N)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?x=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}:${i}`:i,N?x:void 0):x=this.options.parseMissingKeyHandler(x))}return s?(k.res=x,k.usedParams=this.getUsedParamsDetails(n),k):x}extendTranslation(t,n,r,s,a){var i=this;if(this.i18nFormat&&this.i18nFormat.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...r},r.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!r.skipInterpolation){r.interpolation&&this.interpolator.init({...r,interpolation:{...this.options.interpolation,...r.interpolation}});const d=Ne(t)&&(r&&r.interpolation&&r.interpolation.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let m;if(d){const x=t.match(this.interpolator.nestingRegexp);m=x&&x.length}let k=r.replace&&!Ne(r.replace)?r.replace:r;if(this.options.interpolation.defaultVariables&&(k={...this.options.interpolation.defaultVariables,...k}),t=this.interpolator.interpolate(t,k,r.lng||this.language||s.usedLng,r),d){const x=t.match(this.interpolator.nestingRegexp),E=x&&x.length;m<E&&(r.nest=!1)}!r.lng&&this.options.compatibilityAPI!=="v1"&&s&&s.res&&(r.lng=this.language||s.usedLng),r.nest!==!1&&(t=this.interpolator.nest(t,function(){for(var x=arguments.length,E=new Array(x),P=0;P<x;P++)E[P]=arguments[P];return a&&a[0]===E[0]&&!r.context?(i.logger.warn(`It seems you are nesting recursively key: ${E[0]} in key: ${n[0]}`),null):i.translate(...E,n)},r)),r.interpolation&&this.interpolator.reset()}const u=r.postProcess||this.options.postProcess,c=Ne(u)?[u]:u;return t!=null&&c&&c.length&&r.applyPostProcessor!==!1&&(t=jp.handle(c,t,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(r)},...r}:r,this)),t}resolve(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r,s,a,i,u;return Ne(t)&&(t=[t]),t.forEach(c=>{if(this.isValidLookup(r))return;const d=this.extractFromKey(c,n),m=d.key;s=m;let k=d.namespaces;this.options.fallbackNS&&(k=k.concat(this.options.fallbackNS));const x=n.count!==void 0&&!Ne(n.count),E=x&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),P=n.context!==void 0&&(Ne(n.context)||typeof n.context=="number")&&n.context!=="",z=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);k.forEach(G=>{this.isValidLookup(r)||(u=G,!Oc[`${z[0]}-${G}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(u)&&(Oc[`${z[0]}-${G}`]=!0,this.logger.warn(`key "${s}" for languages "${z.join(", ")}" won't get resolved as namespace "${u}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),z.forEach(b=>{if(this.isValidLookup(r))return;i=b;const v=[m];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(v,m,b,G,n);else{let N;x&&(N=this.pluralResolver.getSuffix(b,n.count,n));const I=`${this.options.pluralSeparator}zero`,D=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(x&&(v.push(m+N),n.ordinal&&N.indexOf(D)===0&&v.push(m+N.replace(D,this.options.pluralSeparator)),E&&v.push(m+I)),P){const F=`${m}${this.options.contextSeparator}${n.context}`;v.push(F),x&&(v.push(F+N),n.ordinal&&N.indexOf(D)===0&&v.push(F+N.replace(D,this.options.pluralSeparator)),E&&v.push(F+I))}}let w;for(;w=v.pop();)this.isValidLookup(r)||(a=w,r=this.getResource(b,G,w,n))}))})}),{res:r,usedKey:s,exactUsedKey:a,usedLng:i,usedNS:u}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(t,n,r,s):this.resourceStore.getResource(t,n,r,s)}getUsedParamsDetails(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],r=t.replace&&!Ne(t.replace);let s=r?t.replace:t;if(r&&typeof t.count<"u"&&(s.count=t.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!r){s={...s};for(const a of n)delete s[a]}return s}static hasDefaultValue(t){const n="defaultValue";for(const r in t)if(Object.prototype.hasOwnProperty.call(t,r)&&n===r.substring(0,n.length)&&t[r]!==void 0)return!0;return!1}}const po=e=>e.charAt(0).toUpperCase()+e.slice(1);class Tc{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=In.create("languageUtils")}getScriptPartFromCode(t){if(t=xi(t),!t||t.indexOf("-")<0)return null;const n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(t){if(t=xi(t),!t||t.indexOf("-")<0)return t;const n=t.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(t){if(Ne(t)&&t.indexOf("-")>-1){if(typeof Intl<"u"&&typeof Intl.getCanonicalLocales<"u")try{let s=Intl.getCanonicalLocales(t)[0];if(s&&this.options.lowerCaseLng&&(s=s.toLowerCase()),s)return s}catch{}const n=["hans","hant","latn","cyrl","cans","mong","arab"];let r=t.split("-");return this.options.lowerCaseLng?r=r.map(s=>s.toLowerCase()):r.length===2?(r[0]=r[0].toLowerCase(),r[1]=r[1].toUpperCase(),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=po(r[1].toLowerCase()))):r.length===3&&(r[0]=r[0].toLowerCase(),r[1].length===2&&(r[1]=r[1].toUpperCase()),r[0]!=="sgn"&&r[2].length===2&&(r[2]=r[2].toUpperCase()),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=po(r[1].toLowerCase())),n.indexOf(r[2].toLowerCase())>-1&&(r[2]=po(r[2].toLowerCase()))),r.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let n;return t.forEach(r=>{if(n)return;const s=this.formatLanguageCode(r);(!this.options.supportedLngs||this.isSupportedCode(s))&&(n=s)}),!n&&this.options.supportedLngs&&t.forEach(r=>{if(n)return;const s=this.getLanguagePartFromCode(r);if(this.isSupportedCode(s))return n=s;n=this.options.supportedLngs.find(a=>{if(a===s)return a;if(!(a.indexOf("-")<0&&s.indexOf("-")<0)&&(a.indexOf("-")>0&&s.indexOf("-")<0&&a.substring(0,a.indexOf("-"))===s||a.indexOf(s)===0&&s.length>1))return a})}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),Ne(t)&&(t=[t]),Array.isArray(t))return t;if(!n)return t.default||[];let r=t[n];return r||(r=t[this.getScriptPartFromCode(n)]),r||(r=t[this.formatLanguageCode(n)]),r||(r=t[this.getLanguagePartFromCode(n)]),r||(r=t.default),r||[]}toResolveHierarchy(t,n){const r=this.getFallbackCodes(n||this.options.fallbackLng||[],t),s=[],a=i=>{i&&(this.isSupportedCode(i)?s.push(i):this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`))};return Ne(t)&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&a(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&a(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&a(this.getLanguagePartFromCode(t))):Ne(t)&&a(this.formatLanguageCode(t)),r.forEach(i=>{s.indexOf(i)<0&&a(this.formatLanguageCode(i))}),s}}let I1=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],_1={1:e=>+(e>1),2:e=>+(e!=1),3:e=>0,4:e=>e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,5:e=>e==0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5,6:e=>e==1?0:e>=2&&e<=4?1:2,7:e=>e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,8:e=>e==1?0:e==2?1:e!=8&&e!=11?2:3,9:e=>+(e>=2),10:e=>e==1?0:e==2?1:e<7?2:e<11?3:4,11:e=>e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3,12:e=>+(e%10!=1||e%100==11),13:e=>+(e!==0),14:e=>e==1?0:e==2?1:e==3?2:3,15:e=>e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2,16:e=>e%10==1&&e%100!=11?0:e!==0?1:2,17:e=>e==1||e%10==1&&e%100!=11?0:1,18:e=>e==0?0:e==1?1:2,19:e=>e==1?0:e==0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3,20:e=>e==1?0:e==0||e%100>0&&e%100<20?1:2,21:e=>e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0,22:e=>e==1?0:e==2?1:(e<0||e>10)&&e%10==0?2:3};const M1=["v1","v2","v3"],O1=["v4"],Rc={zero:0,one:1,two:2,few:3,many:4,other:5},T1=()=>{const e={};return I1.forEach(t=>{t.lngs.forEach(n=>{e[n]={numbers:t.nr,plurals:_1[t.fc]}})}),e};class R1{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=t,this.options=n,this.logger=In.create("pluralResolver"),(!this.options.compatibilityJSON||O1.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=T1(),this.pluralRulesCache={}}addRule(t,n){this.rules[t]=n}clearCache(){this.pluralRulesCache={}}getRule(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi()){const r=xi(t==="dev"?"en":t),s=n.ordinal?"ordinal":"cardinal",a=JSON.stringify({cleanedCode:r,type:s});if(a in this.pluralRulesCache)return this.pluralRulesCache[a];let i;try{i=new Intl.PluralRules(r,{type:s})}catch{if(!t.match(/-|_/))return;const c=this.languageUtils.getLanguagePartFromCode(t);i=this.getRule(c,n)}return this.pluralRulesCache[a]=i,i}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}needsPlural(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return this.shouldUseIntlApi()?r&&r.resolvedOptions().pluralCategories.length>1:r&&r.numbers.length>1}getPluralFormsOfKey(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,r).map(s=>`${n}${s}`)}getSuffixes(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return r?this.shouldUseIntlApi()?r.resolvedOptions().pluralCategories.sort((s,a)=>Rc[s]-Rc[a]).map(s=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${s}`):r.numbers.map(s=>this.getSuffix(t,s,n)):[]}getSuffix(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=this.getRule(t,r);return s?this.shouldUseIntlApi()?`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s.select(n)}`:this.getSuffixRetroCompatible(s,n):(this.logger.warn(`no plural rule found for: ${t}`),"")}getSuffixRetroCompatible(t,n){const r=t.noAbs?t.plurals(n):t.plurals(Math.abs(n));let s=t.numbers[r];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(s===2?s="plural":s===1&&(s=""));const a=()=>this.options.prepend&&s.toString()?this.options.prepend+s.toString():s.toString();return this.options.compatibilityJSON==="v1"?s===1?"":typeof s=="number"?`_plural_${s.toString()}`:a():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?a():this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}shouldUseIntlApi(){return!M1.includes(this.options.compatibilityJSON)}}const Dc=function(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,a=S1(e,t,n);return!a&&s&&Ne(n)&&(a=hl(e,n,r),a===void 0&&(a=hl(t,n,r))),a},ho=e=>e.replace(/\$/g,"$$$$");class D1{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=In.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||(n=>n),this.init(t)}init(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});const{escape:n,escapeValue:r,useRawValueToEscape:s,prefix:a,prefixEscaped:i,suffix:u,suffixEscaped:c,formatSeparator:d,unescapeSuffix:m,unescapePrefix:k,nestingPrefix:x,nestingPrefixEscaped:E,nestingSuffix:P,nestingSuffixEscaped:z,nestingOptionsSeparator:G,maxReplaces:b,alwaysFormat:v}=t.interpolation;this.escape=n!==void 0?n:N1,this.escapeValue=r!==void 0?r:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=a?Tr(a):i||"{{",this.suffix=u?Tr(u):c||"}}",this.formatSeparator=d||",",this.unescapePrefix=m?"":k||"-",this.unescapeSuffix=this.unescapePrefix?"":m||"",this.nestingPrefix=x?Tr(x):E||Tr("$t("),this.nestingSuffix=P?Tr(P):z||Tr(")"),this.nestingOptionsSeparator=G||",",this.maxReplaces=b||1e3,this.alwaysFormat=v!==void 0?v:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(n,r)=>n&&n.source===r?(n.lastIndex=0,n):new RegExp(r,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(t,n,r,s){let a,i,u;const c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},d=E=>{if(E.indexOf(this.formatSeparator)<0){const b=Dc(n,c,E,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(b,void 0,r,{...s,...n,interpolationkey:E}):b}const P=E.split(this.formatSeparator),z=P.shift().trim(),G=P.join(this.formatSeparator).trim();return this.format(Dc(n,c,z,this.options.keySeparator,this.options.ignoreJSONStructure),G,r,{...s,...n,interpolationkey:z})};this.resetRegExp();const m=s&&s.missingInterpolationHandler||this.options.missingInterpolationHandler,k=s&&s.interpolation&&s.interpolation.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:E=>ho(E)},{regex:this.regexp,safeValue:E=>this.escapeValue?ho(this.escape(E)):ho(E)}].forEach(E=>{for(u=0;a=E.regex.exec(t);){const P=a[1].trim();if(i=d(P),i===void 0)if(typeof m=="function"){const G=m(t,a,s);i=Ne(G)?G:""}else if(s&&Object.prototype.hasOwnProperty.call(s,P))i="";else if(k){i=a[0];continue}else this.logger.warn(`missed to pass in variable ${P} for interpolating ${t}`),i="";else!Ne(i)&&!this.useRawValueToEscape&&(i=Pc(i));const z=E.safeValue(i);if(t=t.replace(a[0],z),k?(E.regex.lastIndex+=i.length,E.regex.lastIndex-=a[0].length):E.regex.lastIndex=0,u++,u>=this.maxReplaces)break}}),t}nest(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s,a,i;const u=(c,d)=>{const m=this.nestingOptionsSeparator;if(c.indexOf(m)<0)return c;const k=c.split(new RegExp(`${m}[ ]*{`));let x=`{${k[1]}`;c=k[0],x=this.interpolate(x,i);const E=x.match(/'/g),P=x.match(/"/g);(E&&E.length%2===0&&!P||P.length%2!==0)&&(x=x.replace(/'/g,'"'));try{i=JSON.parse(x),d&&(i={...d,...i})}catch(z){return this.logger.warn(`failed parsing options string in nesting for key ${c}`,z),`${c}${m}${x}`}return i.defaultValue&&i.defaultValue.indexOf(this.prefix)>-1&&delete i.defaultValue,c};for(;s=this.nestingRegexp.exec(t);){let c=[];i={...r},i=i.replace&&!Ne(i.replace)?i.replace:i,i.applyPostProcessor=!1,delete i.defaultValue;let d=!1;if(s[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(s[1])){const m=s[1].split(this.formatSeparator).map(k=>k.trim());s[1]=m.shift(),c=m,d=!0}if(a=n(u.call(this,s[1].trim(),i),i),a&&s[0]===t&&!Ne(a))return a;Ne(a)||(a=Pc(a)),a||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),a=""),d&&(a=c.reduce((m,k)=>this.format(m,k,r.lng,{...r,interpolationkey:s[1].trim()}),a.trim())),t=t.replace(s[0],a),this.regexp.lastIndex=0}return t}}const A1=e=>{let t=e.toLowerCase().trim();const n={};if(e.indexOf("(")>-1){const r=e.split("(");t=r[0].toLowerCase().trim();const s=r[1].substring(0,r[1].length-1);t==="currency"&&s.indexOf(":")<0?n.currency||(n.currency=s.trim()):t==="relativetime"&&s.indexOf(":")<0?n.range||(n.range=s.trim()):s.split(";").forEach(i=>{if(i){const[u,...c]=i.split(":"),d=c.join(":").trim().replace(/^'+|'+$/g,""),m=u.trim();n[m]||(n[m]=d),d==="false"&&(n[m]=!1),d==="true"&&(n[m]=!0),isNaN(d)||(n[m]=parseInt(d,10))}})}return{formatName:t,formatOptions:n}},Rr=e=>{const t={};return(n,r,s)=>{let a=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(a={...a,[s.interpolationkey]:void 0});const i=r+JSON.stringify(a);let u=t[i];return u||(u=e(xi(r),s),t[i]=u),u(n)}};class U1{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=In.create("formatter"),this.options=t,this.formats={number:Rr((n,r)=>{const s=new Intl.NumberFormat(n,{...r});return a=>s.format(a)}),currency:Rr((n,r)=>{const s=new Intl.NumberFormat(n,{...r,style:"currency"});return a=>s.format(a)}),datetime:Rr((n,r)=>{const s=new Intl.DateTimeFormat(n,{...r});return a=>s.format(a)}),relativetime:Rr((n,r)=>{const s=new Intl.RelativeTimeFormat(n,{...r});return a=>s.format(a,r.range||"day")}),list:Rr((n,r)=>{const s=new Intl.ListFormat(n,{...r});return a=>s.format(a)})},this.init(t)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};this.formatSeparator=n.interpolation.formatSeparator||","}add(t,n){this.formats[t.toLowerCase().trim()]=n}addCached(t,n){this.formats[t.toLowerCase().trim()]=Rr(n)}format(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=n.split(this.formatSeparator);if(a.length>1&&a[0].indexOf("(")>1&&a[0].indexOf(")")<0&&a.find(u=>u.indexOf(")")>-1)){const u=a.findIndex(c=>c.indexOf(")")>-1);a[0]=[a[0],...a.splice(1,u)].join(this.formatSeparator)}return a.reduce((u,c)=>{const{formatName:d,formatOptions:m}=A1(c);if(this.formats[d]){let k=u;try{const x=s&&s.formatParams&&s.formatParams[s.interpolationkey]||{},E=x.locale||x.lng||s.locale||s.lng||r;k=this.formats[d](u,E,{...m,...s,...x})}catch(x){this.logger.warn(x)}return k}else this.logger.warn(`there was no format function for ${d}`);return u},t)}}const $1=(e,t)=>{e.pending[t]!==void 0&&(delete e.pending[t],e.pendingCount--)};class F1 extends Di{constructor(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=t,this.store=n,this.services=r,this.languageUtils=r.languageUtils,this.options=s,this.logger=In.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(r,s.backend,s)}queueLoad(t,n,r,s){const a={},i={},u={},c={};return t.forEach(d=>{let m=!0;n.forEach(k=>{const x=`${d}|${k}`;!r.reload&&this.store.hasResourceBundle(d,k)?this.state[x]=2:this.state[x]<0||(this.state[x]===1?i[x]===void 0&&(i[x]=!0):(this.state[x]=1,m=!1,i[x]===void 0&&(i[x]=!0),a[x]===void 0&&(a[x]=!0),c[k]===void 0&&(c[k]=!0)))}),m||(u[d]=!0)}),(Object.keys(a).length||Object.keys(i).length)&&this.queue.push({pending:i,pendingCount:Object.keys(i).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(a),pending:Object.keys(i),toLoadLanguages:Object.keys(u),toLoadNamespaces:Object.keys(c)}}loaded(t,n,r){const s=t.split("|"),a=s[0],i=s[1];n&&this.emit("failedLoading",a,i,n),!n&&r&&this.store.addResourceBundle(a,i,r,void 0,void 0,{skipCopy:!0}),this.state[t]=n?-1:2,n&&r&&(this.state[t]=0);const u={};this.queue.forEach(c=>{b1(c.loaded,[a],i),$1(c,t),n&&c.errors.push(n),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(d=>{u[d]||(u[d]={});const m=c.loaded[d];m.length&&m.forEach(k=>{u[d][k]===void 0&&(u[d][k]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",u),this.queue=this.queue.filter(c=>!c.done)}read(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,i=arguments.length>5?arguments[5]:void 0;if(!t.length)return i(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:n,fcName:r,tried:s,wait:a,callback:i});return}this.readingCalls++;const u=(d,m)=>{if(this.readingCalls--,this.waitingReads.length>0){const k=this.waitingReads.shift();this.read(k.lng,k.ns,k.fcName,k.tried,k.wait,k.callback)}if(d&&m&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,t,n,r,s+1,a*2,i)},a);return}i(d,m)},c=this.backend[r].bind(this.backend);if(c.length===2){try{const d=c(t,n);d&&typeof d.then=="function"?d.then(m=>u(null,m)).catch(u):u(null,d)}catch(d){u(d)}return}return c(t,n,u)}prepareLoading(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();Ne(t)&&(t=this.languageUtils.toResolveHierarchy(t)),Ne(n)&&(n=[n]);const a=this.queueLoad(t,n,r,s);if(!a.toLoad.length)return a.pending.length||s(),null;a.toLoad.forEach(i=>{this.loadOne(i)})}load(t,n,r){this.prepareLoading(t,n,{},r)}reload(t,n,r){this.prepareLoading(t,n,{reload:!0},r)}loadOne(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const r=t.split("|"),s=r[0],a=r[1];this.read(s,a,"read",void 0,void 0,(i,u)=>{i&&this.logger.warn(`${n}loading namespace ${a} for language ${s} failed`,i),!i&&u&&this.logger.log(`${n}loaded namespace ${a} for language ${s}`,u),this.loaded(t,i,u)})}saveMissing(t,n,r,s,a){let i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(n)){this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(r==null||r==="")){if(this.backend&&this.backend.create){const c={...i,isUpdate:a},d=this.backend.create.bind(this.backend);if(d.length<6)try{let m;d.length===5?m=d(t,n,r,s,c):m=d(t,n,r,s),m&&typeof m.then=="function"?m.then(k=>u(null,k)).catch(u):u(null,m)}catch(m){u(m)}else d(t,n,r,s,u,c)}!t||!t[0]||this.store.addResource(t[0],n,r,s)}}}const Ac=()=>({debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:e=>{let t={};if(typeof e[1]=="object"&&(t=e[1]),Ne(e[1])&&(t.defaultValue=e[1]),Ne(e[2])&&(t.tDescription=e[2]),typeof e[2]=="object"||typeof e[3]=="object"){const n=e[3]||e[2];Object.keys(n).forEach(r=>{t[r]=n[r]})}return t},interpolation:{escapeValue:!0,format:e=>e,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}),Uc=e=>(Ne(e.ns)&&(e.ns=[e.ns]),Ne(e.fallbackLng)&&(e.fallbackLng=[e.fallbackLng]),Ne(e.fallbackNS)&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&e.supportedLngs.indexOf("cimode")<0&&(e.supportedLngs=e.supportedLngs.concat(["cimode"])),e),Pa=()=>{},B1=e=>{Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(n=>{typeof e[n]=="function"&&(e[n]=e[n].bind(e))})};class ra extends Di{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(super(),this.options=Uc(t),this.services={},this.logger=In,this.modules={external:[]},B1(this),n&&!this.isInitialized&&!t.isClone){if(!this.options.initImmediate)return this.init(t,n),this;setTimeout(()=>{this.init(t,n)},0)}}init(){var t=this;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof n=="function"&&(r=n,n={}),!n.defaultNS&&n.defaultNS!==!1&&n.ns&&(Ne(n.ns)?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const s=Ac();this.options={...s,...this.options,...Uc(n)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...s.interpolation,...this.options.interpolation}),n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator);const a=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?In.init(a(this.modules.logger),this.options):In.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:typeof Intl<"u"&&(m=U1);const k=new Tc(this.options);this.store=new Mc(this.options.resources,this.options);const x=this.services;x.logger=In,x.resourceStore=this.store,x.languageUtils=k,x.pluralResolver=new R1(k,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),m&&(!this.options.interpolation.format||this.options.interpolation.format===s.interpolation.format)&&(x.formatter=a(m),x.formatter.init(x,this.options),this.options.interpolation.format=x.formatter.format.bind(x.formatter)),x.interpolator=new D1(this.options),x.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},x.backendConnector=new F1(a(this.modules.backend),x.resourceStore,x,this.options),x.backendConnector.on("*",function(E){for(var P=arguments.length,z=new Array(P>1?P-1:0),G=1;G<P;G++)z[G-1]=arguments[G];t.emit(E,...z)}),this.modules.languageDetector&&(x.languageDetector=a(this.modules.languageDetector),x.languageDetector.init&&x.languageDetector.init(x,this.options.detection,this.options)),this.modules.i18nFormat&&(x.i18nFormat=a(this.modules.i18nFormat),x.i18nFormat.init&&x.i18nFormat.init(this)),this.translator=new yi(this.services,this.options),this.translator.on("*",function(E){for(var P=arguments.length,z=new Array(P>1?P-1:0),G=1;G<P;G++)z[G-1]=arguments[G];t.emit(E,...z)}),this.modules.external.forEach(E=>{E.init&&E.init(this)})}if(this.format=this.options.interpolation.format,r||(r=Pa),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=function(){return t.store[m](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=function(){return t.store[m](...arguments),t}});const c=ws(),d=()=>{const m=(k,x)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),c.resolve(x),r(k,x)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initImmediate?d():setTimeout(d,0),c}loadResources(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Pa;const s=Ne(t)?t:this.language;if(typeof t=="function"&&(r=t),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return r();const a=[],i=u=>{if(!u||u==="cimode")return;this.services.languageUtils.toResolveHierarchy(u).forEach(d=>{d!=="cimode"&&a.indexOf(d)<0&&a.push(d)})};s?i(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(c=>i(c)),this.options.preload&&this.options.preload.forEach(u=>i(u)),this.services.backendConnector.load(a,this.options.ns,u=>{!u&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),r(u)})}else r(null)}reloadResources(t,n,r){const s=ws();return typeof t=="function"&&(r=t,t=void 0),typeof n=="function"&&(r=n,n=void 0),t||(t=this.languages),n||(n=this.options.ns),r||(r=Pa),this.services.backendConnector.reload(t,n,a=>{s.resolve(),r(a)}),s}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&jp.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1))for(let n=0;n<this.languages.length;n++){const r=this.languages[n];if(!(["cimode","dev"].indexOf(r)>-1)&&this.store.hasLanguageSomeTranslations(r)){this.resolvedLanguage=r;break}}}changeLanguage(t,n){var r=this;this.isLanguageChangingTo=t;const s=ws();this.emit("languageChanging",t);const a=c=>{this.language=c,this.languages=this.services.languageUtils.toResolveHierarchy(c),this.resolvedLanguage=void 0,this.setResolvedLanguage(c)},i=(c,d)=>{d?(a(d),this.translator.changeLanguage(d),this.isLanguageChangingTo=void 0,this.emit("languageChanged",d),this.logger.log("languageChanged",d)):this.isLanguageChangingTo=void 0,s.resolve(function(){return r.t(...arguments)}),n&&n(c,function(){return r.t(...arguments)})},u=c=>{!t&&!c&&this.services.languageDetector&&(c=[]);const d=Ne(c)?c:this.services.languageUtils.getBestMatchFromCodes(c);d&&(this.language||a(d),this.translator.language||this.translator.changeLanguage(d),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(d)),this.loadResources(d,m=>{i(m,d)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(t),s}getFixedT(t,n,r){var s=this;const a=function(i,u){let c;if(typeof u!="object"){for(var d=arguments.length,m=new Array(d>2?d-2:0),k=2;k<d;k++)m[k-2]=arguments[k];c=s.options.overloadTranslationOptionHandler([i,u].concat(m))}else c={...u};c.lng=c.lng||a.lng,c.lngs=c.lngs||a.lngs,c.ns=c.ns||a.ns,c.keyPrefix!==""&&(c.keyPrefix=c.keyPrefix||r||a.keyPrefix);const x=s.options.keySeparator||".";let E;return c.keyPrefix&&Array.isArray(i)?E=i.map(P=>`${c.keyPrefix}${x}${P}`):E=c.keyPrefix?`${c.keyPrefix}${x}${i}`:i,s.t(E,c)};return Ne(t)?a.lng=t:a.lngs=t,a.ns=n,a.keyPrefix=r,a}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const r=n.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,a=this.languages[this.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const i=(u,c)=>{const d=this.services.backendConnector.state[`${u}|${c}`];return d===-1||d===0||d===2};if(n.precheck){const u=n.precheck(this,i);if(u!==void 0)return u}return!!(this.hasResourceBundle(r,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||i(r,t)&&(!s||i(a,t)))}loadNamespaces(t,n){const r=ws();return this.options.ns?(Ne(t)&&(t=[t]),t.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{r.resolve(),n&&n(s)}),r):(n&&n(),Promise.resolve())}loadLanguages(t,n){const r=ws();Ne(t)&&(t=[t]);const s=this.options.preload||[],a=t.filter(i=>s.indexOf(i)<0&&this.services.languageUtils.isSupportedCode(i));return a.length?(this.options.preload=s.concat(a),this.loadResources(i=>{r.resolve(),n&&n(i)}),r):(n&&n(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!t)return"rtl";const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],r=this.services&&this.services.languageUtils||new Tc(Ac());return n.indexOf(r.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return new ra(t,n)}cloneInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Pa;const r=t.forkResourceStore;r&&delete t.forkResourceStore;const s={...this.options,...t,isClone:!0},a=new ra(s);return(t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),["store","services","language"].forEach(u=>{a[u]=this[u]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},r&&(a.store=new Mc(this.store.data,s),a.services.resourceStore=a.store),a.translator=new yi(a.services,s),a.translator.on("*",function(u){for(var c=arguments.length,d=new Array(c>1?c-1:0),m=1;m<c;m++)d[m-1]=arguments[m];a.emit(u,...d)}),a.init(s,n),a.translator.options=s,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Rt=ra.createInstance();Rt.createInstance=ra.createInstance;Rt.createInstance;Rt.dir;Rt.init;Rt.loadResources;Rt.reloadResources;Rt.use;Rt.changeLanguage;Rt.getFixedT;Rt.t;Rt.exists;Rt.setDefaultNamespace;Rt.hasLoadedNamespace;Rt.loadNamespaces;Rt.loadLanguages;function H1(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function sa(e){"@babel/helpers - typeof";return sa=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},sa(e)}function V1(e,t){if(sa(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(sa(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function K1(e){var t=V1(e,"string");return sa(t)=="symbol"?t:t+""}function W1(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,K1(r.key),r)}}function Y1(e,t,n){return t&&W1(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var Np=[],Q1=Np.forEach,J1=Np.slice;function X1(e){return Q1.call(J1.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e}var $c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,Z1=function(t,n,r){var s=r||{};s.path=s.path||"/";var a=encodeURIComponent(n),i="".concat(t,"=").concat(a);if(s.maxAge>0){var u=s.maxAge-0;if(Number.isNaN(u))throw new Error("maxAge should be a Number");i+="; Max-Age=".concat(Math.floor(u))}if(s.domain){if(!$c.test(s.domain))throw new TypeError("option domain is invalid");i+="; Domain=".concat(s.domain)}if(s.path){if(!$c.test(s.path))throw new TypeError("option path is invalid");i+="; Path=".concat(s.path)}if(s.expires){if(typeof s.expires.toUTCString!="function")throw new TypeError("option expires is invalid");i+="; Expires=".concat(s.expires.toUTCString())}if(s.httpOnly&&(i+="; HttpOnly"),s.secure&&(i+="; Secure"),s.sameSite){var c=typeof s.sameSite=="string"?s.sameSite.toLowerCase():s.sameSite;switch(c){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;case"none":i+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return i},Fc={create:function(t,n,r,s){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{path:"/",sameSite:"strict"};r&&(a.expires=new Date,a.expires.setTime(a.expires.getTime()+r*60*1e3)),s&&(a.domain=s),document.cookie=Z1(t,encodeURIComponent(n),a)},read:function(t){for(var n="".concat(t,"="),r=document.cookie.split(";"),s=0;s<r.length;s++){for(var a=r[s];a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(n)===0)return a.substring(n.length,a.length)}return null},remove:function(t){this.create(t,"",-1)}},G1={name:"cookie",lookup:function(t){var n;if(t.lookupCookie&&typeof document<"u"){var r=Fc.read(t.lookupCookie);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupCookie&&typeof document<"u"&&Fc.create(n.lookupCookie,t,n.cookieMinutes,n.cookieDomain,n.cookieOptions)}},q1={name:"querystring",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.search;!window.location.search&&window.location.hash&&window.location.hash.indexOf("?")>-1&&(r=window.location.hash.substring(window.location.hash.indexOf("?")));for(var s=r.substring(1),a=s.split("&"),i=0;i<a.length;i++){var u=a[i].indexOf("=");if(u>0){var c=a[i].substring(0,u);c===t.lookupQuerystring&&(n=a[i].substring(u+1))}}}return n}},bs=null,Bc=function(){if(bs!==null)return bs;try{bs=window!=="undefined"&&window.localStorage!==null;var t="i18next.translate.boo";window.localStorage.setItem(t,"foo"),window.localStorage.removeItem(t)}catch{bs=!1}return bs},ex={name:"localStorage",lookup:function(t){var n;if(t.lookupLocalStorage&&Bc()){var r=window.localStorage.getItem(t.lookupLocalStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupLocalStorage&&Bc()&&window.localStorage.setItem(n.lookupLocalStorage,t)}},Ss=null,Hc=function(){if(Ss!==null)return Ss;try{Ss=window!=="undefined"&&window.sessionStorage!==null;var t="i18next.translate.boo";window.sessionStorage.setItem(t,"foo"),window.sessionStorage.removeItem(t)}catch{Ss=!1}return Ss},tx={name:"sessionStorage",lookup:function(t){var n;if(t.lookupSessionStorage&&Hc()){var r=window.sessionStorage.getItem(t.lookupSessionStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupSessionStorage&&Hc()&&window.sessionStorage.setItem(n.lookupSessionStorage,t)}},nx={name:"navigator",lookup:function(t){var n=[];if(typeof navigator<"u"){if(navigator.languages)for(var r=0;r<navigator.languages.length;r++)n.push(navigator.languages[r]);navigator.userLanguage&&n.push(navigator.userLanguage),navigator.language&&n.push(navigator.language)}return n.length>0?n:void 0}},rx={name:"htmlTag",lookup:function(t){var n,r=t.htmlTag||(typeof document<"u"?document.documentElement:null);return r&&typeof r.getAttribute=="function"&&(n=r.getAttribute("lang")),n}},sx={name:"path",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(r instanceof Array)if(typeof t.lookupFromPathIndex=="number"){if(typeof r[t.lookupFromPathIndex]!="string")return;n=r[t.lookupFromPathIndex].replace("/","")}else n=r[0].replace("/","")}return n}},ax={name:"subdomain",lookup:function(t){var n=typeof t.lookupFromSubdomainIndex=="number"?t.lookupFromSubdomainIndex+1:1,r=typeof window<"u"&&window.location&&window.location.hostname&&window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);if(r)return r[n]}},Cp=!1;try{document.cookie,Cp=!0}catch{}var Ep=["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"];Cp||Ep.splice(1,1);function ix(){return{order:Ep,lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"],convertDetectedLanguage:function(t){return t}}}var zp=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};H1(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return Y1(e,[{key:"init",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.services=n||{languageUtils:{}},this.options=X1(r,this.options||{},ix()),typeof this.options.convertDetectedLanguage=="string"&&this.options.convertDetectedLanguage.indexOf("15897")>-1&&(this.options.convertDetectedLanguage=function(a){return a.replace("-","_")}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=s,this.addDetector(G1),this.addDetector(q1),this.addDetector(ex),this.addDetector(tx),this.addDetector(nx),this.addDetector(rx),this.addDetector(sx),this.addDetector(ax)}},{key:"addDetector",value:function(n){return this.detectors[n.name]=n,this}},{key:"detect",value:function(n){var r=this;n||(n=this.options.order);var s=[];return n.forEach(function(a){if(r.detectors[a]){var i=r.detectors[a].lookup(r.options);i&&typeof i=="string"&&(i=[i]),i&&(s=s.concat(i))}}),s=s.map(function(a){return r.options.convertDetectedLanguage(a)}),this.services.languageUtils.getBestMatchFromCodes?s:s.length>0?s[0]:null}},{key:"cacheUserLanguage",value:function(n,r){var s=this;r||(r=this.options.caches),r&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(n)>-1||r.forEach(function(a){s.detectors[a]&&s.detectors[a].cacheUserLanguage(n,s.options)}))}}])}();zp.type="languageDetector";const ox={"app.name":"Hotline Modern","auth.connecting":"Connecting...","auth.authenticating":"Authenticating...","auth.connectionFailed":"Connection failed","auth.invalidSignature":"Invalid signature","connect.title":"Connect to Server","connect.serverAddress":"Server address","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Nickname","connect.nicknamePlaceholder":"Your nickname","connect.button":"Connect","connect.connecting":"Connecting...","sidebar.channels":"Channels","sidebar.createChannel":"Create channel","sidebar.disconnect":"Disconnect","sidebar.users":"Users","chat.placeholder":"Type a message...","chat.send":"Send","chat.noMessages":"No messages yet. Say hello!","chat.today":"Today","chat.yesterday":"Yesterday","chat.history":"Message history","channel.create":"Create Channel","channel.name":"Channel name","channel.topic":"Topic","channel.cancel":"Cancel","channel.submit":"Create","channel.password":"Password (optional)","channel.passwordPlaceholder":"Leave empty for public channel","users.online":"{{count}} user online","users.online_other":"{{count}} users online","users.title":"Users","files.title":"Files","files.upload":"Upload","files.download":"Download","files.empty":"No files","files.parentDir":"Parent directory","roles.admin":"Admin","roles.operator":"Operator","roles.member":"Member","roles.guest":"Guest","settings.title":"Settings","settings.language":"Language","settings.theme":"Theme","server.motd":"Message of the Day","error.disconnected":"Disconnected from server","error.reconnecting":"Reconnecting...","error.permissionDenied":"Permission denied","sidebar.directMessages":"Direct Messages","sidebar.deleteChannel":"Delete channel","chat.typing":"{{name}} is typing...","chat.typingMultiple":"{{count}} people are typing...","chat.dmPlaceholder":"Message {{name}}...","users.sendDM":"Send message","chat.edited":"(edited)","chat.replyingTo":"Replying to","search.title":"Search messages","search.placeholder":"Search messages...","search.allChannels":"All channels","search.noResults":"No results found","connection.reconnecting":"Reconnecting in {{seconds}}s...","connection.connecting":"Connecting...","connection.authenticating":"Authenticating...","notif.muteSound":"Mute sounds","notif.unmuteSound":"Unmute sounds","notif.muteDesktop":"Mute notifications","notif.unmuteDesktop":"Unmute notifications","status.available":"Available","status.away":"Away","status.busy":"Busy","chat.loadingHistory":"Loading older messages...","chat.historyStart":"Beginning of conversation","files.dropHere":"Drop file to upload","files.uploading":"Uploading...","chat.searchEmoji":"Search emoji...","emoji.smileys":"Smileys","emoji.gestures":"Gestures","emoji.symbols":"Symbols","emoji.objects":"Objects","pins.title":"Pinned Messages","pins.empty":"No pinned messages","pins.unpin":"Unpin","bookmarks.title":"Bookmarks","bookmarks.empty":"No bookmarks yet","bookmarks.remove":"Remove bookmark","channelSettings.title":"Channel Settings","channelSettings.members":"members","channelSettings.passwordProtected":"Password protected","channelSettings.topicPlaceholder":"Set a topic for this channel...","channelSettings.noTopic":"No topic set","channelSettings.save":"Save","channelSettings.close":"Close","profile.copyId":"Copy public key","profile.promote":"Promote to Operator","profile.demote":"Demote to Member","profile.kick":"Kick","profile.ban":"Ban","shortcuts.title":"Keyboard Shortcuts","shortcuts.search":"Search messages","shortcuts.bold":"Bold text","shortcuts.italic":"Italic text","shortcuts.close":"Close panel / Cancel","shortcuts.send":"Send message","shortcuts.newline":"New line","shortcuts.mention":"Mention a user","shortcuts.showHelp":"Show this help","admin.title":"Administration","admin.settings":"Settings","admin.bans":"Ban List","admin.serverName":"Server Name","admin.motd":"Message of the Day","admin.save":"Save Changes","admin.saved":"Saved!","admin.banInfo":"Banned users cannot reconnect to this server.","admin.noBans":"No banned users","sidebar.mute":"Mute channel","sidebar.unmute":"Unmute channel","channel.passwordRequired":"Password Required","channel.passwordDesc":"#{{channel}} is password protected","channel.passwordPlaceholderJoin":"Enter channel password","ctx.reply":"Reply","ctx.react":"Add Reaction","ctx.copy":"Copy Text","ctx.quote":"Quote","ctx.bookmark":"Bookmark","ctx.edit":"Edit Message","ctx.pin":"Pin Message","ctx.delete":"Delete Message","lightbox.zoomIn":"Zoom in","lightbox.zoomOut":"Zoom out","lightbox.rotate":"Rotate","lightbox.download":"Download"},lx={"app.name":"Hotline Modern","auth.connecting":"Connexion...","auth.authenticating":"Authentification...","auth.connectionFailed":"Échec de la connexion","auth.invalidSignature":"Signature invalide","connect.title":"Se connecter au serveur","connect.serverAddress":"Adresse du serveur","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Pseudo","connect.nicknamePlaceholder":"Votre pseudo","connect.button":"Connexion","connect.connecting":"Connexion...","sidebar.channels":"Salons","sidebar.createChannel":"Créer un salon","sidebar.disconnect":"Déconnexion","sidebar.users":"Utilisateurs","chat.placeholder":"Écrire un message...","chat.send":"Envoyer","chat.noMessages":"Aucun message. Dites bonjour !","chat.today":"Aujourd'hui","chat.yesterday":"Hier","chat.history":"Historique des messages","channel.create":"Créer un salon","channel.name":"Nom du salon","channel.topic":"Sujet","channel.cancel":"Annuler","channel.submit":"Créer","channel.password":"Mot de passe (optionnel)","channel.passwordPlaceholder":"Laisser vide pour un salon public","users.online":"{{count}} utilisateur en ligne","users.online_other":"{{count}} utilisateurs en ligne","users.title":"Utilisateurs","files.title":"Fichiers","files.upload":"Téléverser","files.download":"Télécharger","files.empty":"Aucun fichier","files.parentDir":"Dossier parent","roles.admin":"Admin","roles.operator":"Opérateur","roles.member":"Membre","roles.guest":"Invité","settings.title":"Paramètres","settings.language":"Langue","settings.theme":"Thème","server.motd":"Message du jour","error.disconnected":"Déconnecté du serveur","error.reconnecting":"Reconnexion...","error.permissionDenied":"Permission refusée","sidebar.directMessages":"Messages privés","sidebar.deleteChannel":"Supprimer le salon","chat.typing":"{{name}} écrit...","chat.typingMultiple":"{{count}} personnes écrivent...","chat.dmPlaceholder":"Message à {{name}}...","users.sendDM":"Envoyer un message","chat.edited":"(modifié)","chat.replyingTo":"En réponse à","search.title":"Rechercher des messages","search.placeholder":"Rechercher...","search.allChannels":"Tous les salons","search.noResults":"Aucun résultat","connection.reconnecting":"Reconnexion dans {{seconds}}s...","connection.connecting":"Connexion...","connection.authenticating":"Authentification...","notif.muteSound":"Couper les sons","notif.unmuteSound":"Activer les sons","notif.muteDesktop":"Couper les notifications","notif.unmuteDesktop":"Activer les notifications","status.available":"Disponible","status.away":"Absent","status.busy":"Occupé","chat.loadingHistory":"Chargement des anciens messages...","chat.historyStart":"Début de la conversation","files.dropHere":"Déposer le fichier pour téléverser","files.uploading":"Téléversement...","chat.searchEmoji":"Chercher un emoji...","emoji.smileys":"Visages","emoji.gestures":"Gestes","emoji.symbols":"Symboles","emoji.objects":"Objets","pins.title":"Messages épinglés","pins.empty":"Aucun message épinglé","pins.unpin":"Désépingler","bookmarks.title":"Favoris","bookmarks.empty":"Aucun favori","bookmarks.remove":"Retirer le favori","channelSettings.title":"Paramètres du salon","channelSettings.members":"membres","channelSettings.passwordProtected":"Protégé par mot de passe","channelSettings.topicPlaceholder":"Définir un sujet pour ce salon...","channelSettings.noTopic":"Aucun sujet défini","channelSettings.save":"Enregistrer","channelSettings.close":"Fermer","profile.copyId":"Copier la clé publique","profile.promote":"Promouvoir opérateur","profile.demote":"Rétrograder membre","profile.kick":"Expulser","profile.ban":"Bannir","shortcuts.title":"Raccourcis clavier","shortcuts.search":"Rechercher des messages","shortcuts.bold":"Texte en gras","shortcuts.italic":"Texte en italique","shortcuts.close":"Fermer / Annuler","shortcuts.send":"Envoyer le message","shortcuts.newline":"Nouvelle ligne","shortcuts.mention":"Mentionner un utilisateur","shortcuts.showHelp":"Afficher cette aide","admin.title":"Administration","admin.settings":"Paramètres","admin.bans":"Liste des bannis","admin.serverName":"Nom du serveur","admin.motd":"Message du jour","admin.save":"Enregistrer","admin.saved":"Enregistré !","admin.banInfo":"Les utilisateurs bannis ne peuvent pas se reconnecter.","admin.noBans":"Aucun utilisateur banni","sidebar.mute":"Couper les notifications","sidebar.unmute":"Activer les notifications","channel.passwordRequired":"Mot de passe requis","channel.passwordDesc":"#{{channel}} est protégé par mot de passe","channel.passwordPlaceholderJoin":"Entrer le mot de passe","ctx.reply":"Répondre","ctx.react":"Ajouter une réaction","ctx.copy":"Copier le texte","ctx.quote":"Citer","ctx.bookmark":"Ajouter un favori","ctx.edit":"Modifier le message","ctx.pin":"Épingler le message","ctx.delete":"Supprimer le message","lightbox.zoomIn":"Zoom avant","lightbox.zoomOut":"Zoom arrière","lightbox.rotate":"Pivoter","lightbox.download":"Télécharger"};Rt.use(zp).use(vm).init({resources:{en:{translation:ox},fr:{translation:lx}},fallbackLng:"en",interpolation:{escapeValue:!1},detection:{order:["localStorage","navigator"],lookupLocalStorage:"hotline-language",caches:["localStorage"]}});go.createRoot(document.getElementById("root")).render(l.jsx(Qp.StrictMode,{children:l.jsx(y1,{})}));
