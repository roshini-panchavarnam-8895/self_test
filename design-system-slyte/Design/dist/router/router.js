import { Router } from "@slyte/router";
import  {DesignMap}  from "./maps/map";
import {DesignComponentRegistry}  from "../components/component";
class DesignRouter extends Router {
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
	
    beforeRouteNavigation = function(prev,current) { 
		
	}
	
    afterRouteNavigation = function(current) {

	}
}

export {DesignRouter} ;

