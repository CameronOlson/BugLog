<template>
  <form @submit.prevent="createBug()">
    <div class="form-group">
      <label for="title">
        <input type="text"
               for="title"
               class="form-control bg-light"
               placeholder="Bug Title"
               v-model="editable.title"
               required
        >
      </label>
    </div>
    <div class="input-group">
      <label for="description">
        <textarea type="text"
                  for="description"
                  v-model="editable.description"
                  class="form-control mt-2 bg-light"
                  placeholder="description"
                  aria-label="With textarea"
                  required
        ></textarea>
      </label>
    </div>
    <div class="input-group">
      <label for="priority">
        <input type="number"
               min="1"
               max="5"
               for="priority"
               v-model="editable.priority"
               class="form-control mt-2 bg-light"
               placeholder="priority"
               aria-label="With textarea"
               required
        >
      </label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Project
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { bugsService } from '../services/BugsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,

      async createBug() {
        const bug = await bugsService.createBug(editable.value)
        const modal = Modal.getInstance(document.getElementById('bug-form'))
        modal.hide()
        router.push({
          name: 'Bug',
          params: { bugId: bug }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
