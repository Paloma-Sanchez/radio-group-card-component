<script setup>
    const isLoading = ref(false);
    const starredVisible = ref(false);

    const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    });

</script>
<template>
<div>
    <div 
        v-if="isLoading || board.id === 0"
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
                        'hover:scale-150',
                        'cursor-pointer',
                        {
                            'invisible':!starredVisible || !board.url
                        }
                        ]"
                    @click="$emit('toggleStarred', board.id)"
                >
                    <UIcon name="i-heroicons-star-solid" v-if="board.starred"/>
                    <UIcon name="i-heroicons-star" v-else/>
                </div>
       
    </div>
    <div
        v-else
        class="w-full aspect-video rounded bg-gray-100 pt-4 pl-4"
    >
        <USkeleton
            class="w-3/4 h-4 "
            :ui="{background:'bg-gray-200'}"
        />
    </div>
    <img class="w-8 h-4 hidden" :src="`${board.url}`"  @load="isLoading=true" />
   
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