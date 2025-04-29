<template>
  <button :type="type" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: "InputButton",
  components: {},
  props: {
    type: {
      type: String,
    },
  },
};
</script>
