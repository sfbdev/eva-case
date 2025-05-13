<template>
  <div class="page login h-screen grid grid-cols-2">
    <div class="left flex justify-center items-center">
      <form class="login-form mx-12 w-3/5" @submit.prevent="handleSubmit()">
        <div class="input-group mb-4">
          <label for="mail" class="block text-lg font-semibold">E-mail*</label>
          <input
            type="email"
            v-model="payload.Email"
            placeholder="E-Mail Address"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="input-group mb-4">
          <label for="password" class="block text-lg font-semibold">Password*</label>
          <input
            type="password"
            v-model="payload.Password"
            placeholder="Password"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div class="input-group">
          <button class="primary bg-blue-600 text-white p-2 rounded w-full">
            <span>Log-in</span>
          </button>
        </div>
      </form>
    </div>
    <div class="right bg-primary"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        Email: 'homework@eva.guru',
        Password: 'Homeworkeva1**',
        Scope: 'amazon_data',
        GrantType: 'password',
        ClientId: 'C0001',
        ClientSecret: 'SECRET0001',
        RedirectUri: 'https://api.eva.guru',
      },
    }
  },
  computed: {},
  methods: {
    handleSubmit() {
      if (this.payload.email == '' || this.payload.password == '') return
      this.$store.dispatch('user/login', this.payload)
    },
  },
}
</script>


<style lang="scss" scoped>
@use '../assets/styles/variables' as *;
</style>
