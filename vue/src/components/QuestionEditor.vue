<template>
  <!-- Question index -->
  <div class="flex items-center justify-between ">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>


    <div class="flex items-center">
      <!-- Add new question -->
      <button
        type="button"
        @click="addQuestion()"
        class="
          flex
          items-center
         text-lg
          py-1
          px-3
          mr-2
          rounded-sm
          text-white
          bg-gray-600
          hover:bg-gray-700
        "
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
        Add
      </button>
      <!--/ Add new question -->

      <!-- Delete question -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="
          flex
          items-center
         text-lg
          py-1
          px-3
          rounded-sm
          border border-transparent
          text-red-500
          hover:border-red-600
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Delete
      </button>
      <!--/ Delete question -->
    </div>
  </div>
  <!--/ Question index -->
  <div class="grid gap-3 grid-cols-12">
    <!-- Question -->
    <div class="mt-3 col-span-9">

      <FormField label="Enter your product name">

        <FormControl
         
      
        type="text"
        :name="'question_text_' + model.data"
        v-model="model.question"
        @change="dataChange"
        :id="'question_text_' + model.data"
        class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
           rounded-md
        "
        placeholder="Enter product name"
      ></FormControl>
      </FormField>
  
    </div>
    <!--/ Question -->

    <!-- Question Type -->
    <div class="mt-3 col-span-3 " >

    <FormField label="Select Type">
      <FormControl 
 
      id="question_type"
      name="question_type"
      v-model="model.type"
    
      @change="typeChange"
      :selected="select"
      :options="selectOptions"
       
       />
    </FormField>
  </div>

    

    <!--/ Question Type -->
  </div>

  <div class="grid grid-cols-3 gap-4     grid:ssm ssm:grid-cols-1   msm:grid-cols-1  md:grid-cols-1">

    
      <!-- Question -->
      <div class="mt-3  ">
        <label
          :for="'totalPrice_text_' + model.data"
          class="block text-sm font-medium  "
          >Total price </label
        >
        <input
          type="text"
          :name="'totalPrice_text_' + model.data"
          v-model="model.totalPrice"
          @change="dataChange"
          :id="'totalPrice_text_' + model.data"
          :class="PurpleToBlue"
          class="w-full text-2xl  "
        />
      </div >
      <!--/ Question -->
      <!-- Question -->
      <div class="mt-3  ">
        <label
          :for="'total_sold' + model.data"
          class="block text-sm font-medium  "
          >Total sold</label
        >
        <button type="button" @change="dataChange"
         :class="TealToLime"
         class="w-full text-2xl  ">{{ $filters.currencyUSD(model.total_sold) }}</button>

      </div>
      <!--/ Question -->
         <!-- Question -->
         <div class="mt-3  ">
          <label
            :for="'profit' + model.data"
            class="block text-sm font-medium  "
            >Profit</label
          >
          <button type="button"    
            :value="model.profit"
          @change="dataChange"
          :class="GreenToBlue"
          class="w-full text-2xl  "           
           disabled >{{ $filters.currencyUSD(model.profit )}}</button>

         
        </div>
        <!--/ Question -->

        
  </div>
  <div class="grid grid-cols-3 gap-4     grid:ssm ssm:grid-cols-1  grid:msm msm:grid-cols-1 black:bg-gray-800">

    
    <!-- Question -->
    <div class="mt-3  ">
      <label
        :for="'total_quantity' + model.data"
        class="block text-sm font-medium  "
        >Total Quantity</label
      >
      <button type="button"
      @change="dataChange" :class="PurpleToPink"
      class="w-full text-2xl  "
       disabled :value="model.total_quantity">
       {{ model.total_quantity }}</button>
    </div >
    <!--/ Question -->
     <!-- Question -->
     <div class="mt-3  ">
      <label
        :for="'sold_count' + model.data"
        class="block text-sm font-medium  "
        >Total quantity sold</label
      >
      <button type="button" 
        @change="dataChange" 
        :class="cyanToBlue"
        class="w-full text-2xl  "
       disabled :value="model.sold_count">{{ model.sold_count }}</button>

    </div>
    <!--/ Question -->
 <!-- Question -->
 <div class="mt-3  ">
  <label
    :for="'remaining' + model.data"
    class="block text-sm font-medium  "
    >Remaining products</label
  >
  <button type="button" 
    @change="dataChange" 
    :class="PurpleToPink"
    class="w-full text-2xl  "
   disabled
    >{{ model.total_quantity -  model.sold_count}}</button>

</div>
<!--/ Question -->


      
</div>
  <!-- Question Description -->

  <FormField label="Description">

    <FormControl
    type="textarea"
    :name="'question_description_' + model.id"
    v-model="model.description"
    @change="dataChange"
    :id="'question_description_' + model.id"
    class="
      mt-5
      focus:ring-indigo-500 focus:border-indigo-500
      block
      w-full
       sm:text-sm
       rounded-md
    "
    placeholder="Product Description"
  ></FormControl>
  </FormField>
 
  <!--/ Question Description -->

  <!-- Data -->



  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options

        <!-- Add new option -->
        <button
          type="button"
          @click="addOption()"
          class="
            flex
            items-center
            text-lg
              py-1
            px-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700
          "
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
          Add Option
        </button>
        <!--/ Add new option -->
      </h4>

      <div
        v-if="!model.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
           <!-- Option list -->
   <div>
      <!-- Option list -->
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm"> {{ index + 1 }}. </span>
      
      
        <div class="grid grid-cols-4 md:grid-cols-2    grid:ssm ssm:grid-cols-1  grid:msm msm:grid-cols-1">


  
          <!-- Question -->
          <FormField label="Price">
            <label for="" class="m-2">Price  </label>
            <FormControl
            type="text"
            tabindex="1"
            v-model="option.price"
            @change="dataChange"
           
            placeholder="Price "
          ></FormControl>
          </FormField>

     
 
          <!--/ Question -->
                      <!-- Question -->
                      <FormField label="Product Name">
                        <label for="" class="m-2">Product name</label>
                        <FormControl
                        type="text"
                        tabindex="1"
                        v-model="option.text"
                        @change="dataChange"
                       
                        placeholder="Product name "
                      ></FormControl>
                      </FormField>

           
          <!--/ Question -->
        
                <!-- Question -->
                <FormField label="Quantity">
                  <label for="" class="m-2">Quantity</label>

                  <FormControl
                  type="text"
                  tabindex="1"
                  v-model="option.quantity"
                  @change="dataChange"
                 
                  placeholder="Quantity  "
                ></FormControl>
                </FormField>
                <!--/ Question -->
                
                   <!-- Question -->
                   <FormField label="Sold out"    
                   >
                   <label for="" class="m-2">Sold out</label>

                    <FormControl
                    type="text"
                    tabindex="1"
                     v-model="option.sold_out"
                    @change="dataChange"
                   
                    placeholder="Sold out "
                  ></FormControl>
                  </FormField>
                         
        </div>    
         <!-- Delete Option -->
         <button
         type="button"
         @click="removeOption(option)"
         class="
          h-[40px]
          w-auto
          md:ml-auto
          lg:ml-20
          mt-3
           rounded-full
           flex
           items-center
           justify-center
           border border-transparent
           transition-colors
           hover:border-red-100
         "
       >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           class="h-6 w-6 text-red-500"
           viewBox="0 0 20 20"
           fill="currentColor"
         >
           <path
             fill-rule="evenodd"
             d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
             clip-rule="evenodd"
           />
         </svg>
       </button>
       <!--/ Delete Option -->
              <!--/ Option list -->
 

      </div>
     
      </div>

    </div>
    
    

  </div>
  
  <!--/ Data -->

  <hr class="my-4" />
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";
import { computed, ref } from "@vue/reactivity";
import store from "@/store";
import { PurpleToBlue } from "@/colors";
import { cyanToBlue } from "@/colors";
import { GreenToBlue } from "@/colors";
import { PurpleToPink } from "@/colors";
import { PinkToOrange } from "@/colors";
import { TealToLime } from "@/colors";
import { RedToYellow } from "@/colors";
 
import FormControl from "@/components/FormControl.vue";

const props = defineProps({
  question: Object,
  index: Number,
});

 
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

// Re-create the whole question data to avoid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

// Get question types from vuex
//const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getOptions() {
  return model.value.data.options;
}

function setOptions(options) {
  model.value.data.options = options;
}

// Check if the question should have options
function shouldHaveOptions() {
  return ["select", "checkbox"].includes(model.value.type);
}

// Add option
function addOption() {
  setOptions([
    ...getOptions(),
    { uuid: uuidv4(), text: "" },
  ]);
  dataChange();
}

// Remove option
function removeOption(op) {
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}

function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

// Emit the data change
function dataChange() {
  const data = model.value;
  

  emit("change", data);
}

function addQuestion() {
  emit("addQuestion", props.index + 1);
}

function deleteQuestion() {
  emit("deleteQuestion", props.question);
}
const selectOptions = [
   "checkbox",
   "select"
];

</script>

<style></style>
