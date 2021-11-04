export const formatDate = (date: string) => {
  const [month, day, year] = date.split('-')
  const postDateFormatted = `${month}/${day}/${year}`
  return postDateFormatted
}
