<template>
  <div class="pin-buttons">
    <div class="pin-buttons__title">
      <h3>
        Frame {{ frameNumber }}
      </h3>

      <h4>
        Click Number of Pins Knocked Down
      </h4>
      <div class="pin-buttons__body">
        <ul>
          <li v-for="n in limit+1">
            <button @click="knockDownPins(n-1)">{{ n - 1 }}</button>
          </li>
          <li>
            <button @click="knockClearFrame" class="clear">C</button>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script lang="js">
export default {
  name: 'PinButtons',
  props: {
    name: {
      type: String,
      default: 'Bowling Score Calculator',
    },
    frameNumber: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    knockDownPins(pin) {
      this.$emit('knockDownPins', pin);
    },
    knockClearFrame() {
      this.$emit('knockClearFrame');
    },
  },
}
</script>

<style lang="scss" type="text/css">
.pin-buttons {
  &__title {
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;

    h3 {
      font-size: 30px;
      margin-bottom: 10px;
      color: #fff;
      text-shadow: brown 0 0 10px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    li {
      margin: 5px;

      button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        outline: none;
        background-color: #fff;
        color: #000;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background: linear-gradient(to bottom, #499bea 0%, #207ce5 100%);
          box-shadow: 0 0 10px rgba(#85bbb8, 0.5);
          color: #fff;
        }
      }
    }
  }
}
</style>
