<template>
<svg height="264" viewBox="0 0 263.99999 264.00001" width="264" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(2.1491713 0 0 2.1519615 -523.60303 -415.78921)" gradientUnits="userSpaceOnUse" x1="412.40466" x2="506.13364" y1="321.27069" y2="321.27069"><stop offset="0" stop-color="#e56a34"/><stop offset="1" stop-color="#f58655"/></linearGradient><linearGradient id="b" gradientTransform="matrix(2.1491713 0 0 2.1519615 -566.58646 -415.78921)" gradientUnits="userSpaceOnUse" x1="440.87659" x2="497.90561" y1="377.36322" y2="336.88876"><stop offset="0" stop-color="#f39f77"/><stop offset="1" stop-color="#f4a681"/></linearGradient><g transform="translate(-327.15707 -175.00948)"><ellipse cx="461.98309" cy="394.20651" fill="#39a577" rx="129.17397" ry="28.802975"/><path d="m406.55479 362.93595l-12.61889-5.57039c0 0 .40706 2.44553-4.88472-6.11386-5.2918-8.55936-5.69888-33.82988-30.12251-32.47124-24.42366 1.35861-38.3994 29.07467-28.62995 29.07467 9.76947 0 16.14677-19.29255 27.95152-18.74909 11.80478.54345 17.36793 23.91189 23.20246 33.28644 5.83454 9.37456 20.48874 18.34153 20.48874 18.34153z" fill="#143047" fill-rule="evenodd"/><path d="m40.664062 0c-5.691535 0-6.830078 23.234375-6.830078 23.234375l28.947266 7.083984c.09157.251404.179688.492188.179688.492188l.917968-.224609.916016.224609c0 0 .08944-.240938.18164-.494141l28.947266-7.082031c0 0-1.138543-23.234375-6.830078-23.234375-5.691544 0-14.34375 17.929688-14.34375 17.929688 0 0-2.271257-1.76342-8.855469-1.767579-.0078-.000005-.0137 0-.02148 0-.0034 0-.0063-.000008-.0098 0-6.584226.0042-8.857422 1.767579-8.857422 1.767579.00003 0-8.650222-17.929688-14.341767-17.929688z" fill="#143047" fill-rule="evenodd" transform="matrix(2.14917155 0 0 2.15196172 327.1570413 197.00947869)"/><path d="m546.68163 245.12936l29.85106 64.39986-50.02415-42.21137z" fill="#784421" fill-rule="evenodd"/><path d="m379.86214 245.71484l-29.85107 64.39984 50.02418-42.21135z" fill="#784421" fill-rule="evenodd"/><path d="m380.0419 244.74164h165.7211v152.89339h-165.7211z" fill="url(#b)" fill-rule="evenodd"/><path d="m379.55034 244.20759h166.16114l18.45336 62.73069h-201.43961z" fill="url(#a)"/><text fill="#f4e3d7" font-family="sans-serif" font-size="72.581604" letter-spacing="0" line-height="125%" transform="scale(.99935152 1.0006489)" word-spacing="0" x="482.01678" xml:space="preserve" y="387.60495"><tspan x="482.01678" y="387.60495">{{ bodyText }}</tspan></text><text fill="#bf450e" font-family="sans-serif" font-size="17.1548996" letter-spacing="0" line-height="125%" transform="matrix(0 -1.0006489 .99935152 0 0 0)" word-spacing="0" x="-394.26129" xml:space="preserve" y="396.62497"><tspan x="-394.26129" y="396.62497">10011</tspan></text><text fill="#2b0000" font-family="sans-serif" font-size="36.87531662" letter-spacing="0" line-height="125%" word-spacing="0" x="463.65704" xml:space="preserve" y="287.55051"><tspan fill="#2b0000" font-size="36.87531662" text-anchor="middle" x="463.65704" y="287.55051">{{ headText }}</tspan></text></g></svg>
</template>

<script>
export default {
  props: {
    headText: { default: '=^.^=' },
    bodyText: { default: '#' }
  },

  methods: {
    blink () {
      var orig = this.headText
      this.headText = '-  -'
      window.setTimeout(() => {
        this.headText = orig
      }, 250)
    }
  },

  ready () {
    this.interval = window.setInterval(() => {
      this.blink()
    }, 5000)
  },

  beforeDestroy () {
    window.clearInterval(this.interval)
  }
}
</script>
