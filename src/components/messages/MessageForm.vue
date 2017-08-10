<template>
    <div class="bottom_wrapper clearfix">
        <div class="message_input_wrapper">
            <input class="message_input" placeholder="Type your message here..." v-model.trim="message" id="message" />
        </div>
        <div class="send_message" @click.prevent="sendMessage">
            <div class="icon"></div>
            <div class="text">Send</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'message-form',
        data () {
            return {
                message: '',
                errors: []
            }
        },
        computed: {
            ...mapGetters(['currentChannel', 'currentUser'])
        },
        methods: {
            sendMessage () {
                let newMessage = {
                    content: this.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        name: this.currentUser.displayName,
                        avatar: this.currentUser.photoURL,
                        id: this.currentUser.uid
                    }
                }
                if(this.currentChannel !== null) {

                    if(this.message.length > 0) {
                        this.$parent.messagesRef.child(this.currentChannel.id).push().set(this.createMessage()).then( () => {

                        }).catch( error => {
                            this.errors.push(error.message)
                        })

                        this.message = ""
                    }
                }
            },
            createMessage () {
                return {
                    content: this.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        name: this.currentUser.displayName,
                        avatar: this.currentUser.photoURL,
                        id: this.currentUser.uid
                    }
                }
            }
    }
    }
</script>

<style scoped>
    .bottom_wrapper {
        position: relative;
        width: 100%;
        background-color: #fff;
        padding: 20px 20px;
        position: absolute;
        bottom: 0;
    }
    .bottom_wrapper .message_input_wrapper {
        display: inline-block;
        height: 50px;
        border-radius: 25px;
        border: 1px solid #bcbdc0;
        width: calc(100% - 160px);
        position: relative;
        padding: 0 20px;
    }
    .bottom_wrapper .message_input_wrapper .message_input {
        border: none;
        height: 100%;
        box-sizing: border-box;
        width: calc(100% - 40px);
        position: absolute;
        outline-width: 0;
        color: gray;
    }
    .bottom_wrapper .send_message {
        width: 140px;
        height: 50px;
        display: inline-block;
        border-radius: 50px;
        background-color: #a3d063;
        border: 2px solid #a3d063;
        color: #fff;
        cursor: pointer;
        transition: all 0.2s linear;
        text-align: center;
        float: right;
    }
    .bottom_wrapper .send_message:hover {
        color: #a3d063;
        background-color: #fff;
    }
    .bottom_wrapper .send_message .text {
        font-size: 18px;
        font-weight: 300;
        display: inline-block;
        line-height: 48px;
    }
    .upload_file {
        display: inline-block;
    }

</style>