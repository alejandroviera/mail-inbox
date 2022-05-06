import { reactive } from 'vue'
import { EmailData } from '@/model/EmailData'

const emails = reactive(new Set())

export default function emailSelection() {
  const toggle = function (email: EmailData) {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  return { emails, toggle }
}
