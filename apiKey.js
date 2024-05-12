import fetch from 'node-fetch'
import fs from "fs-extra"
import { PRICE } from './price.js'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const url = `${apiHost}/v1/user/balance`
const arrKey=fs.readFileSync("./apiKey.txt","utf-8").split("\n");
/**
 * @param {String} key - API KEY STABILITY
 * @param {String} action - ACTION PRICE FROM ./price.js
 * @example
 * ------PRICE-------
 *  "SD3":6.5,
    "SD3 Turbo":4,
    "Core":3,
    "SDXL 1.0":0.6,
    "SD 1.6":1,
    "Creative Upscaler":25,
    "ESRGAN":0.2,
    "Search and Replace":4,
    "Inpaint":3,
    "Outpaint":4,
    "Remove Background":2,
    "Structure":3,
    "Sketch":3,
    "Stable Video":20
 * @example 
 * import { ApiKey } from "./apiKey.js";
   const api=new ApiKey();
   const key = await api.getKey("Core");
   console.log(key)
   @returns {Object} RETURN Object
   @example
    {
      key: 'sk-5d2hgvNigTUZYchxVd1SRt8Xf3iDVPSxnT7ZiTJknIhhfyfh',
      balance: 25
    }
 */
export class ApiKey{
  async #balance(key,action){
    if(PRICE[`${action}`]){
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
      }
      const balance = await response.json();
      if(balance.credits>=PRICE[`${action}`]){
        return {key:key,balance:balance.credits}
      }
    }else{
      throw new Error(`NOT ABALABLE ACTION`)
    }
  }
  async getKey(action){
    for(let i=0;i<arrKey.length;i++){
    if(arrKey[i]!=""){
      const key=await this.#balance(arrKey[i],action)
      if(key.key){
        return key;
      }
    }
    }
    return "NOT KEY FOR ACTION"
  }
}
