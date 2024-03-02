<template>
  <div :class="ui.wrapper">
    <div class="mx-auto w-full max-w-md">
      <legend v-if="legend || $slots.legend" :class="ui.legend">
        <slot name="legend">
          {{ legend }}
        </slot>
      </legend>
      <div class="space-y-2">
        <Radio 
          v-for="option in normalizedOptions"
          :key="option.value"
          :label="option.label"
          :modelValue="modelValue"
          :value="option.value"
          :help="option.help"
          :disabled="option.disabled || disabled"
          :option="option"
          :ui="uiRadio"
          @change="onUpdate(option.value)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, provide, toRef } from 'vue'
import Radio from './Radio.vue'
import { useUI } from '../composables/useUI'
import { useFormGroup } from '../composables/useFormGroup'
import { mergeConfig, get } from '../utils'
import type { Strategy } from '../types'
import appConfig from '../app.config'
import { radioGroup, radio} from '#ui/ui.config'
import colors from '#ui-colors'

const config = mergeConfig<typeof radioGroup>("merge", appConfig.ui.radioGroup, radioGroup)
const configRadio = mergeConfig<typeof radio>("merge", appConfig.ui.radio, radio)

export default defineComponent({
  components: {
    Radio
  },
  
  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ''
    },
    name: {
      type: String,
      default: null
    },
    legend: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    optionAttribute: {
      type: String,
      default: 'label'
    },
    valueAttribute: {
      type: String,
      default: 'value'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String as PropType<typeof colors[number]>,
      default: () => config.default.color,
      validator (value: string) {
        return appConfig.ui.colors.includes(value);
      }
    },
    class: {
      type: [String, Object, Array] as PropType<any>,
      default: () => ''
    },
    ui: {
      type: Object as PropType<Partial<typeof config> & { strategy?: Strategy }>,
      default: () => ({})
    },
    uiRadio: {
      type: Object as PropType<Partial<typeof configRadio> & { strategy?: Strategy }>,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'change'],
    setup (props, { emit }) {
        const { ui, attrs } = useUI('radioGroup', toRef(props, 'ui'), config, toRef(props, 'class'))
        const { ui: uiRadio } = useUI('radio', toRef(props, 'uiRadio'), configRadio)

        const { emitFormChange, color, name } = useFormGroup(props, config)
        provide('radio-group', { color, name })

        const onUpdate = (value: any) => {
          console.log('hello group', value)
          emit('update:modelValue', value)
          emit('change', value)
          emitFormChange()
        }

        const guessOptionValue = (option: any) => {
          return get(option, props.valueAttribute, get(option, props.optionAttribute))
        }

        const guessOptionText = (option: any) => {
          return get(option, props.optionAttribute, get(option, props.valueAttribute))
        }

        const normalizeOption = (option: any) => {
          if (['string', 'number', 'boolean'].includes(typeof option)) {
              return {
              value: option,
              label: option
              }
          }

          return {
              ...option,
              value: guessOptionValue(option),
              label: guessOptionText(option)
          }
        }

        const normalizedOptions = computed(() => {
        return props.options.map(option => normalizeOption(option))
        })

        return {
        // eslint-disable-next-line vue/no-dupe-keys
        ui,
        // eslint-disable-next-line vue/no-dupe-keys
        uiRadio,
        attrs,
        normalizedOptions,
        // eslint-disable-next-line vue/no-dupe-keys
        onUpdate
        }
    }
})

</script>