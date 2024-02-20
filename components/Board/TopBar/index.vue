<script setup>
const boardStore = useBoardStore();
const router = useRouter();
const toast = useToast();
const backgroundMenuActive=ref(false);
const modifyBoardNameActive = ref(false);

//actions for toast buttons
const actions = ref([
    {
        variant: 'solid', 
        color: 'black',
        label: 'Delete',
        click: () => handleDeleteBoardConfirmed()
    }, 
    {
        variant: 'solid', 
        color: 'gray',
        label: 'Go back',
        click: () =>  {return}
    }
]);

const props = defineProps({
        board:{
            type:Object,
            required:true
        }
});

const newBoardName = ref(props.board.name);

const onChangeBoardName = async() => {
    await boardStore.modifyBoardName(newBoardName.value);
    await boardStore.loadSelectedBoard(props.board.id);
    modifyBoardNameActive.value=false;
};

const onDeleteBoardClick = () => {
    toast.add({
        title:'Are you sure to delete this board?', 
        description:'All data will be lost', 
        icon: 'i-heroicons-x-circle',
        color:'red',
        actions
    })
};

const handleDeleteBoardConfirmed = async () => {
    console.log('deleting');
    await boardStore.deleteBoard(props.board.id);
    router.replace('/');
};

const onHandleClickOutsideFields = () => {
    if(props.board.name === newBoardName.value){
        backgroundMenuActive.value=false;
    }else{
        onChangeBoardName();
    }
    modifyBoardNameActive.value=false;
};

const onStarredClick = async () => {
   await boardStore.toggleBoardStarred(props.board.id);
   await boardStore.loadSelectedBoard(props.board.id);
   await boardStore.loadBoards();
};

//Exposing fontions to Page boardId
defineExpose({
    onHandleClickOutsideFields
})


</script>
<template>
    <section
        class=" c-board-top-bar flex items-center justify-between pl-6 pt-4 pb-4 text-xl bg-sky-700/70 backdrop-blur-sm rounded-t-lg text-sky-100 relative z-0"
        @click.self="onHandleClickOutsideFields"
    >
        <div
            class="c-board-top-bar-left flex items-center"
        >
            <div>
                <h3
                    v-if="!modifyBoardNameActive"
                    class="font-semibold pr-5 font-title"
                    @click="modifyBoardNameActive=!modifyBoardNameActive"
                >
                    {{ board.name }}
                </h3>
                <UInput
                    v-else
                    v-model="newBoardName"
                    color="sky"
                    @keydown.enter.exact="onChangeBoardName"
                    :ui="{
                        variant:{outline:'bg-sky-600/80 text-slate-200 ring-0 font-title text-lg'},
                        base:'w-3/4'
                    }"
                />
            </div>
            <div
                class=" cursor-pointer"
                @click="onStarredClick"
            >
                <UButton  
                    v-if="board.starred"
                    color="white"
                    icon="i-heroicons-star-solid"
                    size="xs"
                    variant="link"
                />
                <UButton 
                    v-else
                    color="white"
                    icon="i-heroicons-star"
                    size="xs" 
                    variant="link"
                />
            </div>
        </div>
        <div
            class="c-boar-top-bar-right flex pr-4"
        >
            <UButton
                class="mr-2"
                color="sky"
                size="2xs"
                @click="backgroundMenuActive=!backgroundMenuActive"
            >
                Change background
            </UButton>
            <UButton
                color="sky"
                size="2xs"
                icon="i-heroicons-trash"
                @click="onDeleteBoardClick"
            />
        </div>
        <BoardTopBarChangeBgMenu
            v-if="backgroundMenuActive"
            @reload-board="boardStore.loadSelectedBoard(board.id)"
        />
    </section>
</template>