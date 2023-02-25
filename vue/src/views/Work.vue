<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiAccountPlus
} from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { computed, ref } from "vue";
import TableWork from "@/components/TableWork.vue";
import FormField from "@/components/FormField.vue";

const isModalActive = ref(false);


</script>

<template>



  <CardBoxModal v-model="isModalActive"     has-cancel
   >

    </CardBoxModal>
  <LayoutAuthenticated>

    <SectionMain>

      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Users" main>


        <BaseButton
           target="_blank"
          :icon="mdiAccountPlus"
          label="Add New User"
          color="contrast"
          rounded-full
          small
          @click="isModalActive = true"

        />

      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
       <TableWork checkable />
       </CardBox>





    </SectionMain>
  </LayoutAuthenticated>
</template>
