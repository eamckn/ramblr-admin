import { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import styles from './Post.module.css'

const Post = () => {

    const { postId } = useParams();
    const { postsData } = useOutletContext()
    const navigate = useNavigate()

    const postData = postsData.find(post => 
            post.id === Number(postId)
    )

    const [postTitle, setPostTitle] = useState(postData.title)
    const [postContent, setPostContent] = useState(postData.content)

    const handleTitleBlur = (e) => {
        e.preventDefault()
        setPostTitle(e.target.textContent)
    }

    const handleContentBlur = (e) => {
        e.preventDefault()
        setPostContent(e.target.innerHTML)
    }

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

    const handleSaveClick = async () => {
        const token = localStorage.getItem('ramblrAdminJWT');
        const authHeader = 'Bearer ' + token;
        const response = await fetch(`http://localhost:8080/posts/${postData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${authHeader}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitle,
                content: postContent
            })
        })
        const json = await response.json()
        console.log(json)
    }
        
    return (
        <div className={styles.postComments}>
            <div className={styles.post}>
                <h1 className={styles.title}
                    onBlur={handleTitleBlur}
                    contentEditable='plaintext-only'
                    suppressContentEditableWarning={true} >
                    {postData.title}
                </h1>
                <article className={styles.content}
                    onBlur={handleContentBlur}
                    contentEditable
                    dangerouslySetInnerHTML={{__html: postContent}}
                    suppressContentEditableWarning={true} />
                <div className={styles.options}>
                    <button className={styles.save} onClick={handleSaveClick}>Save changes</button>
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