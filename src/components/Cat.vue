<template>
  <svg
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:cc="http://creativecommons.org/ns#"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:svg="http://www.w3.org/2000/svg"
     xmlns="http://www.w3.org/2000/svg"
     version="1.1"
     id="svg8550"
     viewBox="0 0 116.0334 93.729186"
     height="26.452459mm"
     width="32.747204mm">
    <defs
       id="defs8552" />
    <metadata
       id="metadata8555">
      <rdf:RDF>
        <cc:Work
           rdf:about="">
          <dc:format>image/svg+xml</dc:format>
          <dc:type
             rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
          <dc:title></dc:title>
        </cc:Work>
      </rdf:RDF>
    </metadata>
    <g
       transform="translate(-373.41188,-102.64047)"
       id="layer1">
      <path
         id="tail"
         d="m 410.35529,179.74523 -5.87151,-2.58852 c 0,0 0.1894,1.13642 -2.27284,-2.84106 -2.46225,-3.97747 -2.65166,-15.72049 -14.01587,-15.08914 -11.36422,0.63134 -17.86707,13.51078 -13.32139,13.51078 4.54569,0 7.51302,-8.9651 13.00572,-8.71256 5.49271,0.25254 8.08122,11.11167 10.796,15.46795 2.71479,4.35629 9.53332,8.52317 9.53332,8.52317 z"
         style="fill:#0e2132;" />
      <g
         style="fill:#0e2132;"
         transform="matrix(0.90149379,0,0,1,94.211086,-182.38461)"
         id="head">
        <path
           style="fill:#0e2132;"
           d="m 347.23994,308.25859 c 0,0 1.26269,-23.23351 7.57614,-23.23351 6.31346,0 15.9099,17.93021 15.9099,17.93021 0,0 2.52539,-1.76777 9.84899,-1.76777 7.32361,0 1.01015,14.64721 1.01015,14.64721 z"
           id="path4151-1-4-5-0" />
        <path
           id="path4153-5-8-5-83"
           d="m 413.89555,308.25859 c 0,0 -1.26269,-23.23351 -7.57614,-23.23351 -6.31346,0 -15.9099,17.93021 -15.9099,17.93021 0,0 -2.52539,-1.76777 -9.84899,-1.76777 -7.32361,0 -1.01015,14.64721 -1.01015,14.64721 z"
           style="fill:#0e2132;" />
      </g>
      <g
         id="whole_box"
         transform="translate(127.85715,-182.08034)">
        <path
           id="path4161-1-1-5-6"
           d="m 347.69855,307.08176 13.88957,29.92612 -23.27602,-19.6153 z"
           style="fill:#784421;" />
        <path
           style="fill:#784421;"
           d="m 270.07817,307.35383 -13.88957,29.92611 23.27603,-19.61529 z"
           id="path4159-3-8-6-3" />
        <rect
           style="fill:#da9f77;stroke:#784421;stroke-width:1;stroke-miterlimit:4;"
           id="box"
           width="77.109299"
           height="71.048386"
           x="270.16174"
           y="306.90161" />
        <path
           style="fill:#bc6a34;stroke:#784421;stroke-width:1;stroke-miterlimit:4;"
           d="m 269.93309,306.65342 77.31405,0 8.58627,29.15047 -93.72897,0 z"
           id="rect3349-4-1-2-71" />
      </g>
      <text
         id="head_text"
         y="145"
         x="436"
         xml:space="preserve"><tspan
           style="font-size:19px;text-align:center;text-anchor:middle;fill:#2b0000"
           y="145.31018"
           x="436.35196"
           id="tspan5498-8-9">{{ headText }}</tspan></text>
      <text
         id="body_text"
         y="186"
         x="436"
         style="font-size:33px;fill:#f4e3d7;"
         xml:space="preserve"><tspan
           style="text-align:center;text-anchor:middle"
           y="186.60272"
           x="436.91415"
           id="tspan5498-2-4">{{ bodyText }}</tspan></text>
    </g>
  </svg>
</template>

<script>
export default {
  props: [
    'head-text',
    'body-text'
  ],

  data () {
    return {
      headText: '=^.^=',
      bodyText: 'Hi.'
    }
  }
}
</script>
