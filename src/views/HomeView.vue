<script setup lang="ts">
  import { useMouseInElement, useResizeObserver } from "@vueuse/core";
  import { onMounted, reactive, ref, useTemplateRef, watch } from "vue";

  import { useScroll } from "@vueuse/core";
  import Github from "@/components/icons/github.vue";
  import Linkedin from "@/components/icons/linkedin.vue";
  import Instagram from "@/components/icons/instagram.vue";
  import StackOverflow from "@/components/icons/stackOverflow.vue";

  const { isScrolling } = useScroll(window);

  const circleGrndt = useTemplateRef("circle-grdnt");
  const target = ref(null);
  const section = ref("about-sec");
  const body = document.getElementsByTagName("body")[0];

  // console.log(body);

  const { x, y, isOutside } = useMouseInElement(body);
  const mouse = reactive(useMouseInElement(body));

  watch(mouse, () => {
    if (!circleGrndt.value || window.innerWidth < 1024 || isScrolling.value) return;
    circleGrndt.value.style.background = `radial-gradient(600px at ${mouse.x}px ${mouse.y - window.scrollY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  // watch(isScrolling, () => {
  //   if (!isScrolling.value && circleGrndt.value && window.innerWidth >= 1024) circleGrndt.value.style.background = `radial-gradient(600px at ${mouse.x}px ${mouse.y - window.scrollY}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  // });

  useResizeObserver(body, (entries) => {
    const entry = entries[0];
    const { width, height } = entry.contentRect;
    if (!circleGrndt.value) return;
    circleGrndt.value.style.background = `radial-gradient(600px at 100px 100px, rgba(29, 78, 216, 0.15), transparent 80%)`;
  });

  window.addEventListener("scroll", (e) => {
    isScrolling.value = true;
  });

  onMounted(() => {
    const about: any = document.querySelector("#about-sec");
    const experience: any = document.querySelector("#experience-sec");
    const projects: any = document.querySelector("#projects-sec");
    // console.log("myDiv", about);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log("entry", entry.target.id);
            section.value = entry.target.id;
            // console.log("The div is now visible!");
          } else {
            // console.log("The div is hidden.");
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(projects);
    observer.observe(experience);
    observer.observe(about);

    section.value = 'about-sec'
  });
</script>

<template>
  <div class="relative">
    <div class="pointer-events-none fixed inset-0 z-30 transition-all duration-300 h-lvh" ref="circle-grdnt" style="background: radial-gradient(600px at 100px 100px, rgba(29, 78, 216, 0.15), transparent 80%)"></div>
    <div class="container max-w-screen-xl mx-auto px-6 md:px-12 xl:px-24 text-white">
      <div class="lg:flex lg:gap-4 lg:justify-between min-h-screen">
        <div class="about flex flex-col gap-3 lg:sticky lg:w-1/2 lg:py-24 pt-10 sm:pt-16 lg:top-0 lg:max-h-screen lg:justify-between">
          <div class="flex flex-col gap-3">
            <h1 class="text-4xl sm:text-5xl font-Inter-bold">Muhammed Jabir</h1>
            <h3 class="text-xl font-Inter">Developer</h3>
            <p class="font-Inter text-slate-400">
              Passionate about writing clean code <br />
              that solves real-world problems and powers business growth.
              <!-- Building robust web solutions <br />
              with precision and flair. -->
            </p>

            <div class="hidden lg:flex gap-4 flex-col mt-10">
              <!-- {{ section }} -->
              <a href="#about" :class="{ 'opacity-40': section != 'about-sec' }" class="text-left uppercase font-medium text-sm flex gap-4 items-center w-max hover:opacity-100">
                <span :class="{ 'w-14 ': section == 'about-sec', 'w-8': section != 'about-sec' }" class="border block h-0 border-slate-400 transition-all rounded-full"></span>
                About
              </a>
              <a href="#experience" :class="{ 'opacity-40': section != 'experience-sec' }" class="text-left uppercase font-medium text-sm flex gap-4 items-center w-max hover:opacity-100">
                <span :class="{ 'w-14': section == 'experience-sec', 'w-8': section != 'experience-sec' }" class="border block h-0 border-slate-400 transition-all rounded-full"></span>
                Experience
              </a>
              <a href="#projects" :class="{ 'opacity-40': section != 'projects-sec' }" class="text-left uppercase font-medium text-sm flex gap-4 items-center w-max hover:opacity-100">
                <span :class="{ 'w-14': section == 'projects-sec', 'w-8': section != 'projects-sec' }" class="border block h-0 border-slate-400 transition-all rounded-full"></span>
                Projects
              </a>
            </div>

            <!-- <div class="grid-cols-3 w-max gap-x-12 gap-y-16 my-16 hidden">
              <Vue class="w-20 h-20" />
              <Nuxt class="w-20 h-20" />
              <Laravel class="w-20 h-20" />
              <Php class="w-20 h-20" />
              <Js class="w-20 h-20" />
              <Ts class="w-20 h-20" />
              <React class="w-20 h-20" />
              <Flutter class="w-20 h-20" />
              <Sqlite class="w-20 h-20" />
              <Mysql class="w-20 h-20" />
              <Firebase class="w-20 h-20" />
              <Tailwind class="w-20 h-20" />
            </div> -->
          </div>

          <ol class="flex gap-5 mt-5">
            <li>
              <a href="https://github.com/JabirWiz" target="_blank"><Github class="w-6 h-6 text-slate-400 hover:text-emerald-300 transition" /></a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muhammed-jabir-59507b203" target="_blank"><Linkedin class="w-6 h-6 text-slate-400 hover:text-emerald-300 transition" /></a>
            </li>
            <li>
              <a href="https://www.instagram.com/jabir.wiz/" target="_blank"><Instagram class="w-6 h-6 text-slate-400 hover:text-emerald-300 transition" /></a>
            </li>
            <li>
              <a href="https://stackoverflow.com/users/19459062/jabir" target="_blank"><StackOverflow class="w-6 h-6 text-slate-400 hover:text-emerald-300 transition" /></a>
            </li>
          </ol>
        </div>

        <div class="lg:w-1/2 lg:py-24 py-16">
          <h4 id="about" class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none z-20 mb-2">About</h4>
          <section id="about-sec" class="text-slate-400 mb-24 lg:mb-32">
            <p class="mb-4">I'm a passionate Full-Stack Web Developer with a background in creating dynamic and scalable web applications. With experience in front-end frameworks like <a href="https://vuejs.org/" target="_blank">Vue</a> and <a href="https://nuxt.com/" target="_blank">Nuxt</a>, and back-end technologies like <a href="https://laravel.com/" target="_blank">Laravel</a> and <a href="https://firebase.google.com/" target="_blank">Firebase</a> , I enjoy turning complex problems into efficient solutions. I thrive in collaborative environments and have a strong focus on delivering high-quality, user-centric products.</p>
            <p class="mb-4">
              Throughout my career, I have had the opportunity to work on a variety of projects, from developing responsive e-commerce platforms to creating engaging and visually appealing websites. My experience with <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">HTML</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">CSS</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">JavaScript</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, <a href="https://www.php.net/" target="_blank">PHP</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>, enables me to deliver high-performance web solutions that prioritize both aesthetics and functionality. I believe
              in the importance of a mobile-first design approach, ensuring every project I work on performs optimally across all devices.
            </p>
            <p class="mb-4">Outside of development, I enjoy reading and gaming, activities that help fuel my creativity and problem-solving skills. I am constantly seeking new challenges and opportunities to grow, both personally and professionally, and I am excited to bring my expertise and enthusiasm for web development to forward-thinking projects.</p>
          </section>

          <h4 id="experience" class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none z-20 mb-2">Experience</h4>
          <section id="experience-sec" class="mb-24 lg:mb-32">
            <ol>
              <li class="mb-12">
                <a href="https://kbcinc.cloud/" target="_blank" class="grid gap-4 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-xs">
                    <!-- JAN 2025 — <br />
                    NOW -->
                    2025 — NOW
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Vue Developer · Knowledge Bridge Consulting Inc.</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">
                      During my time at KBC, I developed and maintained scalable web applications using Vue.js 2 & 3 and Nuxt.js, delivering both server-side rendered and single-page application experiences. I built responsive, accessible UI components with Vuetify to ensure a consistent look and feel across multiple product modules. Working closely with the API and backend teams, I integrated RESTful APIs into the frontend, handling data fetching, error states, and dynamic data presentation connected to database-driven endpoints. I also managed application state and routing using Pinia and Vue Router across complex multi-page flows, and actively contributed to agile ceremonies including sprint planning, code reviews, and cross-team technical discussions.
                    </p>
                    <ul class="mt-4 text-sm flex flex-wrap gap-2">
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Vue</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">JavaScript</li>
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">TypeScript</li> -->
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Nuxt</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Vuetify</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Bootstrap</li>
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">PHP</li> -->
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">Flutter</li> -->
                    </ul>
                  </div>
                </a>
              </li>

              <li class="mb-12">
                <a href="https://logicwheel.com/" target="_blank" class="grid gap-4 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-xs">
                    <!-- MAY 2022 — <br />
                    JAN 2025 -->
                    2022 — 2025
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition">Full-Stack Developer · logicWheel</h5>
                    <p class="font-Inter-light text-slate-400 mt-2">At LogicWheel, I developed web applications by seamlessly integrating the frontend and backend. I worked on building intuitive, user-friendly interfaces while ensuring efficient communication between the client-side and server-side, resulting in high-performance, scalable web solutions.</p>
                    <ul class="mt-4 text-sm flex flex-wrap gap-2">
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Vue</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Nuxt</li>
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">JavaScript</li> -->
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">TypeScript</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Laravel</li>
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">PHP</li> -->
                      <!-- <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Flutter</li> -->
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Tailwind CSS</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Firebase</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">GCP</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Node JS</li>
                      <li class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Express JS</li>
                    </ul>
                  </div>
                </a>
              </li>

              <li class="mb-12">
                <a href="https://www.silverhost.in/" target="_blank" class="grid gap-4 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-xs">
                    <!-- OCT 2021 — <br />
                    FEB 2022 -->
                    2021 — 2022
                  </header>
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

          <h4 id="projects" class="font-Inter-bold text-xl text-white sticky top-0 lg:static py-4 bg-slate-900/50 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none z-20">Projects</h4>
          <section id="projects-sec" class="mb-24 lg:mb-32">
            <p class="font-Inter-light text-slate-400 mb-14">Throughout my career, I have successfully delivered a variety of complex solutions. While much of my recent work involves proprietary internal platforms for private stakeholders, the following projects serve as a representative sample of my technical capabilities and architectural approach</p>
            <ol>
              <li class="mb-12">
                <a href="https://www.archeme.com/" target="_blank" class="grid gap-6 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">
                    <img src="../assets/images/archemeenergylogo.svg" alt="" class="p-6 lg:p-2 bg-white rounded-md my-2 hidden sm:block h-28" />
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition mb-2">Archeme</h5>
                    <img src="../assets/images/archemeenergylogo.svg" alt="" class="p-4 bg-white rounded-md my-2 sm:hidden float-start w-40 h-28 mr-6" />
                    <p class="font-Inter-light text-slate-400 mt-2">Leveraging jQuery, HTML, CSS, and Bootstrap, I developed a fully responsive website with an emphasis on clean, modern design and interactive functionality. By utilizing jQuery for dynamic content and Bootstrap for a flexible, mobile-first framework, I ensured that the website delivers a seamless user experience across various devices and browsers.</p>
                  </div>
                </a>
              </li>

              <li class="mb-12">
                <a href="https://sanshoppy.com/" target="_blank" class="grid gap-6 sm:grid-cols-8 group relative">
                  <div class="absolute -inset-x-4 -inset-y-4 -z-50 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header class="tracking-wide sm:col-span-2 text-slate-400 text-sm">
                    <img src="../assets/images/sanshoppy.svg" alt="" class="p-6 lg:p-2 bg-white rounded-md my-2 hidden sm:block h-28" />
                  </header>
                  <div class="sm:col-span-6">
                    <h5 class="text-white font-Inter-bold text-lg group-hover:text-emerald-300 transition mb-2">Snashoppy</h5>
                    <img src="../assets/images/sanshoppy.svg" alt="" class="p-4 bg-white rounded-md my-2 sm:hidden float-start w-40 h-28 mr-6" />
                    <p class="font-Inter-light text-slate-400 mt-2">Vue.js for the frontend and Firebase for the backend, I developed a highly responsive and dynamic e-commerce platform. Vue.js facilitated efficient component-based development and an intuitive user interface, while Firebase provided a scalable backend with real-time database functionality, user authentication, and secure data management. This combination ensured seamless browsing, product management, and checkout processes, creating a modern, secure, and high-performance e-commerce platform optimized for scalability and user engagement.</p>
                  </div>
                </a>
              </li>
            </ol>
          </section>

          <p class="font-Inter-light text-slate-400">Inspired by <a href="https://brittanychiang.com/" target="_blank" class="text-white">Brittany Chiang</a>'s portfolio, Developed using <a href="https://vuejs.org/" target="_blank">Vue.js</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> for a responsive and modular design, and deployed on <a href="https://firebase.google.com/" target="_blank">Firebase</a>.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }

  body {
    background: #0f172a;
    /* overflow: hidden; */
  }
  a {
    color: #fff;
    transition-duration: 300ms;
  }
  a:hover {
    color: #6ee7b7;
  }
  .cls-1 {
    fill: none;
    stroke: #000000;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .animate-ping {
    animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  @keyframes ping {
    0% {
      transform: scale(0);
    }
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }


  *::selection {
    background: #6ee7b7;
    color: #000000;
  }
  *::-moz-selection {
    background: #6ee7b7;
    color: #000000;
  }
  *::-webkit-selection {
    background: #6ee7b7;
    color: #000000;
  }
</style>
