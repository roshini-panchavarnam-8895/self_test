import { _defineProperty } from "@slyte/core/src/lyte-utils";
import './lyte-wormhole.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

/**
 * Renders a loader
 * @component lyte-loader
 * @version 3.1.0
 * @methods onBeforeShow,onShow,onBeforeHide,onHide,onTimeout
 */
class LyteLoaderComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			/** 
			 * @prop {boolean} ltPropShow
			 * @default false
			 * @options true,false
			 */
			'ltPropShow' : prop( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {string} ltPropSelector
			 */
			'ltPropSelector' : prop( 'string' ),
			/** 
			 * @prop {object} ltPropProgressBar
			 */
			'ltPropProgressBar' : prop( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {string} ltPropShowClass
			 */
			'ltPropShowClass' : prop( 'string' , { 'default' : '' } ),
			/** 
			 * @prop {object} ltPropOnTimeout
			 */
			'ltPropOnTimeout' : prop( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {string} ltPropMessage
			 */
			'ltPropMessage' : prop( 'string' ,{ 'default' : 'body' }),
			/** 
			 * @prop {number} ltPropProgressed
			 * @default 0
			 */
			'ltPropProgressed' : prop( 'number' , { 'default' : 0 } ),
			/** 
			 * @prop {boolean} ltPropCloseIcon
			 * @default true
			 * @options true,false
			 */
			'ltPropCloseIcon' : prop( 'boolean' , { 'default' : true } ),
			/** 
			 * @prop {number} ltPropTimeout
			 * @default 5000
			 */
			'ltPropTimeout' : prop( 'number' , { 'default' : 5000 } ),
			/** 
			 * @prop {boolean} ltPropInLine
			 * @default true
			 * @options true,false
			 */
			'ltPropInLine' : prop( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {object} ltPropDimmer
			 * @default true
			 */
			'ltPropDimmer' : prop( 'object' , { 'default' : {} } ),
			/** 
			 * @prop {boolean} ltPropTimeoutMessage
			 */
			'ltPropTimeoutMessage' : prop( 'string' ),
			/** 
			 * @prop {boolean} ltPropShowLoader
			 * @default true
			 * @options true,false
			 */
			'ltPropShowLoader' : prop( 'boolean' , { 'default' : false } ),
			/** 
			 * @prop {boolean} ltPropCloseOnEscape
			 * @default true
			 * @options true,false
			 */
			'ltPropCloseOnEscape' : prop( 'boolean' , { 'default' : true } ),
			'ltPropLoaderSpinClass' : prop('string', {'default' : ""})
		}), arg1);		
	}

    ShowLoader() {
		this.SetProgressData();
		if(this.CallOnberforeshow()){
			this.setData('ltPropShowLoader' , true);
			var Load_ref =  this.childComp ? this.childComp : this.$node;
			var parent = Load_ref.parentNode;
			var freezeStyle = Load_ref.querySelector("lyte-loader-freeze").style;
			Load_ref.classList.add('lyteLoaderElement');
			if( window.getComputedStyle(parent).position !== 'absolute' && parent.nodeName !== 'BODY' ){
				parent.classList.add('lyteLoaderParent');
			}
			this.CallOnshow();
            if(this.getData('ltPropDimmer') && this.getData('ltPropDimmer').color){
                freezeStyle.background = this.getData('ltPropDimmer').color;
            }
            freezeStyle.opacity = this.getData('ltPropDimmer') && this.getData('ltPropDimmer').opacity ? this.getData('ltPropDimmer').opacity : 0.4;
           
        }else{
        	this.data.ltPropShow = false;
        	this.setData('ltPropShowLoader' , false);
			return;
		}
	}

    addListener() {
		var closeOnEscape = this.data.ltPropCloseOnEscape;
		if(closeOnEscape){
			document.addEventListener('keyup',this.close_loader.bind(this));	
		}
	}

    HideLoader() {
		var Load_ref = this.childComp || this.$node;
		Load_ref.classList.remove('lyteLoaderElement')
		window.clearTimeout(this.Timeout);
		this.data.ltPropTimer = undefined;
		document.removeEventListener("keyup", this.close_loader );
		if(this.CallOnberforehide()){
			this.CallOnhide();
			this.setData('ltPropShowLoader' , false);
		}else{
        	this.data.ltPropShow = true;
        	this.setData('ltPropShowLoader' , true);
			return;
		}	
	}

    set_timeout() {
		var _this = this;
		var delayTime = this.getData('ltPropTimeout.delayTime') ;
		delayTime = delayTime ? delayTime : this.getData('ltPropTimeout');
		if(delayTime >= 0){
			this.$node.ltProp('timeoutMessage',' ');
			var timeout = setTimeout(function(){  _this.timeout()},delayTime);
			this.setData('ltPropTimeout',delayTime);
			this.Timeout = timeout;
		}
	}

    timeout() {
		var Load_ref = this.childComp || this.$node;
		var errMsg = this.data.ltPropOnTimeout.errorMsg || 'some unkown error has occured';
		this.setData('ltPropTimeoutMessage', errMsg);
		this.CallOntimeout();
	}

    AppendValue() {
		if( this.data.ltPropShow ){
			if(this.data.ltPropProgressBar.mode === 'definite' ){
				var value = this.data.ltPropProgressBar.value;
				var displayMsg = this.data.ltPropProgressBar.displayMsg;
				var msg_arr =  this.sorted_arr;
				
				if( msg_arr.length ){
					var val =  msg_arr[0];
					var com_index ,index;
					for(index =0 ; index < msg_arr.length ; index++){
						if( value < msg_arr[index]){
							break;
						}
					}
					com_index = index-1;
					val = msg_arr[index-1] || 0;
					val = parseInt(val);
					this.setData('ltPropMessage',displayMsg[val]);
					this.setData('ltPropProgressed', val);
				}else{
					
					var msg = this.data.ltPropProgressBar.displayMsg||{};
					this.setData('ltPropProgressed',value);
					this.setData('ltPropMessage',msg[0]);
				}
			}else{
				var msg = this.data.ltPropProgressBar.displayMsg||{};
				this.setData('ltPropProgressed',-1);
				this.setData('ltPropMessage',msg[-1]);
			}
		}
	}

    close_loader(event) {
		if(event.code === 'Escape' ){
			if(this.getMethods( "onCancel" )){
				this.executeMethod('onCancel',this.$node);
			}
			this.$node.setData('ltPropShow',false);
		}
	}

    deleteLoaderData() {
		document.removeEventListener("keyup", this.close_loader );
		delete this.childComp;
		delete this.sorted_arr;
		this.$node.ltProp('progressBar.value',0);
		if(this.Timeout){
			window.clearTimeout(this.Timeout);
			delete this.Timeout;
		}
	}

    SetProgressData() {
		var progress_data = this.data.ltPropProgressBar;
		var displayMsg = progress_data.displayMsg ? progress_data.displayMsg : {};
		var msg_arr = Object.keys(displayMsg)||[];
		this.sorted_arr = [];
		for (var index = 0; index <= msg_arr.length - 1; index++) {
			this.sorted_arr.push(parseInt(msg_arr[index]));
		}
		progress_data.mode = progress_data.mode ? progress_data.mode : 'indefinite';
		
		if(progress_data.mode === 'indefinite'){
			progress_data.value = -1;
		}else{
			progress_data.value =  progress_data.value ? progress_data.value : 0;
		}
		progress_data.show =  progress_data.show === false ? false : true;
		progress_data.class = progress_data.class ? progress_data.class : "";
	}

    CallOnberforeshow() {
		if(this.getMethods('onBeforeShow')){
			var return_val = this.executeMethod( 'onBeforeShow' , this.$node ) === false ? false : true;
			return return_val;
		}
		return true;
	}

    CallOnshow() {
		if(this.getMethods( "onShow" )){
            this.executeMethod( "onShow" , this.$node ); 
        }
        this.addListener();
		this.AppendValue();
		this.set_timeout();
	}

    CallOntimeout() {
		if(this.getMethods("onTimeout")){
            this.executeMethod("onTimeout",this.$node); 
        }
	}

    CallOnberforehide() {
		if(this.getMethods('onBeforeHide')){
			var return_val = this.executeMethod( 'onBeforeHide' , this.$node ) === false ? false : true;
			return return_val;
		}
		return true;
	}

    CallOnhide() {
		if(this.getMethods("onHide")){
            if(this.executeMethod("onHide",this.$node) !== false){
            	this.deleteLoaderData();
            } 
        }else{
        	this.deleteLoaderData();
        }
	}

    didDestroy() {
		this.deleteLoaderData();
	}

    static actions(arg1) {
        return Object.assign(super.actions({
            lyteLoadCloser : function(event){
                if(this.getMethods( "onCancel" )){
                    this.executeMethod('onCancel',this.$node);
                }
                this.$node.setData( 'ltPropShow' , false );
            }
        }), arg1);
    }

    static methods(arg1) {
        return Object.assign(super.methods({
            beforeWormholeAppend : function( wormhole , outlet ){
                this.childComp = wormhole;
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            initial_setup : function() {
                var show = this.data.ltPropShow;
                if(show){
                    this.ShowLoader();
                }else{
                    this.HideLoader();
                }
            }.observes('ltPropShow'),

            DisplayMessage : function(){
                if(this.data.ltPropShow){
                    this.AppendValue();
                }
            }.observes('ltPropProgressBar.value')
        }), arg1);
    }

    _() {
        _;
    }
}

LyteLoaderComponent._template = "<template tag-name=\"lyte-loader\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropShowLoader}}\" is=\"case\" lc-id=\"lc_id_0\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropInLine}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropCloseIcon}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteLoaderExit\" onclick=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv {{ltPropLoaderSpinClass}}\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropProgressBar.show}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> </template></template> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze\"></lyte-loader-freeze> </div> </template><template default=\"\"> <lyte-wormhole lt-prop-query=\"{{ltPropSelector}}\" on-before-append=\"{{method('beforeWormholeAppend')}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropCloseIcon}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteLoaderExit\" onclick=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv {{ltPropLoaderSpinClass}}\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropProgressBar.show}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\" is=\"case\" lc-id=\"lc_id_0\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> </template></template> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze \"></lyte-loader-freeze> </div> </template> </lyte-wormhole> </template></template> </template></template> </template>";;
LyteLoaderComponent._dynamicNodes = [{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"s","p":[1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"s","p":[1,1,1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"a","p":[1,1,3],"cn":"lc_id_0"},{"t":"s","p":[1,1,5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}},"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"lc_id_0"},{"t":"tX","p":[3,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"tX","p":[1,1,7,0],"cn":"lc_id_0"},{"t":"cD","p":[1,3],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"r","p":[1,1],"dN":[{"t":"a","p":[1]},{"t":"s","p":[1,1,1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":2,"sibl":[1]},{"t":"a","p":[1,1,3]},{"t":"s","p":[1,1,5],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}},"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"cn":"lc_id_0"},{"t":"tX","p":[3,0],"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{}},"hd":true,"co":["lc_id_0"],"in":1,"sibl":[0]},{"t":"tX","p":[1,1,7,0]},{"t":"cD","p":[1,3],"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteLoaderComponent._observedAttributes = [
    "ltPropShow",
    "ltPropSelector",
    "ltPropProgressBar",
    "ltPropShowClass",
    "ltPropOnTimeout",
    "ltPropMessage",
    "ltPropProgressed",
    "ltPropCloseIcon",
    "ltPropTimeout",
    "ltPropInLine",
    "ltPropDimmer",
    "ltPropTimeoutMessage",
    "ltPropShowLoader",
    "ltPropCloseOnEscape",
    "ltPropLoaderSpinClass"
];

export { LyteLoaderComponent };

LyteLoaderComponent.register("lyte-loader", {
    hash: "LyteLoaderComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});