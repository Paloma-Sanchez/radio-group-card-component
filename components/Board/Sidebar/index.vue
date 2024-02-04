<script setup>
const sideBarShowing = ref(false);

const onShowMenuButtonClick = () => {
    sideBarShowing.value = ! sideBarShowing.value;
    console.log(sideBarShowing.value);
}
</script>
<template>
    <div 
        :class="[
            'pl-6', 
            'pr-6 w-[260px]', 
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
                class="text-xl text-slate-100 mt-8 mx-auto"
            >
                Your boards
            </p>
        </div>
        <div 
            :class="[
                'absolute',
                '-right-2',
                ]"
            @click="onShowMenuButtonClick"
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
</template>
