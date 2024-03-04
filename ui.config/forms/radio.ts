export default {
  wrapper: {
    sm:'sm w-full p-4 aspect-ratio rounded-md',
    md:'md h-[72px]  rounded-md',
  },
  container: 'flex items-center h-5',
  base: 'h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
  form: 'form-radio',
  color: 'text-{color}-500 dark:text-{color}-400',
  background: 'bg-{color}-100 checked:bg-{color}-500 dark:bg-gray-900',
  border: 'border border-gray-300 dark:border-gray-700',
  ring: 'focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ',
  icon:{
    sm:'-mt-11',
    md:'ml-4'
  },
  inner: 'flex items-center pr-3',
  innerlabel:'mb-2 text-md font-semibold',
  labelcenter:{
    sm:'labelcenter',
    md:'labelcenter pl-3'
  },
  label: {
    sm:'label h-full w-full text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-gray-700 dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
    md:'label h-full w-full pr-6 text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-gray-700 dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent'
  },
  description:' pl-3 first-of-type:pl-0 pr-1 last:border-r-0 font-light text-gray-500',
  required: 'text-sm text-red-500 dark:text-red-400',
  help: 'text-sm text-gray-500 dark:text-gray-400',
  default: {
    color: 'primary'
  }
}
