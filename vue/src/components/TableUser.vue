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
import store from "@/store";
 import router from "@/router";
import Counter from "@/components/Counter.vue";
 import OverlayLayer from "@/components/OverlayLayer.vue";
  import FormControl from "@/components/FormControl.vue";
  import axiosClient from "../axios.js";


defineProps({
  checkable: Boolean,
  });



const search = ref('');
 const sortField = ref('updated_at');
const sortDirection = ref('desc')

const users = computed(() => store.state.users.data);
const loading = computed(() => store.state.users.loading);
const user = computed(() => store.state.user.data);

store.dispatch('getUsers', { search: search.value});


  watch(search, ( newValue, oldValue ) => {
    store.dispatch("getUsers", {
      search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });


})
function getUsers(url = null) {
  store.dispatch("getUsers", {
    url,
    search: search.value,
    sort_field: sortField.value,
    sort_direction: sortDirection.value
  });
}


onMounted(() => {
  getUsers();
})

function sortusers(field) {
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

  getUsers()
}
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  getUsers(link.url)
}

function createUser(){
router.push('/users/create')
store.dispatch("getUsers");

}
function deleteUser(member){

if(confirm(`Are you sure you want to delete this user? Operation can't be undone!!`
))
{
store.dispatch('deleteUser', member.id)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'User was successfully deleted!'
  })
store.dispatch('getUsers');
})

}
}

function deleteAllUser(checked){
 if(checked.length){
  if(confirm(`Are you sure you want to delete this user? Operation can't be undone!!`
))
{
store.dispatch('deleteAllUser', checked)
.then(()=>{
  store.commit('notify', {
    type: 'success',
    message: 'User was successfully deleted!'
  })
store.dispatch('getUsers');
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
users.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(users.value.length / perPage.value));

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

  arr.forEach((member) => {
    if (!cb(member)) {
      newArr.push(member);
    }
  });

  return newArr;
};




function checkAll(){

this.isCheckAll = !this.isCheckAll;
this.checked = [];
if(this.isCheckAll){ // Check all
  for (var key in this.users) {
    this.checked.push(this.users[key]);
  }
}
};
function updateCheckall(){
if(this.checked.length == this.users.length){
   this.isCheckAll = true;
}else{
   this.isCheckAll = false;
}
};
store.dispatch("getUser");


const activeUsers = ref(0);
const InactiveUsers = ref(0);

 

 

function updateDashboard(){
   loading.value = {
    activeUsers: true,
    InactiveUsers: true,


  }
  };

   

  axiosClient.get(`/activeUsers`, { }).then(({data}) => {
    activeUsers.value = data
   })
 axiosClient.get(`/InactiveUsers`, { }).then(({data}) => {
    InactiveUsers.value = data
   })
  onMounted(() => {
   updateDashboard();
  });

</script>

<template>
<div class="border">
    <div class="flex items-center float-left mt-3 ml-3">
     <select @change="getUsers(null)" v-model="perPage"
            class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
<div v-for="user in users" :key="user.id">

 <button
    @click="deleteAllUser(checked)"
        v-if="user.is_super_admin == 1 && user.is_admin == 1 "
    type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete</button>
    <button
    @click="createUser()"
    v-if="user.is_super_admin == 1 && user.is_admin == 1 "
    type="button" class="ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create User</button>


</div>

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
      </div>
        </div>
        <div class="float-left ">
          <BaseButton
          color="lightDark"
         label="Active Users "  
         :icon="mdiOpenInNew"
         :small="buttonsSmall"
         :outline="buttonsOutline"
         :disabled="buttonsDisabled"
         :rounded-full="buttonsRounded"
        
        />
         <BaseButton
        color="success"
 
        :label="activeUsers"
        :icon="mdiOpenInNew"
        :small="buttonsSmall"
        :outline="buttonsOutline"
        :disabled="buttonsDisabled"
        :rounded-full="buttonsRounded"
        class="w-12 h-10 rounded-full mr-6 mt-3"
        
        />
        <BaseButton
          color="lightDark"
         label="In active Users "  
         :icon="mdiOpenInNew"
         :small="buttonsSmall"
         :outline="buttonsOutline"
         :disabled="buttonsDisabled"
         :rounded-full="buttonsRounded"
        
        />
         <BaseButton
         color="danger"
        :label="InactiveUsers"
        :icon="mdiOpenInNew"
        :small="buttonsSmall"
        :outline="buttonsOutline"
        :disabled="buttonsDisabled"
        :rounded-full="buttonsRounded"
        class="w-12 h-10 rounded-full"
        />

         </div>
    

<div>
  <table>

    <thead class="w-full">
       
      <tr class="w-full">
         <th>  <input type='checkbox' @click='checkAll()' v-model='isCheckAll'>
        </th>

        <th field="name" :sort-field="sortField" :sort-direction="sortDirection"
                           @click="sortusers('name')">
                          Full Name
          </th>

        <th field="email" :sort-field="sortField" :sort-direction="sortDirection"
        @click="sortusers('email')">Email Address</th>
  <th>Days Left</th>
  <th>Role</th>

  <th field="status" :sort-field="sortField" :sort-direction="sortDirection"
  @click="sortusers('status')">Status</th>

        <th field="updated_at" :sort-field="sortField" :sort-direction="sortDirection"
        @click="sortusers('updated_at')">Updated</th>
 
        <th>Action</th>

        
      </tr>
    </thead>
    <tbody v-if="loading || !users.length">
      <tr>
        <td colspan="12">
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
    <tbody>
       <tr class="w-full" v-for="member in itemsPaginated" :key="member.id">

         <div v-if="member.is_super_admin == 0">
          <td>
              <input type='checkbox' :value='member' v-model='checked' @change='updateCheckall()'>

         </td>  </div>
         <div v-else-if="member.is_super_admin == 1 && member.id !== user.id">
         <td >
             Super Admin

         </td>
         </div>

         <div v-else-if="member.id === user.id">
              <td >
              <input type='checkbox' :value='member' v-model='checked' @change='updateCheckall()'>
         </td>
         </div>

         <div>
          
          <BaseButton
          v-if="member.plans > 0"
          class="rounded-full w-8 h-8 ml-2"
          :label="member.plans"
          color="info"
          :icon="mdiOpenInNew"
          :small="buttonsSmall"
          :outline="buttonsOutline"
          :disabled="buttonsDisabled"
         />
      </div>
        <router-link       
         :to="{ name: 'UserDetail', params: { id: member.id } }">
         <td class="border-b-0 lg:w-6 before:hidden"
>
          <div class="relative w-12 h-12 transition-all  rounded-md transform hover:scale-125">
            <img class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"  :src="member.image_url" alt="user image" />
           
          </div>
          
        </td>
      </router-link>
        <td data-label="FullName"  class="mr-6">
          {{ member.name }}
        </td>
        <td data-label="Email" 
        class="mr-6">
          {{ member.email }}
        </td>
        <td v-if="member.is_admin == 0 ">
          <Counter
          :year="new Date(member.day_left).getFullYear()"
          :month="new Date(member.day_left).getMonth()"
          :date="new Date(member.day_left).getDate()"
          :hour="new Date(member.day_left).getHours()"
          :minute="new Date(member.day_left).getMinutes()"
          :second="new Date(member.day_left).getSeconds()"
          class="gap-x-2 md:max-w-md	sm:max-w-sm	lg:max-w-lg "
          /> 
        </td>
        <td v-else>

          <a href="#" class="w-[340px]  block gap-x-2 md:max-w-md	sm:max-w-sm	lg:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Super Admin</h5>
         </a>
        
        </td>
         <td data-label="Is Admin"
        :class="[
          member.is_admin != 0
            ? 'text-sky-800'
            : 'text-rose-500',

        ]"
        >
          {{ member.is_admin != 0  ? "Admin" : "User"}}
        </td>


 <td data-label="Status"
        :class="[
          member.status != 0
            ? 'text-green-500'
            : 'text-red-500',

        ]"
        >
          {{ member.status != 0 ? "Active" : "In Active"}}
        </td>

        <td data-label="Updated Date" class="lg:w-1 whitespace-nowrap">
          <small
            class="text-gray-500 dark:text-slate-400"

            >{{ member.updated_at }}</small
          >
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">


          <BaseButtons v-if="member.is_super_admin == 0" type="justify-start lg:justify-end" no-wrap>
 
         
            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="{ name: 'UserView', params: { id: member.id } }"
              />
 
 <BaseButton


            v-if="user.id"
              color="danger"
              :icon="mdiTrashCan"
              small
              type="button"
              @click="deleteUser(member)"
              />
          
          </BaseButtons>

<BaseButtons v-else-if="user.id === member.id" type="justify-start lg:justify-end" no-wrap>


            <BaseButton
              color="info"
              :icon="mdiEye"
              small
              :to="{ name: 'UserView', params: { id: member.id } }"
              />
            <BaseButton


            v-if="member.id"
              color="danger"
              :icon="mdiTrashCan"
              small
              type="button"
              @click="deleteMember(member)"
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

