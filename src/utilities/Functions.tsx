export const formatDate = (date: string) => {
  const postDate = new Date(date)
  const postDateFormatted = `${
    postDate.getMonth() + 1
  }/${postDate.getDate()}/${postDate.getFullYear()}`
  return postDateFormatted
}
