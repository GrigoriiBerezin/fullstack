import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const request = { content, votes: 0 }
    const response = await axios.post(baseUrl, request)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const voteFor = async (id) => {
    const toVoteFor = await getById(id)
    const updated = await axios.put(`${baseUrl}/${id}`, {...toVoteFor, votes: toVoteFor.votes + 1 })
    return updated.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createAnecdote, voteFor }
