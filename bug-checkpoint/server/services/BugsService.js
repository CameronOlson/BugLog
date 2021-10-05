import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden("you aren't allowed to do that!!")
    }
    if (bug.closed === false) {
      bug.closed = true
    } else {
      bug.closed = false
    }
    await bug.save()
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator', 'name picture')
    return bug
  }

  async getBugs(query = {}) {
    const projects = await dbContext.Bugs.find(query).sort('-updatedAt').populate('creator', 'name picture')
    if (!projects) {
      throw new BadRequest('no matching project')
    }
    return projects
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('this is not the right bug ID')
    }
    return bug
  }

  async editBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString() || bug.closed === true) {
      throw new Forbidden("you aren't allowed to do that!")
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    await bug.save()
    return bug
  }
}
export const bugsService = new BugsService()
