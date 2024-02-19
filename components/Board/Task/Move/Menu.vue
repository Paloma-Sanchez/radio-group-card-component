<script setup>
const boardStore = useBoardStore();
const route = useRoute();
const boards = computed(()=> boardStore.boards);
const currentBoardIndex = computed(()=>{
    return boards.value.findIndex(board => board.id === route.params.boardId);
});
const selectedBoardInfo = computed(() => boardStore.boardShell);

const props = defineProps({
    columnIndex:{
        type:Number
    },
    taskIndex:{
        type:Number
    }
})

//Array of board names for select menu
const boardArray = computed(()=>{
    const result = [];
    boards.value.forEach(board => {
        result.push(board.name);
    });
    return result;
});

//Array of column names for select menu depending on selected board
const columnArray = computed(()=>{
    if(!selectedBoardInfo.value){
        return [];
    }else{
        const result = [];
        selectedBoardInfo.value.forEach(column => {
            result.push(column.name);
        });
        if(result.length>0){
            return result;
        }else{
            return ['No lists'];
        }
    }
});

const boardTo = ref(boardArray.value[0]);
const columnTo = ref(columnArray.value[0]);

const boardToIndex = computed(() => {
    return boards.value.filter(board => board.name === boardTo.value)[0];
});

watch(boardToIndex, ()=> console.log('board to index',boardToIndex.value.id), {immediate:true});

const columnToIndex = computed(()=>{
    if(!selectedBoardInfo.value){
        return -1
    }else{
        return selectedBoardInfo.value.findIndex(column => column.name === columnTo.value);
    }
});

//Array of posilbe task positions for select menu depending on selected column
const taskPositionArray = computed(() => {
    if(columnToIndex.value === -1){
        return [0];
    }else{
        let length = selectedBoardInfo.value[columnToIndex.value].length;
        if(length === 0){
            length++;
        };
        return Array.from({length: length}, (_, i) => i + 1);
    };
});

const taskTo = ref(taskPositionArray.value[taskPositionArray.value.length-1]);

watch(boardTo, ()=>{
    const boardShell = boards.value.filter(board => board.name === boardTo.value);
    boardStore.loadBoardShell(boardShell[0].id);
}, {immediate:true});

watch(columnArray,()=>{
    columnTo.value = columnArray.value[0];
}, {immediate:true});

watch(columnTo,()=>{
    console.log('task to', taskPositionArray.value[taskPositionArray.value.length-1])
    taskTo.value = taskPositionArray.value[taskPositionArray.value.length-1];
}, {immediate:true});

const handleMoveTask = () => {
    //console.log('tasks indexs', props.taskIndex, taskTo.value-1);
    //console.log('column Index', props.columnIndex, columnToIndex.value);

    if(currentBoardIndex.value === boardToIndex.value){
        console.log('same board');
        if(props.taskIndex === taskTo.value-1){
            if(props.columnIndex === columnToIndex.value){
                return
            }else{
                boardStore.moveTask({
                fromTaskIndex: props.taskIndex,
                toTaskIndex: taskTo.value-1,
                fromColumnIndex:props.columnIndex,
                toColumnIndex:columnToIndex.value
                });
            }
        }else{
                boardStore.moveTask({
                fromTaskIndex: props.taskIndex,
                toTaskIndex: taskTo.value-1,
                fromColumnIndex:props.columnIndex,
                toColumnIndex:columnToIndex.value
                });
        }
    }else{
        console.log('moving to another board', boardToIndex.value.id);
        boardStore.moveTaskToNewBoard({
            fromTaskIndex: props.taskIndex,
            toTaskIndex: taskTo.value-1,
            fromColumnIndex:props.columnIndex,
            toColumnIndex:columnToIndex.value,
            boardId:boardToIndex.value.id
        });
    };

    boardStore.toggleMaskVisibility();
    /*
    */
}
</script>
<template>
    <div
        class="bg-slate-800 text-slate-50 p-4 rounded-lg"
    >
        <p>Move task</p>
        <p>Select destination</p>
        <USelect
            v-model="boardTo"
            class="mb-2"
            :options="boardArray"
        />
        <div 
            class="flex mb-3"
        >
            <USelect
                v-model="columnTo"
                class="mr-1 w-[72%]"
                :disabled="columnArray[0] === 'No lists'?true:false"
                :options="columnArray"
                
            />
            <USelect
                v-model="taskTo"
                :disabled="taskPositionArray[0] === 0?true:false"
                :options="taskPositionArray"
            />
        </div>
        <UButton
            color="black"
            @click="handleMoveTask"
        >
            Move
        </UButton>
    </div>
</template>