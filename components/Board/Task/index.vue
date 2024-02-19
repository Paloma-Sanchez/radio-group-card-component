<script setup>
import { useBoardStore } from '~/stores/boardStore';
    const boardStore = useBoardStore();
    const router = useRouter();
    const toast = useToast();
    const coverMenuActive=ref(false);
    const cursorOverTask = ref(false);
    const modifyTaskMenuOpen = ref(false);
    const newCoverColor = ref('');
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
            coverMenuActive.value=false;
        }else{
            if(taskFieldActive.value){
                showModifyTaskButton.value = false;
            }else{
                showModifyTaskButton.value = true;

            }
        }
    });

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

    const handleCloseCoverMenu = () => {
        coverMenuActive.value=false;
        boardStore.toggleMaskVisibility();
    };

    const handleCoverColorChange = async (newColor) => {
        await boardStore.changeCoverColor(props.columnIndex, props.taskIndex, newColor);
        boardStore.toggleMaskVisibility();
    };

    const handleTryingNewColor = (newColor) =>{
        newCoverColor.value = newColor;
    };

    const modifyTask = (taskIndex, columnIndex) => {
        if(!state.newTaskName){
            return;
        }
        boardStore.modifyTask(taskIndex, columnIndex, state.newTaskName, state.newTaskDescription);
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
            icon: 'i-heroicons-swatch-20-solid',
            shortcuts: ['D'],
            click: () => {
                coverMenuActive.value = !coverMenuActive.value;
            }
        }], 
        [{
            label: 'Move',
            icon: 'i-heroicons-arrow-right-20-solid'

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
<div>
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
        :ui="{ body: {padding: 'py-0 px=0 sm:p-0' }}"
    >
        <div 
        v-if="task.cover || newCoverColor"
            :class="[
                'c-cover',
                'h-9',
                'w-full',
                'px-0',
                'py-0'
                ]"
        :style="{backgroundColor: `${!newCoverColor? task.cover:newCoverColor}`}"
    >
    </div>
        <div 
            class="flex justify-between p-3 cursor-pointer"
            @mouseenter="()=>taskFieldActive?'': cursorOverTask = true"
            @mouseleave="()=>taskFieldActive?'': cursorOverTask = false"
               
        >
           
            <div 
                class="c-task-content w-full"
                
            >
                <div 
                    v-if="!taskFieldActive || selectedTaskId !==task.id" 
                    class="h-auto min-h-9"
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
                        @submit.prevent="modifyTask(taskIndex, columnIndex)"
                    >
                        <UFormGroup 
                            class="mb-3"
                            label="Task Name" 
                            :error="!state.newTaskName && 'Task requires a name'"
                            required
                            :ui="{label:{base:'text-slate-200'}}"  
                        >
                            <UInput 
                                v-model="state.newTaskName"
                                variant="outline" 
                                placeholder="Task Name"
                                :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined"
                            />
                        </UFormGroup>
                        <UFormGroup 
                            label="Task Description"
                            class="mb-4"
                            :ui="{label:{base:'text-slate-200'}}"  
                        >
                            <UTextarea 
                                v-model="state.newTaskDescription"
                            />
                        </UFormGroup>
                        <UButton 
                            type="submit"
                            color="sky"
                            block
                            :disabled="!state.newTaskName?true:false"
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
    <BoardTaskCoverMenu 
        v-if="(coverMenuActive && selectedTaskId === task.id && maskIsVisible)"
        :taskCover="task.cover"
        @changeCoverColor="handleCoverColorChange"
        @closeCoverMenu="handleCloseCoverMenu"
        @tryNewColor="handleTryingNewColor"
    />
</div>
</template>

