<script setup>
import { reactive, computed,onMounted, ref ,watch} from "vue";
import { mdiBallotOutline,mdiHelpCircle, mdiSitemap,mdiAccount, mdiMail, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
 import FormControl from "@/components/FormControl.vue";
 import FormField from "@/components/FormField.vue";

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
import WorkQuestion from "@/components/WorkQuestion.vue";
import { v4 as uuidv4 } from "uuid";
 import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";


const router = useRouter();

const route = useRoute();

 
 const loading = computed(() => store.state.currentWork.loading);

// Create empty survey
let model = ref({
  id:'',
  work: null,
  questions: [],
});

 watch(
  () => store.state.currentWork.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

 if (route.params.id) {
  store.dispatch("getWork", route.params.id);
}

 

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    data: {},
   

  };

  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
 
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}
 
 
 
let errors = ref('');

function saveWork(){
  let action = "created";
  if (model.value.id) {
    action = "updated";
   }
   store.dispatch("saveWork", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: " Work was successfully " + action,
    });
    router.push({
      name: "WorkView",
      params: { id: data.data.id },
    });
    }).catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
  }

 
   

function deleteSurvey() {
  if (
    confirm(
      `Are you sure you want to delete this help? Operation can't be undone!!`
    )
  ) {
    store.dispatch("deleteSurvey", model.value.id).then(() => {
      router.push({
        name: "Help",
      });
    })
   
  }
}

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info" ];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};
 
function help(){
router.push('/help');
store.dispatch("getHelps")

//window.location.reload(true);

}

 
store.dispatch("getUser");

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton
      v-if=" route.params.id"
      :icon="mdiHelpCircle"
      title="Edit Help"
      class="font-bold"
      main
    >

   
    </SectionTitleLineWithButton>
    <SectionTitleLineWithButton
    v-else
    :icon="mdiHelpCircle"
    title="Add Help"
    class="font-bold"
    main
  >




  </SectionTitleLineWithButton>
  
       <CardBox class="shadow-xl mt-8" >
         <div role="status" v-if="loading">
           <OverlayLayer />
        </div>

        
        <form v-else @submit.prevent="saveWork">
          
                  <NotificationBarInCard
        :color="formStatusOptions[formStatusCurrent]"
        :is-placed-with-header="formStatusWithHeader"
      >
       <div class="block ">
        <span
        >
         <h1  class="text-xl font-bold text-white float-left">

          {{ route.params.id ? "Edit Help" : "Add Help" }}
        </h1>

     
         </span
      >
    

     
   <BaseButton
   
   class="w-[200px] float-right" 
   target="_blank"
  :icon="  mdiHelpCircle"
  label="help"
  color="contrast"
  rounded-full
  small
  @click="help"
 
 />
 
       </div>

 
      </NotificationBarInCard>
      
      <div  v-if="loading">
        <OverlayLayer />
    
    </div>
      <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, i) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field] || []" :key="ind">
            * {{ error }}
            
          </div>
          
        </div>
       </Alert>
       
          <div class="shadow sm:rounded-md sm:overflow-hidden black:bg-gray-800">
               
          <!-- Survey Fields -->
          <div class="px-4 py-5 black:bg-gray-800  space-y-6 sm:p-6">
          
             <!-- Description -->
            <FormField label="Help">

              <FormControl
               
            
              id="work"
              name="work"
              type="text"

               v-model="model.work"
              autocomplete="work_work"
               placeholder="Enter work description"
                  >
              </FormControl>
            </FormField>
          
            <!-- Description -->
   
   
       
          </div>
          <!--/ Survey Fields -->
  
          <div class="px-4 py-5   space-y-6 sm:p-6  " >
            <h3 class="text-2xl font-semibold flex items-center justify-between">
              Social Media
  
              <!-- Add new question -->
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center text-sm py-2 px-4 rounded-sm text-white   bg-gray-600 hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                Add  Social Media
              </button>
              <!--/ Add new question -->
            </h3>
            <div v-if="!model.questions" class="text-center text-gray-600">
              You don't have any  Social Media created
            </div>
             <div v-for="(question, index) in model.questions" :key="question.id">
              <WorkQuestion
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>
           <div class="px-4 py-3 text-right sm:px-6">
            <button
              type="submit"

              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{route.params.id ? "Update" : "Save" }}
            </button>
          </div>
        </div>
      </form>
      </CardBox>
    </SectionMain>

   </LayoutAuthenticated>
</template>
