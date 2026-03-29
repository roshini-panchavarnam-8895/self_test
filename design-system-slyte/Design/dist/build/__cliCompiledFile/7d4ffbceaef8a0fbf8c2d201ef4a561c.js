import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";

/**
 * Renders a card
 * @component lyte-card
 * @version  3.12.0
 */
class LyteCardComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			
			/**
			 * @componentProperty {small | medium | large} ltPropSize=medium
			 */

			'ltPropSize': prop( 'string', { 'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-card', 'size', 'medium' ) } ),

			/**
			 * @componentProperty {colorString} ltPropBackgroundColor
			 */

			'ltPropBackgroundColor': prop( 'string', { 'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-card', 'backgroundColor', '' ) } ),

			/**
			 * @componentProperty {horizontal | vertical} ltPropAlignment=vertical
			 */

			'ltPropAlignment': prop( 'string', { 'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-card', 'alignment', 'vertical' ) } ),

			/**
			 * @componentProperty {string} ltPropBoxShadow
			 */

			'ltPropBoxShadow': prop( 'string', { 'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-card', 'boxShadow', '' ) } ),
			'lyteViewPort' : prop( 'boolean', { 'default': false } ),

			/**
			 * @componentProperty {boolean} ltPropViewPort=false
			 */

			'ltPropViewPort': prop( 'boolean', { 'default': false } ),

			'ltPropLoadingYield' : prop( 'boolean',{
				'default' : true
			}),

			'finalClass': prop( 'string', { 'default': '' } ),
			'finalStyle': prop( 'string', { 'default': '' } )
		}), arg1);
	}

    init() {
		var useViewPortFeature = this.getData( 'ltPropViewPort' );

		if( useViewPortFeature ) {
			this.setData( 'lyteViewPort', true );
		}
	}

    didConnect() {
		var isInViewPort = !this.getData( 'lyteViewPort' );

		if( isInViewPort ) {
			this.setup();
		}
	}

    setup() {
		this.setYieldClass();
		this.setStyle();
		this.align();
		this.size();
	}

    setYieldClass() {
		this.$node.querySelector( 'lyte-yield' ).classList.add( 'lyteCardYield' );
	}

    setStyle() {
		var boxShadow = this.getData( 'ltPropBoxShadow' ),
		bg = this.getData( 'ltPropBackgroundColor' ), res = '';

		if( boxShadow ) {
			res += 'box-shadow:' + boxShadow + ';';
		}

		if( bg ) {
			res += 'background-color:' + bg + ';';
		}

		this.setData( 'finalStyle', res );
	}

    align(old) {
		var align = this.getData( 'ltPropAlignment' );

		align = align ? align : 'vertical';
		this.setClass( old, align );
	}

    size(old) {
		var size = this.getData( 'ltPropSize' );

		size = size ? size : 'medium';
		this.setClass( old, size );
	}

    setClass(oldValue, newValue) {
		var newCls, oldCls, cur = this.getData( 'finalClass' ), ind;

		newCls = 'lyteCard' + newValue[ 0 ].toUpperCase() + newValue.substring( 1 );
		cur = cur ? cur.split( ' ' ) : [];

		if( oldValue ) {
			oldCls = 'lyteCard' + oldValue[ 0 ].toUpperCase() + oldValue.substring( 1 );
			ind = cur.indexOf( oldCls );

			if( ind !== -1 ) {
				cur.splice( ind, 1 );
			}
			
		}

		cur.push( newCls );
		this.setData( 'finalClass', cur.join( ' ' ) );
	}

    box() {
		return this.$node.querySelector( 'lyte-card-box' );
	}

    static observers(arg1) {
        return Object.assign(super.observers({
            styleObserver: function() {
                this.setStyle();
            }.observes( 'ltPropBackgroundColor', 'ltPropBoxShadow' ),

            alignmentObserver: function( change ) {
                this.align( change.oldValue );
            }.observes( 'ltPropAlignment' ),

            sizeObserver: function( change ) {
                this.size( change.oldValue );
            }.observes( 'ltPropSize' ),

            viewPortObserver: function() {
                this.setup();
            }.observes( 'lyteViewPort' )
        }), arg1);
    }

    _() {
        _;
    }
}

LyteCardComponent._template = "<template tag-name=\"lyte-card\"><template is=\"switch\" __vp=\"c-old\" l-c=\"true\" _new=\"true\"><template __vp=\"c-old\" case=\"{{lyteViewPort}}\" is=\"case\" lc-id=\"lc_id_0\"><dummy-port-element></dummy-port-element> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{expHandlers(ltPropLoadingYield,'!')}}\" is=\"case\" lc-id=\"lc_id_0\"> <div class=\"lyteCardRenderPlaceholder\"> </div> </template><template default=\"\"> <lyte-yield yield-name=\"loading\"></lyte-yield> </template></template> <dummy-port-element></dummy-port-element></template><template default=\"\"> <lyte-card-box style=\"{{finalStyle}}\" class=\"{{finalClass}}\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </lyte-card-box> </template></template></template>";;
LyteCardComponent._dynamicNodes = [{"t":"s","p":[0],"c":{"lc_id_0":{"dN":[{"t":"cD","p":[0],"in":2,"sibl":[1],"cn":"lc_id_0"},{"t":"s","p":[2],"c":{"lc_id_0":{"dN":[],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"i","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{},"default":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0],"cn":"lc_id_0"},{"t":"cD","p":[4],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"a":{"style":{"name":"style","dynamicValue":"finalStyle"}},"cn":"default"},{"t":"i","p":[1,1],"in":1,"sibl":[0],"cn":"default"},{"t":"cD","p":[1],"in":0,"cn":"default"}]},"dc":{"lc_id_0":{"dc":[2,1,0],"hc":true,"trans":true},"default":{"dc":[1,0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteCardComponent._observedAttributes = [
    "ltPropSize",
    "ltPropBackgroundColor",
    "ltPropAlignment",
    "ltPropBoxShadow",
    "lyteViewPort",
    "ltPropViewPort",
    "ltPropLoadingYield",
    "finalClass",
    "finalStyle"
];

/** 
 *
 * @syntax yielded
 * <lyte-card>
 * 		<template is="registerYield" yield-name="yield">
 *			<lyte-card-header>
 *				Header
 *			</lyte-card-header>
 *			<lyte-card-body>
 *				Body
 *			</lyte-card-body>
 *			<lyte-card-footer>
 *				Footer
 *			</lyte-card-footer>
 *		</template>
 * </lyte-card>
 *
 *
 */

export { LyteCardComponent };

LyteCardComponent.register("lyte-card", {
    hash: "LyteCardComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});
