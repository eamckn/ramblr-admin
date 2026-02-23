import { useOutletContext } from 'react-router-dom'
import { formatDate, formatTime } from '../../utils/formatTimestamp'
import styles from './Comment.module.css'

const Comment = ({ id, postId, content, timestamp, user, deletingId, setDeletingId, animationOrder }) => {

    const isDeleting = deletingId === id;

    const { getData } = useOutletContext()

    const handleDelete = (e) => {
        e.preventDefault()
        setDeletingId(isDeleting ? null : id)
    }

    const handleBlur = (e) => {
        e.preventDefault()
        setDeletingId(null)
    }

    const handleConfirm = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('ramblrAdminJWT');
            const response = await fetch(`http://localhost:3000/posts/${postId}/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            })
            if (response.ok) {
                await getData()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.comment} style={{ '--animation-order': `${animationOrder}`}}>
            <div className={styles.info}>
                <h3 className={styles.username} tabIndex={-1} onBlur={handleBlur}>{user.username}
                    <button className={styles.button} onClick={handleDelete}>Delete
                        {isDeleting && <span className={styles.confirmDelete}>
                        <p>Delete comment?</p>
                        <button className={styles.button} onMouseDown={handleConfirm}>Yes</button>
                        </span>}
                    </button>   
                </h3>
                <p><i>{formatDate(timestamp)} at {formatTime(timestamp)}</i></p>
            </div>
            <p className={styles.content}>{content}</p>
        </div>
    )

}

export default Comment