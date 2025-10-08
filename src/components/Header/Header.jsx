import { useContext } from "react"
import { Link } from "react-router-dom"
import styles from './Header.module.css'
import AuthContext from "../../contexts/authContext"

const Header = ({ title }) => {

    const { user, logOut } = useContext(AuthContext)

    return (

        <header className={styles.header}>
            <Link to='/'>
                <div className={styles.title}>{title}</div>
            </Link>
            {user && (
                    <div className={styles.options}>
                        <Link to='/new'><button className={styles.new}>New post</button></Link>
                        <button className={styles.logout} onClick={logOut}>Log out</button>
                    </div>
                )
            }
        </header>

    )

}

export default Header