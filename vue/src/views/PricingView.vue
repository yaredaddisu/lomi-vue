<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus,
  mdiCashMultiple
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TablePlan from "@/components/TablePlan.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
import store from '@/store';
import router from '@/router';

const isModalActive = ref(false);


function Plan(){
store.dispatch('getPlans');
router.push('/plans/create');
 
}

</script>

<template>
   


  <CardBoxModal v-model="isModalActive"     has-cancel
   >
  
    </CardBoxModal>
  <LayoutAuthenticated>
    
    <SectionMain>
    
      <SectionTitleLineWithButton :icon="mdiCashMultiple" title="Plans" main>
        <BaseButton
           :icon="mdiCashMultiple"
          label="Add  Plan"
          color="contrast"
          rounded-full
          small
          @click="Plan"

        />
    
      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
        <TablePlan checkable />
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
