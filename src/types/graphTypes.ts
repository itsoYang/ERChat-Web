export interface INodeData {
    id: string
    tableName: string
    tableComment: string
    fields: IField[]
}

export interface IField {
    name: string
    type: string
    comment: string
}

export interface IGraphNode {
    shape: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    data: INodeData;
}

export interface IPoint {
    x: number;
    y: number;
}