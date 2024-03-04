<template>
    <div
        :class="wrapperClass"
    >
        <input
            :id="inputId"
            v-model="pick"
            :disabled="disabled"
            :name="name"
            :required="required"
            :value="value"
            type="radio"
            :checked="checked"
            v-bind="attrs"
        />
        <label
            :class="[
                labelClass, 
                {
                    'cursor-not-allowed':disabled,
                    'opacity-50':disabled,
                }
            ]"
            :for="inputId"
        >
            <slot
                name="label"
            >
                <div 
                    class="flex items-center"
                >
                    <Icon 
                        :class="iconClass"
                        v-if="option.icon"
                        :name="option.icon"
                    />
                    <div
                        :class="labelCenterClass"
                    >
                        <div
                            :class="ui.innerlabel"
                        >
                            {{ label }}
                        </div>
                        <span
                            v-if="size==='md'"
                            v-for="description in option.description"
                            :class="descriptionClass"
                        >
                            {{ description}}  
                        </span>
                        <span
                            v-if="size==='sm'"
                        >
                            <div
                                :class="descriptionClass"
                            >
                                {{option.description[0]}}
                            </div>
                            <div
                                :class="ui.extradescription"
                            >
                                {{option.description[1]}}
                            </div>
                        </span>
                        <span
                            v-if="size==='xs'"
                        >

                        </span>
                    </div>
                </div>
                <slot
                    name="label-right"
                >
                    <Icon
                        v-if="!checked"
                        :class="iconClass"
                        name="i-material-symbols-radio-button-unchecked" 
                    />
                    <Icon
                        v-else
                        :class="iconClass"
                        name="i-material-symbols-radio-button-checked"
                    />
                </slot>
            </slot>
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
    const config = mergeConfig<typeof radio>("merge", appConfig.ui.radioCard, radio)
    
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
                validator (value: string) {
                    return appConfig.ui.colors.includes(value)
                }
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
            },
            size:{
                type: String,
                default: () => config.default.size
                //validator (value: string) {
                  //  return appConfig.ui.colors.includes(value)
                //}
            },
            bordOnly:{
                type: Boolean,
                default: false
                //validator (value: string) {
                  //  return appConfig.ui.colors.includes(value)
                //}
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
                emit('update:modelValue', value)
                emit('change', value)
    
                if (!radioGroup) {
                emitFormChange()
                }
            }
            })
    
            const checked = computed(() => props.modelValue === props.value )
            //const size = computed(() => props.size )

            const descriptionClass= computed(() => {
                const mergedClass = (checked.value && !props.bordOnly)? twJoin(
                    ui.value.description.unchecked,
                    ui.value.description.checked
                ):ui.value.description.unchecked

                return mergedClass
            })

            const iconClass = computed(() => {
                let textColor = ''
                if(checked.value){
                    if(props.bordOnly){
                        textColor = `text-${props.color}-500`
                    }
                }else{
                    textColor = 'text-gray-400'
                }

                return twJoin(
                    ui.value.icon[props.size],
                    textColor
                )
            })

            const labelClass = computed(() => {
                return twMerge(twJoin(
                    ui.value.label[props.size],
                ))
            })

            const labelCenterClass = computed(() => {
                return twMerge(twJoin(
                    ui.value.labelcenter[props.size],
                ))
            })
            
            const wrapperClass = computed(() => {
                const bg= (checked.value && !props.bordOnly)? ui.value.background.checked : ui.value.background.unchecked
                let container = ''
                if(checked.value && props.bordOnly){
                    container= `text-${props.color}-500`
                    
                } else if(checked.value){
                    container = ui.value.container.checked 
                }else{
                    container= ui.value.container.unchecked
                }
              
                let ring = checked.value? ui.value.ring : ''
                if(props.bordOnly){
                    ring = ring.replaceAll('ring-offset-2 ring-offset-white', ' ')
                    ring = ring.replaceAll('ring-2', 'ring-4')
                }

                return twMerge(twJoin(
                    props.size && appConfig.ui.colors.includes(props.color) && ui.value.wrapper[props.size],
                    bg.replaceAll('{color}', props.color),
                    ring.replaceAll('{color}', props.color),
                    container
                ))
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
                descriptionClass,
                iconClass,
                labelClass,
                labelCenterClass,
                wrapperClass
            }
      }
    })

    /*[
            ui.wrapper.md, 
            checked?`bg-${color}-500`:'bg-white'
            ]*/
    </script>
    <style scoped>
    input[type="radio"] {
        display: none;
      }
     
      
    </style>