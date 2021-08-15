import { CategoryDto } from "./CategoryDto";

export default interface ProductDto {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: CategoryDto | null;
}
