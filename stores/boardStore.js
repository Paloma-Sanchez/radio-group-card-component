import axios from 'axios';
import { defineStore } from "pinia";
import withUUID from "vue-uuid";

export const useBoardStore = defineStore('boardStore', () => {
    //State
    const boards =  ref(null);
    const board = ref(null);
    const boardLoading = ref(false);
    const highlightsActive = ref(false);
    const maskIsVisible = ref(false);
    const taskFieldActive = ref(false);
    const taskPencilButtonVisible = ref(false);
    const selectedTaskId = ref(0);
    const selectedTask =ref({});

    //Getters
    const getStarredBoards = computed(()=>{
        const starredBoards = boards.value.filter(board => board.starred);
        return starredBoards;
    });
  
    //Actions
    const loadBoards = async() => {
        const {data} = await useFetch('/api/board');
        return boards.value = data.value; 
    };

    const loadSelectedBoard = async (boardId) => {
        boardLoading.value = true;
        const {data} = await useFetch(`http://localhost:3000/boards/${boardId}`);
        boardLoading.value = false;
        return board.value = data.value; 
    };
    
    const addColumn = (columnName) => {
        const newColumn = {
            "name":columnName, 
            "tasks":[]
        };
        const newColumnArray = [...board.value.columns, newColumn];
        modifyColumnElementInBoard(newColumnArray);
    };
    
    const addTask = (columnIndex, task) => {
        const newTaskArray = [...board.value.columns[columnIndex].tasks, task]
        modifyTaskElementInBoard(columnIndex, newTaskArray);
    };

    const createNewBoard = async (boardName, url) => {
        const newBoard={
            name:boardName,
            id:$uuid.v4(),
            url,
            starred:false,
            columns:[]
        }
        await axios.post(`http://localhost:3000/boards/`, newBoard );
    };

    const deleteColumn = (columnName) => {
        const newColumnArray = board.value.columns.filter((column) => column["name"] !== columnName);
        modifyColumnElementInBoard(newColumnArray);
       //board.value.columns = 
    };

    const deleteTask = (taskIndex, columnIndex) => {
        const newTaskArrays = [...board.value.columns[columnIndex].tasks];
        newTaskArrays.splice(taskIndex, 1);
        modifyTaskElementInBoard(columnIndex, newTaskArrays);
    };

    const getSelectedTaskAndIndexes = (taskId) => {
        let columnIndex = 0;
        for(const column of board.value.columns){
            const task = column.tasks.find(task => task.id === taskId);
            if(task) {
                const taskIndex = column.tasks.findIndex(task => task.id === taskId);
               return selectedTask.value= {
                                    task:task,
                                    taskIndex,
                                    columnIndex
                                    }
            };
            columnIndex++;
        };
    };


    const modifyColumn = (columnIndex, newColumnName) => {
        const columnToChange = board.value.columns[columnIndex];
        const modifiedColumnArray = [...board.value.columns];
        modifiedColumnArray[columnIndex] = {
            ...columnToChange, 
            name:newColumnName
         };
         modifyColumnElementInBoard(modifiedColumnArray);
    }

    const modifyColumnElementInBoard = async (newColumnArray) => {
        const newBoard = {
            ...board.value, 
            columns:newColumnArray
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
    };

    const modifyTask = (taskIndex, columnIndex, newName, newDescription) => {
        const taskToChange = board.value.columns[columnIndex].tasks[taskIndex];
        const modifiedTaskArray = [...board.value.columns[columnIndex].tasks];
        modifiedTaskArray[taskIndex] = {
            ...taskToChange, 
            name:newName, 
            description: newDescription
         };
         modifyTaskElementInBoard(columnIndex, modifiedTaskArray);               
    };

    const modifyTaskElementInBoard = async (columnIndex, newTaskArray) => {
        const modifiedColumn = {
            ...board.value.columns[columnIndex],
            tasks:newTaskArray
        };
        const newColumnArray = [...board.value.columns];
        newColumnArray[columnIndex]=modifiedColumn;
        const newBoard = {
            ...board.value, 
            columns:newColumnArray
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
    };

    const moveColumn = (initialColumnIndex, toColumnIndex) => {
        const column = board.value.columns.splice(initialColumnIndex, 1)[0];
        board.value.columns.splice(toColumnIndex, 0, column);
    };

    const moveTask = ({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}) => {
        const task = board.value.columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0];
        board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task);
    };
        
    const setSelectedTaskId = (taskId) => {
        selectedTaskId.value = taskId;
    };

    const toggleBoardStarred = async() => {
        const newStarredValue = !board.value.starred
        const newBoard = {
            ...board.value,
            starred:newStarredValue
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
    };

    const toggleHighlightsActive = () => {
        highlightsActive.value = !highlightsActive.value;
    };

    const toggleMaskVisibility = () => {
        maskIsVisible.value = ! maskIsVisible.value;
    };

    const toggleTaskFieldVisibility = () => {
        taskFieldActive.value = !taskFieldActive.value;        
    };

    return {
        boards,
        board,
        boardLoading,
        highlightsActive,
        maskIsVisible,
        selectedTaskId,
        selectedTask,
        taskFieldActive,
        taskPencilButtonVisible,
        getStarredBoards,
        loadBoards,
        loadSelectedBoard,
        addColumn,
        addTask,
        deleteColumn,
        deleteTask,
        getSelectedTaskAndIndexes,
        modifyColumn,
        modifyTask,
        moveColumn,
        moveTask,
        toggleBoardStarred,
        toggleHighlightsActive,
        toggleMaskVisibility,
        toggleTaskFieldVisibility,
        setSelectedTaskId,
    };
})