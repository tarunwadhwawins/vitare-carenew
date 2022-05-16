<template>
            
                            <div v-if="optionList.dataTypeId==244">
                                <a-col :span="24" v-for="(options,index) in optionList.options" :key="index">
                                    <div class="questionOutput">
                                        <a-checkbox v-model:checked="options.defaultOption" disabled>
                                            Default
                                        </a-checkbox>
                                        <a-checkbox v-model:checked="options.answer" disabled>
                                            Correct
                                        </a-checkbox>
                                        <div class="ml-10 ">
                                            <p>{{ options.option}}</p>
                                            <p v-if="options.score">Score - {{options.score.score}}</p>
                                            <div v-if="options.program.length>0">
                                                <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                            </div>
                                        </div>
                                    </div>
                                </a-col>
                            </div>
                            <div v-else-if="optionList.dataTypeId==243">

                                <a-col :span="24" v-for="(options,index) in optionList.options" :key="index">
                                    <div class="questionOutput">

                                        <a-radio-group v-model:value="value">
                                            <a-radio :value="options.defaultOption" disabled>Default</a-radio>
                                        </a-radio-group>
                                        <a-radio-group v-model:value="value2" >
                                            <a-radio :value="options.correct" disabled>Correct</a-radio>
                                        </a-radio-group>

                                        <div class="ml-10 ">
                                            <p>{{ options.option }}</p>
                                            <p v-if="options.score">Score - {{options.score.score}}</p>
                                            <div v-if="options.program.length>0">
                                                <a-tag v-for="(program,i) in options.program" :key="i">{{program.program}} - {{program.score? program.score : 0}}</a-tag>
                                            </div>
                                        </div>
                                    </div>
                                </a-col>

                            </div>
                            <a-col :span="24" v-else>
                                <div class="questionOutput">
                                    <p>Score : {{optionList.score?optionList.score : 0}}</p>
                                </div>
                            </a-col>

                             
</template>

<script>
  import { defineComponent,ref } from "vue"


export default defineComponent({
    name: "Question Options",
    components: {

        
        
    },
    props:{
        optionList:Array,
       
    },
    setup() {
       
        return {    
            value: ref(1),
            value2: ref(1)
        };
    },
});
</script>
