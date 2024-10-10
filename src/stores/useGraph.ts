import {defineStore} from "pinia";
import {Graph} from "@antv/x6";

export const useGraph = defineStore('graph', {
    state: () => ({
        graph: null as Graph | null
    }),
    actions: {
        setGraph(graph: Graph) {
            this.graph = graph
        }
    }
})