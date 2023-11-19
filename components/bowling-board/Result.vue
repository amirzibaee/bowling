<template>
  <div>
    <div class="score">Score: {{ totalScore }}</div>
  </div>
</template>
<script>
export default {
  name: 'Result',
  props: {
    totalScore: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.score {
  font-size: 100px;
  color: #fff;
  text-align: center;
}
</style>
