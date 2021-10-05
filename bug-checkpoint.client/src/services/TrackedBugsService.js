import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TrackedBugsService {
  async getMyBugs() {
    const res = await api.get('/account/trackedbugs')
    logger.log('this is get my bugs function', res.data)
    AppState.trackedBugs = res.data
  }

  async deleteTrackedBug(trackedBugId) {
    const res = await api.delete('/api/trackedbugs/' + trackedBugId)
    logger.log('this is the delete tracked bug', res.data)
    AppState.trackedBugs = AppState.trackedBugs.filter(t => t.id !== trackedBugId)
  }
}
export const trackedBugsService = new TrackedBugsService()
