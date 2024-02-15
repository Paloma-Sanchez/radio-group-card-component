<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    import { v4 as uuidv4 } from 'uuid';
    const boardStore = useBoardStore();
    const toast = useToast();
    const addNewTaskButtonLabel = ref('');
    const addNewTaskField = ref(false);
    const editColumnName = ref(false);
   
    const showEditColumn = ref(false);
    const selectedTaskId = computed(() => boardStore.selectedTaskId);

    const props = defineProps({
        column:{
            type: Object,
            required:true
        },
        columnIndex:{
            type: Number,
            required:true
        },
        maskIsVisible:{
            type:Boolean,
            default:false
        }
    });

    //State for new task form
    const state = reactive({
        newTaskDescription :'',
        newTaskName :''
    })

    const addTask = (columnIndex, name, description) => {
        const newId = uuidv4();
        const newTask = {
                            id: newId,
                            name: newTaskName.value,
                            description: newTaskDescription.value
                        };
        //console.log(columnIndex);
        boardStore.addTask(columnIndex, newTask);
        newTaskName.value='';
        newTaskDescription.value='';
        addNewTaskField.value=false;
    };

    const deleteColumn = (columnName) => {
            boardStore.deleteColumn(columnName);
            toast.add({
                title:'Column deleted',
                description:`${props.column.name} has been deleted`,
                icon: 'i-heroicons-trash',
                color:'red'
            });
    };
   
    const pickupTask = (event, {fromColumnIndex, fromTaskIndex}) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('type', 'task');
        event.dataTransfer.setData('from-column-index', fromColumnIndex);
        event.dataTransfer.setData('from-task-index', fromTaskIndex);
    };

    const deactivateAddNewTaskField = () => {
        addNewTaskField.value = false;
        addNewTaskButtonLabel.value = '';
    };

    const deactivateEditColumnName = () => {
        editColumnName.value = false;
    };

    defineExpose({
        deactivateAddNewTaskField,
        deactivateEditColumnName
    })


</script>

<template>
    <UContainer 
        class="c-column column px-2 mx-"
        :ui="{base: 'mx-none'}"
        @dragenter.prevent
        @dragover.prevent
    >
        <div class="column-header mb-4">
            <div class="c-column-name">
                <h2 
                    v-if="!editColumnName"
                    class="text-white"
                >
                    {{ column.name }}
                </h2>   
                <UInput 
                    v-else 
                    type="text" 
                    v-model="column.name" 
                    @keyup.enter="editColumnName= !editColumnName"
                />
            </div>
            <div class="c-column-menu flex">
                <div v-if="showEditColumn && !editColumnName">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="sky"
                        square
                        variant="solid"
                        class="mr-2"
                        @click="() => {editColumnName = !editColumnName  
                                        showEditColumn= !showEditColumn} "
                    />
                    <UButton
                        icon="i-heroicons-trash"
                        size="sm"
                        color="red"
                        square
                        variant="solid"
                        @click="deleteColumn(column.name)"
                    />
                </div>
                <UButton
                    class="c-open-name-menu-button mr-2 transition-transform ease-in-out hover:scale-150 duration-100"
                    icon="i-heroicons-ellipsis-vertical"
                    size="sm"
                    color="white"
                    square
                    variant="link"
                    @click="()=> showEditColumn = !showEditColumn"
                />
            </div>
        </div>
        <ul>
            <li 
                v-for="(task, taskIndex) in column.tasks" 
                :key="task.id"
                :class="[
                    {
                        'relative':(maskIsVisible && task.id === selectedTaskId),
                        'z-20':(maskIsVisible && task.id === selectedTaskId)
                    }
                ]"
            >
                <BoardTask 
                    :task="task"
                    :columnIndex="columnIndex"
                    :taskIndex="taskIndex"
                    draggable="true"
                    @dragstart="
                        pickupTask($event, {
                            fromColumnIndex: columnIndex,
                            fromTaskIndex:taskIndex
                    })"
                    @drop.stop=" $emit(
                        'dropItem', $event, {
                            toColumnIndex: columnIndex,
                            toTaskIndex: taskIndex
                        })
                    "
                    @hideNewTaskField="deactivateAddNewTaskField"
                />
            </li>
        </ul>
        <UButton v-if="!addNewTaskField"
            class="c-add-new-task-button mr-2 "
            icon="i-heroicons-plus-circle-16-solid"
            size="sm"
            color="blue"
            square
            variant="solid"
            :label="addNewTaskButtonLabel"
            @mouseenter="()=>addNewTaskButtonLabel= 'Add a task'"
            @mouseleave="()=>addNewTaskButtonLabel= ''"
            @click="addNewTaskField = !addNewTaskField"
        />
        <UForm 
            v-else 
            :state="state"
            @submit="addTask(columnIndex, newTaskName, newTaskDescription)"
        >
            <UFormGroup 
                class="mb-2"
                label="Task Name" 
                required
                :ui="{label:{base:'text-sky-100'}}"
            >
                <UInput 
                    v-model="state.newTaskName" 
                    color="sky"
                    variant="outline" 
                    placeholder="Task Name" 
                />
            </UFormGroup>
            <UFormGroup 
                label="Task Description"
                :ui="{label:{base:'text-sky-100'}}"
            >
                <UTextarea 
                    v-model="state.newTaskDescription"
                    color="sky"
                />
            </UFormGroup>
            <div class="flex items-center mt-4">
                <UButton 
                type="submit"
                color="blue"
                >
                Add
                </UButton>
                <UButton 
                    type="button"
                    icon="i-heroicons-x-circle-16-solid"
                    size="sm"
                    color="blue"
                    square
                    variant="solid"
                    class="ml-4"
                    @click="addNewTaskField = !addNewTaskField"
                />
            </div>
        </UForm>
    </UContainer>
</template>

<style>
.c-column{
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

@media (min-width: 640px) {
    .c-column{
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
}
</style>