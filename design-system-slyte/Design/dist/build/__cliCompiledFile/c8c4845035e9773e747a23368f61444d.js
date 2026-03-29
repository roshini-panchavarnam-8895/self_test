import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import './lyte-wormhole.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * Renders a messagebox
 * @component lyte-messagebox
 * @version 1.0.0
 * @dependencies lyte-wormhole
 * @methods onClose
 */

class LyteMessageboxComponent extends Component {
    constructor() {
        super();
    }

    init() {
      var th = this;
      this.$node.alignMessageBox = function(){
        th.setData('onResizeBoolean' , true);
        th.computeOffsetImpl();
      }
    }

    data(arg1) {
        return Object.assign(super.data({

            /**
             * @componentProperty {success | error | warning | info} ltPropType
             * @version 1.0.0
             * @default success
             */
            "ltPropType":prop("string",{"default":"success"}),

            /**
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropShow":prop("boolean",{"default":false}),

            /**
             * @componentProperty {string} ltPropMessage
             * @version 1.0.0
             */
            "ltPropMessage":prop("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropDuration
             * @version 1.0.0
             * @default 2000
             */
            "ltPropDuration":prop("string",{"default":"2000"}),
            /**
             * @typedef {object} offset
             * @property {string} left="center"
             * @property {string} top="center"
             * @property {string} right
             * @property {string} bottom
             */
            /**
             * @componentProperty {offset} ltPropOffset
             * @version 1.0.0
             */
            "ltPropOffset":prop("object",{"default":null}),

            /**
             * @typedef {object} transition
             * @property {slideFromTop | fadeIn} animation="fadeIn"
             * @property {string} duration
             */
            /**
             * @componentProperty {transition} ltPropTransition
             * @version 1.0.0
             * @default { "animation" : "fadeIn", "duration" :"0.2s"}
             */
            "ltPropTransition":prop("object",{"default":{"animation" : "fadeIn","duration" : "0.2s"}}),

            /**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropYield":prop("boolean",{"default" : false}),

            /**
             * @componentProperty {string} ltPropClass
             * @version 1.0.0
             */
            "ltPropClass":prop("string",{"default":""}),

            /**
             * @componentProperty {boolean} ltPropCloseManually
             * @version 3.0.X
             */
            "ltPropCloseManually":prop("boolean",{"default": false}),
            "ltPropAriaRole" : prop('string' , {
                default : 'status'
            }),

            "onResizeBoolean" : prop('boolean' , {
              'default' : false
            }),
            "ltPropShowCloseButton" : prop('boolean' , {
                default : true
            }),
            
            "ltPropFocusOnClose" : prop('boolean' , {
                default : false
            })  
        }), arg1);
    }

    computeOffsetImpl() {
        var messageEle = this.actualMessageDiv;
        this.fastdomfn1 = $L.fastdom.measure(function(){
            delete this.fastdomfn1;
            var messageElePosition = messageEle.getBoundingClientRect();
            // var offsetObj = this.$node.ltProp('offset');
            var offsetObj = Object.assign({},this.$node.ltProp('offset'));

            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            if(this.$node.ltProp('offset')){
                if(offsetObj.left === "center" || offsetObj.right === "center" || offsetObj.left == undefined || offsetObj.left == ""){
                    var offLeft = (w - messageElePosition.width)/2;
                    if(offLeft < 0){
                        offLeft = 20;
                    }
                    offsetObj.left = offLeft + "px";
                }
                if(offsetObj.top === "center" || offsetObj.bottom === "center"){
                    var offTop = (h - messageElePosition.height)/2;
                    if(offTop < 0){
                        offTop = 20;
                    }
                    offsetObj.top = offTop + "px";
                }
                if(offsetObj.right && offsetObj.right !== "center"){
                    if(offsetObj.right.indexOf("%") > -1){
                        offsetObj.left = w-(messageElePosition.width+(w/parseFloat(offsetObj.right)))+"px";
                    }
                    else{
                        offsetObj.left = w-(messageElePosition.width+parseFloat(offsetObj.right))+"px";
                    }
                }
                if(offsetObj.bottom && offsetObj.bottom !== "center"){
                    if(offsetObj.bottom.indexOf("%") > -1){
                        offsetObj.top = h-(messageElePosition.height+(h/parseFloat(offsetObj.bottom)))+"px";
                    }
                    else{
                        offsetObj.top = h-(messageElePosition.height+parseFloat(offsetObj.bottom))+"px";
                    }
                }
                if(!offsetObj.top){
                    offsetObj.top = 20;
                }
                this.fastdomfn2 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn2;
                    messageEle.style.left = parseFloat(offsetObj.left) + "px";
                    if(this.getData('ltPropTransition').animation === "slideFromTop"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (parseFloat(offsetObj.top) + messageElePosition.height) +"px)";
                    } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = window.innerHeight + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (parseFloat(offsetObj.top) - window.innerHeight) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else {
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = parseFloat(offsetObj.top) + "px";
                    }
                    if(!this.getData('onResizeBoolean')){
                      this.showMessagebox();
                    }
                },this);
            }
            else{
                var offsetLeft="",offsetTop="";
                offsetLeft = (document.body.clientWidth - messageElePosition.width)/2;
                this.fastdomfn3 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn3;
                    messageEle.style.left = parseFloat(offsetLeft)+"px";
                    if(this.getData('ltPropTransition').animation === "slideFromTop"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (messageElePosition.height + 20) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = window.innerHeight + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (messageElePosition.height + 20 - window.innerHeight) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    } else {
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = "20px";
                    }
                    if(!this.getData('onResizeBoolean')){
                      this.showMessagebox();
                    }
                },this);
            }

        },this);
    }

    closeMessageBoxFn(checkWormhole) {
        this.setData('onResizeBoolean' , false);
        if(this.timeOutId){
            clearInterval(this.timeOutId);
            this.timeOutId = false;
        }
        if( this.childComp && document.contains( this.childComp ) ){
            this.childComp.remove();
        }
        delete this.actualMessageDiv;
        delete this.childComp;
        if(!checkWormhole && this.getMethods("onClose")){
            this.executeMethod("onClose",this);
        }
        window.removeEventListener('resize' , this.$node.alignMessageBox)
    }

    clearFastdom() {
        if(this.fastdomfn1){
            $L.fastdom.clear(this.fastdomfn1);
            delete this.fastdomfn1;
        }
        if(this.fastdomfn2){
            $L.fastdom.clear(this.fastdomfn2);
            delete this.fastdomfn2;
        }
        if(this.fastdomfn3){
            $L.fastdom.clear(this.fastdomfn3);
            delete this.fastdomfn3;
        }
    }

    showMessagebox() {
        // start = new Date().getTime();
        var duration = parseInt(this.getData("ltPropDuration"));
        var self = this;
        // if(self.actualMessageDiv && !self.getData('ltPropShow')){
        //     _lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
        // }
        this.timeOutId = setInterval(function(){
            clearInterval(self.timeOutId);
            // end = new Date().getTime();
            if(!self.$node || self.getData('ltPropCloseManually')){
                return;
            }
            if(self.getData('ltPropTransition').animation === "slideFromTop"){
                window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            } else if(self.getData('ltPropTransition').animation === "slideFromBottom"){
                window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            } else {
                window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            self.timeOutId = false;
        },duration);
        window.addEventListener('resize' , this.$node.alignMessageBox)
    }

    didDestroy() {
        this.clearFastdom();
        if(this.actualMessageDiv){
            window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , this.actualMessageDiv)
        }
        if(this.timeOutId || this.getData('ltPropShow')){
            clearInterval(this.timeOutId);
            if(this.getData('ltPropTransition').animation === "slideFromTop" && this.actualMessageDiv){
                this.actualMessageDiv.style.transform = "";
	        	this.setData("ltPropShow",false);
        	} else if(this.getData('ltPropTransition').animation != "slideFromTop" && this.actualMessageDiv){
                this.actualMessageDiv.style.transform = "";
	        	this.setData("ltPropShow",false);
            } else { 
        		this.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
        		this.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
	        	this.setData("ltPropShow",false);
        	}
            this.timeOutId = false;
            this.closeMessageBoxFn(true);
        }
        window.removeEventListener('resize' , this.$node.alignMessageBox)
    }

    static actions(arg1) {
        return Object.assign(super.actions({
            closeMessageBox : function(){
                clearInterval(this.timeOutId);
                this.timeOutId = false;
                var self = this;
                if(self.actualMessageDiv){
                    window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeClose' , self.actualMessageDiv)
                }
                if(self.getData('ltPropTransition').animation === "slideFromTop"){
                    self.actualMessageDiv.style.transform = "";
                    setTimeout(function(){
                        if(self.$node){
                            self.setData("ltPropShow",false);
                        }
                    },200);
                } else if(self.getData('ltPropTransition').animation === "slideFromBottom"){
                    self.actualMessageDiv.style.transform = "";
                    setTimeout(function(){
                        if(self.$node){
                            self.setData("ltPropShow",false);
                        }
                    },200);
                } else {
                    self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                    self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                    setTimeout(function(){
                        if(self.$node){
                            self.setData("ltPropShow",false);
                        }
                    },500);
                }
                window.removeEventListener('resize' , this.$node.alignMessageBox)
            }
        }), arg1);
    }

    static methods(arg1) {
        return Object.assign(super.methods({
            onBeforeShow : function(){},
            onShow:function(){},
            beforeWormholeAppend : function(arg){
                this.childComp = arg;
                this.actualMessageDiv = this.childComp.querySelector(".lyteMessageBox");
                this.actualMessageDiv.style.position = "fixed";
                // LyteComponent.appendChild(document.body,this.childComp);
            },
            afterWormholeAppend : function(arg){
                var dur = parseFloat(this.getData('ltPropTransition').duration)*100
                if(this.getData('ltPropDuration')){
                    dur = parseFloat(this.getData('ltPropDuration'))
                }
                var _this = this;
                if(this.getData('ltPropTransition').animation === "slideFromTop"){
                    this.actualMessageDiv.classList.add('lyteMessageBoxSlideFromTop');
                    this.computeOffsetImpl();
                    setTimeout(function(){
                        if(_this.getMethods("onShow")){
                            _this.executeMethod("onShow",_this.actualMessageDiv);
                        }
                    },dur)
                } else if(this.getData('ltPropTransition').animation === "slideFromBottom"){
                    this.actualMessageDiv.classList.add('lyteMessageBoxSlideFromBottom');
                    this.computeOffsetImpl();
                    setTimeout(function(){
                        if(_this.getMethods("onShow")){
                            _this.executeMethod("onShow",_this.actualMessageDiv);
                        }
                    },dur)
                } else {
                    this.computeOffsetImpl();
                    this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    setTimeout(function(){
                        if(_this.getMethods("onShow")){
                            _this.executeMethod("onShow",_this.actualMessageDiv);
                        }
                    },dur)
                    // this.childComp.style.visibility = "visible";
                }
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            setDuration : function(){
                var durationVal = this.$node.ltProp("duration");
                if(durationVal != ""){
                    this.setData("ltPropDuration",durationVal);
                }
                
            }.observes('ltPropDuration'),

            showToggled : function() {
                if(this.actualMessageDiv){
                    window._lyteUiUtils.dispatchEvent('lyteMessageboxBeforeOpen' , this.actualMessageDiv)
                }
                if(!(this.$node.ltProp("show"))){
                    this.closeMessageBoxFn();
                }
            }.observes('ltPropShow').on('didConnect')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteMessageboxComponent._template = "<template tag-name=\"lyte-messagebox\"> <template is=\"switch\" l-c=\"true\"><template is=\"case\" case=\"{{ltPropShow}}\" lc-id=\"lc_id_0\"><lyte-wormhole style=\"visibility: hidden\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\" on-append=\"{{method(&quot;afterWormholeAppend&quot;)}}\" lt-prop-show=\"{{ltPropShow}}\" lt-prop-focus-on-close=\"{{ltPropFocusOnClose}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"{{lyteUiMsgBoxConcatClass(ltPropClass,ltPropType,'MessageIcon','lyteMessageBox')}} lytePopupZI\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropType}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteMessageBoxSymbol\"></span> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropYield}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteMessageBoxContent\" aria-live=\"polite\" role=\"{{ltPropAriaRole}}\"> <lyte-yield yield-name=\"messageboxYield\"></lyte-yield> </span> </template><template default=\"\"> <template is=\"switch\" l-c=\"true\"><template is=\"case\" case=\"{{lyteUiIfEquals(ltPropMessage,'')}}\" lc-id=\"lc_id_0\"></template><template default=\"\"><div> <span class=\"lyteMessageBoxContent\" aria-live=\"polite\" role=\"{{ltPropAriaRole}}\">{{ltPropMessage}}</span> </div></template></template> </template></template> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowCloseButton}}\" is=\"case\" lc-id=\"lc_id_0\"><span class=\"lyteMessageBoxClose\" onclick=\"{{action('closeMessageBox')}}\"></span></template></template> </div> </template> </lyte-wormhole></template></template> </template>";;
LyteMessageboxComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0],"cn":"lc_id_0"},{"t":"r","p":[0,1],"dN":[{"t":"a","p":[1]},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"s","p":[1,3],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"i","p":[1,1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[0,1],"cn":"default"},{"t":"tX","p":[0,1,0],"cn":"default"}]},"dc":{"lc_id_0":{},"default":{}},"hd":true,"co":["lc_id_0"],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"s","p":[1,5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":0}],"dc":[1],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[0],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteMessageboxComponent._observedAttributes = [
    "ltPropType",
    "ltPropShow",
    "ltPropMessage",
    "ltPropDuration",
    "ltPropOffset",
    "ltPropTransition",
    "ltPropYield",
    "ltPropClass",
    "ltPropCloseManually",
    "ltPropAriaRole",
    "onResizeBoolean",
    "ltPropShowCloseButton",
    "ltPropFocusOnClose"
];

/**
 * @syntax nonYielded
 * <lyte-messagebox lt-prop-message = "This is a messagebox without yield.">
 * </lyte-messagebox>
 */

/**
* @syntax yielded
* <lyte-messagebox lt-prop-yield = true>
*     <template is = "registerYield" yield-name = "messageboxYield">
*         <span> Here is the text. </span>
*         <a href = "#"> Some link </a>
*     </template>
* </lyte-messagebox>
*/

export { LyteMessageboxComponent };

LyteMessageboxComponent.register("lyte-messagebox", {
    hash: "LyteMessageboxComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});
