
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
  {
    value: 'Education',
    label: 'Education',
    //description:['6GB', '3CPUs', '80 GB SSD disk'],
    icon:''
  },
];

const options2 =[
  {
    value: 'Standard',
    label: 'Standard',
    description:['4-10 business days', '$5.00']
  },
  {
    value: 'Express',
    label: 'Express',
    description:['2-5 business days', '$15.00']
  },
  {
    value: 'Super Fast',
    label: 'Super Fast',
    description:['1 business day', '$25.00']
  }
]
const selected = ref(options[0].value);

///no necesito color porque es para el radio button en si mismo
//:ui="{legend:'text-3xl'}"
//:uiRadio="{label:'text-lg'}"
</script>

<template>
   <RadioGroupCard
        :options="options"
        :modelValue="selected"
        v-model="selected"
        legend="helle wordl"
        color="sky"
        :bordOnly="true"
   />

   <RadioGroupCard
        :options="options2"
        :modelValue="selected"
        size="sm"
        v-model="selected"
        legend="hello twice"
        color="fuchsia"
   />
  <RadioGroupCard 
    v-model="selected"  
    :options="options"
    color="red"
    />
</template>