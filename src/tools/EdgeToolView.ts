import { ToolsView, EdgeView } from '@antv/x6'
import {Dom, NumberExt} from "@antv/x6-common";
import {Point} from "@antv/x6-geometry";

export class TooltipTool extends ToolsView.ToolItem<EdgeView, TooltipToolOptions> {
    protected onRender() {
        this.createToolElement()
        this.update()
    }

    private createToolElement() {
        const container = this.container;
        container.innerHTML = `
            <div style="position: relative;width: 50px; height: 40px;">
                <button id="button1">Button 1</button>
                <button id="button2">Button 2</button>
            </div>
        `;
    }
    update() {
        this.updatePosition()
        return this
    }

    protected updatePosition() {
        const matrix = this.getEdgeMatrix()
        Dom.transform(this.container as SVGElement, matrix, { absolute: true })
    }

    protected getEdgeMatrix() {
        const view = this.cellView as EdgeView
        const options = this.options
        const { offset = 0, distance = 0, rotate } = options

        let tangent
        let position
        let angle

        const d = NumberExt.normalizePercentage(distance, 1)
        if (d >= 0 && d <= 1) {
            tangent = view.getTangentAtRatio(d)
        } else {
            tangent = view.getTangentAtLength(d)
        }

        if (tangent) {
            position = tangent.start
            angle = tangent.vector().vectorAngle(new Point(1, 0)) || 0
        } else {
            position = view.getConnection()!.start!
            angle = 0
        }

        let matrix = Dom.createSVGMatrix()
            .translate(position.x, position.y)
            .rotate(angle)

        if (typeof offset === 'object') {
            matrix = matrix.translate(offset.x || 0, offset.y || 0)
        } else {
            matrix = matrix.translate(0, offset)
        }

        if (!rotate) {
            matrix = matrix.rotate(-angle)
        }

        return matrix
    }


    protected onMouseDown(e: Dom.MouseDownEvent) {
        if (this.guard(e)) {
            return
        }

        e.stopPropagation()
        e.preventDefault()
    }
}

TooltipTool.config({
    tagName: 'div',
    useCellGeometry: true,
    isSVGElement: false,
})

export interface TooltipToolOptions extends ToolsView.ToolItem.Options {
    x?: number | string
    y?: number | string
    distance?: number | string
    offset?: number | Point.PointLike
    rotate?: boolean
    useCellGeometry?: boolean
}
