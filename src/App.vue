<template>
  <v-app dark>
    <v-navigation-drawer
            class="pb-0"
            persistent
            absolute
            height="100%"
            clipped
            enable-resize-watcher
            v-model="drawer"
            v-if="currentUser !== null"
    >
      <v-list dense>
        <v-list>
          <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="currentUser.photoURL" alt="avatar">
              </v-list-tile-avatar>
              <v-list-tile-title>{{ currentUser.displayName }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile v-for="item in items" :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar>
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3">
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon class="grey--text text--darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="teal" v-if="currentUser !== null">
      <v-toolbar-title>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        Master App
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
              label="Поиск..."
              single-line
              append-icon="search"
              dark
              hide-details
      ></v-text-field>
      <v-btn flat @click="logout">
       <v-icon left>exit_to_app</v-icon>
        Выйти
      </v-btn>
    </v-toolbar>

    <main>
        <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
          drawer: true,
          items: [
              { icon: 'trending_up', text: 'Most Popular' },
              { icon: 'subscriptions', text: 'Subscriptions' },
              { icon: 'history', text: 'History' },
              { icon: 'featured_play_list', text: 'Playlists' },
              { icon: 'watch_later', text: 'Watch Later' }
          ],
          items2: [
              { picture: 28, text: 'Joseph' },
              { picture: 38, text: 'Apple' },
              { picture: 48, text: 'Xbox Ahoy' },
              { picture: 58, text: 'Nokia' },
              { picture: 78, text: 'MKBHD' },
          ],
          presenceRef: firebase.database().ref('presence')
      }
    },
    computed: {
            ...mapGetters(['currentUser'])
    },
    methods: {
        logout () {
            this.presenceRef.child(this.currentUser.uid).remove()
            firebase.auth().signOut()
            this.$store.dispatch('setUser', null)
            this.$router.push('/login')
        }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
