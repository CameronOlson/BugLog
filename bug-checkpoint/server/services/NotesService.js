import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async removeNote(noteId, userId) {
    const note = await dbContext.Notes.findById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden("you aren't allowed to do that!!")
    }
    await note.delete()
    return note
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('there is no note ')
    }
    return note
  }

  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId }).populate('creator', 'name picture')
    if (!notes) {
      throw new BadRequest('no matching BacklogItems')
    }
    return notes
  }
}

export const notesService = new NotesService()
