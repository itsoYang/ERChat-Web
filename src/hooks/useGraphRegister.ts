import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import ERNode from "../components/ERNode.vue";
import {shapeName} from "../constants/constant.ts"
import {Attr} from "@antv/x6/es/registry";

/**
 * 注册连接桩布局规则
 */
const useRegisterPortLayout = () => {
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
const useRegisterERNode = () => {
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
                            opacity: 0, // 默认隐藏
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
                            opacity: 0, // 默认隐藏
                        },
                    },
                },
            },
        }
    })
}


/**
 * 注册image-er箭头（暂时不用，箭头效果不好）
 */
// @ts-ignore
const useRegisterArrow = () => {

    /**
     * 参数定义
     */
    interface ImageMarkerArgs extends Attr.SimpleAttrs {
        imageUrl?: string
        imageWidth?: number
        imageHeight?: number
    }

    Graph.registerMarker('image', (args: ImageMarkerArgs) => {
        const { imageUrl, imageWidth, imageHeight, ...attrs } = args
        return {
            ...attrs, // 原样返回非特殊涵义的参数
            tagName: 'image', // 使用 <image> 标签渲染箭头，其余键值对都将作为该元素的属性。
            width: imageWidth,
            height: imageHeight,
            'xlink:href': imageUrl,
        }
    }, true)
}

/**
 * 注册边工具
 */
const registerEdgeTool = () => {

    Graph.registerEdgeTool('edge-tool-button', {
        inherit: 'button',
        markup: [
            {
                tagName: 'rect',
                selector: 'button',
                attrs: {
                    width: 120,  // 根据需要调整宽度以适应所有文本
                    height: 40,
                    fill: '#31d0c6',
                    'fill-opacity': 0.3,
                    stroke: '#fe854f',
                    'stroke-width': 2,
                    'stroke-linejoin': 'round',
                    rx: 10,  // 圆角半径
                    ry: 10,  // 圆角半径
                    cursor: 'move',
                },
            },
            {
                tagName: 'text',
                textContent: '1:1',
                selector: 'label1',
                attrs: {
                    x: 20,  // 将文本放在框中的正确位置
                    y: 20,
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle',
                    'font-size': 14,
                    fill: '#333',
                    cursor: 'pointer'
                }
            },
            {
                tagName: 'text',
                textContent: '1:N',
                selector: 'label2',
                attrs: {
                    x: 60,  // 中间文本
                    y: 20,
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle',
                    'font-size': 14,
                    fill: '#333',
                    cursor: 'pointer'
                }
            },
            {
                tagName: 'text',
                textContent: 'N:1',
                selector: 'label3',
                attrs: {
                    x: 100,  // 右侧文本
                    y: 20,
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle',
                    'font-size': 14,
                    fill: '#333',
                    cursor: 'pointer'
                }
            }
        ],
        // 其他配置，可能包括工具行为、事件等
    }, true);
}

export const useGraphRegister = () => {
    // 注册连接桩布局
    useRegisterPortLayout()
    // 注册ERNode
    useRegisterERNode()
    // 注册边工具
    registerEdgeTool()
}