<script setup>
import { useBoardStore } from '~/stores/boardStore';
const boardStore = useBoardStore();
const boardPreviewList = ref(null)
const createNewBoardActive = ref(false);

const allBoards = computed(()=>boardStore.boards); 
const highlightedBoards = computed(()=>boardStore.getStarredBoards); 
const highlightActive = computed(()=>boardStore.highlightsActive);
const boards = ref({});

//load boards info
onMounted(async() => {
    await boardStore.loadBoards();
    boards.value = boardStore.boards;
});

definePageMeta({
    layout:"landing"
});

//display all bords or just hightlights
watch([highlightActive, allBoards],()=>{
    if(!highlightActive.value){
        boards.value=allBoards.value;
    }else{
        boards.value=highlightedBoards.value;
    };
});

//methods
const handleNewBoardCreation = (boardName, url) => {
    //console.log('creating board', boardName, url);
    boardStore.createNewBoard(boardName, url);
    createNewBoardActive.value=false;
};

</script>

<template>
    <div 
        class="c-preview-index pl-4 w-full mt-10"
        @click.self="createNewBoardActive=false"
    >
       
        <h1 class="text-2xl font-title font-medium text-gray-300/90 mb-6 pt-2">
            Your boards
        </h1>
        <BoardPreviewList
            :boards="boards"
            ref="boardPreviewList"
            @toggleNewBoardConfig="() => createNewBoardActive=!createNewBoardActive"
        />
        <NewBoardConfig
                :class="[
                    'relative',
                    '-top-[60%]',
                    'w-[304px]',
                    'h-min',
                    {
                        'invisible': !createNewBoardActive
                    }
                    ]"
                @createNewBoard="handleNewBoardCreation"
            />
    </div>
    
</template>