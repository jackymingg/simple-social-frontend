<template>
  <div class="edit-post">
    <h2>編輯貼文</h2>
    <form @submit.prevent="handleUpdate">
      <div>
        <label>內容：</label>
        <textarea v-model="content" required></textarea>
      </div>
      <div>
        <label>圖片連結：</label>
        <input v-model="image" type="text" />
      </div>
      <button type="submit">更新</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'EditPostPage',
  data() {
    return {
      content: '',
      image: ''
    }
  },
  async mounted() {
    const postId = this.$route.params.id
    try {
      const res = await api.get(`/posts`)
      const post = res.data.find(p => p.postId == postId)
      if (!post) {
        alert('找不到貼文')
        this.$router.push('/posts')
        return
      }
      this.content = post.content
      this.image = post.image
    } catch (err) {
      alert('取得貼文失敗：' + err.message)
    }
  },
  methods: {
    async handleUpdate() {
      const postId = this.$route.params.id
      try {
        await api.put(`/posts/${postId}`, {
          content: this.content,
          image: this.image
        })
        alert('更新成功！')
        this.$router.push('/posts')
      } catch (err) {
        alert('更新失敗：' + err.message)
      }
    }
  }
}
</script>



