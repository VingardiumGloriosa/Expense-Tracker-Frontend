import axios from 'axios';
import { CreateCategoryDTO } from '../entities/CreateCategoryDTO';

export class CategoriesAPI {

    static async fetchAll() {
        const response = await axios.get((process.env.BASE_URL || 'localhost:3000') + '/category')
        return response.data;
    }

    static async createCategory(category: CreateCategoryDTO) {
        const response = await axios.post((process.env.BASE_URL || 'localhost:3000') + '/category', category)
        return response.data;
    }

    static async deleteCategory(categoryId: number) {
        const response = await axios.delete((process.env.BASE_URL || 'http://localhost:3000') + `/category/${categoryId}`);
        return response.data; // Depending on your backend, you might not need to return anything for a delete operation
    }
}