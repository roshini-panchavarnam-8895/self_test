import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import './lyte-button.js';
import './lyte-wormhole.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";

/**
 * Renders an alert
 * @component lyte-alert
 * @version 1.0.0
 * @dependencies lyte-button,lyte-wormhole
 */

class LyteAlertComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
        return Object.assign(super.data({
            /**
             * This specifies the type of the alert.
             * @componentProperty {success|error|warning|info|confirm} ltPropType
             * @version 1.0.0
             */
            "ltPropType":prop("string",{"default": ""}),

            /**
             * Set this property true to show the alert, false to hide. Note: Boolean values cannot be set using element attributes. Use ltProp() method of the element.
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropShow":prop("boolean",{"default": false}),

            /**
             *This property sets given class to wrapper div of Alert. This helps you to identify your Alert and also to make style changes to that.
             * @componentProperty {string} ltPropWrapperClass
             * @version 1.0.0
             */
            "ltPropWrapperClass":prop("string",{"default": ""}),

            /**
             * @componentProperty {boolean} ltPropAllowMultiple
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropAllowMultiple":prop("boolean",{"default": false}),

            /**
             * @componentProperty {string} ltPropHeading
             * @version 1.0.0
             */
            "ltPropHeading":prop("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropPrimaryMessage
             * @version 1.0.0
             */
            "ltPropPrimaryMessage":prop("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropSecondaryMessage
             * @version 1.0.0
             */
            "ltPropSecondaryMessage":prop("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropTop
             * @version 1.0.0
             * @suffix px,%,em
             * @default 40px
             */
            "ltPropTop":prop("string",{"default":"40px"}),

            /**
             * @componentProperty {array} ltPropButtons
             * @version 1.0.0
             * @default []
             */
            "ltPropButtons":prop("array",{"default": []}),

            /**
             * @componentProperty {left|center|right} ltPropButtonPosition
             * @version 1.0.0
             * @default right
             */
            "ltPropButtonPosition":prop("string",{"default": "right"}),

            /**
             * @componentProperty {boolean} ltPropShowCloseButton
             * @version 1.0.0
             * @default true
             *
             */
            "ltPropShowCloseButton":prop("boolean",{"default": true}),

            /**
             * @componentProperty {boolean} ltPropCloseOnEscape
             * @version 1.0.0
             * @default true
             *
             */
            "ltPropCloseOnEscape":prop("boolean",{"default": true}),
            /**
             * @typedef {object} dimmer
             * @property {colorstring} color=black
             * @property {number} opacity=0.4
             * @minValue 0
             * @maxValue 1
             * @step 0.1
             */
            /**
             * @componentProperty {dimmer} ltPropDimmer
             * @version 1.0.0
             */
            "ltPropDimmer":prop("object",{"default":{"color":"black","opacity":"0.4"}}),

            /**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropYield":prop("boolean",{"default":false}),

            /**
             * @componentProperty {slideDown|zoomIn} ltPropAnimation=slideDown
             * @version 2.0.0
             */
            "ltPropAnimation" : prop("string",{"default":"slideDown"}), //Other value zoomIn

            /**
             * @componentProperty {left|center} ltPropContentAlign=left
             * @version 2.0.0
             */
            "ltPropContentAlign" : prop("string",{"default" : "left"}), //other value center

            /**
             * @componentProperty {boolean} ltPropAria
             * @version 3.1.0
             * @default false
             *
             */
            "ltPropAria" : prop( 'boolean', { default : false } ),

            /**
             * @componentProperty {object} ltPropAriaAttributes
             * @version 3.1.0
             */
            "ltPropAriaAttributes" : prop( 'object', { default : {}, watch:true } ),

            /**
             * @componentProperty {boolean} ltPropPreventFocus
             * @version 3.3.0
             * @default false
             *
             */
            "ltPropPreventFocus" : prop('boolean', { default : false } ),
            "ltPropFocusOnClose" : prop('boolean' , {
                default : false
            }),


            
            "nonYieldFooter" : prop("boolean",{"default":true}),
            "triggerShow" : prop("number",{"default":0}),
            "escClicked" : prop('object',{"default" : {}})
        }), arg1);
    }

    didConnect() {
        if(this.$node.ltProp("show")){
            this.setData('triggerShow',this.getData('triggerShow')+1);
        }
    }

    /**
     * The method is going to add the aria properties to the alert component
     *
     */
    addAriaValues() {
        if(this.getData('ltPropAria')){
            var ariaProp = this.getData('ltPropAriaAttributes') || {};
            if('aria-labelledby' in ariaProp){
                var header = this.getAlertWidget('header');
                if(header){
                    header.classList.add( ariaProp['aria-labelledby'] );
                }
            }
            if('aria-describedby' in ariaProp){
                var content = this.getAlertWidget('content');
                if(content){
                    content.classList.add(ariaProp['aria-describedby']);
                }
            }
            window._lyteUiUtils.setAttribute( this.getAlertWidget(), ariaProp, {} );
            var closeIcon = this.getAlertWidget('close');
            if(closeIcon){
                closeIcon.setAttribute('aria-label',ariaProp['close-label'] || 'Close icon at top right position');
            }
        }
    }

    /**
     * The method is going to return the element from the alert based on the prop value
     * @param {property} prop - The type of element to be returned
     *
     */
    getAlertWidget(prop) {
        if(prop === "header"){
            return this.getData('ltPropYield') ? this.childComp.querySelector('lyte-alert-header') : this.childComp.querySelector('.alertHeader');
        }
        else if(prop === "content"){
            return this.getData('ltPropYield') ? this.childComp.querySelector('lyte-alert-content') : this.childComp.querySelector('.alertContentMiddle');
        }
        else if(prop === "close"){
            return this.childComp.querySelector('.alertClose');
        }
        else{
            return this.childComp.querySelector('.alertPopup');
        }
    }

    printId() {
        console.log("this.openTId ---> "+this.openTId);
        console.log("this.showTId ---> "+this.showTId);
        console.log("this.closeTId ---> "+this.closeTId);
        console.log("this.sId ---> "+this.sId);
    }

    closeAlertFn() {

        /**
        * @method onClose
        * @version 1.0.0
        */
        if(this.getMethods("onClose")){
          this.executeMethod("onClose",this,this.getData('escClicked'));
          this.setData('escClicked' , {})
        }
    }

    /**
     * The method is going to add the left and top values to the alert
     * Add the configurations for the button which are provided using ltPropButtons
     * Makes the alert visible
     *
     */
    showAlert() {
        var self = this;
        this.showTId = setTimeout(function(){
            delete self.showTId;
            if(self.actualModalDiv){
                window._lyteUiUtils.dispatchEvent('lyteAlertBeforeOpened' , self.actualModalDiv)
                window.LytePopup.bindTransitionEnd(self.actualModalDiv);
                if(self.getData('ltPropTop') == "center"){
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    self.actualModalDiv.style.top = (h - self.actualModalDiv.getBoundingClientRect().height)/2 + "px";
                }
                else{
                    self.actualModalDiv.style.top = self.getData('ltPropTop');
                }
                if(self.getData("ltPropAnimation") == "zoomIn"){
                    self.actualModalDiv.classList.add('alertOpened');
                }
                self.$node.classList.add('lyteAlertOpened');
                /**
                * @method onShow
                * @version 2.2.0
                */
                if(self.getMethods('onShow')){
                    self.executeMethod('onShow',self);
                }
                setTimeout(function(){
                    window._lyteUiUtils.dispatchEvent('lyteAlertOpened' , self.actualModalDiv)
                },310)
            }
            else{
                if(self.getData('ltPropShow')){
                    self.setData('ltPropShow',false);
                }
            }
        },100);
        this.setData('ltPropShowCopy',true);
        this.addAriaValues();

        // This is the animation part check
        // Two types of animation slidedown and zoomIn

        if(this.getData("ltPropAnimation") == "slideDown"){
            this.actualModalDiv.classList.add('lyteAlertSlideDown');
        }
        else if(this.getData("ltPropAnimation") == "zoomIn"){
            this.actualModalDiv.classList.add('lyteAlertZoomIn');
        }

        // This check is for a footer button that is been given from component side


        if(this.getData('ltPropButtons') && this.getData('nonYieldFooter')){
            var buttons = this.getData('ltPropButtons');
            var buttonComp;
            for(var i=0; i<buttons.length; i++){
                buttonComp = this.actualModalDiv.querySelectorAll(".lyteAlertBtn")[i];
                var keys = Object.keys(buttons[i]);
                for(var j = 0; j<keys.length; j++){
                    if(keys[j] !== "text"){
                        buttonComp.ltProp(keys[j], buttons[i][keys[j]]);
                    }
                };
            }
            buttonComp = null;
        }



        window.LytePopup.addPopup(this);

        // Freeze layer configuration goes here

        var freezeStyle = this.childComp.querySelector(".alertFreezeLayer").style;
        freezeStyle.background = this.getData('ltPropDimmer').color;
        if(!this.addedFreezeDetails){
            freezeStyle.opacity = this.getData('ltPropDimmer').opacity;
        }


    }

    /**
     * The method is going to do the calculations and close the alert
     *
     */

    closeAlert() {
        if(this.childComp && this.actualModalDiv){
            if(this.addedFreezeDetails){
                window.LytePopup.hideOrShowFreeze("close",this);
                delete this.addedFreezeDetails;
            }
            if(this.getData('ltPropAnimation') == "slideDown"){
                this.actualModalDiv.style.top = "-"+(this.actualModalDiv.getBoundingClientRect().height+this.actualModalDiv.getBoundingClientRect().top+40)+"px";
            }
            var animDur = parseFloat(document.defaultView.getComputedStyle(this.actualModalDiv).getPropertyValue("transition-duration")) * 1000;
            if(this.getData('ltPropAnimation') == "zoomIn"){
                this.actualModalDiv.classList.remove('alertOpened');
            }
            var self = this;
            this.sId = setTimeout(function(){
                self.setData('ltPropShowCopy',false);
                delete self.sId;
                delete self.actualModalDiv;
                delete self.childComp;
                // LytePopup.bodywrapperCount -= 1;
                // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
                //     document.body.classList.remove('bodyWrapper');
                // }
                window.LytePopup.checkAndRemoveWrapper();
            },animDur-100);
            this.closeAlertFn();
            window.LytePopup.closePopup(this);
            if(this.addedFreezeDetails){
                this.childComp.querySelector(".alertFreezeLayer").style.opacity = 0;
                this.childComp.querySelector(".alertFreezeLayer").style.visibility = "";
            }
            // LytePopup.bindTransitionEnd(this.actualModalDiv);
        }
        else{
            window.LytePopup.closePopup(this);
        }
        this.$node.classList.remove('lyteAlertOpened');
    }

    didDestroy() {
        this.$node.classList.remove('lyteAlertOpened');
        if(this.openTId){
            clearTimeout(this.openTId);
            delete this.openTId;
        }
        if(this.showTId){
            clearTimeout(this.showTId);
            delete this.showTId;
        }
        if(this.closeTId){
            clearTimeout(this.closeTId);
            delete this.closeTId;
        }
        if(this.sId){
            clearTimeout(this.sId);
            delete this.sId;
        }
        if(this.childComp){
            if(this.addedFreezeDetails){
                window.LytePopup.hideOrShowFreeze("close", this);
                delete this.addedFreezeDetails;
            }
            window.LytePopup.closePopup(this);
            this.childComp.remove();
            delete this.actualModalDiv;
            delete this.childComp;
            // LytePopup.bodywrapperCount -= 1;
            // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
            //     document.body.classList.remove('bodyWrapper');
            // }
            window.LytePopup.checkAndRemoveWrapper();
        }
    }

    static actions(arg1) {
        return Object.assign(super.actions({
            closeAlert : function(){
                this.$node.ltProp("show",false);
            },
            accept : function(buttonText){
                var retVal = true;
                /**
                * @method onAccept
                * @version 1.0.0
                */
                if(this.getMethods("onAccept")){
                    retVal = this.executeMethod("onAccept",buttonText,this);
                    retVal = retVal == undefined ? true : retVal;
                }
                retVal && this.$node.ltProp("show",false);
            },
            reject : function(buttonText){
                var retVal = true;
                /**
                * @method onReject
                * @version 1.0.0
                */
                if(this.getMethods("onReject")){
                    retVal = this.executeMethod("onReject",buttonText,this);
                    retVal = retVal == undefined ? true : retVal;
                }
                retVal && this.$node.ltProp("show",false);
            }
        }), arg1);
    }

    static methods(arg1) {
        return Object.assign(super.methods({
            beforeWormholeAppend : function(arg){
                this.childComp = arg;
                this.actualModalDiv = this.childComp.querySelector(".alertPopup");
                if(this.getData('ltPropYield') && arg.querySelector('lyte-alert-footer')){
                    this.setData("nonYieldFooter",false);
                }
                else{
                    this.setData("nonYieldFooter",true);
                }
                if(this.getData('nonYieldFooter')){
                    if(this.getData('ltPropButtons').length == 0){
                        if(this.getData('ltPropType') == "confirm"){
                            this.setData('ltPropButtons',[{"type":"accept","text":"Ok"},{"type":"reject","text":"Cancel"}]);
                        }
                        else{
                            this.setData('ltPropButtons',[{"type":"accept","text":"Ok"}]);
                        }
                    }
                }
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            showToggled : function() {
                var onBeforeClose = true
                if(!this.$node.ltProp("show")){
                    window._lyteUiUtils.dispatchEvent('lyteAlertBeforeClose' , this.actualModalDiv)
                    if(this.getMethods("onBeforeClose")){
                        onBeforeClose = this.executeMethod("onBeforeClose",this,this.getData('escClicked'));
                    }
                }
                if(onBeforeClose === false){
                    this.setData("ltPropShow" , true)
                    return;
                }
                if(this.$node.ltProp("show")){
                    if(this.closeTId){
                        clearTimeout(this.closeTId);
                        delete this.closeTId;
                    }
                    if(this.sId){
                        clearTimeout(this.sId);
                        delete this.sId;
                        this.setData('ltPropShowCopy',false);
                        delete this.sId;
                        delete this.actualModalDiv;
                        delete this.childComp;
                    }
                    var self = this;
                    this.openTId = setTimeout(function(){
                        delete self.openTId;
                        document.body.classList.add('bodyWrapper');
                        // LytePopup.bodywrapperCount += 1;
                        self.showAlert();
                    },0);
                }
                else{
                    if(this.openTId){
                        clearTimeout(this.openTId);
                        delete this.openTId;
                    }
                    if(this.showTId){
                        clearTimeout(this.showTId);
                        delete this.showTId;
                    }
                    var self = this;
                    this.closeTId = setTimeout(function(){
                        delete self.closeTId;
                        self.closeAlert();
                    },0);
                }
            }.observes('ltPropShow','triggerShow')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteAlertComponent._template = "<template tag-name=\"lyte-alert\" role=\"alert\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowCopy}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-wormhole on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\" lt-prop-show=\"{{ltPropShow}}\" lt-prop-focus-on-close=\"{{ltPropFocusOnClose}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"alertWrapper {{ltPropWrapperClass}} lytePopupZI\"> <div class=\"{{lyteUiConcatAlertClass(ltPropContentAlign,'alertPopup')}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowCloseButton}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyte-svg alertClose\" onclick=\"{{action('closeAlert')}}\" tabindex=\"0\"></span> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropYield}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-yield yield-name=\"alert\"></lyte-yield> </template><template default=\"\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIfEquals(ltPropHeading,''),'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"alertHeader\"> <span class=\"dBlock\">{{ltPropHeading}}</span> </div> </template></template> <div class=\"alertContent\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIfEquals(ltPropType,''),'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"alertContentMiddle\"> <span class=\"{{lyteUiConcatTypeClass(ltPropType,'AlertIcon','lyteStatusIcon')}}\"></span> </div> </template></template> <div class=\"alertContentMiddle\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIfEquals(ltPropPrimaryMessage,''),'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div> <span class=\"alertPrimaryMsg\">{{ltPropPrimaryMessage}}</span> </div> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIfEquals(ltPropSecondaryMessage,''),'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div> <span class=\"alertSecondaryMsg\">{{ltPropSecondaryMessage}}</span> </div> </template></template> </div> <div class=\"clearFloat\"></div> </div> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{nonYieldFooter}}\" is=\"case\" lc-id=\"lc_id_0\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIsEmptyArray(ltPropButtons),'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"{{lyteUiConcat('alertFooter ',ltPropButtonPosition)}}\"> <template items=\"{{ltPropButtons}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> {{log(ltPropButtons.type)}} <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiIfEquals(item.type,'accept')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-button class=\"lyteAlertBtn\" onclick=\"{{action('accept',item.text)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{item.text}}</template> </lyte-button> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{lyteUiIfEquals(item.type,'reject')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-button class=\"lyteAlertBtn\" onclick=\"{{action('reject',item.text)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{item.text}}</template> </lyte-button> </template></template> </template> </div> </template></template> </template></template> </div> <div class=\"{{lyteUiAddShowClass(ltPropShowCopy,'','alertFreezeLayer')}}\"></div> </div> </template> </lyte-wormhole> </template></template> </template>";;
LyteAlertComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"s","p":[1,1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"s","p":[1,1,3],"c":{"lc_id_0":{"dN":[{"t":"i","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"sibl":[2],"cn":"default"},{"t":"s","p":[3,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1,1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"sibl":[1],"cn":"default"},{"t":"s","p":[3,3,1],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"sibl":[0],"cn":"default"},{"t":"s","p":[3,3,3],"c":{"lc_id_0":{"dN":[{"t":"tX","p":[1,1,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"s","p":[1,1,5],"c":{"lc_id_0":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"f","p":[1,1],"dN":[{"t":"tX","p":[1]},{"t":"s","p":[3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[{"t":"tX","p":[0]}],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"s","p":[5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"r","p":[1,1],"dN":[{"t":"tX","p":[0]}],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"t":"a","p":[1,3]}],"dc":[1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteAlertComponent._observedAttributes = [
    "ltPropType",
    "ltPropShow",
    "ltPropWrapperClass",
    "ltPropAllowMultiple",
    "ltPropHeading",
    "ltPropPrimaryMessage",
    "ltPropSecondaryMessage",
    "ltPropTop",
    "ltPropButtons",
    "ltPropButtonPosition",
    "ltPropShowCloseButton",
    "ltPropCloseOnEscape",
    "ltPropDimmer",
    "ltPropYield",
    "ltPropAnimation",
    "ltPropContentAlign",
    "ltPropAria",
    "ltPropAriaAttributes",
    "ltPropPreventFocus",
    "ltPropFocusOnClose",
    "nonYieldFooter",
    "triggerShow",
    "escClicked"
];

/**
 * @syntax nonYielded
 * <lyte-alert lt-prop-heading="Delete Profile" lt-prop-primary-message="Confirm Delete" lt-prop-secondary-message="Are you sure want to delete this profile?" >
 * </lyte-alert>
 */

/**
 * @syntax yielded
 * <lyte-alert lt-prop-wrapper-class = "sampleAlert" lt-prop-yield = "true">
 *     <template is = "registerYield" yield-name = "alert">
 *         <lyte-alert-header> Delete Profile </lyte-alert-header>
 *         <lyte-alert-content> Are you sure want to delete this profile? </lyte-alert-content>
 *     </template>
 * </lyte-alert>
 */

export { LyteAlertComponent };

LyteAlertComponent.register("lyte-alert", {
    hash: "LyteAlertComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});
