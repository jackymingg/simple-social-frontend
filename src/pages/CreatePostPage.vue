<template>
  <div>
    <h2>新增貼文</h2>
    <form @submit.prevent="submitPost">
      <div>
        <label>內容：</label>
        <textarea v-model="content" rows="4" cols="50" required></textarea>
      </div>
      <div>
        <label>圖片網址（選填）：</label>
        <input type="text" v-model="image" />
      </div>
      <button type="submit">送出貼文</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'CreatePostPage',
  data() {
    return {
      content: '',
      image: '',
      message: ''
    }
  },
  methods: {
    async submitPost() {
      try {
        const token = localStorage.getItem('token')
        await api.post('/posts', {
          content: this.content,
          image: this.image
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.message = '貼文成功！正在導回列表...'
        setTimeout(() => {
          this.$router.push('/posts')
        }, 1000)
      } catch (error) {
        this.message = '發文失敗：' + error.message
      }
    }
  }
}
</script>



