/*
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:53:59
 * @LastEditTime: 2024-07-05 18:46:42
 * @LastEditors: Liangwei Wang
 */
// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => {
    return {
      userRating: {
        userId: null,
        S1: null,
        S2: null,
      }
    }
  }
})
