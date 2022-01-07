<template>
  <div class="messagerie">
    <button Type="Button" @click="delStorage()">Logout</button>

    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src

import Chat from '../components/chat.vue';

export default {
  name: 'ViewChat',
  components: {
    Chat,
  },

  methods: {
    delStorage() {
      localStorage.removeItem('node_name');
      localStorage.removeItem('node_token');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
button {
  padding: 10px 30px;
  border-radius: 20px;
  border: 0px;
  color: white;
  background-color: navy;
}
button:hover {
  cursor: pointer;
}
</style>
