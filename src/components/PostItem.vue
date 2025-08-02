<template>
  <div class="post-card">
    <h3>作者:{{ post.userName }}</h3>
    <p>內容：{{ post.content }}</p>
    <img v-if="post.image" :src="post.image" alt="Post image" style="max-width: 300px;" />
    <small>發文時間：{{ formatDate(post.createdAt) }}</small>

    <div v-if="isAuthor">
      <button @click="editPost">編輯</button>
      <button @click="deletePost">刪除</button>
    </div>

    <hr />
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'PostItem',
  props: {
    post: Object
  },
  computed: {
    isAuthor() {
      const currentUser = localStorage.getItem('userName') // 登入時儲存
      return currentUser === this.post.userName
    }
  },
  methods: {
    formatDate(datetime) {
      return new Date(datetime).toLocaleString()
    },
    editPost() {
      this.$router.push(`/edit-post/${this.post.postId}`)
    },
    async deletePost() {
      if (confirm('確定要刪除這篇貼文嗎？')) {
        const token = localStorage.getItem('token')
        try {
          await api.delete(`/posts/${this.post.postId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          alert('刪除成功！')
          this.$emit('refresh') 
        } catch (err) {
          alert('刪除失敗：' + err.message)
        }
      }
    }
  }
}
</script>




