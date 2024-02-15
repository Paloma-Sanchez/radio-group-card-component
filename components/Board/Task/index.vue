<script setup>
    import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const router = useRouter();
    const toast = useToast();
    const cursorOverTask = ref(false);
    const modifyTaskMenuOpen = ref(false);
    const showModifyTaskButton = ref(false);
    const boardId = computed(() => boardStore.board.id);
    const maskIsVisible = computed(()=> boardStore.maskIsVisible);
    const selectedTaskId = computed(() => boardStore.selectedTaskId);
    const taskFieldActive = computed(() => boardStore.taskFieldActive);

    ///watcher to decide when to show the modifyTask Menu Button
    watch([modifyTaskMenuOpen, cursorOverTask, taskFieldActive, maskIsVisible], ()=>{
        
        if(!maskIsVisible.value){
            if(cursorOverTask.value){
                showModifyTaskButton.value = true;
            }else{
                showModifyTaskButton.value = false;
            }
        }else{
            if(taskFieldActive.value){
                showModifyTaskButton.value = false;
            }else{
                showModifyTaskButton.value = true;

            }
        }
    });

    watch(showModifyTaskButton,()=>{
        console.log('watcher', showModifyTaskButton.value)
    }, {immediate:true});

    const emit = defineEmits(['hideNewTaskField'])
    
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

    const state=reactive({
        newTaskName: props.task.name,
        newTaskDescription : props.task.description

    });
    
    const deleteTask = (taskIndex, columnIndex) => {
        boardStore.toggleMaskVisibility();
        boardStore.deleteTask(taskIndex, columnIndex);
        toast.add({
            title:'Task deleted',
            description:`${props.task.name} has been deleted`,
            icon: 'i-heroicons-trash',
            color:'red'
        });
    };

    const goToTask = (taskId) => {
        boardStore.toggleMaskVisibility();
        router.push(`/${boardId.value}/${taskId}`);
        if(maskIsVisible.value){
            boardStore.toggleMaskVisibility();
        }
        emit('hideNewTaskField');
    };

    const modifyTask = (taskIndex, columnIndex) => {
        console.log('modifying');
        boardStore.modifyTask(taskIndex, columnIndex, newTaskName, newTaskDescription);
        boardStore.toggleMaskVisibility();
        boardStore.toggleTaskFieldVisibility();
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

    ///Array for dropdown
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
        :class="[
            'c-card',
            'mb-4',
            'w-full',
            'hover:ring-sky-600',
            'hover:ring',
            {
                'bg-slate-800':taskFieldActive,
                'text-slate-50':taskFieldActive,
                'hover:ring-transparent':taskFieldActive
            } 
            ]" 
        :ui="{ body: {padding: 'py-1 sm:p-1' }}"
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
                <div 
                    v-else
                    class="c-nodify-task-field-group"    
                >
                    <UForm  
                        class="u-form"
                        :state="state"
                        @submit="modifyTask(taskIndex, columnIndex)"
                    >
                        <UFormGroup label="Task Name" required>
                            <UInput 
                                v-model="state.newTaskName"
                                variant="outline" 
                                placeholder="Task Name" 
                            />
                        </UFormGroup>
                        <UFormGroup 
                            label="Task Description"
                            class="mb-4"    
                        >
                            <UTextarea 
                                v-model="state.newTaskDescription"
                            />
                        </UFormGroup>
                        <UButton 
                            type="submit"
                            color="sky"
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

