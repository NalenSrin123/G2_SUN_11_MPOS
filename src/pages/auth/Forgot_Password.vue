<template>
    <div class="w-full h-192.5  py-5 bg-zinc-100 flex justify-center items-center">
        <div class="md:w-[26%] rounded w-[85%] p-5 bg-white shadow ">
            <div class="p-5 py-auto space-y-6">
                <div class="flex gap-1 text-blue-500">
                    <span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </span>
                    <RouterLink to="">Go back</RouterLink>
                </div>
                <div class="space-y-2 mb-2">
                    <h1 class="font-semibold text-xl">Forgot password?</h1>
                    <p class="text-zinc-500">Enter your email address and we'll send you a link to reset your password.</p>
                </div>
                <div class="w-full space-y-5 mt-4">
                    <form action="" class="flex flex-col ">
                        <label for="" class="mb-1">Email Address</label>
                        <input class="border px-5 py-3 rounded outline-none border-zinc-400" type="text" placeholder="name@company.com">
                    </form>
                    <div class="space-y-5 w-full">
                        <button class="rounded w-full py-2 hover:bg-blue-800 duration-300 text-white bg-blue-600">Send reset link</button>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>