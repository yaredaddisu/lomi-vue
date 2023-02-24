<script setup>
import { reactive, computed,onMounted, ref ,watch} from "vue";
import { mdiBallotOutline, mdiPrinterOutline,mdiEye, mdiAccount,mdiTrashCanOutline , mdiMail, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple
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
 
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const router = useRouter();

const loading = computed(() => store.state.currentMember.loading);

const fields = computed(() => store.state.fields.data );
 
const isModalActive = ref(false);


let model = ref({
  id:'',
  firstname:"",
  lastname:"",
  address:"",
  status: false,
  email: null,
  image_url: null,
  day_left: null,
  price: "0",
  priceUpdate: "0",
  gender:null,
  questions: []
 
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
 
 
const selectPayment = [
   "Cash" ,
   "Bank" ,

]; 
 


 function  onChange(event){
              
  
              this.ops.radio = event.target.value;
              console.log(this.ops.radio);
          }
 
          const checked = ref([]);

 
 
   
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

let isCheckAll = ref(true);

function checkAll(){

this.isCheckAll = !this.isCheckAll;
this.checked = [];
if(this.isCheckAll){ // Check all
  for (var key in this.model.questions) {
    this.checked.push(this.model.questions[key]);
  }
}
};
function updateCheckall(){
if(this.checked.length == this.model.questions.length){
   this.isCheckAll = true;
}else{
   this.isCheckAll = false;
}
};

function deleteMemberPayment(checked){
 if(checked.length){
  if(confirm(`Are you sure you want to delete this payment? Operation can't be undone!!`
))
{
store.dispatch('deleteMemberPayment', checked)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'Payment was successfully deleted!'
  })
  router.push({
 
     name: "Payment",
     params: { id: route.params.id },
     
   });
   store.dispatch('getMember');

})
}
 }else{
  store.commit('notify', {
    type: 'success',
    message: 'No data selected To delete'
  })
 }

}

function saveMember() {
 
 let total = eval(
   parseInt(model.value.price) +(ops.value.radio)+ parseInt(model.value.priceUpdate)
           );
 const newQuestion = {
   id: uuidv4(),
   pricePayment:  model.value.price,
   priceUpdate:  model.value.priceUpdate,
   total: total,
   payment_type:model.value.payment_type,
   invoice_id: model.value.priceUpdate + Math.random().toString(10).slice(10)
 };

 model.value.questions =   [newQuestion];
;

if(model.value.priceUpdate == 0){
 model.value.price =  model.value.price ;
 alert("The price field must be greater than 0")

}else{
 if(ops.value.radio !== null){
   model.value.price = eval(
         parseInt(model.value.price)  +(ops.value.radio)+ parseInt(model.value.priceUpdate),

         model.value.priceUpdate = 0
       );
   

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
     name: "Payment",
     params: { id: data.data.id },
   });
   }).catch((error) => {
     if (error.response.status === 422) {
       errors.value = error.response.data.errors;
     }
   });
 }


}


}
 
function print(client){
 // window.print(client);

 const route = this.router.resolve({
  name:"print",
  params: {id: client.id}

 });
 window.open(route.href,'_blank')

}
store.dispatch("getUser");

</script>

<template>
  
 

 
      <SectionMain>



      <CardBox class="shadow-xl" >
         <div role="status" v-if="loading"> 
           <OverlayLayer />
        </div>
        <div class="mb-20"> 
         <div  class="lg:flex lg:flex-col-4 grid grid-cols-2 mb-20 items-center yared bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-192 rounded-t-lg h-[200px] md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="model.image_url" alt="">
          <div class="flex flex-col justify-between p-4 leading-normal">
               <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Full name: {{ model.firstname }} {{ model.lastname }}</h5>
          
          <p class="mb-3 font-bold font-serif text-gray-700 dark:text-gray-400">Phone number:  {{ model.phone }}</p>
          <p class="mb-3 font-bold font-serif text-gray-700 dark:text-gray-400">Email:  {{ model.email }}</p>
          <p class="mb-3 font-bold font-serif text-gray-700 dark:text-gray-400">Gender:  {{ model.gender }}</p>

          </div>
          
      </div>
      

      <form  @submit.prevent="saveMember">
        <div class="grid grid-cols-3 gap-4     grid:ssm ssm:grid-cols-1  grid:msm msm:grid-cols-1">
   
   
   
   
         <FormField label="Total price" class="mt-5 " help="This is total price of member">
   
   
        <button type="button" class="text-white bg-gradient-to-r w-full h-[50px] from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-" disabled>{{ $filters.currencyUSD(model.price) }}</button>
   
   
   
   
       </FormField>
   
           <FormField label="Add or minus price" class="mt-5 "  >
   
   
   
   <div class="flex items-center " >
     <input v-model="radio" @change="onChange($event)" id="default-radio-1" type="radio" :value="ops.plus" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
     <label for="default-radio-1"   class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add price</label>
   </div>
   
   <div class="flex items-center" v-if="route.params.id">
     <input v-model="radio"   @change="onChange($event)" id="default-radio-2" type="radio" :value="ops.minus" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
     <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Minus price</label>
   </div>
   
   
   
   
   
   
       </FormField>
   
   
         <FormField label="Enter price" class="mt-5 " help="Enter payment price ">
           <FormControl
              type="text"
              v-model="model.priceUpdate"
   
              placeholder="Enter price"
            />
   
         </FormField>
         </div>
        

               <div class="grid grid-cols-2 gap-4     grid:ssm ssm:grid-cols-1  grid:msm msm:grid-cols-1">
                <FormField label="Payment type">

                  <FormControl 
                   id="payment_type"
                  name="payment_type"
                  v-model="model.payment_type"
                  :value="selected"
                  :options="selectPayment"
                   
                   />     
                       </FormField>
               <!-- Expire Date -->
               <FormField label="Expire Date"    >
                 <FormControl
                 type="date"
                 name="day_left"
                 id="day_left"
                 v-model="model.day_left"
                 class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md"
                 
               ></FormControl>
               </FormField>
               <!--/ Expire Date -->
     
              </div>

              <Date class="black:text-black" />

         <div class="px-6 py-5  text-right sm:px-6">


          <button
            type="submit"
            :class="PurpleToBlue"
            class="text-white"
          >
          {{ route.params.id ? "Update" : "Save" }}          </button>
        </div>
   </form>

  </div>

                    <NotificationBarInCard
        :color="formStatusOptions[formStatusCurrent]"
        :is-placed-with-header="formStatusWithHeader"
        class="mt-12"
      >
      <div class="block ">
        <span
        >
         <h1  class="text-xl font-bold text-white float-left">

          Member payment detail
        </h1>

     
         </span
      >
    
      <BaseButton
      :label=" model.total"
      class="w-12 h-10 ml-6 rounded-full mr-6"
      
      />
    <BaseButton
   
   class="w-[200px] float-left sm:ssm:msm:mt-3 md:float-right lg:float-right" 
   :icon="  mdiTrashCanOutline "
  label="Delete Checked"
  color="contrast"
  rounded-full
  small
  @click="deleteMemberPayment(checked)"
 
 />
  
   
       </div>

      </NotificationBarInCard>
<div class=" overflow-auto  h-96 yared" >
       <table v-if="model.questions.length" >
        <thead>
          <tr>
            <th> 
               <input type='checkbox' @click='checkAll()' v-model='isCheckAll'>
            </th>             
            <th>Previous payment</th>
            <th>Current payment</th>
            <th>Total payment</th>
            <th>Invoice ID</th>
            <th>Paid date</th>
            <th>Payment Type</th>
             <th>View</th>

          
          </tr>
        </thead>
        <tbody >
          <tr v-for="client in model.questions" :key="client.id" >
            <td>
              <input type='checkbox' :value='client' v-model='checked' @change='updateCheckall()'>

         </td> 
            
          
            <td data-label="Current payment">
              {{ $filters.currencyUSD(client.pricePayment) }}
            </td>
            <td data-label="Previous payment">
              {{ $filters.currencyUSD(client.priceUpdate) }}
            </td>
            <td data-label="Total payment">
              {{ $filters.currencyUSD(client.total) }}
            </td>
              <td data-label="Invoice ID">
              {{ client.invoice_id }}
            </td>
             
            <td data-label="Paid date" class="lg:w-1 whitespace-nowrap">
              <small
                 :title="client.created_at"
                >{{ client.created_at }}</small
              >
            </td>
            <td data-label="Payment type" class="lg:w-1 whitespace-nowrap">
              <small
                 :title="client.payment_type"
                >{{ client.payment_type }}</small
              >
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">


              <BaseButtons type="justify-start lg:justify-end" no-wrap>
    
                <BaseButton
                  color="info"
                  :icon="mdiEye"
                  small

                  @click="print(client)"
                  />
               
              </BaseButtons>
    
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1">
            <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p class="font-bold">Ooops Their is Something Error</p>
            <p class="text-sm">Their is no data found here.</p>
          </div>
        </div>
      </div>
    </div>
      </CardBox>
    </SectionMain>

 </template>

 
