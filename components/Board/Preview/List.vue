<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const createNewBoardActive = ref(false);
const boards = computed(() => boardStore.boards);

onMounted(() => {
    boardStore.loadBoards();
});

const boardForCreatingNewBoard = {
    name:'Create a new board',
    id:0,
    url:'',
    starred:false
}
</script>
<template>
    <div class="c-preview-list grid  gap-3 grid-cols-4 sm:grid-cols-2 w-11/12 border-solid border-slate-900">
        <BoardPreview v-for="board in boards" 
            :board="board"
            class="border-orange-500"
            />
        <div
        >
            <BoardPreview
                :board="boardForCreatingNewBoard"
                @click="() => createNewBoardActive=!createNewBoardActive"
            />
            <NewBoardConfig
                :class="[
                    'relative',
                    '-top-[50%]',
                    '-left-full',
                    {
                        'invisible': !createNewBoardActive
                    }
                    ]"
            />
        </div>
    </div>
</template>