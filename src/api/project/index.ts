import Project from "./type.ts";
import axios from "../../utils/axios.ts";
import {v4 as uuIdv4} from 'uuid';


// 创建项目
const createProject = async (name: string, desc: string, status: number) => {
    const project: Project = {
        id: uuIdv4(),
        name,
        desc,
        status,
        createUser: 'test',
        createTime: '2023-06-06',
        updateTime: '2023-06-06'
    }
    await axios.post('/project/save', project)
}

// 获取项目列表
const getProjectList = async () => {
    const res = await axios.get('/project/list')
    return res.data
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

