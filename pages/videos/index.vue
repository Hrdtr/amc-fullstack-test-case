<template>
  <section class="section px-5 md:px-4 py-24">
    <transition
      appear
      appear-active-class="duration-500 transform translate-y-8 opacity-0"
    >
      <h2 class="mb-2 text-3xl font-extrabold leading-tight">Videos</h2>
    </transition>
    <transition
      appear
      appear-active-class="duration-300 transform translate-y-8 opacity-0 delay-500"
    >
      <p class="mb-20 text-lg text-gray-600 dark:text-gray-400">
        Comes directly from the desk of engineers, creators and managers at AM
        Collective.
      </p>
    </transition>
    <div
      class="
        grid grid-cols-1
        gap-12
        md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
      "
    >
      <template v-if="loading">
        <div
          v-for="d in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
          :key="d"
          class="
            transform
            scale-100
            hover:scale-105
            duration-200
            flex flex-col
            md:pt-0
          "
        >
          <div
            class="
              animate-pulse
              w-full
              h-56
              mb-5
              bg-gray-200
              dark:bg-gray-800
              rounded
            "
          />

          <div class="w-full">
            <div
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-full
                h-6
                rounded
                mb-3
              "
            />
            <div
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-2/3
                h-4
                rounded
              "
            />
          </div>
        </div>
      </template>
      <template v-else-if="videos.length > 0">
        <div
          v-for="(video, i) in videos"
          :key="i"
          class="transform scale-100 hover:scale-105 duration-200"
        >
          <NuxtLink :to="`/videos/${video.id}`">
            <img
              :src="video.img"
              class="object-cover w-full h-56 mb-5 bg-center rounded"
              alt=""
              loading="lazy"
            />
          </NuxtLink>
          <h2 class="mb-2 text-lg font-semibold">
            <NuxtLink
              :to="`/videos/${video.id}`"
              class="hover:text-gray-900 dark:hover:text-gray-100"
              >{{ video.title }}</NuxtLink
            >
          </h2>
          <p class="mb-3 text-sm font-normal text-gray-600 dark:text-gray-400">
            <a
              href="#"
              class="
                font-medium
                text-gray-600
                dark:text-gray-400
                hover:text-purple-800
                dark:hover:text-gray-200
              "
              >{{ video.channel }}</a
            >
            • {{ video.publishedAt }}
          </p>
        </div>
      </template>
      <template v-else>
        <div class="grid place-items-center">
          <span>Can't find any articles for now :(</span>
        </div>
      </template>
    </div>
    <div v-if="videos.length > 0" class="pagination">
      <button
        class="paginate paginate-prev"
        :disabled="prevPageToken === ''"
        @click="getData('prev')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        PREVIOUS PAGE
      </button>
      <button
        class="paginate paginate-next"
        :disabled="nextPageToken === ''"
        @click="getData('next')"
      >
        NEXT PAGE
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      videos: [],
      nextPageToken: '',
      prevPageToken: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(page) {
      this.loading = true

      try {
        const pageToken = page
          ? page === 'next'
            ? this.nextPageToken
            : this.prevPageToken
          : ''
        const res = await this.$axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDHvGH_8_TLf8l-hKP1kgGmg-4bXpuPUC8&channelId=${
            this.$sources('yt')[0]
          }&part=snippet,id&order=date&maxResults=9&pageToken=${pageToken}`
        )

        const videos = res.data.items.map((item) => {
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            img: item.snippet.thumbnails.medium.url,
            publishedAt: new Date(
              item.snippet.publishedAt
            ).toLocaleDateString(),
            channel: item.snippet.channelTitle
          }
        })

        this.videos = videos
        this.nextPageToken = res.data.nextPageToken || ''
        this.prevPageToken = res.data.prevPageToken || ''
        this.loading = false
      } catch (error) {
        alert(error.response.data.error.message)
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.pagination {
  @apply flex flex-row items-center justify-between md:justify-center mt-20 space-x-0 -mx-5 md:-mx-0 md:space-x-2 sticky bottom-14 md:bottom-16 -mb-24 md:-mb-0 pt-24 md:pt-0 text-sm tracking-wide;
}
.pagination .paginate-prev {
  @apply md:rounded-full border-r md:border-r-0 border-gray-200 dark:border-gray-800 px-5 py-3 md:py-2 w-full md:w-auto text-center bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 flex flex-row items-center justify-between;
}
.pagination .paginate-next {
  @apply md:rounded-full border-l md:border-l-0 border-gray-200 dark:border-gray-800 px-5 py-3 md:py-2 w-full md:w-auto text-center bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 flex flex-row items-center justify-between;
}
.paginate:disabled {
  @apply text-gray-400 dark:text-gray-600 cursor-not-allowed;
}
</style>
