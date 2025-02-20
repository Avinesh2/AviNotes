export const getInitials = (name) => {
  const nameArray = name.split(' ')
  let initials=""
  if(nameArray.length === 1) initials = nameArray[0][0]
  else initials = nameArray[0][0] + nameArray[1][0]
  return initials.toUpperCase()
}

export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return re.test(email)
}