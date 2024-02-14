<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const cursorOverTask = ref(false);
    let modifyTaskMenuOpen = ref(false);
    const showModifyTaskButton = ref(false);
    const boardId = computed(() => boardStore.board.id);
    const maskIsVisible = computed(()=> boardStore.maskIsVisible);
    const selectedTaskId = computed(() => boardStore.selectedTaskId);
    const taskFieldActive = computed(() => boardStore.taskFieldActive);

    watch([modifyTaskMenuOpen, cursorOverTask, taskFieldActive, maskIsVisible, showModifyTaskButton], ()=>{
        if(modifyTaskMenuOpen.value){
            showModifyTaskButton.value = true;
        }else if(cursorOverTask.value ){
            if(taskFieldActive.value){
                showModifyTaskButton.value = false;
            } else {
                showModifyTaskButton.value = true;
            }
            
        }else if(!cursorOverTask.value && !maskIsVisible.value){
            showModifyTaskButton.value = false;
            
        }else{
            showModifyTaskButton.value = false;
        }

        console.log('update button show = ' + showModifyTaskButton.value);
    });

    const router = useRouter();
    
    const props = defineProps({
        task:{
            type:Object,
            required:true
        },
        columnIndex:{
            type:Number,
            
        },
        taskIndex:{
            type:Number,
            
        }
    });


    const newTaskName = ref(props.task.name);
    const newTaskDescription = ref(props.task.description);

    const modifyTask = (taskIndex, columnIndex) => {
        console.log('modifying');
        boardStore.modifyTask(taskIndex, columnIndex, newTaskName, newTaskDescription);
        boardStore.toggleTaskFieldVisibility();
    };

    const deleteTask = (taskIndex, columnIndex) => {
        console.log('deleting', taskIndex, columnIndex);
        boardStore.toggleMaskVisibility();
        boardStore.deleteTask(taskIndex, columnIndex);
        
    };

    const goToTask = (taskId) => {
        boardStore.toggleMaskVisibility();
        router.push(`/${boardId.value}/${taskId}`);
        if(maskIsVisible.value){
            boardStore.toggleMaskVisibility();
        }
    };

    const onOpenModifyTaskMenu = (event, taskId) => {
        boardStore.toggleMaskVisibility();
        boardStore.setSelectedTaskId(taskId);
        toggleTaskMenuOpenFromTask();
    };

    const toggleTaskMenuOpenFromTask = () => {
        console.log('received in task', modifyTaskMenuOpen.value);
        modifyTaskMenuOpen.value = ! modifyTaskMenuOpen.value;
        console.log('toggled', modifyTaskMenuOpen.value);
    };


    const items = [
        [{
            label: 'Open task',
            icon: 'i-heroicons-document-text-16-solid',
            click: () => {
                goToTask(props.task.id);
            }
        }], 
        [{
            label: 'Edit task',
            icon: 'i-heroicons-pencil-square-20-solid',
            shortcuts: ['E'],
            click: () => {
                boardStore.toggleTaskFieldVisibility();
            }
        }, 
        {
            label: 'Change cover',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['D'],
            disabled: true
        }], 
        [{
            label: 'Move',
            icon: 'i-heroicons-archive-box-20-solid'
        }, 
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => {
                deleteTask(props.taskIndex, props.columnIndex);
            }
        }], 
    ];

</script>

<template>
    
    <UCard 
        class="c-card mb-4 w-full hover:ring-sky-600 hover:ring " 
        :ui="{ body: {padding: 'py-1 sm:p-1' } }"
    >
        <div 
            class="flex justify-between cursor-pointer"
            @mouseenter="()=>taskFieldActive?'': cursorOverTask = true"
            @mouseleave="()=>taskFieldActive?'': cursorOverTask = false"
               
        >
            <div 
                class="c-task-content w-full"
                
            >
                <div 
                    v-if="!taskFieldActive || selectedTaskId !==task.id" 
                    class="h-auto"
                    @click="goToTask(task.id)"   
                >
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </div>
                <div v-else>
                    <UForm  @submit="modifyTask(taskIndex, columnIndex)">
                        <UFormGroup label="Task Name" required>
                            <UInput 
                                v-model="newTaskName" 
                                variant="outline" 
                                placeholder="Task Name" 
                            />
                        </UFormGroup>
                        <UFormGroup 
                            label="Task Description"
                            class="mb-4"    
                        >
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
            <div 
                class="c-modify-task-menu flex" 
                v-show="showModifyTaskButton"
                   
            >
                <UDropdown 
                    :items="items" 
                    :popper="{ placement: 'right-start' }"
                    
                >
                    <UButton 
                        type="button"
                        icon="i-heroicons-pencil"
                        size="2xs"
                        color="gray"
                        class="ml-4"
                        variant="link"
                        id="modify-task-button"
                        @click="onOpenModifyTaskMenu($event, task.id)" 
                    />
                </UDropdown>
            </div>
            </div>  
    </UCard>
</template>

