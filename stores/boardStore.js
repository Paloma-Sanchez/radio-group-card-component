import { defineStore } from "pinia";

export const useBoardStore = defineStore('boardStore', () => {
    const boards =  ref(null);
    const board = ref(null);

    const loadBoards = async() => {
        const {data} = await useFetch('http://localhost:3000/boards');
        return boards.value = data.value; 
    }

    const loadSelectedBoard = async (boardId) => {
        const {data} = await useFetch(`http://localhost:3000/boards/${boardId}`);
        return board.value = data.value; 
    }
    
    const addColumn = (columnName) => {
        board.value.columns.push({"name":columnName, "tasks":[]})
    }

    const deleteColumn = (columnName) => {
       board.value.columns = board.value.columns.filter((column) => column["name"] !== columnName);
    }

    const addTask = (columnIndex, task) => {
        board.value.columns[columnIndex].tasks.push(task);
    }

    const modifyTask = (taskIndex, columnIndex, newName, newDescription) => {
         let taskTochange = board.value.columns[columnIndex].tasks[taskIndex]
         board.value.columns[columnIndex].tasks[taskIndex] = {
            ...taskTochange, name:newName, description: newDescription
         }                 
    }

    const deleteTask = (taskIndex, columnIndex) => {
        board.value.columns[columnIndex].tasks.splice(taskIndex, 1);
    }


    return {
        boards,
        board,
        loadBoards,
        loadSelectedBoard,
        addColumn,
        deleteColumn,
        addTask,
        modifyTask,
        deleteTask
    }
})