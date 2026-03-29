import { _defineProperty } from "@slyte/core/src/lyte-utils";
import Turbo from "@slyte/component/src/directives/lyte-turbo";
import { LyteUiComponentAddon } from "./node_modules/@zoho/lyte-ui-component/addon.js";
import { Lyte } from "./node_modules/@slyte/core/index.js";
import  {DesignDb} from "./data-store/db";
import  {DesignComponentRegistry}  from "./components/component";
import  {DesignRouter}  from "./router/router";

class DesignApp extends Lyte{
    lookups(){
        return [
            LyteUiComponentAddon,
            {component : DesignComponentRegistry},
            {router : DesignRouter},
            {db : DesignDb}
        ];
    }

    _() {
        _;
    }
}

export {DesignApp};

DesignApp.register({
    hash: "app_1",
    app: true
});

