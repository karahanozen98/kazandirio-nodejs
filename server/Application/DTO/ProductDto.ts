interface ICategory {}

export default class ProductDto {
  private _Id: number;
  private _name: string;
  private _price: number;
  private _imageUrl: string;
  private _categoryId: string;
  private _category: ICategory;

  constructor(
    Id: number,
    name: string,
    price: number,
    imageUrl: string,
    categoryId: string,
    category: ICategory
  ) {
    this._Id = Id;
    this._name = name;
    this._price = price;
    this._imageUrl = imageUrl;
    this._categoryId = categoryId;
    this._category = category;
  }

  // GETTER SETTERS
  public get Id(): number {
    return this._Id;
  }
  public set Id(value: number) {
    this._Id = value;
  }
  public get Name_1(): string {
    return this._name;
  }
  public set Name_1(value: string) {
    this._name = value;
  }
  public get Price(): number {
    return this._price;
  }
  public set Price(value: number) {
    this._price = value;
  }
  public get ImageUrl(): string {
    return this._imageUrl;
  }
  public set ImageUrl(value: string) {
    this._imageUrl = value;
  }
  public get CategoryId(): string {
    return this._categoryId;
  }
  public set CategoryId(value: string) {
    this._categoryId = value;
  }
  public get Category(): ICategory {
    return this._category;
  }
  public set Category(value: ICategory) {
    this._category = value;
  }
}
