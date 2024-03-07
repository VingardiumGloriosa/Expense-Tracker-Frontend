import { Category } from "../entities/category";

export interface Entry {
    id: number;
    amount: number;
    date: string;
    currency: string;
    category: Category | undefined;
    name: string;
    comment: string;
}
