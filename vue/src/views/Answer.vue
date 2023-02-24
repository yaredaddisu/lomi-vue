<template>
<div v-for="member in members" :key="member.id">
 
 


   
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
    <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
    
    <pre v-for="text in  member.questions.options  " :key="text.uuid">{{text}}</pre>

</div>


</template>

<script setup>
 import { reactive, computed,onMounted, ref ,watch} from "vue";

import store from '../store';

import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

const members = computed(() => store.state.members.data );
store.dispatch("getMembers");
</script>

<style>

</style>