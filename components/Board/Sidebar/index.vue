<script setup>
const sideBarShowing = ref(false);

const onToggleSidebarVisibility = () => {
    sideBarShowing.value = ! sideBarShowing.value;
}
</script>
<template>
    <div 
        :class="[
            'w-[260px]', 
            'h-full', 
            'relative',
            'bg-slate-500/95',
            'z-10', 
            'rounded-r-lg',
            '-left-60',
            'transition ease-in-out',
            'duration-500',
            {
                'transform translate-x-60' : sideBarShowing
            }
        ]"
    >
        <div 
            class="flex "
        >
            <p 
                class="text-xl text-slate-100 mt-8 mb-6 mx-auto"
            >
                Your boards
            </p>
        </div>
        <div 
            :class="[
                'absolute',
                '-right-2',
                'top-8'
                ]"
            @click="onToggleSidebarVisibility"
        >
        <div
            
        >
            <UButton
                icon="i-heroicons-chevron-right-16-solid"
                size="sm"
                color="primary"
                square
                variant="solid"
                v-if="!sideBarShowing"
            />
            <UButton
                icon="i-heroicons-chevron-left-16-solid"
                size="sm"
                color="primary"
                square
                variant="solid"
                v-else
            />
        </div>
        </div>
        <BoardSidebarList
            @toggleSidebarVisibility="onToggleSidebarVisibility"
        />
    </div>
</template>
