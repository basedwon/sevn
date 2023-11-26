<template>
  <v-container class="pt-4">
    <v-row dense>
      <v-col cols="12">
        <v-card min-height="200" max-width="400" color="transparent" flat class="d-flex flex-column justify-center text-center mx-auto">
          <div class="title">Sorry, this page doesn't exist.</div>
          <div class="body-2 font-weight-light mt-4">The link may be broken or the page may have been removed. Please check to see if the link you're trying to open is correct.</div>
          <nuxt-link to="/" class="body-1 mt-5">Go to the Homepage</nuxt-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ['error'],
  data: () => ({
    messages: {
      'DEF': { title: 'Error', body: 'An error occurred' },
      '404': { title: 'Not Found', body: 'Page not found' },
      '403': { title: 'Access Denied', body: 'Access is forbidden' },
      '500': { title: 'Server Error', body: 'A server error has occured' },
    },
  }),
  computed: {
    message () {
      return this.messages[this.code] ? this.messages[this.code].body : this.messages.DEF.body
    },
    code () {
      return this.error.statusCode
    },
    button () {
      return !!this.code.toString().match(/(403|404|500)/)
    },
    $shade: {
      get () { return this.$vuetify.theme.dark },
      set (value) { this.$vuetify.theme.dark = value },
    },
  },
  head () {
    const errCode = this.messages[this.code] ? this.messages[this.code].title : this.messages.DEF.title
    return {
      titleTemplate: `%s - [${errCode}]`,
      // titleTemplate: `%s - [${errCode}] - ${process.env.siteTitle}`,
    }
  },
  mounted () {
    if (process.env.dev || this.error.statusCode !== 404) {
      log(`System Error :: ${this.error.statusCode} :: ${this.error.message}`)
    }
  }
}
</script>
