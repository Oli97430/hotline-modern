var Ah=Object.defineProperty;var Uh=(e,t,n)=>t in e?Ah(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Wc=(e,t,n)=>Uh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();var $h=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function zd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Fh(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var s=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,s.get?s:{enumerable:!0,get:function(){return e[r]}})}),n}var Pd={exports:{}},Oi={},Id={exports:{}},Fe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xa=Symbol.for("react.element"),Bh=Symbol.for("react.portal"),Hh=Symbol.for("react.fragment"),Vh=Symbol.for("react.strict_mode"),Kh=Symbol.for("react.profiler"),Wh=Symbol.for("react.provider"),Yh=Symbol.for("react.context"),Jh=Symbol.for("react.forward_ref"),Qh=Symbol.for("react.suspense"),qh=Symbol.for("react.memo"),Xh=Symbol.for("react.lazy"),Yc=Symbol.iterator;function Gh(e){return e===null||typeof e!="object"?null:(e=Yc&&e[Yc]||e["@@iterator"],typeof e=="function"?e:null)}var Md={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ld=Object.assign,Td={};function ks(e,t,n){this.props=e,this.context=t,this.refs=Td,this.updater=n||Md}ks.prototype.isReactComponent={};ks.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ks.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Rd(){}Rd.prototype=ks.prototype;function Ul(e,t,n){this.props=e,this.context=t,this.refs=Td,this.updater=n||Md}var $l=Ul.prototype=new Rd;$l.constructor=Ul;Ld($l,ks.prototype);$l.isPureReactComponent=!0;var Jc=Array.isArray,Od=Object.prototype.hasOwnProperty,Fl={current:null},_d={key:!0,ref:!0,__self:!0,__source:!0};function Dd(e,t,n){var r,s={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Od.call(t,r)&&!_d.hasOwnProperty(r)&&(s[r]=t[r]);var u=arguments.length-2;if(u===1)s.children=n;else if(1<u){for(var c=Array(u),f=0;f<u;f++)c[f]=arguments[f+2];s.children=c}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)s[r]===void 0&&(s[r]=u[r]);return{$$typeof:xa,type:e,key:a,ref:o,props:s,_owner:Fl.current}}function Zh(e,t){return{$$typeof:xa,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Bl(e){return typeof e=="object"&&e!==null&&e.$$typeof===xa}function em(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Qc=/\/+/g;function ao(e,t){return typeof e=="object"&&e!==null&&e.key!=null?em(""+e.key):t.toString(36)}function Ka(e,t,n,r,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case xa:case Bh:o=!0}}if(o)return o=e,s=s(o),e=r===""?"."+ao(o,0):r,Jc(s)?(n="",e!=null&&(n=e.replace(Qc,"$&/")+"/"),Ka(s,t,n,"",function(f){return f})):s!=null&&(Bl(s)&&(s=Zh(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Qc,"$&/")+"/")+e)),t.push(s)),1;if(o=0,r=r===""?".":r+":",Jc(e))for(var u=0;u<e.length;u++){a=e[u];var c=r+ao(a,u);o+=Ka(a,t,n,c,s)}else if(c=Gh(e),typeof c=="function")for(e=c.call(e),u=0;!(a=e.next()).done;)a=a.value,c=r+ao(a,u++),o+=Ka(a,t,n,c,s);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Na(e,t,n){if(e==null)return e;var r=[],s=0;return Ka(e,r,"","",function(a){return t.call(n,a,s++)}),r}function tm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var en={current:null},Wa={transition:null},nm={ReactCurrentDispatcher:en,ReactCurrentBatchConfig:Wa,ReactCurrentOwner:Fl};function Ad(){throw Error("act(...) is not supported in production builds of React.")}Fe.Children={map:Na,forEach:function(e,t,n){Na(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Na(e,function(){t++}),t},toArray:function(e){return Na(e,function(t){return t})||[]},only:function(e){if(!Bl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Fe.Component=ks;Fe.Fragment=Hh;Fe.Profiler=Kh;Fe.PureComponent=Ul;Fe.StrictMode=Vh;Fe.Suspense=Qh;Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nm;Fe.act=Ad;Fe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ld({},e.props),s=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=Fl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(c in t)Od.call(t,c)&&!_d.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&u!==void 0?u[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){u=Array(c);for(var f=0;f<c;f++)u[f]=arguments[f+2];r.children=u}return{$$typeof:xa,type:e.type,key:s,ref:a,props:r,_owner:o}};Fe.createContext=function(e){return e={$$typeof:Yh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Wh,_context:e},e.Consumer=e};Fe.createElement=Dd;Fe.createFactory=function(e){var t=Dd.bind(null,e);return t.type=e,t};Fe.createRef=function(){return{current:null}};Fe.forwardRef=function(e){return{$$typeof:Jh,render:e}};Fe.isValidElement=Bl;Fe.lazy=function(e){return{$$typeof:Xh,_payload:{_status:-1,_result:e},_init:tm}};Fe.memo=function(e,t){return{$$typeof:qh,type:e,compare:t===void 0?null:t}};Fe.startTransition=function(e){var t=Wa.transition;Wa.transition={};try{e()}finally{Wa.transition=t}};Fe.unstable_act=Ad;Fe.useCallback=function(e,t){return en.current.useCallback(e,t)};Fe.useContext=function(e){return en.current.useContext(e)};Fe.useDebugValue=function(){};Fe.useDeferredValue=function(e){return en.current.useDeferredValue(e)};Fe.useEffect=function(e,t){return en.current.useEffect(e,t)};Fe.useId=function(){return en.current.useId()};Fe.useImperativeHandle=function(e,t,n){return en.current.useImperativeHandle(e,t,n)};Fe.useInsertionEffect=function(e,t){return en.current.useInsertionEffect(e,t)};Fe.useLayoutEffect=function(e,t){return en.current.useLayoutEffect(e,t)};Fe.useMemo=function(e,t){return en.current.useMemo(e,t)};Fe.useReducer=function(e,t,n){return en.current.useReducer(e,t,n)};Fe.useRef=function(e){return en.current.useRef(e)};Fe.useState=function(e){return en.current.useState(e)};Fe.useSyncExternalStore=function(e,t,n){return en.current.useSyncExternalStore(e,t,n)};Fe.useTransition=function(){return en.current.useTransition()};Fe.version="18.3.1";Id.exports=Fe;var y=Id.exports;const rm=zd(y);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sm=y,am=Symbol.for("react.element"),im=Symbol.for("react.fragment"),om=Object.prototype.hasOwnProperty,lm=sm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,cm={key:!0,ref:!0,__self:!0,__source:!0};function Ud(e,t,n){var r,s={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)om.call(t,r)&&!cm.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:am,type:e,key:a,ref:o,props:s,_owner:lm.current}}Oi.Fragment=im;Oi.jsx=Ud;Oi.jsxs=Ud;Pd.exports=Oi;var i=Pd.exports,Do={},$d={exports:{}},xn={},Fd={exports:{}},Bd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(K,ie){var me=K.length;K.push(ie);e:for(;0<me;){var De=me-1>>>1,fe=K[De];if(0<s(fe,ie))K[De]=ie,K[me]=fe,me=De;else break e}}function n(K){return K.length===0?null:K[0]}function r(K){if(K.length===0)return null;var ie=K[0],me=K.pop();if(me!==ie){K[0]=me;e:for(var De=0,fe=K.length,Ze=fe>>>1;De<Ze;){var We=2*(De+1)-1,ke=K[We],et=We+1,Pt=K[et];if(0>s(ke,me))et<fe&&0>s(Pt,ke)?(K[De]=Pt,K[et]=me,De=et):(K[De]=ke,K[We]=me,De=We);else if(et<fe&&0>s(Pt,me))K[De]=Pt,K[et]=me,De=et;else break e}}return ie}function s(K,ie){var me=K.sortIndex-ie.sortIndex;return me!==0?me:K.id-ie.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,u=o.now();e.unstable_now=function(){return o.now()-u}}var c=[],f=[],m=1,k=null,g=3,N=!1,v=!1,w=!1,M=typeof setTimeout=="function"?setTimeout:null,j=typeof clearTimeout=="function"?clearTimeout:null,b=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function C(K){for(var ie=n(f);ie!==null;){if(ie.callback===null)r(f);else if(ie.startTime<=K)r(f),ie.sortIndex=ie.expirationTime,t(c,ie);else break;ie=n(f)}}function E(K){if(w=!1,C(K),!v)if(n(c)!==null)v=!0,qe(L);else{var ie=n(f);ie!==null&&pt(E,ie.startTime-K)}}function L(K,ie){v=!1,w&&(w=!1,j(q),q=-1),N=!0;var me=g;try{for(C(ie),k=n(c);k!==null&&(!(k.expirationTime>ie)||K&&!Be());){var De=k.callback;if(typeof De=="function"){k.callback=null,g=k.priorityLevel;var fe=De(k.expirationTime<=ie);ie=e.unstable_now(),typeof fe=="function"?k.callback=fe:k===n(c)&&r(c),C(ie)}else r(c);k=n(c)}if(k!==null)var Ze=!0;else{var We=n(f);We!==null&&pt(E,We.startTime-ie),Ze=!1}return Ze}finally{k=null,g=me,N=!1}}var _=!1,D=null,q=-1,Te=5,ge=-1;function Be(){return!(e.unstable_now()-ge<Te)}function dt(){if(D!==null){var K=e.unstable_now();ge=K;var ie=!0;try{ie=D(!0,K)}finally{ie?wt():(_=!1,D=null)}}else _=!1}var wt;if(typeof b=="function")wt=function(){b(dt)};else if(typeof MessageChannel<"u"){var ft=new MessageChannel,jt=ft.port2;ft.port1.onmessage=dt,wt=function(){jt.postMessage(null)}}else wt=function(){M(dt,0)};function qe(K){D=K,_||(_=!0,wt())}function pt(K,ie){q=M(function(){K(e.unstable_now())},ie)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(K){K.callback=null},e.unstable_continueExecution=function(){v||N||(v=!0,qe(L))},e.unstable_forceFrameRate=function(K){0>K||125<K?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Te=0<K?Math.floor(1e3/K):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(K){switch(g){case 1:case 2:case 3:var ie=3;break;default:ie=g}var me=g;g=ie;try{return K()}finally{g=me}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(K,ie){switch(K){case 1:case 2:case 3:case 4:case 5:break;default:K=3}var me=g;g=K;try{return ie()}finally{g=me}},e.unstable_scheduleCallback=function(K,ie,me){var De=e.unstable_now();switch(typeof me=="object"&&me!==null?(me=me.delay,me=typeof me=="number"&&0<me?De+me:De):me=De,K){case 1:var fe=-1;break;case 2:fe=250;break;case 5:fe=1073741823;break;case 4:fe=1e4;break;default:fe=5e3}return fe=me+fe,K={id:m++,callback:ie,priorityLevel:K,startTime:me,expirationTime:fe,sortIndex:-1},me>De?(K.sortIndex=me,t(f,K),n(c)===null&&K===n(f)&&(w?(j(q),q=-1):w=!0,pt(E,me-De))):(K.sortIndex=fe,t(c,K),v||N||(v=!0,qe(L))),K},e.unstable_shouldYield=Be,e.unstable_wrapCallback=function(K){var ie=g;return function(){var me=g;g=ie;try{return K.apply(this,arguments)}finally{g=me}}}})(Bd);Fd.exports=Bd;var um=Fd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dm=y,gn=um;function Q(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Hd=new Set,Qs={};function Hr(e,t){ps(e,t),ps(e+"Capture",t)}function ps(e,t){for(Qs[e]=t,e=0;e<t.length;e++)Hd.add(t[e])}var tr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ao=Object.prototype.hasOwnProperty,fm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,qc={},Xc={};function pm(e){return Ao.call(Xc,e)?!0:Ao.call(qc,e)?!1:fm.test(e)?Xc[e]=!0:(qc[e]=!0,!1)}function hm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function mm(e,t,n,r){if(t===null||typeof t>"u"||hm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function tn(e,t,n,r,s,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Ft={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ft[e]=new tn(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ft[t]=new tn(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ft[e]=new tn(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ft[e]=new tn(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ft[e]=new tn(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ft[e]=new tn(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ft[e]=new tn(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ft[e]=new tn(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ft[e]=new tn(e,5,!1,e.toLowerCase(),null,!1,!1)});var Hl=/[\-:]([a-z])/g;function Vl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Hl,Vl);Ft[t]=new tn(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Hl,Vl);Ft[t]=new tn(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hl,Vl);Ft[t]=new tn(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ft[e]=new tn(e,1,!1,e.toLowerCase(),null,!1,!1)});Ft.xlinkHref=new tn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ft[e]=new tn(e,1,!1,e.toLowerCase(),null,!0,!0)});function Kl(e,t,n,r){var s=Ft.hasOwnProperty(t)?Ft[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(mm(t,n,s,r)&&(n=null),r||s===null?pm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ar=dm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ca=Symbol.for("react.element"),Jr=Symbol.for("react.portal"),Qr=Symbol.for("react.fragment"),Wl=Symbol.for("react.strict_mode"),Uo=Symbol.for("react.profiler"),Vd=Symbol.for("react.provider"),Kd=Symbol.for("react.context"),Yl=Symbol.for("react.forward_ref"),$o=Symbol.for("react.suspense"),Fo=Symbol.for("react.suspense_list"),Jl=Symbol.for("react.memo"),cr=Symbol.for("react.lazy"),Wd=Symbol.for("react.offscreen"),Gc=Symbol.iterator;function Ss(e){return e===null||typeof e!="object"?null:(e=Gc&&e[Gc]||e["@@iterator"],typeof e=="function"?e:null)}var kt=Object.assign,io;function Os(e){if(io===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);io=t&&t[1]||""}return`
`+io+e}var oo=!1;function lo(e,t){if(!e||oo)return"";oo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var s=f.stack.split(`
`),a=r.stack.split(`
`),o=s.length-1,u=a.length-1;1<=o&&0<=u&&s[o]!==a[u];)u--;for(;1<=o&&0<=u;o--,u--)if(s[o]!==a[u]){if(o!==1||u!==1)do if(o--,u--,0>u||s[o]!==a[u]){var c=`
`+s[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=u);break}}}finally{oo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Os(e):""}function gm(e){switch(e.tag){case 5:return Os(e.type);case 16:return Os("Lazy");case 13:return Os("Suspense");case 19:return Os("SuspenseList");case 0:case 2:case 15:return e=lo(e.type,!1),e;case 11:return e=lo(e.type.render,!1),e;case 1:return e=lo(e.type,!0),e;default:return""}}function Bo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Qr:return"Fragment";case Jr:return"Portal";case Uo:return"Profiler";case Wl:return"StrictMode";case $o:return"Suspense";case Fo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Kd:return(e.displayName||"Context")+".Consumer";case Vd:return(e._context.displayName||"Context")+".Provider";case Yl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Jl:return t=e.displayName||null,t!==null?t:Bo(e.type)||"Memo";case cr:t=e._payload,e=e._init;try{return Bo(e(t))}catch{}}return null}function xm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Bo(t);case 8:return t===Wl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function jr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Yd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function vm(e){var t=Yd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ea(e){e._valueTracker||(e._valueTracker=vm(e))}function Jd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Yd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function si(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ho(e,t){var n=t.checked;return kt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}function Zc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=jr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Qd(e,t){t=t.checked,t!=null&&Kl(e,"checked",t,!1)}function Vo(e,t){Qd(e,t);var n=jr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ko(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ko(e,t.type,jr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function eu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ko(e,t,n){(t!=="number"||si(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var _s=Array.isArray;function is(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+jr(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Wo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(Q(91));return kt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function tu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(Q(92));if(_s(n)){if(1<n.length)throw Error(Q(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:jr(n)}}function qd(e,t){var n=jr(t.value),r=jr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function nu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Xd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Yo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Xd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var za,Gd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(za=za||document.createElement("div"),za.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=za.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function qs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Us={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ym=["Webkit","ms","Moz","O"];Object.keys(Us).forEach(function(e){ym.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Us[t]=Us[e]})});function Zd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Us.hasOwnProperty(e)&&Us[e]?(""+t).trim():t+"px"}function ef(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Zd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var bm=kt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Jo(e,t){if(t){if(bm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(Q(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(Q(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(Q(61))}if(t.style!=null&&typeof t.style!="object")throw Error(Q(62))}}function Qo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qo=null;function Ql(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Xo=null,os=null,ls=null;function ru(e){if(e=ba(e)){if(typeof Xo!="function")throw Error(Q(280));var t=e.stateNode;t&&(t=$i(t),Xo(e.stateNode,e.type,t))}}function tf(e){os?ls?ls.push(e):ls=[e]:os=e}function nf(){if(os){var e=os,t=ls;if(ls=os=null,ru(e),t)for(e=0;e<t.length;e++)ru(t[e])}}function rf(e,t){return e(t)}function sf(){}var co=!1;function af(e,t,n){if(co)return e(t,n);co=!0;try{return rf(e,t,n)}finally{co=!1,(os!==null||ls!==null)&&(sf(),nf())}}function Xs(e,t){var n=e.stateNode;if(n===null)return null;var r=$i(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Q(231,t,typeof n));return n}var Go=!1;if(tr)try{var Ns={};Object.defineProperty(Ns,"passive",{get:function(){Go=!0}}),window.addEventListener("test",Ns,Ns),window.removeEventListener("test",Ns,Ns)}catch{Go=!1}function km(e,t,n,r,s,a,o,u,c){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(m){this.onError(m)}}var $s=!1,ai=null,ii=!1,Zo=null,wm={onError:function(e){$s=!0,ai=e}};function jm(e,t,n,r,s,a,o,u,c){$s=!1,ai=null,km.apply(wm,arguments)}function Sm(e,t,n,r,s,a,o,u,c){if(jm.apply(this,arguments),$s){if($s){var f=ai;$s=!1,ai=null}else throw Error(Q(198));ii||(ii=!0,Zo=f)}}function Vr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function of(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function su(e){if(Vr(e)!==e)throw Error(Q(188))}function Nm(e){var t=e.alternate;if(!t){if(t=Vr(e),t===null)throw Error(Q(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return su(s),e;if(a===r)return su(s),t;a=a.sibling}throw Error(Q(188))}if(n.return!==r.return)n=s,r=a;else{for(var o=!1,u=s.child;u;){if(u===n){o=!0,n=s,r=a;break}if(u===r){o=!0,r=s,n=a;break}u=u.sibling}if(!o){for(u=a.child;u;){if(u===n){o=!0,n=a,r=s;break}if(u===r){o=!0,r=a,n=s;break}u=u.sibling}if(!o)throw Error(Q(189))}}if(n.alternate!==r)throw Error(Q(190))}if(n.tag!==3)throw Error(Q(188));return n.stateNode.current===n?e:t}function lf(e){return e=Nm(e),e!==null?cf(e):null}function cf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=cf(e);if(t!==null)return t;e=e.sibling}return null}var uf=gn.unstable_scheduleCallback,au=gn.unstable_cancelCallback,Cm=gn.unstable_shouldYield,Em=gn.unstable_requestPaint,Ct=gn.unstable_now,zm=gn.unstable_getCurrentPriorityLevel,ql=gn.unstable_ImmediatePriority,df=gn.unstable_UserBlockingPriority,oi=gn.unstable_NormalPriority,Pm=gn.unstable_LowPriority,ff=gn.unstable_IdlePriority,_i=null,Jn=null;function Im(e){if(Jn&&typeof Jn.onCommitFiberRoot=="function")try{Jn.onCommitFiberRoot(_i,e,void 0,(e.current.flags&128)===128)}catch{}}var Dn=Math.clz32?Math.clz32:Tm,Mm=Math.log,Lm=Math.LN2;function Tm(e){return e>>>=0,e===0?32:31-(Mm(e)/Lm|0)|0}var Pa=64,Ia=4194304;function Ds(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function li(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var u=o&~s;u!==0?r=Ds(u):(a&=o,a!==0&&(r=Ds(a)))}else o=n&~s,o!==0?r=Ds(o):a!==0&&(r=Ds(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,a=t&-t,s>=a||s===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Dn(t),s=1<<n,r|=e[n],t&=~s;return r}function Rm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Om(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Dn(a),u=1<<o,c=s[o];c===-1?(!(u&n)||u&r)&&(s[o]=Rm(u,t)):c<=t&&(e.expiredLanes|=u),a&=~u}}function el(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function pf(){var e=Pa;return Pa<<=1,!(Pa&4194240)&&(Pa=64),e}function uo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function va(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Dn(t),e[t]=n}function _m(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Dn(n),a=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~a}}function Xl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Dn(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var tt=0;function hf(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var mf,Gl,gf,xf,vf,tl=!1,Ma=[],mr=null,gr=null,xr=null,Gs=new Map,Zs=new Map,dr=[],Dm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function iu(e,t){switch(e){case"focusin":case"focusout":mr=null;break;case"dragenter":case"dragleave":gr=null;break;case"mouseover":case"mouseout":xr=null;break;case"pointerover":case"pointerout":Gs.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Zs.delete(t.pointerId)}}function Cs(e,t,n,r,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[s]},t!==null&&(t=ba(t),t!==null&&Gl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function Am(e,t,n,r,s){switch(t){case"focusin":return mr=Cs(mr,e,t,n,r,s),!0;case"dragenter":return gr=Cs(gr,e,t,n,r,s),!0;case"mouseover":return xr=Cs(xr,e,t,n,r,s),!0;case"pointerover":var a=s.pointerId;return Gs.set(a,Cs(Gs.get(a)||null,e,t,n,r,s)),!0;case"gotpointercapture":return a=s.pointerId,Zs.set(a,Cs(Zs.get(a)||null,e,t,n,r,s)),!0}return!1}function yf(e){var t=Lr(e.target);if(t!==null){var n=Vr(t);if(n!==null){if(t=n.tag,t===13){if(t=of(n),t!==null){e.blockedOn=t,vf(e.priority,function(){gf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ya(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=nl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);qo=r,n.target.dispatchEvent(r),qo=null}else return t=ba(n),t!==null&&Gl(t),e.blockedOn=n,!1;t.shift()}return!0}function ou(e,t,n){Ya(e)&&n.delete(t)}function Um(){tl=!1,mr!==null&&Ya(mr)&&(mr=null),gr!==null&&Ya(gr)&&(gr=null),xr!==null&&Ya(xr)&&(xr=null),Gs.forEach(ou),Zs.forEach(ou)}function Es(e,t){e.blockedOn===t&&(e.blockedOn=null,tl||(tl=!0,gn.unstable_scheduleCallback(gn.unstable_NormalPriority,Um)))}function ea(e){function t(s){return Es(s,e)}if(0<Ma.length){Es(Ma[0],e);for(var n=1;n<Ma.length;n++){var r=Ma[n];r.blockedOn===e&&(r.blockedOn=null)}}for(mr!==null&&Es(mr,e),gr!==null&&Es(gr,e),xr!==null&&Es(xr,e),Gs.forEach(t),Zs.forEach(t),n=0;n<dr.length;n++)r=dr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<dr.length&&(n=dr[0],n.blockedOn===null);)yf(n),n.blockedOn===null&&dr.shift()}var cs=ar.ReactCurrentBatchConfig,ci=!0;function $m(e,t,n,r){var s=tt,a=cs.transition;cs.transition=null;try{tt=1,Zl(e,t,n,r)}finally{tt=s,cs.transition=a}}function Fm(e,t,n,r){var s=tt,a=cs.transition;cs.transition=null;try{tt=4,Zl(e,t,n,r)}finally{tt=s,cs.transition=a}}function Zl(e,t,n,r){if(ci){var s=nl(e,t,n,r);if(s===null)ko(e,t,r,ui,n),iu(e,r);else if(Am(s,e,t,n,r))r.stopPropagation();else if(iu(e,r),t&4&&-1<Dm.indexOf(e)){for(;s!==null;){var a=ba(s);if(a!==null&&mf(a),a=nl(e,t,n,r),a===null&&ko(e,t,r,ui,n),a===s)break;s=a}s!==null&&r.stopPropagation()}else ko(e,t,r,null,n)}}var ui=null;function nl(e,t,n,r){if(ui=null,e=Ql(r),e=Lr(e),e!==null)if(t=Vr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=of(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ui=e,null}function bf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zm()){case ql:return 1;case df:return 4;case oi:case Pm:return 16;case ff:return 536870912;default:return 16}default:return 16}}var pr=null,ec=null,Ja=null;function kf(){if(Ja)return Ja;var e,t=ec,n=t.length,r,s="value"in pr?pr.value:pr.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===s[a-r];r++);return Ja=s.slice(e,1<r?1-r:void 0)}function Qa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function La(){return!0}function lu(){return!1}function vn(e){function t(n,r,s,a,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(n=e[u],this[u]=n?n(a):a[u]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?La:lu,this.isPropagationStopped=lu,this}return kt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=La)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=La)},persist:function(){},isPersistent:La}),t}var ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},tc=vn(ws),ya=kt({},ws,{view:0,detail:0}),Bm=vn(ya),fo,po,zs,Di=kt({},ya,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zs&&(zs&&e.type==="mousemove"?(fo=e.screenX-zs.screenX,po=e.screenY-zs.screenY):po=fo=0,zs=e),fo)},movementY:function(e){return"movementY"in e?e.movementY:po}}),cu=vn(Di),Hm=kt({},Di,{dataTransfer:0}),Vm=vn(Hm),Km=kt({},ya,{relatedTarget:0}),ho=vn(Km),Wm=kt({},ws,{animationName:0,elapsedTime:0,pseudoElement:0}),Ym=vn(Wm),Jm=kt({},ws,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Qm=vn(Jm),qm=kt({},ws,{data:0}),uu=vn(qm),Xm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function eg(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zm[e])?!!t[e]:!1}function nc(){return eg}var tg=kt({},ya,{key:function(e){if(e.key){var t=Xm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nc,charCode:function(e){return e.type==="keypress"?Qa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ng=vn(tg),rg=kt({},Di,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),du=vn(rg),sg=kt({},ya,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nc}),ag=vn(sg),ig=kt({},ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),og=vn(ig),lg=kt({},Di,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),cg=vn(lg),ug=[9,13,27,32],rc=tr&&"CompositionEvent"in window,Fs=null;tr&&"documentMode"in document&&(Fs=document.documentMode);var dg=tr&&"TextEvent"in window&&!Fs,wf=tr&&(!rc||Fs&&8<Fs&&11>=Fs),fu=" ",pu=!1;function jf(e,t){switch(e){case"keyup":return ug.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Sf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qr=!1;function fg(e,t){switch(e){case"compositionend":return Sf(t);case"keypress":return t.which!==32?null:(pu=!0,fu);case"textInput":return e=t.data,e===fu&&pu?null:e;default:return null}}function pg(e,t){if(qr)return e==="compositionend"||!rc&&jf(e,t)?(e=kf(),Ja=ec=pr=null,qr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return wf&&t.locale!=="ko"?null:t.data;default:return null}}var hg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hg[e.type]:t==="textarea"}function Nf(e,t,n,r){tf(r),t=di(t,"onChange"),0<t.length&&(n=new tc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Bs=null,ta=null;function mg(e){_f(e,0)}function Ai(e){var t=Zr(e);if(Jd(t))return e}function gg(e,t){if(e==="change")return t}var Cf=!1;if(tr){var mo;if(tr){var go="oninput"in document;if(!go){var mu=document.createElement("div");mu.setAttribute("oninput","return;"),go=typeof mu.oninput=="function"}mo=go}else mo=!1;Cf=mo&&(!document.documentMode||9<document.documentMode)}function gu(){Bs&&(Bs.detachEvent("onpropertychange",Ef),ta=Bs=null)}function Ef(e){if(e.propertyName==="value"&&Ai(ta)){var t=[];Nf(t,ta,e,Ql(e)),af(mg,t)}}function xg(e,t,n){e==="focusin"?(gu(),Bs=t,ta=n,Bs.attachEvent("onpropertychange",Ef)):e==="focusout"&&gu()}function vg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ai(ta)}function yg(e,t){if(e==="click")return Ai(t)}function bg(e,t){if(e==="input"||e==="change")return Ai(t)}function kg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Un=typeof Object.is=="function"?Object.is:kg;function na(e,t){if(Un(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Ao.call(t,s)||!Un(e[s],t[s]))return!1}return!0}function xu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function vu(e,t){var n=xu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xu(n)}}function zf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pf(){for(var e=window,t=si();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=si(e.document)}return t}function sc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function wg(e){var t=Pf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&zf(n.ownerDocument.documentElement,n)){if(r!==null&&sc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,a=Math.min(r.start,s);r=r.end===void 0?a:Math.min(r.end,s),!e.extend&&a>r&&(s=r,r=a,a=s),s=vu(n,a);var o=vu(n,r);s&&o&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var jg=tr&&"documentMode"in document&&11>=document.documentMode,Xr=null,rl=null,Hs=null,sl=!1;function yu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sl||Xr==null||Xr!==si(r)||(r=Xr,"selectionStart"in r&&sc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Hs&&na(Hs,r)||(Hs=r,r=di(rl,"onSelect"),0<r.length&&(t=new tc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function Ta(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Gr={animationend:Ta("Animation","AnimationEnd"),animationiteration:Ta("Animation","AnimationIteration"),animationstart:Ta("Animation","AnimationStart"),transitionend:Ta("Transition","TransitionEnd")},xo={},If={};tr&&(If=document.createElement("div").style,"AnimationEvent"in window||(delete Gr.animationend.animation,delete Gr.animationiteration.animation,delete Gr.animationstart.animation),"TransitionEvent"in window||delete Gr.transitionend.transition);function Ui(e){if(xo[e])return xo[e];if(!Gr[e])return e;var t=Gr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in If)return xo[e]=t[n];return e}var Mf=Ui("animationend"),Lf=Ui("animationiteration"),Tf=Ui("animationstart"),Rf=Ui("transitionend"),Of=new Map,bu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Cr(e,t){Of.set(e,t),Hr(t,[e])}for(var vo=0;vo<bu.length;vo++){var yo=bu[vo],Sg=yo.toLowerCase(),Ng=yo[0].toUpperCase()+yo.slice(1);Cr(Sg,"on"+Ng)}Cr(Mf,"onAnimationEnd");Cr(Lf,"onAnimationIteration");Cr(Tf,"onAnimationStart");Cr("dblclick","onDoubleClick");Cr("focusin","onFocus");Cr("focusout","onBlur");Cr(Rf,"onTransitionEnd");ps("onMouseEnter",["mouseout","mouseover"]);ps("onMouseLeave",["mouseout","mouseover"]);ps("onPointerEnter",["pointerout","pointerover"]);ps("onPointerLeave",["pointerout","pointerover"]);Hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var As="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cg=new Set("cancel close invalid load scroll toggle".split(" ").concat(As));function ku(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Sm(r,t,void 0,e),e.currentTarget=null}function _f(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var u=r[o],c=u.instance,f=u.currentTarget;if(u=u.listener,c!==a&&s.isPropagationStopped())break e;ku(s,u,f),a=c}else for(o=0;o<r.length;o++){if(u=r[o],c=u.instance,f=u.currentTarget,u=u.listener,c!==a&&s.isPropagationStopped())break e;ku(s,u,f),a=c}}}if(ii)throw e=Zo,ii=!1,Zo=null,e}function ct(e,t){var n=t[cl];n===void 0&&(n=t[cl]=new Set);var r=e+"__bubble";n.has(r)||(Df(t,e,2,!1),n.add(r))}function bo(e,t,n){var r=0;t&&(r|=4),Df(n,e,r,t)}var Ra="_reactListening"+Math.random().toString(36).slice(2);function ra(e){if(!e[Ra]){e[Ra]=!0,Hd.forEach(function(n){n!=="selectionchange"&&(Cg.has(n)||bo(n,!1,e),bo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ra]||(t[Ra]=!0,bo("selectionchange",!1,t))}}function Df(e,t,n,r){switch(bf(t)){case 1:var s=$m;break;case 4:s=Fm;break;default:s=Zl}n=s.bind(null,t,n,e),s=void 0,!Go||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function ko(e,t,n,r,s){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var u=r.stateNode.containerInfo;if(u===s||u.nodeType===8&&u.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;o=o.return}for(;u!==null;){if(o=Lr(u),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue e}u=u.parentNode}}r=r.return}af(function(){var f=a,m=Ql(n),k=[];e:{var g=Of.get(e);if(g!==void 0){var N=tc,v=e;switch(e){case"keypress":if(Qa(n)===0)break e;case"keydown":case"keyup":N=ng;break;case"focusin":v="focus",N=ho;break;case"focusout":v="blur",N=ho;break;case"beforeblur":case"afterblur":N=ho;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=cu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Vm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=ag;break;case Mf:case Lf:case Tf:N=Ym;break;case Rf:N=og;break;case"scroll":N=Bm;break;case"wheel":N=cg;break;case"copy":case"cut":case"paste":N=Qm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=du}var w=(t&4)!==0,M=!w&&e==="scroll",j=w?g!==null?g+"Capture":null:g;w=[];for(var b=f,C;b!==null;){C=b;var E=C.stateNode;if(C.tag===5&&E!==null&&(C=E,j!==null&&(E=Xs(b,j),E!=null&&w.push(sa(b,E,C)))),M)break;b=b.return}0<w.length&&(g=new N(g,v,null,n,m),k.push({event:g,listeners:w}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",g&&n!==qo&&(v=n.relatedTarget||n.fromElement)&&(Lr(v)||v[nr]))break e;if((N||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,N?(v=n.relatedTarget||n.toElement,N=f,v=v?Lr(v):null,v!==null&&(M=Vr(v),v!==M||v.tag!==5&&v.tag!==6)&&(v=null)):(N=null,v=f),N!==v)){if(w=cu,E="onMouseLeave",j="onMouseEnter",b="mouse",(e==="pointerout"||e==="pointerover")&&(w=du,E="onPointerLeave",j="onPointerEnter",b="pointer"),M=N==null?g:Zr(N),C=v==null?g:Zr(v),g=new w(E,b+"leave",N,n,m),g.target=M,g.relatedTarget=C,E=null,Lr(m)===f&&(w=new w(j,b+"enter",v,n,m),w.target=C,w.relatedTarget=M,E=w),M=E,N&&v)t:{for(w=N,j=v,b=0,C=w;C;C=Kr(C))b++;for(C=0,E=j;E;E=Kr(E))C++;for(;0<b-C;)w=Kr(w),b--;for(;0<C-b;)j=Kr(j),C--;for(;b--;){if(w===j||j!==null&&w===j.alternate)break t;w=Kr(w),j=Kr(j)}w=null}else w=null;N!==null&&wu(k,g,N,w,!1),v!==null&&M!==null&&wu(k,M,v,w,!0)}}e:{if(g=f?Zr(f):window,N=g.nodeName&&g.nodeName.toLowerCase(),N==="select"||N==="input"&&g.type==="file")var L=gg;else if(hu(g))if(Cf)L=bg;else{L=vg;var _=xg}else(N=g.nodeName)&&N.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(L=yg);if(L&&(L=L(e,f))){Nf(k,L,n,m);break e}_&&_(e,g,f),e==="focusout"&&(_=g._wrapperState)&&_.controlled&&g.type==="number"&&Ko(g,"number",g.value)}switch(_=f?Zr(f):window,e){case"focusin":(hu(_)||_.contentEditable==="true")&&(Xr=_,rl=f,Hs=null);break;case"focusout":Hs=rl=Xr=null;break;case"mousedown":sl=!0;break;case"contextmenu":case"mouseup":case"dragend":sl=!1,yu(k,n,m);break;case"selectionchange":if(jg)break;case"keydown":case"keyup":yu(k,n,m)}var D;if(rc)e:{switch(e){case"compositionstart":var q="onCompositionStart";break e;case"compositionend":q="onCompositionEnd";break e;case"compositionupdate":q="onCompositionUpdate";break e}q=void 0}else qr?jf(e,n)&&(q="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(q="onCompositionStart");q&&(wf&&n.locale!=="ko"&&(qr||q!=="onCompositionStart"?q==="onCompositionEnd"&&qr&&(D=kf()):(pr=m,ec="value"in pr?pr.value:pr.textContent,qr=!0)),_=di(f,q),0<_.length&&(q=new uu(q,e,null,n,m),k.push({event:q,listeners:_}),D?q.data=D:(D=Sf(n),D!==null&&(q.data=D)))),(D=dg?fg(e,n):pg(e,n))&&(f=di(f,"onBeforeInput"),0<f.length&&(m=new uu("onBeforeInput","beforeinput",null,n,m),k.push({event:m,listeners:f}),m.data=D))}_f(k,t)})}function sa(e,t,n){return{instance:e,listener:t,currentTarget:n}}function di(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,a=s.stateNode;s.tag===5&&a!==null&&(s=a,a=Xs(e,n),a!=null&&r.unshift(sa(e,a,s)),a=Xs(e,t),a!=null&&r.push(sa(e,a,s))),e=e.return}return r}function Kr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function wu(e,t,n,r,s){for(var a=t._reactName,o=[];n!==null&&n!==r;){var u=n,c=u.alternate,f=u.stateNode;if(c!==null&&c===r)break;u.tag===5&&f!==null&&(u=f,s?(c=Xs(n,a),c!=null&&o.unshift(sa(n,c,u))):s||(c=Xs(n,a),c!=null&&o.push(sa(n,c,u)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Eg=/\r\n?/g,zg=/\u0000|\uFFFD/g;function ju(e){return(typeof e=="string"?e:""+e).replace(Eg,`
`).replace(zg,"")}function Oa(e,t,n){if(t=ju(t),ju(e)!==t&&n)throw Error(Q(425))}function fi(){}var al=null,il=null;function ol(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ll=typeof setTimeout=="function"?setTimeout:void 0,Pg=typeof clearTimeout=="function"?clearTimeout:void 0,Su=typeof Promise=="function"?Promise:void 0,Ig=typeof queueMicrotask=="function"?queueMicrotask:typeof Su<"u"?function(e){return Su.resolve(null).then(e).catch(Mg)}:ll;function Mg(e){setTimeout(function(){throw e})}function wo(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),ea(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);ea(t)}function vr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Nu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var js=Math.random().toString(36).slice(2),Wn="__reactFiber$"+js,aa="__reactProps$"+js,nr="__reactContainer$"+js,cl="__reactEvents$"+js,Lg="__reactListeners$"+js,Tg="__reactHandles$"+js;function Lr(e){var t=e[Wn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[nr]||n[Wn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Nu(e);e!==null;){if(n=e[Wn])return n;e=Nu(e)}return t}e=n,n=e.parentNode}return null}function ba(e){return e=e[Wn]||e[nr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(Q(33))}function $i(e){return e[aa]||null}var ul=[],es=-1;function Er(e){return{current:e}}function ut(e){0>es||(e.current=ul[es],ul[es]=null,es--)}function st(e,t){es++,ul[es]=e.current,e.current=t}var Sr={},Jt=Er(Sr),on=Er(!1),Ar=Sr;function hs(e,t){var n=e.type.contextTypes;if(!n)return Sr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},a;for(a in n)s[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function ln(e){return e=e.childContextTypes,e!=null}function pi(){ut(on),ut(Jt)}function Cu(e,t,n){if(Jt.current!==Sr)throw Error(Q(168));st(Jt,t),st(on,n)}function Af(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(Q(108,xm(e)||"Unknown",s));return kt({},n,r)}function hi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Sr,Ar=Jt.current,st(Jt,e),st(on,on.current),!0}function Eu(e,t,n){var r=e.stateNode;if(!r)throw Error(Q(169));n?(e=Af(e,t,Ar),r.__reactInternalMemoizedMergedChildContext=e,ut(on),ut(Jt),st(Jt,e)):ut(on),st(on,n)}var Xn=null,Fi=!1,jo=!1;function Uf(e){Xn===null?Xn=[e]:Xn.push(e)}function Rg(e){Fi=!0,Uf(e)}function zr(){if(!jo&&Xn!==null){jo=!0;var e=0,t=tt;try{var n=Xn;for(tt=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xn=null,Fi=!1}catch(s){throw Xn!==null&&(Xn=Xn.slice(e+1)),uf(ql,zr),s}finally{tt=t,jo=!1}}return null}var ts=[],ns=0,mi=null,gi=0,wn=[],jn=0,Ur=null,Gn=1,Zn="";function Ir(e,t){ts[ns++]=gi,ts[ns++]=mi,mi=e,gi=t}function $f(e,t,n){wn[jn++]=Gn,wn[jn++]=Zn,wn[jn++]=Ur,Ur=e;var r=Gn;e=Zn;var s=32-Dn(r)-1;r&=~(1<<s),n+=1;var a=32-Dn(t)+s;if(30<a){var o=s-s%5;a=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Gn=1<<32-Dn(t)+s|n<<s|r,Zn=a+e}else Gn=1<<a|n<<s|r,Zn=e}function ac(e){e.return!==null&&(Ir(e,1),$f(e,1,0))}function ic(e){for(;e===mi;)mi=ts[--ns],ts[ns]=null,gi=ts[--ns],ts[ns]=null;for(;e===Ur;)Ur=wn[--jn],wn[jn]=null,Zn=wn[--jn],wn[jn]=null,Gn=wn[--jn],wn[jn]=null}var mn=null,hn=null,gt=!1,_n=null;function Ff(e,t){var n=Sn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function zu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,mn=e,hn=vr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,mn=e,hn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ur!==null?{id:Gn,overflow:Zn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Sn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,mn=e,hn=null,!0):!1;default:return!1}}function dl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function fl(e){if(gt){var t=hn;if(t){var n=t;if(!zu(e,t)){if(dl(e))throw Error(Q(418));t=vr(n.nextSibling);var r=mn;t&&zu(e,t)?Ff(r,n):(e.flags=e.flags&-4097|2,gt=!1,mn=e)}}else{if(dl(e))throw Error(Q(418));e.flags=e.flags&-4097|2,gt=!1,mn=e}}}function Pu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;mn=e}function _a(e){if(e!==mn)return!1;if(!gt)return Pu(e),gt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ol(e.type,e.memoizedProps)),t&&(t=hn)){if(dl(e))throw Bf(),Error(Q(418));for(;t;)Ff(e,t),t=vr(t.nextSibling)}if(Pu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Q(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){hn=vr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}hn=null}}else hn=mn?vr(e.stateNode.nextSibling):null;return!0}function Bf(){for(var e=hn;e;)e=vr(e.nextSibling)}function ms(){hn=mn=null,gt=!1}function oc(e){_n===null?_n=[e]:_n.push(e)}var Og=ar.ReactCurrentBatchConfig;function Ps(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(Q(309));var r=n.stateNode}if(!r)throw Error(Q(147,e));var s=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var u=s.refs;o===null?delete u[a]:u[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(Q(284));if(!n._owner)throw Error(Q(290,e))}return e}function Da(e,t){throw e=Object.prototype.toString.call(t),Error(Q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Iu(e){var t=e._init;return t(e._payload)}function Hf(e){function t(j,b){if(e){var C=j.deletions;C===null?(j.deletions=[b],j.flags|=16):C.push(b)}}function n(j,b){if(!e)return null;for(;b!==null;)t(j,b),b=b.sibling;return null}function r(j,b){for(j=new Map;b!==null;)b.key!==null?j.set(b.key,b):j.set(b.index,b),b=b.sibling;return j}function s(j,b){return j=wr(j,b),j.index=0,j.sibling=null,j}function a(j,b,C){return j.index=C,e?(C=j.alternate,C!==null?(C=C.index,C<b?(j.flags|=2,b):C):(j.flags|=2,b)):(j.flags|=1048576,b)}function o(j){return e&&j.alternate===null&&(j.flags|=2),j}function u(j,b,C,E){return b===null||b.tag!==6?(b=Io(C,j.mode,E),b.return=j,b):(b=s(b,C),b.return=j,b)}function c(j,b,C,E){var L=C.type;return L===Qr?m(j,b,C.props.children,E,C.key):b!==null&&(b.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===cr&&Iu(L)===b.type)?(E=s(b,C.props),E.ref=Ps(j,b,C),E.return=j,E):(E=ni(C.type,C.key,C.props,null,j.mode,E),E.ref=Ps(j,b,C),E.return=j,E)}function f(j,b,C,E){return b===null||b.tag!==4||b.stateNode.containerInfo!==C.containerInfo||b.stateNode.implementation!==C.implementation?(b=Mo(C,j.mode,E),b.return=j,b):(b=s(b,C.children||[]),b.return=j,b)}function m(j,b,C,E,L){return b===null||b.tag!==7?(b=_r(C,j.mode,E,L),b.return=j,b):(b=s(b,C),b.return=j,b)}function k(j,b,C){if(typeof b=="string"&&b!==""||typeof b=="number")return b=Io(""+b,j.mode,C),b.return=j,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Ca:return C=ni(b.type,b.key,b.props,null,j.mode,C),C.ref=Ps(j,null,b),C.return=j,C;case Jr:return b=Mo(b,j.mode,C),b.return=j,b;case cr:var E=b._init;return k(j,E(b._payload),C)}if(_s(b)||Ss(b))return b=_r(b,j.mode,C,null),b.return=j,b;Da(j,b)}return null}function g(j,b,C,E){var L=b!==null?b.key:null;if(typeof C=="string"&&C!==""||typeof C=="number")return L!==null?null:u(j,b,""+C,E);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case Ca:return C.key===L?c(j,b,C,E):null;case Jr:return C.key===L?f(j,b,C,E):null;case cr:return L=C._init,g(j,b,L(C._payload),E)}if(_s(C)||Ss(C))return L!==null?null:m(j,b,C,E,null);Da(j,C)}return null}function N(j,b,C,E,L){if(typeof E=="string"&&E!==""||typeof E=="number")return j=j.get(C)||null,u(b,j,""+E,L);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Ca:return j=j.get(E.key===null?C:E.key)||null,c(b,j,E,L);case Jr:return j=j.get(E.key===null?C:E.key)||null,f(b,j,E,L);case cr:var _=E._init;return N(j,b,C,_(E._payload),L)}if(_s(E)||Ss(E))return j=j.get(C)||null,m(b,j,E,L,null);Da(b,E)}return null}function v(j,b,C,E){for(var L=null,_=null,D=b,q=b=0,Te=null;D!==null&&q<C.length;q++){D.index>q?(Te=D,D=null):Te=D.sibling;var ge=g(j,D,C[q],E);if(ge===null){D===null&&(D=Te);break}e&&D&&ge.alternate===null&&t(j,D),b=a(ge,b,q),_===null?L=ge:_.sibling=ge,_=ge,D=Te}if(q===C.length)return n(j,D),gt&&Ir(j,q),L;if(D===null){for(;q<C.length;q++)D=k(j,C[q],E),D!==null&&(b=a(D,b,q),_===null?L=D:_.sibling=D,_=D);return gt&&Ir(j,q),L}for(D=r(j,D);q<C.length;q++)Te=N(D,j,q,C[q],E),Te!==null&&(e&&Te.alternate!==null&&D.delete(Te.key===null?q:Te.key),b=a(Te,b,q),_===null?L=Te:_.sibling=Te,_=Te);return e&&D.forEach(function(Be){return t(j,Be)}),gt&&Ir(j,q),L}function w(j,b,C,E){var L=Ss(C);if(typeof L!="function")throw Error(Q(150));if(C=L.call(C),C==null)throw Error(Q(151));for(var _=L=null,D=b,q=b=0,Te=null,ge=C.next();D!==null&&!ge.done;q++,ge=C.next()){D.index>q?(Te=D,D=null):Te=D.sibling;var Be=g(j,D,ge.value,E);if(Be===null){D===null&&(D=Te);break}e&&D&&Be.alternate===null&&t(j,D),b=a(Be,b,q),_===null?L=Be:_.sibling=Be,_=Be,D=Te}if(ge.done)return n(j,D),gt&&Ir(j,q),L;if(D===null){for(;!ge.done;q++,ge=C.next())ge=k(j,ge.value,E),ge!==null&&(b=a(ge,b,q),_===null?L=ge:_.sibling=ge,_=ge);return gt&&Ir(j,q),L}for(D=r(j,D);!ge.done;q++,ge=C.next())ge=N(D,j,q,ge.value,E),ge!==null&&(e&&ge.alternate!==null&&D.delete(ge.key===null?q:ge.key),b=a(ge,b,q),_===null?L=ge:_.sibling=ge,_=ge);return e&&D.forEach(function(dt){return t(j,dt)}),gt&&Ir(j,q),L}function M(j,b,C,E){if(typeof C=="object"&&C!==null&&C.type===Qr&&C.key===null&&(C=C.props.children),typeof C=="object"&&C!==null){switch(C.$$typeof){case Ca:e:{for(var L=C.key,_=b;_!==null;){if(_.key===L){if(L=C.type,L===Qr){if(_.tag===7){n(j,_.sibling),b=s(_,C.props.children),b.return=j,j=b;break e}}else if(_.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===cr&&Iu(L)===_.type){n(j,_.sibling),b=s(_,C.props),b.ref=Ps(j,_,C),b.return=j,j=b;break e}n(j,_);break}else t(j,_);_=_.sibling}C.type===Qr?(b=_r(C.props.children,j.mode,E,C.key),b.return=j,j=b):(E=ni(C.type,C.key,C.props,null,j.mode,E),E.ref=Ps(j,b,C),E.return=j,j=E)}return o(j);case Jr:e:{for(_=C.key;b!==null;){if(b.key===_)if(b.tag===4&&b.stateNode.containerInfo===C.containerInfo&&b.stateNode.implementation===C.implementation){n(j,b.sibling),b=s(b,C.children||[]),b.return=j,j=b;break e}else{n(j,b);break}else t(j,b);b=b.sibling}b=Mo(C,j.mode,E),b.return=j,j=b}return o(j);case cr:return _=C._init,M(j,b,_(C._payload),E)}if(_s(C))return v(j,b,C,E);if(Ss(C))return w(j,b,C,E);Da(j,C)}return typeof C=="string"&&C!==""||typeof C=="number"?(C=""+C,b!==null&&b.tag===6?(n(j,b.sibling),b=s(b,C),b.return=j,j=b):(n(j,b),b=Io(C,j.mode,E),b.return=j,j=b),o(j)):n(j,b)}return M}var gs=Hf(!0),Vf=Hf(!1),xi=Er(null),vi=null,rs=null,lc=null;function cc(){lc=rs=vi=null}function uc(e){var t=xi.current;ut(xi),e._currentValue=t}function pl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function us(e,t){vi=e,lc=rs=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(an=!0),e.firstContext=null)}function Cn(e){var t=e._currentValue;if(lc!==e)if(e={context:e,memoizedValue:t,next:null},rs===null){if(vi===null)throw Error(Q(308));rs=e,vi.dependencies={lanes:0,firstContext:e}}else rs=rs.next=e;return t}var Tr=null;function dc(e){Tr===null?Tr=[e]:Tr.push(e)}function Kf(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,dc(t)):(n.next=s.next,s.next=n),t.interleaved=n,rr(e,r)}function rr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ur=!1;function fc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function er(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function yr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Je&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,rr(e,n)}return s=r.interleaved,s===null?(t.next=t,dc(r)):(t.next=s.next,s.next=t),r.interleaved=t,rr(e,n)}function qa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xl(e,n)}}function Mu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?s=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function yi(e,t,n,r){var s=e.updateQueue;ur=!1;var a=s.firstBaseUpdate,o=s.lastBaseUpdate,u=s.shared.pending;if(u!==null){s.shared.pending=null;var c=u,f=c.next;c.next=null,o===null?a=f:o.next=f,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,u=m.lastBaseUpdate,u!==o&&(u===null?m.firstBaseUpdate=f:u.next=f,m.lastBaseUpdate=c))}if(a!==null){var k=s.baseState;o=0,m=f=c=null,u=a;do{var g=u.lane,N=u.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:N,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var v=e,w=u;switch(g=t,N=n,w.tag){case 1:if(v=w.payload,typeof v=="function"){k=v.call(N,k,g);break e}k=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,g=typeof v=="function"?v.call(N,k,g):v,g==null)break e;k=kt({},k,g);break e;case 2:ur=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,g=s.effects,g===null?s.effects=[u]:g.push(u))}else N={eventTime:N,lane:g,tag:u.tag,payload:u.payload,callback:u.callback,next:null},m===null?(f=m=N,c=k):m=m.next=N,o|=g;if(u=u.next,u===null){if(u=s.shared.pending,u===null)break;g=u,u=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(m===null&&(c=k),s.baseState=c,s.firstBaseUpdate=f,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do o|=s.lane,s=s.next;while(s!==t)}else a===null&&(s.shared.lanes=0);Fr|=o,e.lanes=o,e.memoizedState=k}}function Lu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(Q(191,s));s.call(r)}}}var ka={},Qn=Er(ka),ia=Er(ka),oa=Er(ka);function Rr(e){if(e===ka)throw Error(Q(174));return e}function pc(e,t){switch(st(oa,t),st(ia,e),st(Qn,ka),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Yo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Yo(t,e)}ut(Qn),st(Qn,t)}function xs(){ut(Qn),ut(ia),ut(oa)}function Yf(e){Rr(oa.current);var t=Rr(Qn.current),n=Yo(t,e.type);t!==n&&(st(ia,e),st(Qn,n))}function hc(e){ia.current===e&&(ut(Qn),ut(ia))}var yt=Er(0);function bi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var So=[];function mc(){for(var e=0;e<So.length;e++)So[e]._workInProgressVersionPrimary=null;So.length=0}var Xa=ar.ReactCurrentDispatcher,No=ar.ReactCurrentBatchConfig,$r=0,bt=null,Tt=null,Dt=null,ki=!1,Vs=!1,la=0,_g=0;function Kt(){throw Error(Q(321))}function gc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Un(e[n],t[n]))return!1;return!0}function xc(e,t,n,r,s,a){if($r=a,bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xa.current=e===null||e.memoizedState===null?$g:Fg,e=n(r,s),Vs){a=0;do{if(Vs=!1,la=0,25<=a)throw Error(Q(301));a+=1,Dt=Tt=null,t.updateQueue=null,Xa.current=Bg,e=n(r,s)}while(Vs)}if(Xa.current=wi,t=Tt!==null&&Tt.next!==null,$r=0,Dt=Tt=bt=null,ki=!1,t)throw Error(Q(300));return e}function vc(){var e=la!==0;return la=0,e}function Kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Dt===null?bt.memoizedState=Dt=e:Dt=Dt.next=e,Dt}function En(){if(Tt===null){var e=bt.alternate;e=e!==null?e.memoizedState:null}else e=Tt.next;var t=Dt===null?bt.memoizedState:Dt.next;if(t!==null)Dt=t,Tt=e;else{if(e===null)throw Error(Q(310));Tt=e,e={memoizedState:Tt.memoizedState,baseState:Tt.baseState,baseQueue:Tt.baseQueue,queue:Tt.queue,next:null},Dt===null?bt.memoizedState=Dt=e:Dt=Dt.next=e}return Dt}function ca(e,t){return typeof t=="function"?t(e):t}function Co(e){var t=En(),n=t.queue;if(n===null)throw Error(Q(311));n.lastRenderedReducer=e;var r=Tt,s=r.baseQueue,a=n.pending;if(a!==null){if(s!==null){var o=s.next;s.next=a.next,a.next=o}r.baseQueue=s=a,n.pending=null}if(s!==null){a=s.next,r=r.baseState;var u=o=null,c=null,f=a;do{var m=f.lane;if(($r&m)===m)c!==null&&(c=c.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var k={lane:m,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};c===null?(u=c=k,o=r):c=c.next=k,bt.lanes|=m,Fr|=m}f=f.next}while(f!==null&&f!==a);c===null?o=r:c.next=u,Un(r,t.memoizedState)||(an=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do a=s.lane,bt.lanes|=a,Fr|=a,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Eo(e){var t=En(),n=t.queue;if(n===null)throw Error(Q(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do a=e(a,o.action),o=o.next;while(o!==s);Un(a,t.memoizedState)||(an=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Jf(){}function Qf(e,t){var n=bt,r=En(),s=t(),a=!Un(r.memoizedState,s);if(a&&(r.memoizedState=s,an=!0),r=r.queue,yc(Gf.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Dt!==null&&Dt.memoizedState.tag&1){if(n.flags|=2048,ua(9,Xf.bind(null,n,r,s,t),void 0,null),At===null)throw Error(Q(349));$r&30||qf(n,t,s)}return s}function qf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Xf(e,t,n,r){t.value=n,t.getSnapshot=r,Zf(t)&&ep(e)}function Gf(e,t,n){return n(function(){Zf(t)&&ep(e)})}function Zf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Un(e,n)}catch{return!0}}function ep(e){var t=rr(e,1);t!==null&&An(t,e,1,-1)}function Tu(e){var t=Kn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ca,lastRenderedState:e},t.queue=e,e=e.dispatch=Ug.bind(null,bt,e),[t.memoizedState,e]}function ua(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=bt.updateQueue,t===null?(t={lastEffect:null,stores:null},bt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function tp(){return En().memoizedState}function Ga(e,t,n,r){var s=Kn();bt.flags|=e,s.memoizedState=ua(1|t,n,void 0,r===void 0?null:r)}function Bi(e,t,n,r){var s=En();r=r===void 0?null:r;var a=void 0;if(Tt!==null){var o=Tt.memoizedState;if(a=o.destroy,r!==null&&gc(r,o.deps)){s.memoizedState=ua(t,n,a,r);return}}bt.flags|=e,s.memoizedState=ua(1|t,n,a,r)}function Ru(e,t){return Ga(8390656,8,e,t)}function yc(e,t){return Bi(2048,8,e,t)}function np(e,t){return Bi(4,2,e,t)}function rp(e,t){return Bi(4,4,e,t)}function sp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ap(e,t,n){return n=n!=null?n.concat([e]):null,Bi(4,4,sp.bind(null,t,e),n)}function bc(){}function ip(e,t){var n=En();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&gc(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function op(e,t){var n=En();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&gc(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function lp(e,t,n){return $r&21?(Un(n,t)||(n=pf(),bt.lanes|=n,Fr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,an=!0),e.memoizedState=n)}function Dg(e,t){var n=tt;tt=n!==0&&4>n?n:4,e(!0);var r=No.transition;No.transition={};try{e(!1),t()}finally{tt=n,No.transition=r}}function cp(){return En().memoizedState}function Ag(e,t,n){var r=kr(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},up(e))dp(t,n);else if(n=Kf(e,t,n,r),n!==null){var s=Zt();An(n,e,r,s),fp(n,t,r)}}function Ug(e,t,n){var r=kr(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(up(e))dp(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,u=a(o,n);if(s.hasEagerState=!0,s.eagerState=u,Un(u,o)){var c=t.interleaved;c===null?(s.next=s,dc(t)):(s.next=c.next,c.next=s),t.interleaved=s;return}}catch{}finally{}n=Kf(e,t,s,r),n!==null&&(s=Zt(),An(n,e,r,s),fp(n,t,r))}}function up(e){var t=e.alternate;return e===bt||t!==null&&t===bt}function dp(e,t){Vs=ki=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fp(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Xl(e,n)}}var wi={readContext:Cn,useCallback:Kt,useContext:Kt,useEffect:Kt,useImperativeHandle:Kt,useInsertionEffect:Kt,useLayoutEffect:Kt,useMemo:Kt,useReducer:Kt,useRef:Kt,useState:Kt,useDebugValue:Kt,useDeferredValue:Kt,useTransition:Kt,useMutableSource:Kt,useSyncExternalStore:Kt,useId:Kt,unstable_isNewReconciler:!1},$g={readContext:Cn,useCallback:function(e,t){return Kn().memoizedState=[e,t===void 0?null:t],e},useContext:Cn,useEffect:Ru,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ga(4194308,4,sp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ga(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ga(4,2,e,t)},useMemo:function(e,t){var n=Kn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Kn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Ag.bind(null,bt,e),[r.memoizedState,e]},useRef:function(e){var t=Kn();return e={current:e},t.memoizedState=e},useState:Tu,useDebugValue:bc,useDeferredValue:function(e){return Kn().memoizedState=e},useTransition:function(){var e=Tu(!1),t=e[0];return e=Dg.bind(null,e[1]),Kn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=bt,s=Kn();if(gt){if(n===void 0)throw Error(Q(407));n=n()}else{if(n=t(),At===null)throw Error(Q(349));$r&30||qf(r,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Ru(Gf.bind(null,r,a,e),[e]),r.flags|=2048,ua(9,Xf.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Kn(),t=At.identifierPrefix;if(gt){var n=Zn,r=Gn;n=(r&~(1<<32-Dn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=la++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=_g++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Fg={readContext:Cn,useCallback:ip,useContext:Cn,useEffect:yc,useImperativeHandle:ap,useInsertionEffect:np,useLayoutEffect:rp,useMemo:op,useReducer:Co,useRef:tp,useState:function(){return Co(ca)},useDebugValue:bc,useDeferredValue:function(e){var t=En();return lp(t,Tt.memoizedState,e)},useTransition:function(){var e=Co(ca)[0],t=En().memoizedState;return[e,t]},useMutableSource:Jf,useSyncExternalStore:Qf,useId:cp,unstable_isNewReconciler:!1},Bg={readContext:Cn,useCallback:ip,useContext:Cn,useEffect:yc,useImperativeHandle:ap,useInsertionEffect:np,useLayoutEffect:rp,useMemo:op,useReducer:Eo,useRef:tp,useState:function(){return Eo(ca)},useDebugValue:bc,useDeferredValue:function(e){var t=En();return Tt===null?t.memoizedState=e:lp(t,Tt.memoizedState,e)},useTransition:function(){var e=Eo(ca)[0],t=En().memoizedState;return[e,t]},useMutableSource:Jf,useSyncExternalStore:Qf,useId:cp,unstable_isNewReconciler:!1};function Rn(e,t){if(e&&e.defaultProps){t=kt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function hl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:kt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Hi={isMounted:function(e){return(e=e._reactInternals)?Vr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Zt(),s=kr(e),a=er(r,s);a.payload=t,n!=null&&(a.callback=n),t=yr(e,a,s),t!==null&&(An(t,e,s,r),qa(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Zt(),s=kr(e),a=er(r,s);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=yr(e,a,s),t!==null&&(An(t,e,s,r),qa(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Zt(),r=kr(e),s=er(n,r);s.tag=2,t!=null&&(s.callback=t),t=yr(e,s,r),t!==null&&(An(t,e,r,n),qa(t,e,r))}};function Ou(e,t,n,r,s,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!na(n,r)||!na(s,a):!0}function pp(e,t,n){var r=!1,s=Sr,a=t.contextType;return typeof a=="object"&&a!==null?a=Cn(a):(s=ln(t)?Ar:Jt.current,r=t.contextTypes,a=(r=r!=null)?hs(e,s):Sr),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Hi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=a),t}function _u(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Hi.enqueueReplaceState(t,t.state,null)}function ml(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},fc(e);var a=t.contextType;typeof a=="object"&&a!==null?s.context=Cn(a):(a=ln(t)?Ar:Jt.current,s.context=hs(e,a)),s.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(hl(e,t,a,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Hi.enqueueReplaceState(s,s.state,null),yi(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function vs(e,t){try{var n="",r=t;do n+=gm(r),r=r.return;while(r);var s=n}catch(a){s=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:s,digest:null}}function zo(e,t,n){return{value:e,source:null,stack:n!=null?n:null,digest:t!=null?t:null}}function gl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Hg=typeof WeakMap=="function"?WeakMap:Map;function hp(e,t,n){n=er(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Si||(Si=!0,Cl=r),gl(e,t)},n}function mp(e,t,n){n=er(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){gl(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){gl(e,t),typeof r!="function"&&(br===null?br=new Set([this]):br.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Du(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Hg;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=rx.bind(null,e,t,n),t.then(e,e))}function Au(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Uu(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=er(-1,1),t.tag=2,yr(n,t,1))),n.lanes|=1),e)}var Vg=ar.ReactCurrentOwner,an=!1;function Gt(e,t,n,r){t.child=e===null?Vf(t,null,n,r):gs(t,e.child,n,r)}function $u(e,t,n,r,s){n=n.render;var a=t.ref;return us(t,s),r=xc(e,t,n,r,a,s),n=vc(),e!==null&&!an?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,sr(e,t,s)):(gt&&n&&ac(t),t.flags|=1,Gt(e,t,r,s),t.child)}function Fu(e,t,n,r,s){if(e===null){var a=n.type;return typeof a=="function"&&!zc(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,gp(e,t,a,r,s)):(e=ni(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&s)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:na,n(o,r)&&e.ref===t.ref)return sr(e,t,s)}return t.flags|=1,e=wr(a,r),e.ref=t.ref,e.return=t,t.child=e}function gp(e,t,n,r,s){if(e!==null){var a=e.memoizedProps;if(na(a,r)&&e.ref===t.ref)if(an=!1,t.pendingProps=r=a,(e.lanes&s)!==0)e.flags&131072&&(an=!0);else return t.lanes=e.lanes,sr(e,t,s)}return xl(e,t,n,r,s)}function xp(e,t,n){var r=t.pendingProps,s=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},st(as,pn),pn|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,st(as,pn),pn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,st(as,pn),pn|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,st(as,pn),pn|=r;return Gt(e,t,s,n),t.child}function vp(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function xl(e,t,n,r,s){var a=ln(n)?Ar:Jt.current;return a=hs(t,a),us(t,s),n=xc(e,t,n,r,a,s),r=vc(),e!==null&&!an?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,sr(e,t,s)):(gt&&r&&ac(t),t.flags|=1,Gt(e,t,n,s),t.child)}function Bu(e,t,n,r,s){if(ln(n)){var a=!0;hi(t)}else a=!1;if(us(t,s),t.stateNode===null)Za(e,t),pp(t,n,r),ml(t,n,r,s),r=!0;else if(e===null){var o=t.stateNode,u=t.memoizedProps;o.props=u;var c=o.context,f=n.contextType;typeof f=="object"&&f!==null?f=Cn(f):(f=ln(n)?Ar:Jt.current,f=hs(t,f));var m=n.getDerivedStateFromProps,k=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";k||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==r||c!==f)&&_u(t,o,r,f),ur=!1;var g=t.memoizedState;o.state=g,yi(t,r,o,s),c=t.memoizedState,u!==r||g!==c||on.current||ur?(typeof m=="function"&&(hl(t,n,m,r),c=t.memoizedState),(u=ur||Ou(t,n,u,r,g,c,f))?(k||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=f,r=u):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Wf(e,t),u=t.memoizedProps,f=t.type===t.elementType?u:Rn(t.type,u),o.props=f,k=t.pendingProps,g=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Cn(c):(c=ln(n)?Ar:Jt.current,c=hs(t,c));var N=n.getDerivedStateFromProps;(m=typeof N=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(u!==k||g!==c)&&_u(t,o,r,c),ur=!1,g=t.memoizedState,o.state=g,yi(t,r,o,s);var v=t.memoizedState;u!==k||g!==v||on.current||ur?(typeof N=="function"&&(hl(t,n,N,r),v=t.memoizedState),(f=ur||Ou(t,n,f,r,g,v,c)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,v,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,v,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),o.props=r,o.state=v,o.context=c,r=f):(typeof o.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return vl(e,t,n,r,a,s)}function vl(e,t,n,r,s,a){vp(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return s&&Eu(t,n,!1),sr(e,t,a);r=t.stateNode,Vg.current=t;var u=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=gs(t,e.child,null,a),t.child=gs(t,null,u,a)):Gt(e,t,u,a),t.memoizedState=r.state,s&&Eu(t,n,!0),t.child}function yp(e){var t=e.stateNode;t.pendingContext?Cu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Cu(e,t.context,!1),pc(e,t.containerInfo)}function Hu(e,t,n,r,s){return ms(),oc(s),t.flags|=256,Gt(e,t,n,r),t.child}var yl={dehydrated:null,treeContext:null,retryLane:0};function bl(e){return{baseLanes:e,cachePool:null,transitions:null}}function bp(e,t,n){var r=t.pendingProps,s=yt.current,a=!1,o=(t.flags&128)!==0,u;if((u=o)||(u=e!==null&&e.memoizedState===null?!1:(s&2)!==0),u?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),st(yt,s&1),e===null)return fl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Wi(o,r,0,null),e=_r(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=bl(n),t.memoizedState=yl,e):kc(t,o));if(s=e.memoizedState,s!==null&&(u=s.dehydrated,u!==null))return Kg(e,t,o,r,u,s,n);if(a){a=r.fallback,o=t.mode,s=e.child,u=s.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=wr(s,c),r.subtreeFlags=s.subtreeFlags&14680064),u!==null?a=wr(u,a):(a=_r(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?bl(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=yl,r}return a=e.child,e=a.sibling,r=wr(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function kc(e,t){return t=Wi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Aa(e,t,n,r){return r!==null&&oc(r),gs(t,e.child,null,n),e=kc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Kg(e,t,n,r,s,a,o){if(n)return t.flags&256?(t.flags&=-257,r=zo(Error(Q(422))),Aa(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,s=t.mode,r=Wi({mode:"visible",children:r.children},s,0,null),a=_r(a,s,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&gs(t,e.child,null,o),t.child.memoizedState=bl(o),t.memoizedState=yl,a);if(!(t.mode&1))return Aa(e,t,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var u=r.dgst;return r=u,a=Error(Q(419)),r=zo(a,r,void 0),Aa(e,t,o,r)}if(u=(o&e.childLanes)!==0,an||u){if(r=At,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==a.retryLane&&(a.retryLane=s,rr(e,s),An(r,e,s,-1))}return Ec(),r=zo(Error(Q(421))),Aa(e,t,o,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=sx.bind(null,e),s._reactRetry=t,null):(e=a.treeContext,hn=vr(s.nextSibling),mn=t,gt=!0,_n=null,e!==null&&(wn[jn++]=Gn,wn[jn++]=Zn,wn[jn++]=Ur,Gn=e.id,Zn=e.overflow,Ur=t),t=kc(t,r.children),t.flags|=4096,t)}function Vu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),pl(e.return,t,n)}function Po(e,t,n,r,s){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=s)}function kp(e,t,n){var r=t.pendingProps,s=r.revealOrder,a=r.tail;if(Gt(e,t,r.children,n),r=yt.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vu(e,n,t);else if(e.tag===19)Vu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(st(yt,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&bi(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Po(t,!1,s,n,a);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&bi(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Po(t,!0,n,null,a);break;case"together":Po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Za(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function sr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Fr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(Q(153));if(t.child!==null){for(e=t.child,n=wr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=wr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Wg(e,t,n){switch(t.tag){case 3:yp(t),ms();break;case 5:Yf(t);break;case 1:ln(t.type)&&hi(t);break;case 4:pc(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;st(xi,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(st(yt,yt.current&1),t.flags|=128,null):n&t.child.childLanes?bp(e,t,n):(st(yt,yt.current&1),e=sr(e,t,n),e!==null?e.sibling:null);st(yt,yt.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return kp(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),st(yt,yt.current),r)break;return null;case 22:case 23:return t.lanes=0,xp(e,t,n)}return sr(e,t,n)}var wp,kl,jp,Sp;wp=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};kl=function(){};jp=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Rr(Qn.current);var a=null;switch(n){case"input":s=Ho(e,s),r=Ho(e,r),a=[];break;case"select":s=kt({},s,{value:void 0}),r=kt({},r,{value:void 0}),a=[];break;case"textarea":s=Wo(e,s),r=Wo(e,r),a=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=fi)}Jo(n,r);var o;n=null;for(f in s)if(!r.hasOwnProperty(f)&&s.hasOwnProperty(f)&&s[f]!=null)if(f==="style"){var u=s[f];for(o in u)u.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(Qs.hasOwnProperty(f)?a||(a=[]):(a=a||[]).push(f,null));for(f in r){var c=r[f];if(u=s!=null?s[f]:void 0,r.hasOwnProperty(f)&&c!==u&&(c!=null||u!=null))if(f==="style")if(u){for(o in u)!u.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&u[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(f,n)),n=c;else f==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,u=u?u.__html:void 0,c!=null&&u!==c&&(a=a||[]).push(f,c)):f==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(f,""+c):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(Qs.hasOwnProperty(f)?(c!=null&&f==="onScroll"&&ct("scroll",e),a||u===c||(a=[])):(a=a||[]).push(f,c))}n&&(a=a||[]).push("style",n);var f=a;(t.updateQueue=f)&&(t.flags|=4)}};Sp=function(e,t,n,r){n!==r&&(t.flags|=4)};function Is(e,t){if(!gt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Wt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Yg(e,t,n){var r=t.pendingProps;switch(ic(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Wt(t),null;case 1:return ln(t.type)&&pi(),Wt(t),null;case 3:return r=t.stateNode,xs(),ut(on),ut(Jt),mc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(_a(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,_n!==null&&(Pl(_n),_n=null))),kl(e,t),Wt(t),null;case 5:hc(t);var s=Rr(oa.current);if(n=t.type,e!==null&&t.stateNode!=null)jp(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(Q(166));return Wt(t),null}if(e=Rr(Qn.current),_a(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[Wn]=t,r[aa]=a,e=(t.mode&1)!==0,n){case"dialog":ct("cancel",r),ct("close",r);break;case"iframe":case"object":case"embed":ct("load",r);break;case"video":case"audio":for(s=0;s<As.length;s++)ct(As[s],r);break;case"source":ct("error",r);break;case"img":case"image":case"link":ct("error",r),ct("load",r);break;case"details":ct("toggle",r);break;case"input":Zc(r,a),ct("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},ct("invalid",r);break;case"textarea":tu(r,a),ct("invalid",r)}Jo(n,a),s=null;for(var o in a)if(a.hasOwnProperty(o)){var u=a[o];o==="children"?typeof u=="string"?r.textContent!==u&&(a.suppressHydrationWarning!==!0&&Oa(r.textContent,u,e),s=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(a.suppressHydrationWarning!==!0&&Oa(r.textContent,u,e),s=["children",""+u]):Qs.hasOwnProperty(o)&&u!=null&&o==="onScroll"&&ct("scroll",r)}switch(n){case"input":Ea(r),eu(r,a,!0);break;case"textarea":Ea(r),nu(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=fi)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Xd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Wn]=t,e[aa]=r,wp(e,t,!1,!1),t.stateNode=e;e:{switch(o=Qo(n,r),n){case"dialog":ct("cancel",e),ct("close",e),s=r;break;case"iframe":case"object":case"embed":ct("load",e),s=r;break;case"video":case"audio":for(s=0;s<As.length;s++)ct(As[s],e);s=r;break;case"source":ct("error",e),s=r;break;case"img":case"image":case"link":ct("error",e),ct("load",e),s=r;break;case"details":ct("toggle",e),s=r;break;case"input":Zc(e,r),s=Ho(e,r),ct("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=kt({},r,{value:void 0}),ct("invalid",e);break;case"textarea":tu(e,r),s=Wo(e,r),ct("invalid",e);break;default:s=r}Jo(n,s),u=s;for(a in u)if(u.hasOwnProperty(a)){var c=u[a];a==="style"?ef(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Gd(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&qs(e,c):typeof c=="number"&&qs(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Qs.hasOwnProperty(a)?c!=null&&a==="onScroll"&&ct("scroll",e):c!=null&&Kl(e,a,c,o))}switch(n){case"input":Ea(e),eu(e,r,!1);break;case"textarea":Ea(e),nu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+jr(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?is(e,!!r.multiple,a,!1):r.defaultValue!=null&&is(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=fi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Wt(t),null;case 6:if(e&&t.stateNode!=null)Sp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(Q(166));if(n=Rr(oa.current),Rr(Qn.current),_a(t)){if(r=t.stateNode,n=t.memoizedProps,r[Wn]=t,(a=r.nodeValue!==n)&&(e=mn,e!==null))switch(e.tag){case 3:Oa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Oa(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Wn]=t,t.stateNode=r}return Wt(t),null;case 13:if(ut(yt),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(gt&&hn!==null&&t.mode&1&&!(t.flags&128))Bf(),ms(),t.flags|=98560,a=!1;else if(a=_a(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(Q(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Q(317));a[Wn]=t}else ms(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Wt(t),a=!1}else _n!==null&&(Pl(_n),_n=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||yt.current&1?Rt===0&&(Rt=3):Ec())),t.updateQueue!==null&&(t.flags|=4),Wt(t),null);case 4:return xs(),kl(e,t),e===null&&ra(t.stateNode.containerInfo),Wt(t),null;case 10:return uc(t.type._context),Wt(t),null;case 17:return ln(t.type)&&pi(),Wt(t),null;case 19:if(ut(yt),a=t.memoizedState,a===null)return Wt(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Is(a,!1);else{if(Rt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=bi(e),o!==null){for(t.flags|=128,Is(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return st(yt,yt.current&1|2),t.child}e=e.sibling}a.tail!==null&&Ct()>ys&&(t.flags|=128,r=!0,Is(a,!1),t.lanes=4194304)}else{if(!r)if(e=bi(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Is(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!gt)return Wt(t),null}else 2*Ct()-a.renderingStartTime>ys&&n!==1073741824&&(t.flags|=128,r=!0,Is(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Ct(),t.sibling=null,n=yt.current,st(yt,r?n&1|2:n&1),t):(Wt(t),null);case 22:case 23:return Cc(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?pn&1073741824&&(Wt(t),t.subtreeFlags&6&&(t.flags|=8192)):Wt(t),null;case 24:return null;case 25:return null}throw Error(Q(156,t.tag))}function Jg(e,t){switch(ic(t),t.tag){case 1:return ln(t.type)&&pi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return xs(),ut(on),ut(Jt),mc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return hc(t),null;case 13:if(ut(yt),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Q(340));ms()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ut(yt),null;case 4:return xs(),null;case 10:return uc(t.type._context),null;case 22:case 23:return Cc(),null;case 24:return null;default:return null}}var Ua=!1,Yt=!1,Qg=typeof WeakSet=="function"?WeakSet:Set,ue=null;function ss(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Nt(e,t,r)}else n.current=null}function wl(e,t,n){try{n()}catch(r){Nt(e,t,r)}}var Ku=!1;function qg(e,t){if(al=ci,e=Pf(),sc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,u=-1,c=-1,f=0,m=0,k=e,g=null;t:for(;;){for(var N;k!==n||s!==0&&k.nodeType!==3||(u=o+s),k!==a||r!==0&&k.nodeType!==3||(c=o+r),k.nodeType===3&&(o+=k.nodeValue.length),(N=k.firstChild)!==null;)g=k,k=N;for(;;){if(k===e)break t;if(g===n&&++f===s&&(u=o),g===a&&++m===r&&(c=o),(N=k.nextSibling)!==null)break;k=g,g=k.parentNode}k=N}n=u===-1||c===-1?null:{start:u,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(il={focusedElem:e,selectionRange:n},ci=!1,ue=t;ue!==null;)if(t=ue,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ue=e;else for(;ue!==null;){t=ue;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,M=v.memoizedState,j=t.stateNode,b=j.getSnapshotBeforeUpdate(t.elementType===t.type?w:Rn(t.type,w),M);j.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var C=t.stateNode.containerInfo;C.nodeType===1?C.textContent="":C.nodeType===9&&C.documentElement&&C.removeChild(C.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(Q(163))}}catch(E){Nt(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,ue=e;break}ue=t.return}return v=Ku,Ku=!1,v}function Ks(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var a=s.destroy;s.destroy=void 0,a!==void 0&&wl(t,n,a)}s=s.next}while(s!==r)}}function Vi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function jl(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Np(e){var t=e.alternate;t!==null&&(e.alternate=null,Np(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Wn],delete t[aa],delete t[cl],delete t[Lg],delete t[Tg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Cp(e){return e.tag===5||e.tag===3||e.tag===4}function Wu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Cp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Sl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=fi));else if(r!==4&&(e=e.child,e!==null))for(Sl(e,t,n),e=e.sibling;e!==null;)Sl(e,t,n),e=e.sibling}function Nl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Nl(e,t,n),e=e.sibling;e!==null;)Nl(e,t,n),e=e.sibling}var Ut=null,On=!1;function lr(e,t,n){for(n=n.child;n!==null;)Ep(e,t,n),n=n.sibling}function Ep(e,t,n){if(Jn&&typeof Jn.onCommitFiberUnmount=="function")try{Jn.onCommitFiberUnmount(_i,n)}catch{}switch(n.tag){case 5:Yt||ss(n,t);case 6:var r=Ut,s=On;Ut=null,lr(e,t,n),Ut=r,On=s,Ut!==null&&(On?(e=Ut,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ut.removeChild(n.stateNode));break;case 18:Ut!==null&&(On?(e=Ut,n=n.stateNode,e.nodeType===8?wo(e.parentNode,n):e.nodeType===1&&wo(e,n),ea(e)):wo(Ut,n.stateNode));break;case 4:r=Ut,s=On,Ut=n.stateNode.containerInfo,On=!0,lr(e,t,n),Ut=r,On=s;break;case 0:case 11:case 14:case 15:if(!Yt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var a=s,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&wl(n,t,o),s=s.next}while(s!==r)}lr(e,t,n);break;case 1:if(!Yt&&(ss(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(u){Nt(n,t,u)}lr(e,t,n);break;case 21:lr(e,t,n);break;case 22:n.mode&1?(Yt=(r=Yt)||n.memoizedState!==null,lr(e,t,n),Yt=r):lr(e,t,n);break;default:lr(e,t,n)}}function Yu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Qg),t.forEach(function(r){var s=ax.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Tn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var a=e,o=t,u=o;e:for(;u!==null;){switch(u.tag){case 5:Ut=u.stateNode,On=!1;break e;case 3:Ut=u.stateNode.containerInfo,On=!0;break e;case 4:Ut=u.stateNode.containerInfo,On=!0;break e}u=u.return}if(Ut===null)throw Error(Q(160));Ep(a,o,s),Ut=null,On=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(f){Nt(s,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)zp(t,e),t=t.sibling}function zp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Tn(t,e),Vn(e),r&4){try{Ks(3,e,e.return),Vi(3,e)}catch(w){Nt(e,e.return,w)}try{Ks(5,e,e.return)}catch(w){Nt(e,e.return,w)}}break;case 1:Tn(t,e),Vn(e),r&512&&n!==null&&ss(n,n.return);break;case 5:if(Tn(t,e),Vn(e),r&512&&n!==null&&ss(n,n.return),e.flags&32){var s=e.stateNode;try{qs(s,"")}catch(w){Nt(e,e.return,w)}}if(r&4&&(s=e.stateNode,s!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,u=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{u==="input"&&a.type==="radio"&&a.name!=null&&Qd(s,a),Qo(u,o);var f=Qo(u,a);for(o=0;o<c.length;o+=2){var m=c[o],k=c[o+1];m==="style"?ef(s,k):m==="dangerouslySetInnerHTML"?Gd(s,k):m==="children"?qs(s,k):Kl(s,m,k,f)}switch(u){case"input":Vo(s,a);break;case"textarea":qd(s,a);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!a.multiple;var N=a.value;N!=null?is(s,!!a.multiple,N,!1):g!==!!a.multiple&&(a.defaultValue!=null?is(s,!!a.multiple,a.defaultValue,!0):is(s,!!a.multiple,a.multiple?[]:"",!1))}s[aa]=a}catch(w){Nt(e,e.return,w)}}break;case 6:if(Tn(t,e),Vn(e),r&4){if(e.stateNode===null)throw Error(Q(162));s=e.stateNode,a=e.memoizedProps;try{s.nodeValue=a}catch(w){Nt(e,e.return,w)}}break;case 3:if(Tn(t,e),Vn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ea(t.containerInfo)}catch(w){Nt(e,e.return,w)}break;case 4:Tn(t,e),Vn(e);break;case 13:Tn(t,e),Vn(e),s=e.child,s.flags&8192&&(a=s.memoizedState!==null,s.stateNode.isHidden=a,!a||s.alternate!==null&&s.alternate.memoizedState!==null||(Sc=Ct())),r&4&&Yu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Yt=(f=Yt)||m,Tn(t,e),Yt=f):Tn(t,e),Vn(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!m&&e.mode&1)for(ue=e,m=e.child;m!==null;){for(k=ue=m;ue!==null;){switch(g=ue,N=g.child,g.tag){case 0:case 11:case 14:case 15:Ks(4,g,g.return);break;case 1:ss(g,g.return);var v=g.stateNode;if(typeof v.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(w){Nt(r,n,w)}}break;case 5:ss(g,g.return);break;case 22:if(g.memoizedState!==null){Qu(k);continue}}N!==null?(N.return=g,ue=N):Qu(k)}m=m.sibling}e:for(m=null,k=e;;){if(k.tag===5){if(m===null){m=k;try{s=k.stateNode,f?(a=s.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(u=k.stateNode,c=k.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,u.style.display=Zd("display",o))}catch(w){Nt(e,e.return,w)}}}else if(k.tag===6){if(m===null)try{k.stateNode.nodeValue=f?"":k.memoizedProps}catch(w){Nt(e,e.return,w)}}else if((k.tag!==22&&k.tag!==23||k.memoizedState===null||k===e)&&k.child!==null){k.child.return=k,k=k.child;continue}if(k===e)break e;for(;k.sibling===null;){if(k.return===null||k.return===e)break e;m===k&&(m=null),k=k.return}m===k&&(m=null),k.sibling.return=k.return,k=k.sibling}}break;case 19:Tn(t,e),Vn(e),r&4&&Yu(e);break;case 21:break;default:Tn(t,e),Vn(e)}}function Vn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Cp(n)){var r=n;break e}n=n.return}throw Error(Q(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(qs(s,""),r.flags&=-33);var a=Wu(e);Nl(e,a,s);break;case 3:case 4:var o=r.stateNode.containerInfo,u=Wu(e);Sl(e,u,o);break;default:throw Error(Q(161))}}catch(c){Nt(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Xg(e,t,n){ue=e,Pp(e)}function Pp(e,t,n){for(var r=(e.mode&1)!==0;ue!==null;){var s=ue,a=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Ua;if(!o){var u=s.alternate,c=u!==null&&u.memoizedState!==null||Yt;u=Ua;var f=Yt;if(Ua=o,(Yt=c)&&!f)for(ue=s;ue!==null;)o=ue,c=o.child,o.tag===22&&o.memoizedState!==null?qu(s):c!==null?(c.return=o,ue=c):qu(s);for(;a!==null;)ue=a,Pp(a),a=a.sibling;ue=s,Ua=u,Yt=f}Ju(e)}else s.subtreeFlags&8772&&a!==null?(a.return=s,ue=a):Ju(e)}}function Ju(e){for(;ue!==null;){var t=ue;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Yt||Vi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Yt)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Rn(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Lu(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Lu(t,o,n)}break;case 5:var u=t.stateNode;if(n===null&&t.flags&4){n=u;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var m=f.memoizedState;if(m!==null){var k=m.dehydrated;k!==null&&ea(k)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(Q(163))}Yt||t.flags&512&&jl(t)}catch(g){Nt(t,t.return,g)}}if(t===e){ue=null;break}if(n=t.sibling,n!==null){n.return=t.return,ue=n;break}ue=t.return}}function Qu(e){for(;ue!==null;){var t=ue;if(t===e){ue=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ue=n;break}ue=t.return}}function qu(e){for(;ue!==null;){var t=ue;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Vi(4,t)}catch(c){Nt(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(c){Nt(t,s,c)}}var a=t.return;try{jl(t)}catch(c){Nt(t,a,c)}break;case 5:var o=t.return;try{jl(t)}catch(c){Nt(t,o,c)}}}catch(c){Nt(t,t.return,c)}if(t===e){ue=null;break}var u=t.sibling;if(u!==null){u.return=t.return,ue=u;break}ue=t.return}}var Gg=Math.ceil,ji=ar.ReactCurrentDispatcher,wc=ar.ReactCurrentOwner,Nn=ar.ReactCurrentBatchConfig,Je=0,At=null,Et=null,$t=0,pn=0,as=Er(0),Rt=0,da=null,Fr=0,Ki=0,jc=0,Ws=null,sn=null,Sc=0,ys=1/0,qn=null,Si=!1,Cl=null,br=null,$a=!1,hr=null,Ni=0,Ys=0,El=null,ei=-1,ti=0;function Zt(){return Je&6?Ct():ei!==-1?ei:ei=Ct()}function kr(e){return e.mode&1?Je&2&&$t!==0?$t&-$t:Og.transition!==null?(ti===0&&(ti=pf()),ti):(e=tt,e!==0||(e=window.event,e=e===void 0?16:bf(e.type)),e):1}function An(e,t,n,r){if(50<Ys)throw Ys=0,El=null,Error(Q(185));va(e,n,r),(!(Je&2)||e!==At)&&(e===At&&(!(Je&2)&&(Ki|=n),Rt===4&&fr(e,$t)),cn(e,r),n===1&&Je===0&&!(t.mode&1)&&(ys=Ct()+500,Fi&&zr()))}function cn(e,t){var n=e.callbackNode;Om(e,t);var r=li(e,e===At?$t:0);if(r===0)n!==null&&au(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&au(n),t===1)e.tag===0?Rg(Xu.bind(null,e)):Uf(Xu.bind(null,e)),Ig(function(){!(Je&6)&&zr()}),n=null;else{switch(hf(r)){case 1:n=ql;break;case 4:n=df;break;case 16:n=oi;break;case 536870912:n=ff;break;default:n=oi}n=Dp(n,Ip.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ip(e,t){if(ei=-1,ti=0,Je&6)throw Error(Q(327));var n=e.callbackNode;if(ds()&&e.callbackNode!==n)return null;var r=li(e,e===At?$t:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ci(e,r);else{t=r;var s=Je;Je|=2;var a=Lp();(At!==e||$t!==t)&&(qn=null,ys=Ct()+500,Or(e,t));do try{tx();break}catch(u){Mp(e,u)}while(!0);cc(),ji.current=a,Je=s,Et!==null?t=0:(At=null,$t=0,t=Rt)}if(t!==0){if(t===2&&(s=el(e),s!==0&&(r=s,t=zl(e,s))),t===1)throw n=da,Or(e,0),fr(e,r),cn(e,Ct()),n;if(t===6)fr(e,r);else{if(s=e.current.alternate,!(r&30)&&!Zg(s)&&(t=Ci(e,r),t===2&&(a=el(e),a!==0&&(r=a,t=zl(e,a))),t===1))throw n=da,Or(e,0),fr(e,r),cn(e,Ct()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(Q(345));case 2:Mr(e,sn,qn);break;case 3:if(fr(e,r),(r&130023424)===r&&(t=Sc+500-Ct(),10<t)){if(li(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){Zt(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=ll(Mr.bind(null,e,sn,qn),t);break}Mr(e,sn,qn);break;case 4:if(fr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var o=31-Dn(r);a=1<<o,o=t[o],o>s&&(s=o),r&=~a}if(r=s,r=Ct()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Gg(r/1960))-r,10<r){e.timeoutHandle=ll(Mr.bind(null,e,sn,qn),r);break}Mr(e,sn,qn);break;case 5:Mr(e,sn,qn);break;default:throw Error(Q(329))}}}return cn(e,Ct()),e.callbackNode===n?Ip.bind(null,e):null}function zl(e,t){var n=Ws;return e.current.memoizedState.isDehydrated&&(Or(e,t).flags|=256),e=Ci(e,t),e!==2&&(t=sn,sn=n,t!==null&&Pl(t)),e}function Pl(e){sn===null?sn=e:sn.push.apply(sn,e)}function Zg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],a=s.getSnapshot;s=s.value;try{if(!Un(a(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function fr(e,t){for(t&=~jc,t&=~Ki,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Dn(t),r=1<<n;e[n]=-1,t&=~r}}function Xu(e){if(Je&6)throw Error(Q(327));ds();var t=li(e,0);if(!(t&1))return cn(e,Ct()),null;var n=Ci(e,t);if(e.tag!==0&&n===2){var r=el(e);r!==0&&(t=r,n=zl(e,r))}if(n===1)throw n=da,Or(e,0),fr(e,t),cn(e,Ct()),n;if(n===6)throw Error(Q(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Mr(e,sn,qn),cn(e,Ct()),null}function Nc(e,t){var n=Je;Je|=1;try{return e(t)}finally{Je=n,Je===0&&(ys=Ct()+500,Fi&&zr())}}function Br(e){hr!==null&&hr.tag===0&&!(Je&6)&&ds();var t=Je;Je|=1;var n=Nn.transition,r=tt;try{if(Nn.transition=null,tt=1,e)return e()}finally{tt=r,Nn.transition=n,Je=t,!(Je&6)&&zr()}}function Cc(){pn=as.current,ut(as)}function Or(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Pg(n)),Et!==null)for(n=Et.return;n!==null;){var r=n;switch(ic(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&pi();break;case 3:xs(),ut(on),ut(Jt),mc();break;case 5:hc(r);break;case 4:xs();break;case 13:ut(yt);break;case 19:ut(yt);break;case 10:uc(r.type._context);break;case 22:case 23:Cc()}n=n.return}if(At=e,Et=e=wr(e.current,null),$t=pn=t,Rt=0,da=null,jc=Ki=Fr=0,sn=Ws=null,Tr!==null){for(t=0;t<Tr.length;t++)if(n=Tr[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=s,r.next=o}n.pending=r}Tr=null}return e}function Mp(e,t){do{var n=Et;try{if(cc(),Xa.current=wi,ki){for(var r=bt.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ki=!1}if($r=0,Dt=Tt=bt=null,Vs=!1,la=0,wc.current=null,n===null||n.return===null){Rt=1,da=t,Et=null;break}e:{var a=e,o=n.return,u=n,c=t;if(t=$t,u.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var f=c,m=u,k=m.tag;if(!(m.mode&1)&&(k===0||k===11||k===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var N=Au(o);if(N!==null){N.flags&=-257,Uu(N,o,u,a,t),N.mode&1&&Du(a,f,t),t=N,c=f;var v=t.updateQueue;if(v===null){var w=new Set;w.add(c),t.updateQueue=w}else v.add(c);break e}else{if(!(t&1)){Du(a,f,t),Ec();break e}c=Error(Q(426))}}else if(gt&&u.mode&1){var M=Au(o);if(M!==null){!(M.flags&65536)&&(M.flags|=256),Uu(M,o,u,a,t),oc(vs(c,u));break e}}a=c=vs(c,u),Rt!==4&&(Rt=2),Ws===null?Ws=[a]:Ws.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var j=hp(a,c,t);Mu(a,j);break e;case 1:u=c;var b=a.type,C=a.stateNode;if(!(a.flags&128)&&(typeof b.getDerivedStateFromError=="function"||C!==null&&typeof C.componentDidCatch=="function"&&(br===null||!br.has(C)))){a.flags|=65536,t&=-t,a.lanes|=t;var E=mp(a,u,t);Mu(a,E);break e}}a=a.return}while(a!==null)}Rp(n)}catch(L){t=L,Et===n&&n!==null&&(Et=n=n.return);continue}break}while(!0)}function Lp(){var e=ji.current;return ji.current=wi,e===null?wi:e}function Ec(){(Rt===0||Rt===3||Rt===2)&&(Rt=4),At===null||!(Fr&268435455)&&!(Ki&268435455)||fr(At,$t)}function Ci(e,t){var n=Je;Je|=2;var r=Lp();(At!==e||$t!==t)&&(qn=null,Or(e,t));do try{ex();break}catch(s){Mp(e,s)}while(!0);if(cc(),Je=n,ji.current=r,Et!==null)throw Error(Q(261));return At=null,$t=0,Rt}function ex(){for(;Et!==null;)Tp(Et)}function tx(){for(;Et!==null&&!Cm();)Tp(Et)}function Tp(e){var t=_p(e.alternate,e,pn);e.memoizedProps=e.pendingProps,t===null?Rp(e):Et=t,wc.current=null}function Rp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Jg(n,t),n!==null){n.flags&=32767,Et=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Rt=6,Et=null;return}}else if(n=Yg(n,t,pn),n!==null){Et=n;return}if(t=t.sibling,t!==null){Et=t;return}Et=t=e}while(t!==null);Rt===0&&(Rt=5)}function Mr(e,t,n){var r=tt,s=Nn.transition;try{Nn.transition=null,tt=1,nx(e,t,n,r)}finally{Nn.transition=s,tt=r}return null}function nx(e,t,n,r){do ds();while(hr!==null);if(Je&6)throw Error(Q(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(Q(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(_m(e,a),e===At&&(Et=At=null,$t=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$a||($a=!0,Dp(oi,function(){return ds(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Nn.transition,Nn.transition=null;var o=tt;tt=1;var u=Je;Je|=4,wc.current=null,qg(e,n),zp(n,e),wg(il),ci=!!al,il=al=null,e.current=n,Xg(n),Em(),Je=u,tt=o,Nn.transition=a}else e.current=n;if($a&&($a=!1,hr=e,Ni=s),a=e.pendingLanes,a===0&&(br=null),Im(n.stateNode),cn(e,Ct()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Si)throw Si=!1,e=Cl,Cl=null,e;return Ni&1&&e.tag!==0&&ds(),a=e.pendingLanes,a&1?e===El?Ys++:(Ys=0,El=e):Ys=0,zr(),null}function ds(){if(hr!==null){var e=hf(Ni),t=Nn.transition,n=tt;try{if(Nn.transition=null,tt=16>e?16:e,hr===null)var r=!1;else{if(e=hr,hr=null,Ni=0,Je&6)throw Error(Q(331));var s=Je;for(Je|=4,ue=e.current;ue!==null;){var a=ue,o=a.child;if(ue.flags&16){var u=a.deletions;if(u!==null){for(var c=0;c<u.length;c++){var f=u[c];for(ue=f;ue!==null;){var m=ue;switch(m.tag){case 0:case 11:case 15:Ks(8,m,a)}var k=m.child;if(k!==null)k.return=m,ue=k;else for(;ue!==null;){m=ue;var g=m.sibling,N=m.return;if(Np(m),m===f){ue=null;break}if(g!==null){g.return=N,ue=g;break}ue=N}}}var v=a.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var M=w.sibling;w.sibling=null,w=M}while(w!==null)}}ue=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,ue=o;else e:for(;ue!==null;){if(a=ue,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Ks(9,a,a.return)}var j=a.sibling;if(j!==null){j.return=a.return,ue=j;break e}ue=a.return}}var b=e.current;for(ue=b;ue!==null;){o=ue;var C=o.child;if(o.subtreeFlags&2064&&C!==null)C.return=o,ue=C;else e:for(o=b;ue!==null;){if(u=ue,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Vi(9,u)}}catch(L){Nt(u,u.return,L)}if(u===o){ue=null;break e}var E=u.sibling;if(E!==null){E.return=u.return,ue=E;break e}ue=u.return}}if(Je=s,zr(),Jn&&typeof Jn.onPostCommitFiberRoot=="function")try{Jn.onPostCommitFiberRoot(_i,e)}catch{}r=!0}return r}finally{tt=n,Nn.transition=t}}return!1}function Gu(e,t,n){t=vs(n,t),t=hp(e,t,1),e=yr(e,t,1),t=Zt(),e!==null&&(va(e,1,t),cn(e,t))}function Nt(e,t,n){if(e.tag===3)Gu(e,e,n);else for(;t!==null;){if(t.tag===3){Gu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(br===null||!br.has(r))){e=vs(n,e),e=mp(t,e,1),t=yr(t,e,1),e=Zt(),t!==null&&(va(t,1,e),cn(t,e));break}}t=t.return}}function rx(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Zt(),e.pingedLanes|=e.suspendedLanes&n,At===e&&($t&n)===n&&(Rt===4||Rt===3&&($t&130023424)===$t&&500>Ct()-Sc?Or(e,0):jc|=n),cn(e,t)}function Op(e,t){t===0&&(e.mode&1?(t=Ia,Ia<<=1,!(Ia&130023424)&&(Ia=4194304)):t=1);var n=Zt();e=rr(e,t),e!==null&&(va(e,t,n),cn(e,n))}function sx(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Op(e,n)}function ax(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(Q(314))}r!==null&&r.delete(t),Op(e,n)}var _p;_p=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||on.current)an=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return an=!1,Wg(e,t,n);an=!!(e.flags&131072)}else an=!1,gt&&t.flags&1048576&&$f(t,gi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Za(e,t),e=t.pendingProps;var s=hs(t,Jt.current);us(t,n),s=xc(null,t,r,e,s,n);var a=vc();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ln(r)?(a=!0,hi(t)):a=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,fc(t),s.updater=Hi,t.stateNode=s,s._reactInternals=t,ml(t,r,e,n),t=vl(null,t,r,!0,a,n)):(t.tag=0,gt&&a&&ac(t),Gt(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Za(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=ox(r),e=Rn(r,e),s){case 0:t=xl(null,t,r,e,n);break e;case 1:t=Bu(null,t,r,e,n);break e;case 11:t=$u(null,t,r,e,n);break e;case 14:t=Fu(null,t,r,Rn(r.type,e),n);break e}throw Error(Q(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rn(r,s),xl(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rn(r,s),Bu(e,t,r,s,n);case 3:e:{if(yp(t),e===null)throw Error(Q(387));r=t.pendingProps,a=t.memoizedState,s=a.element,Wf(e,t),yi(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){s=vs(Error(Q(423)),t),t=Hu(e,t,r,n,s);break e}else if(r!==s){s=vs(Error(Q(424)),t),t=Hu(e,t,r,n,s);break e}else for(hn=vr(t.stateNode.containerInfo.firstChild),mn=t,gt=!0,_n=null,n=Vf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ms(),r===s){t=sr(e,t,n);break e}Gt(e,t,r,n)}t=t.child}return t;case 5:return Yf(t),e===null&&fl(t),r=t.type,s=t.pendingProps,a=e!==null?e.memoizedProps:null,o=s.children,ol(r,s)?o=null:a!==null&&ol(r,a)&&(t.flags|=32),vp(e,t),Gt(e,t,o,n),t.child;case 6:return e===null&&fl(t),null;case 13:return bp(e,t,n);case 4:return pc(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=gs(t,null,r,n):Gt(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rn(r,s),$u(e,t,r,s,n);case 7:return Gt(e,t,t.pendingProps,n),t.child;case 8:return Gt(e,t,t.pendingProps.children,n),t.child;case 12:return Gt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,a=t.memoizedProps,o=s.value,st(xi,r._currentValue),r._currentValue=o,a!==null)if(Un(a.value,o)){if(a.children===s.children&&!on.current){t=sr(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var u=a.dependencies;if(u!==null){o=a.child;for(var c=u.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=er(-1,n&-n),c.tag=2;var f=a.updateQueue;if(f!==null){f=f.shared;var m=f.pending;m===null?c.next=c:(c.next=m.next,m.next=c),f.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),pl(a.return,n,t),u.lanes|=n;break}c=c.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(Q(341));o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),pl(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}Gt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,us(t,n),s=Cn(s),r=r(s),t.flags|=1,Gt(e,t,r,n),t.child;case 14:return r=t.type,s=Rn(r,t.pendingProps),s=Rn(r.type,s),Fu(e,t,r,s,n);case 15:return gp(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:Rn(r,s),Za(e,t),t.tag=1,ln(r)?(e=!0,hi(t)):e=!1,us(t,n),pp(t,r,s),ml(t,r,s,n),vl(null,t,r,!0,e,n);case 19:return kp(e,t,n);case 22:return xp(e,t,n)}throw Error(Q(156,t.tag))};function Dp(e,t){return uf(e,t)}function ix(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Sn(e,t,n,r){return new ix(e,t,n,r)}function zc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ox(e){if(typeof e=="function")return zc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Yl)return 11;if(e===Jl)return 14}return 2}function wr(e,t){var n=e.alternate;return n===null?(n=Sn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ni(e,t,n,r,s,a){var o=2;if(r=e,typeof e=="function")zc(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Qr:return _r(n.children,s,a,t);case Wl:o=8,s|=8;break;case Uo:return e=Sn(12,n,t,s|2),e.elementType=Uo,e.lanes=a,e;case $o:return e=Sn(13,n,t,s),e.elementType=$o,e.lanes=a,e;case Fo:return e=Sn(19,n,t,s),e.elementType=Fo,e.lanes=a,e;case Wd:return Wi(n,s,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Vd:o=10;break e;case Kd:o=9;break e;case Yl:o=11;break e;case Jl:o=14;break e;case cr:o=16,r=null;break e}throw Error(Q(130,e==null?e:typeof e,""))}return t=Sn(o,n,t,s),t.elementType=e,t.type=r,t.lanes=a,t}function _r(e,t,n,r){return e=Sn(7,e,r,t),e.lanes=n,e}function Wi(e,t,n,r){return e=Sn(22,e,r,t),e.elementType=Wd,e.lanes=n,e.stateNode={isHidden:!1},e}function Io(e,t,n){return e=Sn(6,e,null,t),e.lanes=n,e}function Mo(e,t,n){return t=Sn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function lx(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=uo(0),this.expirationTimes=uo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=uo(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Pc(e,t,n,r,s,a,o,u,c){return e=new lx(e,t,n,u,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Sn(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},fc(a),e}function cx(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Ap(e){if(!e)return Sr;e=e._reactInternals;e:{if(Vr(e)!==e||e.tag!==1)throw Error(Q(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ln(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(Q(171))}if(e.tag===1){var n=e.type;if(ln(n))return Af(e,n,t)}return t}function Up(e,t,n,r,s,a,o,u,c){return e=Pc(n,r,!0,e,s,a,o,u,c),e.context=Ap(null),n=e.current,r=Zt(),s=kr(n),a=er(r,s),a.callback=t!=null?t:null,yr(n,a,s),e.current.lanes=s,va(e,s,r),cn(e,r),e}function Yi(e,t,n,r){var s=t.current,a=Zt(),o=kr(s);return n=Ap(n),t.context===null?t.context=n:t.pendingContext=n,t=er(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=yr(s,t,o),e!==null&&(An(e,s,o,a),qa(e,s,o)),o}function Ei(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Zu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ic(e,t){Zu(e,t),(e=e.alternate)&&Zu(e,t)}function ux(){return null}var $p=typeof reportError=="function"?reportError:function(e){console.error(e)};function Mc(e){this._internalRoot=e}Ji.prototype.render=Mc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Q(409));Yi(e,t,null,null)};Ji.prototype.unmount=Mc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Br(function(){Yi(null,e,null,null)}),t[nr]=null}};function Ji(e){this._internalRoot=e}Ji.prototype.unstable_scheduleHydration=function(e){if(e){var t=xf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<dr.length&&t!==0&&t<dr[n].priority;n++);dr.splice(n,0,e),n===0&&yf(e)}};function Lc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Qi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ed(){}function dx(e,t,n,r,s){if(s){if(typeof r=="function"){var a=r;r=function(){var f=Ei(o);a.call(f)}}var o=Up(t,r,e,0,null,!1,!1,"",ed);return e._reactRootContainer=o,e[nr]=o.current,ra(e.nodeType===8?e.parentNode:e),Br(),o}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var u=r;r=function(){var f=Ei(c);u.call(f)}}var c=Pc(e,0,!1,null,null,!1,!1,"",ed);return e._reactRootContainer=c,e[nr]=c.current,ra(e.nodeType===8?e.parentNode:e),Br(function(){Yi(t,c,n,r)}),c}function qi(e,t,n,r,s){var a=n._reactRootContainer;if(a){var o=a;if(typeof s=="function"){var u=s;s=function(){var c=Ei(o);u.call(c)}}Yi(t,o,e,s)}else o=dx(n,t,e,s,r);return Ei(o)}mf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Ds(t.pendingLanes);n!==0&&(Xl(t,n|1),cn(t,Ct()),!(Je&6)&&(ys=Ct()+500,zr()))}break;case 13:Br(function(){var r=rr(e,1);if(r!==null){var s=Zt();An(r,e,1,s)}}),Ic(e,1)}};Gl=function(e){if(e.tag===13){var t=rr(e,134217728);if(t!==null){var n=Zt();An(t,e,134217728,n)}Ic(e,134217728)}};gf=function(e){if(e.tag===13){var t=kr(e),n=rr(e,t);if(n!==null){var r=Zt();An(n,e,t,r)}Ic(e,t)}};xf=function(){return tt};vf=function(e,t){var n=tt;try{return tt=e,t()}finally{tt=n}};Xo=function(e,t,n){switch(t){case"input":if(Vo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=$i(r);if(!s)throw Error(Q(90));Jd(r),Vo(r,s)}}}break;case"textarea":qd(e,n);break;case"select":t=n.value,t!=null&&is(e,!!n.multiple,t,!1)}};rf=Nc;sf=Br;var fx={usingClientEntryPoint:!1,Events:[ba,Zr,$i,tf,nf,Nc]},Ms={findFiberByHostInstance:Lr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},px={bundleType:Ms.bundleType,version:Ms.version,rendererPackageName:Ms.rendererPackageName,rendererConfig:Ms.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ar.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=lf(e),e===null?null:e.stateNode},findFiberByHostInstance:Ms.findFiberByHostInstance||ux,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Fa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Fa.isDisabled&&Fa.supportsFiber)try{_i=Fa.inject(px),Jn=Fa}catch{}}xn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fx;xn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Lc(t))throw Error(Q(200));return cx(e,t,null,n)};xn.createRoot=function(e,t){if(!Lc(e))throw Error(Q(299));var n=!1,r="",s=$p;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Pc(e,1,!1,null,null,n,!1,r,s),e[nr]=t.current,ra(e.nodeType===8?e.parentNode:e),new Mc(t)};xn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Q(188)):(e=Object.keys(e).join(","),Error(Q(268,e)));return e=lf(t),e=e===null?null:e.stateNode,e};xn.flushSync=function(e){return Br(e)};xn.hydrate=function(e,t,n){if(!Qi(t))throw Error(Q(200));return qi(null,e,t,!0,n)};xn.hydrateRoot=function(e,t,n){if(!Lc(e))throw Error(Q(405));var r=n!=null&&n.hydratedSources||null,s=!1,a="",o=$p;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Up(t,null,e,1,n!=null?n:null,s,!1,a,o),e[nr]=t.current,ra(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new Ji(t)};xn.render=function(e,t,n){if(!Qi(t))throw Error(Q(200));return qi(null,e,t,!1,n)};xn.unmountComponentAtNode=function(e){if(!Qi(e))throw Error(Q(40));return e._reactRootContainer?(Br(function(){qi(null,null,e,!1,function(){e._reactRootContainer=null,e[nr]=null})}),!0):!1};xn.unstable_batchedUpdates=Nc;xn.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Qi(n))throw Error(Q(200));if(e==null||e._reactInternals===void 0)throw Error(Q(38));return qi(e,t,n,!1,r)};xn.version="18.3.1-next-f1338f8080-20240426";function Fp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Fp)}catch(e){console.error(e)}}Fp(),$d.exports=xn;var hx=$d.exports,td=hx;Do.createRoot=td.createRoot,Do.hydrateRoot=td.hydrateRoot;function mx(){if(console&&console.warn){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Dr(t[0])&&(t[0]=`react-i18next:: ${t[0]}`),console.warn(...t)}}const nd={};function Il(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Dr(t[0])&&nd[t[0]]||(Dr(t[0])&&(nd[t[0]]=new Date),mx(...t))}const Bp=(e,t)=>()=>{if(e.isInitialized)t();else{const n=()=>{setTimeout(()=>{e.off("initialized",n)},0),t()};e.on("initialized",n)}},rd=(e,t,n)=>{e.loadNamespaces(t,Bp(e,n))},sd=(e,t,n,r)=>{Dr(n)&&(n=[n]),n.forEach(s=>{e.options.ns.indexOf(s)<0&&e.options.ns.push(s)}),e.loadLanguages(t,Bp(e,r))},gx=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const r=t.languages[0],s=t.options?t.options.fallbackLng:!1,a=t.languages[t.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(u,c)=>{const f=t.services.backendConnector.state[`${u}|${c}`];return f===-1||f===2};return n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!o(t.isLanguageChangingTo,e)?!1:!!(t.hasResourceBundle(r,e)||!t.services.backendConnector.backend||t.options.resources&&!t.options.partialBundledLanguages||o(r,e)&&(!s||o(a,e)))},xx=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return!t.languages||!t.languages.length?(Il("i18n.languages were undefined or empty",t.languages),!0):t.options.ignoreJSONStructure!==void 0?t.hasLoadedNamespace(e,{lng:n.lng,precheck:(s,a)=>{if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!a(s.isLanguageChangingTo,e))return!1}}):gx(e,t,n)},Dr=e=>typeof e=="string",vx=e=>typeof e=="object"&&e!==null,yx=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,bx={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},kx=e=>bx[e],wx=e=>e.replace(yx,kx);let Ml={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:wx};const jx=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ml={...Ml,...e}},Sx=()=>Ml;let Hp;const Nx=e=>{Hp=e},Cx=()=>Hp,Ex={type:"3rdParty",init(e){jx(e.options.react),Nx(e)}},zx=y.createContext();class Px{constructor(){Wc(this,"getUsedNamespaces",()=>Object.keys(this.usedNamespaces));this.usedNamespaces={}}addUsedNamespaces(t){t.forEach(n=>{this.usedNamespaces[n]||(this.usedNamespaces[n]=!0)})}}const Ix=(e,t)=>{const n=y.useRef();return y.useEffect(()=>{n.current=e},[e,t]),n.current},Vp=(e,t,n,r)=>e.getFixedT(t,n,r),Mx=(e,t,n,r)=>y.useCallback(Vp(e,t,n,r),[e,t,n,r]),Qe=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{i18n:n}=t,{i18n:r,defaultNS:s}=y.useContext(zx)||{},a=n||r||Cx();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new Px),!a){Il("You will need to pass in an i18next instance by using initReactI18next");const E=(_,D)=>Dr(D)?D:vx(D)&&Dr(D.defaultValue)?D.defaultValue:Array.isArray(_)?_[_.length-1]:_,L=[E,{},!1];return L.t=E,L.i18n={},L.ready=!1,L}a.options.react&&a.options.react.wait!==void 0&&Il("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const o={...Sx(),...a.options.react,...t},{useSuspense:u,keyPrefix:c}=o;let f=s||a.options&&a.options.defaultNS;f=Dr(f)?[f]:f||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(f);const m=(a.isInitialized||a.initializedStoreOnce)&&f.every(E=>xx(E,a,o)),k=Mx(a,t.lng||null,o.nsMode==="fallback"?f:f[0],c),g=()=>k,N=()=>Vp(a,t.lng||null,o.nsMode==="fallback"?f:f[0],c),[v,w]=y.useState(g);let M=f.join();t.lng&&(M=`${t.lng}${M}`);const j=Ix(M),b=y.useRef(!0);y.useEffect(()=>{const{bindI18n:E,bindI18nStore:L}=o;b.current=!0,!m&&!u&&(t.lng?sd(a,t.lng,f,()=>{b.current&&w(N)}):rd(a,f,()=>{b.current&&w(N)})),m&&j&&j!==M&&b.current&&w(N);const _=()=>{b.current&&w(N)};return E&&a&&a.on(E,_),L&&a&&a.store.on(L,_),()=>{b.current=!1,E&&a&&E.split(" ").forEach(D=>a.off(D,_)),L&&a&&L.split(" ").forEach(D=>a.store.off(D,_))}},[a,M]),y.useEffect(()=>{b.current&&m&&w(g)},[a,c,m]);const C=[v,a,m];if(C.t=v,C.i18n=a,C.ready=m,m||!m&&!u)return C;throw new Promise(E=>{t.lng?sd(a,t.lng,f,()=>E()):rd(a,f,()=>E())})};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Lx={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tx=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=(e,t)=>{const n=y.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:a=2,absoluteStrokeWidth:o,className:u="",children:c,...f},m)=>y.createElement("svg",{ref:m,...Lx,width:s,height:s,stroke:r,strokeWidth:o?Number(a)*24/Number(s):a,className:["lucide",`lucide-${Tx(e)}`,u].join(" "),...f},[...t.map(([k,g])=>y.createElement(k,g)),...Array.isArray(c)?c:[c]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rx=ee("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ox=ee("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _x=ee("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dx=ee("AtSign",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",key:"7n84p3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=ee("BellOff",[["path",{d:"M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5",key:"o7mx20"}],["path",{d:"M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7",key:"16f1lm"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ll=ee("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ax=ee("Bold",[["path",{d:"M14 12a4 4 0 0 0 0-8H6v8",key:"v2sylx"}],["path",{d:"M15 20a4 4 0 0 0 0-8H6v8Z",key:"1ef5ya"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=ee("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ux=ee("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tc=ee("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=ee("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=ee("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rc=ee("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $x=ee("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=ee("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jp=ee("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oc=ee("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fx=ee("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bx=ee("File",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qp=ee("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hx=ee("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vx=ee("Folder",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qp=ee("Forward",[["polyline",{points:"15 17 20 12 15 7",key:"1w3sku"}],["path",{d:"M4 18v-2a4 4 0 0 1 4-4h12",key:"jmiej9"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _c=ee("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=ee("Hash",[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kx=ee("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wx=ee("Italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yx=ee("Keyboard",[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jx=ee("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=ee("Loader",[["line",{x1:"12",x2:"12",y1:"2",y2:"6",key:"gza1u7"}],["line",{x1:"12",x2:"12",y1:"18",y2:"22",key:"1qhbu9"}],["line",{x1:"4.93",x2:"7.76",y1:"4.93",y2:"7.76",key:"xae44r"}],["line",{x1:"16.24",x2:"19.07",y1:"16.24",y2:"19.07",key:"bxnmvf"}],["line",{x1:"2",x2:"6",y1:"12",y2:"12",key:"89khin"}],["line",{x1:"18",x2:"22",y1:"12",y2:"12",key:"pb8tfm"}],["line",{x1:"4.93",x2:"7.76",y1:"19.07",y2:"16.24",key:"1uxjnu"}],["line",{x1:"16.24",x2:"19.07",y1:"7.76",y2:"4.93",key:"6duxfx"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=ee("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qx=ee("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=ee("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qx=ee("Maximize",[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xx=ee("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gx=ee("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dc=ee("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zx=ee("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const e0=ee("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gp=ee("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t0=ee("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n0=ee("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=ee("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=ee("Pin",[["line",{x1:"12",x2:"12",y1:"17",y2:"22",key:"1jrz49"}],["path",{d:"M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z",key:"13yl11"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r0=ee("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ac=ee("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s0=ee("Quote",[["path",{d:"M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",key:"4rm80e"}],["path",{d:"M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",key:"10za9r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a0=ee("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=ee("Reply",[["polyline",{points:"9 17 4 12 9 7",key:"hvgpf2"}],["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i0=ee("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o0=ee("RotateCw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l0=ee("Rows3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M21 9H3",key:"1338ky"}],["path",{d:"M21 15H3",key:"9uk58r"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eh=ee("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rl=ee("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=ee("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uc=ee("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const th=ee("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=ee("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c0=ee("Square",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nh=ee("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u0=ee("StretchHorizontal",[["rect",{width:"20",height:"6",x:"2",y:"4",rx:"2",key:"qdearl"}],["rect",{width:"20",height:"6",x:"2",y:"14",rx:"2",key:"1xrn6j"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d0=ee("Strikethrough",[["path",{d:"M16 4H9a3 3 0 0 0-2.83 4",key:"43sutm"}],["path",{d:"M14 12a4 4 0 0 1 0 8H6",key:"nlfj13"}],["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f0=ee("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=ee("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rh=ee("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=ee("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p0=ee("UserX",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h0=ee("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=ee("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m0=ee("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g0=ee("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x0=ee("WifiOff",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v0=ee("Wifi",[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0",key:"1x1e6c"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=ee("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y0=ee("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b0=ee("ZoomIn",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]);/**
 * @license lucide-react v0.372.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k0=ee("ZoomOut",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]]),sh="hotline-server-favorites";function w0(){try{const e=localStorage.getItem(sh);return e?JSON.parse(e):[]}catch{return[]}}function Ba(e){localStorage.setItem(sh,JSON.stringify(e))}function j0(){const[e,t]=y.useState(w0),n=y.useCallback((a,o,u)=>{t(c=>{const f=c.find(g=>g.address===a&&g.nickname===o);if(f){const g=c.map(N=>N.id===f.id?{...N,lastUsed:Date.now(),label:u||N.label}:N);return Ba(g),g}const k=[{id:crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`,address:a,nickname:o,label:u,lastUsed:Date.now()},...c].slice(0,10);return Ba(k),k})},[]),r=y.useCallback(a=>{t(o=>{const u=o.filter(c=>c.id!==a);return Ba(u),u})},[]),s=y.useCallback((a,o)=>{t(u=>{const c=u.findIndex(m=>m.address===a&&m.nickname===o);if(c===-1)return u;const f=[...u];return f[c]={...f[c],lastUsed:Date.now()},f.sort((m,k)=>k.lastUsed-m.lastUsed),Ba(f),f})},[]);return{favorites:e,addFavorite:n,removeFavorite:r,touchFavorite:s}}const ah="hotline-tracker-urls",S0="http://localhost:9997";function N0(){try{const e=localStorage.getItem(ah);if(e){const t=JSON.parse(e);if(Array.isArray(t)&&t.length>0)return t}}catch{}return[S0]}function ad(e){localStorage.setItem(ah,JSON.stringify(e))}function C0(){const[e,t]=y.useState(N0),[n,r]=y.useState([]),[s,a]=y.useState(!1),[o,u]=y.useState(null),c=y.useRef(),f=y.useCallback(async()=>{if(e.length===0)return;a(!0),u(null);const g=new Set,N=[];let v=!1;await Promise.allSettled(e.map(async w=>{try{const M=await fetch(`${w.replace(/\/$/,"")}/servers`,{signal:AbortSignal.timeout(5e3)});if(!M.ok)return;const j=await M.json();v=!0;for(const b of j.servers||[]){const C=`${b.address}:${b.port}`;g.has(C)||(g.add(C),N.push(b))}}catch{}})),!v&&e.length>0&&u("Impossible de contacter les trackers"),N.sort((w,M)=>M.users-w.users),r(N),a(!1)},[e]),m=y.useCallback(g=>{const N=g.trim().replace(/\/$/,"");if(!N||e.includes(N))return;const v=[...e,N];t(v),ad(v)},[e]),k=y.useCallback(g=>{const N=e.filter(v=>v!==g);t(N),ad(N)},[e]);return y.useEffect(()=>(f(),c.current=setInterval(f,3e4),()=>{c.current&&clearInterval(c.current)}),[f]),{servers:n,loading:s,error:o,refresh:f,trackerUrls:e,addTracker:m,removeTracker:k}}function E0({onConnect:e}){const{t}=Qe(),{servers:n,loading:r,error:s,refresh:a,trackerUrls:o,addTracker:u,removeTracker:c}=C0(),[f,m]=y.useState(!1),[k,g]=y.useState(""),N=w=>{e(`${w.address}:${w.port}`)},v=()=>{k.trim()&&(u(k),g(""))};return i.jsxs("div",{className:"server-browser",children:[i.jsxs("div",{className:"sb-header",children:[i.jsx(_c,{size:14}),i.jsx("span",{children:t("tracker.browseServers")}),i.jsxs("div",{className:"sb-header-actions",children:[i.jsxs("button",{className:"sb-settings-btn",onClick:()=>m(!f),title:t("tracker.settings"),children:[i.jsx(Uc,{size:12}),f?i.jsx(Wp,{size:10}):i.jsx(Kp,{size:10})]}),i.jsx("button",{className:"sb-refresh",onClick:a,disabled:r,title:t("tracker.refresh"),children:i.jsx(a0,{size:12,className:r?"sb-spin":""})})]})]}),f&&i.jsxs("div",{className:"sb-settings",children:[i.jsx("div",{className:"sb-tracker-list",children:o.map(w=>i.jsxs("div",{className:"sb-tracker-item",children:[i.jsx(v0,{size:10}),i.jsx("span",{className:"sb-tracker-url",children:w}),i.jsx("button",{className:"sb-tracker-remove",onClick:()=>c(w),title:t("tracker.removeTracker"),children:i.jsx(zt,{size:10})})]},w))}),i.jsxs("div",{className:"sb-add-tracker",children:[i.jsx("input",{type:"text",value:k,onChange:w=>g(w.target.value),placeholder:t("tracker.trackerPlaceholder"),onKeyDown:w=>w.key==="Enter"&&v()}),i.jsx("button",{className:"sb-add-btn",onClick:v,disabled:!k.trim(),children:i.jsx(Ac,{size:12})})]})]}),i.jsxs("div",{className:"sb-list",children:[s&&i.jsx("div",{className:"sb-error",children:s}),!s&&n.length===0&&!r&&i.jsx("div",{className:"sb-empty",children:t("tracker.noServers")}),r&&n.length===0&&i.jsx("div",{className:"sb-loading",children:t("tracker.loading")}),n.map(w=>i.jsxs("div",{className:"sb-server",onClick:()=>N(w),children:[i.jsxs("div",{className:"sb-server-info",children:[i.jsx("span",{className:"sb-server-name",children:w.name}),w.description&&i.jsx("span",{className:"sb-server-desc",children:w.description})]}),i.jsxs("div",{className:"sb-server-meta",children:[i.jsxs("span",{className:"sb-server-users",children:[i.jsx(Zi,{size:11}),w.users]}),i.jsxs("span",{className:"sb-server-addr",children:[w.address,":",w.port]})]})]},`${w.address}:${w.port}`))]}),i.jsx("style",{children:`
        .server-browser {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          margin-top: 4px;
        }
        .sb-header {
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
        .sb-header-actions {
          margin-left: auto;
          display: flex;
          gap: 4px;
        }
        .sb-settings-btn, .sb-refresh {
          padding: 4px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 2px;
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        .sb-settings-btn:hover, .sb-refresh:hover {
          color: var(--accent);
          background: var(--accent-dim);
        }
        .sb-spin {
          animation: spin 1s linear infinite;
        }
        .sb-settings {
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          padding: 8px;
          margin-bottom: 8px;
          animation: fadeIn 0.15s ease;
        }
        .sb-tracker-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 6px;
        }
        .sb-tracker-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-secondary);
          padding: 4px 6px;
          border-radius: var(--radius-sm);
        }
        .sb-tracker-url {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono);
          font-size: 10px;
        }
        .sb-tracker-remove {
          padding: 2px;
          border-radius: 3px;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .sb-tracker-remove:hover {
          color: var(--danger);
        }
        .sb-add-tracker {
          display: flex;
          gap: 4px;
        }
        .sb-add-tracker input {
          flex: 1;
          padding: 4px 8px;
          font-size: 11px;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }
        .sb-add-btn {
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          transition: opacity var(--transition-fast);
        }
        .sb-add-btn:disabled {
          opacity: 0.4;
        }
        .sb-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 200px;
          overflow-y: auto;
        }
        .sb-server {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-tertiary);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all var(--transition-fast);
          animation: fadeIn 0.15s ease;
        }
        .sb-server:hover {
          background: var(--accent-dim);
          border-color: var(--accent);
        }
        .sb-server-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
          flex: 1;
        }
        .sb-server-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-server-desc {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sb-server-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          flex-shrink: 0;
          margin-left: 12px;
        }
        .sb-server-users {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent);
        }
        .sb-server-addr {
          font-size: 10px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .sb-empty, .sb-loading, .sb-error {
          padding: 16px;
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .sb-error {
          color: var(--danger);
          font-style: normal;
        }
      `})]})}function z0({onConnect:e,isConnecting:t}){const{t:n}=Qe(),[r,s]=y.useState("localhost:9998"),[a,o]=y.useState(""),{favorites:u,addFavorite:c,removeFavorite:f}=j0(),m=v=>{v.preventDefault(),r&&a.trim()&&(c(r,a.trim()),e(r,a.trim()))},k=v=>{s(v.address),o(v.nickname)},g=v=>{c(v.address,v.nickname),e(v.address,v.nickname)},N=v=>{s(v)};return i.jsxs("div",{className:"connect-overlay",children:[i.jsx("div",{className:"connect-bg-glow"}),i.jsxs("form",{className:"connect-dialog",onSubmit:m,children:[i.jsxs("div",{className:"connect-logo",children:[i.jsx("img",{src:"/logo.svg",alt:"Hotline Modern",className:"connect-logo-img"}),i.jsx("h1",{children:n("app.name")}),i.jsx("p",{className:"connect-subtitle",children:n("connect.title")})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.serverAddress")}),i.jsx("input",{type:"text",value:r,onChange:v=>s(v.target.value),placeholder:n("connect.serverPlaceholder"),disabled:t})]}),i.jsxs("div",{className:"connect-field",children:[i.jsx("label",{children:n("connect.nickname")}),i.jsx("input",{type:"text",value:a,onChange:v=>o(v.target.value),placeholder:n("connect.nicknamePlaceholder"),disabled:t,maxLength:32,autoFocus:!0})]}),i.jsx("button",{type:"submit",className:"connect-btn",disabled:t||!a.trim(),children:t?i.jsxs(i.Fragment,{children:[i.jsx(pa,{size:16,className:"connect-spinner"}),n("connect.connecting")]}):i.jsxs(i.Fragment,{children:[n("connect.button"),i.jsx("kbd",{className:"connect-kbd",children:"↵"})]})}),i.jsx(E0,{onConnect:N}),u.length>0&&i.jsxs("div",{className:"connect-favorites",children:[i.jsxs("div",{className:"connect-favorites-header",children:[i.jsx(nh,{size:12}),i.jsx("span",{children:n("connect.recentServers")})]}),i.jsx("ul",{className:"connect-favorites-list",children:u.slice(0,5).map(v=>i.jsxs("li",{className:"connect-fav-item",children:[i.jsxs("button",{className:"connect-fav-btn",onClick:()=>k(v),title:v.address,children:[i.jsx("span",{className:"connect-fav-addr",children:v.address}),i.jsx("span",{className:"connect-fav-nick",children:v.nickname})]}),i.jsx("button",{className:"connect-fav-quick",onClick:()=>g(v),title:n("connect.quickConnect"),children:i.jsx(y0,{size:11})}),i.jsx("button",{className:"connect-fav-remove",onClick:()=>f(v.id),title:n("connect.removeFavorite"),children:i.jsx(zt,{size:11})})]},v.id))})]})]}),i.jsx("style",{children:`
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
      `})]})}const id=[{value:"available",label:"status.available",color:"#22c55e"},{value:"away",label:"status.away",color:"#eab308"},{value:"busy",label:"status.busy",color:"#ef4444"}];function P0({currentStatus:e,onStatusChange:t}){var s;const{t:n}=Qe(),r=((s=id.find(a=>a.value===e))==null?void 0:s.color)||"#22c55e";return i.jsxs("div",{className:"status-selector",children:[i.jsx("span",{className:"status-dot-sel",style:{backgroundColor:r}}),i.jsx("select",{value:e,onChange:a=>t(a.target.value),className:"status-select",children:id.map(a=>i.jsx("option",{value:a.value,children:n(a.label)},a.value))}),i.jsx("style",{children:`
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
      `})]})}function ih({status:e}){const t=e==="away"?"#eab308":e==="busy"?"#ef4444":"#22c55e";return i.jsx("span",{className:"user-status-dot",style:{backgroundColor:t},title:e,children:i.jsx("style",{children:`
        .user-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px var(--bg-secondary);
          transition: background-color var(--transition-normal);
        }
      `})})}function I0({serverName:e,channels:t,activeChannel:n,activeDM:r,dmConversations:s,onSelectChannel:a,onSelectDM:o,onCreateChannel:u,onDeleteChannel:c,onDisconnect:f,canCreateChannel:m,unreadCounts:k,nickname:g,role:N,userStatus:v,mutedChannels:w,onToggleMute:M,onAdminPanel:j,typingChannels:b,onReorderChannels:C}){const{t:E}=Qe();return i.jsxs("aside",{className:"sidebar",children:[i.jsxs("div",{className:"sidebar-header",children:[i.jsx("h2",{children:e}),i.jsxs("div",{className:"sidebar-header-actions",children:[j&&N==="admin"&&i.jsx("button",{className:"sidebar-admin",onClick:j,title:E("admin.title"),children:i.jsx(Uc,{size:15})}),i.jsx("button",{className:"sidebar-disconnect",onClick:f,title:E("sidebar.disconnect"),children:i.jsx(Xp,{size:16})})]})]}),i.jsxs("div",{className:"sidebar-section",children:[i.jsxs("div",{className:"sidebar-section-header",children:[i.jsx("span",{children:E("sidebar.channels")}),m&&i.jsx("button",{className:"sidebar-add",onClick:u,title:E("sidebar.createChannel"),"aria-label":E("sidebar.createChannel"),children:i.jsx(Ac,{size:14})})]}),i.jsxs("ul",{className:"channel-list",role:"listbox","aria-label":E("sidebar.channels"),children:[t.length===0&&i.jsx("li",{className:"channel-empty",children:E("sidebar.noChannels")}),t.map((L,_)=>i.jsxs("li",{className:`channel-item ${L.name===n&&!r?"active":""}`,onClick:()=>a(L.name),draggable:!!C,onDragStart:D=>{D.dataTransfer.setData("text/plain",String(_))},onDragOver:D=>{D.preventDefault(),D.currentTarget.classList.add("drag-over")},onDragLeave:D=>{D.currentTarget.classList.remove("drag-over")},onDrop:D=>{D.currentTarget.classList.remove("drag-over");const q=parseInt(D.dataTransfer.getData("text/plain"));if(isNaN(q)||q===_||!C)return;const Te=t.map(Be=>Be.name),[ge]=Te.splice(q,1);Te.splice(_,0,ge),C(Te)},children:[L.hasPassword?i.jsx(zi,{size:14,className:"channel-icon"}):i.jsx(wa,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:L.name}),(b==null?void 0:b.includes(L.name))&&i.jsx("span",{className:"channel-typing-dot"}),(k[L.name]||0)>0&&i.jsx("span",{className:"channel-unread",children:k[L.name]}),(w==null?void 0:w.includes(L.name))&&i.jsx(fs,{size:11,className:"channel-muted-icon"}),i.jsx("span",{className:"channel-count",children:L.userCount}),M&&i.jsx("button",{className:"channel-mute-btn",onClick:D=>{D.stopPropagation(),M(L.name)},title:w!=null&&w.includes(L.name)?E("sidebar.unmute"):E("sidebar.mute"),children:i.jsx(fs,{size:11})}),m&&L.name!=="lobby"&&i.jsx("button",{className:"channel-delete",onClick:D=>{D.stopPropagation(),c(L.name)},title:E("sidebar.deleteChannel"),children:i.jsx(Nr,{size:12})})]},L.name))]}),s.length>0&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"sidebar-section-header dm-header",children:i.jsx("span",{children:E("sidebar.directMessages")})}),i.jsx("ul",{className:"channel-list",children:s.map(L=>i.jsxs("li",{className:`channel-item ${r===L.peerId?"active":""}`,onClick:()=>o(L.peerId),children:[i.jsx(Dc,{size:14,className:"channel-icon"}),i.jsx("span",{className:"channel-name",children:L.peerNick}),L.unread>0&&i.jsx("span",{className:"channel-unread",children:L.unread})]},L.peerId))})]})]}),g&&i.jsxs("div",{className:"sidebar-footer",children:[i.jsx(ih,{status:v||"available"}),i.jsx("span",{className:"sidebar-nick",children:g}),i.jsx("span",{className:"sidebar-role","data-role":N,children:N})]}),i.jsx("style",{children:`
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
        .channel-empty {
          padding: 8px 16px;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
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
      `})]})}function M0({position:e,messageId:t,content:n,isOwn:r,canModerate:s,isBookmarked:a,onClose:o,onReply:u,onReact:c,onEdit:f,onDelete:m,onPin:k,onBookmark:g,onCopyText:N,onQuote:v,onForward:w}){const{t:M}=Qe(),j=y.useRef(null);y.useEffect(()=>{const L=D=>{j.current&&!j.current.contains(D.target)&&o()},_=D=>{D.key==="Escape"&&o()};return document.addEventListener("mousedown",L),document.addEventListener("keydown",_),()=>{document.removeEventListener("mousedown",L),document.removeEventListener("keydown",_)}},[o]);const b={position:"fixed",left:e.x,top:e.y,zIndex:300},C=()=>{navigator.clipboard.writeText(n),o()},E=()=>{v==null||v(),o()};return i.jsxs("div",{className:"ctx-menu",ref:j,style:b,children:[i.jsxs("button",{className:"ctx-item",onClick:()=>{u==null||u(t),o()},children:[i.jsx(Tl,{size:14}),i.jsx("span",{children:M("ctx.reply")})]}),i.jsxs("button",{className:"ctx-item",onClick:()=>{c==null||c(),o()},children:[i.jsx(Gi,{size:14}),i.jsx("span",{children:M("ctx.react")})]}),i.jsxs("button",{className:"ctx-item",onClick:C,children:[i.jsx(Yp,{size:14}),i.jsx("span",{children:M("ctx.copy")})]}),i.jsxs("button",{className:"ctx-item",onClick:E,children:[i.jsx(s0,{size:14}),i.jsx("span",{children:M("ctx.quote")})]}),w&&i.jsxs("button",{className:"ctx-item",onClick:()=>{w(t),o()},children:[i.jsx(qp,{size:14}),i.jsx("span",{children:M("forward.title")})]}),g&&i.jsxs("button",{className:`ctx-item ${a?"active":""}`,onClick:()=>{g(t),o()},children:[i.jsx(fa,{size:14}),i.jsx("span",{children:M(a?"bookmarks.remove":"ctx.bookmark")})]}),r&&f&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"ctx-sep"}),i.jsxs("button",{className:"ctx-item",onClick:()=>{f(t),o()},children:[i.jsx(Zp,{size:14}),i.jsx("span",{children:M("ctx.edit")})]})]}),s&&k&&i.jsxs("button",{className:"ctx-item",onClick:()=>{k(t),o()},children:[i.jsx(bs,{size:14}),i.jsx("span",{children:M("ctx.pin")})]}),(r||s)&&m&&i.jsxs("button",{className:"ctx-item danger",onClick:()=>{m(t),o()},children:[i.jsx(Nr,{size:14}),i.jsx("span",{children:M("ctx.delete")})]}),i.jsx("style",{children:`
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
      `})]})}function L0(e){try{return new URL(e).hostname.replace("www.","")}catch{return e}}function T0(e){try{const t=new URL(e),n=t.pathname+t.search;return n.length>60?n.slice(0,57)+"...":n}catch{return""}}function R0(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}function O0({url:e}){const t=L0(e),n=T0(e),r=R0(e);return i.jsxs("a",{href:e,target:"_blank",rel:"noopener noreferrer",className:"link-preview",children:[i.jsx("div",{className:"link-preview-favicon",children:r?i.jsx("img",{src:r,alt:"",width:16,height:16,onError:s=>{s.target.style.display="none"}}):i.jsx(_c,{size:14})}),i.jsxs("div",{className:"link-preview-info",children:[i.jsx("span",{className:"link-preview-domain",children:t}),n&&n!=="/"&&i.jsx("span",{className:"link-preview-path",children:n})]}),i.jsx(Oc,{size:12,className:"link-preview-ext"}),i.jsx("style",{children:`
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
      `})]})}const Lo={keyword:["const","let","var","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","import","export","from","default","async","await","try","catch","finally","throw","yield","of","in","this","super","static","public","private","protected","interface","type","enum","struct","impl","fn","pub","mod","use","crate","trait","where","mut","ref","self","match","loop","def","elif","pass","lambda","with","as","raise","except","True","False","None","func","go","defer","chan","select","package","range","map"],builtin:["console","window","document","Math","JSON","Array","Object","String","Number","Boolean","Promise","Map","Set","Error","null","undefined","true","false","nil","fmt","println","print","len","append","make"],type:["string","number","boolean","void","any","never","unknown","int","float","double","char","bool","i32","u32","i64","u64","f32","f64","usize","isize","Vec","Option","Result"]};function _0(e){var r,s,a;const t=e.split(`
`),n=[];for(let o=0;o<t.length;o++){const u=t[o],c=[];let f=u,m=0;for(;f.length>0;){const k=f.match(/^(["'`])(?:\\.|[^\\])*?\1/);if(k){c.push(i.jsx("span",{className:"code-string",children:k[0]},m++)),f=f.slice(k[0].length);continue}const g=f.match(/^(\/\/.*|#.*)/);if(g){c.push(i.jsx("span",{className:"code-comment",children:g[0]},m++)),f=f.slice(g[0].length);continue}const N=f.match(/^(0x[0-9a-fA-F]+|\d+\.?\d*)/);if(N&&(c.length===0||!/\w$/.test(((a=(s=(r=c[c.length-1])==null?void 0:r.props)==null?void 0:s.children)==null?void 0:a.toString())||""))){c.push(i.jsx("span",{className:"code-number",children:N[0]},m++)),f=f.slice(N[0].length);continue}const v=f.match(/^[a-zA-Z_]\w*/);if(v){const j=v[0];let b="";Lo.keyword.includes(j)?b="code-keyword":Lo.builtin.includes(j)?b="code-builtin":Lo.type.includes(j)&&(b="code-type"),b?c.push(i.jsx("span",{className:b,children:j},m++)):c.push(i.jsx("span",{children:j},m++)),f=f.slice(j.length);continue}const w=f.match(/^[^\w\s]+/);if(w){c.push(i.jsx("span",{className:"code-punct",children:w[0]},m++)),f=f.slice(w[0].length);continue}const M=f.match(/^\s+/);if(M){c.push(i.jsx("span",{children:M[0]},m++)),f=f.slice(M[0].length);continue}c.push(i.jsx("span",{children:f[0]},m++)),f=f.slice(1)}n.push(i.jsxs("div",{className:"code-line",children:[i.jsx("span",{className:"code-line-number",children:o+1}),i.jsx("span",{className:"code-line-content",children:c})]},o))}return n}function D0({code:e,language:t}){const[n,r]=y.useState(!1),s=()=>{navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3)};return i.jsxs("div",{className:"code-block",children:[i.jsxs("div",{className:"code-block-header",children:[i.jsx("span",{className:"code-block-lang",children:t||"code"}),i.jsxs("button",{className:"code-block-copy",onClick:s,title:"Copy",children:[n?i.jsx(Tc,{size:12}):i.jsx(Yp,{size:12}),i.jsx("span",{children:n?"Copied!":"Copy"})]})]}),i.jsx("pre",{className:"code-block-body",children:i.jsx("code",{children:_0(e)})}),i.jsx("style",{children:`
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
      `})]})}function oh(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return Math.abs(t)}function A0(e){const t=oh(e),n=t%360,r=(n+40+(t>>8)%60)%360;return[`hsl(${n}, 65%, 55%)`,`hsl(${r}, 55%, 45%)`]}function U0(e){const t=e.trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():e.slice(0,2).toUpperCase()}function $0(e){const t=oh(e),n=[];for(let r=0;r<9;r++)n.push(t>>r&1);return n}function lh({userId:e,nickname:t,size:n=32}){const[r,s]=A0(e),a=U0(t),o=$0(e);return i.jsxs("div",{className:"user-avatar",style:{width:n,height:n,minWidth:n,background:`linear-gradient(135deg, ${r}, ${s})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"},title:t,children:[i.jsx("svg",{width:n,height:n,viewBox:"0 0 3 3",style:{position:"absolute",inset:0,opacity:.15},children:o.map((u,c)=>u?i.jsx("rect",{x:c%3,y:Math.floor(c/3),width:1,height:1,fill:"#fff"},c):null)}),i.jsx("span",{style:{fontSize:n*.38,fontWeight:700,color:"#fff",textShadow:"0 1px 2px rgba(0,0,0,0.2)",letterSpacing:"-0.5px",position:"relative",zIndex:1},children:a})]})}function ch(e){const t=e.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);if(t)return{type:"youtube",id:t[1]};const n=e.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);return n?{type:"twitter",id:n[1]}:null}function F0({videoId:e}){const t=`https://img.youtube.com/vi/${e}/mqdefault.jpg`;return i.jsxs("a",{href:`https://www.youtube.com/watch?v=${e}`,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-youtube",children:[i.jsxs("div",{className:"rich-embed-thumb",children:[i.jsx("img",{src:t,alt:"YouTube video",loading:"lazy"}),i.jsx("div",{className:"rich-embed-play",children:i.jsx(r0,{size:20,fill:"#fff"})})]}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsxs("span",{className:"rich-embed-source",children:[i.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#ff0000",children:[i.jsx("path",{d:"M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z"}),i.jsx("path",{fill:"#fff",d:"M9.5 15.5V8.5l6.5 3.5z"})]}),i.jsx("span",{children:"YouTube"})]}),i.jsx("span",{className:"rich-embed-id",children:e})]}),i.jsx(Oc,{size:11,className:"rich-embed-ext"})]})}function B0({tweetId:e,url:t}){return i.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"rich-embed rich-embed-twitter",children:[i.jsx("div",{className:"rich-embed-twitter-icon",children:i.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:i.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),i.jsxs("div",{className:"rich-embed-info",children:[i.jsx("span",{className:"rich-embed-source",children:i.jsx("span",{children:"X (Twitter)"})}),i.jsxs("span",{className:"rich-embed-id",children:["Tweet #",e.slice(-6)]})]}),i.jsx(Oc,{size:11,className:"rich-embed-ext"})]})}function H0({url:e}){const t=ch(e);return t?t.type==="youtube"&&t.id?i.jsx(F0,{videoId:t.id}):t.type==="twitter"&&t.id?i.jsx(B0,{tweetId:t.id,url:e}):null:null}function uh(e){return ch(e)!==null}const V0=/\b(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?[^\s]*)?)\b/gi,$c=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,eo=/```(\w*)\n([\s\S]*?)```/g,dh=/\bhttps?:\/\/[^\s]+/g;function od(e){const t=[];let n=0;const r=/(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\~\~[^~]+\~\~)|(@\w+)|(\b(https?:\/\/[^\s]+))/g;let s=0,a;for(;(a=r.exec(e))!==null;)a.index>s&&t.push(e.slice(s,a.index)),a[1]?t.push(i.jsx("a",{className:"msg-link",href:a[3],target:"_blank",rel:"noopener noreferrer",children:a[2]},n++)):a[4]?t.push(i.jsx("code",{className:"msg-code",children:a[4].slice(1,-1)},n++)):a[5]?t.push(i.jsx("strong",{children:a[5].slice(2,-2)},n++)):a[6]?t.push(i.jsx("em",{children:a[6].slice(1,-1)},n++)):a[7]?t.push(i.jsx("del",{children:a[7].slice(2,-2)},n++)):a[8]?t.push(i.jsx("span",{className:"msg-mention",children:a[8]},n++)):a[10]&&t.push(i.jsx("a",{className:"msg-link",href:a[10],target:"_blank",rel:"noopener noreferrer",children:a[10]},n++)),s=a.index+a[0].length;return s<e.length&&t.push(e.slice(s)),t}function K0(e){return/```[\s\S]*?```/.test(e)}function W0(e){const t=[];let n;const r=/```(\w*)\n([\s\S]*?)```/g;for(;(n=r.exec(e))!==null;)t.push({language:n[1]||"",code:n[2].trimEnd()});return t}function Y0(e){return e.replace(eo,"").trim()}function fh(e){const n=e.replace($c,"").replace(eo,"").match(V0);return n?[...new Set(n)]:[]}function J0(e){const n=e.replace($c,"").replace(eo,"").match(dh)||[],r=fh(e);return n.filter(s=>!r.includes(s)&&!uh(s)).slice(0,3)}function Q0(e){return(e.replace($c,"").replace(eo,"").match(dh)||[]).filter(r=>uh(r)).slice(0,2)}const q0=["👍","❤️","😂","👏","🔥","🤔"];function Ol({id:e,userId:t,nickname:n,content:r,role:s,timestamp:a,isOwn:o,edited:u,reactions:c,currentUserId:f,canModerate:m,system:k,onReact:g,onRemoveReact:N,onEdit:v,onDelete:w,onPin:M,onReply:j,onBookmark:b,isBookmarked:C,isPinned:E,replyContext:L,isGrouped:_,onImageClick:D,onQuote:q,onThreadOpen:Te,onForward:ge}){const{t:Be,i18n:dt}=Qe();if(k){const ye=r==="joined"?Be("system.userJoined",{name:n}):Be("system.userLeft",{name:n});return i.jsxs("div",{className:"message-system",children:[i.jsx("span",{className:"message-system-text",children:ye}),i.jsx("style",{children:`
          .message-system {
            display: flex;
            justify-content: center;
            padding: 4px 16px;
          }
          .message-system-text {
            font-size: 12px;
            color: var(--text-muted);
            font-style: italic;
            opacity: 0.7;
          }
        `})]})}const[wt,ft]=y.useState(!1),[jt,qe]=y.useState(!1),[pt,K]=y.useState(r),[ie,me]=y.useState(!1),[De,fe]=y.useState(null),Ze=new Date(a),We=new Intl.DateTimeFormat(dt.language,{hour:"2-digit",minute:"2-digit"}).format(Ze),ke=new Intl.DateTimeFormat(dt.language,{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(Ze),et=`var(--role-${s})`,Pt=y.useMemo(()=>W0(r),[r]),nn=y.useMemo(()=>K0(r)?Y0(r):r,[r]),qt=y.useMemo(()=>fh(r),[r]),Xt=y.useMemo(()=>J0(r),[r]),rn=y.useMemo(()=>Q0(r),[r]),Ot=()=>{pt.trim()&&pt!==r&&(v==null||v(e,pt.trim())),qe(!1)},un=ye=>{const ht=c==null?void 0:c.find($n=>$n.emoji===ye);ht!=null&&ht.users.includes(f)?N==null||N(e,ye):g==null||g(e,ye),me(!1)},_t=ye=>{ye.preventDefault(),fe({x:ye.clientX,y:ye.clientY})};return i.jsxs("div",{className:`message ${o?"own":""} ${_?"grouped":""}`,onMouseEnter:()=>ft(!0),onMouseLeave:()=>{ft(!1),me(!1)},onContextMenu:_t,children:[L&&i.jsxs("div",{className:"message-reply-context",onClick:()=>Te==null?void 0:Te(e),style:Te?{cursor:"pointer"}:void 0,children:[i.jsx(Tl,{size:10,className:"reply-icon"}),i.jsx("span",{className:"reply-context-nick",children:L.nickname}),i.jsx("span",{className:"reply-context-text",children:L.content.slice(0,60)})]}),!_&&i.jsxs("div",{className:"message-header",children:[i.jsx(lh,{userId:t,nickname:n,size:28}),i.jsx("span",{className:"message-nick",style:{color:et},children:n}),i.jsx("span",{className:"message-time",title:ke,children:We}),u&&i.jsx("span",{className:"message-edited",children:Be("chat.edited")}),E&&i.jsx(bs,{size:11,className:"message-pin-badge"})]}),_&&wt&&i.jsx("span",{className:"message-time-inline",title:ke,children:We}),jt?i.jsxs("div",{className:"message-edit-area",children:[i.jsx("input",{className:"message-edit-input",value:pt,onChange:ye=>K(ye.target.value),onKeyDown:ye=>{ye.key==="Enter"&&Ot(),ye.key==="Escape"&&qe(!1)},autoFocus:!0}),i.jsx("button",{className:"message-edit-save",onClick:Ot,children:"OK"}),i.jsx("button",{className:"message-edit-cancel",onClick:()=>qe(!1),children:"ESC"})]}):i.jsxs(i.Fragment,{children:[nn&&i.jsx("div",{className:"message-content",children:nn.split(`
`).map((ye,ht)=>ye.startsWith("> ")?i.jsx("div",{className:"msg-blockquote",children:od(ye.slice(2))},ht):i.jsxs("span",{children:[ht>0&&`
`,od(ye)]},ht))}),Pt.map((ye,ht)=>i.jsx(D0,{code:ye.code,language:ye.language},`cb-${ht}`)),qt.length>0&&i.jsx("div",{className:"message-images",children:qt.map((ye,ht)=>i.jsx("img",{src:ye,alt:"",className:"message-img-preview",loading:"lazy",onClick:()=>D?D(ye):window.open(ye,"_blank")},ht))}),rn.length>0&&i.jsx("div",{className:"message-embeds",children:rn.map((ye,ht)=>i.jsx(H0,{url:ye},`embed-${ht}`))}),Xt.length>0&&i.jsx("div",{className:"message-link-previews",children:Xt.map((ye,ht)=>i.jsx(O0,{url:ye},`lp-${ht}`))})]}),c&&c.length>0&&i.jsx("div",{className:"message-reactions",children:c.map(ye=>i.jsxs("button",{className:`reaction-chip ${ye.users.includes(f)?"own":""}`,onClick:()=>un(ye.emoji),title:ye.users.length.toString(),children:[i.jsx("span",{children:ye.emoji}),i.jsx("span",{className:"reaction-count",children:ye.users.length})]},ye.emoji))}),wt&&!jt&&i.jsxs("div",{className:"message-actions",children:[i.jsx("button",{onClick:()=>j==null?void 0:j(e),title:"Reply",children:i.jsx(Tl,{size:13})}),i.jsx("button",{onClick:()=>me(ye=>!ye),title:"React",children:i.jsx(Gi,{size:13})}),b&&i.jsx("button",{className:C?"action-bookmarked":"",onClick:()=>b(e),title:"Bookmark",children:i.jsx(fa,{size:13})}),o&&i.jsx("button",{onClick:()=>{qe(!0),K(r)},title:"Edit",children:i.jsx(Zp,{size:13})}),(o||m)&&i.jsx("button",{className:"action-danger",onClick:()=>w==null?void 0:w(e),title:"Delete",children:i.jsx(Nr,{size:13})}),m&&i.jsx("button",{onClick:()=>M==null?void 0:M(e),title:"Pin",children:i.jsx(bs,{size:13})})]}),ie&&i.jsx("div",{className:"message-react-picker",children:q0.map(ye=>i.jsx("button",{onClick:()=>un(ye),children:ye},ye))}),De&&i.jsx(M0,{position:De,messageId:e,content:r,isOwn:o,canModerate:m||!1,isBookmarked:C,onClose:()=>fe(null),onReply:j,onReact:()=>{me(!0),fe(null)},onEdit:o?()=>{qe(!0),K(r),fe(null)}:void 0,onDelete:w,onPin:M,onBookmark:b,onCopyText:()=>{navigator.clipboard.writeText(r),fe(null)},onQuote:()=>{q==null||q(r,n),fe(null)},onForward:ge}),i.jsx("style",{children:`
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
      `})]})}const ld=[{key:"smileys",emojis:["😀","😂","🤣","😍","🥰","😘","😎","🤔","🥳","😢","😡","😏","🤗","😴","🥺","😈"]},{key:"gestures",emojis:["👍","👎","👋","🙌","👏","🤝","🙏","💪","🫡","🤙","✌️","🤞","👀","🫶","✋","👊"]},{key:"symbols",emojis:["🔥","❤️","💯","⭐","🎉","🎊","🚀","⚡","✅","❌","💬","💡","🏆","💎","🌟","🎯"]},{key:"objects",emojis:["💻","📱","🎮","🎧","📸","🎬","🔒","🔑","📂","📌","🔔","⏰","🧪","🛠️","📊","🗂️"]}];function X0({onSelect:e,onClose:t}){var u;const{t:n}=Qe(),r=y.useRef(null),[s,a]=y.useState("");y.useEffect(()=>{const c=f=>{r.current&&!r.current.contains(f.target)&&t()};return document.addEventListener("mousedown",c),()=>document.removeEventListener("mousedown",c)},[t]);const o=s?[{key:"results",emojis:ld.flatMap(c=>c.emojis).filter(c=>c.includes(s))}]:ld;return i.jsxs("div",{ref:r,className:"emoji-picker",children:[i.jsx("input",{className:"emoji-search",type:"text",placeholder:n("chat.searchEmoji")||"Search...",value:s,onChange:c=>a(c.target.value),autoFocus:!0}),i.jsxs("div",{className:"emoji-grid-area",children:[o.map(c=>i.jsxs("div",{className:"emoji-category",children:[!s&&i.jsx("div",{className:"emoji-cat-label",children:n(`emoji.${c.key}`)||c.key}),i.jsx("div",{className:"emoji-grid",children:c.emojis.map(f=>i.jsx("button",{className:"emoji-item",onClick:()=>e(f),children:f},f))})]},c.key)),s&&((u=o[0])==null?void 0:u.emojis.length)===0&&i.jsx("div",{className:"emoji-empty",children:"No emoji found"})]}),i.jsx("style",{children:`
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
      `})]})}function G0({users:e,filter:t,onSelect:n,selectedIndex:r}){const s=y.useRef(null),a=e.filter(o=>o.nickname.toLowerCase().startsWith(t.toLowerCase())).slice(0,6);return y.useEffect(()=>{var u;const o=(u=s.current)==null?void 0:u.children[r];o==null||o.scrollIntoView({block:"nearest"})},[r]),a.length===0?null:i.jsxs("div",{className:"mention-suggestions",children:[i.jsx("ul",{ref:s,children:a.map((o,u)=>i.jsxs("li",{className:`mention-item ${u===r?"active":""}`,onMouseDown:c=>{c.preventDefault(),n(o.nickname)},children:[i.jsxs("span",{className:"mention-nick",style:{color:`var(--role-${o.role})`},children:["@",o.nickname]}),i.jsx("span",{className:"mention-role",children:o.role})]},o.userId))}),i.jsx("style",{children:`
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
      `})]})}function Z0({onFormat:e}){return i.jsxs("div",{className:"format-toolbar",children:[i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("**"),title:"Bold (Ctrl+B)",children:i.jsx(Ax,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("*"),title:"Italic (Ctrl+I)",children:i.jsx(Wx,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("~~"),title:"Strikethrough",children:i.jsx(d0,{size:14})})]}),i.jsx("div",{className:"format-sep"}),i.jsxs("div",{className:"format-group",children:[i.jsx("button",{className:"format-btn",onClick:()=>e("`"),title:"Code",children:i.jsx($x,{size:14})}),i.jsx("button",{className:"format-btn",onClick:()=>e("[","[","](url)"),title:"Link",children:i.jsx(Jx,{size:14})})]}),i.jsx("style",{children:`
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
      `})]})}function e1({onSend:e,onCancel:t}){const{t:n}=Qe(),[r,s]=y.useState(!1),[a,o]=y.useState(0),[u,c]=y.useState(null),[f,m]=y.useState(null),k=y.useRef(null),g=y.useRef([]),N=y.useRef(0),v=y.useRef(0);y.useEffect(()=>(w(),()=>{N.current&&clearInterval(N.current),f&&URL.revokeObjectURL(f)}),[]);const w=async()=>{try{const C=await navigator.mediaDevices.getUserMedia({audio:!0}),E=new MediaRecorder(C,{mimeType:"audio/webm;codecs=opus"});k.current=E,g.current=[],E.ondataavailable=L=>{L.data.size>0&&g.current.push(L.data)},E.onstop=()=>{const L=new Blob(g.current,{type:"audio/webm"});c(L),m(URL.createObjectURL(L)),C.getTracks().forEach(_=>_.stop())},E.start(100),s(!0),v.current=Date.now(),N.current=window.setInterval(()=>{o(Math.floor((Date.now()-v.current)/1e3))},200)}catch{t()}},M=()=>{k.current&&r&&(k.current.stop(),s(!1),N.current&&clearInterval(N.current))},j=()=>{u&&e(u,a)},b=C=>{const E=Math.floor(C/60),L=C%60;return`${E}:${L.toString().padStart(2,"0")}`};return i.jsxs("div",{className:"voice-recorder",children:[i.jsxs("div",{className:"voice-recorder-indicator",children:[r&&i.jsx("span",{className:"voice-rec-dot"}),i.jsx("span",{className:"voice-rec-time",children:b(a)})]}),r&&i.jsx("div",{className:"voice-recorder-wave",children:Array.from({length:5}).map((C,E)=>i.jsx("span",{className:"voice-wave-bar",style:{animationDelay:`${E*.1}s`}},E))}),f&&!r&&i.jsx("audio",{className:"voice-recorder-preview",src:f,controls:!0}),i.jsxs("div",{className:"voice-recorder-actions",children:[r?i.jsx("button",{className:"voice-btn voice-stop",onClick:M,title:n("voice.stop"),children:i.jsx(c0,{size:14})}):u?i.jsx("button",{className:"voice-btn voice-send",onClick:j,title:n("voice.send"),children:i.jsx(Xi,{size:14})}):i.jsx(pa,{size:14,className:"voice-loading"}),i.jsx("button",{className:"voice-btn voice-cancel",onClick:t,title:n("voice.cancel"),children:i.jsx(zt,{size:14})})]}),i.jsx("style",{children:`
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
      `})]})}function t1(e,t){const n=new Date(e),r=new Date,s=new Date(r.getFullYear(),r.getMonth(),r.getDate()),a=new Date(n.getFullYear(),n.getMonth(),n.getDate()),o=(s.getTime()-a.getTime())/864e5;return o===0?t("chat.today"):o===1?t("chat.yesterday"):n.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}function n1({messages:e,activeChannel:t,channelTopic:n,currentUserId:r,currentRole:s,typingUsers:a,dmMode:o,onSendMessage:u,onSlashCommand:c,onTyping:f,onSearchOpen:m,onReact:k,onRemoveReact:g,onEdit:N,onDelete:v,onPin:w,onReply:M,replyTo:j,onCancelReply:b,onLoadHistory:C,historyLoading:E,hasMoreHistory:L,onFileUpload:_,canUpload:D,users:q,onPinsOpen:Te,onBookmarksOpen:ge,onBookmark:Be,isBookmarked:dt,onChannelSettings:wt,onImageClick:ft,lastReadMessageId:jt,pinnedMessageIds:qe,onQuote:pt,quotedText:K,onQuoteClear:ie,onThreadOpen:me,onForward:De}){const{t:fe}=Qe(),[Ze,We]=y.useState(""),[ke,et]=y.useState(!1),[Pt,nn]=y.useState(null),[qt,Xt]=y.useState(0),[rn,Ot]=y.useState(!1),[un,_t]=y.useState(0),[ye,ht]=y.useState(null),[$n,Fn]=y.useState(!1),Bt=y.useRef(null),Ht=y.useRef(null),yn=y.useRef(0),bn=y.useRef(null),zn=y.useRef(0),dn=y.useRef(!1),Pn=y.useRef(0);y.useEffect(()=>{K&&(We(K),ie==null||ie())},[K,ie]);const nt=e.filter(Y=>Y.channel===t||Y.system),Bn=y.useCallback(()=>{const Y=Ht.current;if(!Y)return;const X=Y.scrollHeight-Y.scrollTop-Y.clientHeight;Ot(X>80),X<=80&&_t(0);const Ye=Y.querySelectorAll(".chat-date-separator");let xt=null;for(let In=Ye.length-1;In>=0;In--){const rt=Ye[In].getBoundingClientRect(),fn=Y.getBoundingClientRect();if(rt.top<=fn.top+10){xt=Ye[In].textContent||null;break}}ht(X>80?xt:null),!(E||!L||!C||dn.current)&&Y.scrollTop<100&&nt.length>0&&(dn.current=!0,zn.current=Y.scrollHeight,C(t,nt[0].timestamp))},[t,nt,E,L,C]);y.useEffect(()=>{if(dn.current&&!E){dn.current=!1;const Y=Ht.current;if(Y){const X=Y.scrollHeight;Y.scrollTop=X-zn.current}}},[E,nt.length]);const kn=y.useCallback(()=>{var Y;(Y=bn.current)==null||Y.click()},[]),ir=y.useCallback(Y=>{var Ye;const X=(Ye=Y.target.files)==null?void 0:Ye[0];X&&_&&_(X),Y.target.value=""},[_]),Z=y.useMemo(()=>{const Y=[];let X="";for(const Ye of nt){const xt=new Date(Ye.timestamp).toDateString();xt!==X&&(X=xt,Y.push({type:"separator",date:t1(Ye.timestamp,fe),key:`sep-${xt}`})),Y.push(Ye)}return Y},[nt,fe]);y.useEffect(()=>{var Y;nt.length>Pn.current&&(rn?_t(X=>X+(nt.length-Pn.current)):(Y=Bt.current)==null||Y.scrollIntoView({behavior:"smooth"})),Pn.current=nt.length},[nt.length,rn]);const U=()=>{const Y=Ze.trim();if(Y){if(Y.startsWith("/")&&c){const X=Y.slice(1).split(/\s+/);c(X[0],X.slice(1))}else u(t,Y);We("")}},G=Y=>{We(Y);const X=Y.length,xt=Y.slice(0,X).match(/@(\w*)$/);xt&&q&&q.length>0?(nn(xt[1]),Xt(0)):nn(null)},be=Y=>{const X=/@(\w*)$/;We(Ye=>Ye.replace(X,`@${Y} `)),nn(null)},at=y.useCallback((Y,X,Ye)=>{We(X&&Ye?xt=>xt+X+"text"+Ye:xt=>xt+Y+"text"+Y)},[]),W=Y=>{if(Pt!==null){if(Y.key==="ArrowDown"){Y.preventDefault(),Xt(X=>X+1);return}if(Y.key==="ArrowUp"){Y.preventDefault(),Xt(X=>Math.max(0,X-1));return}if(Y.key==="Tab"||Y.key==="Enter"){Y.preventDefault();const X=(q||[]).filter(xt=>xt.nickname.toLowerCase().startsWith((Pt||"").toLowerCase())).slice(0,6),Ye=qt%Math.max(X.length,1);X[Ye]&&be(X[Ye].nickname);return}if(Y.key==="Escape"){nn(null);return}}if(Y.key==="Enter"&&!Y.shiftKey){Y.preventDefault(),U();return}f&&Date.now()-yn.current>2e3&&(yn.current=Date.now(),f())},xe=y.useCallback(Y=>{We(X=>X+Y),et(!1)},[]),z=a.filter(Y=>o?Y.targetId===r&&Y.userId===o.peerId:Y.channel===t&&Y.userId!==r),He=z.length>0?z.length===1?fe("chat.typing",{name:z[0].nickname}):fe("chat.typingMultiple",{count:z.length}):null;return i.jsxs("div",{className:"chat-panel",children:[i.jsxs("div",{className:"chat-header",children:[i.jsx("span",{className:"chat-channel-name",onClick:o?void 0:wt,style:o?void 0:{cursor:"pointer"},children:o?`@ ${o.peerNick}`:`# ${t}`}),!o&&n&&i.jsx("span",{className:"chat-topic",onClick:wt,style:{cursor:"pointer"},children:n}),i.jsxs("div",{className:"chat-header-actions",children:[Te&&i.jsx("button",{className:"chat-header-btn",onClick:Te,title:fe("pins.title"),children:i.jsx(bs,{size:15})}),ge&&i.jsx("button",{className:"chat-header-btn",onClick:ge,title:fe("bookmarks.title"),children:i.jsx(fa,{size:15})}),m&&i.jsx("button",{className:"chat-header-btn",onClick:m,title:fe("search.title"),children:i.jsx(Rl,{size:15})})]})]}),i.jsxs("div",{className:"chat-messages",ref:Ht,onScroll:Bn,children:[ye&&i.jsx("div",{className:"chat-sticky-date",children:i.jsx("span",{children:ye})}),E&&i.jsxs("div",{className:"chat-history-loading",children:[i.jsx(pa,{size:14,className:"spinner"}),i.jsx("span",{children:fe("chat.loadingHistory")})]}),!E&&L===!1&&nt.length>0&&i.jsx("div",{className:"chat-history-end",children:fe("chat.historyStart")}),nt.length===0&&i.jsxs("div",{className:"chat-empty",children:[i.jsx("div",{className:"chat-empty-icon",children:"��"}),i.jsx("span",{children:fe("chat.noMessages")})]}),Z.map(Y=>{if("type"in Y&&Y.type==="separator")return i.jsx("div",{className:"chat-date-separator",children:i.jsx("span",{children:Y.date})},Y.key);const X=Y,Ye=s==="admin"||s==="operator",xt=X.replyTo?nt.find(Pr=>Pr.id===X.replyTo):void 0,In=nt.indexOf(X),rt=In>0?nt[In-1]:void 0,fn=rt!==void 0&&rt.userId===X.userId&&X.timestamp-rt.timestamp<12e4&&!X.replyTo&&!X.system&&!rt.system,Hn=jt&&(rt==null?void 0:rt.id)===jt&&X.userId!==r,or=X.replyTo&&me;return i.jsxs("div",{children:[Hn&&i.jsx("div",{className:"chat-unread-marker",children:i.jsx("span",{children:fe("chat.newMessages")})}),i.jsx(Ol,{id:X.id,userId:X.userId,nickname:X.nickname,content:X.content,role:X.role,timestamp:X.timestamp,isOwn:X.userId===r,edited:X.edited,reactions:X.reactions,currentUserId:r,canModerate:Ye,system:X.system,onReact:k,onRemoveReact:g,onEdit:N,onDelete:v,onPin:w,onReply:M,onBookmark:Be,isBookmarked:dt==null?void 0:dt(X.id),isPinned:qe==null?void 0:qe.includes(X.id),replyContext:xt?{nickname:xt.nickname,content:xt.content}:void 0,isGrouped:fn,onImageClick:ft,onQuote:pt,onThreadOpen:or?()=>me(X.replyTo):void 0,onForward:De})]},X.id)}),i.jsx("div",{ref:Bt})]}),rn&&i.jsxs("button",{className:"scroll-to-bottom",onClick:()=>{var Y;(Y=Bt.current)==null||Y.scrollIntoView({behavior:"smooth"}),Ot(!1),_t(0)},children:[i.jsx(Rx,{size:14}),un>0&&i.jsx("span",{className:"scroll-badge",children:un})]}),He&&i.jsxs("div",{className:"chat-typing",children:[i.jsxs("span",{className:"typing-dots",children:[i.jsx("span",{}),i.jsx("span",{}),i.jsx("span",{})]}),He]}),j&&i.jsxs("div",{className:"chat-reply-preview",children:[i.jsxs("span",{className:"reply-label",children:[fe("chat.replyingTo")," ",i.jsx("strong",{children:j.nickname})]}),i.jsx("span",{className:"reply-content",children:j.content.slice(0,80)}),i.jsx("button",{className:"reply-cancel",onClick:b,title:"Cancel",children:i.jsx("span",{children:"×"})})]}),$n&&i.jsx("div",{className:"chat-voice-area",children:i.jsx(e1,{onSend:(Y,X)=>{const Ye=new File([Y],`voice-${Date.now()}.webm`,{type:"audio/webm"});_==null||_(Ye),Fn(!1)},onCancel:()=>Fn(!1)})}),i.jsx(Z0,{onFormat:at}),i.jsxs("div",{className:"chat-input-area",children:[D&&_&&i.jsxs(i.Fragment,{children:[i.jsx("button",{className:"chat-upload-btn",onClick:kn,title:fe("files.upload"),children:i.jsx(ha,{size:18})}),i.jsx("input",{ref:bn,type:"file",style:{display:"none"},onChange:ir})]}),i.jsxs("div",{className:"chat-input-wrapper",children:[Pt!==null&&q&&i.jsx(G0,{users:q,filter:Pt,onSelect:be,selectedIndex:qt}),i.jsx("textarea",{className:"chat-input",value:Ze,onChange:Y=>G(Y.target.value),onKeyDown:W,placeholder:o?fe("chat.dmPlaceholder",{name:o.peerNick}):fe("chat.placeholder"),rows:1,"aria-label":o?fe("chat.dmPlaceholder",{name:o.peerNick}):fe("chat.placeholder")}),i.jsx("button",{className:"emoji-btn",onClick:()=>et(Y=>!Y),title:"Emoji","aria-label":"Emoji",children:i.jsx(Gi,{size:18})}),ke&&i.jsx(X0,{onSelect:xe,onClose:()=>et(!1)})]}),!Ze.trim()&&D?i.jsx("button",{className:"chat-mic-btn",onClick:()=>Fn(!0),title:fe("voice.record"),"aria-label":fe("voice.record"),children:i.jsx(Zx,{size:18})}):i.jsx("button",{className:"chat-send-btn",onClick:U,disabled:!Ze.trim(),"aria-label":fe("chat.send"),children:i.jsx(Xi,{size:18})})]}),i.jsx("style",{children:`
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
      `})]})}function r1({role:e}){switch(e){case"admin":return i.jsx(nh,{size:11,style:{color:"var(--role-admin)"}});case"operator":return i.jsx(th,{size:11,style:{color:"var(--role-operator)"}});case"guest":return i.jsx(Fx,{size:11,style:{color:"var(--role-guest)"}});default:return i.jsx(h0,{size:11,style:{color:"var(--role-member)"}})}}function s1({users:e,currentUserId:t,currentRole:n,onKick:r,onBan:s,onOp:a,onDeop:o,onDM:u}){const{t:c}=Qe(),[f,m]=y.useState(null),[k,g]=y.useState({x:0,y:0}),N=y.useRef(null),v=n==="admin"||n==="operator";y.useEffect(()=>{const b=C=>{N.current&&!N.current.contains(C.target)&&m(null)};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[]);const w=(b,C)=>{if(b===t)return;const E=C.target.getBoundingClientRect();g({x:E.left,y:E.bottom+4}),m(b===f?null:b)},M=[...e].sort((b,C)=>{var D,q;const E={admin:0,operator:1,member:2,guest:3},L=(D=E[b.role])!=null?D:4,_=(q=E[C.role])!=null?q:4;return L!==_?L-_:b.nickname.localeCompare(C.nickname)}),j=e.find(b=>b.userId===f);return i.jsxs("aside",{className:"user-list",children:[i.jsxs("div",{className:"user-list-header",children:[i.jsx("span",{children:c("users.title")}),i.jsx("span",{className:"user-count",children:e.length})]}),i.jsx("ul",{className:"user-entries",role:"list","aria-label":c("users.title"),children:M.map(b=>i.jsxs("li",{className:`user-entry ${b.userId!==t?"clickable":""} ${b.userId===t?"self":""}`,onClick:C=>w(b.userId,C),children:[i.jsxs("div",{className:"user-entry-avatar",children:[i.jsx(lh,{userId:b.userId,nickname:b.nickname,size:22}),i.jsx(ih,{status:b.status})]}),i.jsx(r1,{role:b.role}),i.jsx("span",{className:"user-nick",style:{color:`var(--role-${b.role})`},children:b.nickname})]},`${b.userId}-${b.nickname}`))}),f&&j&&i.jsxs("div",{ref:N,className:"user-menu",style:{position:"fixed",left:k.x,top:k.y},children:[i.jsxs("div",{className:"user-menu-header",children:[i.jsx("span",{className:"user-menu-nick",children:j.nickname}),i.jsx("span",{className:"user-menu-role",style:{color:`var(--role-${j.role})`},children:c(`roles.${j.role}`)})]}),i.jsxs("div",{className:"user-menu-pubkey",title:j.userId,children:[j.userId.slice(0,16),"..."]}),i.jsxs("div",{className:"user-menu-actions",children:[i.jsx("button",{onClick:()=>{u==null||u(f),m(null)},children:c("users.sendDM")}),v&&j.role!=="operator"&&i.jsx("button",{onClick:()=>{a==null||a(f),m(null)},children:c("roles.operator")}),v&&j.role==="operator"&&i.jsx("button",{onClick:()=>{o==null||o(f),m(null)},children:c("roles.member")}),v&&i.jsx("button",{onClick:()=>{r==null||r(f),m(null)},children:"Kick"}),v&&i.jsx("button",{className:"danger",onClick:()=>{s==null||s(f),m(null)},children:"Ban"})]})]}),i.jsx("style",{children:`
        .user-list {
          width: 200px;
          min-width: 200px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--border);
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
      `})]})}function a1(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ph={exports:{}};const i1={},o1=Object.freeze(Object.defineProperty({__proto__:null,default:i1},Symbol.toStringTag,{value:"Module"})),l1=Fh(o1);(function(e){(function(t){var n=function(d){var h,p=new Float64Array(16);if(d)for(h=0;h<d.length;h++)p[h]=d[h];return p},r=function(){throw new Error("no PRNG")},s=new Uint8Array(16),a=new Uint8Array(32);a[0]=9;var o=n(),u=n([1]),c=n([56129,1]),f=n([30883,4953,19914,30187,55467,16705,2637,112,59544,30585,16505,36039,65139,11119,27886,20995]),m=n([61785,9906,39828,60374,45398,33411,5274,224,53552,61171,33010,6542,64743,22239,55772,9222]),k=n([54554,36645,11616,51542,42930,38181,51040,26924,56412,64982,57905,49316,21502,52590,14035,8553]),g=n([26200,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214,26214]),N=n([41136,18958,6951,50414,58488,44335,6150,12099,55207,15867,153,11085,57099,20417,9344,11139]);function v(d,h,p,l){d[h]=p>>24&255,d[h+1]=p>>16&255,d[h+2]=p>>8&255,d[h+3]=p&255,d[h+4]=l>>24&255,d[h+5]=l>>16&255,d[h+6]=l>>8&255,d[h+7]=l&255}function w(d,h,p,l,x){var P,I=0;for(P=0;P<x;P++)I|=d[h+P]^p[l+P];return(1&I-1>>>8)-1}function M(d,h,p,l){return w(d,h,p,l,16)}function j(d,h,p,l){return w(d,h,p,l,32)}function b(d,h,p,l){for(var x=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,I=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,$=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,J=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,de=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Ae=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,we=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,je=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Me=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,ze=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Se=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ee=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ne=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,oe=x,he=P,re=I,le=$,ce=J,ne=de,T=te,R=Ae,H=se,F=we,A=je,V=Me,ve=ze,Ce=Se,Le=Ee,Pe=Ne,S,_e=0;_e<20;_e+=2)S=oe+ve|0,ce^=S<<7|S>>>25,S=ce+oe|0,H^=S<<9|S>>>23,S=H+ce|0,ve^=S<<13|S>>>19,S=ve+H|0,oe^=S<<18|S>>>14,S=ne+he|0,F^=S<<7|S>>>25,S=F+ne|0,Ce^=S<<9|S>>>23,S=Ce+F|0,he^=S<<13|S>>>19,S=he+Ce|0,ne^=S<<18|S>>>14,S=A+T|0,Le^=S<<7|S>>>25,S=Le+A|0,re^=S<<9|S>>>23,S=re+Le|0,T^=S<<13|S>>>19,S=T+re|0,A^=S<<18|S>>>14,S=Pe+V|0,le^=S<<7|S>>>25,S=le+Pe|0,R^=S<<9|S>>>23,S=R+le|0,V^=S<<13|S>>>19,S=V+R|0,Pe^=S<<18|S>>>14,S=oe+le|0,he^=S<<7|S>>>25,S=he+oe|0,re^=S<<9|S>>>23,S=re+he|0,le^=S<<13|S>>>19,S=le+re|0,oe^=S<<18|S>>>14,S=ne+ce|0,T^=S<<7|S>>>25,S=T+ne|0,R^=S<<9|S>>>23,S=R+T|0,ce^=S<<13|S>>>19,S=ce+R|0,ne^=S<<18|S>>>14,S=A+F|0,V^=S<<7|S>>>25,S=V+A|0,H^=S<<9|S>>>23,S=H+V|0,F^=S<<13|S>>>19,S=F+H|0,A^=S<<18|S>>>14,S=Pe+Le|0,ve^=S<<7|S>>>25,S=ve+Pe|0,Ce^=S<<9|S>>>23,S=Ce+ve|0,Le^=S<<13|S>>>19,S=Le+Ce|0,Pe^=S<<18|S>>>14;oe=oe+x|0,he=he+P|0,re=re+I|0,le=le+$|0,ce=ce+J|0,ne=ne+de|0,T=T+te|0,R=R+Ae|0,H=H+se|0,F=F+we|0,A=A+je|0,V=V+Me|0,ve=ve+ze|0,Ce=Ce+Se|0,Le=Le+Ee|0,Pe=Pe+Ne|0,d[0]=oe>>>0&255,d[1]=oe>>>8&255,d[2]=oe>>>16&255,d[3]=oe>>>24&255,d[4]=he>>>0&255,d[5]=he>>>8&255,d[6]=he>>>16&255,d[7]=he>>>24&255,d[8]=re>>>0&255,d[9]=re>>>8&255,d[10]=re>>>16&255,d[11]=re>>>24&255,d[12]=le>>>0&255,d[13]=le>>>8&255,d[14]=le>>>16&255,d[15]=le>>>24&255,d[16]=ce>>>0&255,d[17]=ce>>>8&255,d[18]=ce>>>16&255,d[19]=ce>>>24&255,d[20]=ne>>>0&255,d[21]=ne>>>8&255,d[22]=ne>>>16&255,d[23]=ne>>>24&255,d[24]=T>>>0&255,d[25]=T>>>8&255,d[26]=T>>>16&255,d[27]=T>>>24&255,d[28]=R>>>0&255,d[29]=R>>>8&255,d[30]=R>>>16&255,d[31]=R>>>24&255,d[32]=H>>>0&255,d[33]=H>>>8&255,d[34]=H>>>16&255,d[35]=H>>>24&255,d[36]=F>>>0&255,d[37]=F>>>8&255,d[38]=F>>>16&255,d[39]=F>>>24&255,d[40]=A>>>0&255,d[41]=A>>>8&255,d[42]=A>>>16&255,d[43]=A>>>24&255,d[44]=V>>>0&255,d[45]=V>>>8&255,d[46]=V>>>16&255,d[47]=V>>>24&255,d[48]=ve>>>0&255,d[49]=ve>>>8&255,d[50]=ve>>>16&255,d[51]=ve>>>24&255,d[52]=Ce>>>0&255,d[53]=Ce>>>8&255,d[54]=Ce>>>16&255,d[55]=Ce>>>24&255,d[56]=Le>>>0&255,d[57]=Le>>>8&255,d[58]=Le>>>16&255,d[59]=Le>>>24&255,d[60]=Pe>>>0&255,d[61]=Pe>>>8&255,d[62]=Pe>>>16&255,d[63]=Pe>>>24&255}function C(d,h,p,l){for(var x=l[0]&255|(l[1]&255)<<8|(l[2]&255)<<16|(l[3]&255)<<24,P=p[0]&255|(p[1]&255)<<8|(p[2]&255)<<16|(p[3]&255)<<24,I=p[4]&255|(p[5]&255)<<8|(p[6]&255)<<16|(p[7]&255)<<24,$=p[8]&255|(p[9]&255)<<8|(p[10]&255)<<16|(p[11]&255)<<24,J=p[12]&255|(p[13]&255)<<8|(p[14]&255)<<16|(p[15]&255)<<24,de=l[4]&255|(l[5]&255)<<8|(l[6]&255)<<16|(l[7]&255)<<24,te=h[0]&255|(h[1]&255)<<8|(h[2]&255)<<16|(h[3]&255)<<24,Ae=h[4]&255|(h[5]&255)<<8|(h[6]&255)<<16|(h[7]&255)<<24,se=h[8]&255|(h[9]&255)<<8|(h[10]&255)<<16|(h[11]&255)<<24,we=h[12]&255|(h[13]&255)<<8|(h[14]&255)<<16|(h[15]&255)<<24,je=l[8]&255|(l[9]&255)<<8|(l[10]&255)<<16|(l[11]&255)<<24,Me=p[16]&255|(p[17]&255)<<8|(p[18]&255)<<16|(p[19]&255)<<24,ze=p[20]&255|(p[21]&255)<<8|(p[22]&255)<<16|(p[23]&255)<<24,Se=p[24]&255|(p[25]&255)<<8|(p[26]&255)<<16|(p[27]&255)<<24,Ee=p[28]&255|(p[29]&255)<<8|(p[30]&255)<<16|(p[31]&255)<<24,Ne=l[12]&255|(l[13]&255)<<8|(l[14]&255)<<16|(l[15]&255)<<24,oe=x,he=P,re=I,le=$,ce=J,ne=de,T=te,R=Ae,H=se,F=we,A=je,V=Me,ve=ze,Ce=Se,Le=Ee,Pe=Ne,S,_e=0;_e<20;_e+=2)S=oe+ve|0,ce^=S<<7|S>>>25,S=ce+oe|0,H^=S<<9|S>>>23,S=H+ce|0,ve^=S<<13|S>>>19,S=ve+H|0,oe^=S<<18|S>>>14,S=ne+he|0,F^=S<<7|S>>>25,S=F+ne|0,Ce^=S<<9|S>>>23,S=Ce+F|0,he^=S<<13|S>>>19,S=he+Ce|0,ne^=S<<18|S>>>14,S=A+T|0,Le^=S<<7|S>>>25,S=Le+A|0,re^=S<<9|S>>>23,S=re+Le|0,T^=S<<13|S>>>19,S=T+re|0,A^=S<<18|S>>>14,S=Pe+V|0,le^=S<<7|S>>>25,S=le+Pe|0,R^=S<<9|S>>>23,S=R+le|0,V^=S<<13|S>>>19,S=V+R|0,Pe^=S<<18|S>>>14,S=oe+le|0,he^=S<<7|S>>>25,S=he+oe|0,re^=S<<9|S>>>23,S=re+he|0,le^=S<<13|S>>>19,S=le+re|0,oe^=S<<18|S>>>14,S=ne+ce|0,T^=S<<7|S>>>25,S=T+ne|0,R^=S<<9|S>>>23,S=R+T|0,ce^=S<<13|S>>>19,S=ce+R|0,ne^=S<<18|S>>>14,S=A+F|0,V^=S<<7|S>>>25,S=V+A|0,H^=S<<9|S>>>23,S=H+V|0,F^=S<<13|S>>>19,S=F+H|0,A^=S<<18|S>>>14,S=Pe+Le|0,ve^=S<<7|S>>>25,S=ve+Pe|0,Ce^=S<<9|S>>>23,S=Ce+ve|0,Le^=S<<13|S>>>19,S=Le+Ce|0,Pe^=S<<18|S>>>14;d[0]=oe>>>0&255,d[1]=oe>>>8&255,d[2]=oe>>>16&255,d[3]=oe>>>24&255,d[4]=ne>>>0&255,d[5]=ne>>>8&255,d[6]=ne>>>16&255,d[7]=ne>>>24&255,d[8]=A>>>0&255,d[9]=A>>>8&255,d[10]=A>>>16&255,d[11]=A>>>24&255,d[12]=Pe>>>0&255,d[13]=Pe>>>8&255,d[14]=Pe>>>16&255,d[15]=Pe>>>24&255,d[16]=T>>>0&255,d[17]=T>>>8&255,d[18]=T>>>16&255,d[19]=T>>>24&255,d[20]=R>>>0&255,d[21]=R>>>8&255,d[22]=R>>>16&255,d[23]=R>>>24&255,d[24]=H>>>0&255,d[25]=H>>>8&255,d[26]=H>>>16&255,d[27]=H>>>24&255,d[28]=F>>>0&255,d[29]=F>>>8&255,d[30]=F>>>16&255,d[31]=F>>>24&255}function E(d,h,p,l){b(d,h,p,l)}function L(d,h,p,l){C(d,h,p,l)}var _=new Uint8Array([101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107]);function D(d,h,p,l,x,P,I){var $=new Uint8Array(16),J=new Uint8Array(64),de,te;for(te=0;te<16;te++)$[te]=0;for(te=0;te<8;te++)$[te]=P[te];for(;x>=64;){for(E(J,$,I,_),te=0;te<64;te++)d[h+te]=p[l+te]^J[te];for(de=1,te=8;te<16;te++)de=de+($[te]&255)|0,$[te]=de&255,de>>>=8;x-=64,h+=64,l+=64}if(x>0)for(E(J,$,I,_),te=0;te<x;te++)d[h+te]=p[l+te]^J[te];return 0}function q(d,h,p,l,x){var P=new Uint8Array(16),I=new Uint8Array(64),$,J;for(J=0;J<16;J++)P[J]=0;for(J=0;J<8;J++)P[J]=l[J];for(;p>=64;){for(E(I,P,x,_),J=0;J<64;J++)d[h+J]=I[J];for($=1,J=8;J<16;J++)$=$+(P[J]&255)|0,P[J]=$&255,$>>>=8;p-=64,h+=64}if(p>0)for(E(I,P,x,_),J=0;J<p;J++)d[h+J]=I[J];return 0}function Te(d,h,p,l,x){var P=new Uint8Array(32);L(P,l,x,_);for(var I=new Uint8Array(8),$=0;$<8;$++)I[$]=l[$+16];return q(d,h,p,I,P)}function ge(d,h,p,l,x,P,I){var $=new Uint8Array(32);L($,P,I,_);for(var J=new Uint8Array(8),de=0;de<8;de++)J[de]=P[de+16];return D(d,h,p,l,x,J,$)}var Be=function(d){this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.leftover=0,this.fin=0;var h,p,l,x,P,I,$,J;h=d[0]&255|(d[1]&255)<<8,this.r[0]=h&8191,p=d[2]&255|(d[3]&255)<<8,this.r[1]=(h>>>13|p<<3)&8191,l=d[4]&255|(d[5]&255)<<8,this.r[2]=(p>>>10|l<<6)&7939,x=d[6]&255|(d[7]&255)<<8,this.r[3]=(l>>>7|x<<9)&8191,P=d[8]&255|(d[9]&255)<<8,this.r[4]=(x>>>4|P<<12)&255,this.r[5]=P>>>1&8190,I=d[10]&255|(d[11]&255)<<8,this.r[6]=(P>>>14|I<<2)&8191,$=d[12]&255|(d[13]&255)<<8,this.r[7]=(I>>>11|$<<5)&8065,J=d[14]&255|(d[15]&255)<<8,this.r[8]=($>>>8|J<<8)&8191,this.r[9]=J>>>5&127,this.pad[0]=d[16]&255|(d[17]&255)<<8,this.pad[1]=d[18]&255|(d[19]&255)<<8,this.pad[2]=d[20]&255|(d[21]&255)<<8,this.pad[3]=d[22]&255|(d[23]&255)<<8,this.pad[4]=d[24]&255|(d[25]&255)<<8,this.pad[5]=d[26]&255|(d[27]&255)<<8,this.pad[6]=d[28]&255|(d[29]&255)<<8,this.pad[7]=d[30]&255|(d[31]&255)<<8};Be.prototype.blocks=function(d,h,p){for(var l=this.fin?0:2048,x,P,I,$,J,de,te,Ae,se,we,je,Me,ze,Se,Ee,Ne,oe,he,re,le=this.h[0],ce=this.h[1],ne=this.h[2],T=this.h[3],R=this.h[4],H=this.h[5],F=this.h[6],A=this.h[7],V=this.h[8],ve=this.h[9],Ce=this.r[0],Le=this.r[1],Pe=this.r[2],S=this.r[3],_e=this.r[4],Ve=this.r[5],Ke=this.r[6],Re=this.r[7],Ue=this.r[8],$e=this.r[9];p>=16;)x=d[h+0]&255|(d[h+1]&255)<<8,le+=x&8191,P=d[h+2]&255|(d[h+3]&255)<<8,ce+=(x>>>13|P<<3)&8191,I=d[h+4]&255|(d[h+5]&255)<<8,ne+=(P>>>10|I<<6)&8191,$=d[h+6]&255|(d[h+7]&255)<<8,T+=(I>>>7|$<<9)&8191,J=d[h+8]&255|(d[h+9]&255)<<8,R+=($>>>4|J<<12)&8191,H+=J>>>1&8191,de=d[h+10]&255|(d[h+11]&255)<<8,F+=(J>>>14|de<<2)&8191,te=d[h+12]&255|(d[h+13]&255)<<8,A+=(de>>>11|te<<5)&8191,Ae=d[h+14]&255|(d[h+15]&255)<<8,V+=(te>>>8|Ae<<8)&8191,ve+=Ae>>>5|l,se=0,we=se,we+=le*Ce,we+=ce*(5*$e),we+=ne*(5*Ue),we+=T*(5*Re),we+=R*(5*Ke),se=we>>>13,we&=8191,we+=H*(5*Ve),we+=F*(5*_e),we+=A*(5*S),we+=V*(5*Pe),we+=ve*(5*Le),se+=we>>>13,we&=8191,je=se,je+=le*Le,je+=ce*Ce,je+=ne*(5*$e),je+=T*(5*Ue),je+=R*(5*Re),se=je>>>13,je&=8191,je+=H*(5*Ke),je+=F*(5*Ve),je+=A*(5*_e),je+=V*(5*S),je+=ve*(5*Pe),se+=je>>>13,je&=8191,Me=se,Me+=le*Pe,Me+=ce*Le,Me+=ne*Ce,Me+=T*(5*$e),Me+=R*(5*Ue),se=Me>>>13,Me&=8191,Me+=H*(5*Re),Me+=F*(5*Ke),Me+=A*(5*Ve),Me+=V*(5*_e),Me+=ve*(5*S),se+=Me>>>13,Me&=8191,ze=se,ze+=le*S,ze+=ce*Pe,ze+=ne*Le,ze+=T*Ce,ze+=R*(5*$e),se=ze>>>13,ze&=8191,ze+=H*(5*Ue),ze+=F*(5*Re),ze+=A*(5*Ke),ze+=V*(5*Ve),ze+=ve*(5*_e),se+=ze>>>13,ze&=8191,Se=se,Se+=le*_e,Se+=ce*S,Se+=ne*Pe,Se+=T*Le,Se+=R*Ce,se=Se>>>13,Se&=8191,Se+=H*(5*$e),Se+=F*(5*Ue),Se+=A*(5*Re),Se+=V*(5*Ke),Se+=ve*(5*Ve),se+=Se>>>13,Se&=8191,Ee=se,Ee+=le*Ve,Ee+=ce*_e,Ee+=ne*S,Ee+=T*Pe,Ee+=R*Le,se=Ee>>>13,Ee&=8191,Ee+=H*Ce,Ee+=F*(5*$e),Ee+=A*(5*Ue),Ee+=V*(5*Re),Ee+=ve*(5*Ke),se+=Ee>>>13,Ee&=8191,Ne=se,Ne+=le*Ke,Ne+=ce*Ve,Ne+=ne*_e,Ne+=T*S,Ne+=R*Pe,se=Ne>>>13,Ne&=8191,Ne+=H*Le,Ne+=F*Ce,Ne+=A*(5*$e),Ne+=V*(5*Ue),Ne+=ve*(5*Re),se+=Ne>>>13,Ne&=8191,oe=se,oe+=le*Re,oe+=ce*Ke,oe+=ne*Ve,oe+=T*_e,oe+=R*S,se=oe>>>13,oe&=8191,oe+=H*Pe,oe+=F*Le,oe+=A*Ce,oe+=V*(5*$e),oe+=ve*(5*Ue),se+=oe>>>13,oe&=8191,he=se,he+=le*Ue,he+=ce*Re,he+=ne*Ke,he+=T*Ve,he+=R*_e,se=he>>>13,he&=8191,he+=H*S,he+=F*Pe,he+=A*Le,he+=V*Ce,he+=ve*(5*$e),se+=he>>>13,he&=8191,re=se,re+=le*$e,re+=ce*Ue,re+=ne*Re,re+=T*Ke,re+=R*Ve,se=re>>>13,re&=8191,re+=H*_e,re+=F*S,re+=A*Pe,re+=V*Le,re+=ve*Ce,se+=re>>>13,re&=8191,se=(se<<2)+se|0,se=se+we|0,we=se&8191,se=se>>>13,je+=se,le=we,ce=je,ne=Me,T=ze,R=Se,H=Ee,F=Ne,A=oe,V=he,ve=re,h+=16,p-=16;this.h[0]=le,this.h[1]=ce,this.h[2]=ne,this.h[3]=T,this.h[4]=R,this.h[5]=H,this.h[6]=F,this.h[7]=A,this.h[8]=V,this.h[9]=ve},Be.prototype.finish=function(d,h){var p=new Uint16Array(10),l,x,P,I;if(this.leftover){for(I=this.leftover,this.buffer[I++]=1;I<16;I++)this.buffer[I]=0;this.fin=1,this.blocks(this.buffer,0,16)}for(l=this.h[1]>>>13,this.h[1]&=8191,I=2;I<10;I++)this.h[I]+=l,l=this.h[I]>>>13,this.h[I]&=8191;for(this.h[0]+=l*5,l=this.h[0]>>>13,this.h[0]&=8191,this.h[1]+=l,l=this.h[1]>>>13,this.h[1]&=8191,this.h[2]+=l,p[0]=this.h[0]+5,l=p[0]>>>13,p[0]&=8191,I=1;I<10;I++)p[I]=this.h[I]+l,l=p[I]>>>13,p[I]&=8191;for(p[9]-=8192,x=(l^1)-1,I=0;I<10;I++)p[I]&=x;for(x=~x,I=0;I<10;I++)this.h[I]=this.h[I]&x|p[I];for(this.h[0]=(this.h[0]|this.h[1]<<13)&65535,this.h[1]=(this.h[1]>>>3|this.h[2]<<10)&65535,this.h[2]=(this.h[2]>>>6|this.h[3]<<7)&65535,this.h[3]=(this.h[3]>>>9|this.h[4]<<4)&65535,this.h[4]=(this.h[4]>>>12|this.h[5]<<1|this.h[6]<<14)&65535,this.h[5]=(this.h[6]>>>2|this.h[7]<<11)&65535,this.h[6]=(this.h[7]>>>5|this.h[8]<<8)&65535,this.h[7]=(this.h[8]>>>8|this.h[9]<<5)&65535,P=this.h[0]+this.pad[0],this.h[0]=P&65535,I=1;I<8;I++)P=(this.h[I]+this.pad[I]|0)+(P>>>16)|0,this.h[I]=P&65535;d[h+0]=this.h[0]>>>0&255,d[h+1]=this.h[0]>>>8&255,d[h+2]=this.h[1]>>>0&255,d[h+3]=this.h[1]>>>8&255,d[h+4]=this.h[2]>>>0&255,d[h+5]=this.h[2]>>>8&255,d[h+6]=this.h[3]>>>0&255,d[h+7]=this.h[3]>>>8&255,d[h+8]=this.h[4]>>>0&255,d[h+9]=this.h[4]>>>8&255,d[h+10]=this.h[5]>>>0&255,d[h+11]=this.h[5]>>>8&255,d[h+12]=this.h[6]>>>0&255,d[h+13]=this.h[6]>>>8&255,d[h+14]=this.h[7]>>>0&255,d[h+15]=this.h[7]>>>8&255},Be.prototype.update=function(d,h,p){var l,x;if(this.leftover){for(x=16-this.leftover,x>p&&(x=p),l=0;l<x;l++)this.buffer[this.leftover+l]=d[h+l];if(p-=x,h+=x,this.leftover+=x,this.leftover<16)return;this.blocks(this.buffer,0,16),this.leftover=0}if(p>=16&&(x=p-p%16,this.blocks(d,h,x),h+=x,p-=x),p){for(l=0;l<p;l++)this.buffer[this.leftover+l]=d[h+l];this.leftover+=p}};function dt(d,h,p,l,x,P){var I=new Be(P);return I.update(p,l,x),I.finish(d,h),0}function wt(d,h,p,l,x,P){var I=new Uint8Array(16);return dt(I,0,p,l,x,P),M(d,h,I,0)}function ft(d,h,p,l,x){var P;if(p<32)return-1;for(ge(d,0,h,0,p,l,x),dt(d,16,d,32,p-32,d),P=0;P<16;P++)d[P]=0;return 0}function jt(d,h,p,l,x){var P,I=new Uint8Array(32);if(p<32||(Te(I,0,32,l,x),wt(h,16,h,32,p-32,I)!==0))return-1;for(ge(d,0,h,0,p,l,x),P=0;P<32;P++)d[P]=0;return 0}function qe(d,h){var p;for(p=0;p<16;p++)d[p]=h[p]|0}function pt(d){var h,p,l=1;for(h=0;h<16;h++)p=d[h]+l+65535,l=Math.floor(p/65536),d[h]=p-l*65536;d[0]+=l-1+37*(l-1)}function K(d,h,p){for(var l,x=~(p-1),P=0;P<16;P++)l=x&(d[P]^h[P]),d[P]^=l,h[P]^=l}function ie(d,h){var p,l,x,P=n(),I=n();for(p=0;p<16;p++)I[p]=h[p];for(pt(I),pt(I),pt(I),l=0;l<2;l++){for(P[0]=I[0]-65517,p=1;p<15;p++)P[p]=I[p]-65535-(P[p-1]>>16&1),P[p-1]&=65535;P[15]=I[15]-32767-(P[14]>>16&1),x=P[15]>>16&1,P[14]&=65535,K(I,P,1-x)}for(p=0;p<16;p++)d[2*p]=I[p]&255,d[2*p+1]=I[p]>>8}function me(d,h){var p=new Uint8Array(32),l=new Uint8Array(32);return ie(p,d),ie(l,h),j(p,0,l,0)}function De(d){var h=new Uint8Array(32);return ie(h,d),h[0]&1}function fe(d,h){var p;for(p=0;p<16;p++)d[p]=h[2*p]+(h[2*p+1]<<8);d[15]&=32767}function Ze(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]+p[l]}function We(d,h,p){for(var l=0;l<16;l++)d[l]=h[l]-p[l]}function ke(d,h,p){var l,x,P=0,I=0,$=0,J=0,de=0,te=0,Ae=0,se=0,we=0,je=0,Me=0,ze=0,Se=0,Ee=0,Ne=0,oe=0,he=0,re=0,le=0,ce=0,ne=0,T=0,R=0,H=0,F=0,A=0,V=0,ve=0,Ce=0,Le=0,Pe=0,S=p[0],_e=p[1],Ve=p[2],Ke=p[3],Re=p[4],Ue=p[5],$e=p[6],mt=p[7],Xe=p[8],it=p[9],ot=p[10],lt=p[11],St=p[12],It=p[13],Mt=p[14],Lt=p[15];l=h[0],P+=l*S,I+=l*_e,$+=l*Ve,J+=l*Ke,de+=l*Re,te+=l*Ue,Ae+=l*$e,se+=l*mt,we+=l*Xe,je+=l*it,Me+=l*ot,ze+=l*lt,Se+=l*St,Ee+=l*It,Ne+=l*Mt,oe+=l*Lt,l=h[1],I+=l*S,$+=l*_e,J+=l*Ve,de+=l*Ke,te+=l*Re,Ae+=l*Ue,se+=l*$e,we+=l*mt,je+=l*Xe,Me+=l*it,ze+=l*ot,Se+=l*lt,Ee+=l*St,Ne+=l*It,oe+=l*Mt,he+=l*Lt,l=h[2],$+=l*S,J+=l*_e,de+=l*Ve,te+=l*Ke,Ae+=l*Re,se+=l*Ue,we+=l*$e,je+=l*mt,Me+=l*Xe,ze+=l*it,Se+=l*ot,Ee+=l*lt,Ne+=l*St,oe+=l*It,he+=l*Mt,re+=l*Lt,l=h[3],J+=l*S,de+=l*_e,te+=l*Ve,Ae+=l*Ke,se+=l*Re,we+=l*Ue,je+=l*$e,Me+=l*mt,ze+=l*Xe,Se+=l*it,Ee+=l*ot,Ne+=l*lt,oe+=l*St,he+=l*It,re+=l*Mt,le+=l*Lt,l=h[4],de+=l*S,te+=l*_e,Ae+=l*Ve,se+=l*Ke,we+=l*Re,je+=l*Ue,Me+=l*$e,ze+=l*mt,Se+=l*Xe,Ee+=l*it,Ne+=l*ot,oe+=l*lt,he+=l*St,re+=l*It,le+=l*Mt,ce+=l*Lt,l=h[5],te+=l*S,Ae+=l*_e,se+=l*Ve,we+=l*Ke,je+=l*Re,Me+=l*Ue,ze+=l*$e,Se+=l*mt,Ee+=l*Xe,Ne+=l*it,oe+=l*ot,he+=l*lt,re+=l*St,le+=l*It,ce+=l*Mt,ne+=l*Lt,l=h[6],Ae+=l*S,se+=l*_e,we+=l*Ve,je+=l*Ke,Me+=l*Re,ze+=l*Ue,Se+=l*$e,Ee+=l*mt,Ne+=l*Xe,oe+=l*it,he+=l*ot,re+=l*lt,le+=l*St,ce+=l*It,ne+=l*Mt,T+=l*Lt,l=h[7],se+=l*S,we+=l*_e,je+=l*Ve,Me+=l*Ke,ze+=l*Re,Se+=l*Ue,Ee+=l*$e,Ne+=l*mt,oe+=l*Xe,he+=l*it,re+=l*ot,le+=l*lt,ce+=l*St,ne+=l*It,T+=l*Mt,R+=l*Lt,l=h[8],we+=l*S,je+=l*_e,Me+=l*Ve,ze+=l*Ke,Se+=l*Re,Ee+=l*Ue,Ne+=l*$e,oe+=l*mt,he+=l*Xe,re+=l*it,le+=l*ot,ce+=l*lt,ne+=l*St,T+=l*It,R+=l*Mt,H+=l*Lt,l=h[9],je+=l*S,Me+=l*_e,ze+=l*Ve,Se+=l*Ke,Ee+=l*Re,Ne+=l*Ue,oe+=l*$e,he+=l*mt,re+=l*Xe,le+=l*it,ce+=l*ot,ne+=l*lt,T+=l*St,R+=l*It,H+=l*Mt,F+=l*Lt,l=h[10],Me+=l*S,ze+=l*_e,Se+=l*Ve,Ee+=l*Ke,Ne+=l*Re,oe+=l*Ue,he+=l*$e,re+=l*mt,le+=l*Xe,ce+=l*it,ne+=l*ot,T+=l*lt,R+=l*St,H+=l*It,F+=l*Mt,A+=l*Lt,l=h[11],ze+=l*S,Se+=l*_e,Ee+=l*Ve,Ne+=l*Ke,oe+=l*Re,he+=l*Ue,re+=l*$e,le+=l*mt,ce+=l*Xe,ne+=l*it,T+=l*ot,R+=l*lt,H+=l*St,F+=l*It,A+=l*Mt,V+=l*Lt,l=h[12],Se+=l*S,Ee+=l*_e,Ne+=l*Ve,oe+=l*Ke,he+=l*Re,re+=l*Ue,le+=l*$e,ce+=l*mt,ne+=l*Xe,T+=l*it,R+=l*ot,H+=l*lt,F+=l*St,A+=l*It,V+=l*Mt,ve+=l*Lt,l=h[13],Ee+=l*S,Ne+=l*_e,oe+=l*Ve,he+=l*Ke,re+=l*Re,le+=l*Ue,ce+=l*$e,ne+=l*mt,T+=l*Xe,R+=l*it,H+=l*ot,F+=l*lt,A+=l*St,V+=l*It,ve+=l*Mt,Ce+=l*Lt,l=h[14],Ne+=l*S,oe+=l*_e,he+=l*Ve,re+=l*Ke,le+=l*Re,ce+=l*Ue,ne+=l*$e,T+=l*mt,R+=l*Xe,H+=l*it,F+=l*ot,A+=l*lt,V+=l*St,ve+=l*It,Ce+=l*Mt,Le+=l*Lt,l=h[15],oe+=l*S,he+=l*_e,re+=l*Ve,le+=l*Ke,ce+=l*Re,ne+=l*Ue,T+=l*$e,R+=l*mt,H+=l*Xe,F+=l*it,A+=l*ot,V+=l*lt,ve+=l*St,Ce+=l*It,Le+=l*Mt,Pe+=l*Lt,P+=38*he,I+=38*re,$+=38*le,J+=38*ce,de+=38*ne,te+=38*T,Ae+=38*R,se+=38*H,we+=38*F,je+=38*A,Me+=38*V,ze+=38*ve,Se+=38*Ce,Ee+=38*Le,Ne+=38*Pe,x=1,l=P+x+65535,x=Math.floor(l/65536),P=l-x*65536,l=I+x+65535,x=Math.floor(l/65536),I=l-x*65536,l=$+x+65535,x=Math.floor(l/65536),$=l-x*65536,l=J+x+65535,x=Math.floor(l/65536),J=l-x*65536,l=de+x+65535,x=Math.floor(l/65536),de=l-x*65536,l=te+x+65535,x=Math.floor(l/65536),te=l-x*65536,l=Ae+x+65535,x=Math.floor(l/65536),Ae=l-x*65536,l=se+x+65535,x=Math.floor(l/65536),se=l-x*65536,l=we+x+65535,x=Math.floor(l/65536),we=l-x*65536,l=je+x+65535,x=Math.floor(l/65536),je=l-x*65536,l=Me+x+65535,x=Math.floor(l/65536),Me=l-x*65536,l=ze+x+65535,x=Math.floor(l/65536),ze=l-x*65536,l=Se+x+65535,x=Math.floor(l/65536),Se=l-x*65536,l=Ee+x+65535,x=Math.floor(l/65536),Ee=l-x*65536,l=Ne+x+65535,x=Math.floor(l/65536),Ne=l-x*65536,l=oe+x+65535,x=Math.floor(l/65536),oe=l-x*65536,P+=x-1+37*(x-1),x=1,l=P+x+65535,x=Math.floor(l/65536),P=l-x*65536,l=I+x+65535,x=Math.floor(l/65536),I=l-x*65536,l=$+x+65535,x=Math.floor(l/65536),$=l-x*65536,l=J+x+65535,x=Math.floor(l/65536),J=l-x*65536,l=de+x+65535,x=Math.floor(l/65536),de=l-x*65536,l=te+x+65535,x=Math.floor(l/65536),te=l-x*65536,l=Ae+x+65535,x=Math.floor(l/65536),Ae=l-x*65536,l=se+x+65535,x=Math.floor(l/65536),se=l-x*65536,l=we+x+65535,x=Math.floor(l/65536),we=l-x*65536,l=je+x+65535,x=Math.floor(l/65536),je=l-x*65536,l=Me+x+65535,x=Math.floor(l/65536),Me=l-x*65536,l=ze+x+65535,x=Math.floor(l/65536),ze=l-x*65536,l=Se+x+65535,x=Math.floor(l/65536),Se=l-x*65536,l=Ee+x+65535,x=Math.floor(l/65536),Ee=l-x*65536,l=Ne+x+65535,x=Math.floor(l/65536),Ne=l-x*65536,l=oe+x+65535,x=Math.floor(l/65536),oe=l-x*65536,P+=x-1+37*(x-1),d[0]=P,d[1]=I,d[2]=$,d[3]=J,d[4]=de,d[5]=te,d[6]=Ae,d[7]=se,d[8]=we,d[9]=je,d[10]=Me,d[11]=ze,d[12]=Se,d[13]=Ee,d[14]=Ne,d[15]=oe}function et(d,h){ke(d,h,h)}function Pt(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=253;l>=0;l--)et(p,p),l!==2&&l!==4&&ke(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function nn(d,h){var p=n(),l;for(l=0;l<16;l++)p[l]=h[l];for(l=250;l>=0;l--)et(p,p),l!==1&&ke(p,p,h);for(l=0;l<16;l++)d[l]=p[l]}function qt(d,h,p){var l=new Uint8Array(32),x=new Float64Array(80),P,I,$=n(),J=n(),de=n(),te=n(),Ae=n(),se=n();for(I=0;I<31;I++)l[I]=h[I];for(l[31]=h[31]&127|64,l[0]&=248,fe(x,p),I=0;I<16;I++)J[I]=x[I],te[I]=$[I]=de[I]=0;for($[0]=te[0]=1,I=254;I>=0;--I)P=l[I>>>3]>>>(I&7)&1,K($,J,P),K(de,te,P),Ze(Ae,$,de),We($,$,de),Ze(de,J,te),We(J,J,te),et(te,Ae),et(se,$),ke($,de,$),ke(de,J,Ae),Ze(Ae,$,de),We($,$,de),et(J,$),We(de,te,se),ke($,de,c),Ze($,$,te),ke(de,de,$),ke($,te,se),ke(te,J,x),et(J,Ae),K($,J,P),K(de,te,P);for(I=0;I<16;I++)x[I+16]=$[I],x[I+32]=de[I],x[I+48]=J[I],x[I+64]=te[I];var we=x.subarray(32),je=x.subarray(16);return Pt(we,we),ke(je,je,we),ie(d,je),0}function Xt(d,h){return qt(d,h,a)}function rn(d,h){return r(h,32),Xt(d,h)}function Ot(d,h,p){var l=new Uint8Array(32);return qt(l,p,h),L(d,s,l,_)}var un=ft,_t=jt;function ye(d,h,p,l,x,P){var I=new Uint8Array(32);return Ot(I,x,P),un(d,h,p,l,I)}function ht(d,h,p,l,x,P){var I=new Uint8Array(32);return Ot(I,x,P),_t(d,h,p,l,I)}var $n=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591];function Fn(d,h,p,l){for(var x=new Int32Array(16),P=new Int32Array(16),I,$,J,de,te,Ae,se,we,je,Me,ze,Se,Ee,Ne,oe,he,re,le,ce,ne,T,R,H,F,A,V,ve=d[0],Ce=d[1],Le=d[2],Pe=d[3],S=d[4],_e=d[5],Ve=d[6],Ke=d[7],Re=h[0],Ue=h[1],$e=h[2],mt=h[3],Xe=h[4],it=h[5],ot=h[6],lt=h[7],St=0;l>=128;){for(ce=0;ce<16;ce++)ne=8*ce+St,x[ce]=p[ne+0]<<24|p[ne+1]<<16|p[ne+2]<<8|p[ne+3],P[ce]=p[ne+4]<<24|p[ne+5]<<16|p[ne+6]<<8|p[ne+7];for(ce=0;ce<80;ce++)if(I=ve,$=Ce,J=Le,de=Pe,te=S,Ae=_e,se=Ve,we=Ke,je=Re,Me=Ue,ze=$e,Se=mt,Ee=Xe,Ne=it,oe=ot,he=lt,T=Ke,R=lt,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=(S>>>14|Xe<<18)^(S>>>18|Xe<<14)^(Xe>>>9|S<<23),R=(Xe>>>14|S<<18)^(Xe>>>18|S<<14)^(S>>>9|Xe<<23),H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,T=S&_e^~S&Ve,R=Xe&it^~Xe&ot,H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,T=$n[ce*2],R=$n[ce*2+1],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,T=x[ce%16],R=P[ce%16],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,re=A&65535|V<<16,le=H&65535|F<<16,T=re,R=le,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=(ve>>>28|Re<<4)^(Re>>>2|ve<<30)^(Re>>>7|ve<<25),R=(Re>>>28|ve<<4)^(ve>>>2|Re<<30)^(ve>>>7|Re<<25),H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,T=ve&Ce^ve&Le^Ce&Le,R=Re&Ue^Re&$e^Ue&$e,H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,we=A&65535|V<<16,he=H&65535|F<<16,T=de,R=Se,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=re,R=le,H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,de=A&65535|V<<16,Se=H&65535|F<<16,Ce=I,Le=$,Pe=J,S=de,_e=te,Ve=Ae,Ke=se,ve=we,Ue=je,$e=Me,mt=ze,Xe=Se,it=Ee,ot=Ne,lt=oe,Re=he,ce%16===15)for(ne=0;ne<16;ne++)T=x[ne],R=P[ne],H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=x[(ne+9)%16],R=P[(ne+9)%16],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,re=x[(ne+1)%16],le=P[(ne+1)%16],T=(re>>>1|le<<31)^(re>>>8|le<<24)^re>>>7,R=(le>>>1|re<<31)^(le>>>8|re<<24)^(le>>>7|re<<25),H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,re=x[(ne+14)%16],le=P[(ne+14)%16],T=(re>>>19|le<<13)^(le>>>29|re<<3)^re>>>6,R=(le>>>19|re<<13)^(re>>>29|le<<3)^(le>>>6|re<<26),H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,x[ne]=A&65535|V<<16,P[ne]=H&65535|F<<16;T=ve,R=Re,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[0],R=h[0],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[0]=ve=A&65535|V<<16,h[0]=Re=H&65535|F<<16,T=Ce,R=Ue,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[1],R=h[1],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[1]=Ce=A&65535|V<<16,h[1]=Ue=H&65535|F<<16,T=Le,R=$e,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[2],R=h[2],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[2]=Le=A&65535|V<<16,h[2]=$e=H&65535|F<<16,T=Pe,R=mt,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[3],R=h[3],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[3]=Pe=A&65535|V<<16,h[3]=mt=H&65535|F<<16,T=S,R=Xe,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[4],R=h[4],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[4]=S=A&65535|V<<16,h[4]=Xe=H&65535|F<<16,T=_e,R=it,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[5],R=h[5],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[5]=_e=A&65535|V<<16,h[5]=it=H&65535|F<<16,T=Ve,R=ot,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[6],R=h[6],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[6]=Ve=A&65535|V<<16,h[6]=ot=H&65535|F<<16,T=Ke,R=lt,H=R&65535,F=R>>>16,A=T&65535,V=T>>>16,T=d[7],R=h[7],H+=R&65535,F+=R>>>16,A+=T&65535,V+=T>>>16,F+=H>>>16,A+=F>>>16,V+=A>>>16,d[7]=Ke=A&65535|V<<16,h[7]=lt=H&65535|F<<16,St+=128,l-=128}return l}function Bt(d,h,p){var l=new Int32Array(8),x=new Int32Array(8),P=new Uint8Array(256),I,$=p;for(l[0]=1779033703,l[1]=3144134277,l[2]=1013904242,l[3]=2773480762,l[4]=1359893119,l[5]=2600822924,l[6]=528734635,l[7]=1541459225,x[0]=4089235720,x[1]=2227873595,x[2]=4271175723,x[3]=1595750129,x[4]=2917565137,x[5]=725511199,x[6]=4215389547,x[7]=327033209,Fn(l,x,h,p),p%=128,I=0;I<p;I++)P[I]=h[$-p+I];for(P[p]=128,p=256-128*(p<112?1:0),P[p-9]=0,v(P,p-8,$/536870912|0,$<<3),Fn(l,x,P,p),I=0;I<8;I++)v(d,8*I,l[I],x[I]);return 0}function Ht(d,h){var p=n(),l=n(),x=n(),P=n(),I=n(),$=n(),J=n(),de=n(),te=n();We(p,d[1],d[0]),We(te,h[1],h[0]),ke(p,p,te),Ze(l,d[0],d[1]),Ze(te,h[0],h[1]),ke(l,l,te),ke(x,d[3],h[3]),ke(x,x,m),ke(P,d[2],h[2]),Ze(P,P,P),We(I,l,p),We($,P,x),Ze(J,P,x),Ze(de,l,p),ke(d[0],I,$),ke(d[1],de,J),ke(d[2],J,$),ke(d[3],I,de)}function yn(d,h,p){var l;for(l=0;l<4;l++)K(d[l],h[l],p)}function bn(d,h){var p=n(),l=n(),x=n();Pt(x,h[2]),ke(p,h[0],x),ke(l,h[1],x),ie(d,l),d[31]^=De(p)<<7}function zn(d,h,p){var l,x;for(qe(d[0],o),qe(d[1],u),qe(d[2],u),qe(d[3],o),x=255;x>=0;--x)l=p[x/8|0]>>(x&7)&1,yn(d,h,l),Ht(h,d),Ht(d,d),yn(d,h,l)}function dn(d,h){var p=[n(),n(),n(),n()];qe(p[0],k),qe(p[1],g),qe(p[2],u),ke(p[3],k,g),zn(d,p,h)}function Pn(d,h,p){var l=new Uint8Array(64),x=[n(),n(),n(),n()],P;for(p||r(h,32),Bt(l,h,32),l[0]&=248,l[31]&=127,l[31]|=64,dn(x,l),bn(d,x),P=0;P<32;P++)h[P+32]=d[P];return 0}var nt=new Float64Array([237,211,245,92,26,99,18,88,214,156,247,162,222,249,222,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16]);function Bn(d,h){var p,l,x,P;for(l=63;l>=32;--l){for(p=0,x=l-32,P=l-12;x<P;++x)h[x]+=p-16*h[l]*nt[x-(l-32)],p=Math.floor((h[x]+128)/256),h[x]-=p*256;h[x]+=p,h[l]=0}for(p=0,x=0;x<32;x++)h[x]+=p-(h[31]>>4)*nt[x],p=h[x]>>8,h[x]&=255;for(x=0;x<32;x++)h[x]-=p*nt[x];for(l=0;l<32;l++)h[l+1]+=h[l]>>8,d[l]=h[l]&255}function kn(d){var h=new Float64Array(64),p;for(p=0;p<64;p++)h[p]=d[p];for(p=0;p<64;p++)d[p]=0;Bn(d,h)}function ir(d,h,p,l){var x=new Uint8Array(64),P=new Uint8Array(64),I=new Uint8Array(64),$,J,de=new Float64Array(64),te=[n(),n(),n(),n()];Bt(x,l,32),x[0]&=248,x[31]&=127,x[31]|=64;var Ae=p+64;for($=0;$<p;$++)d[64+$]=h[$];for($=0;$<32;$++)d[32+$]=x[32+$];for(Bt(I,d.subarray(32),p+32),kn(I),dn(te,I),bn(d,te),$=32;$<64;$++)d[$]=l[$];for(Bt(P,d,p+64),kn(P),$=0;$<64;$++)de[$]=0;for($=0;$<32;$++)de[$]=I[$];for($=0;$<32;$++)for(J=0;J<32;J++)de[$+J]+=P[$]*x[J];return Bn(d.subarray(32),de),Ae}function Z(d,h){var p=n(),l=n(),x=n(),P=n(),I=n(),$=n(),J=n();return qe(d[2],u),fe(d[1],h),et(x,d[1]),ke(P,x,f),We(x,x,d[2]),Ze(P,d[2],P),et(I,P),et($,I),ke(J,$,I),ke(p,J,x),ke(p,p,P),nn(p,p),ke(p,p,x),ke(p,p,P),ke(p,p,P),ke(d[0],p,P),et(l,d[0]),ke(l,l,P),me(l,x)&&ke(d[0],d[0],N),et(l,d[0]),ke(l,l,P),me(l,x)?-1:(De(d[0])===h[31]>>7&&We(d[0],o,d[0]),ke(d[3],d[0],d[1]),0)}function U(d,h,p,l){var x,P=new Uint8Array(32),I=new Uint8Array(64),$=[n(),n(),n(),n()],J=[n(),n(),n(),n()];if(p<64||Z(J,l))return-1;for(x=0;x<p;x++)d[x]=h[x];for(x=0;x<32;x++)d[x+32]=l[x];if(Bt(I,d,p),kn(I),zn($,J,I),dn(J,h.subarray(32)),Ht($,J),bn(P,$),p-=64,j(h,0,P,0)){for(x=0;x<p;x++)d[x]=0;return-1}for(x=0;x<p;x++)d[x]=h[x+64];return p}var G=32,be=24,at=32,W=16,xe=32,z=32,He=32,Y=32,X=32,Ye=be,xt=at,In=W,rt=64,fn=32,Hn=64,or=32,Pr=64;t.lowlevel={crypto_core_hsalsa20:L,crypto_stream_xor:ge,crypto_stream:Te,crypto_stream_salsa20_xor:D,crypto_stream_salsa20:q,crypto_onetimeauth:dt,crypto_onetimeauth_verify:wt,crypto_verify_16:M,crypto_verify_32:j,crypto_secretbox:ft,crypto_secretbox_open:jt,crypto_scalarmult:qt,crypto_scalarmult_base:Xt,crypto_box_beforenm:Ot,crypto_box_afternm:un,crypto_box:ye,crypto_box_open:ht,crypto_box_keypair:rn,crypto_hash:Bt,crypto_sign:ir,crypto_sign_keypair:Pn,crypto_sign_open:U,crypto_secretbox_KEYBYTES:G,crypto_secretbox_NONCEBYTES:be,crypto_secretbox_ZEROBYTES:at,crypto_secretbox_BOXZEROBYTES:W,crypto_scalarmult_BYTES:xe,crypto_scalarmult_SCALARBYTES:z,crypto_box_PUBLICKEYBYTES:He,crypto_box_SECRETKEYBYTES:Y,crypto_box_BEFORENMBYTES:X,crypto_box_NONCEBYTES:Ye,crypto_box_ZEROBYTES:xt,crypto_box_BOXZEROBYTES:In,crypto_sign_BYTES:rt,crypto_sign_PUBLICKEYBYTES:fn,crypto_sign_SECRETKEYBYTES:Hn,crypto_sign_SEEDBYTES:or,crypto_hash_BYTES:Pr,gf:n,D:f,L:nt,pack25519:ie,unpack25519:fe,M:ke,A:Ze,S:et,Z:We,pow2523:nn,add:Ht,set25519:qe,modL:Bn,scalarmult:zn,scalarbase:dn};function ja(d,h){if(d.length!==G)throw new Error("bad key size");if(h.length!==be)throw new Error("bad nonce size")}function ro(d,h){if(d.length!==He)throw new Error("bad public key size");if(h.length!==Y)throw new Error("bad secret key size")}function Vt(){for(var d=0;d<arguments.length;d++)if(!(arguments[d]instanceof Uint8Array))throw new TypeError("unexpected type, use Uint8Array")}function Sa(d){for(var h=0;h<d.length;h++)d[h]=0}t.randomBytes=function(d){var h=new Uint8Array(d);return r(h,d),h},t.secretbox=function(d,h,p){Vt(d,h,p),ja(p,h);for(var l=new Uint8Array(at+d.length),x=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+at]=d[P];return ft(x,l,l.length,h,p),x.subarray(W)},t.secretbox.open=function(d,h,p){Vt(d,h,p),ja(p,h);for(var l=new Uint8Array(W+d.length),x=new Uint8Array(l.length),P=0;P<d.length;P++)l[P+W]=d[P];return l.length<32||jt(x,l,l.length,h,p)!==0?null:x.subarray(at)},t.secretbox.keyLength=G,t.secretbox.nonceLength=be,t.secretbox.overheadLength=W,t.scalarMult=function(d,h){if(Vt(d,h),d.length!==z)throw new Error("bad n size");if(h.length!==xe)throw new Error("bad p size");var p=new Uint8Array(xe);return qt(p,d,h),p},t.scalarMult.base=function(d){if(Vt(d),d.length!==z)throw new Error("bad n size");var h=new Uint8Array(xe);return Xt(h,d),h},t.scalarMult.scalarLength=z,t.scalarMult.groupElementLength=xe,t.box=function(d,h,p,l){var x=t.box.before(p,l);return t.secretbox(d,h,x)},t.box.before=function(d,h){Vt(d,h),ro(d,h);var p=new Uint8Array(X);return Ot(p,d,h),p},t.box.after=t.secretbox,t.box.open=function(d,h,p,l){var x=t.box.before(p,l);return t.secretbox.open(d,h,x)},t.box.open.after=t.secretbox.open,t.box.keyPair=function(){var d=new Uint8Array(He),h=new Uint8Array(Y);return rn(d,h),{publicKey:d,secretKey:h}},t.box.keyPair.fromSecretKey=function(d){if(Vt(d),d.length!==Y)throw new Error("bad secret key size");var h=new Uint8Array(He);return Xt(h,d),{publicKey:h,secretKey:new Uint8Array(d)}},t.box.publicKeyLength=He,t.box.secretKeyLength=Y,t.box.sharedKeyLength=X,t.box.nonceLength=Ye,t.box.overheadLength=t.secretbox.overheadLength,t.sign=function(d,h){if(Vt(d,h),h.length!==Hn)throw new Error("bad secret key size");var p=new Uint8Array(rt+d.length);return ir(p,d,d.length,h),p},t.sign.open=function(d,h){if(Vt(d,h),h.length!==fn)throw new Error("bad public key size");var p=new Uint8Array(d.length),l=U(p,d,d.length,h);if(l<0)return null;for(var x=new Uint8Array(l),P=0;P<x.length;P++)x[P]=p[P];return x},t.sign.detached=function(d,h){for(var p=t.sign(d,h),l=new Uint8Array(rt),x=0;x<l.length;x++)l[x]=p[x];return l},t.sign.detached.verify=function(d,h,p){if(Vt(d,h,p),h.length!==rt)throw new Error("bad signature size");if(p.length!==fn)throw new Error("bad public key size");var l=new Uint8Array(rt+d.length),x=new Uint8Array(rt+d.length),P;for(P=0;P<rt;P++)l[P]=h[P];for(P=0;P<d.length;P++)l[P+rt]=d[P];return U(x,l,l.length,p)>=0},t.sign.keyPair=function(){var d=new Uint8Array(fn),h=new Uint8Array(Hn);return Pn(d,h),{publicKey:d,secretKey:h}},t.sign.keyPair.fromSecretKey=function(d){if(Vt(d),d.length!==Hn)throw new Error("bad secret key size");for(var h=new Uint8Array(fn),p=0;p<h.length;p++)h[p]=d[32+p];return{publicKey:h,secretKey:new Uint8Array(d)}},t.sign.keyPair.fromSeed=function(d){if(Vt(d),d.length!==or)throw new Error("bad seed size");for(var h=new Uint8Array(fn),p=new Uint8Array(Hn),l=0;l<32;l++)p[l]=d[l];return Pn(h,p,!0),{publicKey:h,secretKey:p}},t.sign.publicKeyLength=fn,t.sign.secretKeyLength=Hn,t.sign.seedLength=or,t.sign.signatureLength=rt,t.hash=function(d){Vt(d);var h=new Uint8Array(Pr);return Bt(h,d,d.length),h},t.hash.hashLength=Pr,t.verify=function(d,h){return Vt(d,h),d.length===0||h.length===0||d.length!==h.length?!1:w(d,0,h,0,d.length)===0},t.setPRNG=function(d){r=d},function(){var d=typeof self<"u"?self.crypto||self.msCrypto:null;if(d&&d.getRandomValues){var h=65536;t.setPRNG(function(p,l){var x,P=new Uint8Array(l);for(x=0;x<l;x+=h)d.getRandomValues(P.subarray(x,x+Math.min(l-x,h)));for(x=0;x<l;x++)p[x]=P[x];Sa(P)})}else typeof a1<"u"&&(d=l1,d&&d.randomBytes&&t.setPRNG(function(p,l){var x,P=d.randomBytes(l);for(x=0;x<l;x++)p[x]=P[x];Sa(P)}))}()})(e.exports?e.exports:self.nacl=self.nacl||{})})(ph);var c1=ph.exports;const hh=zd(c1);var mh={exports:{}};(function(e){(function(t,n){e.exports?e.exports=n():(t.nacl||(t.nacl={}),t.nacl.util=n())})($h,function(){var t={};function n(r){if(!/^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(r))throw new TypeError("invalid encoding")}return t.decodeUTF8=function(r){if(typeof r!="string")throw new TypeError("expected string");var s,a=unescape(encodeURIComponent(r)),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o},t.encodeUTF8=function(r){var s,a=[];for(s=0;s<r.length;s++)a.push(String.fromCharCode(r[s]));return decodeURIComponent(escape(a.join("")))},typeof atob>"u"?typeof Buffer.from<"u"?(t.encodeBase64=function(r){return Buffer.from(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(Buffer.from(r,"base64"),0))}):(t.encodeBase64=function(r){return new Buffer(r).toString("base64")},t.decodeBase64=function(r){return n(r),new Uint8Array(Array.prototype.slice.call(new Buffer(r,"base64"),0))}):(t.encodeBase64=function(r){var s,a=[],o=r.length;for(s=0;s<o;s++)a.push(String.fromCharCode(r[s]));return btoa(a.join(""))},t.decodeBase64=function(r){n(r);var s,a=atob(r),o=new Uint8Array(a.length);for(s=0;s<a.length;s++)o[s]=a.charCodeAt(s);return o}),t})})(mh);var Pi=mh.exports;const gh="hotline-identity";function Fc(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}function u1(){const e=hh.sign.keyPair();return{publicKey:e.publicKey,secretKey:e.secretKey}}function d1(e){const t={publicKey:Pi.encodeBase64(e.publicKey),secretKey:Pi.encodeBase64(e.secretKey)};localStorage.setItem(gh,JSON.stringify(t))}function f1(){const e=localStorage.getItem(gh);if(!e)return null;try{const t=JSON.parse(e);return{publicKey:Pi.decodeBase64(t.publicKey),secretKey:Pi.decodeBase64(t.secretKey)}}catch{return null}}function p1(){const e=f1();if(e)return e;const t=u1();return d1(t),t}function xh(e,t){const n=new TextEncoder().encode(e),r=hh.sign.detached(n,t);return Fc(r)}function vh(e){return Fc(e.publicKey)}function _l(e){const t=Fc(e.publicKey),n=Date.now().toString(),r=`${t}:${n}`,s=xh(r,e.secretKey);return{"X-Hotline-PublicKey":t,"X-Hotline-Signature":s,"X-Hotline-Timestamp":n}}function h1({serverAddress:e,identity:t,canUpload:n,canDownload:r}){const{t:s}=Qe(),[a,o]=y.useState(""),[u,c]=y.useState([]),[f,m]=y.useState(!1),g=`http://${e.replace(/:\d+$/,":9999")}`,N=async E=>{m(!0);try{const L=`${g}/files/${E}`,_=await fetch(L,{headers:_l(t)});if(_.ok){const D=await _.json();c(D.entries||[]),o(E)}}catch{}finally{m(!1)}},v=E=>{if(E.isDir){const L=a?`${a}/${E.name}`:E.name;N(L)}else if(r){const L=a?`${a}/${E.name}`:E.name;window.open(`${g}/files/${L}`,"_blank")}},w=()=>{const E=a.split("/").filter(Boolean);E.pop(),N(E.join("/"))},M=async E=>{var q;const L=(q=E.target.files)==null?void 0:q[0];if(!L)return;const _=new FormData;_.append("file",L);const D=a?`${a}/${L.name}`:L.name;await fetch(`${g}/files/${D}`,{method:"POST",headers:_l(t),body:_}),N(a)},j=E=>E<1024?`${E} B`:E<1048576?`${(E/1024).toFixed(1)} KB`:`${(E/1048576).toFixed(1)} MB`,b=a?a.split("/").filter(Boolean):[],C=y.useRef(!1);return y.useEffect(()=>{C.current||(C.current=!0,N(""))},[]),i.jsxs("div",{className:"file-browser",children:[i.jsxs("div",{className:"file-header",children:[i.jsx("span",{children:s("files.title")}),n&&i.jsxs("label",{className:"file-upload-btn",children:[i.jsx(ha,{size:13}),i.jsx("input",{type:"file",hidden:!0,onChange:M})]})]}),b.length>0&&i.jsxs("div",{className:"file-breadcrumb",children:[i.jsx("button",{className:"breadcrumb-item",onClick:()=>N(""),children:"~"}),b.map((E,L)=>i.jsxs("span",{className:"breadcrumb-item",children:[i.jsx("span",{className:"breadcrumb-sep",children:"/"}),i.jsx("button",{onClick:()=>N(b.slice(0,L+1).join("/")),children:E})]},L))]}),i.jsxs("div",{className:"file-entries",children:[f&&i.jsxs("div",{className:"file-skeleton",children:[i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"}),i.jsx("div",{className:"skeleton-line"})]}),!f&&a&&i.jsxs("div",{className:"file-entry",onClick:w,children:[i.jsx(_x,{size:14,className:"file-icon up"}),i.jsx("span",{className:"file-name",children:".."})]}),!f&&u.map(E=>i.jsxs("div",{className:`file-entry ${E.isDir?"dir":""}`,onClick:()=>v(E),children:[E.isDir?i.jsx(Vx,{size:14,className:"file-icon folder"}):i.jsx(Bx,{size:14,className:"file-icon"}),i.jsx("span",{className:"file-name",children:E.name}),!E.isDir&&i.jsx("span",{className:"file-size",children:j(E.size)}),!E.isDir&&r&&i.jsx(Jp,{size:12,className:"file-dl"})]},E.name)),!f&&u.length===0&&i.jsxs("div",{className:"file-empty",children:[i.jsx(Hx,{size:20,className:"file-empty-icon"}),i.jsx("span",{children:s("files.empty")})]})]}),i.jsx("style",{children:`
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
      `})]})}function m1({motd:e}){const{t}=Qe(),[n,r]=y.useState(!1),[s,a]=y.useState(!1);if(!e||n)return null;const o=e.length>120;return i.jsxs("div",{className:`server-banner ${s?"expanded":""}`,children:[i.jsxs("div",{className:"banner-main",children:[i.jsx(Kx,{size:14,className:"banner-icon"}),i.jsx("span",{className:"banner-label",children:t("server.motd")}),i.jsx("span",{className:"banner-text",children:s||!o?e:e.slice(0,120)+"…"}),i.jsxs("div",{className:"banner-actions",children:[o&&i.jsx("button",{className:"banner-expand",onClick:()=>a(u=>!u),title:s?"Collapse":"Expand",children:s?i.jsx(Wp,{size:14}):i.jsx(Kp,{size:14})}),i.jsx("button",{className:"banner-dismiss",onClick:()=>r(!0),title:"Dismiss",children:i.jsx(zt,{size:14})})]})]}),i.jsx("style",{children:`
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
      `})]})}const g1=[{code:"en",label:"EN"},{code:"fr",label:"FR"}];function x1(){const{i18n:e,t}=Qe(),[n,r]=y.useState(()=>localStorage.getItem("hotline-theme")||"dark");y.useEffect(()=>{document.documentElement.setAttribute("data-theme",n),localStorage.setItem("hotline-theme",n)},[n]);const s=o=>{e.changeLanguage(o.target.value)},a=()=>r(o=>o==="dark"?"light":"dark");return i.jsxs("div",{className:"lang-selector",children:[i.jsx("button",{className:"theme-toggle",onClick:a,title:t("settings.theme"),children:n==="dark"?i.jsx(f0,{size:14}):i.jsx(e0,{size:14})}),i.jsx(_c,{size:12,className:"lang-icon"}),i.jsx("select",{value:e.language.split("-")[0],onChange:s,children:g1.map(o=>i.jsx("option",{value:o.code,children:o.label},o.code))}),i.jsx("style",{children:`
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
      `})]})}function v1({onSubmit:e,onClose:t}){const{t:n}=Qe(),[r,s]=y.useState(""),[a,o]=y.useState(""),[u,c]=y.useState(""),f=m=>{m.preventDefault();const k=r.trim().toLowerCase().replace(/\s+/g,"-");k&&(e(k,a.trim(),u.trim()),t())};return i.jsxs("div",{className:"modal-overlay",onClick:t,children:[i.jsxs("form",{className:"modal-content",onClick:m=>m.stopPropagation(),onSubmit:f,children:[i.jsx("h3",{children:n("channel.create")}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.name")}),i.jsx("input",{type:"text",value:r,onChange:m=>s(m.target.value),placeholder:"general",autoFocus:!0,maxLength:32})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.topic")}),i.jsx("input",{type:"text",value:a,onChange:m=>o(m.target.value),placeholder:n("channel.topic"),maxLength:128})]}),i.jsxs("div",{className:"modal-field",children:[i.jsx("label",{children:n("channel.password")}),i.jsx("input",{type:"password",value:u,onChange:m=>c(m.target.value),placeholder:n("channel.passwordPlaceholder"),maxLength:64})]}),i.jsxs("div",{className:"modal-actions",children:[i.jsx("button",{type:"button",className:"modal-btn-cancel",onClick:t,children:n("channel.cancel")}),i.jsx("button",{type:"submit",className:"modal-btn-submit",disabled:!r.trim(),children:n("channel.submit")})]})]}),i.jsx("style",{children:`
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
      `})]})}function y1(e,t){if(!t||t.length<2)return[e];const n=[],r=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");let s=0,a,o=0;for(;(a=r.exec(e))!==null;)a.index>s&&n.push(e.slice(s,a.index)),n.push(i.jsx("mark",{className:"search-highlight",children:a[1]},o++)),s=a.index+a[0].length;return s<e.length&&n.push(e.slice(s)),n}function b1({onSearch:e,onClose:t,results:n,activeChannel:r}){const{t:s,i18n:a}=Qe(),[o,u]=y.useState(""),[c,f]=y.useState(!1),m=y.useRef(null),k=y.useRef(0);y.useEffect(()=>{var w;(w=m.current)==null||w.focus()},[]);const g=w=>{u(w),clearTimeout(k.current),w.length>=2&&(k.current=window.setTimeout(()=>{e(w,c?void 0:r)},300))},N=w=>{w.key==="Escape"&&t()},v=w=>new Intl.DateTimeFormat(a.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(w));return i.jsxs("div",{className:"search-panel",children:[i.jsxs("div",{className:"search-header",children:[i.jsx(Rl,{size:16}),i.jsx("input",{ref:m,type:"text",className:"search-input",value:o,onChange:w=>g(w.target.value),onKeyDown:N,placeholder:s("search.placeholder")}),n.length>0&&i.jsx("span",{className:"search-count",children:n.length}),i.jsxs("label",{className:"search-scope",children:[i.jsx("input",{type:"checkbox",checked:c,onChange:w=>f(w.target.checked)}),i.jsx("span",{children:s("search.allChannels")})]}),i.jsx("button",{className:"search-close",onClick:t,children:i.jsx(zt,{size:16})})]}),n.length>0&&i.jsx("ul",{className:"search-results",children:n.map(w=>i.jsxs("li",{className:"search-result-item",children:[i.jsxs("div",{className:"search-result-meta",children:[i.jsx("span",{className:"search-result-nick",children:w.nickname}),i.jsxs("span",{className:"search-result-channel",children:["#",w.channel]}),i.jsx("span",{className:"search-result-time",children:v(w.timestamp)})]}),i.jsx("div",{className:"search-result-content",children:y1(w.content,o)})]},w.id))}),o.length>=2&&n.length===0&&i.jsxs("div",{className:"search-empty",children:[i.jsx(Rl,{size:20,className:"search-empty-icon"}),i.jsx("span",{children:s("search.noResults")})]}),i.jsx("style",{children:`
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
      `})]})}function k1({status:e,reconnectIn:t}){const{t:n}=Qe();return e==="connected"?null:i.jsxs("div",{className:`connection-status ${e}`,children:[i.jsxs("div",{className:"connection-status-content",children:[e==="reconnecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot danger"}),i.jsx(x0,{size:13}),i.jsx("span",{children:n("connection.reconnecting",{seconds:t})})]}),e==="connecting"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(pa,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.connecting")})]}),e==="authenticating"&&i.jsxs(i.Fragment,{children:[i.jsx("span",{className:"connection-dot accent"}),i.jsx(pa,{size:13,className:"spin"}),i.jsx("span",{children:n("connection.authenticating")})]})]}),e==="reconnecting"&&i.jsx("div",{className:"connection-progress",children:i.jsx("div",{className:"connection-progress-bar"})}),i.jsx("style",{children:`
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
      `})]})}const yh="hotline_notif_prefs";function w1(){try{const e=localStorage.getItem(yh);if(e)return JSON.parse(e)}catch{}return{soundEnabled:!0,desktopEnabled:!0}}function j1(e){localStorage.setItem(yh,JSON.stringify(e))}function S1({prefs:e,onChange:t}){const{t:n}=Qe(),r=s=>{const a={...e,[s]:!e[s]};t(a),j1(a)};return i.jsxs("div",{className:"notif-settings",children:[i.jsx("button",{className:`notif-toggle ${e.soundEnabled?"active":"muted"}`,onClick:()=>r("soundEnabled"),title:e.soundEnabled?n("notif.muteSound"):n("notif.unmuteSound"),children:e.soundEnabled?i.jsx(m0,{size:15}):i.jsx(g0,{size:15})}),i.jsx("button",{className:`notif-toggle ${e.desktopEnabled?"active":"muted"}`,onClick:()=>r("desktopEnabled"),title:e.desktopEnabled?n("notif.muteDesktop"):n("notif.unmuteDesktop"),children:e.desktopEnabled?i.jsx(Ll,{size:15}):i.jsx(fs,{size:15})}),i.jsx("style",{children:`
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
      `})]})}function N1({messages:e,onRequestPins:t,onUnpin:n,onClose:r,activeChannel:s,canModerate:a}){const{t:o,i18n:u}=Qe();y.useEffect(()=>{t(s)},[s,t]);const c=f=>new Intl.DateTimeFormat(u.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(f));return i.jsxs("div",{className:"pinned-panel",children:[i.jsxs("div",{className:"pinned-header",children:[i.jsx(bs,{size:14}),i.jsx("span",{children:o("pins.title")}),i.jsx("span",{className:"pinned-count",children:e.length}),i.jsx("button",{className:"pinned-close",onClick:r,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"pinned-list",children:[e.length===0&&i.jsxs("div",{className:"pinned-empty",children:[i.jsx(bs,{size:20,className:"pinned-empty-icon"}),i.jsx("span",{children:o("pins.empty")})]}),e.map(f=>i.jsxs("div",{className:"pinned-item",children:[i.jsxs("div",{className:"pinned-item-header",children:[i.jsx("span",{className:"pinned-nick",children:f.nickname}),i.jsx("span",{className:"pinned-time",children:c(f.timestamp)}),a&&n&&i.jsx("button",{className:"pinned-unpin",onClick:()=>n(f.id,s),title:o("pins.unpin"),children:i.jsx(Nr,{size:12})})]}),i.jsx("div",{className:"pinned-content",children:f.content})]},f.id))]}),i.jsx("style",{children:`
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
      `})]})}const bh="hotline_bookmarks";function to(){try{const e=localStorage.getItem(bh);return e?JSON.parse(e):[]}catch{return[]}}function kh(e){localStorage.setItem(bh,JSON.stringify(e))}function C1(e){const t=to();if(t.some(r=>r.id===e.id))return t;const n=[e,...t];return kh(n),n}function cd(e){const t=to().filter(n=>n.id!==e);return kh(t),t}function To(e){return to().some(t=>t.id===e)}function E1({bookmarks:e,onRemove:t,onClose:n}){const{t:r,i18n:s}=Qe(),a=o=>new Intl.DateTimeFormat(s.language,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(o));return i.jsxs("div",{className:"bookmarks-panel",children:[i.jsxs("div",{className:"bookmarks-header",children:[i.jsx(fa,{size:14}),i.jsx("span",{children:r("bookmarks.title")}),i.jsx("span",{className:"bookmarks-count",children:e.length}),i.jsx("button",{className:"bookmarks-close",onClick:n,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"bookmarks-list",children:[e.length===0&&i.jsxs("div",{className:"bookmarks-empty",children:[i.jsx(fa,{size:20,className:"bookmarks-empty-icon"}),i.jsx("span",{children:r("bookmarks.empty")})]}),e.map(o=>i.jsxs("div",{className:"bookmark-item",children:[i.jsxs("div",{className:"bookmark-item-header",children:[i.jsx("span",{className:"bookmark-nick",children:o.nickname}),i.jsxs("span",{className:"bookmark-channel",children:["#",o.channel]}),i.jsx("span",{className:"bookmark-time",children:a(o.timestamp)}),i.jsx("button",{className:"bookmark-remove",onClick:()=>t(o.id),title:r("bookmarks.remove"),children:i.jsx(Nr,{size:12})})]}),i.jsx("div",{className:"bookmark-content",children:o.content})]},o.id))]}),i.jsx("style",{children:`
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
      `})]})}function z1({channel:e,onSetTopic:t,onClose:n,canEdit:r}){const{t:s}=Qe(),[a,o]=y.useState(e.topic),u=()=>{a!==e.topic&&t(e.name,a.trim()),n()};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:"chsettings-modal",onClick:c=>c.stopPropagation(),children:[i.jsxs("div",{className:"chsettings-header",children:[i.jsx("div",{className:"chsettings-icon",children:e.hasPassword?i.jsx(zi,{size:18}):i.jsx(wa,{size:18})}),i.jsxs("div",{children:[i.jsx("h3",{children:e.name}),i.jsx("span",{className:"chsettings-subtitle",children:s("channelSettings.title")})]})]}),i.jsxs("div",{className:"chsettings-info",children:[i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(Zi,{size:14}),i.jsxs("span",{children:[e.userCount," ",s("channelSettings.members")]})]}),e.hasPassword&&i.jsxs("div",{className:"chsettings-stat",children:[i.jsx(zi,{size:14}),i.jsx("span",{children:s("channelSettings.passwordProtected")})]})]}),i.jsxs("div",{className:"chsettings-field",children:[i.jsx("label",{children:s("channel.topic")}),r?i.jsx("textarea",{value:a,onChange:c=>o(c.target.value),placeholder:s("channelSettings.topicPlaceholder"),maxLength:256,rows:3}):i.jsx("div",{className:"chsettings-topic-display",children:e.topic||i.jsx("em",{className:"text-muted",children:s("channelSettings.noTopic")})})]}),i.jsxs("div",{className:"chsettings-actions",children:[i.jsx("button",{className:"modal-btn-cancel",onClick:n,children:s(r?"channel.cancel":"channelSettings.close")}),r&&i.jsx("button",{className:"modal-btn-submit",onClick:u,disabled:a===e.topic,children:s("channelSettings.save")})]})]}),i.jsx("style",{children:`
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
      `})]})}function P1({onDrop:e,enabled:t}){const{t:n}=Qe(),[r,s]=y.useState(!1),a=y.useRef(0),o=y.useCallback(m=>{var k;m.preventDefault(),t&&(a.current++,(k=m.dataTransfer)!=null&&k.types.includes("Files")&&s(!0))},[t]),u=y.useCallback(m=>{m.preventDefault(),a.current--,a.current===0&&s(!1)},[]),c=y.useCallback(m=>{m.preventDefault()},[]),f=y.useCallback(m=>{var g;if(m.preventDefault(),a.current=0,s(!1),!t)return;const k=(g=m.dataTransfer)==null?void 0:g.files[0];k&&e(k)},[t,e]);return y.useEffect(()=>(document.addEventListener("dragenter",o),document.addEventListener("dragleave",u),document.addEventListener("dragover",c),document.addEventListener("drop",f),()=>{document.removeEventListener("dragenter",o),document.removeEventListener("dragleave",u),document.removeEventListener("dragover",c),document.removeEventListener("drop",f)}),[o,u,c,f]),r?i.jsxs("div",{className:"drag-drop-overlay",children:[i.jsxs("div",{className:"drag-drop-zone",children:[i.jsx(ha,{size:40,className:"drag-drop-icon"}),i.jsx("span",{className:"drag-drop-text",children:n("files.dropHere")}),i.jsx("span",{className:"drag-drop-hint",children:"Images, documents, archives"})]}),i.jsx("style",{children:`
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
      `})]}):null}const I1=[{keys:"Ctrl + K",action:"shortcuts.search"},{keys:"Ctrl + B",action:"shortcuts.bold"},{keys:"Ctrl + I",action:"shortcuts.italic"},{keys:"Escape",action:"shortcuts.close"},{keys:"Enter",action:"shortcuts.send"},{keys:"Shift + Enter",action:"shortcuts.newline"},{keys:"@ + name",action:"shortcuts.mention"},{keys:"?",action:"shortcuts.showHelp"}];function M1({onClose:e}){const{t}=Qe();return i.jsxs("div",{className:"modal-overlay",onClick:e,children:[i.jsxs("div",{className:"shortcuts-modal",onClick:n=>n.stopPropagation(),children:[i.jsxs("div",{className:"shortcuts-header",children:[i.jsx(Yx,{size:18}),i.jsx("h3",{children:t("shortcuts.title")}),i.jsx("button",{className:"shortcuts-close",onClick:e,children:i.jsx(zt,{size:16})})]}),i.jsx("div",{className:"shortcuts-list",children:I1.map(n=>i.jsxs("div",{className:"shortcut-row",children:[i.jsx("span",{className:"shortcut-action",children:t(n.action)}),i.jsx("span",{className:"shortcut-key-group",children:n.keys.split(" + ").map((r,s)=>i.jsxs("span",{children:[s>0&&i.jsx("span",{className:"shortcut-plus",children:"+"}),i.jsx("kbd",{className:"shortcut-key",children:r})]},s))})]},n.keys))})]}),i.jsx("style",{children:`
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
      `})]})}function L1({serverName:e,motd:t,onUpdateSettings:n,onRequestBanList:r,onUnban:s,onClose:a}){const{t:o}=Qe(),[u,c]=y.useState("settings"),[f,m]=y.useState(e),[k,g]=y.useState(t),[N,v]=y.useState(!1);y.useEffect(()=>{r()},[]);const w=()=>{n(f.trim(),k.trim()),v(!0),setTimeout(()=>v(!1),2e3)};return i.jsxs("div",{className:"modal-overlay",onClick:a,children:[i.jsxs("div",{className:"admin-panel",onClick:M=>M.stopPropagation(),children:[i.jsxs("div",{className:"admin-header",children:[i.jsx(th,{size:18}),i.jsx("h3",{children:o("admin.title")}),i.jsx("button",{className:"admin-close",onClick:a,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"admin-tabs",children:[i.jsxs("button",{className:`admin-tab ${u==="settings"?"active":""}`,onClick:()=>c("settings"),children:[i.jsx(Uc,{size:14}),o("admin.settings")]}),i.jsxs("button",{className:`admin-tab ${u==="bans"?"active":""}`,onClick:()=>c("bans"),children:[i.jsx(p0,{size:14}),o("admin.bans")]})]}),u==="settings"&&i.jsxs("div",{className:"admin-content",children:[i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.serverName")}),i.jsx("input",{type:"text",value:f,onChange:M=>m(M.target.value),maxLength:64})]}),i.jsxs("div",{className:"admin-field",children:[i.jsx("label",{children:o("admin.motd")}),i.jsx("textarea",{value:k,onChange:M=>g(M.target.value),rows:4,maxLength:512})]}),i.jsxs("button",{className:`admin-save ${N?"saved":""}`,onClick:w,children:[N?i.jsx(Tc,{size:14}):i.jsx(eh,{size:14}),o(N?"admin.saved":"admin.save")]})]}),u==="bans"&&i.jsxs("div",{className:"admin-content",children:[i.jsx("p",{className:"admin-ban-info",children:o("admin.banInfo")}),i.jsx("div",{className:"admin-ban-empty",children:o("admin.noBans")})]})]}),i.jsx("style",{children:`
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
      `})]})}function T1({channelName:e,onSubmit:t,onCancel:n}){const{t:r}=Qe(),[s,a]=y.useState(""),[o,u]=y.useState(!1),c=()=>{if(!s.trim()){u(!0),setTimeout(()=>u(!1),500);return}t(s)};return i.jsxs("div",{className:"modal-overlay",onClick:n,children:[i.jsxs("div",{className:`channel-pw-modal ${o?"shake":""}`,onClick:f=>f.stopPropagation(),children:[i.jsx("div",{className:"channel-pw-icon",children:i.jsx(zi,{size:24})}),i.jsx("h3",{className:"channel-pw-title",children:r("channel.passwordRequired")}),i.jsx("p",{className:"channel-pw-desc",children:r("channel.passwordDesc",{channel:e})}),i.jsxs("div",{className:"channel-pw-input-row",children:[i.jsx("input",{type:"password",className:"channel-pw-input",value:s,onChange:f=>a(f.target.value),onKeyDown:f=>{f.key==="Enter"&&c(),f.key==="Escape"&&n()},placeholder:r("channel.passwordPlaceholderJoin"),autoFocus:!0}),i.jsx("button",{className:"channel-pw-submit",onClick:c,disabled:!s.trim(),children:i.jsx(Ox,{size:16})})]}),i.jsx("button",{className:"channel-pw-cancel",onClick:n,children:r("channel.cancel")})]}),i.jsx("style",{children:`
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
      `})]})}function R1({src:e,onClose:t}){const[n,r]=y.useState(1),[s,a]=y.useState(0),[o,u]=y.useState(!1),c=y.useCallback(m=>{m.key==="Escape"&&t(),(m.key==="+"||m.key==="=")&&r(k=>Math.min(k+.25,4)),m.key==="-"&&r(k=>Math.max(k-.25,.5)),m.key==="r"&&a(k=>k+90)},[t]);y.useEffect(()=>(document.addEventListener("keydown",c),document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",c),document.body.style.overflow=""}),[c]);const f=m=>{m.preventDefault();const k=m.deltaY>0?-.1:.1;r(g=>Math.max(.5,Math.min(4,g+k)))};return i.jsxs("div",{className:"lightbox-overlay",onClick:t,children:[i.jsxs("div",{className:"lightbox-toolbar",onClick:m=>m.stopPropagation(),children:[i.jsx("button",{onClick:()=>r(m=>Math.min(m+.25,4)),title:"Zoom in",children:i.jsx(b0,{size:16})}),i.jsx("button",{onClick:()=>r(m=>Math.max(m-.25,.5)),title:"Zoom out",children:i.jsx(k0,{size:16})}),i.jsx("button",{onClick:()=>a(m=>m+90),title:"Rotate",children:i.jsx(o0,{size:16})}),i.jsx("button",{onClick:()=>{r(1),a(0)},title:"Reset",children:i.jsx(qx,{size:16})}),i.jsxs("span",{className:"lightbox-scale",children:[Math.round(n*100),"%"]}),i.jsx("a",{href:e,download:!0,className:"lightbox-download",title:"Download",onClick:m=>m.stopPropagation(),children:i.jsx(Jp,{size:16})}),i.jsx("button",{className:"lightbox-close-btn",onClick:t,title:"Close (Esc)",children:i.jsx(zt,{size:18})})]}),i.jsxs("div",{className:"lightbox-content",onClick:m=>m.stopPropagation(),onWheel:f,children:[!o&&i.jsx("div",{className:"lightbox-loading",children:i.jsx("div",{className:"lightbox-spinner"})}),i.jsx("img",{src:e,alt:"",className:`lightbox-img ${o?"loaded":""}`,style:{transform:`scale(${n}) rotate(${s}deg)`},onLoad:()=>u(!0),onDoubleClick:()=>{r(1),a(0)},draggable:!1})]}),i.jsx("style",{children:`
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
      `})]})}function O1({rootMessage:e,replies:t,currentUserId:n,currentRole:r,onClose:s,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m,onImageClick:k}){const{t:g}=Qe(),N=r==="admin"||r==="operator";return i.jsxs("div",{className:"thread-panel",children:[i.jsxs("div",{className:"thread-panel-header",children:[i.jsx(Dc,{size:15}),i.jsx("span",{className:"thread-panel-title",children:g("thread.title")}),i.jsxs("span",{className:"thread-panel-count",children:[t.length," ",t.length===1?g("thread.reply"):g("thread.replies")]}),i.jsx("button",{className:"thread-panel-close",onClick:s,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"thread-panel-messages",children:[i.jsx("div",{className:"thread-root",children:i.jsx(Ol,{id:e.id,userId:e.userId,nickname:e.nickname,content:e.content,role:e.role,timestamp:e.timestamp,isOwn:e.userId===n,edited:e.edited,reactions:e.reactions,currentUserId:n,canModerate:N,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m==null?void 0:m(e.id),onImageClick:k})}),t.length>0&&i.jsx("div",{className:"thread-separator",children:i.jsxs("span",{children:[t.length," ",t.length===1?g("thread.reply"):g("thread.replies")]})}),t.map((v,w)=>{const M=w>0?t[w-1]:void 0,j=M!==void 0&&M.userId===v.userId&&v.timestamp-M.timestamp<12e4;return i.jsx(Ol,{id:v.id,userId:v.userId,nickname:v.nickname,content:v.content,role:v.role,timestamp:v.timestamp,isOwn:v.userId===n,edited:v.edited,reactions:v.reactions,currentUserId:n,canModerate:N,onReact:a,onRemoveReact:o,onEdit:u,onDelete:c,onBookmark:f,isBookmarked:m==null?void 0:m(v.id),isGrouped:j,onImageClick:k},v.id)})]}),i.jsx("style",{children:`
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
      `})]})}const ri=[{key:"--accent",label:"Accent",default:"#6366f1"},{key:"--bg-primary",label:"Background",default:"#0f0f12"},{key:"--bg-secondary",label:"Surface",default:"#1a1a22"},{key:"--bg-tertiary",label:"Tertiary",default:"#24242e"},{key:"--text-primary",label:"Text",default:"#f0f0f5"},{key:"--text-muted",label:"Muted",default:"#6b6b80"},{key:"--border",label:"Border",default:"#2a2a35"},{key:"--danger",label:"Danger",default:"#ef4444"}],wh="hotline-custom-themes",Ii="hotline-active-theme";function jh(){try{return JSON.parse(localStorage.getItem(wh)||"[]")}catch{return[]}}function ud(e){localStorage.setItem(wh,JSON.stringify(e))}function Dl(e){const t=document.documentElement;for(const[n,r]of Object.entries(e))if(t.style.setProperty(n,r),n==="--accent"){const s=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),o=parseInt(r.slice(5,7),16);t.style.setProperty("--accent-rgb",`${s}, ${a}, ${o}`)}}function _1(){const e=document.documentElement;for(const t of ri)e.style.removeProperty(t.key);e.style.removeProperty("--accent-rgb"),localStorage.removeItem(Ii)}function D1({onClose:e}){const{t}=Qe(),[n,r]=y.useState(jh),[s,a]=y.useState(()=>{const w={};for(const M of ri){const j=getComputedStyle(document.documentElement).getPropertyValue(M.key).trim();w[M.key]=j||M.default}return w}),[o,u]=y.useState(""),[c,f]=y.useState(!1);y.useEffect(()=>{Dl(s)},[s]);const m=(w,M)=>{a(j=>({...j,[w]:M}))},k=()=>{if(!o.trim())return;const w={id:Date.now().toString(36),name:o.trim(),colors:{...s}},M=[...n,w];r(M),ud(M),localStorage.setItem(Ii,w.id),f(!0),setTimeout(()=>f(!1),2e3)},g=w=>{a(w.colors),u(w.name),Dl(w.colors),localStorage.setItem(Ii,w.id)},N=w=>{const M=n.filter(j=>j.id!==w);r(M),ud(M)},v=()=>{_1();const w={};for(const M of ri)w[M.key]=M.default;a(w)};return i.jsx("div",{className:"modal-overlay",onClick:e,children:i.jsxs("div",{className:"theme-editor",onClick:w=>w.stopPropagation(),children:[i.jsxs("div",{className:"theme-editor-header",children:[i.jsx(Gp,{size:18}),i.jsx("h3",{children:t("theme.title")}),i.jsx("button",{className:"theme-editor-close",onClick:e,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"theme-editor-body",children:[i.jsx("div",{className:"theme-colors",children:ri.map(w=>i.jsxs("div",{className:"theme-color-row",children:[i.jsx("label",{className:"theme-color-label",children:w.label}),i.jsxs("div",{className:"theme-color-input-wrap",children:[i.jsx("input",{type:"color",value:s[w.key]||w.default,onChange:M=>m(w.key,M.target.value),className:"theme-color-picker"}),i.jsx("input",{type:"text",value:s[w.key]||w.default,onChange:M=>m(w.key,M.target.value),className:"theme-color-hex",maxLength:7})]})]},w.key))}),i.jsxs("div",{className:"theme-save-row",children:[i.jsx("input",{type:"text",placeholder:t("theme.namePlaceholder"),value:o,onChange:w=>u(w.target.value),className:"theme-name-input"}),i.jsxs("button",{className:`theme-save-btn ${c?"saved":""}`,onClick:k,disabled:!o.trim(),children:[c?i.jsx(Tc,{size:14}):i.jsx(eh,{size:14}),i.jsx("span",{children:t(c?"theme.saved":"theme.save")})]}),i.jsx("button",{className:"theme-reset-btn",onClick:v,title:t("theme.reset"),children:i.jsx(i0,{size:14})})]}),n.length>0&&i.jsxs("div",{className:"theme-list",children:[i.jsx("span",{className:"theme-list-label",children:t("theme.saved_themes")}),n.map(w=>i.jsxs("div",{className:"theme-list-item",children:[i.jsx("div",{className:"theme-list-swatches",children:Object.values(w.colors).slice(0,4).map((M,j)=>i.jsx("span",{className:"theme-swatch",style:{background:M}},j))}),i.jsx("span",{className:"theme-list-name",onClick:()=>g(w),children:w.name}),i.jsx("button",{className:"theme-list-delete",onClick:()=>N(w.id),children:i.jsx(zt,{size:12})})]},w.id))]})]}),i.jsx("style",{children:`
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
        `})]})})}function A1(){const e=localStorage.getItem(Ii);if(!e)return;const n=jh().find(r=>r.id===e);n&&Dl(n.colors)}function U1({messages:e,userCount:t,channelCount:n,serverName:r,onClose:s}){const{t:a}=Qe(),o=y.useMemo(()=>{const c=Date.now(),f=e.filter(M=>c-M.timestamp<36e5).length,m=e.filter(M=>c-M.timestamp<864e5).length,k={};for(const M of e)k[M.userId]||(k[M.userId]={nickname:M.nickname,count:0}),k[M.userId].count++;const g=Object.values(k).sort((M,j)=>j.count-M.count).slice(0,5),N={};for(const M of e)N[M.channel]=(N[M.channel]||0)+1;const v=Object.entries(N).sort(([,M],[,j])=>j-M).slice(0,5),w=new Array(24).fill(0);for(const M of e)if(c-M.timestamp<864e5){const j=new Date(M.timestamp).getHours();w[j]++}return{total:e.length,lastHour:f,last24h:m,topUsers:g,topChannels:v,hourly:w}},[e]),u=Math.max(...o.hourly,1);return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"stats-panel",onClick:c=>c.stopPropagation(),children:[i.jsxs("div",{className:"stats-header",children:[i.jsx(rh,{size:18}),i.jsxs("h3",{children:[r," — ",a("stats.title")]}),i.jsx("button",{className:"stats-close",onClick:s,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"stats-body",children:[i.jsxs("div",{className:"stats-cards",children:[i.jsxs("div",{className:"stats-card",children:[i.jsx(Gx,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.total}),i.jsx("span",{className:"stats-card-label",children:a("stats.totalMessages")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(Zi,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:t}),i.jsx("span",{className:"stats-card-label",children:a("stats.onlineUsers")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(wa,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:n}),i.jsx("span",{className:"stats-card-label",children:a("stats.channels")})]})]}),i.jsxs("div",{className:"stats-card",children:[i.jsx(Rc,{size:16}),i.jsxs("div",{className:"stats-card-info",children:[i.jsx("span",{className:"stats-card-value",children:o.lastHour}),i.jsx("span",{className:"stats-card-label",children:a("stats.lastHour")})]})]})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.activity24h")}),i.jsx("div",{className:"stats-chart",children:o.hourly.map((c,f)=>i.jsx("div",{className:"stats-bar-wrap",title:`${f}:00 — ${c} msgs`,children:i.jsx("div",{className:"stats-bar",style:{height:`${c/u*100}%`}})},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topContributors")}),i.jsx("ul",{className:"stats-ranking",children:o.topUsers.map((c,f)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",f+1]}),i.jsx("span",{className:"stats-rank-name",children:c.nickname}),i.jsx("span",{className:"stats-rank-count",children:c.count})]},f))})]}),i.jsxs("div",{className:"stats-section",children:[i.jsx("span",{className:"stats-section-title",children:a("stats.topChannels")}),i.jsx("ul",{className:"stats-ranking",children:o.topChannels.map(([c,f],m)=>i.jsxs("li",{children:[i.jsxs("span",{className:"stats-rank",children:["#",m+1]}),i.jsxs("span",{className:"stats-rank-name",children:["#",c]}),i.jsx("span",{className:"stats-rank-count",children:f})]},m))})]})]}),i.jsx("style",{children:`
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
        `})]})})}function $1({messageContent:e,messageAuthor:t,channels:n,currentChannel:r,onForward:s,onClose:a}){const{t:o}=Qe(),[u,c]=y.useState(""),[f,m]=y.useState(""),k=n.filter(N=>N.name!==r),g=()=>{u&&(s(u,f.trim()||void 0),a())};return i.jsx("div",{className:"modal-overlay",onClick:a,children:i.jsxs("div",{className:"forward-dialog",onClick:N=>N.stopPropagation(),children:[i.jsxs("div",{className:"forward-header",children:[i.jsx(qp,{size:16}),i.jsx("h3",{children:o("forward.title")}),i.jsx("button",{className:"forward-close",onClick:a,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"forward-body",children:[i.jsxs("div",{className:"forward-preview",children:[i.jsx("span",{className:"forward-preview-author",children:t}),i.jsx("span",{className:"forward-preview-content",children:e.length>120?e.slice(0,120)+"...":e})]}),i.jsxs("div",{className:"forward-target",children:[i.jsx("label",{className:"forward-label",children:o("forward.sendTo")}),i.jsx("div",{className:"forward-channel-list",children:k.map(N=>i.jsxs("button",{className:`forward-channel-btn ${u===N.name?"selected":""}`,onClick:()=>c(N.name),children:[i.jsx(wa,{size:12}),i.jsx("span",{children:N.name})]},N.name))})]}),i.jsx("div",{className:"forward-comment",children:i.jsx("input",{type:"text",placeholder:o("forward.commentPlaceholder"),value:f,onChange:N=>m(N.target.value),className:"forward-comment-input",onKeyDown:N=>{N.key==="Enter"&&g()}})})]}),i.jsxs("div",{className:"forward-footer",children:[i.jsx("button",{className:"forward-cancel",onClick:a,children:o("forward.cancel")}),i.jsxs("button",{className:"forward-submit",onClick:g,disabled:!u,children:[i.jsx(Xi,{size:13}),i.jsx("span",{children:o("forward.send")})]})]}),i.jsx("style",{children:`
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
        `})]})})}const Sh="hotline-custom-emojis";function F1(){try{return JSON.parse(localStorage.getItem(Sh)||"[]")}catch{return[]}}function dd(e){localStorage.setItem(Sh,JSON.stringify(e))}function B1({emojis:e,onUpload:t,onDelete:n,onClose:r}){const{t:s}=Qe(),[a,o]=y.useState(""),[u,c]=y.useState(null),[f,m]=y.useState(null),k=y.useRef(null),g=v=>{var j;const w=(j=v.target.files)==null?void 0:j[0];if(!w||!w.type.startsWith("image/")||w.size>256*1024)return;m(w);const M=URL.createObjectURL(w);c(M)},N=()=>{!f||!a.trim()||(t(a.trim().toLowerCase().replace(/\s+/g,"_"),f),o(""),c(null),m(null))};return i.jsx("div",{className:"modal-overlay",onClick:r,children:i.jsxs("div",{className:"custom-emoji-panel",onClick:v=>v.stopPropagation(),children:[i.jsxs("div",{className:"custom-emoji-header",children:[i.jsx(ha,{size:16}),i.jsx("h3",{children:s("customEmoji.title")}),i.jsx("button",{className:"custom-emoji-close",onClick:r,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"custom-emoji-body",children:[i.jsxs("div",{className:"custom-emoji-upload-area",children:[i.jsx("div",{className:"custom-emoji-preview-zone",onClick:()=>{var v;return(v=k.current)==null?void 0:v.click()},children:u?i.jsx("img",{src:u,alt:"preview",className:"custom-emoji-preview-img"}):i.jsxs(i.Fragment,{children:[i.jsx(Ac,{size:20}),i.jsx("span",{children:s("customEmoji.selectImage")})]})}),i.jsx("input",{ref:k,type:"file",accept:"image/png,image/gif,image/webp",onChange:g,style:{display:"none"}}),i.jsxs("div",{className:"custom-emoji-upload-form",children:[i.jsx("input",{type:"text",value:a,onChange:v=>o(v.target.value),placeholder:s("customEmoji.namePlaceholder"),className:"custom-emoji-name-input",maxLength:20}),i.jsxs("button",{className:"custom-emoji-upload-btn",onClick:N,disabled:!f||!a.trim(),children:[i.jsx(ha,{size:12}),i.jsx("span",{children:s("customEmoji.upload")})]})]}),i.jsx("span",{className:"custom-emoji-hint",children:s("customEmoji.hint")})]}),e.length>0&&i.jsxs("div",{className:"custom-emoji-list",children:[i.jsx("span",{className:"custom-emoji-list-label",children:s("customEmoji.existing")}),i.jsx("div",{className:"custom-emoji-grid",children:e.map(v=>i.jsxs("div",{className:"custom-emoji-item",children:[i.jsx("img",{src:v.url,alt:v.name,className:"custom-emoji-img"}),i.jsxs("span",{className:"custom-emoji-item-name",children:[":",v.name,":"]}),i.jsx("button",{className:"custom-emoji-delete",onClick:()=>n(v.id),children:i.jsx(Nr,{size:11})})]},v.id))})]})]}),i.jsx("style",{children:`
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
        `})]})})}const Nh="hotline-notif-filters";function H1(){try{const e=localStorage.getItem(Nh);if(e)return JSON.parse(e)}catch{}return{mutedChannels:[],mutedUsers:[],onlyMentions:!1,quietHoursEnabled:!1,quietStart:"22:00",quietEnd:"08:00",keywords:[]}}function Ch(e){localStorage.setItem(Nh,JSON.stringify(e))}function V1({filters:e,channels:t,users:n,onChange:r,onClose:s}){const{t:a}=Qe(),[o,u]=y.useState(e),[c,f]=y.useState("");y.useEffect(()=>{r(o),Ch(o)},[o,r]);const m=v=>{u(w=>({...w,mutedChannels:w.mutedChannels.includes(v)?w.mutedChannels.filter(M=>M!==v):[...w.mutedChannels,v]}))},k=v=>{u(w=>({...w,mutedUsers:w.mutedUsers.includes(v)?w.mutedUsers.filter(M=>M!==v):[...w.mutedUsers,v]}))},g=()=>{c.trim()&&(u(v=>({...v,keywords:[...v.keywords,c.trim()]})),f(""))},N=v=>{u(w=>({...w,keywords:w.keywords.filter(M=>M!==v)}))};return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"notif-filters",onClick:v=>v.stopPropagation(),children:[i.jsxs("div",{className:"notif-filters-header",children:[i.jsx(Qp,{size:16}),i.jsx("h3",{children:a("notifFilters.title")}),i.jsx("button",{className:"notif-filters-close",onClick:s,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"notif-filters-body",children:[i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(Dx,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.onlyMentions")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.onlyMentionsDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.onlyMentions?"on":""}`,onClick:()=>u(v=>({...v,onlyMentions:!v.onlyMentions})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),i.jsxs("div",{className:"nf-toggle-row",children:[i.jsxs("div",{className:"nf-toggle-info",children:[i.jsx(fs,{size:14}),i.jsxs("div",{children:[i.jsx("span",{className:"nf-toggle-label",children:a("notifFilters.quietHours")}),i.jsx("span",{className:"nf-toggle-desc",children:a("notifFilters.quietHoursDesc")})]})]}),i.jsx("button",{className:`nf-switch ${o.quietHoursEnabled?"on":""}`,onClick:()=>u(v=>({...v,quietHoursEnabled:!v.quietHoursEnabled})),children:i.jsx("span",{className:"nf-switch-knob"})})]}),o.quietHoursEnabled&&i.jsxs("div",{className:"nf-quiet-times",children:[i.jsx("input",{type:"time",value:o.quietStart,onChange:v=>u(w=>({...w,quietStart:v.target.value})),className:"nf-time-input"}),i.jsx("span",{className:"nf-time-sep",children:"→"}),i.jsx("input",{type:"time",value:o.quietEnd,onChange:v=>u(w=>({...w,quietEnd:v.target.value})),className:"nf-time-input"})]}),i.jsxs("div",{className:"nf-section",children:[i.jsx("span",{className:"nf-section-title",children:a("notifFilters.keywords")}),i.jsxs("div",{className:"nf-keyword-row",children:[i.jsx("input",{type:"text",value:c,onChange:v=>f(v.target.value),onKeyDown:v=>{v.key==="Enter"&&g()},placeholder:a("notifFilters.keywordPlaceholder"),className:"nf-keyword-input"}),i.jsx("button",{className:"nf-keyword-add",onClick:g,children:"+"})]}),o.keywords.length>0&&i.jsx("div",{className:"nf-keyword-list",children:o.keywords.map(v=>i.jsxs("span",{className:"nf-keyword-tag",onClick:()=>N(v),children:[v," ",i.jsx(zt,{size:10})]},v))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(wa,{size:12})," ",a("notifFilters.mutedChannels")]}),i.jsx("div",{className:"nf-chip-list",children:t.map(v=>i.jsxs("button",{className:`nf-chip ${o.mutedChannels.includes(v)?"muted":""}`,onClick:()=>m(v),children:[o.mutedChannels.includes(v)?i.jsx(fs,{size:10}):i.jsx(Ll,{size:10}),i.jsx("span",{children:v})]},v))})]}),i.jsxs("div",{className:"nf-section",children:[i.jsxs("span",{className:"nf-section-title",children:[i.jsx(Dc,{size:12})," ",a("notifFilters.mutedUsers")]}),i.jsx("div",{className:"nf-chip-list",children:n.slice(0,20).map(v=>i.jsxs("button",{className:`nf-chip ${o.mutedUsers.includes(v.userId)?"muted":""}`,onClick:()=>k(v.userId),children:[o.mutedUsers.includes(v.userId)?i.jsx(fs,{size:10}):i.jsx(Ll,{size:10}),i.jsx("span",{children:v.nickname})]},v.userId))})]})]}),i.jsx("style",{children:`
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
        `})]})})}const Eh="hotline-scheduled-messages";function K1(){try{return JSON.parse(localStorage.getItem(Eh)||"[]")}catch{return[]}}function Ro(e){localStorage.setItem(Eh,JSON.stringify(e))}function W1({activeChannel:e,scheduledMessages:t,onSchedule:n,onDelete:r,onClose:s}){const{t:a}=Qe(),[o,u]=y.useState(""),[c,f]=y.useState("");y.useEffect(()=>{const v=new Date;v.setMinutes(v.getMinutes()+1);const w=v.toISOString().slice(0,16);f(w)},[]);const m=()=>{if(!o.trim()||!c)return;const v=new Date(c).getTime();if(v<=Date.now())return;const w={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),channel:e,content:o.trim(),scheduledTime:v,createdAt:Date.now()};n(w),u("")},k=t.filter(v=>v.channel===e),g=t.filter(v=>v.channel!==e),N=v=>new Date(v).toLocaleString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});return i.jsx("div",{className:"modal-overlay",onClick:s,children:i.jsxs("div",{className:"scheduler-panel",onClick:v=>v.stopPropagation(),children:[i.jsxs("div",{className:"scheduler-header",children:[i.jsx(Rc,{size:16}),i.jsx("h3",{children:a("scheduler.title")}),i.jsx("button",{className:"scheduler-close",onClick:s,children:i.jsx(zt,{size:16})})]}),i.jsxs("div",{className:"scheduler-body",children:[i.jsxs("div",{className:"scheduler-form",children:[i.jsx("div",{className:"scheduler-form-row",children:i.jsxs("span",{className:"scheduler-channel-tag",children:["#",e]})}),i.jsx("textarea",{className:"scheduler-textarea",value:o,onChange:v=>u(v.target.value),placeholder:a("scheduler.placeholder"),rows:3}),i.jsxs("div",{className:"scheduler-time-row",children:[i.jsx(Ux,{size:13}),i.jsx("input",{type:"datetime-local",value:c,onChange:v=>f(v.target.value),className:"scheduler-datetime",min:new Date().toISOString().slice(0,16)}),i.jsxs("button",{className:"scheduler-submit",onClick:m,disabled:!o.trim()||!c,children:[i.jsx(Xi,{size:12}),i.jsx("span",{children:a("scheduler.schedule")})]})]})]}),k.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsxs("span",{className:"scheduler-list-label",children:[a("scheduler.pending")," — #",e]}),k.map(v=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsx("span",{className:"scheduler-item-time",children:N(v.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:v.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(v.id),children:i.jsx(Nr,{size:12})})]},v.id))]}),g.length>0&&i.jsxs("div",{className:"scheduler-list",children:[i.jsx("span",{className:"scheduler-list-label",children:a("scheduler.otherChannels")}),g.map(v=>i.jsxs("div",{className:"scheduler-item",children:[i.jsxs("div",{className:"scheduler-item-info",children:[i.jsxs("span",{className:"scheduler-item-channel",children:["#",v.channel]}),i.jsx("span",{className:"scheduler-item-time",children:N(v.scheduledTime)}),i.jsx("span",{className:"scheduler-item-content",children:v.content})]}),i.jsx("button",{className:"scheduler-item-delete",onClick:()=>r(v.id),children:i.jsx(Nr,{size:12})})]},v.id))]})]}),i.jsx("style",{children:`
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
        `})]})})}const zh="hotline-channel-order";function Y1(){try{return JSON.parse(localStorage.getItem(zh)||"[]")}catch{return[]}}function J1(e){localStorage.setItem(zh,JSON.stringify(e))}function Q1(e,t){if(t.length===0)return e;const n=[],r=[...e];for(const s of t){const a=r.findIndex(o=>o.name===s);a!==-1&&(n.push(r[a]),r.splice(a,1))}return[...n,...r]}function q1({toast:e,onDismiss:t}){const[n,r]=y.useState(!1);y.useEffect(()=>{const a=setTimeout(()=>{r(!0),setTimeout(()=>t(e.id),300)},3e3);return()=>clearTimeout(a)},[e.id,t]);const s=e.type==="join"?i.jsx(Qx,{size:13}):e.type==="leave"?i.jsx(Xp,{size:13}):null;return i.jsxs("div",{className:`toast-item toast-${e.type} ${n?"exiting":""}`,children:[s&&i.jsx("span",{className:"toast-icon",children:s}),i.jsx("span",{className:"toast-text",children:e.message}),i.jsx("button",{className:"toast-close",onClick:()=>{r(!0),setTimeout(()=>t(e.id),300)},children:i.jsx(zt,{size:12})})]})}function X1({toasts:e,onDismiss:t}){return e.length===0?null:i.jsxs("div",{className:"toast-container",children:[e.slice(-5).map(n=>i.jsx(q1,{toast:n,onDismiss:t},n.id)),i.jsx("style",{children:`
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
      `})]})}function G1(){const[e,t]=y.useState([]),n=y.useRef(0),r=y.useCallback((a,o)=>{const u=`toast-${++n.current}`;t(c=>[...c,{id:u,type:a,message:o,timestamp:Date.now()}])},[]),s=y.useCallback(a=>{t(o=>o.filter(u=>u.id!==a))},[]);return{toasts:e,addToast:r,dismissToast:s}}function Ph(e){return`hotline-agreement-${e}`}function Ih(e,t){return t?localStorage.getItem(Ph(e))===t:!0}function Z1(e,t){localStorage.setItem(Ph(e),t)}function ev({agreement:e,serverAddress:t,onAccept:n,onDecline:r}){const{t:s}=Qe(),[a,o]=y.useState(!0);if(y.useEffect(()=>{(!e||Ih(t,e))&&(n(),o(!1))},[e,t,n]),!a||!e)return null;const u=()=>{Z1(t,e),n(),o(!1)},c=()=>{r(),o(!1)};return i.jsxs("div",{className:"agreement-overlay",children:[i.jsxs("div",{className:"agreement-modal",children:[i.jsx("h2",{className:"agreement-title",children:s("agreement.title")}),i.jsx("div",{className:"agreement-content",children:i.jsx("pre",{className:"agreement-text",children:e})}),i.jsxs("div",{className:"agreement-actions",children:[i.jsx("button",{className:"agreement-decline",onClick:c,children:s("agreement.decline")}),i.jsx("button",{className:"agreement-accept",onClick:u,children:s("agreement.accept")})]})]}),i.jsx("style",{children:`
        .agreement-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.15s ease;
        }
        .agreement-modal {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 12px);
          padding: 24px;
          max-width: 540px;
          width: 90%;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: fadeInScale 0.2s ease;
        }
        .agreement-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }
        .agreement-content {
          flex: 1;
          overflow-y: auto;
          margin-bottom: 20px;
          padding: 16px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle, var(--border));
          border-radius: var(--radius);
        }
        .agreement-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          font-family: inherit;
        }
        .agreement-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .agreement-decline {
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius);
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .agreement-decline:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }
        .agreement-accept {
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius);
          background: var(--accent);
          color: #fff;
          transition: all var(--transition-fast);
        }
        .agreement-accept:hover {
          filter: brightness(1.1);
        }
      `})]})}function tv(){const[e]=y.useState(()=>p1());return{identity:e,publicKeyHex:vh(e)}}function Ge(e,t){return{type:e,id:crypto.randomUUID(),timestamp:Date.now(),payload:t}}function Ha(e,t,n){if(e.some(s=>s.id===t.id))return e;const r=e.length>=n?[...e.slice(1),t]:[...e,t];return e.length>0&&e[e.length-1].timestamp>t.timestamp&&r.sort((s,a)=>s.timestamp-a.timestamp),r}function nv({identity:e,onError:t}){const n=y.useRef(null),r=y.useRef(null),s=y.useRef(0),a=y.useRef(""),o=y.useRef(""),[u,c]=y.useState("disconnected"),[f,m]=y.useState(null),[k,g]=y.useState([]),[N,v]=y.useState([]),[w,M]=y.useState([]),[j,b]=y.useState([]),[C,E]=y.useState([]),[L,_]=y.useState([]),[D,q]=y.useState([]),[Te,ge]=y.useState([]),[Be,dt]=y.useState(0),[wt,ft]=y.useState(!1),[jt,qe]=y.useState(!0),pt=y.useCallback(Z=>{var G,be,at;const U=JSON.parse(Z.data);switch(U.type){case"auth.nonce":{const{nonce:W}=U.payload;c("authenticating");const xe=xh(W,e.secretKey),z=Ge("auth",{publicKey:vh(e),signature:xe,nonce:W,nickname:o.current});(G=n.current)==null||G.send(JSON.stringify(z));break}case"auth.ok":{const W=U.payload;c("connected"),m({name:W.serverName,motd:W.motd,userId:W.userId,role:W.role,agreement:W.agreement||""});const xe=Ge("channel.list",{});(be=n.current)==null||be.send(JSON.stringify(xe));const z=Ge("user.list",{});(at=n.current)==null||at.send(JSON.stringify(z));break}case"auth.error":{const{reason:W}=U.payload;t==null||t(W);break}case"chat.message":{const W=U.payload;g(xe=>Ha(xe,{id:U.id,channel:W.channel,userId:W.userId,nickname:W.nickname,content:W.content,role:W.role,timestamp:U.timestamp,replyTo:W.replyTo},2e3));break}case"channel.list":{const{channels:W}=U.payload;b(W||[]);break}case"user.list":{const{users:W}=U.payload;E(W||[]);break}case"user.joined":{const W=U.payload;E(xe=>[...xe.filter(He=>He.userId!==W.userId),{...W,status:"online"}]),g(xe=>Ha(xe,{id:U.id,channel:"__system__",userId:W.userId,nickname:W.nickname,content:"joined",role:W.role,timestamp:U.timestamp,system:!0},2e3));break}case"user.left":{const W=U.payload;E(xe=>xe.filter(z=>z.userId!==W.userId)),g(xe=>Ha(xe,{id:U.id,channel:"__system__",userId:W.userId,nickname:W.nickname,content:"left",role:"",timestamp:U.timestamp,system:!0},2e3));break}case"user.role_changed":{const{userId:W,role:xe}=U.payload;E(z=>z.map(He=>He.userId===W?{...He,role:xe}:He));break}case"dm.message":{const W=U.payload;v(xe=>Ha(xe,{id:U.id,from:W.from,to:W.to,nickname:W.nickname,content:W.content,role:W.role,timestamp:U.timestamp},1e3));break}case"typing":{const W=U.payload;M(xe=>[...xe.filter(He=>He.userId!==W.userId||He.channel!==W.channel),{...W,expiry:Date.now()+3e3}]);break}case"chat.search_results":{const W=U.payload;_(W.results||[]);break}case"chat.edited":{const W=U.payload;g(xe=>xe.map(z=>z.id===W.messageId?{...z,content:W.content,edited:!0}:z));break}case"chat.deleted":{const W=U.payload;g(xe=>xe.filter(z=>z.id!==W.messageId));break}case"reaction.updated":{const W=U.payload;g(xe=>xe.map(z=>{if(z.id!==W.messageId)return z;const He=[...z.reactions||[]],Y=He.findIndex(X=>X.emoji===W.emoji);if(W.action==="add")Y>=0?He[Y].users.includes(W.userId)||(He[Y]={...He[Y],users:[...He[Y].users,W.userId]}):He.push({emoji:W.emoji,users:[W.userId]});else if(Y>=0){const X=He[Y].users.filter(Ye=>Ye!==W.userId);X.length===0?He.splice(Y,1):He[Y]={...He[Y],users:X}}return{...z,reactions:He}}));break}case"pin.added":break;case"pin.removed":{q(W=>W.filter(xe=>xe.id!==U.payload.messageId));break}case"pin.list":{const W=U.payload;q(W.messages||[]);break}case"user.nick_changed":{const W=U.payload;E(xe=>xe.map(z=>z.userId===W.userId?{...z,nickname:W.newNick}:z));break}case"server.settings_updated":{const W=U.payload;m(xe=>xe&&{...xe,name:W.serverName,motd:W.motd});break}case"user.status_changed":{const W=U.payload;E(xe=>xe.map(z=>z.userId===W.userId?{...z,status:W.status}:z));break}case"channel.members":{const W=U.payload;ge(W.members||[]);break}case"chat.history":{const W=U.payload;ft(!1),qe(W.hasMore),W.messages&&W.messages.length>0&&g(xe=>{const z=W.messages.map(X=>({id:X.id,channel:X.payload.channel,userId:X.payload.userId,nickname:X.payload.nickname,content:X.payload.content,role:X.payload.role,timestamp:X.timestamp,replyTo:X.payload.replyTo})),He=new Set(xe.map(X=>X.id));return[...z.filter(X=>!He.has(X.id)),...xe].sort((X,Ye)=>X.timestamp-Ye.timestamp)});break}case"error":{const W=U.payload;t==null||t(W.message);break}}},[e,t]),K=y.useCallback((Z,U)=>{n.current&&n.current.close(),a.current=Z,o.current=U,c("connecting"),g([]);const G=Z.startsWith("wss://")?"":"ws://",be=Z.includes("://")?Z:`${G}${Z}/ws`,at=new WebSocket(be);n.current=at,at.onopen=()=>{s.current=0,dt(0)},at.onmessage=pt,at.onclose=()=>{if(a.current){const W=s.current,xe=Math.min(1e3*Math.pow(2,W),3e4);s.current=W+1,c("reconnecting"),dt(Math.round(xe/1e3));const z=window.setInterval(()=>{dt(He=>He<=1?(clearInterval(z),0):He-1)},1e3);r.current=window.setTimeout(()=>{clearInterval(z),a.current&&K(a.current,o.current)},xe)}else c("disconnected")},at.onerror=()=>{t==null||t("Connection error")}},[pt,t]),ie=y.useCallback(()=>{a.current="",r.current&&(clearTimeout(r.current),r.current=null),n.current&&(n.current.close(),n.current=null),c("disconnected"),m(null),g([]),v([]),M([]),b([]),E([])},[]),me=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("chat.send",{channel:Z,content:U});n.current.send(JSON.stringify(be))}},[]),De=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be={channel:Z};U&&(be.password=U);const at=Ge("channel.join",be);n.current.send(JSON.stringify(at))}},[]),fe=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("channel.leave",{channel:Z});n.current.send(JSON.stringify(G))}},[]),Ze=y.useCallback((Z,U,G)=>{var be;if(((be=n.current)==null?void 0:be.readyState)===WebSocket.OPEN){const at=Ge("channel.create",{name:Z,topic:U,password:G||""});n.current.send(JSON.stringify(at))}},[]),We=y.useCallback(()=>{var Z;if(((Z=n.current)==null?void 0:Z.readyState)===WebSocket.OPEN){const U=Ge("user.list",{});n.current.send(JSON.stringify(U))}},[]),ke=y.useCallback(()=>{var Z;if(((Z=n.current)==null?void 0:Z.readyState)===WebSocket.OPEN){const U=Ge("channel.list",{});n.current.send(JSON.stringify(U))}},[]),et=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("admin.kick",{userId:Z});n.current.send(JSON.stringify(G))}},[]),Pt=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("admin.ban",{userId:Z});n.current.send(JSON.stringify(G))}},[]),nn=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("admin.op",{userId:Z,role:U});n.current.send(JSON.stringify(be))}},[]),qt=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("admin.topic",{channel:Z,topic:U});n.current.send(JSON.stringify(be))}},[]),Xt=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("dm.send",{targetId:Z,content:U});n.current.send(JSON.stringify(be))}},[]),rn=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("typing",{channel:Z,targetId:U||""});n.current.send(JSON.stringify(be))}},[]),Ot=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("channel.delete",{name:Z});n.current.send(JSON.stringify(G))}},[]),un=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("chat.search",{query:Z,channel:U||""});n.current.send(JSON.stringify(be))}},[]),_t=y.useCallback(()=>{_([])},[]),ye=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("chat.edit",{messageId:Z,content:U});n.current.send(JSON.stringify(be))}},[]),ht=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("chat.delete",{messageId:Z});n.current.send(JSON.stringify(G))}},[]),$n=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("reaction.add",{messageId:Z,emoji:U});n.current.send(JSON.stringify(be))}},[]),Fn=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("reaction.remove",{messageId:Z,emoji:U});n.current.send(JSON.stringify(be))}},[]),Bt=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("pin.add",{messageId:Z,channel:U});n.current.send(JSON.stringify(be))}},[]),Ht=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("pin.remove",{messageId:Z,channel:U});n.current.send(JSON.stringify(be))}},[]),yn=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("pin.list",{channel:Z});n.current.send(JSON.stringify(G))}},[]),bn=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("user.nick",{nickname:Z});n.current.send(JSON.stringify(G))}},[]),zn=y.useCallback((Z,U,G)=>{var be;if(((be=n.current)==null?void 0:be.readyState)===WebSocket.OPEN){const at=Ge("chat.send",{channel:Z,content:U,replyTo:G});n.current.send(JSON.stringify(at))}},[]),dn=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){const be=Ge("admin.settings",{serverName:Z,motd:U});n.current.send(JSON.stringify(be))}},[]),Pn=y.useCallback(()=>{var Z;if(((Z=n.current)==null?void 0:Z.readyState)===WebSocket.OPEN){const U=Ge("admin.banlist",{});n.current.send(JSON.stringify(U))}},[]),nt=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("admin.unban",{publicKey:Z});n.current.send(JSON.stringify(G))}},[]),Bn=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("user.status",{status:Z});n.current.send(JSON.stringify(G))}},[]),kn=y.useCallback(Z=>{var U;if(((U=n.current)==null?void 0:U.readyState)===WebSocket.OPEN){const G=Ge("channel.members",{channel:Z});n.current.send(JSON.stringify(G))}},[]),ir=y.useCallback((Z,U)=>{var G;if(((G=n.current)==null?void 0:G.readyState)===WebSocket.OPEN){ft(!0);const be=Ge("chat.history",{channel:Z,before:U,limit:50});n.current.send(JSON.stringify(be))}},[]);return y.useEffect(()=>{const Z=setInterval(()=>{M(U=>U.filter(G=>G.expiry>Date.now()))},1e3);return()=>clearInterval(Z)},[]),y.useEffect(()=>()=>{r.current&&clearTimeout(r.current),n.current&&n.current.close()},[]),{status:u,serverInfo:f,messages:k,dmMessages:N,typingUsers:w,channels:j,users:C,searchResults:L,pinnedMessages:D,channelMembers:Te,reconnectIn:Be,historyLoading:wt,hasMoreHistory:jt,connect:K,disconnect:ie,sendChat:me,sendDM:Xt,sendTyping:rn,joinChannel:De,leaveChannel:fe,createChannel:Ze,deleteChannel:Ot,requestUserList:We,requestChannelList:ke,kickUser:et,banUser:Pt,setUserRole:nn,setTopic:qt,search:un,clearSearch:_t,editMessage:ye,deleteMessage:ht,addReaction:$n,removeReaction:Fn,pinMessage:Bt,unpinMessage:Ht,requestPins:yn,changeNickname:bn,sendChatWithReply:zn,updateServerSettings:dn,requestBanList:Pn,unbanUser:nt,setStatus:Bn,requestChannelMembers:kn,loadHistory:ir}}const Mh="hotline_muted_channels";function rv(){try{const e=localStorage.getItem(Mh);return e?JSON.parse(e):[]}catch{return[]}}function sv(e){localStorage.setItem(Mh,JSON.stringify(e))}function av(){const[e,t]=y.useState(rv),n=y.useCallback(s=>{t(a=>{const o=a.includes(s)?a.filter(u=>u!==s):[...a,s];return sv(o),o})},[]),r=y.useCallback(s=>e.includes(s),[e]);return{mutedChannels:e,toggleMute:n,isMuted:r}}function iv({timeout:e,onIdle:t,onActive:n,enabled:r}){const s=y.useRef(null),a=y.useRef(!1),o=y.useCallback(()=>{r&&(s.current&&clearTimeout(s.current),a.current&&(a.current=!1,n()),s.current=setTimeout(()=>{a.current=!0,t()},e))},[e,t,n,r]);y.useEffect(()=>{if(!r)return;const u=["mousedown","mousemove","keydown","scroll","touchstart","pointerdown"];return u.forEach(c=>document.addEventListener(c,o,{passive:!0})),o(),()=>{u.forEach(c=>document.removeEventListener(c,o)),s.current&&clearTimeout(s.current)}},[o,r])}const ov="Hotline Modern";function lv(e){const t=y.useRef(ov);y.useEffect(()=>(e>0?document.title=`(${e}) ${t.current}`:document.title=t.current,()=>{document.title=t.current}),[e]),y.useEffect(()=>{if(e===0||!document.hidden)return;let n=!0;const r=setInterval(()=>{document.title=n?`(${e}) ${t.current}`:"💬 New messages",n=!n},1500),s=()=>{document.hidden||(clearInterval(r),document.title=e>0?`(${e}) ${t.current}`:t.current)};return document.addEventListener("visibilitychange",s),()=>{clearInterval(r),document.removeEventListener("visibilitychange",s)}},[e])}const fd="hotline_compact_mode";function cv(){const[e,t]=y.useState(()=>{try{return localStorage.getItem(fd)==="true"}catch{return!1}});return y.useEffect(()=>{localStorage.setItem(fd,String(e)),e?document.documentElement.setAttribute("data-density","compact"):document.documentElement.removeAttribute("data-density")},[e]),{compact:e,toggleCompact:()=>t(r=>!r)}}function uv(){var Le,Pe,S,_e,Ve,Ke,Re,Ue,$e,mt,Xe,it,ot,lt,St,It,Mt,Lt,Bc,Hc,Vc,Kc;const{t:e}=Qe(),{identity:t}=tv(),[n,r]=y.useState("lobby"),[s,a]=y.useState(""),[o,u]=y.useState(""),[c,f]=y.useState(null),[m,k]=y.useState(()=>window.innerWidth>768),[g,N]=y.useState(!1),[v,w]=y.useState(!1),[M,j]=y.useState(!1),[b,C]=y.useState(!1),[E,L]=y.useState(!1),[_,D]=y.useState(!1),[q,Te]=y.useState(!1),[ge,Be]=y.useState(null),[dt,wt]=y.useState(null),[ft,jt]=y.useState(null),[qe,pt]=y.useState(to),[K,ie]=y.useState(!1),[me,De]=y.useState(!1),[fe,Ze]=y.useState(null),[We,ke]=y.useState(!1),[et,Pt]=y.useState(!1),[nn,qt]=y.useState(!1),[Xt,rn]=y.useState(!1),[Ot,un]=y.useState(F1),[_t,ye]=y.useState(K1),[ht,$n]=y.useState(Y1),[Fn,Bt]=y.useState(!1),[Ht,yn]=y.useState(null),[bn,zn]=y.useState({}),[dn,Pn]=y.useState({}),[nt,Bn]=y.useState({}),[kn,ir]=y.useState(w1),[Z,U]=y.useState(null),G=y.useRef(0),be=y.useRef(0),at=y.useRef(n),W=y.useRef(s);y.useEffect(()=>{A1()},[]);const xe=y.useCallback(O=>{f(O),setTimeout(()=>f(null),5e3)},[]),z=nv({identity:t,onError:xe}),{mutedChannels:He,toggleMute:Y,isMuted:X}=av(),{compact:Ye,toggleCompact:xt}=cv(),{toasts:In,addToast:rt,dismissToast:fn}=G1(),Hn=y.useMemo(()=>Object.values(bn).reduce((O,B)=>O+B,0)+Object.values(nt).reduce((O,B)=>O+B,0),[bn,nt]);lv(Hn);const or=y.useRef([]);y.useEffect(()=>{if(z.status!=="connected")return;const O=z.users.map(pe=>pe.userId),B=or.current,ae=B.map(pe=>pe.id);if(ae.length>0){for(const pe of z.users)ae.includes(pe.userId)||rt("join",`${pe.nickname} joined`);for(const pe of B)O.includes(pe.id)||rt("leave",`${pe.nick} left`)}or.current=z.users.map(pe=>({id:pe.userId,nick:pe.nickname}))},[z.users,z.status,rt]),iv({timeout:5*60*1e3,onIdle:y.useCallback(()=>{var B;const O=(B=z.users.find(ae=>{var pe;return ae.userId===((pe=z.serverInfo)==null?void 0:pe.userId)}))==null?void 0:B.status;O&&O!=="away"&&(U(O),z.setStatus("away"))},[z]),onActive:y.useCallback(()=>{Z&&(z.setStatus(Z),U(null))},[z,Z]),enabled:z.status==="connected"});const Pr=(O,B)=>{u(O),z.connect(O,B)},ja=O=>{const B=z.channels.find(pe=>pe.name===O);if(B!=null&&B.hasPassword&&O!==n){Be(O);return}const ae=z.messages.filter(pe=>pe.channel===n);ae.length>0&&Pn(pe=>({...pe,[n]:ae[ae.length-1].id})),a(""),r(O),z.joinChannel(O)},ro=O=>{ge&&(a(""),r(ge),z.joinChannel(ge,O),Be(null))},Vt=O=>{a(O),Bn(B=>({...B,[O]:0}))},Sa=O=>{z.deleteChannel(O),n===O&&(r("lobby"),z.joinChannel("lobby"))},d=()=>{N(!0)},h=(O,B,ae)=>{z.createChannel(O,B,ae),setTimeout(()=>{$(O),z.requestChannelList()},300)},p=y.useCallback((O,B)=>{const ae=pe=>z.users.find(Oe=>Oe.nickname.toLowerCase()===pe.toLowerCase());switch(O){case"kick":{const pe=ae(B[0]||"");pe&&z.kickUser(pe.userId);break}case"ban":{const pe=ae(B[0]||"");pe&&z.banUser(pe.userId);break}case"op":{const pe=ae(B[0]||"");pe&&z.setUserRole(pe.userId,"operator");break}case"deop":{const pe=ae(B[0]||"");pe&&z.setUserRole(pe.userId,"member");break}case"topic":{const pe=B.join(" ");pe&&z.setTopic(n,pe);break}}},[z,n]),l=y.useRef(kn);y.useEffect(()=>{l.current=kn},[kn]);const x=y.useCallback(()=>{if(l.current.soundEnabled)try{const O=new AudioContext,B=O.createOscillator(),ae=O.createGain();B.connect(ae),ae.connect(O.destination),B.frequency.value=880,B.type="sine",ae.gain.value=.08,ae.gain.exponentialRampToValueAtTime(.001,O.currentTime+.15),B.start(),B.stop(O.currentTime+.15)}catch{}},[]);y.useEffect(()=>{at.current=n},[n]),y.useEffect(()=>{W.current=s},[s]),y.useEffect(()=>{var O;if(z.messages.length>G.current){const B=z.messages.slice(G.current),ae=at.current,pe=(O=z.serverInfo)==null?void 0:O.userId;let Oe=!1;if(zn(vt=>{const Mn={...vt};for(const Ln of B)Ln.channel!==ae&&Ln.userId!==pe&&(Mn[Ln.channel]=(Mn[Ln.channel]||0)+1,X(Ln.channel)||(Oe=!0));return Mn}),Oe){x();const vt=B[B.length-1];vt&&vt.userId!==pe&&!X(vt.channel)&&P(vt.nickname,vt.content)}}G.current=z.messages.length},[z.messages,X]),y.useEffect(()=>{var O;if(z.dmMessages.length>be.current){const B=z.dmMessages.slice(be.current),ae=(O=z.serverInfo)==null?void 0:O.userId,pe=W.current;for(const Oe of B){const vt=Oe.from===ae?Oe.to:Oe.from;vt!==pe&&Oe.from!==ae&&(Bn(Mn=>({...Mn,[vt]:(Mn[vt]||0)+1})),x(),P(Oe.nickname,Oe.content))}}be.current=z.dmMessages.length},[z.dmMessages]);const P=y.useCallback((O,B)=>{if(l.current.desktopEnabled&&"Notification"in window){if(Notification.permission==="default"){Notification.requestPermission();return}Notification.permission==="granted"&&document.hidden&&new Notification(O,{body:B,icon:"/logo.svg"})}},[]),I=y.useMemo(()=>{var ae,pe;const O=(ae=z.serverInfo)==null?void 0:ae.userId;if(!O)return[];const B=new Map;for(const Oe of z.dmMessages){const vt=Oe.from===O?Oe.to:Oe.from,Mn=Oe.from===O?((pe=z.users.find(so=>so.userId===vt))==null?void 0:pe.nickname)||vt.slice(0,8):Oe.nickname,Ln=B.get(vt);(!Ln||Oe.timestamp>Ln.ts)&&B.set(vt,{peerId:vt,peerNick:Mn,lastMessage:Oe.content,unread:nt[vt]||0,ts:Oe.timestamp})}return Array.from(B.values()).sort((Oe,vt)=>vt.ts-Oe.ts)},[z.dmMessages,(Le=z.serverInfo)==null?void 0:Le.userId,z.users,nt]),$=O=>{zn(B=>({...B,[O]:0})),ja(O)},J=y.useMemo(()=>{var B;if(!s||!((B=z.serverInfo)!=null&&B.userId))return[];const O=z.serverInfo.userId;return z.dmMessages.filter(ae=>ae.from===O&&ae.to===s||ae.from===s&&ae.to===O).map(ae=>({id:ae.id,channel:"__dm__",userId:ae.from,nickname:ae.nickname,content:ae.content,role:ae.role,timestamp:ae.timestamp}))},[z.dmMessages,s,(Pe=z.serverInfo)==null?void 0:Pe.userId]),[de,te]=y.useState(""),Ae=y.useCallback(()=>{w(!1),z.clearSearch()},[z]);y.useEffect(()=>{const O=B=>{const ae=B.target,pe=ae.tagName==="INPUT"||ae.tagName==="TEXTAREA"||ae.tagName==="SELECT";if((B.ctrlKey||B.metaKey)&&B.key==="k"&&(B.preventDefault(),w(Oe=>!Oe)),B.key==="?"&&!pe&&(B.preventDefault(),D(Oe=>!Oe)),B.key==="Escape"){if(_){D(!1);return}if(v){Ae();return}if(M){j(!1);return}if(b){C(!1);return}if(Ht){yn(null);return}}};return window.addEventListener("keydown",O),()=>window.removeEventListener("keydown",O)},[v,Ht,_,M,b,Ae]);const se=y.useCallback((O,B)=>{const ae=O.split(`
`).map(pe=>`> ${pe}`).join(`
`);te(`${ae}
@${B} `)},[]),we=y.useCallback((O,B)=>{if(!fe)return;const ae=B?`${B}

> **Forwarded from ${fe.author}:**
> ${fe.content}`:`> **Forwarded from ${fe.author}:**
> ${fe.content}`;z.sendChat(O,ae),Ze(null),rt("info",e("forward.sent"))},[fe,z,rt,e]),je=y.useCallback(O=>{const B=z.messages.find(ae=>ae.id===O);B&&Ze({content:B.content,author:B.nickname})},[z.messages]),Me=y.useCallback((O,B)=>{const ae=URL.createObjectURL(B),pe={id:Date.now().toString(36),name:O,url:ae},Oe=[...Ot,pe];un(Oe),dd(Oe)},[Ot]),ze=y.useCallback(O=>{const B=Ot.filter(ae=>ae.id!==O);un(B),dd(B)},[Ot]),Se=y.useCallback(O=>{const B=[..._t,O];ye(B),Ro(B)},[_t]),Ee=y.useCallback(O=>{const B=_t.filter(ae=>ae.id!==O);ye(B),Ro(B)},[_t]);y.useEffect(()=>{const O=setInterval(()=>{const B=Date.now(),ae=_t.filter(Oe=>Oe.scheduledTime<=B);if(ae.length===0)return;for(const Oe of ae)z.sendChat(Oe.channel,Oe.content),rt("info",`Scheduled message sent to #${Oe.channel}`);const pe=_t.filter(Oe=>Oe.scheduledTime>B);ye(pe),Ro(pe)},3e4);return()=>clearInterval(O)},[_t,z,rt]);const Ne=y.useCallback(O=>{$n(O),J1(O)},[]),oe=y.useMemo(()=>Q1(z.channels,ht),[z.channels,ht]),he=y.useCallback(async O=>{try{const B=_l(t),ae=o.startsWith("wss://")?"https://":"http://",pe=o.replace(/^wss?:\/\//,"").replace(/\/ws$/,"").replace(/:9998/,":9999"),Oe=`${ae}${pe}/files/uploads/`,vt=new FormData;vt.append("file",O);const Mn=await fetch(Oe,{method:"POST",headers:B,body:vt});if(!Mn.ok){xe("File upload failed");return}const Ln=await Mn.json(),so=`${ae}${pe}/files/${Ln.path}`;z.sendChat(n,`[${Ln.filename}](${so})`)}catch{xe("File upload error")}},[o,n,z,xe,t]),re=y.useCallback(O=>{if(To(O))pt(cd(O));else{const B=z.messages.find(ae=>ae.id===O);B&&pt(C1({id:B.id,channel:B.channel,nickname:B.nickname,content:B.content,timestamp:B.timestamp}))}},[z.messages]),le=y.useCallback(O=>{pt(cd(O))},[]);if(z.status==="disconnected"||z.status==="connecting")return i.jsx(z0,{onConnect:Pr,isConnecting:z.status==="connecting"});const ce=((S=z.serverInfo)==null?void 0:S.agreement)||"";if(ce&&!Fn&&!Ih(o,ce))return i.jsx(ev,{agreement:ce,serverAddress:o,onAccept:()=>Bt(!0),onDecline:()=>{z.disconnect(),Bt(!1)}});const T=()=>w(!0),R=O=>{const B=(s?J:z.messages).find(ae=>ae.id===O);B&&yn({id:B.id,nickname:B.nickname,content:B.content})},H=(O,B)=>{Ht?(z.sendChatWithReply(O,B,Ht.id),yn(null)):z.sendChat(O,B)},F=O=>{z.setStatus(O)},A=((_e=z.serverInfo)==null?void 0:_e.role)==="admin"||((Ve=z.serverInfo)==null?void 0:Ve.role)==="operator",V=((Ke=z.serverInfo)==null?void 0:Ke.role)==="admin"||((Re=z.serverInfo)==null?void 0:Re.role)==="operator",ve=((Ue=z.serverInfo)==null?void 0:Ue.role)!=="guest",Ce=z.channels.find(O=>O.name===n);return i.jsxs("div",{className:"app-layout",children:[We&&i.jsx("div",{className:"mobile-sidebar-overlay",onClick:()=>ke(!1)}),i.jsxs("div",{className:`app-sidebar-col ${We?"mobile-open":""}`,children:[i.jsx(I0,{serverName:(($e=z.serverInfo)==null?void 0:$e.name)||e("app.name"),channels:oe,activeChannel:n,activeDM:s,dmConversations:I,onSelectChannel:$,onSelectDM:Vt,onCreateChannel:d,onDeleteChannel:Sa,onDisconnect:z.disconnect,canCreateChannel:A,unreadCounts:bn,nickname:(mt=z.serverInfo)!=null&&mt.userId&&((Xe=z.users.find(O=>{var B;return O.userId===((B=z.serverInfo)==null?void 0:B.userId)}))==null?void 0:Xe.nickname)||"",role:((it=z.serverInfo)==null?void 0:it.role)||"",userStatus:(ot=z.users.find(O=>{var B;return O.userId===((B=z.serverInfo)==null?void 0:B.userId)}))==null?void 0:ot.status,mutedChannels:He,onToggleMute:Y,onAdminPanel:()=>Te(!0),typingChannels:z.typingUsers.filter(O=>{var B;return O.userId!==((B=z.serverInfo)==null?void 0:B.userId)}).map(O=>O.channel).filter(Boolean),onReorderChannels:Ne}),i.jsxs("div",{className:"app-sidebar-bottom",children:[i.jsx(P0,{currentStatus:((lt=z.users.find(O=>{var B;return O.userId===((B=z.serverInfo)==null?void 0:B.userId)}))==null?void 0:lt.status)||"available",onStatusChange:F}),i.jsx(S1,{prefs:kn,onChange:ir}),i.jsx("button",{className:"compact-toggle",onClick:xt,title:Ye?"Comfortable view":"Compact view",children:Ye?i.jsx(u0,{size:14}):i.jsx(l0,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>ie(!0),title:e("theme.title"),children:i.jsx(Gp,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>De(!0),title:e("stats.title"),children:i.jsx(rh,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>rn(!0),title:e("scheduler.title"),children:i.jsx(Rc,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>Pt(!0),title:e("customEmoji.title"),children:i.jsx(Gi,{size:14})}),i.jsx("button",{className:"compact-toggle",onClick:()=>qt(!0),title:e("notifFilters.title"),children:i.jsx(Qp,{size:14})}),i.jsx(x1,{})]})]}),i.jsxs("main",{className:"app-main",children:[i.jsxs("div",{className:"mobile-header",children:[i.jsx("button",{className:"mobile-header-btn",onClick:()=>ke(!0),"aria-label":e("sidebar.openMenu"),children:i.jsx(Xx,{size:18})}),i.jsx("span",{className:"mobile-header-channel",children:s?((St=I.find(O=>O.peerId===s))==null?void 0:St.peerNick)||"DM":`#${n}`}),i.jsx("button",{className:"mobile-header-btn",onClick:()=>k(O=>!O),"aria-label":e("users.togglePanel"),children:i.jsx(Zi,{size:18})})]}),i.jsx(k1,{status:z.status,reconnectIn:z.reconnectIn}),((It=z.serverInfo)==null?void 0:It.motd)&&i.jsx(m1,{motd:z.serverInfo.motd}),c&&i.jsx("div",{className:"app-error",children:c}),i.jsxs("div",{className:"app-chat-row",children:[v&&i.jsx(b1,{onSearch:z.search,onClose:Ae,results:z.searchResults,activeChannel:n}),M&&i.jsx(N1,{messages:z.pinnedMessages,onRequestPins:z.requestPins,onUnpin:A?z.unpinMessage:void 0,onClose:()=>j(!1),activeChannel:n,canModerate:A}),b&&i.jsx(E1,{bookmarks:qe,onRemove:le,onClose:()=>C(!1)}),i.jsx(n1,{messages:s?J:z.messages,activeChannel:n,channelTopic:Ce==null?void 0:Ce.topic,currentUserId:((Mt=z.serverInfo)==null?void 0:Mt.userId)||"",currentRole:(Lt=z.serverInfo)==null?void 0:Lt.role,typingUsers:z.typingUsers,dmMode:s?{peerId:s,peerNick:((Bc=I.find(O=>O.peerId===s))==null?void 0:Bc.peerNick)||s.slice(0,8)}:void 0,onSendMessage:s?(O,B)=>z.sendDM(s,B):H,onSlashCommand:s?void 0:p,onTyping:()=>s?z.sendTyping("",s):z.sendTyping(n),onSearchOpen:T,onReact:z.addReaction,onRemoveReact:z.removeReaction,onEdit:z.editMessage,onDelete:z.deleteMessage,onPin:O=>z.pinMessage(O,n),onReply:R,replyTo:Ht,onCancelReply:()=>yn(null),onLoadHistory:z.loadHistory,historyLoading:z.historyLoading,hasMoreHistory:z.hasMoreHistory,onFileUpload:V?he:void 0,canUpload:V,users:z.users,onPinsOpen:()=>j(O=>!O),onBookmarksOpen:()=>C(O=>!O),onBookmark:re,isBookmarked:To,onChannelSettings:()=>L(!0),onImageClick:wt,lastReadMessageId:dn[n],pinnedMessageIds:z.pinnedMessages.map(O=>O.id),onQuote:se,quotedText:de,onQuoteClear:()=>te(""),onThreadOpen:jt,onForward:je}),ft&&(()=>{var ae,pe;const O=z.messages.find(Oe=>Oe.id===ft);if(!O)return null;const B=z.messages.filter(Oe=>Oe.replyTo===ft);return i.jsx(O1,{rootMessage:O,replies:B,currentUserId:((ae=z.serverInfo)==null?void 0:ae.userId)||"",currentRole:(pe=z.serverInfo)==null?void 0:pe.role,onClose:()=>jt(null),onReact:z.addReaction,onRemoveReact:z.removeReaction,onEdit:z.editMessage,onDelete:z.deleteMessage,onBookmark:re,isBookmarked:To,onImageClick:wt})})(),i.jsx("button",{className:"panel-toggle",onClick:()=>k(O=>!O),title:m?"Hide panel":"Show panel","aria-label":m?"Hide panel":"Show panel",children:m?i.jsx(t0,{size:16}):i.jsx(n0,{size:16})})]})]}),i.jsxs("div",{className:`app-right-panel ${m?"open":"closed"}`,children:[i.jsx(s1,{users:z.users,currentUserId:(Hc=z.serverInfo)==null?void 0:Hc.userId,currentRole:(Vc=z.serverInfo)==null?void 0:Vc.role,onKick:z.kickUser,onBan:z.banUser,onOp:O=>z.setUserRole(O,"operator"),onDeop:O=>z.setUserRole(O,"member"),onDM:Vt}),i.jsx(h1,{serverAddress:o,identity:t,canUpload:V,canDownload:ve})]}),g&&i.jsx(v1,{onSubmit:h,onClose:()=>N(!1)}),E&&Ce&&i.jsx(z1,{channel:Ce,onSetTopic:z.setTopic,onClose:()=>L(!1),canEdit:A}),_&&i.jsx(M1,{onClose:()=>D(!1)}),q&&z.serverInfo&&i.jsx(L1,{serverName:z.serverInfo.name,motd:z.serverInfo.motd,onUpdateSettings:z.updateServerSettings,onRequestBanList:z.requestBanList,onUnban:z.unbanUser,onClose:()=>Te(!1)}),ge&&i.jsx(T1,{channelName:ge,onSubmit:ro,onCancel:()=>Be(null)}),dt&&i.jsx(R1,{src:dt,onClose:()=>wt(null)}),K&&i.jsx(D1,{onClose:()=>ie(!1)}),me&&i.jsx(U1,{messages:z.messages,userCount:z.users.length,channelCount:z.channels.length,serverName:((Kc=z.serverInfo)==null?void 0:Kc.name)||e("app.name"),onClose:()=>De(!1)}),fe&&i.jsx($1,{messageContent:fe.content,messageAuthor:fe.author,channels:z.channels,currentChannel:n,onForward:we,onClose:()=>Ze(null)}),et&&i.jsx(B1,{emojis:Ot,onUpload:Me,onDelete:ze,onClose:()=>Pt(!1)}),nn&&i.jsx(V1,{filters:H1(),channels:z.channels.map(O=>O.name),users:z.users,onChange:O=>{Ch(O)},onClose:()=>qt(!1)}),Xt&&i.jsx(W1,{activeChannel:n,scheduledMessages:_t,onSchedule:Se,onDelete:Ee,onClose:()=>rn(!1)}),i.jsx(P1,{onDrop:V?he:()=>{},enabled:V}),i.jsx(X1,{toasts:In,onDismiss:fn}),i.jsx("style",{children:`
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
      `})]})}const Ie=e=>typeof e=="string",Ls=()=>{let e,t;const n=new Promise((r,s)=>{e=r,t=s});return n.resolve=e,n.reject=t,n},pd=e=>e==null?"":""+e,dv=(e,t,n)=>{e.forEach(r=>{t[r]&&(n[r]=t[r])})},fv=/###/g,hd=e=>e&&e.indexOf("###")>-1?e.replace(fv,"."):e,md=e=>!e||Ie(e),Js=(e,t,n)=>{const r=Ie(t)?t.split("."):t;let s=0;for(;s<r.length-1;){if(md(e))return{};const a=hd(r[s]);!e[a]&&n&&(e[a]=new n),Object.prototype.hasOwnProperty.call(e,a)?e=e[a]:e={},++s}return md(e)?{}:{obj:e,k:hd(r[s])}},gd=(e,t,n)=>{const{obj:r,k:s}=Js(e,t,Object);if(r!==void 0||t.length===1){r[s]=n;return}let a=t[t.length-1],o=t.slice(0,t.length-1),u=Js(e,o,Object);for(;u.obj===void 0&&o.length;)a=`${o[o.length-1]}.${a}`,o=o.slice(0,o.length-1),u=Js(e,o,Object),u&&u.obj&&typeof u.obj[`${u.k}.${a}`]<"u"&&(u.obj=void 0);u.obj[`${u.k}.${a}`]=n},pv=(e,t,n,r)=>{const{obj:s,k:a}=Js(e,t,Object);s[a]=s[a]||[],s[a].push(n)},Mi=(e,t)=>{const{obj:n,k:r}=Js(e,t);if(n)return n[r]},hv=(e,t,n)=>{const r=Mi(e,n);return r!==void 0?r:Mi(t,n)},Lh=(e,t,n)=>{for(const r in t)r!=="__proto__"&&r!=="constructor"&&(r in e?Ie(e[r])||e[r]instanceof String||Ie(t[r])||t[r]instanceof String?n&&(e[r]=t[r]):Lh(e[r],t[r],n):e[r]=t[r]);return e},Wr=e=>e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");var mv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};const gv=e=>Ie(e)?e.replace(/[&<>"'\/]/g,t=>mv[t]):e;class xv{constructor(t){this.capacity=t,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(t){const n=this.regExpMap.get(t);if(n!==void 0)return n;const r=new RegExp(t);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(t,r),this.regExpQueue.push(t),r}}const vv=[" ",",","?","!",";"],yv=new xv(20),bv=(e,t,n)=>{t=t||"",n=n||"";const r=vv.filter(o=>t.indexOf(o)<0&&n.indexOf(o)<0);if(r.length===0)return!0;const s=yv.getRegExp(`(${r.map(o=>o==="?"?"\\?":o).join("|")})`);let a=!s.test(e);if(!a){const o=e.indexOf(n);o>0&&!s.test(e.substring(0,o))&&(a=!0)}return a},Al=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:".";if(!e)return;if(e[t])return e[t];const r=t.split(n);let s=e;for(let a=0;a<r.length;){if(!s||typeof s!="object")return;let o,u="";for(let c=a;c<r.length;++c)if(c!==a&&(u+=n),u+=r[c],o=s[u],o!==void 0){if(["string","number","boolean"].indexOf(typeof o)>-1&&c<r.length-1)continue;a+=c-a+1;break}s=o}return s},Li=e=>e&&e.replace("_","-"),kv={type:"logger",log(e){this.output("log",e)},warn(e){this.output("warn",e)},error(e){this.output("error",e)},output(e,t){console&&console[e]&&console[e].apply(console,t)}};class Ti{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.init(t,n)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.prefix=n.prefix||"i18next:",this.logger=t||kv,this.options=n,this.debug=n.debug}log(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"log","",!0)}warn(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","",!0)}error(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"error","")}deprecate(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return this.forward(n,"warn","WARNING DEPRECATED: ",!0)}forward(t,n,r,s){return s&&!this.debug?null:(Ie(t[0])&&(t[0]=`${r}${this.prefix} ${t[0]}`),this.logger[n](t))}create(t){return new Ti(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t=t||this.options,t.prefix=t.prefix||this.prefix,new Ti(this.logger,t)}}var Yn=new Ti;class no{constructor(){this.observers={}}on(t,n){return t.split(" ").forEach(r=>{this.observers[r]||(this.observers[r]=new Map);const s=this.observers[r].get(n)||0;this.observers[r].set(n,s+1)}),this}off(t,n){if(this.observers[t]){if(!n){delete this.observers[t];return}this.observers[t].delete(n)}}emit(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];this.observers[t]&&Array.from(this.observers[t].entries()).forEach(o=>{let[u,c]=o;for(let f=0;f<c;f++)u(...r)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(o=>{let[u,c]=o;for(let f=0;f<c;f++)u.apply(u,[t,...r])})}}class xd extends no{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{ns:["translation"],defaultNS:"translation"};super(),this.data=t||{},this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(t){this.options.ns.indexOf(t)<0&&this.options.ns.push(t)}removeNamespaces(t){const n=this.options.ns.indexOf(t);n>-1&&this.options.ns.splice(n,1)}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=s.keySeparator!==void 0?s.keySeparator:this.options.keySeparator,o=s.ignoreJSONStructure!==void 0?s.ignoreJSONStructure:this.options.ignoreJSONStructure;let u;t.indexOf(".")>-1?u=t.split("."):(u=[t,n],r&&(Array.isArray(r)?u.push(...r):Ie(r)&&a?u.push(...r.split(a)):u.push(r)));const c=Mi(this.data,u);return!c&&!n&&!r&&t.indexOf(".")>-1&&(t=u[0],n=u[1],r=u.slice(2).join(".")),c||!o||!Ie(r)?c:Al(this.data&&this.data[t]&&this.data[t][n],r,a)}addResource(t,n,r,s){let a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{silent:!1};const o=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator;let u=[t,n];r&&(u=u.concat(o?r.split(o):r)),t.indexOf(".")>-1&&(u=t.split("."),s=n,n=u[1]),this.addNamespaces(n),gd(this.data,u,s),a.silent||this.emit("added",t,n,r,s)}addResources(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{silent:!1};for(const a in r)(Ie(r[a])||Array.isArray(r[a]))&&this.addResource(t,n,a,r[a],{silent:!0});s.silent||this.emit("added",t,n,r)}addResourceBundle(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{silent:!1,skipCopy:!1},u=[t,n];t.indexOf(".")>-1&&(u=t.split("."),s=r,r=n,n=u[1]),this.addNamespaces(n);let c=Mi(this.data,u)||{};o.skipCopy||(r=JSON.parse(JSON.stringify(r))),s?Lh(c,r,a):c={...c,...r},gd(this.data,u,c),o.silent||this.emit("added",t,n,r)}removeResourceBundle(t,n){this.hasResourceBundle(t,n)&&delete this.data[t][n],this.removeNamespaces(n),this.emit("removed",t,n)}hasResourceBundle(t,n){return this.getResource(t,n)!==void 0}getResourceBundle(t,n){return n||(n=this.options.defaultNS),this.options.compatibilityAPI==="v1"?{...this.getResource(t,n)}:this.getResource(t,n)}getDataByLanguage(t){return this.data[t]}hasLanguageSomeTranslations(t){const n=this.getDataByLanguage(t);return!!(n&&Object.keys(n)||[]).find(s=>n[s]&&Object.keys(n[s]).length>0)}toJSON(){return this.data}}var Th={processors:{},addPostProcessor(e){this.processors[e.name]=e},handle(e,t,n,r,s){return e.forEach(a=>{this.processors[a]&&(t=this.processors[a].process(t,n,r,s))}),t}};const vd={};class Ri extends no{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};super(),dv(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],t,this),this.options=n,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=Yn.create("translator")}changeLanguage(t){t&&(this.language=t)}exists(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};if(t==null)return!1;const r=this.resolve(t,n);return r&&r.res!==void 0}extractFromKey(t,n){let r=n.nsSeparator!==void 0?n.nsSeparator:this.options.nsSeparator;r===void 0&&(r=":");const s=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let a=n.ns||this.options.defaultNS||[];const o=r&&t.indexOf(r)>-1,u=!this.options.userDefinedKeySeparator&&!n.keySeparator&&!this.options.userDefinedNsSeparator&&!n.nsSeparator&&!bv(t,r,s);if(o&&!u){const c=t.match(this.interpolator.nestingRegexp);if(c&&c.length>0)return{key:t,namespaces:Ie(a)?[a]:a};const f=t.split(r);(r!==s||r===s&&this.options.ns.indexOf(f[0])>-1)&&(a=f.shift()),t=f.join(s)}return{key:t,namespaces:Ie(a)?[a]:a}}translate(t,n,r){if(typeof n!="object"&&this.options.overloadTranslationOptionHandler&&(n=this.options.overloadTranslationOptionHandler(arguments)),typeof n=="object"&&(n={...n}),n||(n={}),t==null)return"";Array.isArray(t)||(t=[String(t)]);const s=n.returnDetails!==void 0?n.returnDetails:this.options.returnDetails,a=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator,{key:o,namespaces:u}=this.extractFromKey(t[t.length-1],n),c=u[u.length-1],f=n.lng||this.language,m=n.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(f&&f.toLowerCase()==="cimode"){if(m){const E=n.nsSeparator||this.options.nsSeparator;return s?{res:`${c}${E}${o}`,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:`${c}${E}${o}`}return s?{res:o,usedKey:o,exactUsedKey:o,usedLng:f,usedNS:c,usedParams:this.getUsedParamsDetails(n)}:o}const k=this.resolve(t,n);let g=k&&k.res;const N=k&&k.usedKey||o,v=k&&k.exactUsedKey||o,w=Object.prototype.toString.apply(g),M=["[object Number]","[object Function]","[object RegExp]"],j=n.joinArrays!==void 0?n.joinArrays:this.options.joinArrays,b=!this.i18nFormat||this.i18nFormat.handleAsObject,C=!Ie(g)&&typeof g!="boolean"&&typeof g!="number";if(b&&g&&C&&M.indexOf(w)<0&&!(Ie(j)&&Array.isArray(g))){if(!n.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const E=this.options.returnedObjectHandler?this.options.returnedObjectHandler(N,g,{...n,ns:u}):`key '${o} (${this.language})' returned an object instead of string.`;return s?(k.res=E,k.usedParams=this.getUsedParamsDetails(n),k):E}if(a){const E=Array.isArray(g),L=E?[]:{},_=E?v:N;for(const D in g)if(Object.prototype.hasOwnProperty.call(g,D)){const q=`${_}${a}${D}`;L[D]=this.translate(q,{...n,joinArrays:!1,ns:u}),L[D]===q&&(L[D]=g[D])}g=L}}else if(b&&Ie(j)&&Array.isArray(g))g=g.join(j),g&&(g=this.extendTranslation(g,t,n,r));else{let E=!1,L=!1;const _=n.count!==void 0&&!Ie(n.count),D=Ri.hasDefaultValue(n),q=_?this.pluralResolver.getSuffix(f,n.count,n):"",Te=n.ordinal&&_?this.pluralResolver.getSuffix(f,n.count,{ordinal:!1}):"",ge=_&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),Be=ge&&n[`defaultValue${this.options.pluralSeparator}zero`]||n[`defaultValue${q}`]||n[`defaultValue${Te}`]||n.defaultValue;!this.isValidLookup(g)&&D&&(E=!0,g=Be),this.isValidLookup(g)||(L=!0,g=o);const wt=(n.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&L?void 0:g,ft=D&&Be!==g&&this.options.updateMissing;if(L||E||ft){if(this.logger.log(ft?"updateKey":"missingKey",f,c,o,ft?Be:g),a){const K=this.resolve(o,{...n,keySeparator:!1});K&&K.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let jt=[];const qe=this.languageUtils.getFallbackCodes(this.options.fallbackLng,n.lng||this.language);if(this.options.saveMissingTo==="fallback"&&qe&&qe[0])for(let K=0;K<qe.length;K++)jt.push(qe[K]);else this.options.saveMissingTo==="all"?jt=this.languageUtils.toResolveHierarchy(n.lng||this.language):jt.push(n.lng||this.language);const pt=(K,ie,me)=>{const De=D&&me!==g?me:wt;this.options.missingKeyHandler?this.options.missingKeyHandler(K,c,ie,De,ft,n):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(K,c,ie,De,ft,n),this.emit("missingKey",K,c,ie,g)};this.options.saveMissing&&(this.options.saveMissingPlurals&&_?jt.forEach(K=>{const ie=this.pluralResolver.getSuffixes(K,n);ge&&n[`defaultValue${this.options.pluralSeparator}zero`]&&ie.indexOf(`${this.options.pluralSeparator}zero`)<0&&ie.push(`${this.options.pluralSeparator}zero`),ie.forEach(me=>{pt([K],o+me,n[`defaultValue${me}`]||Be)})}):pt(jt,o,Be))}g=this.extendTranslation(g,t,n,k,r),L&&g===o&&this.options.appendNamespaceToMissingKey&&(g=`${c}:${o}`),(L||E)&&this.options.parseMissingKeyHandler&&(this.options.compatibilityAPI!=="v1"?g=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}:${o}`:o,E?g:void 0):g=this.options.parseMissingKeyHandler(g))}return s?(k.res=g,k.usedParams=this.getUsedParamsDetails(n),k):g}extendTranslation(t,n,r,s,a){var o=this;if(this.i18nFormat&&this.i18nFormat.parse)t=this.i18nFormat.parse(t,{...this.options.interpolation.defaultVariables,...r},r.lng||this.language||s.usedLng,s.usedNS,s.usedKey,{resolved:s});else if(!r.skipInterpolation){r.interpolation&&this.interpolator.init({...r,interpolation:{...this.options.interpolation,...r.interpolation}});const f=Ie(t)&&(r&&r.interpolation&&r.interpolation.skipOnVariables!==void 0?r.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let m;if(f){const g=t.match(this.interpolator.nestingRegexp);m=g&&g.length}let k=r.replace&&!Ie(r.replace)?r.replace:r;if(this.options.interpolation.defaultVariables&&(k={...this.options.interpolation.defaultVariables,...k}),t=this.interpolator.interpolate(t,k,r.lng||this.language||s.usedLng,r),f){const g=t.match(this.interpolator.nestingRegexp),N=g&&g.length;m<N&&(r.nest=!1)}!r.lng&&this.options.compatibilityAPI!=="v1"&&s&&s.res&&(r.lng=this.language||s.usedLng),r.nest!==!1&&(t=this.interpolator.nest(t,function(){for(var g=arguments.length,N=new Array(g),v=0;v<g;v++)N[v]=arguments[v];return a&&a[0]===N[0]&&!r.context?(o.logger.warn(`It seems you are nesting recursively key: ${N[0]} in key: ${n[0]}`),null):o.translate(...N,n)},r)),r.interpolation&&this.interpolator.reset()}const u=r.postProcess||this.options.postProcess,c=Ie(u)?[u]:u;return t!=null&&c&&c.length&&r.applyPostProcessor!==!1&&(t=Th.handle(c,t,n,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...s,usedParams:this.getUsedParamsDetails(r)},...r}:r,this)),t}resolve(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r,s,a,o,u;return Ie(t)&&(t=[t]),t.forEach(c=>{if(this.isValidLookup(r))return;const f=this.extractFromKey(c,n),m=f.key;s=m;let k=f.namespaces;this.options.fallbackNS&&(k=k.concat(this.options.fallbackNS));const g=n.count!==void 0&&!Ie(n.count),N=g&&!n.ordinal&&n.count===0&&this.pluralResolver.shouldUseIntlApi(),v=n.context!==void 0&&(Ie(n.context)||typeof n.context=="number")&&n.context!=="",w=n.lngs?n.lngs:this.languageUtils.toResolveHierarchy(n.lng||this.language,n.fallbackLng);k.forEach(M=>{this.isValidLookup(r)||(u=M,!vd[`${w[0]}-${M}`]&&this.utils&&this.utils.hasLoadedNamespace&&!this.utils.hasLoadedNamespace(u)&&(vd[`${w[0]}-${M}`]=!0,this.logger.warn(`key "${s}" for languages "${w.join(", ")}" won't get resolved as namespace "${u}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),w.forEach(j=>{if(this.isValidLookup(r))return;o=j;const b=[m];if(this.i18nFormat&&this.i18nFormat.addLookupKeys)this.i18nFormat.addLookupKeys(b,m,j,M,n);else{let E;g&&(E=this.pluralResolver.getSuffix(j,n.count,n));const L=`${this.options.pluralSeparator}zero`,_=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(g&&(b.push(m+E),n.ordinal&&E.indexOf(_)===0&&b.push(m+E.replace(_,this.options.pluralSeparator)),N&&b.push(m+L)),v){const D=`${m}${this.options.contextSeparator}${n.context}`;b.push(D),g&&(b.push(D+E),n.ordinal&&E.indexOf(_)===0&&b.push(D+E.replace(_,this.options.pluralSeparator)),N&&b.push(D+L))}}let C;for(;C=b.pop();)this.isValidLookup(r)||(a=C,r=this.getResource(j,M,C,n))}))})}),{res:r,usedKey:s,exactUsedKey:a,usedLng:o,usedNS:u}}isValidLookup(t){return t!==void 0&&!(!this.options.returnNull&&t===null)&&!(!this.options.returnEmptyString&&t==="")}getResource(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};return this.i18nFormat&&this.i18nFormat.getResource?this.i18nFormat.getResource(t,n,r,s):this.resourceStore.getResource(t,n,r,s)}getUsedParamsDetails(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],r=t.replace&&!Ie(t.replace);let s=r?t.replace:t;if(r&&typeof t.count<"u"&&(s.count=t.count),this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),!r){s={...s};for(const a of n)delete s[a]}return s}static hasDefaultValue(t){const n="defaultValue";for(const r in t)if(Object.prototype.hasOwnProperty.call(t,r)&&n===r.substring(0,n.length)&&t[r]!==void 0)return!0;return!1}}const Oo=e=>e.charAt(0).toUpperCase()+e.slice(1);class yd{constructor(t){this.options=t,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Yn.create("languageUtils")}getScriptPartFromCode(t){if(t=Li(t),!t||t.indexOf("-")<0)return null;const n=t.split("-");return n.length===2||(n.pop(),n[n.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(n.join("-"))}getLanguagePartFromCode(t){if(t=Li(t),!t||t.indexOf("-")<0)return t;const n=t.split("-");return this.formatLanguageCode(n[0])}formatLanguageCode(t){if(Ie(t)&&t.indexOf("-")>-1){if(typeof Intl<"u"&&typeof Intl.getCanonicalLocales<"u")try{let s=Intl.getCanonicalLocales(t)[0];if(s&&this.options.lowerCaseLng&&(s=s.toLowerCase()),s)return s}catch{}const n=["hans","hant","latn","cyrl","cans","mong","arab"];let r=t.split("-");return this.options.lowerCaseLng?r=r.map(s=>s.toLowerCase()):r.length===2?(r[0]=r[0].toLowerCase(),r[1]=r[1].toUpperCase(),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Oo(r[1].toLowerCase()))):r.length===3&&(r[0]=r[0].toLowerCase(),r[1].length===2&&(r[1]=r[1].toUpperCase()),r[0]!=="sgn"&&r[2].length===2&&(r[2]=r[2].toUpperCase()),n.indexOf(r[1].toLowerCase())>-1&&(r[1]=Oo(r[1].toLowerCase())),n.indexOf(r[2].toLowerCase())>-1&&(r[2]=Oo(r[2].toLowerCase()))),r.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?t.toLowerCase():t}isSupportedCode(t){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(t=this.getLanguagePartFromCode(t)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.indexOf(t)>-1}getBestMatchFromCodes(t){if(!t)return null;let n;return t.forEach(r=>{if(n)return;const s=this.formatLanguageCode(r);(!this.options.supportedLngs||this.isSupportedCode(s))&&(n=s)}),!n&&this.options.supportedLngs&&t.forEach(r=>{if(n)return;const s=this.getLanguagePartFromCode(r);if(this.isSupportedCode(s))return n=s;n=this.options.supportedLngs.find(a=>{if(a===s)return a;if(!(a.indexOf("-")<0&&s.indexOf("-")<0)&&(a.indexOf("-")>0&&s.indexOf("-")<0&&a.substring(0,a.indexOf("-"))===s||a.indexOf(s)===0&&s.length>1))return a})}),n||(n=this.getFallbackCodes(this.options.fallbackLng)[0]),n}getFallbackCodes(t,n){if(!t)return[];if(typeof t=="function"&&(t=t(n)),Ie(t)&&(t=[t]),Array.isArray(t))return t;if(!n)return t.default||[];let r=t[n];return r||(r=t[this.getScriptPartFromCode(n)]),r||(r=t[this.formatLanguageCode(n)]),r||(r=t[this.getLanguagePartFromCode(n)]),r||(r=t.default),r||[]}toResolveHierarchy(t,n){const r=this.getFallbackCodes(n||this.options.fallbackLng||[],t),s=[],a=o=>{o&&(this.isSupportedCode(o)?s.push(o):this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`))};return Ie(t)&&(t.indexOf("-")>-1||t.indexOf("_")>-1)?(this.options.load!=="languageOnly"&&a(this.formatLanguageCode(t)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&a(this.getScriptPartFromCode(t)),this.options.load!=="currentOnly"&&a(this.getLanguagePartFromCode(t))):Ie(t)&&a(this.formatLanguageCode(t)),r.forEach(o=>{s.indexOf(o)<0&&a(this.formatLanguageCode(o))}),s}}let wv=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","pt","pt-BR","tg","tl","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","et","eu","fi","fo","fur","fy","gl","gu","ha","hi","hu","hy","ia","it","kk","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt-PT","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","ht","id","ja","jbo","ka","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","cnr","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21},{lngs:["he","iw"],nr:[1,2,20,21],fc:22}],jv={1:e=>+(e>1),2:e=>+(e!=1),3:e=>0,4:e=>e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,5:e=>e==0?0:e==1?1:e==2?2:e%100>=3&&e%100<=10?3:e%100>=11?4:5,6:e=>e==1?0:e>=2&&e<=4?1:2,7:e=>e==1?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2,8:e=>e==1?0:e==2?1:e!=8&&e!=11?2:3,9:e=>+(e>=2),10:e=>e==1?0:e==2?1:e<7?2:e<11?3:4,11:e=>e==1||e==11?0:e==2||e==12?1:e>2&&e<20?2:3,12:e=>+(e%10!=1||e%100==11),13:e=>+(e!==0),14:e=>e==1?0:e==2?1:e==3?2:3,15:e=>e%10==1&&e%100!=11?0:e%10>=2&&(e%100<10||e%100>=20)?1:2,16:e=>e%10==1&&e%100!=11?0:e!==0?1:2,17:e=>e==1||e%10==1&&e%100!=11?0:1,18:e=>e==0?0:e==1?1:2,19:e=>e==1?0:e==0||e%100>1&&e%100<11?1:e%100>10&&e%100<20?2:3,20:e=>e==1?0:e==0||e%100>0&&e%100<20?1:2,21:e=>e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0,22:e=>e==1?0:e==2?1:(e<0||e>10)&&e%10==0?2:3};const Sv=["v1","v2","v3"],Nv=["v4"],bd={zero:0,one:1,two:2,few:3,many:4,other:5},Cv=()=>{const e={};return wv.forEach(t=>{t.lngs.forEach(n=>{e[n]={numbers:t.nr,plurals:jv[t.fc]}})}),e};class Ev{constructor(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.languageUtils=t,this.options=n,this.logger=Yn.create("pluralResolver"),(!this.options.compatibilityJSON||Nv.includes(this.options.compatibilityJSON))&&(typeof Intl>"u"||!Intl.PluralRules)&&(this.options.compatibilityJSON="v3",this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),this.rules=Cv(),this.pluralRulesCache={}}addRule(t,n){this.rules[t]=n}clearCache(){this.pluralRulesCache={}}getRule(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(this.shouldUseIntlApi()){const r=Li(t==="dev"?"en":t),s=n.ordinal?"ordinal":"cardinal",a=JSON.stringify({cleanedCode:r,type:s});if(a in this.pluralRulesCache)return this.pluralRulesCache[a];let o;try{o=new Intl.PluralRules(r,{type:s})}catch{if(!t.match(/-|_/))return;const c=this.languageUtils.getLanguagePartFromCode(t);o=this.getRule(c,n)}return this.pluralRulesCache[a]=o,o}return this.rules[t]||this.rules[this.languageUtils.getLanguagePartFromCode(t)]}needsPlural(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return this.shouldUseIntlApi()?r&&r.resolvedOptions().pluralCategories.length>1:r&&r.numbers.length>1}getPluralFormsOfKey(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return this.getSuffixes(t,r).map(s=>`${n}${s}`)}getSuffixes(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const r=this.getRule(t,n);return r?this.shouldUseIntlApi()?r.resolvedOptions().pluralCategories.sort((s,a)=>bd[s]-bd[a]).map(s=>`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:""}${s}`):r.numbers.map(s=>this.getSuffix(t,s,n)):[]}getSuffix(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=this.getRule(t,r);return s?this.shouldUseIntlApi()?`${this.options.prepend}${r.ordinal?`ordinal${this.options.prepend}`:""}${s.select(n)}`:this.getSuffixRetroCompatible(s,n):(this.logger.warn(`no plural rule found for: ${t}`),"")}getSuffixRetroCompatible(t,n){const r=t.noAbs?t.plurals(n):t.plurals(Math.abs(n));let s=t.numbers[r];this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1&&(s===2?s="plural":s===1&&(s=""));const a=()=>this.options.prepend&&s.toString()?this.options.prepend+s.toString():s.toString();return this.options.compatibilityJSON==="v1"?s===1?"":typeof s=="number"?`_plural_${s.toString()}`:a():this.options.compatibilityJSON==="v2"||this.options.simplifyPluralSuffix&&t.numbers.length===2&&t.numbers[0]===1?a():this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}shouldUseIntlApi(){return!Sv.includes(this.options.compatibilityJSON)}}const kd=function(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:".",s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:!0,a=hv(e,t,n);return!a&&s&&Ie(n)&&(a=Al(e,n,r),a===void 0&&(a=Al(t,n,r))),a},_o=e=>e.replace(/\$/g,"$$$$");class zv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Yn.create("interpolator"),this.options=t,this.format=t.interpolation&&t.interpolation.format||(n=>n),this.init(t)}init(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};t.interpolation||(t.interpolation={escapeValue:!0});const{escape:n,escapeValue:r,useRawValueToEscape:s,prefix:a,prefixEscaped:o,suffix:u,suffixEscaped:c,formatSeparator:f,unescapeSuffix:m,unescapePrefix:k,nestingPrefix:g,nestingPrefixEscaped:N,nestingSuffix:v,nestingSuffixEscaped:w,nestingOptionsSeparator:M,maxReplaces:j,alwaysFormat:b}=t.interpolation;this.escape=n!==void 0?n:gv,this.escapeValue=r!==void 0?r:!0,this.useRawValueToEscape=s!==void 0?s:!1,this.prefix=a?Wr(a):o||"{{",this.suffix=u?Wr(u):c||"}}",this.formatSeparator=f||",",this.unescapePrefix=m?"":k||"-",this.unescapeSuffix=this.unescapePrefix?"":m||"",this.nestingPrefix=g?Wr(g):N||Wr("$t("),this.nestingSuffix=v?Wr(v):w||Wr(")"),this.nestingOptionsSeparator=M||",",this.maxReplaces=j||1e3,this.alwaysFormat=b!==void 0?b:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const t=(n,r)=>n&&n.source===r?(n.lastIndex=0,n):new RegExp(r,"g");this.regexp=t(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=t(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=t(this.nestingRegexp,`${this.nestingPrefix}(.+?)${this.nestingSuffix}`)}interpolate(t,n,r,s){let a,o,u;const c=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},f=N=>{if(N.indexOf(this.formatSeparator)<0){const j=kd(n,c,N,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(j,void 0,r,{...s,...n,interpolationkey:N}):j}const v=N.split(this.formatSeparator),w=v.shift().trim(),M=v.join(this.formatSeparator).trim();return this.format(kd(n,c,w,this.options.keySeparator,this.options.ignoreJSONStructure),M,r,{...s,...n,interpolationkey:w})};this.resetRegExp();const m=s&&s.missingInterpolationHandler||this.options.missingInterpolationHandler,k=s&&s.interpolation&&s.interpolation.skipOnVariables!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:N=>_o(N)},{regex:this.regexp,safeValue:N=>this.escapeValue?_o(this.escape(N)):_o(N)}].forEach(N=>{for(u=0;a=N.regex.exec(t);){const v=a[1].trim();if(o=f(v),o===void 0)if(typeof m=="function"){const M=m(t,a,s);o=Ie(M)?M:""}else if(s&&Object.prototype.hasOwnProperty.call(s,v))o="";else if(k){o=a[0];continue}else this.logger.warn(`missed to pass in variable ${v} for interpolating ${t}`),o="";else!Ie(o)&&!this.useRawValueToEscape&&(o=pd(o));const w=N.safeValue(o);if(t=t.replace(a[0],w),k?(N.regex.lastIndex+=o.length,N.regex.lastIndex-=a[0].length):N.regex.lastIndex=0,u++,u>=this.maxReplaces)break}}),t}nest(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s,a,o;const u=(c,f)=>{const m=this.nestingOptionsSeparator;if(c.indexOf(m)<0)return c;const k=c.split(new RegExp(`${m}[ ]*{`));let g=`{${k[1]}`;c=k[0],g=this.interpolate(g,o);const N=g.match(/'/g),v=g.match(/"/g);(N&&N.length%2===0&&!v||v.length%2!==0)&&(g=g.replace(/'/g,'"'));try{o=JSON.parse(g),f&&(o={...f,...o})}catch(w){return this.logger.warn(`failed parsing options string in nesting for key ${c}`,w),`${c}${m}${g}`}return o.defaultValue&&o.defaultValue.indexOf(this.prefix)>-1&&delete o.defaultValue,c};for(;s=this.nestingRegexp.exec(t);){let c=[];o={...r},o=o.replace&&!Ie(o.replace)?o.replace:o,o.applyPostProcessor=!1,delete o.defaultValue;let f=!1;if(s[0].indexOf(this.formatSeparator)!==-1&&!/{.*}/.test(s[1])){const m=s[1].split(this.formatSeparator).map(k=>k.trim());s[1]=m.shift(),c=m,f=!0}if(a=n(u.call(this,s[1].trim(),o),o),a&&s[0]===t&&!Ie(a))return a;Ie(a)||(a=pd(a)),a||(this.logger.warn(`missed to resolve ${s[1]} for nesting ${t}`),a=""),f&&(a=c.reduce((m,k)=>this.format(m,k,r.lng,{...r,interpolationkey:s[1].trim()}),a.trim())),t=t.replace(s[0],a),this.regexp.lastIndex=0}return t}}const Pv=e=>{let t=e.toLowerCase().trim();const n={};if(e.indexOf("(")>-1){const r=e.split("(");t=r[0].toLowerCase().trim();const s=r[1].substring(0,r[1].length-1);t==="currency"&&s.indexOf(":")<0?n.currency||(n.currency=s.trim()):t==="relativetime"&&s.indexOf(":")<0?n.range||(n.range=s.trim()):s.split(";").forEach(o=>{if(o){const[u,...c]=o.split(":"),f=c.join(":").trim().replace(/^'+|'+$/g,""),m=u.trim();n[m]||(n[m]=f),f==="false"&&(n[m]=!1),f==="true"&&(n[m]=!0),isNaN(f)||(n[m]=parseInt(f,10))}})}return{formatName:t,formatOptions:n}},Yr=e=>{const t={};return(n,r,s)=>{let a=s;s&&s.interpolationkey&&s.formatParams&&s.formatParams[s.interpolationkey]&&s[s.interpolationkey]&&(a={...a,[s.interpolationkey]:void 0});const o=r+JSON.stringify(a);let u=t[o];return u||(u=e(Li(r),s),t[o]=u),u(n)}};class Iv{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};this.logger=Yn.create("formatter"),this.options=t,this.formats={number:Yr((n,r)=>{const s=new Intl.NumberFormat(n,{...r});return a=>s.format(a)}),currency:Yr((n,r)=>{const s=new Intl.NumberFormat(n,{...r,style:"currency"});return a=>s.format(a)}),datetime:Yr((n,r)=>{const s=new Intl.DateTimeFormat(n,{...r});return a=>s.format(a)}),relativetime:Yr((n,r)=>{const s=new Intl.RelativeTimeFormat(n,{...r});return a=>s.format(a,r.range||"day")}),list:Yr((n,r)=>{const s=new Intl.ListFormat(n,{...r});return a=>s.format(a)})},this.init(t)}init(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{interpolation:{}};this.formatSeparator=n.interpolation.formatSeparator||","}add(t,n){this.formats[t.toLowerCase().trim()]=n}addCached(t,n){this.formats[t.toLowerCase().trim()]=Yr(n)}format(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const a=n.split(this.formatSeparator);if(a.length>1&&a[0].indexOf("(")>1&&a[0].indexOf(")")<0&&a.find(u=>u.indexOf(")")>-1)){const u=a.findIndex(c=>c.indexOf(")")>-1);a[0]=[a[0],...a.splice(1,u)].join(this.formatSeparator)}return a.reduce((u,c)=>{const{formatName:f,formatOptions:m}=Pv(c);if(this.formats[f]){let k=u;try{const g=s&&s.formatParams&&s.formatParams[s.interpolationkey]||{},N=g.locale||g.lng||s.locale||s.lng||r;k=this.formats[f](u,N,{...m,...s,...g})}catch(g){this.logger.warn(g)}return k}else this.logger.warn(`there was no format function for ${f}`);return u},t)}}const Mv=(e,t)=>{e.pending[t]!==void 0&&(delete e.pending[t],e.pendingCount--)};class Lv extends no{constructor(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};super(),this.backend=t,this.store=n,this.services=r,this.languageUtils=r.languageUtils,this.options=s,this.logger=Yn.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=s.maxParallelReads||10,this.readingCalls=0,this.maxRetries=s.maxRetries>=0?s.maxRetries:5,this.retryTimeout=s.retryTimeout>=1?s.retryTimeout:350,this.state={},this.queue=[],this.backend&&this.backend.init&&this.backend.init(r,s.backend,s)}queueLoad(t,n,r,s){const a={},o={},u={},c={};return t.forEach(f=>{let m=!0;n.forEach(k=>{const g=`${f}|${k}`;!r.reload&&this.store.hasResourceBundle(f,k)?this.state[g]=2:this.state[g]<0||(this.state[g]===1?o[g]===void 0&&(o[g]=!0):(this.state[g]=1,m=!1,o[g]===void 0&&(o[g]=!0),a[g]===void 0&&(a[g]=!0),c[k]===void 0&&(c[k]=!0)))}),m||(u[f]=!0)}),(Object.keys(a).length||Object.keys(o).length)&&this.queue.push({pending:o,pendingCount:Object.keys(o).length,loaded:{},errors:[],callback:s}),{toLoad:Object.keys(a),pending:Object.keys(o),toLoadLanguages:Object.keys(u),toLoadNamespaces:Object.keys(c)}}loaded(t,n,r){const s=t.split("|"),a=s[0],o=s[1];n&&this.emit("failedLoading",a,o,n),!n&&r&&this.store.addResourceBundle(a,o,r,void 0,void 0,{skipCopy:!0}),this.state[t]=n?-1:2,n&&r&&(this.state[t]=0);const u={};this.queue.forEach(c=>{pv(c.loaded,[a],o),Mv(c,t),n&&c.errors.push(n),c.pendingCount===0&&!c.done&&(Object.keys(c.loaded).forEach(f=>{u[f]||(u[f]={});const m=c.loaded[f];m.length&&m.forEach(k=>{u[f][k]===void 0&&(u[f][k]=!0)})}),c.done=!0,c.errors.length?c.callback(c.errors):c.callback())}),this.emit("loaded",u),this.queue=this.queue.filter(c=>!c.done)}read(t,n,r){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:this.retryTimeout,o=arguments.length>5?arguments[5]:void 0;if(!t.length)return o(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:t,ns:n,fcName:r,tried:s,wait:a,callback:o});return}this.readingCalls++;const u=(f,m)=>{if(this.readingCalls--,this.waitingReads.length>0){const k=this.waitingReads.shift();this.read(k.lng,k.ns,k.fcName,k.tried,k.wait,k.callback)}if(f&&m&&s<this.maxRetries){setTimeout(()=>{this.read.call(this,t,n,r,s+1,a*2,o)},a);return}o(f,m)},c=this.backend[r].bind(this.backend);if(c.length===2){try{const f=c(t,n);f&&typeof f.then=="function"?f.then(m=>u(null,m)).catch(u):u(null,f)}catch(f){u(f)}return}return c(t,n,u)}prepareLoading(t,n){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=arguments.length>3?arguments[3]:void 0;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),s&&s();Ie(t)&&(t=this.languageUtils.toResolveHierarchy(t)),Ie(n)&&(n=[n]);const a=this.queueLoad(t,n,r,s);if(!a.toLoad.length)return a.pending.length||s(),null;a.toLoad.forEach(o=>{this.loadOne(o)})}load(t,n,r){this.prepareLoading(t,n,{},r)}reload(t,n,r){this.prepareLoading(t,n,{reload:!0},r)}loadOne(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const r=t.split("|"),s=r[0],a=r[1];this.read(s,a,"read",void 0,void 0,(o,u)=>{o&&this.logger.warn(`${n}loading namespace ${a} for language ${s} failed`,o),!o&&u&&this.logger.log(`${n}loaded namespace ${a} for language ${s}`,u),this.loaded(t,o,u)})}saveMissing(t,n,r,s,a){let o=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{},u=arguments.length>6&&arguments[6]!==void 0?arguments[6]:()=>{};if(this.services.utils&&this.services.utils.hasLoadedNamespace&&!this.services.utils.hasLoadedNamespace(n)){this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(r==null||r==="")){if(this.backend&&this.backend.create){const c={...o,isUpdate:a},f=this.backend.create.bind(this.backend);if(f.length<6)try{let m;f.length===5?m=f(t,n,r,s,c):m=f(t,n,r,s),m&&typeof m.then=="function"?m.then(k=>u(null,k)).catch(u):u(null,m)}catch(m){u(m)}else f(t,n,r,s,u,c)}!t||!t[0]||this.store.addResource(t[0],n,r,s)}}}const wd=()=>({debug:!1,initImmediate:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,simplifyPluralSuffix:!0,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:e=>{let t={};if(typeof e[1]=="object"&&(t=e[1]),Ie(e[1])&&(t.defaultValue=e[1]),Ie(e[2])&&(t.tDescription=e[2]),typeof e[2]=="object"||typeof e[3]=="object"){const n=e[3]||e[2];Object.keys(n).forEach(r=>{t[r]=n[r]})}return t},interpolation:{escapeValue:!0,format:e=>e,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0}}),jd=e=>(Ie(e.ns)&&(e.ns=[e.ns]),Ie(e.fallbackLng)&&(e.fallbackLng=[e.fallbackLng]),Ie(e.fallbackNS)&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&e.supportedLngs.indexOf("cimode")<0&&(e.supportedLngs=e.supportedLngs.concat(["cimode"])),e),Va=()=>{},Tv=e=>{Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(n=>{typeof e[n]=="function"&&(e[n]=e[n].bind(e))})};class ma extends no{constructor(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;if(super(),this.options=jd(t),this.services={},this.logger=Yn,this.modules={external:[]},Tv(this),n&&!this.isInitialized&&!t.isClone){if(!this.options.initImmediate)return this.init(t,n),this;setTimeout(()=>{this.init(t,n)},0)}}init(){var t=this;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=arguments.length>1?arguments[1]:void 0;this.isInitializing=!0,typeof n=="function"&&(r=n,n={}),!n.defaultNS&&n.defaultNS!==!1&&n.ns&&(Ie(n.ns)?n.defaultNS=n.ns:n.ns.indexOf("translation")<0&&(n.defaultNS=n.ns[0]));const s=wd();this.options={...s,...this.options,...jd(n)},this.options.compatibilityAPI!=="v1"&&(this.options.interpolation={...s.interpolation,...this.options.interpolation}),n.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=n.keySeparator),n.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=n.nsSeparator);const a=m=>m?typeof m=="function"?new m:m:null;if(!this.options.isClone){this.modules.logger?Yn.init(a(this.modules.logger),this.options):Yn.init(null,this.options);let m;this.modules.formatter?m=this.modules.formatter:typeof Intl<"u"&&(m=Iv);const k=new yd(this.options);this.store=new xd(this.options.resources,this.options);const g=this.services;g.logger=Yn,g.resourceStore=this.store,g.languageUtils=k,g.pluralResolver=new Ev(k,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON,simplifyPluralSuffix:this.options.simplifyPluralSuffix}),m&&(!this.options.interpolation.format||this.options.interpolation.format===s.interpolation.format)&&(g.formatter=a(m),g.formatter.init(g,this.options),this.options.interpolation.format=g.formatter.format.bind(g.formatter)),g.interpolator=new zv(this.options),g.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},g.backendConnector=new Lv(a(this.modules.backend),g.resourceStore,g,this.options),g.backendConnector.on("*",function(N){for(var v=arguments.length,w=new Array(v>1?v-1:0),M=1;M<v;M++)w[M-1]=arguments[M];t.emit(N,...w)}),this.modules.languageDetector&&(g.languageDetector=a(this.modules.languageDetector),g.languageDetector.init&&g.languageDetector.init(g,this.options.detection,this.options)),this.modules.i18nFormat&&(g.i18nFormat=a(this.modules.i18nFormat),g.i18nFormat.init&&g.i18nFormat.init(this)),this.translator=new Ri(this.services,this.options),this.translator.on("*",function(N){for(var v=arguments.length,w=new Array(v>1?v-1:0),M=1;M<v;M++)w[M-1]=arguments[M];t.emit(N,...w)}),this.modules.external.forEach(N=>{N.init&&N.init(this)})}if(this.format=this.options.interpolation.format,r||(r=Va),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const m=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);m.length>0&&m[0]!=="dev"&&(this.options.lng=m[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(m=>{this[m]=function(){return t.store[m](...arguments)}}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(m=>{this[m]=function(){return t.store[m](...arguments),t}});const c=Ls(),f=()=>{const m=(k,g)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),c.resolve(g),r(k,g)};if(this.languages&&this.options.compatibilityAPI!=="v1"&&!this.isInitialized)return m(null,this.t.bind(this));this.changeLanguage(this.options.lng,m)};return this.options.resources||!this.options.initImmediate?f():setTimeout(f,0),c}loadResources(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Va;const s=Ie(t)?t:this.language;if(typeof t=="function"&&(r=t),!this.options.resources||this.options.partialBundledLanguages){if(s&&s.toLowerCase()==="cimode"&&(!this.options.preload||this.options.preload.length===0))return r();const a=[],o=u=>{if(!u||u==="cimode")return;this.services.languageUtils.toResolveHierarchy(u).forEach(f=>{f!=="cimode"&&a.indexOf(f)<0&&a.push(f)})};s?o(s):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(c=>o(c)),this.options.preload&&this.options.preload.forEach(u=>o(u)),this.services.backendConnector.load(a,this.options.ns,u=>{!u&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),r(u)})}else r(null)}reloadResources(t,n,r){const s=Ls();return typeof t=="function"&&(r=t,t=void 0),typeof n=="function"&&(r=n,n=void 0),t||(t=this.languages),n||(n=this.options.ns),r||(r=Va),this.services.backendConnector.reload(t,n,a=>{s.resolve(),r(a)}),s}use(t){if(!t)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!t.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return t.type==="backend"&&(this.modules.backend=t),(t.type==="logger"||t.log&&t.warn&&t.error)&&(this.modules.logger=t),t.type==="languageDetector"&&(this.modules.languageDetector=t),t.type==="i18nFormat"&&(this.modules.i18nFormat=t),t.type==="postProcessor"&&Th.addPostProcessor(t),t.type==="formatter"&&(this.modules.formatter=t),t.type==="3rdParty"&&this.modules.external.push(t),this}setResolvedLanguage(t){if(!(!t||!this.languages)&&!(["cimode","dev"].indexOf(t)>-1))for(let n=0;n<this.languages.length;n++){const r=this.languages[n];if(!(["cimode","dev"].indexOf(r)>-1)&&this.store.hasLanguageSomeTranslations(r)){this.resolvedLanguage=r;break}}}changeLanguage(t,n){var r=this;this.isLanguageChangingTo=t;const s=Ls();this.emit("languageChanging",t);const a=c=>{this.language=c,this.languages=this.services.languageUtils.toResolveHierarchy(c),this.resolvedLanguage=void 0,this.setResolvedLanguage(c)},o=(c,f)=>{f?(a(f),this.translator.changeLanguage(f),this.isLanguageChangingTo=void 0,this.emit("languageChanged",f),this.logger.log("languageChanged",f)):this.isLanguageChangingTo=void 0,s.resolve(function(){return r.t(...arguments)}),n&&n(c,function(){return r.t(...arguments)})},u=c=>{!t&&!c&&this.services.languageDetector&&(c=[]);const f=Ie(c)?c:this.services.languageUtils.getBestMatchFromCodes(c);f&&(this.language||a(f),this.translator.language||this.translator.changeLanguage(f),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage&&this.services.languageDetector.cacheUserLanguage(f)),this.loadResources(f,m=>{o(m,f)})};return!t&&this.services.languageDetector&&!this.services.languageDetector.async?u(this.services.languageDetector.detect()):!t&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(u):this.services.languageDetector.detect(u):u(t),s}getFixedT(t,n,r){var s=this;const a=function(o,u){let c;if(typeof u!="object"){for(var f=arguments.length,m=new Array(f>2?f-2:0),k=2;k<f;k++)m[k-2]=arguments[k];c=s.options.overloadTranslationOptionHandler([o,u].concat(m))}else c={...u};c.lng=c.lng||a.lng,c.lngs=c.lngs||a.lngs,c.ns=c.ns||a.ns,c.keyPrefix!==""&&(c.keyPrefix=c.keyPrefix||r||a.keyPrefix);const g=s.options.keySeparator||".";let N;return c.keyPrefix&&Array.isArray(o)?N=o.map(v=>`${c.keyPrefix}${g}${v}`):N=c.keyPrefix?`${c.keyPrefix}${g}${o}`:o,s.t(N,c)};return Ie(t)?a.lng=t:a.lngs=t,a.ns=n,a.keyPrefix=r,a}t(){return this.translator&&this.translator.translate(...arguments)}exists(){return this.translator&&this.translator.exists(...arguments)}setDefaultNamespace(t){this.options.defaultNS=t}hasLoadedNamespace(t){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const r=n.lng||this.resolvedLanguage||this.languages[0],s=this.options?this.options.fallbackLng:!1,a=this.languages[this.languages.length-1];if(r.toLowerCase()==="cimode")return!0;const o=(u,c)=>{const f=this.services.backendConnector.state[`${u}|${c}`];return f===-1||f===0||f===2};if(n.precheck){const u=n.precheck(this,o);if(u!==void 0)return u}return!!(this.hasResourceBundle(r,t)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||o(r,t)&&(!s||o(a,t)))}loadNamespaces(t,n){const r=Ls();return this.options.ns?(Ie(t)&&(t=[t]),t.forEach(s=>{this.options.ns.indexOf(s)<0&&this.options.ns.push(s)}),this.loadResources(s=>{r.resolve(),n&&n(s)}),r):(n&&n(),Promise.resolve())}loadLanguages(t,n){const r=Ls();Ie(t)&&(t=[t]);const s=this.options.preload||[],a=t.filter(o=>s.indexOf(o)<0&&this.services.languageUtils.isSupportedCode(o));return a.length?(this.options.preload=s.concat(a),this.loadResources(o=>{r.resolve(),n&&n(o)}),r):(n&&n(),Promise.resolve())}dir(t){if(t||(t=this.resolvedLanguage||(this.languages&&this.languages.length>0?this.languages[0]:this.language)),!t)return"rtl";const n=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],r=this.services&&this.services.languageUtils||new yd(wd());return n.indexOf(r.getLanguagePartFromCode(t))>-1||t.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;return new ma(t,n)}cloneInstance(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Va;const r=t.forkResourceStore;r&&delete t.forkResourceStore;const s={...this.options,...t,isClone:!0},a=new ma(s);return(t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),["store","services","language"].forEach(u=>{a[u]=this[u]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},r&&(a.store=new xd(this.store.data,s),a.services.resourceStore=a.store),a.translator=new Ri(a.services,s),a.translator.on("*",function(u){for(var c=arguments.length,f=new Array(c>1?c-1:0),m=1;m<c;m++)f[m-1]=arguments[m];a.emit(u,...f)}),a.init(s,n),a.translator.options=s,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const Qt=ma.createInstance();Qt.createInstance=ma.createInstance;Qt.createInstance;Qt.dir;Qt.init;Qt.loadResources;Qt.reloadResources;Qt.use;Qt.changeLanguage;Qt.getFixedT;Qt.t;Qt.exists;Qt.setDefaultNamespace;Qt.hasLoadedNamespace;Qt.loadNamespaces;Qt.loadLanguages;function Rv(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ga(e){"@babel/helpers - typeof";return ga=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ga(e)}function Ov(e,t){if(ga(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(ga(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}function _v(e){var t=Ov(e,"string");return ga(t)=="symbol"?t:t+""}function Dv(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_v(r.key),r)}}function Av(e,t,n){return t&&Dv(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var Rh=[],Uv=Rh.forEach,$v=Rh.slice;function Fv(e){return Uv.call($v.call(arguments,1),function(t){if(t)for(var n in t)e[n]===void 0&&(e[n]=t[n])}),e}var Sd=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,Bv=function(t,n,r){var s=r||{};s.path=s.path||"/";var a=encodeURIComponent(n),o="".concat(t,"=").concat(a);if(s.maxAge>0){var u=s.maxAge-0;if(Number.isNaN(u))throw new Error("maxAge should be a Number");o+="; Max-Age=".concat(Math.floor(u))}if(s.domain){if(!Sd.test(s.domain))throw new TypeError("option domain is invalid");o+="; Domain=".concat(s.domain)}if(s.path){if(!Sd.test(s.path))throw new TypeError("option path is invalid");o+="; Path=".concat(s.path)}if(s.expires){if(typeof s.expires.toUTCString!="function")throw new TypeError("option expires is invalid");o+="; Expires=".concat(s.expires.toUTCString())}if(s.httpOnly&&(o+="; HttpOnly"),s.secure&&(o+="; Secure"),s.sameSite){var c=typeof s.sameSite=="string"?s.sameSite.toLowerCase():s.sameSite;switch(c){case!0:o+="; SameSite=Strict";break;case"lax":o+="; SameSite=Lax";break;case"strict":o+="; SameSite=Strict";break;case"none":o+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return o},Nd={create:function(t,n,r,s){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{path:"/",sameSite:"strict"};r&&(a.expires=new Date,a.expires.setTime(a.expires.getTime()+r*60*1e3)),s&&(a.domain=s),document.cookie=Bv(t,encodeURIComponent(n),a)},read:function(t){for(var n="".concat(t,"="),r=document.cookie.split(";"),s=0;s<r.length;s++){for(var a=r[s];a.charAt(0)===" ";)a=a.substring(1,a.length);if(a.indexOf(n)===0)return a.substring(n.length,a.length)}return null},remove:function(t){this.create(t,"",-1)}},Hv={name:"cookie",lookup:function(t){var n;if(t.lookupCookie&&typeof document<"u"){var r=Nd.read(t.lookupCookie);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupCookie&&typeof document<"u"&&Nd.create(n.lookupCookie,t,n.cookieMinutes,n.cookieDomain,n.cookieOptions)}},Vv={name:"querystring",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.search;!window.location.search&&window.location.hash&&window.location.hash.indexOf("?")>-1&&(r=window.location.hash.substring(window.location.hash.indexOf("?")));for(var s=r.substring(1),a=s.split("&"),o=0;o<a.length;o++){var u=a[o].indexOf("=");if(u>0){var c=a[o].substring(0,u);c===t.lookupQuerystring&&(n=a[o].substring(u+1))}}}return n}},Ts=null,Cd=function(){if(Ts!==null)return Ts;try{Ts=window!=="undefined"&&window.localStorage!==null;var t="i18next.translate.boo";window.localStorage.setItem(t,"foo"),window.localStorage.removeItem(t)}catch{Ts=!1}return Ts},Kv={name:"localStorage",lookup:function(t){var n;if(t.lookupLocalStorage&&Cd()){var r=window.localStorage.getItem(t.lookupLocalStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupLocalStorage&&Cd()&&window.localStorage.setItem(n.lookupLocalStorage,t)}},Rs=null,Ed=function(){if(Rs!==null)return Rs;try{Rs=window!=="undefined"&&window.sessionStorage!==null;var t="i18next.translate.boo";window.sessionStorage.setItem(t,"foo"),window.sessionStorage.removeItem(t)}catch{Rs=!1}return Rs},Wv={name:"sessionStorage",lookup:function(t){var n;if(t.lookupSessionStorage&&Ed()){var r=window.sessionStorage.getItem(t.lookupSessionStorage);r&&(n=r)}return n},cacheUserLanguage:function(t,n){n.lookupSessionStorage&&Ed()&&window.sessionStorage.setItem(n.lookupSessionStorage,t)}},Yv={name:"navigator",lookup:function(t){var n=[];if(typeof navigator<"u"){if(navigator.languages)for(var r=0;r<navigator.languages.length;r++)n.push(navigator.languages[r]);navigator.userLanguage&&n.push(navigator.userLanguage),navigator.language&&n.push(navigator.language)}return n.length>0?n:void 0}},Jv={name:"htmlTag",lookup:function(t){var n,r=t.htmlTag||(typeof document<"u"?document.documentElement:null);return r&&typeof r.getAttribute=="function"&&(n=r.getAttribute("lang")),n}},Qv={name:"path",lookup:function(t){var n;if(typeof window<"u"){var r=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(r instanceof Array)if(typeof t.lookupFromPathIndex=="number"){if(typeof r[t.lookupFromPathIndex]!="string")return;n=r[t.lookupFromPathIndex].replace("/","")}else n=r[0].replace("/","")}return n}},qv={name:"subdomain",lookup:function(t){var n=typeof t.lookupFromSubdomainIndex=="number"?t.lookupFromSubdomainIndex+1:1,r=typeof window<"u"&&window.location&&window.location.hostname&&window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);if(r)return r[n]}},Oh=!1;try{document.cookie,Oh=!0}catch{}var _h=["querystring","cookie","localStorage","sessionStorage","navigator","htmlTag"];Oh||_h.splice(1,1);function Xv(){return{order:_h,lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",lookupSessionStorage:"i18nextLng",caches:["localStorage"],excludeCacheFor:["cimode"],convertDetectedLanguage:function(t){return t}}}var Dh=function(){function e(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Rv(this,e),this.type="languageDetector",this.detectors={},this.init(t,n)}return Av(e,[{key:"init",value:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.services=n||{languageUtils:{}},this.options=Fv(r,this.options||{},Xv()),typeof this.options.convertDetectedLanguage=="string"&&this.options.convertDetectedLanguage.indexOf("15897")>-1&&(this.options.convertDetectedLanguage=function(a){return a.replace("-","_")}),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=s,this.addDetector(Hv),this.addDetector(Vv),this.addDetector(Kv),this.addDetector(Wv),this.addDetector(Yv),this.addDetector(Jv),this.addDetector(Qv),this.addDetector(qv)}},{key:"addDetector",value:function(n){return this.detectors[n.name]=n,this}},{key:"detect",value:function(n){var r=this;n||(n=this.options.order);var s=[];return n.forEach(function(a){if(r.detectors[a]){var o=r.detectors[a].lookup(r.options);o&&typeof o=="string"&&(o=[o]),o&&(s=s.concat(o))}}),s=s.map(function(a){return r.options.convertDetectedLanguage(a)}),this.services.languageUtils.getBestMatchFromCodes?s:s.length>0?s[0]:null}},{key:"cacheUserLanguage",value:function(n,r){var s=this;r||(r=this.options.caches),r&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(n)>-1||r.forEach(function(a){s.detectors[a]&&s.detectors[a].cacheUserLanguage(n,s.options)}))}}])}();Dh.type="languageDetector";const Gv={"app.name":"Hotline Modern","auth.connecting":"Connecting...","auth.authenticating":"Authenticating...","auth.connectionFailed":"Connection failed","auth.invalidSignature":"Invalid signature","connect.title":"Connect to Server","connect.serverAddress":"Server address","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Nickname","connect.nicknamePlaceholder":"Your nickname","connect.button":"Connect","connect.connecting":"Connecting...","sidebar.channels":"Channels","sidebar.createChannel":"Create channel","sidebar.disconnect":"Disconnect","sidebar.openMenu":"Open menu","sidebar.noChannels":"No channels yet","sidebar.users":"Users","chat.placeholder":"Type a message...","chat.send":"Send","chat.noMessages":"No messages yet. Say hello!","chat.today":"Today","chat.yesterday":"Yesterday","chat.history":"Message history","channel.create":"Create Channel","channel.name":"Channel name","channel.topic":"Topic","channel.cancel":"Cancel","channel.submit":"Create","channel.password":"Password (optional)","channel.passwordPlaceholder":"Leave empty for public channel","users.online":"{{count}} user online","users.online_other":"{{count}} users online","users.title":"Users","users.togglePanel":"Toggle users panel","files.title":"Files","files.upload":"Upload","files.download":"Download","files.empty":"No files","files.parentDir":"Parent directory","roles.admin":"Admin","roles.operator":"Operator","roles.member":"Member","roles.guest":"Guest","settings.title":"Settings","settings.language":"Language","settings.theme":"Theme","server.motd":"Message of the Day","error.disconnected":"Disconnected from server","error.reconnecting":"Reconnecting...","error.permissionDenied":"Permission denied","sidebar.directMessages":"Direct Messages","sidebar.deleteChannel":"Delete channel","chat.typing":"{{name}} is typing...","chat.typingMultiple":"{{count}} people are typing...","chat.dmPlaceholder":"Message {{name}}...","users.sendDM":"Send message","chat.edited":"(edited)","chat.replyingTo":"Replying to","search.title":"Search messages","search.placeholder":"Search messages...","search.allChannels":"All channels","search.noResults":"No results found","connection.reconnecting":"Reconnecting in {{seconds}}s...","connection.connecting":"Connecting...","connection.authenticating":"Authenticating...","notif.muteSound":"Mute sounds","notif.unmuteSound":"Unmute sounds","notif.muteDesktop":"Mute notifications","notif.unmuteDesktop":"Unmute notifications","status.available":"Available","status.away":"Away","status.busy":"Busy","chat.loadingHistory":"Loading older messages...","chat.historyStart":"Beginning of conversation","files.dropHere":"Drop file to upload","files.uploading":"Uploading...","chat.searchEmoji":"Search emoji...","emoji.smileys":"Smileys","emoji.gestures":"Gestures","emoji.symbols":"Symbols","emoji.objects":"Objects","pins.title":"Pinned Messages","pins.empty":"No pinned messages","pins.unpin":"Unpin","bookmarks.title":"Bookmarks","bookmarks.empty":"No bookmarks yet","bookmarks.remove":"Remove bookmark","channelSettings.title":"Channel Settings","channelSettings.members":"members","channelSettings.passwordProtected":"Password protected","channelSettings.topicPlaceholder":"Set a topic for this channel...","channelSettings.noTopic":"No topic set","channelSettings.save":"Save","channelSettings.close":"Close","profile.copyId":"Copy public key","profile.promote":"Promote to Operator","profile.demote":"Demote to Member","profile.kick":"Kick","profile.ban":"Ban","shortcuts.title":"Keyboard Shortcuts","shortcuts.search":"Search messages","shortcuts.bold":"Bold text","shortcuts.italic":"Italic text","shortcuts.close":"Close panel / Cancel","shortcuts.send":"Send message","shortcuts.newline":"New line","shortcuts.mention":"Mention a user","shortcuts.showHelp":"Show this help","admin.title":"Administration","admin.settings":"Settings","admin.bans":"Ban List","admin.serverName":"Server Name","admin.motd":"Message of the Day","admin.save":"Save Changes","admin.saved":"Saved!","admin.banInfo":"Banned users cannot reconnect to this server.","admin.noBans":"No banned users","sidebar.mute":"Mute channel","sidebar.unmute":"Unmute channel","channel.passwordRequired":"Password Required","channel.passwordDesc":"#{{channel}} is password protected","channel.passwordPlaceholderJoin":"Enter channel password","ctx.reply":"Reply","ctx.react":"Add Reaction","ctx.copy":"Copy Text","ctx.quote":"Quote","ctx.bookmark":"Bookmark","ctx.edit":"Edit Message","ctx.pin":"Pin Message","ctx.delete":"Delete Message","lightbox.zoomIn":"Zoom in","lightbox.zoomOut":"Zoom out","lightbox.rotate":"Rotate","lightbox.download":"Download","chat.newMessages":"New messages","connect.recentServers":"Recent servers","connect.quickConnect":"Quick connect","connect.removeFavorite":"Remove","voice.record":"Record voice message","voice.stop":"Stop recording","voice.send":"Send voice message","voice.cancel":"Cancel","thread.title":"Thread","thread.reply":"reply","thread.replies":"replies","theme.title":"Theme Editor","theme.save":"Save","theme.saved":"Saved!","theme.reset":"Reset to defaults","theme.namePlaceholder":"Theme name...","theme.saved_themes":"Saved themes","stats.title":"Server Statistics","stats.totalMessages":"Total messages","stats.onlineUsers":"Online users","stats.channels":"Channels","stats.lastHour":"Last hour","stats.activity24h":"Activity (24h)","stats.topContributors":"Top contributors","stats.topChannels":"Top channels","forward.title":"Forward Message","forward.sendTo":"Send to channel","forward.commentPlaceholder":"Add a comment (optional)...","forward.cancel":"Cancel","forward.send":"Forward","forward.sent":"Message forwarded","e2e.label":"E2E","e2e.encrypted":"End-to-end encrypted","e2e.notEncrypted":"Not encrypted","e2e.title":"End-to-End Encryption","e2e.description":"Messages are encrypted with Ed25519 keys. Only you and the recipient can read them.","e2e.yourKey":"Your key","e2e.peerKey":"Peer key","customEmoji.title":"Custom Emojis","customEmoji.selectImage":"Select image","customEmoji.namePlaceholder":"emoji_name","customEmoji.upload":"Upload","customEmoji.hint":"PNG, GIF or WebP. Max 256KB.","customEmoji.existing":"Custom emojis","notifFilters.title":"Notification Filters","notifFilters.onlyMentions":"Mentions only","notifFilters.onlyMentionsDesc":"Only notify when you're @mentioned or keywords match","notifFilters.quietHours":"Quiet hours","notifFilters.quietHoursDesc":"Mute all notifications during set hours","notifFilters.keywords":"Alert keywords","notifFilters.keywordPlaceholder":"Add a keyword...","notifFilters.mutedChannels":"Muted channels","notifFilters.mutedUsers":"Muted users","scheduler.title":"Schedule Messages","scheduler.placeholder":"Type your scheduled message...","scheduler.schedule":"Schedule","scheduler.pending":"Scheduled","scheduler.otherChannels":"Other channels","tracker.browseServers":"Browse Servers","tracker.noServers":"No servers found","tracker.loading":"Searching for servers...","tracker.error":"Could not reach trackers","tracker.refresh":"Refresh","tracker.connect":"Connect","tracker.settings":"Tracker settings","tracker.addTracker":"Add tracker","tracker.trackerPlaceholder":"http://tracker:9997","tracker.removeTracker":"Remove","notif.newMessage":"New message from {{name}}","agreement.title":"Server Agreement","agreement.accept":"Accept","agreement.decline":"Decline","system.userJoined":"{{name}} joined","system.userLeft":"{{name}} left"},Zv={"app.name":"Hotline Modern","auth.connecting":"Connexion...","auth.authenticating":"Authentification...","auth.connectionFailed":"Échec de la connexion","auth.invalidSignature":"Signature invalide","connect.title":"Se connecter au serveur","connect.serverAddress":"Adresse du serveur","connect.serverPlaceholder":"localhost:9998","connect.nickname":"Pseudo","connect.nicknamePlaceholder":"Votre pseudo","connect.button":"Connexion","connect.connecting":"Connexion...","sidebar.channels":"Salons","sidebar.createChannel":"Créer un salon","sidebar.disconnect":"Déconnexion","sidebar.openMenu":"Ouvrir le menu","sidebar.noChannels":"Aucun salon","sidebar.users":"Utilisateurs","chat.placeholder":"Écrire un message...","chat.send":"Envoyer","chat.noMessages":"Aucun message. Dites bonjour !","chat.today":"Aujourd'hui","chat.yesterday":"Hier","chat.history":"Historique des messages","channel.create":"Créer un salon","channel.name":"Nom du salon","channel.topic":"Sujet","channel.cancel":"Annuler","channel.submit":"Créer","channel.password":"Mot de passe (optionnel)","channel.passwordPlaceholder":"Laisser vide pour un salon public","users.online":"{{count}} utilisateur en ligne","users.online_other":"{{count}} utilisateurs en ligne","users.title":"Utilisateurs","users.togglePanel":"Afficher/masquer les utilisateurs","files.title":"Fichiers","files.upload":"Téléverser","files.download":"Télécharger","files.empty":"Aucun fichier","files.parentDir":"Dossier parent","roles.admin":"Admin","roles.operator":"Opérateur","roles.member":"Membre","roles.guest":"Invité","settings.title":"Paramètres","settings.language":"Langue","settings.theme":"Thème","server.motd":"Message du jour","error.disconnected":"Déconnecté du serveur","error.reconnecting":"Reconnexion...","error.permissionDenied":"Permission refusée","sidebar.directMessages":"Messages privés","sidebar.deleteChannel":"Supprimer le salon","chat.typing":"{{name}} écrit...","chat.typingMultiple":"{{count}} personnes écrivent...","chat.dmPlaceholder":"Message à {{name}}...","users.sendDM":"Envoyer un message","chat.edited":"(modifié)","chat.replyingTo":"En réponse à","search.title":"Rechercher des messages","search.placeholder":"Rechercher...","search.allChannels":"Tous les salons","search.noResults":"Aucun résultat","connection.reconnecting":"Reconnexion dans {{seconds}}s...","connection.connecting":"Connexion...","connection.authenticating":"Authentification...","notif.muteSound":"Couper les sons","notif.unmuteSound":"Activer les sons","notif.muteDesktop":"Couper les notifications","notif.unmuteDesktop":"Activer les notifications","status.available":"Disponible","status.away":"Absent","status.busy":"Occupé","chat.loadingHistory":"Chargement des anciens messages...","chat.historyStart":"Début de la conversation","files.dropHere":"Déposer le fichier pour téléverser","files.uploading":"Téléversement...","chat.searchEmoji":"Chercher un emoji...","emoji.smileys":"Visages","emoji.gestures":"Gestes","emoji.symbols":"Symboles","emoji.objects":"Objets","pins.title":"Messages épinglés","pins.empty":"Aucun message épinglé","pins.unpin":"Désépingler","bookmarks.title":"Favoris","bookmarks.empty":"Aucun favori","bookmarks.remove":"Retirer le favori","channelSettings.title":"Paramètres du salon","channelSettings.members":"membres","channelSettings.passwordProtected":"Protégé par mot de passe","channelSettings.topicPlaceholder":"Définir un sujet pour ce salon...","channelSettings.noTopic":"Aucun sujet défini","channelSettings.save":"Enregistrer","channelSettings.close":"Fermer","profile.copyId":"Copier la clé publique","profile.promote":"Promouvoir opérateur","profile.demote":"Rétrograder membre","profile.kick":"Expulser","profile.ban":"Bannir","shortcuts.title":"Raccourcis clavier","shortcuts.search":"Rechercher des messages","shortcuts.bold":"Texte en gras","shortcuts.italic":"Texte en italique","shortcuts.close":"Fermer / Annuler","shortcuts.send":"Envoyer le message","shortcuts.newline":"Nouvelle ligne","shortcuts.mention":"Mentionner un utilisateur","shortcuts.showHelp":"Afficher cette aide","admin.title":"Administration","admin.settings":"Paramètres","admin.bans":"Liste des bannis","admin.serverName":"Nom du serveur","admin.motd":"Message du jour","admin.save":"Enregistrer","admin.saved":"Enregistré !","admin.banInfo":"Les utilisateurs bannis ne peuvent pas se reconnecter.","admin.noBans":"Aucun utilisateur banni","sidebar.mute":"Couper les notifications","sidebar.unmute":"Activer les notifications","channel.passwordRequired":"Mot de passe requis","channel.passwordDesc":"#{{channel}} est protégé par mot de passe","channel.passwordPlaceholderJoin":"Entrer le mot de passe","ctx.reply":"Répondre","ctx.react":"Ajouter une réaction","ctx.copy":"Copier le texte","ctx.quote":"Citer","ctx.bookmark":"Ajouter un favori","ctx.edit":"Modifier le message","ctx.pin":"Épingler le message","ctx.delete":"Supprimer le message","lightbox.zoomIn":"Zoom avant","lightbox.zoomOut":"Zoom arrière","lightbox.rotate":"Pivoter","lightbox.download":"Télécharger","chat.newMessages":"Nouveaux messages","connect.recentServers":"Serveurs récents","connect.quickConnect":"Connexion rapide","connect.removeFavorite":"Supprimer","voice.record":"Enregistrer un message vocal","voice.stop":"Arrêter","voice.send":"Envoyer le message vocal","voice.cancel":"Annuler","thread.title":"Fil de discussion","thread.reply":"réponse","thread.replies":"réponses","theme.title":"Éditeur de thème","theme.save":"Enregistrer","theme.saved":"Enregistré !","theme.reset":"Réinitialiser","theme.namePlaceholder":"Nom du thème...","theme.saved_themes":"Thèmes sauvegardés","stats.title":"Statistiques du serveur","stats.totalMessages":"Total messages","stats.onlineUsers":"Utilisateurs en ligne","stats.channels":"Salons","stats.lastHour":"Dernière heure","stats.activity24h":"Activité (24h)","stats.topContributors":"Top contributeurs","stats.topChannels":"Top salons","forward.title":"Transférer le message","forward.sendTo":"Envoyer vers le salon","forward.commentPlaceholder":"Ajouter un commentaire (optionnel)...","forward.cancel":"Annuler","forward.send":"Transférer","forward.sent":"Message transféré","e2e.label":"E2E","e2e.encrypted":"Chiffrement de bout en bout","e2e.notEncrypted":"Non chiffré","e2e.title":"Chiffrement de bout en bout","e2e.description":"Les messages sont chiffrés avec des clés Ed25519. Seuls vous et le destinataire pouvez les lire.","e2e.yourKey":"Votre clé","e2e.peerKey":"Clé du pair","customEmoji.title":"Emojis personnalisés","customEmoji.selectImage":"Choisir une image","customEmoji.namePlaceholder":"nom_emoji","customEmoji.upload":"Ajouter","customEmoji.hint":"PNG, GIF ou WebP. Max 256 Ko.","customEmoji.existing":"Emojis personnalisés","notifFilters.title":"Filtres de notifications","notifFilters.onlyMentions":"Mentions uniquement","notifFilters.onlyMentionsDesc":"Notifier uniquement quand vous êtes @mentionné ou un mot-clé correspond","notifFilters.quietHours":"Heures calmes","notifFilters.quietHoursDesc":"Couper toutes les notifications pendant les heures définies","notifFilters.keywords":"Mots-clés d'alerte","notifFilters.keywordPlaceholder":"Ajouter un mot-clé...","notifFilters.mutedChannels":"Salons coupés","notifFilters.mutedUsers":"Utilisateurs coupés","scheduler.title":"Programmer des messages","scheduler.placeholder":"Tapez votre message programmé...","scheduler.schedule":"Programmer","scheduler.pending":"Programmés","scheduler.otherChannels":"Autres salons","tracker.browseServers":"Parcourir les serveurs","tracker.noServers":"Aucun serveur trouvé","tracker.loading":"Recherche de serveurs...","tracker.error":"Impossible de contacter les trackers","tracker.refresh":"Actualiser","tracker.connect":"Connexion","tracker.settings":"Paramètres du tracker","tracker.addTracker":"Ajouter un tracker","tracker.trackerPlaceholder":"http://tracker:9997","tracker.removeTracker":"Supprimer","notif.newMessage":"Nouveau message de {{name}}","agreement.title":"Accord du serveur","agreement.accept":"Accepter","agreement.decline":"Refuser","system.userJoined":"{{name}} a rejoint","system.userLeft":"{{name}} a quitté"};Qt.use(Dh).use(Ex).init({resources:{en:{translation:Gv},fr:{translation:Zv}},fallbackLng:"en",interpolation:{escapeValue:!1},detection:{order:["localStorage","navigator"],lookupLocalStorage:"hotline-language",caches:["localStorage"]}});Do.createRoot(document.getElementById("root")).render(i.jsx(rm.StrictMode,{children:i.jsx(uv,{})}));
