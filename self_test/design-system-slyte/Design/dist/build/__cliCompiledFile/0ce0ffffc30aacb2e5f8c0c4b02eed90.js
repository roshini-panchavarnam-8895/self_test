import { _defineProperty, includeMixins } from "@slyte/core/src/lyte-utils";
import "../helpers/helpers-dev.js";
import './lyte-dropdown.js';
import {LyteAdvancedBreadcrumbMixin} from "../../mixins/lyte-advanced-breadcrumb.js"
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";
import $L from "../../../lyte-dom/modules/lyte-dom-utils.js";

class LyteBreadcrumbComponent extends includeMixins([LyteAdvancedBreadcrumbMixin], Component) {
    constructor() {
        super();
    }

    init() {
	   /**
        * @method beforeRender
        * @version 1.0.1
        */
		this.getMethods('beforeRender') && this.executeMethod('beforeRender', this.$node);
	}

    didDestroy() {
		clearTimeout( this._timeout );
		delete this.$node.modifyCrumbItems;
	}

    didConnect() {
        var lyteSelf = this;
        if( this.data.ltPropType == "default" ){
			this.ArrayContentChange();
			this.$node.modifyCrumbItems = function( property, arg1, arg2 ){
				if( !this.data.ltPropYield ){
					lyteSelf.$addon.arrayUtils( this.data.ltPropData, property, arg1, arg2 );
				} else {
					this.ArrayContentChange();
				}
			}.bind( this );

			this.breadcrumbClass();

			$L.fastdom.measure( function(){
				var is_rtl = window._lyteUiUtils.getRTL();
				$L.fastdom.mutate( function(){
					if( is_rtl ){
						$L( this.$node ).addClass( 'lyteRTL' );
					}
				}.bind( this ));
			}.bind( this ));
			var cb = "afterRender";
			/**
	        * @method afterRender
	        * @version 1.0.1
	        */
	       if( this.getMethods( cb ) ){
	       		this.executeMethod( cb, this.$node );
	       }
	   }
    }

    ArrayContentChange() {
		var data = this.data,
		active = data.ltPropActiveClass,
		completed = data.ltPropCompletedClass,
		aria = data.ltPropAria,
		innerElements = $L( 'lyte-breadcrumb-item', this.$node ),
		__length = innerElements.length - 1,
		last = innerElements.eq( -1 );

		for( var i = 0; i < __length; i++ ){
			var cur = innerElements.eq( i );
			cur.addClass( completed ).removeClass( active );
			if( aria ){
				cur.find( 'a' ).removeAttr( 'aria-current' );
			}
		}

		last.removeClass( completed ).addClass( active );
		if( aria ){
			last.find( 'a' ).attr( 'aria-current', data.ltPropAriaValue );
		}
	}

    breadcrumbClass() {
		if( this.data.ltPropYield ) {
			$L( 'lyte-breadcrumb-structure', this.$node ).addClass( this.data.ltPropClass );
		}
	}

    data(arg1) {
		var default_values = window._lyteUiUtils.getDefault( 'lyte-breadcrumb' );

        return Object.assign(super.data({
			//  user data
		   /**
			* @componentProperty {string} ltPropClass=lyteBreadcrumbSlash
			* @version 1.0.0
			*/
			ltPropClass : prop("string",{"default": default_values.class || 'lyteBreadcrumbSlash'}),
		   /**
			* @componentProperty {string[] | object[]} ltPropData
			* @version 1.0.0
			* @default []
			*/
			ltPropData : prop("array",{"default":[]}),
		   /**
			* @componentProperty {string} ltPropActiveClass=lyteActive
			* @version 1.0.0
			*/
			ltPropActiveClass : prop("string",{"default": default_values.activeClass || 'lyteActive'}),
		   /**
			* @componentProperty {string} ltPropCompletedClass=lyteCompleted
			* @version 1.0.0
			*/
			ltPropCompletedClass : prop("string",{"default": default_values.completedClass || 'lyteCompleted'}),
		   /**
			* @componentProperty {boolean} ltPropYield=false
			* @version 1.0.0
			*/
			ltPropYield : prop("boolean",{"default": default_values.yield || false}),
		   /**
			* @componentProperty {string} ltPropLabel=''
			* @version 1.0.0
			*/
			ltPropLabel : prop('string', {'default': default_values.label || ''}),
		   /**
			* @componentProperty {string} ltPropOption=''
			* @version 1.0.0
			*/			
            ltPropOption : prop('string', {'default': default_values.option || ''}),

            // aria
		   /**
			* @componentProperty {boolean} ltPropAria=false
			* @version 3.1.0
			*/
            ltPropAria : prop( 'boolean', { default : default_values.aria || false } ),
           /**
			* @componentProperty {string} ltPropAriaValue=page
			* @version 3.1.0
			*/
            ltPropAriaValue : prop( 'string', { default : default_values.ariaValue || "page" } ),

            ltPropType : prop( 'string', { default : default_values.type || "default" } ),

            ltPropButtonDisplay : prop( 'string', { default : default_values.buttonDisplay || "..." } ),

            ltPropDropdown : prop( 'string', { default : default_values.dropdown || '{}' } ),

            backwardItems : prop( 'array', { default : [] } ),
            middleSelected : prop( 'string', { default : "" } )
		}), arg1);
	}

    static actions(arg1) {
        return Object.assign(super.actions({
           'onclick' : function ( event, Component, data ){
                var target = event.target,
                cb = 'onClick';

                if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && event.target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
                    return false;
                }

                if( this.getMethods( cb ) ){
                    this.executeMethod( cb, Component, this.$node, event, data );
                    event.stopPropagation();	
                }
            },
            divClick : function( event, div ){
                var target = event.target,
                cb = "onClick";

                if( ( event.ctrlKey == true || event.metaKey == true || event.which == 2 ) && target.href != undefined && target.href.indexOf( 'javascript:' ) != -1 && target.target == '_blank' ){
                    return false;
                }
                if( this.getMethods( cb ) && this.data.ltPropYield ) {

                    var node = $L( target.correspondingElement || target ).closest( 'lyte-breadcrumb-item', div );

                    if( node.length ){
                        this.executeMethod( cb, node.get( 0 ), this.$node, event, node.attr( 'data-value' ) );
                    }
                }
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            ArrayContentChangeObs : function(){
                clearTimeout( this._timeout );
                this._timeout = setTimeout( this.ArrayContentChange.bind( this ), 0 );
            }.observes( 'ltPropData.[]', 'ltPropData' ),

            aria_obs : function(){
                 $L( 'lyte-breadcrumb-item', this.$node ).eq( -1 ).find( "a" ).attr( "aria-current", this.data.ltPropAriaValue );
            }.observes( 'ltPropAriaValue' ),

            breadcrumbClassObs : function(){
                this.breadcrumbClass();
            }.observes('ltPropClass')
        }), arg1);
    }

    includes() {
        return [LyteAdvancedBreadcrumbMixin];
    }

    _() {
        _;
    }
}

LyteBreadcrumbComponent._template = "<template tag-name=\"lyte-breadcrumb\"> <div onclick=\"{{action('divClick',event,this)}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropType,'==',&quot;default&quot;)}}\" is=\"case\" lc-id=\"lc_id_0\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropYield,'==',false)}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-breadcrumb-structure class=\"{{ltPropClass}}\"> <template items=\"{{ltPropData}}\" item=\"array\" index=\"indexVal\" is=\"for\" _new=\"true\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(lyteUiIsObject(array),'==',false)}}\" is=\"case\" lc-id=\"lc_id_0\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{indexVal}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template default=\"\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template> </template><template default=\"\"><template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropClass,'==','lyteBreadcrumbBullet')}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> <lyte-breadcrumb-head>{{array[ltPropOption]}}</lyte-breadcrumb-head> </lyte-breadcrumb-item> </template><template default=\"\"> <lyte-breadcrumb-item sporder=\"{{indexVal}}\" onclick=\"{{action('onclick',event,this,array)}}\"> <lyte-breadcrumb-body> {{array[ltPropLabel]}} </lyte-breadcrumb-body> </lyte-breadcrumb-item> </template></template> </template></template> </template> </lyte-breadcrumb-structure> </template><template default=\"\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template> </template><template default=\"\"> <lyte-breadcrumb-structure class=\"{{ltPropClass}}\"> <lyte-dropdown lt-prop=\"{{ltPropDropdown}}\" lt-prop-selected=\"{{lbind(middleSelected)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button>{{ltPropButtonDisplay}}</lyte-drop-button> <lyte-drop-box class=\"lyteBreadcrumbDropdown\"> <lyte-drop-body> <template items=\"{{middleItems}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <lyte-drop-item data-value=\"{{index}}\"> <lyte-yield yield-name=\"yield\" lt-prop-item=\"{{item}}\" lt-prop-dropdown=\"true\"></lyte-yield> </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template items=\"{{backwardItems}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <lyte-breadcrumb-item data-orient=\"backward\" data-index=\"{{index}}\" class=\"{{item.class}}\" id=\"{{item.id}}\"> <lyte-yield yield-name=\"yield\" lt-prop-item=\"{{item}}\"></lyte-yield> </lyte-breadcrumb-item> </template> </lyte-breadcrumb-structure> </template></template> </div> </template>";;
LyteBreadcrumbComponent._dynamicNodes = [{"t":"a","p":[1]},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"a","p":[1,1],"cn":"lc_id_0"},{"t":"f","p":[1,1],"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,1,1],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,3,0],"cn":"lc_id_0"},{"t":"cD","p":[1,3],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,1,1],"cn":"default"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"a","p":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,1,1],"cn":"lc_id_0"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"tX","p":[1,3,0],"cn":"lc_id_0"},{"t":"cD","p":[1,3],"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"tX","p":[1,1,1],"cn":"default"},{"t":"cD","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0}],"dc":[0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"i","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[1,0],"hc":true,"trans":true},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"},{"t":"a","p":[1,1],"cn":"default"},{"t":"r","p":[1,1,1],"dN":[{"t":"tX","p":[1,0]},{"t":"cD","p":[1],"in":3,"sibl":[2]},{"t":"a","p":[3,1,1]},{"t":"f","p":[3,1,1],"dN":[{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"i","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":2,"sibl":[1]},{"t":"cD","p":[3,1],"in":1,"sibl":[0]},{"t":"cD","p":[3],"in":0}],"dc":[3,2,1,0],"hc":true,"trans":true,"in":3,"sibl":[2],"cn":"default"},{"t":"cD","p":[1,1],"in":2,"sibl":[1],"cn":"default"},{"t":"a","p":[1,3],"cn":"default"},{"t":"f","p":[1,3],"dN":[{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"i","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{"dc":[3,2,1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteBreadcrumbComponent._observedAttributes = [
    "ltPropClass",
    "ltPropData",
    "ltPropActiveClass",
    "ltPropCompletedClass",
    "ltPropYield",
    "ltPropLabel",
    "ltPropOption",
    "ltPropAria",
    "ltPropAriaValue",
    "ltPropType",
    "ltPropButtonDisplay",
    "ltPropDropdown",
    "backwardItems",
    "middleSelected"
];

/**
 * @syntax Yielded
 *  <lyte-breadcrumb lt-prop-yield="true">
 *		<template is="registerYield" yield-name="yield">
 *			<lyte-breadcrumb-structure>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Home 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Menu 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Edit 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *				<lyte-breadcrumb-item>
 *					<lyte-breadcrumb-body>
 *						Save 
 *					</lyte-breadcrumb-body>
 *				</lyte-breadcrumb-item>
 *			</lyte-breadcrumb-structure>
 *		</template>
 *	</lyte-breadcrumb>
 */

/**
 * @syntax Non Yielded
 * <lyte-breadcrumb lt-prop-data='["home","works",{"name": "Leads"},{"name": "Contacts"},{"name": "Services"}]' lt-prop-label="name">
 * </lyte-breadcrumb>
 */

export { LyteBreadcrumbComponent };

LyteBreadcrumbComponent.register("lyte-breadcrumb", {
    hash: "LyteBreadcrumbComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});