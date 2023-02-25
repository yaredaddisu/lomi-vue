<template>
  <Notification/>

  <nav class="flex items-center justify-between flex-wrap bg-blue-500 rounded-lg shadow-lg p-6">
    <div class="flex items-center flex-shrink-0 text-white  text-bold font-bold ">
       {{ route.params.id ? "Edit Member" : "Add a Member" }}
    </div>

  </nav>
  <div role="status" v-if="memberLoading">
    <svg aria-hidden="true" class="mr-2 w-8 h-8 justify-center text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
    <div v-for="(field, i) of Object.keys(errors)" :key="i">
      <div v-for="(error, ind) of errors[field] || []" :key="ind">
        * {{ error }}

      </div>

    </div>

  </Alert>

     <form @submit.prevent="saveMember" class="">
         <!-- Image -->
         <div class="mb-6 pt-4">
          <label class=" mb-2 last:mb-0 text-sm uppercase	 font-mediumtext-bold block font-bold ">Member photo</label>
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
                  <span>Upload a file</span>
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
    <div class="flex flex-wrap -mx-3 mb-6">


      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="font-mediumtext-bold block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          First Name
        </label>
        <input
                      v-model="model.firstname"
            name="firstname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name">
       </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
          Last Name
        </label>
        <input
                      v-model="model.lastname"
            name="lastname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name">
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
          Email
        </label>
        <input
                      v-model="model.email"
            name="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Email Address">
       </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Address
        </label>
        <input  v-model="model.address" name="address" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Address">
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Phone
        </label>
        <input
                      v-model="model.phone"
           name="phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Phone Number">
      </div>
 
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
<select id="countries" v-model="model.gender" class="
appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
  <option value="Male" selected>Male</option>
   <option value="Female">Female</option>
 
</select>

 </div>

       
         


    


    </div>

    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Role
        </label>
        <input  v-model="model.role" name="role" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Role">
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Work field
        </label>
        <input
                      v-model="model.work"
           name="work" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Work Field">
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
          Work time
        </label>
        <input
                      v-model="model.work_time"
           name="work_time" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Work time">
      </div>
 
  
  

       
          <!-- Status -->
          <div class="flex items-start mt-3 ml-3">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>
  
         
          <!-- Status -->


    


    </div>
    <button :disabled="loading"  type="submit" class="w-full mt-6 flex justify-center py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm mb-10 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"

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
     {{ route.params.id ? "Update" : "Save   " }}

   </button>
  </form>
</template>

<script setup>
 import store from '../store';
 import { useRoute, useRouter } from "vue-router";
 import { computed, ref ,watch} from "vue";
 import Notification from "@/components/Notification.vue";
 import Alert from "@/components/Alert.vue";
 import Date from "@/components/Date.vue";
 import QuestionViewer from "@/components/QuestionViewer.vue";
 import { v4 as uuidv4 } from "uuid";
 import FormField from "@/components/FormField.vue";
 import FormControl from "@/components/FormControl.vue";

const route = useRoute();
const router = useRouter();

const memberLoading = computed(() => store.state.currentMember.loading);
const {survey} = defineProps({
     survey: Object
 });



let model = ref({
  firstname:"",
  lastname:"",
  phone:"",
  address:"",
  status: false,
  email: null,
  image_url: null,
  day_left: " ",
  price:" 0",
   priceUpdate:" 0",
   questions: [],
   role:"",
 work:"",
 work_time:"" 

});

const selectOptions = [
   "Male" ,
   "Female" ,
]; 
 
 

 watch(
  () => store.state.currentMember.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

 if (route.params.id) {
  store.dispatch("getMember", route.params.id);

}




   function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    model.value.image = reader.result;

    // The field to display here
    model.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

let errors = ref('');

 //$router.push({ name: "yourroutename"})     router.push("Members")
 function saveMember() {
  if(!model.value.priceUpdate){
  model.value.price =  model.value.price ;
}else{
  model.value.price = parseInt(model.value.price) + parseInt(model.value.priceUpdate);

}

  let action = "created";
  if (model.value.id) {
    action = "updated";
   }
   store.dispatch("saveMember", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: "The Member was successfully " + action,
    });
    router.push({ params: { id: data.data.id  } })

  })  .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

 
</script>

<style>

</style>
