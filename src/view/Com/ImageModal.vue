<template>
  <image-modal :visible="true" transition="roll">
    <p class="image is-4by3">
      <img :src="url">
    </p>
  </image-modal>
</template>

<script>
import Modal from './BoxModal.vue'

export default {
  props:{
    url: {
      type: String,
      default: "http://placehold.it/1280x960"
    }
  },
  components: {
    name:"ImageModal",
    'image-modal':Modal
  }
}
</script>
