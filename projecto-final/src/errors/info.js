export const generatgeUserErrorInfo = (user) => {
  return `One or more properties are missing or invalid for user: ${user}
  List of required properties: 
    - first_name: needs to be a string, received ${user.first_name}
    - last_name: needs to be a string, received ${user.last_name}
    - email: needs to be a string, received ${user.email}
  `
}
