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

    return finalResponse;
})