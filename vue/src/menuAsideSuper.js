import {
  mdiAccountCircle,
  mdiMonitor,
   mdiLock,
 
  mdiPalette,
   mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiAccountMultiple,
  mdiCameraImage,
  mdiCurrencyUsd,
  mdiCashMultiple,
  mdiAccountPlus,
  mdiSitemap,
  mdiHelpCircle 
  } from "@mdi/js";
import store from "@/store";
import { computed, ref, watch, onMounted } from "vue";



export default [



  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },

  

  {
    label: "Members",
    icon: mdiAccountGroup ,
    menu: [
      {
        to: "/members",
        label: "Members",
        icon: mdiAccountMultiple ,
      },
      {
        to: "/members/create",
        label: "Create New",
        icon: mdiAccountMultiplePlus ,      },
    ],
  },

  {
    label: "Users",
    icon:  mdiAccountMultiplePlus   ,
    menu:  [
      {
        to: "/users",
        label: "Users",
        icon: mdiAccountPlus  ,
      },
      {
        to: "/users/create",
        label: "Create User",
        icon: mdiAccountPlus  ,
        },
    ],
    },
 {
      label: "Products",
      icon:  mdiSitemap    ,
      menu:  [
        {
          to: "/products",
          label: "products",
          icon: mdiSitemap   ,
        },
        {
          to: "/products/create",
          label: "Create Product",
          icon: mdiSitemap   ,
          },
      ],
      },
    {
      label: "Plans",
      icon:  mdiCashMultiple   ,
      menu:  [
        {
          to: "/plans",
          label: "Plans",
          icon: mdiCurrencyUsd  ,
        },
        {
          to: "/plans/create",
          label: "Create Plan",
          icon: mdiCurrencyUsd  ,
          },
      ],
      },
///



  {
    label: "Logos",
    icon: mdiCameraImage  ,
    menu: [
      {
        to: "/logos",
        label: "Logos",
        icon: mdiCameraImage  ,
      },
      {
        to: "/logos/create",
        label: "Create Logo",
        icon: mdiCameraImage  ,      },
    ],
  },

  {
    label: "Help",
    icon:  mdiHelpCircle    ,
    menu:  [
      {
        to: "/help",
        label: "help",
        icon: mdiHelpCircle   ,
      },
      {
        to: "/help/create",
        label: "Create Plan",
        icon: mdiHelpCircle   ,
        },
    ],
    },

  {
    to: "/",
    label: "Styles",
    icon: mdiPalette,
  },
  {
    to: "/profile/:id",
    label: "Profile",
    icon: mdiAccountCircle,
  },
 
  {
    to: "/password/reset",
    label: "Reset",
    icon: mdiLock,
  },



];
