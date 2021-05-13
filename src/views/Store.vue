<template>
  <h1 class="mb-4 text-2xl font-semibold text-gray-900">A Page With Store</h1>
  <h1>{{ count }}</h1>
  <button style="height:30px;border: 1px #ccc solid;" @click="increment">increment+</button>
  {{ ' ' }}
  <button style="height:30px;border: 1px #ccc solid;" @click="increment">asyncIncrement+</button>
  <div>
    <router-link class="text-blue-500 hover:underline" :to="{ name: 'Home' }"
      >Back to Home</router-link
    >
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Store",
  title: "Store",
  setup() {
    const store = useStore();
    return {
      // access a state in computed function
      count: computed(() => store.state.count),
      // access a mutation
      increment: () => store.commit('increment'),
      // access an action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    };
  },
});
</script>