<template>
    <v-flex xs12 sm4>
        <v-card>
            <v-toolbar class="teal" dark>
                <v-toolbar-title class="text-xs-center">Чат</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar>
            <channels></channels>
            <v-divider></v-divider>
            <connected-user></connected-user>
        </v-card>
    </v-flex>
</template>

<script>
    import ConnectedUser from './ConnectedUser.vue'
    import Channels from './Channels.vue'
    import Users from './Users.vue'
    export default {
        name: 'sidebar',
        components: {ConnectedUser, Channels, Users}
    }
</script>