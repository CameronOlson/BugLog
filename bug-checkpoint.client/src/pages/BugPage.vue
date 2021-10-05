<template>
  <div v-if="bug.creator">
    <div class="container-fluid px-5">
      <div class="row pt-3 mx-5">
        <div class="col-8 align-this">
          <div>
            <h2>{{ bug.title }}</h2>
          </div>
          <div>
            <button v-if="bug.closed === false && account.id === bug.creatorId" class="ps-0 ms-0" type="button" data-bs-toggle="modal" data-bs-target="#edit-form">
              <i class="mdi mdi-lead-pencil f-18" title="Edit Form"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card p-3">
          <div class="col-12 center-this">
            <div>
              <img class="small-pic" :src="bug.creator.picture" alt="this should be a picture"><h6>{{ bug.creator.name }}</h6>
            </div>
            <div>
              <span>Priority: <strong>{{ bug.priority }}</strong></span>
            </div>
            <div><p> Updated At: <strong>{{ new Date(bug.updatedAt).toLocaleString() }}</strong></p></div>
            <div>
              <span v-if="bug.closed === true && account.id === bug.creatorId">
                <button class="btn btn-primary" @click="toggleClosed()">
                  Open
                </button>
              </span>
              <span v-else-if="bug.closed === false && account.id === bug.creatorId">
                <button class="btn btn-primary" @click="toggleClosed()">
                  Close
                </button>
              </span>
              <span v-else></span>
            </div>
          </div>
          <p>{{ bug.description }}</p>

          <div>
            <button class="btn btn-primary" @click="trackBug()">
              Track Bug
            </button>
          </div>
        </div>

        <div class="card-body">
          Tracking: <Tracker v-for="t in trackers" :key="t.id" :tracker="t" />
        </div>
      </div>
    </div>
    <div class="col-10 m-auto">
      <div class="card">
        <div class="card-body">
          <button class=" btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#note-form">
            Create Note
          </button>
          <h3>Notes:</h3>
          <div>
            <Notes v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    ...Loading
  </div>
  <footer>
    <Modal id="note-form">
      <template #modal-title>
        <h4>Note Form</h4>
      </template>
      <template #modal-body>
        <NoteForm />
      </template>
    </Modal>
    <Modal id="edit-form">
      <template #modal-title>
        <h4>Edit</h4>
      </template>
      <template #modal-body>
        <EditForm />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Bug',
  setup() {
    const route = useRoute()

    watchEffect(async() => {
      if (route.params.bugId) {
        AppState.bug = {}
        AppState.notes = []
        AppState.trackers = []
        try {
          await bugsService.getBugById(route.params.bugId)
          await bugsService.getTrackersByBugId(route.params.bugId)
          await notesService.getNotesByBugId(route.params.bugId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    const account = computed(() => AppState.account)
    return {
      async toggleClosed() {
        await bugsService.removeBug(route.params.bugId)
      },
      async trackBug() {
        try {
          await bugsService.trackBugByBugId(route.params.bugId)
        } catch (error) {
          Pop.toast('you are already tracking this', 'error')
        }
      },
      account,
      users: computed(() => AppState.users),
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      trackers: computed(() => AppState.trackers)

    }
  }
}
</script>

<style lang="scss" scoped>
.small-pic{
  width: 60px;
  border-radius: 50%;
}
.smaller-pic{
  width: 40px;
  border-radius: 50%;
}
.center-this{
  display: flex;
  justify-content: space-between;
}
.align-this{
  display: flex;
  align-items: start;
}

</style>
