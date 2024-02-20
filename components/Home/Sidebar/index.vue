<script setup>
const focus = ref('Boards');

const links = [{
  label: 'Boards',
  icon: 'i-heroicons-view-columns',
  to: '/'
  }, 
  {
    label: 'Highlights',
    icon: 'i-heroicons-heart',
    to: `/`
  }
];
</script>
<template>
    <div class="w-[288px] pb-6 h-fit mt-10 pl-3 pr-3 ">
       
        <HomeSidebarElement
          class=""
          v-for="link in links"
          :focus="focus"
          :key="link.icon"
          :link="link"
          @click="focus=link.label"
        />
    </div>
</template>