<script>
import { reactive, ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
 import FormControl from "@/components/FormControl.vue";
 import FormField from "@/components/FormField.vue";

import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import ImageModel from "@/views/ImageModel.vue";

import axiosClient from "../axios";

export default {

components: { 
  ImageModel, 
Alert,
mdiAccount,
mdiMail,
mdiAsterisk ,
mdiFormTextboxPassword,
mdiGithub,
SectionMain,
CardBox,
BaseDivider,
FormField,
FormControl,
FormFilePicker,
BaseButton,
BaseButtons,
UserCard,
LayoutAuthenticated,
SectionTitleLineWithButton,
   },
 
   data(){
return{
password_current: " ",
password: " ",
password_confirmation: " ",
    notifmsg: '',
    notifupdate: '',

   
            
}
   },
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout").then(() => {
        router.push({
          name: "Login",
        });
      });
    }

    store.dispatch("getUser");

    return {
      userData: computed(() => store.state.user.data),
       logout,
    };
  },

  methods: {
    submitPass() {
        axiosClient
      .put('/change-password', {
        password_current: this.password_current,
        password: this.password,
        password_confirmation: this.password_confirmation,

      }).then((res )=>{
        if( res.data.error ){
          this.$store.commit("notify", {
        type: "error",
        message:  res.data.error,
       });
         //console.log(res.data)
        }else{
          this.$store.commit("notify", {
        type: "success",
        message:  res.data.success,
          });
        }
      
      }).catch((error) => {
    if (error.response.status === 422) {
      this.notifmsg = error.response.data.errors;

    } 
  
 });
 this.$store.dispatch("getUser");
 
 

  },
 
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="User Profile" main>
      
      </SectionTitleLineWithButton>
     
      <UserCard class="mb-6" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <ImageModel />
           <CardBox is-form @submit.prevent="submitPass">
 
 
            <div v-if="notifmsg">
              <div v-for="(v, k) in notifmsg" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                  {{ error }}
                </p>
              </div>
            </div>
            <FormField
              label="Current password"
              help="Required. Your current password"
            >
              <FormControl
                v-model="password_current"
                :icon="mdiAsterisk"
                name="password_current"
                type="password"
                required
                autocomplete="current-password"
              />
            </FormField>
  
            <BaseDivider />
  
            <FormField label="New password" help="Required. New password">
              <FormControl
                v-model="password"
                :icon="mdiFormTextboxPassword"
                name="password"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>
  
            <FormField
              label="Confirm password"
              help="Required. New password one more time"
            >
              <FormControl
                v-model="password_confirmation"
                :icon="mdiFormTextboxPassword"
                name="password_confirmation"
                type="password"
                required
                autocomplete="new-password"
              />
            </FormField>
  
            <template #footer>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Change Password" />
               </BaseButtons>
            </template>
          </CardBox>
      

      </div>
    </SectionMain>
  </LayoutAuthenticated>
 
  </template>
