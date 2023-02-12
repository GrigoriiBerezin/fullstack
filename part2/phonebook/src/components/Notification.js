const Notification = ({messageInfo}) => {
  if (messageInfo.msg === null) {
      return null
  }

  return (
      <div className={messageInfo.type}>
          {messageInfo.msg}
      </div>
  )
}

export default Notification
