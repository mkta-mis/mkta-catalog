import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useCategoryStore = defineStore("categories", () => {
    const categories = reactive([
        {
            id: 1,
            name: "Christmas",
            img: "/mk-images/categories/christmas.jpg",
            subCategories: [
                "Christmas Balls",
                "Christmas Characters",
                "Elves",
                "Reindeers",
                "Snowmen",
                "Gingerbreads",
                "Nutcrackers",
                "Sleighs",
                "Archways",
                "Trees",
                "Candies",
                "Photo Ops",
                "Chairs & Tables",
                "Toys",
                "Props",
                "Winter",
            ],
        },
        {
            id: 2,
            name: "Halloween",
            img: "/mk-images/categories/halloween.jpg",
            subCategories: [
                "Halloween Characters",
                "Pumpkins",
                "Skeletons",
                "Mice",
                "Scarecrows",
                "Chairs & Tables",
                "Trees",
                "Coffins",
                "Archways",
                "Photo Ops",
                "Gravestones",
                "Props",
            ],
        },
        {
            id: 3,
            name: "Easter",
            img: "/mk-images/categories/easter.jpg",
            subCategories: [
                "Easter Eggs",
                "Easter Characters",
                "Bunnies",
                "Lambs",
                "Chairs & Tables",
                "Photo Ops",
                "Archways",
                "Props",
                "Candies",
            ],
        },
        {
            id: 4,
            name: "Summer and Spring",
            img: "/mk-images/categories/summer.jpg",
            subCategories: ["Flowers", "Animals", "Food & Beverages"],
        },
        {
            id: 5,
            name: "Animals",
            img: "/mk-images/categories/animals.jpg",
            subCategories: [
                "Safari",
                "Forest",
                "Reptiles",
                "Insects",
                "Marine",
                "Farm",
                "Domestic",
                "Birds",
                "Arctic",
            ],
        },
        {
            id: 6,
            name: "Dinosaurs",
            img: "mk-images/categories/dinosaurs.jpg",
            subCategories: ["Coming soon..."],
        },
        {
            id: 7,
            name: "Pirates",
            img: "mk-images/categories/pirates.jpg",
            subCategories: [
                "Pirate Characters",
                "Chairs & Tables",
                "Crates",
                "Barrels",
                "Props",
            ],
        },
        {
            id: 8,
            name: "Wild West",
            img: "mk-images/categories/wild_west.jfif",
            subCategories: [
                "Wild West Characters",
                "Chairs & Tables",
                "Crates",
                "Barrels",
                "Hays",
                "Photo Ops",
                "Props",
            ],
        },
        {
            id: 9,
            name: "Food and Beverage",
            img: "mk-images/categories/food_and_beverages.jpg",
            subCategories: [
                "Christmas",
                "Halloween",
                "Easter",
                "Gingerbreads",
                "Food & Beverages",
                "Animals",
                "Cars",
                "Farm",
                "Pirates",
                "Wild West",
            ],
        },
        {
            id: 10,
            name: "Wall Decor",
            img: "mk-images/categories/wall_decor.jpg",
            subCategories: [
                "Animals",
                "Pre-Historic",
                "Food & Beverages",
                "Halloween",
                "Cars",
                "Medieval",
            ],
        },
        {
            id: 11,
            name: "Archways",
            img: "mk-images/categories/archways.jpg",
            subCategories: ["Christmas", "Halloween", "Easter"],
        },
        {
            id: 12,
            name: "Photo ops",
            img: "mk-images/categories/photo_ops.jpg",
            subCategories: [
                "Christmas",
                "Halloween",
                "Easter",
                "Food & Beverages",
                "All-Year",
            ],
        },
        {
            id: 13,
            name: "Comics",
            img: "mk-images/categories/comics.jpg",
            subCategories: [
                "Panda",
                "Penguins",
                "Farm Animals",
                "Photo Ops",
                "Props",
                "Play Equipments",
            ],
        },
        {
            id: 14,
            name: "Space",
            img: "mk-images/categories/space.jfif",
            subCategories: ["Aliens", "UFO", "Astronaut"],
        },
        {
            id: 15,
            name: "Statues",
            img: "mk-images/categories/statues.jpg",
            subCategories: [
                "Stones",
                "Christmas Characters",
                "Mermaids",
                "Comic Sports",
                "Celebrities",
            ],
        },
        {
            id: 16,
            name: "Inlitefi",
            img: "mk-images/inlitefi.jpg",
            subCategories: [
                "Christmas",
                "Halloween",
                "Easter",
                "Summer",
                "Animals",
                "All-Year",
            ],
        },
    ]);

    return { categories };
});