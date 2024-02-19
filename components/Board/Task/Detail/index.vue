<script setup>
import { useBoardStore } from '~/stores/boardStore';
const route = useRoute();
const boardStore = useBoardStore();
const board = boardStore.board;
const nameFieldActive =ref(false);
const newCoverColor = ref('');
const descriptionFieldActive = ref(false);
const coverMenuActive=ref(false);

const props = defineProps({
    task:{
        type:Object,
    },
    taskIndex:{
        type:Number
    },
    columnIndex:{
        type:Number
    }
});

//State for changing existing task form
const state = reactive({
    newTaskName: props.task.name,
    newTaskDescription : props.task.description 
});

const propTask = computed(() => props.task);

watch(propTask, ()=>{
    console.log('task watcher',propTask.value);
    console.log(props.taskIndex);
    
}, {immediate:true});

const handleCoverColorChange = async (newColor) => {
        await boardStore.changeCoverColor(props.columnIndex, props.taskIndex, newColor);
        boardStore.getSelectedTaskAndIndexes(route.params.taskId);
        if(!newColor){
            newCoverColor.value="";
        };
        coverMenuActive.value=false;
    };

const handleTryingNewColor = (newColor) =>{
        newCoverColor.value = newColor;
    };

const onSubmit = () => {
    //console.log('submitting',state.newTaskName);
    boardStore.modifyTask(props.taskIndex, props.columnIndex, state.newTaskName, state.newTaskDescription);
    //console.log(props.task);
    boardStore.getSelectedTaskAndIndexes(route.params.taskId);
    nameFieldActive.value=false;
    descriptionFieldActive.value=false;
};

</script>

<template>
    <div 
        class="h-full w-11/12 mx-auto bg-slate-800 rounded-xl  text-sky-100 "
        @click.self="nameFieldActive=false"
    >
        <div 
            v-if="task.cover || newCoverColor"
                :class="[
                    'c-cover',
                    'h-28',
                    'w-full',
                    'px-0',
                    'py-0',
                    'rounded-t-lg',
                    ]"
            :style="{backgroundColor: `${!newCoverColor? task.cover:newCoverColor}`}"
        >
        </div>
        <UButton
            :class="[
                'relative', 
                'left-[92%]',
                {
                    '-top-10':task.cover,
                    'top-4':!task.cover
                }
                ]"
            icon="i-heroicons-swatch-20-solid"
            size="sm"
            :color="task.cover?'black':'white'"
            square
            variant="link"
            @click="coverMenuActive=!coverMenuActive"
        />
        <BoardTaskCoverMenu
            v-if="coverMenuActive"
            class="left-[50%]"
            :taskCover="task.cover"
            @changeCoverColor="handleCoverColorChange"
            @closeCoverMenu="coverMenuActive=false"
            @tryNewColor="handleTryingNewColor"
        />
        <div
            class="p-6 pt-4"
        >
        <h3 
            class="font-semibold mb-2"
            v-if="!nameFieldActive"
            @click="()=> nameFieldActive=true"
        >
            {{props.task.name}}
        </h3>
        <UForm :state="state" v-else @submit="onSubmit">
            <UFormGroup>
                <UInput 
                    v-model="state.newTaskName"
                    variant="outline" 
                    placeholder="Task Name"
                    class="w-fit"
                />
            </UFormGroup>
        </UForm>
        <p class="text-sm font-light mb-6">in list {{ board.name }} </p>
        <div class="mb-2 flex justify-between">
            <h4 class="font-semibold ">
                Description
            </h4>
            <UButton
                v-if="task.description && !descriptionFieldActive"
                @click="descriptionFieldActive=true"
                color="sky"
                size="xs"
            >
                Edit
            </UButton>
        </div>
        <p v-if="task.description && !descriptionFieldActive">
            {{ props.task.description }}
        </p>
        <UForm :state="state" v-else @submit="onSubmit">
            <UFormGroup>
                <UTextarea 
                    v-model="state.newTaskDescription"
                    variant="none" 
                    color="sky"
                    autoresize
                    :rows="2"
                    placeholder="Task Name"
                    class="mb-4"
                    :ui="{variant:{none:'bg-slate-500/60'}}"
                />
            </UFormGroup>
            <UButton
                size="sm"
                color="sky"
                @click="onSubmit"
            >
                Save
            </UButton>
        </UForm>
    </div>
    </div>
</template>