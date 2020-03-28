<template>
  <b-jumbotron class="question-box-container">
    <template v-slot:lead>
      <span v-html="currentQuestion.question"></span>
    </template>

    <hr class="my-4" />

    <b-list-group class="list-group">
      <b-list-group-item
        class="list-group__item"
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        @click="selectAnswer(index)"
        :class="[selectedIndex === index ? 'selected' : '']"
        >{{ answer }}</b-list-group-item
      >
    </b-list-group>

    <div class="submit-box">
      <b-button
        class="btn"
        variant="primary"
        @click="submitAnswer"
        :disabled="selectedIndex === null || answered"
        >Submit</b-button
      >
      <b-button class="btn" variant="success" @click="next">Next</b-button>
    </div>
  </b-jumbotron>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function,
  },
  data() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
    };
  },
  watch: {
    currentQuestion: {
      immediate: true,
      handler() {
        this.selectedIndex = null;
        this.answered = false;
        this.shuffleAnswers();
      },
    },
  },
  computed: {
    answers() {
      const answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];

      return answers;
    },
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    shuffleAnswers() {
      this.shuffledAnswers = _.shuffle([
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ]);

      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer,
      );
    },
    submitAnswer() {
      let isCorrect = false;

      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
        console.log('owo');
      }

      this.answered = true;
      this.increment(isCorrect);
    },
  },
};
</script>

<style scoped>
.question-box-container {
  padding: 1rem 2rem;
}

.list-group {
  margin-bottom: 1rem;
}

.list-group__item:hover {
  background: rgba(0, 123, 255, 0.4);
  cursor: pointer;
}

.list-group__item:not(:last-child) {
  margin-bottom: 0.5rem;
}

.btn {
  margin: 0 0.5rem;
}

.selected {
  background-color: rgba(0, 123, 255, 0.8);
}

.correct {
  background-color: rgba(40, 167, 69, 0.8);
}

.incorrect {
  background-color: rgba(220, 53, 69, 0.8);
}

.selected,
.correct,
.incorrect {
  color: #fff;
}
</style>
