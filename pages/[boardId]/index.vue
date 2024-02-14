<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const route = useRoute();
const router = useRouter();
const modifyTaskMenuOpen = ref(false);
const board = computed(() => boardStore.board);
const boardLoading = computed(() => boardStore.boardLoading);
const maskIsVisible = computed(() => boardStore.maskIsVisible);
const taskFieldActive = computed(() => boardStore.taskFieldActive);


const isModalOpen =computed(() =>{
    return maskIsVisible.value?'':route.name === 'boardId-index-taskId';
});

const closeModal = () => {
    router.push(`/${board.value.id}`);
    //boardStore.toggleTaskFieldVisibility();
};

onBeforeMount(
    async() => await boardStore.loadSelectedBoard(route.params.boardId)
);

const onMaskClick = () => {
    boardStore.toggleMaskVisibility();
    modifyTaskMenuOpen.value = !modifyTaskMenuOpen.value;
    if(taskFieldActive.value){
        boardStore.toggleTaskFieldVisibility();
    }
}
</script>
<template>
    <main 
        v-if="!boardLoading && board !== null"  
        :style="{backgroundImage: `url('${board.url}')`}"
        class="c-board-id absolute h-full top-0 left-8 rounded bg-cover bg-center w-full"    
    >
       
        <div 
            v-if="maskIsVisible"
            class="c-mask w-full h-[115%] -top-28 relative bg-slate-600/70 backdrop-blur-sm z-10"
            @click="onMaskClick"
        >
        </div>
        <BoardTopBar 
            :board="board"
            :class="[
                {
                '-top-[115%]': maskIsVisible
                }
            ]"
        />
        <Board 
            :board="board"
            :modifyTaskMenuOpen="modifyTaskMenuOpen"
        />
    </main>
    <div 
        v-show="isModalOpen"
        class="task-bg flex justify-center"
        @click.self="closeModal"
    >
        <NuxtPage :key="route.fullPath"/>
    </div>
</template>