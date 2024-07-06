<!--
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:53:59
 * @LastEditTime: 2024-07-06 17:21:41
 * @LastEditors: Liangwei Wang
-->
<template>
  <div class="home-container">
    <h1>Welcome to the User Experiment</h1>
    <br />
    <div class="input-container">
      <label for="userId">User ID:</label>
      <input type="text" id="userId" v-model="userId" placeholder="Enter your ID" />
    </div>
    <br />
    <div class="buttons-container">
      <el-button @click="navigateToAbout" class="mybutton">
        <h2>Start</h2>
      </el-button>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '../stores/counter';

export default {
  data() {
    return {
      userId: ''
    };
  },
  methods: {
    navigateToAbout() {
      const dataStore = useDataStore();
      dataStore.userRating.userId = this.userId;

      console.log(dataStore.userRating.userId)
      this.$router.push({
        path: '/about',
        name: 'about',
      });
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #f0f2f5;
  padding: 20px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.input-container {
  max-width: 800px;
  text-align: left;
  font-size: 1.5em;
  color: #555;
  line-height: 1.6;
  margin-bottom: 40px;
}

p {
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

input {
  margin-left: 10px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #727272;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ffcc00;
}
</style>
