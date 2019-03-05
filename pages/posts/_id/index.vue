<template>
  <div class="single-post-page">
    <section class="post">
      <h1>{{singlePost.title}}</h1>
      <div class="post-details">
        <div>last updated on {{singlePost.updatedDate}}</div>
        <div>written by {{singlePost.author}}</div>
      </div>
      <p class="gradient-multiline"><span>{{singlePost.content}}</span></p>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios , params}) {
    const singlePost = await $axios.$get('https://first-project-33cb5.firebaseio.com/posts/'+ params.id + '.json')
    return { singlePost }
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.gradient-multiline {
  position: relative;
  width: 300px;
  margin: 40px auto;
  background-color: #fff;
  text-align: center;
  line-height: 1.5em;
  overflow:hidden;
}
  
.gradient-multiline span {
  color: #fff;
  background-color: #000;

  padding: 0.225rem 0.5rem;

  /* Needs prefixing */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

@supports(mix-blend-mode: lighten) {
  
  .gradient-multiline::after {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background: linear-gradient(60deg, #3629a2, #00ceff);

    mix-blend-mode: lighten;
  }
  
}
</style>

