<template>
  <div class="goto-box">
    <div class="goto-text">
      <input type="text" placeholder="Enter your name" v-model="player">
      <div v-if="player" class="btn" @click="startGame">Go to Bowling Score
        Calculator
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      player: '',
    };
  },
  computed: {},
  methods: {
    startGame() {
      localStorage.setItem('player', this.player);
      this.$router.push({name: 'BowlingScore'});
    },
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-image: url('~/assets/img/bowling-ball-with-bowling.jpg');
  background-color: #0E0D12;
  background-repeat: no-repeat;
  background-size: cover;
}

.goto-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .goto-text {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #3498db;
    color: #fff;
    margin-top: 10vh;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    min-width: 400px;

    input {
      padding: 10px;
      border-radius: 5px;
      border: none;
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .btn {
      text-decoration: none;
      display: inline-block;
      outline: 0;
      cursor: pointer;
      border: none;
      padding: 0 56px;
      height: 45px;
      line-height: 45px;
      border-radius: 7px;
      background-color: #0070f3;
      color: white;
      font-weight: 400;
      font-size: 16px;
      box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
      transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
      text-align: center;

      :hover {
        background: rgba(0, 118, 255, 0.9);
        box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
      }

    }
  }
}

</style>
