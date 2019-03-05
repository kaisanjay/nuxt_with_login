<template>
  <div class="admin-page">
    <section class="new-post">
      <button @click="$router.push('/admin/new-post')" class="post-button">	➕Create Post</button>
      <button class="log-out-btn" @click="onLogout">🚪Logout</button>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },

  layout: 'admin',

  middleware: ['check-auth', 'auth'],

  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  },

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    }
  }
  
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
  color: #FD597A
}

.post-button, .log-out-btn {
  font: inherit;
  background-color: rgb(142, 100, 241);
  color: white;
  border: 1px solid black;
  padding: 0.7em 1em;
  text-align: center;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.post-button:hover, .log-out-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.3);
}

.log-out-btn {
  background-color: rgb(56, 54, 54) !important;
  margin-left: 4%;
}
</style>

