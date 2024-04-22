const readingTime = (article) => {
  const noOfWords = article.split(' ').length

  const wordsPerMinute = noOfWords / 200
  return Math.round(wordsPerMinute) === 0 ? 1 : Math.round(wordsPerMinute)
}

module.exports = { readingTime }