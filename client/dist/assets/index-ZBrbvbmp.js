var zh=Object.defineProperty;var Ph=(e,t,n)=>t in e?zh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ac=(e,t,n)=>Ph(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();var Mh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function bd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ih(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var s=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return e[r]}})}),n}var wd={exports:{}},_i={},kd={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var va=Symbol.for("react.element"),Lh=Symbol.for("react.portal"),Th=Symbol.for("react.fragment"),Oh=Symbol.for("react.strict_mode"),Rh=Symbol.for("react.profiler"),_h=Symbol.for("react.provider"),Dh=Symbol.for("react.context"),Uh=Symbol.for("react.forward_ref"),Ah=Symbol.for("react.suspense"),Fh=Symbol.for("react.memo"),$h=Symbol.for("react.lazy"),Fc=Symbol.iterator;function Bh(e){return e===null||typeof e!="object"?null:(e=Fc&&e[Fc]||e["@@iterator"],typeof e=="function"?e:null)}var jd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Sd=Object.assign,Nd={};function ws(e,t,n){this.props=e,this.context=t,this.refs=Nd,this.updater=n||jd}ws.prototype.isReactComponent={};ws.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ws.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Cd(){}Cd.prototype=ws.prototype;function Ul(e,t,n){this.props=e,this.context=t,this.refs=Nd,this.updater=n||jd}var Al=Ul.prototype=new Cd;Al.constructor=Ul;Sd(Al,ws.prototype);Al.isPureReactComponent=!0;var $c=Array.isArray,Ed=Object.prototype.hasOwnProperty,Fl={current:null},zd={key:!0,ref:!0,__self:!0,__source:!0};function Pd(e,t,n){var r,s={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Ed.call(t,r)&&!zd.hasOwnProperty(r)&&(s[r]=t[r]);var u=arguments.length-2;if(u===1)s.children=n;else if(1<u){for(var c=Array(u),f=0;f<u;f++)c[f]=arguments[f+2];s.children=c}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)s[r]===void 0&&(s[r]=u[r]);return{$$typeof:va,type:e,key:a,ref:o,props:s,_owner:Fl.current}}function Hh(e,t){return{$$typeof:va,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function $l(e){return typeof e=="object"&&e!==null&&e.$$typeof===va}function Vh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Bc=/\/+/g;function so(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Vh(""+e.key):t.toString(36)}function Ka(e,t,n,r,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case va:case Lh:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+so(o,0):r,$c(s)?(n="",e!=null&&(n=e.replace(Bc,"$&/")+"/"),Ka(s,t,n,"",function(f){return f})):s!=null&&($l(s)&&(s=Hh(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Bc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",$c(e))for(var u=0;u<e.length;u++){a=e[u];var c=r+so(a,u);o+=Ka(a,t,n,c,s)}else if(c=Bh(e),typeof c=="function")for(e=c.call(e),u=0;!(a=e.next()).done;)a=a.value,c=r+so(a,u++),o+=Ka(a,t,n,c,s);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Ca(e,t,n){if(e==null)return e;var r=[],s=0;return Ka(e,r,"","",function(a){return t.call(n,a,s++)}),r}function Kh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Zt={current:null},Wa={transition:null},Wh={ReactCurrentDispatcher:Zt,ReactCurrentBatchConfig:Wa,ReactCurrentOwner:Fl};function Md(){throw Error("act(...) is not supported in production builds of React.")}$e.Children={map:Ca,forEach:function(e,t,n){Ca(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ca(e,function(){t++}),t},toArray:function(e){return Ca(e,function(t){return t})||[]},only:function(e){if(!$l(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$e.Component=ws;$e.Fragment=Th;$e.Profiler=Rh;$e.PureComponent=Ul;$e.StrictMode=Oh;$e.Suspense=Ah;$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Wh;$e.act=Md;$e.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Sd({},e.props),s=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=Fl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)Ed.call(t,c)&&!zd.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&u!==void 0?u[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){u=Array(c);for(var f=0;f<c;f++)u[f]=arguments[f+2];r.children=u}return{$$typeof:va,type:e.type,key:s,ref:a,props:r,_owner:o}};$e.createContext=function(e){return e={$$typeof:Dh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:_h,_context:e},e.Consumer=e};$e.createElement=Pd;$e.createFactory=function(e){var t=Pd.bind(null,e);return t.type=e,t};$e.createRef=function(){return{current:null}};$e.forwardRef=function(e){return{$$typeof:Uh,render:e}};$e.isValidElement=$l;$e.lazy=function(e){return{$$typeof:$h,_payload:{_status:-1,_result:e},_init:Kh}};$e.memo=function(e,t){return{$$typeof:Fh,type:e,compare:t===void 0?null:t}};$e.startTransition=function(e){var t=Wa.transition;Wa.transition={};try{e()}finally{Wa.transition=t}};$e.unstable_act=Md;$e.useCallback=function(e,t){return Zt.current.useCallback(e,t)};$e.useContext=function(e){return Zt.current.useContext(e)};$e.useDebugValue=function(){};$e.useDeferredValue=function(e){return Zt.current.useDeferredValue(e)};$e.useEffect=function(e,t){return Zt.current.useEffect(e,t)};$e.useId=function(){return Zt.current.useId()};$e.useImperativeHandle=function(e,t,n){return Zt.current.useImperativeHandle(e,t,n)};$e.useInsertionEffect=function(e,t){return Zt.current.useInsertionEffect(e,t)};$e.useLayoutEffect=function(e,t){return Zt.current.useLayoutEffect(e,t)};$e.useMemo=function(e,t){return Zt.current.useMemo(e,t)};$e.useReducer=function(e,t,n){return Zt.current.useReducer(e,t,n)};$e.useRef=function(e){return Zt.current.useRef(e)};$e.useState=function(e){return Zt.current.useState(e)};$e.useSyncExternalStore=function(e,t,n){return Zt.current.useSyncExternalStore(e,t,n)};$e.useTransition=function(){return Zt.current.useTransition()};$e.version="18.3.1";kd.exports=$e;var y=kd.exports;const Yh=bd(y);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jh=y,Qh=Symbol.for("react.element"),qh=Symbol.for("react.fragment"),Xh=Object.prototype.hasOwnProperty,Gh=Jh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Zh={key:!0,ref:!0,__self:!0,__source:!0};function Id(e,t,n){var r,s={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Xh.call(t,r)&&!Zh.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Qh,type:e,key:a,ref:o,props:s,_owner:Gh.current}}_i.Fragment=qh;_i.jsx=Id;_i.jsxs=Id;wd.exports=_i;var i=wd.exports,_o={},Ld={exports:{}},gn={},Td={exports:{}},Od={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(K,re){var he=K.length;K.push(re);e:for(;0<he;){var Ue=he-1>>>1,xe=K[Ue];if(0<s(xe,re))K[Ue]=re,K[he]=xe,he=Ue;else break e}}function n(K){return K.length===0?null:K[0]}function r(K){if(K.length===0)return null;var re=K[0],he=K.pop();if(he!==re){K[0]=he;e:for(var Ue=0,xe=K.length,Ze=xe>>>1;Ue<Ze;){var We=2*(Ue+1)-1,ke=K[We],et=We+1,Ct=K[et];if(0>s(ke,he))et<xe&&0>s(Ct,ke)?(K[Ue]=Ct,K[et]=he,Ue=et):(K[Ue]=ke,K[We]=he,Ue=We);else if(et<xe&&0>s(Ct,he))K[Ue]=Ct,K[et]=he,Ue=et;else break e}}return re}function s(K,re){var he=K.sortIndex-re.sortIndex;return he!==0?he:K.id-re.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,u=o.now();e.unstable_now=function(){return o.now()-u}}var c=[],f=[],m=1,b=null,x=3,C=!1,w=!1,N=!1,L=typeof setTimeout=="function"?setTimeout:null,k=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function E(K){for(var re=n(f);re!==null;){if(re.callback===null)r(f);else if(re.startTime<=K)r(f),re.sortIndex=re.expirationTime,t(c,re);else break;re=n(f)}}function z(K){if(N=!1,E(K),!w)if(n(c)!==null)w=!0,Xe(M);else{var re=n(f);re!==null&&xt(z,re.startTime-K)}}function M(K,re){w=!1,N&&(N=!1,k(Q),Q=-1),C=!0;var he=x;try{for(E(re),b=n(c);b!==null&&(!(b.expirationTime>re)||K&&!Ke());){var Ue=b.callback;if(typeof Ue=="function"){b.callback=null,x=b.priorityLevel;var xe=Ue(b.expirationTime<=re);re=e.unstable_now(),typeof xe=="function"?b.callback=xe:b===n(c)&&r(c),E(re)}else r(c);b=n(c)}if(b!==null)var Ze=!0;else{var We=n(f);We!==null&&xt(z,We.startTime-re),Ze=!1}return Ze}finally{b=null,x=he,C=!1}}var _=!1,D=null,Q=-1,Oe=5,pe=-1;function Ke(){return!(e.unstable_now()-pe<Oe)}function pt(){if(D!==null){var K=e.unstable_now();pe=K;var re=!0;try{re=D(!0,K)}finally{re?wt():(_=!1,D=null)}}else _=!1}var wt;if(typeof v=="function")wt=function(){v(pt)};else if(typeof MessageChannel<"u"){var ht=new MessageChannel,ot=ht.port2;ht.port1.onmessage=pt,wt=function(){ot.postMessage(null)}}else wt=function(){L(pt,0)};function Xe(K){D=K,_||(_=!0,wt())}function xt(K,re){Q=L(function(){K(e.unstable_now())},re)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(K){K.callback=null},e.unstable_continueExecution=function(){w||C||(w=!0,Xe(M))},e.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Oe=0<K?Math.floor(1e3/K):5},e.unstable_getCurrentPriorityLevel=function(){return x},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(K){switch(x){case 1:case 2:case 3:var re=3;break;default:re=x}var he=x;x=re;try{return K()}finally{x=he}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(K,re){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var he=x;x=K;try{return re()}finally{x=he}},e.unstable_scheduleCallback=function(K,re,he){var Ue=e.unstable_now();switch(typeof he=="object"&&he!==null?(he=he.delay,he=typeof he=="number"&&0<he?Ue+he:Ue):he=Ue,K){case 1:var xe=-1;break;case 2:xe=250;break;case 5:xe=1073741823;break;case 4:xe=1e4;break;default:xe=5e3}return xe=he+xe,K={id:m++,callback:re,priorityLevel:K,startTime:he,expirationTime:xe,sortIndex:-1},he>Ue?(K.sortIndex=he,t(f,K),n(c)===null&&K===n(f)&&(N?(k(Q),Q=-1):N=!0,xt(z,he-Ue))):(K.sortIndex=xe,t(c,K),w||C||(w=!0,Xe(M))),K},e.unstable_shouldYield=Ke,e.unstable_wrapCallback=function(K){var re=x;return function(){var he=x;x=re;try{return K.apply(this,arguments)}finally{x=he}}}})(Od);Td.exports=Od;var em=Td.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tm=y,mn=em;function J(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Rd=new Set,qs={};function Hr(e,t){ps(e,t),ps(e+"Capture",t)}function ps(e,t){for(qs[e]=t,e=0;e<t.length;e++)Rd.add(t[e])}var tr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Do=Object.prototype.hasOwnProperty,nm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hc={},Vc={};function rm(e){return Do.call(Vc,e)?!0:Do.call(Hc,e)?!1:nm.test(e)?Vc[e]=!0:(Hc[e]=!0,!1)}function sm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function am(e,t,n,r){if(t===null||typeof t>"u"||sm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function en(e,t,n,r,s,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$t[e]=new en(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$t[t]=new en(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$t[e]=new en(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$t[e]=new en(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$t[e]=new en(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$t[e]=new en(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$t[e]=new en(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$t[e]=new en(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$t[e]=new en(e,5,!1,e.toLowerCase(),null,!1,!1)});var Bl=/[\-:]([a-z])/g;function Hl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Bl,Hl);$t[t]=new en(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Bl,Hl);$t[t]=new en(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Bl,Hl);$t[t]=new en(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$t[e]=new en(e,1,!1,e.toLowerCase(),null,!1,!1)});$t.xlinkHref=new en("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$t[e]=new en(e,1,!1,e.toLowerCase(),null,!0,!0)});function Vl(e,t,n,r){var s=$t.hasOwnProperty(t)?$t[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(am(t,n,s,r)&&(n=null),r||s===null?rm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ar=tm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ea=Symbol.for("react.element"),Jr=Symbol.for("react.portal"),Qr=Symbol.for("react.fragment"),Kl=Symbol.for("react.strict_mode"),Uo=Symbol.for("react.profiler"),_d=Symbol.for("react.provider"),Dd=Symbol.for("react.context"),Wl=Symbol.for("react.forward_ref"),Ao=Symbol.for("react.suspense"),Fo=Symbol.for("react.suspense_list"),Yl=Symbol.for("react.memo"),lr=Symbol.for("react.lazy"),Ud=Symbol.for("react.offscreen"),Kc=Symbol.iterator;function Ns(e){return e===null||typeof e!="object"?null:(e=Kc&&e[Kc]||e["@@iterator"],typeof e=="function"?e:null)}var bt=Object.assign,ao;function _s(e){if(ao===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ao=t&&t[1]||""}return`
`+ao+e}var io=!1;function oo(e,t){if(!e||io)return"";io=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var s=f.stack.split(`
`),a=r.stack.split(`
`),o=s.length-1,u=a.length-1;1<=o&&0<=u&&s[o]!==a[u];)u--;for(;1<=o&&0<=u;o--,u--)if(s[o]!==a[u]){if(o!==1||u!==1)do if(o--,u--,0>u||s[o]!==a[u]){var c=`
`+s[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=u);break}}}finally{io=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?_s(e):""}function im(e){switch(e.tag){case 5:return _s(e.type);case 16:return _s("Lazy");case 13:return _s("Suspense");case 19:return _s("SuspenseList");case 0:case 2:case 15:return e=oo(e.type,!1),e;case 11:return e=oo(e.type.render,!1),e;case 1:return e=oo(e.type,!0),e;default:return""}}function $o(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qr:return"Fragment";case Jr:return"Portal";case Uo:return"Profiler";case Kl:return"StrictMode";case Ao:return"Suspense";case Fo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Dd:return(e.displayName||"Context")+".Consumer";case _d:return(e._context.displayName||"Context")+".Provider";case Wl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Yl:return t=e.displayName||null,t!==null?t:$o(e.type)||"Memo";case lr:t=e._payload,e=e._init;try{return $o(e(t))}catch{}}return null}function om(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $o(t);case 8:return t===Kl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ad(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function lm(e){var t=Ad(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function za(e){e._valueTracker||(e._valueTracker=lm(e))}function Fd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Ad(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function si(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bo(e,t){var n=t.checked;return bt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function Wc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=kr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function $d(e,t){t=t.checked,t!=null&&Vl(e,"checked",t,!1)}function Ho(e,t){$d(e,t);var n=kr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Vo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Vo(e,t.type,kr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Yc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Vo(e,t,n){(t!=="number"||si(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ds=Array.isArray;function is(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+kr(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Ko(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(J(91));return bt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Jc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(J(92));if(Ds(n)){if(1<n.length)throw Error(J(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:kr(n)}}function Bd(e,t){var n=kr(t.value),r=kr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Hd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Hd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Pa,Vd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Pa=Pa||document.createElement("div"),Pa.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Pa.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Xs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Fs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},cm=["Webkit","ms","Moz","O"];Object.keys(Fs).forEach(function(e){cm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Fs[t]=Fs[e]})});function Kd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Fs.hasOwnProperty(e)&&Fs[e]?(""+t).trim():t+"px"}function Wd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Kd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var um=bt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Yo(e,t){if(t){if(um[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(J(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(J(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(J(61))}if(t.style!=null&&typeof t.style!="object")throw Error(J(62))}}function Jo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qo=null;function Jl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var qo=null,os=null,ls=null;function qc(e){if(e=wa(e)){if(typeof qo!="function")throw Error(J(280));var t=e.stateNode;t&&(t=$i(t),qo(e.stateNode,e.type,t))}}function Yd(e){os?ls?ls.push(e):ls=[e]:os=e}function Jd(){if(os){var e=os,t=ls;if(ls=os=null,qc(e),t)for(e=0;e<t.length;e++)qc(t[e])}}function Qd(e,t){return e(t)}function qd(){}var lo=!1;function Xd(e,t,n){if(lo)return e(t,n);lo=!0;try{return Qd(e,t,n)}finally{lo=!1,(os!==null||ls!==null)&&(qd(),Jd())}}function Gs(e,t){var n=e.stateNode;if(n===null)return null;var r=$i(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(J(231,t,typeof n));return n}var Xo=!1;if(tr)try{var Cs={};Object.defineProperty(Cs,"passive",{get:function(){Xo=!0}}),window.addEventListener("test",Cs,Cs),window.removeEventListener("test",Cs,Cs)}catch{Xo=!1}function dm(e,t,n,r,s,a,o,u,c){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var $s=!1,ai=null,ii=!1,Go=null,fm={onError:function(e){$s=!0,ai=e}};function pm(e,t,n,r,s,a,o,u,c){$s=!1,ai=null,dm.apply(fm,arguments)}function hm(e,t,n,r,s,a,o,u,c){if(pm.apply(this,arguments),$s){if($s){var f=ai;$s=!1,ai=null}else throw Error(J(198));ii||(ii=!0,Go=f)}}function Vr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Gd(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xc(e){if(Vr(e)!==e)throw Error(J(188))}function mm(e){var t=e.alternate;if(!t){if(t=Vr(e),t===null)throw Error(J(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return Xc(s),e;if(a===r)return Xc(s),t;a=a.sibling}throw Error(J(188))}if(n.return!==r.return)n=s,r=a;else{for(var o=!1,u=s.child;u;){if(u===n){o=!0,n=s,r=a;break}if(u===r){o=!0,r=s,n=a;break}u=u.sibling}if(!o){for(u=a.child;u;){if(u===n){o=!0,n=a,r=s;break}if(u===r){o=!0,r=a,n=s;break}u=u.sibling}if(!o)throw Error(J(189))}}if(n.alternate!==r)throw Error(J(190))}if(n.tag!==3)throw Error(J(188));return n.stateNode.current===n?e:t}function Zd(e){return e=mm(e),e!==null?ef(e):null}function ef(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ef(e);if(t!==null)return t;e=e.sibling}return null}var tf=mn.unstable_scheduleCallback,Gc=mn.unstable_cancelCallback,gm=mn.unstable_shouldYield,xm=mn.unstable_requestPaint,Nt=mn.unstable_now,vm=mn.unstable_getCurrentPriorityLevel,Ql=mn.unstable_ImmediatePriority,nf=mn.unstable_UserBlockingPriority,oi=mn.unstable_NormalPriority,ym=mn.unstable_LowPriority,rf=mn.unstable_IdlePriority,Di=null,Wn=null;function bm(e){if(Wn&&typeof Wn.onCommitFiberRoot=="function")try{Wn.onCommitFiberRoot(Di,e,void 0,(e.current.flags&128)===128)}catch{}}var On=Math.clz32?Math.clz32:jm,wm=Math.log,km=Math.LN2;function jm(e){return e>>>=0,e===0?32:31-(wm(e)/km|0)|0}var Ma=64,Ia=4194304;function Us(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function li(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var u=o&~s;u!==0?r=Us(u):(a&=o,a!==0&&(r=Us(a)))}else o=n&~s,o!==0?r=Us(o):a!==0&&(r=Us(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,a=t&-t,s>=a||s===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-On(t),s=1<<n,r|=e[n],t&=~s;return r}function Sm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Nm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-On(a),u=1<<o,c=s[o];c===-1?(!(u&n)||u&r)&&(s[o]=Sm(u,t)):c<=t&&(e.expiredLanes|=u),a&=~u}}function Zo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function sf(){var e=Ma;return Ma<<=1,!(Ma&4194240)&&(Ma=64),e}function co(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ya(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-On(t),e[t]=n}function Cm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-On(n),a=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~a}}function ql(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-On(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var nt=0;function af(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var of,Xl,lf,cf,uf,el=!1,La=[],hr=null,mr=null,gr=null,Zs=new Map,ea=new Map,ur=[],Em="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zc(e,t){switch(e){case"focusin":case"focusout":hr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":Zs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ea.delete(t.pointerId)}}function Es(e,t,n,r,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[s]},t!==null&&(t=wa(t),t!==null&&Xl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function zm(e,t,n,r,s){switch(t){case"focusin":return hr=Es(hr,e,t,n,r,s),!0;case"dragenter":return mr=Es(mr,e,t,n,r,s),!0;case"mouseover":return gr=Es(gr,e,t,n,r,s),!0;case"pointerover":var a=s.pointerId;return Zs.set(a,Es(Zs.get(a)||null,e,t,n,r,s)),!0;case"gotpointercapture":return a=s.pointerId,ea.set(a,Es(ea.get(a)||null,e,t,n,r,s)),!0}return!1}function df(e){var t=Lr(e.target);if(t!==null){var n=Vr(t);if(n!==null){if(t=n.tag,t===13){if(t=Gd(n),t!==null){e.blockedOn=t,uf(e.priority,function(){lf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ya(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=tl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Qo=r,n.target.dispatchEvent(r),Qo=null}else return t=wa(n),t!==null&&Xl(t),e.blockedOn=n,!1;t.shift()}return!0}function eu(e,t,n){Ya(e)&&n.delete(t)}function Pm(){el=!1,hr!==null&&Ya(hr)&&(hr=null),mr!==null&&Ya(mr)&&(mr=null),gr!==null&&Ya(gr)&&(gr=null),Zs.forEach(eu),ea.forEach(eu)}function zs(e,t){e.blockedOn===t&&(e.blockedOn=null,el||(el=!0,mn.unstable_scheduleCallback(mn.unstable_NormalPriority,Pm)))}function ta(e){function t(s){return zs(s,e)}if(0<La.length){zs(La[0],e);for(var n=1;n<La.length;n++){var r=La[n];r.blockedOn===e&&(r.blockedOn=null)}}for(hr!==null&&zs(hr,e),mr!==null&&zs(mr,e),gr!==null&&zs(gr,e),Zs.forEach(t),ea.forEach(t),n=0;n<ur.length;n++)r=ur[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ur.length&&(n=ur[0],n.blockedOn===null);)df(n),n.blockedOn===null&&ur.shift()}var cs=ar.ReactCurrentBatchConfig,ci=!0;function Mm(e,t,n,r){var s=nt,a=cs.transition;cs.transition=null;try{nt=1,Gl(e,t,n,r)}finally{nt=s,cs.transition=a}}function Im(e,t,n,r){var s=nt,a=cs.transition;cs.transition=null;try{nt=4,Gl(e,t,n,r)}finally{nt=s,cs.transition=a}}function Gl(e,t,n,r){if(ci){var s=tl(e,t,n,r);if(s===null)bo(e,t,r,ui,n),Zc(e,r);else if(zm(s,e,t,n,r))r.stopPropagation();else if(Zc(e,r),t&4&&-1<Em.indexOf(e)){for(;s!==null;){var a=wa(s);if(a!==null&&of(a),a=tl(e,t,n,r),a===null&&bo(e,t,r,ui,n),a===s)break;s=a}s!==null&&r.stopPropagation()}else bo(e,t,r,null,n)}}var ui=null;function tl(e,t,n,r){if(ui=null,e=Jl(r),e=Lr(e),e!==null)if(t=Vr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Gd(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ui=e,null}function ff(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vm()){case Ql:return 1;case nf:return 4;case oi:case ym:return 16;case rf:return 536870912;default:return 16}default:return 16}}var fr=null,Zl=null,Ja=null;function pf(){if(Ja)return Ja;var e,t=Zl,n=t.length,r,s="value"in fr?fr.value:fr.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[a-r];r++);return Ja=s.slice(e,1<r?1-r:void 0)}function Qa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ta(){return!0}function tu(){return!1}function xn(e){function t(n,r,s,a,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(a):a[u]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ta:tu,this.isPropagationStopped=tu,this}return bt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ta)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ta)},persist:function(){},isPersistent:Ta}),t}var ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ec=xn(ks),ba=bt({},ks,{view:0,detail:0}),Lm=xn(ba),uo,fo,Ps,Ui=bt({},ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ps&&(Ps&&e.type==="mousemove"?(uo=e.screenX-Ps.screenX,fo=e.screenY-Ps.screenY):fo=uo=0,Ps=e),uo)},movementY:function(e){return"movementY"in e?e.movementY:fo}}),nu=xn(Ui),Tm=bt({},Ui,{dataTransfer:0}),Om=xn(Tm),Rm=bt({},ba,{relatedTarget:0}),po=xn(Rm),_m=bt({},ks,{animationName:0,elapsedTime:0,pseudoElement:0}),Dm=xn(_m),Um=bt({},ks,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Am=xn(Um),Fm=bt({},ks,{data:0}),ru=xn(Fm),$m={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Hm[e])?!!t[e]:!1}function tc(){return Vm}var Km=bt({},ba,{key:function(e){if(e.key){var t=$m[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tc,charCode:function(e){return e.type==="keypress"?Qa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wm=xn(Km),Ym=bt({},Ui,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),su=xn(Ym),Jm=bt({},ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tc}),Qm=xn(Jm),qm=bt({},ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xm=xn(qm),Gm=bt({},Ui,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Zm=xn(Gm),eg=[9,13,27,32],nc=tr&&"CompositionEvent"in window,Bs=null;tr&&"documentMode"in document&&(Bs=document.documentMode);var tg=tr&&"TextEvent"in window&&!Bs,hf=tr&&(!nc||Bs&&8<Bs&&11>=Bs),au=" ",iu=!1;function mf(e,t){switch(e){case"keyup":return eg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function gf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qr=!1;function ng(e,t){switch(e){case"compositionend":return gf(t);case"keypress":return t.which!==32?null:(iu=!0,au);case"textInput":return e=t.data,e===au&&iu?null:e;default:return null}}function rg(e,t){if(qr)return e==="compositionend"||!nc&&mf(e,t)?(e=pf(),Ja=Zl=fr=null,qr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hf&&t.locale!=="ko"?null:t.data;default:return null}}var sg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ou(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!sg[e.type]:t==="textarea"}function xf(e,t,n,r){Yd(r),t=di(t,"onChange"),0<t.length&&(n=new ec("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Hs=null,na=null;function ag(e){zf(e,0)}function Ai(e){var t=Zr(e);if(Fd(t))return e}function ig(e,t){if(e==="change")return t}var vf=!1;if(tr){var ho;if(tr){var mo="oninput"in document;if(!mo){var lu=document.createElement("div");lu.setAttribute("oninput","return;"),mo=typeof lu.oninput=="function"}ho=mo}else ho=!1;vf=ho&&(!document.documentMode||9<document.documentMode)}function cu(){Hs&&(Hs.detachEvent("onpropertychange",yf),na=Hs=null)}function yf(e){if(e.propertyName==="value"&&Ai(na)){var t=[];xf(t,na,e,Jl(e)),Xd(ag,t)}}function og(e,t,n){e==="focusin"?(cu(),Hs=t,na=n,Hs.attachEvent("onpropertychange",yf)):e==="focusout"&&cu()}function lg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ai(na)}function cg(e,t){if(e==="click")return Ai(t)}function ug(e,t){if(e==="input"||e==="change")return Ai(t)}function dg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var _n=typeof Object.is=="function"?Object.is:dg;function ra(e,t){if(_n(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Do.call(t,s)||!_n(e[s],t[s]))return!1}return!0}function uu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function du(e,t){var n=uu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=uu(n)}}function bf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?bf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function wf(){for(var e=window,t=si();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=si(e.document)}return t}function rc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function fg(e){var t=wf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&bf(n.ownerDocument.documentElement,n)){if(r!==null&&rc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,a=Math.min(r.start,s);r=r.end===void 0?a:Math.min(r.end,s),!e.extend&&a>r&&(s=r,r=a,a=s),s=du(n,a);var o=du(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var pg=tr&&"documentMode"in document&&11>=document.documentMode,Xr=null,nl=null,Vs=null,rl=!1;function fu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;rl||Xr==null||Xr!==si(r)||(r=Xr,"selectionStart"in r&&rc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Vs&&ra(Vs,r)||(Vs=r,r=di(nl,"onSelect"),0<r.length&&(t=new ec("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function Oa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Gr={animationend:Oa("Animation","AnimationEnd"),animationiteration:Oa("Animation","AnimationIteration"),animationstart:Oa("Animation","AnimationStart"),transitionend:Oa("Transition","TransitionEnd")},go={},kf={};tr&&(kf=document.createElement("div").style,"AnimationEvent"in window||(delete Gr.animationend.animation,delete Gr.animationiteration.animation,delete Gr.animationstart.animation),"TransitionEvent"in window||delete Gr.transitionend.transition);function Fi(e){if(go[e])return go[e];if(!Gr[e])return e;var t=Gr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in kf)return go[e]=t[n];return e}var jf=Fi("animationend"),Sf=Fi("animationiteration"),Nf=Fi("animationstart"),Cf=Fi("transitionend"),Ef=new Map,pu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(e,t){Ef.set(e,t),Hr(t,[e])}for(var xo=0;xo<pu.length;xo++){var vo=pu[xo],hg=vo.toLowerCase(),mg=vo[0].toUpperCase()+vo.slice(1);Nr(hg,"on"+mg)}Nr(jf,"onAnimationEnd");Nr(Sf,"onAnimationIteration");Nr(Nf,"onAnimationStart");Nr("dblclick","onDoubleClick");Nr("focusin","onFocus");Nr("focusout","onBlur");Nr(Cf,"onTransitionEnd");ps("onMouseEnter",["mouseout","mouseover"]);ps("onMouseLeave",["mouseout","mouseover"]);ps("onPointerEnter",["pointerout","pointerover"]);ps("onPointerLeave",["pointerout","pointerover"]);Hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var As="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gg=new Set("cancel close invalid load scroll toggle".split(" ").concat(As));function hu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,hm(r,t,void 0,e),e.currentTarget=null}function zf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var u=r[o],c=u.instance,f=u.currentTarget;if(u=u.listener,c!==a&&s.isPropagationStopped())break e;hu(s,u,f),a=c}else for(o=0;o<r.length;o++){if(u=r[o],c=u.instance,f=u.currentTarget,u=u.listener,c!==a&&s.isPropagationStopped())break e;hu(s,u,f),a=c}}}if(ii)throw e=Go,ii=!1,Go=null,e}function dt(e,t){var n=t[ll];n===void 0&&(n=t[ll]=new Set);var r=e+"__bubble";n.has(r)||(Pf(t,e,2,!1),n.add(r))}function yo(e,t,n){var r=0;t&&(r|=4),Pf(n,e,r,t)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function sa(e){if(!e[Ra]){e[Ra]=!0,Rd.forEach(function(n){n!=="selectionchange"&&(gg.has(n)||yo(n,!1,e),yo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ra]||(t[Ra]=!0,yo("selectionchange",!1,t))}}function Pf(e,t,n,r){switch(ff(t)){case 1:var s=Mm;break;case 4:s=Im;break;default:s=Gl}n=s.bind(null,t,n,e),s=void 0,!Xo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function bo(e,t,n,r,s){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var u=r.stateNode.containerInfo;if(u===s||u.nodeType===8&&u.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;u!==null;){if(o=Lr(u),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue e}u=u.parentNode}}r=r.return}Xd(function(){var f=a,m=Jl(n),b=[];e:{var x=Ef.get(e);if(x!==void 0){var C=ec,w=e;switch(e){case"keypress":if(Qa(n)===0)break e;case"keydown":case"keyup":C=Wm;break;case"focusin":w="focus",C=po;break;case"focusout":w="blur",C=po;break;case"beforeblur":case"afterblur":C=po;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=nu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Om;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=Qm;break;case jf:case Sf:case Nf:C=Dm;break;case Cf:C=Xm;break;case"scroll":C=Lm;break;case"wheel":C=Zm;break;case"copy":case"cut":case"paste":C=Am;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=su}var N=(t&4)!==0,L=!N&&e==="scroll",k=N?x!==null?x+"Capture":null:x;N=[];for(var v=f,E;v!==null;){E=v;var z=E.stateNode;if(E.tag===5&&z!==null&&(E=z,k!==null&&(z=Gs(v,k),z!=null&&N.push(aa(v,z,E)))),L)break;v=v.return}0<N.length&&(x=new C(x,w,null,n,m),b.push({event:x,listeners:N}))}}if(!(t&7)){e:{if(x=e==="mouseover"||e==="pointerover",C=e==="mouseout"||e==="pointerout",x&&n!==Qo&&(w=n.relatedTarget||n.fromElement)&&(Lr(w)||w[nr]))break e;if((C||x)&&(x=m.window===m?m:(x=m.ownerDocument)?x.defaultView||x.parentWindow:window,C?(w=n.relatedTarget||n.toElement,C=f,w=w?Lr(w):null,w!==null&&(L=Vr(w),w!==L||w.tag!==5&&w.tag!==6)&&(w=null)):(C=null,w=f),C!==w)){if(N=nu,z="onMouseLeave",k="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(N=su,z="onPointerLeave",k="onPointerEnter",v="pointer"),L=C==null?x:Zr(C),E=w==null?x:Zr(w),x=new N(z,v+"leave",C,n,m),x.target=L,x.relatedTarget=E,z=null,Lr(m)===f&&(N=new N(k,v+"enter",w,n,m),N.target=E,N.relatedTarget=L,z=N),L=z,C&&w)t:{for(N=C,k=w,v=0,E=N;E;E=Kr(E))v++;for(E=0,z=k;z;z=Kr(z))E++;for(;0<v-E;)N=Kr(N),v--;for(;0<E-v;)k=Kr(k),E--;for(;v--;){if(N===k||k!==null&&N===k.alternate)break t;N=Kr(N),k=Kr(k)}N=null}else N=null;C!==null&&mu(b,x,C,N,!1),w!==null&&L!==null&&mu(b,L,w,N,!0)}}e:{if(x=f?Zr(f):window,C=x.nodeName&&x.nodeName.toLowerCase(),C==="select"||C==="input"&&x.type==="file")var M=ig;else if(ou(x))if(vf)M=ug;else{M=lg;var _=og}else(C=x.nodeName)&&C.toLowerCase()==="input"&&(x.type==="checkbox"||x.type==="radio")&&(M=cg);if(M&&(M=M(e,f))){xf(b,M,n,m);break e}_&&_(e,x,f),e==="focusout"&&(_=x._wrapperState)&&_.controlled&&x.type==="number"&&Vo(x,"number",x.value)}switch(_=f?Zr(f):window,e){case"focusin":(ou(_)||_.contentEditable==="true")&&(Xr=_,nl=f,Vs=null);break;case"focusout":Vs=nl=Xr=null;break;case"mousedown":rl=!0;break;case"contextmenu":case"mouseup":case"dragend":rl=!1,fu(b,n,m);break;case"selectionchange":if(pg)break;case"keydown":case"keyup":fu(b,n,m)}var D;if(nc)e:{switch(e){case"compositionstart":var Q="onCompositionStart";break e;case"compositionend":Q="onCompositionEnd";break e;case"compositionupdate":Q="onCompositionUpdate";break e}Q=void 0}else qr?mf(e,n)&&(Q="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(Q="onCompositionStart");Q&&(hf&&n.locale!=="ko"&&(qr||Q!=="onCompositionStart"?Q==="onCompositionEnd"&&qr&&(D=pf()):(fr=m,Zl="value"in fr?fr.value:fr.textContent,qr=!0)),_=di(f,Q),0<_.length&&(Q=new ru(Q,e,null,n,m),b.push({event:Q,listeners:_}),D?Q.data=D:(D=gf(n),D!==null&&(Q.data=D)))),(D=tg?ng(e,n):rg(e,n))&&(f=di(f,"onBeforeInput"),0<f.length&&(m=new ru("onBeforeInput","beforeinput",null,n,m),b.push({event:m,listeners:f}),m.data=D))}zf(b,t)})}function aa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function di(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=Gs(e,n),a!=null&&r.unshift(aa(e,a,s)),a=Gs(e,t),a!=null&&r.push(aa(e,a,s))),e=e.return}return r}function Kr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function mu(e,t,n,r,s){for(var a=t._reactName,o=[];n!==null&&n!==r;){var u=n,c=u.alternate,f=u.stateNode;if(c!==null&&c===r)break;u.tag===5&&f!==null&&(u=f,s?(c=Gs(n,a),c!=null&&o.unshift(aa(n,c,u))):s||(c=Gs(n,a),c!=null&&o.push(aa(n,c,u)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var xg=/\r\n?/g,vg=/\u0000|\uFFFD/g;function gu(e){return(typeof e=="string"?e:""+e).replace(xg,`
`).replace(vg,"")}function _a(e,t,n){if(t=gu(t),gu(e)!==t&&n)throw Error(J(425))}function fi(){}var sl=null,al=null;function il(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ol=typeof setTimeout=="function"?setTimeout:void 0,yg=typeof clearTimeout=="function"?clearTimeout:void 0,xu=typeof Promise=="function"?Promise:void 0,bg=typeof queueMicrotask=="function"?queueMicrotask:typeof xu<"u"?function(e){return xu.resolve(null).then(e).catch(wg)}:ol;function wg(e){setTimeout(function(){throw e})}function wo(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),ta(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ta(t)}function xr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function vu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var js=Math.random().toString(36).slice(2),Vn="__reactFiber$"+js,ia="__reactProps$"+js,nr="__reactContainer$"+js,ll="__reactEvents$"+js,kg="__reactListeners$"+js,jg="__reactHandles$"+js;function Lr(e){var t=e[Vn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[nr]||n[Vn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=vu(e);e!==null;){if(n=e[Vn])return n;e=vu(e)}return t}e=n,n=e.parentNode}return null}function wa(e){return e=e[Vn]||e[nr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(J(33))}function $i(e){return e[ia]||null}var cl=[],es=-1;function Cr(e){return{current:e}}function ft(e){0>es||(e.current=cl[es],cl[es]=null,es--)}function it(e,t){es++,cl[es]=e.current,e.current=t}var jr={},Wt=Cr(jr),cn=Cr(!1),Ur=jr;function hs(e,t){var n=e.type.contextTypes;if(!n)return jr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in n)s[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function un(e){return e=e.childContextTypes,e!=null}function pi(){ft(cn),ft(Wt)}function yu(e,t,n){if(Wt.current!==jr)throw Error(J(168));it(Wt,t),it(cn,n)}function Mf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(J(108,om(e)||"Unknown",s));return bt({},n,r)}function hi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jr,Ur=Wt.current,it(Wt,e),it(cn,cn.current),!0}function bu(e,t,n){var r=e.stateNode;if(!r)throw Error(J(169));n?(e=Mf(e,t,Ur),r.__reactInternalMemoizedMergedChildContext=e,ft(cn),ft(Wt),it(Wt,e)):ft(cn),it(cn,n)}var Xn=null,Bi=!1,ko=!1;function If(e){Xn===null?Xn=[e]:Xn.push(e)}function Sg(e){Bi=!0,If(e)}function Er(){if(!ko&&Xn!==null){ko=!0;var e=0,t=nt;try{var n=Xn;for(nt=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xn=null,Bi=!1}catch(s){throw Xn!==null&&(Xn=Xn.slice(e+1)),tf(Ql,Er),s}finally{nt=t,ko=!1}}return null}var ts=[],ns=0,mi=null,gi=0,bn=[],wn=0,Ar=null,Gn=1,Zn="";function Mr(e,t){ts[ns++]=gi,ts[ns++]=mi,mi=e,gi=t}function Lf(e,t,n){bn[wn++]=Gn,bn[wn++]=Zn,bn[wn++]=Ar,Ar=e;var r=Gn;e=Zn;var s=32-On(r)-1;r&=~(1<<s),n+=1;var a=32-On(t)+s;if(30<a){var o=s-s%5;a=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Gn=1<<32-On(t)+s|n<<s|r,Zn=a+e}else Gn=1<<a|n<<s|r,Zn=e}function sc(e){e.return!==null&&(Mr(e,1),Lf(e,1,0))}function ac(e){for(;e===mi;)mi=ts[--ns],ts[ns]=null,gi=ts[--ns],ts[ns]=null;for(;e===Ar;)Ar=bn[--wn],bn[wn]=null,Zn=bn[--wn],bn[wn]=null,Gn=bn[--wn],bn[wn]=null}var hn=null,pn=null,gt=!1,Tn=null;function Tf(e,t){var n=kn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function wu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,hn=e,pn=xr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,hn=e,pn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ar!==null?{id:Gn,overflow:Zn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=kn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,hn=e,pn=null,!0):!1;default:return!1}}function ul(e){return(e.mode&1)!==0&&(e.flags&128)===0}function dl(e){if(gt){var t=pn;if(t){var n=t;if(!wu(e,t)){if(ul(e))throw Error(J(418));t=xr(n.nextSibling);var r=hn;t&&wu(e,t)?Tf(r,n):(e.flags=e.flags&-4097|2,gt=!1,hn=e)}}else{if(ul(e))throw Error(J(418));e.flags=e.flags&-4097|2,gt=!1,hn=e}}}function ku(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;hn=e}function Da(e){if(e!==hn)return!1;if(!gt)return ku(e),gt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!il(e.type,e.memoizedProps)),t&&(t=pn)){if(ul(e))throw Of(),Error(J(418));for(;t;)Tf(e,t),t=xr(t.nextSibling)}if(ku(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(J(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){pn=xr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}pn=null}}else pn=hn?xr(e.stateNode.nextSibling):null;return!0}function Of(){for(var e=pn;e;)e=xr(e.nextSibling)}function ms(){pn=hn=null,gt=!1}function ic(e){Tn===null?Tn=[e]:Tn.push(e)}var Ng=ar.ReactCurrentBatchConfig;function Ms(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(J(309));var r=n.stateNode}if(!r)throw Error(J(147,e));var s=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var u=s.refs;o===null?delete u[a]:u[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(J(284));if(!n._owner)throw Error(J(290,e))}return e}function Ua(e,t){throw e=Object.prototype.toString.call(t),Error(J(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ju(e){var t=e._init;return t(e._payload)}function Rf(e){function t(k,v){if(e){var E=k.deletions;E===null?(k.deletions=[v],k.flags|=16):E.push(v)}}function n(k,v){if(!e)return null;for(;v!==null;)t(k,v),v=v.sibling;return null}function r(k,v){for(k=new Map;v!==null;)v.key!==null?k.set(v.key,v):k.set(v.index,v),v=v.sibling;return k}function s(k,v){return k=wr(k,v),k.index=0,k.sibling=null,k}function a(k,v,E){return k.index=E,e?(E=k.alternate,E!==null?(E=E.index,E<v?(k.flags|=2,v):E):(k.flags|=2,v)):(k.flags|=1048576,v)}function o(k){return e&&k.alternate===null&&(k.flags|=2),k}function u(k,v,E,z){return v===null||v.tag!==6?(v=Po(E,k.mode,z),v.return=k,v):(v=s(v,E),v.return=k,v)}function c(k,v,E,z){var M=E.type;return M===Qr?m(k,v,E.props.children,z,E.key):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===lr&&ju(M)===v.type)?(z=s(v,E.props),z.ref=Ms(k,v,E),z.return=k,z):(z=ni(E.type,E.key,E.props,null,k.mode,z),z.ref=Ms(k,v,E),z.return=k,z)}function f(k,v,E,z){return v===null||v.tag!==4||v.stateNode.containerInfo!==E.containerInfo||v.stateNode.implementation!==E.implementation?(v=Mo(E,k.mode,z),v.return=k,v):(v=s(v,E.children||[]),v.return=k,v)}function m(k,v,E,z,M){return v===null||v.tag!==7?(v=_r(E,k.mode,z,M),v.return=k,v):(v=s(v,E),v.return=k,v)}function b(k,v,E){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Po(""+v,k.mode,E),v.return=k,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Ea:return E=ni(v.type,v.key,v.props,null,k.mode,E),E.ref=Ms(k,null,v),E.return=k,E;case Jr:return v=Mo(v,k.mode,E),v.return=k,v;case lr:var z=v._init;return b(k,z(v._payload),E)}if(Ds(v)||Ns(v))return v=_r(v,k.mode,E,null),v.return=k,v;Ua(k,v)}return null}function x(k,v,E,z){var M=v!==null?v.key:null;if(typeof E=="string"&&E!==""||typeof E=="number")return M!==null?null:u(k,v,""+E,z);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ea:return E.key===M?c(k,v,E,z):null;case Jr:return E.key===M?f(k,v,E,z):null;case lr:return M=E._init,x(k,v,M(E._payload),z)}if(Ds(E)||Ns(E))return M!==null?null:m(k,v,E,z,null);Ua(k,E)}return null}function C(k,v,E,z,M){if(typeof z=="string"&&z!==""||typeof z=="number")return k=k.get(E)||null,u(v,k,""+z,M);if(typeof z=="object"&&z!==null){switch(z.$$typeof){case Ea:return k=k.get(z.key===null?E:z.key)||null,c(v,k,z,M);case Jr:return k=k.get(z.key===null?E:z.key)||null,f(v,k,z,M);case lr:var _=z._init;return C(k,v,E,_(z._payload),M)}if(Ds(z)||Ns(z))return k=k.get(E)||null,m(v,k,z,M,null);Ua(v,z)}return null}function w(k,v,E,z){for(var M=null,_=null,D=v,Q=v=0,Oe=null;D!==null&&Q<E.length;Q++){D.index>Q?(Oe=D,D=null):Oe=D.sibling;var pe=x(k,D,E[Q],z);if(pe===null){D===null&&(D=Oe);break}e&&D&&pe.alternate===null&&t(k,D),v=a(pe,v,Q),_===null?M=pe:_.sibling=pe,_=pe,D=Oe}if(Q===E.length)return n(k,D),gt&&Mr(k,Q),M;if(D===null){for(;Q<E.length;Q++)D=b(k,E[Q],z),D!==null&&(v=a(D,v,Q),_===null?M=D:_.sibling=D,_=D);return gt&&Mr(k,Q),M}for(D=r(k,D);Q<E.length;Q++)Oe=C(D,k,Q,E[Q],z),Oe!==null&&(e&&Oe.alternate!==null&&D.delete(Oe.key===null?Q:Oe.key),v=a(Oe,v,Q),_===null?M=Oe:_.sibling=Oe,_=Oe);return e&&D.forEach(function(Ke){return t(k,Ke)}),gt&&Mr(k,Q),M}function N(k,v,E,z){var M=Ns(E);if(typeof M!="function")throw Error(J(150));if(E=M.call(E),E==null)throw Error(J(151));for(var _=M=null,D=v,Q=v=0,Oe=null,pe=E.next();D!==null&&!pe.done;Q++,pe=E.next()){D.index>Q?(Oe=D,D=null):Oe=D.sibling;var Ke=x(k,D,pe.value,z);if(Ke===null){D===null&&(D=Oe);break}e&&D&&Ke.alternate===null&&t(k,D),v=a(Ke,v,Q),_===null?M=Ke:_.sibling=Ke,_=Ke,D=Oe}if(pe.done)return n(k,D),gt&&Mr(k,Q),M;if(D===null){for(;!pe.done;Q++,pe=E.next())pe=b(k,pe.value,z),pe!==null&&(v=a(pe,v,Q),_===null?M=pe:_.sibling=pe,_=pe);return gt&&Mr(k,Q),M}for(D=r(k,D);!pe.done;Q++,pe=E.next())pe=C(D,k,Q,pe.value,z),pe!==null&&(e&&pe.alternate!==null&&D.delete(pe.key===null?Q:pe.key),v=a(pe,v,Q),_===null?M=pe:_.sibling=pe,_=pe);return e&&D.forEach(function(pt){return t(k,pt)}),gt&&Mr(k,Q),M}function L(k,v,E,z){if(typeof E=="object"&&E!==null&&E.type===Qr&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case Ea:e:{for(var M=E.key,_=v;_!==null;){if(_.key===M){if(M=E.type,M===Qr){if(_.tag===7){n(k,_.sibling),v=s(_,E.props.children),v.return=k,k=v;break e}}else if(_.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===lr&&ju(M)===_.type){n(k,_.sibling),v=s(_,E.props),v.ref=Ms(k,_,E),v.return=k,k=v;break e}n(k,_);break}else t(k,_);_=_.sibling}E.type===Qr?(v=_r(E.props.children,k.mode,z,E.key),v.return=k,k=v):(z=ni(E.type,E.key,E.props,null,k.mode,z),z.ref=Ms(k,v,E),z.return=k,k=z)}return o(k);case Jr:e:{for(_=E.key;v!==null;){if(v.key===_)if(v.tag===4&&v.stateNode.containerInfo===E.containerInfo&&v.stateNode.implementation===E.implementation){n(k,v.sibling),v=s(v,E.children||[]),v.return=k,k=v;break e}else{n(k,v);break}else t(k,v);v=v.sibling}v=Mo(E,k.mode,z),v.return=k,k=v}return o(k);case lr:return _=E._init,L(k,v,_(E._payload),z)}if(Ds(E))return w(k,v,E,z);if(Ns(E))return N(k,v,E,z);Ua(k,E)}return typeof E=="string"&&E!==""||typeof E=="number"?(E=""+E,v!==null&&v.tag===6?(n(k,v.sibling),v=s(v,E),v.return=k,k=v):(n(k,v),v=Po(E,k.mode,z),v.return=k,k=v),o(k)):n(k,v)}return L}var gs=Rf(!0),_f=Rf(!1),xi=Cr(null),vi=null,rs=null,oc=null;function lc(){oc=rs=vi=null}function cc(e){var t=xi.current;ft(xi),e._currentValue=t}function fl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function us(e,t){vi=e,oc=rs=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ln=!0),e.firstContext=null)}function Sn(e){var t=e._currentValue;if(oc!==e)if(e={context:e,memoizedValue:t,next:null},rs===null){if(vi===null)throw Error(J(308));rs=e,vi.dependencies={lanes:0,firstContext:e}}else rs=rs.next=e;return t}var Tr=null;function uc(e){Tr===null?Tr=[e]:Tr.push(e)}function Df(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,uc(t)):(n.next=s.next,s.next=n),t.interleaved=n,rr(e,r)}function rr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var cr=!1;function dc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Uf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function er(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function vr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ye&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,rr(e,n)}return s=r.interleaved,s===null?(t.next=t,uc(r)):(t.next=s.next,s.next=t),r.interleaved=t,rr(e,n)}function qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ql(e,n)}}function Su(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?s=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function yi(e,t,n,r){var s=e.updateQueue;cr=!1;var a=s.firstBaseUpdate,o=s.lastBaseUpdate,u=s.shared.pending;if(u!==null){s.shared.pending=null;var c=u,f=c.next;c.next=null,o===null?a=f:o.next=f,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,u=m.lastBaseUpdate,u!==o&&(u===null?m.firstBaseUpdate=f:u.next=f,m.lastBaseUpdate=c))}if(a!==null){var b=s.baseState;o=0,m=f=c=null,u=a;do{var x=u.lane,C=u.eventTime;if((r&x)===x){m!==null&&(m=m.next={eventTime:C,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var w=e,N=u;switch(x=t,C=n,N.tag){case 1:if(w=N.payload,typeof w=="function"){b=w.call(C,b,x);break e}b=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=N.payload,x=typeof w=="function"?w.call(C,b,x):w,x==null)break e;b=bt({},b,x);break e;case 2:cr=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,x=s.effects,x===null?s.effects=[u]:x.push(u))}else C={eventTime:C,lane:x,tag:u.tag,payload:u.payload,callback:u.callback,next:null},m===null?(f=m=C,c=b):m=m.next=C,o|=x;if(u=u.next,u===null){if(u=s.shared.pending,u===null)break;x=u,u=x.next,x.next=null,s.lastBaseUpdate=x,s.shared.pending=null}}while(!0);if(m===null&&(c=b),s.baseState=c,s.firstBaseUpdate=f,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else a===null&&(s.shared.lanes=0);$r|=o,e.lanes=o,e.memoizedState=b}}function Nu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(J(191,s));s.call(r)}}}var ka={},Yn=Cr(ka),oa=Cr(ka),la=Cr(ka);function Or(e){if(e===ka)throw Error(J(174));return e}function fc(e,t){switch(it(la,t),it(oa,e),it(Yn,ka),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Wo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Wo(t,e)}ft(Yn),it(Yn,t)}function xs(){ft(Yn),ft(oa),ft(la)}function Af(e){Or(la.current);var t=Or(Yn.current),n=Wo(t,e.type);t!==n&&(it(oa,e),it(Yn,n))}function pc(e){oa.current===e&&(ft(Yn),ft(oa))}var vt=Cr(0);function bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var jo=[];function hc(){for(var e=0;e<jo.length;e++)jo[e]._workInProgressVersionPrimary=null;jo.length=0}var Xa=ar.ReactCurrentDispatcher,So=ar.ReactCurrentBatchConfig,Fr=0,yt=null,Lt=null,Dt=null,wi=!1,Ks=!1,ca=0,Cg=0;function Ht(){throw Error(J(321))}function mc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!_n(e[n],t[n]))return!1;return!0}function gc(e,t,n,r,s,a){if(Fr=a,yt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xa.current=e===null||e.memoizedState===null?Mg:Ig,e=n(r,s),Ks){a=0;do{if(Ks=!1,ca=0,25<=a)throw Error(J(301));a+=1,Dt=Lt=null,t.updateQueue=null,Xa.current=Lg,e=n(r,s)}while(Ks)}if(Xa.current=ki,t=Lt!==null&&Lt.next!==null,Fr=0,Dt=Lt=yt=null,wi=!1,t)throw Error(J(300));return e}function xc(){var e=ca!==0;return ca=0,e}function Hn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Dt===null?yt.memoizedState=Dt=e:Dt=Dt.next=e,Dt}function Nn(){if(Lt===null){var e=yt.alternate;e=e!==null?e.memoizedState:null}else e=Lt.next;var t=Dt===null?yt.memoizedState:Dt.next;if(t!==null)Dt=t,Lt=e;else{if(e===null)throw Error(J(310));Lt=e,e={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},Dt===null?yt.memoizedState=Dt=e:Dt=Dt.next=e}return Dt}function ua(e,t){return typeof t=="function"?t(e):t}function No(e){var t=Nn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=Lt,s=r.baseQueue,a=n.pending;if(a!==null){if(s!==null){var o=s.next;s.next=a.next,a.next=o}r.baseQueue=s=a,n.pending=null}if(s!==null){a=s.next,r=r.baseState;var u=o=null,c=null,f=a;do{var m=f.lane;if((Fr&m)===m)c!==null&&(c=c.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var b={lane:m,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};c===null?(u=c=b,o=r):c=c.next=b,yt.lanes|=m,$r|=m}f=f.next}while(f!==null&&f!==a);c===null?o=r:c.next=u,_n(r,t.memoizedState)||(ln=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do a=s.lane,yt.lanes|=a,$r|=a,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Co(e){var t=Nn(),n=t.queue;if(n===null)throw Error(J(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do a=e(a,o.action),o=o.next;while(o!==s);_n(a,t.memoizedState)||(ln=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Ff(){}function $f(e,t){var n=yt,r=Nn(),s=t(),a=!_n(r.memoizedState,s);if(a&&(r.memoizedState=s,ln=!0),r=r.queue,vc(Vf.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Dt!==null&&Dt.memoizedState.tag&1){if(n.flags|=2048,da(9,Hf.bind(null,n,r,s,t),void 0,null),Ut===null)throw Error(J(349));Fr&30||Bf(n,t,s)}return s}function Bf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=yt.updateQueue,t===null?(t={lastEffect:null,stores:null},yt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Hf(e,t,n,r){t.value=n,t.getSnapshot=r,Kf(t)&&Wf(e)}function Vf(e,t,n){return n(function(){Kf(t)&&Wf(e)})}function Kf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!_n(e,n)}catch{return!0}}function Wf(e){var t=rr(e,1);t!==null&&Rn(t,e,1,-1)}function Cu(e){var t=Hn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ua,lastRenderedState:e},t.queue=e,e=e.dispatch=Pg.bind(null,yt,e),[t.memoizedState,e]}function da(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=yt.updateQueue,t===null?(t={lastEffect:null,stores:null},yt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Yf(){return Nn().memoizedState}function Ga(e,t,n,r){var s=Hn();yt.flags|=e,s.memoizedState=da(1|t,n,void 0,r===void 0?null:r)}function Hi(e,t,n,r){var s=Nn();r=r===void 0?null:r;var a=void 0;if(Lt!==null){var o=Lt.memoizedState;if(a=o.destroy,r!==null&&mc(r,o.deps)){s.memoizedState=da(t,n,a,r);return}}yt.flags|=e,s.memoizedState=da(1|t,n,a,r)}function Eu(e,t){return Ga(8390656,8,e,t)}function vc(e,t){return Hi(2048,8,e,t)}function Jf(e,t){return Hi(4,2,e,t)}function Qf(e,t){return Hi(4,4,e,t)}function qf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xf(e,t,n){return n=n!=null?n.concat([e]):null,Hi(4,4,qf.bind(null,t,e),n)}function yc(){}function Gf(e,t){var n=Nn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&mc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Zf(e,t){var n=Nn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&mc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ep(e,t,n){return Fr&21?(_n(n,t)||(n=sf(),yt.lanes|=n,$r|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ln=!0),e.memoizedState=n)}function Eg(e,t){var n=nt;nt=n!==0&&4>n?n:4,e(!0);var r=So.transition;So.transition={};try{e(!1),t()}finally{nt=n,So.transition=r}}function tp(){return Nn().memoizedState}function zg(e,t,n){var r=br(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},np(e))rp(t,n);else if(n=Df(e,t,n,r),n!==null){var s=Gt();Rn(n,e,r,s),sp(n,t,r)}}function Pg(e,t,n){var r=br(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(np(e))rp(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,u=a(o,n);if(s.hasEagerState=!0,s.eagerState=u,_n(u,o)){var c=t.interleaved;c===null?(s.next=s,uc(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=Df(e,t,s,r),n!==null&&(s=Gt(),Rn(n,e,r,s),sp(n,t,r))}}function np(e){var t=e.alternate;return e===yt||t!==null&&t===yt}function rp(e,t){Ks=wi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function sp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ql(e,n)}}var ki={readContext:Sn,useCallback:Ht,useContext:Ht,useEffect:Ht,useImperativeHandle:Ht,useInsertionEffect:Ht,useLayoutEffect:Ht,useMemo:Ht,useReducer:Ht,useRef:Ht,useState:Ht,useDebugValue:Ht,useDeferredValue:Ht,useTransition:Ht,useMutableSource:Ht,useSyncExternalStore:Ht,useId:Ht,unstable_isNewReconciler:!1},Mg={readContext:Sn,useCallback:function(e,t){return Hn().memoizedState=[e,t===void 0?null:t],e},useContext:Sn,useEffect:Eu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ga(4194308,4,qf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ga(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ga(4,2,e,t)},useMemo:function(e,t){var n=Hn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Hn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=zg.bind(null,yt,e),[r.memoizedState,e]},useRef:function(e){var t=Hn();return e={current:e},t.memoizedState=e},useState:Cu,useDebugValue:yc,useDeferredValue:function(e){return Hn().memoizedState=e},useTransition:function(){var e=Cu(!1),t=e[0];return e=Eg.bind(null,e[1]),Hn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=yt,s=Hn();if(gt){if(n===void 0)throw Error(J(407));n=n()}else{if(n=t(),Ut===null)throw Error(J(349));Fr&30||Bf(r,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Eu(Vf.bind(null,r,a,e),[e]),r.flags|=2048,da(9,Hf.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Hn(),t=Ut.identifierPrefix;if(gt){var n=Zn,r=Gn;n=(r&~(1<<32-On(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=ca++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Cg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Ig={readContext:Sn,useCallback:Gf,useContext:Sn,useEffect:vc,useImperativeHandle:Xf,useInsertionEffect:Jf,useLayoutEffect:Qf,useMemo:Zf,useReducer:No,useRef:Yf,useState:function(){return No(ua)},useDebugValue:yc,useDeferredValue:function(e){var t=Nn();return ep(t,Lt.memoizedState,e)},useTransition:function(){var e=No(ua)[0],t=Nn().memoizedState;return[e,t]},useMutableSource:Ff,useSyncExternalStore:$f,useId:tp,unstable_isNewReconciler:!1},Lg={readContext:Sn,useCallback:Gf,useContext:Sn,useEffect:vc,useImperativeHandle:Xf,useInsertionEffect:Jf,useLayoutEffect:Qf,useMemo:Zf,useReducer:Co,useRef:Yf,useState:function(){return Co(ua)},useDebugValue:yc,useDeferredValue:function(e){var t=Nn();return Lt===null?t.memoizedState=e:ep(t,Lt.memoizedState,e)},useTransition:function(){var e=Co(ua)[0],t=Nn().memoizedState;return[e,t]},useMutableSource:Ff,useSyncExternalStore:$f,useId:tp,unstable_isNewReconciler:!1};function In(e,t){if(e&&e.defaultProps){t=bt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function pl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:bt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vi={isMounted:function(e){return(e=e._reactInternals)?Vr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Gt(),s=br(e),a=er(r,s);a.payload=t,n!=null&&(a.callback=n),t=vr(e,a,s),t!==null&&(Rn(t,e,s,r),qa(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Gt(),s=br(e),a=er(r,s);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=vr(e,a,s),t!==null&&(Rn(t,e,s,r),qa(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Gt(),r=br(e),s=er(n,r);s.tag=2,t!=null&&(s.callback=t),t=vr(e,s,r),t!==null&&(Rn(t,e,r,n),qa(t,e,r))}};function zu(e,t,n,r,s,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!ra(n,r)||!ra(s,a):!0}function ap(e,t,n){var r=!1,s=jr,a=t.contextType;return typeof a=="object"&&a!==null?a=Sn(a):(s=un(t)?Ur:Wt.current,r=t.contextTypes,a=(r=r!=null)?hs(e,s):jr),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Vi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),t}function Pu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vi.enqueueReplaceState(t,t.state,null)}function hl(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},dc(e);var a=t.contextType;typeof a=="object"&&a!==null?s.context=Sn(a):(a=un(t)?Ur:Wt.current,s.context=hs(e,a)),s.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(pl(e,t,a,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Vi.enqueueReplaceState(s,s.state,null),yi(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function vs(e,t){try{var n="",r=t;do n+=im(r),r=r.return;while(r);var s=n}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:s,digest:null}}function Eo(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function ml(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Tg=typeof WeakMap=="function"?WeakMap:Map;function ip(e,t,n){n=er(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Si||(Si=!0,Nl=r),ml(e,t)},n}function op(e,t,n){n=er(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){ml(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){ml(e,t),typeof r!="function"&&(yr===null?yr=new Set([this]):yr.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Mu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Tg;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=Yg.bind(null,e,t,n),t.then(e,e))}function Iu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Lu(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=er(-1,1),t.tag=2,vr(n,t,1))),n.lanes|=1),e)}var Og=ar.ReactCurrentOwner,ln=!1;function Xt(e,t,n,r){t.child=e===null?_f(t,null,n,r):gs(t,e.child,n,r)}function Tu(e,t,n,r,s){n=n.render;var a=t.ref;return us(t,s),r=gc(e,t,n,r,a,s),n=xc(),e!==null&&!ln?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,sr(e,t,s)):(gt&&n&&sc(t),t.flags|=1,Xt(e,t,r,s),t.child)}function Ou(e,t,n,r,s){if(e===null){var a=n.type;return typeof a=="function"&&!Ec(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,lp(e,t,a,r,s)):(e=ni(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&s)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:ra,n(o,r)&&e.ref===t.ref)return sr(e,t,s)}return t.flags|=1,e=wr(a,r),e.ref=t.ref,e.return=t,t.child=e}function lp(e,t,n,r,s){if(e!==null){var a=e.memoizedProps;if(ra(a,r)&&e.ref===t.ref)if(ln=!1,t.pendingProps=r=a,(e.lanes&s)!==0)e.flags&131072&&(ln=!0);else return t.lanes=e.lanes,sr(e,t,s)}return gl(e,t,n,r,s)}function cp(e,t,n){var r=t.pendingProps,s=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},it(as,fn),fn|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,it(as,fn),fn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,it(as,fn),fn|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,it(as,fn),fn|=r;return Xt(e,t,s,n),t.child}function up(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function gl(e,t,n,r,s){var a=un(n)?Ur:Wt.current;return a=hs(t,a),us(t,s),n=gc(e,t,n,r,a,s),r=xc(),e!==null&&!ln?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,sr(e,t,s)):(gt&&r&&sc(t),t.flags|=1,Xt(e,t,n,s),t.child)}function Ru(e,t,n,r,s){if(un(n)){var a=!0;hi(t)}else a=!1;if(us(t,s),t.stateNode===null)Za(e,t),ap(t,n,r),hl(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,u=t.memoizedProps;o.props=u;var c=o.context,f=n.contextType;typeof f=="object"&&f!==null?f=Sn(f):(f=un(n)?Ur:Wt.current,f=hs(t,f));var m=n.getDerivedStateFromProps,b=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";b||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==r||c!==f)&&Pu(t,o,r,f),cr=!1;var x=t.memoizedState;o.state=x,yi(t,r,o,s),c=t.memoizedState,u!==r||x!==c||cn.current||cr?(typeof m=="function"&&(pl(t,n,m,r),c=t.memoizedState),(u=cr||zu(t,n,u,r,x,c,f))?(b||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=f,r=u):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Uf(e,t),u=t.memoizedProps,f=t.type===t.elementType?u:In(t.type,u),o.props=f,b=t.pendingProps,x=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Sn(c):(c=un(n)?Ur:Wt.current,c=hs(t,c));var C=n.getDerivedStateFromProps;(m=typeof C=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==b||x!==c)&&Pu(t,o,r,c),cr=!1,x=t.memoizedState,o.state=x,yi(t,r,o,s);var w=t.memoizedState;u!==b||x!==w||cn.current||cr?(typeof C=="function"&&(pl(t,n,C,r),w=t.memoizedState),(f=cr||zu(t,n,f,r,x,w,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=c,r=f):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&x===e.memoizedState||(t.flags|=1024),r=!1)}return xl(e,t,n,r,a,s)}function xl(e,t,n,r,s,a){up(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&bu(t,n,!1),sr(e,t,a);r=t.stateNode,Og.current=t;var u=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=gs(t,e.child,null,a),t.child=gs(t,null,u,a)):Xt(e,t,u,a),t.memoizedState=r.state,s&&bu(t,n,!0),t.child}function dp(e){var t=e.stateNode;t.pendingContext?yu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&yu(e,t.context,!1),fc(e,t.containerInfo)}function _u(e,t,n,r,s){return ms(),ic(s),t.flags|=256,Xt(e,t,n,r),t.child}var vl={dehydrated:null,treeContext:null,retryLane:0};function yl(e){return{baseLanes:e,cachePool:null,transitions:null}}function fp(e,t,n){var r=t.pendingProps,s=vt.current,a=!1,o=(t.flags&128)!==0,u;if((u=o)||(u=e!==null&&e.memoizedState===null?!1:(s&2)!==0),u?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),it(vt,s&1),e===null)return dl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Yi(o,r,0,null),e=_r(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=yl(n),t.memoizedState=vl,e):bc(t,o));if(s=e.memoizedState,s!==null&&(u=s.dehydrated,u!==null))return Rg(e,t,o,r,u,s,n);if(a){a=r.fallback,o=t.mode,s=e.child,u=s.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=wr(s,c),r.subtreeFlags=s.subtreeFlags&14680064),u!==null?a=wr(u,a):(a=_r(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?yl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=vl,r}return a=e.child,e=a.sibling,r=wr(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function bc(e,t){return t=Yi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Aa(e,t,n,r){return r!==null&&ic(r),gs(t,e.child,null,n),e=bc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rg(e,t,n,r,s,a,o){if(n)return t.flags&256?(t.flags&=-257,r=Eo(Error(J(422))),Aa(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,s=t.mode,r=Yi({mode:"visible",children:r.children},s,0,null),a=_r(a,s,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&gs(t,e.child,null,o),t.child.memoizedState=yl(o),t.memoizedState=vl,a);if(!(t.mode&1))return Aa(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var u=r.dgst;return r=u,a=Error(J(419)),r=Eo(a,r,void 0),Aa(e,t,o,r)}if(u=(o&e.childLanes)!==0,ln||u){if(r=Ut,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,rr(e,s),Rn(r,e,s,-1))}return Cc(),r=Eo(Error(J(421))),Aa(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Jg.bind(null,e),s._reactRetry=t,null):(e=a.treeContext,pn=xr(s.nextSibling),hn=t,gt=!0,Tn=null,e!==null&&(bn[wn++]=Gn,bn[wn++]=Zn,bn[wn++]=Ar,Gn=e.id,Zn=e.overflow,Ar=t),t=bc(t,r.children),t.flags|=4096,t)}function Du(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),fl(e.return,t,n)}function zo(e,t,n,r,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=s)}function pp(e,t,n){var r=t.pendingProps,s=r.revealOrder,a=r.tail;if(Xt(e,t,r.children,n),r=vt.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Du(e,n,t);else if(e.tag===19)Du(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(it(vt,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&bi(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),zo(t,!1,s,n,a);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&bi(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}zo(t,!0,n,null,a);break;case"together":zo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Za(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function sr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$r|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(J(153));if(t.child!==null){for(e=t.child,n=wr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=wr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function _g(e,t,n){switch(t.tag){case 3:dp(t),ms();break;case 5:Af(t);break;case 1:un(t.type)&&hi(t);break;case 4:fc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;it(xi,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(it(vt,vt.current&1),t.flags|=128,null):n&t.child.childLanes?fp(e,t,n):(it(vt,vt.current&1),e=sr(e,t,n),e!==null?e.sibling:null);it(vt,vt.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return pp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),it(vt,vt.current),r)break;return null;case 22:case 23:return t.lanes=0,cp(e,t,n)}return sr(e,t,n)}var hp,bl,mp,gp;hp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};bl=function(){};mp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Or(Yn.current);var a=null;switch(n){case"input":s=Bo(e,s),r=Bo(e,r),a=[];break;case"select":s=bt({},s,{value:void 0}),r=bt({},r,{value:void 0}),a=[];break;case"textarea":s=Ko(e,s),r=Ko(e,r),a=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fi)}Yo(n,r);var o;n=null;for(f in s)if(!r.hasOwnProperty(f)&&s.hasOwnProperty(f)&&s[f]!=null)if(f==="style"){var u=s[f];for(o in u)u.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(qs.hasOwnProperty(f)?a||(a=[]):(a=a||[]).push(f,null));for(f in r){var c=r[f];if(u=s!=null?s[f]:void 0,r.hasOwnProperty(f)&&c!==u&&(c!=null||u!=null))if(f==="style")if(u){for(o in u)!u.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&u[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(f,n)),n=c;else f==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,u=u?u.__html:void 0,c!=null&&u!==c&&(a=a||[]).push(f,c)):f==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(f,""+c):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(qs.hasOwnProperty(f)?(c!=null&&f==="onScroll"&&dt("scroll",e),a||u===c||(a=[])):(a=a||[]).push(f,c))}n&&(a=a||[]).push("style",n);var f=a;(t.updateQueue=f)&&(t.flags|=4)}};gp=function(e,t,n,r){n!==r&&(t.flags|=4)};function Is(e,t){if(!gt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Vt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Dg(e,t,n){var r=t.pendingProps;switch(ac(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(t),null;case 1:return un(t.type)&&pi(),Vt(t),null;case 3:return r=t.stateNode,xs(),ft(cn),ft(Wt),hc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Da(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Tn!==null&&(zl(Tn),Tn=null))),bl(e,t),Vt(t),null;case 5:pc(t);var s=Or(la.current);if(n=t.type,e!==null&&t.stateNode!=null)mp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(J(166));return Vt(t),null}if(e=Or(Yn.current),Da(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Vn]=t,r[ia]=a,e=(t.mode&1)!==0,n){case"dialog":dt("cancel",r),dt("close",r);break;case"iframe":case"object":case"embed":dt("load",r);break;case"video":case"audio":for(s=0;s<As.length;s++)dt(As[s],r);break;case"source":dt("error",r);break;case"img":case"image":case"link":dt("error",r),dt("load",r);break;case"details":dt("toggle",r);break;case"input":Wc(r,a),dt("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},dt("invalid",r);break;case"textarea":Jc(r,a),dt("invalid",r)}Yo(n,a),s=null;for(var o in a)if(a.hasOwnProperty(o)){var u=a[o];o==="children"?typeof u=="string"?r.textContent!==u&&(a.suppressHydrationWarning!==!0&&_a(r.textContent,u,e),s=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(a.suppressHydrationWarning!==!0&&_a(r.textContent,u,e),s=["children",""+u]):qs.hasOwnProperty(o)&&u!=null&&o==="onScroll"&&dt("scroll",r)}switch(n){case"input":za(r),Yc(r,a,!0);break;case"textarea":za(r),Qc(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=fi)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Hd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Vn]=t,e[ia]=r,hp(e,t,!1,!1),t.stateNode=e;e:{switch(o=Jo(n,r),n){case"dialog":dt("cancel",e),dt("close",e),s=r;break;case"iframe":case"object":case"embed":dt("load",e),s=r;break;case"video":case"audio":for(s=0;s<As.length;s++)dt(As[s],e);s=r;break;case"source":dt("error",e),s=r;break;case"img":case"image":case"link":dt("error",e),dt("load",e),s=r;break;case"details":dt("toggle",e),s=r;break;case"input":Wc(e,r),s=Bo(e,r),dt("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=bt({},r,{value:void 0}),dt("invalid",e);break;case"textarea":Jc(e,r),s=Ko(e,r),dt("invalid",e);break;default:s=r}Yo(n,s),u=s;for(a in u)if(u.hasOwnProperty(a)){var c=u[a];a==="style"?Wd(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Vd(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Xs(e,c):typeof c=="number"&&Xs(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(qs.hasOwnProperty(a)?c!=null&&a==="onScroll"&&dt("scroll",e):c!=null&&Vl(e,a,c,o))}switch(n){case"input":za(e),Yc(e,r,!1);break;case"textarea":za(e),Qc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+kr(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?is(e,!!r.multiple,a,!1):r.defaultValue!=null&&is(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=fi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Vt(t),null;case 6:if(e&&t.stateNode!=null)gp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(J(166));if(n=Or(la.current),Or(Yn.current),Da(t)){if(r=t.stateNode,n=t.memoizedProps,r[Vn]=t,(a=r.nodeValue!==n)&&(e=hn,e!==null))switch(e.tag){case 3:_a(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&_a(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Vn]=t,t.stateNode=r}return Vt(t),null;case 13:if(ft(vt),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(gt&&pn!==null&&t.mode&1&&!(t.flags&128))Of(),ms(),t.flags|=98560,a=!1;else if(a=Da(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(J(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(J(317));a[Vn]=t}else ms(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Vt(t),a=!1}else Tn!==null&&(zl(Tn),Tn=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||vt.current&1?Tt===0&&(Tt=3):Cc())),t.updateQueue!==null&&(t.flags|=4),Vt(t),null);case 4:return xs(),bl(e,t),e===null&&sa(t.stateNode.containerInfo),Vt(t),null;case 10:return cc(t.type._context),Vt(t),null;case 17:return un(t.type)&&pi(),Vt(t),null;case 19:if(ft(vt),a=t.memoizedState,a===null)return Vt(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Is(a,!1);else{if(Tt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=bi(e),o!==null){for(t.flags|=128,Is(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return it(vt,vt.current&1|2),t.child}e=e.sibling}a.tail!==null&&Nt()>ys&&(t.flags|=128,r=!0,Is(a,!1),t.lanes=4194304)}else{if(!r)if(e=bi(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Is(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!gt)return Vt(t),null}else 2*Nt()-a.renderingStartTime>ys&&n!==1073741824&&(t.flags|=128,r=!0,Is(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Nt(),t.sibling=null,n=vt.current,it(vt,r?n&1|2:n&1),t):(Vt(t),null);case 22:case 23:return Nc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?fn&1073741824&&(Vt(t),t.subtreeFlags&6&&(t.flags|=8192)):Vt(t),null;case 24:return null;case 25:return null}throw Error(J(156,t.tag))}function Ug(e,t){switch(ac(t),t.tag){case 1:return un(t.type)&&pi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xs(),ft(cn),ft(Wt),hc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return pc(t),null;case 13:if(ft(vt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(J(340));ms()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ft(vt),null;case 4:return xs(),null;case 10:return cc(t.type._context),null;case 22:case 23:return Nc(),null;case 24:return null;default:return null}}var Fa=!1,Kt=!1,Ag=typeof WeakSet=="function"?WeakSet:Set,le=null;function ss(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){St(e,t,r)}else n.current=null}function wl(e,t,n){try{n()}catch(r){St(e,t,r)}}var Uu=!1;function Fg(e,t){if(sl=ci,e=wf(),rc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,u=-1,c=-1,f=0,m=0,b=e,x=null;t:for(;;){for(var C;b!==n||s!==0&&b.nodeType!==3||(u=o+s),b!==a||r!==0&&b.nodeType!==3||(c=o+r),b.nodeType===3&&(o+=b.nodeValue.length),(C=b.firstChild)!==null;)x=b,b=C;for(;;){if(b===e)break t;if(x===n&&++f===s&&(u=o),x===a&&++m===r&&(c=o),(C=b.nextSibling)!==null)break;b=x,x=b.parentNode}b=C}n=u===-1||c===-1?null:{start:u,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(al={focusedElem:e,selectionRange:n},ci=!1,le=t;le!==null;)if(t=le,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,le=e;else for(;le!==null;){t=le;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var N=w.memoizedProps,L=w.memoizedState,k=t.stateNode,v=k.getSnapshotBeforeUpdate(t.elementType===t.type?N:In(t.type,N),L);k.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var E=t.stateNode.containerInfo;E.nodeType===1?E.textContent="":E.nodeType===9&&E.documentElement&&E.removeChild(E.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(J(163))}}catch(z){St(t,t.return,z)}if(e=t.sibling,e!==null){e.return=t.return,le=e;break}le=t.return}return w=Uu,Uu=!1,w}function Ws(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&wl(t,n,a)}s=s.next}while(s!==r)}}function Ki(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function kl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function xp(e){var t=e.alternate;t!==null&&(e.alternate=null,xp(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Vn],delete t[ia],delete t[ll],delete t[kg],delete t[jg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function vp(e){return e.tag===5||e.tag===3||e.tag===4}function Au(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||vp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function jl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fi));else if(r!==4&&(e=e.child,e!==null))for(jl(e,t,n),e=e.sibling;e!==null;)jl(e,t,n),e=e.sibling}function Sl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Sl(e,t,n),e=e.sibling;e!==null;)Sl(e,t,n),e=e.sibling}var At=null,Ln=!1;function or(e,t,n){for(n=n.child;n!==null;)yp(e,t,n),n=n.sibling}function yp(e,t,n){if(Wn&&typeof Wn.onCommitFiberUnmount=="function")try{Wn.onCommitFiberUnmount(Di,n)}catch{}switch(n.tag){case 5:Kt||ss(n,t);case 6:var r=At,s=Ln;At=null,or(e,t,n),At=r,Ln=s,At!==null&&(Ln?(e=At,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):At.removeChild(n.stateNode));break;case 18:At!==null&&(Ln?(e=At,n=n.stateNode,e.nodeType===8?wo(e.parentNode,n):e.nodeType===1&&wo(e,n),ta(e)):wo(At,n.stateNode));break;case 4:r=At,s=Ln,At=n.stateNode.containerInfo,Ln=!0,or(e,t,n),At=r,Ln=s;break;case 0:case 11:case 14:case 15:if(!Kt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var a=s,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&wl(n,t,o),s=s.next}while(s!==r)}or(e,t,n);break;case 1:if(!Kt&&(ss(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){St(n,t,u)}or(e,t,n);break;case 21:or(e,t,n);break;case 22:n.mode&1?(Kt=(r=Kt)||n.memoizedState!==null,or(e,t,n),Kt=r):or(e,t,n);break;default:or(e,t,n)}}function Fu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ag),t.forEach(function(r){var s=Qg.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Mn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var a=e,o=t,u=o;e:for(;u!==null;){switch(u.tag){case 5:At=u.stateNode,Ln=!1;break e;case 3:At=u.stateNode.containerInfo,Ln=!0;break e;case 4:At=u.stateNode.containerInfo,Ln=!0;break e}u=u.return}if(At===null)throw Error(J(160));yp(a,o,s),At=null,Ln=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(f){St(s,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bp(t,e),t=t.sibling}function bp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Mn(t,e),Bn(e),r&4){try{Ws(3,e,e.return),Ki(3,e)}catch(N){St(e,e.return,N)}try{Ws(5,e,e.return)}catch(N){St(e,e.return,N)}}break;case 1:Mn(t,e),Bn(e),r&512&&n!==null&&ss(n,n.return);break;case 5:if(Mn(t,e),Bn(e),r&512&&n!==null&&ss(n,n.return),e.flags&32){var s=e.stateNode;try{Xs(s,"")}catch(N){St(e,e.return,N)}}if(r&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,u=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{u==="input"&&a.type==="radio"&&a.name!=null&&$d(s,a),Jo(u,o);var f=Jo(u,a);for(o=0;o<c.length;o+=2){var m=c[o],b=c[o+1];m==="style"?Wd(s,b):m==="dangerouslySetInnerHTML"?Vd(s,b):m==="children"?Xs(s,b):Vl(s,m,b,f)}switch(u){case"input":Ho(s,a);break;case"textarea":Bd(s,a);break;case"select":var x=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var C=a.value;C!=null?is(s,!!a.multiple,C,!1):x!==!!a.multiple&&(a.defaultValue!=null?is(s,!!a.multiple,a.defaultValue,!0):is(s,!!a.multiple,a.multiple?[]:"",!1))}s[ia]=a}catch(N){St(e,e.return,N)}}break;case 6:if(Mn(t,e),Bn(e),r&4){if(e.stateNode===null)throw Error(J(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(N){St(e,e.return,N)}}break;case 3:if(Mn(t,e),Bn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ta(t.containerInfo)}catch(N){St(e,e.return,N)}break;case 4:Mn(t,e),Bn(e);break;case 13:Mn(t,e),Bn(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(jc=Nt())),r&4&&Fu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Kt=(f=Kt)||m,Mn(t,e),Kt=f):Mn(t,e),Bn(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!m&&e.mode&1)for(le=e,m=e.child;m!==null;){for(b=le=m;le!==null;){switch(x=le,C=x.child,x.tag){case 0:case 11:case 14:case 15:Ws(4,x,x.return);break;case 1:ss(x,x.return);var w=x.stateNode;if(typeof w.componentWillUnmount=="function"){r=x,n=x.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(N){St(r,n,N)}}break;case 5:ss(x,x.return);break;case 22:if(x.memoizedState!==null){Bu(b);continue}}C!==null?(C.return=x,le=C):Bu(b)}m=m.sibling}e:for(m=null,b=e;;){if(b.tag===5){if(m===null){m=b;try{s=b.stateNode,f?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(u=b.stateNode,c=b.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,u.style.display=Kd("display",o))}catch(N){St(e,e.return,N)}}}else if(b.tag===6){if(m===null)try{b.stateNode.nodeValue=f?"":b.memoizedProps}catch(N){St(e,e.return,N)}}else if((b.tag!==22&&b.tag!==23||b.memoizedState===null||b===e)&&b.child!==null){b.child.return=b,b=b.child;continue}if(b===e)break e;for(;b.sibling===null;){if(b.return===null||b.return===e)break e;m===b&&(m=null),b=b.return}m===b&&(m=null),b.sibling.return=b.return,b=b.sibling}}break;case 19:Mn(t,e),Bn(e),r&4&&Fu(e);break;case 21:break;default:Mn(t,e),Bn(e)}}function Bn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(vp(n)){var r=n;break e}n=n.return}throw Error(J(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Xs(s,""),r.flags&=-33);var a=Au(e);Sl(e,a,s);break;case 3:case 4:var o=r.stateNode.containerInfo,u=Au(e);jl(e,u,o);break;default:throw Error(J(161))}}catch(c){St(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $g(e,t,n){le=e,wp(e)}function wp(e,t,n){for(var r=(e.mode&1)!==0;le!==null;){var s=le,a=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Fa;if(!o){var u=s.alternate,c=u!==null&&u.memoizedState!==null||Kt;u=Fa;var f=Kt;if(Fa=o,(Kt=c)&&!f)for(le=s;le!==null;)o=le,c=o.child,o.tag===22&&o.memoizedState!==null?Hu(s):c!==null?(c.return=o,le=c):Hu(s);for(;a!==null;)le=a,wp(a),a=a.sibling;le=s,Fa=u,Kt=f}$u(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,le=a):$u(e)}}function $u(e){for(;le!==null;){var t=le;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Kt||Ki(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Kt)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:In(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Nu(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Nu(t,o,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var m=f.memoizedState;if(m!==null){var b=m.dehydrated;b!==null&&ta(b)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(J(163))}Kt||t.flags&512&&kl(t)}catch(x){St(t,t.return,x)}}if(t===e){le=null;break}if(n=t.sibling,n!==null){n.return=t.return,le=n;break}le=t.return}}function Bu(e){for(;le!==null;){var t=le;if(t===e){le=null;break}var n=t.sibling;if(n!==null){n.return=t.return,le=n;break}le=t.return}}function Hu(e){for(;le!==null;){var t=le;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ki(4,t)}catch(c){St(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){St(t,s,c)}}var a=t.return;try{kl(t)}catch(c){St(t,a,c)}break;case 5:var o=t.return;try{kl(t)}catch(c){St(t,o,c)}}}catch(c){St(t,t.return,c)}if(t===e){le=null;break}var u=t.sibling;if(u!==null){u.return=t.return,le=u;break}le=t.return}}var Bg=Math.ceil,ji=ar.ReactCurrentDispatcher,wc=ar.ReactCurrentOwner,jn=ar.ReactCurrentBatchConfig,Ye=0,Ut=null,zt=null,Ft=0,fn=0,as=Cr(0),Tt=0,fa=null,$r=0,Wi=0,kc=0,Ys=null,on=null,jc=0,ys=1/0,qn=null,Si=!1,Nl=null,yr=null,$a=!1,pr=null,Ni=0,Js=0,Cl=null,ei=-1,ti=0;function Gt(){return Ye&6?Nt():ei!==-1?ei:ei=Nt()}function br(e){return e.mode&1?Ye&2&&Ft!==0?Ft&-Ft:Ng.transition!==null?(ti===0&&(ti=sf()),ti):(e=nt,e!==0||(e=window.event,e=e===void 0?16:ff(e.type)),e):1}function Rn(e,t,n,r){if(50<Js)throw Js=0,Cl=null,Error(J(185));ya(e,n,r),(!(Ye&2)||e!==Ut)&&(e===Ut&&(!(Ye&2)&&(Wi|=n),Tt===4&&dr(e,Ft)),dn(e,r),n===1&&Ye===0&&!(t.mode&1)&&(ys=Nt()+500,Bi&&Er()))}function dn(e,t){var n=e.callbackNode;Nm(e,t);var r=li(e,e===Ut?Ft:0);if(r===0)n!==null&&Gc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Gc(n),t===1)e.tag===0?Sg(Vu.bind(null,e)):If(Vu.bind(null,e)),bg(function(){!(Ye&6)&&Er()}),n=null;else{switch(af(r)){case 1:n=Ql;break;case 4:n=nf;break;case 16:n=oi;break;case 536870912:n=rf;break;default:n=oi}n=Pp(n,kp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function kp(e,t){if(ei=-1,ti=0,Ye&6)throw Error(J(327));var n=e.callbackNode;if(ds()&&e.callbackNode!==n)return null;var r=li(e,e===Ut?Ft:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ci(e,r);else{t=r;var s=Ye;Ye|=2;var a=Sp();(Ut!==e||Ft!==t)&&(qn=null,ys=Nt()+500,Rr(e,t));do try{Kg();break}catch(u){jp(e,u)}while(!0);lc(),ji.current=a,Ye=s,zt!==null?t=0:(Ut=null,Ft=0,t=Tt)}if(t!==0){if(t===2&&(s=Zo(e),s!==0&&(r=s,t=El(e,s))),t===1)throw n=fa,Rr(e,0),dr(e,r),dn(e,Nt()),n;if(t===6)dr(e,r);else{if(s=e.current.alternate,!(r&30)&&!Hg(s)&&(t=Ci(e,r),t===2&&(a=Zo(e),a!==0&&(r=a,t=El(e,a))),t===1))throw n=fa,Rr(e,0),dr(e,r),dn(e,Nt()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(J(345));case 2:Ir(e,on,qn);break;case 3:if(dr(e,r),(r&130023424)===r&&(t=jc+500-Nt(),10<t)){if(li(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Gt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=ol(Ir.bind(null,e,on,qn),t);break}Ir(e,on,qn);break;case 4:if(dr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-On(r);a=1<<o,o=t[o],o>s&&(s=o),r&=~a}if(r=s,r=Nt()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Bg(r/1960))-r,10<r){e.timeoutHandle=ol(Ir.bind(null,e,on,qn),r);break}Ir(e,on,qn);break;case 5:Ir(e,on,qn);break;default:throw Error(J(329))}}}return dn(e,Nt()),e.callbackNode===n?kp.bind(null,e):null}function El(e,t){var n=Ys;return e.current.memoizedState.isDehydrated&&(Rr(e,t).flags|=256),e=Ci(e,t),e!==2&&(t=on,on=n,t!==null&&zl(t)),e}function zl(e){on===null?on=e:on.push.apply(on,e)}function Hg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],a=s.getSnapshot;s=s.value;try{if(!_n(a(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dr(e,t){for(t&=~kc,t&=~Wi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-On(t),r=1<<n;e[n]=-1,t&=~r}}function Vu(e){if(Ye&6)throw Error(J(327));ds();var t=li(e,0);if(!(t&1))return dn(e,Nt()),null;var n=Ci(e,t);if(e.tag!==0&&n===2){var r=Zo(e);r!==0&&(t=r,n=El(e,r))}if(n===1)throw n=fa,Rr(e,0),dr(e,t),dn(e,Nt()),n;if(n===6)throw Error(J(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ir(e,on,qn),dn(e,Nt()),null}function Sc(e,t){var n=Ye;Ye|=1;try{return e(t)}finally{Ye=n,Ye===0&&(ys=Nt()+500,Bi&&Er())}}function Br(e){pr!==null&&pr.tag===0&&!(Ye&6)&&ds();var t=Ye;Ye|=1;var n=jn.transition,r=nt;try{if(jn.transition=null,nt=1,e)return e()}finally{nt=r,jn.transition=n,Ye=t,!(Ye&6)&&Er()}}function Nc(){fn=as.current,ft(as)}function Rr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,yg(n)),zt!==null)for(n=zt.return;n!==null;){var r=n;switch(ac(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pi();break;case 3:xs(),ft(cn),ft(Wt),hc();break;case 5:pc(r);break;case 4:xs();break;case 13:ft(vt);break;case 19:ft(vt);break;case 10:cc(r.type._context);break;case 22:case 23:Nc()}n=n.return}if(Ut=e,zt=e=wr(e.current,null),Ft=fn=t,Tt=0,fa=null,kc=Wi=$r=0,on=Ys=null,Tr!==null){for(t=0;t<Tr.length;t++)if(n=Tr[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=s,r.next=o}n.pending=r}Tr=null}return e}function jp(e,t){do{var n=zt;try{if(lc(),Xa.current=ki,wi){for(var r=yt.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}wi=!1}if(Fr=0,Dt=Lt=yt=null,Ks=!1,ca=0,wc.current=null,n===null||n.return===null){Tt=1,fa=t,zt=null;break}e:{var a=e,o=n.return,u=n,c=t;if(t=Ft,u.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var f=c,m=u,b=m.tag;if(!(m.mode&1)&&(b===0||b===11||b===15)){var x=m.alternate;x?(m.updateQueue=x.updateQueue,m.memoizedState=x.memoizedState,m.lanes=x.lanes):(m.updateQueue=null,m.memoizedState=null)}var C=Iu(o);if(C!==null){C.flags&=-257,Lu(C,o,u,a,t),C.mode&1&&Mu(a,f,t),t=C,c=f;var w=t.updateQueue;if(w===null){var N=new Set;N.add(c),t.updateQueue=N}else w.add(c);break e}else{if(!(t&1)){Mu(a,f,t),Cc();break e}c=Error(J(426))}}else if(gt&&u.mode&1){var L=Iu(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),Lu(L,o,u,a,t),ic(vs(c,u));break e}}a=c=vs(c,u),Tt!==4&&(Tt=2),Ys===null?Ys=[a]:Ys.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var k=ip(a,c,t);Su(a,k);break e;case 1:u=c;var v=a.type,E=a.stateNode;if(!(a.flags&128)&&(typeof v.getDerivedStateFromError=="function"||E!==null&&typeof E.componentDidCatch=="function"&&(yr===null||!yr.has(E)))){a.flags|=65536,t&=-t,a.lanes|=t;var z=op(a,u,t);Su(a,z);break e}}a=a.return}while(a!==null)}Cp(n)}catch(M){t=M,zt===n&&n!==null&&(zt=n=n.return);continue}break}while(!0)}function Sp(){var e=ji.current;return ji.current=ki,e===null?ki:e}function Cc(){(Tt===0||Tt===3||Tt===2)&&(Tt=4),Ut===null||!($r&268435455)&&!(Wi&268435455)||dr(Ut,Ft)}function Ci(e,t){var n=Ye;Ye|=2;var r=Sp();(Ut!==e||Ft!==t)&&(qn=null,Rr(e,t));do try{Vg();break}catch(s){jp(e,s)}while(!0);if(lc(),Ye=n,ji.current=r,zt!==null)throw Error(J(261));return Ut=null,Ft=0,Tt}function Vg(){for(;zt!==null;)Np(zt)}function Kg(){for(;zt!==null&&!gm();)Np(zt)}function Np(e){var t=zp(e.alternate,e,fn);e.memoizedProps=e.pendingProps,t===null?Cp(e):zt=t,wc.current=null}function Cp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Ug(n,t),n!==null){n.flags&=32767,zt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Tt=6,zt=null;return}}else if(n=Dg(n,t,fn),n!==null){zt=n;return}if(t=t.sibling,t!==null){zt=t;return}zt=t=e}while(t!==null);Tt===0&&(Tt=5)}function Ir(e,t,n){var r=nt,s=jn.transition;try{jn.transition=null,nt=1,Wg(e,t,n,r)}finally{jn.transition=s,nt=r}return null}function Wg(e,t,n,r){do ds();while(pr!==null);if(Ye&6)throw Error(J(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(J(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Cm(e,a),e===Ut&&(zt=Ut=null,Ft=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$a||($a=!0,Pp(oi,function(){return ds(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=jn.transition,jn.transition=null;var o=nt;nt=1;var u=Ye;Ye|=4,wc.current=null,Fg(e,n),bp(n,e),fg(al),ci=!!sl,al=sl=null,e.current=n,$g(n),xm(),Ye=u,nt=o,jn.transition=a}else e.current=n;if($a&&($a=!1,pr=e,Ni=s),a=e.pendingLanes,a===0&&(yr=null),bm(n.stateNode),dn(e,Nt()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Si)throw Si=!1,e=Nl,Nl=null,e;return Ni&1&&e.tag!==0&&ds(),a=e.pendingLanes,a&1?e===Cl?Js++:(Js=0,Cl=e):Js=0,Er(),null}function ds(){if(pr!==null){var e=af(Ni),t=jn.transition,n=nt;try{if(jn.transition=null,nt=16>e?16:e,pr===null)var r=!1;else{if(e=pr,pr=null,Ni=0,Ye&6)throw Error(J(331));var s=Ye;for(Ye|=4,le=e.current;le!==null;){var a=le,o=a.child;if(le.flags&16){var u=a.deletions;if(u!==null){for(var c=0;c<u.length;c++){var f=u[c];for(le=f;le!==null;){var m=le;switch(m.tag){case 0:case 11:case 15:Ws(8,m,a)}var b=m.child;if(b!==null)b.return=m,le=b;else for(;le!==null;){m=le;var x=m.sibling,C=m.return;if(xp(m),m===f){le=null;break}if(x!==null){x.return=C,le=x;break}le=C}}}var w=a.alternate;if(w!==null){var N=w.child;if(N!==null){w.child=null;do{var L=N.sibling;N.sibling=null,N=L}while(N!==null)}}le=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,le=o;else e:for(;le!==null;){if(a=le,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Ws(9,a,a.return)}var k=a.sibling;if(k!==null){k.return=a.return,le=k;break e}le=a.return}}var v=e.current;for(le=v;le!==null;){o=le;var E=o.child;if(o.subtreeFlags&2064&&E!==null)E.return=o,le=E;else e:for(o=v;le!==null;){if(u=le,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Ki(9,u)}}catch(M){St(u,u.return,M)}if(u===o){le=null;break e}var z=u.sibling;if(z!==null){z.return=u.return,le=z;break e}le=u.return}}if(Ye=s,Er(),Wn&&typeof Wn.onPostCommitFiberRoot=="function")try{Wn.onPostCommitFiberRoot(Di,e)}catch{}r=!0}return r}finally{nt=n,jn.transition=t}}return!1}function Ku(e,t,n){t=vs(n,t),t=ip(e,t,1),e=vr(e,t,1),t=Gt(),e!==null&&(ya(e,1,t),dn(e,t))}function St(e,t,n){if(e.tag===3)Ku(e,e,n);else for(;t!==null;){if(t.tag===3){Ku(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(yr===null||!yr.has(r))){e=vs(n,e),e=op(t,e,1),t=vr(t,e,1),e=Gt(),t!==null&&(ya(t,1,e),dn(t,e));break}}t=t.return}}function Yg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Gt(),e.pingedLanes|=e.suspendedLanes&n,Ut===e&&(Ft&n)===n&&(Tt===4||Tt===3&&(Ft&130023424)===Ft&&500>Nt()-jc?Rr(e,0):kc|=n),dn(e,t)}function Ep(e,t){t===0&&(e.mode&1?(t=Ia,Ia<<=1,!(Ia&130023424)&&(Ia=4194304)):t=1);var n=Gt();e=rr(e,t),e!==null&&(ya(e,t,n),dn(e,n))}function Jg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ep(e,n)}function Qg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(J(314))}r!==null&&r.delete(t),Ep(e,n)}var zp;zp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||cn.current)ln=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ln=!1,_g(e,t,n);ln=!!(e.flags&131072)}else ln=!1,gt&&t.flags&1048576&&Lf(t,gi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Za(e,t),e=t.pendingProps;var s=hs(t,Wt.current);us(t,n),s=gc(null,t,r,e,s,n);var a=xc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,un(r)?(a=!0,hi(t)):a=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,dc(t),s.updater=Vi,t.stateNode=s,s._reactInternals=t,hl(t,r,e,n),t=xl(null,t,r,!0,a,n)):(t.tag=0,gt&&a&&sc(t),Xt(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Za(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=Xg(r),e=In(r,e),s){case 0:t=gl(null,t,r,e,n);break e;case 1:t=Ru(null,t,r,e,n);break e;case 11:t=Tu(null,t,r,e,n);break e;case 14:t=Ou(null,t,r,In(r.type,e),n);break e}throw Error(J(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:In(r,s),gl(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:In(r,s),Ru(e,t,r,s,n);case 3:e:{if(dp(t),e===null)throw Error(J(387));r=t.pendingProps,a=t.memoizedState,s=a.element,Uf(e,t),yi(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){s=vs(Error(J(423)),t),t=_u(e,t,r,n,s);break e}else if(r!==s){s=vs(Error(J(424)),t),t=_u(e,t,r,n,s);break e}else for(pn=xr(t.stateNode.containerInfo.firstChild),hn=t,gt=!0,Tn=null,n=_f(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ms(),r===s){t=sr(e,t,n);break e}Xt(e,t,r,n)}t=t.child}return t;case 5:return Af(t),e===null&&dl(t),r=t.type,s=t.pendingProps,a=e!==null?e.memoizedProps:null,o=s.children,il(r,s)?o=null:a!==null&&il(r,a)&&(t.flags|=32),up(e,t),Xt(e,t,o,n),t.child;case 6:return e===null&&dl(t),null;case 13:return fp(e,t,n);case 4:return fc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=gs(t,null,r,n):Xt(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:In(r,s),Tu(e,t,r,s,n);case 7:return Xt(e,t,t.pendingProps,n),t.child;case 8:return Xt(e,t,t.pendingProps.children,n),t.child;case 12:return Xt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,a=t.memoizedProps,o=s.value,it(xi,r._currentValue),r._currentValue=o,a!==null)if(_n(a.value,o)){if(a.children===s.children&&!cn.current){t=sr(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var u=a.dependencies;if(u!==null){o=a.child;for(var c=u.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=er(-1,n&-n),c.tag=2;var f=a.updateQueue;if(f!==null){f=f.shared;var m=f.pending;m===null?c.next=c:(c.next=m.next,m.next=c),f.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),fl(a.return,n,t),u.lanes|=n;break}c=c.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(J(341));o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),fl(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Xt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,us(t,n),s=Sn(s),r=r(s),t.flags|=1,Xt(e,t,r,n),t.child;case 14:return r=t.type,s=In(r,t.pendingProps),s=In(r.type,s),Ou(e,t,r,s,n);case 15:return lp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:In(r,s),Za(e,t),t.tag=1,un(r)?(e=!0,hi(t)):e=!1,us(t,n),ap(t,r,s),hl(t,r,s,n),xl(null,t,r,!0,e,n);case 19:return pp(e,t,n);case 22:return cp(e,t,n)}throw Error(J(156,t.tag))};function Pp(e,t){return tf(e,t)}function qg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function kn(e,t,n,r){return new qg(e,t,n,r)}function Ec(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Xg(e){if(typeof e=="function")return Ec(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Wl)return 11;if(e===Yl)return 14}return 2}function wr(e,t){var n=e.alternate;return n===null?(n=kn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ni(e,t,n,r,s,a){var o=2;if(r=e,typeof e=="function")Ec(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qr:return _r(n.children,s,a,t);case Kl:o=8,s|=8;break;case Uo:return e=kn(12,n,t,s|2),e.elementType=Uo,e.lanes=a,e;case Ao:return e=kn(13,n,t,s),e.elementType=Ao,e.lanes=a,e;case Fo:return e=kn(19,n,t,s),e.elementType=Fo,e.lanes=a,e;case Ud:return Yi(n,s,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case _d:o=10;break e;case Dd:o=9;break e;case Wl:o=11;break e;case Yl:o=14;break e;case lr:o=16,r=null;break e}throw Error(J(130,e==null?e:typeof e,""))}return t=kn(o,n,t,s),t.elementType=e,t.type=r,t.lanes=a,t}function _r(e,t,n,r){return e=kn(7,e,r,t),e.lanes=n,e}function Yi(e,t,n,r){return e=kn(22,e,r,t),e.elementType=Ud,e.lanes=n,e.stateNode={isHidden:!1},e}function Po(e,t,n){return e=kn(6,e,null,t),e.lanes=n,e}function Mo(e,t,n){return t=kn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Gg(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=co(0),this.expirationTimes=co(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=co(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function zc(e,t,n,r,s,a,o,u,c){return e=new Gg(e,t,n,u,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=kn(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},dc(a),e}function Zg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Mp(e){if(!e)return jr;e=e._reactInternals;e:{if(Vr(e)!==e||e.tag!==1)throw Error(J(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(un(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(J(171))}if(e.tag===1){var n=e.type;if(un(n))return Mf(e,n,t)}return t}function Ip(e,t,n,r,s,a,o,u,c){return e=zc(n,r,!0,e,s,a,o,u,c),e.context=Mp(null),n=e.current,r=Gt(),s=br(n),a=er(r,s),a.callback=t!=null?t:null,vr(n,a,s),e.current.lanes=s,ya(e,s,r),dn(e,r),e}function Ji(e,t,n,r){var s=t.current,a=Gt(),o=br(s);return n=Mp(n),t.context===null?t.context=n:t.pendingContext=n,t=er(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=vr(s,t,o),e!==null&&(Rn(e,s,o,a),qa(e,s,o)),o}function Ei(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Wu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Pc(e,t){Wu(e,t),(e=e.alternate)&&Wu(e,t)}function ex(){return null}var Lp=typeof reportError=="function"?reportError:function(e){console.error(e)};function Mc(e){this._internalRoot=e}Qi.prototype.render=Mc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(J(409));Ji(e,t,null,null)};Qi.prototype.unmount=Mc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Br(function(){Ji(null,e,null,null)}),t[nr]=null}};function Qi(e){this._internalRoot=e}Qi.prototype.unstable_scheduleHydration=function(e){if(e){var t=cf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ur.length&&t!==0&&t<ur[n].priority;n++);ur.splice(n,0,e),n===0&&df(e)}};function Ic(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function qi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Yu(){}function tx(e,t,n,r,s){if(s){if(typeof r=="function"){var a=r;r=function(){var f=Ei(o);a.call(f)}}var o=Ip(t,r,e,0,null,!1,!1,"",Yu);return e._reactRootContainer=o,e[nr]=o.current,sa(e.nodeType===8?e.parentNode:e),Br(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var u=r;r=function(){var f=Ei(c);u.call(f)}}var c=zc(e,0,!1,null,null,!1,!1,"",Yu);return e._reactRootContainer=c,e[nr]=c.current,sa(e.nodeType===8?e.parentNode:e),Br(function(){Ji(t,c,n,r)}),c}function Xi(e,t,n,r,s){var a=n._reactRootContainer;if(a){var o=a;if(typeof s=="function"){var u=s;s=function(){var c=Ei(o);u.call(c)}}Ji(t,o,e,s)}else o=tx(n,t,e,s,r);return Ei(o)}of=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Us(t.pendingLanes);n!==0&&(ql(t,n|1),dn(t,Nt()),!(Ye&6)&&(ys=Nt()+500,Er()))}break;case 13:Br(function(){var r=rr(e,1);if(r!==null){var s=Gt();Rn(r,e,1,s)}}),Pc(e,1)}};Xl=function(e){if(e.tag===13){var t=rr(e,134217728);if(t!==null){var n=Gt();Rn(t,e,134217728,n)}Pc(e,134217728)}};lf=function(e){if(e.tag===13){var t=br(e),n=rr(e,t);if(n!==null){var r=Gt();Rn(n,e,t,r)}Pc(e,t)}};cf=function(){return nt};uf=function(e,t){var n=nt;try{return nt=e,t()}finally{nt=n}};qo=function(e,t,n){switch(t){case"input":if(Ho(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=$i(r);if(!s)throw Error(J(90));Fd(r),Ho(r,s)}}}break;case"textarea":Bd(e,n);break;case"select":t=n.value,t!=null&&is(e,!!n.multiple,t,!1)}};Qd=Sc;qd=Br;var nx={usingClientEntryPoint:!1,Events:[wa,Zr,$i,Yd,Jd,Sc]},Ls={findFiberByHostInstance:Lr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rx={bundleType:Ls.bundleType,version:Ls.version,rendererPackageName:Ls.rendererPackageName,rendererConfig:Ls.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ar.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Zd(e),e===null?null:e.stateNode},findFiberByHostInstance:Ls.findFiberByHostInstance||ex,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ba=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ba.isDisabled&&Ba.supportsFiber)try{Di=Ba.inject(rx),Wn=Ba}catch{}}gn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nx;gn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ic(t))throw Error(J(200));return Zg(e,t,null,n)};gn.createRoot=function(e,t){if(!Ic(e))throw Error(J(299));var n=!1,r="",s=Lp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=zc(e,1,!1,null,null,n,!1,r,s),e[nr]=t.current,sa(e.nodeType===8?e.parentNode:e),new Mc(t)};gn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(J(188)):(e=Object.keys(e).join(","),Error(J(268,e)));return e=Zd(t),e=e===null?null:e.stateNode,e};gn.flushSync=function(e){return Br(e)};gn.hydrate=function(e,t,n){if(!qi(t))throw Error(J(200));return Xi(null,e,t,!0,n)};gn.hydrateRoot=function(e,t,n){if(!Ic(e))throw Error(J(405));var r=n!=null&&n.hydratedSources||null,s=!1,a="",o=Lp;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Ip(t,null,e,1,n!=null?n:null,s,!1,a,o),e[nr]=t.current,sa(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Qi(t)};gn.render=function(e,t,n){if(!qi(t))throw Error(J(200));return Xi(null,e,t,!1,n)};gn.unmountComponentAtNode=function(e){if(!qi(e))throw Error(J(40));return e._reactRootContainer?(Br(function(){Xi(null,null,e,!1,function(){e._reactRootContainer=null,e[nr]=null})}),!0):!1};gn.unstable_batchedUpdates=Sc;gn.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!qi(n))throw Error(J(200));if(e==null||e._reactInternals===void 0)throw Error(J(38));return Xi(e,t,n,!1,r)};gn.version="18.3.1-next-f1338f8080-20240426";function Tp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Tp)}catch(e){console.error(e)}}Tp(),Ld.exports=gn;var sx=Ld.exports,Ju=sx;_o.createRoot=Ju.createRoot,_o.hydrateRoot=Ju.hydrateRoot;function ax(){if(console&&console.warn){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Dr(t[0])&&(t[0]=`react-i18next:: ${t[0]}`),console.warn(...t)}}const Qu={};function Pl(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Dr(t[0])&&Qu[t[0]]||(Dr(t[0])&&(Qu[t[0]]=new Date),ax(...t))}const Op=(e,t)=>()=>{if(e.isInitialized)t();else{const n=()=>{setTimeout(()=>{e.off("initialized",n)},0),t()};e.on("initialized",n)}},qu=(e,t,n)=>{e.loadNamespaces(t,Op(e,n))},Xu=(e,t,n,r)=>{Dr(n)&&(n=[n]),n.forEach(s=>{e.options.ns.indexOf(s)<0&&e.options.ns.push(s)}),e.loadLanguages(t,Op(e,r))},ix=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const r=t.languages[0],s=t.options?t.options.fallbackLng:!1,a=t.languages[t.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(u,c)=>{const f=t.services.backendConnector.state[`${u}|${c}`];return f===-1||f===2};return n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!o(t.isLanguageChangingTo,e)?!1:!!(t.hasResourceBundle(r,e)||!t.services.backendConnector.backend||t.options.resources&&!t.options.partialBundledLanguages||o(r,e)&&(!s||o(a,e)))},ox=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return!t.languages||!t.languages.length?(Pl("i18n.languages were undefined or empty",t.languages),!0):t.options.ignoreJSONStructure!==void 0?t.hasLoadedNamespace(e,{lng:n.lng,precheck:(s,a)=>{if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!a(s.isLanguageChangingTo,e))return!1}}):ix(e,t,n)},Dr=e=>typeof e=="string",lx=e=>typeof e=="object"&&e!==null,cx=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,ux={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},dx=e=>ux[e],fx=e=>e.replace(cx,dx);let Ml={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:fx};const px=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ml={...Ml,...e}},hx=()=>Ml;let Rp;const mx=e=>{Rp=e},gx=()=>Rp,xx={type:"3rdParty",init(e){px(e.options.react),mx(e)}},vx=y.createContext();class yx{constructor(){Ac(this,"getUsedNamespaces",()=>Object.keys(this.usedNamespaces));this.usedNamespaces={}}addUsedNamespaces(t){t.forEach(n=>{this.usedNamespaces[n]||(this.usedNamespaces[n]=!0)})}}const bx=(e,t)=>{const n=y.useRef();return y.useEffect(()=>{n.current=e},[e,t]),n.current},_p=(e,t,n,r)=>e.getFixedT(t,n,r),wx=(e,t,n,r)=>y.useCallback(_p(e,t,n,r),[e,t,n,r]),Ge=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{i18n:n}=t,{i18n:r,defaultNS:s}=y.useContext(vx)||{},a=n||r||gx();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new yx),!a){Pl("You will need to pass in an i18next instance by using initReactI18next");const z=(_,D)=>Dr(D)?D:lx(D)&&Dr(D.defaultValue)?D.defaultValue:Array.isArray(_)?_[_.length-1]:_,M=[z,{},!1];return M.t=z,M.i18n={},M.ready=!1,M}a.options.react&&a.options.react.wait!==void 0&&Pl("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const o={...hx(),...a.options.react,...t},{useSuspense:u,keyPrefix:c}=o;let f=s||a.options&&a.options.defaultNS;f=Dr(f)?[f]:f||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(f);const m=(a.isInitialized||a.initializedStoreOnce)&&f.every(z=>ox(z,a,o)),b=wx(a,t.lng||null,o.nsMode==="fallback"?f:f[0],c),x=()=>b,C=()=>_p(a,t.lng||null,o.nsMode==="fallback"?f:f[0],c),[w,N]=y.useState(x);let L=f.join();t.lng&&(L=`${t.lng}${L}`);const k=bx(L),v=y.useRef(!0);y.useEffect(()=>{const{bindI18n:z,bindI18nStore:M}=o;v.current=!0,!m&&!u&&(t.lng?Xu(a,t.lng,f,()=>{v.current&&N(C)}):qu(a,f,()=>{v.current&&N(C)})),m&&k&&k!==L&&v.current&&N(C);const _=()=>{v.current&&N(C)};return z&&a&&a.on(z,_),M&&a&&a.store.on(M,_),()=>{v.current=!1,z&&a&&z.split(" ").forEach(D=>a.off(D,_)),M&&a&&M.split(" ").forEach(D=>a.store.off(D,_))}},[a,L]),y.useEffect(()=>{v.current&&m&&N(x)},[a,c,m]);const E=[w,a,m];if(E.t=w,E.i18n=a,E.ready=m,m||!m&&!u)return E;throw new Promise(z=>{t.lng?Xu(a,t.lng,f,()=>z()):qu(a,f,()=>z())})};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var kx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jx=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=(e,t)=>{const n=y.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:u="",children:c,...f},m)=>y.createElement("svg",{ref:m,...kx,width:s,height:s,stroke:r,strokeWidth:o?Number(a)*24/Number(s):a,className:["lucide",`lucide-${jx(e)}`,u].join(" "),...f},[...t.map(([b,x])=>y.createElement(b,x)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sx=ee("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nx=ee("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cx=ee("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ex=ee("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=ee("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Il=ee("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zx=ee("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=ee("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Px=ee("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lc=ee("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mx=ee("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ix=ee("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=ee("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lx=ee("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dp=ee("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Up=ee("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=ee("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=ee("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=ee("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ap=ee("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=ee("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=ee("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fp=ee("Forward",[["polyline",{points:"15 17 20 12 15 7",key:"1w3sku"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12",key:"jmiej9"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $p=ee("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=ee("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=ee("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=ee("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=ee("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=ee("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=ee("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=ee("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=ee("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bp=ee("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=ee("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=ee("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=ee("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rc=ee("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=ee("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=ee("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hp=ee("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=ee("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=ee("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vp=ee("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=ee("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=ee("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=ee("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=ee("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ll=ee("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=ee("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=ee("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=ee("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=ee("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=ee("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=ee("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=ee("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=ee("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=ee("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=ee("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=ee("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=ee("StretchHorizontal",[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2",key:"qdearl"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2",key:"1xrn6j"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=ee("Strikethrough",[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=ee("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=ee("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=ee("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=ee("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=ee("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=ee("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=ee("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=ee("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=ee("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=ee("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=ee("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=ee("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=ee("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=ee("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),Xp="hotline-server-favorites";function f0(){try{const e=localStorage.getItem(Xp);return e?JSON.parse(e):[]}catch{return[]}}function Ha(e){localStorage.setItem(Xp,JSON.stringify(e))}function p0(){const[e,t]=y.useState(f0),n=y.useCallback((a,o,u)=>{t(c=>{const f=c.find(x=>x.address===a&&x.nickname===o);if(f){const x=c.map(C=>C.id===f.id?{...C,lastUsed:Date.now(),label:u||C.label}:C);return Ha(x),x}const b=[{id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`,address:a,nickname:o,label:u,lastUsed:Date.now()},...c].slice(0,10);return Ha(b),b})},[]),r=y.useCallback(a=>{t(o=>{const u=o.filter(c=>c.id!==a);return Ha(u),u})},[]),s=y.useCallback((a,o)=>{t(u=>{const c=u.findIndex(m=>m.address===a&&m.nickname===o);if(c===-1)return u;const f=[...u];return f[c]={...f[c],lastUsed:Date.now()},f.sort((m,b)=>b.lastUsed-m.lastUsed),Ha(f),f})},[]);return{favorites:e,addFavorite:n,removeFavorite:r,touchFavorite:s}}function h0({onConnect:e,isConnecting:t}){const{t:n}=Ge(),[r,s]=y.useState("localhost:9998"),[a,o]=y.useState(""),{favorites:u,addFavorite:c,removeFavorite:f}=p0(),m=C=>{C.preventDefault(),r&&a.trim()&&(c(r,a.trim()),e(r,a.trim()))},b=C=>{s(C.address),o(C.nickname)},x=C=>{c(C.address,C.nickname),e(C.address,C.nickname)};return i.jsxs("div",{className:"connect-overlay",children:[i.jsx("div",{className:"connect-bg-glow"}),i.jsxs("form",{className:"connect-dialog",onSubmit:m,children:[i.jsxs("div",{className:"connect-logo",children:[i.jsx("img",{src:"/logo.svg",alt:"Hotline Modern",className:"connect-logo-img"}),i.jsx("h1",{children:n("app.name")}),i.jsx("p",{className:"connect-subtitle",children:n("connect.title")})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.serverAddress")}),i.jsx("input",{type:"text",value:r,onChange:C=>s(C.target.value),placeholder:n("connect.serverPlaceholder"),disabled:t})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.nickname")}),i.jsx("input",{type:"text",value:a,onChange:C=>o(C.target.value),placeholder:n("connect.nicknamePlaceholder"),disabled:t,maxLength:32,autoFocus:!0})]}),i.jsx("button",{type:"submit",className:"connect-btn",disabled:t||!a.trim(),children:t?i.jsxs(i.Fragment,{children:[i.jsx(ha,{size:16,className:"connect-spinner"}),n("connect.connecting")]}):i.jsxs(i.Fragment,{children:[n("connect.button"),i.jsx("kbd",{className:"connect-kbd",children:"↵"})]})}),u.length>0&&i.jsxs("div",{className:"connect-favorites",children:[i.jsxs("div",{className:"connect-favorites-header",children:[i.jsx(Qp,{size:12}),i.jsx("span",{children:n("connect.recentServers")})]}),i.jsx("ul",{className:"connect-favorites-list",children:u.slice(0,5).map(C=>i.jsxs("li",{className:"connect-fav-item",children:[i.jsxs("button",{className:"connect-fav-btn",onClick:()=>b(C),title:C.address,children:[i.jsx("span",{className:"connect-fav-addr",children:C.address}),i.jsx("span",{className:"connect-fav-nick",children:C.nickname})]}),i.jsx("button",{className:"connect-fav-quick",onClick:()=>x(C),title:n("connect.quickConnect"),children:i.jsx(c0,{size:11})}),i.jsx("button",{className:"connect-fav-remove",onClick:()=>f(C.id),title:n("connect.removeFavorite"),children:i.jsx(Ot,{size:11})})]},C.id))})]})]}),i.jsx("style",{children:`
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
      `})]})}const Gu=[{value:"available",label:"status.available",color:"#22c55e"},{value:"away",label:"status.away",color:"#eab308"},{value:"busy",label:"status.busy",color:"#ef4444"}];function m0({currentStatus:e,onStatusChange:t}){var s;const{t:n}=Ge(),r=((s=Gu.find(a=>a.value===e))==null?void 0:s.color)||"#22c55e";return i.jsxs("div",{className:"status-selector",children:[i.jsx("span",{className:"status-dot-sel",style:{backgroundColor:r}}),i.jsx("select",{value:e,onChange:a=>t(a.target.value),className:"status-select",children:Gu.map(a=>i.jsx("option",{value:a.value,children:n(a.label)},a.value))}),i.jsx("style",{children:`
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
      `})]})}function Gp({status:e}){const t=e==="away"?"#eab308":e==="busy"?"#ef4444":"#22c55e";return i.jsx("span",{className:"user-status-dot",style:{backgroundColor:t},title:e,children:i.jsx("style",{children:`
        .user-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--bg-secondary);
          transition: background-color var(--transition-normal);
        }
      `})})}function g0({serverName:e,channels:t,activeChannel:n,activeDM:r,dmConversations:s,onSelectChannel:a,onSelectDM:o,onCreateChannel:u,onDeleteChannel:c,onDisconnect:f,canCreateChannel:m,unreadCounts:b,nickname:x,role:C,userStatus:w,mutedChannels:N,onToggleMute:L,onAdminPanel:k,typingChannels:v,onReorderChannels:E}){const{t:z}=Ge();return i.jsxs("aside",{className:"sidebar",children:[i.jsxs("div",{className:"sidebar-header",children:[i.jsx("h2",{children:e}),i.jsxs("div",{className:"sidebar-header-actions",children:[k&&C==="admin"&&i.jsx("button",{className:"sidebar-admin",onClick:k,title:z("admin.title"),children:i.jsx(Yp,{size:15})}),i.jsx("button",{className:"sidebar-disconnect",onClick:f,title:z("sidebar.disconnect"),children:i.jsx(Bp,{size:16})})]})]}),i.jsxs("div",{className:"sidebar-section",children:[i.jsxs("div",{className:"sidebar-section-header",children:[i.jsx("span",{children:z("sidebar.channels")}),m&&i.jsx("button",{className:"sidebar-add",onClick:u,title:z("sidebar.createChannel"),children:i.jsx(Kp,{size:14})})]}),i.jsx("ul",{className:"channel-list",children:t.map((M,_)=>i.jsxs("li",{className:`channel-item ${M.name===n&&!r?"active":""}`,onClick:()=>a(M.name),draggable:!!E,onDragStart:D=>{D.dataTransfer.setData("text/plain",String(_))},onDragOver:D=>{D.preventDefault(),D.currentTarget.classList.add("drag-over")},onDragLeave:D=>{D.currentTarget.classList.remove("drag-over")},onDrop:D=>{D.currentTarget.classList.remove("drag-over");const Q=parseInt(D.dataTransfer.getData("text/plain"));if(isNaN(Q)||Q===_||!E)return;const Oe=t.map(Ke=>Ke.name),[pe]=Oe.splice(Q,1);Oe.splice(_,0,pe),E(Oe)},children:[M.hasPassword?i.jsx(zi,{size:14,className:"channel-icon"}):i.jsx(ja,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:M.name}),(v==null?void 0:v.includes(M.name))&&i.jsx("span",{className:"channel-typing-dot"}),(b[M.name]||0)>0&&i.jsx("span",{className:"channel-unread",children:b[M.name]}),(N==null?void 0:N.includes(M.name))&&i.jsx(fs,{size:11,className:"channel-muted-icon"}),i.jsx("span",{className:"channel-count",children:M.userCount}),L&&i.jsx("button",{className:"channel-mute-btn",onClick:D=>{D.stopPropagation(),L(M.name)},title:N!=null&&N.includes(M.name)?z("sidebar.unmute"):z("sidebar.mute"),children:i.jsx(fs,{size:11})}),m&&M.name!=="lobby"&&i.jsx("button",{className:"channel-delete",onClick:D=>{D.stopPropagation(),c(M.name)},title:z("sidebar.deleteChannel"),children:i.jsx(Sr,{size:12})})]},M.name))}),s.length>0&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"sidebar-section-header dm-header",children:i.jsx("span",{children:z("sidebar.directMessages")})}),i.jsx("ul",{className:"channel-list",children:s.map(M=>i.jsxs("li",{className:`channel-item ${r===M.peerId?"active":""}`,onClick:()=>o(M.peerId),children:[i.jsx(Rc,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:M.peerNick}),M.unread>0&&i.jsx("span",{className:"channel-unread",children:M.unread})]},M.peerId))})]})]}),x&&i.jsxs("div",{className:"sidebar-footer",children:[i.jsx(Gp,{status:w||"available"}),i.jsx("span",{className:"sidebar-nick",children:x}),i.jsx("span",{className:"sidebar-role","data-role":C,children:C})]}),i.jsx("style",{children:`
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
      `})]})}function x0({position:e,messageId:t,content:n,isOwn:r,canModerate:s,isBookmarked:a,onClose:o,onReply:u,onReact:c,onEdit:f,onDelete:m,onPin:b,onBookmark:x,onCopyText:C,onQuote:w,onForward:N}){const{t:L}=Ge(),k=y.useRef(null);y.useEffect(()=>{const M=D=>{k.current&&!k.current.contains(D.target)&&o()},_=D=>{D.key==="Escape"&&o()};return document.addEventListener("mousedown",M),document.addEventListener("keydown",_),()=>{document.removeEventListener("mousedown",M),document.removeEventListener("keydown",_)}},[o]);const v={position:"fixed",left:e.x,top:e.y,zIndex:300},E=()=>{navigator.clipboard.writeText(n),o()},z=()=>{w==null||w(),o()};return i.jsxs("div",{className:"ctx-menu",ref:k,style:v,children:[i.jsxs("button",{className:"ctx-item",onClick:()=>{u==null||u(t),o()},children:[i.jsx(Ll,{size:14}),i.jsx("span",{children:L("ctx.reply")})]}),i.jsxs("button",{className:"ctx-item",onClick:()=>{c==null||c(),o()},children:[i.jsx(Zi,{size:14}),i.jsx("span",{children:L("ctx.react")})]}),i.jsxs("button",{className:"ctx-item",onClick:E,children:[i.jsx(Dp,{size:14}),i.jsx("span",{children:L("ctx.copy")})]}),i.jsxs("button",{className:"ctx-item",onClick:z,children:[i.jsx(qx,{size:14}),i.jsx("span",{children:L("ctx.quote")})]}),N&&i.jsxs("button",{className:"ctx-item",onClick:()=>{N(t),o()},children:[i.jsx(Fp,{size:14}),i.jsx("span",{children:L("forward.title")})]}),x&&i.jsxs("button",{className:`ctx-item ${a?"active":""}`,onClick:()=>{x(t),o()},children:[i.jsx(pa,{size:14}),i.jsx("span",{children:L(a?"bookmarks.remove":"ctx.bookmark")})]}),r&&f&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"ctx-sep"}),i.jsxs("button",{className:"ctx-item",onClick:()=>{f(t),o()},children:[i.jsx(Vp,{size:14}),i.jsx("span",{children:L("ctx.edit")})]})]}),s&&b&&i.jsxs("button",{className:"ctx-item",onClick:()=>{b(t),o()},children:[i.jsx(bs,{size:14}),i.jsx("span",{children:L("ctx.pin")})]}),(r||s)&&m&&i.jsxs("button",{className:"ctx-item danger",onClick:()=>{m(t),o()},children:[i.jsx(Sr,{size:14}),i.jsx("span",{children:L("ctx.delete")})]}),i.jsx("style",{children:`
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
      `})]})}function v0(e){try{return new URL(e).hostname.replace("www.","")}catch{return e}}function y0(e){try{const t=new URL(e),n=t.pathname+t.search;return n.length>60?n.slice(0,57)+"...":n}catch{return""}}function b0(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}function w0({url:e}){const t=v0(e),n=y0(e),r=b0(e);return i.jsxs("a",{href:e,target:"_blank",rel:"noopener noreferrer",className:"link-preview",children:[i.jsx("div",{className:"link-preview-favicon",children:r?i.jsx("img",{src:r,alt:"",width:16,height:16,onError:s=>{s.target.style.display="none"}}):i.jsx($p,{size:14})}),i.jsxs("div",{className:"link-preview-info",children:[i.jsx("span",{className:"link-preview-domain",children:t}),n&&n!=="/"&&i.jsx("span",{className:"link-preview-path",children:n})]}),i.jsx(Oc,{size:12,className:"link-preview-ext"}),i.jsx("style",{children:`
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
      `})]})}const Io={keyword:["const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","import","export","from","default","async","await","try","catch","finally","throw","yield","of","in","this","super","static","public","private","protected","interface","type","enum","struct","impl","fn","pub","mod","use","crate","trait","where","mut","ref","self","match","loop","def","elif","pass","lambda","with","as","raise","except","True","False","None","func","go","defer","chan","select","package","range","map"],builtin:["console","window","document","Math","JSON","Array","Object","String","Number","Boolean","Promise","Map","Set","Error","null","undefined","true","false","nil","fmt","println","print","len","append","make"],type:["string","number","boolean","void","any","never","unknown","int","float","double","char","bool","i32","u32","i64","u64","f32","f64","usize","isize","Vec","Option","Result"]};function k0(e){var r,s,a;const t=e.split(`
`),n=[];for(let o=0;o<t.length;o++){const u=t[o],c=[];let f=u,m=0;for(;f.length>0;){const b=f.match(/^(["'`])(?:\\.|[^\\])*?\1/);if(b){c.push(i.jsx("span",{className:"code-string",children:b[0]},m++)),f=f.slice(b[0].length);continue}const x=f.match(/^(\/\/.*|#.*)/);if(x){c.push(i.jsx("span",{className:"code-comment",children:x[0]},m++)),f=f.slice(x[0].length);continue}const C=f.match(/^(0x[0-9a-fA-F]+|\d+\.?\d*)/);if(C&&(c.length===0||!/\w$/.test(((a=(s=(r=c[c.length-1])==null?void 0:r.props)==null?void 0:s.children)==null?void 0:a.toString())||""))){c.push(i.jsx("span",{className:"code-number",children:C[0]},m++)),f=f.slice(C[0].length);continue}const w=f.match(/^[a-zA-Z_]\w*/);if(w){const k=w[0];let v="";Io.keyword.includes(k)?v="code-keyword":Io.builtin.includes(k)?v="code-builtin":Io.type.includes(k)&&(v="code-type"),v?c.push(i.jsx("span",{className:v,children:k},m++)):c.push(i.jsx("span",{children:k},m++)),f=f.slice(k.length);continue}const N=f.match(/^[^\w\s]+/);if(N){c.push(i.jsx("span",{className:"code-punct",children:N[0]},m++)),f=f.slice(N[0].length);continue}const L=f.match(/^\s+/);if(L){c.push(i.jsx("span",{children:L[0]},m++)),f=f.slice(L[0].length);continue}c.push(i.jsx("span",{children:f[0]},m++)),f=f.slice(1)}n.push(i.jsxs("div",{className:"code-line",children:[i.jsx("span",{className:"code-line-number",children:o+1}),i.jsx("span",{className:"code-line-content",children:c})]},o))}return n}function j0({code:e,language:t}){const[n,r]=y.useState(!1),s=()=>{navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3)};return i.jsxs("div",{className:"code-block",children:[i.jsxs("div",{className:"code-block-header",children:[i.jsx("span",{className:"code-block-lang",children:t||"code"}),i.jsxs("button",{className:"code-block-copy",onClick:s,title:"Copy",children:[n?i.jsx(Lc,{size:12}):i.jsx(Dp,{size:12}),i.jsx("span",{children:n?"Copied!":"Copy"})]})]}),i.jsx("pre",{className:"code-block-body",children:i.jsx("code",{children:k0(e)})}),i.jsx("style",{children:`
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
      `})]})}function Zp(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t)}function S0(e){const t=Zp(e),n=t%360,r=(n+40+(t>>8)%60)%360;return[`hsl(${n}, 65%, 55%)`,`hsl(${r}, 55%, 45%)`]}function N0(e){const t=e.trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,2).toUpperCase()}function C0(e){const t=Zp(e),n=[];for(let r=0;r<9;r++)n.push(t>>r&1);return n}function eh({userId:e,nickname:t,size:n=32}){const[r,s]=S0(e),a=N0(t),o=C0(e);return i.jsxs("div",{className:"user-avatar",style:{width:n,height:n,minWidth:n,background:`linear-gradient(135deg, ${r}, ${s})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"},title:t,children:[i.jsx("svg",{width:n,height:n,viewBox:"0 0 3 3",style:{position:"absolute",inset:0,opacity:.15},children:o.map((u,c)=>u?i.jsx("rect",{x:c%3,y:Math.floor(c/3),width:1,height:1,fill:"#fff"},c):null)}),i.jsx("span",{style:{fontSize:n*.38,fontWeight:700,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,0.2)",letterSpacing:"-0.5px",position:"relative",zIndex:1},children:a})]})}function th(e){const t=e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);if(t)return{type:"youtube",id:t[1]};const n=e.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);return n?{type:"twitter",id:n[1]}:null}function E0({videoId:e}){const t=`https://img.youtube.com/vi/${e}/mqdefault.jpg`;return i.jsxs("a",{href:`https://www.youtube.com/watch?v=${e}`,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-youtube",children:[i.jsxs("div",{className:"rich-embed-thumb",children:[i.jsx("img",{src:t,alt:"YouTube video",loading:"lazy"}),i.jsx("div",{className:"rich-embed-play",children:i.jsx(Qx,{size:20,fill:"#fff"})})]}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsxs("span",{className:"rich-embed-source",children:[i.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#ff0000",children:[i.jsx("path",{d:"M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"}),i.jsx("path",{fill:"#fff",d:"M9.5 15.5V8.5l6.5 3.5z"})]}),i.jsx("span",{children:"YouTube"})]}),i.jsx("span",{className:"rich-embed-id",children:e})]}),i.jsx(Oc,{size:11,className:"rich-embed-ext"})]})}function z0({tweetId:e,url:t}){return i.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-twitter",children:[i.jsx("div",{className:"rich-embed-twitter-icon",children:i.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:i.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsx("span",{className:"rich-embed-source",children:i.jsx("span",{children:"X (Twitter)"})}),i.jsxs("span",{className:"rich-embed-id",children:["Tweet #",e.slice(-6)]})]}),i.jsx(Oc,{size:11,className:"rich-embed-ext"})]})}function P0({url:e}){const t=th(e);return t?t.type==="youtube"&&t.id?i.jsx(E0,{videoId:t.id}):t.type==="twitter"&&t.id?i.jsx(z0,{tweetId:t.id,url:e}):null:null}function nh(e){return th(e)!==null}const M0=/\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi,Dc=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,eo=/```(\w*)\n([\s\S]*?)```/g,rh=/\bhttps?:\/\/[^\s]+/g;function Zu(e){const t=[];let n=0;const r=/(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\~\~[^~]+\~\~)|(@\w+)|(\b(https?:\/\/[^\s]+))/g;let s=0,a;for(;(a=r.exec(e))!==null;)a.index>s&&t.push(e.slice(s,a.index)),a[1]?t.push(i.jsx("a",{className:"msg-link",href:a[3],target:"_blank",rel:"noopener noreferrer",children:a[2]},n++)):a[4]?t.push(i.jsx("code",{className:"msg-code",children:a[4].slice(1,-1)},n++)):a[5]?t.push(i.jsx("strong",{children:a[5].slice(2,-2)},n++)):a[6]?t.push(i.jsx("em",{children:a[6].slice(1,-1)},n++)):a[7]?t.push(i.jsx("del",{children:a[7].slice(2,-2)},n++)):a[8]?t.push(i.jsx("span",{className:"msg-mention",children:a[8]},n++)):a[10]&&t.push(i.jsx("a",{className:"msg-link",href:a[10],target:"_blank",rel:"noopener noreferrer",children:a[10]},n++)),s=a.index+a[0].length;return s<e.length&&t.push(e.slice(s)),t}function I0(e){return/```[\s\S]*?```/.test(e)}function L0(e){const t=[];let n;const r=/```(\w*)\n([\s\S]*?)```/g;for(;(n=r.exec(e))!==null;)t.push({language:n[1]||"",code:n[2].trimEnd()});return t}function T0(e){return e.replace(eo,"").trim()}function sh(e){const n=e.replace(Dc,"").replace(eo,"").match(M0);return n?[...new Set(n)]:[]}function O0(e){const n=e.replace(Dc,"").replace(eo,"").match(rh)||[],r=sh(e);return n.filter(s=>!r.includes(s)&&!nh(s)).slice(0,3)}function R0(e){return(e.replace(Dc,"").replace(eo,"").match(rh)||[]).filter(r=>nh(r)).slice(0,2)}const _0=["👍","❤️","😂","👏","🔥","🤔"];function Ol({id:e,userId:t,nickname:n,content:r,role:s,timestamp:a,isOwn:o,edited:u,reactions:c,currentUserId:f,canModerate:m,onReact:b,onRemoveReact:x,onEdit:C,onDelete:w,onPin:N,onReply:L,onBookmark:k,isBookmarked:v,isPinned:E,replyContext:z,isGrouped:M,onImageClick:_,onQuote:D,onThreadOpen:Q,onForward:Oe}){const{t:pe,i18n:Ke}=Ge(),[pt,wt]=y.useState(!1),[ht,ot]=y.useState(!1),[Xe,xt]=y.useState(r),[K,re]=y.useState(!1),[he,Ue]=y.useState(null),xe=new Date(a),Ze=new Intl.DateTimeFormat(Ke.language,{hour:"2-digit",minute:"2-digit"}).format(xe),We=new Intl.DateTimeFormat(Ke.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(xe),ke=`var(--role-${s})`,et=y.useMemo(()=>L0(r),[r]),Ct=y.useMemo(()=>I0(r)?T0(r):r,[r]),tn=y.useMemo(()=>sh(r),[r]),Jt=y.useMemo(()=>O0(r),[r]),Qt=y.useMemo(()=>R0(r),[r]),nn=()=>{Xe.trim()&&Xe!==r&&(C==null||C(e,Xe.trim())),ot(!1)},Rt=me=>{const at=c==null?void 0:c.find(Dn=>Dn.emoji===me);at!=null&&at.users.includes(f)?x==null||x(e,me):b==null||b(e,me),re(!1)},vn=me=>{me.preventDefault(),Ue({x:me.clientX,y:me.clientY})};return i.jsxs("div",{className:`message ${o?"own":""} ${M?"grouped":""}`,onMouseEnter:()=>wt(!0),onMouseLeave:()=>{wt(!1),re(!1)},onContextMenu:vn,children:[z&&i.jsxs("div",{className:"message-reply-context",onClick:()=>Q==null?void 0:Q(e),style:Q?{cursor:"pointer"}:void 0,children:[i.jsx(Ll,{size:10,className:"reply-icon"}),i.jsx("span",{className:"reply-context-nick",children:z.nickname}),i.jsx("span",{className:"reply-context-text",children:z.content.slice(0,60)})]}),!M&&i.jsxs("div",{className:"message-header",children:[i.jsx(eh,{userId:t,nickname:n,size:28}),i.jsx("span",{className:"message-nick",style:{color:ke},children:n}),i.jsx("span",{className:"message-time",title:We,children:Ze}),u&&i.jsx("span",{className:"message-edited",children:pe("chat.edited")}),E&&i.jsx(bs,{size:11,className:"message-pin-badge"})]}),M&&pt&&i.jsx("span",{className:"message-time-inline",title:We,children:Ze}),ht?i.jsxs("div",{className:"message-edit-area",children:[i.jsx("input",{className:"message-edit-input",value:Xe,onChange:me=>xt(me.target.value),onKeyDown:me=>{me.key==="Enter"&&nn(),me.key==="Escape"&&ot(!1)},autoFocus:!0}),i.jsx("button",{className:"message-edit-save",onClick:nn,children:"OK"}),i.jsx("button",{className:"message-edit-cancel",onClick:()=>ot(!1),children:"ESC"})]}):i.jsxs(i.Fragment,{children:[Ct&&i.jsx("div",{className:"message-content",children:Ct.split(`
`).map((me,at)=>me.startsWith("> ")?i.jsx("div",{className:"msg-blockquote",children:Zu(me.slice(2))},at):i.jsxs("span",{children:[at>0&&`
`,Zu(me)]},at))}),et.map((me,at)=>i.jsx(j0,{code:me.code,language:me.language},`cb-${at}`)),tn.length>0&&i.jsx("div",{className:"message-images",children:tn.map((me,at)=>i.jsx("img",{src:me,alt:"",className:"message-img-preview",loading:"lazy",onClick:()=>_?_(me):window.open(me,"_blank")},at))}),Qt.length>0&&i.jsx("div",{className:"message-embeds",children:Qt.map((me,at)=>i.jsx(P0,{url:me},`embed-${at}`))}),Jt.length>0&&i.jsx("div",{className:"message-link-previews",children:Jt.map((me,at)=>i.jsx(w0,{url:me},`lp-${at}`))})]}),c&&c.length>0&&i.jsx("div",{className:"message-reactions",children:c.map(me=>i.jsxs("button",{className:`reaction-chip ${me.users.includes(f)?"own":""}`,onClick:()=>Rt(me.emoji),title:me.users.length.toString(),children:[i.jsx("span",{children:me.emoji}),i.jsx("span",{className:"reaction-count",children:me.users.length})]},me.emoji))}),pt&&!ht&&i.jsxs("div",{className:"message-actions",children:[i.jsx("button",{onClick:()=>L==null?void 0:L(e),title:"Reply",children:i.jsx(Ll,{size:13})}),i.jsx("button",{onClick:()=>re(me=>!me),title:"React",children:i.jsx(Zi,{size:13})}),k&&i.jsx("button",{className:v?"action-bookmarked":"",onClick:()=>k(e),title:"Bookmark",children:i.jsx(pa,{size:13})}),o&&i.jsx("button",{onClick:()=>{ot(!0),xt(r)},title:"Edit",children:i.jsx(Vp,{size:13})}),(o||m)&&i.jsx("button",{className:"action-danger",onClick:()=>w==null?void 0:w(e),title:"Delete",children:i.jsx(Sr,{size:13})}),m&&i.jsx("button",{onClick:()=>N==null?void 0:N(e),title:"Pin",children:i.jsx(bs,{size:13})})]}),K&&i.jsx("div",{className:"message-react-picker",children:_0.map(me=>i.jsx("button",{onClick:()=>Rt(me),children:me},me))}),he&&i.jsx(x0,{position:he,messageId:e,content:r,isOwn:o,canModerate:m||!1,isBookmarked:v,onClose:()=>Ue(null),onReply:L,onReact:()=>{re(!0),Ue(null)},onEdit:o?()=>{ot(!0),xt(r),Ue(null)}:void 0,onDelete:w,onPin:N,onBookmark:k,onCopyText:()=>{navigator.clipboard.writeText(r),Ue(null)},onQuote:()=>{D==null||D(r,n),Ue(null)},onForward:Oe}),i.jsx("style",{children:`
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
      `})]})}const ed=[{key:"smileys",emojis:["😀","😂","🤣","😍","🥰","😘","😎","🤔","🥳","😢","😡","😏","🤗","😴","🥺","😈"]},{key:"gestures",emojis:["👍","👎","👋","🙌","👏","🤝","🙏","💪","🫡","🤙","✌️","🤞","👀","🫶","✋","👊"]},{key:"symbols",emojis:["🔥","❤️","💯","⭐","🎉","🎊","🚀","⚡","✅","❌","💬","💡","🏆","💎","🌟","🎯"]},{key:"objects",emojis:["💻","📱","🎮","🎧","📸","🎬","🔒","🔑","📂","📌","🔔","⏰","🧪","🛠️","📊","🗂️"]}];function D0({onSelect:e,onClose:t}){var u;const{t:n}=Ge(),r=y.useRef(null),[s,a]=y.useState("");y.useEffect(()=>{const c=f=>{r.current&&!r.current.contains(f.target)&&t()};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[t]);const o=s?[{key:"results",emojis:ed.flatMap(c=>c.emojis).filter(c=>c.includes(s))}]:ed;return i.jsxs("div",{ref:r,className:"emoji-picker",children:[i.jsx("input",{className:"emoji-search",type:"text",placeholder:n("chat.searchEmoji")||"Search...",value:s,onChange:c=>a(c.target.value),autoFocus:!0}),i.jsxs("div",{className:"emoji-grid-area",children:[o.map(c=>i.jsxs("div",{className:"emoji-category",children:[!s&&i.jsx("div",{className:"emoji-cat-label",children:n(`emoji.${c.key}`)||c.key}),i.jsx("div",{className:"emoji-grid",children:c.emojis.map(f=>i.jsx("button",{className:"emoji-item",onClick:()=>e(f),children:f},f))})]},c.key)),s&&((u=o[0])==null?void 0:u.emojis.length)===0&&i.jsx("div",{className:"emoji-empty",children:"No emoji found"})]}),i.jsx("style",{children:`
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
      `})]})}function U0({users:e,filter:t,onSelect:n,selectedIndex:r}){const s=y.useRef(null),a=e.filter(o=>o.nickname.toLowerCase().startsWith(t.toLowerCase())).slice(0,6);return y.useEffect(()=>{var u;const o=(u=s.current)==null?void 0:u.children[r];o==null||o.scrollIntoView({block:"nearest"})},[r]),a.length===0?null:i.jsxs("div",{className:"mention-suggestions",children:[i.jsx("ul",{ref:s,children:a.map((o,u)=>i.jsxs("li",{className:`mention-item ${u===r?"active":""}`,onMouseDown:c=>{c.preventDefault(),n(o.nickname)},children:[i.jsxs("span",{className:"mention-nick",style:{color:`var(--role-${o.role})`},children:["@",o.nickname]}),i.jsx("span",{className:"mention-role",children:o.role})]},o.userId))}),i.jsx("style",{children:`
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
      `})]})}function A0({onFormat:e}){return i.jsxs("div",{className:"format-toolbar",children:[i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("**"),title:"Bold (Ctrl+B)",children:i.jsx(zx,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("*"),title:"Italic (Ctrl+I)",children:i.jsx(Ux,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("~~"),title:"Strikethrough",children:i.jsx(n0,{size:14})})]}),i.jsx("div",{className:"format-sep"}),i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("`"),title:"Code",children:i.jsx(Lx,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("[","[","](url)"),title:"Link",children:i.jsx(Fx,{size:14})})]}),i.jsx("style",{children:`
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
      `})]})}function F0({onSend:e,onCancel:t}){const{t:n}=Ge(),[r,s]=y.useState(!1),[a,o]=y.useState(0),[u,c]=y.useState(null),[f,m]=y.useState(null),b=y.useRef(null),x=y.useRef([]),C=y.useRef(0),w=y.useRef(0);y.useEffect(()=>(N(),()=>{C.current&&clearInterval(C.current),f&&URL.revokeObjectURL(f)}),[]);const N=async()=>{try{const E=await navigator.mediaDevices.getUserMedia({audio:!0}),z=new MediaRecorder(E,{mimeType:"audio/webm;codecs=opus"});b.current=z,x.current=[],z.ondataavailable=M=>{M.data.size>0&&x.current.push(M.data)},z.onstop=()=>{const M=new Blob(x.current,{type:"audio/webm"});c(M),m(URL.createObjectURL(M)),E.getTracks().forEach(_=>_.stop())},z.start(100),s(!0),w.current=Date.now(),C.current=window.setInterval(()=>{o(Math.floor((Date.now()-w.current)/1e3))},200)}catch{t()}},L=()=>{b.current&&r&&(b.current.stop(),s(!1),C.current&&clearInterval(C.current))},k=()=>{u&&e(u,a)},v=E=>{const z=Math.floor(E/60),M=E%60;return`${z}:${M.toString().padStart(2,"0")}`};return i.jsxs("div",{className:"voice-recorder",children:[i.jsxs("div",{className:"voice-recorder-indicator",children:[r&&i.jsx("span",{className:"voice-rec-dot"}),i.jsx("span",{className:"voice-rec-time",children:v(a)})]}),r&&i.jsx("div",{className:"voice-recorder-wave",children:Array.from({length:5}).map((E,z)=>i.jsx("span",{className:"voice-wave-bar",style:{animationDelay:`${z*.1}s`}},z))}),f&&!r&&i.jsx("audio",{className:"voice-recorder-preview",src:f,controls:!0}),i.jsxs("div",{className:"voice-recorder-actions",children:[r?i.jsx("button",{className:"voice-btn voice-stop",onClick:L,title:n("voice.stop"),children:i.jsx(e0,{size:14})}):u?i.jsx("button",{className:"voice-btn voice-send",onClick:k,title:n("voice.send"),children:i.jsx(Gi,{size:14})}):i.jsx(ha,{size:14,className:"voice-loading"}),i.jsx("button",{className:"voice-btn voice-cancel",onClick:t,title:n("voice.cancel"),children:i.jsx(Ot,{size:14})})]}),i.jsx("style",{children:`
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
      `})]})}function $0(e,t){const n=new Date(e),r=new Date,s=new Date(r.getFullYear(),r.getMonth(),r.getDate()),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()),o=(s.getTime()-a.getTime())/864e5;return o===0?t("chat.today"):o===1?t("chat.yesterday"):n.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}function B0({messages:e,activeChannel:t,channelTopic:n,currentUserId:r,currentRole:s,typingUsers:a,dmMode:o,onSendMessage:u,onSlashCommand:c,onTyping:f,onSearchOpen:m,onReact:b,onRemoveReact:x,onEdit:C,onDelete:w,onPin:N,onReply:L,replyTo:k,onCancelReply:v,onLoadHistory:E,historyLoading:z,hasMoreHistory:M,onFileUpload:_,canUpload:D,users:Q,onPinsOpen:Oe,onBookmarksOpen:pe,onBookmark:Ke,isBookmarked:pt,onChannelSettings:wt,onImageClick:ht,lastReadMessageId:ot,pinnedMessageIds:Xe,onQuote:xt,quotedText:K,onQuoteClear:re,onThreadOpen:he,onForward:Ue}){const{t:xe}=Ge(),[Ze,We]=y.useState(""),[ke,et]=y.useState(!1),[Ct,tn]=y.useState(null),[Jt,Qt]=y.useState(0),[nn,Rt]=y.useState(!1),[vn,me]=y.useState(0),[at,Dn]=y.useState(null),[ir,rn]=y.useState(!1),_t=y.useRef(null),sn=y.useRef(null),Un=y.useRef(0),An=y.useRef(null),Fn=y.useRef(0),Bt=y.useRef(!1),yn=y.useRef(0);y.useEffect(()=>{K&&(We(K),re==null||re())},[K,re]);const rt=e.filter(W=>W.channel===t),Jn=y.useCallback(()=>{const W=sn.current;if(!W)return;const q=W.scrollHeight-W.scrollTop-W.clientHeight;Rt(q>80),q<=80&&me(0);const Je=W.querySelectorAll(".chat-date-separator");let tt=null;for(let En=Je.length-1;En>=0;En--){const Et=Je[En].getBoundingClientRect(),an=W.getBoundingClientRect();if(Et.top<=an.top+10){tt=Je[En].textContent||null;break}}Dn(q>80?tt:null),!(z||!M||!E||Bt.current)&&W.scrollTop<100&&rt.length>0&&(Bt.current=!0,Fn.current=W.scrollHeight,E(t,rt[0].timestamp))},[t,rt,z,M,E]);y.useEffect(()=>{if(Bt.current&&!z){Bt.current=!1;const W=sn.current;if(W){const q=W.scrollHeight;W.scrollTop=q-Fn.current}}},[z,rt.length]);const Cn=y.useCallback(()=>{var W;(W=An.current)==null||W.click()},[]),Qn=y.useCallback(W=>{var Je;const q=(Je=W.target.files)==null?void 0:Je[0];q&&_&&_(q),W.target.value=""},[_]),G=y.useMemo(()=>{const W=[];let q="";for(const Je of rt){const tt=new Date(Je.timestamp).toDateString();tt!==q&&(q=tt,W.push({type:"separator",date:$0(Je.timestamp,xe),key:`sep-${tt}`})),W.push(Je)}return W},[rt,xe]);y.useEffect(()=>{var W;rt.length>yn.current&&(nn?me(q=>q+(rt.length-yn.current)):(W=_t.current)==null||W.scrollIntoView({behavior:"smooth"})),yn.current=rt.length},[rt.length,nn]);const A=()=>{const W=Ze.trim();if(W){if(W.startsWith("/")&&c){const q=W.slice(1).split(/\s+/);c(q[0],q.slice(1))}else u(t,W);We("")}},X=W=>{We(W);const q=W.length,tt=W.slice(0,q).match(/@(\w*)$/);tt&&Q&&Q.length>0?(tn(tt[1]),Qt(0)):tn(null)},be=W=>{const q=/@(\w*)$/;We(Je=>Je.replace(q,`@${W} `)),tn(null)},st=y.useCallback((W,q,Je)=>{We(q&&Je?tt=>tt+q+"text"+Je:tt=>tt+W+"text"+W)},[]),S=W=>{if(Ct!==null){if(W.key==="ArrowDown"){W.preventDefault(),Qt(q=>q+1);return}if(W.key==="ArrowUp"){W.preventDefault(),Qt(q=>Math.max(0,q-1));return}if(W.key==="Tab"||W.key==="Enter"){W.preventDefault();const q=(Q||[]).filter(tt=>tt.nickname.toLowerCase().startsWith((Ct||"").toLowerCase())).slice(0,6),Je=Jt%Math.max(q.length,1);q[Je]&&be(q[Je].nickname);return}if(W.key==="Escape"){tn(null);return}}if(W.key==="Enter"&&!W.shiftKey){W.preventDefault(),A();return}f&&Date.now()-Un.current>2e3&&(Un.current=Date.now(),f())},ye=y.useCallback(W=>{We(q=>q+W),et(!1)},[]),ve=a.filter(W=>o?W.targetId===r&&W.userId===o.peerId:W.channel===t&&W.userId!==r),_e=ve.length>0?ve.length===1?xe("chat.typing",{name:ve[0].nickname}):xe("chat.typingMultiple",{count:ve.length}):null;return i.jsxs("div",{className:"chat-panel",children:[i.jsxs("div",{className:"chat-header",children:[i.jsx("span",{className:"chat-channel-name",onClick:o?void 0:wt,style:o?void 0:{cursor:"pointer"},children:o?`@ ${o.peerNick}`:`# ${t}`}),!o&&n&&i.jsx("span",{className:"chat-topic",onClick:wt,style:{cursor:"pointer"},children:n}),i.jsxs("div",{className:"chat-header-actions",children:[Oe&&i.jsx("button",{className:"chat-header-btn",onClick:Oe,title:xe("pins.title"),children:i.jsx(bs,{size:15})}),pe&&i.jsx("button",{className:"chat-header-btn",onClick:pe,title:xe("bookmarks.title"),children:i.jsx(pa,{size:15})}),m&&i.jsx("button",{className:"chat-header-btn",onClick:m,title:xe("search.title"),children:i.jsx(Tl,{size:15})})]})]}),i.jsxs("div",{className:"chat-messages",ref:sn,onScroll:Jn,children:[at&&i.jsx("div",{className:"chat-sticky-date",children:i.jsx("span",{children:at})}),z&&i.jsxs("div",{className:"chat-history-loading",children:[i.jsx(ha,{size:14,className:"spinner"}),i.jsx("span",{children:xe("chat.loadingHistory")})]}),!z&&M===!1&&rt.length>0&&i.jsx("div",{className:"chat-history-end",children:xe("chat.historyStart")}),rt.length===0&&i.jsxs("div",{className:"chat-empty",children:[i.jsx("div",{className:"chat-empty-icon",children:"��"}),i.jsx("span",{children:xe("chat.noMessages")})]}),G.map(W=>{if("type"in W&&W.type==="separator")return i.jsx("div",{className:"chat-date-separator",children:i.jsx("span",{children:W.date})},W.key);const q=W,Je=s==="admin"||s==="operator",tt=q.replyTo?rt.find(Pr=>Pr.id===q.replyTo):void 0,En=rt.indexOf(q),Et=En>0?rt[En-1]:void 0,an=Et!==void 0&&Et.userId===q.userId&&q.timestamp-Et.timestamp<12e4&&!q.replyTo,$n=ot&&(Et==null?void 0:Et.id)===ot&&q.userId!==r,zr=q.replyTo&&he;return i.jsxs("div",{children:[$n&&i.jsx("div",{className:"chat-unread-marker",children:i.jsx("span",{children:xe("chat.newMessages")})}),i.jsx(Ol,{id:q.id,userId:q.userId,nickname:q.nickname,content:q.content,role:q.role,timestamp:q.timestamp,isOwn:q.userId===r,edited:q.edited,reactions:q.reactions,currentUserId:r,canModerate:Je,onReact:b,onRemoveReact:x,onEdit:C,onDelete:w,onPin:N,onReply:L,onBookmark:Ke,isBookmarked:pt==null?void 0:pt(q.id),isPinned:Xe==null?void 0:Xe.includes(q.id),replyContext:tt?{nickname:tt.nickname,content:tt.content}:void 0,isGrouped:an,onImageClick:ht,onQuote:xt,onThreadOpen:zr?()=>he(q.replyTo):void 0,onForward:Ue})]},q.id)}),i.jsx("div",{ref:_t})]}),nn&&i.jsxs("button",{className:"scroll-to-bottom",onClick:()=>{var W;(W=_t.current)==null||W.scrollIntoView({behavior:"smooth"}),Rt(!1),me(0)},children:[i.jsx(Sx,{size:14}),vn>0&&i.jsx("span",{className:"scroll-badge",children:vn})]}),_e&&i.jsxs("div",{className:"chat-typing",children:[i.jsxs("span",{className:"typing-dots",children:[i.jsx("span",{}),i.jsx("span",{}),i.jsx("span",{})]}),_e]}),k&&i.jsxs("div",{className:"chat-reply-preview",children:[i.jsxs("span",{className:"reply-label",children:[xe("chat.replyingTo")," ",i.jsx("strong",{children:k.nickname})]}),i.jsx("span",{className:"reply-content",children:k.content.slice(0,80)}),i.jsx("button",{className:"reply-cancel",onClick:v,title:"Cancel",children:i.jsx("span",{children:"×"})})]}),ir&&i.jsx("div",{className:"chat-voice-area",children:i.jsx(F0,{onSend:(W,q)=>{const Je=new File([W],`voice-${Date.now()}.webm`,{type:"audio/webm"});_==null||_(Je),rn(!1)},onCancel:()=>rn(!1)})}),i.jsx(A0,{onFormat:st}),i.jsxs("div",{className:"chat-input-area",children:[D&&_&&i.jsxs(i.Fragment,{children:[i.jsx("button",{className:"chat-upload-btn",onClick:Cn,title:xe("files.upload"),children:i.jsx(ma,{size:18})}),i.jsx("input",{ref:An,type:"file",style:{display:"none"},onChange:Qn})]}),i.jsxs("div",{className:"chat-input-wrapper",children:[Ct!==null&&Q&&i.jsx(U0,{users:Q,filter:Ct,onSelect:be,selectedIndex:Jt}),i.jsx("textarea",{className:"chat-input",value:Ze,onChange:W=>X(W.target.value),onKeyDown:S,placeholder:o?xe("chat.dmPlaceholder",{name:o.peerNick}):xe("chat.placeholder"),rows:1}),i.jsx("button",{className:"emoji-btn",onClick:()=>et(W=>!W),title:"Emoji",children:i.jsx(Zi,{size:18})}),ke&&i.jsx(D0,{onSelect:ye,onClose:()=>et(!1)})]}),!Ze.trim()&&D?i.jsx("button",{className:"chat-mic-btn",onClick:()=>rn(!0),title:xe("voice.record"),children:i.jsx(Kx,{size:18})}):i.jsx("button",{className:"chat-send-btn",onClick:A,disabled:!Ze.trim(),children:i.jsx(Gi,{size:18})})]}),i.jsx("style",{children:`
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
      `})]})}function H0({role:e}){switch(e){case"admin":return i.jsx(Qp,{size:11,style:{color:"var(--role-admin)"}});case"operator":return i.jsx(Jp,{size:11,style:{color:"var(--role-operator)"}});case"guest":return i.jsx(Tx,{size:11,style:{color:"var(--role-guest)"}});default:return i.jsx(a0,{size:11,style:{color:"var(--role-member)"}})}}function V0({users:e,currentUserId:t,currentRole:n,onKick:r,onBan:s,onOp:a,onDeop:o,onDM:u}){const{t:c}=Ge(),[f,m]=y.useState(null),[b,x]=y.useState({x:0,y:0}),C=y.useRef(null),w=n==="admin"||n==="operator";y.useEffect(()=>{const v=E=>{C.current&&!C.current.contains(E.target)&&m(null)};return document.addEventListener("mousedown",v),()=>document.removeEventListener("mousedown",v)},[]);const N=(v,E)=>{if(v===t)return;const z=E.target.getBoundingClientRect();x({x:z.left,y:z.bottom+4}),m(v===f?null:v)},L=[...e].sort((v,E)=>{var D,Q;const z={admin:0,operator:1,member:2,guest:3},M=(D=z[v.role])!=null?D:4,_=(Q=z[E.role])!=null?Q:4;return M!==_?M-_:v.nickname.localeCompare(E.nickname)}),k=e.find(v=>v.userId===f);return i.jsxs("aside",{className:"user-list",children:[i.jsxs("div",{className:"user-list-header",children:[i.jsx("span",{children:c("users.title")}),i.jsx("span",{className:"user-count",children:e.length})]}),i.jsx("ul",{className:"user-entries",children:L.map(v=>i.jsxs("li",{className:`user-entry ${v.userId!==t?"clickable":""} ${v.userId===t?"self":""}`,onClick:E=>N(v.userId,E),children:[i.jsxs("div",{className:"user-entry-avatar",children:[i.jsx(eh,{userId:v.userId,nickname:v.nickname,size:22}),i.jsx(Gp,{status:v.status})]}),i.jsx(H0,{role:v.role}),i.jsx("span",{className:"user-nick",style:{color:`var(--role-${v.role})`},children:v.nickname})]},`${v.userId}-${v.nickname}`))}),f&&k&&i.jsxs("div",{ref:C,className:"user-menu",style:{position:"fixed",left:b.x,top:b.y},children:[i.jsxs("div",{className:"user-menu-header",children:[i.jsx("span",{className:"user-menu-nick",children:k.nickname}),i.jsx("span",{className:"user-menu-role",style:{color:`var(--role-${k.role})`},children:c(`roles.${k.role}`)})]}),i.jsxs("div",{className:"user-menu-pubkey",title:k.userId,children:[k.userId.slice(0,16),"..."]}),i.jsxs("div",{className:"user-menu-actions",children:[i.jsx("button",{onClick:()=>{u==null||u(f),m(null)},children:c("users.sendDM")}),w&&k.role!=="operator"&&i.jsx("button",{onClick:()=>{a==null||a(f),m(null)},children:c("roles.operator")}),w&&k.role==="operator"&&i.jsx("button",{onClick:()=>{o==null||o(f),m(null)},children:c("roles.member")}),w&&i.jsx("button",{onClick:()=>{r==null||r(f),m(null)},children:"Kick"}),w&&i.jsx("button",{className:"danger",onClick:()=>{s==null||s(f),m(null)},children:"Ban"})]})]}),i.jsx("style",{children:`
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
      `})]})}function K0({serverAddress:e,publicKey:t,signature:n,canUpload:r,canDownload:s}){const{t:a}=Ge(),[o,u]=y.useState(""),[c,f]=y.useState([]),[m,b]=y.useState(!1),C=`http://${e.replace(/:\d+$/,":9999")}`,w=async M=>{b(!0);try{const _=`${C}/files/${M}`,D=await fetch(_,{headers:{"X-Hotline-PublicKey":t,"X-Hotline-Signature":n}});if(D.ok){const Q=await D.json();f(Q.entries||[]),u(M)}}catch{}finally{b(!1)}},N=M=>{if(M.isDir){const _=o?`${o}/${M.name}`:M.name;w(_)}else if(s){const _=o?`${o}/${M.name}`:M.name;window.open(`${C}/files/${_}`,"_blank")}},L=()=>{const M=o.split("/").filter(Boolean);M.pop(),w(M.join("/"))},k=async M=>{var Oe;const _=(Oe=M.target.files)==null?void 0:Oe[0];if(!_)return;const D=new FormData;D.append("file",_);const Q=o?`${o}/${_.name}`:_.name;await fetch(`${C}/files/${Q}`,{method:"POST",headers:{"X-Hotline-PublicKey":t,"X-Hotline-Signature":n},body:D}),w(o)},v=M=>M<1024?`${M} B`:M<1048576?`${(M/1024).toFixed(1)} KB`:`${(M/1048576).toFixed(1)} MB`,E=o?o.split("/").filter(Boolean):[],z=y.useRef(!1);return y.useEffect(()=>{z.current||(z.current=!0,w(""))},[]),i.jsxs("div",{className:"file-browser",children:[i.jsxs("div",{className:"file-header",children:[i.jsx("span",{children:a("files.title")}),r&&i.jsxs("label",{className:"file-upload-btn",children:[i.jsx(ma,{size:13}),i.jsx("input",{type:"file",hidden:!0,onChange:k})]})]}),E.length>0&&i.jsxs("div",{className:"file-breadcrumb",children:[i.jsx("button",{className:"breadcrumb-item",onClick:()=>w(""),children:"~"}),E.map((M,_)=>i.jsxs("span",{className:"breadcrumb-item",children:[i.jsx("span",{className:"breadcrumb-sep",children:"/"}),i.jsx("button",{onClick:()=>w(E.slice(0,_+1).join("/")),children:M})]},_))]}),i.jsxs("div",{className:"file-entries",children:[m&&i.jsxs("div",{className:"file-skeleton",children:[i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"})]}),!m&&o&&i.jsxs("div",{className:"file-entry",onClick:L,children:[i.jsx(Cx,{size:14,className:"file-icon up"}),i.jsx("span",{className:"file-name",children:".."})]}),!m&&c.map(M=>i.jsxs("div",{className:`file-entry ${M.isDir?"dir":""}`,onClick:()=>N(M),children:[M.isDir?i.jsx(_x,{size:14,className:"file-icon folder"}):i.jsx(Ox,{size:14,className:"file-icon"}),i.jsx("span",{className:"file-name",children:M.name}),!M.isDir&&i.jsx("span",{className:"file-size",children:v(M.size)}),!M.isDir&&s&&i.jsx(Up,{size:12,className:"file-dl"})]},M.name)),!m&&c.length===0&&i.jsxs("div",{className:"file-empty",children:[i.jsx(Rx,{size:20,className:"file-empty-icon"}),i.jsx("span",{children:a("files.empty")})]})]}),i.jsx("style",{children:`
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
      `})]})}function W0({motd:e}){const{t}=Ge(),[n,r]=y.useState(!1),[s,a]=y.useState(!1);if(!e||n)return null;const o=e.length>120;return i.jsxs("div",{className:`server-banner ${s?"expanded":""}`,children:[i.jsxs("div",{className:"banner-main",children:[i.jsx(Dx,{size:14,className:"banner-icon"}),i.jsx("span",{className:"banner-label",children:t("server.motd")}),i.jsx("span",{className:"banner-text",children:s||!o?e:e.slice(0,120)+"…"}),i.jsxs("div",{className:"banner-actions",children:[o&&i.jsx("button",{className:"banner-expand",onClick:()=>a(u=>!u),title:s?"Collapse":"Expand",children:s?i.jsx(Ix,{size:14}):i.jsx(Mx,{size:14})}),i.jsx("button",{className:"banner-dismiss",onClick:()=>r(!0),title:"Dismiss",children:i.jsx(Ot,{size:14})})]})]}),i.jsx("style",{children:`
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
      `})]})}const Y0=[{code:"en",label:"EN"},{code:"fr",label:"FR"}];function J0(){const{i18n:e,t}=Ge(),[n,r]=y.useState(()=>localStorage.getItem("hotline-theme")||"dark");y.useEffect(()=>{document.documentElement.setAttribute("data-theme",n),localStorage.setItem("hotline-theme",n)},[n]);const s=o=>{e.changeLanguage(o.target.value)},a=()=>r(o=>o==="dark"?"light":"dark");return i.jsxs("div",{className:"lang-selector",children:[i.jsx("button",{className:"theme-toggle",onClick:a,title:t("settings.theme"),children:n==="dark"?i.jsx(r0,{size:14}):i.jsx(Wx,{size:14})}),i.jsx($p,{size:12,className:"lang-icon"}),i.jsx("select",{value:e.language.split("-")[0],onChange:s,children:Y0.map(o=>i.jsx("option",{value:o.code,children:o.label},o.code))}),i.jsx("style",{children:`
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
      `})]})}function Q0({onSubmit:e,onClose:t}){const{t:n}=Ge(),[r,s]=y.useState(""),[a,o]=y.useState(""),[u,c]=y.useState(""),f=m=>{m.preventDefault();const b=r.trim().toLowerCase().replace(/\s+/g,"-");b&&(e(b,a.trim(),u.trim()),t())};return i.jsxs("div",{className:"modal-overlay",onClick:t,children:[i.jsxs("form",{className:"modal-content",onClick:m=>m.stopPropagation(),onSubmit:f,children:[i.jsx("h3",{children:n("channel.create")}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.name")}),i.jsx("input",{type:"text",value:r,onChange:m=>s(m.target.value),placeholder:"general",autoFocus:!0,maxLength:32})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.topic")}),i.jsx("input",{type:"text",value:a,onChange:m=>o(m.target.value),placeholder:n("channel.topic"),maxLength:128})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.password")}),i.jsx("input",{type:"password",value:u,onChange:m=>c(m.target.value),placeholder:n("channel.passwordPlaceholder"),maxLength:64})]}),i.jsxs("div",{className:"modal-actions",children:[i.jsx("button",{type:"button",className:"modal-btn-cancel",onClick:t,children:n("channel.cancel")}),i.jsx("button",{type:"submit",className:"modal-btn-submit",disabled:!r.trim(),children:n("channel.submit")})]})]}),i.jsx("style",{children:`
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
      `})]})}function q0(e,t){if(!t||t.length<2)return[e];const n=[],r=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");let s=0,a,o=0;for(;(a=r.exec(e))!==null;)a.index>s&&n.push(e.slice(s,a.index)),n.push(i.jsx("mark",{className:"search-highlight",children:a[1]},o++)),s=a.index+a[0].length;return s<e.length&&n.push(e.slice(s)),n}function X0({onSearch:e,onClose:t,results:n,activeChannel:r}){const{t:s,i18n:a}=Ge(),[o,u]=y.useState(""),[c,f]=y.useState(!1),m=y.useRef(null),b=y.useRef(0);y.useEffect(()=>{var N;(N=m.current)==null||N.focus()},[]);const x=N=>{u(N),clearTimeout(b.current),N.length>=2&&(b.current=window.setTimeout(()=>{e(N,c?void 0:r)},300))},C=N=>{N.key==="Escape"&&t()},w=N=>new Intl.DateTimeFormat(a.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(N));return i.jsxs("div",{className:"search-panel",children:[i.jsxs("div",{className:"search-header",children:[i.jsx(Tl,{size:16}),i.jsx("input",{ref:m,type:"text",className:"search-input",value:o,onChange:N=>x(N.target.value),onKeyDown:C,placeholder:s("search.placeholder")}),n.length>0&&i.jsx("span",{className:"search-count",children:n.length}),i.jsxs("label",{className:"search-scope",children:[i.jsx("input",{type:"checkbox",checked:c,onChange:N=>f(N.target.checked)}),i.jsx("span",{children:s("search.allChannels")})]}),i.jsx("button",{className:"search-close",onClick:t,children:i.jsx(Ot,{size:16})})]}),n.length>0&&i.jsx("ul",{className:"search-results",children:n.map(N=>i.jsxs("li",{className:"search-result-item",children:[i.jsxs("div",{className:"search-result-meta",children:[i.jsx("span",{className:"search-result-nick",children:N.nickname}),i.jsxs("span",{className:"search-result-channel",children:["#",N.channel]}),i.jsx("span",{className:"search-result-time",children:w(N.timestamp)})]}),i.jsx("div",{className:"search-result-content",children:q0(N.content,o)})]},N.id))}),o.length>=2&&n.length===0&&i.jsxs("div",{className:"search-empty",children:[i.jsx(Tl,{size:20,className:"search-empty-icon"}),i.jsx("span",{children:s("search.noResults")})]}),i.jsx("style",{children:`
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
      `})]})}function G0({status:e,reconnectIn:t}){const{t:n}=Ge();return e==="connected"?null:i.jsxs("div",{className:`connection-status ${e}`,children:[i.jsxs("div",{className:"connection-status-content",children:[e==="reconnecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot danger"}),i.jsx(l0,{size:13}),i.jsx("span",{children:n("connection.reconnecting",{seconds:t})})]}),e==="connecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(ha,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.connecting")})]}),e==="authenticating"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(ha,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.authenticating")})]})]}),e==="reconnecting"&&i.jsx("div",{className:"connection-progress",children:i.jsx("div",{className:"connection-progress-bar"})}),i.jsx("style",{children:`
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
      `})]})}const ah="hotline_notif_prefs";function Z0(){try{const e=localStorage.getItem(ah);if(e)return JSON.parse(e)}catch{}return{soundEnabled:!0,desktopEnabled:!0}}function e1(e){localStorage.setItem(ah,JSON.stringify(e))}function t1({prefs:e,onChange:t}){const{t:n}=Ge(),r=s=>{const a={...e,[s]:!e[s]};t(a),e1(a)};return i.jsxs("div",{className:"notif-settings",children:[i.jsx("button",{className:`notif-toggle ${e.soundEnabled?"active":"muted"}`,onClick:()=>r("soundEnabled"),title:e.soundEnabled?n("notif.muteSound"):n("notif.unmuteSound"),children:e.soundEnabled?i.jsx(i0,{size:15}):i.jsx(o0,{size:15})}),i.jsx("button",{className:`notif-toggle ${e.desktopEnabled?"active":"muted"}`,onClick:()=>r("desktopEnabled"),title:e.desktopEnabled?n("notif.muteDesktop"):n("notif.unmuteDesktop"),children:e.desktopEnabled?i.jsx(Il,{size:15}):i.jsx(fs,{size:15})}),i.jsx("style",{children:`
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
      `})]})}function n1({messages:e,onRequestPins:t,onUnpin:n,onClose:r,activeChannel:s,canModerate:a}){const{t:o,i18n:u}=Ge();y.useEffect(()=>{t(s)},[s,t]);const c=f=>new Intl.DateTimeFormat(u.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(f));return i.jsxs("div",{className:"pinned-panel",children:[i.jsxs("div",{className:"pinned-header",children:[i.jsx(bs,{size:14}),i.jsx("span",{children:o("pins.title")}),i.jsx("span",{className:"pinned-count",children:e.length}),i.jsx("button",{className:"pinned-close",onClick:r,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"pinned-list",children:[e.length===0&&i.jsxs("div",{className:"pinned-empty",children:[i.jsx(bs,{size:20,className:"pinned-empty-icon"}),i.jsx("span",{children:o("pins.empty")})]}),e.map(f=>i.jsxs("div",{className:"pinned-item",children:[i.jsxs("div",{className:"pinned-item-header",children:[i.jsx("span",{className:"pinned-nick",children:f.nickname}),i.jsx("span",{className:"pinned-time",children:c(f.timestamp)}),a&&n&&i.jsx("button",{className:"pinned-unpin",onClick:()=>n(f.id,s),title:o("pins.unpin"),children:i.jsx(Sr,{size:12})})]}),i.jsx("div",{className:"pinned-content",children:f.content})]},f.id))]}),i.jsx("style",{children:`
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
      `})]})}const ih="hotline_bookmarks";function to(){try{const e=localStorage.getItem(ih);return e?JSON.parse(e):[]}catch{return[]}}function oh(e){localStorage.setItem(ih,JSON.stringify(e))}function r1(e){const t=to();if(t.some(r=>r.id===e.id))return t;const n=[e,...t];return oh(n),n}function td(e){const t=to().filter(n=>n.id!==e);return oh(t),t}function Lo(e){return to().some(t=>t.id===e)}function s1({bookmarks:e,onRemove:t,onClose:n}){const{t:r,i18n:s}=Ge(),a=o=>new Intl.DateTimeFormat(s.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(o));return i.jsxs("div",{className:"bookmarks-panel",children:[i.jsxs("div",{className:"bookmarks-header",children:[i.jsx(pa,{size:14}),i.jsx("span",{children:r("bookmarks.title")}),i.jsx("span",{className:"bookmarks-count",children:e.length}),i.jsx("button",{className:"bookmarks-close",onClick:n,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"bookmarks-list",children:[e.length===0&&i.jsxs("div",{className:"bookmarks-empty",children:[i.jsx(pa,{size:20,className:"bookmarks-empty-icon"}),i.jsx("span",{children:r("bookmarks.empty")})]}),e.map(o=>i.jsxs("div",{className:"bookmark-item",children:[i.jsxs("div",{className:"bookmark-item-header",children:[i.jsx("span",{className:"bookmark-nick",children:o.nickname}),i.jsxs("span",{className:"bookmark-channel",children:["#",o.channel]}),i.jsx("span",{className:"bookmark-time",children:a(o.timestamp)}),i.jsx("button",{className:"bookmark-remove",onClick:()=>t(o.id),title:r("bookmarks.remove"),children:i.jsx(Sr,{size:12})})]}),i.jsx("div",{className:"bookmark-content",children:o.content})]},o.id))]}),i.jsx("style",{children:`
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
      `})]})}function a1({channel:e,onSetTopic:t,onClose:n,canEdit:r}){const{t:s}=Ge(),[a,o]=y.useState(e.topic),u=()=>{a!==e.topic&&t(e.name,a.trim()),n()};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:"chsettings-modal",onClick:c=>c.stopPropagation(),children:[i.jsxs("div",{className:"chsettings-header",children:[i.jsx("div",{className:"chsettings-icon",children:e.hasPassword?i.jsx(zi,{size:18}):i.jsx(ja,{size:18})}),i.jsxs("div",{children:[i.jsx("h3",{children:e.name}),i.jsx("span",{className:"chsettings-subtitle",children:s("channelSettings.title")})]})]}),i.jsxs("div",{className:"chsettings-info",children:[i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(_c,{size:14}),i.jsxs("span",{children:[e.userCount," ",s("channelSettings.members")]})]}),e.hasPassword&&i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(zi,{size:14}),i.jsx("span",{children:s("channelSettings.passwordProtected")})]})]}),i.jsxs("div",{className:"chsettings-field",children:[i.jsx("label",{children:s("channel.topic")}),r?i.jsx("textarea",{value:a,onChange:c=>o(c.target.value),placeholder:s("channelSettings.topicPlaceholder"),maxLength:256,rows:3}):i.jsx("div",{className:"chsettings-topic-display",children:e.topic||i.jsx("em",{className:"text-muted",children:s("channelSettings.noTopic")})})]}),i.jsxs("div",{className:"chsettings-actions",children:[i.jsx("button",{className:"modal-btn-cancel",onClick:n,children:s(r?"channel.cancel":"channelSettings.close")}),r&&i.jsx("button",{className:"modal-btn-submit",onClick:u,disabled:a===e.topic,children:s("channelSettings.save")})]})]}),i.jsx("style",{children:`
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
      `})]})}function i1({onDrop:e,enabled:t}){const{t:n}=Ge(),[r,s]=y.useState(!1),a=y.useRef(0),o=y.useCallback(m=>{var b;m.preventDefault(),t&&(a.current++,(b=m.dataTransfer)!=null&&b.types.includes("Files")&&s(!0))},[t]),u=y.useCallback(m=>{m.preventDefault(),a.current--,a.current===0&&s(!1)},[]),c=y.useCallback(m=>{m.preventDefault()},[]),f=y.useCallback(m=>{var x;if(m.preventDefault(),a.current=0,s(!1),!t)return;const b=(x=m.dataTransfer)==null?void 0:x.files[0];b&&e(b)},[t,e]);return y.useEffect(()=>(document.addEventListener("dragenter",o),document.addEventListener("dragleave",u),document.addEventListener("dragover",c),document.addEventListener("drop",f),()=>{document.removeEventListener("dragenter",o),document.removeEventListener("dragleave",u),document.removeEventListener("dragover",c),document.removeEventListener("drop",f)}),[o,u,c,f]),r?i.jsxs("div",{className:"drag-drop-overlay",children:[i.jsxs("div",{className:"drag-drop-zone",children:[i.jsx(ma,{size:40,className:"drag-drop-icon"}),i.jsx("span",{className:"drag-drop-text",children:n("files.dropHere")}),i.jsx("span",{className:"drag-drop-hint",children:"Images, documents, archives"})]}),i.jsx("style",{children:`
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
      `})]}):null}const o1=[{keys:"Ctrl + K",action:"shortcuts.search"},{keys:"Ctrl + B",action:"shortcuts.bold"},{keys:"Ctrl + I",action:"shortcuts.italic"},{keys:"Escape",action:"shortcuts.close"},{keys:"Enter",action:"shortcuts.send"},{keys:"Shift + Enter",action:"shortcuts.newline"},{keys:"@ + name",action:"shortcuts.mention"},{keys:"?",action:"shortcuts.showHelp"}];function l1({onClose:e}){const{t}=Ge();return i.jsxs("div",{className:"modal-overlay",onClick:e,children:[i.jsxs("div",{className:"shortcuts-modal",onClick:n=>n.stopPropagation(),children:[i.jsxs("div",{className:"shortcuts-header",children:[i.jsx(Ax,{size:18}),i.jsx("h3",{children:t("shortcuts.title")}),i.jsx("button",{className:"shortcuts-close",onClick:e,children:i.jsx(Ot,{size:16})})]}),i.jsx("div",{className:"shortcuts-list",children:o1.map(n=>i.jsxs("div",{className:"shortcut-row",children:[i.jsx("span",{className:"shortcut-action",children:t(n.action)}),i.jsx("span",{className:"shortcut-key-group",children:n.keys.split(" + ").map((r,s)=>i.jsxs("span",{children:[s>0&&i.jsx("span",{className:"shortcut-plus",children:"+"}),i.jsx("kbd",{className:"shortcut-key",children:r})]},s))})]},n.keys))})]}),i.jsx("style",{children:`
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
      `})]})}function c1({serverName:e,motd:t,onUpdateSettings:n,onRequestBanList:r,onUnban:s,onClose:a}){const{t:o}=Ge(),[u,c]=y.useState("settings"),[f,m]=y.useState(e),[b,x]=y.useState(t),[C,w]=y.useState(!1);y.useEffect(()=>{r()},[]);const N=()=>{n(f.trim(),b.trim()),w(!0),setTimeout(()=>w(!1),2e3)};return i.jsxs("div",{className:"modal-overlay",onClick:a,children:[i.jsxs("div",{className:"admin-panel",onClick:L=>L.stopPropagation(),children:[i.jsxs("div",{className:"admin-header",children:[i.jsx(Jp,{size:18}),i.jsx("h3",{children:o("admin.title")}),i.jsx("button",{className:"admin-close",onClick:a,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"admin-tabs",children:[i.jsxs("button",{className:`admin-tab ${u==="settings"?"active":""}`,onClick:()=>c("settings"),children:[i.jsx(Yp,{size:14}),o("admin.settings")]}),i.jsxs("button",{className:`admin-tab ${u==="bans"?"active":""}`,onClick:()=>c("bans"),children:[i.jsx(s0,{size:14}),o("admin.bans")]})]}),u==="settings"&&i.jsxs("div",{className:"admin-content",children:[i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.serverName")}),i.jsx("input",{type:"text",value:f,onChange:L=>m(L.target.value),maxLength:64})]}),i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.motd")}),i.jsx("textarea",{value:b,onChange:L=>x(L.target.value),rows:4,maxLength:512})]}),i.jsxs("button",{className:`admin-save ${C?"saved":""}`,onClick:N,children:[C?i.jsx(Lc,{size:14}):i.jsx(Wp,{size:14}),o(C?"admin.saved":"admin.save")]})]}),u==="bans"&&i.jsxs("div",{className:"admin-content",children:[i.jsx("p",{className:"admin-ban-info",children:o("admin.banInfo")}),i.jsx("div",{className:"admin-ban-empty",children:o("admin.noBans")})]})]}),i.jsx("style",{children:`
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
      `})]})}function u1({channelName:e,onSubmit:t,onCancel:n}){const{t:r}=Ge(),[s,a]=y.useState(""),[o,u]=y.useState(!1),c=()=>{if(!s.trim()){u(!0),setTimeout(()=>u(!1),500);return}t(s)};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:`channel-pw-modal ${o?"shake":""}`,onClick:f=>f.stopPropagation(),children:[i.jsx("div",{className:"channel-pw-icon",children:i.jsx(zi,{size:24})}),i.jsx("h3",{className:"channel-pw-title",children:r("channel.passwordRequired")}),i.jsx("p",{className:"channel-pw-desc",children:r("channel.passwordDesc",{channel:e})}),i.jsxs("div",{className:"channel-pw-input-row",children:[i.jsx("input",{type:"password",className:"channel-pw-input",value:s,onChange:f=>a(f.target.value),onKeyDown:f=>{f.key==="Enter"&&c(),f.key==="Escape"&&n()},placeholder:r("channel.passwordPlaceholderJoin"),autoFocus:!0}),i.jsx("button",{className:"channel-pw-submit",onClick:c,disabled:!s.trim(),children:i.jsx(Nx,{size:16})})]}),i.jsx("button",{className:"channel-pw-cancel",onClick:n,children:r("channel.cancel")})]}),i.jsx("style",{children:`
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
      `})]})}function d1({src:e,onClose:t}){const[n,r]=y.useState(1),[s,a]=y.useState(0),[o,u]=y.useState(!1),c=y.useCallback(m=>{m.key==="Escape"&&t(),(m.key==="+"||m.key==="=")&&r(b=>Math.min(b+.25,4)),m.key==="-"&&r(b=>Math.max(b-.25,.5)),m.key==="r"&&a(b=>b+90)},[t]);y.useEffect(()=>(document.addEventListener("keydown",c),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",c),document.body.style.overflow=""}),[c]);const f=m=>{m.preventDefault();const b=m.deltaY>0?-.1:.1;r(x=>Math.max(.5,Math.min(4,x+b)))};return i.jsxs("div",{className:"lightbox-overlay",onClick:t,children:[i.jsxs("div",{className:"lightbox-toolbar",onClick:m=>m.stopPropagation(),children:[i.jsx("button",{onClick:()=>r(m=>Math.min(m+.25,4)),title:"Zoom in",children:i.jsx(u0,{size:16})}),i.jsx("button",{onClick:()=>r(m=>Math.max(m-.25,.5)),title:"Zoom out",children:i.jsx(d0,{size:16})}),i.jsx("button",{onClick:()=>a(m=>m+90),title:"Rotate",children:i.jsx(Gx,{size:16})}),i.jsx("button",{onClick:()=>{r(1),a(0)},title:"Reset",children:i.jsx(Bx,{size:16})}),i.jsxs("span",{className:"lightbox-scale",children:[Math.round(n*100),"%"]}),i.jsx("a",{href:e,download:!0,className:"lightbox-download",title:"Download",onClick:m=>m.stopPropagation(),children:i.jsx(Up,{size:16})}),i.jsx("button",{className:"lightbox-close-btn",onClick:t,title:"Close (Esc)",children:i.jsx(Ot,{size:18})})]}),i.jsxs("div",{className:"lightbox-content",onClick:m=>m.stopPropagation(),onWheel:f,children:[!o&&i.jsx("div",{className:"lightbox-loading",children:i.jsx("div",{className:"lightbox-spinner"})}),i.jsx("img",{src:e,alt:"",className:`lightbox-img ${o?"loaded":""}`,style:{transform:`scale(${n}) rotate(${s}deg)`},onLoad:()=>u(!0),onDoubleClick:()=>{r(1),a(0)},draggable:!1})]}),i.jsx("style",{children:`
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
      `})]})}function f1({rootMessage:e,replies:t,currentUserId:n,currentRole:r,onClose:s,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m,onImageClick:b}){const{t:x}=Ge(),C=r==="admin"||r==="operator";return i.jsxs("div",{className:"thread-panel",children:[i.jsxs("div",{className:"thread-panel-header",children:[i.jsx(Rc,{size:15}),i.jsx("span",{className:"thread-panel-title",children:x("thread.title")}),i.jsxs("span",{className:"thread-panel-count",children:[t.length," ",t.length===1?x("thread.reply"):x("thread.replies")]}),i.jsx("button",{className:"thread-panel-close",onClick:s,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"thread-panel-messages",children:[i.jsx("div",{className:"thread-root",children:i.jsx(Ol,{id:e.id,userId:e.userId,nickname:e.nickname,content:e.content,role:e.role,timestamp:e.timestamp,isOwn:e.userId===n,edited:e.edited,reactions:e.reactions,currentUserId:n,canModerate:C,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m==null?void 0:m(e.id),onImageClick:b})}),t.length>0&&i.jsx("div",{className:"thread-separator",children:i.jsxs("span",{children:[t.length," ",t.length===1?x("thread.reply"):x("thread.replies")]})}),t.map((w,N)=>{const L=N>0?t[N-1]:void 0,k=L!==void 0&&L.userId===w.userId&&w.timestamp-L.timestamp<12e4;return i.jsx(Ol,{id:w.id,userId:w.userId,nickname:w.nickname,content:w.content,role:w.role,timestamp:w.timestamp,isOwn:w.userId===n,edited:w.edited,reactions:w.reactions,currentUserId:n,canModerate:C,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m==null?void 0:m(w.id),isGrouped:k,onImageClick:b},w.id)})]}),i.jsx("style",{children:`
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
      `})]})}const ri=[{key:"--accent",label:"Accent",default:"#6366f1"},{key:"--bg-primary",label:"Background",default:"#0f0f12"},{key:"--bg-secondary",label:"Surface",default:"#1a1a22"},{key:"--bg-tertiary",label:"Tertiary",default:"#24242e"},{key:"--text-primary",label:"Text",default:"#f0f0f5"},{key:"--text-muted",label:"Muted",default:"#6b6b80"},{key:"--border",label:"Border",default:"#2a2a35"},{key:"--danger",label:"Danger",default:"#ef4444"}],lh="hotline-custom-themes",Pi="hotline-active-theme";function ch(){try{return JSON.parse(localStorage.getItem(lh)||"[]")}catch{return[]}}function nd(e){localStorage.setItem(lh,JSON.stringify(e))}function Rl(e){const t=document.documentElement;for(const[n,r]of Object.entries(e))if(t.style.setProperty(n,r),n==="--accent"){const s=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),o=parseInt(r.slice(5,7),16);t.style.setProperty("--accent-rgb",`${s}, ${a}, ${o}`)}}function p1(){const e=document.documentElement;for(const t of ri)e.style.removeProperty(t.key);e.style.removeProperty("--accent-rgb"),localStorage.removeItem(Pi)}function h1({onClose:e}){const{t}=Ge(),[n,r]=y.useState(ch),[s,a]=y.useState(()=>{const N={};for(const L of ri){const k=getComputedStyle(document.documentElement).getPropertyValue(L.key).trim();N[L.key]=k||L.default}return N}),[o,u]=y.useState(""),[c,f]=y.useState(!1);y.useEffect(()=>{Rl(s)},[s]);const m=(N,L)=>{a(k=>({...k,[N]:L}))},b=()=>{if(!o.trim())return;const N={id:Date.now().toString(36),name:o.trim(),colors:{...s}},L=[...n,N];r(L),nd(L),localStorage.setItem(Pi,N.id),f(!0),setTimeout(()=>f(!1),2e3)},x=N=>{a(N.colors),u(N.name),Rl(N.colors),localStorage.setItem(Pi,N.id)},C=N=>{const L=n.filter(k=>k.id!==N);r(L),nd(L)},w=()=>{p1();const N={};for(const L of ri)N[L.key]=L.default;a(N)};return i.jsx("div",{className:"modal-overlay",onClick:e,children:i.jsxs("div",{className:"theme-editor",onClick:N=>N.stopPropagation(),children:[i.jsxs("div",{className:"theme-editor-header",children:[i.jsx(Hp,{size:18}),i.jsx("h3",{children:t("theme.title")}),i.jsx("button",{className:"theme-editor-close",onClick:e,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"theme-editor-body",children:[i.jsx("div",{className:"theme-colors",children:ri.map(N=>i.jsxs("div",{className:"theme-color-row",children:[i.jsx("label",{className:"theme-color-label",children:N.label}),i.jsxs("div",{className:"theme-color-input-wrap",children:[i.jsx("input",{type:"color",value:s[N.key]||N.default,onChange:L=>m(N.key,L.target.value),className:"theme-color-picker"}),i.jsx("input",{type:"text",value:s[N.key]||N.default,onChange:L=>m(N.key,L.target.value),className:"theme-color-hex",maxLength:7})]})]},N.key))}),i.jsxs("div",{className:"theme-save-row",children:[i.jsx("input",{type:"text",placeholder:t("theme.namePlaceholder"),value:o,onChange:N=>u(N.target.value),className:"theme-name-input"}),i.jsxs("button",{className:`theme-save-btn ${c?"saved":""}`,onClick:b,disabled:!o.trim(),children:[c?i.jsx(Lc,{size:14}):i.jsx(Wp,{size:14}),i.jsx("span",{children:t(c?"theme.saved":"theme.save")})]}),i.jsx("button",{className:"theme-reset-btn",onClick:w,title:t("theme.reset"),children:i.jsx(Xx,{size:14})})]}),n.length>0&&i.jsxs("div",{className:"theme-list",children:[i.jsx("span",{className:"theme-list-label",children:t("theme.saved_themes")}),n.map(N=>i.jsxs("div",{className:"theme-list-item",children:[i.jsx("div",{className:"theme-list-swatches",children:Object.values(N.colors).slice(0,4).map((L,k)=>i.jsx("span",{className:"theme-swatch",style:{background:L}},k))}),i.jsx("span",{className:"theme-list-name",onClick:()=>x(N),children:N.name}),i.jsx("button",{className:"theme-list-delete",onClick:()=>C(N.id),children:i.jsx(Ot,{size:12})})]},N.id))]})]}),i.jsx("style",{children:`
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
        `})]})})}function m1(){const e=localStorage.getItem(Pi);if(!e)return;const n=ch().find(r=>r.id===e);n&&Rl(n.colors)}function g1({messages:e,userCount:t,channelCount:n,serverName:r,onClose:s}){const{t:a}=Ge(),o=y.useMemo(()=>{const c=Date.now(),f=e.filter(L=>c-L.timestamp<36e5).length,m=e.filter(L=>c-L.timestamp<864e5).length,b={};for(const L of e)b[L.userId]||(b[L.userId]={nickname:L.nickname,count:0}),b[L.userId].count++;const x=Object.values(b).sort((L,k)=>k.count-L.count).slice(0,5),C={};for(const L of e)C[L.channel]=(C[L.channel]||0)+1;const w=Object.entries(C).sort(([,L],[,k])=>k-L).slice(0,5),N=new Array(24).fill(0);for(const L of e)if(c-L.timestamp<864e5){const k=new Date(L.timestamp).getHours();N[k]++}return{total:e.length,lastHour:f,last24h:m,topUsers:x,topChannels:w,hourly:N}},[e]),u=Math.max(...o.hourly,1);return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"stats-panel",onClick:c=>c.stopPropagation(),children:[i.jsxs("div",{className:"stats-header",children:[i.jsx(qp,{size:18}),i.jsxs("h3",{children:[r," — ",a("stats.title")]}),i.jsx("button",{className:"stats-close",onClick:s,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"stats-body",children:[i.jsxs("div",{className:"stats-cards",children:[i.jsxs("div",{className:"stats-card",children:[i.jsx(Vx,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.total}),i.jsx("span",{className:"stats-card-label",children:a("stats.totalMessages")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(_c,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:t}),i.jsx("span",{className:"stats-card-label",children:a("stats.onlineUsers")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(ja,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:n}),i.jsx("span",{className:"stats-card-label",children:a("stats.channels")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(Tc,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.lastHour}),i.jsx("span",{className:"stats-card-label",children:a("stats.lastHour")})]})]})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.activity24h")}),i.jsx("div",{className:"stats-chart",children:o.hourly.map((c,f)=>i.jsx("div",{className:"stats-bar-wrap",title:`${f}:00 — ${c} msgs`,children:i.jsx("div",{className:"stats-bar",style:{height:`${c/u*100}%`}})},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topContributors")}),i.jsx("ul",{className:"stats-ranking",children:o.topUsers.map((c,f)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",f+1]}),i.jsx("span",{className:"stats-rank-name",children:c.nickname}),i.jsx("span",{className:"stats-rank-count",children:c.count})]},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topChannels")}),i.jsx("ul",{className:"stats-ranking",children:o.topChannels.map(([c,f],m)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",m+1]}),i.jsxs("span",{className:"stats-rank-name",children:["#",c]}),i.jsx("span",{className:"stats-rank-count",children:f})]},m))})]})]}),i.jsx("style",{children:`
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
        `})]})})}function x1({messageContent:e,messageAuthor:t,channels:n,currentChannel:r,onForward:s,onClose:a}){const{t:o}=Ge(),[u,c]=y.useState(""),[f,m]=y.useState(""),b=n.filter(C=>C.name!==r),x=()=>{u&&(s(u,f.trim()||void 0),a())};return i.jsx("div",{className:"modal-overlay",onClick:a,children:i.jsxs("div",{className:"forward-dialog",onClick:C=>C.stopPropagation(),children:[i.jsxs("div",{className:"forward-header",children:[i.jsx(Fp,{size:16}),i.jsx("h3",{children:o("forward.title")}),i.jsx("button",{className:"forward-close",onClick:a,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"forward-body",children:[i.jsxs("div",{className:"forward-preview",children:[i.jsx("span",{className:"forward-preview-author",children:t}),i.jsx("span",{className:"forward-preview-content",children:e.length>120?e.slice(0,120)+"...":e})]}),i.jsxs("div",{className:"forward-target",children:[i.jsx("label",{className:"forward-label",children:o("forward.sendTo")}),i.jsx("div",{className:"forward-channel-list",children:b.map(C=>i.jsxs("button",{className:`forward-channel-btn ${u===C.name?"selected":""}`,onClick:()=>c(C.name),children:[i.jsx(ja,{size:12}),i.jsx("span",{children:C.name})]},C.name))})]}),i.jsx("div",{className:"forward-comment",children:i.jsx("input",{type:"text",placeholder:o("forward.commentPlaceholder"),value:f,onChange:C=>m(C.target.value),className:"forward-comment-input",onKeyDown:C=>{C.key==="Enter"&&x()}})})]}),i.jsxs("div",{className:"forward-footer",children:[i.jsx("button",{className:"forward-cancel",onClick:a,children:o("forward.cancel")}),i.jsxs("button",{className:"forward-submit",onClick:x,disabled:!u,children:[i.jsx(Gi,{size:13}),i.jsx("span",{children:o("forward.send")})]})]}),i.jsx("style",{children:`
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
        `})]})})}const uh="hotline-custom-emojis";function v1(){try{return JSON.parse(localStorage.getItem(uh)||"[]")}catch{return[]}}function rd(e){localStorage.setItem(uh,JSON.stringify(e))}function y1({emojis:e,onUpload:t,onDelete:n,onClose:r}){const{t:s}=Ge(),[a,o]=y.useState(""),[u,c]=y.useState(null),[f,m]=y.useState(null),b=y.useRef(null),x=w=>{var k;const N=(k=w.target.files)==null?void 0:k[0];if(!N||!N.type.startsWith("image/")||N.size>256*1024)return;m(N);const L=URL.createObjectURL(N);c(L)},C=()=>{!f||!a.trim()||(t(a.trim().toLowerCase().replace(/\s+/g,"_"),f),o(""),c(null),m(null))};return i.jsx("div",{className:"modal-overlay",onClick:r,children:i.jsxs("div",{className:"custom-emoji-panel",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"custom-emoji-header",children:[i.jsx(ma,{size:16}),i.jsx("h3",{children:s("customEmoji.title")}),i.jsx("button",{className:"custom-emoji-close",onClick:r,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"custom-emoji-body",children:[i.jsxs("div",{className:"custom-emoji-upload-area",children:[i.jsx("div",{className:"custom-emoji-preview-zone",onClick:()=>{var w;return(w=b.current)==null?void 0:w.click()},children:u?i.jsx("img",{src:u,alt:"preview",className:"custom-emoji-preview-img"}):i.jsxs(i.Fragment,{children:[i.jsx(Kp,{size:20}),i.jsx("span",{children:s("customEmoji.selectImage")})]})}),i.jsx("input",{ref:b,type:"file",accept:"image/png,image/gif,image/webp",onChange:x,style:{display:"none"}}),i.jsxs("div",{className:"custom-emoji-upload-form",children:[i.jsx("input",{type:"text",value:a,onChange:w=>o(w.target.value),placeholder:s("customEmoji.namePlaceholder"),className:"custom-emoji-name-input",maxLength:20}),i.jsxs("button",{className:"custom-emoji-upload-btn",onClick:C,disabled:!f||!a.trim(),children:[i.jsx(ma,{size:12}),i.jsx("span",{children:s("customEmoji.upload")})]})]}),i.jsx("span",{className:"custom-emoji-hint",children:s("customEmoji.hint")})]}),e.length>0&&i.jsxs("div",{className:"custom-emoji-list",children:[i.jsx("span",{className:"custom-emoji-list-label",children:s("customEmoji.existing")}),i.jsx("div",{className:"custom-emoji-grid",children:e.map(w=>i.jsxs("div",{className:"custom-emoji-item",children:[i.jsx("img",{src:w.url,alt:w.name,className:"custom-emoji-img"}),i.jsxs("span",{className:"custom-emoji-item-name",children:[":",w.name,":"]}),i.jsx("button",{className:"custom-emoji-delete",onClick:()=>n(w.id),children:i.jsx(Sr,{size:11})})]},w.id))})]})]}),i.jsx("style",{children:`
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
        `})]})})}const dh="hotline-notif-filters";function b1(){try{const e=localStorage.getItem(dh);if(e)return JSON.parse(e)}catch{}return{mutedChannels:[],mutedUsers:[],onlyMentions:!1,quietHoursEnabled:!1,quietStart:"22:00",quietEnd:"08:00",keywords:[]}}function fh(e){localStorage.setItem(dh,JSON.stringify(e))}function w1({filters:e,channels:t,users:n,onChange:r,onClose:s}){const{t:a}=Ge(),[o,u]=y.useState(e),[c,f]=y.useState("");y.useEffect(()=>{r(o),fh(o)},[o,r]);const m=w=>{u(N=>({...N,mutedChannels:N.mutedChannels.includes(w)?N.mutedChannels.filter(L=>L!==w):[...N.mutedChannels,w]}))},b=w=>{u(N=>({...N,mutedUsers:N.mutedUsers.includes(w)?N.mutedUsers.filter(L=>L!==w):[...N.mutedUsers,w]}))},x=()=>{c.trim()&&(u(w=>({...w,keywords:[...w.keywords,c.trim()]})),f(""))},C=w=>{u(N=>({...N,keywords:N.keywords.filter(L=>L!==w)}))};return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"notif-filters",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"notif-filters-header",children:[i.jsx(Ap,{size:16}),i.jsx("h3",{children:a("notifFilters.title")}),i.jsx("button",{className:"notif-filters-close",onClick:s,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"notif-filters-body",children:[i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(Ex,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.onlyMentions")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.onlyMentionsDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.onlyMentions?"on":""}`,onClick:()=>u(w=>({...w,onlyMentions:!w.onlyMentions})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(fs,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.quietHours")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.quietHoursDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.quietHoursEnabled?"on":""}`,onClick:()=>u(w=>({...w,quietHoursEnabled:!w.quietHoursEnabled})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),o.quietHoursEnabled&&i.jsxs("div",{className:"nf-quiet-times",children:[i.jsx("input",{type:"time",value:o.quietStart,onChange:w=>u(N=>({...N,quietStart:w.target.value})),className:"nf-time-input"}),i.jsx("span",{className:"nf-time-sep",children:"→"}),i.jsx("input",{type:"time",value:o.quietEnd,onChange:w=>u(N=>({...N,quietEnd:w.target.value})),className:"nf-time-input"})]}),i.jsxs("div",{className:"nf-section",children:[i.jsx("span",{className:"nf-section-title",children:a("notifFilters.keywords")}),i.jsxs("div",{className:"nf-keyword-row",children:[i.jsx("input",{type:"text",value:c,onChange:w=>f(w.target.value),onKeyDown:w=>{w.key==="Enter"&&x()},placeholder:a("notifFilters.keywordPlaceholder"),className:"nf-keyword-input"}),i.jsx("button",{className:"nf-keyword-add",onClick:x,children:"+"})]}),o.keywords.length>0&&i.jsx("div",{className:"nf-keyword-list",children:o.keywords.map(w=>i.jsxs("span",{className:"nf-keyword-tag",onClick:()=>C(w),children:[w," ",i.jsx(Ot,{size:10})]},w))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(ja,{size:12})," ",a("notifFilters.mutedChannels")]}),i.jsx("div",{className:"nf-chip-list",children:t.map(w=>i.jsxs("button",{className:`nf-chip ${o.mutedChannels.includes(w)?"muted":""}`,onClick:()=>m(w),children:[o.mutedChannels.includes(w)?i.jsx(fs,{size:10}):i.jsx(Il,{size:10}),i.jsx("span",{children:w})]},w))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(Rc,{size:12})," ",a("notifFilters.mutedUsers")]}),i.jsx("div",{className:"nf-chip-list",children:n.slice(0,20).map(w=>i.jsxs("button",{className:`nf-chip ${o.mutedUsers.includes(w.userId)?"muted":""}`,onClick:()=>b(w.userId),children:[o.mutedUsers.includes(w.userId)?i.jsx(fs,{size:10}):i.jsx(Il,{size:10}),i.jsx("span",{children:w.nickname})]},w.userId))})]})]}),i.jsx("style",{children:`
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
        `})]})})}const ph="hotline-scheduled-messages";function k1(){try{return JSON.parse(localStorage.getItem(ph)||"[]")}catch{return[]}}function To(e){localStorage.setItem(ph,JSON.stringify(e))}function j1({activeChannel:e,scheduledMessages:t,onSchedule:n,onDelete:r,onClose:s}){const{t:a}=Ge(),[o,u]=y.useState(""),[c,f]=y.useState("");y.useEffect(()=>{const w=new Date;w.setMinutes(w.getMinutes()+1);const N=w.toISOString().slice(0,16);f(N)},[]);const m=()=>{if(!o.trim()||!c)return;const w=new Date(c).getTime();if(w<=Date.now())return;const N={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),channel:e,content:o.trim(),scheduledTime:w,createdAt:Date.now()};n(N),u("")},b=t.filter(w=>w.channel===e),x=t.filter(w=>w.channel!==e),C=w=>new Date(w).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"scheduler-panel",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"scheduler-header",children:[i.jsx(Tc,{size:16}),i.jsx("h3",{children:a("scheduler.title")}),i.jsx("button",{className:"scheduler-close",onClick:s,children:i.jsx(Ot,{size:16})})]}),i.jsxs("div",{className:"scheduler-body",children:[i.jsxs("div",{className:"scheduler-form",children:[i.jsx("div",{className:"scheduler-form-row",children:i.jsxs("span",{className:"scheduler-channel-tag",children:["#",e]})}),i.jsx("textarea",{className:"scheduler-textarea",value:o,onChange:w=>u(w.target.value),placeholder:a("scheduler.placeholder"),rows:3}),i.jsxs("div",{className:"scheduler-time-row",children:[i.jsx(Px,{size:13}),i.jsx("input",{type:"datetime-local",value:c,onChange:w=>f(w.target.value),className:"scheduler-datetime",min:new Date().toISOString().slice(0,16)}),i.jsxs("button",{className:"scheduler-submit",onClick:m,disabled:!o.trim()||!c,children:[i.jsx(Gi,{size:12}),i.jsx("span",{children:a("scheduler.schedule")})]})]})]}),b.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsxs("span",{className:"scheduler-list-label",children:[a("scheduler.pending")," — #",e]}),b.map(w=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsx("span",{className:"scheduler-item-time",children:C(w.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:w.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(w.id),children:i.jsx(Sr,{size:12})})]},w.id))]}),x.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsx("span",{className:"scheduler-list-label",children:a("scheduler.otherChannels")}),x.map(w=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsxs("span",{className:"scheduler-item-channel",children:["#",w.channel]}),i.jsx("span",{className:"scheduler-item-time",children:C(w.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:w.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(w.id),children:i.jsx(Sr,{size:12})})]},w.id))]})]}),i.jsx("style",{children:`
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
        `})]})})}const hh="hotline-channel-order";function S1(){try{return JSON.parse(localStorage.getItem(hh)||"[]")}catch{return[]}}function N1(e){localStorage.setItem(hh,JSON.stringify(e))}function C1(e,t){if(t.length===0)return e;const n=[],r=[...e];for(const s of t){const a=r.findIndex(o=>o.name===s);a!==-1&&(n.push(r[a]),r.splice(a,1))}return[...n,...r]}function E1({toast:e,onDismiss:t}){const[n,r]=y.useState(!1);y.useEffect(()=>{const a=setTimeout(()=>{r(!0),setTimeout(()=>t(e.id),300)},3e3);return()=>clearTimeout(a)},[e.id,t]);const s=e.type==="join"?i.jsx($x,{size:13}):e.type==="leave"?i.jsx(Bp,{size:13}):null;return i.jsxs("div",{className:`toast-item toast-${e.type} ${n?"exiting":""}`,children:[s&&i.jsx("span",{className:"toast-icon",children:s}),i.jsx("span",{className:"toast-text",children:e.message}),i.jsx("button",{className:"toast-close",onClick:()=>{r(!0),setTimeout(()=>t(e.id),300)},children:i.jsx(Ot,{size:12})})]})}function z1({toasts:e,onDismiss:t}){return e.length===0?null:i.jsxs("div",{className:"toast-container",children:[e.slice(-5).map(n=>i.jsx(E1,{toast:n,onDismiss:t},n.id)),i.jsx("style",{children:`
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
      `})]})}function P1(){const[e,t]=y.useState([]),n=y.useRef(0),r=y.useCallback((a,o)=>{const u=`toast-${++n.current}`;t(c=>[...c,{id:u,type:a,message:o,timestamp:Date.now()}])},[]),s=y.useCallback(a=>{t(o=>o.filter(u=>u.id!==a))},[]);return{toasts:e,addToast:r,dismissToast:s}}function M1(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var mh={exports:{}};const I1={},L1=Object.freeze(Object.defineProperty({__proto__:null,default:I1},Symbol.toStringTag,{value:"Module"})),T1=Ih(L1);(function(e){(function(t){var n=function(d){var h,p=new Float64Array(16);if(d)for(h=0;h<d.length;h++)p[h]=d[h];return p},r=function(){throw new Error("no PRNG")},s=new Uint8Array(16),a=new Uint8Array(32);a[0]=9;var o=n(),u=n([1]),c=n([56129,1]),f=n([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=n([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),b=n([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),x=n([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),C=n([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function w(d,h,p,l){d[h]=p>>24&255,d[h+1]=p>>16&255,d[h+2]=p>>8&255,d[h+3]=p&255,d[h+4]=l>>24&255,d[h+5]=l>>16&255,d[h+6]=l>>8&255,d[h+7]=l&255}function N(d,h,p,l,g){var P,I=0;for(P=0;P<g;P++)I|=d[h+P]^p[l+P];return(1&I-1>>>8)-1}function L(d,h,p,l){return N(d,h,p,l,16)}function k(d,h,p,l){return N(d,h,p,l,32)}function v(d,h,p,l){for(var g=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,I=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,F=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Y=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,ue=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Be=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,we=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,je=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Ie=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,Ee=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Se=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ce=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ne=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,ie=g,fe=P,ne=I,oe=F,ce=Y,Z=ue,T=te,O=Be,H=se,U=we,$=je,V=Ie,ge=Ee,ze=Se,Le=Ce,Pe=Ne,j,De=0;De<20;De+=2)j=ie+ge|0,ce^=j<<7|j>>>25,j=ce+ie|0,H^=j<<9|j>>>23,j=H+ce|0,ge^=j<<13|j>>>19,j=ge+H|0,ie^=j<<18|j>>>14,j=Z+fe|0,U^=j<<7|j>>>25,j=U+Z|0,ze^=j<<9|j>>>23,j=ze+U|0,fe^=j<<13|j>>>19,j=fe+ze|0,Z^=j<<18|j>>>14,j=$+T|0,Le^=j<<7|j>>>25,j=Le+$|0,ne^=j<<9|j>>>23,j=ne+Le|0,T^=j<<13|j>>>19,j=T+ne|0,$^=j<<18|j>>>14,j=Pe+V|0,oe^=j<<7|j>>>25,j=oe+Pe|0,O^=j<<9|j>>>23,j=O+oe|0,V^=j<<13|j>>>19,j=V+O|0,Pe^=j<<18|j>>>14,j=ie+oe|0,fe^=j<<7|j>>>25,j=fe+ie|0,ne^=j<<9|j>>>23,j=ne+fe|0,oe^=j<<13|j>>>19,j=oe+ne|0,ie^=j<<18|j>>>14,j=Z+ce|0,T^=j<<7|j>>>25,j=T+Z|0,O^=j<<9|j>>>23,j=O+T|0,ce^=j<<13|j>>>19,j=ce+O|0,Z^=j<<18|j>>>14,j=$+U|0,V^=j<<7|j>>>25,j=V+$|0,H^=j<<9|j>>>23,j=H+V|0,U^=j<<13|j>>>19,j=U+H|0,$^=j<<18|j>>>14,j=Pe+Le|0,ge^=j<<7|j>>>25,j=ge+Pe|0,ze^=j<<9|j>>>23,j=ze+ge|0,Le^=j<<13|j>>>19,j=Le+ze|0,Pe^=j<<18|j>>>14;ie=ie+g|0,fe=fe+P|0,ne=ne+I|0,oe=oe+F|0,ce=ce+Y|0,Z=Z+ue|0,T=T+te|0,O=O+Be|0,H=H+se|0,U=U+we|0,$=$+je|0,V=V+Ie|0,ge=ge+Ee|0,ze=ze+Se|0,Le=Le+Ce|0,Pe=Pe+Ne|0,d[0]=ie>>>0&255,d[1]=ie>>>8&255,d[2]=ie>>>16&255,d[3]=ie>>>24&255,d[4]=fe>>>0&255,d[5]=fe>>>8&255,d[6]=fe>>>16&255,d[7]=fe>>>24&255,d[8]=ne>>>0&255,d[9]=ne>>>8&255,d[10]=ne>>>16&255,d[11]=ne>>>24&255,d[12]=oe>>>0&255,d[13]=oe>>>8&255,d[14]=oe>>>16&255,d[15]=oe>>>24&255,d[16]=ce>>>0&255,d[17]=ce>>>8&255,d[18]=ce>>>16&255,d[19]=ce>>>24&255,d[20]=Z>>>0&255,d[21]=Z>>>8&255,d[22]=Z>>>16&255,d[23]=Z>>>24&255,d[24]=T>>>0&255,d[25]=T>>>8&255,d[26]=T>>>16&255,d[27]=T>>>24&255,d[28]=O>>>0&255,d[29]=O>>>8&255,d[30]=O>>>16&255,d[31]=O>>>24&255,d[32]=H>>>0&255,d[33]=H>>>8&255,d[34]=H>>>16&255,d[35]=H>>>24&255,d[36]=U>>>0&255,d[37]=U>>>8&255,d[38]=U>>>16&255,d[39]=U>>>24&255,d[40]=$>>>0&255,d[41]=$>>>8&255,d[42]=$>>>16&255,d[43]=$>>>24&255,d[44]=V>>>0&255,d[45]=V>>>8&255,d[46]=V>>>16&255,d[47]=V>>>24&255,d[48]=ge>>>0&255,d[49]=ge>>>8&255,d[50]=ge>>>16&255,d[51]=ge>>>24&255,d[52]=ze>>>0&255,d[53]=ze>>>8&255,d[54]=ze>>>16&255,d[55]=ze>>>24&255,d[56]=Le>>>0&255,d[57]=Le>>>8&255,d[58]=Le>>>16&255,d[59]=Le>>>24&255,d[60]=Pe>>>0&255,d[61]=Pe>>>8&255,d[62]=Pe>>>16&255,d[63]=Pe>>>24&255}function E(d,h,p,l){for(var g=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,I=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,F=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,Y=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,ue=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Be=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,we=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,je=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Ie=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,Ee=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Se=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ce=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ne=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,ie=g,fe=P,ne=I,oe=F,ce=Y,Z=ue,T=te,O=Be,H=se,U=we,$=je,V=Ie,ge=Ee,ze=Se,Le=Ce,Pe=Ne,j,De=0;De<20;De+=2)j=ie+ge|0,ce^=j<<7|j>>>25,j=ce+ie|0,H^=j<<9|j>>>23,j=H+ce|0,ge^=j<<13|j>>>19,j=ge+H|0,ie^=j<<18|j>>>14,j=Z+fe|0,U^=j<<7|j>>>25,j=U+Z|0,ze^=j<<9|j>>>23,j=ze+U|0,fe^=j<<13|j>>>19,j=fe+ze|0,Z^=j<<18|j>>>14,j=$+T|0,Le^=j<<7|j>>>25,j=Le+$|0,ne^=j<<9|j>>>23,j=ne+Le|0,T^=j<<13|j>>>19,j=T+ne|0,$^=j<<18|j>>>14,j=Pe+V|0,oe^=j<<7|j>>>25,j=oe+Pe|0,O^=j<<9|j>>>23,j=O+oe|0,V^=j<<13|j>>>19,j=V+O|0,Pe^=j<<18|j>>>14,j=ie+oe|0,fe^=j<<7|j>>>25,j=fe+ie|0,ne^=j<<9|j>>>23,j=ne+fe|0,oe^=j<<13|j>>>19,j=oe+ne|0,ie^=j<<18|j>>>14,j=Z+ce|0,T^=j<<7|j>>>25,j=T+Z|0,O^=j<<9|j>>>23,j=O+T|0,ce^=j<<13|j>>>19,j=ce+O|0,Z^=j<<18|j>>>14,j=$+U|0,V^=j<<7|j>>>25,j=V+$|0,H^=j<<9|j>>>23,j=H+V|0,U^=j<<13|j>>>19,j=U+H|0,$^=j<<18|j>>>14,j=Pe+Le|0,ge^=j<<7|j>>>25,j=ge+Pe|0,ze^=j<<9|j>>>23,j=ze+ge|0,Le^=j<<13|j>>>19,j=Le+ze|0,Pe^=j<<18|j>>>14;d[0]=ie>>>0&255,d[1]=ie>>>8&255,d[2]=ie>>>16&255,d[3]=ie>>>24&255,d[4]=Z>>>0&255,d[5]=Z>>>8&255,d[6]=Z>>>16&255,d[7]=Z>>>24&255,d[8]=$>>>0&255,d[9]=$>>>8&255,d[10]=$>>>16&255,d[11]=$>>>24&255,d[12]=Pe>>>0&255,d[13]=Pe>>>8&255,d[14]=Pe>>>16&255,d[15]=Pe>>>24&255,d[16]=T>>>0&255,d[17]=T>>>8&255,d[18]=T>>>16&255,d[19]=T>>>24&255,d[20]=O>>>0&255,d[21]=O>>>8&255,d[22]=O>>>16&255,d[23]=O>>>24&255,d[24]=H>>>0&255,d[25]=H>>>8&255,d[26]=H>>>16&255,d[27]=H>>>24&255,d[28]=U>>>0&255,d[29]=U>>>8&255,d[30]=U>>>16&255,d[31]=U>>>24&255}function z(d,h,p,l){v(d,h,p,l)}function M(d,h,p,l){E(d,h,p,l)}var _=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function D(d,h,p,l,g,P,I){var F=new Uint8Array(16),Y=new Uint8Array(64),ue,te;for(te=0;te<16;te++)F[te]=0;for(te=0;te<8;te++)F[te]=P[te];for(;g>=64;){for(z(Y,F,I,_),te=0;te<64;te++)d[h+te]=p[l+te]^Y[te];for(ue=1,te=8;te<16;te++)ue=ue+(F[te]&255)|0,F[te]=ue&255,ue>>>=8;g-=64,h+=64,l+=64}if(g>0)for(z(Y,F,I,_),te=0;te<g;te++)d[h+te]=p[l+te]^Y[te];return 0}function Q(d,h,p,l,g){var P=new Uint8Array(16),I=new Uint8Array(64),F,Y;for(Y=0;Y<16;Y++)P[Y]=0;for(Y=0;Y<8;Y++)P[Y]=l[Y];for(;p>=64;){for(z(I,P,g,_),Y=0;Y<64;Y++)d[h+Y]=I[Y];for(F=1,Y=8;Y<16;Y++)F=F+(P[Y]&255)|0,P[Y]=F&255,F>>>=8;p-=64,h+=64}if(p>0)for(z(I,P,g,_),Y=0;Y<p;Y++)d[h+Y]=I[Y];return 0}function Oe(d,h,p,l,g){var P=new Uint8Array(32);M(P,l,g,_);for(var I=new Uint8Array(8),F=0;F<8;F++)I[F]=l[F+16];return Q(d,h,p,I,P)}function pe(d,h,p,l,g,P,I){var F=new Uint8Array(32);M(F,P,I,_);for(var Y=new Uint8Array(8),ue=0;ue<8;ue++)Y[ue]=P[ue+16];return D(d,h,p,l,g,Y,F)}var Ke=function(d){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var h,p,l,g,P,I,F,Y;h=d[0]&255|(d[1]&255)<<8,this.r[0]=h&8191,p=d[2]&255|(d[3]&255)<<8,this.r[1]=(h>>>13|p<<3)&8191,l=d[4]&255|(d[5]&255)<<8,this.r[2]=(p>>>10|l<<6)&7939,g=d[6]&255|(d[7]&255)<<8,this.r[3]=(l>>>7|g<<9)&8191,P=d[8]&255|(d[9]&255)<<8,this.r[4]=(g>>>4|P<<12)&255,this.r[5]=P>>>1&8190,I=d[10]&255|(d[11]&255)<<8,this.r[6]=(P>>>14|I<<2)&8191,F=d[12]&255|(d[13]&255)<<8,this.r[7]=(I>>>11|F<<5)&8065,Y=d[14]&255|(d[15]&255)<<8,this.r[8]=(F>>>8|Y<<8)&8191,this.r[9]=Y>>>5&127,this.pad[0]=d[16]&255|(d[17]&255)<<8,this.pad[1]=d[18]&255|(d[19]&255)<<8,this.pad[2]=d[20]&255|(d[21]&255)<<8,this.pad[3]=d[22]&255|(d[23]&255)<<8,this.pad[4]=d[24]&255|(d[25]&255)<<8,this.pad[5]=d[26]&255|(d[27]&255)<<8,this.pad[6]=d[28]&255|(d[29]&255)<<8,this.pad[7]=d[30]&255|(d[31]&255)<<8};Ke.prototype.blocks=function(d,h,p){for(var l=this.fin?0:2048,g,P,I,F,Y,ue,te,Be,se,we,je,Ie,Ee,Se,Ce,Ne,ie,fe,ne,oe=this.h[0],ce=this.h[1],Z=this.h[2],T=this.h[3],O=this.h[4],H=this.h[5],U=this.h[6],$=this.h[7],V=this.h[8],ge=this.h[9],ze=this.r[0],Le=this.r[1],Pe=this.r[2],j=this.r[3],De=this.r[4],He=this.r[5],Ve=this.r[6],Re=this.r[7],Ae=this.r[8],Fe=this.r[9];p>=16;)g=d[h+0]&255|(d[h+1]&255)<<8,oe+=g&8191,P=d[h+2]&255|(d[h+3]&255)<<8,ce+=(g>>>13|P<<3)&8191,I=d[h+4]&255|(d[h+5]&255)<<8,Z+=(P>>>10|I<<6)&8191,F=d[h+6]&255|(d[h+7]&255)<<8,T+=(I>>>7|F<<9)&8191,Y=d[h+8]&255|(d[h+9]&255)<<8,O+=(F>>>4|Y<<12)&8191,H+=Y>>>1&8191,ue=d[h+10]&255|(d[h+11]&255)<<8,U+=(Y>>>14|ue<<2)&8191,te=d[h+12]&255|(d[h+13]&255)<<8,$+=(ue>>>11|te<<5)&8191,Be=d[h+14]&255|(d[h+15]&255)<<8,V+=(te>>>8|Be<<8)&8191,ge+=Be>>>5|l,se=0,we=se,we+=oe*ze,we+=ce*(5*Fe),we+=Z*(5*Ae),we+=T*(5*Re),we+=O*(5*Ve),se=we>>>13,we&=8191,we+=H*(5*He),we+=U*(5*De),we+=$*(5*j),we+=V*(5*Pe),we+=ge*(5*Le),se+=we>>>13,we&=8191,je=se,je+=oe*Le,je+=ce*ze,je+=Z*(5*Fe),je+=T*(5*Ae),je+=O*(5*Re),se=je>>>13,je&=8191,je+=H*(5*Ve),je+=U*(5*He),je+=$*(5*De),je+=V*(5*j),je+=ge*(5*Pe),se+=je>>>13,je&=8191,Ie=se,Ie+=oe*Pe,Ie+=ce*Le,Ie+=Z*ze,Ie+=T*(5*Fe),Ie+=O*(5*Ae),se=Ie>>>13,Ie&=8191,Ie+=H*(5*Re),Ie+=U*(5*Ve),Ie+=$*(5*He),Ie+=V*(5*De),Ie+=ge*(5*j),se+=Ie>>>13,Ie&=8191,Ee=se,Ee+=oe*j,Ee+=ce*Pe,Ee+=Z*Le,Ee+=T*ze,Ee+=O*(5*Fe),se=Ee>>>13,Ee&=8191,Ee+=H*(5*Ae),Ee+=U*(5*Re),Ee+=$*(5*Ve),Ee+=V*(5*He),Ee+=ge*(5*De),se+=Ee>>>13,Ee&=8191,Se=se,Se+=oe*De,Se+=ce*j,Se+=Z*Pe,Se+=T*Le,Se+=O*ze,se=Se>>>13,Se&=8191,Se+=H*(5*Fe),Se+=U*(5*Ae),Se+=$*(5*Re),Se+=V*(5*Ve),Se+=ge*(5*He),se+=Se>>>13,Se&=8191,Ce=se,Ce+=oe*He,Ce+=ce*De,Ce+=Z*j,Ce+=T*Pe,Ce+=O*Le,se=Ce>>>13,Ce&=8191,Ce+=H*ze,Ce+=U*(5*Fe),Ce+=$*(5*Ae),Ce+=V*(5*Re),Ce+=ge*(5*Ve),se+=Ce>>>13,Ce&=8191,Ne=se,Ne+=oe*Ve,Ne+=ce*He,Ne+=Z*De,Ne+=T*j,Ne+=O*Pe,se=Ne>>>13,Ne&=8191,Ne+=H*Le,Ne+=U*ze,Ne+=$*(5*Fe),Ne+=V*(5*Ae),Ne+=ge*(5*Re),se+=Ne>>>13,Ne&=8191,ie=se,ie+=oe*Re,ie+=ce*Ve,ie+=Z*He,ie+=T*De,ie+=O*j,se=ie>>>13,ie&=8191,ie+=H*Pe,ie+=U*Le,ie+=$*ze,ie+=V*(5*Fe),ie+=ge*(5*Ae),se+=ie>>>13,ie&=8191,fe=se,fe+=oe*Ae,fe+=ce*Re,fe+=Z*Ve,fe+=T*He,fe+=O*De,se=fe>>>13,fe&=8191,fe+=H*j,fe+=U*Pe,fe+=$*Le,fe+=V*ze,fe+=ge*(5*Fe),se+=fe>>>13,fe&=8191,ne=se,ne+=oe*Fe,ne+=ce*Ae,ne+=Z*Re,ne+=T*Ve,ne+=O*He,se=ne>>>13,ne&=8191,ne+=H*De,ne+=U*j,ne+=$*Pe,ne+=V*Le,ne+=ge*ze,se+=ne>>>13,ne&=8191,se=(se<<2)+se|0,se=se+we|0,we=se&8191,se=se>>>13,je+=se,oe=we,ce=je,Z=Ie,T=Ee,O=Se,H=Ce,U=Ne,$=ie,V=fe,ge=ne,h+=16,p-=16;this.h[0]=oe,this.h[1]=ce,this.h[2]=Z,this.h[3]=T,this.h[4]=O,this.h[5]=H,this.h[6]=U,this.h[7]=$,this.h[8]=V,this.h[9]=ge},Ke.prototype.finish=function(d,h){var p=new Uint16Array(10),l,g,P,I;if(this.leftover){for(I=this.leftover,this.buffer[I++]=1;I<16;I++)this.buffer[I]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(l=this.h[1]>>>13,this.h[1]&=8191,I=2;I<10;I++)this.h[I]+=l,l=this.h[I]>>>13,this.h[I]&=8191;for(this.h[0]+=l*5,l=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=l,l=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=l,p[0]=this.h[0]+5,l=p[0]>>>13,p[0]&=8191,I=1;I<10;I++)p[I]=this.h[I]+l,l=p[I]>>>13,p[I]&=8191;for(p[9]-=8192,g=(l^1)-1,I=0;I<10;I++)p[I]&=g;for(g=~g,I=0;I<10;I++)this.h[I]=this.h[I]&g|p[I];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,P=this.h[0]+this.pad[0],this.h[0]=P&65535,I=1;I<8;I++)P=(this.h[I]+this.pad[I]|0)+(P>>>16)|0,this.h[I]=P&65535;d[h+0]=this.h[0]>>>0&255,d[h+1]=this.h[0]>>>8&255,d[h+2]=this.h[1]>>>0&255,d[h+3]=this.h[1]>>>8&255,d[h+4]=this.h[2]>>>0&255,d[h+5]=this.h[2]>>>8&255,d[h+6]=this.h[3]>>>0&255,d[h+7]=this.h[3]>>>8&255,d[h+8]=this.h[4]>>>0&255,d[h+9]=this.h[4]>>>8&255,d[h+10]=this.h[5]>>>0&255,d[h+11]=this.h[5]>>>8&255,d[h+12]=this.h[6]>>>0&255,d[h+13]=this.h[6]>>>8&255,d[h+14]=this.h[7]>>>0&255,d[h+15]=this.h[7]>>>8&255},Ke.prototype.update=function(d,h,p){var l,g;if(this.leftover){for(g=16-this.leftover,g>p&&(g=p),l=0;l<g;l++)this.buffer[this.leftover+l]=d[h+l];if(p-=g,h+=g,this.leftover+=g,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(p>=16&&(g=p-p%16,this.blocks(d,h,g),h+=g,p-=g),p){for(l=0;l<p;l++)this.buffer[this.leftover+l]=d[h+l];this.leftover+=p}};function pt(d,h,p,l,g,P){var I=new Ke(P);return I.update(p,l,g),I.finish(d,h),0}function wt(d,h,p,l,g,P){var I=new Uint8Array(16);return pt(I,0,p,l,g,P),L(d,h,I,0)}function ht(d,h,p,l,g){var P;if(p<32)return-1;for(pe(d,0,h,0,p,l,g),pt(d,16,d,32,p-32,d),P=0;P<16;P++)d[P]=0;return 0}function ot(d,h,p,l,g){var P,I=new Uint8Array(32);if(p<32||(Oe(I,0,32,l,g),wt(h,16,h,32,p-32,I)!==0))return-1;for(pe(d,0,h,0,p,l,g),P=0;P<32;P++)d[P]=0;return 0}function Xe(d,h){var p;for(p=0;p<16;p++)d[p]=h[p]|0}function xt(d){var h,p,l=1;for(h=0;h<16;h++)p=d[h]+l+65535,l=Math.floor(p/65536),d[h]=p-l*65536;d[0]+=l-1+37*(l-1)}function K(d,h,p){for(var l,g=~(p-1),P=0;P<16;P++)l=g&(d[P]^h[P]),d[P]^=l,h[P]^=l}function re(d,h){var p,l,g,P=n(),I=n();for(p=0;p<16;p++)I[p]=h[p];for(xt(I),xt(I),xt(I),l=0;l<2;l++){for(P[0]=I[0]-65517,p=1;p<15;p++)P[p]=I[p]-65535-(P[p-1]>>16&1),P[p-1]&=65535;P[15]=I[15]-32767-(P[14]>>16&1),g=P[15]>>16&1,P[14]&=65535,K(I,P,1-g)}for(p=0;p<16;p++)d[2*p]=I[p]&255,d[2*p+1]=I[p]>>8}function he(d,h){var p=new Uint8Array(32),l=new Uint8Array(32);return re(p,d),re(l,h),k(p,0,l,0)}function Ue(d){var h=new Uint8Array(32);return re(h,d),h[0]&1}function xe(d,h){var p;for(p=0;p<16;p++)d[p]=h[2*p]+(h[2*p+1]<<8);d[15]&=32767}function Ze(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]+p[l]}function We(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]-p[l]}function ke(d,h,p){var l,g,P=0,I=0,F=0,Y=0,ue=0,te=0,Be=0,se=0,we=0,je=0,Ie=0,Ee=0,Se=0,Ce=0,Ne=0,ie=0,fe=0,ne=0,oe=0,ce=0,Z=0,T=0,O=0,H=0,U=0,$=0,V=0,ge=0,ze=0,Le=0,Pe=0,j=p[0],De=p[1],He=p[2],Ve=p[3],Re=p[4],Ae=p[5],Fe=p[6],mt=p[7],Qe=p[8],lt=p[9],ct=p[10],ut=p[11],kt=p[12],Pt=p[13],Mt=p[14],It=p[15];l=h[0],P+=l*j,I+=l*De,F+=l*He,Y+=l*Ve,ue+=l*Re,te+=l*Ae,Be+=l*Fe,se+=l*mt,we+=l*Qe,je+=l*lt,Ie+=l*ct,Ee+=l*ut,Se+=l*kt,Ce+=l*Pt,Ne+=l*Mt,ie+=l*It,l=h[1],I+=l*j,F+=l*De,Y+=l*He,ue+=l*Ve,te+=l*Re,Be+=l*Ae,se+=l*Fe,we+=l*mt,je+=l*Qe,Ie+=l*lt,Ee+=l*ct,Se+=l*ut,Ce+=l*kt,Ne+=l*Pt,ie+=l*Mt,fe+=l*It,l=h[2],F+=l*j,Y+=l*De,ue+=l*He,te+=l*Ve,Be+=l*Re,se+=l*Ae,we+=l*Fe,je+=l*mt,Ie+=l*Qe,Ee+=l*lt,Se+=l*ct,Ce+=l*ut,Ne+=l*kt,ie+=l*Pt,fe+=l*Mt,ne+=l*It,l=h[3],Y+=l*j,ue+=l*De,te+=l*He,Be+=l*Ve,se+=l*Re,we+=l*Ae,je+=l*Fe,Ie+=l*mt,Ee+=l*Qe,Se+=l*lt,Ce+=l*ct,Ne+=l*ut,ie+=l*kt,fe+=l*Pt,ne+=l*Mt,oe+=l*It,l=h[4],ue+=l*j,te+=l*De,Be+=l*He,se+=l*Ve,we+=l*Re,je+=l*Ae,Ie+=l*Fe,Ee+=l*mt,Se+=l*Qe,Ce+=l*lt,Ne+=l*ct,ie+=l*ut,fe+=l*kt,ne+=l*Pt,oe+=l*Mt,ce+=l*It,l=h[5],te+=l*j,Be+=l*De,se+=l*He,we+=l*Ve,je+=l*Re,Ie+=l*Ae,Ee+=l*Fe,Se+=l*mt,Ce+=l*Qe,Ne+=l*lt,ie+=l*ct,fe+=l*ut,ne+=l*kt,oe+=l*Pt,ce+=l*Mt,Z+=l*It,l=h[6],Be+=l*j,se+=l*De,we+=l*He,je+=l*Ve,Ie+=l*Re,Ee+=l*Ae,Se+=l*Fe,Ce+=l*mt,Ne+=l*Qe,ie+=l*lt,fe+=l*ct,ne+=l*ut,oe+=l*kt,ce+=l*Pt,Z+=l*Mt,T+=l*It,l=h[7],se+=l*j,we+=l*De,je+=l*He,Ie+=l*Ve,Ee+=l*Re,Se+=l*Ae,Ce+=l*Fe,Ne+=l*mt,ie+=l*Qe,fe+=l*lt,ne+=l*ct,oe+=l*ut,ce+=l*kt,Z+=l*Pt,T+=l*Mt,O+=l*It,l=h[8],we+=l*j,je+=l*De,Ie+=l*He,Ee+=l*Ve,Se+=l*Re,Ce+=l*Ae,Ne+=l*Fe,ie+=l*mt,fe+=l*Qe,ne+=l*lt,oe+=l*ct,ce+=l*ut,Z+=l*kt,T+=l*Pt,O+=l*Mt,H+=l*It,l=h[9],je+=l*j,Ie+=l*De,Ee+=l*He,Se+=l*Ve,Ce+=l*Re,Ne+=l*Ae,ie+=l*Fe,fe+=l*mt,ne+=l*Qe,oe+=l*lt,ce+=l*ct,Z+=l*ut,T+=l*kt,O+=l*Pt,H+=l*Mt,U+=l*It,l=h[10],Ie+=l*j,Ee+=l*De,Se+=l*He,Ce+=l*Ve,Ne+=l*Re,ie+=l*Ae,fe+=l*Fe,ne+=l*mt,oe+=l*Qe,ce+=l*lt,Z+=l*ct,T+=l*ut,O+=l*kt,H+=l*Pt,U+=l*Mt,$+=l*It,l=h[11],Ee+=l*j,Se+=l*De,Ce+=l*He,Ne+=l*Ve,ie+=l*Re,fe+=l*Ae,ne+=l*Fe,oe+=l*mt,ce+=l*Qe,Z+=l*lt,T+=l*ct,O+=l*ut,H+=l*kt,U+=l*Pt,$+=l*Mt,V+=l*It,l=h[12],Se+=l*j,Ce+=l*De,Ne+=l*He,ie+=l*Ve,fe+=l*Re,ne+=l*Ae,oe+=l*Fe,ce+=l*mt,Z+=l*Qe,T+=l*lt,O+=l*ct,H+=l*ut,U+=l*kt,$+=l*Pt,V+=l*Mt,ge+=l*It,l=h[13],Ce+=l*j,Ne+=l*De,ie+=l*He,fe+=l*Ve,ne+=l*Re,oe+=l*Ae,ce+=l*Fe,Z+=l*mt,T+=l*Qe,O+=l*lt,H+=l*ct,U+=l*ut,$+=l*kt,V+=l*Pt,ge+=l*Mt,ze+=l*It,l=h[14],Ne+=l*j,ie+=l*De,fe+=l*He,ne+=l*Ve,oe+=l*Re,ce+=l*Ae,Z+=l*Fe,T+=l*mt,O+=l*Qe,H+=l*lt,U+=l*ct,$+=l*ut,V+=l*kt,ge+=l*Pt,ze+=l*Mt,Le+=l*It,l=h[15],ie+=l*j,fe+=l*De,ne+=l*He,oe+=l*Ve,ce+=l*Re,Z+=l*Ae,T+=l*Fe,O+=l*mt,H+=l*Qe,U+=l*lt,$+=l*ct,V+=l*ut,ge+=l*kt,ze+=l*Pt,Le+=l*Mt,Pe+=l*It,P+=38*fe,I+=38*ne,F+=38*oe,Y+=38*ce,ue+=38*Z,te+=38*T,Be+=38*O,se+=38*H,we+=38*U,je+=38*$,Ie+=38*V,Ee+=38*ge,Se+=38*ze,Ce+=38*Le,Ne+=38*Pe,g=1,l=P+g+65535,g=Math.floor(l/65536),P=l-g*65536,l=I+g+65535,g=Math.floor(l/65536),I=l-g*65536,l=F+g+65535,g=Math.floor(l/65536),F=l-g*65536,l=Y+g+65535,g=Math.floor(l/65536),Y=l-g*65536,l=ue+g+65535,g=Math.floor(l/65536),ue=l-g*65536,l=te+g+65535,g=Math.floor(l/65536),te=l-g*65536,l=Be+g+65535,g=Math.floor(l/65536),Be=l-g*65536,l=se+g+65535,g=Math.floor(l/65536),se=l-g*65536,l=we+g+65535,g=Math.floor(l/65536),we=l-g*65536,l=je+g+65535,g=Math.floor(l/65536),je=l-g*65536,l=Ie+g+65535,g=Math.floor(l/65536),Ie=l-g*65536,l=Ee+g+65535,g=Math.floor(l/65536),Ee=l-g*65536,l=Se+g+65535,g=Math.floor(l/65536),Se=l-g*65536,l=Ce+g+65535,g=Math.floor(l/65536),Ce=l-g*65536,l=Ne+g+65535,g=Math.floor(l/65536),Ne=l-g*65536,l=ie+g+65535,g=Math.floor(l/65536),ie=l-g*65536,P+=g-1+37*(g-1),g=1,l=P+g+65535,g=Math.floor(l/65536),P=l-g*65536,l=I+g+65535,g=Math.floor(l/65536),I=l-g*65536,l=F+g+65535,g=Math.floor(l/65536),F=l-g*65536,l=Y+g+65535,g=Math.floor(l/65536),Y=l-g*65536,l=ue+g+65535,g=Math.floor(l/65536),ue=l-g*65536,l=te+g+65535,g=Math.floor(l/65536),te=l-g*65536,l=Be+g+65535,g=Math.floor(l/65536),Be=l-g*65536,l=se+g+65535,g=Math.floor(l/65536),se=l-g*65536,l=we+g+65535,g=Math.floor(l/65536),we=l-g*65536,l=je+g+65535,g=Math.floor(l/65536),je=l-g*65536,l=Ie+g+65535,g=Math.floor(l/65536),Ie=l-g*65536,l=Ee+g+65535,g=Math.floor(l/65536),Ee=l-g*65536,l=Se+g+65535,g=Math.floor(l/65536),Se=l-g*65536,l=Ce+g+65535,g=Math.floor(l/65536),Ce=l-g*65536,l=Ne+g+65535,g=Math.floor(l/65536),Ne=l-g*65536,l=ie+g+65535,g=Math.floor(l/65536),ie=l-g*65536,P+=g-1+37*(g-1),d[0]=P,d[1]=I,d[2]=F,d[3]=Y,d[4]=ue,d[5]=te,d[6]=Be,d[7]=se,d[8]=we,d[9]=je,d[10]=Ie,d[11]=Ee,d[12]=Se,d[13]=Ce,d[14]=Ne,d[15]=ie}function et(d,h){ke(d,h,h)}function Ct(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=253;l>=0;l--)et(p,p),l!==2&&l!==4&&ke(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function tn(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=250;l>=0;l--)et(p,p),l!==1&&ke(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function Jt(d,h,p){var l=new Uint8Array(32),g=new Float64Array(80),P,I,F=n(),Y=n(),ue=n(),te=n(),Be=n(),se=n();for(I=0;I<31;I++)l[I]=h[I];for(l[31]=h[31]&127|64,l[0]&=248,xe(g,p),I=0;I<16;I++)Y[I]=g[I],te[I]=F[I]=ue[I]=0;for(F[0]=te[0]=1,I=254;I>=0;--I)P=l[I>>>3]>>>(I&7)&1,K(F,Y,P),K(ue,te,P),Ze(Be,F,ue),We(F,F,ue),Ze(ue,Y,te),We(Y,Y,te),et(te,Be),et(se,F),ke(F,ue,F),ke(ue,Y,Be),Ze(Be,F,ue),We(F,F,ue),et(Y,F),We(ue,te,se),ke(F,ue,c),Ze(F,F,te),ke(ue,ue,F),ke(F,te,se),ke(te,Y,g),et(Y,Be),K(F,Y,P),K(ue,te,P);for(I=0;I<16;I++)g[I+16]=F[I],g[I+32]=ue[I],g[I+48]=Y[I],g[I+64]=te[I];var we=g.subarray(32),je=g.subarray(16);return Ct(we,we),ke(je,je,we),re(d,je),0}function Qt(d,h){return Jt(d,h,a)}function nn(d,h){return r(h,32),Qt(d,h)}function Rt(d,h,p){var l=new Uint8Array(32);return Jt(l,p,h),M(d,s,l,_)}var vn=ht,me=ot;function at(d,h,p,l,g,P){var I=new Uint8Array(32);return Rt(I,g,P),vn(d,h,p,l,I)}function Dn(d,h,p,l,g,P){var I=new Uint8Array(32);return Rt(I,g,P),me(d,h,p,l,I)}var ir=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function rn(d,h,p,l){for(var g=new Int32Array(16),P=new Int32Array(16),I,F,Y,ue,te,Be,se,we,je,Ie,Ee,Se,Ce,Ne,ie,fe,ne,oe,ce,Z,T,O,H,U,$,V,ge=d[0],ze=d[1],Le=d[2],Pe=d[3],j=d[4],De=d[5],He=d[6],Ve=d[7],Re=h[0],Ae=h[1],Fe=h[2],mt=h[3],Qe=h[4],lt=h[5],ct=h[6],ut=h[7],kt=0;l>=128;){for(ce=0;ce<16;ce++)Z=8*ce+kt,g[ce]=p[Z+0]<<24|p[Z+1]<<16|p[Z+2]<<8|p[Z+3],P[ce]=p[Z+4]<<24|p[Z+5]<<16|p[Z+6]<<8|p[Z+7];for(ce=0;ce<80;ce++)if(I=ge,F=ze,Y=Le,ue=Pe,te=j,Be=De,se=He,we=Ve,je=Re,Ie=Ae,Ee=Fe,Se=mt,Ce=Qe,Ne=lt,ie=ct,fe=ut,T=Ve,O=ut,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=(j>>>14|Qe<<18)^(j>>>18|Qe<<14)^(Qe>>>9|j<<23),O=(Qe>>>14|j<<18)^(Qe>>>18|j<<14)^(j>>>9|Qe<<23),H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,T=j&De^~j&He,O=Qe&lt^~Qe&ct,H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,T=ir[ce*2],O=ir[ce*2+1],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,T=g[ce%16],O=P[ce%16],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,ne=$&65535|V<<16,oe=H&65535|U<<16,T=ne,O=oe,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=(ge>>>28|Re<<4)^(Re>>>2|ge<<30)^(Re>>>7|ge<<25),O=(Re>>>28|ge<<4)^(ge>>>2|Re<<30)^(ge>>>7|Re<<25),H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,T=ge&ze^ge&Le^ze&Le,O=Re&Ae^Re&Fe^Ae&Fe,H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,we=$&65535|V<<16,fe=H&65535|U<<16,T=ue,O=Se,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=ne,O=oe,H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,ue=$&65535|V<<16,Se=H&65535|U<<16,ze=I,Le=F,Pe=Y,j=ue,De=te,He=Be,Ve=se,ge=we,Ae=je,Fe=Ie,mt=Ee,Qe=Se,lt=Ce,ct=Ne,ut=ie,Re=fe,ce%16===15)for(Z=0;Z<16;Z++)T=g[Z],O=P[Z],H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=g[(Z+9)%16],O=P[(Z+9)%16],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,ne=g[(Z+1)%16],oe=P[(Z+1)%16],T=(ne>>>1|oe<<31)^(ne>>>8|oe<<24)^ne>>>7,O=(oe>>>1|ne<<31)^(oe>>>8|ne<<24)^(oe>>>7|ne<<25),H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,ne=g[(Z+14)%16],oe=P[(Z+14)%16],T=(ne>>>19|oe<<13)^(oe>>>29|ne<<3)^ne>>>6,O=(oe>>>19|ne<<13)^(ne>>>29|oe<<3)^(oe>>>6|ne<<26),H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,g[Z]=$&65535|V<<16,P[Z]=H&65535|U<<16;T=ge,O=Re,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[0],O=h[0],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[0]=ge=$&65535|V<<16,h[0]=Re=H&65535|U<<16,T=ze,O=Ae,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[1],O=h[1],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[1]=ze=$&65535|V<<16,h[1]=Ae=H&65535|U<<16,T=Le,O=Fe,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[2],O=h[2],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[2]=Le=$&65535|V<<16,h[2]=Fe=H&65535|U<<16,T=Pe,O=mt,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[3],O=h[3],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[3]=Pe=$&65535|V<<16,h[3]=mt=H&65535|U<<16,T=j,O=Qe,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[4],O=h[4],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[4]=j=$&65535|V<<16,h[4]=Qe=H&65535|U<<16,T=De,O=lt,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[5],O=h[5],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[5]=De=$&65535|V<<16,h[5]=lt=H&65535|U<<16,T=He,O=ct,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[6],O=h[6],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[6]=He=$&65535|V<<16,h[6]=ct=H&65535|U<<16,T=Ve,O=ut,H=O&65535,U=O>>>16,$=T&65535,V=T>>>16,T=d[7],O=h[7],H+=O&65535,U+=O>>>16,$+=T&65535,V+=T>>>16,U+=H>>>16,$+=U>>>16,V+=$>>>16,d[7]=Ve=$&65535|V<<16,h[7]=ut=H&65535|U<<16,kt+=128,l-=128}return l}function _t(d,h,p){var l=new Int32Array(8),g=new Int32Array(8),P=new Uint8Array(256),I,F=p;for(l[0]=1779033703,l[1]=3144134277,l[2]=1013904242,l[3]=2773480762,l[4]=1359893119,l[5]=2600822924,l[6]=528734635,l[7]=1541459225,g[0]=4089235720,g[1]=2227873595,g[2]=4271175723,g[3]=1595750129,g[4]=2917565137,g[5]=725511199,g[6]=4215389547,g[7]=327033209,rn(l,g,h,p),p%=128,I=0;I<p;I++)P[I]=h[F-p+I];for(P[p]=128,p=256-128*(p<112?1:0),P[p-9]=0,w(P,p-8,F/536870912|0,F<<3),rn(l,g,P,p),I=0;I<8;I++)w(d,8*I,l[I],g[I]);return 0}function sn(d,h){var p=n(),l=n(),g=n(),P=n(),I=n(),F=n(),Y=n(),ue=n(),te=n();We(p,d[1],d[0]),We(te,h[1],h[0]),ke(p,p,te),Ze(l,d[0],d[1]),Ze(te,h[0],h[1]),ke(l,l,te),ke(g,d[3],h[3]),ke(g,g,m),ke(P,d[2],h[2]),Ze(P,P,P),We(I,l,p),We(F,P,g),Ze(Y,P,g),Ze(ue,l,p),ke(d[0],I,F),ke(d[1],ue,Y),ke(d[2],Y,F),ke(d[3],I,ue)}function Un(d,h,p){var l;for(l=0;l<4;l++)K(d[l],h[l],p)}function An(d,h){var p=n(),l=n(),g=n();Ct(g,h[2]),ke(p,h[0],g),ke(l,h[1],g),re(d,l),d[31]^=Ue(p)<<7}function Fn(d,h,p){var l,g;for(Xe(d[0],o),Xe(d[1],u),Xe(d[2],u),Xe(d[3],o),g=255;g>=0;--g)l=p[g/8|0]>>(g&7)&1,Un(d,h,l),sn(h,d),sn(d,d),Un(d,h,l)}function Bt(d,h){var p=[n(),n(),n(),n()];Xe(p[0],b),Xe(p[1],x),Xe(p[2],u),ke(p[3],b,x),Fn(d,p,h)}function yn(d,h,p){var l=new Uint8Array(64),g=[n(),n(),n(),n()],P;for(p||r(h,32),_t(l,h,32),l[0]&=248,l[31]&=127,l[31]|=64,Bt(g,l),An(d,g),P=0;P<32;P++)h[P+32]=d[P];return 0}var rt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Jn(d,h){var p,l,g,P;for(l=63;l>=32;--l){for(p=0,g=l-32,P=l-12;g<P;++g)h[g]+=p-16*h[l]*rt[g-(l-32)],p=Math.floor((h[g]+128)/256),h[g]-=p*256;h[g]+=p,h[l]=0}for(p=0,g=0;g<32;g++)h[g]+=p-(h[31]>>4)*rt[g],p=h[g]>>8,h[g]&=255;for(g=0;g<32;g++)h[g]-=p*rt[g];for(l=0;l<32;l++)h[l+1]+=h[l]>>8,d[l]=h[l]&255}function Cn(d){var h=new Float64Array(64),p;for(p=0;p<64;p++)h[p]=d[p];for(p=0;p<64;p++)d[p]=0;Jn(d,h)}function Qn(d,h,p,l){var g=new Uint8Array(64),P=new Uint8Array(64),I=new Uint8Array(64),F,Y,ue=new Float64Array(64),te=[n(),n(),n(),n()];_t(g,l,32),g[0]&=248,g[31]&=127,g[31]|=64;var Be=p+64;for(F=0;F<p;F++)d[64+F]=h[F];for(F=0;F<32;F++)d[32+F]=g[32+F];for(_t(I,d.subarray(32),p+32),Cn(I),Bt(te,I),An(d,te),F=32;F<64;F++)d[F]=l[F];for(_t(P,d,p+64),Cn(P),F=0;F<64;F++)ue[F]=0;for(F=0;F<32;F++)ue[F]=I[F];for(F=0;F<32;F++)for(Y=0;Y<32;Y++)ue[F+Y]+=P[F]*g[Y];return Jn(d.subarray(32),ue),Be}function G(d,h){var p=n(),l=n(),g=n(),P=n(),I=n(),F=n(),Y=n();return Xe(d[2],u),xe(d[1],h),et(g,d[1]),ke(P,g,f),We(g,g,d[2]),Ze(P,d[2],P),et(I,P),et(F,I),ke(Y,F,I),ke(p,Y,g),ke(p,p,P),tn(p,p),ke(p,p,g),ke(p,p,P),ke(p,p,P),ke(d[0],p,P),et(l,d[0]),ke(l,l,P),he(l,g)&&ke(d[0],d[0],C),et(l,d[0]),ke(l,l,P),he(l,g)?-1:(Ue(d[0])===h[31]>>7&&We(d[0],o,d[0]),ke(d[3],d[0],d[1]),0)}function A(d,h,p,l){var g,P=new Uint8Array(32),I=new Uint8Array(64),F=[n(),n(),n(),n()],Y=[n(),n(),n(),n()];if(p<64||G(Y,l))return-1;for(g=0;g<p;g++)d[g]=h[g];for(g=0;g<32;g++)d[g+32]=l[g];if(_t(I,d,p),Cn(I),Fn(F,Y,I),Bt(Y,h.subarray(32)),sn(F,Y),An(P,F),p-=64,k(h,0,P,0)){for(g=0;g<p;g++)d[g]=0;return-1}for(g=0;g<p;g++)d[g]=h[g+64];return p}var X=32,be=24,st=32,S=16,ye=32,ve=32,_e=32,W=32,q=32,Je=be,tt=st,En=S,Et=64,an=32,$n=64,zr=32,Pr=64;t.lowlevel={crypto_core_hsalsa20:M,crypto_stream_xor:pe,crypto_stream:Oe,crypto_stream_salsa20_xor:D,crypto_stream_salsa20:Q,crypto_onetimeauth:pt,crypto_onetimeauth_verify:wt,crypto_verify_16:L,crypto_verify_32:k,crypto_secretbox:ht,crypto_secretbox_open:ot,crypto_scalarmult:Jt,crypto_scalarmult_base:Qt,crypto_box_beforenm:Rt,crypto_box_afternm:vn,crypto_box:at,crypto_box_open:Dn,crypto_box_keypair:nn,crypto_hash:_t,crypto_sign:Qn,crypto_sign_keypair:yn,crypto_sign_open:A,crypto_secretbox_KEYBYTES:X,crypto_secretbox_NONCEBYTES:be,crypto_secretbox_ZEROBYTES:st,crypto_secretbox_BOXZEROBYTES:S,crypto_scalarmult_BYTES:ye,crypto_scalarmult_SCALARBYTES:ve,crypto_box_PUBLICKEYBYTES:_e,crypto_box_SECRETKEYBYTES:W,crypto_box_BEFORENMBYTES:q,crypto_box_NONCEBYTES:Je,crypto_box_ZEROBYTES:tt,crypto_box_BOXZEROBYTES:En,crypto_sign_BYTES:Et,crypto_sign_PUBLICKEYBYTES:an,crypto_sign_SECRETKEYBYTES:$n,crypto_sign_SEEDBYTES:zr,crypto_hash_BYTES:Pr,gf:n,D:f,L:rt,pack25519:re,unpack25519:xe,M:ke,A:Ze,S:et,Z:We,pow2523:tn,add:sn,set25519:Xe,modL:Jn,scalarmult:Fn,scalarbase:Bt};function Ss(d,h){if(d.length!==X)throw new Error("bad key size");if(h.length!==be)throw new Error("bad nonce size")}function ro(d,h){if(d.length!==_e)throw new Error("bad public key size");if(h.length!==W)throw new Error("bad secret key size")}function qt(){for(var d=0;d<arguments.length;d++)if(!(arguments[d]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function Sa(d){for(var h=0;h<d.length;h++)d[h]=0}t.randomBytes=function(d){var h=new Uint8Array(d);return r(h,d),h},t.secretbox=function(d,h,p){qt(d,h,p),Ss(p,h);for(var l=new Uint8Array(st+d.length),g=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+st]=d[P];return ht(g,l,l.length,h,p),g.subarray(S)},t.secretbox.open=function(d,h,p){qt(d,h,p),Ss(p,h);for(var l=new Uint8Array(S+d.length),g=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+S]=d[P];return l.length<32||ot(g,l,l.length,h,p)!==0?null:g.subarray(st)},t.secretbox.keyLength=X,t.secretbox.nonceLength=be,t.secretbox.overheadLength=S,t.scalarMult=function(d,h){if(qt(d,h),d.length!==ve)throw new Error("bad n size");if(h.length!==ye)throw new Error("bad p size");var p=new Uint8Array(ye);return Jt(p,d,h),p},t.scalarMult.base=function(d){if(qt(d),d.length!==ve)throw new Error("bad n size");var h=new Uint8Array(ye);return Qt(h,d),h},t.scalarMult.scalarLength=ve,t.scalarMult.groupElementLength=ye,t.box=function(d,h,p,l){var g=t.box.before(p,l);return t.secretbox(d,h,g)},t.box.before=function(d,h){qt(d,h),ro(d,h);var p=new Uint8Array(q);return Rt(p,d,h),p},t.box.after=t.secretbox,t.box.open=function(d,h,p,l){var g=t.box.before(p,l);return t.secretbox.open(d,h,g)},t.box.open.after=t.secretbox.open,t.box.keyPair=function(){var d=new Uint8Array(_e),h=new Uint8Array(W);return nn(d,h),{publicKey:d,secretKey:h}},t.box.keyPair.fromSecretKey=function(d){if(qt(d),d.length!==W)throw new Error("bad secret key size");var h=new Uint8Array(_e);return Qt(h,d),{publicKey:h,secretKey:new Uint8Array(d)}},t.box.publicKeyLength=_e,t.box.secretKeyLength=W,t.box.sharedKeyLength=q,t.box.nonceLength=Je,t.box.overheadLength=t.secretbox.overheadLength,t.sign=function(d,h){if(qt(d,h),h.length!==$n)throw new Error("bad secret key size");var p=new Uint8Array(Et+d.length);return Qn(p,d,d.length,h),p},t.sign.open=function(d,h){if(qt(d,h),h.length!==an)throw new Error("bad public key size");var p=new Uint8Array(d.length),l=A(p,d,d.length,h);if(l<0)return null;for(var g=new Uint8Array(l),P=0;P<g.length;P++)g[P]=p[P];return g},t.sign.detached=function(d,h){for(var p=t.sign(d,h),l=new Uint8Array(Et),g=0;g<l.length;g++)l[g]=p[g];return l},t.sign.detached.verify=function(d,h,p){if(qt(d,h,p),h.length!==Et)throw new Error("bad signature size");if(p.length!==an)throw new Error("bad public key size");var l=new Uint8Array(Et+d.length),g=new Uint8Array(Et+d.length),P;for(P=0;P<Et;P++)l[P]=h[P];for(P=0;P<d.length;P++)l[P+Et]=d[P];return A(g,l,l.length,p)>=0},t.sign.keyPair=function(){var d=new Uint8Array(an),h=new Uint8Array($n);return yn(d,h),{publicKey:d,secretKey:h}},t.sign.keyPair.fromSecretKey=function(d){if(qt(d),d.length!==$n)throw new Error("bad secret key size");for(var h=new Uint8Array(an),p=0;p<h.length;p++)h[p]=d[32+p];return{publicKey:h,secretKey:new Uint8Array(d)}},t.sign.keyPair.fromSeed=function(d){if(qt(d),d.length!==zr)throw new Error("bad seed size");for(var h=new Uint8Array(an),p=new Uint8Array($n),l=0;l<32;l++)p[l]=d[l];return yn(h,p,!0),{publicKey:h,secretKey:p}},t.sign.publicKeyLength=an,t.sign.secretKeyLength=$n,t.sign.seedLength=zr,t.sign.signatureLength=Et,t.hash=function(d){qt(d);var h=new Uint8Array(Pr);return _t(h,d,d.length),h},t.hash.hashLength=Pr,t.verify=function(d,h){return qt(d,h),d.length===0||h.length===0||d.length!==h.length?!1:N(d,0,h,0,d.length)===0},t.setPRNG=function(d){r=d},function(){var d=typeof self<"u"?self.crypto||self.msCrypto:null;if(d&&d.getRandomValues){var h=65536;t.setPRNG(function(p,l){var g,P=new Uint8Array(l);for(g=0;g<l;g+=h)d.getRandomValues(P.subarray(g,g+Math.min(l-g,h)));for(g=0;g<l;g++)p[g]=P[g];Sa(P)})}else typeof M1<"u"&&(d=T1,d&&d.randomBytes&&t.setPRNG(function(p,l){var g,P=d.randomBytes(l);for(g=0;g<l;g++)p[g]=P[g];Sa(P)}))}()})(e.exports?e.exports:self.nacl=self.nacl||{})})(mh);var O1=mh.exports;const gh=bd(O1);var xh={exports:{}};(function(e){(function(t,n){e.exports?e.exports=n():(t.nacl||(t.nacl={}),t.nacl.util=n())})(Mh,function(){var t={};function n(r){if(!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r))throw new TypeError("invalid encoding")}return t.decodeUTF8=function(r){if(typeof r!="string")throw new TypeError("expected string");var s,a=unescape(encodeURIComponent(r)),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o},t.encodeUTF8=function(r){var s,a=[];for(s=0;s<r.length;s++)a.push(String.fromCharCode(r[s]));return decodeURIComponent(escape(a.join("")))},typeof atob>"u"?typeof Buffer.from<"u"?(t.encodeBase64=function(r){return Buffer.from(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(Buffer.from(r,"base64"),0))}):(t.encodeBase64=function(r){return new Buffer(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(new Buffer(r,"base64"),0))}):(t.encodeBase64=function(r){var s,a=[],o=r.length;for(s=0;s<o;s++)a.push(String.fromCharCode(r[s]));return btoa(a.join(""))},t.decodeBase64=function(r){n(r);var s,a=atob(r),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o}),t})})(xh);var Mi=xh.exports;const vh="hotline-identity";function yh(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}function R1(){const e=gh.sign.keyPair();return{publicKey:e.publicKey,secretKey:e.secretKey}}function _1(e){const t={publicKey:Mi.encodeBase64(e.publicKey),secretKey:Mi.encodeBase64(e.secretKey)};localStorage.setItem(vh,JSON.stringify(t))}function D1(){const e=localStorage.getItem(vh);if(!e)return null;try{const t=JSON.parse(e);return{publicKey:Mi.decodeBase64(t.publicKey),secretKey:Mi.decodeBase64(t.secretKey)}}catch{return null}}function U1(){const e=D1();if(e)return e;const t=R1();return _1(t),t}function _l(e,t){const n=new TextEncoder().encode(e),r=gh.sign.detached(n,t);return yh(r)}function Ii(e){return yh(e.publicKey)}function A1(){const[e]=y.useState(()=>U1());return{identity:e,publicKeyHex:Ii(e)}}function qe(e,t){return{type:e,id:crypto.randomUUID(),timestamp:Date.now(),payload:t}}function F1({identity:e,onError:t}){const n=y.useRef(null),r=y.useRef(null),s=y.useRef(0),a=y.useRef(""),o=y.useRef(""),[u,c]=y.useState("disconnected"),[f,m]=y.useState(null),[b,x]=y.useState([]),[C,w]=y.useState([]),[N,L]=y.useState([]),[k,v]=y.useState([]),[E,z]=y.useState([]),[M,_]=y.useState([]),[D,Q]=y.useState([]),[Oe,pe]=y.useState([]),[Ke,pt]=y.useState(0),[wt,ht]=y.useState(!1),[ot,Xe]=y.useState(!0),xt=y.useCallback(G=>{var X,be,st;const A=JSON.parse(G.data);switch(A.type){case"auth.nonce":{const{nonce:S}=A.payload;c("authenticating");const ye=_l(S,e.secretKey),ve=qe("auth",{publicKey:Ii(e),signature:ye,nonce:S,nickname:o.current});(X=n.current)==null||X.send(JSON.stringify(ve));break}case"auth.ok":{const S=A.payload;c("connected"),m({name:S.serverName,motd:S.motd,userId:S.userId,role:S.role});const ye=qe("channel.list",{});(be=n.current)==null||be.send(JSON.stringify(ye));const ve=qe("user.list",{});(st=n.current)==null||st.send(JSON.stringify(ve));break}case"auth.error":{const{reason:S}=A.payload;t==null||t(S);break}case"chat.message":{const S=A.payload;x(ye=>ye.some(ve=>ve.id===A.id)?ye:[...ye,{id:A.id,channel:S.channel,userId:S.userId,nickname:S.nickname,content:S.content,role:S.role,timestamp:A.timestamp,replyTo:S.replyTo}].sort((ve,_e)=>ve.timestamp-_e.timestamp));break}case"channel.list":{const{channels:S}=A.payload;v(S||[]);break}case"user.list":{const{users:S}=A.payload;z(S||[]);break}case"user.joined":{const S=A.payload;z(ye=>[...ye.filter(_e=>_e.userId!==S.userId),{...S,status:"online"}]);break}case"user.left":{const S=A.payload;z(ye=>ye.filter(ve=>ve.userId!==S.userId));break}case"user.role_changed":{const{userId:S,role:ye}=A.payload;z(ve=>ve.map(_e=>_e.userId===S?{..._e,role:ye}:_e));break}case"dm.message":{const S=A.payload;w(ye=>ye.some(ve=>ve.id===A.id)?ye:[...ye,{id:A.id,from:S.from,to:S.to,nickname:S.nickname,content:S.content,role:S.role,timestamp:A.timestamp}].sort((ve,_e)=>ve.timestamp-_e.timestamp));break}case"typing":{const S=A.payload;L(ye=>[...ye.filter(_e=>_e.userId!==S.userId||_e.channel!==S.channel),{...S,expiry:Date.now()+3e3}]);break}case"chat.search_results":{const S=A.payload;_(S.results||[]);break}case"chat.edited":{const S=A.payload;x(ye=>ye.map(ve=>ve.id===S.messageId?{...ve,content:S.content,edited:!0}:ve));break}case"chat.deleted":{const S=A.payload;x(ye=>ye.filter(ve=>ve.id!==S.messageId));break}case"reaction.updated":{const S=A.payload;x(ye=>ye.map(ve=>{if(ve.id!==S.messageId)return ve;const _e=[...ve.reactions||[]],W=_e.findIndex(q=>q.emoji===S.emoji);if(S.action==="add")W>=0?_e[W].users.includes(S.userId)||(_e[W]={..._e[W],users:[..._e[W].users,S.userId]}):_e.push({emoji:S.emoji,users:[S.userId]});else if(W>=0){const q=_e[W].users.filter(Je=>Je!==S.userId);q.length===0?_e.splice(W,1):_e[W]={..._e[W],users:q}}return{...ve,reactions:_e}}));break}case"pin.added":break;case"pin.removed":{Q(S=>S.filter(ye=>ye.id!==A.payload.messageId));break}case"pin.list":{const S=A.payload;Q(S.messages||[]);break}case"user.nick_changed":{const S=A.payload;z(ye=>ye.map(ve=>ve.userId===S.userId?{...ve,nickname:S.newNick}:ve));break}case"server.settings_updated":{const S=A.payload;m(ye=>ye&&{...ye,name:S.serverName,motd:S.motd});break}case"user.status_changed":{const S=A.payload;z(ye=>ye.map(ve=>ve.userId===S.userId?{...ve,status:S.status}:ve));break}case"channel.members":{const S=A.payload;pe(S.members||[]);break}case"chat.history":{const S=A.payload;ht(!1),Xe(S.hasMore),S.messages&&S.messages.length>0&&x(ye=>{const ve=S.messages.map(q=>({id:q.id,channel:q.payload.channel,userId:q.payload.userId,nickname:q.payload.nickname,content:q.payload.content,role:q.payload.role,timestamp:q.timestamp,replyTo:q.payload.replyTo})),_e=new Set(ye.map(q=>q.id));return[...ve.filter(q=>!_e.has(q.id)),...ye].sort((q,Je)=>q.timestamp-Je.timestamp)});break}case"error":{const S=A.payload;t==null||t(S.message);break}}},[e,t]),K=y.useCallback((G,A)=>{n.current&&n.current.close(),a.current=G,o.current=A,c("connecting"),x([]);const X=G.startsWith("wss://")?"":"ws://",be=G.includes("://")?G:`${X}${G}/ws`,st=new WebSocket(be);n.current=st,st.onopen=()=>{s.current=0,pt(0)},st.onmessage=xt,st.onclose=()=>{if(a.current){const S=s.current,ye=Math.min(1e3*Math.pow(2,S),3e4);s.current=S+1,c("reconnecting"),pt(Math.round(ye/1e3));const ve=window.setInterval(()=>{pt(_e=>_e<=1?(clearInterval(ve),0):_e-1)},1e3);r.current=window.setTimeout(()=>{clearInterval(ve),a.current&&K(a.current,o.current)},ye)}else c("disconnected")},st.onerror=()=>{t==null||t("Connection error")}},[xt,t]),re=y.useCallback(()=>{a.current="",r.current&&(clearTimeout(r.current),r.current=null),n.current&&(n.current.close(),n.current=null),c("disconnected"),m(null),x([]),w([]),L([]),v([]),z([])},[]),he=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("chat.send",{channel:G,content:A});n.current.send(JSON.stringify(be))}},[]),Ue=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be={channel:G};A&&(be.password=A);const st=qe("channel.join",be);n.current.send(JSON.stringify(st))}},[]),xe=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("channel.leave",{channel:G});n.current.send(JSON.stringify(X))}},[]),Ze=y.useCallback((G,A,X)=>{var be;if(((be=n.current)==null?void 0:be.readyState)===WebSocket.OPEN){const st=qe("channel.create",{name:G,topic:A,password:X||""});n.current.send(JSON.stringify(st))}},[]),We=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const A=qe("user.list",{});n.current.send(JSON.stringify(A))}},[]),ke=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const A=qe("channel.list",{});n.current.send(JSON.stringify(A))}},[]),et=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("admin.kick",{userId:G});n.current.send(JSON.stringify(X))}},[]),Ct=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("admin.ban",{userId:G});n.current.send(JSON.stringify(X))}},[]),tn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("admin.op",{userId:G,role:A});n.current.send(JSON.stringify(be))}},[]),Jt=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("admin.topic",{channel:G,topic:A});n.current.send(JSON.stringify(be))}},[]),Qt=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("dm.send",{targetId:G,content:A});n.current.send(JSON.stringify(be))}},[]),nn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("typing",{channel:G,targetId:A||""});n.current.send(JSON.stringify(be))}},[]),Rt=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("channel.delete",{name:G});n.current.send(JSON.stringify(X))}},[]),vn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("chat.search",{query:G,channel:A||""});n.current.send(JSON.stringify(be))}},[]),me=y.useCallback(()=>{_([])},[]),at=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("chat.edit",{messageId:G,content:A});n.current.send(JSON.stringify(be))}},[]),Dn=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("chat.delete",{messageId:G});n.current.send(JSON.stringify(X))}},[]),ir=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("reaction.add",{messageId:G,emoji:A});n.current.send(JSON.stringify(be))}},[]),rn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("reaction.remove",{messageId:G,emoji:A});n.current.send(JSON.stringify(be))}},[]),_t=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("pin.add",{messageId:G,channel:A});n.current.send(JSON.stringify(be))}},[]),sn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("pin.remove",{messageId:G,channel:A});n.current.send(JSON.stringify(be))}},[]),Un=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("pin.list",{channel:G});n.current.send(JSON.stringify(X))}},[]),An=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("user.nick",{nickname:G});n.current.send(JSON.stringify(X))}},[]),Fn=y.useCallback((G,A,X)=>{var be;if(((be=n.current)==null?void 0:be.readyState)===WebSocket.OPEN){const st=qe("chat.send",{channel:G,content:A,replyTo:X});n.current.send(JSON.stringify(st))}},[]),Bt=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){const be=qe("admin.settings",{serverName:G,motd:A});n.current.send(JSON.stringify(be))}},[]),yn=y.useCallback(()=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const A=qe("admin.banlist",{});n.current.send(JSON.stringify(A))}},[]),rt=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("admin.unban",{publicKey:G});n.current.send(JSON.stringify(X))}},[]),Jn=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("user.status",{status:G});n.current.send(JSON.stringify(X))}},[]),Cn=y.useCallback(G=>{var A;if(((A=n.current)==null?void 0:A.readyState)===WebSocket.OPEN){const X=qe("channel.members",{channel:G});n.current.send(JSON.stringify(X))}},[]),Qn=y.useCallback((G,A)=>{var X;if(((X=n.current)==null?void 0:X.readyState)===WebSocket.OPEN){ht(!0);const be=qe("chat.history",{channel:G,before:A,limit:50});n.current.send(JSON.stringify(be))}},[]);return y.useEffect(()=>{const G=setInterval(()=>{L(A=>A.filter(X=>X.expiry>Date.now()))},1e3);return()=>clearInterval(G)},[]),y.useEffect(()=>()=>{r.current&&clearTimeout(r.current),n.current&&n.current.close()},[]),{status:u,serverInfo:f,messages:b,dmMessages:C,typingUsers:N,channels:k,users:E,searchResults:M,pinnedMessages:D,channelMembers:Oe,reconnectIn:Ke,historyLoading:wt,hasMoreHistory:ot,connect:K,disconnect:re,sendChat:he,sendDM:Qt,sendTyping:nn,joinChannel:Ue,leaveChannel:xe,createChannel:Ze,deleteChannel:Rt,requestUserList:We,requestChannelList:ke,kickUser:et,banUser:Ct,setUserRole:tn,setTopic:Jt,search:vn,clearSearch:me,editMessage:at,deleteMessage:Dn,addReaction:ir,removeReaction:rn,pinMessage:_t,unpinMessage:sn,requestPins:Un,changeNickname:An,sendChatWithReply:Fn,updateServerSettings:Bt,requestBanList:yn,unbanUser:rt,setStatus:Jn,requestChannelMembers:Cn,loadHistory:Qn}}const bh="hotline_muted_channels";function $1(){try{const e=localStorage.getItem(bh);return e?JSON.parse(e):[]}catch{return[]}}function B1(e){localStorage.setItem(bh,JSON.stringify(e))}function H1(){const[e,t]=y.useState($1),n=y.useCallback(s=>{t(a=>{const o=a.includes(s)?a.filter(u=>u!==s):[...a,s];return B1(o),o})},[]),r=y.useCallback(s=>e.includes(s),[e]);return{mutedChannels:e,toggleMute:n,isMuted:r}}function V1({timeout:e,onIdle:t,onActive:n,enabled:r}){const s=y.useRef(null),a=y.useRef(!1),o=y.useCallback(()=>{r&&(s.current&&clearTimeout(s.current),a.current&&(a.current=!1,n()),s.current=setTimeout(()=>{a.current=!0,t()},e))},[e,t,n,r]);y.useEffect(()=>{if(!r)return;const u=["mousedown","mousemove","keydown","scroll","touchstart","pointerdown"];return u.forEach(c=>document.addEventListener(c,o,{passive:!0})),o(),()=>{u.forEach(c=>document.removeEventListener(c,o)),s.current&&clearTimeout(s.current)}},[o,r])}const K1="Hotline Modern";function W1(e){const t=y.useRef(K1);y.useEffect(()=>(e>0?document.title=`(${e}) ${t.current}`:document.title=t.current,()=>{document.title=t.current}),[e]),y.useEffect(()=>{if(e===0||!document.hidden)return;let n=!0;const r=setInterval(()=>{document.title=n?`(${e}) ${t.current}`:"💬 New messages",n=!n},1500),s=()=>{document.hidden||(clearInterval(r),document.title=e>0?`(${e}) ${t.current}`:t.current)};return document.addEventListener("visibilitychange",s),()=>{clearInterval(r),document.removeEventListener("visibilitychange",s)}},[e])}const sd="hotline_compact_mode";function Y1(){const[e,t]=y.useState(()=>{try{return localStorage.getItem(sd)==="true"}catch{return!1}});return y.useEffect(()=>{localStorage.setItem(sd,String(e)),e?document.documentElement.setAttribute("data-density","compact"):document.documentElement.removeAttribute("data-density")},[e]),{compact:e,toggleCompact:()=>t(r=>!r)}}function J1(){var ge,ze,Le,Pe,j,De,He,Ve,Re,Ae,Fe,mt,Qe,lt,ct,ut,kt,Pt,Mt,It,Uc;const{t:e}=Ge(),{identity:t}=A1(),[n,r]=y.useState("lobby"),[s,a]=y.useState(""),[o,u]=y.useState(""),[c,f]=y.useState(null),[m,b]=y.useState(!0),[x,C]=y.useState(!1),[w,N]=y.useState(!1),[L,k]=y.useState(!1),[v,E]=y.useState(!1),[z,M]=y.useState(!1),[_,D]=y.useState(!1),[Q,Oe]=y.useState(!1),[pe,Ke]=y.useState(null),[pt,wt]=y.useState(null),[ht,ot]=y.useState(null),[Xe,xt]=y.useState(to),[K,re]=y.useState(!1),[he,Ue]=y.useState(!1),[xe,Ze]=y.useState(null),[We,ke]=y.useState(!1),[et,Ct]=y.useState(!1),[tn,Jt]=y.useState(!1),[Qt,nn]=y.useState(!1),[Rt,vn]=y.useState(v1),[me,at]=y.useState(k1),[Dn,ir]=y.useState(S1),[rn,_t]=y.useState(null),[sn,Un]=y.useState({}),[An,Fn]=y.useState({}),[Bt,yn]=y.useState({}),[rt,Jn]=y.useState(Z0),[Cn,Qn]=y.useState(null),G=y.useRef(0),A=y.useRef(0),X=y.useRef(n),be=y.useRef(s);y.useEffect(()=>{m1()},[]);const st=y.useCallback(R=>{f(R),setTimeout(()=>f(null),5e3)},[]),S=F1({identity:t,onError:st}),{mutedChannels:ye,toggleMute:ve,isMuted:_e}=H1(),{compact:W,toggleCompact:q}=Y1(),{toasts:Je,addToast:tt,dismissToast:En}=P1(),Et=y.useMemo(()=>Object.values(sn).reduce((R,B)=>R+B,0)+Object.values(Bt).reduce((R,B)=>R+B,0),[sn,Bt]);W1(Et);const an=y.useRef([]);y.useEffect(()=>{if(S.status!=="connected")return;const R=S.users.map(de=>de.userId),B=an.current,ae=B.map(de=>de.id);if(ae.length>0){for(const de of S.users)ae.includes(de.userId)||tt("join",`${de.nickname} joined`);for(const de of B)R.includes(de.id)||tt("leave",`${de.nick} left`)}an.current=S.users.map(de=>({id:de.userId,nick:de.nickname}))},[S.users,S.status,tt]),V1({timeout:5*60*1e3,onIdle:y.useCallback(()=>{var B;const R=(B=S.users.find(ae=>{var de;return ae.userId===((de=S.serverInfo)==null?void 0:de.userId)}))==null?void 0:B.status;R&&R!=="away"&&(Qn(R),S.setStatus("away"))},[S]),onActive:y.useCallback(()=>{Cn&&(S.setStatus(Cn),Qn(null))},[S,Cn]),enabled:S.status==="connected"});const $n=(R,B)=>{u(R),S.connect(R,B)},zr=R=>{const B=S.channels.find(de=>de.name===R);if(B!=null&&B.hasPassword&&R!==n){Ke(R);return}const ae=S.messages.filter(de=>de.channel===n);ae.length>0&&Fn(de=>({...de,[n]:ae[ae.length-1].id})),a(""),r(R),S.joinChannel(R)},Pr=R=>{pe&&(a(""),r(pe),S.joinChannel(pe,R),Ke(null))},Ss=R=>{a(R),yn(B=>({...B,[R]:0}))},ro=R=>{S.deleteChannel(R),n===R&&(r("lobby"),S.joinChannel("lobby"))},qt=()=>{C(!0)},Sa=(R,B,ae)=>{S.createChannel(R,B,ae),setTimeout(()=>{P(R),S.requestChannelList()},300)},d=y.useCallback((R,B)=>{const ae=de=>S.users.find(Te=>Te.nickname.toLowerCase()===de.toLowerCase());switch(R){case"kick":{const de=ae(B[0]||"");de&&S.kickUser(de.userId);break}case"ban":{const de=ae(B[0]||"");de&&S.banUser(de.userId);break}case"op":{const de=ae(B[0]||"");de&&S.setUserRole(de.userId,"operator");break}case"deop":{const de=ae(B[0]||"");de&&S.setUserRole(de.userId,"member");break}case"topic":{const de=B.join(" ");de&&S.setTopic(n,de);break}}},[S,n]),h=y.useRef(rt);y.useEffect(()=>{h.current=rt},[rt]);const p=y.useCallback(()=>{if(h.current.soundEnabled)try{const R=new AudioContext,B=R.createOscillator(),ae=R.createGain();B.connect(ae),ae.connect(R.destination),B.frequency.value=880,B.type="sine",ae.gain.value=.08,ae.gain.exponentialRampToValueAtTime(.001,R.currentTime+.15),B.start(),B.stop(R.currentTime+.15)}catch{}},[]);y.useEffect(()=>{X.current=n},[n]),y.useEffect(()=>{be.current=s},[s]),y.useEffect(()=>{var R;if(S.messages.length>G.current){const B=S.messages.slice(G.current),ae=X.current,de=(R=S.serverInfo)==null?void 0:R.userId;let Te=!1;if(Un(jt=>{const zn={...jt};for(const Pn of B)Pn.channel!==ae&&Pn.userId!==de&&(zn[Pn.channel]=(zn[Pn.channel]||0)+1,_e(Pn.channel)||(Te=!0));return zn}),Te){p();const jt=B[B.length-1];jt&&jt.userId!==de&&!_e(jt.channel)&&l(jt.nickname,jt.content)}}G.current=S.messages.length},[S.messages,_e]),y.useEffect(()=>{var R;if(S.dmMessages.length>A.current){const B=S.dmMessages.slice(A.current),ae=(R=S.serverInfo)==null?void 0:R.userId,de=be.current;for(const Te of B){const jt=Te.from===ae?Te.to:Te.from;jt!==de&&Te.from!==ae&&(yn(zn=>({...zn,[jt]:(zn[jt]||0)+1})),p(),l(Te.nickname,Te.content))}}A.current=S.dmMessages.length},[S.dmMessages]);const l=y.useCallback((R,B)=>{if(h.current.desktopEnabled&&"Notification"in window){if(Notification.permission==="default"){Notification.requestPermission();return}Notification.permission==="granted"&&document.hidden&&new Notification(R,{body:B,icon:"/logo.svg"})}},[]),g=y.useMemo(()=>{var ae,de;const R=(ae=S.serverInfo)==null?void 0:ae.userId;if(!R)return[];const B=new Map;for(const Te of S.dmMessages){const jt=Te.from===R?Te.to:Te.from,zn=Te.from===R?((de=S.users.find(Na=>Na.userId===jt))==null?void 0:de.nickname)||jt.slice(0,8):Te.nickname,Pn=B.get(jt);(!Pn||Te.timestamp>Pn.ts)&&B.set(jt,{peerId:jt,peerNick:zn,lastMessage:Te.content,unread:Bt[jt]||0,ts:Te.timestamp})}return Array.from(B.values()).sort((Te,jt)=>jt.ts-Te.ts)},[S.dmMessages,(ge=S.serverInfo)==null?void 0:ge.userId,S.users,Bt]),P=R=>{Un(B=>({...B,[R]:0})),zr(R)},I=y.useMemo(()=>{var B;if(!s||!((B=S.serverInfo)!=null&&B.userId))return[];const R=S.serverInfo.userId;return S.dmMessages.filter(ae=>ae.from===R&&ae.to===s||ae.from===s&&ae.to===R).map(ae=>({id:ae.id,channel:"__dm__",userId:ae.from,nickname:ae.nickname,content:ae.content,role:ae.role,timestamp:ae.timestamp}))},[S.dmMessages,s,(ze=S.serverInfo)==null?void 0:ze.userId]);if(S.status==="disconnected"||S.status==="connecting")return i.jsx(h0,{onConnect:$n,isConnecting:S.status==="connecting"});const F=()=>N(!0),Y=()=>{N(!1),S.clearSearch()};y.useEffect(()=>{const R=B=>{const ae=B.target,de=ae.tagName==="INPUT"||ae.tagName==="TEXTAREA"||ae.tagName==="SELECT";if((B.ctrlKey||B.metaKey)&&B.key==="k"&&(B.preventDefault(),N(Te=>!Te)),B.key==="?"&&!de&&(B.preventDefault(),D(Te=>!Te)),B.key==="Escape"){if(_){D(!1);return}if(w){Y();return}if(L){k(!1);return}if(v){E(!1);return}if(rn){_t(null);return}}};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[w,rn,_,L,v]);const ue=R=>{const B=(s?I:S.messages).find(ae=>ae.id===R);B&&_t({id:B.id,nickname:B.nickname,content:B.content})},[te,Be]=y.useState(""),se=y.useCallback((R,B)=>{const ae=R.split(`
`).map(de=>`> ${de}`).join(`
`);Be(`${ae}
@${B} `)},[]),we=y.useCallback((R,B)=>{if(!xe)return;const ae=B?`${B}

> **Forwarded from ${xe.author}:**
> ${xe.content}`:`> **Forwarded from ${xe.author}:**
> ${xe.content}`;S.sendChat(R,ae),Ze(null),tt("info",e("forward.sent"))},[xe,S,tt,e]),je=y.useCallback(R=>{const B=S.messages.find(ae=>ae.id===R);B&&Ze({content:B.content,author:B.nickname})},[S.messages]),Ie=y.useCallback((R,B)=>{const ae=URL.createObjectURL(B),de={id:Date.now().toString(36),name:R,url:ae},Te=[...Rt,de];vn(Te),rd(Te)},[Rt]),Ee=y.useCallback(R=>{const B=Rt.filter(ae=>ae.id!==R);vn(B),rd(B)},[Rt]),Se=y.useCallback(R=>{const B=[...me,R];at(B),To(B)},[me]),Ce=y.useCallback(R=>{const B=me.filter(ae=>ae.id!==R);at(B),To(B)},[me]);y.useEffect(()=>{const R=setInterval(()=>{const B=Date.now(),ae=me.filter(Te=>Te.scheduledTime<=B);if(ae.length===0)return;for(const Te of ae)S.sendChat(Te.channel,Te.content),tt("info",`Scheduled message sent to #${Te.channel}`);const de=me.filter(Te=>Te.scheduledTime>B);at(de),To(de)},3e4);return()=>clearInterval(R)},[me,S,tt]);const Ne=y.useCallback(R=>{ir(R),N1(R)},[]),ie=y.useMemo(()=>C1(S.channels,Dn),[S.channels,Dn]),fe=(R,B)=>{rn?(S.sendChatWithReply(R,B,rn.id),_t(null)):S.sendChat(R,B)},ne=R=>{S.setStatus(R)},oe=y.useCallback(async R=>{try{const B=Ii(t),ae=_l(B,t.secretKey),de=o.startsWith("wss://")?"https://":"http://",Te=o.replace(/^wss?:\/\//,"").replace(/\/ws$/,"").replace(/:9998/,":9999"),jt=`${de}${Te}/files/uploads/`,zn=new FormData;zn.append("file",R);const Pn=await fetch(jt,{method:"POST",headers:{"X-Hotline-PublicKey":B,"X-Hotline-Signature":ae},body:zn});if(!Pn.ok){st("File upload failed");return}const Na=await Pn.json(),Eh=`${de}${Te}/files/${Na.path}`;S.sendChat(n,`[${Na.filename}](${Eh})`)}catch{st("File upload error")}},[o,n,S,st,t]),ce=y.useCallback(R=>{if(Lo(R))xt(td(R));else{const B=S.messages.find(ae=>ae.id===R);B&&xt(r1({id:B.id,channel:B.channel,nickname:B.nickname,content:B.content,timestamp:B.timestamp}))}},[S.messages]),Z=y.useCallback(R=>{xt(td(R))},[]),T=Ii(t),O=_l(T,t.secretKey),H=((Le=S.serverInfo)==null?void 0:Le.role)==="admin"||((Pe=S.serverInfo)==null?void 0:Pe.role)==="operator",U=((j=S.serverInfo)==null?void 0:j.role)==="admin"||((De=S.serverInfo)==null?void 0:De.role)==="operator",$=((He=S.serverInfo)==null?void 0:He.role)!=="guest",V=S.channels.find(R=>R.name===n);return i.jsxs("div",{className:"app-layout",children:[We&&i.jsx("div",{className:"mobile-sidebar-overlay",onClick:()=>ke(!1)}),i.jsxs("div",{className:`app-sidebar-col ${We?"mobile-open":""}`,children:[i.jsx(g0,{serverName:((Ve=S.serverInfo)==null?void 0:Ve.name)||e("app.name"),channels:ie,activeChannel:n,activeDM:s,dmConversations:g,onSelectChannel:P,onSelectDM:Ss,onCreateChannel:qt,onDeleteChannel:ro,onDisconnect:S.disconnect,canCreateChannel:H,unreadCounts:sn,nickname:(Re=S.serverInfo)!=null&&Re.userId&&((Ae=S.users.find(R=>{var B;return R.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:Ae.nickname)||"",role:((Fe=S.serverInfo)==null?void 0:Fe.role)||"",userStatus:(mt=S.users.find(R=>{var B;return R.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:mt.status,mutedChannels:ye,onToggleMute:ve,onAdminPanel:()=>Oe(!0),typingChannels:S.typingUsers.filter(R=>{var B;return R.userId!==((B=S.serverInfo)==null?void 0:B.userId)}).map(R=>R.channel).filter(Boolean),onReorderChannels:Ne}),i.jsxs("div",{className:"app-sidebar-bottom",children:[i.jsx(m0,{currentStatus:((Qe=S.users.find(R=>{var B;return R.userId===((B=S.serverInfo)==null?void 0:B.userId)}))==null?void 0:Qe.status)||"available",onStatusChange:ne}),i.jsx(t1,{prefs:rt,onChange:Jn}),i.jsx("button",{className:"compact-toggle",onClick:q,title:W?"Comfortable view":"Compact view",children:W?i.jsx(t0,{size:14}):i.jsx(Zx,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>re(!0),title:e("theme.title"),children:i.jsx(Hp,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Ue(!0),title:e("stats.title"),children:i.jsx(qp,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>nn(!0),title:e("scheduler.title"),children:i.jsx(Tc,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Ct(!0),title:e("customEmoji.title"),children:i.jsx(Zi,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Jt(!0),title:e("notifFilters.title"),children:i.jsx(Ap,{size:14})}),i.jsx(J0,{})]})]}),i.jsxs("main",{className:"app-main",children:[i.jsxs("div",{className:"mobile-header",children:[i.jsx("button",{className:"mobile-header-btn",onClick:()=>ke(!0),children:i.jsx(Hx,{size:18})}),i.jsx("span",{className:"mobile-header-channel",children:s?((lt=g.find(R=>R.peerId===s))==null?void 0:lt.peerNick)||"DM":`#${n}`}),i.jsx("button",{className:"mobile-header-btn",onClick:()=>b(R=>!R),children:i.jsx(_c,{size:18})})]}),i.jsx(G0,{status:S.status,reconnectIn:S.reconnectIn}),((ct=S.serverInfo)==null?void 0:ct.motd)&&i.jsx(W0,{motd:S.serverInfo.motd}),c&&i.jsx("div",{className:"app-error",children:c}),i.jsxs("div",{className:"app-chat-row",children:[w&&i.jsx(X0,{onSearch:S.search,onClose:Y,results:S.searchResults,activeChannel:n}),L&&i.jsx(n1,{messages:S.pinnedMessages,onRequestPins:S.requestPins,onUnpin:H?S.unpinMessage:void 0,onClose:()=>k(!1),activeChannel:n,canModerate:H}),v&&i.jsx(s1,{bookmarks:Xe,onRemove:Z,onClose:()=>E(!1)}),i.jsx(B0,{messages:s?I:S.messages,activeChannel:n,channelTopic:V==null?void 0:V.topic,currentUserId:((ut=S.serverInfo)==null?void 0:ut.userId)||"",currentRole:(kt=S.serverInfo)==null?void 0:kt.role,typingUsers:S.typingUsers,dmMode:s?{peerId:s,peerNick:((Pt=g.find(R=>R.peerId===s))==null?void 0:Pt.peerNick)||s.slice(0,8)}:void 0,onSendMessage:s?(R,B)=>S.sendDM(s,B):fe,onSlashCommand:s?void 0:d,onTyping:()=>s?S.sendTyping("",s):S.sendTyping(n),onSearchOpen:F,onReact:S.addReaction,onRemoveReact:S.removeReaction,onEdit:S.editMessage,onDelete:S.deleteMessage,onPin:R=>S.pinMessage(R,n),onReply:ue,replyTo:rn,onCancelReply:()=>_t(null),onLoadHistory:S.loadHistory,historyLoading:S.historyLoading,hasMoreHistory:S.hasMoreHistory,onFileUpload:U?oe:void 0,canUpload:U,users:S.users,onPinsOpen:()=>k(R=>!R),onBookmarksOpen:()=>E(R=>!R),onBookmark:ce,isBookmarked:Lo,onChannelSettings:()=>M(!0),onImageClick:wt,lastReadMessageId:An[n],pinnedMessageIds:S.pinnedMessages.map(R=>R.id),onQuote:se,quotedText:te,onQuoteClear:()=>Be(""),onThreadOpen:ot,onForward:je}),ht&&(()=>{var ae,de;const R=S.messages.find(Te=>Te.id===ht);if(!R)return null;const B=S.messages.filter(Te=>Te.replyTo===ht);return i.jsx(f1,{rootMessage:R,replies:B,currentUserId:((ae=S.serverInfo)==null?void 0:ae.userId)||"",currentRole:(de=S.serverInfo)==null?void 0:de.role,onClose:()=>ot(null),onReact:S.addReaction,onRemoveReact:S.removeReaction,onEdit:S.editMessage,onDelete:S.deleteMessage,onBookmark:ce,isBookmarked:Lo,onImageClick:wt})})(),i.jsx("button",{className:"panel-toggle",onClick:()=>b(R=>!R),title:m?"Hide panel":"Show panel",children:m?i.jsx(Yx,{size:16}):i.jsx(Jx,{size:16})})]})]}),i.jsxs("div",{className:`app-right-panel ${m?"open":"closed"}`,children:[i.jsx(V0,{users:S.users,currentUserId:(Mt=S.serverInfo)==null?void 0:Mt.userId,currentRole:(It=S.serverInfo)==null?void 0:It.role,onKick:S.kickUser,onBan:S.banUser,onOp:R=>S.setUserRole(R,"operator"),onDeop:R=>S.setUserRole(R,"member"),onDM:Ss}),i.jsx(K0,{serverAddress:o,publicKey:T,signature:O,canUpload:U,canDownload:$})]}),x&&i.jsx(Q0,{onSubmit:Sa,onClose:()=>C(!1)}),z&&V&&i.jsx(a1,{channel:V,onSetTopic:S.setTopic,onClose:()=>M(!1),canEdit:H}),_&&i.jsx(l1,{onClose:()=>D(!1)}),Q&&S.serverInfo&&i.jsx(c1,{serverName:S.serverInfo.name,motd:S.serverInfo.motd,onUpdateSettings:S.updateServerSettings,onRequestBanList:S.requestBanList,onUnban:S.unbanUser,onClose:()=>Oe(!1)}),pe&&i.jsx(u1,{channelName:pe,onSubmit:Pr,onCancel:()=>Ke(null)}),pt&&i.jsx(d1,{src:pt,onClose:()=>wt(null)}),K&&i.jsx(h1,{onClose:()=>re(!1)}),he&&i.jsx(g1,{messages:S.messages,userCount:S.users.length,channelCount:S.channels.length,serverName:((Uc=S.serverInfo)==null?void 0:Uc.name)||e("app.name"),onClose:()=>Ue(!1)}),xe&&i.jsx(x1,{messageContent:xe.content,messageAuthor:xe.author,channels:S.channels,currentChannel:n,onForward:we,onClose:()=>Ze(null)}),et&&i.jsx(y1,{emojis:Rt,onUpload:Ie,onDelete:Ee,onClose:()=>Ct(!1)}),tn&&i.jsx(w1,{filters:b1(),channels:S.channels.map(R=>R.name),users:S.users,onChange:R=>{fh(R)},onClose:()=>Jt(!1)}),Qt&&i.jsx(j1,{activeChannel:n,scheduledMessages:me,onSchedule:Se,onDelete:Ce,onClose:()=>nn(!1)}),i.jsx(i1,{onDrop:U?oe:()=>{},enabled:U}),i.jsx(z1,{toasts:Je,onDismiss:En}),i.jsx("style",{children:`
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
      `})]})}const Me=e=>typeof e=="string",Ts=()=>{let e,t;const n=new Promise((r,s)=>{e=r,t=s});return n.resolve=e,n.reject=t,n},ad=e=>e==null?"":""+e,Q1=(e,t,n)=>{e.forEach(r=>{t[r]&&(n[r]=t[r])})},q1=/###/g,id=e=>e&&e.indexOf("###")>-1?e.replace(q1,"."):e,od=e=>!e||Me(e),Qs=(e,t,n)=>{const r=Me(t)?t.split("."):t;let s=0;for(;s<r.length-1;){if(od(e))return{};const a=id(r[s]);!e[a]&&n&&(e[a]=new n),Object.prototype.hasOwnProperty.call(e,a)?e=e[a]:e={},++s}return od(e)?{}:{obj:e,k:id(r[s])}},ld=(e,t,n)=>{const{obj:r,k:s}=Qs(e,t,Object);if(r!==void 0||t.length===1){r[s]=n;return}let a=t[t.length-1],o=t.slice(0,t.length-1),u=Qs(e,o,Object);for(;u.obj===void 0&&o.length;)a=`${o[o.length-1]}.${a}`,o=o.slice(0,o.length-1),u=Qs(e,o,Object),u&&u.obj&&typeof u.obj[`${u.k}.${a}`]<"u"&&(u.obj=void 0);u.obj[`${u.k}.${a}`]=n},X1=(e,t,n,r)=>{const{obj:s,k:a}=Qs(e,t,Object);s[a]=s[a]||[],s[a].push(n)},Li=(e,t)=>{const{obj:n,k:r}=Qs(e,t);if(n)return n[r]},G1=(e,t,n)=>{const r=Li(e,n);return r!==void 0?r:Li(t,n)},wh=(e,t,n)=>{for(const r in t)r!=="__proto__"&&r!=="constructor"&&(r in e?Me(e[r])||e[r]instanceof String||Me(t[r])||t[r]instanceof String?n&&(e[r]=t[r]):wh(e[r],t[r],n):e[r]=t[r]);return e},Wr=e=>e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var Z1={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const ev=e=>Me(e)?e.replace(/[&<>"'\/]/g,t=>Z1[t]):e;class tv{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const n=this.regExpMap.get(t);if(n!==void 0)return n;const r=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,r),this.regExpQueue.push(t),r}}const nv=[" ",",","?","!",";"],rv=new tv(20),sv=(e,t,n)=>{t=t||"",n=n||"";const r=nv.filter(o=>t.indexOf(o)<0&&n.indexOf(o)<0);if(r.length===0)return!0;const s=rv.getRegExp(`(${r.map(o=>o==="?"?"\\?":o).join("|")})`);let a=!s.test(e);if(!a){const o=e.indexOf(n);o>0&&!s.test(e.substring(0,o))&&(a=!0)}return a},Dl=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!e)return;if(e[t])return e[t];const r=t.split(n);let s=e;for(let a=0;a<r.length;){if(!s||typeof s!="object")return;let o,u="";for(let c=a;c<r.length;++c)if(c!==a&&(u+=n),u+=r[c],o=s[u],o!==void 0){if(["string","number","boolean"].indexOf(typeof o)>-1&&c<r.length-1)continue;a+=c-a+1;break}s=o}return s},Ti=e=>e&&e.replace("_","-"),av={type:"logger",log(e){this.output("log",e)},warn(e){this.output("warn",e)},error(e){this.output("error",e)},output(e,t){console&&console[e]&&console[e].apply(console,t)}};class Oi{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(t,n)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||av,this.options=n,this.debug=n.debug}log(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"log","",!0)}warn(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","",!0)}error(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"error","")}deprecate(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(t,n,r,s){return s&&!this.debug?null:(Me(t[0])&&(t[0]=`${r}${this.prefix} ${t[0]}`),this.logger[n](t))}create(t){return new Oi(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new Oi(this.logger,t)}}var Kn=new Oi;class no{constructor(){this.observers={}}on(t,n){return t.split(" ").forEach(r=>{this.observers[r]||(this.observers[r]=new Map);const s=this.observers[r].get(n)||0;this.observers[r].set(n,s+1)}),this}off(t,n){if(this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t].delete(n)}}emit(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];this.observers[t]&&Array.from(this.observers[t].entries()).forEach(o=>{let[u,c]=o;for(let f=0;f<c;f++)u(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(o=>{let[u,c]=o;for(let f=0;f<c;f++)u.apply(u,[t,...r])})}}class cd extends no{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=t||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const n=this.options.ns.indexOf(t);n>-1&&this.options.ns.splice(n,1)}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,o=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let u;t.indexOf(".")>-1?u=t.split("."):(u=[t,n],r&&(Array.isArray(r)?u.push(...r):Me(r)&&a?u.push(...r.split(a)):u.push(r)));const c=Li(this.data,u);return!c&&!n&&!r&&t.indexOf(".")>-1&&(t=u[0],n=u[1],r=u.slice(2).join(".")),c||!o||!Me(r)?c:Dl(this.data&&this.data[t]&&this.data[t][n],r,a)}addResource(t,n,r,s){let a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const o=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator;let u=[t,n];r&&(u=u.concat(o?r.split(o):r)),t.indexOf(".")>-1&&(u=t.split("."),s=n,n=u[1]),this.addNamespaces(n),ld(this.data,u,s),a.silent||this.emit("added",t,n,r,s)}addResources(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const a in r)(Me(r[a])||Array.isArray(r[a]))&&this.addResource(t,n,a,r[a],{silent:!0});s.silent||this.emit("added",t,n,r)}addResourceBundle(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},u=[t,n];t.indexOf(".")>-1&&(u=t.split("."),s=r,r=n,n=u[1]),this.addNamespaces(n);let c=Li(this.data,u)||{};o.skipCopy||(r=JSON.parse(JSON.stringify(r))),s?wh(c,r,a):c={...c,...r},ld(this.data,u,c),o.silent||this.emit("added",t,n,r)}removeResourceBundle(t,n){this.hasResourceBundle(t,n)&&delete this.data[t][n],this.removeNamespaces(n),this.emit("removed",t,n)}hasResourceBundle(t,n){return this.getResource(t,n)!==void 0}getResourceBundle(t,n){return n||(n=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(t,n)}:this.getResource(t,n)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const n=this.getDataByLanguage(t);return!!(n&&Object.keys(n)||[]).find(s=>n[s]&&Object.keys(n[s]).length>0)}toJSON(){return this.data}}var kh={processors:{},addPostProcessor(e){this.processors[e.name]=e},handle(e,t,n,r,s){return e.forEach(a=>{this.processors[a]&&(t=this.processors[a].process(t,n,r,s))}),t}};const ud={};class Ri extends no{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),Q1(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Kn.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(t==null)return!1;const r=this.resolve(t,n);return r&&r.res!==void 0}extractFromKey(t,n){let r=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;r===void 0&&(r=":");const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let a=n.ns||this.options.defaultNS||[];const o=r&&t.indexOf(r)>-1,u=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!sv(t,r,s);if(o&&!u){const c=t.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:t,namespaces:Me(a)?[a]:a};const f=t.split(r);(r!==s||r===s&&this.options.ns.indexOf(f[0])>-1)&&(a=f.shift()),t=f.join(s)}return{key:t,namespaces:Me(a)?[a]:a}}translate(t,n,r){if(typeof n!="object"&&this.options.overloadTranslationOptionHandler&&(n=this.options.overloadTranslationOptionHandler(arguments)),typeof n=="object"&&(n={...n}),n||(n={}),t==null)return"";Array.isArray(t)||(t=[String(t)]);const s=n.returnDetails!==void 0?n.returnDetails:this.options.returnDetails,a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,{key:o,namespaces:u}=this.extractFromKey(t[t.length-1],n),c=u[u.length-1],f=n.lng||this.language,m=n.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(f&&f.toLowerCase()==="cimode"){if(m){const z=n.nsSeparator||this.options.nsSeparator;return s?{res:`${c}${z}${o}`,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:`${c}${z}${o}`}return s?{res:o,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:o}const b=this.resolve(t,n);let x=b&&b.res;const C=b&&b.usedKey||o,w=b&&b.exactUsedKey||o,N=Object.prototype.toString.apply(x),L=["[object Number]","[object Function]","[object RegExp]"],k=n.joinArrays!==void 0?n.joinArrays:this.options.joinArrays,v=!this.i18nFormat||this.i18nFormat.handleAsObject,E=!Me(x)&&typeof x!="boolean"&&typeof x!="number";if(v&&x&&E&&L.indexOf(N)<0&&!(Me(k)&&Array.isArray(x))){if(!n.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const z=this.options.returnedObjectHandler?this.options.returnedObjectHandler(C,x,{...n,ns:u}):`key '${o} (${this.language})' returned an object instead of string.`;return s?(b.res=z,b.usedParams=this.getUsedParamsDetails(n),b):z}if(a){const z=Array.isArray(x),M=z?[]:{},_=z?w:C;for(const D in x)if(Object.prototype.hasOwnProperty.call(x,D)){const Q=`${_}${a}${D}`;M[D]=this.translate(Q,{...n,joinArrays:!1,ns:u}),M[D]===Q&&(M[D]=x[D])}x=M}}else if(v&&Me(k)&&Array.isArray(x))x=x.join(k),x&&(x=this.extendTranslation(x,t,n,r));else{let z=!1,M=!1;const _=n.count!==void 0&&!Me(n.count),D=Ri.hasDefaultValue(n),Q=_?this.pluralResolver.getSuffix(f,n.count,n):"",Oe=n.ordinal&&_?this.pluralResolver.getSuffix(f,n.count,{ordinal:!1}):"",pe=_&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),Ke=pe&&n[`defaultValue${this.options.pluralSeparator}zero`]||n[`defaultValue${Q}`]||n[`defaultValue${Oe}`]||n.defaultValue;!this.isValidLookup(x)&&D&&(z=!0,x=Ke),this.isValidLookup(x)||(M=!0,x=o);const wt=(n.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&M?void 0:x,ht=D&&Ke!==x&&this.options.updateMissing;if(M||z||ht){if(this.logger.log(ht?"updateKey":"missingKey",f,c,o,ht?Ke:x),a){const K=this.resolve(o,{...n,keySeparator:!1});K&&K.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let ot=[];const Xe=this.languageUtils.getFallbackCodes(this.options.fallbackLng,n.lng||this.language);if(this.options.saveMissingTo==="fallback"&&Xe&&Xe[0])for(let K=0;K<Xe.length;K++)ot.push(Xe[K]);else this.options.saveMissingTo==="all"?ot=this.languageUtils.toResolveHierarchy(n.lng||this.language):ot.push(n.lng||this.language);const xt=(K,re,he)=>{const Ue=D&&he!==x?he:wt;this.options.missingKeyHandler?this.options.missingKeyHandler(K,c,re,Ue,ht,n):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(K,c,re,Ue,ht,n),this.emit("missingKey",K,c,re,x)};this.options.saveMissing&&(this.options.saveMissingPlurals&&_?ot.forEach(K=>{const re=this.pluralResolver.getSuffixes(K,n);pe&&n[`defaultValue${this.options.pluralSeparator}zero`]&&re.indexOf(`${this.options.pluralSeparator}zero`)<0&&re.push(`${this.options.pluralSeparator}zero`),re.forEach(he=>{xt([K],o+he,n[`defaultValue${he}`]||Ke)})}):xt(ot,o,Ke))}x=this.extendTranslation(x,t,n,b,r),M&&x===o&&this.options.appendNamespaceToMissingKey&&(x=`${c}:${o}`),(M||z)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?x=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}:${o}`:o,z?x:void 0):x=this.options.parseMissingKeyHandler(x))}return s?(b.res=x,b.usedParams=this.getUsedParamsDetails(n),b):x}extendTranslation(t,n,r,s,a){var o=this;if(this.i18nFormat&&this.i18nFormat.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...r},r.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!r.skipInterpolation){r.interpolation&&this.interpolator.init({...r,interpolation:{...this.options.interpolation,...r.interpolation}});const f=Me(t)&&(r&&r.interpolation&&r.interpolation.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let m;if(f){const x=t.match(this.interpolator.nestingRegexp);m=x&&x.length}let b=r.replace&&!Me(r.replace)?r.replace:r;if(this.options.interpolation.defaultVariables&&(b={...this.options.interpolation.defaultVariables,...b}),t=this.interpolator.interpolate(t,b,r.lng||this.language||s.usedLng,r),f){const x=t.match(this.interpolator.nestingRegexp),C=x&&x.length;m<C&&(r.nest=!1)}!r.lng&&this.options.compatibilityAPI!=="v1"&&s&&s.res&&(r.lng=this.language||s.usedLng),r.nest!==!1&&(t=this.interpolator.nest(t,function(){for(var x=arguments.length,C=new Array(x),w=0;w<x;w++)C[w]=arguments[w];return a&&a[0]===C[0]&&!r.context?(o.logger.warn(`It seems you are nesting recursively key: ${C[0]} in key: ${n[0]}`),null):o.translate(...C,n)},r)),r.interpolation&&this.interpolator.reset()}const u=r.postProcess||this.options.postProcess,c=Me(u)?[u]:u;return t!=null&&c&&c.length&&r.applyPostProcessor!==!1&&(t=kh.handle(c,t,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(r)},...r}:r,this)),t}resolve(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r,s,a,o,u;return Me(t)&&(t=[t]),t.forEach(c=>{if(this.isValidLookup(r))return;const f=this.extractFromKey(c,n),m=f.key;s=m;let b=f.namespaces;this.options.fallbackNS&&(b=b.concat(this.options.fallbackNS));const x=n.count!==void 0&&!Me(n.count),C=x&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),w=n.context!==void 0&&(Me(n.context)||typeof n.context=="number")&&n.context!=="",N=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);b.forEach(L=>{this.isValidLookup(r)||(u=L,!ud[`${N[0]}-${L}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(u)&&(ud[`${N[0]}-${L}`]=!0,this.logger.warn(`key "${s}" for languages "${N.join(", ")}" won't get resolved as namespace "${u}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),N.forEach(k=>{if(this.isValidLookup(r))return;o=k;const v=[m];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(v,m,k,L,n);else{let z;x&&(z=this.pluralResolver.getSuffix(k,n.count,n));const M=`${this.options.pluralSeparator}zero`,_=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(x&&(v.push(m+z),n.ordinal&&z.indexOf(_)===0&&v.push(m+z.replace(_,this.options.pluralSeparator)),C&&v.push(m+M)),w){const D=`${m}${this.options.contextSeparator}${n.context}`;v.push(D),x&&(v.push(D+z),n.ordinal&&z.indexOf(_)===0&&v.push(D+z.replace(_,this.options.pluralSeparator)),C&&v.push(D+M))}}let E;for(;E=v.pop();)this.isValidLookup(r)||(a=E,r=this.getResource(k,L,E,n))}))})}),{res:r,usedKey:s,exactUsedKey:a,usedLng:o,usedNS:u}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(t,n,r,s):this.resourceStore.getResource(t,n,r,s)}getUsedParamsDetails(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],r=t.replace&&!Me(t.replace);let s=r?t.replace:t;if(r&&typeof t.count<"u"&&(s.count=t.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!r){s={...s};for(const a of n)delete s[a]}return s}static hasDefaultValue(t){const n="defaultValue";for(const r in t)if(Object.prototype.hasOwnProperty.call(t,r)&&n===r.substring(0,n.length)&&t[r]!==void 0)return!0;return!1}}const Oo=e=>e.charAt(0).toUpperCase()+e.slice(1);class dd{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Kn.create("languageUtils")}getScriptPartFromCode(t){if(t=Ti(t),!t||t.indexOf("-")<0)return null;const n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(t){if(t=Ti(t),!t||t.indexOf("-")<0)return t;const n=t.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(t){if(Me(t)&&t.indexOf("-")>-1){if(typeof Intl<"u"&&typeof Intl.getCanonicalLocales<"u")try{let s=Intl.getCanonicalLocales(t)[0];if(s&&this.options.lowerCaseLng&&(s=s.toLowerCase()),s)return s}catch{}const n=["hans","hant","latn","cyrl","cans","mong","arab"];let r=t.split("-");return this.options.lowerCaseLng?r=r.map(s=>s.toLowerCase()):r.length===2?(r[0]=r[0].toLowerCase(),r[1]=r[1].toUpperCase(),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Oo(r[1].toLowerCase()))):r.length===3&&(r[0]=r[0].toLowerCase(),r[1].length===2&&(r[1]=r[1].toUpperCase()),r[0]!=="sgn"&&r[2].length===2&&(r[2]=r[2].toUpperCase()),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Oo(r[1].toLowerCase())),n.indexOf(r[2].toLowerCase())>-1&&(r[2]=Oo(r[2].toLowerCase()))),r.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let n;return t.forEach(r=>{if(n)return;const s=this.formatLanguageCode(r);(!this.options.supportedLngs||this.isSupportedCode(s))&&(n=s)}),!n&&this.options.supportedLngs&&t.forEach(r=>{if(n)return;const s=this.getLanguagePartFromCode(r);if(this.isSupportedCode(s))return n=s;n=this.options.supportedLngs.find(a=>{if(a===s)return a;if(!(a.indexOf("-")<0&&s.indexOf("-")<0)&&(a.indexOf("-")>0&&s.indexOf("-")<0&&a.substring(0,a.indexOf("-"))===s||a.indexOf(s)===0&&s.length>1))return a})}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),Me(t)&&(t=[t]),Array.isArray(t))return t;if(!n)return t.default||[];let r=t[n];return r||(r=t[this.getScriptPartFromCode(n)]),r||(r=t[this.formatLanguageCode(n)]),r||(r=t[this.getLanguagePartFromCode(n)]),r||(r=t.default),r||[]}toResolveHierarchy(t,n){const r=this.getFallbackCodes(n||this.options.fallbackLng||[],t),s=[],a=o=>{o&&(this.isSupportedCode(o)?s.push(o):this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`))};return Me(t)&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&a(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&a(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&a(this.getLanguagePartFromCode(t))):Me(t)&&a(this.formatLanguageCode(t)),r.forEach(o=>{s.indexOf(o)<0&&a(this.formatLanguageCode(o))}),s}}let iv=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],ov={1:e=>+(e>1),2:e=>+(e!=1),3:e=>0,4:e=>e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,5:e=>e==0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5,6:e=>e==1?0:e>=2&&e<=4?1:2,7:e=>e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,8:e=>e==1?0:e==2?1:e!=8&&e!=11?2:3,9:e=>+(e>=2),10:e=>e==1?0:e==2?1:e<7?2:e<11?3:4,11:e=>e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3,12:e=>+(e%10!=1||e%100==11),13:e=>+(e!==0),14:e=>e==1?0:e==2?1:e==3?2:3,15:e=>e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2,16:e=>e%10==1&&e%100!=11?0:e!==0?1:2,17:e=>e==1||e%10==1&&e%100!=11?0:1,18:e=>e==0?0:e==1?1:2,19:e=>e==1?0:e==0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3,20:e=>e==1?0:e==0||e%100>0&&e%100<20?1:2,21:e=>e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0,22:e=>e==1?0:e==2?1:(e<0||e>10)&&e%10==0?2:3};const lv=["v1","v2","v3"],cv=["v4"],fd={zero:0,one:1,two:2,few:3,many:4,other:5},uv=()=>{const e={};return iv.forEach(t=>{t.lngs.forEach(n=>{e[n]={numbers:t.nr,plurals:ov[t.fc]}})}),e};class dv{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=t,this.options=n,this.logger=Kn.create("pluralResolver"),(!this.options.compatibilityJSON||cv.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=uv(),this.pluralRulesCache={}}addRule(t,n){this.rules[t]=n}clearCache(){this.pluralRulesCache={}}getRule(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi()){const r=Ti(t==="dev"?"en":t),s=n.ordinal?"ordinal":"cardinal",a=JSON.stringify({cleanedCode:r,type:s});if(a in this.pluralRulesCache)return this.pluralRulesCache[a];let o;try{o=new Intl.PluralRules(r,{type:s})}catch{if(!t.match(/-|_/))return;const c=this.languageUtils.getLanguagePartFromCode(t);o=this.getRule(c,n)}return this.pluralRulesCache[a]=o,o}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}needsPlural(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return this.shouldUseIntlApi()?r&&r.resolvedOptions().pluralCategories.length>1:r&&r.numbers.length>1}getPluralFormsOfKey(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,r).map(s=>`${n}${s}`)}getSuffixes(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return r?this.shouldUseIntlApi()?r.resolvedOptions().pluralCategories.sort((s,a)=>fd[s]-fd[a]).map(s=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${s}`):r.numbers.map(s=>this.getSuffix(t,s,n)):[]}getSuffix(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=this.getRule(t,r);return s?this.shouldUseIntlApi()?`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s.select(n)}`:this.getSuffixRetroCompatible(s,n):(this.logger.warn(`no plural rule found for: ${t}`),"")}getSuffixRetroCompatible(t,n){const r=t.noAbs?t.plurals(n):t.plurals(Math.abs(n));let s=t.numbers[r];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(s===2?s="plural":s===1&&(s=""));const a=()=>this.options.prepend&&s.toString()?this.options.prepend+s.toString():s.toString();return this.options.compatibilityJSON==="v1"?s===1?"":typeof s=="number"?`_plural_${s.toString()}`:a():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?a():this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}shouldUseIntlApi(){return!lv.includes(this.options.compatibilityJSON)}}const pd=function(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,a=G1(e,t,n);return!a&&s&&Me(n)&&(a=Dl(e,n,r),a===void 0&&(a=Dl(t,n,r))),a},Ro=e=>e.replace(/\$/g,"$$$$");class fv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Kn.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||(n=>n),this.init(t)}init(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});const{escape:n,escapeValue:r,useRawValueToEscape:s,prefix:a,prefixEscaped:o,suffix:u,suffixEscaped:c,formatSeparator:f,unescapeSuffix:m,unescapePrefix:b,nestingPrefix:x,nestingPrefixEscaped:C,nestingSuffix:w,nestingSuffixEscaped:N,nestingOptionsSeparator:L,maxReplaces:k,alwaysFormat:v}=t.interpolation;this.escape=n!==void 0?n:ev,this.escapeValue=r!==void 0?r:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=a?Wr(a):o||"{{",this.suffix=u?Wr(u):c||"}}",this.formatSeparator=f||",",this.unescapePrefix=m?"":b||"-",this.unescapeSuffix=this.unescapePrefix?"":m||"",this.nestingPrefix=x?Wr(x):C||Wr("$t("),this.nestingSuffix=w?Wr(w):N||Wr(")"),this.nestingOptionsSeparator=L||",",this.maxReplaces=k||1e3,this.alwaysFormat=v!==void 0?v:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(n,r)=>n&&n.source===r?(n.lastIndex=0,n):new RegExp(r,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(t,n,r,s){let a,o,u;const c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},f=C=>{if(C.indexOf(this.formatSeparator)<0){const k=pd(n,c,C,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(k,void 0,r,{...s,...n,interpolationkey:C}):k}const w=C.split(this.formatSeparator),N=w.shift().trim(),L=w.join(this.formatSeparator).trim();return this.format(pd(n,c,N,this.options.keySeparator,this.options.ignoreJSONStructure),L,r,{...s,...n,interpolationkey:N})};this.resetRegExp();const m=s&&s.missingInterpolationHandler||this.options.missingInterpolationHandler,b=s&&s.interpolation&&s.interpolation.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:C=>Ro(C)},{regex:this.regexp,safeValue:C=>this.escapeValue?Ro(this.escape(C)):Ro(C)}].forEach(C=>{for(u=0;a=C.regex.exec(t);){const w=a[1].trim();if(o=f(w),o===void 0)if(typeof m=="function"){const L=m(t,a,s);o=Me(L)?L:""}else if(s&&Object.prototype.hasOwnProperty.call(s,w))o="";else if(b){o=a[0];continue}else this.logger.warn(`missed to pass in variable ${w} for interpolating ${t}`),o="";else!Me(o)&&!this.useRawValueToEscape&&(o=ad(o));const N=C.safeValue(o);if(t=t.replace(a[0],N),b?(C.regex.lastIndex+=o.length,C.regex.lastIndex-=a[0].length):C.regex.lastIndex=0,u++,u>=this.maxReplaces)break}}),t}nest(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s,a,o;const u=(c,f)=>{const m=this.nestingOptionsSeparator;if(c.indexOf(m)<0)return c;const b=c.split(new RegExp(`${m}[ ]*{`));let x=`{${b[1]}`;c=b[0],x=this.interpolate(x,o);const C=x.match(/'/g),w=x.match(/"/g);(C&&C.length%2===0&&!w||w.length%2!==0)&&(x=x.replace(/'/g,'"'));try{o=JSON.parse(x),f&&(o={...f,...o})}catch(N){return this.logger.warn(`failed parsing options string in nesting for key ${c}`,N),`${c}${m}${x}`}return o.defaultValue&&o.defaultValue.indexOf(this.prefix)>-1&&delete o.defaultValue,c};for(;s=this.nestingRegexp.exec(t);){let c=[];o={...r},o=o.replace&&!Me(o.replace)?o.replace:o,o.applyPostProcessor=!1,delete o.defaultValue;let f=!1;if(s[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(s[1])){const m=s[1].split(this.formatSeparator).map(b=>b.trim());s[1]=m.shift(),c=m,f=!0}if(a=n(u.call(this,s[1].trim(),o),o),a&&s[0]===t&&!Me(a))return a;Me(a)||(a=ad(a)),a||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),a=""),f&&(a=c.reduce((m,b)=>this.format(m,b,r.lng,{...r,interpolationkey:s[1].trim()}),a.trim())),t=t.replace(s[0],a),this.regexp.lastIndex=0}return t}}const pv=e=>{let t=e.toLowerCase().trim();const n={};if(e.indexOf("(")>-1){const r=e.split("(");t=r[0].toLowerCase().trim();const s=r[1].substring(0,r[1].length-1);t==="currency"&&s.indexOf(":")<0?n.currency||(n.currency=s.trim()):t==="relativetime"&&s.indexOf(":")<0?n.range||(n.range=s.trim()):s.split(";").forEach(o=>{if(o){const[u,...c]=o.split(":"),f=c.join(":").trim().replace(/^'+|'+$/g,""),m=u.trim();n[m]||(n[m]=f),f==="false"&&(n[m]=!1),f==="true"&&(n[m]=!0),isNaN(f)||(n[m]=parseInt(f,10))}})}return{formatName:t,formatOptions:n}},Yr=e=>{const t={};return(n,r,s)=>{let a=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(a={...a,[s.interpolationkey]:void 0});const o=r+JSON.stringify(a);let u=t[o];return u||(u=e(Ti(r),s),t[o]=u),u(n)}};class hv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Kn.create("formatter"),this.options=t,this.formats={number:Yr((n,r)=>{const s=new Intl.NumberFormat(n,{...r});return a=>s.format(a)}),currency:Yr((n,r)=>{const s=new Intl.NumberFormat(n,{...r,style:"currency"});return a=>s.format(a)}),datetime:Yr((n,r)=>{const s=new Intl.DateTimeFormat(n,{...r});return a=>s.format(a)}),relativetime:Yr((n,r)=>{const s=new Intl.RelativeTimeFormat(n,{...r});return a=>s.format(a,r.range||"day")}),list:Yr((n,r)=>{const s=new Intl.ListFormat(n,{...r});return a=>s.format(a)})},this.init(t)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};this.formatSeparator=n.interpolation.formatSeparator||","}add(t,n){this.formats[t.toLowerCase().trim()]=n}addCached(t,n){this.formats[t.toLowerCase().trim()]=Yr(n)}format(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=n.split(this.formatSeparator);if(a.length>1&&a[0].indexOf("(")>1&&a[0].indexOf(")")<0&&a.find(u=>u.indexOf(")")>-1)){const u=a.findIndex(c=>c.indexOf(")")>-1);a[0]=[a[0],...a.splice(1,u)].join(this.formatSeparator)}return a.reduce((u,c)=>{const{formatName:f,formatOptions:m}=pv(c);if(this.formats[f]){let b=u;try{const x=s&&s.formatParams&&s.formatParams[s.interpolationkey]||{},C=x.locale||x.lng||s.locale||s.lng||r;b=this.formats[f](u,C,{...m,...s,...x})}catch(x){this.logger.warn(x)}return b}else this.logger.warn(`there was no format function for ${f}`);return u},t)}}const mv=(e,t)=>{e.pending[t]!==void 0&&(delete e.pending[t],e.pendingCount--)};class gv extends no{constructor(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=t,this.store=n,this.services=r,this.languageUtils=r.languageUtils,this.options=s,this.logger=Kn.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(r,s.backend,s)}queueLoad(t,n,r,s){const a={},o={},u={},c={};return t.forEach(f=>{let m=!0;n.forEach(b=>{const x=`${f}|${b}`;!r.reload&&this.store.hasResourceBundle(f,b)?this.state[x]=2:this.state[x]<0||(this.state[x]===1?o[x]===void 0&&(o[x]=!0):(this.state[x]=1,m=!1,o[x]===void 0&&(o[x]=!0),a[x]===void 0&&(a[x]=!0),c[b]===void 0&&(c[b]=!0)))}),m||(u[f]=!0)}),(Object.keys(a).length||Object.keys(o).length)&&this.queue.push({pending:o,pendingCount:Object.keys(o).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(a),pending:Object.keys(o),toLoadLanguages:Object.keys(u),toLoadNamespaces:Object.keys(c)}}loaded(t,n,r){const s=t.split("|"),a=s[0],o=s[1];n&&this.emit("failedLoading",a,o,n),!n&&r&&this.store.addResourceBundle(a,o,r,void 0,void 0,{skipCopy:!0}),this.state[t]=n?-1:2,n&&r&&(this.state[t]=0);const u={};this.queue.forEach(c=>{X1(c.loaded,[a],o),mv(c,t),n&&c.errors.push(n),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(f=>{u[f]||(u[f]={});const m=c.loaded[f];m.length&&m.forEach(b=>{u[f][b]===void 0&&(u[f][b]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",u),this.queue=this.queue.filter(c=>!c.done)}read(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,o=arguments.length>5?arguments[5]:void 0;if(!t.length)return o(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:n,fcName:r,tried:s,wait:a,callback:o});return}this.readingCalls++;const u=(f,m)=>{if(this.readingCalls--,this.waitingReads.length>0){const b=this.waitingReads.shift();this.read(b.lng,b.ns,b.fcName,b.tried,b.wait,b.callback)}if(f&&m&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,t,n,r,s+1,a*2,o)},a);return}o(f,m)},c=this.backend[r].bind(this.backend);if(c.length===2){try{const f=c(t,n);f&&typeof f.then=="function"?f.then(m=>u(null,m)).catch(u):u(null,f)}catch(f){u(f)}return}return c(t,n,u)}prepareLoading(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();Me(t)&&(t=this.languageUtils.toResolveHierarchy(t)),Me(n)&&(n=[n]);const a=this.queueLoad(t,n,r,s);if(!a.toLoad.length)return a.pending.length||s(),null;a.toLoad.forEach(o=>{this.loadOne(o)})}load(t,n,r){this.prepareLoading(t,n,{},r)}reload(t,n,r){this.prepareLoading(t,n,{reload:!0},r)}loadOne(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const r=t.split("|"),s=r[0],a=r[1];this.read(s,a,"read",void 0,void 0,(o,u)=>{o&&this.logger.warn(`${n}loading namespace ${a} for language ${s} failed`,o),!o&&u&&this.logger.log(`${n}loaded namespace ${a} for language ${s}`,u),this.loaded(t,o,u)})}saveMissing(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(n)){this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(r==null||r==="")){if(this.backend&&this.backend.create){const c={...o,isUpdate:a},f=this.backend.create.bind(this.backend);if(f.length<6)try{let m;f.length===5?m=f(t,n,r,s,c):m=f(t,n,r,s),m&&typeof m.then=="function"?m.then(b=>u(null,b)).catch(u):u(null,m)}catch(m){u(m)}else f(t,n,r,s,u,c)}!t||!t[0]||this.store.addResource(t[0],n,r,s)}}}const hd=()=>({debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:e=>{let t={};if(typeof e[1]=="object"&&(t=e[1]),Me(e[1])&&(t.defaultValue=e[1]),Me(e[2])&&(t.tDescription=e[2]),typeof e[2]=="object"||typeof e[3]=="object"){const n=e[3]||e[2];Object.keys(n).forEach(r=>{t[r]=n[r]})}return t},interpolation:{escapeValue:!0,format:e=>e,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}),md=e=>(Me(e.ns)&&(e.ns=[e.ns]),Me(e.fallbackLng)&&(e.fallbackLng=[e.fallbackLng]),Me(e.fallbackNS)&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&e.supportedLngs.indexOf("cimode")<0&&(e.supportedLngs=e.supportedLngs.concat(["cimode"])),e),Va=()=>{},xv=e=>{Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(n=>{typeof e[n]=="function"&&(e[n]=e[n].bind(e))})};class ga extends no{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(super(),this.options=md(t),this.services={},this.logger=Kn,this.modules={external:[]},xv(this),n&&!this.isInitialized&&!t.isClone){if(!this.options.initImmediate)return this.init(t,n),this;setTimeout(()=>{this.init(t,n)},0)}}init(){var t=this;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof n=="function"&&(r=n,n={}),!n.defaultNS&&n.defaultNS!==!1&&n.ns&&(Me(n.ns)?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const s=hd();this.options={...s,...this.options,...md(n)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...s.interpolation,...this.options.interpolation}),n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator);const a=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?Kn.init(a(this.modules.logger),this.options):Kn.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:typeof Intl<"u"&&(m=hv);const b=new dd(this.options);this.store=new cd(this.options.resources,this.options);const x=this.services;x.logger=Kn,x.resourceStore=this.store,x.languageUtils=b,x.pluralResolver=new dv(b,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),m&&(!this.options.interpolation.format||this.options.interpolation.format===s.interpolation.format)&&(x.formatter=a(m),x.formatter.init(x,this.options),this.options.interpolation.format=x.formatter.format.bind(x.formatter)),x.interpolator=new fv(this.options),x.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},x.backendConnector=new gv(a(this.modules.backend),x.resourceStore,x,this.options),x.backendConnector.on("*",function(C){for(var w=arguments.length,N=new Array(w>1?w-1:0),L=1;L<w;L++)N[L-1]=arguments[L];t.emit(C,...N)}),this.modules.languageDetector&&(x.languageDetector=a(this.modules.languageDetector),x.languageDetector.init&&x.languageDetector.init(x,this.options.detection,this.options)),this.modules.i18nFormat&&(x.i18nFormat=a(this.modules.i18nFormat),x.i18nFormat.init&&x.i18nFormat.init(this)),this.translator=new Ri(this.services,this.options),this.translator.on("*",function(C){for(var w=arguments.length,N=new Array(w>1?w-1:0),L=1;L<w;L++)N[L-1]=arguments[L];t.emit(C,...N)}),this.modules.external.forEach(C=>{C.init&&C.init(this)})}if(this.format=this.options.interpolation.format,r||(r=Va),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=function(){return t.store[m](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=function(){return t.store[m](...arguments),t}});const c=Ts(),f=()=>{const m=(b,x)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),c.resolve(x),r(b,x)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initImmediate?f():setTimeout(f,0),c}loadResources(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Va;const s=Me(t)?t:this.language;if(typeof t=="function"&&(r=t),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return r();const a=[],o=u=>{if(!u||u==="cimode")return;this.services.languageUtils.toResolveHierarchy(u).forEach(f=>{f!=="cimode"&&a.indexOf(f)<0&&a.push(f)})};s?o(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(c=>o(c)),this.options.preload&&this.options.preload.forEach(u=>o(u)),this.services.backendConnector.load(a,this.options.ns,u=>{!u&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),r(u)})}else r(null)}reloadResources(t,n,r){const s=Ts();return typeof t=="function"&&(r=t,t=void 0),typeof n=="function"&&(r=n,n=void 0),t||(t=this.languages),n||(n=this.options.ns),r||(r=Va),this.services.backendConnector.reload(t,n,a=>{s.resolve(),r(a)}),s}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&kh.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1))for(let n=0;n<this.languages.length;n++){const r=this.languages[n];if(!(["cimode","dev"].indexOf(r)>-1)&&this.store.hasLanguageSomeTranslations(r)){this.resolvedLanguage=r;break}}}changeLanguage(t,n){var r=this;this.isLanguageChangingTo=t;const s=Ts();this.emit("languageChanging",t);const a=c=>{this.language=c,this.languages=this.services.languageUtils.toResolveHierarchy(c),this.resolvedLanguage=void 0,this.setResolvedLanguage(c)},o=(c,f)=>{f?(a(f),this.translator.changeLanguage(f),this.isLanguageChangingTo=void 0,this.emit("languageChanged",f),this.logger.log("languageChanged",f)):this.isLanguageChangingTo=void 0,s.resolve(function(){return r.t(...arguments)}),n&&n(c,function(){return r.t(...arguments)})},u=c=>{!t&&!c&&this.services.languageDetector&&(c=[]);const f=Me(c)?c:this.services.languageUtils.getBestMatchFromCodes(c);f&&(this.language||a(f),this.translator.language||this.translator.changeLanguage(f),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(f)),this.loadResources(f,m=>{o(m,f)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(t),s}getFixedT(t,n,r){var s=this;const a=function(o,u){let c;if(typeof u!="object"){for(var f=arguments.length,m=new Array(f>2?f-2:0),b=2;b<f;b++)m[b-2]=arguments[b];c=s.options.overloadTranslationOptionHandler([o,u].concat(m))}else c={...u};c.lng=c.lng||a.lng,c.lngs=c.lngs||a.lngs,c.ns=c.ns||a.ns,c.keyPrefix!==""&&(c.keyPrefix=c.keyPrefix||r||a.keyPrefix);const x=s.options.keySeparator||".";let C;return c.keyPrefix&&Array.isArray(o)?C=o.map(w=>`${c.keyPrefix}${x}${w}`):C=c.keyPrefix?`${c.keyPrefix}${x}${o}`:o,s.t(C,c)};return Me(t)?a.lng=t:a.lngs=t,a.ns=n,a.keyPrefix=r,a}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const r=n.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,a=this.languages[this.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(u,c)=>{const f=this.services.backendConnector.state[`${u}|${c}`];return f===-1||f===0||f===2};if(n.precheck){const u=n.precheck(this,o);if(u!==void 0)return u}return!!(this.hasResourceBundle(r,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||o(r,t)&&(!s||o(a,t)))}loadNamespaces(t,n){const r=Ts();return this.options.ns?(Me(t)&&(t=[t]),t.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{r.resolve(),n&&n(s)}),r):(n&&n(),Promise.resolve())}loadLanguages(t,n){const r=Ts();Me(t)&&(t=[t]);const s=this.options.preload||[],a=t.filter(o=>s.indexOf(o)<0&&this.services.languageUtils.isSupportedCode(o));return a.length?(this.options.preload=s.concat(a),this.loadResources(o=>{r.resolve(),n&&n(o)}),r):(n&&n(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!t)return"rtl";const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],r=this.services&&this.services.languageUtils||new dd(hd());return n.indexOf(r.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return new ga(t,n)}cloneInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Va;const r=t.forkResourceStore;r&&delete t.forkResourceStore;const s={...this.options,...t,isClone:!0},a=new ga(s);return(t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),["store","services","language"].forEach(u=>{a[u]=this[u]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},r&&(a.store=new cd(this.store.data,s),a.services.resourceStore=a.store),a.translator=new Ri(a.services,s),a.translator.on("*",function(u){for(var c=arguments.length,f=new Array(c>1?c-1:0),m=1;m<c;m++)f[m-1]=arguments[m];a.emit(u,...f)}),a.init(s,n),a.translator.options=s,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Yt=ga.createInstance();Yt.createInstance=ga.createInstance;Yt.createInstance;Yt.dir;Yt.init;Yt.loadResources;Yt.reloadResources;Yt.use;Yt.changeLanguage;Yt.getFixedT;Yt.t;Yt.exists;Yt.setDefaultNamespace;Yt.hasLoadedNamespace;Yt.loadNamespaces;Yt.loadLanguages;function vv(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function xa(e){"@babel/helpers - typeof";return xa=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},xa(e)}function yv(e,t){if(xa(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(xa(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function bv(e){var t=yv(e,"string");return xa(t)=="symbol"?t:t+""}function wv(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,bv(r.key),r)}}function kv(e,t,n){return t&&wv(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var jh=[],jv=jh.forEach,Sv=jh.slice;function Nv(e){return jv.call(Sv.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e}var gd=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,Cv=function(t,n,r){var s=r||{};s.path=s.path||"/";var a=encodeURIComponent(n),o="".concat(t,"=").concat(a);if(s.maxAge>0){var u=s.maxAge-0;if(Number.isNaN(u))throw new Error("maxAge should be a Number");o+="; Max-Age=".concat(Math.floor(u))}if(s.domain){if(!gd.test(s.domain))throw new TypeError("option domain is invalid");o+="; Domain=".concat(s.domain)}if(s.path){if(!gd.test(s.path))throw new TypeError("option path is invalid");o+="; Path=".concat(s.path)}if(s.expires){if(typeof s.expires.toUTCString!="function")throw new TypeError("option expires is invalid");o+="; Expires=".concat(s.expires.toUTCString())}if(s.httpOnly&&(o+="; HttpOnly"),s.secure&&(o+="; Secure"),s.sameSite){var c=typeof s.sameSite=="string"?s.sameSite.toLowerCase():s.sameSite;switch(c){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o},xd={create:function(t,n,r,s){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{path:"/",sameSite:"strict"};r&&(a.expires=new Date,a.expires.setTime(a.expires.getTime()+r*60*1e3)),s&&(a.domain=s),document.cookie=Cv(t,encodeURIComponent(n),a)},read:function(t){for(var n="".concat(t,"="),r=document.cookie.split(";"),s=0;s<r.length;s++){for(var a=r[s];a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(n)===0)return a.substring(n.length,a.length)}return null},remove:function(t){this.create(t,"",-1)}},Ev={name:"cookie",lookup:function(t){var n;if(t.lookupCookie&&typeof document<"u"){var r=xd.read(t.lookupCookie);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupCookie&&typeof document<"u"&&xd.create(n.lookupCookie,t,n.cookieMinutes,n.cookieDomain,n.cookieOptions)}},zv={name:"querystring",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.search;!window.location.search&&window.location.hash&&window.location.hash.indexOf("?")>-1&&(r=window.location.hash.substring(window.location.hash.indexOf("?")));for(var s=r.substring(1),a=s.split("&"),o=0;o<a.length;o++){var u=a[o].indexOf("=");if(u>0){var c=a[o].substring(0,u);c===t.lookupQuerystring&&(n=a[o].substring(u+1))}}}return n}},Os=null,vd=function(){if(Os!==null)return Os;try{Os=window!=="undefined"&&window.localStorage!==null;var t="i18next.translate.boo";window.localStorage.setItem(t,"foo"),window.localStorage.removeItem(t)}catch{Os=!1}return Os},Pv={name:"localStorage",lookup:function(t){var n;if(t.lookupLocalStorage&&vd()){var r=window.localStorage.getItem(t.lookupLocalStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupLocalStorage&&vd()&&window.localStorage.setItem(n.lookupLocalStorage,t)}},Rs=null,yd=function(){if(Rs!==null)return Rs;try{Rs=window!=="undefined"&&window.sessionStorage!==null;var t="i18next.translate.boo";window.sessionStorage.setItem(t,"foo"),window.sessionStorage.removeItem(t)}catch{Rs=!1}return Rs},Mv={name:"sessionStorage",lookup:function(t){var n;if(t.lookupSessionStorage&&yd()){var r=window.sessionStorage.getItem(t.lookupSessionStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupSessionStorage&&yd()&&window.sessionStorage.setItem(n.lookupSessionStorage,t)}},Iv={name:"navigator",lookup:function(t){var n=[];if(typeof navigator<"u"){if(navigator.languages)for(var r=0;r<navigator.languages.length;r++)n.push(navigator.languages[r]);navigator.userLanguage&&n.push(navigator.userLanguage),navigator.language&&n.push(navigator.language)}return n.length>0?n:void 0}},Lv={name:"htmlTag",lookup:function(t){var n,r=t.htmlTag||(typeof document<"u"?document.documentElement:null);return r&&typeof r.getAttribute=="function"&&(n=r.getAttribute("lang")),n}},Tv={name:"path",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(r instanceof Array)if(typeof t.lookupFromPathIndex=="number"){if(typeof r[t.lookupFromPathIndex]!="string")return;n=r[t.lookupFromPathIndex].replace("/","")}else n=r[0].replace("/","")}return n}},Ov={name:"subdomain",lookup:function(t){var n=typeof t.lookupFromSubdomainIndex=="number"?t.lookupFromSubdomainIndex+1:1,r=typeof window<"u"&&window.location&&window.location.hostname&&window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);if(r)return r[n]}},Sh=!1;try{document.cookie,Sh=!0}catch{}var Nh=["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"];Sh||Nh.splice(1,1);function Rv(){return{order:Nh,lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"],convertDetectedLanguage:function(t){return t}}}var Ch=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};vv(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return kv(e,[{key:"init",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.services=n||{languageUtils:{}},this.options=Nv(r,this.options||{},Rv()),typeof this.options.convertDetectedLanguage=="string"&&this.options.convertDetectedLanguage.indexOf("15897")>-1&&(this.options.convertDetectedLanguage=function(a){return a.replace("-","_")}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=s,this.addDetector(Ev),this.addDetector(zv),this.addDetector(Pv),this.addDetector(Mv),this.addDetector(Iv),this.addDetector(Lv),this.addDetector(Tv),this.addDetector(Ov)}},{key:"addDetector",value:function(n){return this.detectors[n.name]=n,this}},{key:"detect",value:function(n){var r=this;n||(n=this.options.order);var s=[];return n.forEach(function(a){if(r.detectors[a]){var o=r.detectors[a].lookup(r.options);o&&typeof o=="string"&&(o=[o]),o&&(s=s.concat(o))}}),s=s.map(function(a){return r.options.convertDetectedLanguage(a)}),this.services.languageUtils.getBestMatchFromCodes?s:s.length>0?s[0]:null}},{key:"cacheUserLanguage",value:function(n,r){var s=this;r||(r=this.options.caches),r&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(n)>-1||r.forEach(function(a){s.detectors[a]&&s.detectors[a].cacheUserLanguage(n,s.options)}))}}])}();Ch.type="languageDetector";const _v={"app.name":"Hotline Modern","auth.connecting":"Connecting...","auth.authenticating":"Authenticating...","auth.connectionFailed":"Connection failed","auth.invalidSignature":"Invalid signature","connect.title":"Connect to Server","connect.serverAddress":"Server address","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Nickname","connect.nicknamePlaceholder":"Your nickname","connect.button":"Connect","connect.connecting":"Connecting...","sidebar.channels":"Channels","sidebar.createChannel":"Create channel","sidebar.disconnect":"Disconnect","sidebar.users":"Users","chat.placeholder":"Type a message...","chat.send":"Send","chat.noMessages":"No messages yet. Say hello!","chat.today":"Today","chat.yesterday":"Yesterday","chat.history":"Message history","channel.create":"Create Channel","channel.name":"Channel name","channel.topic":"Topic","channel.cancel":"Cancel","channel.submit":"Create","channel.password":"Password (optional)","channel.passwordPlaceholder":"Leave empty for public channel","users.online":"{{count}} user online","users.online_other":"{{count}} users online","users.title":"Users","files.title":"Files","files.upload":"Upload","files.download":"Download","files.empty":"No files","files.parentDir":"Parent directory","roles.admin":"Admin","roles.operator":"Operator","roles.member":"Member","roles.guest":"Guest","settings.title":"Settings","settings.language":"Language","settings.theme":"Theme","server.motd":"Message of the Day","error.disconnected":"Disconnected from server","error.reconnecting":"Reconnecting...","error.permissionDenied":"Permission denied","sidebar.directMessages":"Direct Messages","sidebar.deleteChannel":"Delete channel","chat.typing":"{{name}} is typing...","chat.typingMultiple":"{{count}} people are typing...","chat.dmPlaceholder":"Message {{name}}...","users.sendDM":"Send message","chat.edited":"(edited)","chat.replyingTo":"Replying to","search.title":"Search messages","search.placeholder":"Search messages...","search.allChannels":"All channels","search.noResults":"No results found","connection.reconnecting":"Reconnecting in {{seconds}}s...","connection.connecting":"Connecting...","connection.authenticating":"Authenticating...","notif.muteSound":"Mute sounds","notif.unmuteSound":"Unmute sounds","notif.muteDesktop":"Mute notifications","notif.unmuteDesktop":"Unmute notifications","status.available":"Available","status.away":"Away","status.busy":"Busy","chat.loadingHistory":"Loading older messages...","chat.historyStart":"Beginning of conversation","files.dropHere":"Drop file to upload","files.uploading":"Uploading...","chat.searchEmoji":"Search emoji...","emoji.smileys":"Smileys","emoji.gestures":"Gestures","emoji.symbols":"Symbols","emoji.objects":"Objects","pins.title":"Pinned Messages","pins.empty":"No pinned messages","pins.unpin":"Unpin","bookmarks.title":"Bookmarks","bookmarks.empty":"No bookmarks yet","bookmarks.remove":"Remove bookmark","channelSettings.title":"Channel Settings","channelSettings.members":"members","channelSettings.passwordProtected":"Password protected","channelSettings.topicPlaceholder":"Set a topic for this channel...","channelSettings.noTopic":"No topic set","channelSettings.save":"Save","channelSettings.close":"Close","profile.copyId":"Copy public key","profile.promote":"Promote to Operator","profile.demote":"Demote to Member","profile.kick":"Kick","profile.ban":"Ban","shortcuts.title":"Keyboard Shortcuts","shortcuts.search":"Search messages","shortcuts.bold":"Bold text","shortcuts.italic":"Italic text","shortcuts.close":"Close panel / Cancel","shortcuts.send":"Send message","shortcuts.newline":"New line","shortcuts.mention":"Mention a user","shortcuts.showHelp":"Show this help","admin.title":"Administration","admin.settings":"Settings","admin.bans":"Ban List","admin.serverName":"Server Name","admin.motd":"Message of the Day","admin.save":"Save Changes","admin.saved":"Saved!","admin.banInfo":"Banned users cannot reconnect to this server.","admin.noBans":"No banned users","sidebar.mute":"Mute channel","sidebar.unmute":"Unmute channel","channel.passwordRequired":"Password Required","channel.passwordDesc":"#{{channel}} is password protected","channel.passwordPlaceholderJoin":"Enter channel password","ctx.reply":"Reply","ctx.react":"Add Reaction","ctx.copy":"Copy Text","ctx.quote":"Quote","ctx.bookmark":"Bookmark","ctx.edit":"Edit Message","ctx.pin":"Pin Message","ctx.delete":"Delete Message","lightbox.zoomIn":"Zoom in","lightbox.zoomOut":"Zoom out","lightbox.rotate":"Rotate","lightbox.download":"Download","chat.newMessages":"New messages","connect.recentServers":"Recent servers","connect.quickConnect":"Quick connect","connect.removeFavorite":"Remove","voice.record":"Record voice message","voice.stop":"Stop recording","voice.send":"Send voice message","voice.cancel":"Cancel","thread.title":"Thread","thread.reply":"reply","thread.replies":"replies","theme.title":"Theme Editor","theme.save":"Save","theme.saved":"Saved!","theme.reset":"Reset to defaults","theme.namePlaceholder":"Theme name...","theme.saved_themes":"Saved themes","stats.title":"Server Statistics","stats.totalMessages":"Total messages","stats.onlineUsers":"Online users","stats.channels":"Channels","stats.lastHour":"Last hour","stats.activity24h":"Activity (24h)","stats.topContributors":"Top contributors","stats.topChannels":"Top channels","forward.title":"Forward Message","forward.sendTo":"Send to channel","forward.commentPlaceholder":"Add a comment (optional)...","forward.cancel":"Cancel","forward.send":"Forward","forward.sent":"Message forwarded","e2e.label":"E2E","e2e.encrypted":"End-to-end encrypted","e2e.notEncrypted":"Not encrypted","e2e.title":"End-to-End Encryption","e2e.description":"Messages are encrypted with Ed25519 keys. Only you and the recipient can read them.","e2e.yourKey":"Your key","e2e.peerKey":"Peer key","customEmoji.title":"Custom Emojis","customEmoji.selectImage":"Select image","customEmoji.namePlaceholder":"emoji_name","customEmoji.upload":"Upload","customEmoji.hint":"PNG, GIF or WebP. Max 256KB.","customEmoji.existing":"Custom emojis","notifFilters.title":"Notification Filters","notifFilters.onlyMentions":"Mentions only","notifFilters.onlyMentionsDesc":"Only notify when you're @mentioned or keywords match","notifFilters.quietHours":"Quiet hours","notifFilters.quietHoursDesc":"Mute all notifications during set hours","notifFilters.keywords":"Alert keywords","notifFilters.keywordPlaceholder":"Add a keyword...","notifFilters.mutedChannels":"Muted channels","notifFilters.mutedUsers":"Muted users","scheduler.title":"Schedule Messages","scheduler.placeholder":"Type your scheduled message...","scheduler.schedule":"Schedule","scheduler.pending":"Scheduled","scheduler.otherChannels":"Other channels"},Dv={"app.name":"Hotline Modern","auth.connecting":"Connexion...","auth.authenticating":"Authentification...","auth.connectionFailed":"Échec de la connexion","auth.invalidSignature":"Signature invalide","connect.title":"Se connecter au serveur","connect.serverAddress":"Adresse du serveur","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Pseudo","connect.nicknamePlaceholder":"Votre pseudo","connect.button":"Connexion","connect.connecting":"Connexion...","sidebar.channels":"Salons","sidebar.createChannel":"Créer un salon","sidebar.disconnect":"Déconnexion","sidebar.users":"Utilisateurs","chat.placeholder":"Écrire un message...","chat.send":"Envoyer","chat.noMessages":"Aucun message. Dites bonjour !","chat.today":"Aujourd'hui","chat.yesterday":"Hier","chat.history":"Historique des messages","channel.create":"Créer un salon","channel.name":"Nom du salon","channel.topic":"Sujet","channel.cancel":"Annuler","channel.submit":"Créer","channel.password":"Mot de passe (optionnel)","channel.passwordPlaceholder":"Laisser vide pour un salon public","users.online":"{{count}} utilisateur en ligne","users.online_other":"{{count}} utilisateurs en ligne","users.title":"Utilisateurs","files.title":"Fichiers","files.upload":"Téléverser","files.download":"Télécharger","files.empty":"Aucun fichier","files.parentDir":"Dossier parent","roles.admin":"Admin","roles.operator":"Opérateur","roles.member":"Membre","roles.guest":"Invité","settings.title":"Paramètres","settings.language":"Langue","settings.theme":"Thème","server.motd":"Message du jour","error.disconnected":"Déconnecté du serveur","error.reconnecting":"Reconnexion...","error.permissionDenied":"Permission refusée","sidebar.directMessages":"Messages privés","sidebar.deleteChannel":"Supprimer le salon","chat.typing":"{{name}} écrit...","chat.typingMultiple":"{{count}} personnes écrivent...","chat.dmPlaceholder":"Message à {{name}}...","users.sendDM":"Envoyer un message","chat.edited":"(modifié)","chat.replyingTo":"En réponse à","search.title":"Rechercher des messages","search.placeholder":"Rechercher...","search.allChannels":"Tous les salons","search.noResults":"Aucun résultat","connection.reconnecting":"Reconnexion dans {{seconds}}s...","connection.connecting":"Connexion...","connection.authenticating":"Authentification...","notif.muteSound":"Couper les sons","notif.unmuteSound":"Activer les sons","notif.muteDesktop":"Couper les notifications","notif.unmuteDesktop":"Activer les notifications","status.available":"Disponible","status.away":"Absent","status.busy":"Occupé","chat.loadingHistory":"Chargement des anciens messages...","chat.historyStart":"Début de la conversation","files.dropHere":"Déposer le fichier pour téléverser","files.uploading":"Téléversement...","chat.searchEmoji":"Chercher un emoji...","emoji.smileys":"Visages","emoji.gestures":"Gestes","emoji.symbols":"Symboles","emoji.objects":"Objets","pins.title":"Messages épinglés","pins.empty":"Aucun message épinglé","pins.unpin":"Désépingler","bookmarks.title":"Favoris","bookmarks.empty":"Aucun favori","bookmarks.remove":"Retirer le favori","channelSettings.title":"Paramètres du salon","channelSettings.members":"membres","channelSettings.passwordProtected":"Protégé par mot de passe","channelSettings.topicPlaceholder":"Définir un sujet pour ce salon...","channelSettings.noTopic":"Aucun sujet défini","channelSettings.save":"Enregistrer","channelSettings.close":"Fermer","profile.copyId":"Copier la clé publique","profile.promote":"Promouvoir opérateur","profile.demote":"Rétrograder membre","profile.kick":"Expulser","profile.ban":"Bannir","shortcuts.title":"Raccourcis clavier","shortcuts.search":"Rechercher des messages","shortcuts.bold":"Texte en gras","shortcuts.italic":"Texte en italique","shortcuts.close":"Fermer / Annuler","shortcuts.send":"Envoyer le message","shortcuts.newline":"Nouvelle ligne","shortcuts.mention":"Mentionner un utilisateur","shortcuts.showHelp":"Afficher cette aide","admin.title":"Administration","admin.settings":"Paramètres","admin.bans":"Liste des bannis","admin.serverName":"Nom du serveur","admin.motd":"Message du jour","admin.save":"Enregistrer","admin.saved":"Enregistré !","admin.banInfo":"Les utilisateurs bannis ne peuvent pas se reconnecter.","admin.noBans":"Aucun utilisateur banni","sidebar.mute":"Couper les notifications","sidebar.unmute":"Activer les notifications","channel.passwordRequired":"Mot de passe requis","channel.passwordDesc":"#{{channel}} est protégé par mot de passe","channel.passwordPlaceholderJoin":"Entrer le mot de passe","ctx.reply":"Répondre","ctx.react":"Ajouter une réaction","ctx.copy":"Copier le texte","ctx.quote":"Citer","ctx.bookmark":"Ajouter un favori","ctx.edit":"Modifier le message","ctx.pin":"Épingler le message","ctx.delete":"Supprimer le message","lightbox.zoomIn":"Zoom avant","lightbox.zoomOut":"Zoom arrière","lightbox.rotate":"Pivoter","lightbox.download":"Télécharger","chat.newMessages":"Nouveaux messages","connect.recentServers":"Serveurs récents","connect.quickConnect":"Connexion rapide","connect.removeFavorite":"Supprimer","voice.record":"Enregistrer un message vocal","voice.stop":"Arrêter","voice.send":"Envoyer le message vocal","voice.cancel":"Annuler","thread.title":"Fil de discussion","thread.reply":"réponse","thread.replies":"réponses","theme.title":"Éditeur de thème","theme.save":"Enregistrer","theme.saved":"Enregistré !","theme.reset":"Réinitialiser","theme.namePlaceholder":"Nom du thème...","theme.saved_themes":"Thèmes sauvegardés","stats.title":"Statistiques du serveur","stats.totalMessages":"Total messages","stats.onlineUsers":"Utilisateurs en ligne","stats.channels":"Salons","stats.lastHour":"Dernière heure","stats.activity24h":"Activité (24h)","stats.topContributors":"Top contributeurs","stats.topChannels":"Top salons","forward.title":"Transférer le message","forward.sendTo":"Envoyer vers le salon","forward.commentPlaceholder":"Ajouter un commentaire (optionnel)...","forward.cancel":"Annuler","forward.send":"Transférer","forward.sent":"Message transféré","e2e.label":"E2E","e2e.encrypted":"Chiffrement de bout en bout","e2e.notEncrypted":"Non chiffré","e2e.title":"Chiffrement de bout en bout","e2e.description":"Les messages sont chiffrés avec des clés Ed25519. Seuls vous et le destinataire pouvez les lire.","e2e.yourKey":"Votre clé","e2e.peerKey":"Clé du pair","customEmoji.title":"Emojis personnalisés","customEmoji.selectImage":"Choisir une image","customEmoji.namePlaceholder":"nom_emoji","customEmoji.upload":"Ajouter","customEmoji.hint":"PNG, GIF ou WebP. Max 256 Ko.","customEmoji.existing":"Emojis personnalisés","notifFilters.title":"Filtres de notifications","notifFilters.onlyMentions":"Mentions uniquement","notifFilters.onlyMentionsDesc":"Notifier uniquement quand vous êtes @mentionné ou un mot-clé correspond","notifFilters.quietHours":"Heures calmes","notifFilters.quietHoursDesc":"Couper toutes les notifications pendant les heures définies","notifFilters.keywords":"Mots-clés d'alerte","notifFilters.keywordPlaceholder":"Ajouter un mot-clé...","notifFilters.mutedChannels":"Salons coupés","notifFilters.mutedUsers":"Utilisateurs coupés","scheduler.title":"Programmer des messages","scheduler.placeholder":"Tapez votre message programmé...","scheduler.schedule":"Programmer","scheduler.pending":"Programmés","scheduler.otherChannels":"Autres salons"};Yt.use(Ch).use(xx).init({resources:{en:{translation:_v},fr:{translation:Dv}},fallbackLng:"en",interpolation:{escapeValue:!1},detection:{order:["localStorage","navigator"],lookupLocalStorage:"hotline-language",caches:["localStorage"]}});_o.createRoot(document.getElementById("root")).render(i.jsx(Yh.StrictMode,{children:i.jsx(J1,{})}));
