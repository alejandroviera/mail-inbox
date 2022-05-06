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
const totalEmails = toRefs(props).emails.value.length
const allEmailsSelected = computed(() => numberSelected.value === totalEmails)
const someEmailsSelected = computed(
  () => numberSelected.value > 0 && numberSelected.value < totalEmails
)

function selectAll() {
  debugger
  if (allEmailsSelected.value) {
    emailSelection.clear()
  } else {
    emailSelection.addMultiple(props.emails)
  }
}
</script>
<template>
  <div class="bulk-action-bar">
    {{ emailSelection.emails.size }} emails selected
    <v-checkbox
      :indeterminate="someEmailsSelected"
      v-model="allEmailsSelected"
      @click="selectAll"
    ></v-checkbox>
  </div>
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
  padding-bottom: 8px;
}
.bulk-action-bar input {
  margin: 5px;
}
.bulk-action-bar .checkbox {
  margin-right: 6px;
  margin-left: 3px;
}
</style>
