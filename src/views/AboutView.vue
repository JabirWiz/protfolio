<script setup lang="ts">
  import { useMouseInElement, useResizeObserver } from "@vueuse/core";
  import { reactive, ref, useTemplateRef, watch } from "vue";

  import { useScroll } from "@vueuse/core";

  const { isScrolling } = useScroll(window);

  const circleGrndt = useTemplateRef("circle-grdnt");
  const target = ref(null);
  const body = document.getElementsByTagName("body")[0];

  console.log(body);

  const { x, y, isOutside } = useMouseInElement(body);
  const mouse = reactive(useMouseInElement(body));

  watch(mouse, () => {
    console.log(window.scrollY);
    console.log(mouse.x);
    // console.log(mouse.y);
    // console.log(window.innerWidth);
    // console.log(isScrolling.value);
    if (!circleGrndt.value || window.innerWidth < 1024 || isScrolling.value) return;
    circleGrndt.value.style.background = `radial-gradient(600px at ${mouse.x}px ${mouse.y - window.scrollY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  watch(isScrolling, () => {
    if (!isScrolling.value && circleGrndt.value && window.innerWidth >= 1024) circleGrndt.value.style.background = `radial-gradient(600px at ${mouse.x}px ${mouse.y - window.scrollY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  useResizeObserver(body, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    if (!circleGrndt.value) return;
    circleGrndt.value.style.background = `radial-gradient(600px at 382px 763px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  window.addEventListener("scroll", (e) => {
    isScrolling.value = true;
  });
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none fixed inset-0 z-30 transition duration-300 h-lvh" ref="circle-grdnt" style="background: radial-gradient(600px at 382px 763px, rgba(29, 78, 216, 0.15), transparent 80%)"></div>
    <div class="container mx-auto px-4 text-white">
      <div class="lg:flex lg:gap-4 lg:justify-between min-h-screen">
        <div class="about flex flex-col gap-3 lg:sticky lg:w-1/2 lg:py-24 pt-16 lg:top-0 lg:max-h-screen lg:justify-between">
          <div class="flex flex-col gap-3">
            <h1 class="text-4xl sm:text-5xl font-Inter-bold">Muhammed Jabir</h1>
            <h3 class="text-xl font-Inter">Developer</h3>
            <p class="font-Inter text-slate-400">Building robust web solutions with precision and flair.</p>
          </div>

          <ol class="flex gap-5 mt-5">
            <li>
              <a href="https://github.com/JabirWiz" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="github w-6 h-6 text-slate-400 hover:text-white transition" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muhammed-jabir-59507b203" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="linkedin w-6 h-6 text-slate-400 hover:text-white transition" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jabir.wiz/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="instagram w-6 h-6 text-slate-400 hover:text-white transition" viewBox="0 0 16 16">
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>

        <div class="lg:w-1/2 lg:py-24 py-16">
          <h4 class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm z-20">About</h4>
          <section class="text-slate-400 mb-24">
            <p class="mb-4">I'm a passionate Full-Stack Web Developer with a background in creating dynamic and scalable web applications. With experience in front-end frameworks like Vue and Nuxt, and back-end technologies like Laravel and Firebase, I enjoy turning complex problems into efficient solutions. I thrive in collaborative environments and have a strong focus on delivering high-quality, user-centric products.</p>
            <p class="mb-4">I hold a Bachelor of Computer Application (BCA) degree and have honed my technical expertise through various projects across multiple industries. My stack includes Vue, Nuxt, JavaScript, TypeScript, Firebase, Google Cloud, Laravel, and PHP. I’m particularly passionate about building seamless user experiences and ensuring robust performance on both the client and server side.</p>
            <p class="mb-4">Beyond coding, I enjoy diving into immersive stories through reading and gaming, as they fuel my creativity and problem-solving skills.</p>
          </section>

          <h4 class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm z-20">Experience</h4>
          <section>
            <ol>
              <li class="mb-12">
                <a href="https://logicwheel.com/" target="_blank" class="grid gap-4 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">2022 — 2025</header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Full-Stack Developer · logicWheel</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">At LogicWheel, I developed web applications by seamlessly integrating the frontend and backend. I worked on building intuitive, user-friendly interfaces while ensuring efficient communication between the client-side and server-side, resulting in high-performance, scalable web solutions.</p>
                    <ul class="mt-4 text-sm flex flex-wrap gap-2">
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">JavaScript</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">TypeScript</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Vue</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Nuxt</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Laravel</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">PHP</li>
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Flutter</li> -->
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">TailwindCSS</li>
                    </ul>
                  </div>
                </a>
              </li>

              <li class="mb-12">
                <a href="https://www.silverhost.in/" target="_blank" class="grid gap-4 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">2021 — 2022</header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Front-End Developer · Silverhost</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">As a front-end developer at Silverhost, I specialized in creating beautiful and interactive websites using HTML, CSS, JavaScript, jQuery, and Bootstrap. I focused on delivering responsive, mobile-first designs that enhance user experience across all devices, while maintaining efficient performance and compatibility across different browsers.</p>
                    <ul class="mt-4 text-sm flex flex-wrap gap-2">
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">HTML</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">CSS</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">JavaScript</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">jQuery</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Bootstrap</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">WordPress</li>
                    </ul>
                  </div>
                </a>
              </li>
            </ol>
          </section>

          <h4 class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm z-20">Projects</h4>
          <section>
            <ol>
              <li class="mb-12">
                <a href="https://www.archeme.com/" target="_blank" class="grid gap-6 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">
                    <img src="../assets/images/archemeenergylogo.svg" alt="" class="p-8 bg-white rounded-md my-2" />
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Archeme</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">Leveraging jQuery, HTML, CSS, and Bootstrap, I developed a fully responsive website with an emphasis on clean, modern design and interactive functionality. By utilizing jQuery for dynamic content and Bootstrap for a flexible, mobile-first framework, I ensured that the website delivers a seamless user experience across various devices and browsers.</p>
                  </div>
                </a>
              </li>

              <li class="mb-12">
                <a href="https://sanshoppy.com/" target="_blank" class="grid gap-6 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">
                    <img src="../assets/images/sanshoppy.svg" alt="" class="p-8 bg-white rounded-md my-2" />
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Snashoppy</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">Leveraging Vue.js for the frontend and Firebase for the backend, I developed a highly responsive and dynamic e-commerce platform. Vue.js facilitated efficient component-based development and an intuitive user interface, while Firebase provided a scalable backend with real-time database functionality, user authentication, and secure data management. This combination ensured seamless browsing, product management, and checkout processes, creating a modern, secure, and high-performance e-commerce platform optimized for scalability and user engagement.</p>
                  </div>
                </a>
              </li>
            </ol>
          </section>

          <p class="font-Inter-light text-slate-400 mt-24">Inspired by <a href="https://brittanychiang.com/" class="text-white">Brittany Chiang</a> Built with vue.js and Tailwind CSS, deployed with Firebase.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
