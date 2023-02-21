import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import Message from './components/Message'
import BlogList from './components/Bloglist'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
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

    const onError = (text) => notify({type: 'error', text})

    return (
        <div>
            <Message message={message}/>
            <LoginForm userState={userState} onError={onError}/>
            {user && <BlogList blogs={blogs}/>}
        </div>
    )
}

export default App
