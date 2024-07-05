<!--
 * @Author: Liangwei Wang liangweioio27@gmail.com
 * @Date: 2024-07-04 16:53:59
 * @LastEditTime: 2024-07-05 00:59:34
 * @LastEditors: Liangwei Wang
-->
<template>
  <div class="home-container">
    <h1>Study One</h1>
    <br />
    <div class="input-container">
      <p>Welcome to the experiment. This session will involve a series of tasks designed to evaluate... During the
        experiment, you will be asked to... Make sure...</p>
      <br />
    </div>
    <br />

    <div class="buttons-container">
      <el-button @click="startExperiment" class="mybutton">
        <h2>Let's Start</h2>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Add any necessary data properties here
    };
  },
  methods: {
    startExperiment() {
      this.$router.push({
        path: '/studyOne',
        name: 'studyOne',
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

.mybutton {
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #727272;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.mybutton:hover {
  background-color: #ffcc00;
}
</style>
