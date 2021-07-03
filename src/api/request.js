import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  console.log(category, alpha);
  let newCategory = category.split('|')
  // 1男 2女
  let type = newCategory[0]
  // 歌手国籍
  let area = newCategory[1]
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`);
}