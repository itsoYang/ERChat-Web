import Project from "./type.ts";
import axios from "../../utils/axios.ts";
import {v4 as uuIdv4} from 'uuid';

export interface IProjectInfo {
    id?: string,
    projectName?: string
    projectDesc?: string | null
}


// 创建项目
export const createProject = async (projectName: string, projectDesc: string) => {
    const project: Project = {
        id: uuIdv4(),
        projectName,
        projectDesc
    }
    try {
        return await axios.post('/project', project)
    } catch (e) {
        console.log('请求错误信息：',JSON.stringify(e))
    }
}

// 获取项目列表
export const getProjectList = async () => {
    try {
        return await axios.get('/project')
    } catch (e) {
        console.log('请求错误信息：',JSON.stringify(e))
    }
}

// 删除项目
export const deleteProject = async (id: string) => {
    return await axios.delete(`/project/${id}`)
}

// 更新项目
export const updateProject = async (project: IProjectInfo) => {
    await axios.put('/project', project)
}

