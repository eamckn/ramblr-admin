import { useState, useEffect} from "react";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem('ramblrAdminJWT')
            if (token) {
                const authHeader = 'Bearer ' + token;
                const response = await fetch('http://localhost:8080/admin', {
                    headers: {
                        'Authorization': `${authHeader}`
                    }
                })
                if (response.ok) {
                    const json = await response.json()
                    setUser(json.user)
                } else {
                    setUser(null)
                    console.error(`Invalid JWT value retreived from key 'token' in localStorage. Please try logging in again to receive a new token.`)
                }
            }
        } catch (error) {
            setAuthError(error)
        } finally {
            setAuthLoading(false)
        }
    }

    const logIn = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8080/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            if (response.ok) {
                const json = await response.json()
                const token = json.token
                localStorage.setItem('ramblrAdminJWT', token)
                verifyToken()
                return true
            } else {
                // This should be probably be displayed onscreen
                console.error('Invalid admin credentials. Please try again.')
            }
        } catch (error) {
            setAuthError(error)
        }
    }

    const logOut = async () => {
        try {
            const response = await fetch('http://localhost:8080/log-out')
            if (response.ok) {
                setUser(null)
                localStorage.removeItem('ramblrAdminJWT')
            } else {
                console.error('Logout unsuccessful due to unexpected server error. Please try again.')
            }
        } catch (error) {
            setAuthError(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            authLoading,
            authError,
            logIn,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthProvider