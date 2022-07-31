import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title: 'Jest testing is cool',
    author: 'Jest',
    url: 'randomurl.com',
    likes: 10,
    user: {
      username: 'tester',
      name: 'Tester',
      id: '62e50034c82a79b81afc6663'
    }
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('Render title and author', () => {
    const component = render(
      <Blog blog={blog} handleLike={mockUpdateBlog} handleDelete={mockDeleteBlog} currentUserName='tester' />
    )
    expect(component.container).toHaveTextContent(
      'Jest testing is cool - Jest'
    )
  })

  test('View button shows/hides content', () => {
    const component = render(
      <Blog blog={blog} handleLike={mockUpdateBlog} handleDelete={mockDeleteBlog} currentUserName='tester' />
    )
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'randomurl.com'
    )

    expect(component.container).toHaveTextContent(
      '10'
    )
  })

  test('Like button works as expected', () => {
    const component = render(
      <Blog blog={blog} handleLike={mockUpdateBlog} handleDelete={mockDeleteBlog} currentUserName='tester' />
    )

    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
  })
})