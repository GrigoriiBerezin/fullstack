import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
    test('render only title and author of the blog', () => {
        const blog = {
            title: 'Blog title',
            author: 'Tester',
            user: {
                username: 'Tester'
            }
        }
        const username = 'tester'

        const onDelete = jest.fn()
        const onLike = jest.fn()

        const container = render(<Blog onDelete={onDelete} onLike={onLike} blog={blog} username={username}/>).container

        const info = screen.getByText('Blog title by Tester')
        expect(info).toBeDefined()

        const div = container.querySelector('.full-info')
        expect(div).toHaveStyle('display: none')
    })
})
