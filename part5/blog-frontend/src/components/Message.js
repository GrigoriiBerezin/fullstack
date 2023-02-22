import '../css/message.css'
import PropTypes from 'prop-types'

const Message = ({ message }) => {
    if (!message) {
        return null
    }
    return <div className={message.type}>{message.text}</div>
}

Message.propTypes = {
    message: PropTypes.string
}

export default Message
