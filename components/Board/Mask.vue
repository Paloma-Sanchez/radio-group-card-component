<script setup>
const index = ref(10)
</script>

<template>
    <div 
        :class="[
            'h-full', 
            'w-full', 
            'relative',
            {
                'z-10':index === 10
            }
            ]"
    >
    </div>
</template>