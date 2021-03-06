<template>
  <div class="container">
    <div class="header">
      <div class="header__username">
        Hi, {{ this.getAuthUsername }}
      </div>
      <div>
        <a href="#" class="header__logout" @click.prevent="logoutWith">Logout</a>
      </div>
    </div>
    <div class="todo">
      <div class="todo__list">
        <Task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @update-done="doneTask"
          @update-task="updateTask"
          @delete-task="deleteTask"
        />
      </div>
      <div class="todo__add" @click="addTask">
        <span class="icon">
          <Add />
        </span>
        <span class="todo__add-label">新規追加</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Add from '@/components/Add'

export default {
  components: {
    Add,
  },
  middleware: 'auth',
  async fetch({ $axios, store }) {
    const response = await $axios.get('/todo?limit=20')
    const todo = response.data.todo
    store.commit('todo/setTasks', todo)
  },
  computed: {
    ...mapState(
      'todo',
      ['tasks'],
    ),
    ...mapGetters(
      'auth',
      ['getAuthUsername'],
    ),
  },
  methods: {
    ...mapMutations(
      'todo',
      ['insert', 'remove', 'updateName', 'done'],
    ),
    ...mapActions(
      'auth',
      ['logout'],
    ),
    logoutWith() {
      this.logout()
      this.$router.push('/login')
    },
    async addTask() {
      const name = ''
      const response = await this.$axios.post('/todo/add', {
        name: name,
      })
      const id = response.data.id
      this.insert({ id, name })
    },
    async doneTask({ id, isOpen }) {
      const response = await this.$axios.put(`/todo/task/${id}`, {
        isOpen: isOpen,
      })
      this.done(id)
    },
    async updateTask({ id, name }) {
      const response = await this.$axios.put(`/todo/task/${id}`, {
        name: name,
      })
      this.updateName({ id, name })
    },
    async deleteTask(id) {
      const response = await this.$axios.delete(`/todo/task/${id}`)
      this.remove(id)
    },
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon {
  display: inline-block;
  line-height: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a56f3;
  padding: 10px 5.333%;

  &__username {
    color: #fff;
  }
  &__logout {
    color: #fff;
    text-decoration: none;

    &:hover {
      font-weight: bold;
    }
  }
}

.todo {
  padding: 0 5.333%;

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__add {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    background: #2a56f3;
    border-radius: 30px;
    cursor: pointer;
    position: fixed;
    right: 20px;
    bottom: 40px;
  }
  &__add-label {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .todo {
    &__add {
      width: auto;
      height: auto;
      background: initial;
      margin-top: 20px;
      padding: 10px;
      position: static;

      &:hover {
        background: #eee;
      }
    }
    &__add-label {
      display: initial;
      margin-left: 0.5em;
    }
  }
}
</style>