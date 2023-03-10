import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20,
    color: 'blue'
  }

  const hide = {
    display: 'none'
  }

  return (
    <div style={notification ? style : hide} id="notif">
      {notification}
    </div>
  )
}

export default Notification