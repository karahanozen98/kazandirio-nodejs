import { ICategory } from "../../Repository/Models/CategoryModel";

export default interface ProductDto {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: ICategory | null;
}
