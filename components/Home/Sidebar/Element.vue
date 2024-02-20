<script setup>
    const boardStore = useBoardStore();

    const props=defineProps({
        focus:{
            type:String
        },
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
        :class="[
            
            'cursor-pointer',
            'h-8', 
            'pb-1', 'pt-1', 'pl-4', 'pr-2',
            'mb-1',
            'flex', 
            'text-lg', 
            'items-center', 
            'rounded-lg', 
            'hover:font-medium',
            {
                'bg-transparent':focus!==link.label,
                'text-gray-300/90':focus!==link.label,
                'bg-blue-900/50':focus===link.label, 
                'text-sky-400':focus===link.label,
                'hover:bg-gray-400/50':focus!==link.label
            }
        ]"
        @click="handleClick"    
    >
        <UIcon
            class="mr-2 "
            :name="link.icon"
        />
        <p
            class="font-title"
        >
            {{link.label}}
        </p>
    </div>
</template>