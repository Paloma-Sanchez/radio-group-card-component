<script setup>
    import { useBoardStore } from '../stores/boardStore';
    import { v4 as uuidv4 } from 'uuid';
    const newTaskDescription = ref('');
    const newTaskName = ref('')
    const editColumnName = ref(false);
    const addNewTaskField = ref(false);
    const boardStore = useBoardStore();
    const showEditColumn = ref(false);
    const addNewTaskButtonLabel = ref('');
    
    defineProps({
        column:{
            type: Object,
            required:true
        },
        columnIndex:{
            type: Number,
            required:true
        }
    })

    const deleteColumn = (columnName) => {
            boardStore.deleteColumn(columnName);
        }

    const addTask = (columnIndex, name, description) => {
        const newId = uuidv4();
        const newTask = {
                            id: newId,
                            name: newTaskName.value,
                            description: newTaskDescription.value
                        };
        console.log(columnIndex);
        boardStore.addTask(columnIndex, newTask);
        newTaskName.value='';
        newTaskDescription.value='';
        addNewTaskField.value=false;
    }

    

</script>

<template>
    <UContainer 
        class="c-column column px-2 mx-"
        :ui="{base: 'mx-none'}"
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
                <div v-if="showEditColumn">
                    <UButton
                        icon="i-heroicons-pencil-square"
                        size="sm"
                        color="primary"
                        square
                        variant="solid"
                        class="mr-2"
                        @click="editColumnName = !editColumnName"
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
                    class="c-open-name-menu-button mr-2 transition-transform ease-in-out hover:scale-120 duration-300"
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
            <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
                <BoardTask 
                    :task="task"
                    :columnIndex="columnIndex"
                    :taskIndex="taskIndex"
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
        <UForm v-else @submit="addTask(columnIndex, newTaskName, newTaskDescription)">
            <UFormGroup label="Task Name" required>
                <UInput 
                v-model="newTaskName" 
                variant="outline" 
                placeholder="Task Name" />
            </UFormGroup>
            <UFormGroup label="Task Description">
                <UTextarea v-model="newTaskDescription"/>
            </UFormGroup>
            <div class="mt-4">
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