import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const blogs = await axios.get(baseUrl)
    return blogs.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
