// src/er-node.js
import { Node } from '@antv/x6';

export const ERNode = Node.define({
    width: 200,
    height: 120,
    attrs: {
        body: {
            stroke: '#5F95FF',
            fill: '#EFF4FF',
            strokeWidth: 2,
            rx: 5,
            ry: 5,
        },
    },
    ports: {
        groups: {
            top: {
                position: 'top',
                attrs: {
                    circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 2,
                        fill: '#fff',
                    },
                },
            },
            bottom: {
                position: 'bottom',
                attrs: {
                    circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 2,
                        fill: '#fff',
                    },
                },
            },
            left: {
                position: 'left',
                attrs: {
                    circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 2,
                        fill: '#fff',
                    },
                },
            },
            right: {
                position: 'right',
                attrs: {
                    circle: {
                        r: 6,
                        magnet: true,
                        stroke: '#5F95FF',
                        strokeWidth: 2,
                        fill: '#fff',
                    },
                },
            },
        },
    },
    markup: [
        {
            tagName: 'rect',
            selector: 'body',
        },
        {
            tagName: 'text',
            selector: 'tableName',
            attrs: {
                x: 10,
                y: 20,
                'font-size': 14,
                'font-weight': 'bold',
                'text-anchor': 'start',
                fill: '#333',
            },
        },
        {
            tagName: 'foreignObject',
            selector: 'fields',
            attrs: {
                width: 180,
                height: 80,
                x: 10,
                y: 40,
            },
            children: [
                {
                    tagName: 'body',
                    children: [
                        {
                            tagName: 'div',
                            style: {
                                display: 'flex',
                                'flex-direction': 'column',
                                'font-size': '12px',
                                color: '#333',
                            },
                            children: [
                                {
                                    tagName: 'div',
                                    className: 'field',
                                    style: {
                                        display: 'flex',
                                        'justify-content': 'space-between',
                                        'margin-bottom': '2px',
                                    },
                                    children: [
                                        { tagName: 'span', className: 'field-name' },
                                        { tagName: 'span', className: 'field-type' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    propHooks: function (metadata) {
        const { tableName, fields = [], ...others } = metadata;
        const fieldMarkup = fields.map(
            (field: any) => `
        <div class="field">
          <span class="field-name">${field.name}</span>
          <span class="field-type">${field.type}</span>
        </div>
      `
        ).join('');
        return {
            ...others,
            attrs: {
                ...metadata.attrs,
                tableName: {
                    text: tableName,
                },
                fields: {
                    html: fieldMarkup,
                },
            },
        };
    },
});
