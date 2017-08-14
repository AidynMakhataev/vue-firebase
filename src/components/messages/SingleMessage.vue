<template>
        <li class="message" :class="message.user.id === currentUser.uid ? 'left appeared' : 'right appeared'">
            <div class="avatar">
                <img :src="message.user.avatar" alt="avatar">
                <div class="user_name">
                    {{ message.user.name }}
                </div>
            </div>
            <div class="text_wrapper">
                <div class="text" v-if="!isFile(message)">{{  message.content }}</div>
                <img :src="message.image" alt="image" class="message-image" v-else>
                <div class="date">{{ message.timestamp | fromNow }}</div>
            </div>

        </li>
</template>

<script>
    import { mapGetters } from 'vuex'
    import moment from 'moment'
    export default {
        name: 'single-message',
        props: ['message'],
        computed: {
            ...mapGetters(['currentUser'])
        },
        methods: {
            isFile(message) {
                return message.content == null && message.image != null
            }
        },
        filters: {
            fromNow (value) {
                return moment(value).fromNow()
            }
        }
    }
</script>

<style scoped>
    .message-image {
        max-height: 400px;
        display: inline;
        margin: 0 auto .5rem auto;
        width: auto;
        height: auto;
    }
    .messages .message {
        clear: both;
        overflow: hidden;
        margin-bottom: 20px;
        transition: all 0.5s linear;
        opacity: 0;
    }
    .messages .message.left .avatar {
        float: left;
    }
    .messages .message.left .text_wrapper {
        background-color: #ffe6cb;
        margin-left: 20px;
    }
    .messages .message.left .text_wrapper::after, .messages .message.left .text_wrapper::before {
        right: 100%;
        border-right-color: #ffe6cb;
    }
    .messages .message.left .text {
        color: #c48843;
    }
    .messages .message.right .avatar {
        float: right;
    }
    .messages .message.right .text_wrapper {
        background-color: #c7eafc;
        margin-right: 20px;
        float: right;
    }
    .messages .message.right .text_wrapper::after, .messages .message.right .text_wrapper::before {
        left: 100%;
        border-left-color: #c7eafc;
    }
    .messages .message.right .text {
        color: #45829b;
    }
    .messages .message.appeared {
        opacity: 1;
    }
    .messages .message .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-block;
    }
    .messages .message .text_wrapper {
        display: inline-block;
        padding: 20px;
        border-radius: 6px;
        width: 500px;
        min-width: 100px;
        position: relative;
    }
    .messages .message .text_wrapper::after, .messages .message .text_wrapper:before {
        top: 18px;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    .messages .message .text_wrapper::after {
        border-width: 13px;
        margin-top: 0px;
    }
    .messages .message .text_wrapper::before {
        border-width: 15px;
        margin-top: -2px;
    }
    .messages .message .text_wrapper .text {
        font-size: 18px;
        font-weight: 300;
    }
    .text_wrapper .date {
        display: inline-block;
        color: #000;
    }
    .avatar .user_name {
        color: #000;
    }
</style>