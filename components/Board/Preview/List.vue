<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const createNewBoardActive = ref(false);
const boardForCreatingNewBoard = {
    name:'Create a new board',
    id:0,
    url:'',
    starred:false
};

const props = defineProps({
    boards:{
        type:[Object, null],
        required:true
    }
});

const deactivateCreateNewBoard = () => {
    createNewBoardActive.value=false;
};



defineExpose({
    deactivateCreateNewBoard
})
</script>
<template>
    <div class="c-preview-list grid  gap-3 grid-cols-4 sm:grid-cols-2 w-11/12 h-fit border-solid border-slate-900">
        <BoardPreview v-for="board in boards" 
            :board="board"
            class="border-orange-500"
            @toggleStarred="boardStore.toggleBoardStarred"
        />
        <div
        >
            <BoardPreview
                :board="boardForCreatingNewBoard"
                @click="$emit('toggleNewBoardConfig')"
            />
            
        </div>
    </div>
</template>