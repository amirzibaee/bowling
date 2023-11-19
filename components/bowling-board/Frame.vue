<template>
  <div class="frame" :class="{ selected : frame.selected }" @click="selectFrame">
    <div class="frame__title">Frame {{ frame.number }}</div>
    <div class="frame__input">
      <div class="chance1">{{ pinFormat(frame.chance1, 1) }}</div>
      <div class="chance2">{{ pinFormat(frame.chance2, 2) }}</div>
      <div v-if="lastFrame" class="chance3">{{ pinFormat(frame.chance3, 3) }}</div>
    </div>
    <div class="frame__score"><span v-if="resultShow">{{ frame.result }}</span></div>
  </div>
</template>
<script>

const MAX_PINS = 10;
export default {
  name: 'Frame',
  props: {
    frame: {
      type: Object,
      required: true,
      default: () => {
        return {
          number: 1,
          selected: false,
          chance1: null,
          chance2: null,
          chance3: null,
          result: null,
        };
      },
    },
    lastFrame: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pinTemplate: {
        0: '-',
        10: ' ',
      }
    };
  },
  computed: {
    resultShow() {
      return (this.frame.result && this.frame.chance1 && this.frame.chance2 && !this.lastFrame)
        || (this.frame.chance1 === MAX_PINS && !this.lastFrame)
        || (this.frame.chance1 !== null && this.frame.chance2 !== null && this.frame.chance3 !== null && MAX_PINS && this.lastFrame)
        || this.frame.chance1 !== null && this.frame.chance2 !== null && this.frame.chance1+ this.frame.chance2 < MAX_PINS
    },
  },

  methods: {
    selectFrame() {
      this.$emit('frameSelected', this.frame.number);
    },
    pinFormat(pin, chance) {
      if (chance === 2 && this.frame.chance1 + pin === MAX_PINS && this.frame.chance1 !== MAX_PINS) {
        return '/';
      } else if (chance === 3 && this.frame.chance2 + pin === MAX_PINS && this.frame.chance2 !== MAX_PINS) {
        return '/';
      } else if ((chance === 2 && this.frame.chance1 === MAX_PINS && !this.lastFrame) || (this.lastFrame && pin === MAX_PINS)) {
        return 'X';
      }
      return this.pinTemplate[pin] || pin;
    },
  },
};
</script>
<style lang="scss">
.frame {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 130px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 2px;

  &.selected {
    cursor: default;
    background: linear-gradient(to bottom, #e5e696 0%, #d1d360 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }

  &__title {
    font-size: 15px;
    width: 100%;
    padding: 5px;
  }

  &__input {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.5);

    & > div {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      //border-top: 1px solid  rgba(0,0,0,0.5);
      &.chance2, &.chance3 {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        border-left: 1px solid rgba(0, 0, 0, 0.5);

      }
    }
  }

  &__score {
    padding: 10px;
    font-size: 15px;
    min-height: 20px;
  }
}
</style>
