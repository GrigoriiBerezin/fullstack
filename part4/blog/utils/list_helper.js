const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.map(b => b.likes).reduce((s, l) => s + l)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    return blogs.reduce((fav, cur) => (cur.likes > fav.likes) ? cur : fav)
  }
}

module.exports = {dummy, totalLikes, favoriteBlog}
