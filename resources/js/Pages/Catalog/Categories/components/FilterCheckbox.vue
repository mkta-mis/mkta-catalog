<template>
    <div class="flex w-min cursor-pointer items-center text-slate-500">
        <div
            :class="`grid aspect-square h-4 place-content-center rounded-md duration-300 ${checked ? 'bg-accent text-white' : 'bg-slate-200'}`"
            @click="$emit('check', value)"
        >
            <v-icon v-if="checked" name="bi-check" scale="1"></v-icon>
        </div>
        <input
            type="checkbox"
            :id="id"
            class="hidden h-0 w-0 "
            @change="$emit('check', value)"
        />
        <label :for="id" v-bind="$attrs" class="pl-2 w-fit cursor-pointer">{{
            label
        }}</label>
    </div>
</template>

<script setup>
import { ref } from "vue";

//defines
defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    label: String,
    value: Object,
    checked: {},
});

const emits = defineEmits(["check"]);

//reactives
const id = ref(Math.random());
</script>

<style lang="scss" scoped></style>
