import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { prop } from "../../../../../@slyte/core/index.js";
import { Component } from "../../component.js";
import $L from "../../../../lyte-dom/modules/lyte-dom-utils.js";

class LyteAvatarNavigatorItemComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			'ltPropImage': prop( 'object', {} ),
			'ltPropLoadingIconYield': prop( 'boolean', { 'default': false } ),
			'ltPropLoadingIconClass': prop( 'string', { 'default': 'lyteAvatarLoading' } ),
			'ltPropSelectedClass': prop( 'string', { 'default': '' } )
		}), arg1);
	}

    init() {
		this.setParentComponent();
		this.setImageAttributes();
		this.setMetaInfo();
	}

    setMetaInfo() {
		var imageObject = this.getData( 'ltPropImage' );
		this.$node._imageIndex = imageObject._imageIndex
	}

    didConnect() {
		this.setSelected();
		this.setARIAProps();
	}

    setARIAProps() {
		var imageObj = this.getData( 'ltPropImage' ),
		parent = this.parent.component,
		ariaValue = parent.getData( 'ltPropAriaLabelValue' );

		if( ariaValue ) {
			this.$node.setAttribute( 'aria-label', this.getData( 'ltPropImage' )[ ariaValue ] );
		}

		this.$node.setAttribute( 'role', 'button' );
	}

    setParentComponent() {
		var parent = $L( this.$node ).closest( 'lyte-avatar-navigator' );

		this.parent = parent.get( 0 );
	}

    getLoadingIcon() {

		return this.$node.querySelector( '.lyteAvatarLoadingCont' );
	}

    setSelected() {
		var parent = this.parent.component,
		cls = parent.getData( 'ltPropSelectedClass' ),
		imageObj = this.getData( 'ltPropImage' );

		if( imageObj.isSelected ) {
			this.setData( 'ltPropSelectedClass', cls );
		}
	}

    setImageAttributes() {
		var parent = this.parent.component, 
		urlValue = parent.getData( 'ltPropUrlValue' ),
		tooltipValue = parent.getData( 'ltPropTooltipValue' ),
		imageObj = this.getData( 'ltPropImage' ) || {},
		isString = parent.getData( 'isString' ),
		id = ( imageObj || {} ).id,
		altValue = parent.getAltValue(),
		disabled = ( imageObj || {} ).disabled,
		config = parent.getData( 'ltPropTooltip' );

		if( imageObj[ urlValue ] ) {
			this.setData( 'src', imageObj[ urlValue ] );
		}

		if( !isNaN( id ) ) {
			this.$node.setAttribute( 'data-image-id', id );
		}

		this.setData( 'alt', imageObj[ altValue ] );

		if( imageObj.disabled ) {
			this.$node.setAttribute( 'aria-disabled', 'true' );
			this.$node.setAttribute( 'disabled', 'true' );
		}

		if( tooltipValue && ( imageObj || {} )[ tooltipValue ] ) {
			this.setData( 'title', imageObj[ tooltipValue ] );
		}

		this.setData( 'config', config ); 
	}

    static actions(arg1) {
        return Object.assign(super.actions({
            hideIcon: function( event ) {
                if( !this.$node ) {
                    return ;
                }

                var loadingIcon = this.getLoadingIcon();

                loadingIcon.style.display = 'none';
            }
        }), arg1);
    }

    static observers(arg1) {
        return Object.assign(super.observers({
            imageObserver: function() {
                this.setSelected();
                this.setImageAttributes();
            }.observes( 'ltPropImage' ),

            addSelectedClass: function() {
                var sel = this.getData( 'ltPropSelectedClass' ),
                imageObj = this.getData( 'ltPropImage' );

                if( sel ) {
                    this.$node.classList.add( sel );
                    this.selClass = sel;
                    imageObj.isSelected = true;
                    this.$node.setAttribute( 'aria-current', 'true' );
                }
                else {
                    this.$node.classList.remove( this.selClass );
                    this.selClass = '';
                    imageObj.isSelected = false;
                    this.$node.removeAttribute( 'aria-current' );
                }

            }.observes( 'ltPropSelectedClass' )
        }), arg1);
    }

    _() {
        _;
    }
}

LyteAvatarNavigatorItemComponent._template = "<template tag-name=\"lyte-avatar-navigator-item\"> <img src=\"{{src}}\" onload=\"{{action('hideIcon',event)}}\" title=\"\" alt=\"{{alt}}\" lt-prop-title=\"{{title}}\" lt-prop-tooltip-config=\"{{config}}\"> <div class=\"lyteAvatarLoadingCont\"> <template is=\"switch\" l-c=\"true\" _new=\"true\"><template case=\"{{ltPropLoadingIconYield}}\" is=\"case\" lc-id=\"lc_id_0\"> <lyte-yield yield-name=\"loadingIconYield\"></lyte-yield> </template><template default=\"\"> <div class=\"{{ltPropLoadingIconClass}}\"></div> </template></template> </div> </template>";;
LyteAvatarNavigatorItemComponent._dynamicNodes = [{"t":"a","p":[1]},{"t":"s","p":[3,1],"c":{"lc_id_0":{"dN":[{"t":"i","p":[1],"in":0,"cn":"lc_id_0"}],"cdp":{"t":"a","p":[0]},"dcn":true}},"d":{"dN":[{"t":"a","p":[1],"cn":"default"}]},"dc":{"lc_id_0":{"dc":[0],"hc":true,"trans":true},"default":{}},"hd":true,"co":["lc_id_0"],"hc":true,"trans":true,"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;

LyteAvatarNavigatorItemComponent._observedAttributes = [
    "ltPropImage",
    "ltPropLoadingIconYield",
    "ltPropLoadingIconClass",
    "ltPropSelectedClass"
];

export { LyteAvatarNavigatorItemComponent };

LyteAvatarNavigatorItemComponent.register("lyte-avatar-navigator-item", {
    hash: "LyteAvatarNavigatorItemComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});