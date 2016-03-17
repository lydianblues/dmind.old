(function(){var t,e,i,n,r,a,s,o,h,u,c,l,g,p,d,f,m,b,y,v,x,w,D,R,P,S,I=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1},C=[].slice,L={}.hasOwnProperty,M=function(t,e){return function(){return t.apply(e,arguments)}},k=function(t,e){function i(){this.constructor=t}for(var n in e)L.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};P=["extended","included"],f=function(){function t(){}return t["extends"]=function(t){var e,i,n;for(e in t)i=t[e],I.call(P,e)<0&&(this[e]=i);return null!=(n=t.extended)&&n.apply(this),this},t.includes=function(t){var e,i,n;for(e in t)i=t[e],I.call(P,e)<0&&(this.prototype[e]=i);return null!=(n=t.included)&&n.apply(this),this},t.delegate=function(){var t,e,i,n,r,a;for(t=1<=arguments.length?C.call(arguments,0):[],i=t.pop(),a=[],n=0,r=t.length;r>n;n++)e=t[n],a.push(this.prototype[e]=i.prototype[e]);return a},t.aliasFunction=function(t,e){var i=this;return this.prototype[t]=function(){var t;return t=1<=arguments.length?C.call(arguments,0):[],i.prototype[e].apply(i,t)}},t.aliasProperty=function(t,e){return Object.defineProperty(this.prototype,t,{get:function(){return this[e]},set:function(t){return this[e]=t}})},t.included=function(t){return t.call(this,this.prototype)},t}(),S=Array.prototype.slice,t=function(t,e){return null==e&&(e=document),"object"==typeof t||"undefined"!=typeof exports&&null!==exports?t:e.querySelector(t)},w=function(){function t(){}return t.uniqid=function(){var t;return t=0,{get:function(){return t++}}}(),t.extend=function(){var t,e,i,n,r,a,s;for(i=arguments[0],r=2<=arguments.length?C.call(arguments,1):[],e=i,a=0,s=r.length;s>a;a++){t=r[a];for(n in t)L.call(t,n)&&(e[n]=t[n])}return e},t.clampRGB=function(t){return 0>t?0:t>255?255:t},t.copyAttributes=function(t,e,i){var n,r,a,s,o,h;for(null==i&&(i={}),s=t.attributes,h=[],r=0,a=s.length;a>r;r++)n=s[r],null!=i.except&&(o=n.nodeName,I.call(i.except,o)>=0)||h.push(e.setAttribute(n.nodeName,n.nodeValue));return h},t.dataArray=function(t){return null==t&&(t=0),r.NodeJS||null!=window.Uint8Array?new Uint8Array(t):new Array(t)},t}(),"undefined"!=typeof exports&&null!==exports?(v=exports,s=require("canvas"),g=s.Image,u=require("fibers"),D=require("fs"),R=require("http")):v=window,r=function(i){function n(){this.nodeFileReady=M(this.nodeFileReady,this);var t,i,r,a=this;if(0===arguments.length)throw"Invalid arguments";return this instanceof n?(this.finishInit=this.finishInit.bind(this),this.imageLoaded=this.imageLoaded.bind(this),t=arguments[0],n.NodeJS||(r=parseInt(n.getAttrId(t[0]),10),i="function"==typeof t[1]?t[1]:"function"==typeof t[2]?t[2]:function(){},isNaN(r)||!x.has(r))?(this.id=w.uniqid.get(),this.initializedPixelData=this.originalPixelData=null,this.cropCoordinates={x:0,y:0},this.cropped=!1,this.resized=!1,this.pixelStack=[],this.layerStack=[],this.canvasQueue=[],this.currentLayer=null,this.scaled=!1,this.analyze=new e(this),this.renderer=new y(this),this.domIsLoaded(function(){return a.parseArguments(t),a.setup()}),this):x.execute(r,i)):new n(arguments)}return k(n,i),n.version={release:"4.1.2",date:"7/27/2013"},n.DEBUG=!1,n.allowRevert=!0,n.crossOrigin="anonymous",n.remoteProxy="",n.proxyParam="camanProxyUrl",n.NodeJS="undefined"!=typeof exports&&null!==exports,n.autoload=!n.NodeJS,n.toString=function(){return"Version "+n.version.release+", Released "+n.version.date},n.getAttrId=function(e){return n.NodeJS?!0:("string"==typeof e&&(e=t(e)),null==e||null==e.getAttribute?null:e.getAttribute("data-caman-id"))},n.prototype.domIsLoaded=function(t){var e,i=this;return n.NodeJS?setTimeout(function(){return t.call(i)},0):"complete"===document.readyState?(d.debug("DOM initialized"),setTimeout(function(){return t.call(i)},0)):(e=function(){return"complete"===document.readyState?(d.debug("DOM initialized"),t.call(i)):void 0},document.addEventListener("readystatechange",e,!1))},n.prototype.parseArguments=function(t){var e,i,n,r;if(0===t.length)throw"Invalid arguments given";if(this.initObj=null,this.initType=null,this.imageUrl=null,this.callback=function(){},this.setInitObject(t[0]),1!==t.length){switch(typeof t[1]){case"string":this.imageUrl=t[1];break;case"function":this.callback=t[1]}if(2!==t.length&&(this.callback=t[2],4===t.length)){n=t[4],r=[];for(e in n)L.call(n,e)&&(i=n[e],r.push(this.options[e]=i));return r}}},n.prototype.setInitObject=function(e){if(n.NodeJS)return this.initObj=e,void(this.initType="node");if("object"==typeof e?this.initObj=e:this.initObj=t(e),null==this.initObj)throw"Could not find image or canvas for initialization.";return this.initType=this.initObj.nodeName.toLowerCase()},n.prototype.setup=function(){switch(this.initType){case"node":return this.initNode();case"img":return this.initImage();case"canvas":return this.initCanvas()}},n.prototype.initNode=function(){return d.debug("Initializing for NodeJS"),"string"==typeof this.initObj&&this.initObj.match(/^https?:\/\//)?this.readFromHttp(this.initObj,this.nodeFileReady):"string"==typeof this.initObj?D.readFile(this.initObj,this.nodeFileReady):this.nodeFileReady(null,this.initObj)},n.prototype.readFromHttp=function(t,e){var i;return d.debug("Fetching image from "+t),i=R.get(t,function(t){var i;return i="",t.setEncoding("binary"),t.on("data",function(t){return i+=t}),t.on("end",function(){return e(null,new Buffer(i,"binary"))})}),i.on("error",e)},n.prototype.nodeFileReady=function(t,e){if(t)throw t;return this.image=new g,this.image.src=e,d.debug("Image loaded. Width = "+this.imageWidth()+", Height = "+this.imageHeight()),this.canvas=new s(this.imageWidth(),this.imageHeight()),this.finishInit()},n.prototype.initImage=function(){return this.image=this.initObj,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),w.copyAttributes(this.image,this.canvas,{except:["src"]}),null!=this.image.parentNode&&this.image.parentNode.replaceChild(this.canvas,this.image),this.imageAdjustments(),this.waitForImageLoaded()},n.prototype.initCanvas=function(){return this.canvas=this.initObj,this.context=this.canvas.getContext("2d"),null!=this.imageUrl?(this.image=document.createElement("img"),this.image.src=this.imageUrl,this.imageAdjustments(),this.waitForImageLoaded()):this.finishInit()},n.prototype.imageAdjustments=function(){return this.needsHiDPISwap()&&(d.debug(this.image.src,"->",this.hiDPIReplacement()),this.swapped=!0,this.image.src=this.hiDPIReplacement()),l.isRemote(this.image)?(this.image.src=l.proxyUrl(this.image.src),d.debug("Remote image detected, using URL = "+this.image.src)):void 0},n.prototype.waitForImageLoaded=function(){return this.isImageLoaded()?this.imageLoaded():this.image.onload=this.imageLoaded},n.prototype.isImageLoaded=function(){return this.image.complete?null!=this.image.naturalWidth&&0===this.image.naturalWidth?!1:!0:!1},n.prototype.imageWidth=function(){return this.image.width||this.image.naturalWidth},n.prototype.imageHeight=function(){return this.image.height||this.image.naturalHeight},n.prototype.imageLoaded=function(){return d.debug("Image loaded. Width = "+this.imageWidth()+", Height = "+this.imageHeight()),this.swapped?(this.canvas.width=this.imageWidth()/this.hiDPIRatio(),this.canvas.height=this.imageHeight()/this.hiDPIRatio()):(this.canvas.width=this.imageWidth(),this.canvas.height=this.imageHeight()),this.finishInit()},n.prototype.finishInit=function(){var t,e,i,r,a;if(null==this.context&&(this.context=this.canvas.getContext("2d")),this.originalWidth=this.preScaledWidth=this.width=this.canvas.width,this.originalHeight=this.preScaledHeight=this.height=this.canvas.height,this.hiDPIAdjustments(),this.hasId()||this.assignId(),null!=this.image&&this.context.drawImage(this.image,0,0,this.imageWidth(),this.imageHeight(),0,0,this.preScaledWidth,this.preScaledHeight),this.imageData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height),this.pixelData=this.imageData.data,n.allowRevert)for(this.initializedPixelData=w.dataArray(this.pixelData.length),this.originalPixelData=w.dataArray(this.pixelData.length),a=this.pixelData,t=i=0,r=a.length;r>i;t=++i)e=a[t],this.initializedPixelData[t]=e,this.originalPixelData[t]=e;return this.dimensions={width:this.canvas.width,height:this.canvas.height},n.NodeJS||x.put(this.id,this),this.callback.call(this,this),this.callback=function(){}},n.prototype.reloadCanvasData=function(){return this.imageData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height),this.pixelData=this.imageData.data},n.prototype.resetOriginalPixelData=function(){var t,e,i,r,a,s;if(!n.allowRevert)throw"Revert disabled";for(this.originalPixelData=w.dataArray(this.pixelData.length),a=this.pixelData,s=[],t=i=0,r=a.length;r>i;t=++i)e=a[t],s.push(this.originalPixelData[t]=e);return s},n.prototype.hasId=function(){return null!=n.getAttrId(this.canvas)},n.prototype.assignId=function(){return n.NodeJS||this.canvas.getAttribute("data-caman-id")?void 0:this.canvas.setAttribute("data-caman-id",this.id)},n.prototype.hiDPIDisabled=function(){return null!==this.canvas.getAttribute("data-caman-hidpi-disabled")},n.prototype.hiDPIAdjustments=function(){var t;if(!n.NodeJS&&this.needsHiDPISwap())return t=this.hiDPIRatio(),1!==t?(d.debug("HiDPI ratio = "+t),this.scaled=!0,this.preScaledWidth=this.canvas.width,this.preScaledHeight=this.canvas.height,this.canvas.width=this.preScaledWidth*t,this.canvas.height=this.preScaledHeight*t,this.canvas.style.width=""+this.preScaledWidth+"px",this.canvas.style.height=""+this.preScaledHeight+"px",this.context.scale(t,t),this.width=this.originalWidth=this.canvas.width,this.height=this.originalHeight=this.canvas.height):void 0},n.prototype.hiDPIRatio=function(){var t,e;return e=window.devicePixelRatio||1,t=this.context.webkitBackingStorePixelRatio||this.context.mozBackingStorePixelRatio||this.context.msBackingStorePixelRatio||this.context.oBackingStorePixelRatio||this.context.backingStorePixelRatio||1,e/t},n.prototype.hiDPICapable=function(){return null!=window.devicePixelRatio&&1!==window.devicePixelRatio},n.prototype.needsHiDPISwap=function(){return this.hiDPIDisabled()||!this.hiDPICapable()?!1:null!==this.hiDPIReplacement()},n.prototype.hiDPIReplacement=function(){return null==this.image?null:this.image.getAttribute("data-caman-hidpi")},n.prototype.replaceCanvas=function(t){var e;return e=this.canvas,this.canvas=t,this.context=this.canvas.getContext("2d"),n.NodeJS||e.parentNode.replaceChild(this.canvas,e),this.width=this.canvas.width,this.height=this.canvas.height,this.reloadCanvasData(),this.dimensions={width:this.canvas.width,height:this.canvas.height}},n.prototype.render=function(t){var e=this;return null==t&&(t=function(){}),h.trigger(this,"renderStart"),this.renderer.execute(function(){return e.context.putImageData(e.imageData,0,0),t.call(e)})},n.prototype.revert=function(t){var e,i,r,a,s;if(null==t&&(t=!0),!n.allowRevert)throw"Revert disabled";for(s=this.originalVisiblePixels(),e=r=0,a=s.length;a>r;e=++r)i=s[e],this.pixelData[e]=i;return t?this.context.putImageData(this.imageData,0,0):void 0},n.prototype.reset=function(){var t,e,i,n,r,a,s,o,h;for(t=document.createElement("canvas"),w.copyAttributes(this.canvas,t),t.width=this.originalWidth,t.height=this.originalHeight,e=t.getContext("2d"),n=e.getImageData(0,0,t.width,t.height),a=n.data,h=this.initializedPixelData,i=s=0,o=h.length;o>s;i=++s)r=h[i],a[i]=r;return e.putImageData(n,0,0),this.cropCoordinates={x:0,y:0},this.resized=!1,this.replaceCanvas(t)},n.prototype.originalVisiblePixels=function(){var t,e,i,r,a,s,o,h,u,c,l,g,p,d,f,b,y,v,x,w,D;if(!n.allowRevert)throw"Revert disabled";if(c=[],g=this.cropCoordinates.x,r=g+this.width,p=this.cropCoordinates.y,a=p+this.height,this.resized){for(t=document.createElement("canvas"),t.width=this.originalWidth,t.height=this.originalHeight,i=t.getContext("2d"),o=i.getImageData(0,0,t.width,t.height),u=o.data,v=this.originalPixelData,s=f=0,y=v.length;y>f;s=++f)h=v[s],u[s]=h;i.putImageData(o,0,0),l=document.createElement("canvas"),l.width=this.width,l.height=this.height,i=l.getContext("2d"),i.drawImage(t,0,0,this.originalWidth,this.originalHeight,0,0,this.width,this.height),u=i.getImageData(0,0,this.width,this.height).data,d=this.width}else u=this.originalPixelData,d=this.originalWidth;for(s=b=0,x=u.length;x>b;s=b+=4)e=m.locationToCoordinates(s,d),g<=(w=e.x)&&r>w&&p<=(D=e.y)&&a>D&&c.push(u[s],u[s+1],u[s+2],u[s+3]);return c},n.prototype.process=function(t,e){return this.renderer.add({type:c.Type.Single,name:t,processFn:e}),this},n.prototype.processKernel=function(t,e,i,n){var r,a,s;if(null==i&&(i=null),null==n&&(n=0),null==i)for(i=0,r=a=0,s=e.length;s>=0?s>a:a>s;r=s>=0?++a:--a)i+=e[r];return this.renderer.add({type:c.Type.Kernel,name:t,adjust:e,divisor:i,bias:n}),this},n.prototype.processPlugin=function(t,e){return this.renderer.add({type:c.Type.Plugin,plugin:t,args:e}),this},n.prototype.newLayer=function(t){var e;return e=new p(this),this.canvasQueue.push(e),this.renderer.add({type:c.Type.LayerDequeue}),t.call(e),this.renderer.add({type:c.Type.LayerFinished}),this},n.prototype.executeLayer=function(t){return this.pushContext(t)},n.prototype.pushContext=function(t){return this.layerStack.push(this.currentLayer),this.pixelStack.push(this.pixelData),this.currentLayer=t,this.pixelData=t.pixelData},n.prototype.popContext=function(){return this.pixelData=this.pixelStack.pop(),this.currentLayer=this.layerStack.pop()},n.prototype.applyCurrentLayer=function(){return this.currentLayer.applyToParent()},n}(f),v.Caman=r,r.Analyze=function(){function t(t){this.c=t}return t.prototype.calculateLevels=function(){var t,e,i,n,r,a,s;for(e={r:{},g:{},b:{}},t=n=0;255>=n;t=++n)e.r[t]=0,e.g[t]=0,e.b[t]=0;for(t=r=0,s=this.c.pixelData.length;s>r;t=r+=4)e.r[this.c.pixelData[t]]++,e.g[this.c.pixelData[t+1]]++,e.b[this.c.pixelData[t+2]]++;for(i=this.c.pixelData.length/4,t=a=0;255>=a;t=++a)e.r[t]/=i,e.g[t]/=i,e.b[t]/=i;return e},t}(),e=r.Analyze,r.DOMUpdated=function(){var t,e,i,n,r,s;if(e=document.querySelectorAll("img[data-caman]"),e.length>0){for(s=[],n=0,r=e.length;r>n;n++)t=e[n],s.push(i=new a(t,function(){return this.parse(),this.execute()}));return s}},r.autoload&&!function(){return"complete"===document.readyState?r.DOMUpdated():document.addEventListener("DOMContentLoaded",r.DOMUpdated,!1)}(),a=function(){function t(t,e){this.dataStr=t.getAttribute("data-caman"),this.caman=r(t,e.bind(this))}var e;return e="(\\w+)\\((.*?)\\)",t.prototype.parse=function(){var t,i,n,r,a,s,o,h,u,c,l,g,p;if(this.ele=this.caman.canvas,h=new RegExp(e,"g"),u=this.dataStr.match(h),u.length>0){for(h=new RegExp(e),p=[],c=0,l=u.length;l>c;c++){a=u[c],g=a.match(h),o=g[0],n=g[1],t=g[2],s=new Function("return function() {        this."+n+"("+t+");      };");try{r=s(),p.push(r.call(this.caman))}catch(f){i=f,p.push(d.debug(i))}}return p}},t.prototype.execute=function(){var t;return t=this.ele,this.caman.render(function(){return t.parentNode.replaceChild(this.toImage(),t)})},t}(),r.Blender=function(){function t(){}return t.blenders={},t.register=function(t,e){return this.blenders[t]=e},t.execute=function(t,e,i){return this.blenders[t](e,i)},t}(),i=r.Blender,r.Calculate=function(){function t(){}return t.distance=function(t,e,i,n){return Math.sqrt(Math.pow(i-t,2)+Math.pow(n-e,2))},t.randomRange=function(t,e,i){var n;return null==i&&(i=!1),n=t+Math.random()*(e-t),i?n.toFixed(i):Math.round(n)},t.luminance=function(t){return.299*t.r+.587*t.g+.114*t.b},t.bezier=function(t,e,i,n,a,s){var o,h,u,c,l,g,p,d,f,m,b,y,v;if(null==a&&(a=0),null==s&&(s=255),t[0]instanceof Array?(u=t,a=e,s=i):u=[t,e,i,n],u.length<2)throw"Invalid number of arguments to bezier";for(o={},p=function(t,e,i){return t*(1-i)+e*i},h=function(t,e,i){return Math.min(Math.max(t,e),i)},l=b=0;1e3>b;l=++b){for(m=l/1e3,f=u;f.length>1;){for(d=[],g=y=0,v=f.length-2;v>=0?v>=y:y>=v;g=v>=0?++y:--y)d.push([p(f[g][0],f[g+1][0],m),p(f[g][1],f[g+1][1],m)]);f=d}o[Math.round(f[0][0])]=Math.round(h(f[0][1],a,s))}return c=u[u.length-1][0],o=r.Calculate.missingValues(o,c),null==o[c]&&(o[c]=o[c-1]),o},t.hermite=function(t,e,i){var n,a,s,o,h,u,c,l,g,p,d,f,m,b,y,v,x,w,D,R,P,S,I,C,L,M;if(t.length<2)throw"Invalid number of arguments to hermite";for(P={},d=function(t,e,i){return t*(1-i)+e*i},n=function(t,e,i,n){return[t[0]+e[0]+i[0]+n[0],t[1]+e[1]+i[1]+n[1]]},b=function(t,e){return[t[0]*e[0],t[1]*e[1]]},S=function(t,e){return[t[0]-e[0],t[1]-e[1]]},a=function(t,e,i){return Math.min(Math.max(t,e),i)},s=0,g=C=0,M=t.length-2;M>=0?M>=C:C>=M;g=M>=0?++C:--C)for(v=t[g],x=t[g+1],w=x[0]-v[0],D=1/w,g===t.length-2&&(D=1/(w-1)),y=g>0?t[g-1]:v,f=b(S(x,y),[.5,.5]),y=g<t.length-2?t[g+2]:x,m=b(S(y,v),[.5,.5]),p=L=0;w>=0?w>=L:L>=w;p=w>=0?++L:--L)I=p*D,h=2*I*I*I-3*I*I+1,u=I*I*I-2*I*I+I,c=-2*I*I*I+3*I*I,l=I*I*I-I*I,R=n(b(v,[h,h]),b(f,[u,u]),b(x,[c,c]),b(m,[l,l])),P[Math.round(R[0])]=Math.round(a(R[1],e,i)),s+=1;return o=t[t.length-1][0],P=r.Calculate.missingValues(P,o)},t.missingValues=function(t,e){var i,n,r,a,s,o,h;if(Object.keys(t).length<e+1){for(a={},i=o=0;e>=0?e>=o:o>=e;i=e>=0?++o:--o)if(null!=t[i])a[i]=t[i];else{for(r=[i-1,a[i-1]],n=h=i;e>=i?e>=h:h>=e;n=e>=i?++h:--h)if(null!=t[n]){s=[n,t[n]];break}a[i]=r[1]+(s[1]-r[1])/(s[0]-r[0])*(i-r[0])}return a}return t},t}(),n=r.Calculate,r.Convert=function(){function t(){}return t.hexToRGB=function(t){var e,i,n;return"#"===t.charAt(0)&&(t=t.substr(1)),n=parseInt(t.substr(0,2),16),i=parseInt(t.substr(2,2),16),e=parseInt(t.substr(4,2),16),{r:n,g:i,b:e}},t.rgbToHSL=function(t,e,i){var n,r,a,s,o,h;return"object"==typeof t&&(e=t.g,i=t.b,t=t.r),t/=255,e/=255,i/=255,s=Math.max(t,e,i),o=Math.min(t,e,i),a=(s+o)/2,s===o?r=h=0:(n=s-o,h=a>.5?n/(2-s-o):n/(s+o),r=function(){switch(s){case t:return(e-i)/n+(i>e?6:0);case e:return(i-t)/n+2;case i:return(t-e)/n+4}}(),r/=6),{h:r,s:h,l:a}},t.hslToRGB=function(t,e,i){var n,r,a,s,o;return"object"==typeof t&&(e=t.s,i=t.l,t=t.h),0===e?o=r=n=i:(s=.5>i?i*(1+e):i+e-i*e,a=2*i-s,o=this.hueToRGB(a,s,t+1/3),r=this.hueToRGB(a,s,t),n=this.hueToRGB(a,s,t-1/3)),{r:255*o,g:255*r,b:255*n}},t.hueToRGB=function(t,e,i){return 0>i&&(i+=1),i>1&&(i-=1),1/6>i?t+6*(e-t)*i:.5>i?e:2/3>i?t+(e-t)*(2/3-i)*6:t},t.rgbToHSV=function(t,e,i){var n,r,a,s,o,h;return t/=255,e/=255,i/=255,a=Math.max(t,e,i),s=Math.min(t,e,i),h=a,n=a-s,o=0===a?0:n/a,a===s?r=0:(r=function(){switch(a){case t:return(e-i)/n+(i>e?6:0);case e:return(i-t)/n+2;case i:return(t-e)/n+4}}(),r/=6),{h:r,s:o,v:h}},t.hsvToRGB=function(t,e,i){var n,r,a,s,o,h,u,c;switch(s=Math.floor(6*t),r=6*t-s,o=i*(1-e),h=i*(1-r*e),c=i*(1-(1-r)*e),s%6){case 0:u=i,a=c,n=o;break;case 1:u=h,a=i,n=o;break;case 2:u=o,a=i,n=c;break;case 3:u=o,a=h,n=i;break;case 4:u=c,a=o,n=i;break;case 5:u=i,a=o,n=h}return{r:Math.floor(255*u),g:Math.floor(255*a),b:Math.floor(255*n)}},t.rgbToXYZ=function(t,e,i){var n,r,a;return t/=255,e/=255,i/=255,t>.04045?t=Math.pow((t+.055)/1.055,2.4):t/=12.92,e>.04045?e=Math.pow((e+.055)/1.055,2.4):e/=12.92,i>.04045?i=Math.pow((i+.055)/1.055,2.4):i/=12.92,n=.4124*t+.3576*e+.1805*i,r=.2126*t+.7152*e+.0722*i,a=.0193*t+.1192*e+.9505*i,{x:100*n,y:100*r,z:100*a}},t.xyzToRGB=function(t,e,i){var n,r,a;return t/=100,e/=100,i/=100,a=3.2406*t+-1.5372*e+-.4986*i,r=-.9689*t+1.8758*e+.0415*i,n=.0557*t+-.204*e+1.057*i,a>.0031308?a=1.055*Math.pow(a,.4166666667)-.055:a*=12.92,r>.0031308?r=1.055*Math.pow(r,.4166666667)-.055:r*=12.92,n>.0031308?n=1.055*Math.pow(n,.4166666667)-.055:n*=12.92,{r:255*a,g:255*r,b:255*n}},t.xyzToLab=function(t,e,i){var n,r,a,s,o,h;return"object"==typeof t&&(e=t.y,i=t.z,t=t.x),s=95.047,o=100,h=108.883,t/=s,e/=o,i/=h,t=t>.008856451679?Math.pow(t,.3333333333):7.787037037*t+.1379310345,e=e>.008856451679?Math.pow(e,.3333333333):7.787037037*e+.1379310345,i=i>.008856451679?Math.pow(i,.3333333333):7.787037037*i+.1379310345,a=116*e-16,n=500*(t-e),r=200*(e-i),{l:a,a:n,b:r}},t.labToXYZ=function(t,e,i){var n,r,a;return"object"==typeof t&&(e=t.a,i=t.b,t=t.l),r=(t+16)/116,n=r+e/500,a=r-i/200,n=n>.2068965517?n*n*n:.1284185493*(n-.1379310345),r=r>.2068965517?r*r*r:.1284185493*(r-.1379310345),a=a>.2068965517?a*a*a:.1284185493*(a-.1379310345),{x:95.047*n,y:100*r,z:108.883*a}},t.rgbToLab=function(t,e,i){var n;return"object"==typeof t&&(e=t.g,i=t.b,t=t.r),n=this.rgbToXYZ(t,e,i),this.xyzToLab(n)},t.labToRGB=function(t,e,i){},t}(),o=r.Convert,r.Event=function(){function t(){}return t.events={},t.types=["processStart","processComplete","renderStart","renderFinished","blockStarted","blockFinished"],t.trigger=function(t,e,i){var n,r,a,s,o;if(null==i&&(i=null),this.events[e]&&this.events[e].length){for(s=this.events[e],o=[],r=0,a=s.length;a>r;r++)n=s[r],null===n.target||t.id===n.target.id?o.push(n.fn.call(t,i)):o.push(void 0);return o}},t.listen=function(t,e,i){var n,r;return"string"==typeof t&&(r=t,n=e,t=null,e=r,i=n),I.call(this.types,e)<0?!1:(this.events[e]||(this.events[e]=[]),this.events[e].push({target:t,fn:i}),!0)},t}(),h=r.Event,r.Filter=function(){function t(){}return t.Type={Single:1,Kernel:2,LayerDequeue:3,LayerFinished:4,LoadOverlay:5,Plugin:6},t.register=function(t,e){return r.prototype[t]=e},t}(),c=r.Filter,r.IO=function(){function t(){}return t.domainRegex=/(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/,t.isRemote=function(t){return null==t?!1:this.corsEnabled(t)?!1:this.isURLRemote(t.src)},t.corsEnabled=function(t){var e;return null!=t.crossOrigin&&("anonymous"===(e=t.crossOrigin.toLowerCase())||"use-credentials"===e)},t.isURLRemote=function(t){var e;return e=t.match(this.domainRegex),e?e[1]!==document.domain:!1},t.remoteCheck=function(t){if(this.isURLRemote(t)){if(r.remoteProxy.length)return r.isURLRemote(r.remoteProxy)?void d.info("Cannot use a remote proxy for loading images."):this.proxyUrl(t);d.info("Attempting to load a remote image without a configured proxy. URL: "+t)}},t.proxyUrl=function(t){return""+r.remoteProxy+"?"+r.proxyParam+"="+encodeURIComponent(t)},t.useProxy=function(t){var e;return e={ruby:"rb",python:"py",perl:"pl",javascript:"js"},t=t.toLowerCase(),null!=e[t]&&(t=e[t]),"proxies/caman_proxy."+t},t}(),r.prototype.save=function(){return"undefined"!=typeof exports&&null!==exports?this.nodeSave.apply(this,arguments):this.browserSave.apply(this,arguments)},r.prototype.browserSave=function(t){var e;return null==t&&(t="png"),t=t.toLowerCase(),e=this.toBase64(t).replace("image/"+t,"image/octet-stream"),document.location.href=e},r.prototype.nodeSave=function(t,e,i){var n,r;null==e&&(e=!0),null==i&&(i=null);try{if(r=D.statSync(t),r.isFile()&&!e)return!1}catch(a){n=a,d.debug("Creating output file "+t)}return D.writeFile(t,this.canvas.toBuffer(),function(e){return d.debug("Finished writing to "+t),i?i.call(this,e):void 0})},r.prototype.toImage=function(t){var e;return e=new g,e.src=this.toBase64(t),e.width=this.dimensions.width,e.height=this.dimensions.height,window.devicePixelRatio&&(e.width/=window.devicePixelRatio,e.height/=window.devicePixelRatio),e},r.prototype.toBase64=function(t){return null==t&&(t="png"),t=t.toLowerCase(),this.canvas.toDataURL("image/"+t)},l=r.IO,r.Layer=function(){function e(t){this.c=t,this.filter=this.c,this.options={blendingMode:"normal",opacity:1},this.layerID=w.uniqid.get(),this.canvas="undefined"!=typeof exports&&null!==exports?new s:document.createElement("canvas"),this.canvas.width=this.c.dimensions.width,this.canvas.height=this.c.dimensions.height,this.context=this.canvas.getContext("2d"),this.context.createImageData(this.canvas.width,this.canvas.height),this.imageData=this.context.getImageData(0,0,this.canvas.width,this.canvas.height),this.pixelData=this.imageData.data}return e.prototype.newLayer=function(t){return this.c.newLayer.call(this.c,t)},e.prototype.setBlendingMode=function(t){return this.options.blendingMode=t,this},e.prototype.opacity=function(t){return this.options.opacity=t/100,this},e.prototype.copyParent=function(){var t,e,i,n;for(e=this.c.pixelData,t=i=0,n=this.c.pixelData.length;n>i;t=i+=4)this.pixelData[t]=e[t],this.pixelData[t+1]=e[t+1],this.pixelData[t+2]=e[t+2],this.pixelData[t+3]=e[t+3];return this},e.prototype.fillColor=function(){return this.c.fillColor.apply(this.c,arguments)},e.prototype.overlayImage=function(e){return"object"==typeof e?e=e.src:"string"==typeof e&&"#"===e[0]&&(e=t(e).src),e?(this.c.renderer.renderQueue.push({type:c.Type.LoadOverlay,src:e,layer:this}),this):this},e.prototype.applyToParent=function(){var t,e,n,r,a,s,o,h,u;for(n=this.c.pixelStack[this.c.pixelStack.length-1],e=this.c.pixelData,u=[],t=o=0,h=e.length;h>o;t=o+=4)s={r:n[t],g:n[t+1],b:n[t+2],a:n[t+3]},a={r:e[t],g:e[t+1],b:e[t+2],a:e[t+3]},r=i.execute(this.options.blendingMode,a,s),r.r=w.clampRGB(r.r),r.g=w.clampRGB(r.g),r.b=w.clampRGB(r.b),null==r.a&&(r.a=a.a),n[t]=s.r-(s.r-r.r)*(this.options.opacity*(r.a/255)),n[t+1]=s.g-(s.g-r.g)*(this.options.opacity*(r.a/255)),u.push(n[t+2]=s.b-(s.b-r.b)*(this.options.opacity*(r.a/255)));return u},e}(),p=r.Layer,r.Logger=function(){function t(){var t,e,i,n;for(n=["log","info","warn","error"],e=0,i=n.length;i>e;e++)t=n[e],this[t]=function(t){return function(){var e,i;if(e=1<=arguments.length?C.call(arguments,0):[],r.DEBUG)try{return console[t].apply(console,e)}catch(n){return i=n,console[t](e)}}}(t);this.debug=this.log}return t}(),d=new r.Logger,r.Pixel=function(){function t(t,e,i,n,r){this.r=null!=t?t:0,this.g=null!=e?e:0,this.b=null!=i?i:0,this.a=null!=n?n:255,this.c=null!=r?r:null,this.loc=0}return t.coordinatesToLocation=function(t,e,i){return 4*(e*i+t)},t.locationToCoordinates=function(t,e){var i,n;return n=Math.floor(t/(4*e)),i=t%(4*e)/4,{x:i,y:n}},t.prototype.setContext=function(t){return this.c=t},t.prototype.locationXY=function(){var t,e;if(null==this.c)throw"Requires a CamanJS context";return e=this.c.dimensions.height-Math.floor(this.loc/(4*this.c.dimensions.width)),t=this.loc%(4*this.c.dimensions.width)/4,{x:t,y:e}},t.prototype.pixelAtLocation=function(e){if(null==this.c)throw"Requires a CamanJS context";return new t(this.c.pixelData[e],this.c.pixelData[e+1],this.c.pixelData[e+2],this.c.pixelData[e+3],this.c)},t.prototype.getPixelRelative=function(e,i){var n;if(null==this.c)throw"Requires a CamanJS context";return n=this.loc+4*this.c.dimensions.width*(-1*i)+4*e,n>this.c.pixelData.length||0>n?new t(0,0,0,255,this.c):this.pixelAtLocation(n)},t.prototype.putPixelRelative=function(t,e,i){var n;if(null==this.c)throw"Requires a CamanJS context";return n=this.loc+4*this.c.dimensions.width*(-1*e)+4*t,newLoc>this.c.pixelData.length||newLoc<0?void 0:(this.c.pixelData[newLoc]=i.r,this.c.pixelData[newLoc+1]=i.g,this.c.pixelData[newLoc+2]=i.b,this.c.pixelData[newLoc+3]=i.a,!0)},t.prototype.getPixel=function(t,e){var i;if(null==this.c)throw"Requires a CamanJS context";return i=this.coordinatesToLocation(t,e,this.width),this.pixelAtLocation(i)},t.prototype.putPixel=function(t,e,i){var n;if(null==this.c)throw"Requires a CamanJS context";return n=this.coordinatesToLocation(t,e,this.width),this.c.pixelData[n]=i.r,this.c.pixelData[n+1]=i.g,this.c.pixelData[n+2]=i.b,this.c.pixelData[n+3]=i.a},t.prototype.toString=function(){return this.toKey()},t.prototype.toHex=function(t){var e;return null==t&&(t=!1),e="#"+this.r.toString(16)+this.g.toString(16)+this.b.toString(16),t?e+this.a.toString(16):e},t}(),m=r.Pixel,r.Plugin=function(){function t(){}return t.plugins={},t.register=function(t,e){return this.plugins[t]=e},t.execute=function(t,e,i){return this.plugins[e].apply(t,i)},t}(),b=r.Plugin,r.Renderer=function(){function t(t){this.c=t,this.processNext=M(this.processNext,this),this.renderQueue=[],this.modPixelData=null}return t.Blocks=r.NodeJS?require("os").cpus().length:4,t.prototype.add=function(t){return null!=t?this.renderQueue.push(t):void 0},t.prototype.processNext=function(){var t;if(0===this.renderQueue.length)return h.trigger(this,"renderFinished"),null!=this.finishedFn&&this.finishedFn.call(this.c),this;switch(this.currentJob=this.renderQueue.shift(),this.currentJob.type){case c.Type.LayerDequeue:return t=this.c.canvasQueue.shift(),this.c.executeLayer(t),this.processNext();case c.Type.LayerFinished:return this.c.applyCurrentLayer(),this.c.popContext(),this.processNext();case c.Type.LoadOverlay:return this.loadOverlay(this.currentJob.layer,this.currentJob.src);case c.Type.Plugin:return this.executePlugin();default:return this.executeFilter()}},t.prototype.execute=function(t){return this.finishedFn=t,this.modPixelData=w.dataArray(this.c.pixelData.length),this.processNext()},t.prototype.eachBlock=function(e){var i,n,a,s,o,h,c,l,g,p,d,f,m=this;for(this.blocksDone=0,l=this.c.pixelData.length,n=Math.floor(l/4/t.Blocks),i=4*n,c=i+l/4%t.Blocks*4,f=[],h=p=0,d=t.Blocks;d>=0?d>p:p>d;h=d>=0?++p:--p)g=h*i,s=g+(h===t.Blocks-1?c:i),r.NodeJS?(o=u(function(){return e.call(m,h,g,s)}),a=o.run(),f.push(this.blockFinished(a))):f.push(setTimeout(function(t,i,n){return function(){return e.call(m,t,i,n)}}(h,g,s),0));return f},t.prototype.executeFilter=function(){return h.trigger(this.c,"processStart",this.currentJob),this.currentJob.type===c.Type.Single?this.eachBlock(this.renderBlock):this.eachBlock(this.renderKernel)},t.prototype.executePlugin=function(){return d.debug("Executing plugin "+this.currentJob.plugin),b.execute(this.c,this.currentJob.plugin,this.currentJob.args),d.debug("Plugin "+this.currentJob.plugin+" finished!"),this.processNext()},t.prototype.renderBlock=function(e,i,n){var a,s,o;for(d.debug("Block #"+e+" - Filter: "+this.currentJob.name+", Start: "+i+", End: "+n),h.trigger(this.c,"blockStarted",{blockNum:e,totalBlocks:t.Blocks,startPixel:i,endPixel:n}),s=new m,s.setContext(this.c),a=o=i;n>o;a=o+=4)s.loc=a,s.r=this.c.pixelData[a],s.g=this.c.pixelData[a+1],s.b=this.c.pixelData[a+2],s.a=this.c.pixelData[a+3],this.currentJob.processFn(s),this.c.pixelData[a]=w.clampRGB(s.r),this.c.pixelData[a+1]=w.clampRGB(s.g),this.c.pixelData[a+2]=w.clampRGB(s.b),this.c.pixelData[a+3]=w.clampRGB(s.a);return r.NodeJS?u["yield"](e):this.blockFinished(e)},t.prototype.renderKernel=function(t,e,i){var n,a,s,o,h,c,l,g,p,f,b,y,v,x,D,R,P,S;for(y=this.currentJob.name,s=this.currentJob.bias,c=this.currentJob.divisor,b=this.c.pixelData.length,n=this.currentJob.adjust,a=Math.sqrt(n.length),f=[],d.debug("Rendering kernel - Filter: "+this.currentJob.name),e=Math.max(e,4*this.c.dimensions.width*((a-1)/2)),i=Math.min(i,b-4*this.c.dimensions.width*((a-1)/2)),o=(a-1)/2,x=new m,x.setContext(this.c),l=R=e;i>R;l=R+=4){for(x.loc=l,h=0,g=P=-o;o>=-o?o>=P:P>=o;g=o>=-o?++P:--P)for(p=S=o;-o>=o?-o>=S:S>=-o;p=-o>=o?++S:--S)v=x.getPixelRelative(g,p),f[3*h]=v.r,f[3*h+1]=v.g,f[3*h+2]=v.b,h++;D=this.processKernel(n,f,c,s),this.modPixelData[l]=w.clampRGB(D.r),this.modPixelData[l+1]=w.clampRGB(D.g),this.modPixelData[l+2]=w.clampRGB(D.b),this.modPixelData[l+3]=this.c.pixelData[l+3]}return r.NodeJS?u["yield"](t):this.blockFinished(t)},t.prototype.blockFinished=function(e){var i,n,r;if(e>=0&&d.debug("Block #"+e+" finished! Filter: "+this.currentJob.name),this.blocksDone++,h.trigger(this.c,"blockFinished",{blockNum:e,blocksFinished:this.blocksDone,totalBlocks:t.Blocks}),this.blocksDone===t.Blocks){if(this.currentJob.type===c.Type.Kernel)for(i=n=0,r=this.c.pixelData.length;r>=0?r>n:n>r;i=r>=0?++n:--n)this.c.pixelData[i]=this.modPixelData[i];return e>=0&&d.debug("Filter "+this.currentJob.name+" finished!"),h.trigger(this.c,"processComplete",this.currentJob),this.processNext()}},t.prototype.processKernel=function(t,e,i,n){var r,a,s,o;for(a={r:0,g:0,b:0},r=s=0,o=t.length;o>=0?o>s:s>o;r=o>=0?++s:--s)a.r+=t[r]*e[3*r],a.g+=t[r]*e[3*r+1],a.b+=t[r]*e[3*r+2];return a.r=a.r/i+n,a.g=a.g/i+n,a.b=a.b/i+n,a},t.prototype.loadOverlay=function(t,e){var i,n,r=this;return i=new g,i.onload=function(){return t.context.drawImage(i,0,0,r.c.dimensions.width,r.c.dimensions.height),t.imageData=t.context.getImageData(0,0,r.c.dimensions.width,r.c.dimensions.height),t.pixelData=t.imageData.data,r.c.pixelData=t.pixelData,r.processNext()},n=l.remoteCheck(e),i.src=null!=n?n:e},t}(),y=r.Renderer,r.Store=function(){function t(){}return t.items={},t.has=function(t){return null!=this.items[t]},t.get=function(t){return this.items[t]},t.put=function(t,e){return this.items[t]=e},t.execute=function(t,e){var i=this;return setTimeout(function(){
return e.call(i.get(t),i.get(t))},0),this.get(t)},t.flush=function(t){return null==t&&(t=!1),t?delete this.items[t]:this.items={}},t}(),x=r.Store,i.register("normal",function(t,e){return{r:t.r,g:t.g,b:t.b}}),i.register("multiply",function(t,e){return{r:t.r*e.r/255,g:t.g*e.g/255,b:t.b*e.b/255}}),i.register("screen",function(t,e){return{r:255-(255-t.r)*(255-e.r)/255,g:255-(255-t.g)*(255-e.g)/255,b:255-(255-t.b)*(255-e.b)/255}}),i.register("overlay",function(t,e){var i;return i={},i.r=e.r>128?255-2*(255-t.r)*(255-e.r)/255:e.r*t.r*2/255,i.g=e.g>128?255-2*(255-t.g)*(255-e.g)/255:e.g*t.g*2/255,i.b=e.b>128?255-2*(255-t.b)*(255-e.b)/255:e.b*t.b*2/255,i}),i.register("difference",function(t,e){return{r:t.r-e.r,g:t.g-e.g,b:t.b-e.b}}),i.register("addition",function(t,e){return{r:e.r+t.r,g:e.g+t.g,b:e.b+t.b}}),i.register("exclusion",function(t,e){return{r:128-2*(e.r-128)*(t.r-128)/255,g:128-2*(e.g-128)*(t.g-128)/255,b:128-2*(e.b-128)*(t.b-128)/255}}),i.register("softLight",function(t,e){var i;return i={},i.r=e.r>128?255-(255-e.r)*(255-(t.r-128))/255:e.r*(t.r+128)/255,i.g=e.g>128?255-(255-e.g)*(255-(t.g-128))/255:e.g*(t.g+128)/255,i.b=e.b>128?255-(255-e.b)*(255-(t.b-128))/255:e.b*(t.b+128)/255,i}),i.register("lighten",function(t,e){return{r:e.r>t.r?e.r:t.r,g:e.g>t.g?e.g:t.g,b:e.b>t.b?e.b:t.b}}),i.register("darken",function(t,e){return{r:e.r>t.r?t.r:e.r,g:e.g>t.g?t.g:e.g,b:e.b>t.b?t.b:e.b}}),c.register("fillColor",function(){var t;return t=1===arguments.length?o.hexToRGB(arguments[0]):{r:arguments[0],g:arguments[1],b:arguments[2]},this.process("fillColor",function(e){return e.r=t.r,e.g=t.g,e.b=t.b,e.a=255,e})}),c.register("brightness",function(t){return t=Math.floor(255*(t/100)),this.process("brightness",function(e){return e.r+=t,e.g+=t,e.b+=t,e})}),c.register("saturation",function(t){return t*=-.01,this.process("saturation",function(e){var i;return i=Math.max(e.r,e.g,e.b),e.r!==i&&(e.r+=(i-e.r)*t),e.g!==i&&(e.g+=(i-e.g)*t),e.b!==i&&(e.b+=(i-e.b)*t),e})}),c.register("vibrance",function(t){return t*=-1,this.process("vibrance",function(e){var i,n,r;return r=Math.max(e.r,e.g,e.b),n=(e.r+e.g+e.b)/3,i=2*Math.abs(r-n)/255*t/100,e.r!==r&&(e.r+=(r-e.r)*i),e.g!==r&&(e.g+=(r-e.g)*i),e.b!==r&&(e.b+=(r-e.b)*i),e})}),c.register("greyscale",function(t){return this.process("greyscale",function(t){var e;return e=n.luminance(t),t.r=e,t.g=e,t.b=e,t})}),c.register("contrast",function(t){return t=Math.pow((t+100)/100,2),this.process("contrast",function(e){return e.r/=255,e.r-=.5,e.r*=t,e.r+=.5,e.r*=255,e.g/=255,e.g-=.5,e.g*=t,e.g+=.5,e.g*=255,e.b/=255,e.b-=.5,e.b*=t,e.b+=.5,e.b*=255,e})}),c.register("hue",function(t){return this.process("hue",function(e){var i,n,r,a,s,h;return a=o.rgbToHSV(e.r,e.g,e.b),r=100*a.h,r+=Math.abs(t),r%=100,r/=100,a.h=r,h=o.hsvToRGB(a.h,a.s,a.v),s=h.r,n=h.g,i=h.b,e.r=s,e.g=n,e.b=i,e})}),c.register("colorize",function(){var t,e;return 2===arguments.length?(e=o.hexToRGB(arguments[0]),t=arguments[1]):4===arguments.length&&(e={r:arguments[0],g:arguments[1],b:arguments[2]},t=arguments[3]),this.process("colorize",function(i){return i.r-=(i.r-e.r)*(t/100),i.g-=(i.g-e.g)*(t/100),i.b-=(i.b-e.b)*(t/100),i})}),c.register("invert",function(){return this.process("invert",function(t){return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,t})}),c.register("sepia",function(t){return null==t&&(t=100),t/=100,this.process("sepia",function(e){return e.r=Math.min(255,e.r*(1-.607*t)+e.g*(.769*t)+e.b*(.189*t)),e.g=Math.min(255,e.r*(.349*t)+e.g*(1-.314*t)+e.b*(.168*t)),e.b=Math.min(255,e.r*(.272*t)+e.g*(.534*t)+e.b*(1-.869*t)),e})}),c.register("gamma",function(t){return this.process("gamma",function(e){return e.r=255*Math.pow(e.r/255,t),e.g=255*Math.pow(e.g/255,t),e.b=255*Math.pow(e.b/255,t),e})}),c.register("noise",function(t){return t=2.55*Math.abs(t),this.process("noise",function(e){var i;return i=n.randomRange(-1*t,t),e.r+=i,e.g+=i,e.b+=i,e})}),c.register("clip",function(t){return t=2.55*Math.abs(t),this.process("clip",function(e){return e.r>255-t?e.r=255:e.r<t&&(e.r=0),e.g>255-t?e.g=255:e.g<t&&(e.g=0),e.b>255-t?e.b=255:e.b<t&&(e.b=0),e})}),c.register("channels",function(t){var e,i;if("object"!=typeof t)return this;for(e in t)L.call(t,e)&&(i=t[e],0!==i?t[e]/=100:delete t[e]);return 0===t.length?this:this.process("channels",function(e){return null!=t.red&&(t.red>0?e.r+=(255-e.r)*t.red:e.r-=e.r*Math.abs(t.red)),null!=t.green&&(t.green>0?e.g+=(255-e.g)*t.green:e.g-=e.g*Math.abs(t.green)),null!=t.blue&&(t.blue>0?e.b+=(255-e.b)*t.blue:e.b-=e.b*Math.abs(t.blue)),e})}),c.register("curves",function(){var t,e,i,r,a,s,o,h,u,c,l,g;if(i=arguments[0],r=2<=arguments.length?C.call(arguments,1):[],o=r[r.length-1],"function"==typeof o?(t=o,r.pop()):"string"==typeof o?(t=n[o],r.pop()):t=n.bezier,"string"==typeof i&&(i=i.split("")),"v"===i[0]&&(i=["r","g","b"]),r.length<2)throw"Invalid number of arguments to curves filter";if(e=t(r,0,255),h=r[0],h[0]>0)for(s=u=0,l=h[0];l>=0?l>u:u>l;s=l>=0?++u:--u)e[s]=h[1];if(a=r[r.length-1],a[0]<255)for(s=c=g=a[0];255>=g?255>=c:c>=255;s=255>=g?++c:--c)e[s]=a[1];return this.process("curves",function(t){var n,r;for(s=n=0,r=i.length;r>=0?r>n:n>r;s=r>=0?++n:--n)t[i[s]]=e[t[i[s]]];return t})}),c.register("exposure",function(t){var e,i,n;return n=Math.abs(t)/100,e=[0,255*n],i=[255-255*n,255],0>t&&(e=e.reverse(),i=i.reverse()),this.curves("rgb",[0,0],e,i,[255,255])}),r.Plugin.register("crop",function(t,e,i,n){var r,a;return null==i&&(i=0),null==n&&(n=0),"undefined"!=typeof exports&&null!==exports?r=new s(t,e):(r=document.createElement("canvas"),w.copyAttributes(this.canvas,r),r.width=t,r.height=e),a=r.getContext("2d"),a.drawImage(this.canvas,i,n,t,e,0,0,t,e),this.cropCoordinates={x:i,y:n},this.cropped=!0,this.replaceCanvas(r)}),r.Plugin.register("resize",function(t){var e,i;return null==t&&(t=null),null===t||null==t.width&&null==t.height?void d.error("Invalid or missing dimensions given for resize"):(null==t.width?t.width=this.canvas.width*t.height/this.canvas.height:null==t.height&&(t.height=this.canvas.height*t.width/this.canvas.width),"undefined"!=typeof exports&&null!==exports?e=new s(t.width,t.height):(e=document.createElement("canvas"),w.copyAttributes(this.canvas,e),e.width=t.width,e.height=t.height),i=e.getContext("2d"),i.drawImage(this.canvas,0,0,this.canvas.width,this.canvas.height,0,0,t.width,t.height),this.resized=!0,this.replaceCanvas(e))}),r.Filter.register("crop",function(){return this.processPlugin("crop",Array.prototype.slice.call(arguments,0))}),r.Filter.register("resize",function(){return this.processPlugin("resize",Array.prototype.slice.call(arguments,0))})}).call(this);