<script setup>
    const boardStore = useBoardStore();
    const modifyTaskField = ref(false);
    const showModifyTaskMenu = ref(false);
    const router = useRouter();

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
    });

    const newTaskName = ref(props.task.name);
    const newTaskDescription = ref(props.task.description);

    const modifyTask = (taskIndex, columnIndex) => {
        console.log('modifying');
        boardStore.modifyTask(taskIndex, columnIndex, newTaskName, newTaskDescription);
        modifyTaskField.value = false;
    };
    const deleteTask = (taskIndex, columnIndex) => {
        console.log('deleting');
        boardStore.deleteTask(taskIndex, columnIndex)
    };

    const goToTask = (taskId) => {
        router.push(`/e1fc641b-0e18-4256-bed7-d7cd91d4c1ac/${taskId}`);
    };

    const onOpenModifyTaskMenu = () => {
        boardStore.toggleMaskVisibility();
    };

    /*
     <UButton 
                    type="button"
                    icon="i-heroicons-x-mark"
                    color="gray"
                    class="ml-4"
                    @click="deleteTask(taskIndex, columnIndex)"
                />
    */
</script>

<template>
    
    <UCard 
        class="c-card mb-4 w-full hover:ring-sky-600 hover:ring " 
        :ui="{ body: {padding: 'py-1 sm:p-1' } }"
    >
        <div 
            class="flex justify-between cursor-pointer"
            @mouseenter="()=>modifyTaskField?'': showModifyTaskMenu = true"
            @mouseleave="()=>modifyTaskField?'': showModifyTaskMenu = false"
            @click="goToTask(task.id)"    
        >
            <div 
                class="c-task-content  "
            >
                <div v-if="!modifyTaskField" class="h-8">
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
            <div class="c-modify-task-menu flex" v-if="showModifyTaskMenu && !modifyTaskField">
                <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                    <UButton 
                        type="button"
                        icon="i-heroicons-pencil"
                        size="2xs"
                        color="gray"
                        class="ml-4"
                        variant="link"
                        @click="onOpenModifyTaskMenu"
                    />
                </UDropdown>
            </div>
            </div>  
    </UCard>
</template>

