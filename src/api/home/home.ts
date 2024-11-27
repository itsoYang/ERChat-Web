/**
 * 主页左侧列表项（包含菜单列表、项目列表）
 */
export interface IHomeMainLeftItem {
    type: 'menu' | 'project',
    label: string,
    key: string, // 唯一标识
    icon?: string
}


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