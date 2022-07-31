import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, currentUserName }) => {
  const [lBlog, setLBlog] = useState(blog)
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const _handleLike = () => {
    const uBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    handleLike(uBlog)
    setLBlog(uBlog)
  }

  return (
    <div
      style={{
        'border': '1px solid',
        'borderRadius': '5px',
        'margin': '5px',
        'padding': '10px'
      }}
      className='blog'
    >
      <h3 style={{ 'margin': '0' }}>
        {lBlog.title} {(!visible) && ('- ' + lBlog.author)}
        <button
          style={{ 'marginLeft': '10px' }}
          onClick={() => { toggleVisibility() }}
        >
          {visible ? 'Hide' : 'View'}
        </button>
      </h3>
      <div
        style={{ 'display': visible ? '' : 'none' }}
      >
        <p>
          URL: {lBlog.url}
        </p>
        <p>
          Likes: {lBlog.likes}
          <button id='likeButton' style={{ 'marginLeft': '10px' }} onClick={_handleLike}>Like</button>
        </p>
        <p>
          Author: {lBlog.author}
        </p>
        {
          (lBlog.user.username === currentUserName) && (
            <button
              id='remove'
              style={{
                'backgroundColor': 'red',
                'color': 'white',
                'borderRadius': '5px',
                'borderColor': 'white'
              }}
              onClick={() => handleDelete(blog)}>
              Delete
            </button>

          )
        }
      </div>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUserName: PropTypes.string.isRequired,
}

export default Blog