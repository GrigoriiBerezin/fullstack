import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = 'Bearer ' + newToken
}

const getAll = async () => {
    const blogs = await axios.get(baseUrl)
    return blogs.data
}

const create = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const createdBlog = await axios.post(baseUrl, blog, config)
    return createdBlog.data
}

const update = async (id, blog) => {
    const config = {
        headers: { Authorization: token }
    }

    const updatedBlog = await axios.put(`${baseUrl}/${id}`, blog, config)
    return updatedBlog.data
}

const _delete = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, _delete, setToken }
