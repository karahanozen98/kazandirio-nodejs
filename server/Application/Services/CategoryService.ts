import Service from "./Service.js";
import { ICategory } from "../../Repository/Models/CategoryModel.js";

interface ICategoryService{
    GetAllCategories(): Promise<ICategory[]>
    GetCategoryById(id: string): Promise<ICategory>
    CreateCategory(category: ICategory): Promise<void>
}

class CategoryService extends Service implements ICategoryService {
  async GetAllCategories(): Promise<ICategory[]> {
    return await this._db.Category.find();
  }

  async GetCategoryById(id: string): Promise<ICategory> {
    const category = await this._db.Category.findById(id);
    if (!category) throw new Error("Category not found");
    else return category;
  }

  async CreateCategory(category: ICategory): Promise<void> {
    await this._db.Category.create(category);
  }
}

export default CategoryService;
