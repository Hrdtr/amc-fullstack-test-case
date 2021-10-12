<template>
  <section class="section px-5 md:px-4 py-24 flex flex-col items-center">
    <LazyYoutube
      :src="`https://www.youtube.com/watch?v=${$route.params.id}`"
      max-width="1080px"
    />
    <div class="w-full mt-12 mb-20" style="max-width: 65ch">
      <div
        v-if="loading"
        class="animate-pulse rounded bg-gray-200 dark:bg-gray-800 w-32 h-8 mb-3"
      ></div>
      <p
        v-else
        class="
          mb-1
          text-base
          md:text-lg
          font-normal
          text-gray-600
          dark:text-gray-400
        "
      >
        <a
          href="#"
          class="
            font-medium
            text-gray-600
            dark:text-gray-400
            hover:text-gray-800
            dark:hover:text-gray-200
          "
          >{{ channel }}</a
        >
        • {{ publishedAt }}
      </p>
      <div
        v-if="loading"
        class="
          animate-pulse
          rounded
          bg-gray-200
          dark:bg-gray-800
          w-full
          h-16
          mb-12
        "
      ></div>
      <h2 v-else class="mb-4 text-xl md:text-2xl font-semibold">
        {{ title }}
      </h2>
      <div
        v-if="loading"
        class="
          animate-pulse
          rounded
          bg-gray-200
          dark:bg-gray-800
          w-full
          h-96
          mb-3
        "
      ></div>
      <p
        v-else
        class="
          mb-3
          text-base
          md:text-lg
          font-normal
          text-gray-700
          dark:text-gray-300
          prose
          whitespace-pre-line
          select-text
        "
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      title: '',
      description: '',
      channel: '',
      publishedAt: ''
    }
  },
  async created() {
    try {
      const res = await this.$axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDHvGH_8_TLf8l-hKP1kgGmg-4bXpuPUC8&id=${this.$route.params.id}&part=snippet`
      )
      this.title = res.data.items[0].snippet.title
      this.description = res.data.items[0].snippet.description
      this.channel = res.data.items[0].snippet.channelTitle
      this.publishedAt = new Date(
        res.data.items[0].snippet.publishedAt
      ).toLocaleDateString()
      this.loading = false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      this.loading = false
    }
  }
}
</script>
