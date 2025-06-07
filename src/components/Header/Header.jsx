import { Link } from "react-router-dom"
import styles from './Header.module.css'

const Header = ({ title }) => {

    return (

        <header className={styles.header}>
            <Link to='/'>
                <div className={styles.title}>{title}</div>
            </Link>
        </header>

    )

}

export default Header