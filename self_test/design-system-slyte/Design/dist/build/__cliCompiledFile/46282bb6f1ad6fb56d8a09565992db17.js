import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { Router } from "../node_modules/@slyte/router/index.js";
import  {DesignMap}  from "./maps/map";
import {DesignComponentRegistry}  from "../components/component";

class DesignRouter extends Router {
    constructor() {
        super(...arguments);

        this.beforeRouteNavigation = function(prev,current) { 
            
        };

        this.afterRouteNavigation = function(current) {

        };
    }

    lookups(){
		return [{component : DesignComponentRegistry}]
	}

    getComponentRegistry() {
		return this.$component;
	}

    getConfig() {
		var config = {
			baseMap : DesignMap	
		}
		return config;
	}

    _() {
        _;
    }
}

export {DesignRouter} ;

