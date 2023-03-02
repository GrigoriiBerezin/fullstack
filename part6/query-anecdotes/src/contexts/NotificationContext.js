import {createContext, useContext, useReducer} from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'set': return action.payload
    case 'reset': return null
    default: return state
  }
}

export const SetNotification = (title, dispatch) => {
  console.log(title)
  console.log(dispatch)
  dispatch({ type: 'set', payload: title })
  setTimeout(() => dispatch({ type: 'reset' }), 5000)
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext)
  return notification[0]
}

export const useNotificationDispatch = () => {
  const notification = useContext(NotificationContext)
  return notification[1]
}

const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
