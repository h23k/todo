<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="black"
    width="24px"
    height="24px"
    class="done"
    :class="{ 'done--checked': isDone }"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
      class="done__line"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isDone: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.done {
  $this: &;

  &__line {
    fill: #ccc;
  }

  &--checked {
    #{$this}__line {
      fill: #444;
    }
  }
}
</style>
