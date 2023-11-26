<template>
  <v-app>
    <template v-if="$store.state.auth">
      <!-- App Bar -->
      <v-app-bar app>
        <v-app-bar-nav-icon v-if="$mobile" @click="leftNav = !leftNav" />
        <div @click="$router.push('/')" style="cursor: pointer;" class="d-flex align-center pr-4">
          <v-avatar class="mr-2">
            <v-icon size="42" color="yellow darken-2">mdi-star-face</v-icon>
          </v-avatar>
          <v-toolbar-title>{{siteTitle}}</v-toolbar-title>
        </div>
        <v-toolbar-items v-if="!$mobile">
          <v-btn v-for="item in leftItems" :key="item.id" text :to="item.path">
            <v-icon left>mdi-{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <template v-if="$store.state.user.active">
          <v-btn icon @click="rightNav = !rightNav" class="mr-0">
            <v-avatar size="42">
              <v-icon size="42">mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <template v-else>
          <v-toolbar-items>
            <v-btn text to="/sign-in">
              <v-icon left>mdi-login</v-icon>
              Sign In
            </v-btn>
            <v-btn text to="/sign-up">
              <v-icon left>mdi-account-plus</v-icon>
              Sign Up
            </v-btn>
          </v-toolbar-items>

        </template>
      </v-app-bar>

      <!-- Left Nav -->
      <v-navigation-drawer v-model="leftNav" disable-resize-watcher temporary app>
        <v-list-item to="/" v-bind="listItemProps">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="item in leftItems" :key="item.title" :to="item.path" v-bind="listItemProps">
          <v-list-item-icon>
            <v-icon>mdi-{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>

      <!-- Right Nav -->
      <v-navigation-drawer right v-model="rightNav" disable-resize-watcher temporary app>
        <template v-slot:prepend>
          <v-list-item two-line @click="$router.push('/profile')" color="grey" :input-value="true">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/82.jpg">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Profile</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action @click.stop="snag('goatssss', true)">
              <v-tooltip bottom left nudge-left="70">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                Copy profile URL
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$shade = !$shade">
            <v-list-item-icon>
              <v-icon>mdi-brightness-4</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{$shade ? 'Shady' : 'Blindy'}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Lang -->
          <v-menu offset-x left tile max-width="120">
            <template v-slot:activator="{ attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-icon>
                  <v-icon>mdi-translate</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{lang.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-card tile>
              <v-list-item v-for="curr in langs" :key="curr.id" 
                @click="lang = curr"
                :input-value="curr.code === lang.code"
                >
                <v-list-item-title>{{curr.name}}</v-list-item-title>
              </v-list-item>
            </v-card>
          </v-menu>


          <!--
          <v-list-item
            v-for="item in rightItems"
            :key="item.title"
            >
            <v-list-item-icon>
              <v-icon>mdi-{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          -->
        </v-list>

        <!--
        <template v-slot:append>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/93.jpg">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        -->
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <nuxt />
        
      </v-main>
    </template>

    <!-- Access Control -->
    <v-container fill-height v-else>
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="8">
          <v-card>
            <v-card-title>Authenticate</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                v-model="password"
                label="Password"
                outlined
                hide-details
                type="password"
                @keydown.enter="authorize"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" x-large block @click="authorize">
                Authorize
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer -->
    <v-footer app>
      <v-spacer></v-spacer>
      <span>{{siteTitle}}</span>
      <span class="mx-1">&copy;</span>
      <span>{{copyrightYear}}</span>
      <v-spacer></v-spacer>
      <!-- <v-icon>mdi-github</v-icon> -->
    </v-footer>

    <snackify />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => ({
    password: '',
    leftNav: false,
    rightNav: false,
    leftItems: [
      { title: 'Style', icon: 'palette', path: '/tile' },
    ],
    rightItems: [
      { title: 'Home', icon: 'home-city' },
      { title: 'My Account', icon: 'account' },
      { title: 'Users', icon: 'account-group-outline' },
    ],
  }),
  computed: {
    lang: {
      get () { return this.$store.state.lang },
      set (value) { return this.$store.commit('set', { key: 'lang', value }) },
    },
    langs () {
      return this.$i18n.locales
    },
    connected () {
      return this.$store.state.connected
    },
    listItemProps () {
      return {
        inputValue: true,
        color: this.$shade ? 'white' : 'grey darken-4',
        activeClass: `primary ${this.$shade ? 'darken-3' : 'lighten-3'}`,
      }
    },

    copyrightYear () {
      return new Date().getFullYear()
    },
    mobile () {
      return !this.$bp.mdAndUp
    },
  },
  watch: {
  },
  async created () {
  },
  async mounted () {
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.rightNav = false
    },
    async authorize () {
      if (await this.$axios.$post('/auth/authorize', { password: this.password }))
        return this.$store.commit('set_auth', true)
      this.$snack('Invalid Credentials')
    },
  }
}
</script>

<style lang="stylus">
  // .clickable
  //   cursor pointer
  // .v-toolbar.no-left > .v-toolbar__content
  //   padding-left 0
  // .v-toolbar.no-right > .v-toolbar__content
  //   padding-right 0
  // .v-toolbar.no-pad > .v-toolbar__content
  //   padding-left 0
  //   padding-right 0

</style>
