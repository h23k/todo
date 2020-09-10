<template>
  <div class="container">
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
import Add from '@/components/Add'

export default {
  components: {
    Add,
  },
  async fetch({ $axios, store }) {
    const response = await $axios.get('/?limit=20')
    const todo = response.data.todo
    store.commit('todo/setTasks', todo)
  },
  computed: {
    tasks() {
      return this.$store.state.todo.tasks
    },
  },
  methods: {
    async addTask() {
      const name = ''
      const response = await this.$axios.post('/add', {
        name: name,
      })
      const id = response.data.id
      this.$store.commit('todo/insert', { id, name })
    },
    async doneTask({ id, isOpen }) {
      const response = await this.$axios.put(`/task/${id}`, {
        isOpen: isOpen,
      })
      this.$store.commit('todo/done', id)
    },
    async updateTask({ id, name }) {
      const response = await this.$axios.put(`/task/${id}`, {
        name: name,
      })
      this.$store.commit('todo/updateName', { id, name })
    },
    async deleteTask(id) {
      const response = await this.$axios.delete(`/task/${id}`)
      this.$store.commit('todo/remove', id)
    },
  },
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.icon {
  display: inline-block;
  line-height: 1;
}

.todo {
  width: 100%;
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
