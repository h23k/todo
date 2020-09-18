<template>
  <div class="container">
    <form @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <fieldset>
        <label for="username">Username:</label>
        <input v-model="formUsername" type="text" id="username" name="username" placeholder="username" />
      </fieldset>
      <fieldset>
        <label for="password">Password:</label>
        <input v-model="formPassword" type="password" id="password" name="password" />
      </fieldset>
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    formError: null,
    formUsername: '',
    formPassword: '',
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.formUsername,
          password: this.formPassword,
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        location.href = location.origin
      } catch(e) {
        this.formError = e.message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error {
  margin-bottom: 10px;
  background: #ffdcdc;
  border: 2px solid #ff2a2a;
  padding: 0.5em;
  color: #ff2a2a;
}

form {
  width: 30%;
  margin: 0 auto;

  fieldset {
    margin-bottom: 20px;
    border: none;
    padding: 0;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
    margin-top: 5px;
    border: 1px solid #aaa;
    border-radius: 3px;
    padding: 0.5em;
    font-size: 1rem;
  }
  button {
    width: 100%;
    height: 2.5em;
    background: #fff;
    border: 1px solid #2a56f3;
    border-radius: 3px;
    color: #2a56f3;
    font-size: 1rem;
    cursor: pointer;
    
    &:hover {
      background: #2a56f3;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19);
      color: #fff;
      transition: all 0.3s ease;
    }
  }
}
</style>