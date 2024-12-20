import {v4 as uuIdv4} from 'uuid';
import axios from "../../utils/axios.ts";
export interface DiagramCreate {
    id: string,
    projectId: string,
    name: string,
    visibility: string
}

export const diagramCreate = async (name: string, visibility: string, projectId: string) => {
    const diagram: DiagramCreate = {
        id: uuIdv4(),
        projectId,
        name,
        visibility
    }
    return await axios.post('/diagram/card', diagram)
}

export const queryDiagramsByProjectId = async (projectId: string | null) => {
    if (!projectId){
        return null
    }
    return await axios.get(`/diagram/card/${projectId}`)
}