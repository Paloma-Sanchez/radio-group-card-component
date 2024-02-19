<script setup>
const hoveringOnBoard = ref(false);

const props = defineProps({
  board: {
    type: Object,
  },
});



</script>
<template>
  <div
    :class="[
        'c-preview',
        'flex',
        'items-center',
        'justify-between',
        'w-full',
        'p-3',
        'text-slate-50',
        {
            'bg-slate-300/50': hoveringOnBoard,
        },
    ]"
    @mouseenter="hoveringOnBoard = true"
    @mouseleave="hoveringOnBoard = false"
  >
    <NuxtLink 
        class="c-prev-left flex  items-center" 
        :to="`/${board.id}`"
    >
      <div
        class="c-click flex items-center" 
        @click.self="$emit('closeSidebar')"
      >
        <div
          class="c-img-prev w-8 h-5 bg-cover bg-center mr-3"
          :style="{ backgroundImage: `url('${board.url}')` }"
        ></div>
        <p>{{ board.name }}</p>
      </div>
    </NuxtLink>
    <div
      class="cursor-pointer hover:scale-125"
      @click="$emit('toggleStarred', board.id)"
    >
        <UIcon name="i-heroicons-star-solid" v-if="board.starred"/>
        <UIcon name="i-heroicons-star" v-else/>
    </div>
  </div>
</template>
