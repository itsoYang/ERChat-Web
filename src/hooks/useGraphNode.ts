import {Graph} from "@antv/x6";
import { nodeBounds, shapeName } from "../constants/constant.ts"
import {IField, IGraphNode, INodeData, IPoint} from "../types/graphTypes.ts"
import {useGraphStore} from "../stores/graph.ts";

/**
 * 计算节点高度
 * 规则：{节点表头高度} + {字段行高} * 字段数量 + 5
 * @param fields 字段列表
 */
export const useCalcNodeHeight = (fields: IField[]) => {
    let {headLineHeight, fieldLineHeight} = nodeBounds
    return headLineHeight + fieldLineHeight * fields.length + 5
}

/**
 * 添加节点
 * @param point {x, y}
 * @param height 节点高度
 * @param nodeData INodeData 节点数据
 */
export const useAddNode = (point: IPoint, height: number, nodeData: INodeData) => {
    const graphNode: IGraphNode = {
        shape: shapeName,
        ...point,
        height,
        width: 200,
        data: nodeData
    }
    const graphStore = useGraphStore()
    const graph: Graph = graphStore.graph as Graph
    console.log('useAddNode graphNode', {...graphNode})
    graph.addNode({...graphNode})
}