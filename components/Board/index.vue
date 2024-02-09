<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const newColumnName = ref('');
    const maskIsVisible = computed(()=> boardStore.maskIsVisible);
   
    const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    })

    const addColumn = () => {
        boardStore.addColumn(newColumnName.value);
        newColumnName.value = '';
    };

    const pickupColumn = (event, initialColumnIndex) => {
        console.log('dragging column');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('initial-column-index', initialColumnIndex);
    };

    const dropItem = (event, toColumnIndex) => {
        const type = event.dataTransfer.getData('type');
        if(type === 'task'){
            console.log('dragging task');
            const fromColumnIndex = event.dataTransfer.getData('from-column-index');
            const fromTaskIndex = event.dataTransfer.getData('from-task-index');
            boardStore.moveTask({
                taskIndex: fromTaskIndex,
                fromColumnIndex,
                toColumnIndex
            });
        } else{
            const initialColumnIndex = event.dataTransfer.getData('initial-column-index');
            console.log('dragging column', initialColumnIndex, toColumnIndex);
            boardStore.moveColumn(initialColumnIndex, toColumnIndex);
        }
    };
</script>
<template>
    <div 
        :class="[
            'board-wrapper',
            {
            'relative':maskIsVisible,
            '-top-full': maskIsVisible
            }
        ]" 
    >
        <main 
            class="board"
        >
            <BoardColumn 
                v-for="(column, columnIndex) in board.columns" 
                :key="column.name"
                :column="column"
                :columnIndex="columnIndex"
                :maskIsVisible="maskIsVisible" 
                draggable="true"
                @dragstart.self="pickupColumn($event, columnIndex)" 
                @dragenter.prevent
                @dragover.prevent
                @drop.stop="dropItem($event, columnIndex)"
            />
            <UContainer class="column mx-" >
                    <UInput 
                        type="text"
                        placeholder=" Create new column" 
                        icon="i-heroicons-plus-circle-solid"
                        v-model="newColumnName"
                        @keyup.enter="addColumn"/>
            </UContainer>
        </main>
    </div>
   
</template>