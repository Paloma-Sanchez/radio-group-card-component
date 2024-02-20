<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const newColumnName = ref('');
    const maskIsVisible = computed(()=> boardStore.maskIsVisible);
    const boardColumn = ref(null);

    const props = defineProps({
        board:{
            type:Object,
            required:true
        }
    });

    const emit= defineEmits(['closeSideBar', 'deactivateTopBarFeatures']);

    const addColumn = () => {
        if(!newColumnName.value){
            return;
        };
        boardStore.addColumn(newColumnName.value);
        newColumnName.value = '';
    };

    const dropItem = (event, {toColumnIndex, toTaskIndex}) => {
        const type = event.dataTransfer.getData('type');
        if(type === 'task'){
            const fromColumnIndex = event.dataTransfer.getData('from-column-index');
            const fromTaskIndex = event.dataTransfer.getData('from-task-index');
            boardStore.moveTask({
                fromTaskIndex: fromTaskIndex,
                toTaskIndex: toTaskIndex,
                fromColumnIndex,
                toColumnIndex
            });
        } else if(type === 'column'){
            const initialColumnIndex = event.dataTransfer.getData('initial-column-index');
            boardStore.moveColumn(initialColumnIndex, toColumnIndex);
        };
    };

    const pickupColumn = (event, initialColumnIndex) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('type', 'column');
        event.dataTransfer.setData('initial-column-index', initialColumnIndex);
    };

    const deactivateChildNewTaskFiled = () => {
        boardColumn.value.forEach((column) => {
            column.deactivateAddNewTaskField();
        });
    };

    const deactivateChildEditColumnName = () => {
        boardColumn.value.forEach((column) => {
            column.deactivateEditColumnName();
        });
    };

    const deactivateChildShowEditColumnName = () => {
        boardColumn.value.forEach((column) => {
            column.deactivateShowEditColumn();
        });
    };

    const onClickOnMain = () => {
        deactivateChildEditColumnName();
        deactivateChildNewTaskFiled();
        deactivateChildShowEditColumnName();
        emit('closeSideBar');
        emit('deactivateTopBarFeatures');
    };

</script>
<template>
    <div 
        :class="[
            'c-mask',
            'board-wrapper',
            {
            'relative':maskIsVisible,
            '-top-[115%]': maskIsVisible
            }
        ]" 
    >
        <main 
            class="c-main-board board h-full"
            @click.self="onClickOnMain"
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
                @drop.stop="dropItem($event, {toColumnIndex: columnIndex})"
                @dropItem="dropItem"
                ref="boardColumn"
            />
            <UContainer class="column mx- min-w-[256px] max-w-[256px]" >
                    <UInput 
                        v-model="newColumnName"
                        color="sky"
                        placeholder=" Create new column" 
                        icon="i-heroicons-plus-circle-solid"
                        @keyup.enter="addColumn"
                        :ui="{variant:{outline:'bg-slate-50'}}"
                    />
            </UContainer>
        </main>
    </div>
   
</template>