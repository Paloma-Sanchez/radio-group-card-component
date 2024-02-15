<script setup>
    const starredVisible = ref(false);

    const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    });

    //console.log('url', props.bgUrl);
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
            'overflow-hidden',
            'border-orange-400',
            {
                'bg-slate-400':!board.url
            }
            
        ]"
        :style="{backgroundImage: `url('${board.url}')`}"
        @mouseenter="starredVisible=true"
        @mouseleave="starredVisible=false"
    >
        <NuxtLink 
            :class="[
                'c-link-to-board-id',
                'w-full',
                'aspect-video',
                'inline-block',
                {
                    'bg-slate-500/50':starredVisible
                }
                ]"
            :to="board.url?`/${board.id}`:''"
        >
            <div 
                
            >
                <p class="text-slate-50 pt-4 pl-4 text-lg font-semibold w-full h-full">
                    {{ board.name }}
                </p>
            </div>     
        </NuxtLink>
        <div
                    
                    :class="[
                        'relative',
                        '-top-[20%]',
                        'left-[90%]',
                        'w-fit',
                        'text-slate-50',
                        'pr-3',
                        {
                            'invisible':!starredVisible || !board.url
                        }
                        ]"
                    @click="$emit('toggleStarred')"
                >
                    <UIcon name="i-heroicons-star-solid" v-if="board.starred"/>
                    <UIcon name="i-heroicons-star" v-else/>
                </div>
       
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