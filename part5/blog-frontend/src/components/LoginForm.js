import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ userState, notifier }) => {
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'userToken', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            notifier({ type: 'error', text: exception.response.data.error })
        }
    }


    const [user, setUser] = userState
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onClick = () => {
        window.localStorage.removeItem('username')
        setUser(null)
    }

    if (user) {
        return <div>
            <p>{user.name} logged in <button onClick={onClick}>logout</button></p>
        </div>
    } else {
        return <form onSubmit={handleSubmit}>
            <h2>Log in application</h2>
            <div>
                <input
                    type='text'
                    value={username}
                    name='username'
                    onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div>
                <input
                    type='password'
                    value={password}
                    name='password'
                    onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <button type='submit'>login</button>
        </form>
    }
}

LoginForm.propTypes = {
    userState: PropTypes.array.isRequired,
    notifier: PropTypes.func.isRequired
}

export default LoginForm
