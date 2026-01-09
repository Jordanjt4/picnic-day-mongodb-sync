type ColumnRule = 
    | {
        type: "id";
        path: string
    }
    | {
        type: "field";
        path: string
    }
    | {
        type: "tags";
    }

export type ColumnMapType = Record<string, ColumnRule>;