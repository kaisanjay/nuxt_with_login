<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="ip" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm"
import { mapState } from 'vuex'

export default {
  components: {
    AdminPostForm
  },
  
  layout: 'admin',

  middleware: ['check-auth', 'auth'],

  async asyncData({ $axios , params}) {
    const ip = await $axios.$get('https://first-project-33cb5.firebaseio.com/posts/' + params.postId + '.json')
    return { ip }
  },

  computed: {
    ...mapState({ token: state => state.token })
  },

  mounted() {
    console.log(this.token)
  },

  methods: {
    async onSubmitted(editedPost) {
      const ip = await this.$axios.$put('https://first-project-33cb5.firebaseio.com/posts/' + this.$route.params.postId + '.json?auth=' + this.token, {...editedPost, updatedDate: new Date()})
      this.$router.push('/admin')
    }
  }
  
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>


