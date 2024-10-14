import {INodeData} from "../types/graphTypes.ts";

/**
 * 节点编辑字段必填校验
 * @param nodeData
 */
export const useEditNodeFieldValidate = (nodeData: INodeData) => {
    const validateResult = {
        validFlag: false, // 是否校验通过
        msg: '',
        fieldType: '',
        fieldIndex: -1
    }
    const {tableName, fields} = nodeData

    if (!tableName){
        return {
            ...validateResult,
            msg: '表名不能为空',
            fieldType: 'tableName'
        }
    }

    const createErrorResult = (index: number, fieldType: string, msg: string) => ({
        ...validateResult,
        fieldIndex: index,
        fieldType,
        msg
    });

    for (let index = 0; index < fields.length; index++) {
        const { name, type } = fields[index];
        if (!name) {
            return createErrorResult(index, 'field', '字段名不能为空');
        } else if (!type) {
            return createErrorResult(index, 'field', '字段类型不能为空');
        }
    }

    // 校验通过
    return { ...validateResult, validFlag: true };
}