<template>
  <div class="page home">
    <EHeader />
    <EDailySalesList v-if="$store.state.user.userInfo" />
  </div>
</template>

<script>
import EHeader from '../components/Header.vue'
import EDailySalesList from '../components/DailySalesList.vue'
export default {
  components: {
    EHeader,
    EDailySalesList,
  },
}
</script>

<style lang="scss" scoped>
</style>