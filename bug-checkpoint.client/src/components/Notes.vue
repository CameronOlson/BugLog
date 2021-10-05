<template>
  <div class="card mt-2">
    <div class="card-body">
      <div class="col-10 keep-inline">
        <div>
          <img class="small-pic" :src="note.creator.picture" alt="">
          <p><strong>{{ note.creator.name }}</strong></p>
        </div>
        <div class="ms-2">
          <p>{{ note.body }}</p>
        </div>
      </div>
      <div class="row text-end">
        <div>
          <button class="btn btn-primary" v-if="account.id == note.creatorId" @click="deleteNote()">
            Delete Note
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteNote() {
        if (await Pop.confirm()) {
          try {
            await notesService.deleteNote(props.note.id)
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
.keep-inline{
  display: flex;
   align-items: flex-start;
}
.small-pic{
  width: 40px;
  border-radius: 50%;
}

</style>
