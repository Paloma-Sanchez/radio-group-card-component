<template>
    <div
        :class="ui.wrapper"
    >
        <input
            :id="inputId"
            v-model="pick"
            :disabled="disabled"
            :name="name"
            :required="required"
            :value="value"
            type="radio"
            :class="inputClass"
            :checked="checked"
        />
        <label
            :class="[
                ui.label, 
                {
                    'cursor-not-allowed':disabled,
                    'opacity-50':disabled
                }
            ]"
            :for="inputId"
        >
            <div
                class="flex items-center"
            >
                <UIcon 
                    v-if="option.icon"
                    :name="option.icon"
                />
                <div
                    class="pl-3"
                >
                    {{ label }}
                    <br>
                    <span
                        v-for="description in option.description"
                        class="border-slate-800 border-r-2 pl-3 first:pl-5 pr-3  last:border-r-0"
                    >
                        {{ description }} 
                    </span>
                </div>
            </div>
            <UIcon
                class="text-slate-800 "
                name="i-heroicons-check-solid"
            />
            <span v-if="required" :class="ui.required">*</span>
        </label>
    </div>
    </template>
    <script lang="ts">
    import { computed, defineComponent, inject, toRef } from 'vue'
    import { twMerge, twJoin } from 'tailwind-merge'
    import { mergeConfig } from '../utils'
    import type { Strategy } from '../types'
    import appConfig from '../app.config'
    import { v4 as uuidv4 } from 'uuid'
    import { radio } from '../ui.config'
    import colors from '#ui-colors'
    const config = mergeConfig<typeof radio>("merge", appConfig.ui.radio, radio)
    
    export default defineComponent({
        props: {
            id: {
                type: String,
                default: null
            },
            value: {
                type: [String, Number, Boolean],
                default: null
            },
            modelValue: {
                type: [String, Number, Boolean, Object],
                default: null
            },
            name: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            help: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            required: {
                type: Boolean,
                default: false
            },
            color: {
                type: String as PropType<typeof colors[number]>,
                default: () => config.default.color,
                /*validator (value: string) {
                    return appConfig.ui.colors.includes(value)
                }*/
            },
            inputClass: {
                type: String,
                default: null
            },
            class: {
                type: [String, Object, Array] as PropType<any>,
                default: () => ''
            },
            ui: {
                type: Object as PropType<Partial<typeof config> & { strategy?: Strategy }>,
                default: () => ({})
            },
            option:{
                type:Object,
                default:() => ''
            }
        },

        emits: ['update:modelValue', 'change'],

        setup (props, { emit }) {
            const { ui, attrs } = useUI('radio', toRef(props, 'ui'), config, toRef(props, 'class'))
            const id = uuidv4();
            const inputId = props.id ?? id
    
            const radioGroup = inject('radio-group', null)
            const { emitFormChange, color, name } = radioGroup ?? useFormGroup(props, config)
    
            const pick = computed({
            get () {
                return props.modelValue
            },
            set (value) {
                console.log('value', value)
                emit('update:modelValue', value)
                emit('change', value)
    
                if (!radioGroup) {
                emitFormChange()
                }
            }
            })
    
            const checked = computed(() => props.modelValue === props.option )
    
            const inputClass = computed(() => {
            return twMerge(twJoin(
                ui.value.base,
                ui.value.form,
                ui.value.background,
                ui.value.border,
                color.value && ui.value.ring.replaceAll('{color}', color.value),
                color.value && ui.value.color.replaceAll('{color}', color.value)
            ), props.inputClass)
            })
    
            return {
                inputId,
                // eslint-disable-next-line vue/no-dupe-keys
                checked,
                ui,
                attrs,
                pick,
                // eslint-disable-next-line vue/no-dupe-keys
                name,
                // eslint-disable-next-line vue/no-dupe-keys
                inputClass
            }
      }
    })
    </script>
    <style scoped>
    input[type="radio"] {
        display: none;
      }
      input[type="radio"]+ label {
        padding: 0.3rem 0.5rem;
        border: 1px dashed #ccc;
      }
      input[type="radio"]:checked + label {
        border: 1px solid #000;
      }
    
    </style>