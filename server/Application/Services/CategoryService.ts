import Service from "./Service";
import { ICategory } from "../../Repository/Models/CategoryModel.js";

class CategoryService extends Service {
  async GetAllCategories() {
    return await this._db.Category.find();
  }

  async GetAllCategoryById(id: string) {
    const category = await this._db.Category.findById(id);
    if (!category) throw new Error("Category not found");
    else return category;
  }

  async CreateCategory(category: ICategory) {
    await this._db.Category.create(category);
  }
}

export default CategoryService;
