import { Link } from "react-router-dom"
import { formatDate } from "../../utils/formatTimestamp"
import styles from './Preview.module.css'

const Preview = ({ id, title, content, timestamp, commentCount, animationOrder }) => {

    const slicedContent = content.slice(0, 100)

    const contentPreview = slicedContent.slice(-1) === ' ' ? (
        slicedContent.slice(0, -1) + '...'
    ) : (
            slicedContent + '...'
        )
    
    return (
        <div className={styles.preview} style={{ '--animation-order': `${animationOrder}`}}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content} dangerouslySetInnerHTML={{__html: contentPreview}} />
            <div className={styles.dateComments}>
                Posted on {formatDate(timestamp)} • {commentCount} comments
            </div>
            <Link to={'/posts/' + id} className={styles.readMore}>
                Read more
            </Link>
        </div>
    )

}

export default Preview