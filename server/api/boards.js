import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const response = await $fetch('http://localhost:3000/boards');
    const finalResponse = [];
    response.forEach(board => {
        finalResponse.push(
            {
                name: board.name,
                id:board.id,
                url:board.url,
                starred: board.starred
            }
        );
    });
    //console.log(finalResponse);
    return finalResponse;
});