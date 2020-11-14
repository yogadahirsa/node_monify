<template>
  <div>
      <input type="email" name="email" placeholder="email" v-model="email" />
      <br>
      <input type="password" name="password" placeholder="password" v-model="password" />
      <br>
      <button @click="register">Submit</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
