import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer.jsx";
import ServerError from "./ServerError/ServerError";
import Form from "./Form/Form.jsx";

const Root = () => {

    const [postsData, setPostsData] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState(null)

    const { user, authLoading, authError } = useContext(AuthContext)

    const serverError = authError || postsError;
    const loading = authLoading || postsLoading;

    const getData = async () => {
            setPostsLoading(true)
            try {
                const response = await fetch('http://localhost:3000/posts')
                if (response.status >= 500) {
                    throw new Error('Server error')
                }
                const json = await response.json()
                setPostsData(json)
            } catch (error) {
                setPostsError(error)
            } finally {
                setPostsLoading(false)
            }
        }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header title={'Ramblr admin'} />
            <div id="main">
                {loading ? (
                    <div className='loader'></div>
                ) : (
                        (serverError) ? (
                            <ServerError error={serverError}/>
                        ) : (
                                (!user) ? (
                                    <Form />
                                ) : (
                                <Outlet context={{ postsData, getData }} />
                        ))
                )}
            </div>
            <Footer />
        </>
    )

}

export default Root