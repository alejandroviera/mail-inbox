<template>
  <h1>Mail Inbox</h1>
  <Suspense>
    <template #fallback>
      <div>Loading emails...</div>
    </template>
    <template #default>
      <EmailsTable />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import EmailsTable from '@/components/EmailsTable.vue'
</script>

<style></style>
