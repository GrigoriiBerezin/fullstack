const listHelper = require('../utils/list_helper')

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

describe('dummy', () => {
  test('returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('return 0 on empty array', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('return sum of likes from all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(18)
  })
})

describe('favorite blog', () => {
  test('return empty object on empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('return the most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('return first most liked blog if few exist', () => {
    const equalBlogs = blogs.map(b => {
      return {...b, likes: 5}
    })

    const result = listHelper.favoriteBlog(equalBlogs)
    expect(result).toEqual(equalBlogs[0])
  })
})
