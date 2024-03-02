<script setup>
const options = [
  {
    value: 'Startup',
    label: 'Startup',
    description:['12GB', '6 CPUs', '160 GB SSD disk'],
    icon:'i-heroicons-trash'
  },
  {
    value: 'Business',
    label: 'Business',
    description:['16GB', '8 CPUs', '512 GB SSD disk'],
    icon:''
  },
  {
    value: 'Enterprise',
    label: 'Enterprise',
    description:['32GB', '12 CPUs', '1024 GB SSD disk'],
    icon:''
  },
];

const selected = ref(options[0].value);

///no necesito color porque es para el radio button en si mismo
</script>

<template>
   <RadioGroupR
        :options="options"
        :modelValue="selected"
        v-model="selected"
        legend="helle wordl"
   />
   <URadioGroup
    :options="options"
   />
</template>