import { useOutletContext } from "react-router-dom"
import Preview from "../Preview/Preview"
import styles from './Home.module.css'

const Home = () => {

    const { postsData }  = useOutletContext()

    return (
        <div id={styles.home}>
            <h1 className={styles.title}>Home</h1>
            <div id={styles.previewDisplay}>
                {postsData.map((post, index) => {
                    return <Preview key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        timestamp={post.postedAt}
                        commentCount={post.comments.length}
                        animationOrder={index + 1} />
                })}
            </div>
        </div>
    )

}

export default Home