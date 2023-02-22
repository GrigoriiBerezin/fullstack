import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let onDelete
    let onLike
    let container
    const blog = {
        title: 'Blog title',
        author: 'Tester',
        likes: 1,
        url: 'some url',
        user: {
            username: 'Tester'
        }
    }
    const username = 'tester'

    beforeEach(() => {
        onDelete = jest.fn()
        onLike = jest.fn()
        container = render(<Blog onDelete={onDelete} onLike={onLike} blog={blog} username={username}/>).container
    })

    test('render only title and author of the blog', () => {
        const info = screen.getByText('Blog title by Tester')
        expect(info).toBeDefined()

        const div = container.querySelector('.full-info')
        expect(div).toHaveStyle('display: none')
    })

    test('render blog\'s URL and number of likes after clicking button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')

        await user.click(button)

        const likes = screen.getByText('likes: 1')
        const url = screen.getByText('link')

        const div = container.querySelector('.full-info')
        expect(div).toHaveStyle('display: block')

        expect(likes).toBeDefined()
        expect(url).toHaveAttribute('href', blog.url)
    })

    test('render functional increase like button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('like')

        await user.dblClick(button)

        expect(onLike.mock.calls).toHaveLength(2)
    })
})
