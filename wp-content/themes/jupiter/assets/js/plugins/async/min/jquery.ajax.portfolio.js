!function(t){var e="waitForImages";t.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"]},t.expr[":"].uncached=function(e){if(!t(e).is('img[src!=""]'))return!1;var i=new Image;return i.src=e.src,!i.complete},t.fn.waitForImages=function(i,a,n){var r=0,s=0;if(t.isPlainObject(arguments[0])&&(n=arguments[0].waitForAll,a=arguments[0].each,i=arguments[0].finished),i=i||t.noop,a=a||t.noop,n=!!n,!t.isFunction(i)||!t.isFunction(a))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var o=t(this),c=[],l=t.waitForImages.hasImageProperties||[],h=/url\(\s*(['"]?)(.*?)\1\s*\)/g;n?o.find("*").addBack().each(function(){var e=t(this);e.is("img:uncached")&&c.push({src:e.attr("src"),element:e[0]}),t.each(l,function(t,i){var a,n=e.css(i);if(!n)return!0;for(;a=h.exec(n);)c.push({src:a[2],element:e[0]})})}):o.find("img:uncached").each(function(){c.push({src:this.src,element:this})}),r=c.length,s=0,0===r&&i.call(o[0]),t.each(c,function(n,c){var l=new Image;t(l).on("load."+e+" error."+e,function(t){return s++,a.call(c.element,s,r,"load"==t.type),s==r?(i.call(o[0]),!1):void 0}),l.src=c.src})})}}(jQuery),function(t,e,i,a){"use strict";function n(e,i){this.element=t(e),this.settings=t.extend({},s,i),this.init()}var r="ajaxPortfolio",s={propertyName:"value",extraOffset:100};n.prototype={init:function(){var t=this;this.cacheElements(),this.grid.waitForImages(function(){t.bind_handler()}),MK.utils.eventManager.subscribe("post-addition",t.cacheElements.bind(this))},cacheElements:function(){var i=this;return this.grid=this.element.find(".mk-portfolio-container"),this.items=this.grid.children(),this.items.length<1?!1:(this.ajaxDiv=this.element.find("div.ajax-container"),this.filter=this.element.find("#mk-filter-portfolio"),this.loader=this.element.find(".portfolio-loader"),this.triggers=this.items.find(".project-load"),this.closeBtn=this.ajaxDiv.find(".close-ajax"),this.nextBtn=this.ajaxDiv.find(".next-ajax"),this.prevBtn=this.ajaxDiv.find(".prev-ajax"),this.api={},this.id=null,this.win=t(e),this.loading=!1,this.breakpointT=989,this.breakpointP=767,this.columns=this.grid.data("columns"),this.real_col=this.columns,1==this.items.length?(this.nextBtn.hide(),this.prevBtn.hide()):(this.nextBtn.show(),this.prevBtn.show()),this.element.data("current",null),void this.grid.waitForImages(function(){i.bind_handler()}))},bind_handler:function(){function e(){if(r.loading)return!1;t("html:not(:animated),body:not(:animated)").animate({scrollTop:r.ajaxDiv.offset().top-160-r.settings.extraOffset},700);var e=t(this),i=e.parents(".mk-portfolio-item");return e.hasClass("active")?!1:(r.element.data("current",i.index()),r.close_project(),r.triggers.removeClass("active"),e.addClass("active"),r.grid.addClass("grid-open"),r.id=e.data("post-id"),MK.ui.loader.add(t(this).parents(".featured-image")),r.load_project(),r.loading=!0,!1)}function i(){return r.loading?!1:(r.element.data("current")===r.triggers.length?r.triggers.eq(0).trigger("click"):r.triggers.eq(r.element.data("current")).trigger("click"),r.loading=!0,!1)}function a(){return r.loading?!1:(0===r.element.data("current")?r.triggers.eq(r.triggers.length-1).trigger("click"):r.triggers.eq(r.element.data("current")-2).trigger("click"),r.loading=!0,!1)}function n(){return r.close_project(),r.triggers.removeClass("active"),r.grid.removeClass("grid-open"),!1}var r=this;r.triggers.off().on("click",e),r.nextBtn.off().on("click",i),r.prevBtn.off().on("click",a),r.closeBtn.off().on("click",n),MK.utils.eventManager.subscribe("filter",r.close_project.bind(r))},close_project:function(){var t=this,e=t.ajaxDiv.find(".ajax_project"),i=e.outerHeight();t.ajaxDiv.find("iframe").attr("src",""),t.ajaxDiv.height()>0?t.ajaxDiv.css("height",i+"px").animate({height:0,opacity:0},600):t.ajaxDiv.animate({height:0,opacity:0},600),t.loading=!1},load_project:function(){var e=this;t.ajax({url:ajaxurl,data:{action:"mk_ajax_portfolio",id:e.id},success:function(t){e.ajaxDiv.find(".ajax_project").remove(),e.ajaxDiv.append(t),e.project_factory()}})},project_factory:function(){var t=this,i=this.ajaxDiv.find(".ajax_project");i.waitForImages(function(){e.ajaxInit(),setTimeout(e.ajaxDelayedInit,1e3),MK.core.initAll(i),setTimeout(function(){var e=i.outerHeight();t.ajaxDiv.animate({opacity:1,height:e+60,marginBottom:20},400),MK.ui.loader.remove(".featured-image"),MK.utils.eventManager.publish("ajax-preview"),t.loading=!1},300)})}},t.fn[r]=function(e){return this.each(function(){t.data(this,"plugin_"+r),new n(this,e)})}}(jQuery,window,document);