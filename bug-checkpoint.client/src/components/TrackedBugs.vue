<template>
  <div>
    <div class="card m-2">
      <div class="card-body get-inline">
        <div>
          <h4>{{ trackedBug.title }}</h4>
        </div>
        <div>
          <p>{{ trackedBug.description }}</p>
        </div>
        <div>
          <h6>
            Priority <br>
            {{ trackedBug.priority }}
          </h6>
        </div>
      </div>
      <button @click="deleteTrackedBug" class="btn btn-primary">
        Remove Tracked Bug
      </button>
    </div>
  </div>
</template>

<script>
import { trackedBugsService } from '../services/TrackedBugsService'
export default {
  props: {
    trackedBug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteTrackedBug() {
        console.log(props.trackedBug.id)
        await trackedBugsService.deleteTrackedBug(props.trackedBug.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.get-inline{
  display: flex;
  justify-content: space-around;
}

</style>
