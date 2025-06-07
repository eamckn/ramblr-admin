import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../../contexts/authContext"
import FormErrors from "../FormErrors/FormErrors"
import styles from './Form.module.css'

const Form = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginErrors, setLoginErrors] = useState([])

    const { logIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleEmailInput = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logInSuccess = await logIn(email, password)
        if (logInSuccess) {
            navigate('/')
        } else {
            setLoginErrors(['Invalid credentials for administrative access. Please try again.'])
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.userForm} onSubmit={handleLogin}>
                <h1 className={styles.formName}>Login</h1>
                <input className={styles.formInput}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailInput}
                    required />
                <input className={styles.formInput}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordInput}
                    required />
                {loginErrors.length > 0 && <FormErrors errors={loginErrors} />}
                <button className={styles.formButton} type="submit">Log in</button>
            </form>
        </div>
    )

}

export default Form