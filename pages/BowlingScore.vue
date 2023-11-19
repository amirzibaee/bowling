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
        <Frame
          v-for="frame in frames"
          :lastFrame="frame.number===maxFrames"
          :key="frame.number"
          :frame="frame"
          :maxPins="pinsLimited"
          @frameSelected="selectFrame"
        />
      </div>
      <div class="score-box__board__pin-buttons">
        <PinButtons :frameNumber="frameSelected" @knockDownPins="setPin" @knockClearFrame="clearFrame"
                    :limit="pinsLimited"/>
      </div>

      <div class="score-box__board__result">
        <Result :totalScore="totalScore" v-if="showTotalScore"/>
      </div>
    </div>
  </div>
</template>
<script>
import Frame from "~/components/bowling-board/Frame.vue";
import PinButtons from "~/components/bowling-board/PinButtons.vue";
import Result from "~/components/bowling-board/Result.vue";


const MAX_FRAMES = 10;
const MAX_PINS = 10;
const STRIKE = 10;
export default {
  name: 'BowlingScore',
  components: {Result, Frame, PinButtons},
  data() {
    return {
      frameSelected: 1,
      pinsLimited: MAX_PINS,
      totalScore: 0,
      frames: [],
    };
  },
  mounted() {
    this.createFrames();
  },
  computed: {
    maxFrames() {
      return MAX_FRAMES;
    },
    showTotalScore() {
      return this.frames.every(frame => frame.result !== null);
    },
    player() {
      return localStorage.getItem('player');
    }
  },
  methods: {

    // Creates the initial set of frames for the bowling game
    createFrames() {
      let newFrames = [];
      for (let frameIndex = 1; frameIndex <= MAX_FRAMES; frameIndex++) {
        newFrames.push({
          number: frameIndex,
          selected: frameIndex === 1,
          chance1: null,
          chance2: null,
          chance3: null,
          result: null
        });
      }
      this.frames = newFrames;
    },

    // Selects a bowling frame based on the frameNumber
    selectFrame(frameNumber) {
      if (frameNumber > MAX_FRAMES) {
        return; // Avoid selecting frames beyond the maximum allowed
      }
      this.frames.forEach(frame => {
        frame.selected = frame.number === frameNumber;
        if (frame.selected) {
          this.frameSelected = frame.number;
          this.checkPinsLimited(frame);
        }
      });

    },

    // Sets the pin for the currently selected frame
    setPin(pin) {
      const selectedFrame = this.frames.find(frame => frame.selected);

      if (!selectedFrame) {
        return; // If no frame is selected, do nothing
      }

      this.checkRewriteFrame(selectedFrame);

      // Handle pin setting based on the chances in the frame
      if (selectedFrame.chance1 === null) {
        selectedFrame.chance1 = pin;
        this.handleStrike(pin, selectedFrame);
      } else if (selectedFrame.chance2 === null) {
        selectedFrame.chance2 = pin;
        this.handleSecondChance(pin, selectedFrame);
      } else if (selectedFrame.chance3 === null && selectedFrame.number === MAX_FRAMES) {
        selectedFrame.chance3 = pin;
      }

      this.checkPinsLimited(selectedFrame);
      this.scoreCalculation(); // Update the score after setting the pin
    },

    // Handles the case when a strike is scored, moving to the next frame if needed
    handleStrike(pin, selectedFrame) {
      if (pin === STRIKE && selectedFrame.number !== MAX_FRAMES) {
        this.selectFrame(selectedFrame.number + 1);
      }
    },

    // Handles the second chance in a frame, moving to the next frame if needed
    handleSecondChance(pin, selectedFrame) {
      if (selectedFrame.number < MAX_FRAMES) {
        this.selectFrame(selectedFrame.number + 1);
      }
    },

    // Checks if the selected frame needs to be rewritten (move to the next frame)
    checkRewriteFrame(selectedFrame) {
      if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
        this.selectFrame(selectedFrame.number + 1);
      }
    },

    // Clears the pins for the currently selected frame and performs necessary actions
    clearFrame() {
      const selectedFrame = this.frames.find(frame => frame.selected);
      if (selectedFrame) {
        // Clear the pins based on the chances in the frame
        if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null && selectedFrame.chance3) {
          selectedFrame.chance3 = null;
        } else if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
          selectedFrame.chance2 = null;
        } else if (selectedFrame.chance1 !== null) {
          selectedFrame.chance1 = null;
        } else if (selectedFrame.number > 1) {
          // Move to the previous frame if available
          this.selectFrame(selectedFrame.number - 1);
        }
      }

      // Update the pins limit and recalculate the score
      this.checkPinsLimited(selectedFrame);
      this.scoreCalculation();
    },

    // Checks and updates the pins limit based on the selected frame's state
    checkPinsLimited(selectedFrame) {
      if (selectedFrame.number < MAX_FRAMES) {
        // Handling pins limit for frames before the last frame
        if (selectedFrame.chance1 !== null && selectedFrame.chance2 !== null) {
          this.pinsLimited = MAX_PINS;
        } else if (selectedFrame.chance1 !== null && selectedFrame.chance1 !== MAX_PINS) {
          this.pinsLimited = MAX_PINS - selectedFrame.chance1;
        } else {
          this.pinsLimited = MAX_PINS; // Default pins limit
        }
      } else {
        // Handling pins limit for the last frame
        if (selectedFrame.chance1 < MAX_PINS && selectedFrame.chance2 === null) {
          this.pinsLimited = MAX_PINS - selectedFrame.chance1;  // Set pins limit based on the first chance taken
        } else if (selectedFrame.chance1 === MAX_PINS && selectedFrame.chance2 === null) {
          this.pinsLimited = MAX_PINS; // If the first chance is a strike, set pins limit to the maximum
        } else if (selectedFrame.chance1 === MAX_PINS && selectedFrame.chance2 < MAX_PINS && selectedFrame.chance3 === null) {
          this.pinsLimited = MAX_PINS - selectedFrame.chance2; // Set pins limit based on the second chance taken
        } else if (selectedFrame.chance1 + selectedFrame.chance2 === MAX_PINS || (selectedFrame.chance1 === MAX_PINS && selectedFrame.chance2 === null) || selectedFrame.chance1 + selectedFrame.chance2 === (MAX_PINS * 2)) {
          this.pinsLimited = MAX_PINS; // If a spare or strike is scored, set pins limit to the maximum
        } else {
          this.pinsLimited = 0; // If none of the above conditions are met, no more pins can be knocked down
        }
      }
    },

    // Calculates the score for the bowling game
    scoreCalculation() {
      let totalScore = 0;
      let newFrames = [];

      // Calculate the score for each frame
      for (let frameIndex = 0; frameIndex < MAX_FRAMES; frameIndex++) {
        const beforeFrame = this.frames[frameIndex - 1];
        const frame = this.frames[frameIndex];
        const nextFrame = this.frames[frameIndex + 1];
        const secondNextFrame = this.frames[frameIndex + 2];

        // Calculate the score for the current frame based on the chances in the frame
        if (frameIndex < MAX_FRAMES - 1) {
          const isStrike = frame.chance1 === MAX_PINS;
          const isSpare = frame.chance1 + frame.chance2 === MAX_PINS;

          if (isStrike) {
            frame.result = this.calculateStrikeScore(frameIndex, beforeFrame, nextFrame, secondNextFrame);
          } else if (isSpare) {
            frame.result = this.calculateSpareScore(frameIndex, beforeFrame, nextFrame);
          } else {
            frame.result = this.calculateNormalScore(frameIndex, frame, beforeFrame);
          }
        } else { // only last frame -> i===9
          frame.result = beforeFrame.result + frame.chance1 + frame.chance2 + frame.chance3;
        }

        totalScore = frame.result !== null ? frame.result : totalScore;
        newFrames.push(frame);
      }

      this.frames = newFrames;
      this.totalScore = totalScore;
    },

    calculateStrikeScore(frameIndex, beforeFrame, nextFrame, secondNextFrame) {
      if (nextFrame.chance1 === MAX_PINS) {
        if (frameIndex < MAX_FRAMES - 2) {
          if (secondNextFrame.chance1 === MAX_PINS) {
            if (frameIndex > 0) {
              return beforeFrame.result + (MAX_PINS * 3);
            } else {
              return MAX_PINS * 3;
            }
          } else if (nextFrame.chance1 + nextFrame.chance2 === MAX_PINS) {
            if (frameIndex > 0) {
              return beforeFrame.result + (MAX_PINS * 2) + secondNextFrame.chance1;
            } else {
              return (MAX_PINS * 2) + secondNextFrame.chance1;
            }
          }
        } else {
          if (frameIndex > 0) {
            return beforeFrame.result + MAX_PINS + nextFrame.chance1 + nextFrame.chance2;
          } else {
            return (MAX_PINS * 2) + secondNextFrame.chance1;
          }
        }
      } else if (frameIndex < MAX_FRAMES - 1 && nextFrame.chance1 + nextFrame.chance2 === MAX_PINS) {
        if (frameIndex > 0) {
          return beforeFrame.result + (MAX_PINS * 2);
        } else {
          return MAX_PINS * 2;
        }
      } else if (frameIndex < MAX_FRAMES - 1) {
        if (frameIndex > 0) {
          return beforeFrame.result + MAX_PINS + nextFrame.chance1 + nextFrame.chance2;
        } else {
          return MAX_PINS + nextFrame.chance1 + nextFrame.chance2;
        }
      }
    },

    calculateSpareScore(frameIndex, beforeFrame, nextFrame) {
      if (frameIndex > 0) {
        return beforeFrame.result + MAX_PINS + nextFrame.chance1;
      } else {
        return MAX_PINS + nextFrame.chance1;
      }
    },

    calculateNormalScore(frameIndex, frame, beforeFrame) {
      if (frameIndex > 0) {
        return beforeFrame.result + frame.chance1 + frame.chance2;
      } else {
        return frame.chance1 + frame.chance2;
      }
    }
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
