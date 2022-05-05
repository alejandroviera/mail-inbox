<script lang="ts" setup>
import emailData from '@/email-data'
import { reactive } from 'vue'
import { format } from 'date-fns'

const emails = reactive(emailData.emails)

function markRead(email: any) {
  debugger
  email.read = true
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
      </tr>
    </thead>
    <tr
      v-for="email of emails"
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
