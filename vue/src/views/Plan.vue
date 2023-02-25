<template>
  <!-- component -->
 
    <div class="min-h-screen bg-gray-100 overflow-auto">
       <div class="container mx-auto max-w-4xl">
        <div class="mt-10 text-center">
          <h1 class="text-4xl font-bold text-gray-800">Lomi pricing plans</h1>
          <p class="text-lg mt-3 font-semibold mb-6 "> </p>
        {{ errors }}
        </div>
         <hr class="mt-10" />
        
          <div class="grid ml-3 grid-cols-4 sm:grid-cols-1 ssm:grid-cols-1 msm:grid-cols-1 mb-6 ">
          <select
          v-model="selected"
          class="form-control form-control-sm"
      >
          <option :value="[selected] " >Slecect a plan </option>
          <option
               selected
              v-for="section in plans"
              :key="section.id"
              :value="[section]"
              >{{ section.planType }}</option
          >

          <pre>{{ selected }}</pre>
      </select>
      <button     type="button"
                      class="relative  bg-gray-500 text-white overflow-hidden ml-5 mb-3  py-2 px-3 border  rounded-md shadow-sm text-sm leading-4 font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"      @click="isModalActive = true"
          >Help</button>
          <button     type="button"
                      class="relative bg-gray-500 text-white overflow-hidden ml-5 mb-3  py-2 px-3 border  rounded-md shadow-sm text-sm leading-4 font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"      @click="isModalDangerActive = true"
          >Privacy and Policy</button>
          <button     type="button"
                      class="relative bg-gray-500 text-white overflow-hidden ml-5  mb-3 py-2 px-3 border  rounded-md shadow-sm text-sm leading-4 font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"      @click="isModalAccount = true"
          >Banck account</button>
         </div>
      
          <form @submit.prevent="savePlan">
     <!-- Image -->
     <div>
      <label class=" mb-2 last:mb-0   font-mediumtext-bold block font-bold mt-6 text-2xl ">Upload your banck receipt here</label>
      <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div class="space-y-1 text-center">


          <img
          v-if="model.image_url"
          :src="model.image_url"
          :alt="model.name"
          class="w-64 h-48 object-cover transition-all  rounded-md transform hover:scale-125"
          />
  <span v-else>
  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

  </span>


          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
              <span>Upload a bank receipt</span>
              <input
              @change="onImageChoose"
              id="file-upload"  name="file-upload" type="file" class="sr-only" />
            </label>
           </div>
          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
    <!--/ Image -->

    <div class="text-center bg-pink-600 mt-6 ">
       
   
      <button :disabled="loading" type="submit" class="  w-full flex rounded-lg justify-center py-2 px-3 border border-transparent  text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
  
            :class="{'cursor-not-allowed': loading,'hover:bg-gray-700': loading,}"
            >
           
              <svg
          
                   v-if="loading"
                 class="animate-spin -ml-1 mr-3 h-5 w-5 text-white "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                
                 >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
            Submit
          </button>
        </div>
    <div class="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 msm:grid-cols-1 ssm:grid-cols-1 gap-4">
             <div class="flex space-x-10 pt-10" v-for="plan in plans" :key="plan.id">
              <div class="py-12 w-full">
                <div class="bg-white pt-4 rounded-xl space-y-6 overflow-hidden  transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
                  <div class="px-8 flex justify-between items-center">
                    <h4 class="text-xl font-bold text-gray-800"  >{{ plan.planType }}</h4>
                  
                    </div>
                    <div class="flex justify-center items-baseline my-8">
                        <span class="mr-2 text-5xl font-extrabold text-center">{{ plan.price }}</span>
                        <span class="text-gray-500 dark:text-gray-400" dark:text-gray-400>/{{plan.planType }}</span>
                    </div>
                    <div class="flex justify-center items-baseline my-8">
                      <span class="mr-2 text-2xl  line-through cancel font-extrabold text-center">{{ plan.discount }}</span>
                      <span class="text-gray-500 line-through dark:text-gray-400" dark:text-gray-400>/{{plan.planType }}</span>
                  </div>
                    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400 px-4 py-4 ">{{plan.description }}</p>
                   <div>
           
          <div class="text-center bg-pink-600 ">
          <button  type="submit"
           disabled  class="inline-block my-6 font-bold text-white"
           >
        

            Get started today</button>
            </div>
          
                   </div>
                </div>
              </div>
              
            </div>
 
              </div>

            </form>

      </div>
      <Help v-model="isModalActive" title="Help"
      has-cancel>
     
      </Help>
    
      <Privecy
        v-model="isModalDangerActive"
        title="Privacy and Policy"
        has-cancel
      >
     
      </Privecy>

          <Account
        v-model="isModalAccount"
        title="Bank account"
        has-cancel
      >
     
      </Account>
    </div>
      <FooterBar type="justify-start lg:justify-center"/>
   </template>
  
  <script setup>
 import { computed, ref, onMounted } from "vue";
import axiosClient from "../axios.js";
import {useStore} from "vuex";
 import { useRouter, useRoute } from "vue-router";
 import FooterBar from "@/components/FooterBar.vue";
 import Help from "@/components/Help.vue";
import Privecy from "@/components/Privecy.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import Account from "@/components/Account.vue";
import Alert from "../components/Alert.vue";

 const store = useStore();
const router = useRouter();
const route = useRoute();

const selected = ref({});
 let loading = ref(false);

const user_id = route.params.id;
 
const  plans = computed(()=>store.state.currentPrice.data);
store.dispatch("getPlans");
 
 

let model = ref({
  status: false,
  user_id: user_id,
  selected:selected 
});

 
 

 
function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
     model.value.image = reader.result;

     model.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const isModalAccount = ref(false);


function savePlan() {

const errors = ref({});

 store.dispatch("savePlan",
 { ...model.value },
 loading.value = true,
).then(({ data }) => {

  store.commit("notify", {
    type: "success",
    message: "The plan was successfully " ,
  });

  loading.value = false,

  router.push({
      name: "SuccessMessage",
     });
  }).catch((error) => {
    loading.value = false

    if (error.response.status === 422) {
      errors.value = error.response.data.errors;
    }
  });


}

      
  
  </script>
  
  <style>
  
  </style>