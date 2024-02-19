<script setup>
    const boardStore = useBoardStore();
    const props=defineProps({
        link:{
            type:Object,
            required:true
        }
    });

    const handleClick = () => {
        if(props.link.label === 'Highlights'){
            boardStore.toggleHighlightsActive(true);
        }else{
            boardStore.toggleHighlightsActive(false);
        }
    };
</script>
<template>
    <div
        class="bg-slate-200 text-slate-950 h-16 flex p-4 text-lg items-center mb-[2px] rounded-r-lg hover:bg-slate-300 hover:text-sky-800 hover:font-medium"
        @click="handleClick"    
    >
        <UIcon
            class="mr-2"
            :name="link.icon"
        />
        <p>{{link.label}}</p>
    </div>
</template>