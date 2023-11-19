<template>
  <div class="score-box">
    <div class="score-box__board">
      <div class="navigator">
        <nuxt-link to="/">Home</nuxt-link>
      </div>
      <div class="score-box__board__title">
        <h1>Bowling Score Calculator player: {{ player }}</h1>
      </div>
      <div class="score-box__board__frames">
        <!--        <Frame v-for="n in 9" :key="n" :frameNumber="n" @frameSelected="selectFrame($event)" :select="frameSelected === n+1" />-->
        <!--        <Frame :frameNumber="10" :lastFrame="true"/>-->

        <Frame v-for="frame in frames" :lastFrame="frame.number===10" :key="frame.number" :frame="frame"
               @frameSelected="selectFrame"/>
      </div>
      <div class="score-box__board__pin-buttons">
        <PinButtons :frameNumber="frameSelected" @knockDownPins="setPin" @knockClearFrame="clearFrame"
                    :limit="pinsLimited"/>
      </div>

      <div class="score-box__board__result">
        <Result :totalScore="totalScore"/>
      </div>
    </div>
  </div>
</template>
<script>
import Frame from "~/components/bowling-board/Frame.vue";
import PinButtons from "~/components/bowling-board/PinButtons.vue";
import Result from "~/components/bowling-board/Result.vue";

export default {
  name: 'BowlingScore',
  components: {Result, Frame, PinButtons},
  data() {
    return {
      player: '',
      frameSelected: 1,
      pinsLimited: 10,
      totalScore: 0,
      frames: [
        {
          number: 1,
          result: null,
          selected: true,
          chance1: null,
          chance2: null,
        },
        {
          number: 2,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 3,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 4,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 5,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 6,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 7,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 8,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 9,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
        },
        {
          number: 10,
          result: null,
          selected: false,
          chance1: null,
          chance2: null,
          chance3: null,
        },

      ],
    };
  },
  mounted() {
    this.player = this.$route.params.player;
  },
  methods: {
    selectFrame(frameNumber) {
      if (frameNumber > 10) {
        return;
      }
      this.frames.forEach(frame => {
        frame.selected = frame.number === frameNumber;
        if (frame.selected) {
          console.log('selected',frame.number)
          this.frameSelected = frame.number;
          this.checkPinsLimited(frame);
        }
      });

    },
    setPin(pin) {
      const selectedFrame = this.frames.find(frame => frame.selected);
      this.checkRewriteFrame(selectedFrame);
      if (selectedFrame) {
        if (selectedFrame.chance1 === null) {
          selectedFrame.chance1 = pin;
          if (pin === 10) {
            this.selectFrame(selectedFrame.number + 1);
          }
        } else if (selectedFrame.chance2 === null) {
          selectedFrame.chance2 = pin;
          this.selectFrame(selectedFrame.number + 1);
        } else if (selectedFrame.chance3 === null && selectedFrame.number === 10) {
          selectedFrame.chance3 = pin;
        }
        this.checkPinsLimited(selectedFrame);
        this.scoreCalculation();
      }
    },
    checkRewriteFrame(selectedFrame) {
      if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
        this.selectFrame(selectedFrame.number + 1);
      }
    },
    clearFrame() {
      const selectedFrame = this.frames.find(frame => frame.selected);
      if (selectedFrame) {
        if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null && selectedFrame.chance3) {
          selectedFrame.chance3 = null;
        } else if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
          selectedFrame.chance2 = null;
        } else if (selectedFrame.chance1 !== null) {
          selectedFrame.chance1 = null;
        } else if (selectedFrame.number > 1) {
          this.selectFrame(selectedFrame.number - 1);
        }
      }
      this.checkPinsLimited(selectedFrame);
      this.scoreCalculation();
    },
    checkPinsLimited(selectedFrame) {
      console.log('selectedFrame',selectedFrame.number)
      if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
        this.pinsLimited = 10;
      } else if (selectedFrame.chance1 !== null && selectedFrame.chance1 !== 10) {
        this.pinsLimited = 10 - selectedFrame.chance1;
      }else{
        this.pinsLimited = 10;
      }
    },
    scoreCalculation() {
      let totalScore = 0;

      for (let i = 0; i < this.frames.length; i++) {
        const frame = this.frames[i];

        if (frame.chance1 !== null) {
          // Berechnung für den aktuellen Frame
          frame.result = frame.chance1;

          totalScore += frame.result;

          if (frame.number !== 10) {
            // Check for a spare
            if (frame.chance2 !== null && frame.chance1 + frame.chance2 === 10) {
              const nextFrame = this.frames[i + 1];
              if (nextFrame) {
                totalScore += nextFrame.chance1 || 0;
                frame.result += nextFrame.chance1 || 0;
              }
            }

            // Check for a strike
            if (frame.chance1 === 10) {
              const nextFrame = this.frames[i + 1];
              const secondNextFrame = this.frames[i + 2];

              if (nextFrame) {
                totalScore += nextFrame.chance1 || 0;
                frame.result += nextFrame.chance1 || 0;

                if (nextFrame.chance1 === 10 && secondNextFrame) {
                  totalScore += secondNextFrame.chance1 || 0;
                  frame.result += secondNextFrame.chance1 || 0;
                } else {
                  totalScore += nextFrame.chance2 || 0;
                  frame.result += nextFrame.chance2 || 0;
                }
              }
            }
          } else {
            // Special logic for the 10th frame
            totalScore += frame.chance2 || 0;
            frame.result += frame.chance2 || 0;
            totalScore += frame.chance3 || 0;
            frame.result += frame.chance3 || 0;
          }
        }
      }

      this.totalScore = totalScore;
    },

    scoreCalculation2() {
      let totalScore = 0;
      let newFrames = [];

      for (let i = 0; i < this.frames.length; i++) {
        const frame = this.frames[i];
        const nextFrame = this.frames[i + 1];
        const secondNextFrame = this.frames[i + 2];
        if (frame.chance1 === 10){
          if(nextFrame.chance1 === 10){
            if(secondNextFrame.chance1 === 10){
              frame.result = 30;
            }else if(nextFrame.chance1 + nextFrame.chance2 === 10){
              frame.result = 20 + secondNextFrame.chance1;
            }
          }else if(nextFrame.chance1 + nextFrame.chance2 === 10){
            frame.result = 20;
          }else{
            frame.result = 10 + nextFrame.chance1 + nextFrame.chance2;
          }
        }else if(frame.chance1 + frame.chance2 === 10){
          frame.result = 10 + nextFrame.chance1;
        }else{
          frame.result = frame.chance1 + frame.chance2;
        }

        newFrames.push(frame);

      }

      this.frames = newFrames;

      this.totalScore = totalScore;
    },

    scoreCalculation1() {
      let totalScore = 0;

      for (let i = 0; i < this.frames.length; i++) {
        const frame = this.frames[i];

        if (frame.chance1 !== null) {
          totalScore += frame.chance1;

          if (frame.number !== 10) {
            // Check for a spare
            if (frame.chance2 !== null && frame.chance1 + frame.chance2 === 10) {
              const nextFrame = this.frames[i + 1];
              if (nextFrame) {
                totalScore += nextFrame.chance1 || 0;
              }
            }

            // Check for a strike
            if (frame.chance1 === 10) {
              const nextFrame = this.frames[i + 1];
              const secondNextFrame = this.frames[i + 2];

              if (nextFrame) {
                totalScore += nextFrame.chance1 || 0;

                if (nextFrame.chance1 === 10 && secondNextFrame) {
                  totalScore += secondNextFrame.chance1 || 0;
                } else {
                  totalScore += nextFrame.chance2 || 0;
                }
              }
            }
          } else {
            // Special logic for the 10th frame
            totalScore += frame.chance2 || 0;
            totalScore += frame.chance3 || 0;
          }
        }
      }

      this.totalScore = totalScore;
    },

  }

}
</script>
<style lang="scss">
.score-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
  font-family: Arial, Helvetica, sans-serif;

  h1 {
    color: #fff;
    font-size: 40px;
    margin-bottom: 20px;
  }

  &__board {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: fit-content;
    flex-wrap: wrap;
    padding: 20px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#63b6db+0,309dcf+100;Blue+3D+%234 */
    background: linear-gradient(to bottom, #63b6db 0%, #309dcf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    border-radius: 5px;

    &__frames {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
    }

    &__pin-buttons {
      padding: 10px;
    }

    .navigator {
      width: 100%;
      text-align: left;

      a {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        text-decoration: none;

        &:hover {
          color: #0070f3;
        }
      }
    }

  }
}
</style>
