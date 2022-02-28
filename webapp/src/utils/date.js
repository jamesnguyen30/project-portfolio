const getDateDifference = (a, b) => {
  const date1 = {
    day: a.getDate(),
    month: a.getMonth(),
    year: a.getFullYear()
  }
  const date2 = {
    day: b.getDate(),
    month: b.getMonth(),
    year: b.getFullYear()
  }

  if (date2.year !== date1.year) {
    return `${Math.abs(date2.year - date1.year)} years ago`
  } else if (date2.month !== date1.month) {
    return `${Math.abs(date2.month - date1.month)} months ago`
  } else if (date2.day !== date1.day) {
    return `${Math.abs(date2.day - date1.day)} days ago`
  } else {
    return 'Recently'
  }
}

export { getDateDifference }
