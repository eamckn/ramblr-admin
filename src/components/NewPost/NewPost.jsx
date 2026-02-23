import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom"
import styles from './NewPost.module.css'

const NewPost = () => {
    const { getData } = useOutletContext()
    const navigate = useNavigate()

    const [postTitle, setPostTitle] = useState('New post title')
    const [postContent, setPostContent] = useState('')
    const [editError, setEditError] = useState(null)

    const handleTitleBlur = (e) => {
        e.preventDefault()
        setPostTitle(e.target.textContent)
    }

    const handleContentBlur = (e) => {
        e.preventDefault()
        setPostContent(e.target.innerHTML)
    }

    const handleSaveDraftClick = async () => {
        try {
            const token = localStorage.getItem('ramblrAdminJWT');
            const authHeader = 'Bearer ' + token;
            const response =  await fetch(`http://localhost:3000/posts/drafts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authHeader}`
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent,
                })
            })
            if (!response.ok) {
                setEditError(new Error('Server error'))
            } else {
                await getData()
                navigate('/')
            }
        } catch (error) {
            setEditError(error)
        }
    }

    const handleSavePublishClick = async () => {
        try {
            const token = localStorage.getItem('ramblrAdminJWT');
            const authHeader = 'Bearer ' + token;
            const response =  await fetch(`http://localhost:3000/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authHeader}`
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent,
                })
            })
            if (!response.ok) {
                setEditError(new Error('Server error'))
            } else {
                await getData()
                navigate('/')
            }
        } catch (error) {
            setEditError(error)
        }
    }

    return (
            <>
                <div className={styles.postComments}>
                    <div className={styles.post}>
                        <h1 className={styles.title}
                            onBlur={handleTitleBlur}
                            contentEditable='plaintext-only'
                        suppressContentEditableWarning={true} >
                        {postTitle}
                        </h1>
                        <article className={styles.content}
                            onBlur={handleContentBlur}
                            contentEditable
                            suppressContentEditableWarning={true}
                            dangerouslySetInnerHTML={{__html: postContent}}/>
                        <div className={styles.options}>
                            <button className={styles.save} onClick={handleSaveDraftClick}>Save as draft</button>
                            <button className={styles.publish} onClick={handleSavePublishClick}>
                                Save and publish
                            </button>
                        </div>
                    </div>
                </div>
                {editError && <div className={styles.error}>There was an error trying to make your edits. Please try again.</div>}
            </>
        )

}

export default NewPost