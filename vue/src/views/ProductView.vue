<script setup>
import { reactive, computed,onMounted, ref ,watch} from "vue";
import { mdiBallotOutline, mdiSitemap,mdiAccount, mdiMail, mdiGithub ,mdiAccountPlus,  mdiAccountMultiple
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
import QuestionEditor from "@/components/QuestionEditor.vue";
import { v4 as uuidv4 } from "uuid";
 import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";


const router = useRouter();

const route = useRoute();

 
 const loading = computed(() => store.state.currentProduct.loading);

 let model = ref({
  id:"",
  title: "",
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

 watch(
  () => store.state.currentProduct.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: !!newVal.status,
    };
  }
);

 if (route.params.id) {
  store.dispatch("getProduct", route.params.id);
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
    description: null,
    data: {},
    totalPrice: "0",
    total_sold: "0",
    profit: "0",
    total_quantity: "0",
    sold_count: "0",
    total_price: "0"

  };

  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
 
  if (question.data.options) {
    question.data.options = [...question.data.options];
  }
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}
 
 
const errors = ref({});



let mod = ref({
  total_price: 0,
  totalSold: 0,
  totalProfit: 0,

})   

 
function saveProduct( ) {
let totalSold = []
let totalQuantity = []
let totalQuantitySold = []



model.value.questions.forEach((item, _) => {

      let s = item.data.options.map((items2, _) => {
        return parseInt(items2.price);
      })

      let q = item.data.options.map((items2, _) => {
        return parseInt(items2.quantity);
      })

      let SQ = item.data.options.map((items2, _) => {
        //console.log(items2.sold_out);
        return parseInt(items2.sold_out);
      })
      if(item.data.options !== [ ]){

  let sum = s.reduce((a, b) => a + b,0);
      totalSold.push({
        id: item.id,
        total_sold: sum
      });
      
/* total Quantity*/
let sum1 = q.reduce((c, d) => c + d,0);
      totalQuantity.push({
        id: item.id,
         total_quantity: sum1
      });

      let sum2 = SQ.reduce((e, f) => e + f,0);
      totalQuantitySold.push({
        id: item.id,
        sold_count: sum2
      });
    }
        totalQuantity.forEach((totalq, _) => {

      model.value.questions.forEach((top, _) => {
            let id = top.id
   

          if(totalq.id == id){
            top.total_quantity =  totalq.total_quantity 
             //console.log(top.total_quantity);


          }
        })

      })
      /* total Quantity*/

/* total Quantity Sold*/
totalQuantitySold.forEach((totalq, _) => {

model.value.questions.forEach((top, _) => {
      let id = top.id


    if(totalq.id == id){
      top.sold_count =  totalq.sold_count 
       console.log(top.sold_count);


    }
  })

})
 
      /* total Quantity Sold*/

    
     
    });
 
   
 

    totalSold.forEach((total, _) => {

      model.value.questions.forEach((sold, _) => {
        let id = sold.id
        if(total.id == id){
       
        if(total.total_sold == 0){
          sold.total_sold = sold.total_sold ;

        }else{
          sold.total_sold = eval(
            parseInt(sold.total_sold) + parseInt(total.total_sold)
          );
          //console.log(sold.total_sold)
        }

   
      }
        
        model.value.questions.forEach((item, _) => {
          item.data.options.forEach((option, _) => {
           //let val = ref(0);
           option.price = eval(
            parseInt(option.price) - parseInt(option.price)
          );
 
        })

        })

        model.value.questions.forEach((pro, _) => {
          pro.profit = eval(
            parseInt(pro.total_sold) - parseInt(pro.totalPrice)
          );
 
        //console.log(pro.profit)
        })
        model.value.questions.forEach((pro, _) => {
          pro.profit = eval(
            parseInt(pro.total_sold) - parseInt(pro.totalPrice)
          );
 
        //console.log(pro.profit)
        })


 })

    })
        
       
  
 // console.log(da)

 

  let action = "created";
  if (model.value.id) {
    action = "updated";
  }
  store.dispatch("saveProduct", { ...model.value }).then(({ data }) => {
    store.commit("notify", {
      type: "success",
      message: "Product was successfully " + action,
    });
    router.push({
      name: "ProductView",
      params: { id: data.data.id },
    });
   // window.location.reload(true);
   store.dispatch("getProduct");

  }).catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

function deleteProduct() {
  if (
    confirm(
      `Are you sure you want to delete this product? Operation can't be undone!!`
    )
  ) {
    store.dispatch("deleteProduct", model.value.id).then(() => {
      router.push({
        name: "ProductView",
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
 
function ProductsList(){
router.push('/products');
store.dispatch("getProducts")

//window.location.reload(true);

}
function addProduct(){
  router.push('/products/create').then(()=>{
    window.location.reload(true);

  });
}
 
store.dispatch("getUser");

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <SectionTitleLineWithButton
      v-if=" route.params.id"
      :icon="mdiSitemap"
      title="Edit product"
      class="font-bold"
      main
    >
    <BaseButton
    target="_blank"
   :icon="mdiSitemap"
   label="Add product"
   color="contrast"
   rounded-full
   small
   @click="addProduct"
  
  />
   
    </SectionTitleLineWithButton>
    <SectionTitleLineWithButton
    v-else
    :icon="mdiSitemap"
    title="Add product"
    class="font-bold"
    main
  >



  </SectionTitleLineWithButton>
 
   <div v-if="route.params.id">
  
    
    <div class="grid grid-cols-6 gap-4      sm:grid-cols-1   msm:grid-cols-1   md:grid-cols-2">
 <FormField label="Total invested prcie">

       <button
      title="  Total price
      "
        :class="cyanToBlue"
       class="  h-auto w-auto  text-lg"
        >
         {{$filters.currencyUSD(model.totalPrice)}}
      </button> 
    
    </FormField>

 
       <FormField label="Total sold price">

      <button
      title="  Total sold out
      "
        :class="TealToLime"
       class="  h-auto w-auto text-lg "
        >
       {{$filters.currencyUSD(model.totalSold)}}
      </button> 
          </FormField>

 
             <FormField label=" Total profit">

      <button
      title="  Total profit
      "
        :class="cyanToBlue"
       class="  h-auto w-auto  text-lg"
        >
          {{$filters.currencyUSD(model.profit)}}
      </button> 
                </FormField>

                <FormField label="Total quantity">

                  <button
                 title="  Total quantity
                 "
                   :class="PurpleToPink"
                  class="  h-auto w-auto  text-lg"
                   >
                    {{ model.totalQuantity}}
                 </button> 
               
               </FormField>
           
            
                  <FormField label="Total sold out">
           
                 <button
                 title="  Total sold out
                 "
                   :class="GreenToBlue"
                  class="  h-auto w-auto text-lg "
                   >
                  {{ model.soldCount}}
                 </button> 
                     </FormField>
           
            
                        <FormField label=" Remaining products
                        ">
           
                 <button
                 title="  Remaining Products
                 "
                   :class="RedToYellow"
                  class="  h-auto w-auto  text-lg"
                   >
                     {{ model.totalQuantity - model.soldCount}}
                 </button> 
                           </FormField>

     </div>

 
  </div>
       <CardBox class="shadow-xl mt-8" >
         <div role="status" v-if="loading">
           <OverlayLayer />
        </div>

        
        <form v-else @submit.prevent="saveProduct">
          
                  <NotificationBarInCard
        :color="formStatusOptions[formStatusCurrent]"
        :is-placed-with-header="formStatusWithHeader"
      >
       <div class="block ">
        <span
        >
         <h1  class="text-xl font-bold text-white float-left">

          {{ route.params.id ? "Edit product" : "Add product" }}
        </h1>

     
         </span
      >
    

     
   <BaseButton
   
   class="w-[200px] float-left sm:ssm:msm:mt-3 md:float-right lg:float-right" 
   target="_blank"
  :icon="  mdiSitemap"
  label="Products"
  color="contrast"
  rounded-full
  small
  @click="ProductsList"
 
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
              Product  Image
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
  
            <!-- Title -->
            <FormField label="Product title">

            <FormControl
             
          
                type="text"
                name="title"
                id="title"
                v-model="model.title"
                autocomplete="survey_title"
                placeholder="Enter product title"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm     rounded-md"
                >
            </FormControl>
          </FormField>
            <!--/ Title -->
             <!-- Description -->
            <FormField label="Description">

              <FormControl
               
            
              id="description"
              name="description"
              type="textarea"

              rows="3"
              v-model="model.description"
              autocomplete="product_description"
              class=" mt-6"
              placeholder="Describe your product"
                  >
              </FormControl>
            </FormField>
          
            <!-- Description -->
  
            <!-- Expire Date -->
            <FormField label="Arival Date">

              <FormControl
               
            
              type="date"
              name="arival_date"
              id="arival_date"
              v-model="model.expire_date"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              
            ></FormControl>
            </FormField>

           
            <!--/ Expire Date -->
  
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
                  >Status</label
                >
              </div>
            </div>
            <!--/ Status -->
       
          </div>
          <!--/ Survey Fields -->
  
          <div class="px-4 py-5   space-y-6 sm:p-6  " >
            <h3 class="text-2xl font-semibold flex items-center justify-between">
              Products
  
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
                Add Product
              </button>
              <!--/ Add new question -->
            </h3>
            <div v-if="!model.questions.length" class="text-center text-gray-600">
              You don't have any products created
            </div>
             <div v-for="(question, index) in model.questions" :key="question.id">
              <QuestionEditor
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
