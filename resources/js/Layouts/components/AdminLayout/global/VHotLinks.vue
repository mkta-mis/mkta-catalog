<template>
    <v-accordion title="Hotlinks">
        <!-- <div > -->
        <template v-slot:title>
            <div class="px-4 sm:px-0">
                <h3 class="text-base font-semibold leading-7 text-gray-900">
                    Hotlinks
                </h3>
            </div>
        </template>
        <div
            class="grid max-h-[11rem] grid-flow-row auto-rows-max grid-cols-12 gap-1 overflow-auto"
        >
            <button
                class="col-span-12 grid gap-2 rounded-md p-2 sm:col-span-6 md:col-span-4 lg:col-span-2"
                :class="' text-center'"
                v-for="item in hotlinks"
                :key="item.title"
            >
                <v-icon
                    v-if="item.icon"
                    :name="item.icon"
                    scale="2"
                    :class="'mx-auto'"
                />
                <span class="text-[.8rem]" :key="item.title">{{
                    item.title
                }}</span>
                <!-- <span>
                                                
                                        </span> -->
            </button>
        </div>
        <!-- </div> -->
    </v-accordion>
</template>
<script setup>
import { ref, watch, inject, computed } from "vue";

const user = inject("currentUser");
const titleClass = "text-wrap";
const hotlinks = [
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
    {
        title: "Product Management",
        icon: "pr-globe",
    },
];
</script>
