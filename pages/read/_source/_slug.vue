<template>
  <!-- eslint-disable vue/no-v-html -->
  <section>
    <template v-if="loading">
      <article class="flex flex-col min-h-screen">
        <div class="grid items-center grid-cols-1 md:grid-cols-2">
          <div
            class="
              animate-pulse
              bg-gray-200
              dark:bg-gray-800
              order-2
              h-64
              md:order-1 md:h-full
              w-full
            "
          ></div>
          <div
            class="
              order-1
              w-full
              px-4
              py-12
              mx-auto
              text-left
              md:w-3/4 md:py-48 md:order-2 md:px-0
            "
          >
            <p
              class="
                animate-pulse
                rounded
                bg-gray-200
                dark:bg-gray-800
                mb-3
                text-gray-500
                h-6
                w-32
              "
            ></p>
            <h1
              class="
                animate-pulse
                rounded
                bg-gray-200
                dark:bg-gray-800
                h-12
                w-full
                mb-5
                text-3xl
                font-bold
                md:leading-tight md:text-4xl
              "
              itemprop="headline"
              title="Rise of Tailwind - A Utility First CSS Framework"
            />
            <div>
              <p
                class="
                  animate-pulse
                  rounded
                  bg-gray-200
                  dark:bg-gray-800
                  h-6
                  w-48
                  text-sm
                  font-semibold
                  text-gray-600
                  dark:text-gray-400
                "
              ></p>
            </div>
          </div>
        </div>

        <div class="flex-1 flex px-5 md:px-4 my-20">
          <div
            class="
              flex-1
              animate-pulse
              rounded
              bg-gray-200
              dark:bg-gray-800
              prose
            "
          ></div>
        </div>
      </article>
    </template>
    <template v-else>
      <article>
        <div class="grid items-center grid-cols-1 md:grid-cols-2">
          <div class="order-2 h-64 md:order-1 md:h-full">
            <img
              v-if="post.featuredMedia"
              :src="post.featuredMedia"
              class="object-cover w-full h-full bg-center"
              :alt="post.featuredMediaAltText"
              loading="lazy"
            />
            <img
              v-else
              :src="`https://source.unsplash.com/300x200/?${post.title}`"
              class="object-cover w-full h-full bg-center"
              alt=""
              loading="lazy"
            />
          </div>
          <div
            class="
              order-1
              w-full
              px-4
              py-12
              mx-auto
              text-left
              md:w-3/4 md:py-48 md:order-2 md:px-0
            "
          >
            <p class="mb-3 text-gray-500">
              <time>{{ post.date }}</time>
            </p>
            <h1
              class="mb-5 text-3xl font-bold md:leading-tight md:text-4xl"
              itemprop="headline"
              title="Rise of Tailwind - A Utility First CSS Framework"
              v-html="post.title"
            />
            <div>
              <p class="text-sm font-semibold text-gray-600 dark:text-gray-400">
                - {{ post.author }}
              </p>
            </div>
          </div>
        </div>

        <div class="px-4 py-20 mx-auto prose" v-html="post.content" />
      </article>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      post: null
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    async getPost() {
      try {
        const res = await this.$axios.get(
          `https://${this.$route.params.source}/wp-json/wp/v2/posts?slug=${this.$route.params.slug}&_embed=author,wp:featuredmedia`
        )

        const featuredMedia =
          res.data[0]._embedded['wp:featuredmedia'][0].media_details &&
          res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes
            .thumbnail
            ? res.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes
                .thumbnail.source_url
            : res.data[0]._embedded['wp:featuredmedia'][0].source_url
        const featuredMediaAltText =
          res.data[0]._embedded['wp:featuredmedia'][0].alt_text

        this.post = {
          title: res.data[0].title.rendered,
          featuredMedia,
          featuredMediaAltText,
          author: res.data[0]._embedded.author[0].name || 'Unknown',
          date: new Date(res.data[0].date).toLocaleDateString(),
          content: res.data[0].content.rendered
        }
        // this.loading = false
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        // this.loading = false
      }
    }
  }
}
</script>

<style lang="postcss">
.prose,
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6,
.prose a,
.prose strong {
  @apply text-gray-800 dark:text-gray-200 !important;
}
</style>
