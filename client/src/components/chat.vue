<template>
<div>
    <h1>Messagerie</h1>
  <ul id="messages">
      <li>Coucou comment va ?</li>
      <li>Bien et toi ?</li>
      <li>Super merci, tu as pu voir pour push sur le repo ?</li>
      <li>Non on a pas encore l'acces</li>
      <li>Coucou comment va ?</li>
      <li>Bien et toi ?</li>
      <li>Super merci, tu as pu voir pour push sur le repo ?</li>
      <li>Non on a pas encore l'acces</li>
      <li>Coucou comment va ?</li>
      <li>Bien et toi ?</li>
      <li>Super merci, tu as pu voir pour push sur le repo ?</li>
      <li>Non on a pas encore l'acces</li>
      <li>Coucou comment va ?</li>
      <li>Bien et toi ?</li>
      <li>Super merci, tu as pu voir pour push sur le repo ?</li>
      <li>Non on a pas encore l'acces</li>

  </ul>
  <form id="form" action="">
    <input id="input" autocomplete="off" placeholder="Votre message ..." />
    <button>Send</button>
  </form>
</div>
</template>

<style scoped>
    ul{
        list-style-type: none;
        padding-left: 0;
        height: 70vh;
        overflow-y: auto;
        /*display: flex;
        justify-content: flex-end;
        flex-direction: column;*/
    }

    li{
        text-align: left;
        border-bottom: 1px solid #D2D2D2;
        padding: 12px 15px; 
    }

    input{
        width: -webkit-fill-available;
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid;
        margin: 10px;
        padding: 12px 15px;
    }

    ::placeholder{
        color : #666666;
    }

    input:focus{
        outline: none;
    }

    button{
        padding: 13px 30px;
        border: 0px;
        color: white;
        background-color: navy;
        position: absolute;
        bottom: 0;
        right: 0;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    button:hover{
        cursor:  pointer;
    }

</style>