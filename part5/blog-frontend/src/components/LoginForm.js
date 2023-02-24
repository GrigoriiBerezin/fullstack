import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()

        await login(username, password)
        setUsername('')
        setPassword('')
    }

    return <form onSubmit={onSubmit}>
        <div>
            <input
                id='username'
                type='text'
                value={username}
                name='username'
                onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
            <input
                id='password'
                type='password'
                value={password}
                name='password'
                onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
    </form>
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

export default LoginForm
