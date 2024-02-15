
<script setup>

//options for the radio selectors
const options = [
  { label: 'Hucachina', value: 'https://www.peruhop.com/wp-content/uploads/full-day-tour-main.jpg' },
  { label: 'Macchu Picchu', value: 'https://humanidades.com/wp-content/uploads/2018/09/Per%C3%BA-5-e1578616930994-800x416.jpg' },
  { label: 'Rainbow Mountain', value: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Rainbow_Mountain_Peru.jpg' },
  { label: 'Millpu', value:'https://portal.andina.pe/EDPfotografia3/Thumbnail/2023/06/06/000964426W.jpg'}
];

//State for new board creation form
const state = reactive({
    newBoardTitle: '',
    radio: undefined
});
</script>
<template>
    <div>
        <p>Create board</p>
        <UForm
            :state="state"
        >
            <UFormGroup 
                name="radio" 
                label="Background"
            >
                <URadio 
                    v-for="option in options" 
                    :key="option.value" 
                    v-model="state.radio" 
                    v-bind="option"
                >
                    <template #label>
                        <div
                            class="h-4 w-6 bg-cover bg-center"
                            :style="{backgroundImage: `url('${option.value}')`}"
                        >
                        </div>
                    </template>
                </URadio>
            </UFormGroup>
            <UFormGroup 
                label="Board title" 
                name="boardTitle"
                required
            >
                <UInput
                    v-model="state.newBoardTitle"
                />
            </UFormGroup>
            <UButton
                type="submit"
            >
                Create
            </UButton>
        </UForm>
    </div>
</template>