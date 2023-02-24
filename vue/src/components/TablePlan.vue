<script setup>
import { computed, ref, watch, onMounted } from "vue";
//import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import store from "../store";
 import router from "@/router";
import Counter from "@/components/Counter.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import FormControl from "@/components/FormControl.vue";


defineProps({
  checkable: Boolean,
  });


//const plans = computed(()=> store.state.plans.data);


//store.dispatch('getPlans');



//const mainStore = useMainStore();

//const items = computed(() => mainStore.plans);

const search = ref('');
 const sortField = ref('updated_at');
const sortDirection = ref('desc')

const plans = computed(() => store.state.currentPrice.data);
const loading = computed(() => store.state.currentPrice.loading);

store.dispatch('getPlans', { search: search.value});


  watch(search, ( newValue, oldValue ) => {
    store.dispatch("getPlans", {
      search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });


})
function getPlans(url = null) {
  store.dispatch("getPlans", {
    url,
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}


onMounted(() => {
  getPlans();
})
function createPlan(){
router.push('/plans/create')
store.dispatch("getPlans");

}
function sortPlans(field) {
  if (field === sortField.value) {
    if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = 'desc'
    }
  } else {
    sortField.value = field;
    sortDirection.value = 'asc'
  }

  getPlans()
}
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  getPlans(link.url)
}
function deletePlan(plan){

if(confirm(`Are you sure you want to delete this plan? Operation can't be undone!!`
))
{
store.dispatch('deletePlan', plan.id)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'Plan was successfully deleted!'
  })
store.dispatch('getPlans');
})

}
}

function deletePlanAll(checked){
 if(checked.length){
  if(confirm(`Are you sure you want to delete this plan? Operation can't be undone!!`
))
{
store.dispatch('deletePlanAll', checked)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'Plan was successfully deleted!'
  })
store.dispatch('getPlans');
})
}
 }else{
  store.commit('notify', {
    type: 'success',
    message: 'No data Selected To delete'
  })
 }

}
const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checked = ref([]);

const itemsPaginated = computed(() =>
plans.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(plans.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((plan) => {
    if (!cb(plan)) {
      newArr.push(plan);
    }
  });

  return newArr;
};




function checkAll(){

this.isCheckAll = !this.isCheckAll;
this.checked = [];
if(this.isCheckAll){ // Check all
  for (var key in this.plans) {
    this.checked.push(this.plans[key]);
  }
}
};
function updateCheckall(){
if(this.checked.length == this.plans.length){
   this.isCheckAll = true;
}else{
   this.isCheckAll = false;
}
};
store.dispatch("getUser");


</script>

<template>




<div class="border">

   <div class="flex items-center float-left mt-3 ml-3">
     <select @change="getPlans(null)" v-model="perPage"
            class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <span class="ml-3">Found {{plans.total}} products</span>
      <button
    @click="deletePlanAll(checked)"
    type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete  </button>
  <button
    @click="createPlan( )"
    type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create Plan</button>

   </div>




      <label for="default-search" class=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative float-right mt-3 mr-3 ">
        <FormControl
        placeholder="Search (ctrl+k)"
        ctrl-k-focus
        transparent
        borderless
        v-model="search" 
           type="search"
      />
        </div>   </div>
 
<div >
  <table>

    <thead>
      <tr>
         <th>  <input type='checkbox' @click='checkAll()' v-model='isCheckAll'>
        </th>
        <th>No Image</th>

        <th field="planType" :sort-field="sortField" :sort-direction="sortDirection"
                           @click="sortplans('planType')">
                        Plan Type
          </th>

        <th field="description" :sort-field="sortField" :sort-direction="sortDirection"
        @click="sortplans('description')">Description</th>
        <th>Status</th>
        <th field="price" :sort-field="sortField" :sort-direction="sortDirection"
        @click="sortplans('price')"> Price</th>
        <th field="updated_at" :sort-field="sortField" :sort-direction="sortDirection"
        @click="sortplans('updated_at')">Updated At</th>
        <th>Action</th>

        
      </tr>
    </thead>
    <tbody v-if="loading || !plans.length">
      <tr>
        <td colspan="6">
          <div v-if="loading">

            <OverlayLayer />
          </div>
          
          <div v-else class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div class="flex">
              <div class="py-1">
                <svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p class="font-bold">Ooops their is smething error</p>
                <p class="text-sm">Their is no data found here.</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    <tbody v-else>
       <tr v-for="plan in itemsPaginated" :key="plan.id">
         <td>     <input type='checkbox' :value='plan' v-model='checked' @change='updateCheckall()'>
         </td>

         <td class="border-b-0 lg:w-6 before:hidden">
          <div class="relative w-12 h-12 transition-all  rounded-md transform hover:scale-125">
            <img class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"  :src="plan.image_url" alt="No image" />
           </div>
        </td>
        <td data-label="FirstName">
          {{ plan.planType }}
        </td>
        <td data-label="LastName">
          {{ plan.description }}
        </td>


        


        <td data-label="Status"  class="m-2" 
        :class="[
          plan.status != 0
            ? 'text-green-600'
            : 'text-red-600',

        ]"
        >
          {{ plan.status != 0 ? "Active" : "In Active"}}
        </td>

      <td data-label="Price" class="lg:w-1 whitespace-nowrap">
          <b
            class="text-gray-500 dark:text-slate-400"

            >{{ plan.price }}</b
          >
        </td>
        <td data-label="Updated Date" class="lg:w-1 font-bold whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"

            >{{ plan.updated_at }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">


          <BaseButtons type="justify-start lg:justify-end" no-wrap>

            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="{ name: 'AddPlan', params: { id: plan.id } }"
              />
            <BaseButton


            v-if="plan.id"
              color="danger"
              :icon="mdiTrashCan"
              small
              type="button"
              @click="deletePlan(plan)"
              />
          </BaseButtons>

        </td>
      </tr>
    </tbody>
  </table>


  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>

  </div>
</div>
   


</template>

