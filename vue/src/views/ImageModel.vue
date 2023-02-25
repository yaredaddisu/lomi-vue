<script setup>
import { reactive ,watch ,ref } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
} from "@mdi/js";
import Alert from "../components/Alert.vue";

import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { useStore } from "vuex";

import { computed } from "vue";

import { useRoute, useRouter } from "vue-router";
import store from '../store'


const route = useRoute();
const router = useRouter();

const userData = computed(() => store.state.user.data);

watch(
  () => store.state.user.data,
  (newVal, oldVal) => {
    userData.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      
    };
  }
);


if (route.params.id) {
  store.dispatch("getUser", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    userData.value.image = reader.result;

    // The field to display here
    userData.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}

const errors = ref({});

function updateProfile(){
   if (userData.value.id) {
    store.dispatch('updateProfile', userData.value)
      .then(response => {
 
        if (response.data === 200) {
          // TODO show notification
          store.dispatch('getUser')
         }
      })
  }

 }
 store.dispatch('getUser')



</script>

<template>
 
        <CardBox is-form @submit.prevent="updateProfile">
            <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
                <div v-for="(field, i) of Object.keys(errors)" :key="i">
                  <div v-for="(error, ind) of errors[field] || []" :key="ind">
                    * {{ error }}
                  </div>
                </div>
              </Alert>
           <FormField label="Image" help="Upload Here">
                <!-- Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="userData.image_url"
                :src="userData.image_url"
                :alt="userData.title"
                class="w-64 h-48 object-cover rounded:md"
              />
              <span
                v-else
                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <input
                  type="file"
                  @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />
                Change
              </button>
            </div>
          </div>
          <!--/ Image -->     
            </FormField>

          <FormField label="Name" help="Required. Your name">
            <FormControl
              v-model="userData.name"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="userData.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>
          <FormField label="Phone number" help="Required. Your Phone number">
            <FormControl
              v-model="userData.phone"
              :icon="mdiMail"
              type="phone"
              name="phone"
              required
              autocomplete="phone"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Update Profile" />
             </BaseButtons>
          </template>
        </CardBox>
  
</template>
