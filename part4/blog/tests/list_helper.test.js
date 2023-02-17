const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

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
    const result = listHelper.totalLikes(helper.initBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('return empty object on empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('return the most liked blog', () => {
    const result = listHelper.favoriteBlog(helper.initBlogs)
    expect(result).toEqual(helper.initBlogs[2])
  })

  test('return first most liked blog if few exist', () => {
    const equalBlogs = helper.initBlogs.map(b => {
      return { ...b, likes: 5 }
    })

    const result = listHelper.favoriteBlog(equalBlogs)
    expect(result).toEqual(equalBlogs[0])
  })
})

describe('most blogs', () => {
  test('find the most productive blogger', () => {
    const result = listHelper.mostBlogs(helper.initBlogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(result).toEqual(expected)
  })

  test('return empty object on empty array', () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual({})
  })
})

describe('most likes', () => {
  test('find the most liked author', () => {
    const result = listHelper.mostLikes(helper.initBlogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(result).toEqual(expected)
  })

  test('return empty object on empty array', () => {
    const result = listHelper.mostLikes([])

    expect(result).toEqual({})
  })
})
