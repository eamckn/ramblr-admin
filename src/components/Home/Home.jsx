import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import Preview from "../Preview/Preview"
import DropDown from "../DropDown/DropDown"
import styles from './Home.module.css'

const Home = () => {

    const { postsData } = useOutletContext()
    
    const [filter, setFilter] = useState('')

    const handleFilterChange = (value) => {
        setFilter(value)
    }

    const filterData = () => {
        if (filter === 'published') {
            return postsData.filter((post) => post.isPublished)
        } else if (filter === 'drafts') {
            return postsData.filter((post) => !post.isPublished)
        } else return postsData
    }

    const filteredData = filterData()

    const filterOptions = [
        { value: '', label: 'All Posts' },
        { value: 'published', label: 'Published Only' },
        { value: 'drafts', label: "Drafts Only"}
    ]

    return (
        <div id={styles.home}>
            <div className={styles.header}>
                <h1 className={styles.title}>Home</h1>
                <DropDown selectedVal={filter}
                    onChange={handleFilterChange}
                    options={filterOptions}
                     />
            </div>
            <div id={styles.previewDisplay}>
                {filteredData.map((post, index) => {
                    return <Preview key={`${filter}-${post.id}`}
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