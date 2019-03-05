<template>
  <div>
    <nuxt-link :to="postLink">
      <article class="post-preview">
        <div
          class="post-thumbnail"
          :style="{backgroundImage: 'url(' + thumbnail +')'}"
        ></div>
        <div class="post-content">
          <h1>{{ title }}</h1>
          <p>{{ previewText }}</p>
        </div>
      </article>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  computed: {
    postLink() {
      return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
    }
  }
}
</script>


<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 4px 9px 0 rgba(23,28,33,.06);
  background-color: white;
  width: 90%;
  border-radius: 5px;
  transition: all 0.2s;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
}

.post-content {
  padding: 10px;
  text-align: center;
}

@keyframes zomg {
  0%, 100% { filter: invert(0)   saturate(100%) hue-rotate(0deg); }
  25%      { filter: invert(10%) saturate(500%) hue-rotate(180deg); }
  50%      { filter: invert(10%) saturate(300%) hue-rotate(300deg); }
  75%      { filter: invert(10%) saturate(500%) hue-rotate(90deg); }
}


a:hover .post-preview,
a:active .post-preview {
  background-color: #FD597A;
  animation: zomg .5s infinite;
  opacity: .7;
  transform: translateY(-10px);
}
</style>

