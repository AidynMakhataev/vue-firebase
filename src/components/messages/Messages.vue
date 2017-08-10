<template>
    <v-flex xs12 md8>
        <div class="chat_window">
            <div class="top_menu">
                <div class="buttons">
                    <div class="button close"></div>
                    <div class="button minimize"></div>
                    <div class="button maximize"></div>
                </div>
                <div class="title">Laravel</div>
            </div>

            <ul class="messages">
                <transition-group tag="div" name="list">
                    <single-message :message="message" v-for="message in messages" :key="message.id"></single-message>
                </transition-group>
            </ul>
            <message-form></message-form>
        </div>
    </v-flex>
</template>

<script>

    import MessageForm from './MessageForm.vue'
    import SingleMessage from './SingleMessage.vue'
    import { mapGetters } from 'vuex'
    export default {
        name: 'messages',
        components: { MessageForm, SingleMessage },
        data () {
            return {
                messagesRef: firebase.database().ref('messages'),
                messages: [],
                channel: null
            }
        },
        computed: {
            ...mapGetters(['currentChannel', 'currentUser'])
        },
       watch: {
         currentChannel () {
             this.messages = [];

             this.detachListeners();

             this.addListeners();

             this.channel = this.currentChannel
         }
       },
        methods: {
            addListeners () {
                this.messagesRef.child(this.currentChannel.id).on('child_added', snap => {
                    let message = snap.val()
                    message['id'] = snap.key
                    this.messages.push(message)
                })
            },
            detachListeners () {
                if(this.channel !== null) {
                    this.messagesRef.child(this.channel.id).off('child_added')
                }
            }
        },
        beforeDestroy () {
            this.detachListeners()
        }
    }
</script>

<style scoped>
    .chat_window {
        position: relative;
        width: calc(100% - 20px);
        height: 800px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        background-color: #f8f8f8;
        overflow: hidden;
    }

    .top_menu {
        background-color: #fff;
        width: 100%;
        padding: 20px 0 15px;
        box-shadow: 0 1px 30px rgba(0, 0, 0, 0.1);
    }
    .top_menu .buttons {
        margin: 3px 0 0 20px;
        position: absolute;
    }
    .top_menu .buttons .button {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
        position: relative;
    }
    .top_menu .buttons .button.close {
        background-color: #f5886e;
    }
    .top_menu .buttons .button.minimize {
        background-color: #fdbf68;
    }
    .top_menu .buttons .button.maximize {
        background-color: #a3d063;
    }
    .top_menu .title {
        text-align: center;
        color: #bcbdc0;
        font-size: 20px;
    }

    .messages {
        position: relative;
        list-style: none;
        padding: 20px 10px 0 10px;
        margin: 0;
        height: 600px;
        overflow: scroll;
    }
    .list-enter-active{
        transition: all 0.3s
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateX(30px);
    }

</style>