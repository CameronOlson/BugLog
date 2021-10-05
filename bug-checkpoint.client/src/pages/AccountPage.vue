<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }} <br> Here are the bugs you are tracking</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <div class="row">
      <div class="col-10 m-auto">
        <div class="card my-3">
          <div class="card-body">
            <TrackedBugs v-for="t in trackedBugs" :key="t.id" :tracked-bug="t.bug" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { trackedBugsService } from '../services/TrackedBugsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {

  name: 'Account',
  setup() {
    onMounted(async() => {
      try {
        await trackedBugsService.getMyBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      trackedBugs: computed(() => AppState.trackedBugs)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
