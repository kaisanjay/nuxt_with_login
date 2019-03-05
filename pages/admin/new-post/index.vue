<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
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


  computed: {
    ...mapState({ token: state => state.token })
  },

  mounted() {
    const pupu = this.$store.getters.test
    console.log(pupu)
  },

  methods: {
    async onSubmitted(postData) {
      const ip = await this.$axios.$post('https://first-project-33cb5.firebaseio.com/posts.json?auth=' + this.token, {...postData, updatedDate: new Date()})
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>

