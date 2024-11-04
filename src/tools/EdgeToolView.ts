import { ToolsView, EdgeView } from '@antv/x6'
import EdgeTool from "../components/EdgeTool.vue";
import { createApp } from 'vue'

export class TooltipTool extends ToolsView.ToolItem<EdgeView, TooltipToolOptions> {

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
            visible: true,
            edge: this.cellView.cell,
        }).mount(container)

        return container
    }

    public update() {
        this.updatePosition()
        return this
    }

    private updatePosition() {
        const view = this.cellView
        const { x, y, width, height } = view.getBBox();
        const { offsetX = 0, offsetY = 0 } = this.options;

        // 计算工具的位置
        const toolX = x + width / 2 + offsetX;
        const toolY = y + height / 2 + offsetY;

        // 设置工具的位置
        if (this.edgeToolContainer){
            this.edgeToolContainer.style.left = `${toolX}px`;
            this.edgeToolContainer.style.top = `${toolY}px`;
        }
    }
}

TooltipTool.config({
    tagName: 'div',
    isSVGElement: false,
})

export interface TooltipToolOptions extends ToolsView.ToolItem.Options {
    offsetX?: number,
    offsetY?: number
}
