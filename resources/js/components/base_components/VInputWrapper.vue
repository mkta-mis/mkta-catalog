<template>
    <div :class="`flex items-center ${wrapperClass}`">
        <div class="mr-1">
            <v-icon v-if="prependIcon" :name="prependIcon" scale="1.3"></v-icon>
            <slot name="prepend"></slot>
        </div>
        <div class="grid grow">
            <div
                :class="`peer order-2 flex  items-center gap-1 rounded-lg border bg-white duration-300 has-[:disabled]:bg-stone-200 has-[:focus]:ring-2 has-[:focus]:ring-accent has-[:focus]:ring-offset-2 ${wrapperClass} ${$attrs.densityValues}`"
            >
                <v-icon
                    v-if="prependInnerIcon"
                    :name="prependInnerIcon"
                    scale="1"
                    class="mr-2"
                ></v-icon>
                <slot name="prepend-inner"></slot>
                <slot
                    :id="id"
                    class="grow"
                    @focus="isFocused = true"
                    @blur="isFocused = false"
                ></slot>
                <v-icon
                    v-if="appendInnerIcon"
                    :name="appendInnerIcon"
                    scale="1.3"
                    color="#78716c"
                ></v-icon>
                <slot name="append-inner"> </slot>
            </div>

            <label
                :for="id"
                class="order-1 mb-0.5 text-sm duration-300 peer-has-[:focus]:text-accent"
                >{{ label }}</label
            >
            <slot
                name="message"
                class="order-3 ml-2 min-h-5 text-[.75rem] text-slate-400"
            >
                <div class="order-3 ml-2 min-h-5" v-if="hint">
                    <div
                        class="text-[.75rem] text-slate-400"
                        v-if="isFocused || persistentHint"
                    >
                        {{ hint }}
                    </div>
                </div>
            </slot>
        </div>

        <div class="ml-1">
            <v-icon v-if="appendIcon" :name="appendIcon" scale="1.3"></v-icon>
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useInput } from "@/composables/useInput";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps(useInput());

const id = Math.random();
const isFocused = ref(false);
</script>

<style lang="scss" scoped></style>
