<script setup>
definePageMeta({
    layout:"landing"
})

const {data} = await useFetch('/api/board');
</script>

<template>
    <div class="c-preview-index pl-4 w-full">
       
        <h1 class="text-2xl mb-6">Your boards</h1>
        <BoardPreviewList/>
    </div>
    
</template>