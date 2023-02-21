import '../css/message.css'

const Message = ({message}) => {
    if (!message) {
        return null
    }
    return <div className={message.type}>{message.text}</div>
}

export default Message
