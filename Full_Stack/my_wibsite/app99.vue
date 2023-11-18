<script setup>
  let name = ref("Jirayu")
  let lastname = "Chomthong"
  let isOpen = ref(false)
  let class1 = "p-2 flex flex-col w-[200px] h-[500px] bg-white rounded-[5px] text-[black]"
  let class2 = "p-2 flex flex-col w-[500px] h-[500px] bg-white rounded-[5px] text-[black]"
  
</script>

<template>
  <div class="flex h-screen bg-slate-200">
    <div class="m-auto">
      <!-- if else ตัวแปร ? ถ้าใช้ : ถ้าไม่ -->
      <div :class="!isOpen ? class1 : class2">
        <!-- false = true เปลี่ยนfalse เป็น true -->
        <UButton @click="isOpen = !isOpen" color="red">{{!isOpen? 'open' : 'close'}}</Ubutton>
        
        <div>
          <span> {{ name }} </span>
          <UInput type="text" v-model="name"></UInput>
        </div>
        
      </div>
      </div>
    </div>
    
    <NuxtPage />
</template>
