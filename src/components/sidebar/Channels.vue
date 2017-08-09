<template>
    <v-list subheader>
        <v-subheader>Темы для беседы
        <v-spacer></v-spacer>
            <v-icon @click.prevent.stop="dialog = true" style="cursor: pointer;">add</v-icon>
        </v-subheader>
        <v-list-tile
                v-for="channel in channels"
                v-bind:key="channel.id"
                :class="{'active': setChannelActive(channel)}"
                @click="changeChannel(channel)"    >
            <v-list-tile-content>
                <v-list-tile-title>#{{ channel.name }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-dialog v-model="dialog" hide-overlay>
            <v-card>
                <v-card-title class="headline">Введите название темы</v-card-title>
                <v-card-text>
                   <v-text-field required label="Название темы" v-model="new_channel"></v-text-field>
                   <v-btn class="teal" @click="addChannel">Сохранить</v-btn>
                    <div v-if="alert">
                    <v-alert error dismissible v-model="alert">{{error}}</v-alert>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-list>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'channels',
        data () {
            return {
                dialog: false,
                alert: false,
                channels: [],
                new_channel: '',
                channelsRef: firebase.database().ref('channels'),
                error: '',
                firstLoad: true
            }
        },
        computed: {
            ...mapGetters(['currentChannel'])
        },
        mounted () {
          this.addListeners()
        },
        methods: {
            addListeners () {
              this.channelsRef.on('child_added', snap => {
                  this.channels.push(snap.val())

                  if(this.firstLoad && this.channels.length > 0) {
                      this.$store.dispatch('setCurrentChannel', this.channels[0])
                  }
                  this.firstLoad = false
              })
            },
            addChannel () {
                let key = this.channelsRef.push().key

                let newChannel = { id: key, name: this.new_channel}
                this.channelsRef.child(key).update(newChannel).then( () => {
                    this.new_channel = ''
                    this.dialog = false
                }).catch( error => {
                    this.error = error.message;
                    this.alert = true
                })
            },
            detachListeners () {
                this.channelsRef.off()
            },
            setChannelActive(channel) {
                return channel.id === this.currentChannel.id
            },
            changeChannel(channel) {
                this.$store.dispatch('setCurrentChannel', channel)
            }
        },
        beforeDestroy () {
            this.detachListeners()
        }
    }
</script>

<style scoped>
    .active {
        background-color: #009688;
    }
</style>