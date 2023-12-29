<script setup>
    import { useBoardStore } from '../stores/boardStore';

    const boardStore = useBoardStore();
    const newColumnName = ref('')
   

    const addColumn = () => {
        boardStore.addColumn(newColumnName.value);
        newColumnName.value = '';
    }
</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <BoardColumn v-for="(column, columnIndex) in boardStore.board.columns" 
                :key="column.name"
                :column="column"
                :columnIndex="columnIndex"   
            />
               
                <UContainer class="column" >
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