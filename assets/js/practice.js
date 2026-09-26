class PracticeManager {
  constructor(audio) {
    this.audio = audio;
    this.score = 0;
    this.attempts = 0;
    this.correct = 0;
    this.currentQuestion = null;
    this.currentAnswer = null;
    this.difficulty = 'beginner';
    this.practiceType = 'letters';
  }

  resetScore() {
    this.score = 0;
    this.attempts = 0;
    this.correct = 0;
    this.updateStats();
  }

  updateStats() {
    const scoreElement = document.getElementById('score');
    const attemptsElement = document.getElementById('attempts');
    const accuracyElement = document.getElementById('accuracy');

    if (scoreElement) {
      scoreElement.textContent = this.score;
    }
    if (attemptsElement) {
      attemptsElement.textContent = this.attempts;
    }
    if (accuracyElement) {
      const accuracy = this.attempts > 0 ? Math.round((this.correct / this.attempts) * 100) : 0;
      accuracyElement.textContent = accuracy + '%';
    }
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    
    const difficultyElement = document.getElementById('difficulty-display');
    if (difficultyElement) {
      difficultyElement.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
  }

  setPracticeType(type) {
    this.practiceType = type;
  }

  generateQuestion() {
    let characters;

    if (this.practiceType === 'letters') {
      characters = this.getLetterCharacters();
    } else if (this.practiceType === 'numbers') {
      characters = this.getNumberCharacters();
    } else {
      characters = this.getMixedCharacters();
    }

    const char = characters[Math.floor(Math.random() * characters.length)];
    this.currentQuestion = char;
    this.currentAnswer = char;

    return char;
  }

  getLetterCharacters() {
    const common = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'U'];
    const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    if (this.difficulty === 'beginner') {
      return common;
    } else if (this.difficulty === 'intermediate') {
      return all;
    } else {
      return all;
    }
  }

  getNumberCharacters() {
    return '0123456789'.split('');
  }

  getMixedCharacters() {
    const letters = this.getLetterCharacters();
    const numbers = this.getNumberCharacters();
    return [...letters, ...numbers];
  }

  playQuestion() {
    if (this.currentQuestion) {
      this.audio.play(this.currentQuestion);
    }
  }

  checkAnswer(userAnswer) {
    if (!this.currentAnswer) {
      return { correct: false, message: 'No question loaded' };
    }

    this.attempts++;
    const isCorrect = userAnswer.toUpperCase() === this.currentAnswer.toUpperCase();

    if (isCorrect) {
      this.correct++;
      this.score += 10;
    }

    this.updateStats();

    return {
      correct: isCorrect,
      message: isCorrect ? 'Correct!' : `Incorrect. The answer was ${this.currentAnswer}`,
      correctAnswer: this.currentAnswer
    };
  }

  revealAnswer() {
    return this.currentAnswer;
  }

  nextQuestion() {
    this.generateQuestion();
    return this.currentQuestion;
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  getCurrentAnswer() {
    return this.currentAnswer;
  }

  getScore() {
    return this.score;
  }

  getAttempts() {
    return this.attempts;
  }

  getAccuracy() {
    return this.attempts > 0 ? Math.round((this.correct / this.attempts) * 100) : 0;
  }
}

class AudioPracticeSession {
  constructor(audio) {
    this.audio = audio;
    this.practice = new PracticeManager(audio);
    this.isPlaying = false;
  }

  start() {
    this.practice.nextQuestion();
    this.practice.playQuestion();
    this.isPlaying = true;
  }

  playAgain() {
    if (this.practice.getCurrentQuestion()) {
      this.practice.playQuestion();
    }
  }

  submitAnswer(answer) {
    const result = this.practice.checkAnswer(answer);
    return result;
  }

  showAnswer() {
    return this.practice.revealAnswer();
  }

  next() {
    this.practice.nextQuestion();
    this.practice.playQuestion();
  }

  reset() {
    this.practice.resetScore();
    this.practice.nextQuestion();
    this.practice.playQuestion();
  }

  setDifficulty(difficulty) {
    this.practice.setDifficulty(difficulty);
  }

  setPracticeType(type) {
    this.practice.setPracticeType(type);
  }

  getStats() {
    return {
      score: this.practice.getScore(),
      attempts: this.practice.getAttempts(),
      accuracy: this.practice.getAccuracy()
    };
  }
}

window.PracticeManager = PracticeManager;
window.AudioPracticeSession = AudioPracticeSession;
