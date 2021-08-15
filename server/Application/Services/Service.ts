import { IDBContainer } from "../../Repository/DBContainer.js";
import { injectable } from "tsyringe";

@injectable()
class Service{
    protected _db: IDBContainer;

    constructor(db: IDBContainer) {
      this._db = db;
    }
}
export default Service