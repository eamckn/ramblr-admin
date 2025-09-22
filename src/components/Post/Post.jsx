import { Link, useParams, useOutletContext } from "react-router-dom"
import styles from './Post.module.css'

const Post = () => {

    const { postId } = useParams();
    const { postsData } = useOutletContext()

    const postData = postsData.find(post => 
            post.id === Number(postId)
    )
        
    return (
        <div className={styles.postComments}>
            <div className={styles.post}>
                <h1 className={styles.title}>{postData.title}</h1>
                <p className={styles.content}>{postData.content}</p>
                <div className={styles.options}>
                    <button className={styles.edit}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Post