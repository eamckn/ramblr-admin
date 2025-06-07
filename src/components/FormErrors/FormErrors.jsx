import { useEffect, useState } from 'react'
import styles from './FormErrors.module.css'

const FormErrors = ({ errors }) => {

    const [timestamp, setTimestamp] = useState(Date.now())

    /*
    When new errors array is passed in (happens on every call),
    force a state update that will be used as the key for the element.
    This way, our animation will rerun on every continued failed
    login or register attempt, letting our users know that their click
    was processed, but there's still something wrong.
    */
    useEffect(() => {
        setTimestamp(Date.now())
    }, [ errors ])

    return (

        <ul className={styles.formErrors} key={timestamp}>
            {errors.map(error => {
                return <li className={styles.error} key={error}>{error}</li>
            })}
        </ul>

    )

}

export default FormErrors