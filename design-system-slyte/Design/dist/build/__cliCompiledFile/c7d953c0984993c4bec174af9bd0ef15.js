import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { Route } from "../../node_modules/@slyte/router/index.js";
let WelcomeComp;

class Index extends Route {
    render() {
		return {outlet : "#outlet",component : WelcomeComp}
	}

    static actions(arg1) {
		return Object.assign(super.actions({
			
		}), arg1);
	}

    _() {
        _;
    }

    getRequirements() {
        arguments[1].push(import(/* webpackChunkName: "components/javascript/welcome-comp" */
        "../../components/javascript/welcome-comp").then(function(res) {
            WelcomeComp = res.WelcomeComp;
        }));

        "____dynamicImportsCode____";
    }
}

export {Index};

