<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus,
  mdiSecurity
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
 import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref , onMounted} from "vue";
import FormField from "@/components/FormField.vue";
import Help from "@/components/Help.vue";
import axiosClient from "../axios.js";

const isModalActive = ref(false);


 
 
const help = ref(0);

const loading = ref({
 
 
  help: true,

});

 

function updateDashboard(){

   loading.value = {
   
    help: true,

  }
  };


  axiosClient.get(`/get-help`, { }).then(({data}) => {
    help.value = data
    loading.value.help = false;
  })

  
onMounted(() => {
 
  updateDashboard();
})
 


</script>

<template>
   


  <CardBoxModal v-model="isModalActive"     has-cancel
   >
  
    </CardBoxModal>
  <LayoutAuthenticated>
    
    <SectionMain>
    
      <SectionTitleLineWithButton :icon="mdiSecurity" title="Help and Support" main>
        
        
       
        
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="shadow-xl" >
        <div v-for="data in help.data" :key="data.id">
         <p>{{ data.help }}</p>
        </div>
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
