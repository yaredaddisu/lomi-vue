import { createRouter, createWebHashHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import store from '../store';
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "style",
    component: Style,
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
    path: "/dashboard",
    name: "dashboard",
    component: Home,
  },
   
{
      meta: {
      title: "Pricing",
      requiresAuth: false,
    },
    path: "/pricing/:id",
    name: "pricing",
    component: () => import("@/views/Plan.vue"),
  },
  {
    meta: {
      title: "Members",
      requiresAuth: true,

    },
    path: "/members",
    name: "members",
    component: () => import("@/views/Members.vue"),
  },
 

  
   {
    meta: {
      title: "MemberView",
      requiresAuth: true,

    },
    path: "/members/create",
    name: "MemberCreate",
    component: () => import("@/views/MemberView.vue"),
  },
     ////

    
   
///
{
  meta: {
    title: "Plan",
    requiresAuth: true,

  },
  path: "/plans",
  name: "plans",
  component: () => import("@/views/PricingView.vue"),
},
 {
  meta: {
    title: "AddPlan",
    requiresAuth: true,

  },
  path: "/plans/create",
  name: "PlanCreate",
  component: () => import("@/views/AddPlan.vue"),
},
{
  meta: {
    title: "AddPlan",
    requiresAuth: true,

  },
  path: "/plans/:id",
  name: "AddPlan",
  component: () => import("@/views/AddPlan.vue"),
},
     ///

{
  meta: {
    title: "SuccessMessage",
    requiresAuth: false,

  },
  path: "/success_message",
  name: "SuccessMessage",
  component: () => import("@/views/SuccessMessage.vue"),
},

     ///
  {
    meta: {
      title: "User",
      requiresAuth: true,

    },
    path: "/users",
    name: "users",
    component: () => import("@/views/User.vue"),
  },
   {
    meta: {
      title: "UserView",
      requiresAuth: true,

    },
    path: "/users/create",
    name: "UserCreate",
    component: () => import("@/views/UserView.vue"),
  },
  {
    meta: {
      title: "UserView",
      requiresAuth: true,
  
    },
    path: "/users/:id",
    name: "UserView",
    component: () => import("@/views/UserView.vue"),
  },
  

 {
    meta: {
      title: "Payment",
      requiresAuth: true,
  
    },
    path: "/member-payment/:id",
    name: "Payment",
    component: () => import("@/views/Payment.vue"),
  },
   {
    meta: {
      title: "print",
      requiresAuth: true,
  
    },
    path: "/member-print/:id",
    name: "print",
    component: () => import("@/components/print.vue"),
  },
  ///
  
  {
    meta: {
      title: "Logos",
      requiresAuth: true,
  
    },
    path: "/logos",
    name: "logos",
    component: () => import("@/views/Logos.vue"),
  },
   {
    meta: {
      title: "LogoView",
      requiresAuth: true,
  
    },
    path: "/logos/create",
    name: "LogoCreate",
    component: () => import("@/views/LogoView.vue"),
  },
  {
    meta: {
      title: "LogoView",
      requiresAuth: true,
  
    },
    path: "/logos/:id",
    name: "LogoView",
    component: () => import("@/views/LogoView.vue"),
  },
  ///
  {
    meta: {
      title: "UserDetail",
      requiresAuth: true,
  
    },
    path: "/users-detail/:id",
    name: "UserDetail",
    component: () => import("@/views/UserDetail.vue"),
  },
 
  
  {
    meta: {
      title: "MemberView",
      requiresAuth: true,

    },
    path: "/members/:id",
    name: "MemberView",
    component: () => import("@/views/MemberView.vue"),
  },

  
 /////


 {
  
  meta: {
    title: "Products",
    requiresAuth: true,

  },
  path: "/products",
  name: "products",
  component: () => import("@/views/Product.vue"),
},
 {
  meta: {
    title: "ProductView",
    requiresAuth: true,

  },
  path: "/products/create",
  name: "ProductCreate",
  component: () => import("@/views/ProductView.vue"),
},
   

{
  meta: {
    title: "ProductView",
    requiresAuth: true,

  },

  path: "/products/:id",
  name: "ProductView",
  component: () => import("@/views/ProductView.vue"),
},
//

{
  meta: {
    title: "HelpSupport",
    requiresAuth: true,

  },

  path: "/helps",
  name: "HelpSupport",
  component: () => import("@/views/HelpSupport.vue"),
},
 
{
  meta: {
    title: "PrivacyPolicy",
    requiresAuth: true,

  },

  path: "/privacy",
  name: "PrivacyPolicy",
  component: () => import("@/views/PrivacyPolicy.vue"),
},
 
//
{
meta: {
  title: "Help",
  requiresAuth: true,

},
path: "/help",
name: "help",
component: () => import("@/views/Help.vue"),
},
{
  meta: {
    title: "Help",
    requiresAuth: true,

  },
  path: "/help/create",
  name: "HelpCreate",
  component: () => import("@/views/HelpView.vue"),
},
   

{
  meta: {
    title: "HelpView",
    requiresAuth: true,

  },

  path: "/help/:id",
  name: "HelpView",
  component: () => import("@/views/HelpView.vue"),
},
 ////
  
 
  {
    meta: {
      title: "Profile",
    },
    path: "/profile/:id",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  

  {
    path:'/auth',
    redirect:'/login',
    name:'auth',
    component:AuthLayout,
    meta:{isGuest: true},
    children:[
      {
        meta: {
          title: "Login",
        },
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        meta: {
          title: "Register",
        },
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
      },
      {
        meta: {
          title: "Reset",
        },
        path: "/password/reset",
        name: "reset",
        component: () => import("@/views/password/Reset.vue"),
    
      },
      {
        meta: {
          title: "Token",
        },
        path: "/password/token",
        name: "token",
        component: () => import("@/views/password/Token.vue"),
    
      },
        
    ]
  },
 
   

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
