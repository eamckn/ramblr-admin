import { Link, useParams, useOutletContext, useNavigate } from "react-router-dom"
import styles from './Post.module.css'

const Post = () => {

    const { postId } = useParams();
    const { postsData } = useOutletContext()
    const navigate = useNavigate()

    const postData = postsData.find(post => 
            post.id === Number(postId)
    )

    const handlePublishClick = async () => {
        const token = localStorage.getItem('ramblrAdminJWT');
        const authHeader = 'Bearer ' + token;
        const paramString = postData.isPublished ? new URLSearchParams({
            unpublish: 't'
        }).toString() : new URLSearchParams({
            publish: 't'
        }).toString();
        await fetch(`http://localhost:8080/posts/${postData.id}?` + paramString, {
            method: 'PUT',
            headers: {
                'Authorization': `${authHeader}`
            },
        })
        navigate('/')
    }
        
    return (
        <div className={styles.postComments}>
            <div className={styles.post}>
                <h1 className={styles.title}>{postData.title}</h1>
                <p className={styles.content}>{postData.content}</p>
                <div className={styles.options}>
                    <Link to='./edit'>
                        <button className={styles.edit}>Edit</button>
                    </Link>
                    <button className={styles.published}
                        onClick={handlePublishClick}>
                        {postData.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post