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
import HelpQuestion from "@/components/HelpQuestion.vue";
import { v4 as uuidv4 } from "uuid";
 import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";


const router = useRouter();

const route = useRoute();

 
// Get survey loading state, which only changes when we fetch survey from backend
const loading = computed(() => store.state.currentHelp.loading);

// Create empty survey
let model = ref({
  id:'',
  status: false,
  help: null,
  privecy_security: null,
  questions: [],
  image: null,
  image_url: null,
});

// Watch to current survey data change and when this happens we update local model

watch(
  () => store.state.currentHelp.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

// If the current component is rendered on survey update route we make a request to fetch survey
if (route.params.id) {
  store.dispatch("getHelp", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    // The field to send on backend and apply validations
    model.value.image = reader.result;

    // The field to display here
    model.value.image_url = reader.result;
    ev.target.value = "";
  };
  reader.readAsDataURL(file);
}
 

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    data: {},
    image: null,
    image_url: null,
    url:null,

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

function saveHelp(){
  let action = "created";
  if (model.value.id) {
    action = "updated";
   }
   store.dispatch("saveHelp", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: " Help was successfully " + action,
    });
    router.push({
      name: "HelpView",
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

        
        <form v-else @submit.prevent="saveHelp">
          
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
            <!-- Image -->
            <div>
              <label class="block text-lg   font-bold ">
             Bank account
              </label>
              <div class="mt-1 flex items-center">
                <img
                  v-if="model.image_url"
                  :src="model.image_url"
                  :alt="model.title"
                  class="w-64 h-48 object-cover  transition-all  rounded-md transform hover:scale-125"
                />
                <span
                  v-else
                  class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden  "
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
                  class="relative overflow-hidden ml-5   py-2 px-3 border  rounded-md shadow-sm text-sm leading-4 font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
             <!-- Description -->
            <FormField label="Help">

              <FormControl
               
            
              id="help"
              name="help"
              type="textarea"

              rows="3"
              v-model="model.help"
              autocomplete="help_help"
               placeholder="Enter help description"
                  >
              </FormControl>
            </FormField>
          
            <!-- Description -->
  
          <!-- Description -->
            <FormField label="Privecy and Security">

              <FormControl
               
            
              id="privecy_security"
              name="privecy_security"
              type="textarea"

              rows="3"
              v-model="model.privecy_security"
              autocomplete="privecy_security"
               placeholder="Whrite  Privecy And Security"
                  >
              </FormControl>
            </FormField>
          
            <!-- Description -->
  
            <!-- Status -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  v-model="model.status"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium  "
                  >Active</label
                >
              </div>
            </div>
            <!--/ Status -->
       
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
              <HelpQuestion
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
