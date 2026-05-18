import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { Route } from "../../node_modules/@slyte/router/index.js";

class Index extends Route {
    render() {
		return { outlet: "#outlet" };
	}

    static actions(arg1) {
		return Object.assign(super.actions({
			
		}), arg1);
	}

    _() {
        _;
    }

    getRequirements() {
        "____dynamicImportsCode____";
    }
}

export {Index};

