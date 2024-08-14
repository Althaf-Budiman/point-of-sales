import axiosInstance from '../utils/axiosInstance'

export async function getMenus() {
    const { data } = await axiosInstance.get('/menus')
    return data.menus
}

export async function addMenu(name, price, image) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('image', image)

    await axiosInstance.post('/menus/create', formData)
}

export async function editMenu(menu, name, price, image) {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    if (image) {
        formData.append('image', image)
    }
    formData.append("_method", "PATCH")

    await axiosInstance.post(`/menus/edit/${menu}`, formData)
}

export async function deleteMenu(menu) {
    await axiosInstance.delete(`/menus/delete/${menu}`)
}