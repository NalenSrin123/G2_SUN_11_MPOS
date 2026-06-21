<template>
  <section class="w-full h-full ">
    <div class="h-full w-full gap-1 m-auto lg:flex md:grid">
      <div class="lg:w-[25%] w-full p-3">
        <div
          class="lg:h-[60%] w-full border bg-zinc-100 border-zinc-400 rounded p-5 flex flex-col justify-between"
        >
          <div class="flex flex-col items-center">
            <div class="relative w-28 h-28">
              <img
                class="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                src="https://i.pinimg.com/736x/b9/06/07/b90607646719878ac588fcbe6b3b46db.jpg"
                alt="Profile Picture"
              />

              <button
                class="absolute bottom-0 outline-hidden right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full border-2 border-white shadow-lg flex items-center justify-center w-8 h-8 transition-colors text-xs"
              >
                <i class="fa-solid fa-pen"></i>
              </button>
            </div>

            <div class="mt-3 text-center">
              <h1 class="font-semibold text-base text-zinc-800">Jakma Boy</h1>
              <p class="text-xs text-zinc-500">General Manager</p>
            </div>
          </div>

          <div class="w-full m-auto mt-2">
            <form action="" class="space-y-3">
              <div>
                <label
                  class="text-[11px] tracking-wider font-bold text-zinc-500 block mb-1"
                  for="fullname"
                  >FULL NAME</label
                >
                <input
                  id="fullname"
                  class="border bg-zinc-200 text-sm w-full px-3 py-2 border-zinc-400 outline-none rounded focus:bg-white focus:border-blue-500 transition-colors"
                  type="text"
                  placeholder="JakMa Boy"
                />
              </div>
              <div>
                <label
                  class="text-[11px] tracking-wider font-bold text-zinc-500 block mb-1"
                  for="email"
                  >EMAIL ADDRESS</label
                >
                <input
                  id="email"
                  class="border text-sm w-full bg-zinc-200 px-3 py-2 border-zinc-400 outline-none rounded focus:bg-white focus:border-blue-500 transition-colors"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
            </form>

            <div class="text-white mt-4">
              <button
                class="rounded shadow shadow-blue-900/30 hover:bg-blue-700 active:scale-95 transition-all w-full py-2 text-sm font-medium bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div
          class="lg:h-[40%] mt-5 border border-zinc-500 bg-zinc-100 rounded py-7 px-4"
        >
          <div class="flex gap-1 items-center">
            <span class="text-blue-600">
              <i class="fas fa-shield-alt text-lg text-blue-600"></i>
            </span>
            <h1 class="text-lg font-sans">Security</h1>
          </div>
          <div
            class="flex justify-center rounded items-center gap-3 py-2 px-1 mt-8"
          >
            <button
              @click="handleChangePassword"
              class="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-xl transition-all duration-200 hover:border-gray-300 focus:outline-none group"
            >
              <div class="flex items-center gap-3">
                <i class="fas fa-lock text-blue-600 text-center"></i>
                <span class="text-sm font-semibold text-gray-700"
                  >Change Password</span
                >
              </div>
              <i
                class="fas fa-chevron-right text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform"
              ></i>
            </button>
          </div>
          <div
            class="flex justify-between items-center w-[99%] border rounded-xl border-gray-300 bg-white gap-3 py-3 px-3 mt-4 mb-10"
          >
            <div class="flex items-center gap-3">
              <i class="fas fa-user-shield text-blue-600 text-center"></i>
              <span class="text-sm font-semibold text-slate-600"
                >Two-Factor Auth</span
              >
            </div>
            <button
              @click="isTwoFactorEnabled = !isTwoFactorEnabled"
              type="button"
              :class="isTwoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              :aria-checked="isTwoFactorEnabled"
            >
              <span
                :class="isTwoFactorEnabled ? 'translate-x-5' : 'translate-x-0'"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>

      <div class="md:w-[97%] lg:w-[70%] w-full p-3">
        <div
          class="border border-zinc-400 lg:h-[60%] md:h-[60%] h-[50%] bg-zinc-100 rounded overflow-auto"
        >
          <div class="bg-blue-900 p-5">
            <h1 class="text-xl font-bold text-white">Restaurant Profile</h1>
            <p class="text-sm mt-2 text-zinc-300">
              Manage your business information and public presence
            </p>
          </div>
          <div class="p-3 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div class="w-full px-2 mt-3">
              <form action="">
                <label for="" class="text-xs font-semibold text-zinc-600"
                  >BUSINESS NAME</label
                >
                <input
                  class="border mb-4 border-zinc-500 mt-3 bg-zinc-200 focus:bg-white focus:border-blue-500 outline-hidden transition-colors rounded-md p-2 w-full"
                  type="text"
                  value="The Web Design"
                />
                <label for="" class="text-xs font-semibold text-zinc-600"
                  >CUISINE TYPE</label
                >
                <select
                  name=""
                  id=""
                  class="border w-full mb-4 mt-1 p-2 focus:bg-white focus:border-blue-500 outline-hidden rounded-md border-zinc-500 bg-zinc-200 transition-colors"
                >
                  <option value="">Modern European</option>
                </select>
                <label for="" class="text-xs font-semibold text-zinc-600"
                  >BUSINESS PHONE</label
                >
                <input
                  class="border p-2 mb-2 mt-1 focus:bg-white outline-hidden rounded-md border-zinc-500 w-full bg-zinc-200 focus:border-blue-500 transition-colors"
                  type="text"
                  value="+885()"
                />
              </form>
            </div>
            <div class="w-full mt-3">
              <div class="flex items-center gap-2">
                <span class="text-blue-500">
                  <i class="fa-regular fa-clock"></i>
                </span>
                <h1 class="text-sm text-blue-500 font-semibold">
                  OPERATING HOURS
                </h1>
              </div>
              <hr class="mt-1 h-0.5 bg-zinc-300 text-zinc-200" />
              <div class="mt-4">
                <h1 class="text-blue-400 font-semibold">Mon -- Friday</h1>
                <div
                  class="mt-2 text-zinc-400 flex gap-3 justify-center items-center"
                >
                  <button
                    class="border py-1 px-2 w-[45%] text-sm md:text-md text-black rounded border-zinc-400 bg-zinc-200"
                  >
                    10:10Am
                  </button>
                  to
                  <button
                    class="border py-1 px-1 w-[40%] text-sm md:text-md text-black rounded border-zinc-400 bg-zinc-200"
                  >
                    10:10Pm
                  </button>
                  <span class="text-sm">
                    <i class="fa-regular fa-clock"></i>
                  </span>
                </div>
                <div class="mt-2 text-zinc-400">
                  <h1 class="text-blue-400 font-semibold">Saturday</h1>
                  <div class="mt-2 flex gap-3 justify-center items-center">
                    <button
                      class="border py-1 px-2 text-sm md:text-md w-[45%] text-black rounded border-zinc-400 bg-zinc-200"
                    >
                      12:10Am
                    </button>
                    to
                    <button
                      class="border py-1 px-2 text-sm md:text-md w-[45%] text-black rounded border-zinc-400 bg-zinc-200"
                    >
                      10:10Pm
                    </button>
                  </div>
                  <div
                    class="mt-5 w-full bg-red-100/30 p-2 rounded lg:flex justify-between items-center"
                  >
                    <h1 class="text-red-500 px-2 text-sm font-semibold">
                      Sunday
                    </h1>
                    <p class="text-red-400 text-xs px-2 mt-2 lg:mt-0 font-mono">
                      Closed for Maintenance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mt-5 lg:h-[40%] md:h-[40%]">
          <div class="w-full h-full grid md:grid-cols-2 grid-cols-1 gap-5">
            <div
              class="rounded w-full h-full border border-zinc-400 bg-zinc-100 p-4"
            >
              <AlertSettings />
            </div>
            <div class="rounded w-full border border-zinc-400 bg-zinc-100 p-4">
              <SystemStatus />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import AlertSettings from "./AlertSettings.vue";
import SystemStatus from "./SystemStatus.vue";
const isTwoFactorEnabled = ref(true);
const handleChangePassword = () => {
  console.log("Navigate to change password page or open modal");
};
</script>
