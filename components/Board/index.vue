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
        <main class="board">
            <BoardColumn v-for="(column, columnIndex) in board.columns" 
                :key="column.name"
                :column="column"
                :columnIndex="columnIndex"
                :maskIsVisible="maskIsVisible"  
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