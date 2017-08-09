<template>
    <v-container>
        <v-layout row>
            <sidebar></sidebar>
            <messages></messages>
        </v-layout>
    </v-container>
</template>

<script>
    import Sidebar from '../components/Sidebar'
    import Messages from '../components/Messages'
    export default {
        name: 'chat',
        components: {Sidebar, Messages}
    }
</script>