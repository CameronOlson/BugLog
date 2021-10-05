<template>
  <div class="col-sm-12 col-md-6">
    <div class="card m-3 shadow">
      <div class="card-body selectable p-3">
        <router-link :to="{name: 'Bug', params: {bugId: bug.id}}">
          <div class="color-og">
            <div class="center-this">
              <h3>
                {{ bug.title }}
              </h3>

              <span>
                {{ bug.creator.name }}
                <img :src="bug.creator.picture" alt="" height="30" class="circle">
              </span>
            </div>
            <div>
              {{ bug.description }}
            </div>

            <div v-if="bug.priority === 5" class="bg-danger f-16">
              Priority: {{ bug.priority }}
            </div>
            <div v-else class="">
              Priority: {{ bug.priority }}
            </div>
            <div>
              Created At: {{ new Date(bug.updatedAt).toLocaleString() }}
            </div>
            <div v-if="bug.closed === true" class="bg-success">
              Status: Closed
            </div>
            <div v-else class="bg-warning">
              Status: Open
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { bugsService } from '../services/BugsService'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    return {
      async removeBug() {
        if (await Pop.confirm()) {
          try {
            await bugsService.removeBug(route.params.bugId)
            Pop.toast('this has been removed')
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },

      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-og{
  color: darkblue;
}
.center-this{
  display: flex;
  justify-content: space-between;
}
.circle{
  border-radius: 50%;
}
.outline-og{
  outline: 3px;
}

</style>
