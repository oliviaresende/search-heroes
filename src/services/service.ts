import axios from "axios";
import md5 from 'md5'

const apiPublicKey = import.meta.env.VITE_APP_API_PUBLIC_KEY;
const apiPrivateKey = import.meta.env.VITE_APP_API_PRIVATE_KEY;
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const getTs = () => {
  return new Date().getTime();
} 

const getHash = (ts: number) => {
  return md5(ts+apiPrivateKey+apiPublicKey)
} 

export const getHeroByName= async(name:string) => {
  const ts = getTs()
  const hash = getHash(ts)
   const res = await axios({
    method: "get",
    url: `${apiBaseUrl}/characters?ts=${ts}&apikey=${apiPublicKey}&hash=${hash}&name=${name}`,
  }).catch((err)=>{
    console.trace(err)
  }); 

  return res?.data.data.results[0];
}

export const getComicsByHeroId= async(heroId:number) => {
  const ts = getTs()
  const hash = getHash(ts)
   const res = await axios({
    method: "get",
    url: `${apiBaseUrl}/characters/${heroId}/comics?ts=${ts}&apikey=${apiPublicKey}&hash=${hash}`,
  }).catch((err)=>{
    console.trace(err)
  }); 

  return res?.data.data.results;

}

export const getSeriesByHeroId= async(heroId:number) => {
  const ts = getTs()
  const hash = getHash(ts)
   const res = await axios({
    method: "get",
    url: `${apiBaseUrl}/characters/${heroId}/series?ts=${ts}&apikey=${apiPublicKey}&hash=${hash}`,
  }).catch((err)=>{
    console.trace(err)
  }); 

  return res?.data.data.results;

}
