import axios from "../../utils/axios.ts";

/**
 * 主页左侧列表项（包含菜单列表、项目列表）
 */
export interface IHomeMainLeftItem {
    type: 'menu' | 'project',
    label: string,
    key: string, // 唯一标识
    icon?: string
}

/**
 * 菜单列表
 */
export const menus: IHomeMainLeftItem[] = [
    {
        type: 'menu',
        label: '我的收藏',
        key: 'my_favorites',
        icon: '&#xe640;'
    },
    {
        type: 'menu',
        label: '创建项目',
        key: 'create_project',
        icon: '&#xe6e9;'
    }
]

/**
 * 我的收藏列表
 */
export const loadMyFavorites = async () => {
    // TODO 模拟用户ID数据 待删除
    const userId = 'sssss'
    try {
        return await axios.get(`/diagrams/favorites/${userId}`)
    } catch (e) {
        console.log(e)
    }
}

