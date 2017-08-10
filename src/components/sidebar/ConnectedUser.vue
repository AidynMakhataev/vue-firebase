<template>
    <v-list subheader>
        <v-subheader>Пользователи</v-subheader>
        <v-list-tile avatar v-for="user in users" v-bind:key="user.uid">
            <v-list-tile-avatar>
                <img v-bind:src="user.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="user.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
                <v-icon :class="{'green--text' : isOnline(user), 'red--text': !isOnline(user)}">chat_bubble</v-icon>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        name: 'connected-user',
        data () {
            return {
                users: [],
                usersRef: firebase.database().ref('users'),
                connectedRef: firebase.database().ref('.info/connected'),
                presenceRef: firebase.database().ref('presence')
            }
        },
        computed: {
            ...mapGetters(['currentUser'])
        },
        mounted() {
            this.addListeners()
        },
        methods: {
            addListeners () {
                this.usersRef.on('child_added', snap => {
                    if(this.currentUser.uid !== snap.key) {
                        let user = snap.val()
                        user['uid'] = snap.key
                        user['status'] = 'offline'
                        this.users.push(user)
                    }
                })

                //check user status
                this.presenceRef.on('child_added', snap => {
                    if(this.currentUser.uid !== snap.key) {
                        this.addStatusToUser(snap.key)
                    }
                })

                this.presenceRef.on('child_removed', snap => {
                    if(this.currentUser.uid !== snap.key) {
                        this.addStatusToUser(snap.key, false)
                    }
                })

                this.connectedRef.on('value', snap => {
                    if(snap.val() === true) {
                        let ref = this.presenceRef.child(this.currentUser.uid)
                        ref.set(true)
                        ref.onDisconnect().remove( err => {
                            if( err !== null) console.log(err)
                        })
                    }
                })
            },
            addStatusToUser (userId, connected = true) {
                let index = this.users.findIndex( user => user.uid === userId);
                if(index !== -1) {
                    connected === true ? this.users[index].status = 'online' : this.users[index].status = 'offline'
                }
            },
            isOnline(user) {
                return user.status === 'online'
            },
            detachListeners () {
                this.usersRef.off();
                this.presenceRef.off();
                this.connectedRef.off();
            }
        },
        beforeDestroy () {
            this.detachListeners()
        }
    }
</script>
