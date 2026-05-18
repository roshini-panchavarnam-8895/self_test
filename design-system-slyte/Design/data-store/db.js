import { Db,RESTConnector,RESTSerializer } from "@slyte/data";

class DesignDb extends Db{
    static Connector = RESTConnector;
    static Serializer = RESTSerializer;
}

let Schema = DesignDb.Schema;
export {DesignDb,Schema};
