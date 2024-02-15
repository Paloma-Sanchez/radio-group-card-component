<script setup>
const boarStore = useBoardStore();
 const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    });

const onStarredClick = () => {
    boarStore.toggleBoardStarred();
};
</script>
<template>
    <section
        class=" c-board-top-bar flex items-center justify-between pl-6 pt-4 pb-4 text-xl bg-sky-700/50 rounded-t-lg text-sky-100 relative z-0 "
    >
        <div
            class="c-boar-top-bar-left flex"
        >
            <h3
                class="font-semibold pr-5"
            >
                {{ board.name }}
            </h3>
            <div
                class="pt-1 cursor-pointer"
                @click="onStarredClick"
            >
                <UIcon name="i-heroicons-star-solid" v-if="board.starred"/>
                <UIcon name="i-heroicons-star" v-else/>
            </div>
        </div>
        <div
            class="c-boar-top-bar-right pr-4"
        >
            <UButton
                size="2xs"
                color="sky"
            >
                Change background
            </UButton>
        </div>
    </section>
</template>