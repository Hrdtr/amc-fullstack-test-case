<template>
  <div :class="{ dark: darkMode }">
    <div class="layout">
      <header id="header" class="section header">
        <NuxtLink id="logo" to="/" class="logo">
          <img src="/icon.png" alt="AM Collective's logo" />
        </NuxtLink>
        <nav id="nav" class="nav">
          <ul>
            <li v-for="(item, i) in navigationItems" :key="i">
              <NuxtLink
                :to="item.href"
                class="nav-item"
                :exact="item.name === 'Articles'"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </header>

      <Nuxt />

      <footer class="section footer">
        <nav id="nav" class="nav-mobile">
          <ul>
            <li v-for="(item, i) in navigationItems" :key="i">
              <NuxtLink
                :to="item.href"
                class="nav-item"
                :exact="item.name === 'Articles'"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
            <li>
              <button class="text-gray-500" @click="darkMode = !darkMode">
                <svg
                  width="34"
                  height="34"
                  viewBox="-5 -5 34 34"
                  stroke-width="0"
                  class="fill-current"
                >
                  <g v-if="!darkMode">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"
                    ></path>
                  </g>
                  <g v-else>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.929 4.929a1 1 0 011.414 0l.707.707A1 1 0 115.636 7.05l-.707-.707a1 1 0 010-1.414zm14.142 0a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7 12a5 5 0 1110 0 5 5 0 01-10 0zm-5 0a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm17 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-2.05 4.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM12 19a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                    ></path>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        <div class="hidden md:flex flex-row items-center justify-between -mx-1">
          <p class="text-sm">© Copyright 2021. All Rights Reserved.</p>

          <button class="text-gray-500" @click="darkMode = !darkMode">
            <svg
              width="34"
              height="34"
              viewBox="-5 -5 34 34"
              stroke-width="0"
              class="fill-current"
            >
              <g v-if="!darkMode">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"
                ></path>
              </g>
              <g v-else>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.929 4.929a1 1 0 011.414 0l.707.707A1 1 0 115.636 7.05l-.707-.707a1 1 0 010-1.414zm14.142 0a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7 12a5 5 0 1110 0 5 5 0 01-10 0zm-5 0a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm17 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-2.05 4.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM12 19a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
      navigationItems: [
        {
          name: 'Articles',
          icon: '',
          href: '/'
        },
        {
          name: 'Videos',
          icon: '',
          href: '/videos'
        },
        {
          name: 'About',
          icon: '',
          href: '/about'
        }
      ]
    }
  },
  watch: {
    darkMode(val) {
      localStorage.setItem('am-theme', val ? 'dark' : 'light')
    }
  },
  mounted() {
    if (localStorage.getItem('am-theme') !== null) {
      this.darkMode = localStorage.getItem('am-theme') === 'dark'
    } else {
      localStorage.setItem('am-theme', 'light')
    }
  }
}
</script>

<style lang="postcss">
* {
  @apply antialiased transition-all;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.5s ease;
}
.page-enter,
.page-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.layout {
  @apply bg-white dark:bg-black text-gray-800 dark:text-gray-200;
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
}
.section {
  @apply w-full mx-auto max-w-7xl;
}
.header {
  @apply flex flex-row items-center justify-between px-5 md:px-4 py-4 md:sticky md:top-0 bg-white dark:bg-black rounded-b-none md:rounded-b-md z-10;
}
.logo {
  @apply -ml-2;
}
.logo img {
  @apply h-8 px-2 py-1 bg-white rounded border border-gray-200 dark:border-gray-800;
}
.nav {
  @apply hidden md:block;
}
.nav ul {
  @apply inline-flex space-x-5 font-medium text-xs tracking-wide uppercase;
}
.nav-mobile {
  @apply block md:hidden;
}
.nav-mobile ul {
  @apply flex flex-row justify-around items-center space-x-5 font-medium text-xs tracking-wide uppercase;
}
.nav-item {
  @apply pb-1 border-b border-transparent;
}
a.nuxt-link-active {
  @apply font-semibold text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  @apply font-semibold text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800;
}
.footer {
  @apply h-14 md:h-auto px-5 md:px-4 py-2 sticky bottom-0 bg-white dark:bg-black z-10;
}
</style>
