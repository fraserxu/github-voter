<template>
  <div>
    Page not found.
    <div v-if="error">
      Detail: {{error.message}}, see {{error.documentation_url}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    error: Object
  }
}
</script>
