import {Graph} from "@antv/x6";
import {register} from "@antv/x6-vue-shape";
import ERNode from "../components/ERNode.vue";
import {shapeName} from "../constants/constant.ts"
import {Attr} from "@antv/x6/lib/registry";

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
 * 注册image-er箭头
 */
export const useRegisterArrow = () => {

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