import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onDelete, onLike, canDelete }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const onClick = () => {
        setVisible(!visible)
    }

    return (
        <div className='blog' style={blogStyle}>
            {blog.title} by {blog.author}
            <button onClick={onClick}>{visible ? 'hide' : 'view'}</button>
            {visible &&
                <div className='full-info'>
                    <a href={blog.url}>link</a>
                    <p>
                        likes: {blog.likes}
                        <button onClick={() => onLike(blog)}>like</button>
                    </p>
                    <p>{blog.user.name}</p>
                    {canDelete && <button onClick={onDelete}>delete</button>}
                </div>
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string,
        author: PropTypes.string,
        url: PropTypes.string,
        likes: PropTypes.number
    }),
    canDelete: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired
}

export default Blog
