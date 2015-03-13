/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */
/*
    FlexSliderWidget
    ========================

    @file      : FlexSliderWidget.js
    @version   : 1.0
    @author    : Marcus Groen
    @date      : Thu, 12 Mar 2015 17:58:43 GMT
    @copyright : Incentro
    @license   : Apache 2

    Documentation
    ========================
    FlexSlider for Mendix.
*/

require({
    packages: [{ name: 'jquery', location: '../../widgets/FlexSliderWidget/lib', main: 'jquery-1.11.2.min' },
               { name: 'easing', location: '../../widgets/FlexSliderWidget/lib', main: 'jquery.easing' },
               { name: 'mousewheel', location: '../../widgets/FlexSliderWidget/lib', main: 'jquery.mousewheel' },
               { name: 'flexslider', location: '../../widgets/FlexSliderWidget/lib', main: 'jquery.flexslider-min' }]
}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin', 'mxui/dom', 'dojo/dom', 'dojo/query',
    'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array',
    'dojo/_base/lang', 'dojo/text', 'jquery', 'easing', 'mousewheel', 'flexslider'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle,
              domConstruct, dojoArray, lang, text, $, easing, mousewheel, flexslider) {
    'use strict';
    
    // Declare widget's prototype.
    return declare('FlexSliderWidget.widget.FlexSliderWidget', [ _WidgetBase ], {

        /* BEGIN - Parameters configured in the Modeler. */
        
        // Setup values.
        containerString: "",
        namespaceString: "",
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
        
        /* END - Parameters configured in the Modeler. */

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._objProperty = {};
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            
            // Attach flexslider to target container.
            $(this.containerString).flexslider({
                
                // Setup values.
                namespace: this.namespaceString,
                selector: this.selectorString,
                animation: this.animationString,
                animationLoop: this.animationLoopBoolean,
                smoothHeigth: this.smoothHeigthBoolean,
                startAt: this.startAtInteger,
                slideshow: this.slideshowBoolean,
                slideshowSpeed: this.slideshowSpeedInteger,
                animationSpeed: this.animationSpeedInteger,
                initDelay: this.initDelayInteger,
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
                prevText: this.prevTextString,
                nextText: this.nextTextString
                
            });
            
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');
            this._contextObj = obj;
            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _setupEvents: function () {
            // Set on click event on toggle bullets.
            $(function(){
              var toggles = $(this.containerString + ' .toggle a'),
                  codes = $(this.containerString + ' .code');

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
