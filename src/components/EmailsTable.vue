<script lang="ts" setup>
import { EmailData } from '@/model/EmailData'
import { computed, reactive } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'

let response = await axios.get('http://localhost:3000/emails')
const emails = reactive(response.data)

const sortedEmails = computed(() => {
  return (emails as EmailData[]).sort((e1: EmailData, e2: EmailData) => {
    return e1.sentAt < e2.sentAt ? 1 : -1
  })
})

const unarchivedEmails = computed(() => {
  return sortedEmails.value.filter((e) => !e.archived)
})

function markRead(email: EmailData) {
  email.read = true
  axios.put(`http://localhost:3000/emails/${email.id}`, email)
}
function archive(email: EmailData) {
  email.archived = true
}
</script>

<template>
  <v-table class="mail-table">
    <thead>
      <tr>
        <th></th>
        <th>From</th>
        <th style="width: 30%">Subject</th>
        <th>Body</th>
        <th style="width: 150px">Date</th>
        <th></th>
      </tr>
    </thead>
    <tr
      v-for="email of unarchivedEmails"
      :key="email.id"
      :class="['clickable', email.read ? 'read' : '']"
      @click="markRead(email)"
    >
      <td>
        <div>
          <v-checkbox style="grid-template-rows: auto 0"></v-checkbox>
        </div>
      </td>
      <td>{{ email.from }}</td>
      <td class="subject">
        <div class="content">{{ email.subject }}</div>
      </td>
      <td>
        <div class="content">{{ email.body }}</div>
      </td>
      <td>{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
      <td>
        <v-btn @click="archive(email)">Archive</v-btn>
      </td>
    </tr>
  </v-table>
</template>
<style scoped>
/* Mail Table */
.mail-table {
  max-width: 1400px;
  margin: auto;
  border-collapse: collapse;
}
.mail-table .subject {
  font-weight: bold;
}
.mail-table .content {
  overflow: hidden;
  height: 20px;
}
.mail-table tr.read {
  background-color: #eee;
}
.mail-table tr {
  max-height: 20px;
}
.mail-table td {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: left;
}
.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}
.mail-table td p {
  max-height: 1.2em;
  overflow-y: hidden;
  margin: 0;
}
.mail-table td.date {
  width: 120px;
}
</style>
