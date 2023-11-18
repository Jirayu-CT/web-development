<script setup>

const route = useRoute()
const {data:userList} = await useFetch("http://localhost:3001/member")

const member_name = ref('')
const member_email = ref('')
function addUser(){
  fetch('http://localhost:3001/member', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      member_name: member_name.value,
      member_email: member_email.value
    })
  })
  .then(res => res.json())
  .then(data => {
    window.location.reload()
  })
}

</script>

<template>
  <div class="flex">
    <table class="bg-slate-600 rounded-md">
      <tr v-for="(res,index) in userList">
        <td>{{ res.member_id }}</td>
        <td>{{ res.member_name }}</td>
        <td>{{ res.member_email }}</td>
        <td>
          <UButton color="yellow" @click="editUser(res.memer_id)">แก้ไข</UButton>
          <UButton color="red" @click="deleteUser(res.memer_id)">ลบ</UButton>
        </td>
      </tr>
    </table>

    <UCard>
      <div>
        <span>ชื่อ</span>
        <UInput v-model="member_name" />
      </div>
      <div>
        <span>อีเมล</span>
        <UInput v-model="member_email" />
      </div>
      <UButton coloer="green" @click="addUser">เพิ่ม</UButton>
    </UCard>

  </div>
</template>
