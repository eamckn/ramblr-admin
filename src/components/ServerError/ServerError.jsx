import { useState } from 'react'
import styles from './ServerError.module.css'

const ServerError = ({ error }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    console.error(error)

    const handleExpand = (e) => {
        e.preventDefault()
        setIsExpanded(!isExpanded)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.frown}>{':('}</h1>
            <h2 className={styles.pageMessage}>We're sorry, but we've encountered a server error.</h2>
            <section className={styles.refresh}>Please refresh your browser to try again.</section>
            {isExpanded ? (
                <>
                    <p>Click <span className={styles.showHide} onClick={handleExpand}>here</span> to hide details</p>
                    <p className={styles.serverErrorDetails}>{error.name}: {error.message}</p>
                </>
            ) : (
                    <p>Click <span className={styles.showHide} onClick={handleExpand}>here</span> to view details</p>
            )}
        </div>
    )

}

export default ServerError