import axios from "axios"

/** aladin api */
export const aladinAxiosInstance = () =>
  axios.create({
    baseURL: "/aladin/ttb/api",
    params: {
      ttbkey: import.meta.env.VITE_API_ALADIN_SERVICE_KEY,
      Output: "JS",
      Version: 20131101,
      MaxResults: 15,
      SearchTarget: "Book",
      Cover: "Big",
    },
  })
