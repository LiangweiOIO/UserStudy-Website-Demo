<template>
  <div class="home-container">

    <div v-if="computedCurrentImages" class="content-container">
      <h1>Study Two ({{ currentIndex + 1 }}/{{ imgList.length }})</h1>
      <div class="images-container">
        <div class="image-wrapper">
          <img :src="currentImagePath1" alt="Image 1" class="study-image" />
        </div>
        <div class="image-wrapper">
          <img :src="currentImagePath2" alt="Image 2" class="study-image" />
        </div>
      </div>
      <div class="rating-container">
        <h2>Question 1: Which one is better?</h2>
        <label>
          <input type="radio" value="1" v-model="betterImage" />
          Left
        </label>
        <label>
          <input type="radio" value="2" v-model="betterImage" />
          Right
        </label>
      </div>
      <div class="rating-container">
        <h2>Question 2: Are these images consistent?</h2>
        <label>
          <input type="radio" value="yes" v-model="imagesConsistent" />
          Yes
        </label>
        <label>
          <input type="radio" value="no" v-model="imagesConsistent" />
          No
        </label>
      </div>
      <div class="buttons-container">
        <el-button @click="submitRating" class="mybutton">
          Next
        </el-button>
      </div>
    </div>
    <div v-else>
      <h1>Study End</h1>
      <h2>Thank you for participating!</h2>
    </div>
  </div>
</template>

<script>

import { useDataStore } from '../stores/counter';
import axios from 'axios';

export default {
  data() {
    return {
      imgList: [],
      currentIndex: 0,
      currentImagePath1: null,
      currentImagePath2: null,
      betterImage: null,
      imagesConsistent: null,
      userRatings: []
    };
  },
  computed: {
    computedCurrentImages() {
      return this.imgList[this.currentIndex] || null;
    }
  },
  async created() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/studyTwoList');
      this.imgList = response.data;
      if (this.imgList.length > 0) {
        this.loadImages(this.imgList[this.currentIndex].img1, this.imgList[this.currentIndex].img2);
      }
    } catch (error) {
      console.error('Error fetching image list:', error);
    }
  },
  methods: {
    loadImages(imgPath1, imgPath2) {
      this.currentImagePath1 = `http://127.0.0.1:5000/images/${imgPath1}`;
      this.currentImagePath2 = `http://127.0.0.1:5000/images/${imgPath2}`;
    },
    submitRating() {
      if (this.betterImage !== null && this.imagesConsistent !== null && this.computedCurrentImages && this.computedCurrentImages.QID !== undefined) {
        this.userRatings.push({
          // images: [this.currentImagePath1, this.currentImagePath2],
          betterImage: this.betterImage,
          imagesConsistent: this.imagesConsistent,
          QID: this.computedCurrentImages.QID
        });
        this.betterImage = null;
        this.imagesConsistent = null;
        this.currentIndex++;
        if (this.currentIndex < this.imgList.length) {
          this.loadImages(this.imgList[this.currentIndex].img1, this.imgList[this.currentIndex].img2);
        } else {
          this.saveRatings();
          // this.$router.push({ name: 'EndPage' });
        }
      } else {
        alert('Please answer both questions before proceeding.');
      }
    },
    async saveRatings() {
      const dataStore = useDataStore();
      dataStore.userRating.S2 = this.userRatings;
      const res = dataStore.userRating;

      try {
        await axios.post('http://127.0.0.1:5000/api/save-ratings', res, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error saving ratings:', error);
      }
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

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.image-wrapper {
  max-width: 35%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.study-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background: #fff;
}

.rating-container {
  margin: 20px 0;
}

.rating-container label {
  margin-right: 10px;
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
