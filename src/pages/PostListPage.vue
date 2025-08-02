<template>
  <router-link to="/create-post">
  <button>新增貼文</button>
  </router-link>
  <div>
    <h1>貼文列表</h1>
    <div v-if="posts.length === 0">目前沒有貼文。</div>
    <PostItem
      v-for="post in posts"
      :key="post.postId"
      :post="post"
      @refresh="fetchPosts"
    />
  </div>
</template>

<script>
import api from '../services/api'
import PostItem from '../components/PostItem.vue'

export default {
  components: { PostItem },
  data() {
    return { posts: [] }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    const res = await api.get('/posts', {
      headers: { Authorization: `Bearer ${token}` }
    })
    this.posts = res.data
  }
}
</script>



