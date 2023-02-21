import Blog from "./Blog";

const Bloglist = ({blogs}) => (
    <>
        <h2>blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </>
)

export default Bloglist
