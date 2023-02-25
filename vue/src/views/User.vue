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
import TableUser from "@/components/TableUser.vue";
import FormField from "@/components/FormField.vue";
import router from "@/router";
import store from '../store';

const isModalActive = ref(false);

const use = computed(() => store.state.user.data);

function addUser()
{
  router.push('/users/create')
}
</script>

<template>



  <CardBoxModal v-model="isModalActive"     has-cancel
   >

    </CardBoxModal>
  <LayoutAuthenticated  >

    <SectionMain v-if="use.is_admin == 1">
       <SectionTitleLineWithButton :icon="  mdiAccountPlus
      " title="Users" main>


        <BaseButton
           target="_blank"
          :icon="mdiAccountPlus"
          label="Add User"
          color="contrast"
          rounded-full
          small
          @click="addUser()"

        />

      </SectionTitleLineWithButton>
      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox class="mb-6" has-table>
       <TableUser checkable />
       </CardBox>





    </SectionMain >

    <SectionMain v-else>
      <p>Unautorized Action</p>
    </SectionMain >
  </LayoutAuthenticated>
</template>
