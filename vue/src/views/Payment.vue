<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus,
  mdiArrowLeft 
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
import FormField from "@/components/FormField.vue";
import MemberPayment from "@/components/MemberPayment.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const isModalActive = ref(false);

function goBack(){
  router.push({
      name: "members",
      params: { id: route.params.id },
    });
}

</script>

<template>
   


  <CardBoxModal v-model="isModalActive"     has-cancel
   >
  
    </CardBoxModal>
  <LayoutAuthenticated>
    
    <SectionMain>
    
      <SectionTitleLineWithButton :icon="mdiAccountPlus" title="Member payment detail" main>
        
        
        <BaseButton
           target="_blank"
          :icon="mdiArrowLeft "
          label="Back"
          color="contrast"
          rounded-full
          small
         @click="goBack()"
        />
        
      </SectionTitleLineWithButton>
 

      <CardBox class="mb-6" has-table>
        <MemberPayment checkable />
      </CardBox>

 
     

      
    </SectionMain>
  </LayoutAuthenticated>
</template>
