<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
 import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiAccountPlus,
  mdiMonitor,
  mdiSitemap
} from "@mdi/js";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { PurpleToBlue } from "@/colors";
import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";

import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import axiosClient from "../axios.js";
import OverlayLayer from "@/components/OverlayLayer.vue";
 
import FormField from "@/components/FormField.vue";

import {useStore} from "vuex";
import { useRoute, useRouter } from "vue-router";

import MemberView from '@/views/MemberView.vue';

const store = useStore();
const router = useRouter();

const data = computed(()=>store.state.user.data);

 //const loading = computed(() => store.state.dashboard.loading);
const totalProduct = computed(() => store.state.dashboard.data);
const ProductLoading = computed(() => store.state.loading.data);

store.dispatch("getDashboardData");


const created_atOptions = computed(() => store.state.dateOptions);


const chosenDate = ref('all')

const isModalActive = ref(false);

const chartData = ref(null);

const customersCount = ref(0);
const totalIncome = ref(0);
const topMembers = ref(0);
const latestMembers = ref(0);
const todayMembers = ref(0);
 const yearMembers = ref(0);
 const monthMembers = ref(0);
 const userCount = ref(0);

 const inactiveCustomers = ref(0);

  const expired = ref(0);
  const usersIncome = ref(0);
  const UserYear = ref(0);
  const todayUser = ref(0);
  const monthUser = ref(0);

  
const productsCount = ref(0);

const loading = ref({
  customersCount: true,
  totalIncome: true,
  topMembers: true,
  latestMembers: true,
  todayMembers: true,
  monthMembers: true,
  yearMembers: true,
  inactiveCustomers: true,
  userCount: true,
  expired: true,
    productsCount: true,
    ///
    usersIncome: true,
    UserYear: true,
    todayUser: true,
    monthUser: true,

});

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};
const d = chosenDate.value


function updateDashboard(){
d
   loading.value = {
    customersCount: true,
    totalIncome: true,
    topMembers: true,
    latestMembers: true,
    todayMembers: true,
    monthMembers: true,
    yearMembers: true,
    inactiveCustomers: true,
    userCount: true,
    expired: true,
     productsCount: true,
///<--!users-->
usersIncome: true,
UserYear: true,
todayUser: true,
monthUser: true,

  }
  };

   

  axiosClient.get(`/dashboard/todayUser-count`, { d}).then(({data}) => {
    todayUser.value = data
    loading.value.todayUser = false;
  })
 axiosClient.get(`/dashboard/monthUser-count`, { d}).then(({data}) => {
    monthUser.value = data
    loading.value.monthUser = false;
  })
 

  axiosClient.get(`/dashboard/UserYear-count`, { d}).then(({data}) => {
    UserYear.value = data
    loading.value.UserYear = false;
  })
 
  axiosClient.get(`/dashboard/usersIncome-count`, { d}).then(({data}) => {
    usersIncome.value = data
    loading.value.usersIncome = false;
  })
  axiosClient.get(`/dashboard/users-count`, { d}).then(({data}) => {
    userCount.value = data
    loading.value.userCount = false;
  })
  axiosClient.get(`/products/year-count`, { }).then(({data}) => {
    productsCount.value = data
    loading.value.productsCount = false;
  })
axiosClient.get(`/dashboard/customers-count`, { d}).then(({data}) => {
    customersCount.value = data
    loading.value.customersCount = false;
  })


axiosClient.get(`/dashboard/inactiveCustomers-count`, { d}).then(({data}) => {
    inactiveCustomers.value = data
    loading.value.inactiveCustomers = false;
  })


  axiosClient.get(`/dashboard/income-amount`, {params: {d}}).then(({data}) => {
       totalIncome.value = data
      loading.value.totalIncome = false;
    })
    axiosClient.get(`/dashboard/top-members`, {params: {d}}).then(({data: members}) => {
    topMembers.value = members;
    loading.value.topMembers = false;
  })
    axiosClient.get(`/dashboard/latest-members`, {params: {d}}).then(({data: members}) => {
    latestMembers.value = members;
    loading.value.latestMembers = false;
  })
    
      
  
  store.dispatch("getUser");

  let userID = ref('');

onMounted(() => {
  fillChartData();
  updateDashboard();

  axiosClient.get(`/dashboard/users-expired`, {params: {d}}).then(({data: members}) => {
    expired.value = members;
    loading.value.expired = false;
  }).catch(({response}) => {
     userID.value = response.data.id;
   const id = response.data.id;

    if (response.status === 403) {
      store.dispatch("logout").then(() => {
    
        router.push({ name: 'pricing', params: { id } }) // -> /user/eduardo

      });
    }


 });
});

function onDatePickerChange() {
  updateDashboard()
};

 
const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);

function currentDate(){
  axiosClient.get(`/dashboard/today`, { d}).then(({data}) => {
    todayMembers.value = data
    loading.value.todayMembers = false;
  }); 
}
function currentMonth(){
  axiosClient.get(`/dashboard/month`, { d}).then(({data}) => {
    monthMembers.value = data
    loading.value.monthMembers = false;
  }); 
}
function currentYear(){
  axiosClient.get(`/dashboard/year`, { d}).then(({data}) => {
    yearMembers.value = data
    loading.value.yearMembers = false;
  }); 
}


 
</script>

<template>

 
 <div role="status" v-if="loading.value">

                  <OverlayLayer/>

       
         </div>

         <pre>{{ usersIncome }}</pre>
  <CardBoxModal v-model="isModalActive"     has-cancel
  >
    </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiMonitor"
        title="User Dashboard"
        main
      >
        
     
   <div class="flex items-center float-left mt-3 ml-3">
    
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            Data
            <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>
    
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button type="submit"  @click="currentDate(todayMembers)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Todays Data</button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button type="submit"  @click="currentMonth(monthMembers)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Month Data</button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button type="submit"  @click="currentYear(yearMembers)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">Year Data</button>
              </MenuItem>
               
            </div>
          </MenuItems>
        </transition>
      </Menu>
     
   
  </div>

  <BaseButton
  target="_blank"
 :icon="mdiAccountPlus"
 label="Add member"
 :color="PurpleToBlue"
 class="text-white"
 rounded-full
 small
 @click="isModalActive = true"

/>
      </SectionTitleLineWithButton>

      <div  class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
        v-if="!loading.customersCount"
          :class="TealToLime "
           trend-type="up"
           color="text-white"
           :icon="mdiAccountMultiple"
          :number="customersCount"
          label="Total Members "
        />
        <CardBoxWidget
          v-if="!loading.totalIncome"
          :class="RedToYellow "
           trend-type="down"
           color="text-white"
           :icon="mdiCartOutline"
          :number="totalIncome"
          :total="totalIncome"
          prefix="ETB  "
          label="Total Income"
        />
        <CardBoxWidget
        v-if="!loading.inactiveCustomers"
        :class="GreenToBlue "
         trend-type="down"
         color="text-white"
        :icon="mdiAccountMultiple"
        :number="inactiveCustomers"
         prefix=" "
        label="Inactive Customers "
       />
      
      <!--todays-->
        <CardBoxWidget
           v-if="!loading.todayMembers"
                   :class="GreenToBlue "

           trend-type="up"
           color="text-white"
           :icon="mdiAccountMultiple"
          :number="todayMembers.todayMembers"
          suffix=""
          label="Today Registerd"
        />
        <CardBoxWidget
        v-if="!loading.todayMembers"
                :class="cyanToBlue "

        trend-type="up"
        color="text-white"
        :icon="mdiCartOutline"
        :total="todayMembers.todayIncome"
       :number="todayMembers.todayIncome"
       suffix=""
       label="Todays Income"
     />    
     <CardBoxWidget
     v-if="!loading.monthMembers"
             :class="cyanToBlue "

        trend-type="down"
        color="text-white"
        :icon="mdiAccountMultiple"
    :number="monthMembers.monthMembers"
    suffix=""
    label="This Month Registerd"
  />
  <CardBoxWidget
  v-if="!loading.monthMembers"
 :class="cyanToBlue "
  trend-type="down"
  color="text-white"
  :icon="mdiCartOutline"
  :total="monthMembers.monthIncome"
 :number="monthMembers.monthIncome"
 suffix=""
 label="This Month Income"
/>  
  <!--- year-->
     <CardBoxWidget
     v-if="!loading.yearMembers"
      :class="RedToYellow "
     trend-type="up"
     color="text-white"
     :icon="mdiAccountMultiple"
    :number="yearMembers.yearMembers"
    suffix=""
    label="This Year Registerd"
  />
  <CardBoxWidget
  v-if="!loading.yearMembers"
   :class="TealToLime "
  trend-type="up"
  color="text-white"
  :icon="mdiCartOutline"
  :total="yearMembers.yearIncome"
 :number="yearMembers.yearIncome"
 suffix=""
 label="This Year Income"
/>    
   
 

 


 


      </div>
      <div  class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" v-if="data.is_admin == 1">

        <CardBoxWidget
          :class="PurpleToBlue "
        trend-type="up"
        color="text-white"
        :icon="mdiAccountMultiple"
        :total="userCount"
       :number="userCount"
       suffix=""
       label="Total Users"
      />    
         
      <CardBoxWidget
      :class="cyanToBlue "
     trend-type="up"
     color="text-white"
     :icon="mdiAccountMultiple"
     :total="monthUser.monthUsers"
     :number="monthUser.monthUsers"
     suffix=""
     label="Total Month User "
     />     
      <CardBoxWidget
      :class="GreenToBlue "
     trend-type="up"
     color="text-white"
     :icon="mdiAccountMultiple"
     :total="UserYear.yearUsers"
     :number="UserYear.yearUsers"
     suffix=""
     label="Total Year User"
     />   
    
       <CardBoxWidget
      :class="PurpleToPink "
     trend-type="up"
     color="text-white"
     :icon="mdiAccountMultiple"
     :total="todayUser.todayUsers"
     :number="todayUser.todayUsers"
     suffix=""
     label="Total Today User "
     />  
      <CardBoxWidget
       :class="PinkToOrange "
      trend-type="up"
      color="text-white"
      :icon="mdiCartOutline"
      :total="usersIncome"
      :number="usersIncome"
      suffix=""
      label="Total Users Income"
      />    
       
      <CardBoxWidget
       :class="TealToLime "
      trend-type="up"
      color="text-white"
      :icon="mdiCartOutline"
      :total="UserYear.yearIncome"
      :number="UserYear.yearIncome"
      suffix=""
      label="Total Year User Income"
      />  
          
      <CardBoxWidget
       :class="RedToYellow "
      trend-type="up"
      color="text-white"
      :icon="mdiCartOutline"
      :total="monthUser.monthIncome"
      :number="monthUser.monthIncome"
      suffix=""
      label="Total Month User Income"
      />   
          
      <CardBoxWidget
       :class="TealToLime "
      trend-type="up"
      color="text-white"
      :icon="mdiCartOutline"
      :total="todayUser.todayIncome"
      :number="todayUser.todayIncome"
      suffix=""
      label="Total Today User Income"
      />     
        
      </div>
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <b class="m-4">Latest Members</b>
           <CardBoxTransaction
            v-for="transaction in latestMembers.data"
            :key="transaction.id"
            :firstname="transaction.firstname"
            :created_at="transaction.created_at"
            :image_url="transaction.image_url"
            :email="transaction.email"
            :lastname="transaction.lastname"
            :price="transaction.price"

           />
        </div>
 
         <div class="flex flex-col justify-between">
          <b class="m-4">Top Participated Members</b>
         
          <CardBoxClient
            v-for="client in topMembers.data"
            :key="client.id"
            :firstname="client.firstname"
            :lastname="client.lastname"
            :image_url="client.image_url"
            :price="client.price"
            :updated_at="client.updated_at"
            
           />
 
        </div>


      </div>

      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
      <SectionTitleLineWithButton :icon="mdiSitemap" title="Product Dashboard  " />
        
       <div  class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6" >
        <CardBoxWidget
        v-if="!loading.productsCount.totalPrice"
          :class="TealToLime "
           trend-type="up"
           color="text-white"
           :icon="mdiCartOutline"
          :number="productsCount.totalPrice"
          :total="productsCount.totalPrice"
          prefix="ETB"
          label="Total Invested Price "
        />
        <CardBoxWidget
          v-if="!loading.productsCount.totalSold"
          :class="RedToYellow "
           trend-type="down"
           color="text-white"
           :icon="mdiCartOutline"
           :total="productsCount.totalSold"
          :number="productsCount.totalSold"
          prefix="ETB "

           label="Total Sold"
        />
        <CardBoxWidget
        v-if="!loading.productsCount.profit"
        :class="GreenToBlue "
         trend-type="down"
         color="text-white"
        :icon="mdiCartOutline"
        :total="productsCount.profit"
        :number="productsCount.profit"
        prefix="ETB "
        label="Total Profit Gain "
       />
 
       </div>

      <SectionTitleLineWithButton :icon="mdiMonitor" title="User Dashboard">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox has-table>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
