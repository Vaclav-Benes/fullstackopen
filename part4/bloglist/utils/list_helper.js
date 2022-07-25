const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return {}
  } else if(blogs.length === 1){
    return(
      {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
      }
    )
  } else {
    const mostLikes = blogs.reduce((max, blog) => blog.likes > max ? blog.likes : max, blogs[0].likes)
    const sBlog = blogs.find(blog => blog.likes === mostLikes)

    return(
      {
        title: sBlog.title,
        author: sBlog.author,
        likes: sBlog.likes
      }
    )
  }

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let authorCounts = blogs.reduce((authorCount, blog) => {
      if(blog.author in authorCount){
        authorCount[blog.author]++
      }else{
        authorCount[blog.author] = 1
      }
      return authorCount
    }, {})
    let max = Math.max(...Object.values(authorCounts))
    let mBlogs = Object.keys(authorCounts).filter(author => authorCounts[author] === max)
    return {
      author: mBlogs[0],
      blogs: max
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  } else {
    let likeCounts = blogs.reduce((likeCount, blog) => {
      if(blog.author in likeCount){
        likeCount[blog.author] += blog.likes
      }else{
        likeCount[blog.author] = blog.likes
      }
      return likeCount
    }, {})
    let max = Math.max(...Object.values(likeCounts))
    let mBlogs = Object.keys(likeCounts).filter(author => likeCounts[author] === max)
    return {
      author: mBlogs[0],
      likes: max
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}