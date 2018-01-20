import { h } from 'preact'
import styled from 'styled-components'

import { toRem } from '../../helpers/styleHelpers'

const TitleWrapper = styled.div`
  margin: ${toRem(100)} 0 ${toRem(20)};
  z-index: 1;
`

const Title = ({ color = '#0b7ebc', width = 446, height = 219 }) => (
  <svg
    id="wds-logo"
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 446 219"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>logo-text</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d="M411.215,65.383 L411.877,68.761 L412.238,68.761 L412.9,65.564 L427.535,0 L445.543,0 L421.031,87.82 L403.205,87.82 L378.693,0 L396.7,0 L411.215,65.383 Z M370.684,49.278 L341.234,49.278 L341.234,74.129 L375.863,74.129 L375.863,87.82 L324.07,87.82 L324.07,0 L375.743,0 L375.743,13.752 L341.234,13.752 L341.234,35.587 L370.684,35.587 L370.684,49.278 Z M271.914,13.752 L271.914,74.129 L280.286,74.129 C285.064,74.129 288.748,72.048 291.337,67.886 C293.927,63.725 295.222,58.205 295.222,51.329 L295.222,36.431 C295.222,29.596 293.927,24.107 291.337,19.965 C288.748,15.823 285.065,13.752 280.286,13.752 L271.914,13.752 Z M254.75,87.82 L254.75,0 L281.25,0 C290.243,0 297.671,3.408 303.533,10.224 C309.394,17.039 312.326,25.816 312.326,36.552 L312.326,51.329 C312.326,62.065 309.394,70.831 303.533,77.627 C297.671,84.423 290.243,87.82 281.25,87.82 L254.75,87.82 Z M176.458,37.095 L185.913,37.095 C189.406,37.015 192.086,35.999 193.953,34.049 C195.82,32.099 196.754,29.294 196.754,25.635 C196.754,21.533 195.79,18.528 193.863,16.617 C191.936,14.706 189.025,13.752 185.131,13.752 L176.459,13.752 L176.459,37.095 L176.458,37.095 Z M176.458,49.098 L176.458,74.129 L188.563,74.129 C192.177,74.129 194.876,73.123 196.664,71.113 C198.451,69.102 199.344,66.106 199.344,62.126 C199.344,57.944 198.581,54.727 197.055,52.476 C195.53,50.224 193.08,49.098 189.708,49.098 L176.458,49.098 L176.458,49.098 Z M159.294,87.82 L159.294,0 L185.13,0 C194.164,0 201.22,2.011 206.299,6.032 C211.378,10.053 213.917,16.044 213.917,24.006 C213.917,28.188 212.994,31.898 211.147,35.134 C209.3,38.371 206.53,40.794 202.836,42.403 C207.453,43.489 210.866,45.841 213.074,49.46 C215.282,53.079 216.386,57.321 216.386,62.188 C216.386,70.591 213.987,76.965 209.189,81.308 C204.391,85.651 197.516,87.822 188.562,87.822 L159.294,87.822 L159.294,87.82 Z M145.202,49.278 L115.752,49.278 L115.752,74.129 L150.381,74.129 L150.381,87.82 L98.588,87.82 L98.588,0 L150.261,0 L150.261,13.752 L115.752,13.752 L115.752,35.587 L145.202,35.587 L145.202,49.278 Z M64.2,56.034 L64.561,56.034 L74.016,0 L90.638,0 L73.715,87.82 L57.755,87.82 L45.41,34.019 L45.049,34.019 L32.822,87.82 L16.923,87.82 L0,0 L16.622,0 L26.077,56.034 L26.438,56.034 L39.086,0 L51.372,0 L64.2,56.034 Z"
        id="path-1"
      />
      <filter
        x="-0.4%"
        y="-2.3%"
        width="100.9%"
        height="104.6%"
        filterUnits="objectBoundingBox"
        id="filter-3"
      >
        <feGaussianBlur
          stdDeviation="1.5"
          in="SourceAlpha"
          result="shadowBlurInner1"
        />
        <feOffset
          dx="0"
          dy="1"
          in="shadowBlurInner1"
          result="shadowOffsetInner1"
        />
        <feComposite
          in="shadowOffsetInner1"
          in2="SourceAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
          result="shadowInnerInner1"
        />
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          type="matrix"
          in="shadowInnerInner1"
        />
      </filter>
      <rect id="path-4" x="0" y="0.501" width="446" height="220" />
      <path
        d="M359.762,5.888 C359.762,6.111 359.748,6.37 359.721,6.663 C359.693,6.956 359.644,7.263 359.575,7.585 C359.505,7.905 359.422,8.241 359.324,8.589 C359.226,8.939 359.108,9.245 358.969,9.511 C358.83,9.777 358.669,9.993 358.488,10.161 C358.306,10.327 358.105,10.411 357.883,10.411 C357.575,10.411 357.151,10.229 356.607,9.866 C356.063,9.505 355.366,9.12 354.516,8.716 C353.665,8.31 352.655,7.927 351.484,7.564 C350.313,7.201 348.961,7.019 347.426,7.019 C345.726,7.019 344.235,7.277 342.951,7.794 C341.669,8.31 340.596,9.009 339.73,9.888 C338.867,10.769 338.218,11.767 337.786,12.884 C337.353,13.999 337.139,15.159 337.139,16.361 C337.139,17.59 337.41,18.664 337.953,19.586 C338.498,20.508 339.208,21.346 340.086,22.1 C340.965,22.854 341.969,23.565 343.098,24.235 C344.227,24.905 345.377,25.59 346.549,26.288 C347.719,26.987 348.877,27.733 350.02,28.53 C351.163,29.325 352.174,30.247 353.052,31.294 C353.93,32.341 354.641,33.542 355.185,34.896 C355.729,36.251 356,37.822 356,39.609 C356,41.982 355.512,44.209 354.536,46.291 C353.56,48.371 352.174,50.186 350.375,51.734 C348.576,53.285 346.408,54.513 343.871,55.422 C341.334,56.328 338.504,56.783 335.381,56.783 C333.681,56.783 332.099,56.637 330.635,56.342 C329.171,56.049 327.854,55.686 326.682,55.254 C325.512,54.82 324.522,54.375 323.713,53.914 C322.904,53.453 322.318,53.041 321.957,52.678 C321.594,52.315 321.412,51.783 321.412,51.086 C321.412,50.918 321.433,50.682 321.475,50.373 C321.517,50.066 321.579,49.732 321.663,49.369 C321.747,49.006 321.837,48.65 321.934,48.301 C322.031,47.952 322.157,47.631 322.311,47.338 C322.463,47.045 322.631,46.807 322.813,46.625 C322.994,46.443 323.209,46.354 323.46,46.354 C323.906,46.354 324.464,46.577 325.133,47.024 C325.803,47.471 326.632,47.952 327.621,48.469 C328.611,48.985 329.789,49.467 331.155,49.914 C332.521,50.359 334.125,50.584 335.965,50.584 C337.917,50.584 339.659,50.311 341.194,49.766 C342.727,49.223 344.016,48.483 345.062,47.547 C346.108,46.611 346.909,45.516 347.467,44.258 C348.024,43.002 348.303,41.662 348.303,40.238 C348.303,38.98 348.038,37.884 347.508,36.949 C346.979,36.013 346.281,35.17 345.417,34.416 C344.553,33.662 343.556,32.963 342.427,32.32 C341.297,31.679 340.155,31.008 338.997,30.31 C337.839,29.612 336.704,28.865 335.589,28.07 C334.474,27.273 333.484,26.351 332.619,25.304 C331.754,24.257 331.051,23.056 330.508,21.702 C329.963,20.347 329.692,18.763 329.692,16.948 C329.692,14.741 330.125,12.675 330.989,10.749 C331.853,8.821 333.08,7.132 334.669,5.681 C336.259,4.228 338.183,3.083 340.44,2.245 C342.699,1.407 345.222,0.989 348.01,0.989 C349.349,0.989 350.624,1.1 351.837,1.325 C353.05,1.548 354.145,1.819 355.12,2.141 C356.096,2.461 356.932,2.811 357.629,3.188 C358.326,3.565 358.801,3.879 359.051,4.129 C359.303,4.381 359.484,4.639 359.595,4.904 C359.707,5.169 359.762,5.498 359.762,5.888 Z M323.669,3.166 C323.669,3.307 323.662,3.521 323.648,3.816 C323.634,4.109 323.591,4.421 323.523,4.757 C323.453,5.093 323.369,5.441 323.271,5.804 C323.173,6.167 323.042,6.495 322.875,6.788 C322.707,7.081 322.505,7.319 322.268,7.501 C322.032,7.683 321.774,7.772 321.495,7.772 L300.375,7.772 L296.945,24.778 L315.137,24.778 C315.472,24.778 315.723,24.889 315.891,25.114 C316.058,25.337 316.141,25.673 316.141,26.118 C316.141,26.259 316.12,26.475 316.079,26.768 C316.038,27.061 315.989,27.381 315.933,27.731 C315.877,28.081 315.794,28.422 315.683,28.756 C315.571,29.092 315.439,29.393 315.285,29.658 C315.133,29.922 314.944,30.146 314.721,30.328 C314.498,30.51 314.247,30.599 313.969,30.599 L295.818,30.599 L291.886,49.992 L313.425,49.992 C313.703,49.992 313.934,50.105 314.115,50.328 C314.296,50.551 314.386,50.9 314.386,51.375 C314.386,51.543 314.372,51.779 314.344,52.088 C314.316,52.395 314.267,52.715 314.198,53.051 C314.129,53.387 314.045,53.729 313.947,54.076 C313.849,54.426 313.717,54.748 313.55,55.041 C313.383,55.334 313.181,55.564 312.944,55.732 C312.708,55.898 312.45,55.982 312.171,55.982 L286.157,55.982 C285.85,55.982 285.551,55.933 285.258,55.836 C284.966,55.738 284.714,55.57 284.505,55.334 C284.296,55.096 284.15,54.789 284.066,54.412 C283.983,54.035 284.011,53.582 284.15,53.051 L293.811,4.715 C294.006,3.625 294.439,2.863 295.108,2.432 C295.777,1.998 296.432,1.782 297.074,1.782 L322.711,1.782 C323.349,1.783 323.669,2.244 323.669,3.166 Z M279.713,7.689 C279.713,7.884 279.692,8.128 279.651,8.423 C279.61,8.716 279.553,9.023 279.484,9.343 C279.415,9.665 279.324,9.999 279.212,10.349 C279.101,10.699 278.976,11.005 278.836,11.271 C278.696,11.537 278.544,11.746 278.376,11.9 C278.209,12.052 278.028,12.13 277.833,12.13 C277.414,12.13 276.85,11.878 276.139,11.374 C275.428,10.872 274.48,10.308 273.295,9.679 C272.11,9.05 270.667,8.478 268.966,7.962 C267.265,7.444 265.23,7.187 262.861,7.187 C260.379,7.187 258.058,7.556 255.897,8.296 C253.736,9.036 251.75,10.056 249.937,11.355 C248.124,12.654 246.507,14.189 245.085,15.962 C243.663,17.735 242.458,19.661 241.468,21.741 C240.478,23.821 239.726,26.007 239.209,28.298 C238.693,30.587 238.436,32.905 238.436,35.251 C238.436,37.708 238.791,39.878 239.502,41.763 C240.213,43.648 241.237,45.234 242.575,46.517 C243.914,47.802 245.531,48.773 247.427,49.429 C249.323,50.085 251.443,50.413 253.784,50.413 C255.513,50.413 257.318,50.21 259.2,49.806 C261.083,49.402 262.832,48.781 264.449,47.943 L267.586,32.234 L255.08,32.234 C254.745,32.234 254.487,32.117 254.307,31.879 C254.125,31.643 254.035,31.301 254.035,30.854 C254.035,30.659 254.056,30.399 254.098,30.079 C254.139,29.759 254.196,29.431 254.265,29.095 C254.334,28.759 254.432,28.425 254.557,28.089 C254.683,27.755 254.829,27.454 254.996,27.189 C255.164,26.923 255.351,26.714 255.56,26.562 C255.769,26.408 255.999,26.332 256.25,26.332 L273.438,26.332 C274.219,26.332 274.784,26.596 275.132,27.127 C275.48,27.658 275.557,28.369 275.361,29.264 L271.179,50.123 C271.068,50.652 270.921,51.078 270.74,51.4 C270.559,51.72 270.357,52.007 270.135,52.259 C269.883,52.509 269.249,52.88 268.232,53.368 C267.213,53.856 265.932,54.352 264.384,54.854 C262.836,55.358 261.094,55.797 259.156,56.174 C257.218,56.551 255.189,56.738 253.07,56.738 C249.445,56.738 246.254,56.271 243.493,55.336 C240.732,54.401 238.418,53.039 236.551,51.252 C234.683,49.465 233.26,47.301 232.285,44.76 C231.308,42.219 230.82,39.342 230.82,36.131 C230.82,33.143 231.162,30.203 231.845,27.315 C232.528,24.424 233.511,21.68 234.793,19.085 C236.075,16.487 237.657,14.085 239.54,11.88 C241.422,9.673 243.583,7.775 246.022,6.183 C248.461,4.591 251.145,3.335 254.073,2.413 C257.001,1.491 260.165,1.03 263.567,1.03 C265.518,1.03 267.344,1.206 269.046,1.553 C270.747,1.903 272.267,2.323 273.605,2.811 C274.943,3.299 276.072,3.836 276.993,4.424 C277.913,5.01 278.541,5.455 278.875,5.764 C279.209,6.071 279.433,6.364 279.545,6.643 C279.658,6.921 279.713,7.271 279.713,7.689 Z M208.908,8.988 L208.865,8.988 L194.228,36.006 L212.964,36.006 L208.908,8.988 Z M223.002,53.429 C223.086,54.044 223.106,54.538 223.064,54.915 C223.023,55.292 222.869,55.579 222.604,55.774 C222.339,55.969 221.927,56.094 221.371,56.151 C220.812,56.208 220.06,56.235 219.112,56.235 C218.499,56.235 217.968,56.214 217.523,56.173 C217.077,56.13 216.735,56.062 216.498,55.962 C216.262,55.864 216.088,55.733 215.976,55.566 C215.865,55.398 215.795,55.189 215.767,54.937 L213.76,41.744 L191.217,41.744 L184.149,54.812 C184.01,55.091 183.849,55.322 183.669,55.503 C183.487,55.683 183.236,55.831 182.916,55.942 C182.595,56.053 182.177,56.13 181.661,56.172 C181.145,56.213 180.511,56.234 179.759,56.234 C178.922,56.234 178.253,56.199 177.751,56.129 C177.25,56.061 176.901,55.928 176.706,55.733 C176.511,55.536 176.455,55.251 176.539,54.874 C176.623,54.497 176.818,54.001 177.124,53.388 L205.312,3.04 C205.507,2.733 205.716,2.481 205.939,2.286 C206.163,2.091 206.456,1.936 206.818,1.825 C207.181,1.714 207.64,1.636 208.199,1.595 C208.756,1.552 209.439,1.533 210.248,1.533 C211.168,1.533 211.914,1.553 212.485,1.595 C213.056,1.636 213.517,1.714 213.865,1.825 C214.214,1.936 214.458,2.096 214.597,2.305 C214.736,2.516 214.833,2.774 214.89,3.08 L223.002,53.429 Z M178.921,5.888 C178.921,6.111 178.907,6.37 178.879,6.663 C178.851,6.956 178.802,7.263 178.733,7.585 C178.663,7.905 178.58,8.241 178.482,8.589 C178.384,8.939 178.266,9.245 178.127,9.511 C177.988,9.777 177.827,9.993 177.646,10.161 C177.465,10.327 177.263,10.411 177.04,10.411 C176.733,10.411 176.308,10.229 175.765,9.866 C175.221,9.505 174.524,9.12 173.674,8.716 C172.824,8.31 171.813,7.927 170.642,7.564 C169.471,7.201 168.119,7.019 166.585,7.019 C164.884,7.019 163.393,7.277 162.11,7.794 C160.827,8.31 159.754,9.009 158.89,9.888 C158.026,10.769 157.377,11.767 156.945,12.884 C156.513,13.999 156.297,15.159 156.297,16.361 C156.297,17.59 156.569,18.664 157.113,19.586 C157.656,20.508 158.367,21.346 159.246,22.1 C160.125,22.854 161.128,23.565 162.257,24.235 C163.386,24.905 164.536,25.59 165.707,26.288 C166.878,26.987 168.035,27.733 169.178,28.53 C170.322,29.325 171.332,30.247 172.21,31.294 C173.088,32.341 173.799,33.542 174.343,34.896 C174.886,36.251 175.158,37.822 175.158,39.609 C175.158,41.982 174.67,44.209 173.694,46.291 C172.718,48.371 171.331,50.186 169.532,51.734 C167.734,53.285 165.566,54.513 163.029,55.422 C160.491,56.328 157.662,56.783 154.539,56.783 C152.838,56.783 151.256,56.637 149.792,56.342 C148.328,56.049 147.011,55.686 145.84,55.254 C144.669,54.82 143.679,54.375 142.871,53.914 C142.063,53.453 141.477,53.041 141.114,52.678 C140.752,52.315 140.571,51.783 140.571,51.086 C140.571,50.918 140.592,50.682 140.633,50.373 C140.675,50.066 140.738,49.732 140.821,49.369 C140.904,49.006 140.995,48.65 141.093,48.301 C141.19,47.951 141.316,47.631 141.469,47.338 C141.622,47.045 141.789,46.807 141.97,46.625 C142.151,46.443 142.367,46.354 142.618,46.354 C143.064,46.354 143.621,46.577 144.291,47.024 C144.961,47.471 145.79,47.952 146.779,48.469 C147.769,48.985 148.947,49.467 150.313,49.914 C151.679,50.359 153.282,50.584 155.123,50.584 C157.075,50.584 158.817,50.311 160.351,49.766 C161.884,49.223 163.174,48.483 164.22,47.547 C165.265,46.611 166.067,45.516 166.625,44.258 C167.183,43.002 167.461,41.662 167.461,40.238 C167.461,38.98 167.196,37.884 166.666,36.949 C166.136,36.014 165.439,35.17 164.575,34.416 C163.711,33.662 162.714,32.963 161.584,32.32 C160.455,31.679 159.312,31.008 158.155,30.31 C156.998,29.612 155.862,28.865 154.746,28.07 C153.631,27.273 152.641,26.351 151.777,25.304 C150.913,24.257 150.209,23.056 149.665,21.702 C149.122,20.347 148.85,18.763 148.85,16.948 C148.85,14.741 149.282,12.675 150.146,10.749 C151.011,8.821 152.237,7.132 153.827,5.681 C155.416,4.228 157.34,3.083 159.598,2.245 C161.856,1.407 164.38,0.989 167.168,0.989 C168.506,0.989 169.782,1.1 170.995,1.325 C172.208,1.548 173.303,1.819 174.278,2.141 C175.254,2.461 176.09,2.811 176.787,3.188 C177.484,3.565 177.958,3.879 178.209,4.129 C178.46,4.381 178.642,4.639 178.753,4.904 C178.865,5.169 178.921,5.498 178.921,5.888 Z M133.334,36.255 C132.665,39.663 131.605,42.65 130.155,45.22 C128.705,47.788 126.935,49.925 124.843,51.628 C122.752,53.331 120.396,54.616 117.775,55.482 C115.154,56.348 112.31,56.781 109.243,56.781 C106.009,56.781 103.2,56.34 100.816,55.461 C98.432,54.582 96.522,53.27 95.086,51.523 C93.65,49.779 92.709,47.607 92.263,45.009 C91.817,42.413 91.942,39.398 92.639,35.962 L99.247,2.872 C99.275,2.649 99.365,2.454 99.519,2.286 C99.672,2.118 99.902,1.985 100.209,1.888 C100.516,1.791 100.899,1.706 101.359,1.636 C101.819,1.568 102.398,1.532 103.095,1.532 C103.792,1.532 104.364,1.567 104.81,1.636 C105.256,1.706 105.611,1.79 105.876,1.888 C106.141,1.986 106.308,2.118 106.378,2.286 C106.447,2.454 106.455,2.649 106.399,2.872 L99.833,35.878 C99.359,38.335 99.227,40.485 99.436,42.329 C99.645,44.171 100.182,45.708 101.046,46.936 C101.91,48.164 103.102,49.086 104.622,49.7 C106.142,50.315 107.961,50.622 110.08,50.622 C112.171,50.622 114.102,50.302 115.872,49.659 C117.642,49.016 119.218,48.075 120.598,46.831 C121.978,45.589 123.149,44.054 124.111,42.224 C125.073,40.396 125.791,38.308 126.265,35.962 L132.873,2.872 C132.901,2.649 132.991,2.454 133.144,2.286 C133.298,2.118 133.52,1.985 133.813,1.888 C134.106,1.791 134.482,1.706 134.942,1.636 C135.402,1.568 135.981,1.532 136.677,1.532 C137.346,1.532 137.904,1.567 138.35,1.636 C138.796,1.706 139.152,1.79 139.417,1.888 C139.682,1.986 139.856,2.118 139.939,2.286 C140.022,2.454 140.051,2.649 140.022,2.872 L133.334,36.255 Z M68.592,8.988 L68.55,8.988 L53.912,36.006 L72.649,36.006 L68.592,8.988 Z M82.687,53.429 C82.771,54.044 82.791,54.538 82.75,54.915 C82.708,55.292 82.555,55.579 82.29,55.774 C82.025,55.969 81.614,56.094 81.057,56.151 C80.5,56.208 79.746,56.235 78.798,56.235 C78.185,56.235 77.655,56.214 77.209,56.173 C76.763,56.13 76.421,56.062 76.184,55.962 C75.947,55.864 75.773,55.733 75.661,55.566 C75.55,55.398 75.48,55.189 75.452,54.937 L73.445,41.744 L50.901,41.744 L43.833,54.812 C43.693,55.091 43.533,55.322 43.352,55.503 C43.17,55.683 42.92,55.831 42.599,55.942 C42.278,56.053 41.86,56.13 41.344,56.172 C40.828,56.213 40.194,56.234 39.441,56.234 C38.605,56.234 37.936,56.199 37.434,56.129 C36.932,56.061 36.583,55.928 36.388,55.733 C36.193,55.536 36.137,55.251 36.221,54.874 C36.304,54.497 36.5,54.001 36.806,53.388 L64.994,3.04 C65.189,2.733 65.398,2.481 65.621,2.286 C65.844,2.091 66.137,1.936 66.499,1.825 C66.862,1.714 67.322,1.636 67.879,1.595 C68.437,1.552 69.12,1.533 69.928,1.533 C70.848,1.533 71.594,1.553 72.165,1.595 C72.737,1.636 73.197,1.714 73.545,1.825 C73.893,1.936 74.137,2.096 74.277,2.305 C74.417,2.516 74.514,2.774 74.57,3.08 L82.687,53.429 Z M38.605,5.888 C38.605,6.111 38.591,6.37 38.563,6.663 C38.535,6.956 38.486,7.263 38.417,7.585 C38.347,7.905 38.263,8.241 38.166,8.589 C38.068,8.939 37.95,9.245 37.811,9.511 C37.671,9.777 37.511,9.993 37.33,10.161 C37.148,10.327 36.946,10.411 36.724,10.411 C36.417,10.411 35.992,10.229 35.448,9.866 C34.905,9.505 34.207,9.12 33.357,8.716 C32.506,8.31 31.496,7.927 30.325,7.564 C29.154,7.201 27.802,7.019 26.268,7.019 C24.567,7.019 23.076,7.277 21.793,7.794 C20.51,8.31 19.437,9.009 18.572,9.888 C17.708,10.769 17.059,11.767 16.627,12.884 C16.195,13.999 15.979,15.159 15.979,16.361 C15.979,17.59 16.25,18.664 16.794,19.586 C17.337,20.508 18.049,21.346 18.927,22.1 C19.805,22.854 20.809,23.565 21.938,24.235 C23.067,24.905 24.217,25.59 25.389,26.288 C26.56,26.987 27.717,27.733 28.86,28.53 C30.003,29.325 31.014,30.247 31.892,31.294 C32.77,32.341 33.481,33.542 34.025,34.896 C34.568,36.251 34.84,37.822 34.84,39.609 C34.84,41.982 34.352,44.209 33.376,46.291 C32.4,48.371 31.013,50.186 29.215,51.734 C27.417,53.285 25.249,54.513 22.712,55.422 C20.175,56.328 17.345,56.783 14.222,56.783 C12.521,56.783 10.939,56.637 9.475,56.342 C8.011,56.049 6.694,55.686 5.523,55.254 C4.352,54.82 3.362,54.375 2.553,53.914 C1.744,53.453 1.159,53.041 0.797,52.678 C0.434,52.315 0.253,51.783 0.253,51.086 C0.253,50.918 0.274,50.682 0.316,50.373 C0.358,50.066 0.42,49.732 0.504,49.369 C0.588,49.006 0.678,48.65 0.776,48.301 C0.874,47.952 0.999,47.631 1.152,47.338 C1.305,47.045 1.472,46.807 1.654,46.625 C1.835,46.443 2.051,46.354 2.302,46.354 C2.748,46.354 3.306,46.577 3.975,47.024 C4.644,47.471 5.474,47.952 6.464,48.469 C7.454,48.985 8.631,49.467 9.998,49.914 C11.364,50.359 12.968,50.584 14.808,50.584 C16.76,50.584 18.502,50.311 20.036,49.766 C21.57,49.223 22.859,48.483 23.905,47.547 C24.951,46.611 25.752,45.516 26.31,44.258 C26.868,43.002 27.146,41.662 27.146,40.238 C27.146,38.98 26.881,37.884 26.352,36.949 C25.823,36.014 25.125,35.17 24.261,34.416 C23.397,33.662 22.4,32.963 21.271,32.32 C20.142,31.679 18.999,31.008 17.841,30.31 C16.684,29.613 15.548,28.865 14.433,28.07 C13.317,27.273 12.328,26.351 11.463,25.304 C10.598,24.257 9.895,23.056 9.351,21.702 C8.807,20.347 8.536,18.763 8.536,16.948 C8.536,14.741 8.968,12.675 9.832,10.749 C10.696,8.821 11.923,7.132 13.512,5.681 C15.101,4.228 17.025,3.083 19.283,2.245 C21.542,1.407 24.065,0.989 26.853,0.989 C28.191,0.989 29.467,1.1 30.68,1.325 C31.893,1.548 32.987,1.819 33.963,2.141 C34.939,2.461 35.775,2.811 36.472,3.188 C37.169,3.565 37.643,3.879 37.894,4.129 C38.145,4.381 38.326,4.639 38.437,4.904 C38.55,5.169 38.605,5.498 38.605,5.888 Z"
        id="path-6"
      />
      <rect id="path-8" x="0" y="0.501" width="446" height="220" />
      <path
        d="M10.639,14.035 C10.639,15.822 11.009,17.693 11.748,19.648 C12.486,21.602 13.608,23.642 15.114,25.763 L21.136,20.485 C22.531,19.256 23.52,17.959 24.105,16.589 C24.691,15.221 24.984,13.755 24.984,12.192 C24.984,10.042 24.349,8.248 23.082,6.809 C21.812,5.371 20.092,4.652 17.916,4.652 C15.574,4.652 13.775,5.546 12.521,7.333 C11.267,9.12 10.639,11.354 10.639,14.035 Z M17.247,58.603 C19.394,58.603 21.492,58.121 23.541,57.158 C25.591,56.193 27.452,54.818 29.125,53.031 L14.277,32.801 L13.901,32.34 L12.396,33.68 C9.718,36.278 7.927,38.616 7.021,40.696 C6.115,42.778 5.662,44.712 5.662,46.499 C5.662,49.962 6.652,52.845 8.632,55.147 C10.611,57.451 13.482,58.603 17.247,58.603 Z M11.434,28.947 C9.399,26.099 7.893,23.523 6.917,21.219 C5.941,18.915 5.453,16.549 5.453,14.119 C5.453,9.679 6.561,6.251 8.778,3.836 C10.994,1.421 14.041,0.213 17.916,0.213 C21.514,0.213 24.393,1.351 26.553,3.627 C28.713,5.902 29.794,8.758 29.794,12.192 C29.794,14.733 29.215,16.918 28.059,18.747 C26.902,20.576 25.236,22.398 23.061,24.214 L17.54,29.114 L31.969,48.591 L32.22,48.55 C33.28,46.763 34.116,44.689 34.729,42.329 C35.342,39.969 35.65,37.448 35.65,34.768 L40.376,34.768 C40.376,38.342 39.916,41.629 38.996,44.631 C38.075,47.633 36.751,50.336 35.022,52.736 L41.965,62.078 L35.817,62.078 L31.76,56.549 C29.697,58.615 27.446,60.199 25.006,61.303 C22.566,62.407 19.98,62.957 17.247,62.957 C12.117,62.957 8.053,61.455 5.056,58.453 C2.059,55.453 0.56,51.467 0.56,46.496 C0.56,43.117 1.459,40.08 3.257,37.385 C5.055,34.692 7.683,31.961 11.14,29.197 L11.434,28.947 Z"
        id="path-10"
      />
      <rect id="path-12" x="0" y="0.501" width="446" height="220" />
    </defs>
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Artboard">
        <g id="logo-text">
          <g id="Clipped">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1" />
            </mask>
            <g id="SVGID_1_">
              <use fill="#52BDF6" fill-rule="evenodd" xlinkHref="#path-1" />
              <use
                fill="black"
                fill-opacity="1"
                filter="url(#filter-3)"
                xlinkHref="#path-1"
              />
            </g>
            <g mask="url(#mask-2)">
              <g transform="translate(0.000000, -1.000000)">
                <mask id="mask-5" fill="white">
                  <use xlinkHref="#path-4" />
                </mask>
                <use
                  id="SVGID_3_"
                  stroke="none"
                  fill="#911717"
                  fill-rule="evenodd"
                  xlinkHref="#path-4"
                />
                <rect
                  id="Rectangle-path"
                  stroke="none"
                  fill={color}
                  fill-rule="nonzero"
                  mask="url(#mask-5)"
                  x="-5"
                  y="-4"
                  width="455.543"
                  height="97.82"
                />
              </g>
            </g>
          </g>
          <g id="Clipped" transform="translate(44.000000, 162.000000)">
            <mask id="mask-7" fill="white">
              <use xlinkHref="#path-6" />
            </mask>
            <g id="SVGID_5_" />
            <g mask="url(#mask-7)">
              <g transform="translate(-44.000000, -163.000000)">
                <mask id="mask-9" fill="white">
                  <use xlinkHref="#path-8" />
                </mask>
                <g id="SVGID_7_" stroke="none" fill="none" />
                <rect
                  id="Rectangle-path"
                  stroke="none"
                  fill="#4B4B4B"
                  fill-rule="nonzero"
                  mask="url(#mask-9)"
                  x="39.254"
                  y="158.988"
                  width="369.508"
                  height="65.793"
                />
              </g>
            </g>
          </g>
          <g id="Clipped" transform="translate(215.000000, 87.000000)">
            <mask id="mask-11" fill="white">
              <use xlinkHref="#path-10" />
            </mask>
            <g id="SVGID_9_" />
            <g mask="url(#mask-11)">
              <g transform="translate(-215.000000, -88.000000)">
                <mask id="mask-13" fill="white">
                  <use xlinkHref="#path-12" />
                </mask>
                <g id="SVGID_11_" stroke="none" fill="none" />
                <rect
                  id="Rectangle-path"
                  stroke="none"
                  fill="#4B4B4B"
                  fill-rule="nonzero"
                  mask="url(#mask-13)"
                  x="210.56"
                  y="83.213"
                  width="51.405"
                  height="72.746"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const MainTitle = () => (
  <TitleWrapper>
    <Title width={334} height={164} />
  </TitleWrapper>
)

export default MainTitle
