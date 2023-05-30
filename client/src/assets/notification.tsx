import { useState, useEffect } from 'react'

const Notification = (props) => {
    const [showNotification, setShowNotification] = useState(props.showNotification);
    
    useEffect(() => {
        setTimeout(() => {
        setShowNotification(false);
        }, 3000);
    }, [props.showNotification]);

  return (
    <div className={`min-w-[10rem] rounded-md px-4 text-[13px] h-10 p-2 fixed z-20 bg-green-300 notification ${showNotification ? 'active' : 'hide'}`}>
        {props.notification}
    </div>
  )
}

export default Notification