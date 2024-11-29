import {useGraphStore} from "../../stores/graph.ts";
import {Graph} from "@antv/x6";
import axios from "../../utils/axios.ts";

interface ERDiagram {
    id: string
    diagramName: string
    elements: Element[]
}

interface Element {
    id: string | undefined
    shape: string | undefined
    position: IPosition
    size: ISize
    data: INodeData,
    zIndex: number | undefined
}

interface IPosition {
    x: number
    y: number
}

interface ISize {
    width: number
    height: number
}

interface INodeData {
    tableName: string
    tableComment: string
    fields: IField[]
}

interface IField {
    name: string
    type: string
    comment: string
}

export const save = async (diagramId: string | null) => {

    if (!diagramId){
        throw new Error('diagramId id is not found')
    }

    const graphStore = useGraphStore();
    const graph: Graph | null = graphStore.graph as Graph | null
    if (!graph){
        throw new Error('Graph is not initialized')
    }
    // TODO 校验是否已登录

    // 处理保存的数据
    const cells = graph.toJSON().cells;

    console.log('保存前',cells, 'ss', JSON.stringify(cells));

    // const diagramId = uuIdv4()
    const diagram: ERDiagram = {
        id: diagramId,
        diagramName: 'test_'+diagramId,
        elements: []
    }

    const elements: Element[] = [];
    cells.forEach(cell => {
        const {id,shape, position, size, data, zIndex} = cell
        elements.push({
            id,
            shape,
            position,
            size,
            data,
            zIndex
        })
    })
    diagram.elements = elements

    await axios.post('/designer/save', diagram)
}