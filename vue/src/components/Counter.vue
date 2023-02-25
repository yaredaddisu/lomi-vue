<template>
    <!-- component -->
    
    <div class="text-gray-800 " v-if="loaded">
        <div>

            <h5 class="test-black dark:text-white ml-0" v-if="!expired">Days Left</h5>
            <h5 class="test-black dark:text-white ml-0"  v-else>Date Expired! </h5>

        </div>
            <div class="text-4xl   text-center   w-full items-center justify-center grid grid-cols-4 ssm:grid-cols-2 msm:grid-cols-2 msm:gap-4 ssm:gap-2 ">
                <div  :class="[
                       expired
                      ? 'bg-red-500'
                      : 'bg-gray-800',
                    
                  ]" class="w-auto   m-auto p-3 text-white rounded-lg  ">
                   <div class="font-mono   leading-none" x-text="days">{{dispalayDays}}</div>
                   <div class="font-mono uppercase text-sm leading-none">Days</div>
               </div>
               <div :class="[
                expired
               ? 'bg-red-500'
               : 'bg-gray-800',
             
           ]" class="w-20   p-3  ml-4  text-white rounded-lg">
                   <div class="font-mono leading-none" x-text="hours">{{dispalayHours}}</div>
                   <div class="font-mono uppercase text-sm leading-none">Hours</div>
               </div>
               <div :class="[
                expired
               ? 'bg-red-500'
               : 'bg-gray-800',
             
           ]" class="w-20   p-3  ml-4 text-white rounded-lg">
                   <div class="font-mono leading-none" x-text="minutes">{{dispalayMinutes}}</div>
                   <div class="font-mono uppercase text-sm leading-none">Minutes</div>
               </div>
                <div :class="[
                    expired
                   ? 'bg-red-500'
                   : 'bg-gray-800',
                 
               ]" class="w-20  ml-4 selection: p-3  text-white rounded-lg">
                   <div class="font-mono leading-none" x-text="seconds">{{dispalaySeconds}}</div>
                   <div class="font-mono uppercase text-sm leading-none">Seconds</div>
               </div>
           </div>
        </div>
 
    
    
   </template>
   
   <script>
   export default {
   
       props: ['year','month','date','hour','minute','second'],
       

    
   data:()=>({
      dispalayDays: 0, 
      dispalayHours: 0,
      dispalayMinutes: 0,
      dispalaySeconds: 0,
      loaded: false,
      expired: false,
   }),
  
   computed: {
       _seconds:()=>1000,
       _minutes(){
           return this._seconds * 60;
       },
       _hours(){
           return this._minutes * 60;
       },
       _days(){
           return this._hours * 24;
       },
       end(){
           return new Date(
               this.year,
               this.month,
               this.date,
               this.hour,
               this.minute,
               this.second,
           );
       }
   },
   mounted(){
   this.showRemaining();
   },
   methods:{
      formatNum: num => (num < 10 ? "0" + num : num),
       showRemaining(){
           const timer = setInterval(()=>{
               const now = new Date();
              // const end = new Date(2022, 12, 30, 10, 10, 10, 10);
   
               const distance = this.end.getTime() - now.getTime();
 
               
               if(distance < 0){
                   clearInterval(timer);
                   this.expired = true;
                   this.loaded = true;

                   return;
               }
   
               
     const days = Math.floor(distance / this._days);
     const hours = Math.floor((distance % this._days) / this._hours);
     const minutes = Math.floor((distance % this._hours) / this._minutes);
     const seconds = Math.floor((distance % this._minutes) / this._seconds);
     this.dispalayMinutes = this.formatNum(minutes);
     this.dispalaySeconds = this.formatNum(seconds);
     this.dispalayHours = this.formatNum(hours);
     this.dispalayDays = this.formatNum(days);
     this.loaded = true;
           }, 1000);
       }
   }
   };
   </script>
   
   <style>
   
   </style>