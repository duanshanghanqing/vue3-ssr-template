<template>
  <div class="home">
    <h1 class="mb-4 text-2xl font-semibold text-gray-900">
      Vue 3 Server Side Rendering1
    </h1>
    <img :src="dogInfo.message" class="dog"/>
    <app-counter />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AppCounter from "../components/AppCounter.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  title: () => Promise.resolve("home"),
  asyncData ({ route, store }: any) {
    return store.dispatch('setDogInfo');
  },
  setup() {
    const store = useStore();
  
    const dogInfo = ref(store.state.dogInfo);
    
    onMounted(async() => {
      console.log(store.state.dogInfo);
    });
    
    return {
      dogInfo
    };
  },
  components: {
    AppCounter,
  },
});
</script>
<style lang="less" scoped>
@import "./Home.less";
</style>