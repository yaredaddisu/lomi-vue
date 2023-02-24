<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";
import JustboilLogo from "@/components/JustboilLogo.vue";
import { computed,ref , onMounted} from "vue";
import axiosClient from "../axios.js";

import store from "../store";

  
 

 const data = computed(()=>store.state.user.data);

const year = new Date().getFullYear();


 
  
const social = ref(0);

const loading = ref({
 
 
  social: true,

});

 

function updateDashboard(){

   loading.value = {
   
    social: true,

  }
  };


  axiosClient.get(`/get-help`, { }).then(({data}) => {
    social.value = data
    loading.value.social = false;
  })

  
onMounted(() => {
 
  updateDashboard();
})
</script>

<template>
  <footer class="py-2 px-6 footer" :class="containerMaxW">
    <BaseLevel>
     
      <div class="md:py-2 ml-20 justify-center">
           <div v-for="help in social" :key="help.id" >
            <div v-for="s in help" :key="s.id" class="grid grid-cols-9  m-6 gap-6">
              <div v-for="q in s.questions" :key="q.id" class=" flex  ">
                <a :href="q.url" target="_blank">

                <div class="border-b-0 lg:w-6 before:hidden  mr-20">
                  <div class="relative w-12 h-12 transition-all  rounded-md transform hover:scale-125   ">
                    <img class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"  :src="q.image_url" alt="user image" />
                   </div>

                </div>
                <div class="ml-6 text-bold text-center ">{{ q.question }}</div>

                 </a>


              </div>
              
             </div>
          
          </div>
          <div class="text-center md:text-left">
            <b
              >&copy;Copyright {{ year }},
              </b
            >
    
            
            <slot />
          </div>
      </div>
    </BaseLevel>
  </footer>
</template>

<style>
@media print{
  footer {
     display: none; 
    
    }
}
</style>
