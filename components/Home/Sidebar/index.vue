<script setup>
const links = [{
  label: 'Boards',
  icon: 'i-heroicons-view-columns',
  to: '/'
}, {
  label: 'Highlights',
  icon: 'i-heroicons-heart',
  to: `/`
}]
</script>
<template>
    <div class="w-[288px]">
       
        <HomeSidebarElement
          v-for="link in links"
          :key="link.icon"
          :link="link"
        />
    </div>
</template>