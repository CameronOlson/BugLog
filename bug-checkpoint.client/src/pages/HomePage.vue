<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-2 center-this">
        <div><h1>Bug Logger</h1></div>
      </div>
    </div>
    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="col-12 center-this">
            <button class="btn btn-primary selectable" @click="toggleAscending">
              Sort by priority
            </button>

            <button class="btn btn-primary selectable" @click="closedFilter = !closedFilter">
              Toggle Open Bugs
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 center-this py-3">
          <button v-if="user.isAuthenticated" class=" btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#bug-form">
            Create Bug
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <BugCard v-for="b in bugs" :key="b.id" :bug="b" />
    </div>
  </div>
  <footer>
    <Modal id="bug-form">
      <template #modal-title>
        <h4>Bug Form</h4>
      </template>
      <template #modal-body>
        <BugForm />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    const ascending = ref(true)
    const closedFilter = ref(false)

    function closedFilterFunction(b) {
      if (closedFilter.value) {
        return b.closed === false
      }
      return true
    }

    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    function prioritySorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }
    return {
      ascending,
      closedFilter,
      bugs: computed(() => AppState.bugs.filter(closedFilterFunction).sort(prioritySorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      },
      user: computed(() => AppState.user)
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.center-this{
display: flex;
justify-content: space-around;
}

</style>
