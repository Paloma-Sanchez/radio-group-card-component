import { defineStore } from "pinia";
import boardData from '../data/board.json';
import { useStorage } from "@vueuse/core";

export const useBoardStore = defineStore('boardStore', () => {
    const board =  ref(boardData)//useStorage('board', boardData);

    const addColumn = (columnName) => {
        board.value.columns.push({"name":columnName, "tasks":[]})
    }

    const deleteColumn = (columnName) => {
       board.value.columns = board.value.columns.filter((column) => column["name"] !== columnName);
    }

    const addTask = (columnIndex, task) => {
        console.log('adding task');
        //console.log(board.value.columns[columnIndex].tasks);
        board.value.columns[columnIndex].tasks.push(task);
        console.log('added');
    }

    return {
        board,
        addColumn,
        deleteColumn,
        addTask
    }
})