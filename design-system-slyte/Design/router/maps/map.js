import { RouterMap } from "@slyte/router";

class DesignMap extends RouterMap {
	static path='../routes'
	map() {
        this.route("index",{path:'/'}) 
	}
}
export {DesignMap};
