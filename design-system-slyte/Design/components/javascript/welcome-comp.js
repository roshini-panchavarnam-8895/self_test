import { prop } from "@slyte/core";
import { Component } from "@slyte/component";

// Import all lyte-ui components so they get bundled
import "@zoho/lyte-ui-component/components/javascript/lyte-accordion.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-alert.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-badge.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-banner.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-breadcrumb.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-button.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-button-group.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-card.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-carousel.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-code-snippet.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-drawer.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-dropdown.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-hovercard.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-loader.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-menu.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-messagebox.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-modal.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-nav.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-navigator.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-popover.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-progressbar.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-rating.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-splitter.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-step.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-tabs.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-tag.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-timeline.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-tooltip.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-tree.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-wormhole.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-checkbox.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-checkbox-group.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-colorbox.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-dateselect.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-fileupload.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-input.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-number.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-radiobutton.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-radiobutton-group.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-search.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-slider.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-text.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-time-picker.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-autocomplete.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-multi-dropdown.js";
import "@zoho/lyte-ui-component/components/javascript/lyte-signature.js";


class WelcomeComp extends Component{

	constructor() {
		super();
	}

	data() {
		return {
			"features" : prop("array",{
				default : [
					{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
					{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
					{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
					{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
				]
			})
		}
	}

	static methods() {
		return {
		}
	}

	static actions() {
		return {
			
		}
	}

	static observers() {
		return {
		}
	}
}


export {WelcomeComp};
