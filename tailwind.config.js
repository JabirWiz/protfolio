/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    // fontFamily: {
    //   ExpletusSans: 'ExpletusSans-Regular',
    //   Exo: 'Exo-Regular'
    // },
    extend: {
      fontFamily: {
        // 'sans': ['Exo-Regular', 'Helvetica', 'Arial', 'sans-serif']
        // 'Exo': ['Exo']
        // 'Inter': ['Inter', 'Inter-bold', 'inter-thin', 'inter-light'],
        Inter: ["Inter"],
        "Inter-bold": ["Inter-bold"],
        "Inter-light": ["Inter-light"],
        "Inter-thin": ["Inter-thin"],
      },
    },
  },
  plugins: [],
};
