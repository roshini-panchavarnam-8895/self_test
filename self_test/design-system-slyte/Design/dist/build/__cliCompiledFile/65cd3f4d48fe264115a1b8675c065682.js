import { _defineProperty } from "@slyte/core/src/lyte-utils";
import './lyte-checkbox.js';
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";

class LyteCheckboxGroupComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({

			/**
			 * @componentProperty {default | primary | switch | slider} ltPropType=default
			 */

			'ltPropType': prop( 'string', { 
				'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'type', 'default' )
			} ),

			/**
			 * @componentProperty {string} ltPropName
			 */

			'ltPropName': prop( 'string', { 
				'default': undefined 
			} ),

			/**
			 * @componentProperty {string} ltPropUserValue=name
			 * 
			 */

			'ltPropUserValue': prop( 'string', { 
				'default': 'name' 
			} ),

			/**
			 * @componentProperty {string} ltPropSystemValue=value
			 * 
			 */

			'ltPropSystemValue': prop( 'string', { 
				'default': 'value' 
			} ),

			/**
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 */

			'ltPropFireOnInit': prop( 'boolean', { 
				'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'fireOnInit', false ) 
			} ),

			/**
			 * @componentProperty {string} ltPropClass
			 */

			'ltPropClass': prop( 'string', { 
				'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'class', '' ) 
			} ),

			/**
			 * @componentProperty {array} ltPropOptions=[]
			 */

			'ltPropOptions': prop( 'array', { 'default': [] } ),

			/**
			 * @componentProperty {array} ltPropSelected=[]
			 */

			'ltPropSelected': prop( 'array', { 
				'default': [] 
			} ),

			/**
			 * @componentProperty {horizontal | vertical} ltPropAlignment=horizontal
			 */

			'ltPropAlignment': prop( 'string', { 
				'default': window._lyteUiUtils.resolveDefaultValue( 'lyte-checkbox-group', 'alignment', 'horizontal' )  
			} ),

			/**
			 * @componentProperty {boolean} ltPropFocus=false
			 * 
			 */

			'ltPropFocus': prop( 'boolean', { 
				'default': false 
			} ),

			/**
			 * @componentProperty {array} ltPropDisabledList=[]
			 * 
			 */

			'ltPropDisabledList': prop( 'array', { 
				'default': [] 
			} ),

			/**
			 * @componentProperty {boolean} ltPropYield=false
			 * 
			 */

			'ltPropYield': prop( 'boolean', { 
				'default': false 
			} )
		}), arg1);
	}

    init() {
		var alignment = this.getData( 'ltPropAlignment' );

		this.setData( 'alignmentClass', 'lyteCBoxGroup' + alignment[ 0 ].toUpperCase() + alignment.substring( 1 ) );
	}

    static methods(arg1) {
        return Object.assign(super.methods({
            fireCallback: function( callbackName, item ) {

                if(!this.preventMutation) {

                    if( callbackName === 'onChecked' ) {
                        this.add( item );
                    }
                    else if( callbackName === 'onUnchecked' ) {
                        this.remove( item );
                    }
                }

                if( this.getMethods( callbackName ) ) {
                    return this.executeMethod.apply( this, this.constructArgs(callbackName, item, arguments ) );
                }
            }
        }), arg1);
    }

    add(item) {
		this.preventObserver = true;
		this.$addon.arrayUtils( this.getData( 'ltPropSelected' ), 'push', item );
		this.preventObserver = false;
	}

    getIndex(array, item) {
		var sysValue = this.getData( 'ltPropSystemValue' );
		for(var index=0; index < array.length; index++) {
			if(array[index][sysValue] ===  item[sysValue]) {
				return index;
			}
		}
	}

    remove(item) {
		this.preventObserver = true;

		var sel = this.getData( 'ltPropSelected' ) || [],
		ind = this.getIndex(sel, item);

		if( ind !== -1 ) {
			this.$addon.arrayUtils( sel, 'removeAt', ind, 1 );
		}

		this.preventObserver = false;
	}

    getAddedValues(oldValue, newValue) {
		return this.setSubtract( newValue, oldValue );
	}

    getRemovedValues(oldValue, newValue) {
		return this.setSubtract( oldValue, newValue );
	}

    setSubtract(arrA, arrB) {
		var sysValue = this.getData( 'ltPropSystemValue' );

		arrA = arrA || [];
		arrB = arrB || [];

		return arrA.filter( function( obj ) {
			for( var i = 0; i < arrB.length; i++ ) {
				if( obj[ sysValue ] === arrB[ i ][ sysValue ] ) {
					return false;
				}
			}

			return true;
		} );
	}

    constructArgs(methodName, item, args) {
		var arr = [].slice.call( args );

		arr.shift();
		arr.shift();
		arr.unshift( methodName );
		arr.push(item);

		return arr; 
	}

    check(item) {
		this.changeToState( item, true );
	}

    uncheck(item) {
		this.changeToState( item, false );
	}

    changeToState(item, newState) {
		var sysValue = this.getData( 'ltPropSystemValue' ),
		dataValue = item[ sysValue ],
		checkbox = this.$node.querySelector( '[data-value="' + dataValue + '"]' );

		if( checkbox ) {
			checkbox.ltProp( 'checked', newState );
		}
	}

    focusCBox() {
		var cbox;

		this.setData( 'ltPropFocus', false );
		cbox = this.getFirstEnabledCheckbox();

		if( cbox ) {
			cbox.ltProp( 'focus', true );
		}
	}

    getFirstEnabledCheckbox() {
		var cboxes = this.$node.querySelectorAll( 'lyte-checkbox' );

		for( var i = 0; i < cboxes.length; i++ ) {
			if( !cboxes[ i ].ltProp( 'disabled' ) ) {
				return cboxes[ i ];
			}
		}
	}

    static observers(arg1) {
        return Object.assign(super.observers({
            selectedObserver: function( changeObj ) {

                if( this.preventObserver ) {
                    return ;
                }

                var oldValue = changeObj.oldValue,
                newValue = changeObj.newValue,
                addedValues = this.getAddedValues( oldValue, newValue ),
                removedValues = this.getRemovedValues( oldValue, newValue ),
                that = this;
                
                this.preventMutation = true;

                addedValues.forEach( function( cbox ) {
                    that.check( cbox );
                } );

                removedValues.forEach( function( cbox ) {
                    that.uncheck( cbox );
                } );

                this.preventMutation = false;

            }.observes( 'ltPropSelected.[]' ),

            focusObserver: function() {
                var focus = this.getData( 'ltPropFocus' );

                if( focus ) {
                    this.focusCBox();
                }
            }.observes( 'ltPropFocus' ).on( 'didConnect' )
        }), arg1);
    }

    _() {
        _;
    }
}

LyteCheckboxGroupComponent._template = "<template tag-name=\"lyte-checkbox-group\" role=\"group\"> <div class=\"{{alignmentClass}}\" role=\"list\"> <template items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"> <lyte-checkbox role=\"listitem\" lt-prop-type=\"{{ltPropType}}\" lt-prop-name=\"{{ltPropName}}\" lt-prop-label=\"{{item[ltPropUserValue]}}\" lt-prop-value=\"{{item[ltPropSystemValue]}}\" lt-prop-fire-on-init=\"{{ltPropFireOnInit}}\" lt-prop-label-class=\"{{ltPropLabelClass}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-prevent-callback-observers=\"true\" lt-prop-checked=\"{{unbound(lyteUiIsInArray(item,ltPropSelected,ltPropSystemValue))}}\" lt-prop-class=\"{{ltPropClass}}\" lt-prop-disabled=\"{{lyteUiIsInArray(item,ltPropDisabledList,ltPropSystemValue)}}\" on-checked=\"{{method('fireCallback','onChecked',item)}}\" ,=\"\" on-unchecked=\"{{method('fireCallback','onUnchecked',item)}}\" on-before-checked=\"{{method('fireCallback','onBeforeChecked',item)}}\" on-before-unchecked=\"{{method('fireCallback','onBeforeUnchecked',item)}}\" on-changed=\"{{method('fireCallback','onChanged',item)}}\" data-value=\"{{item[ltPropSystemValue]}}\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropYield}}\" is=\"case\" lc-id=\"lc_id_0\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" lyte-item=\"{{item}}\"></lyte-yield> </template> </template></template> </lyte-checkbox> </template> </div> </template>";;
LyteCheckboxGroupComponent._dynamicNodes = [{"t":"a","p":[1]},{"t":"a","p":[1,1]},{"t":"f","p":[1,1],"dN":[{"t":"a","p":[1]},{"t":"s","p":[1,1],"c":{"lc_id_0":{"dN":[{"t":"r","p":[1],"dN":[{"t":"a","p":[1]},{"t":"i","p":[1],"in":0}],"dc":[0],"hc":true,"trans":true,"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[1,0],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteCheckboxGroupComponent._observedAttributes = [
    "ltPropType",
    "ltPropName",
    "ltPropUserValue",
    "ltPropSystemValue",
    "ltPropFireOnInit",
    "ltPropClass",
    "ltPropOptions",
    "ltPropSelected",
    "ltPropAlignment",
    "ltPropFocus",
    "ltPropDisabledList",
    "ltPropYield"
];

/**
 * @syntax nonYielded
 * <lyte-checkbox-group lt-prop-options='[{"name": "Option 1", "value": "1"}, {"name": "Option 2", "value": "2"}]' lt-prop-user-value="name" lt-prop-system-value="value"></lyte-checkbox-group>
 */

export { LyteCheckboxGroupComponent };

LyteCheckboxGroupComponent.register("lyte-checkbox-group", {
    hash: "LyteCheckboxGroupComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});