import { Auth0Provider } from '@bcwdev/auth0provider'
import { trackedBugsService } from '../services/TrackedBugsService'
import BaseController from '../utils/BaseController'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('')
    this.router
      .get('/api/bugs/:bugId/trackedbugs', this.getTrackingUsers)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/account/trackedbugs', this.getMyBugs)
      .post('/api/trackedbugs', this.createTrackedBug)
      .delete('/api/trackedbugs/:trackedbugId', this.removeTrackedBug)
  }

  async getMyBugs(req, res, next) {
    try {
      const myBugs = await trackedBugsService.getMyBugs(req.userInfo.id)
      res.send(myBugs)
    } catch (error) {
      next(error)
    }
  }

  async removeTrackedBug(req, res, next) {
    try {
      const trackedBug = await trackedBugsService.removeTrackedBug(req.userInfo.id, req.params.trackedbugId)
      res.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      res.send(await trackedBugsService.createTrackedBug(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getTrackingUsers(req, res, next) {
    try {
      const trackingUsers = await trackedBugsService.getTrackingUsers(req.params.bugId, req.userInfo.id)
      res.send(trackingUsers)
    } catch (error) {
      next(error)
    }
  }
}
