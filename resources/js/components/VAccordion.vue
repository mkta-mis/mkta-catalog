<template>
    <div class="group overflow-hidden rounded-lg">
        <div
            @click="expanded = !expanded"
            :class="`cursor-pointer  relative isolate flex items-center justify-between bg-stone-200 ${densityValue}`"
        >
            <!-- backdrop -->
            <div
                class="absolute inset-0 -z-10 duration-500"
                :class="{ 'backdrop-brightness-75': expanded }"
            ></div>
            <slot name="title" :expanded="expanded"></slot>
            <p v-if="!$slots.title">
                {{ title }}
            </p>
            <v-icon :name="icon" :flip="expanded ? 'vertical' : null"></v-icon>
        </div>

        <div
            class="grid overflow-hidden transition-[grid-template-rows] duration-300"
            :class="{
                'grid-rows-[0fr]': !expanded,
                'grid-rows-[1fr]': expanded,
            }"
        >
            <div class="overflow-hidden bg-white">
                <div class="p-3">
                    <slot>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Vel modi, quisquam suscipit non provident dolor
                        labore culpa necessitatibus consequuntur cumque vitae
                        fuga libero aliquam, aspernatur veritatis impedit
                        eligendi ratione ipsam.
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useDensity, useDensityValues } from "@/composables/useInput";

const props = defineProps({
    ...useDensity(),
    title: {
        type: String,
        default: "Accordion",
    },
    icon: {
        type: String,
        default: "md-arrowdropdown-round",
    },
    bg: String,
    open: Boolean,
});

const densityValue = useDensityValues(props.density);
//reactives
const expanded = ref(props.open);

//derived props
</script>

<style lang="scss" scoped></style>
