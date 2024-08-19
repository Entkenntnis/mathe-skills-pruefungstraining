import { makePost } from '@/helper/make-post'
import { App, HistoryEntry } from './types'

export class Uploader {
  userDataUploading: boolean = false
  userDataTimer: null | NodeJS.Timeout = null
  userDataBackoffMs = 1000

  events: Set<number> = new Set()

  counter = 1

  async uploadUserData(app: App) {
    if (this.userDataTimer !== null) {
      clearTimeout(this.userDataTimer)
      this.userDataBackoffMs = 1000
    }
    this.userDataUploading = true
    this.updateStatus(app)
    try {
      const res = await makePost('/store', {
        data: JSON.stringify(app.state.userData),
        token: app.state.token,
      })

      if (res.ok) {
        this.userDataUploading = false
        this.updateStatus(app)
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
    const id = this.counter++
    this.events.add(id)
    this.updateStatus(app)

    const maxRetries = 15
    let attempt = 0
    let success = false

    while (attempt < maxRetries && !success) {
      try {
        const res = await makePost('/storeEvent', {
          data: JSON.stringify(event),
          token: app.state.token,
        })

        // If the request is successful, exit the loop
        success = true

        this.events.delete(id)
        this.updateStatus(app)
        return res
      } catch (error) {
        attempt++
        if (attempt < maxRetries) {
          // Calculate exponential backoff delay: 2^attempt * 100ms
          const delay = Math.pow(2, attempt) * 100
          await new Promise((resolve) => setTimeout(resolve, delay))
        } else {
          // If max retries reached, throw the error
          throw error
        }
      }
    }
  }

  updateStatus(app: App) {
    app.mut((state) => {
      state.uploading = this.userDataUploading || this.events.size > 0
    })
  }
}
