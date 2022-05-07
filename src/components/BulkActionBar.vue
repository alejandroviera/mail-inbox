<script lang="ts" setup>
import useEmailSelection from '@/composables/useEmailSelection'
import { defineProps, computed, toRefs } from 'vue'
import { EmailData } from '@/model/EmailData'

export interface BulkActionProps {
  emails: EmailData[]
}

const props = defineProps<BulkActionProps>()
const emailSelection = useEmailSelection()
const numberSelected = computed(() => emailSelection.emails.size)
const totalEmails = computed(() => toRefs(props).emails.value.length)
const allEmailsSelected = computed(
  () => numberSelected.value === totalEmails.value
)
const someEmailsSelected = computed(
  () => numberSelected.value > 0 && numberSelected.value < totalEmails.value
)

function selectAll() {
  if (allEmailsSelected.value) {
    emailSelection.clear()
  } else {
    emailSelection.addMultiple(props.emails)
  }
}
</script>
<template>
  <v-toolbar class="bulk-action-bar">
    <v-toolbar-items>
      <v-checkbox
        style="grid-template-rows: auto 0; flex: 0 1 auto"
        :indeterminate="someEmailsSelected"
        v-model="allEmailsSelected"
        label="."
        @click="selectAll"
      >
      </v-checkbox>
      <v-btn
        variant="outlined"
        @click="emailSelection.markRead()"
        :disabled="[...emailSelection.emails].every((e) => e.read)"
        ><v-icon>mdi-email-open</v-icon>Mark Read</v-btn
      >
      <v-btn
        variant="outlined"
        @click="emailSelection.markUnread()"
        :disabled="[...emailSelection.emails].every((e) => !e.read)"
        ><v-icon>mdi-email</v-icon>Mark Unread</v-btn
      >
      <v-btn
        variant="outlined"
        @click="emailSelection.archive()"
        :disabled="numberSelected === 0"
        ><v-icon>mdi-package-down</v-icon>Archive</v-btn
      >
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <div>{{ emailSelection.emails.size }} emails selected</div>
  </v-toolbar>
</template>
<style scoped>
.partial-check input {
  background: #abc;
}

/* Bulk Action Bar */
.bulk-action-bar {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  text-align: left;
  padding-inline-start: 0px;
}
.bulk-action-bar input {
  margin: 5px;
}
.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
}
</style>
