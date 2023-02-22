import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogList = ({ notifier, username }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            const blogs = await blogService.getAll()
            blogs.sort((b1, b2) => b2.likes - b1.likes)
            setBlogs(blogs)
        }
        fetchDate()
    }, [])

    const handleDelete = async (blog) => {
        const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

        if (confirm) try {
            await blogService._delete(blog.id)
            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
        } catch (exception) {
            notifier({ type: 'error', text: exception.response.data.error })
        }
    }

    const handleLike = async (blog) => {
        const request = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }

        try {
            const updatedBlog = await blogService.update(blog.id, request)
            const updatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
            setBlogs(updatedBlogs)
        } catch (exception) {
            notifier({ type: 'error', text: exception.response.data.error })
        }
    }

    return <>
        <h2>blogs</h2>
        <Togglable buttonLabel='new blog'>
            <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                notifier={notifier}
            />
        </Togglable>
        {blogs.map(blog => <Blog
            key={blog.id}
            blog={blog}
            username={username}
            onLike={handleLike}
            onDelete={handleDelete}
        />)}
    </>
}

BlogList.propTypes = {
    notifier: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
}

export default BlogList
