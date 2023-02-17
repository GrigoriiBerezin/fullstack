const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('return 0 on empty array', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('return sum of likes from all blogs', () => {
    const blogs = [
      {
        title: 'First article',
        author: 'Grigorii',
        url: 'localhost',
        likes: 15
      },
      {
        title: 'Another article',
        author: 'Grigorii',
        url: 'localhost:3031',
        likes: 3
      }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(18)
  })
})
