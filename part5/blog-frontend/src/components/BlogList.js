import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({blogsState, notifier}) => {
    const [blogs] = blogsState

    return <>
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        <BlogForm blogsState={blogsState} notifier={notifier}/>
    </>
}

export default BlogList
