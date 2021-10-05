<template>
  <div class="keep-in-line">
    <img :src="tracker.tracker.picture" alt="" width="40">
  </div>
</template>

<script>
export default {
  props: {
    tracker: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.tracker-img{
  border-radius: 50%;
  width: 30px;
}

.keep-in-line{
  display: flex;

}

</style>
