import { Pagination } from "./Pagination";

export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string|null;
    data: T | undefined ;
    errors: any;
    pagination: Pagination|null;
}