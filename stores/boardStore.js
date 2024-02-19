import axios from 'axios';
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useBoardStore = defineStore('boardStore', () => {
    //State
    const boards =  ref(null);
    const board = ref(null);
    const boardLoading = ref(false);
    const boardShell = ref(null);
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
        const {data} = await useFetch('/api/boards');
        return boards.value = data.value; 
    };

    const loadBoardShell = async(id) => {
        const {data}= await useFetch(`/api/${id}`);
        return boardShell.value = data.value;
    };

    const loadSelectedBoard = async (boardId) => {
        boardLoading.value = true;
        const {data} = await useFetch(`http://localhost:3000/boards/${boardId}`);
        boardLoading.value = false;
        return board.value = data.value; 
    };
    
    const addColumn = async (columnName) => {
        const newColumn = {
            "name":columnName, 
            "tasks":[]
        };
        const newColumnArray = [...board.value.columns, newColumn];
        await modifyColumnElementInBoard(newColumnArray);
    };
    
    const addTask = async (columnIndex, task) => {
        const newTaskArray = [...board.value.columns[columnIndex].tasks, task]
        await modifyTaskElementInBoard(columnIndex, newTaskArray);
    };

    const changeCoverColor = async (columnIndex, taskIndex, newColor) => {
        const taskToChange = board.value.columns[columnIndex].tasks[taskIndex];
        const modifiedTaskArray = [...board.value.columns[columnIndex].tasks];
        modifiedTaskArray[taskIndex] = {
            ...taskToChange, 
            cover:newColor 
        };
        await modifyTaskElementInBoard(columnIndex, modifiedTaskArray);  
    };

    const createNewBoard = async (boardName, url) => {
        const newBoard={
            name:boardName,
            id:uuidv4(),
            url,
            starred:false,
            columns:[]
        }
        await axios.post(`http://localhost:3000/boards/`, newBoard );
        await loadBoards();
    };

    const deleteBoard = async (boardId) => {
        await axios.delete(`http://localhost:3000/boards/${boardId}`);
    };

    const deleteColumn = async (columnName) => {
        const newColumnArray = board.value.columns.filter((column) => column["name"] !== columnName);
        await modifyColumnElementInBoard(newColumnArray);
    };

    const deleteTask = async(taskIndex, columnIndex) => {
        const newTaskArrays = [...board.value.columns[columnIndex].tasks];
        newTaskArrays.splice(taskIndex, 1);
        await modifyTaskElementInBoard(columnIndex, newTaskArrays);
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

    const moveTaskToNewBoard = async({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex, boardId}) => {
        console.log('recieved fom be')
        const newFromColumn = board.value.columns[fromColumnIndex]
        const task = newFromColumn.tasks.splice(fromTaskIndex, 1)[0];
        const modifiedFromColumnArray = [...board.value.columns];
        modifiedFromColumnArray[fromColumnIndex]=newFromColumn;
        console.log('hello2');
        await modifyColumnElementInBoard(modifiedFromColumnArray);

        const {data:toBoard} = await useFetch(`http://localhost:3000/boards/${boardId}`);
        console.log('dta', toBoard.value)
        const newToColumn=toBoard.value.columns[toColumnIndex]
        newToColumn.tasks.splice(toTaskIndex, 0, task);
        const modifiedToColumnArray = [...toBoard.value.columns];
        modifiedToColumnArray[toColumnIndex]=newToColumn;
        const newBoard = {
            ...toBoard.value, 
            columns:modifiedToColumnArray
        };
        console.log('newBoard',newBoard);
        await axios.put(`http://localhost:3000/boards/${boardId}`, newBoard );
    };

    const modifyBoardName = async (newBoardName) => {
        const newBoard = {
            ...board.value,
            name:newBoardName
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
    };

    const modifyColumn = async (columnIndex, newColumnName) => {
        const columnToChange = board.value.columns[columnIndex];
        const modifiedColumnArray = [...board.value.columns];
        modifiedColumnArray[columnIndex] = {
            ...columnToChange, 
            name:newColumnName
        };
        await modifyColumnElementInBoard(modifiedColumnArray);
    };

    const modifyColumnElementInBoard = async (newColumnArray) => {
        const newBoard = {
            ...board.value, 
            columns:newColumnArray
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
        await loadSelectedBoard(board.value.id);
    };

    const modifyTask = async (taskIndex, columnIndex, newName, newDescription) => {
        const taskToChange = board.value.columns[columnIndex].tasks[taskIndex];
        const modifiedTaskArray = [...board.value.columns[columnIndex].tasks];
        modifiedTaskArray[taskIndex] = {
            ...taskToChange, 
            name:newName, 
            description:newDescription
        };
        await modifyTaskElementInBoard(columnIndex, modifiedTaskArray);  
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
        await loadSelectedBoard(board.value.id);
    };

    const moveColumn = async (initialColumnIndex, toColumnIndex) => {
        const modifiedColumnArray = board.value.columns;
        const column = modifiedColumnArray.splice(initialColumnIndex, 1)[0];
        modifiedColumnArray.splice(toColumnIndex, 0, column);
        const newBoard = {
            ...board.value,
            columns:modifiedColumnArray
        }
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard)
        await loadSelectedBoard(board.value.id);
    };

    const moveTask = async({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}) => {
        //console.log('received indexes',fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex)
        const newFromColumn = board.value.columns[fromColumnIndex]
        const task = newFromColumn.tasks.splice(fromTaskIndex, 1)[0];
        const newToColumn=board.value.columns[toColumnIndex]
        newToColumn.tasks.splice(toTaskIndex, 0, task);
        const modifiedColumnArray = [...board.value.columns];
        modifiedColumnArray[fromColumnIndex]=newFromColumn;
        modifiedColumnArray[toColumnIndex]=newToColumn;
        await modifyColumnElementInBoard(modifiedColumnArray);
    };
        
    const setSelectedTaskId = (taskId) => {
        selectedTaskId.value = taskId;
    };

    const toggleBoardStarred = async(boardId) => {
        await loadSelectedBoard(boardId);
        const newStarredValue = !board.value.starred
        const newBoard = {
            ...board.value,
            starred:newStarredValue
        };
        await axios.put(`http://localhost:3000/boards/${board.value.id}`, newBoard );
        await loadBoards();
    };

    const toggleHighlightsActive = (bool) => {
        highlightsActive.value = bool;
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
        boardShell,
        boardLoading,
        highlightsActive,
        maskIsVisible,
        selectedTaskId,
        selectedTask,
        taskFieldActive,
        taskPencilButtonVisible,
        getStarredBoards,
        loadBoards,
        loadBoardShell,
        loadSelectedBoard,
        addColumn,
        addTask,
        changeCoverColor,
        createNewBoard,
        deleteBoard,
        deleteColumn,
        deleteTask,
        getSelectedTaskAndIndexes,
        modifyBoardName,
        modifyColumn,
        modifyTask,
        moveColumn,
        moveTask,
        moveTaskToNewBoard,
        toggleBoardStarred,
        toggleHighlightsActive,
        toggleMaskVisibility,
        toggleTaskFieldVisibility,
        setSelectedTaskId,
    };
})