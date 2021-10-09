<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="section px-5 md:px-4 py-24">
    <transition
      appear
      appear-active-class="duration-500 transform translate-y-8 opacity-0"
    >
      <h2 class="mb-2 text-3xl font-extrabold leading-tight">
        Search Result for '{{ $route.query.keyword }}'
      </h2>
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
    <div class="w-full">
      <template v-if="posts && posts.length > 0">
        <div
          class="
            flex flex-col
            space-y-12
            divide-y divide-gray-100
            dark:divide-gray-900
          "
        >
          <div v-for="(post, i) in posts" :key="i">
            <div
              v-if="loading"
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-24
                h-4
                rounded
                mb-3
                mt-12
              "
            />
            <p
              v-else
              class="
                pt-12
                mb-3
                text-sm
                font-normal
                text-gray-600
                dark:text-gray-400
              "
            >
              {{
                new Date(post._embedded.self[0].date).toLocaleDateString(
                  'id-ID'
                )
              }}
            </p>
            <div
              v-if="loading"
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
            <h2
              v-else
              class="
                mb-2
                text-xl
                font-extrabold
                leading-snug
                tracking-tight
                md:text-2xl
              "
            >
              <NuxtLink
                :to="`/read/${
                  post.source === 'Alvinology' ? 'alvinology' : 'lemon-film'
                }/${post._embedded.self[0].slug}`"
                class="hover:text-gray-900 dark:hover:text-gray-100"
                v-html="post._embedded.self[0].title.rendered"
              ></NuxtLink>
            </h2>
            <div
              v-if="loading"
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-full
                h-16
                rounded
                mb-4
              "
            />
            <p
              v-else
              class="mb-3 text-sm font-normal text-gray-600 dark:text-gray-400"
              v-html="post._embedded.self[0].excerpt.rendered"
            ></p>
            <div
              v-if="loading"
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-28
                h-8
                rounded
                mb-3
              "
            />
            <NuxtLink
              v-else
              :to="`/read/${
                post.source === 'Alvinology' ? 'alvinology' : 'lemon-film'
              }/${post._embedded.self[0].slug}`"
              class="
                px-4
                py-2
                bg-gray-200
                dark:bg-gray-800
                hover:bg-gray-100
                dark:hover:bg-gray-900
                rounded-md
                text-xs text-gray-600
                dark:text-gray-400
                tracking-wide
              "
            >
              CONTINUE READING
            </NuxtLink>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="grid place-items-center">
          <span>No article found :(</span>
        </div>
      </template>
    </div>
    <div v-if="posts && posts.length > 0" class="pagination">
      <button
        class="paginate paginate-prev"
        :disabled="page === 1"
        @click="page -= 1"
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
        :disabled="page === totalPages"
        @click="page += 1"
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
  async asyncData({ $axios, route }) {
    try {
      const res1 = await $axios.get(
        `https://lemon-film.com/wp-json/wp/v2/search?search=${route.query.keyword}&per_page=3&page=1&type=post&_embed=self`
      )
      const res2 = await $axios.get(
        `https://alvinology.com/wp-json/wp/v2/search?search=${route.query.keyword}&per_page=3&page=1&type=post&_embed=self`
      )
      return {
        posts: [
          ...res1.data.map((d) => {
            return {
              ...d,
              source: 'Lemon Film'
            }
          }),
          ...res2.data.map((d) => {
            return {
              ...d,
              source: 'Alvinology'
            }
          })
        ],
        totalPages: Math.max(
          res1.headers['x-wp-totalpages'],
          res2.headers['x-wp-totalpages']
        )
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      searchKeyword: this.$route.query.keyword
    }
  },
  watch: {
    page() {
      this.getPosts()
    }
  },
  methods: {
    async getPosts() {
      this.loading = true
      try {
        const res1 = await this.$axios.get(
          `https://lemon-film.com/wp-json/wp/v2/search?search=${this.searchKeyword}&per_page=3&page=${this.page}&type=post&_embed=self`
        )
        const res2 = await this.$axios.get(
          `https://alvinology.com/wp-json/wp/v2/search?search=${this.searchKeyword}&per_page=3&page=${this.page}&type=post&_embed=self`
        )
        this.posts = [
          ...res1.data.map((d) => {
            return {
              ...d,
              source: 'Lemon Film'
            }
          }),
          ...res2.data.map((d) => {
            return {
              ...d,
              source: 'Alvinology'
            }
          })
        ]
        this.loading = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        this.loading = false
      }
    },
    search() {
      if (this.searchKeyword) {
        this.$router.push(`/search?keyword=${this.searchKeyword}`)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.pagination {
  @apply flex flex-row items-center justify-between md:justify-center mt-20 space-x-0 -mx-5 md:-mx-0 md:space-x-2 sticky bottom-12 md:bottom-16 -mb-24 md:-mb-0 pt-24 md:pt-0 text-sm tracking-wide;
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
