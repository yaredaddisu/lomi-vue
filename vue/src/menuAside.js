import {
  mdiAccountCircle,
  mdiMonitor,
  mdiPalette,
  mdiAccountGroup,
  mdiAccountMultiplePlus,
  mdiAccountMultiple,
  mdiHelpCircle,
  mdiSitemap,
  mdiCameraImage,
  mdiSecurity
 } from "@mdi/js";
 
 
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
    label: "Logos",
    icon: mdiCameraImage ,
    menu: [
      {
        to: "/logos",
        label: "Logos",
        icon: mdiCameraImage ,
      },
      {
        to: "/logos/create",
        label: "Create Logo",
        icon: mdiCameraImage ,      },
    ],
  },

 



  {
    to: "/profile/:id",
    label: "Profile",
    icon: mdiAccountCircle,
  },
   
 
  {
    to: "/",
    label: "Styles",
    icon: mdiPalette,
  },
  {
    to: "/helps",
    label: "Help",
    icon:   mdiHelpCircle 
    ,
  },
  {
    to: "/privacy",
    label: "Privacy and Policy",
    icon:   mdiSecurity 
    ,
  },


];
