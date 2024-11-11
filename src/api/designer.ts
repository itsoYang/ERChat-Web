import {useGraphStore} from "../stores/graph.ts";
import {Graph} from "@antv/x6";
import axios from "../utils/axios.ts";

const save = async () => {
    const graphStore = useGraphStore();
    const graph: Graph | null = graphStore.graph as Graph | null
    if (!graph){
        throw new Error('Graph is not initialized')
    }
    // TODO 校验是否已登录

    // 处理保存的数据
    const cells = graph.toJSON().cells;

    let result: any[] = [];
    cells.forEach(cell => {
        const {id, position, size, data, zIndex} = cell
        result.push({
            id,
            position,
            size,
            data,
            zIndex
        })
    })

    console.log('保存',JSON.stringify(result));
    await axios.post('/designer/save', result)
}

export {
    save
}