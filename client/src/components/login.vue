<template>
  <div>
    <h1>Connexion</h1>
    <Input
      Type="Text"
      Name="username"
      V-Model="Input.Username"
      Placeholder="Nom d'utilisateur"
      id="username"
    /><br />
    <Input
      Type="Password"
      Name="Password"
      V-Model="Input.Password"
      Placeholder="Mot de passe"
      id="password"
    /><br />
    <button Type="Button" @click="Login()">Connexion</button>
  </div>
</template>

<script>
// import axios
import axios from 'axios';

export default {
  data() {
    return {
      Input: {
        Username: '',
        Password: '',
      },
      url_env: 'http://localhost:4000',
    };
  },
  methods: {
    async Login() {
      this.Password = document.getElementById('password').value;
      this.Username = document.getElementById('username').value;

      axios
        .post(this.url_env + '/api/login', {
          username: this.Username,
          password: this.Password,
        })
        .then((response) => {
          localStorage.setItem('node_name', response.data.username);
          localStorage.setItem('node_token', response.data.id);
          console.log(response.data.username);
          this.$router.push({ name: 'ViewChat' });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  name: 'Login',
};
</script>

<style scoped>
input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #333333;
  margin-bottom: 10px;
}

::placeholder {
  color: #666666;
}

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
