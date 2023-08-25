<template>
  <div>
      <h1>{{ title }}</h1>
      <button @click="changeTitle">changeTitle</button>
  </div>
</template>

<script setup>
import {ref} from "vue"
const title = ref("hello webpack!");
const changeTitle = ()=>{
  title.value = "hello world!"
}


</script>

<style lang="scss" scoped>

</style>