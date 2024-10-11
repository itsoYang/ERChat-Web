import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import ERNode from "../components/ERNode.vue";

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
        shape: 'er-node',
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