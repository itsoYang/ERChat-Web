import Project from "./type.ts";
import axios from "../../utils/axios.ts";
import {v4 as uuIdv4} from 'uuid';


// 创建项目
const createProject = async (projectName: string, projectDesc: string) => {
    const project: Project = {
        id: uuIdv4(),
        projectName,
        projectDesc
    }
    try {
        return await axios.post('/project/save', project)
    } catch (e) {
        console.log('请求错误信息：',JSON.stringify(e))
    }
}

// 获取项目列表
const getProjectList = async () => {
    try {
        return await axios.get('/project/list')
    } catch (e) {
        // TODO 模拟数据 待删除
        let data = []
        for (let i = 0; i < 5; i++) {
            data.push({
                id: uuIdv4(),
                projectDesc: '测试项目00' + (i + 1),
                projectName: '测试项目00' + (i + 1)
            })
        }
        let success = true
        return {success, data}
    }
}

// 删除项目
const deleteProject = async (id: string) => {
    await axios.delete('/project/delete', { params: { id } })
}

// 更新项目
const updateProject = async (project: Project) => {
    await axios.put('/project/update', project)
}

export {
    createProject,
    getProjectList,
    deleteProject,
    updateProject
}

