<template>
  <div id="app">
    <Header :numCorrect="numCorrect" :numTotalAnswers="numTotalAnswers" />

    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <QuestionBox
            v-if="questions.length && index <= questions.length"
            :currentQuestion="questions[index]"
            :next="next"
            :increment="increment"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header';
import QuestionBox from './components/QuestionBox';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Header,
    QuestionBox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotalAnswers: 0,
    };
  },
  methods: {
    next() {
      this.index++;
    },
    increment(isCorrect) {
      console.log('i ran');

      if (isCorrect) {
        this.numCorrect++;
      }

      this.numTotalAnswers++;
    },
  },
  async mounted() {
    const res = await axios.get(
      'https://opentdb.com/api.php?amount=10&category=24&type=multiple',
    );

    this.questions = res.data.results;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
