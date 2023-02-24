import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import storageService from './services/storage'
import loginService from './services/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState('')
    const [message, setMessage] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        const user = storageService.loadUser()
        setUser(user)
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    const notifyWith = (message, type = 'success') => {
        setMessage({ text: message, type })
        setTimeout(() => setMessage(null), 5000)
    }

    const login = async (username, password) => {
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            storageService.saveUser(user)
            notifyWith('Success login')
        } catch (e) {
            notifyWith('Invalid username or password', 'error')
        }
    }

    const logout = () => {
        setUser(null)
        storageService.removeUser()
        notifyWith('Logout')
    }

    const createBlog = async (newBlog) => {
        try {
            const createdBlog = await blogService.create(newBlog)
            notifyWith(`A new blog ${newBlog.title} by ${newBlog.author} added`)
            setBlogs(blogs.concat(createdBlog))
            blogFormRef.current.toggleVisibility()
        } catch (e) {
            notifyWith(e.response.data.error, 'error')
        }
    }

    const like = async (blog) => {
        const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
        const updatedBlog = await blogService.update(blog.id, blogToUpdate)
        notifyWith(`A like for the blog ${blog.title} by ${blog.author}`)
        setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
    }

    const remove = async (blog) => {
        const ok = window.confirm(`Sure you want to remove ${blog.title} by ${blog.author}`)
        if (ok) {
            await blogService._delete(blog.id)
            notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }

    }

    if (!user) {
        return (
            <div>
                <Notification message={message}/>
                <h2>Log in to application</h2>
                <LoginForm login={login}/>
            </div>
        )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div>
            <Notification message={message}/>
            <div>
                {user.name} logged in
                <button onClick={logout}>logout</button>
            </div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog}/>
            </Togglable>
            <div>
                {blogs.sort(byLikes).map(b =>
                    <Blog
                        key={b.id}
                        blog={b}
                        onLike={() => like(b)}
                        canDelete={user && b.user.username === user.username}
                        onDelete={() => remove(b)}
                    />)}
            </div>
        </div>
    )
}

export default App
