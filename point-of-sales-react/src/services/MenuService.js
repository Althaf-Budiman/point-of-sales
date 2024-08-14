import axiosInstance from '../utils/axiosInstance'

export async function getMenus() {
    const { data } = await axiosInstance.get('/menus')
    return data.menus
}

export async function addMenu(name, price) {
    await axiosInstance.post('/menus/create', { name, price })
}

export async function editMenu(menu, name, price) {
    await axiosInstance.patch(`/menus/edit/${menu}`, { name, price })
}

export async function deleteMenu(menu) {
    await axiosInstance.delete(`/menus/delete/${menu}`)
}