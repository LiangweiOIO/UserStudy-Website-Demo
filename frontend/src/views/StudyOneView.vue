<template>
    <div class="home-container">
        <h1>Study One ({{ currentIndex + 1 }}/{{ imgList.length }})</h1>
        <div v-if="computedCurrentImage" class="image-container">
            <img :src="currentImagePath" alt="Image" class="study-image" />
            <div class="rating-container">
                <h2>Question: How would you rate this image?</h2>
                <label v-for="rating in ratings" :key="rating">
                    <input type="radio" :value="rating" v-model="selectedRating" />
                    {{ rating }}
                </label>
            </div>
            <div class="buttons-container">
                <el-button @click="submitRating" class="mybutton">
                    Next
                </el-button>
            </div>
        </div>
        <div v-else>
            Redirecting...
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { useDataStore } from '../stores/counter';

export default {
    data() {
        return {
            imgList: [],
            currentIndex: 0,
            currentImagePath: null,
            selectedRating: null,
            ratings: [1, 2, 3, 4, 5],
            userRatings: []
        };
    },
    computed: {
        computedCurrentImage() {
            return this.imgList[this.currentIndex] || null;
        }
    },
    async created() {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/studyOneList');
            this.imgList = response.data;
            if (this.imgList.length > 0) {
                this.loadImage(this.imgList[this.currentIndex].img);
            }
        } catch (error) {
            console.error('Error fetching image list:', error);
        }
    },
    methods: {
        async loadImage(imgPath) {
            try {
                this.currentImagePath = `http://127.0.0.1:5000/images/${imgPath}`;
            } catch (error) {
                console.error('Error loading image:', error);
            }
        },
        submitRating() {
            if (this.selectedRating !== null && this.computedCurrentImage && this.computedCurrentImage.QID !== undefined) {
                this.userRatings.push({
                    // image: this.imgList[this.currentIndex].img,
                    rating: this.selectedRating,
                    QID: this.computedCurrentImage.QID
                });
                this.selectedRating = null;
                this.currentIndex++;
                if (this.currentIndex < this.imgList.length) {
                    this.loadImage(this.imgList[this.currentIndex].img);
                } else {
                    this.saveRatings();
                    this.$router.push({
                        path: '/aboutS2',
                        name: 'aboutS2',
                    });
                }
            } else {
                console.error('Current image or QID is undefined');
            }
        },
        saveRatings() {
            const dataStore = useDataStore();
            dataStore.userRating.S1 = this.userRatings;
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

.image-container {
    text-align: center;
    margin-bottom: 20px;
}

.study-image {
    /* max-width: 100%; */
    /* height: auto; */
    max-height: 500px;
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
