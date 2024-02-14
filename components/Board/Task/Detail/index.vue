<script setup>
import { useBoardStore } from '~/stores/boardStore';
const route = useRoute();
const boardStore = useBoardStore();
const board = boardStore.board;
const nameFieldActive =ref(false);
const descriptionFieldActive = ref(false);

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



const state = reactive({
    newTaskName: props.task.name,
    newTaskDescription : props.task.description 
});

const onSubmit = () => {
    console.log('submitting',state.newTaskName);
    boardStore.modifyTask(props.taskIndex, props.columnIndex, state.newTaskName, state.newTaskDescription);
    console.log(props.task);
    boardStore.getSelectedTaskAndIndexes(route.params.taskId);
    nameFieldActive.value=false;
    descriptionFieldActive.value=false;
};

const propTask = computed(() => props.task);

watch(propTask, ()=>{
    console.log('task watcher',propTask.value);
    console.log(props.taskIndex);
    
}, {immediate:true})
</script>

<template>
    <div 
        class="h-full w-11/12 mx-auto bg-slate-800 rounded p-6 text-sky-100 "
        @click.self="nameFieldActive=false"
    >
        <h3 
            class="font-semibold "
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
</template>