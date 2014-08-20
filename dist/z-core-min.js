// z-core v0.6.2
// Jakob Mattsson 2014-08-20
(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/lib/index.js',function(b,c,d,e){(function(){var k,l,p,o,n,i,m,h,g,j,f,e,c,q,d=[].slice;c=a('/lib/tools.js',b),k=a('/node_modules/es6-promise/dist/commonjs/main.js',b).Promise,g=c.pairs,n=c.keys,q=c.values,m=c.object,f=c.resolveAll,o=c.isPrimitive,p=c.isArray,h=c.objectCreate,j=c.proc,e=function(b,a){return f([b]).then(function(d){var b,c;return b=d[0],a<=0||b==null||o(b)?b:p(b)?f(b.map(function(b){return e(b,a-1)})):(c=f(q(b).map(function(b){return e(b,a-1)})),c.then(function(a){return m(n(b),a)}))})},l=function(c){var a,i,b,f,l;return b={},f={},i=(c!=null?c.depth!=null:!1)?c!=null?c.depth:void 0:1e6,l=function(){return g(b).forEach(function(a){var b,c;return c=a[0],b=a[1],f[c]=function(){var a;return a=1<=arguments.length?d.call(arguments,0):[],this.then(function(c){return e(a,i).then(function(a){return b.apply({value:c},a)})})}})},a=function(l){var c,g,b,j,k;b=e(l,i),g=h(b),j=h(g),g.then=function(){var c;return c=1<=arguments.length?d.call(arguments,0):[],a(b.then.apply(b,c))};for(c in f)k=f[c],j[c]=k;return j},a.mixin=j(function(a){return g(a).forEach(function(d){var e,a,c;return a=d[0],e=d[1],c=b[a],b[a]=function(){var a;return a={value:this.value},c&&(a.base=c),e.apply(a,arguments)}}),l()}),a.mixinAsync=j(function(a){return g(a).forEach(function(e){var f,a,c;return a=e[0],f=e[1],c=b[a],b[a]=function(){var a;return a=1<=arguments.length?d.call(arguments,0):[],new k(function(b){return function(h,e){var d,g;d={value:b.value},c&&(d.base=c),d.done=function(a,b){return a?e(a):h(b)};try{return f.apply(d,a)}catch(a){return g=a,e(g)}}}(this))}}),l()}),a.bindSync=function(c,b){return function(){var e;return e=1<=arguments.length?d.call(arguments,0):[],a(e).then(function(a){return function(d){return c.apply(b!=null?b:a,d)}}(this))}},a.bindAsync=function(c,b){return function(){var e,f;return f=1<=arguments.length?d.call(arguments,0):[],e=b!=null?b:this,a(f).then(function(a){return new k(function(b,f){var g;a.push(function(){var c,a;return c=arguments[0],a=2<=arguments.length?d.call(arguments,1):[],c!=null?f(c):a.length===1?b(a[0]):b(a)});try{return c.apply(e,a)}catch(a){return g=a,f(g)}})})}},a},i=function(){var a;return a=l(),a.init=l,a},typeof window!=='undefined'&&window.require===void 0&&(window.Z=i()),b!==void 0&&(b.exports=i())}.call(this))}),a.define('/node_modules/es6-promise/dist/commonjs/main.js',function(b,c,f,g){'use strict';var d=a('/node_modules/es6-promise/dist/commonjs/promise/promise.js',b).Promise,e=a('/node_modules/es6-promise/dist/commonjs/promise/polyfill.js',b).polyfill;c.Promise=d,c.polyfill=e}),a.define('/node_modules/es6-promise/dist/commonjs/promise/polyfill.js',function(b,e,g,h){'use strict';function f(){var a='Promise'in window&&'cast'in window.Promise&&'resolve'in window.Promise&&'reject'in window.Promise&&'all'in window.Promise&&'race'in window.Promise&&function(a){return new window.Promise(function(b){a=b}),d(a)}();a||(window.Promise=c)}var c=a('/node_modules/es6-promise/dist/commonjs/promise/promise.js',b).Promise,d=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).isFunction;e.polyfill=f}),a.define('/node_modules/es6-promise/dist/commonjs/promise/utils.js',function(f,a,g,h){'use strict';function d(a){return b(a)||typeof a==='object'&&a!==null}function b(a){return typeof a==='function'}function e(a){return Object.prototype.toString.call(a)==='[object Array]'}var c=Date.now||function(){return new Date().getTime()};a.objectOrFunction=d,a.isFunction=b,a.isArray=e,a.now=c}),a.define('/node_modules/es6-promise/dist/commonjs/promise/promise.js',function(b,y,E,D){'use strict';function c(a){if(!f(a))throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');if(!(this instanceof c))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],x(a,this)}function x(c,a){function d(b){i(a,b)}function b(b){e(a,b)}try{c(d,b)}catch(a){b(a)}}function m(j,b,k,l){var c=f(k),a,m,d,n;if(c)try{a=k(l),d=!0}catch(a){n=!0,m=a}else a=l,d=!0;if(p(b,a))return;c&&d?i(b,a):n?e(b,m):j===g?i(b,a):j===h&&e(b,a)}function A(c,d,e,f){var a=c._subscribers,b=a.length;a[b]=d,a[b+g]=e,a[b+h]=f}function o(c,d){var e,f,b=c._subscribers,g=c._detail;for(var a=0;a<b.length;a+=3)e=b[a],f=b[a+d],m(d,e,f,g);c._subscribers=null}function p(a,b){var d=null,c;try{if(a===b)throw new TypeError('A promises callback cannot return that same promise.');if(n(b)&&(d=b.then,f(d)))return d.call(b,function(d){if(c)return!0;c=!0,b!==d?i(a,d):j(a,d)},function(b){if(c)return!0;c=!0,e(a,b)}),!0}catch(b){return c?!0:(e(a,b),!0)}return!1}function i(a,b){a===b?j(a,b):p(a,b)||j(a,b)}function j(a,b){if(a._state!==k)return;a._state=l,a._detail=b,d.async(w,a)}function e(a,b){if(a._state!==k)return;a._state=l,a._detail=b,d.async(B,a)}function w(a){o(a,a._state=g)}function B(a){o(a,a._state=h)}var d=a('/node_modules/es6-promise/dist/commonjs/promise/config.js',b).config,z=a('/node_modules/es6-promise/dist/commonjs/promise/config.js',b).configure,n=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).objectOrFunction,f=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).isFunction,C=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).now,v=a('/node_modules/es6-promise/dist/commonjs/promise/cast.js',b).cast,q=a('/node_modules/es6-promise/dist/commonjs/promise/all.js',b).all,r=a('/node_modules/es6-promise/dist/commonjs/promise/race.js',b).race,s=a('/node_modules/es6-promise/dist/commonjs/promise/resolve.js',b).resolve,t=a('/node_modules/es6-promise/dist/commonjs/promise/reject.js',b).reject,u=a('/node_modules/es6-promise/dist/commonjs/promise/asap.js',b).asap;d.async=u;var k=void 0,l=0,g=1,h=2;c.prototype={constructor:c,_state:undefined,_detail:undefined,_subscribers:undefined,then:function(e,f){var a=this,b=new this.constructor(function(){});if(this._state){var c=arguments;d.async(function d(){m(a._state,b,c[a._state-1],a._detail)})}else A(this,b,e,f);return b},'catch':function(a){return this.then(null,a)}},c.all=q,c.cast=v,c.race=r,c.resolve=s,c.reject=t,y.Promise=c}),a.define('/node_modules/es6-promise/dist/commonjs/promise/asap.js',function(m,j,o,n){'use strict';function l(){return function(){process.nextTick(e)}}function h(){var a=0,c=new d(e),b=document.createTextNode('');return c.observe(b,{characterData:!0}),function(){b.data=a=++a%2}}function i(){return function(){g.setTimeout(e,1)}}function e(){for(var b=0;b<a.length;b++){var c=a[b],d=c[0],e=c[1];d(e)}a=[]}function k(d,e){var b=a.push([d,e]);b===1&&c()}var f=typeof window!=='undefined'?window:{},d=f.MutationObserver||f.WebKitMutationObserver,g=b!==void 0?b:this,a=[],c;typeof process!=='undefined'&&{}.toString.call(process)==='[object process]'?c=l():d?c=h():c=i(),j.asap=k}),a.define('/node_modules/es6-promise/dist/commonjs/promise/reject.js',function(c,a,d,e){'use strict';function b(b){var a=this;return new a(function(c,a){a(b)})}a.reject=b}),a.define('/node_modules/es6-promise/dist/commonjs/promise/resolve.js',function(c,a,d,e){'use strict';function b(b){var a=this;return new a(function(a,c){a(b)})}a.resolve=b}),a.define('/node_modules/es6-promise/dist/commonjs/promise/race.js',function(c,d,f,g){'use strict';function e(a){var c=this;if(!b(a))throw new TypeError('You must pass an array to race.');return new c(function(d,e){var b;for(var c=0;c<a.length;c++)b=a[c],b&&typeof b.then==='function'?b.then(d,e):d(b)})}var b=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',c).isArray;d.race=e}),a.define('/node_modules/es6-promise/dist/commonjs/promise/all.js',function(b,e,g,h){'use strict';function f(a){var b=this;if(!c(a))throw new TypeError('You must pass an array to all.');return new b(function(g,i){function j(a){return function(b){h(a,b)}}function h(a,b){e[a]=b,--f===0&&g(e)}var e=[],f=a.length,c;f===0&&g([]);for(var b=0;b<a.length;b++)c=a[b],c&&d(c.then)?c.then(j(b),i):h(b,c)})}var c=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).isArray,d=a('/node_modules/es6-promise/dist/commonjs/promise/utils.js',b).isFunction;e.all=f}),a.define('/node_modules/es6-promise/dist/commonjs/promise/cast.js',function(c,a,d,e){'use strict';function b(a){if(a&&typeof a==='object'&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.cast=b}),a.define('/node_modules/es6-promise/dist/commonjs/promise/config.js',function(d,b,e,f){'use strict';function c(b,c){if(!(arguments.length===2))return a[b];a[b]=c}var a={instrument:!1};b.config=a,b.configure=c}),a.define('/lib/tools.js',function(c,b,d,e){(function(){var e,d={}.hasOwnProperty;e=a('/node_modules/es6-promise/dist/commonjs/main.js',c).Promise,b.pairs=function(b){var a,e,c;c=[];for(a in b){if(!d.call(b,a))continue;e=b[a],c.push([a,e])}return c},b.keys=function(b){var a,e,c;c=[];for(a in b){if(!d.call(b,a))continue;e=b[a],c.push(a)}return c},b.values=function(a){var b,e,c;c=[];for(b in a){if(!d.call(a,b))continue;e=a[b],c.push(e)}return c},b.object=function(d,g){var a,e,b,c,f;for(b={},a=c=0,f=d.length;c<f;a=++c)e=d[a],b[e]=g[a];return b},b.resolveAll=function(a){return e.all(a)},b.isPrimitive=function(a){var b;return b=['Function','String','Number','Date','RegExp','Boolean'],a===!0||a===!1?!0:b.some(function(b){return Object.prototype.toString.call(a)==='[object '+b+']'})},b.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==='[object Array]'},b.objectCreate=Object.create||function(b){var a;return a=function(){},a.prototype=b,new a},b.proc=function(a){return function(){return void a.apply(this,arguments)}}}.call(this))}),b.Z=a('/lib/index.js')}.call(this,this))
