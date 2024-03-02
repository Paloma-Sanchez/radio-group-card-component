import colors from '#ui-colors'

export default defineAppConfig({
  ui: {
    strategy:"merge",
    colors: colors,
    radio:{
      wrapper: 'bg-emerald-400 h-[72px] w-[448px] rounded-md',
      container: 'flex items-center h-5',
      base: 'h-4 w-4 dark:checked:bg-current dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      form: 'form-radio',
      color: 'text-{color}-500 dark:text-{color}-400',
      background: 'bg-white dark:bg-gray-900',
      border: 'border border-gray-300 dark:border-gray-700',
      ring: 'focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 ',
      inner: 'ms-3 flex flex-col',
      label: 'h-full w-full text-sm font-medium rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between text-gray-700 dark:text-gray-200 dark:checked:bg-current dark:checked:border-transparent  focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      required: 'text-sm text-red-500 dark:text-red-400',
      help: 'text-sm text-gray-500 dark:text-gray-400',
      default: {
        color: 'primary'
      }
    },
    radioGroup:{
      wrapper: 'relative flex items-start',
      legend: 'text-sm font-medium text-gray-700 dark:text-gray-200 mb-1',
      default: {
        color: 'primary'
      }
    }
  }
})
