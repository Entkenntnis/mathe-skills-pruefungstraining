import { makePost } from '@/helper/make-post'
import { App, HistoryEntry } from './types'

export class Uploader {
  userDataUploading: boolean = false
  userDataTimer: null | NodeJS.Timeout = null
  userDataBackoffMs = 1000

  async uploadUserData(app: App) {
    if (this.userDataTimer !== null) {
      clearTimeout(this.userDataTimer)
      this.userDataBackoffMs = 1000
    }
    this.userDataUploading = true
    app.rerender()
    try {
      const res = await makePost('/store', {
        data: JSON.stringify(app.state.userData),
        token: app.state.token,
      })
      if (res.ok) {
        this.userDataUploading = false
        app.rerender()
        return
      }
    } catch (e) {}
    // upload failed, retry with backoff
    this.userDataTimer = setTimeout(() => {
      void this.uploadUserData(app)
    }, this.userDataBackoffMs)
    this.userDataBackoffMs *= 2
  }

  async uploadEvent(app: App, event: HistoryEntry) {
    app.mut((state) => {
      state.history.push(event)
    })
    // TODO: retry
    const res = await makePost('/storeEvent', {
      data: JSON.stringify(event),
      token: app.state.token,
    })
  }

  hasUpload() {
    return this.userDataUploading
  }
}
