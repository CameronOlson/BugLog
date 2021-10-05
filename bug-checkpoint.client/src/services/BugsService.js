import { AppState } from '../AppState'

import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    logger.log('this is the GetBugs', res.data)
    AppState.bugs = res.data
  }

  async getBugById(bugId) {
    const res = await api.get('api/bugs/' + bugId)
    logger.log('this is one bug', res.data)
    AppState.bug = res.data
  }

  async createBug(bugData) {
    const res = await api.post('api/bugs', bugData)
    logger.log('this is the created bug data', res.data)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async removeBug(bugId) {
    const res = await api.delete('api/bugs/' + bugId)
    logger.log('remove bug res', res.data.closed)
    AppState.bugs = AppState.bugs.filter(b => b.id !== bugId)
    this.getBugById(bugId)
  }

  async trackBugByBugId(bugId) {
    const res = await api.post('api/trackedbugs', { bugId: bugId })
    logger.log('you are tracking this bug', res.data)
    AppState.trackers.push(res.data)
  }

  async getTrackersByBugId(bugId) {
    const res = await api.get('/api/bugs/' + bugId + '/trackedbugs')
    logger.log('these are all the trackers', res.data)
    AppState.trackers = res.data
  }

  async editBug(bugId, bugData) {
    const res = await api.put('api/bugs/' + bugId, bugData)
    logger.log('this is the created bug data', res.data)
    AppState.bugs.push(res.data)
    this.getBugById(res.data.id)
    return res.data.id
  }
}
export const bugsService = new BugsService()
