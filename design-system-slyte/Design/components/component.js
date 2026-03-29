import { ComponentRegistry } from "@slyte/component";

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
}

export {DesignComponentRegistry}; 

