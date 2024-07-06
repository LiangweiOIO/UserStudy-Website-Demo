<template>
    <div class="home-container">
        <div v-if="currentQuestion" class="content-container">
            <h1>Study ({{ currentIndex + 1 }}/{{ imgList.length }})</h1>
            <div v-if="currentQuestion.type === 'rating'">
                <img :src="formatImagePath(currentQuestion.images[0])" alt="Image" class="study-image" />
                <h2>Question: How would you rate this image?</h2>
                <div class="rating-container">
                    <label v-for="rating in ratings" :key="rating">
                        <input type="radio" :value="rating" v-model="selectedAnswer" />
                        {{ rating }}
                    </label>
                </div>
            </div>
            <div v-if="currentQuestion.type === 'comparison'">
                <div class="images-container">
                    <div :class="{ 'image-wrapper': true, 'highlight': selectedAnswer === 1 }">
                        <img :src="formatImagePath(currentQuestion.images[0])" alt="Image 1"
                            class="study-image comparison-image" />
                    </div>
                    <div :class="{ 'image-wrapper': true, 'highlight': selectedAnswer === 2 }">
                        <img :src="formatImagePath(currentQuestion.images[1])" alt="Image 2"
                            class="study-image comparison-image" />
                    </div>
                </div>
                <h2>Question: Which image is better?</h2>
                <div class="rating-container">
                    <label v-for="option in currentOptions" :key="option.value">
                        <input type="radio" :value="option.value" v-model="selectedAnswer" />
                        {{ option.text }}
                    </label>
                </div>
            </div>
            <div v-if="currentQuestion.type === 'consistency'">
                <div class="images-container">
                    <div class="image-wrapper">
                        <img :src="formatImagePath(currentQuestion.images[0])" alt="Image 1"
                            class="study-image comparison-image" />
                    </div>
                    <div class="image-wrapper">
                        <img :src="formatImagePath(currentQuestion.images[1])" alt="Image 2"
                            class="study-image comparison-image" />
                    </div>
                </div>
                <h2>Question: Are these two images consistent?</h2>
                <div class="rating-container">
                    <label v-for="option in currentOptions" :key="option.value">
                        <input type="radio" :value="option.value" v-model="selectedAnswer" />
                        {{ option.text }}
                    </label>
                </div>
            </div>
            <div class="buttons-container">
                <el-button @click="submitAnswer" class="mybutton">Next</el-button>
            </div>
        </div>
        <div v-else>
            <h1>Study End</h1>
            <h2>Thank you for participating!</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useDataStore } from '@/stores/counter';

export default {
    data() {
        return {
            imgList: [],
            currentIndex: 0,
            selectedAnswer: null,
            results: {},
            ratings: [1, 2, 3, 4, 5],
            comparisonOptions: [
                { value: 1, text: 'Image on the left' },
                { value: 2, text: 'Image on the right' }
            ],
            consistencyOptions: [
                { value: 'yes', text: 'Yes' },
                { value: 'no', text: 'No' }
            ]
        };
    },
    computed: {
        currentQuestion() {
            return this.imgList[this.currentIndex] || null;
        },
        currentOptions() {
            if (this.currentQuestion.type === 'comparison') {
                return this.comparisonOptions;
            } else if (this.currentQuestion.type === 'consistency') {
                return this.consistencyOptions;
            }
            return [];
        }
    },
    async created() {
        try {
            const response = await axios.get('api/user_experiment/questions.json');
            this.imgList = response.data;
        } catch (error) {
            console.error('Error fetching image list:', error);
        }
    },
    methods: {
        formatImagePath(path) {
            return `api/${path}`;
        },
        submitAnswer() {
            if (this.selectedAnswer !== null && this.currentQuestion) {
                this.results[this.currentQuestion.id] = this.selectedAnswer;
                this.selectedAnswer = null;
                this.currentIndex++;
                if (this.currentIndex >= this.imgList.length) {
                    // console.log('Results:', this.results);
                    const dataStore = useDataStore();
                    dataStore.userRating.answers = this.results;
                    this.saveResults(dataStore.userRating);
                }
            } else {
                alert('Please select an answer before proceeding.');
            }
        },
        async saveResults(res) {
            console.log(res);
            try {
                await axios.post('api/user_experiment/save_results.php', res, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error('Error saving results:', error);
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

h2 {
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 5px;
    color: #666;
    text-align: center;
}

.image-container,
.images-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

.image-wrapper {
    max-width: 60%;
    max-height: 400px;
    display: flex;
    justify-content: center;
    border: 5px solid #f0f2f5;
    align-items: center;
}

.study-image {
    max-width: 40vw;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    background: #fff;
}

.comparison-image {
    max-height: 300px;
}

.rating-container {
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.rating-container label {
    margin-right: 15px;
    font-size: 1.2em;
}

.rating-container input[type="radio"] {
    transform: scale(1.2);
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

/* .highlight {
    border: 5px solid #ffcc00;
    border-radius: 10px;
} */
</style>