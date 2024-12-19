import { PaginatorModel } from "../base/table/paginator-model";

export interface LavadoFilter extends PaginatorModel {
    codigo: string | null;
}