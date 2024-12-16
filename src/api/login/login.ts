import axios from "../../utils/axios.ts";

export const login = async (username: string, password: string) => {
    return await axios.post('/login/password', {username, password})
}