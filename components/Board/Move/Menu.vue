<script setup>

const props=defineProps({
    boards:{
        type:Object
    },

});
</script>
<template>
    <div>
        <p>Move task</p>
        <p>Select destination</p>
        <USelect/>
        <div>
            <USelect/>
            <USelect/>
        </div>
    </div>
</template>