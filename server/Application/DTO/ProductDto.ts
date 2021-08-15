import { ICategory } from "../../Repository/Models/CategoryModel";
import { CategoryDto } from "./CategoryDto";

export default interface ProductDto {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: CategoryDto | null;
}
