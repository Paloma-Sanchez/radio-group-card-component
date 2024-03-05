
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

const options3 = [
  {
    value:'4 GB',
    label:'4 GB'
  },
  {
    value:'8 GB',
    label:'8 GB'
  },
  {
    value:'16 GB',
    label:'16 GB'
  },
  {
    value:'32 GB',
    label:'32 GB'
  },
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
        :bordOnly="true"
        :uiRadio="{background:{unchecked:'bg-white'},
        }"
   >
   <template #checkIcon="{ option }">
    <p class="italic">
      <Icon :name="option.icon" />
      {{ option.label }}
    </p>
  </template>
  </RadioGroupCard>
   <RadioGroupCard
        :options="options3"
        :modelValue="selected"
        size="xs"
        v-model="selected"
        legend="hello 3x"
        color="violet"
        :bordOnly="true"

   />
  <RadioGroupCard 
    v-model="selected"  
    :options="options"
    color="red"
    />
</template>