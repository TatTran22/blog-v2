const baseOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const formatDate = (date: string, options = baseOptions) => {
  return new Date(date).toLocaleDateString('en-US', options)
}

export default formatDate
