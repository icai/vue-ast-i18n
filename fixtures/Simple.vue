<template>
  <div>
    <h1 class="display-2 text-white font-weight-bold mb-0">
        NeonCMS Kit
    </h1>
    <h2>
      {{ $t('NeonCMS Kit') }}
    </h2>
    <div>
         <div>time: {{time}}</div>
         <p v-if="error">some error happend</p>
         <p v-else class="name">your msg: {{msg}}</p>
         <p v-show="msg" class="shown">test v-show</p>
         <p v-on:click="clickMethod">test v-on</p>
         <img v-bind:src="imageSrc" />
         <ul class="test-list">
             <li v-for="(value, index) in list" v-bind:key="index" class="list-item">
                 <div>{{value}}</div>
                 <span>{{msg}}</span>
             </li>
         </ul>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
    
</style>