import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const headers = {
    'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const getAll = async () => {
    const blogs = await axios.get(baseUrl)
    return blogs.data
}

const create = async (blog) => {
    const createdBlog = await axios.post(baseUrl, blog, { headers })
    return createdBlog.data
}

const update = async (id, blog) => {
    const updatedBlog = await axios.put(`${baseUrl}/${id}`, blog, { headers })
    return updatedBlog.data
}

const _delete = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, update, _delete }
