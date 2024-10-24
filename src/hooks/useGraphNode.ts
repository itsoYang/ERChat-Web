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
    const graph: Graph | null = graphStore.graph as Graph | null

    if (!graph){
        throw new Error('Graph is not initialized')
    }
    const node = graph.addNode({...graphNode})

    let { fields } = nodeData
    let {x} = node.getPosition();
    let {width} = node.size();

    const addPorts = (group: string, index: number) => {
        if (!node.hasPort(`port-${group}-${index}`)) {
            node.addPort({
                group,
                id: `port-${group}-${index}`,
                args: {nodeX: x, nodeW: width}
            });
        }
    };

    // @ts-ignore
    fields.forEach((field: any, index: number) => {
        addPorts('left', index)
        addPorts('right', index)
    });
}