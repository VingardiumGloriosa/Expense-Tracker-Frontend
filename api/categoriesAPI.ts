import axios from 'axios';
import { Category } from '../entities/category';
import { CreateCategoryDTO } from '../entities/CreateCategoryDTO';

export class CategoriesAPI {
    static baseUrl = 'http://localhost:3000/categories'

    static async fetchAll() {
        const response = await axios.get(this.baseUrl)
        return response.data;
    }

    static async createCategory(category: CreateCategoryDTO) {
        const response = await axios.post(this.baseUrl, category)
        return response.data;
    }
}