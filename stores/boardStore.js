import { defineStore } from "pinia";

export const useBoardStore = defineStore('boardStore', () => {
    //State
    const boards =  ref(null);
    const board = ref(null);
    const boardLoading = ref(false);
    const maskIsVisible = ref(false);
    const taskFieldActive = ref(false);
    const selectedTaskId = ref(0);

    //Getters
    const getSelectedTask = computed(() => {
        return taskId => {
            for(const column of board.value.columns){
                const task = column.tasks.find(task => task.id === taskId);
                if(task) return task;
            };
        };
    });

    //Actions
    const loadBoards = async() => {
        const {data} = await useFetch('http://localhost:3000/boards');
        return boards.value = data.value; 
    };

    const loadSelectedBoard = async (boardId) => {
        boardLoading.value = true;
        const {data} = await useFetch(`http://localhost:3000/boards/${boardId}`);
        boardLoading.value = false;
        return board.value = data.value; 
    };
    
    const addColumn = (columnName) => {
        board.value.columns.push({"name":columnName, "tasks":[]});
    };
    
    const addTask = (columnIndex, task) => {
        board.value.columns[columnIndex].tasks.push(task);
    };

    const deleteColumn = (columnName) => {
       board.value.columns = board.value.columns.filter((column) => column["name"] !== columnName);
    };

    const deleteTask = (taskIndex, columnIndex) => {
        board.value.columns[columnIndex].tasks.splice(taskIndex, 1);
    };

    const modifyTask = (taskIndex, columnIndex, newName, newDescription) => {
         let taskTochange = board.value.columns[columnIndex].tasks[taskIndex];
         board.value.columns[columnIndex].tasks[taskIndex] = {
            ...taskTochange, name:newName, description: newDescription
         }  ;               
    };

    const moveColumn = (initialColumnIndex, toColumnIndex) => {
        const column = board.value.columns.splice(initialColumnIndex, 1)[0];
        board.value.columns.splice(toColumnIndex, 0, column);
    };

    const moveTask = ({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}) => {
        const task = board.value.columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0];
        board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    };

    const toggleMaskVisibility = () => {
        maskIsVisible.value = ! maskIsVisible.value;
    };

    const setSelectedTaskId = (taskId) => {
        selectedTaskId.value = taskId
    };

    const toggleTaskFieldVisibility = () => {
        taskFieldActive.value = !taskFieldActive.value;        
    }


    return {
        boards,
        board,
        boardLoading,
        maskIsVisible,
        selectedTaskId,
        getSelectedTask,
        taskFieldActive,
        loadBoards,
        loadSelectedBoard,
        addColumn,
        addTask,
        deleteColumn,
        deleteTask,
        modifyTask,
        moveColumn,
        moveTask,
        toggleMaskVisibility,
        toggleTaskFieldVisibility,
        setSelectedTaskId,
    };
})