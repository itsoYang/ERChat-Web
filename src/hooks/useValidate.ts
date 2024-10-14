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
        fieldIndex: ''
    }
    const {tableName, fields} = nodeData
    if (!tableName){
        return '表名不能为空'
    }
    fields.forEach(field => {
        const {name, type, comment} = field
        if (!name){
            return '字段名不能为空'
        } else if (!type){
            return '字段类型不能为空'
        } else if (!comment){
            return '字段注释不能为空'
        }
    })
    return validateResult
}