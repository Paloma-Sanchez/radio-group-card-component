import colors from '#ui-colors'

export default defineAppConfig({
  ui: {
    strategy:"merge",
    colors: colors,
    radioCard:{
      wrapper: {
        xs:'xs w-[80px] p-2 aspect-ratio rounded-md',
        sm:'sm w-[200px] p-4 aspect-ratio rounded-md',
        md:'md h-[72px]  rounded-md',
      },
      container: {
        unchecked:'text-gray-700',
        checked:'text-white'
      },
      base: 'h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      form: 'form-radio',
      color: 'text-{color}-500 dark:text-{color}-400',
      background: {
        unchecked:'bg-{color}-50',
        checked:'bg-{color}-500 dark:bg-gray-900'
      },
      border: 'border border-gray-300 dark:border-gray-700',
      ring: 'ring-2 ring-{color}-500 dark:ring-{color}-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ',
      icon:{
        sm:'-mt-11 h-5 w-5',
        md:'ml-4 h-5 w-5'
      },
      innerr:'flex items-center',
      innerlabel:' text-md font-semibold',
      labelcenter:{
        sm:'labelcenter',
        md:'labelcenter pl-3'
      },
      label: {
        xs:'label h-full w-full text-md rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
        sm:'label h-full w-full text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
        md:'label h-full w-full pr-6 text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent'
      },
      description:{
        checked:'text-white',
        unchecked:'pl-3 mt-2 first-of-type:pl-0 pr-1 font-light text-gray-500'
      },
      extradescription:'mt-2',
      required: 'text-sm text-red-500 dark:text-red-400',
      help: 'text-sm text-gray-500 dark:text-gray-400',
      default: {
        color: 'primary'
      }
    },
    radioGroup:{
      wrapper: {
        xs:'',
        sm:' ',
        md:'w-[448px] relative flex items-start',
      },
      container:{
        xs:'space-x-2 w-max flex',
        sm:'space-x-2 w-max flex',
        md:'space-y-2 w-max',
      },
      legend: 'text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
      default: {
        color: 'primary',
        size: 'md'
      }
    },
    icons: {
      dynamic: true
    }
  }
})
