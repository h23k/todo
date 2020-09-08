<template>
  <div class="task-name">
    <p v-show="!isEdit" class="task-name__disp">{{ value }}</p>
    <div v-show="isEdit" class="task-name__edit">
      <input
        type="text"
        class="task-name__input"
        ref="input"
        :value="value"
        @keyup.13="focusOut"
        @focusout="doneEdit($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  updated() {
    if (this.isEdit) {
      this.$refs.input.focus()
    }
  },
  methods: {
    focusOut() {
      this.$refs.input.blur()
    },
    doneEdit() {
      this.$emit('focus-out', this.$refs.input.value)
    }
  },
}
</script>

<style lang="scss" scoped>
.task-name {
  flex: 1;
  min-width: 0;
  margin: 0 3px;

  &__disp {
    color: #444;
    font-size: 24px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__input {
    width: 100%;
    border: none;
    padding: 5px 0;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.19);
    // outline: none;
    color: #444;
    font-size: 24px;
    font-weight: bold;
  }
}

.task--done {
  .task-name {
    &__disp {
      text-decoration: line-through;
    }
  }
}
</style>