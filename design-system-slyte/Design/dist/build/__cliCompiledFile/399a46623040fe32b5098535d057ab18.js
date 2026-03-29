import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { prop } from "../../../../@slyte/core/index.js";
import { Component } from "../component.js";

/**
 * Renders a notification badge
 * @component lyte-badge
 * @version 2.2.0
 */

class LyteBadgeComponent extends Component {
    constructor() {
        super();
    }

    data(arg1) {
		return Object.assign(super.data({
			/**
			 * @componentProperty {object} ltPropBadgeStyle
			 */

			'ltPropBadgeStyle' : prop('object' , { default : {}
			}),

			/**
			 * @componentProperty {topRight|topLeft|bottomRight|bottomLeft} ltPropPosition
			 * @default topRight
			 */

			'ltPropPosition' : prop('string' , {
				default : 'topRight'
			}),

			/**
			 * @componentProperty {string} ltPropData
			 */

			'ltPropData' : prop('string' , {
				default : ''
			}),

			/**
			 * @componentProperty {number} ltPropMaxLength
			 * @default 0
			 */

			'ltPropMaxLength' : prop('number' , {
				default : 0
			})
		}), arg1);
	}

    didConnect() {

		var maxCount = this.getData('ltPropMaxLength');

		if(maxCount !== 0){

			var countStr = ''

			for(var i=0 ; i<maxCount ;i++){

				countStr += '9';

			}

			countStr = parseInt(countStr);

			var userData = parseInt(this.getData('ltPropData'))

			if(countStr < userData){

				this.setData('ltPropData' , countStr + '+')

			}

		}


		if(window.getComputedStyle(this.$node.parentElement).position === "static"){
			this.$node.parentElement.style.position = 'relative';
		}
		var styleObject = this.getData('ltPropBadgeStyle');
		var lyteBadgeDiv = this.$node.querySelector('.lyteBadge');
		var newStyle = '';
		for(window.css in styleObject){
			newStyle += window.css + ":" + styleObject[window.css] + ';';
		}
		lyteBadgeDiv.setAttribute('style' , newStyle);
		if(this.getData('ltPropData') === ''){
			lyteBadgeDiv.classList.add('lyteBadgeWidHeiWD');
		} else {
			lyteBadgeDiv.classList.add('lyteBadgeWidHeiD');
		}

		var positionData = this.getData('ltPropPosition');
		positionData = 'lyteBadge' + positionData.charAt(0).toUpperCase() + positionData.slice(1);
		lyteBadgeDiv.classList.add(positionData);
	}

    _() {
        _;
    }
}

LyteBadgeComponent._template = "<template tag-name=\"lyte-badge\"> <div class=\"lyteBadge\"> <span class=\"lyteBadgeContent\">{{ltPropData}} <lyte-yield yield-name=\"lyteBadgeYield\"></lyte-yield> </span> </div> </template>";;
LyteBadgeComponent._dynamicNodes = [{"t":"tX","p":[1,1,0]},{"t":"i","p":[1,1,2],"in":0},{"type":"dc","trans":true,"hc":true,"p":[0]}];;
LyteBadgeComponent._observedAttributes = ["ltPropBadgeStyle", "ltPropPosition", "ltPropData", "ltPropMaxLength"];

/**
 * @syntax yielded
 * <lyte-badge>
 *    <template is="registerYield" yield-name='lyteBadgeYield'>
 *        *
 *    </template>
 * </lyte-badge>
 */

export { LyteBadgeComponent };

LyteBadgeComponent.register("lyte-badge", {
    hash: "LyteBadgeComponent_4",
    refHash: "C_lyte-ui-component_@zoho/lyte-ui-component_2"
});
