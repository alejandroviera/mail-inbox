import { reactive } from 'vue'
import { EmailData } from '@/model/EmailData'
import axios from 'axios'

const emails = reactive(new Set<EmailData>())

export default function emailSelection() {
  const toggle = function (email: EmailData) {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  const clear = function () {
    emails.clear()
  }

  const addMultiple = function (emailsToAdd: EmailData[]) {
    emailsToAdd.forEach((email) => emails.add(email))
  }

  const bulkOperation = function (fn: (email: EmailData) => void) {
    emails.forEach((email) => {
      fn(email)
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }

  const markRead = () => bulkOperation((email) => (email.read = true))
  const markUnread = () => bulkOperation((email) => (email.read = false))
  const archive = () =>
    bulkOperation((email) => {
      email.archived = true
      clear()
    })

  return { emails, toggle, clear, addMultiple, markRead, markUnread, archive }
}
