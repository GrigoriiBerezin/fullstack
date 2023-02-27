import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = { content, important: false }
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const toggleImportanceOf = async (id) => {
    const toUpdate = await getById(id)
    const updated = await axios.put(`${baseUrl}/${id}`, { ...toUpdate, important: !toUpdate.important })
    return updated.data
}

export default { getAll, createNew, toggleImportanceOf }
