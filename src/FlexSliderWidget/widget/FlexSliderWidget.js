/*jslint white:true, nomen:true, plusplus:true, vars:true */
/*jshint browser:true */
/*global mx, define, require, browser, devel, console, document */
/*mendix */
/*
    FlexSliderWidget
    ========================

    @file      : FlexSliderWidget.js
    @version   : 1.1
    @author    : Marcus Groen
    @date      : Thu, 12 Mar 2015 17:58:43 GMT
    @copyright : Incentro
    @license   : Apache 2

    Documentation
    ========================
    FlexSlider for Mendix.
*/
define([
  "dojo/_base/declare", "mxui/widget/_WidgetBase", "mxui/dom", "dojo/dom",
  "dojo/query", "dojo/dom-prop", "dojo/dom-geometry", "dojo/dom-class",
  "dojo/dom-style", "dojo/dom-construct", "dojo/_base/array",
  "dojo/_base/lang", "dojo/text", "dojo/html", "dojo/_base/event",
  "FlexSliderWidget/lib/jquery-1.11.2", "FlexSliderWidget/lib/jquery.easing",
  "FlexSliderWidget/lib/jquery.mousewheel", "FlexSliderWidget/lib/jquery.flexslider"
], function (declare, _WidgetBase, dom, dojoDom, domQuery, domProp, domGeom,
              domClass, domStyle, domConstruct, dojoArray, lang, text, html,
              event, _jQuery, easing, mousewheel, flexslider) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widgets prototype.
    return declare("FlexSliderWidget.widget.FlexSliderWidget", [ _WidgetBase ], {

        /* BEGIN - Parameters configured in the Modeler. */
        
        containerString: ".flexslider",
        namespaceString: "flex-",
        selectorString: ".slides > div",
        animationString: "fade",
        easingString: "swing",
        directionString: "horizontal",
        reverseBoolean: false,
        animationLoopBoolean: false,
        smoothHeigthBoolean: false,
        startAtInteger: 0,
        slideshowBoolean: true,
        slideshowSpeedInteger: 7000,
        animationSpeedInteger: 600,
        initDelayInteger: 0,
        randomizeBoolean: false,
        
        // Usability
        pauseOnActionBoolean: true,
        pauseOnHoverBoolean: false,
        useCSSBoolean: true,
        touchBoolean: true,
        videoBoolean: false,
        
        // Primary Controls
        controlNavBoolean: true,
        directionNavBoolean: true,
        prevTextString: "Previous",
        nextTextString: "Next",
      
        // Carousel Options
        itemWidthInteger: 0,
        itemMarginInteger: 0,
        minItemsInteger: 1,
        maxItemsInteger: 0,
        
        /* END - Parameters configured in the Modeler. */

        // Internal variables.
        _contextObj: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () { },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
          // Filter options.
          var options = $.extend({},{
            namespace: (this.namespaceString.trim() !== "") ? this.namespaceString.trim() : undefined,
            selector: (this.selectorString.trim() !== "") ? this.selectorString.trim() : undefined,
            animation: this.animationString,
            easing: (this.easingString.trim() !== "") ? this.easingString.trim() : undefined,
            direction: (this.directionString.trim() !== "") ? this.directionString.trim() : undefined,
            reverse: this.reverseBoolean,
            animationLoop: this.animationLoopBoolean,
            smoothHeigth: this.smoothHeigthBoolean,
            startAt: (this.startAtInteger !== 0) ? this.startAtInteger : undefined,
            slideshow: this.slideshowBoolean,
            slideshowSpeed: (this.slideshowBoolean !== false) ? this.slideshowSpeedInteger : undefined,
            animationSpeed: (this.slideshowBoolean !== false) ? this.animationSpeedInteger : undefined,
            initDelay: (this.initDelayInteger !== 0) ? this.initDelayInteger : undefined,
            randomize: this.randomizeBoolean,
            // Usability
            pauseOnAction: this.pauseOnActionBoolean,
            pauseOnHover: this.pauseOnHoverBoolean,
            useCSS: this.useCSSBoolean,
            touch: this.touchBoolean,
            video: this.videoBoolean,
            // Primary Controls
            controlNav: this.controlNavBoolean,
            directionNav: this.directionNavBoolean,
            prevText: (this.prevTextString.trim() !== "") ? this.prevTextString.trim() : undefined,
            nextText: (this.nextTextString.trim() !== "") ? this.nextTextString.trim() : undefined,
            // Carousel Options
            itemWidth: (this.itemWidthInteger !== 0) ? this.itemWidthInteger : undefined,
            itemMargin: (this.itemMarginInteger !== 0) ? this.itemMarginInteger : undefined,
            minItems: (this.minItemsInteger !== 1) ? this.minItemsInteger : undefined,
            maxItems: (this.maxItemsInteger !== 0) ? this.maxItemsInteger : undefined
          });
          
          // Attach flexslider to target container.
          $(this.containerString).flexslider(options);
          
          // Setup events.
          this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            this._contextObj = obj;
            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () { },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () { },

        // mxui.widget._WidgetBase.resize is called when the pages layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) { },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            // Set on click event on toggle bullets.
            $(function(){
              var toggles = $(this.containerString + " .toggle a"),
                  codes = $(this.containerString + " .code");

              toggles.on("click", function(event){
                event.preventDefault();
                var $this = $(this);

                if (!$this.hasClass("active")) {
                  toggles.removeClass("active");
                  $this.addClass("active");
                  codes.hide().filter(this.hash).show();
                }
              });
              toggles.first().click();
            });
        }
    });
});
require(["FlexSliderWidget/widget/FlexSliderWidget"], function () {
    "use strict";
});
