import {useGraphStore} from "../../stores/graph.ts";
import {Graph, Cell} from "@antv/x6";
import axios from "../../utils/axios.ts";

interface ERDiagram {
    id: string
    diagramName: string
    elements: Cell.Properties[]
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
    console.log('保存前', graph.toJSON())
    const cells = graph.toJSON().cells

    console.log('保存前',cells, 'ss', JSON.stringify(cells));

    // const diagramId = uuIdv4()
    const diagram: ERDiagram = {
        id: diagramId,
        diagramName: 'test_'+diagramId,
        elements: cells
    }

    return await axios.post('/diagram', diagram)
}

export const getDiagramInfoById = async (diagramId: string) => {
    return await axios.get('/diagram/'+diagramId)
}