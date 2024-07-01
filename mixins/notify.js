export default {
  computed: {
    getSuccess() {
      return this.$store.getters['notify/getSuccess'];
    },
    getError() {
      return this.$store.getters['notify/getError'];
    }
  },
  watch: {
    getSuccess(newMessage) {
      if (newMessage) {
        this.$toast.success(newMessage)
      }
    },
    getError(newMessage) {
      if (newMessage) {
        this.$toast.error(newMessage)
      }
    },
  },
}
