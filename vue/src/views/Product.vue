<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus,
  mdiSitemap
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableProducts from "@/components/TableProducts.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
import router from "@/router";
import store from "@/store";
import FormField from "@/components/FormField.vue";

 
const isModalActive = ref(false);


function createProduct(){
router.push('/products/create')
 

}


</script>

<template>
   


  <CardBoxModal v-model="isModalActive"     has-cancel
   >
  
    </CardBoxModal>
  <LayoutAuthenticated>
    
    <SectionMain>
     
      <SectionTitleLineWithButton :icon="mdiSitemap" title="Products" main>
        
         
        <BaseButton
        target="_blank"
       :icon="mdiSitemap"
       label="Add Product"
       color="contrast"
       rounded-full
       small
       @click="createProduct"

     />

        
        
      </SectionTitleLineWithButton>
       <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableProducts checkable />
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
