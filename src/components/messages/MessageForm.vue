<template>
    <div class="bottom_wrapper clearfix">
        <div class="message_input_wrapper">
            <input class="message_input" placeholder="Type your message here..." v-model.trim="message" id="message"  @keyup.enter="sendMessage" />
        </div>
        <div class="attachments" @click.prevent.stop="dialog = true" style="cursor: pointer;">
            <v-icon class="teal--text text--darken-2 mb-5 ml-2" large>attach_file</v-icon>
        </div>
        <div class="send_message" @click.prevent="sendMessage">
            <div class="icon"></div>
            <div class="text">Send</div>
        </div>

        <!--File Upload Progress-->
        <v-progress-linear v-model="uploadPercent" v-if="uploadState != null"></v-progress-linear>
        <!--//File Attachment-->
        <v-dialog v-model="dialog" width="600px" id="dialog">
           <file-upload :upload-file="uploadFile" :close-dialog="closeDialog" ref="file_upload"></file-upload>
        </v-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import FileUpload from './FileUpload.vue'
    import uuidV4 from 'uuid/V4'
    export default {
        name: 'message-form',
        props: ['getMessageRef'],
        data () {
            return {
                message: '',
                errors: [],
                dialog: false,
                storageRef: firebase.storage().ref(),
                uploadTask: null,
                uploadState: null,
                uploadPercent: 0
            }
        },
        components: { FileUpload },
        computed: {
            ...mapGetters(['currentChannel', 'currentUser', 'isPrivate'])
        },
        methods: {
            sendMessage () {

                if(this.currentChannel !== null) {

                    if(this.message.length > 0) {
                        this.getMessageRef().child(this.currentChannel.id).push().set(this.createMessage()).then( () => {

                        }).catch( error => {
                            this.errors.push(error.message)
                        })

                        this.message = "";
                    }
                }
            },
            createMessage (fileUrl = null) {
                let message = {
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        name: this.currentUser.displayName,
                        avatar: this.currentUser.photoURL,
                        id: this.currentUser.uid
                    }
                }
                if(fileUrl === null) {
                    message['content'] = this.message
                } else {
                    message['image'] = fileUrl
                }
                return message
            },
            uploadFile (file, metadata) {

                if(file === null) return false;

                let pathToUpload = this.currentChannel.id;
                let ref = this.getMessageRef();
                let filePath = this.getPath() + '/' + uuidV4() + '.jpg'

                //Upload File
                this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
                this.uploadState = 'uploading';

                this.uploadTask.on('state_changed', snap => {
                    let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
                    this.uploadPercent = percent;
                }, error => {
                    this.errors.push(error.message)
                    this.uploadState = 'error'
                    this.uploadTask = null
                }, () => {
                    //Upload finish
                    this.uploadState = 'done'
                    this.$refs.file_upload.resetForm()

                    let fileUrl = this.uploadTask.snapshot.downloadURL
                    this.sendFileMessage(fileUrl, ref, pathToUpload)
                })

            },
            sendFileMessage(fileUrl, ref, pathToUpload) {
                ref.child(pathToUpload).push().set(this.createMessage(fileUrl)).then( () => {
                    this.$nextTick(() => {
                        let elem = document.getElementById('messageContainer');
                        elem.scrollTop = elem.scrollHeight;
                    })
                }).catch( error => {
                    this.errors.push(error.message)
                })
            },
            closeDialog() {
                this.dialog = false;
            },
            getPath() {
                if(this.isPrivate) {
                    return 'chat/private/'+this.currentChannel.id
                }else {
                    return 'chat/public'
                }
            }

        },
        beforeDestroy () {
            if(this.uploadTask !== null){
                this.uploadTask.cancel()
                this.uploadTask = null
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
        width: 100px;
        height: 50px;
        display: inline-block;
        border-radius: 50px;
        background-color: #00796b;
        border: 2px solid #00796b;
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
    .attachments {
        display: inline-block;
    }

</style>