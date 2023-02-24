<script setup>
import { reactive, computed,onMounted, ref ,watch} from "vue";
import { mdiBallotOutline,mdiMapMarker, mdiAccount,mdiPhone, mdiMail, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
 import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
 import store from '../store';
 import { useRoute, useRouter } from "vue-router";
 import Alert from "@/components/Alert.vue";
 import Date from "@/components/Date.vue";
 import { PurpleToBlue } from "@/colors";
import OverlayLayer from "@/components/OverlayLayer.vue";
import QuestionViewer from "@/components/QuestionViewer.vue";
import FormField from "@/components/FormField.vue";
import WorkQuestion from "@/components/WorkQuestion.vue";
import Camera from "@/components/Camera.vue";

import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const router = useRouter();

const loading = computed(() => store.state.currentMember.loading);

const fields = computed(() => store.state.work.data );
store.dispatch("getWorks");

const isModalActive = ref(false);
 

let model = ref({
  id:'',
  firstname:"",
  lastname:"",
  phone:"",
  address:"",
  status: false,
  email: null,
  price: "0",
  priceUpdate: "0",
  image_url: null,
  image: null,
  day_left: null,
  gender:null,
  questions: [],
 role:"",
 work:"",
 work_time:"" 
});
 
let ops = ref({
  plus: '+',
  minus: '-',
  radio: ' '

})
const selectOptions = [
   "Male" ,
   "Female" ,
]; 
 
 
 
 
function addQuestion(index) {
  const Question = {
    id: uuidv4(),
    type: "text",
    question: "",
    data: {},
   

  };

  model.value.works.splice(index, 0, Question);
}

function deleteQuestion(question) {
  model.value.works = model.value.works.filter((q) => q !== question);
}

function questionChange(question) {
 
  model.value.works = model.value.works.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}
 
 
          const checked = ref([]);

 
function updateCheckall(){
if(this.checked.length == this.fields.length){
   this.isCheckAll = true;
}else{
   this.isCheckAll = false;
}
};
   
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



if (route.params.id) {
  store.dispatch("getMember", route.params.id);
};


watch(
  () => store.state.currentMember.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

 let errors = ref('');

function saveMember() {
 
    
  let action = "created";
  if (model.value.id) {
    action = "updated";
   }

   store.dispatch("saveMember", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: "Member was successfully " + action,
    });
    router.push({
      name: "MemberView",
      params: { id: data.data.id },
    });
    }).catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });

 
}

function addNewMember(){
  router.push('/members/create').then(()=>{
    window.location.reload(true);

  });
 

 


}

function listMember(){
store.dispatch('getMembers');
router.push('/members');

}


const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info" ];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
 
store.dispatch("getUser");

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

<div class="grid lg:grid-cols-1 grid-cols-2">



      <SectionTitleLineWithButton
      v-if=" route.params.id"
      :icon="mdiBallotOutline"
      title="Edit member"
      class="font-bold"
      main
    >

    <BaseButton
    target="_blank"
   :icon="mdiAccountPlus"
   label="Add member"
   color="contrast"
   rounded-full
   small
   @click="addNewMember"

 />
        
    </SectionTitleLineWithButton>
    <SectionTitleLineWithButton
    v-else
    :icon="mdiAccountPlus"
    title="Add member"
    class="font-bold"
    main
  >
 



  </SectionTitleLineWithButton>

</div>

      <CardBox class="shadow-xl" >
         <div role="status" v-if="loading">
           <OverlayLayer />
        </div>
        <form v-else @submit.prevent="saveMember">
                  <NotificationBarInCard
        :color="formStatusOptions[formStatusCurrent]"
        :is-placed-with-header="formStatusWithHeader"
      >
      <div class="block ">
        <span
        >
         <h1  class="text-xl font-bold text-white float-left">

          {{ route.params.id ? "Edit member" : "Add member" }}
        </h1>

     
         </span
      >
    

     
   <BaseButton
   
   class="w-[200px] float-left sm:ssm:msm:mt-3 md:float-right lg:float-right" 
   target="_blank"
  :icon="  mdiAccountPlus"
  label="Members"
  color="contrast"
  rounded-full
  small
  @click="listMember"
 
 />
 
       </div>

      </NotificationBarInCard>
           <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
      <div v-for="(field, i) of Object.keys(errors)" :key="i">
        <div v-for="(error, ind) of errors[field] || []" :key="ind">
          * {{ error }}

        </div>

      </div>
     </Alert>
         <FormField label="Personal Information">
          <FormControl v-model="model.firstname" :icon="mdiAccount"  placeholder="First name" />
          <FormControl v-model="model.lastname" :icon="mdiAccount" placeholder="Last name"/>

        </FormField>
        <FormField >
          <FormControl v-model="model.address" :icon="mdiMapMarker"  placeholder="Address " />
          <FormControl v-model="model.email" type="email" :icon="mdiMail" placeholder="Email address" />

        </FormField>
      <div>
          <label class=" mb-2 last:mb-0 text-sm font-mediumtext-bold block font-bold ">Cover photo</label>
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
          <Camera   />

        </div>
         
        <div class="mt-3 grid grid-cols-2 " >
          <FormField label="Phone number" class="mt-5 " help="Enter member phone number">
            <FormControl
            :icon="mdiPhone"
              v-model="model.phone"
              type="tel"
              placeholder="Your phone number"
             />
  
          </FormField>
          <FormField label="Gender"  class="mt-5 ">
            <FormControl 
             id="gender"
            name="gender"
            v-model="model.gender"
            :value="selected"
            :options="selectOptions"
 
             />
           
          </FormField>
                   

        </div>
        <div class="grid grid-cols-3 sm:grid-cols-1 ssm:grid-cols-1 msm:grid-cols-1">

          <FormField label="Role"  class="mt-5 ">
            <FormControl 
             id="role"
            name="role"
            v-model="model.role"
          placeholder="Member role"

             />
           
          </FormField>
         
          <FormField label="Work field"  class="mt-5 ">
          
            <FormControl 
             id="work"
            name="work"
            v-model="model.work"
           placeholder="Member work filed"

             />
           
          </FormField>
          <FormField label="Work time"  class="mt-5 ">
            <FormControl 
             id="work_time"
            name="work_time"
            v-model="model.work_time"
           placeholder="Member work time "

             />
           
          </FormField>
        </div>
     



<input type="hidden" v-model="model.invoice_id">

     
      



 




        <BaseDivider />

      
         <!-- Status -->
         <div class="flex items-start mt-6">
          <div class="flex items-center h-5">
            <input
              id="status"
              name="status"
              type="checkbox"
              v-model="model.status"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600  rounded"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="status" class="font-medium  "
              >Active</label
            >
          </div>
        </div>



        <div class="px-6 py-5  text-right sm:px-6">


          <button
            type="submit"
            :class="PurpleToBlue"
            class="text-white"
          >
          {{ route.params.id ? "Update" : "Save" }}          </button>
        </div>

      </form>

      </CardBox>
    </SectionMain>

   </LayoutAuthenticated>
</template>
