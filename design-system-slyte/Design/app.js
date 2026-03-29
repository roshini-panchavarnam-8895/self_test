import { LyteUiComponentAddon } from "@zoho/lyte-ui-component/addon.js";
import { Lyte } from "@slyte/core";
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
}
export {DesignApp};

