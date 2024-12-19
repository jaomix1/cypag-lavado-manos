export interface IConfigTable {
    titleName: string;
    buttomName: string;
    query2: boolean;
    query: boolean;
    disabled: boolean;
    paginator: IConfigPaginatorTable;
    placeHolder: string;
    clean: string;
}

export interface IConfigPaginatorTable {
    textHelp: string;
    rowXpage: number;
    optionsPages: number[];
    showCurrentPageReport: boolean;
}