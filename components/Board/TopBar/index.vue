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

const handleDeleteBoardConfirmed = async () => {
    console.log('deleting');
    await boardStore.deleteBoard(props.board.id);
    router.replace('/');
};

const onHandleClickOnTopBar = () => {
    backgroundMenuActive.value=false;
    modifyBoardNameActive.value=false;
};

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

const onStarredClick = async () => {
   await boardStore.toggleBoardStarred(props.board.id);
   await boardStore.loadSelectedBoard(props.board.id);
};
</script>
<template>
    <section
        class=" c-board-top-bar flex items-center justify-between pl-6 pt-4 pb-4 text-xl bg-sky-700/50 rounded-t-lg text-sky-100 relative z-0 "
        @click.self="onHandleClickOnTopBar"
    >
        <div
            class="c-board-top-bar-left flex"
        >
            <div>
                <h3
                    v-if="!modifyBoardNameActive"
                    class="font-semibold pr-5"
                    @click="modifyBoardNameActive=!modifyBoardNameActive"
                >
                    {{ board.name }}
                </h3>
                <UInput
                    v-else
                    v-model="newBoardName"
                    @keydown.enter.exact="onChangeBoardName"

                />
            </div>
            <div
                class="pt-1 cursor-pointer"
                @click="onStarredClick"
            >
                <UIcon name="i-heroicons-star-solid" v-if="board.starred"/>
                <UIcon name="i-heroicons-star" v-else/>
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