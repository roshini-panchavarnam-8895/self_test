import { _defineProperty } from "@slyte/core/src/lyte-utils";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-button.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-dropdown.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-accordion.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-badge.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-breadcrumb.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-button-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-carousel.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-code-snippet.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-daterangepicker.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-drawer.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-fileupload.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-kanbanview.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-nav.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-navigator.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-progressbar.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-rating.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-search.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-signature.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-slider.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tabs.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-table.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-text.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tree.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-video.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-voicenote.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-alert.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-banner.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-calendar.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-colorbox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-combobox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-dateselect.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-loader.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-menu.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-messagebox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-modal.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-multi-dropdown.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-popover.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tooltip.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-checkbox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-checkbox-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-datetime-input.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-input.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-number.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-radiobutton.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-radiobutton-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/avatar-navigator/lyte-avatar-navigator.js";
import { prop } from "../../node_modules/@slyte/core/index.js";
import { Component } from "../../node_modules/@slyte/component/index.js";

// Import all lyte-ui components so they get bundled
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-accordion.js";

import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-alert.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-badge.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-banner.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-breadcrumb.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-button.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-button-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-card.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-carousel.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-code-snippet.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-drawer.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-dropdown.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-hovercard.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-loader.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-menu.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-messagebox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-modal.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-nav.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-navigator.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-popover.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-progressbar.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-rating.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-splitter.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-step.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tabs.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tag.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-timeline.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tooltip.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-tree.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-wormhole.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-checkbox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-checkbox-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-colorbox.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-dateselect.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-fileupload.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-input.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-number.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-radiobutton.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-radiobutton-group.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-search.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-slider.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-text.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-time-picker.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-autocomplete.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-multi-dropdown.js";
import "../../node_modules/@zoho/lyte-ui-component/components/javascript/lyte-signature.js";

class WelcomeComp extends Component {
    constructor() {
		super();
	}

    data(arg1) {
		return Object.assign(super.data({
			"features" : prop("array",{
				default : [
					{module : 'Router',url : 'http://lyte/2.0/doc/route/introduction'},
					{module : 'Components',url : 'http://lyte/2.0/doc/components/introduction'},
					{module : 'Data',url : 'http://lyte/2.0/doc/data/introduction'},
					{module : 'CLI',url : 'http://lyte/2.0/doc/cli/introduction'}
				]
			})
		}), arg1);
	}

    static methods(arg1) {
		return Object.assign(super.methods({
		}), arg1);
	}

    static actions(arg1) {
		return Object.assign(super.actions({
			
		}), arg1);
	}

    static observers(arg1) {
		return Object.assign(super.observers({
		}), arg1);
	}

    _() {
        _;
    }
}

WelcomeComp._template = "<template tag-name=\"welcome-comp\"> <h1>Available features of SLYTE</h1> <ul> <template items=\"{{features}}\" item=\"item\" index=\"index\" is=\"for\" _new=\"true\"><li> <a href=\"{{item.url}}\" target=\"_blank\">{{item.module}}</a> </li></template> <lyte-button> <template is=\"registerYield\" yield-name=\"text\"> Default </template> </lyte-button> <lyte-button lt-prop-appearance=\"primary zc-col-common\"> <template is=\"registerYield\" yield-name=\"text\"> Primary </template> </lyte-button> <lyte-dropdown class=\"zc-custom-dropdown\" lt-prop-selected=\"supplier\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <lyte-drop-item data-value=\"prospect\">Prospects Found</lyte-drop-item> <lyte-drop-item data-value=\"supplier\">Suppliers Found</lyte-drop-item> <lyte-drop-item data-value=\"vendor\">Vendors Found</lyte-drop-item> <lyte-drop-item data-value=\"influencer\">Influencers Found</lyte-drop-item> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </ul> <!-- Hidden: register all lyte-ui components for the design system --> <div style=\"display:none\"> <lyte-accordion></lyte-accordion> <lyte-badge></lyte-badge> <lyte-breadcrumb></lyte-breadcrumb> <lyte-button-group></lyte-button-group> <lyte-carousel></lyte-carousel> <lyte-code-snippet></lyte-code-snippet> <lyte-daterangepicker></lyte-daterangepicker> <lyte-drawer></lyte-drawer> <lyte-fileupload></lyte-fileupload> <lyte-kanbanview></lyte-kanbanview> <lyte-nav></lyte-nav> <lyte-navigator></lyte-navigator> <lyte-progressbar></lyte-progressbar> <lyte-rating></lyte-rating> <lyte-search></lyte-search> <lyte-signature></lyte-signature> <lyte-slider></lyte-slider> <lyte-tabs></lyte-tabs> <lyte-table></lyte-table> <lyte-text></lyte-text> <lyte-tree></lyte-tree> <lyte-video></lyte-video> <lyte-voicenote></lyte-voicenote> <lyte-alert></lyte-alert> <lyte-banner></lyte-banner> <lyte-calendar></lyte-calendar> <lyte-colorbox></lyte-colorbox> <lyte-combobox></lyte-combobox> <lyte-dateselect></lyte-dateselect> <lyte-loader></lyte-loader> <lyte-menu></lyte-menu> <lyte-messagebox></lyte-messagebox> <lyte-modal></lyte-modal> <lyte-multi-dropdown></lyte-multi-dropdown> <lyte-popover></lyte-popover> <lyte-tooltip></lyte-tooltip> <lyte-checkbox></lyte-checkbox> <lyte-checkbox-group></lyte-checkbox-group> <lyte-datetime-input></lyte-datetime-input> <lyte-input></lyte-input> <lyte-number></lyte-number> <lyte-radiobutton></lyte-radiobutton> <lyte-radiobutton-group></lyte-radiobutton-group> <lyte-avatar-navigator></lyte-avatar-navigator> </div> </template><style >.zc-custom-dropdown lyte-drop-button {\n    border-radius: 6px;\n    padding: 10px 25px 10px 11px;\n    min-width: 240px;\n}\n.zc-custom-dropdown lyte-drop-button{\n    font-size: 12px;\n}\nlyte-dropdown lyte-icon.dropdown{\n    background-position: -14px -2px;\n    width: 9px;\n    height: 5px;\n}\nlyte-drop-box.lyteDropdownDown{border-radius: 6px;margin-top: 4px;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);}\n\nlyte-drop-item {\n    padding: 11px 25px 11px 10px;\n    border-radius: 6px;\n    font-size: 12px;\n}\n\nlyte-drop-body {\n    padding: 10px;\n}\n\nlyte-drop-item[selected=\"true\"]::before {\n    left: auto;\n    right: 10px;\n}\n\n.lyteDropdownSelection {\n    background: #f4f5ff;\n}\n.lyteDropdownSelection:hover{\n    background: #f7f8ff;\n}\n</style>";;
WelcomeComp._dynamicNodes = [{"t":"a","p":[3,1]},{"t":"f","p":[3,1],"dN":[{"t":"a","p":[0,1]},{"t":"tX","p":[0,1,0]}],"in":50,"sibl":[49]},{"t":"r","p":[3,3,1],"dN":[],"in":49,"sibl":[48]},{"t":"cD","p":[3,3],"in":48,"sibl":[47]},{"t":"r","p":[3,5,1],"dN":[],"in":47,"sibl":[46]},{"t":"cD","p":[3,5],"in":46,"sibl":[45]},{"t":"r","p":[3,7,1],"dN":[{"t":"cD","p":[1,1,1],"in":5,"sibl":[4]},{"t":"cD","p":[1,1,3],"in":4,"sibl":[3]},{"t":"cD","p":[1,1,5],"in":3,"sibl":[2]},{"t":"cD","p":[1,1,7],"in":2,"sibl":[1]},{"t":"cD","p":[1,1],"in":1,"sibl":[0]},{"t":"cD","p":[1],"in":0}],"dc":[5,4,3,2,1,0],"hc":true,"trans":true,"in":45,"sibl":[44]},{"t":"cD","p":[3,7],"in":44,"sibl":[43]},{"t":"cD","p":[7,1],"in":43,"sibl":[42]},{"t":"cD","p":[7,3],"in":42,"sibl":[41]},{"t":"cD","p":[7,5],"in":41,"sibl":[40]},{"t":"cD","p":[7,7],"in":40,"sibl":[39]},{"t":"cD","p":[7,9],"in":39,"sibl":[38]},{"t":"cD","p":[7,11],"in":38,"sibl":[37]},{"t":"cD","p":[7,13],"in":37,"sibl":[36]},{"t":"cD","p":[7,15],"in":36,"sibl":[35]},{"t":"cD","p":[7,17],"in":35,"sibl":[34]},{"t":"cD","p":[7,19],"in":34,"sibl":[33]},{"t":"cD","p":[7,21],"in":33,"sibl":[32]},{"t":"cD","p":[7,23],"in":32,"sibl":[31]},{"t":"cD","p":[7,25],"in":31,"sibl":[30]},{"t":"cD","p":[7,27],"in":30,"sibl":[29]},{"t":"cD","p":[7,29],"in":29,"sibl":[28]},{"t":"cD","p":[7,31],"in":28,"sibl":[27]},{"t":"cD","p":[7,33],"in":27,"sibl":[26]},{"t":"cD","p":[7,35],"in":26,"sibl":[25]},{"t":"cD","p":[7,37],"in":25,"sibl":[24]},{"t":"cD","p":[7,39],"in":24,"sibl":[23]},{"t":"cD","p":[7,41],"in":23,"sibl":[22]},{"t":"cD","p":[7,43],"in":22,"sibl":[21]},{"t":"cD","p":[7,45],"in":21,"sibl":[20]},{"t":"cD","p":[7,47],"in":20,"sibl":[19]},{"t":"cD","p":[7,49],"in":19,"sibl":[18]},{"t":"cD","p":[7,51],"in":18,"sibl":[17]},{"t":"cD","p":[7,53],"in":17,"sibl":[16]},{"t":"cD","p":[7,55],"in":16,"sibl":[15]},{"t":"cD","p":[7,57],"in":15,"sibl":[14]},{"t":"cD","p":[7,59],"in":14,"sibl":[13]},{"t":"cD","p":[7,61],"in":13,"sibl":[12]},{"t":"cD","p":[7,63],"in":12,"sibl":[11]},{"t":"cD","p":[7,65],"in":11,"sibl":[10]},{"t":"cD","p":[7,67],"in":10,"sibl":[9]},{"t":"cD","p":[7,69],"in":9,"sibl":[8]},{"t":"cD","p":[7,71],"in":8,"sibl":[7]},{"t":"cD","p":[7,73],"in":7,"sibl":[6]},{"t":"cD","p":[7,75],"in":6,"sibl":[5]},{"t":"cD","p":[7,77],"in":5,"sibl":[4]},{"t":"cD","p":[7,79],"in":4,"sibl":[3]},{"t":"cD","p":[7,81],"in":3,"sibl":[2]},{"t":"cD","p":[7,83],"in":2,"sibl":[1]},{"t":"cD","p":[7,85],"in":1,"sibl":[0]},{"t":"cD","p":[7,87],"in":0},{"type":"dc","trans":true,"hc":true,"p":[48,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]}];;
WelcomeComp._observedAttributes = ["features"];
export {WelcomeComp};
WelcomeComp.register("welcome-comp", {
    hash: "WelcomeComp_4",
    refHash: "C_Design_app_0"
});
