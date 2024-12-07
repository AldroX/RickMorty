/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        emerald:'#11998E',
        rickBlue:'#00B1CA',
      },
      backgroundImage:{
        'heroRick': "url('/assets/img/morty.jfif')"
      },
      container:{
        center:true,
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

