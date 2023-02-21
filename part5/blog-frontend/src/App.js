import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import Message from './components/Message'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
    const blogsState = useState([])
    const [, setBlogs] = blogsState
    const [message, setMessage] = useState(null)

    const userState = useState(null)
    const [user, setUser] = userState

    useEffect(() => {
        const fetchDate = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchDate()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('userToken')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [setUser])

    const notify = (message) => {
        setMessage(message)
        setTimeout(() => setMessage(null), 5000)
    }

    return (
        <div>
            <Message message={message}/>
            <LoginForm userState={userState} notifier={notify}/>
            {user && <BlogList blogsState={blogsState} notifier={notify}/>}
        </div>
    )
}

export default App
