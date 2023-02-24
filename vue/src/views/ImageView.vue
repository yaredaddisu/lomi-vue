<template>


 
          <div role="status" v-if="loading">
           <OverlayLayer />
        </div>
        <div  v-for="client in plans" :key="client.id">
            <div  v-if="route.params.id == client.id">
        
               
        <img class="h-auto w-full" :src="client.image_url" alt="image reciept">
        
        
            </div>
        
        </div>
    

</template>

<script setup>
import { reactive, computed,onMounted, ref ,watch} from "vue";
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
 import FormControl from "@/components/FormControl.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
 import store from '../store';
 import { useRoute, useRouter } from "vue-router";
 import Alert from "@/components/Alert.vue";
 import Date from "@/components/Date.vue";
 import { PurpleToBlue } from "@/colors";
import OverlayLayer from "@/components/OverlayLayer.vue";
import QuestionViewer from "@/components/QuestionViewer.vue";
import FormField from "@/components/FormField.vue";

const route = useRoute();
const router = useRouter();

const plans = computed(()=>store.state.plans.data);
store.dispatch("getUserPlans");

function users(){
 
 }
</script>

<style>

</style>