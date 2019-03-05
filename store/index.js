import Vuex from 'vuex'
import Cookie from "js-cookie"

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },

      setToken(state, token) {
        state.token = token
      },

      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      async nuxtServerInit(vuexContex, context) {
        const ip = await this.$axios.$get('https://first-project-33cb5.firebaseio.com/posts.json')
        const postArray = []
        for (const key in ip) {
          postArray.push({...ip[key], id: key})
        }
        vuexContex.commit('setPosts', postArray)

      },
      setPosts(vuexContex, posts) {
        vuexContex.commit('setPosts', posts)
      },

      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
          })
          .catch(e => console.log(e));
      },

      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit("clearToken");
        }, duration);
      },

      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token');
          vuexContext.dispatch("logout")
          return;
        }
        vuexContext.commit("setToken", token);
      },

      logout(vuexContext) {
        vuexContext.commit("clearToken")
        Cookie.remove("jwt")
        Cookie.remove("expirationDate")
        if (process.client) {
          localStorage.removeItem("token")
          localStorage.removeItem("tokenExpiration")
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },

      isAuthenticated (state) {
        return state.token != null
      },

      test (state) {
        return state.token
      }
    }
  })
}

export default createStore