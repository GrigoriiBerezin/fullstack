import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = forwardRef((props, refs) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blog = {
        title: title ? title : null,
        author: author ? author : null,
        url: url ? url : null
    }

    useImperativeHandle(refs, () => {
        return {
            setTitle,
            setAuthor,
            setUrl
        }
    })

    return <form onSubmit={(e) => props.onSubmit(e, blog)}>
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
})

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default BlogForm
