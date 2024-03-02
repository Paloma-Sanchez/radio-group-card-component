<script setup>
const props = defineProps({
    modelValue:{
        type: [String, Number, Object],
        required:true
    },
    name:{
        type:String
    },
    options:{
        type:Array,
        required:true
    },
   
});


</script>
<template>
<div class="w-full px-4 py-16">
    <div class="mx-auto w-full max-w-md">
        
            <div class="space-y-2">
                <Radio 
                    v-for="option in options"
                    :key="option.value"
                    :modelValue="modelValue"
                    :name="name"
                    :option="option"
                    @updateModelValue="$emit('update:modelValue', $event)"
                />
            </div>
    </div>
</div>
</template>