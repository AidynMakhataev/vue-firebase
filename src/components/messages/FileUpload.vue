<template>
   <div>
       <div class="file-top"> 
           <h2>Загрузка изображении</h2>
            <p class="lead">Поддерживаются форматы jpg/png</p>
       </div>
        <!-- Upload  -->
        <form id="file-upload-form" class="uploader">

            <input id="file-upload" type="file" name="fileUpload" accept="image/*" @change="addFile" />

            <label for="file-upload" id="file-drag">
                <img id="file-image" :src="previewImage" alt="Preview" v-if="previewImage.length > 0">
                <div id="start">
                    <v-icon class="teal--text" large>file_upload</v-icon>
                    <div>Максимальный размер файла  - 1 mb</div>
                    <div id="notimage" class="hidden">Please select an image</div>
                    <span id="file-upload-btn" class="btn btn-primary">Выбрать файл</span>
                </div>
                <div id="response" class="hidden">
                    <div id="messages"></div>
                    <progress class="progress" id="file-progress" value="0">
                        <span>0</span>%
                    </progress>
                </div>
                <div id="actions" class="hidden">
                    <v-btn class="teal" @click.prevent="sendFile">Отправить</v-btn>
                    <v-btn @click.native = "closeDialog">Отмена</v-btn>
                </div>
            </label>
        </form>
   </div>
</template>

<script>

    import mime from 'mime-types'

    export default {
        name: 'file-upload',
        props: ['uploadFile', 'closeDialog'],
        data () {
            return {
                file: null,
                authorized: ['image/jpeg', 'image/png'],
                previewImage: ''
            }
        },
        methods: {
            addFile(e) {
                document.getElementById('actions').classList.remove("hidden");
                let files = e.target.files
                if(files.length === 1){
                    this.file = files[0]
                }
                let input = e.target;
                if( input.files && input.files[0]) {
                    let reader = new FileReader();

                    reader.onload = (e) => {
                        this.previewImage = e.target.result;
                    }
                    reader.readAsDataURL(input.files[0]);
                }

            },
            sendFile () {

                if(this.file !== null) {
                    if(this.isValid(this.file.name)) {
                        let metadata = { contentType: mime.lookup(this.file.name) };
                        this.uploadFile(this.file, metadata);
                        this.closeDialog();

                    }
                }

            },
            isValid (filename) {
                let index = this.authorized.indexOf(mime.lookup(filename))
                return index !== - 1
            },
            resetForm() {
                $('.form').trigger('reset')
                this.file = null
            }

        }
    }
</script>

<style lang="scss" scoped>
    $theme:       #454cad;
    $dark-text:   #5f6982;

    .file-top {
        text-align: center;
        background: #0f5049;
        padding-top: 8px;
    }
    h2 {
        font-size: 26px;
        line-height: 1;
        color: #fff;
        margin-bottom: 0;
    }
    p {
        font-size: 18px;
        color: #fff;
    }
    // Upload Demo
    //
    .uploader {
        display: block;
        clear: both;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;

        label {
            float: left;
            clear: both;
            width: 100%;
            padding: 2rem 1.5rem;
            text-align: center;
            background: #fff;
            border-radius: 7px;
            border: 3px solid #eee;
            transition: all .2s ease;
            user-select: none;

            &:hover {
                border-color: $theme;
            }
            &.hover {
                border: 3px solid $theme;
                box-shadow: inset 0 0 0 6px #eee;

                #start {
                    i.fa {
                        transform: scale(0.8);
                        opacity: 0.3;
                    }
                }
            }
        }

        #start {
            float: left;
            clear: both;
            width: 100%;
            &.hidden {
                display: none;
            }
            i.fa {
                font-size: 50px;
                margin-bottom: 1rem;
                transition: all .2s ease-in-out;
            }
        }
        #response {
            float: left;
            clear: both;
            width: 100%;
            &.hidden {
                display: none;
            }
            #messages {
                margin-bottom: .5rem;
            }
        }

        #actions {
            clear: both;
            &.hidden {
                display: none;
            }
        }

        #file-image {
            display: inline;
            margin: 0 auto .5rem auto;
            width: auto;
            height: auto;
            max-width: 180px;
            &.hidden {
                display: none;
            }
        }

        #notimage {
            display: block;
            float: left;
            clear: both;
            width: 100%;
            &.hidden {
                display: none;
            }
        }

        progress,
        .progress {
            // appearance: none;
            display: inline;
            clear: both;
            margin: 0 auto;
            width: 100%;
            max-width: 180px;
            height: 8px;
            border: 0;
            border-radius: 4px;
            background-color: #eee;
            overflow: hidden;
        }

        .progress[value]::-webkit-progress-bar {
            border-radius: 4px;
            background-color: #eee;
        }

        .progress[value]::-webkit-progress-value {
            background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
            border-radius: 4px;
        }
        .progress[value]::-moz-progress-bar {
            background: linear-gradient(to right, darken($theme,8%) 0%, $theme 50%);
            border-radius: 4px;
        }

        input[type="file"] {
            display: none;
        }

        div {
            margin: 0 0 .5rem 0;
            color: $dark-text;
        }
        .btn {
            display: inline-block;
            margin: .5rem .5rem 1rem .5rem;
            clear: both;
            font-family: inherit;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
            text-transform: initial;
            border: none;
            border-radius: .2rem;
            outline: none;
            padding: 0 1rem;
            height: 36px;
            line-height: 36px;
            color: #fff;
            transition: all 0.2s ease-in-out;
            box-sizing: border-box;
            background: $theme;
            border-color: $theme;
            cursor: pointer;
        }
    }
</style>

