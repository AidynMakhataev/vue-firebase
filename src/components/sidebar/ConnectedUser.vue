<template>
    <v-list subheader>
        <v-subheader>Recent chat</v-subheader>
        <v-list-tile avatar v-for="item in items" v-bind:key="item.title">
            <v-list-tile-avatar>
                <img v-bind:src="item.avatar"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-icon v-bind:class="[item.active ? 'teal--text' : 'grey--text']">chat_bubble</v-icon>
            </v-list-tile-action>
        </v-list-tile>
    </v-list>
</template>

<script>
    export default {
        name: 'connected-user',
        data () {
            return {
                items: [
                    {
                        active: true,
                        title: 'Jason Oner',
                        avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rapper-guy.png'
                    },
                    {
                        active: true,
                        title: 'Ranee Carlson',
                        avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rapper-guy.png'
                    },
                    {
                        title: 'Cindy Baker',
                        avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rapper-guy.png'
                    },
                    {
                        title: 'Ali Connors',
                        avatar: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-rapper-guy.png'
                    },
                ],
            }
        }
    }
</script>
