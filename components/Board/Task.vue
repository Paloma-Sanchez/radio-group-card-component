<script setup>
    const boardStore = useBoardStore();
    const modifyTaskField = ref(false);
    const showModifyTaskMenu = ref(false);

    const props = defineProps({
        task:{
            type:Object,
            required:true
        },
        columnIndex:{
            type:Number,
            required:true
        },
        taskIndex:{
            type:Number,
            required:true
        }
    })

    const newTaskName = ref(props.task.name);
    const newTaskDescription = ref(props.task.description);

    const modifyTask = (taskIndex, columnIndex) => {
        console.log('modifying');
        boardStore.modifyTask(taskIndex, columnIndex, newTaskName, newTaskDescription);
        modifyTaskField.value = false;
    }
    const deleteTask = (taskIndex, columnIndex) => {
        console.log('deleting');
        boardStore.deleteTask(taskIndex, columnIndex)
    }
</script>

<template>
    <UCard 
        class="c-card mb-4 w-full hover:ring-sky-600 hover:ring" 
        :ui="{ body: {padding: 'py-1 sm:py-1' } }"
    >
        <div 
            class="flex justify-between items-center h-8 "
            @mouseenter="()=>showModifyTaskMenu = true"
            @mouseleave="()=>showModifyTaskMenu = false"
        >
            <div class="c-task-content">
                <div v-if="!modifyTaskField">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </div>
                <div v-else>
                    <UForm  @submit="modifyTask(taskIndex, columnIndex)">
                        <UFormGroup label="Task Name" required>
                            <UInput 
                            v-model="newTaskName" 
                            variant="outline" 
                            placeholder="Task Name" />
                        </UFormGroup>
                        <UFormGroup label="Task Description">
                            <UTextarea v-model="newTaskDescription"/>
                        </UFormGroup>
                        <UButton 
                            type="submit"
                            color="gray"
                            >
                            Save
                        </UButton>
                    </UForm>
                </div>
            </div>
            <div class="c-modify-task flex" v-if="showModifyTaskMenu">
                <UButton 
                    type="button"
                    icon="i-heroicons-pencil"
                    color="gray"
                    class="ml-4"
                    @click="modifyTaskField = !modifyTaskField "
                />
                <UButton 
                    type="button"
                    icon="i-heroicons-x-mark"
                    color="gray"
                    class="ml-4"
                    @click="deleteTask(taskIndex, columnIndex)"
                />
            </div>
            </div>  
    </UCard>
</template>