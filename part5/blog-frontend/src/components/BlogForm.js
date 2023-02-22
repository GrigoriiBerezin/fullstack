import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, notifier }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        const body = event.target

        const blog = {
            title: body.title.value ? body.title.value : null,
            author: body.author.value ? body.author.value : null,
            url: body.url.value ? body.url.value : null
        }

        try {
            const createdBlog = await blogService.create(blog)
            notifier({ type: 'success', text: `A new blog '${createdBlog.title}' by ${createdBlog.author} added` })
            setBlogs(blogs.concat(createdBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            notifier({ type: 'error', text: exception.response.data.error })
        }
    }

    return <form onSubmit={onSubmit}>
        <h2>Create new</h2>
        <div>
            title
            <input
                type='text'
                value={title}
                name='title'
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author
            <input
                type='text'
                value={author}
                name='author'
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url
            <input
                type='text'
                value={url}
                name='url'
                onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type='submit'>create</button>
    </form>
}

BlogForm.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    setBlogs: PropTypes.func.isRequired,
    notifier: PropTypes.func.isRequired
}

export default BlogForm
