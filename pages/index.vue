<template>
  <div class="container">
    <div class="todo">
      <div class="todo__list">
        <Task
          v-for="(task, index) in tasks"
          :key="index"
          :index="index"
          :task="task"
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
  async asyncData(context) {
    const response = await context.$axios.get('http://localhost:3000/api/todo')
    const tasks = response.data.todo
    return {
      tasks,
    }
  },
  methods: {
    addTask() {
      this.tasks.push(
        {
          name: '',
          isOpen: true,
          isNew: true,
        }
      )
    },
    updateDone(index) {
      this.tasks[index].isOpen = !this.tasks[index].isOpen
    },
    updateTask(index, name) {
      this.tasks[index].name = name
    },
    deleteTask(index) {
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
