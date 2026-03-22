<script setup lang="ts">
  import Matter from "matter-js";
  import { onMounted, ref, useTemplateRef } from "vue";
  import colors from "tailwindcss/colors";

  //@ts-ignore
  import * as decomp from "poly-decomp";

  // console.log(decomp);

  const matterCanvas = useTemplateRef("matter-canvas");
  const innerDiv = useTemplateRef("inner-div");
  const colorsCircleDiv = useTemplateRef("colors-circle");

  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Vertices = Matter.Vertices,
    Svg = Matter.Svg,
    Composite = Matter.Composite;

  // provide concave decomposition support library
  Common.setDecomp(decomp);

  // create an engine
  var engine = Engine.create(),
    world = engine.world;

  onMounted(() => {
    if (!matterCanvas.value) return;
    matterCanvas.value.width = window.innerWidth;
    matterCanvas.value.height = window.innerHeight;

    const isMobile = detectMob();

    // create a renderer
    var render = Render.create({
      element: document.body,
      canvas: matterCanvas.value,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "",
        wireframes: false,
      },
    });

    const xCenter = window.innerWidth / 2;

    let offsets = innerDiv.value?.getBoundingClientRect();

    // create two boxes and a ground
    var circleA = Bodies.circle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 40, { angle: 40, mass: 10, angularSpeed: 100, angularVelocity: 1000 });
    var circleB = Bodies.circle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 50);
    var rectangleA = Bodies.rectangle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 40, 50);
    var rectangleB = Bodies.rectangle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 80, 80);
    var traingleA = Bodies.polygon(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 3, 50);
    var traingleB = Bodies.polygon(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 3, 40);

    var ground = Bodies.rectangle((offsets?.x ?? 0) + 192 ?? 432, (offsets?.y ?? 0) + 338 + (isMobile ? 42 : 0) ?? 475, innerDiv.value?.clientWidth ?? 210, innerDiv.value?.clientHeight ?? 100, {
      isStatic: true,
      render: { fillStyle: "red", visible: false },
      chamfer: { radius: 24 },
    });

    // add all of the bodies to the world
    // Composite.add(engine.world, [ground]);
    Composite.add(engine.world, [circleB, circleA, traingleA, traingleB, rectangleA, rectangleB, ground]);
    // Composite.add(engine.world, [boxA, boxB, ground]);
    // Composite.add(engine.world, [boxA, boxB, ground, softBody(xCenter, -180, 5, 5, 0, 0, true, 18, particleOptions)]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
  });

  setInterval(() => {
    var particleOptions = {
      friction: 0.05,
      frictionStatic: 0.2,
      render: { visible: true, lineWidth: 0 },
    };
    if (document.hasFocus()) {
      const xCenter = window.innerWidth / 2;
      var circleA = Bodies.circle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 40, { angle: 40, mass: 10, angularSpeed: 100, angularVelocity: 1000 });
      var circleB = Bodies.circle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 50);
      var rectangleA = Bodies.rectangle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 40, 50);
      var rectangleB = Bodies.rectangle(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 80, 80);
      var traingleA = Bodies.polygon(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 3, 50);
      var traingleB = Bodies.polygon(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-100, -450), 3, 40);
      // Composite.add(engine.world, [circleB, circleA, traingleA, traingleB, rectangleA, rectangleB]);
      Composite.add(engine.world, [circleB, circleA, traingleA, traingleB, softBody(xCenter + randomIntFromInterval(-300, 300), randomIntFromInterval(-450, -750), 4, 4, 0, 0, true, 18, particleOptions), rectangleA, rectangleB]);

      if (colorsCircleDiv.value) colorsCircleDiv.value.style.backgroundColor = getRandomColor();
    }
    // Composite.add(engine.world, [boxA, boxB]);
  }, 2000);

  window.addEventListener("resize", function () {
    if (!matterCanvas.value) return;
    matterCanvas.value.width = window.innerWidth;
    matterCanvas.value.height = window.innerHeight;
    Composite.clear(engine.world, false);

    const isMobile = detectMob();

    let offsets = innerDiv.value?.getBoundingClientRect();
    var ground = Bodies.rectangle((offsets?.x ?? 0) + 192 ?? 432, (offsets?.y ?? 0) + 338 + (isMobile ? 42 : 0) ?? 475, innerDiv.value?.clientWidth ?? 210, innerDiv.value?.clientHeight ?? 100, {
      isStatic: true,
      render: { fillStyle: "red", visible: false },
      chamfer: { radius: 24 },
    });
    Composite.add(engine.world, [ground]);

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
  });

  const softBody = function (xx: number, yy: number, columns: number, rows: number, columnGap: number, rowGap: number, crossBrace: boolean, particleRadius: number, particleOptions: any, constraintOptions: any = null) {
    var Common = Matter.Common,
      Composites = Matter.Composites,
      Bodies = Matter.Bodies;

    particleOptions = Common.extend({ inertia: Infinity }, particleOptions);
    constraintOptions = Common.extend({ stiffness: 0.1, render: { type: "", anchors: true, visible: false } }, constraintOptions);

    var softBody = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function (x: number, y: number) {
      return Bodies.circle(x, y, particleRadius, particleOptions);
    });

    Composites.mesh(softBody, columns, rows, crossBrace, constraintOptions);

    softBody.label = "Soft Body";

    return softBody;
  };

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomColor() {
    // var letters = "0123456789ABCDEF";
    // var color = "#";
    // for (var i = 0; i < 6; i++) {
    //   color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    // return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    return "hsl(" + 360 * Math.random() + "," + (40 + 70 * Math.random()) + "%," + (55 + 10 * Math.random()) + "%)";
  }

  function getColor() {
    return "hsl(" + 360 * Math.random() + "," + (25 + 70 * Math.random()) + "%," + (85 + 10 * Math.random()) + "%)";
  }

  function detectMob() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
</script>

<template>
  <div class="">
    <!-- <img src="../assets/svg/vue.svg" alt="" srcset=""> -->
    <canvas ref="matter-canvas" class="fixed -z-40 w-full h-dvh inset-0 bg-opacity-0"></canvas>

    <div class="flex fixed inset-0 items-center justify-center">
      <div ref="colors-circle" class="animate-colors bg-emerald-500 h-60 w-60 blur-2xl rounded-full animate-ping duration-1000"></div>
    </div>

    <div class="container mx-auto px-4 bg-slate-900">
      <div class="fixed inset-0 flex flex-col items-center justify-center">
        <div ref="inner-div" class="flex flex-col items-center justify-center bg-gray-800/60  text-white p-8 rounded-3xl mx-4 max-w-lg w-96 gap-4">
          <h1 class="text-6xl text-center font-mono">Hi, I'm Jabir</h1>
          <p class="text-xl text-center font-mono">In the realm where technology meets imagination, every project is a voyage into the unknown. As a full-stack web developer, I see my craft as a quest to explore and shape the unseen possibilities of the digital world. Through the languages of Vue, Nuxt, JavaScript, TypeScript, Firebase, Google Cloud, Laravel, and PHP, I sculpt not just code but experiences that resonate with purpose and clarity. navigating the infinite potential of the digital frontier.</p>
          <!-- <p class="font-light text-lg text-center">I'm a passionate Web Developer with a background in creating dynamic and scalable web applications. With experience in front-end frameworks like Vue and Nuxt, and back-end technologies like Laravel and Firebase, I enjoy turning complex problems into efficient solutions. I thrive in collaborative environments and have a strong focus on delivering high-quality, user-centric products.</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  body {
    background: #0f172a ;
    /* overflow: hidden; */
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
</style>
