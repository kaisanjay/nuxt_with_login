<template>
  <div class="home-page">
    <section class="intro">
      <h1>Some Awesome Poems</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },

  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
  
}
</script>


<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/main-page-background.svg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: #FD597A;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 9px 0 rgba(23,28,33,.06);
  box-sizing: border-box;
  border: 1px solid #FD597A;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>



