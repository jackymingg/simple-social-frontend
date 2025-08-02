<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>手機號碼：</label>
      <input v-model="phone" required />
    </div>
    <div>
      <label>密碼：</label>
      <input type="password" v-model="password" required />
    </div>
    <button type="submit">登入</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </form>
</template>

<script>
import api from '../services/api'

export default {
  name: 'LoginForm',
  data() {
    return {
      phone: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await api.post('/auth/login', {
          phone: this.phone,
          password: this.password
        })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userName', res.data.userName) 
        
        this.$router.push('/posts')
      } catch (err) {
        this.error = '登入失敗，請檢查帳密'
      }
    }
  }
}
</script>






