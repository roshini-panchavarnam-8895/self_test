import { _defineProperty } from "@slyte/core/src/lyte-utils";
import { Db,RESTConnector,RESTSerializer } from "../node_modules/@slyte/data/index.js";

class DesignDb extends Db{
    _() {
        _;
    }
}

DesignDb.Connector = RESTConnector;DesignDb.Serializer = RESTSerializer;

DesignDb.register({
    hash: "db_Design_app_0"
});

let Schema = DesignDb.Schema;
export {DesignDb,Schema};
