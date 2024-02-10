export interface Search {
    value: string;
    filtercolumn: string;
    sortcolumn: string;
    pageSize: number;
    page: number;
    order: 'asc' | 'desc';
}