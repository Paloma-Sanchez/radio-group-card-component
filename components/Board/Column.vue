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
        newColumnName:props.column.name,
        newTaskDescription :'',
        newTaskName :''
    })

    const addTask = async (columnIndex) => {
        if(!state.newTaskName){
            return;
        };
        const newId = uuidv4();
        const newTask = {
                            id: newId,
                            name: state.newTaskName,
                            description: state.newTaskDescription
                        };
        boardStore.addTask(columnIndex, newTask);
        state.newTaskName='';
        state.newTaskDescription='';
        addNewTaskField.value=false;
    };

    const deactivateAddNewTaskField = () => {
        addNewTaskField.value = false;
        addNewTaskButtonLabel.value = '';
    };

    const deactivateEditColumnName = () => {
        editColumnName.value = false;
    };

    const deactivateShowEditColumn = () => {
        showEditColumn.value =false;
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

    const onChangedColumnName = () => {
        if(!state.newColumnName){
            return;
        }else if(props.column.name !== state.newColumnName){
            boardStore.modifyColumn(props.columnIndex, state.newColumnName);
        };
        editColumnName.value = false;
    };
   
    const pickupTask = (event, {fromColumnIndex, fromTaskIndex}) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('type', 'task');
        event.dataTransfer.setData('from-column-index', fromColumnIndex);
        event.dataTransfer.setData('from-task-index', fromTaskIndex);
    };

    //Exposing functions so that they are accessible by parent component Board
    defineExpose({
        deactivateAddNewTaskField,
        deactivateEditColumnName,
        deactivateShowEditColumn
    });

</script>

<template>
    <UContainer 
        class="c-column column px-2 mx- min-w-[256px] max-w-[256px]"
        :ui="{base: 'mx-none'}"
        @dragenter.prevent
        @dragover.prevent
    >
        <div class="column-header mb-4">
            <div class="c-column-name ml-2 ">
                <h2 
                    v-if="!editColumnName"
                    class="text-gray-300 font-title text-lg"
                    @click="()=>{editColumnName=true
                                showEditColumn=false}"
                >
                    {{ column.name }}
                </h2>   
                <UForm
                    v-else 
                    :state="state"
                    @keydown.enter.exact="onChangedColumnName"
                >
                    <UInput 
                        v-model="state.newColumnName" 
                        class="w-11/12"
                        color="sky"
                        :ui="{variant:{outline:'bg-slate-700 text-slate-200 ring-0 font-title'}}"
                    />
                </UForm>
            </div>
            <div class="c-column-menu flex items-center">
                <div v-if="showEditColumn && !editColumnName">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="xs"
                        color="white"
                        square
                        variant="solid"
                        class="mr-2"
                        @click="() => {editColumnName = !editColumnName  
                                        showEditColumn= !showEditColumn} "
                    />
                    <UButton
                        icon="i-heroicons-trash"
                        size="xs"
                        color="red"
                        square
                        variant="solid"
                        @click="deleteColumn(column.name)"
                    />
                </div>
                <UButton
                    class="c-open-name-menu-button mr-2 transition-transform ease-in-out hover:scale-150 duration-100 text-slate-100 p-0 pl-2"
                    icon="i-heroicons-ellipsis-vertical"
                    size="md"
                    color="white"
                    square
                    variant="link"
                    @click="()=> {showEditColumn = !showEditColumn;
                                   editColumnName=false }"
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
            :block="addNewTaskButtonLabel?true:false"
            color="white"
            icon="i-heroicons-plus-circle-16-solid"
            size="sm"
            variant="ghost"
            :label="addNewTaskButtonLabel"
            :ui="{color:{white:{ghost:addNewTaskButtonLabel?'text-gray-900':'text-slate-50'}}}"
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
                :error="!state.newTaskName && 'Task requires a name'"
                required
                :ui="{label:{base:'text-sky-100'}}"
            >
                <UInput 
                    v-model="state.newTaskName" 
                    color="sky"
                    variant="outline" 
                    placeholder="Task Name" 
                    :trailing-icon="!state.newTaskName ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
                    :ui="{variant:{outline:'bg-slate-700 text-slate-200 ring-0'}}"
                />
            </UFormGroup>
            <UFormGroup 
                label="Task Description"
                :ui="{label:{base:'text-sky-100'}}"
            >
                <UTextarea 
                    v-model="state.newTaskDescription"
                    color="sky"
                    :ui="{variant:{outline:'bg-slate-700 text-slate-200 ring-0'}}"
                />
            </UFormGroup>
            <div class="flex items-center mt-4 w-full">
                <UButton 
                    class="w-[83.5%] text-center"
                    type="submit"
                    color="white"
                    :disabled="!state.newTaskName?true:false"
                    :ui="{
                        inline:'justify-center',
                        color:{white:{solid:'hover:bg-sky-700 hover:text-sky-200 hover:ring-0'}}
                    }"    
                >
                Add
                </UButton>
                <UButton 
                    type="button"
                    icon="i-heroicons-x-circle-16-solid"
                    size="sm"
                    color="black"
                    square
                    variant="solid"
                    class="ml-2"
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