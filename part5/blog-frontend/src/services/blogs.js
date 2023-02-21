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
        headers: { Authorization: token}
    }

    const createdBlog = await axios.post(baseUrl, blog, config)
    return createdBlog.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }
