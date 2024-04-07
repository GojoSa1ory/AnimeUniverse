import { useEffect } from "react"
import './Notification.scss'

type INotification = {
    isNegative: boolean
    negativeMesage: string
    positiveMessage: string
    setShowToast: (state: boolean) => void,
}

function Notification(props: INotification) {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.setShowToast(false);
        }, 3000)

        return () => {clearTimeout(timer); props.setShowToast(false)}; 
    }, []);

    return (
        <div
         className={`
            notification
            ${props.isNegative ? 'negative-notification' : 'positive-notification' }
         `}>
            <h1>{props.isNegative ? props.negativeMesage : props.positiveMessage}</h1>
        </div>
    )
}

export default Notification