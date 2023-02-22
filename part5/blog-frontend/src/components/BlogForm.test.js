import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('update states and submit', async () => {
        const onSubmit = jest.fn()
        const { container } = render(<BlogForm onSubmit={onSubmit}/>)

        const user = userEvent.setup()

        const titleInput = container.querySelector('input[name="title"]')
        const authorInput = container.querySelector('input[name="author"]')
        const urlInput = container.querySelector('input[name="url"]')
        const button = screen.getByText('create')

        await user.type(titleInput, 'My title')
        await user.type(authorInput, 'Tester')
        await user.type(urlInput, 'some url')
        await user.click(button)

        const data = onSubmit.mock.calls[0][1]

        expect(data.title).toBe('My title')
        expect(data.author).toBe('Tester')
        expect(data.url).toBe('some url')
        expect(onSubmit.mock.calls).toHaveLength(1)
    })
})
