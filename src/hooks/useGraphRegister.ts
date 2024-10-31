import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import ERNode from "../components/ERNode.vue";
import {shapeName} from "../constants/constant.ts"
import {Attr} from "@antv/x6/es/registry";
import {Button} from "@antv/x6/es/registry/tool/button";

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
    
    const EdgeButton = Button.define<Button.Options>({
        markup: [
            {
                tagName: 'rect',
                selector: 'button',
                attrs: {
                    width: 40,
                    height: 40,
                    fill: '#31d0c6',
                    'fill-opacity': 0.3,
                    stroke: '#fe854f',
                    'stroke-width': 4,
                    cursor: 'move',
                },
            },
            {
                tagName: 'text',
                selector: 'label',
            }
        ]
    })
    
    Graph.registerEdgeTool('edge-tool-button', {
        inherit: 'button',
        ...EdgeButton
    }, true)
}

export const useGraphRegister = () => {
    // 注册连接桩布局
    useRegisterPortLayout()
    // 注册ERNode
    useRegisterERNode()
    // 注册边工具
    registerEdgeTool()
}