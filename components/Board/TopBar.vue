<script setup>
 const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    });
</script>
<template>
   <h3
        class="pl-6 pt-4 pb-4 text-xl bg-sky-700/50 rounded-t-lg text-sky-100 font-semibold relative z-0 "
    >
        {{ board.name }}
    </h3>
</template>