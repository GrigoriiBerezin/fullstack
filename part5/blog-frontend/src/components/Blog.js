import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, notifier}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [actualBlog, setActualBlog] = useState(blog)
    const [visible, setVisible] = useState(false)
    const showOnVisible = {display: visible ? '' : 'none'}

    const onClick = () => {
        setVisible(!visible)
    }

    const onLike = async () => {
        const request = {
            user: actualBlog.user.id,
            likes: actualBlog.likes + 1,
            author: actualBlog.author,
            title: actualBlog.title,
            url: actualBlog.url
        }

        try {
            const updatedBlog = await blogService.update(actualBlog.id, request)
            setActualBlog(updatedBlog)
        } catch (exception) {
            notifier({type: 'error', text: exception.response.data.error})
        }
    }

    return (
        <div style={blogStyle}>
            {actualBlog.title} {actualBlog.author}
            <button onClick={onClick}>{visible ? 'hide' : 'view'}</button>
            <div style={showOnVisible}>
                <a href={actualBlog.url}>link</a>
                <p>
                    likes: {actualBlog.likes}
                    <button onClick={onLike}>like</button>
                </p>
                <p>{actualBlog.user.name}</p>
            </div>
        </div>
    )
}

export default Blog
