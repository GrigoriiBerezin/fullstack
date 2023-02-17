const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.length === 0 ? 0 : blogs.map(b => b.likes).reduce((s, l) => s + l)

module.exports = { dummy, totalLikes }
