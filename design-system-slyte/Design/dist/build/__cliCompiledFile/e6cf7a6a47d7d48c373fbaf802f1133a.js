import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { prop } from "../../../../@slyte/core/index.js";
import { Component, LyteUiComponentComponentRegistry } from "../component.js";

class LyteTimelineComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({

			// left, right, alternate
			'ltPropAlignment': prop( 'string', { 'default': 'left' } )
		}), arg1);		
	}

    _() {
        _;
    }
}

LyteTimelineComponent._template = "<template tag-name=\"lyte-timeline\"> </template>";;
LyteTimelineComponent._dynamicNodes = [];;
LyteTimelineComponent._observedAttributes = ["ltPropAlignment"];

if( !window._lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] ) {
    window._lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] = true;

    /**
 	 * @customElement lyte-timeline-item
 	 */

    class LyteTimelineItemCustomElements extends LyteUiComponentComponentRegistry.CustomElements {
        lookups() {
            return [{
                component: LyteUiComponentComponentRegistry
            }];
        }

        constructor() {
            super();
        }

        static get observedAttributes() {
            return [];
        }

        connectedCallback() {
            var lyteNode = this.$node;
            var separator = document.createElement( 'lyte-timeline-separator' ),
			label = lyteNode.querySelector( 'lyte-timeline-item-label' );

            lyteNode.insertBefore( separator, label.nextElementSibling );
        }

        _() {
            _;
        }
    }

    LyteTimelineItemCustomElements.options = {clone : {allCallbacks : false}};

    LyteTimelineItemCustomElements.register("lyte-timeline-item");
}

export { LyteTimelineComponent };
LyteTimelineComponent.register("lyte-timeline", {
    hash: "LyteTimelineComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});
