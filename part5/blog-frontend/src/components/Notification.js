import '../css/message.css'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
    if (!message) {
        return null
    }
    return <div className={message.type}>{message.text}</div>
}

Notification.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string,
        type: PropTypes.oneOf(['error', 'success'])
    })
}

export default Notification
