<template>
  <!-- eslint-disable vue/no-v-html -->
  <section>
    <article>
      <div class="grid items-center grid-cols-1 md:grid-cols-2">
        <div class="order-2 h-64 md:order-1 md:h-full">
          <img
            v-if="post._embedded['wp:featuredmedia'][0].media_details"
            :src="post._embedded['wp:featuredmedia'][0].source_url"
            class="object-cover w-full h-full bg-center"
            :alt="post._embedded['wp:featuredmedia'][0].alt_text"
            loading="lazy"
          />
          <img
            v-else
            :src="`https://source.unsplash.com/300x200/?${post.title.rendered}`"
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
            <time>{{ new Date(post.date).toLocaleDateString('id-ID') }}</time>
          </p>
          <h1
            class="mb-5 text-3xl font-bold md:leading-tight md:text-4xl"
            itemprop="headline"
            title="Rise of Tailwind - A Utility First CSS Framework"
            v-html="post.title.rendered"
          />
          <div>
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400">
              - {{ post._embedded.author[0].name }}
            </p>
          </div>
        </div>
      </div>

      <div class="px-4 py-20 mx-auto prose" v-html="post.content.rendered" />
    </article>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.get(
        `https://${params.source}.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed=author,wp:featuredmedia`
      )
      return {
        post: res.data[0]
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
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
