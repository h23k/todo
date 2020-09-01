<template>
  <div class="task" :class="{ 'task--done': isDone }" >
    <div class="task__main">
      <span class="icon icon--btn" @click="clickDone">
        <Done :is-done="isDone" />
      </span>
      <TaskName :value="name" :is-edit="isEdit" @focus-out="focusOut" />
    </div>
    <div v-show="isMenuOpen" class="task__menu">
      <span class="task__edit icon icon--btn" :class="{ 'icon--disabled': isDone }" @click="clickEdit">
        <Edit :is-done="isDone" />
      </span>
      <span class="task__delete icon icon--btn" @click="clickDelete">
        <Delete />
      </span>
    </div>
  </div>
</template>

<script>
import Done from '@/components/Done'
import Edit from '@/components/Edit'
import Delete from '@/components/Delete'
import TaskName from '@/components/TaskName'

export default {
  components: {
    Done,
    Edit,
    Delete,
    TaskName,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isMenuOpen: true,
    isEdit: false,
  }),
  computed: {
    name() {
      return this.task.name
    },
    isOpen() {
      return this.task.isOpen
    },
    isDone() {
      return !this.task.isOpen
    },
  },
  methods: {
    clickDone() {
      this.$emit('update-done')
    },
    clickEdit() {
      if (this.isOpen) {
        this.isEdit = !this.isEdit
      }
    },
    clickDelete() {
      this.$emit('delete-task')
    },
    focusOut(value) {
      this.$emit('update-task', this.index, value)
      this.clickEdit()
    }
  },
  mounted() {
    if (this.task.isNew) {
      this.clickEdit()
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19);
  margin-top: 20px;
  border: 1px solid #696969;
  border-radius: 3px;
  padding: 0 10px;

  &__main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1 0;
    min-width: 0;
  }
  &__menu {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: auto;
  }

  .icon {
    display: inline-block;

    &--btn {
      padding: 10px;
      cursor: pointer;
    }

    &--disabled {
      cursor: default;
    }
  }
}
</style>
