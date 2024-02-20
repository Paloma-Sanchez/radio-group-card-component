<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const route = useRoute();
    const boards = computed(()=> boardStore.boards);

    if(boards.value === null){
        boardStore.loadBoards();
    }

    const emit = defineEmits(['toggleSidebarVisibility'])

    const onToggleStarred = async (boardId) => {
        await boardStore.toggleBoardStarred(boardId);
        await boardStore.loadSelectedBoard(route.params.boardId);
        emit('toggleSidebarVisibility');
    }
</script>
<template>
    <ul
    >
        <li 
            v-for="boardPreview in boards"
        >
            <BoardSidebarPreview
                :board="boardPreview"
                @toggleStarred="onToggleStarred"
                @closeSidebar="$emit('toggleSidebarVisibility')"
            />
        </li>
    </ul>
</template>