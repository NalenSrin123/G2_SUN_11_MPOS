<template>
    <div class="fixed top-0 w-full flex z-50 bg-white h-14 items-center justify-between px-4 shadow-sm">
        <i class="fa-solid fa-arrow-left text-blue-500 text-lg"></i>
        <h1 class="text-xl font-semibold text-blue-500">Mazarkaberk</h1>
        <i class="fa-regular fa-bell text-lg"></i>
    </div>
    <div class="md:h-237.5 bg-blue-100/50 mt-14">
        <div class="relative shadow-md h-60 md:h-80 w-full overflow-hidden">
            <img class="h-full w-full object-cover" src="https://i.pinimg.com/736x/31/9a/05/319a05ad3a2868bd0f42bcdfdb4d17ba.jpg" alt="Beef">
            <div class="absolute top-4 right-4 rounded-full text-white px-4 py-1 bg-blue-500 text-sm">
                stack beef
            </div>
        </div>

        <div class="mt-5 px-3 h-10">
            <swiper
                :modules="modules"
                :breakpoints="{
                    '320': { slidesPerView: 2.2, spaceBetween: 10 },
                    '768': { slidesPerView: 4, spaceBetween: 20 }
                }"
                class="h-full"
            >
                <swiper-slide v-for="(item, index) in items" :key="item">
                    <button 
                        @click="activeIndex = index"
                        :class="[
                            'flex justify-center items-center h-full w-full rounded-2xl px-4 transition-colors',
                            activeIndex === index 
                                ? 'bg-blue-500 border-2 border-blue-600 text-white' 
                                : 'bg-zinc-200  text-zinc-500 hover:bg-zinc-300'
                        ]"
                    >
                        {{ item }}
                    </button>
                </swiper-slide>
            </swiper>
        </div> 

        <div class="mt-9 px-3 max-w-4xl mx-auto">
            <h1 class="text-2xl font-semibold mb-2">Special Instructions</h1>
            <form @submit.prevent>
                <textarea 
                    class="h-32 w-full border border-blue-400 p-4 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                    placeholder="E.g. No Salt, allergies or sauce on the side..."
                ></textarea>
            </form>
        </div>

    </div>
    <div class="bg-blue-100/50 flex gap-2 justify-around shadow-2xl shadow-zinc-500 px-5 items-center h-25 ">
        <div class="text-xl text-gray-500 w-[30%] flex gap-5 justify-center rounded-3xl bg-gray-300/40 py-3 text-center">
            <button @click="countMinus" >-</button>
            {{ countNum }}
            <button @click="countPlus">+</button>
        </div>
        <div class="w-[60%] bg-blue-700 hover:bg-blue-800 text-white rounded-3xl py-3 text-center">
            <span>
                <i class="fa-solid fa-shop "></i>
            </span>
            add to cart
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination];
const items = ['Medium Rare', 'Medium', 'Medium Well'];
const activeIndex = ref(0); 

const countNum = ref(1)

const countPlus = () => {
    countNum.value ++;
}
const countMinus = () => {
    countNum.value--;
}
</script>