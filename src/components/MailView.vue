<script lang="ts" setup>
import { EmailData } from '@/model/EmailData'
import { defineProps, defineEmits } from 'vue'
import { format } from 'date-fns'
import { marked } from 'marked'
import useKeydown from '@/composables/useKeydown'

export interface MailViewProps {
  email: EmailData
}

defineProps<MailViewProps>()
const emit = defineEmits(['changeEmail', 'toggleRead', 'toggleArchive'])

function toggleRead() {
  emit('toggleRead')
}

function toggleArchive() {
  emit('toggleArchive')
}

function goNext() {
  emit('changeEmail', { changeIndex: 1 })
}

function goPrevious() {
  emit('changeEmail', { changeIndex: -1 })
}

useKeydown([
  { keyPressed: 'r', fn: toggleRead },
  { keyPressed: 'e', fn: toggleArchive },
  { keyPressed: 'k', fn: goNext },
  { keyPressed: 'j', fn: goPrevious },
])
</script>

<template>
  <div class="email-display">
    <v-toolbar>
      <v-btn @click="toggleArchive"
        ><v-icon>{{
          email.archived ? 'mdi-package-up' : 'mdi-package-down'
        }}</v-icon
        >{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</v-btn
      >
      <v-btn @click="toggleRead"
        ><v-icon>{{ email.read ? 'mdi-email' : 'mdi-email-open' }}</v-icon
        >{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn icon @click="goPrevious"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-btn icon @click="goNext"><v-icon>mdi-arrow-right</v-icon></v-btn>
    </v-toolbar>
    <v-card variant="text">
      <v-card-title>{{ email.subject }}</v-card-title>
      <v-card-subtitle
        >From: {{ email.from }} on
        {{
          format(new Date(email.sentAt), 'MMM do yyyy HH:MM')
        }}</v-card-subtitle
      >
      <v-card-text>
        <div class="email-body" v-html="marked(email.body)"></div>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
/* Email Modal */
.email-display {
  text-align: left;
}

.v-card-subtitle {
  font-style: italic;
}

.email-body p {
  margin-top: 5pt;
  margin-block-start: 2rem;
}
</style>
