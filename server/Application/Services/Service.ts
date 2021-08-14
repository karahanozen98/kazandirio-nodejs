import { IDBContainer } from "../../Repository/DBContainer";

class Service{
    protected _db: IDBContainer;

    constructor(db: IDBContainer) {
      this._db = db;
    }
}
export default Service