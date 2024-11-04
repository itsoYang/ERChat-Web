import { ToolsView, EdgeView } from '@antv/x6'
import EdgeTool from "../components/EdgeTool.vue";
import { createApp } from 'vue'

export class ToolEdgeLabel extends ToolsView.ToolItem<EdgeView, ToolEdgeLabelOptions> {

    protected edgeToolContainer: HTMLDivElement | null = null
    protected onRender() {
        this.createEdgeTool()
        this.update()
    }

    private createEdgeTool(){

        const container = ToolsView.createElement('div', false) as HTMLDivElement
        container.style.position = 'absolute'

        this.edgeToolContainer = container
        this.container.appendChild(container)

        // h(EdgeTool, {
        //     visible: true,
        //     edge: this.cellView.cell,
        // })
        createApp(EdgeTool, {
            edge: this.cellView.cell,
        }).mount(container)

        return container
    }

    public update() {
        this.updatePosition()
        return this
    }

    private updatePosition() {
        const view = this.cellView;
        // const edge = view.cell;
        const path = view.getConnection() // 获取边的路径

        if (!path) return;

        // const length = path.length(); // 获取路径的总长度
        const {start, end} = path
        if (start && end){
            const { offsetX = 0, offsetY = 0 } = this.options;
            const startX = start.x
            const startY = start.y

            const endX = end.x
            const endY = end.y

            // 计算工具的位置，保持在路径的中间
            const positionX = startX + (endX - startX) / 2;
            const positionY = startY + (endY - startY) / 2;

            // 计算工具的位置
            const toolX = positionX + offsetX;
            const toolY = positionY + offsetY;

            // 设置工具的位置
            if (this.edgeToolContainer) {
                this.edgeToolContainer.style.left = `${toolX}px`;
                this.edgeToolContainer.style.top = `${toolY}px`;
            }
        }
    }
}

ToolEdgeLabel.config({
    tagName: 'div',
    isSVGElement: false,
})

export interface ToolEdgeLabelOptions extends ToolsView.ToolItem.Options {
    offsetX?: number,
    offsetY?: number
}
