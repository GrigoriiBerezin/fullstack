import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import {useEffect, useState} from 'react'
import blogService from "../services/blogs"

const BlogList = ({notifier}) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchDate()
    }, [])

    return <>
        <h2>blogs</h2>
        <Togglable buttonLabel='new blog'>
            <BlogForm blogs={blogs} setBlogs={setBlogs} notifier={notifier}/>
        </Togglable>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </>
}

export default BlogList
