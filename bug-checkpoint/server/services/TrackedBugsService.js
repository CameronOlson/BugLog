import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TrackedBugsService {
  async getMyBugs(userId) {
    const myBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug').populate('tracker')
    if (!myBugs) {
      throw new BadRequest('no matching BacklogItems')
    }
    return myBugs
  }

  async removeTrackedBug(userId, trackedBugId) {
    const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
    if (userId !== trackedBug.accountId.toString()) {
      throw new Forbidden('You do not have that authority')
    }
    await trackedBug.delete()
    return trackedBug
  }

  // REVIEW know the formating of key and value                  VVVVVVVVVVVVVVV
  async createTrackedBug(body) {
    const foundBug = await dbContext.TrackedBugs.findOne({ bugId: body.bugId, accountId: body.accountId })
    if (!foundBug) {
      const trackedBug = await dbContext.TrackedBugs.create(body)
      await trackedBug.populate('bug')
      await trackedBug.populate('tracker')
      return trackedBug
    }
    throw new BadRequest('already tracking')
  }

  async getTrackingUsers(bugId, userId) {
    const trackingUsers = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('bug').populate('tracker')
    if (!trackingUsers) {
      throw new BadRequest('no matching BacklogItems')
    }
    return trackingUsers
  }
}
export const trackedBugsService = new TrackedBugsService()
