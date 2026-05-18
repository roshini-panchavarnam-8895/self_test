import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { ComponentRegistry } from "../node_modules/@slyte/component/index.js";

class DesignComponentRegistry extends ComponentRegistry{
    constructor(){
        super();
    }
    lookups(){
        return []
    }
    // addRegistries() {

    // }

    addRegistries() {
        return [this.$app.$lyteUiComponentAddon.$component];
    }

    _() {
        _;
    }
}

DesignComponentRegistry.register({
    hash: "C_Design_app_0",
    refHash: "app_1",
    app: true
});

export {DesignComponentRegistry}; 

