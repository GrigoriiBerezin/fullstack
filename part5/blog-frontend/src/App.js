import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchDate = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchDate()
    }, [])

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export default App
