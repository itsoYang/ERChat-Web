import {Graph, Point, Size} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import ERNode from "../components/ERNode.vue";
import {shapeName} from "../constants/constant.ts"
import {INodeData} from "../types/graphTypes.ts";

/**
 * 注册连接桩布局规则
 */
export const useRegisterPortLayout = () => {
    Graph.registerPortLayout(
        'leftPortPosition',
        (portsPositionArgs) => {
            return portsPositionArgs.map((_, index) => {
                return {
                    position: {
                        x: 0,
                        y: 32 + index * 24 + 12,
                    },
                    angle: 0,
                }
            })
        },
        true,
    )

    Graph.registerPortLayout(
        'rightPortPosition',
        (portsPositionArgs) => {
            return portsPositionArgs.map((_, index) => {
                return {
                    position: {
                        x: _.nodeW,
                        y: 32 + index * 24 + 12,
                    },
                    angle: 0,
                }
            })
        },
        true,
    )
}

/**
 * 注册ERNode
 */
export const useRegisterERNode = () => {
    register({
        shape: shapeName,
        component: ERNode,
        ports: {
            groups: {
                left: {
                    position: 'leftPortPosition',
                    attrs: {
                        circle: {
                            r: 5,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
                right: {
                    position: 'rightPortPosition',
                    attrs: {
                        circle: {
                            r: 5,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
            },
        }
    })
}

export const useRegisterAnchor = () => {
    Graph.registerAnchor(
        'er-anchor',
        (nodeView, magnet, ref, args, type) => {
            console.log('er-anchor', 'nodeView: ', nodeView, 'magnet: ', magnet, 'ref: ', ref, 'args: ', args, 'type: ', type)
            let data = nodeView.cell.getData();
            let size = nodeView.cell.size();
            let position = nodeView.cell.getPosition();
            let {x, y} = calcAnchorPosition(data, ref as Point.PointLike, size, position)
            // if (type === 'source'){ // 起始节点锚点
            //     return nodeView.getBBox().center;
            // }
            console.log('计算后的锚点', x, y)
            let point = new Point();
            point.x = x
            point.y = y
            return point
        }
    )
    // 根据节点数据及参考点信息 计算锚点位置
    const calcAnchorPosition = (data: INodeData, ref: Point.PointLike, nodeSize: Size, nodePoi: Point.PointLike) => {
        let {width} = nodeSize
        let {x} = nodePoi
        let {fields} = data
        let anchorX = ref.x
        let anchorY = ref.y
        if (ref.x > (x + width) / 2){ // 右侧锚点
            anchorX = x + width
        }else {
            anchorX = x
        }
        let anchorYs: number[] = []
        // @ts-ignore
        fields.forEach((field: any, index: number) => {
            anchorYs.push(32 + index * 24 + 12)
        })
        anchorY = anchorYs.reduce((prev, curr) => {
            return (Math.abs(curr - anchorY) < Math.abs(prev - anchorY) ? curr : prev);
        })

        return {x: anchorX, y: anchorY}
    }
}