<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="black"
    width="24px"
    height="24px"
    class="add"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" class="add__line" />
  </svg>
</template>

<style lang="scss" scoped>
.add {
  width: 44px;
  height: 44px;

  &__line {
    fill: #fff;
  }
}

@media screen and (min-width: 768px) {
  .add {
    width: auto;
    height: auto;
  
    &__line {
      fill: #444;
    }
  }
}
</style>
