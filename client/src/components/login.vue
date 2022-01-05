<template>
    <div>
    <h1>Connexion</h1>
        <Input Type="Text" Name="email" V-Model="Input.Email" Placeholder="Email" /><br/>
        <Input Type="Password" Name="Password" V-Model="Input.Password" Placeholder="Mot de passe" /><br/>
        <button Type="Button" V-On:click="Login()">Connexion</button>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
}
</script>

<style scoped>
    input{
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #333333;
        margin-bottom: 10px;
    }

    ::placeholder{
        color : #666666;
    }

    button{
        padding: 10px 30px;
        border-radius: 20px;
        border: 0px;
        color: white;
        background-color: navy;
    }
    button:hover{
        cursor:  pointer;
    }
</style>