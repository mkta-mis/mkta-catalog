<template>
    <div class="pt-2">
        <v-heading type="h2">
            <v-icon
                v-if="$route.meta.redirectTo"
                @click="
                    () => {
                        router.push({ name: $route.meta.redirectTo });
                    }
                "
                name="la-arrow-circle-left-solid"
                scale="1.8"
            ></v-icon
            >{{ $route.meta.title }}</v-heading
        >
        <p>
            {{ $route.meta.description }}
        </p>
    </div>
    <div class="my-3">
        <v-tab
            headerClass=" bg-white"
            no-navigation
            v-model="currentTab"
            :tabs="tabs"
        >
            /*ANCHOR - Product Images */
            <template #content.ProductImages>
                <productImages />
            </template>
            /*ANCHOR - Product Categories */
            <template #content.Categories>
                <productCategories/>
            </template>
            /*ANCHOR - Components */
            <template #content.ProductComponents>
                <productComponents  />1
            </template>
            /*ANCHOR - Restriction and Exemptions */
            <template #content.ProductAccess>
                <productRestrictionExemption />
            </template>
            /*ANCHOR - NonWishlist_Customers */
            <!-- <template class="p-3" #content.NonWishlistCustomers>
                <productNonWishList  />
            </template> -->
            /*ANCHOR - Product Information */
            <template class="p-3" #content.ProdInfo>
                <div class="p-3">
                    <p>
                        A concise overview of the Product, its Dimensions, and
                        Volume and Weights
                    </p>
                    <productItemForm
                        :showTitle="false"
                        :readOnlyData="['form.id']"
                    />
                    <div>
                        <v-button
                            v-show="isValid"
                            @click="
                                async () => {
                                    await productStore.updateProductItem(id);
                                    productStore.resetForm();
                                    productStore.getProductItem(id);
                                    showInsert = false;
                                }
                            "
                            prepend-inner-icon="md-save-round"
                            class="ml-auto bg-accent text-white my-2"
                            >Update Product Item</v-button
                        >
                    </div>
                    <!-- <div>
                        <pre>{{ productStore.form }}</pre>
                    </div> -->
                </div>
            </template>
            /*ANCHOR - Related Products */
            <template class="p-3" #content.RelatedProduct>
                <relatedProduct />
            </template>
            <template class="p-3" #content.RecommendedProduct>
                <recommendedProduct  />
            </template>
            <template class="p-3" #content.ProductFilters>
                <productFilter/>
            </template>
        </v-tab>
    </div>
</template>
<script setup>
import productItemForm from "./components/productItemForm.vue";
// import productNonWishList from "./components/productNonWishList.vue";
import productRestrictionExemption from "./components/productRestrictionExemption.vue";
import productCategories from "./components/productCategories.vue";
import productComponents from "./components/productComponents.vue";
import productImages from "./components/productImages.vue";
import productFilter from "./components/productFilter.vue";


import relatedProduct from "./components/relatedProduct.vue";
import recommendedProduct from "./components/recommendedProduct.vue";
const router = inject("router");
const props = defineProps({
    id: String,
});



import { onBeforeMount, ref, watch, computed, inject, provide } from "vue";
import { storeToRefs } from "pinia";

import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();
const { product_item, form, isValid } = storeToRefs(productStore);

if (!product_item.length) {
    await productStore.getProductItem(props.id, {
        includeRelatedProducts:true,
        includeRecommendedProduct: true
    });
}

provide('productStore', productStore);
provide('product_item', product_item);



const currentTab = ref("ProdInfo");
const tabs = ref([
    {
        icon: "bi-cart4",
        iconScale: "1.5",
        title: "Information",
        value: "ProdInfo",
    },
    {
        icon: "md-category",
        iconScale: "1.5",
        title: "Categories",
        value: "Categories",
    },
    {
        icon: "fa-puzzle-piece",
        iconScale: "1.5",
        title: "Components",
        value: "ProductComponents",
    },
    {
        icon: "fa-images",
        iconScale: "1.5",
        title: "Images",
        value: "ProductImages",
    },
    // {
    //     icon: "bi-cart-x",
    //     title: "Non Wishlist Customers",
    //     iconScale: "1.5",
    //     value: "NonWishlistCustomers",
    // },
    {
        icon: "ai-closed-access",
        iconScale: "1.5",
        title: "Restriction & Exemptions",
        value: "ProductAccess",
    },
    {
        icon: "ri-node-tree",
        iconScale: "1.5",
        title: "Related Products",
        value: "RelatedProduct",
    },
    {
        icon: "la-object-group-solid",
        iconScale: "1.5",
        title: "Recommended Products",
        value: "RecommendedProduct",
    },
    {
        icon: "hi-solid-filter",
        iconScale: "1.5",
        title: "Filters",
        value: "ProductFilters",
    },
]);
</script>
