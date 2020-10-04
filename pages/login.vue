<template>
  <div class="container">
    <form v-if="isLogin" @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <fieldset>
        <label for="username">ユーザ名:</label>
        <input v-model="formUsername" type="text" id="username" name="username" placeholder="ユーザ名を入力してください。" />
      </fieldset>
      <fieldset>
        <label for="password">パスワード:</label>
        <input v-model="formPassword" type="password" id="password" name="password" placeholder="パスワードを入力してください。" />
      </fieldset>
      <button type="submit">
        ログイン
      </button>
      <div class="create">
        <a href="#" @click.prevent="showCreateUser">
          ユーザを作成
        </a>
      </div>
    </form>
    <form v-else @submit.prevent="create">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <fieldset>
        <label for="username">ユーザ名:</label>
        <input v-model="formUsername" type="text" id="username" name="username" placeholder="username" />
      </fieldset>
      <fieldset>
        <label for="passowrd">パスワード:</label>
        <input v-model="formPassword" type="password" id="password" name="password" placeholder="password" />
      </fieldset>
      <fieldset class="col-half">
        <div>
          <label for="firstname">姓</label>
          <input v-model="formFirstname" type="text" id="firstname" name="firstname" placeholder="佐藤" />
        </div>
        <div>
          <label for="lastname">名</label>
          <input v-model="formLastname" type="text" id="lastname" name="lastname" placeholder="太郎" />
        </div>
      </fieldset>
      <fieldset>
        <label for="email">メールアドレス</label>
        <input v-model="formEmail" type="text" id="email" name="email" placeholder="username@example.com" />
      </fieldset>
      <button>
        ユーザを作成
      </button>
      <div class="cancel">
        <a href="#" @click.prevent="showLogin">
          戻る
        </a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLogin: true,
    formError: null,
    formUsername: '',
    formPassword: '',
    formFirstname: '',
    formLastname: '',
    formEmail: '',
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.formUsername,
          password: this.formPassword,
        })
        this.$router.push('/')
      } catch(e) {
        this.formError = e.message
      }
    },
    async create() {
      try {
        await this.$axios.post('user/create', {
          username: this.formUsername,
          password: this.formPassword,
          firstname: this.formFirstname,
          lastname: this.formLastname,
          email: this.formEmail,
        })
        this.showLogin()
      } catch(e) {
        if (e.response && e.response.data) {
          this.formError = e.response.data.error
        } else {
          this.formError = e.message
        }
      }
    },
    clearForm() {
      this.formError = null
      this.formUsername = ''
      this.formPassword = ''
      this.formFirstname = ''
      this.formLastname = ''
      this.formEmail = ''
    },
    showCreateUser() {
      this.isLogin = false
      this.clearForm()
    },
    showLogin() {
      this.isLogin = true
      this.clearForm()
    }
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

.create,
.cancel {
  margin-top: 20px;
  font-size: 0.8em;
  text-align: center;

  a {
    text-decoration: none;
  }
}

form {
  width: 30%;
  margin: 0 auto;

  fieldset {
    margin-bottom: 20px;
    border: none;
    padding: 0;

    &.col-half {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 10px;
    }
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