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
        gap-6
        md:gap-12 md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
        divide-y
        md:divide-y-0
        divide-gray-100
        dark:divide-gray-900
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
            flex flex-row
            space-x-4
            md:space-x-0 md:flex-col
            pt-6
            md:pt-0
          "
        >
          <div class="w-2/6 md:w-full">
            <div
              class="
                animate-pulse
                w-full
                h-full
                md:h-56
                mb-0
                md:mb-5
                bg-gray-200
                dark:bg-gray-800
                rounded
              "
            />
          </div>

          <div class="w-4/6 md:w-full">
            <div
              class="
                animate-pulse
                bg-gray-200
                dark:bg-gray-800
                w-1/2
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
                w-full
                h-16
                rounded
                mb-4
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
      <template v-else-if="posts.length > 0">
        <div
          v-for="(post, i) in posts"
          :key="i"
          class="
            transform
            scale-100
            hover:scale-105
            duration-200
            flex flex-row
            space-x-4
            md:space-x-0 md:flex-col
            pt-6
            md:pt-0
          "
        >
          <NuxtLink
            :to="`/read/${post.source}/${post.slug}`"
            class="w-2/6 md:w-full"
          >
            <img
              v-if="post.featuredMedia"
              :src="post.featuredMedia"
              class="
                object-cover
                w-full
                h-full
                md:h-56
                mb-0
                md:mb-5
                bg-center
                rounded
              "
              :alt="post.featuredMediaAltText"
              loading="lazy"
            />
            <img
              v-else
              :src="`https://source.unsplash.com/300x200/?${post.title}`"
              class="
                object-cover
                w-full
                h-full
                md:h-56
                mb-0
                md:mb-5
                bg-center
                rounded
              "
              alt=""
              loading="lazy"
            />
          </NuxtLink>

          <div class="h-full flex flex-col w-4/6 md:w-full -my-1 md:-my-0">
            <span
              class="
                text-xs
                uppercase
                tracking-wider
                font-semibold
                text-gray-400
                dark:text-gray-500
              "
            >
              {{ post.source }}
            </span>
            <div class="flex-1">
              <h2 class="mb-2 text-base md:text-lg font-semibold">
                <NuxtLink
                  :to="`/read/${post.source}/${post.slug}`"
                  class="hover:text-gray-900 dark:hover:text-gray-100"
                  v-html="post.title"
                ></NuxtLink>
              </h2>
            </div>
            <!-- <p
              class="mb-3 text-sm font-normal text-gray-600 dark:text-gray-400"
              v-html="post.excerpt"
            ></p> -->
            <p
              class="
                mb-0
                md:mb-3
                text-sm
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
                >{{ post.author }}</a
              >
              • {{ post.date }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="grid place-items-center">
          <span>Can't find any articles for now :(</span>
        </div>
      </template>
    </div>
    <div v-if="posts.length > 0" class="pagination">
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
  data() {
    return {
      loading: true,
      posts: [],
      totalPages: null,
      page: 1,
      searchKeyword: ''
    }
  },
  watch: {
    page() {
      this.getPosts()
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      this.loading = true

      try {
        const posts = []
        const totalPagesArr = []
        const promises = []
        this.$sources('wp').forEach((source) => {
          promises.push(
            this.$axios.get(
              `${source}/wp-json/wp/v2/posts?per_page=3&page=${this.page}&_embed=author,wp:featuredmedia&_fields=date,slug,title,excerpt,_links.author,_links.wp:featuredmedia,_embedded`
            )
          )
        })

        const res = await Promise.all(promises)
        res.forEach((source) => {
          totalPagesArr.push(source.headers['x-wp-totalpages'])
          posts.push(
            ...source.data.map((d) => {
              const featuredMedia =
                d._embedded['wp:featuredmedia'][0].media_details &&
                d._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail
                  ? d._embedded['wp:featuredmedia'][0].media_details.sizes
                      .thumbnail.source_url
                  : d._embedded['wp:featuredmedia'][0].source_url
              const featuredMediaAltText =
                d._embedded['wp:featuredmedia'][0].alt_text

              return {
                title: d.title.rendered,
                excerpt: d.excerpt.rendered,
                featuredMedia,
                featuredMediaAltText,
                slug: d.slug,
                author: d._embedded.author[0].name || 'Unknown',
                date: new Date(d.date).toLocaleDateString(),
                source: new URL(d._links.author[0].href).hostname.replace(
                  'www.',
                  ''
                )
              }
            })
          )
        })

        this.posts = posts
        this.totalPages = Math.max(...totalPagesArr)
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
