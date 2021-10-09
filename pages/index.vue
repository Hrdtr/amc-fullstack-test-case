<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="section px-5 md:px-4 py-24">
    <transition
      appear
      appear-active-class="duration-500 transform translate-y-8 opacity-0"
    >
      <h2 class="mb-2 text-3xl font-extrabold leading-tight">Articles</h2>
    </transition>
    <transition
      appear
      appear-active-class="duration-300 transform translate-y-8 opacity-0 delay-500"
    >
      <p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
        Comes directly from the desk of engineers, creators and managers at AM
        Collective.
      </p>
    </transition>
    <transition
      appear
      appear-active-class="duration-300 transform translate-y-8 opacity-0 delay-500"
    >
      <input
        v-model="searchKeyword"
        class="
          mb-20
          text-lg
          px-6
          py-3
          rounded-md
          bg-gray-100
          dark:bg-gray-900
          border border-gray-200
          dark:border-gray-800
        "
        type="text"
        placeholder="Search something ..."
        @keyup.enter="search"
      />
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
      <template v-if="posts && posts.length > 0">
        <div
          v-for="(post, i) in posts"
          :key="i"
          class="transform scale-100 hover:scale-105 duration-200"
        >
          <NuxtLink
            :to="`/read/${
              post.source === 'Alvinology' ? 'alvinology' : 'lemon-film'
            }/${post.slug}`"
          >
            <div
              v-if="loading"
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
            <img
              v-else-if="post._embedded['wp:featuredmedia'][0].media_details"
              :src="
                post._embedded['wp:featuredmedia'][0].media_details.sizes
                  .thumbnail.source_url
              "
              class="object-cover w-full h-56 mb-5 bg-center rounded"
              :alt="post._embedded['wp:featuredmedia'][0].alt_text"
              loading="lazy"
            />
            <img
              v-else
              :src="`https://source.unsplash.com/300x200/?${post.title.rendered}`"
              class="object-cover w-full h-56 mb-5 bg-center rounded"
              alt=""
              loading="lazy"
            />
          </NuxtLink>
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
          <h2 v-else class="mb-2 text-lg font-semibold">
            <NuxtLink
              :to="`/read/${
                post.source === 'Alvinology' ? 'alvinology' : 'lemon-film'
              }/${post.slug}`"
              class="hover:text-gray-900 dark:hover:text-gray-100"
              v-html="post.title.rendered"
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
            v-html="post.excerpt.rendered"
          ></p>
          <div
            v-if="loading"
            class="animate-pulse bg-gray-200 dark:bg-gray-800 w-2/3 h-4 rounded"
          />
          <p
            v-else
            class="mb-3 text-sm font-normal text-gray-600 dark:text-gray-400"
          >
            <a
              href="#"
              class="
                font-medium
                text-gray-600
                dark:text-gray-400
                hover:text-purple-800
                dark:hover:text-gray-200
              "
              >{{ post._embedded.author[0].name }}</a
            >
            • {{ new Date(post.date).toLocaleDateString('id-ID') }} |
            {{ post.source }}
          </p>
        </div>
      </template>
      <template v-else>
        <div class="grid place-items-center">
          <span>Can't find any articles for now :(</span>
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
  async asyncData({ $axios }) {
    try {
      const res1 = await $axios.get(
        'https://lemon-film.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=author,wp:featuredmedia&_fields=date,slug,title,excerpt,_links.author,_links.wp:featuredmedia,_embedded'
      )
      const res2 = await $axios.get(
        'https://alvinology.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=author,wp:featuredmedia&_fields=date,slug,title,excerpt,_links.author,_links.wp:featuredmedia,_embedded'
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
      searchKeyword: ''
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
          `https://lemon-film.com/wp-json/wp/v2/posts?per_page=3&page=${this.page}&_embed=author,wp:featuredmedia&_fields=date,slug,title,excerpt,_links.author,_links.wp:featuredmedia,_embedded`
        )
        const res2 = await this.$axios.get(
          `https://alvinology.com/wp-json/wp/v2/posts?per_page=3&page=${this.page}&_embed=author,wp:featuredmedia&_fields=date,slug,title,excerpt,_links.author,_links.wp:featuredmedia,_embedded`
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
