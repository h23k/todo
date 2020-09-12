<template>
  <div class="task" :class="{ 'task--done': isDone }" >
    <div class="task__main">
      <span class="icon icon--btn" @click="clickDone">
        <Done :is-done="isDone" />
      </span>
      <TaskName :value="task.name" :is-edit="isEdit" @focus-out="focusOut" />
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
import { mapGetters } from 'vuex'
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
  mounted() {
    this.$nextTick(() => {
      const index = this.getInsertIndex
      if (index !== -1) {
        this.clickEdit()
      }
    })
  },
  data: () => ({
    isMenuOpen: true,
    isEdit: false,
  }),
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDone() {
      return !this.task.isOpen
    },
    ...mapGetters(
      'todo',
      ['getInsertIndex'],
    ),
  },
  methods: {
    clickDone() {
      const id = this.task.id
      const isOpen = !this.task.isOpen
      this.$emit('update-done', { id, isOpen })
    },
    clickEdit() {
      if (this.task.isOpen) {
        this.isEdit = !this.isEdit
      }
    },
    clickDelete() {
      this.$emit('delete-task', this.task.id)
    },
    focusOut(name) {
      const id = this.task.id
      this.$emit('update-task', { id, name })
      this.clickEdit()
    }
  },
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
  padding: 3px;

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
    &--btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      padding: 10px;
      line-height: 1;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }

    &--disabled {
      cursor: default;

      &:hover {
        background: initial;
      }
    }
  }
}
</style>
