import { React, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <p>Title:</p>
        <input id='title' value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        <p>Author:</p>
        <input id='author' value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        <p>URL:</p>
        <input id='url' value={newUrl} onChange={handleUrlChange} />
      </div>
      <div>
        <br />
        <button id='add-button' type="submit">Add</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm