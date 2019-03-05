<template>
<div class="header-container">
  <header class="the-header">
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    <div class="logo">
      <nuxt-link to="/">Fake Poems</nuxt-link>
    </div>
    <div class="spacer"></div>
    <div class="navigation-items">
      <ul 
        class="nav-list"
        @click="$emit('close')">
        <li class="nav-item"><nuxt-link to="/posts"> 📖 Blog</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/about"> 🔖 About</nuxt-link></li>
        <li class="nav-item"><nuxt-link to="/admin"> 💁 ‍‍‍Admin</nuxt-link></li>
      </ul>
    </div>
  </header>
</div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle
  }
};
</script>


<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #FD597A;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

@keyframes zomg {
  0%, 100% { filter: invert(0)   saturate(100%) hue-rotate(0deg); }
  25%      { filter: invert(10%) saturate(500%) hue-rotate(180deg); }
  50%      { filter: invert(10%) saturate(300%) hue-rotate(300deg); }
  75%      { filter: invert(10%) saturate(500%) hue-rotate(90deg); }
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
  animation: zomg .5s infinite;
}
</style>
