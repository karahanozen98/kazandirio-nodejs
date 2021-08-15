import Service from "./Service.js";
import { ICategory } from "../../Repository/Models/CategoryModel.js";
import { CategoryDto } from "../DTO/CategoryDto.js";

interface ICategoryService {
  GetAllCategories(): Promise<CategoryDto[]>;
  GetCategoryById(id: string): Promise<CategoryDto>;
  CreateCategory(category: ICategory): Promise<void>;
}

class CategoryService extends Service implements ICategoryService {
  async GetAllCategories(): Promise<CategoryDto[]> {
    const categories = await this._db.Category.find();
    const categoriesDto = categories.map((category) => {
      return { id: category._id, name: category.name, rewardAmount: category.rewardAmount };
    });
    return categoriesDto;
  }

  async GetCategoryById(id: string): Promise<CategoryDto> {
    const category = await this._db.Category.findById(id);
    if (!category) throw new Error("Category not found");
    else return { id: category._id, name: category.name, rewardAmount: category.rewardAmount };
  }

  async CreateCategory(category: ICategory): Promise<void> {
    await this._db.Category.create(category);
  }
}

export default CategoryService;
