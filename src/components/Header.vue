<template>
  <div class="h-[40px] flex justify-between px-6 items-center bg-primary">
    <div class="left"></div>
    <div class="right">
      <div class="text-light cursor-pointer" @click="logout()">
        <span class="text-white cursor-pointer">Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EHeader',
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>

