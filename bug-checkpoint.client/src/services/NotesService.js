import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api('api/bugs/' + bugId + '/notes')
    logger.log('here are the notes', res.data)
    AppState.notes = res.data
  }

  async createNote(noteData) {
    const res = await api.post('api/notes', noteData)
    logger.log('this is from the noteService', res.data)
    AppState.notes.push(res.data)
    return res.data
  }

  async deleteNote(noteId) {
    const res = await api.delete('/api/notes/' + noteId)
    logger.log('this is from the delete note', res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const notesService = new NotesService()
