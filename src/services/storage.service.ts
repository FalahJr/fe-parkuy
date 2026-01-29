export const setToken = (token: string) => localStorage.setItem("TOKEN", `Bearer ${token}`)

export const getToken = () => localStorage.getItem('TOKEN')

export const removeToken = () => localStorage.removeItem("TOKEN")

// export const config = {
//     headers: {
//       Authorization:    getToken(),
//     },
//   };