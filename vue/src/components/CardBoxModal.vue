<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/CardBoxComponentTitle.vue";
import AddMemberCard from "@/components/AddMemberCard.vue";
import store from "../store";



const props = defineProps({
  title: {
    type: String,
   },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
  store.dispatch('getMembers');
  window.location.reload(true);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="overflow-auto bg shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-100 z-40"
      is-modal
    >
      <CardBoxComponentTitle :title="title">

        
 
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />

      </CardBoxComponentTitle >
      <hr>
       <AddMemberCard class="py-10"  />
      <div class="space-y-3">
        <slot />
      </div>
 
    </CardBox>
  </OverlayLayer>
</template>
<style scoped>
.bg{
  background-color: white;
}
</style>
