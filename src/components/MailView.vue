<script lang="ts" setup>
import { EmailData } from '@/model/EmailData'
import { defineProps } from 'vue'
import { format } from 'date-fns'
import { marked } from 'marked'

export interface MailViewProps {
  email: EmailData
}

defineProps<MailViewProps>()
</script>

<template>
  <div class="email-display">
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
