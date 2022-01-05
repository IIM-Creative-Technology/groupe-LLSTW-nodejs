<template>
  <div class="messagerie">
    <Chat/>
  </div>
</template>

<script>
// @ is an alias to /src

import Chat from "../components/chat.vue"

export default {
  name: 'About',
  components: {
    Chat
  }
}
</script>