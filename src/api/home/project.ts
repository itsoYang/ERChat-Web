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

    }
}

// 删除项目
const deleteProject = async (id: string) => {
    return await axios.delete(`/project/${id}`)
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

