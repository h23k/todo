<template>
  <div class="container">
    <div class="todo">
      <div class="todo__list">
        <Task
          v-for="(task, index) in tasks"
          :key="index"
          :index="index"
          :task="task"
          ref="task"
          @mounted-task="mountedTask"
          @update-done="updateDone(index)"
          @update-task="updateTask"
          @delete-task="deleteTask(index)"
        />
      </div>
      <div class="todo__add" @click="addTask">
        <Add />
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
  data: () => ({
    isAddTask: false,
  }),
  async asyncData({ $axios }) {
    const response = await $axios.get('/?limit=50')
    const tasks = response.data.todo
    return {
      tasks,
    }
  },
  methods: {
    mountedTask() {
      if (this.isAddTask) {
        this.$refs.task[0].clickEdit()
        this.isAddTask = !this.isAddTask
      }
    },
    async addTask() {
      const response = await this.$axios.post('/add', {
        name: '',
        isOpen: true,
      })
      this.tasks.unshift(
        {
          id: response.data.id,
          name: '',
          isOpen: true,
          isNew: true,
        }
      )
      this.isAddTask = true
    },
    async updateDone(index) {
      const id = this.tasks[index].id
      const response = await this.$axios.put(`/task/${id}`, {
        isOpen: this.tasks[index].isOpen ? false : true,
      })
      this.tasks[index].isOpen = !this.tasks[index].isOpen
    },
    async updateTask(index, name) {
      const id = this.tasks[index].id
      const response = await this.$axios.put(`/task/${id}`, {
        name: name,
      })
      this.tasks[index].name = name
    },
    async deleteTask(index) {
      const id = this.tasks[index].id
      const response = await this.$axios.delete(`/task/${id}`)
      this.tasks.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
    }
  }
}
</style>
