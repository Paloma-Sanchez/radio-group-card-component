export default {
    wrapper: {
      xs:'rounded-md font-sans',
      sm:'sm w-full p-4 aspect-ratio rounded-md font-sans',
      md:'md h-[72px] rounded-md font-sans',
    },
    container: {
      unchecked:'text-gray-700',
      checked:'text-white'
    },
    base: 'h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
    form: 'form-radio',
    color: 'text-{color}-500 dark:text-{color}-400',
    background: {
      unchecked:'bg-{color}-100',
      checked:'bg-{color}-100 dark:bg-gray-900'
    },
    border: 'border border-gray-300 dark:border-gray-700',
    ring: 'ring-2 ring-{color}-500 dark:ring-{color}-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ',
    icon:{
      sm:'-mt-11 h-5 w-5',
      md:'ml-4 h-5 w-5'
    },
    innerr:'flex items-center',
    innerlabel:'innerlabel mb-2 text-md font-semibold',
    labelcenter:{
      sm:'labelcenter',
      md:'labelcenter pl-3'
    },
    label: {
      sm:'label h-full w-full text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      md:'label h-full w-full pr-6 text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent'
    },
    description:{
      checked:'text-white',
      unchecked:'pl-3 first-of-type:pl-0 pr-1 font-light text-gray-500'
    },
    extradescription:'mt-2',
    required: 'text-sm text-red-500 dark:text-red-400',
    help: 'text-sm text-gray-500 dark:text-gray-400',
    default: {
      color: 'primary'
    }
  }

