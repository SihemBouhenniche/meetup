<template>
  <v-app>
    <!--header section-->
    <v-navigation-drawer temporary v-model="sidnav" class="teal lighten-5" app>
      <v-list>
        <v-list-tile @click="" v-for = "item in menuItems" :key = "item.description" router :to = "item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.description}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="onLogOut" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="teal darken-3" app>
      <v-toolbar-side-icon @click.native.stop="sidnav = !sidnav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title >
        <router-link to = "/" tag = "span" style = "cursor: pointer;">My Meetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for = "item in menuItems" :key = "item.description" router :to = "item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.description}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogOut">
          <v-icon left>exit_to_app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!--end header section-->
    <!--main section-->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!--end main section-->
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sidnav : false,
    }
  },
  computed : {
    menuItems () {
      var menuItems = [
        {
          icon : "face",
          description : "Sign Up",
          link : "/user/signup"
        },
        {
          icon : "lock_open",
          description : "Sign In",
          link : "/user/signin"
        }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon : "event",
            description : "View Meetups",
            link : "/meetup/meetups"
          },
          {
            icon : "room",
            description : "Organize Meetup",
            link : "/meetup/createmeetup"
          },
          {
            icon : "person",
            description : "Profile",
            link : "/user/profile"
          },
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user != null && this.$store.getters.user != undefined 
    }
  },
  methods : {
    onLogOut (){
      this.$router.push('/')
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
