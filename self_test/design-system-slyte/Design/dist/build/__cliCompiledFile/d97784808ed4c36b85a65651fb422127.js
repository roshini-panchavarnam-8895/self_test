import {Index as Index} from '/router/routes/index.js';

import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { RouterMap } from "../../node_modules/@slyte/router/index.js";

class DesignMap extends RouterMap {
    map() {
        this.route("index",{
            path:'/',
            handler: Index
        }) 
	}

    _() {
        _;
    }
}

DesignMap.path = '../routes';
export {DesignMap};
