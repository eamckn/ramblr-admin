import { Routes, Route } from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import Home from './components/Home/Home'
import Post from './components/Post/Post'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Home />} />
          <Route path='posts/:postId' element={<Post />}  />
        </Route>
      </Routes>
    </>
  )
}

export default App
