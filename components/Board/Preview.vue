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
    <NuxtLink :to="`./${boardId}`">
        <div 
            :class="[
                    'c-board-prev',
                    'w-full', 
                    'h-16', 
                    `bg-[url('${bgUrl}')]`,
                    'bg-cover',
                    'bg-center',
                    'border-orange-500'
                    ]"
        >
            <p>{{ boardName }}</p>
        </div>
    </NuxtLink>
</template>

<style scoped>
.test{
    height: 400px;
    width: 500px;
    background-image:url("assets/images/background_photo_desktop.jpg");
}
</style>