import{r as u,c as _,R as d,S as se,o as P,a as R,ac as le,b as a,k as i,n as s,w as D,y as ae,F as $,l as S,j as m,u as o,f as n,V as oe,g as c,a0 as N,s as ne,d as y,e as h,t as k,ad as ie,z as F,a4 as j,a5 as E,_ as O,a6 as de,a7 as T,a8 as q,E as re,G as ue,I as ce,J as H,K as he,L as fe,q as ve,H as L,x as pe}from"./index.90dc39b8.js";const ge={class:"border"},me={class:"flex items-center float-left mt-3 ml-3"},_e=q('<option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option>',5),ye=[_e],be=s("label",{for:"default-search",class:"mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"},"Search",-1),ke={class:"relative float-right mt-3 mr-3"},we={class:"float-left"},Ue={class:"w-full"},Ce={class:"w-full"},xe=["sort-field","sort-direction"],$e=["sort-field","sort-direction"],Ae=s("th",null,"Days Left",-1),De=s("th",null,"Role",-1),Ve=["sort-field","sort-direction"],Se=["sort-field","sort-direction"],Ne=s("th",null,"Action",-1),Oe={key:0},Ie={colspan:"12"},Me={key:0},ze={key:1,class:"bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",role:"alert"},Be=q('<div class="flex"><div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"></path></svg></div><div><p class="font-bold">Ooops their is smething error</p><p class="text-sm">Their is no data found here.</p></div></div>',1),Pe=[Be],Re={key:0},Fe=["value"],je={key:1},Ee=s("td",null," Super Admin ",-1),He=[Ee],Le={key:2},Te=["value"],qe={class:"border-b-0 lg:w-6 before:hidden"},Ge={class:"relative w-12 h-12 transition-all rounded-md transform hover:scale-125"},Je=["src"],Ke={"data-label":"FullName",class:"mr-6"},Ye={"data-label":"Email",class:"mr-6"},Qe={key:3},We={key:4},Xe=s("a",{href:"#",class:"w-[340px] block gap-x-2 md:max-w-md sm:max-w-sm lg:max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"},[s("h5",{class:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},"Super Admin")],-1),Ze=[Xe],et={"data-label":"Updated Date",class:"lg:w-1 whitespace-nowrap"},tt={class:"text-gray-500 dark:text-slate-400"},st={class:"before:hidden lg:w-1 whitespace-nowrap"},lt={class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},at={__name:"TableUser",props:{checkable:Boolean},setup(G){const p=u(""),f=u("updated_at"),r=u("desc"),U=_(()=>d.state.users.data),g=_(()=>d.state.users.loading),b=_(()=>d.state.user.data);d.dispatch("getUsers",{search:p.value}),se(p,(t,l)=>{d.dispatch("getUsers",{search:p.value,sort_field:f.value,sort_direction:r.value})});function V(t=null){d.dispatch("getUsers",{url:t,search:p.value,sort_field:f.value,sort_direction:r.value})}P(()=>{V()});function A(t){t===f.value?r.value==="desc"?r.value="asc":r.value="desc":(f.value=t,r.value="asc"),V()}function J(){T.push("/users/create"),d.dispatch("getUsers")}function K(t){confirm("Are you sure you want to delete this user? Operation can't be undone!!")&&d.dispatch("deleteUser",t.id).then(()=>{d.commit("notify",{type:"success",message:"User was successfully deleted!"}),d.dispatch("getUsers")})}function Y(t){t.length?confirm("Are you sure you want to delete this user? Operation can't be undone!!")&&d.dispatch("deleteAllUser",t).then(()=>{d.commit("notify",{type:"success",message:"User was successfully deleted!"}),d.dispatch("getUsers")}):d.commit("notify",{type:"success",message:"No data Selected To delete"})}u(!1),u(!1);const C=u(5),w=u(0),x=u([]),Q=_(()=>U.value.slice(C.value*w.value,C.value*(w.value+1))),I=_(()=>Math.ceil(U.value.length/C.value)),W=_(()=>w.value+1),X=_(()=>{const t=[];for(let l=0;l<I.value;l++)t.push(l);return t});function Z(){if(this.isCheckAll=!this.isCheckAll,this.checked=[],this.isCheckAll)for(var t in this.users)this.checked.push(this.users[t])}function M(){this.checked.length==this.users.length?this.isCheckAll=!0:this.isCheckAll=!1}d.dispatch("getUser");const z=u(0),B=u(0);function ee(){g.value={activeUsers:!0,InactiveUsers:!0}}return R.get("/activeUsers",{}).then(({data:t})=>{z.value=t}),R.get("/InactiveUsers",{}).then(({data:t})=>{B.value=t}),P(()=>{ee()}),(t,l)=>{const te=le("router-link");return a(),i($,null,[s("div",ge,[s("div",me,[D(s("select",{onChange:l[0]||(l[0]=e=>V(null)),"onUpdate:modelValue":l[1]||(l[1]=e=>C.value=e),class:"appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"},ye,544),[[ae,C.value]]),(a(!0),i($,null,S(o(U),e=>(a(),i("div",{key:e.id},[e.is_super_admin==1&&e.is_admin==1?(a(),i("button",{key:0,onClick:l[2]||(l[2]=v=>Y(x.value)),type:"button",class:"ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"},"Delete")):m("",!0),e.is_super_admin==1&&e.is_admin==1?(a(),i("button",{key:1,onClick:l[3]||(l[3]=v=>J()),type:"button",class:"ml-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"},"Create User")):m("",!0)]))),128))]),be,s("div",ke,[n(oe,{placeholder:"Search (ctrl+k)","ctrl-k-focus":"",transparent:"",borderless:"",modelValue:p.value,"onUpdate:modelValue":l[4]||(l[4]=e=>p.value=e),type:"search"},null,8,["modelValue"])])]),s("div",we,[n(c,{color:"lightDark",label:"Active Users ",icon:t.mdiOpenInNew,small:t.buttonsSmall,outline:t.buttonsOutline,disabled:t.buttonsDisabled,"rounded-full":t.buttonsRounded},null,8,["icon","small","outline","disabled","rounded-full"]),n(c,{color:"success",label:z.value,icon:t.mdiOpenInNew,small:t.buttonsSmall,outline:t.buttonsOutline,disabled:t.buttonsDisabled,"rounded-full":t.buttonsRounded,class:"w-12 h-10 rounded-full mr-6 mt-3"},null,8,["label","icon","small","outline","disabled","rounded-full"]),n(c,{color:"lightDark",label:"In active Users ",icon:t.mdiOpenInNew,small:t.buttonsSmall,outline:t.buttonsOutline,disabled:t.buttonsDisabled,"rounded-full":t.buttonsRounded},null,8,["icon","small","outline","disabled","rounded-full"]),n(c,{color:"danger",label:B.value,icon:t.mdiOpenInNew,small:t.buttonsSmall,outline:t.buttonsOutline,disabled:t.buttonsDisabled,"rounded-full":t.buttonsRounded,class:"w-12 h-10 rounded-full"},null,8,["label","icon","small","outline","disabled","rounded-full"])]),s("div",null,[s("table",null,[s("thead",Ue,[s("tr",Ce,[s("th",null,[D(s("input",{type:"checkbox",onClick:l[5]||(l[5]=e=>Z()),"onUpdate:modelValue":l[6]||(l[6]=e=>t.isCheckAll=e)},null,512),[[N,t.isCheckAll]])]),s("th",{field:"name","sort-field":f.value,"sort-direction":r.value,onClick:l[7]||(l[7]=e=>A("name"))}," Full Name ",8,xe),s("th",{field:"email","sort-field":f.value,"sort-direction":r.value,onClick:l[8]||(l[8]=e=>A("email"))},"Email Address",8,$e),Ae,De,s("th",{field:"status","sort-field":f.value,"sort-direction":r.value,onClick:l[9]||(l[9]=e=>A("status"))},"Status",8,Ve),s("th",{field:"updated_at","sort-field":f.value,"sort-direction":r.value,onClick:l[10]||(l[10]=e=>A("updated_at"))},"Updated",8,Se),Ne])]),o(g)||!o(U).length?(a(),i("tbody",Oe,[s("tr",null,[s("td",Ie,[o(g)?(a(),i("div",Me,[n(ne)])):(a(),i("div",ze,Pe))])])])):m("",!0),s("tbody",null,[(a(!0),i($,null,S(o(Q),e=>(a(),i("tr",{class:"w-full",key:e.id},[e.is_super_admin==0?(a(),i("div",Re,[s("td",null,[D(s("input",{type:"checkbox",value:e,"onUpdate:modelValue":l[11]||(l[11]=v=>x.value=v),onChange:l[12]||(l[12]=v=>M())},null,40,Fe),[[N,x.value]])])])):e.is_super_admin==1&&e.id!==o(b).id?(a(),i("div",je,He)):e.id===o(b).id?(a(),i("div",Le,[s("td",null,[D(s("input",{type:"checkbox",value:e,"onUpdate:modelValue":l[13]||(l[13]=v=>x.value=v),onChange:l[14]||(l[14]=v=>M())},null,40,Te),[[N,x.value]])])])):m("",!0),s("div",null,[e.plans>0?(a(),y(c,{key:0,class:"rounded-full w-8 h-8 ml-2",label:e.plans,color:"info",icon:t.mdiOpenInNew,small:t.buttonsSmall,outline:t.buttonsOutline,disabled:t.buttonsDisabled},null,8,["label","icon","small","outline","disabled"])):m("",!0)]),n(te,{to:{name:"UserDetail",params:{id:e.id}}},{default:h(()=>[s("td",qe,[s("div",Ge,[s("img",{class:"shadow-lg rounded-full max-w-full h-auto align-middle border-none",src:e.image_url,alt:"user image"},null,8,Je)])])]),_:2},1032,["to"]),s("td",Ke,k(e.name),1),s("td",Ye,k(e.email),1),e.is_admin==0?(a(),i("td",Qe,[n(ie,{year:new Date(e.day_left).getFullYear(),month:new Date(e.day_left).getMonth(),date:new Date(e.day_left).getDate(),hour:new Date(e.day_left).getHours(),minute:new Date(e.day_left).getMinutes(),second:new Date(e.day_left).getSeconds(),class:"gap-x-2 md:max-w-md sm:max-w-sm lg:max-w-lg"},null,8,["year","month","date","hour","minute","second"])])):(a(),i("td",We,Ze)),s("td",{"data-label":"Is Admin",class:F([e.is_admin!=0?"text-sky-800":"text-rose-500"])},k(e.is_admin!=0?"Admin":"User"),3),s("td",{"data-label":"Status",class:F([e.status!=0?"text-green-500":"text-red-500"])},k(e.status!=0?"Active":"In Active"),3),s("td",et,[s("small",tt,k(e.updated_at),1)]),s("td",st,[e.is_super_admin==0?(a(),y(O,{key:0,type:"justify-start lg:justify-end","no-wrap":""},{default:h(()=>[n(c,{color:"info",icon:o(j),small:"",to:{name:"UserView",params:{id:e.id}}},null,8,["icon","to"]),o(b).id?(a(),y(c,{key:0,color:"danger",icon:o(E),small:"",type:"button",onClick:v=>K(e)},null,8,["icon","onClick"])):m("",!0)]),_:2},1024)):o(b).id===e.id?(a(),y(O,{key:1,type:"justify-start lg:justify-end","no-wrap":""},{default:h(()=>[n(c,{color:"info",icon:o(j),small:"",to:{name:"UserView",params:{id:e.id}}},null,8,["icon","to"]),e.id?(a(),y(c,{key:0,color:"danger",icon:o(E),small:"",type:"button",onClick:v=>t.deleteMember(e)},null,8,["icon","onClick"])):m("",!0)]),_:2},1024)):m("",!0)])]))),128))])]),s("div",lt,[n(de,null,{default:h(()=>[n(O,null,{default:h(()=>[(a(!0),i($,null,S(o(X),e=>(a(),y(c,{key:e,active:e===w.value,label:e+1,color:e===w.value?"lightDark":"whiteDark",small:"",onClick:v=>w.value=e},null,8,["active","label","color","onClick"]))),128))]),_:1}),s("small",null,"Page "+k(o(W))+" of "+k(o(I)),1)]),_:1})])])],64)}}},ot=s("b",null,"Responsive table.",-1),nt=pe(" Collapses on mobile "),it=s("p",null,"Unautorized Action",-1),rt={__name:"User",setup(G){const p=u(!1),f=_(()=>d.state.user.data);function r(){T.push("/users/create")}return(U,g)=>(a(),i($,null,[n(re,{modelValue:p.value,"onUpdate:modelValue":g[0]||(g[0]=b=>p.value=b),"has-cancel":""},null,8,["modelValue"]),n(ue,null,{default:h(()=>[o(f).is_admin==1?(a(),y(L,{key:0},{default:h(()=>[n(ce,{icon:o(H),title:"Users",main:""},{default:h(()=>[n(c,{target:"_blank",icon:o(H),label:"Add User",color:"contrast","rounded-full":"",small:"",onClick:g[1]||(g[1]=b=>r())},null,8,["icon"])]),_:1},8,["icon"]),n(he,{color:"info",icon:o(fe)},{default:h(()=>[ot,nt]),_:1},8,["icon"]),n(ve,{class:"mb-6","has-table":""},{default:h(()=>[n(at,{checkable:""})]),_:1})]),_:1})):(a(),y(L,{key:1},{default:h(()=>[it]),_:1}))]),_:1})],64))}};export{rt as default};