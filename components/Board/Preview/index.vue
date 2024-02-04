<script setup>
    const props = defineProps({
        bgUrl:{
            type: String,
            
        },
        boardName:{
            type:String,
            required: true
        },
        boardId:{
            type:String
        }
    });

    console.log('url', props.bgUrl);
</script>
<template>
    <div 
        :class="[
            'rounded',
            'c-board-prev',
            'w-full', 
            'aspect-video', 
            'bg-cover',
            'bg-center',
            'border-separate',
            'border-orange-500'
        ]"

        :style="{backgroundImage: `url('${bgUrl}')`}"
    >
        <NuxtLink :to="`./${boardId}`">
            <div 
                
            >
                <p class="text-slate-50 p-4 text-lg font-semibold">
                    {{ boardName }}
                </p>
            </div>
        </NuxtLink>
</div>
</template>

<style scoped>
.test{
    height: 400px;
    width: 500px;
    background-image:url("assets/images/background_photo_desktop.jpg");
}

.aspect-video{
    aspect-ratio: 16/9;
}
</style>