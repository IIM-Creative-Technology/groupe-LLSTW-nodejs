<template>
    <div>
        <h1>Messagerie</h1>
        <ul>
            <li v-for="(message, index) in messages" :key="message._id + index" class="messages">
                <div>{{message.content}}</div>
                <div>{{message.username}}</div>
            </li>
        </ul>
        <form>
            <input id="input" autocomplete="off" placeholder="Votre message ..." />
            <button @click="sendMessage()">Send</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        sendMessage() {
            let content = document.getElementById('input').value;
            axios.post(this.url_env +'/api/messages/create', {
                content: content,
                username: this.username
            }).then(function(response) {
                console.log(response);
                document.getElementById('input').value = '';
            }).catch(function (error) {
                console.log(error.response.data);
            });
        },
        getMessages() {
            axios.get(this.url_env + '/api/messages')
            .then(response => {
                this.messages = response.data;
            }).catch(error => {
                console.log(error.response.data);
            });
        }
    },
    created() {
        if (localStorage.getItem('node_name') !== null) {
            this.username = localStorage.getItem('node_name');
            this.getMessages();
        } else {
            this.$router.push('/');
        }
       
    },
    data() {
        return {
            messages: '',
            url_env: 'http://localhost:4000',
            username: 'Test1',
        };
    },
}
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding-left: 0;
        height: 70vh;
        overflow-y: auto;
        /*display: flex;
        justify-content: flex-end;
        flex-direction: column;*/
    }

    li {
        text-align: left;
        border-bottom: 1px solid #D2D2D2;
        padding: 12px 15px;
    }

    .messages {
        display: flex;
        justify-content: space-between;
    }

    input {
        width: -webkit-fill-available;
        position: absolute;
        bottom: 0;
        left: 0;
        border: 1px solid;
        margin: 10px;
        padding: 12px 15px;
    }

    ::placeholder {
        color: #666666;
    }

    input:focus {
        outline: none;
    }

    button {
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

    button:hover {
        cursor: pointer;
    }
</style>