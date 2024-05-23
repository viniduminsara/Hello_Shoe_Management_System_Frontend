/** @type {import('tailwindcss').Config} */
export default {
  content: ['*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["sunset", "winter"],
  },
  safelist: [
      'badge',
      'badge-success',
      'badge-warning',
      'badge-error',
      'badge-sm',
      'alert',
      'alert-success',
      'alert-warning',
      'alert-error',
      'text-success',
      'mask',
      'mask-squircle'
  ]
}

