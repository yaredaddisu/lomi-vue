<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiHelpCircle 
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableHelp from "@/components/TableHelp.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
 import store from "../store";
import OverlayLayer from "@/components/OverlayLayer.vue";
 
 import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const router = useRouter();

store.dispatch('getHelps');


function goTo(){
  store.dispatch('getHelps');
router.push('/help/create');
}

const isModalActive = ref(false);


</script>

<template>
   


 
  <LayoutAuthenticated>
    
    <SectionMain>
    
      <SectionTitleLineWithButton :icon="mdiHelpCircle" title="Help and Privacy
      " main>
        


  <CardBoxField v-model="isModalActive" title="Add Help">
    

  </CardBoxField>
     
    <BaseButton
    target="_blank"
   :icon="  mdiHelpCircle  "
   label="Add Help"
   :color="PurpleToBlue"
   class="text-white"
   rounded-full
   small
   @click="goTo() "
  
  />
        
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TableHelp checkable />
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
