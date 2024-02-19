<script setup>
    const newColor = ref('');
    const colors = {
        zinc: "#a1a1aa",
        red:"#f87171",
        orange:"#fb923c",
        yellow:"#facc15",
        green:"#4ade80",
        teal:"#2dd4bf",
        blue:"#60a5fa",
        violet:"#a78bfa",
        fuchsia:"#e879f9",
        rose:"#fb7185",

    };

    const emit = defineEmits(['tryNewColor', 'changeCoverColor'])

    const props=defineProps({
        taskCover:{
            type:String
        }
    });

    const handleNewColorClick = (color) => {
        newColor.value = color;
        emit('tryNewColor', color);
    };

    const handleColorChangeRequest = (color) => {
        emit('changeCoverColor', color);
    };
</script>
<template>
    <div 
        class="c-cover-menu absolute w-72 bg-slate-950 rounded-xl p-3 z-10"
    >
        <div 
            class="flex text-slate-50 mb-5 justify-center items-center"
        >
            <p>
                Cover
            </p>
            <UButton
                class="absolute right-4"
                icon="i-heroicons-x-mark"
                size="xs"
                color="white"
                square
                variant="link"
                @click="$emit('closeCoverMenu')"
            />
        </div>
        <UButton
            class="mb-4"
            color="black"
            block
            :disabled="!taskCover?true:false"
            @click="handleColorChangeRequest('')"
        >
            Remove cover
        </UButton>
        <div
            class="c-cover-grid-wrapper flex justify-center mb-3"
        >
            <div 
                class="c-cover-grid grid grid-cols-5 gap-2 "
            >
                <div 
                    v-for="color in colors"
                    class="c-cover-color h-8 w-12 rounded-sm cursor-pointer"
                    :style="{backgroundColor: `${color}`}"
                    @click="handleNewColorClick(color)"    
                >
                </div>
            </div>
        </div>
        <UButton
            class="mb-4"
            color="gray"
            block
            :disabled="newColor?false:true"
            @click="handleColorChangeRequest(newColor)"
        >
            Save
        </UButton>
    </div>
</template>