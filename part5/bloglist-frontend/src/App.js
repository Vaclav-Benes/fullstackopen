import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const handleLogin = async (nUser) => {
    try {
      const user = await loginService.login(nUser)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      setSuccessMessage(`User "${user.username}" logged in!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
      window.location.reload(false)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload(false)
  }

  const getAllBlogs = async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
  }

  const createBlog = async (newBlog) => {
    try {
      const rBlog = await blogService.create(newBlog)
      setSuccessMessage(`Blog "${newBlog.title}" was added`)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(rBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Cannot add blog "${newBlog.title}"`)
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (tuBlog) => {
    try {
      const uBlog = await blogService.update(tuBlog)
      setSuccessMessage(`Blog "${tuBlog.title}" was successfully updated!`)
      setErrorMessage(null)
      const nBlogs = blogs.map(blog => blog.id !== tuBlog.id ? blog : uBlog)
      setBlogs(nBlogs)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(
        `Cannot update "${tuBlog.title}"`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (tdBlog) => {
    try {
      if (window.confirm(`Delete "${tdBlog.title}" ?`)) {
        blogService.remove(tdBlog.id)
        setSuccessMessage(`Blog "${tdBlog.title}" was successfully deleted!`)
        setBlogs(blogs.filter(blog => blog.id !== tdBlog.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(
        `Cannot delete "${tdBlog.title}"`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const sortParams = (e1, e2) => e2.likes - e1.likes

  const blogList = () => {
    return (
      <div>
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <br />
        <Togglable buttonLabel='Add blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <div id='blogContainer'>
          <h2>Blogs</h2>
          {
            blogs.sort(sortParams).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                currentUserName={user.username}
                handleLike={updateBlog}
                handleDelete={deleteBlog}
              />
            )
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <h1 style={{ 'textAlign': 'center', 'borderBottom': '1px solid' }}>Blog list</h1>

      {
        user === null
          ? <LoginForm handleLogin={handleLogin} />
          : blogList()
      }


    </div>
  )
}

export default App
