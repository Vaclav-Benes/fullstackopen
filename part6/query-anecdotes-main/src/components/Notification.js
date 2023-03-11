import { useNotificationValue } from "../NotificationContext"

const Notification = () => {

  const notification = useNotificationValue()

  const show = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const hide= {
    display: 'none'
  }

  return (
    <div style={notification ? show : hide}>
      {notification}
    </div>
  )
}

export default Notification
