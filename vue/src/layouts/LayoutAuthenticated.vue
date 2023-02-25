<script setup>
import { mdiForwardburger, mdiBackburger, mdiCreditCardOutline,mdiMenu } from "@mdi/js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import BaseIcon from "@/components/BaseIcon.vue";
import FormControl from "@/components/FormControl.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import Notification from "@/components/Notification.vue";
import router from "@/router";
import JustboilLogo from "@/components/JustboilLogo.vue";
//import store from "@/store";
import menuAsideSuper from "@/menuAsideSuper.js";
 import BaseButton from "@/components/BaseButton.vue";

import { useStore } from "vuex";
import Counter from "@/components/Counter.vue";

const store = useStore();

const data =computed(()=>store.state.user.data);


const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();


const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode();
  }

  if (item.isLogout) {
    store.dispatch("logout").then(() => {
        router.push({
          name: "login",
        });
      });
  }
};
 

const current = new Date();
const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
 

//const dateForUi = new Date(data.created_at).toLocaleString('nl-NL');

function pricing(data){
    const route = this.router.resolve({
  name:"pricing",
  params: {id: data.id}

 });
 window.open(route.href,'_blank')
}
</script>

<template>
   <Notification/>
   <div
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
         <div class="ml-6 mt-2 h-12" v-if="data.is_admin !== 1 && data.is_super_admin !== 1">
 
 
 
          <Counter
          :year="new Date(data.day_left).getFullYear()"
          :month="new Date(data.day_left).getMonth()"
          :date="new Date(data.day_left).getDate()"
          :hour="new Date(data.day_left).getHours()"
          :minute="new Date(data.day_left).getMinutes()"
          :second="new Date(data.day_left).getSeconds()"
          class="gap-x-2 md:max-w-md	sm:max-w-sm	lg:max-w-lg layout	"
          /> 
        
       
   

          
    
       </div>
       <BaseButton
       v-if="data.is_admin !== 1 && data.is_super_admin !== 1"
       target="_blank"
      :icon="mdiCreditCardOutline"
      label="Pricing"
      color="info"
       small
      @click="pricing(data)"
      class="m-12 w-[100px] h-10 sm:top-0    md:sm:top-0   ssm:sm:top-0   msm:sm:top-0  "
     
     />
       <div class="ml-6 mt-2 h-12 layout" v-if="data.is_admin == 1"
       >
        <JustboilLogo />   
        
     
       </div>

     

       </NavBar>
      <AsideMenu
        v-if="data.is_admin == 1"
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAsideSuper"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
       <AsideMenu
        v-else-if="data.is_admin == 0"
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
 
      <div class="mt-[60px] ssm:mt-[150px]">

        <slot />
      </div>
      <FooterBar>


      </FooterBar>
    </div>
  </div>
</template>

<style>
 
</style>
