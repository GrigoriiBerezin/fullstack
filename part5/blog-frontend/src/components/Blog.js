import {useState} from 'react'

const Blog = ({blog}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)
    const showOnVisible = {display: visible ? '' : 'none'}

    const onClick = () => {
        setVisible(!visible)
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={onClick}>{visible ? 'hide' : 'view'}</button>
            <div style={showOnVisible}>
                <a href={blog.url}>link</a>
                <p>
                    likes: {blog.likes}
                    <button>like</button>
                </p>
                <p>{blog.user.name}</p>
            </div>
        </div>
    )
}

export default Blog
