
<script setup>
const route = useRoute()

const links = [{
  label: 'Boards',
  icon: 'i-heroicons-view-columns',
  to: '/'
}, {
  label: 'Highlights',
  icon: 'i-heroicons-heart',
  to: `/`
}]
</script>
<template>
    <div class="w-[288px]">
        <UVerticalNavigation 
            :links="links" 
            :ui="{
                padding: 'p-4',
                size:'text-lg',
                active: 'text-slate-700 border-current font-semibold hover:before:bg-sky-50',
                inactive: 'hover:border-sky-800 hover:text-sky-800, hover:before:bg-orange-500'
              }"
        >
            <template #default="{ link }">
                <span class="group-hover:text-sky-800 relative">{{ link.label }}</span>
            </template>
        </UVerticalNavigation>
    </div>
</template>