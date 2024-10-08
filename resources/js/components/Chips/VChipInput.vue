<template>
    <v-chip-group
        :items="model"
        @delete="handleRemoveItem"
        @click="handleFocusOnInput"
        ref="parentElement"
    >
        <template #append>
            <input
                type="text"
                class="grow outline-none"
                @keydown.enter="handleAddItem"
                v-model="input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
                ref="inputElement"
                @keydown="handleOverlayKeydown"
                @input="overlayIndex = 0"
            />
        </template>
    </v-chip-group>

    <!-- #region overlay -->
    <Teleport to="#overlay" v-if="isInputFocus">
        <div
            class="fixed z-[2000] overflow-hidden rounded-lg bg-white shadow-lg"
            ref="overlayElement"
            @mouseover="
                () => {
                    isInsideOverlay = true;
                    overlayIndex = null;
                }
            "
            @mouseleave="
                () => {
                    isInsideOverlay = false;
                    overlayIndex = 0;
                }
            "
        >
            <ul class="grid">
                <li
                    v-for="(item, index) in searchSuggestions"
                    :key="index"
                    @click="handleAddSuggestion(item)"
                    class="cursor-pointer p-3 duration-300 hover:bg-slate-200"
                    :class="{ 'bg-slate-200': overlayIndex === index }"
                >
                    {{ item.value }}
                </li>
                <li class="p-3" v-if="!searchSuggestions.length">
                    No Data Available
                </li>
            </ul>
        </div>
    </Teleport>

    <!-- #endregion -->
</template>

<script setup>
import { computed, nextTick, provide, ref } from "vue";

//definitions
const props = defineProps({
    clearable: Boolean,
    items: Array,
    appendable: Boolean,
});

const emits = defineEmits(["remove", "add", "addItem"]);

const input = ref("");
const isInputFocus = ref(false);
const isInsideOverlay = ref(false);
const model = defineModel({ default: [] });
const excludedSuggestions = ref(JSON.parse(JSON.stringify(model.value)));

const inputElement = ref(null);
const parentElement = ref(null);
const overlayElement = ref(null);
const overlayIndex = ref(0);

//provide
provide("clearable", props.clearable);

//derives
const excludedSuggestionsComputed = computed(() => {
    if (!excludedSuggestions.value.length) return props.items;

    return props.items.filter((e) => {
        return !excludedSuggestions.value.find((f) => +f.id === +e.id);
    });
});

const searchSuggestions = computed(() => {
    if (input.value.trim() === "") return excludedSuggestionsComputed.value;

    return excludedSuggestionsComputed.value.filter((e) => {
        return e.value.toLowerCase().includes(input.value.toLowerCase());
    });
});

// #region methods
const handleAddItem = () => {
    const item = searchSuggestions.value.at(overlayIndex.value) || {
        id: Math.random(),
        value: input.value,
    };
    if (!props.appendable && !item) {
        return;
    }

    emits("add", item);
    handleAddSuggestion(item);

    input.value = "";
};

const handleRemoveItem = (item) => {
    if (!props.clearable) return;
    emits("remove", item);
    const removeItem = model.value.findIndex((e) => +e.id === +item.id);
    model.value.splice(removeItem, 1);

    excludedSuggestions.value = excludedSuggestions.value.filter(
        (e) => +e.id !== +item.id,
    );
};

const handleAddSuggestion = (item) => {
    emits("addItem", item);
    model.value.push(item);
    excludedSuggestions.value.push(item);

    handleFocusOnInput();
};

const positionOverlay = () => {
    const parentRect =
        parentElement.value.chipgroupElement.getBoundingClientRect();

    overlayElement.value.style.top = parentRect.top + parentRect.height + "px";
    overlayElement.value.style.left = parentRect.left + "px";
    overlayElement.value.style.width = parentRect.width + "px";
};

const handleOverlayKeydown = (event) => {
    if (event.code === "ArrowUp") {
        if (overlayIndex.value > 0) {
            overlayIndex.value -= 1;
        } else
            overlayIndex.value = excludedSuggestionsComputed.value.length - 1;
    } else if (event.code === "ArrowDown") {
        if (overlayIndex.value < excludedSuggestionsComputed.value.length - 1)
            overlayIndex.value += 1;
        else overlayIndex.value = 0;
    } else if (event.code === "Backspace") {
        if (!input.value.length) {
            const item = model.value.at(model.value.length - 1);
            handleRemoveItem(item);
        }
    }
};

const handleInputFocus = async () => {
    isInputFocus.value = true;

    await nextTick();

    positionOverlay();

    window.addEventListener("scroll", positionOverlay);
    window.addEventListener("resize", positionOverlay);
};

const handleInputBlur = () => {
    if (!isInsideOverlay.value) {
        isInputFocus.value = false;
        isInsideOverlay.value = false;
    }

    window.removeEventListener("scroll", positionOverlay);
    window.removeEventListener("resize", positionOverlay);
};

const handleFocusOnInput = () => {
    inputElement.value.focus();
};
//endregion methods

//hooks
// onMounted(() => {
//     if (overlayElement.value)
//         window.addEventListener("scroll", positionOverlay);
//     window.addEventListener("resize", positionOverlay);
// });

// onBeforeUnmount(() => {
//     window.removeEventListener("scroll", positionOverlay);
//     window.removeEventListener("resize", positionOverlay);
// });
</script>

<style lang="scss" scoped></style>
