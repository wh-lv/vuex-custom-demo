<template>
  <div id="app">
    <h1>App</h1>
    <p>{{ $store.state.count }}</p>
    <button @click="add">Add</button>
    <button @click="asyncAdd">AsyncAdd</button>
    <hello-world></hello-world>
  </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    add () {
      this.$store.dispatch('add', 2)
    },
    asyncAdd () {
      this.$store.dispatch('asyncAdd').then(result => {
        console.log('result: ', result)
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
