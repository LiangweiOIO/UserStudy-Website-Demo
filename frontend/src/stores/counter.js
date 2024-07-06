/*
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:53:59
 * @LastEditTime: 2024-07-06 17:20:11
 * @LastEditors: Liangwei Wang
 */
// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => {
    return {
      userRating: {
        userId: null,
        answers: null,
      }
    }
  }
})
