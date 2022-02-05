import React from 'react';
import {
  ClothingSegmentsData,
  ClothingSegmentBounds,
} from '@joshuarobs/clothing-framework';

interface ClothingSegmentsBackProps {
  isRightSide?: boolean;
  clothingSegmentsData: ClothingSegmentsData;
  scaleFactor?: number;
}

function ClothingSegmentsBack({
  isRightSide,
  clothingSegmentsData,
  scaleFactor = 1,
}: ClothingSegmentsBackProps) {
  const IMAGE_WIDTH = 218;
  const IMAGE_HEIGHT = 601;

  const segmentRightStyle = {
    width: IMAGE_WIDTH * scaleFactor,
    height: IMAGE_HEIGHT * scaleFactor,
    // userSelect: "none",
    position: 'absolute',
    transform: isRightSide ? 'scaleX(-1)' : '',
  };

  let id_i = 0;

  const FOOT = [
    <path
      d="M185.966 1460.64C184.351 1465.49 181.473 1476.8 182.883 1483.22C184.292 1489.64 184.057 1494.32 183.764 1495.85H238.119C237.159 1492.51 236.431 1489.17 236.184 1486.23C235.099 1475.95 235.5 1471 232.5 1458.5C231.61 1453.49 230.883 1447.56 230.322 1442H189.407C188.836 1447.68 187.784 1454.52 185.966 1460.64Z"
      fill="#5D9EFF"
    />,
    <path
      d="M255.126 1537.4C253.805 1526.36 247.638 1518.33 245.876 1515.32C244.606 1513.16 240.593 1504.48 238.119 1495.85H183.764C180.38 1504.68 174.597 1517.25 167.024 1527.36C164.675 1531.38 160.681 1541.91 163.5 1551.95C163.864 1552.95 165.276 1555.56 168.011 1557.97C167.534 1557.03 167.155 1556 167.024 1554.96C166.672 1552.15 167.465 1548.1 167.905 1546.43C168.199 1545.26 169.843 1542.41 174.072 1540.41C193.966 1533.22 238.027 1522.55 255.126 1537.4Z"
      fill="#5D9EFF"
    />,
    <path
      d="M257.769 1542.41C256.712 1541.21 255.567 1538.57 255.126 1537.4C238.027 1522.55 193.966 1533.22 174.072 1540.41C169.843 1542.41 168.199 1545.26 167.905 1546.43C167.465 1548.1 166.672 1552.15 167.024 1554.96C167.155 1556 167.534 1557.03 168.011 1557.97H259.368C262.297 1552.36 258.902 1543.7 257.769 1542.41Z"
      fill="#5D9EFF"
    />,
    <path
      d="M243.233 1567C244.995 1567 251.162 1565.49 257.329 1560.47C258.212 1559.76 258.879 1558.9 259.368 1557.97H168.011C168.817 1559.54 169.903 1560.85 170.548 1561.48C171.429 1562.15 173.896 1563.48 176.715 1563.48C179.535 1563.48 181.581 1560.96 182.251 1559.7C182.317 1560.01 182.382 1560.27 182.442 1560.47C182.883 1562.15 185.173 1565.49 190.812 1565.49C196.45 1565.49 198.799 1563.04 199.269 1561.81C199.667 1562.83 200.134 1563.57 200.503 1563.99C200.943 1564.66 202.706 1565.99 206.23 1565.99C209.754 1565.99 212.014 1563.99 212.704 1562.98C213.019 1563.96 213.397 1564.62 213.718 1564.99C214.599 1565.99 217.242 1568 220.766 1568C224.291 1568 226.64 1566.33 227.374 1565.49C228.428 1564.79 230.017 1563.06 230.898 1560.33C231.955 1566.23 239.562 1567.23 243.233 1567Z"
      fill="#5D9EFF"
    />,
  ];

  const HAND = [
    <path
      d="M44.8772 839.03C45.522 839.197 46.1582 839.38 46.7828 839.576C48.66 843.236 51.5128 854.407 47.9064 869.805L63.6844 879.043C63.9348 879.043 64.7363 879.197 65.9384 879.813L80.2137 884.433C80.7146 884.176 82.1672 883.663 83.9704 883.663L98.997 880.583C99.7484 879.813 98.997 879.813 103.505 877.504L117.78 869.805C120.535 856.204 123.791 822.842 114.775 798.206C114.775 797.805 114.776 797.403 114.778 797L66.3011 788C66.2174 788.395 66.1345 788.79 66.0524 789.184C63.5732 789.157 61.4409 789.408 60.1207 789.682C54.6579 793.077 43.0872 802.021 35.1069 813.5L44.8772 839.03Z"
      fill="#5D9EFF"
    />,
    <path
      d="M31.539 819.29C30.9039 821.264 27.3471 827.186 18.201 835.082L31.539 846.925C33.4445 843.636 38.7798 837.451 44.8772 839.03L35.1069 813.5C33.8087 815.367 32.6055 817.302 31.539 819.29Z"
      fill="#5D9EFF"
    />,
    <path
      d="M18.201 835.082C16.9307 836.398 13.6279 840.609 10.5792 846.925C9.66939 848.81 7.04018 851.211 3.51181 853.792L0 856C0.333309 857.833 1.89994 861.7 5.5 862.5C6.48303 862.205 7.56671 861.562 8.67685 860.71C8.67449 860.709 8.67212 860.709 8.66975 860.708L8.67685 860.71C10.1606 861.083 12.0358 861.149 14.3901 860.743C23.5362 859.164 29.6336 850.873 31.539 846.925L18.201 835.082Z"
      fill="#5D9EFF"
    />,
    <path
      d="M56.9224 892.901C58.6755 888.539 62.4823 879.659 63.6844 879.043L47.9064 869.805C46.4286 873.969 43.788 882.192 41.3427 890.5L55.2679 896.751C55.8098 895.435 56.3637 894.142 56.9224 892.901Z"
      fill="#5D9EFF"
    />,
    <path
      d="M55.2679 896.751L41.3427 890.5C39.3163 897.385 37.424 904.328 36.4383 909.069L49.1983 913.5C50.4607 909.547 52.7321 902.907 55.2679 896.751Z"
      fill="#5D9EFF"
    />,
    <path
      d="M40.3931 932.935C40.6436 932.935 41.7455 931.549 44.1498 926.006C46.554 920.463 48.1569 916.511 48.6578 915.228C48.8081 914.735 48.9894 914.154 49.1983 913.5L36.4383 909.069C36.1946 910.241 36.0063 911.279 35.8851 912.148C34.9323 917.03 33.2093 927.111 33.5601 930.205C33.124 931.664 32.7545 933.01 32.5 934C33.6667 934.833 36.7 936.4 39.5 936C39.6985 935.255 39.9739 934.192 40.284 932.949C40.321 932.944 40.3574 932.94 40.3931 932.935Z"
      fill="#5D9EFF"
    />,
    <path
      d="M65.9384 879.813C65.1871 884.689 63.5342 894.903 62.9331 896.751C62.6971 897.476 62.4612 898.885 62.2485 900.5L77.0262 904.5C77.0922 904.199 77.1531 903.925 77.2084 903.68C77.7093 900.087 79.0116 891.208 80.2137 884.433L65.9384 879.813Z"
      fill="#5D9EFF"
    />,
    <path
      d="M61.4304 909.069C61.4304 909.685 60.4286 917.024 59.9277 920.617L73.4517 923.697C74.5655 916.279 76.1951 908.288 77.0262 904.5L62.2485 900.5C61.7839 904.028 61.4304 908.541 61.4304 909.069Z"
      fill="#5D9EFF"
    />,
    <path
      d="M59.9277 920.617C59.4269 925.493 58.2748 936.169 57.6738 939.864C57.3453 941.884 58.049 943.535 59.0001 944.744L58.5 948.5C61.8391 950.9 65.9493 950.5 68 950L68.4336 946.107C68.863 945.871 69.286 945.589 69.6951 945.253C69.9455 944.74 70.5967 942.636 71.1977 938.324C71.9491 932.935 71.9491 933.705 73.4517 923.697L59.9277 920.617Z"
      fill="#5D9EFF"
    />,
    <path
      d="M83.9704 883.663C84.2208 884.946 84.5715 889.36 83.9704 896.751C83.9704 897.521 84.1206 899.676 84.7217 902.14H99.7484V894.441C99.7484 891.362 98.2457 881.353 98.997 880.583L83.9704 883.663Z"
      fill="#5D9EFF"
    />,
    <path
      d="M84.7217 902.14C85.3228 904.604 85.4731 912.918 85.4731 916.768C85.4453 917.365 85.4163 918.032 85.3875 918.748L99.0011 918.5C99.0491 910.523 99.5111 904.328 99.7484 902.14H84.7217Z"
      fill="#5D9EFF"
    />,
    <path
      d="M97.4944 936.015C98.2457 933.705 98.997 930.625 98.997 919.847C98.997 919.393 98.9984 918.944 99.0011 918.5L85.3875 918.748C85.1566 924.493 84.9386 933.38 85.4731 934.475C85.8171 935.18 86.1611 936.046 86.7935 936.852L86.5 941.5C90.5 943.5 94.3333 942.667 96 942L96.2197 938.031C96.8159 937.486 97.2407 936.794 97.4944 936.015Z"
      fill="#5D9EFF"
    />,
    <path
      d="M103.505 877.504C104.006 880.84 105.308 888.128 106.51 890.592L119.283 885.203C119.283 882.123 118.982 874.732 117.78 869.805L103.505 877.504Z"
      fill="#5D9EFF"
    />,
    <path
      d="M106.51 890.592C107.712 893.055 108.013 898.804 108.013 901.37L120.686 900.5C120.42 892.359 119.688 887.07 119.283 885.203L106.51 890.592Z"
      fill="#5D9EFF"
    />,
    <path
      d="M108.013 901.37C107.763 906.246 107.713 916.922 109.516 920.617C109.714 921.023 109.943 921.376 110.198 921.683C110.246 923.053 110.342 924.5 110.5 926C113.7 927.2 117.906 926.5 119.5 926C119.566 924.02 119.492 922.038 119.341 920.169C120.106 917.759 120.786 913.573 120.786 906.759C120.786 904.518 120.749 902.429 120.686 900.5L108.013 901.37Z"
      fill="#5D9EFF"
    />,
  ];

  const PATH_GROIN = (
    <path
      d="M281.276 781.269C282.089 781.351 282.835 781.388 283.5 781.388V762.002C283.5 769.127 282.681 775.534 281.276 781.269Z"
      fill="#5D9EFF"
    />
  );

  const FACE = [
    {
      path: (
        <path
          d="M266.051 208.254C270.662 211.251 274.425 212 282.5 212V0C273.628 0 263.351 2.49706 259.322 3.74558C242.375 8.73969 224.93 23.8469 218.45 38.9541C211.97 54.0612 210.475 75.1614 211.721 85.1496C212.718 93.1402 213.222 99.7157 213.349 102.005C213.367 102.961 213.365 103.922 213.341 104.876C213.292 106.807 213.301 108.776 213.355 110.744C213.48 115.234 213.844 119.718 214.315 123.729C214.557 125.789 214.827 127.725 215.107 129.472C215.264 130.45 215.424 131.37 215.584 132.219C215.704 132.857 215.857 133.655 216.042 134.591C216.803 138.441 218.117 144.621 220.008 151.518C222.43 160.356 225.398 170.61 230.164 178.165C234.114 184.428 239.31 189.472 244.662 193.683C252.645 199.964 260.979 204.393 266.051 208.254Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      path: (
        <path
          d="M213.355 110.744C213.301 108.776 213.292 106.807 213.341 104.876C213.365 103.922 213.367 102.961 213.349 102.005C213.056 100.964 212.07 98.7835 210.475 98.384C208.481 97.8846 206.737 98.384 204.743 99.7574C202.749 101.131 202.625 104.751 202.625 106.624C202.625 108.497 203.995 114.989 205.864 123.23C206.737 125.852 208.706 131.67 209.603 133.967C210.267 135.424 211.671 138.761 211.97 140.459C212.344 142.582 213.341 146.203 215.46 148.45C216.207 149.407 218.051 151.371 219.447 151.571C219.613 151.577 219.958 151.575 220.008 151.518C218.117 144.621 216.803 138.441 216.042 134.591C215.857 133.655 215.704 132.857 215.584 132.219C215.424 131.37 215.264 130.45 215.107 129.472C214.827 127.725 214.557 125.789 214.315 123.729C213.844 119.718 213.48 115.234 213.355 110.744Z"
          fill="#5D9EFF"
        />
      ),
    },
  ];

  const ARM = [
    {
      start: ClothingSegmentBounds.Arms_410_Top_Shoulder_Sleeve,
      end: ClothingSegmentBounds.Arms_420_Shoulder_55,
      path: (
        <path
          key={id_i++}
          d="M165.84 267.5C145.679 268 134.5 272.5 124.287 302.895C123.425 305.767 122.404 309.581 121.38 314C119.338 322.81 117.288 334.029 116.474 345L165.986 349.5C166.212 347.949 166.382 346.443 166.505 345C167.036 338.777 166.703 333.701 166.252 331V314V267.5H165.84Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Arms_420_Shoulder_55,
      end: ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
      path: (
        <path
          key={id_i++}
          d="M117.851 366.712C118.103 374.278 118.366 383.798 118.59 394.5C118.738 401.559 118.87 409.133 118.972 417L172.478 421.5C172.571 417.279 172.663 412.907 172.749 408.5C172.576 405.925 172.337 402.64 172.047 399C171.472 391.798 170.697 383.209 169.84 376C169.253 371.053 168.626 366.755 168 364C167.773 363.562 167.525 363.055 167.262 362.486V350.5L163.037 350.118L117.475 346C116.936 353.27 116.94 360.432 117.851 366.712Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Arms_430_Biceps_Triceps_15,
      end: ClothingSegmentBounds.Arms_440_Elbow,
      path: (
        <path
          key={id_i++}
          d="M163.707 551.315C171.639 514.395 172.482 467.084 171.924 444.435C171.999 441.585 172.08 438.41 172.164 435C172.266 430.802 172.373 426.247 172.478 421.5L118.972 417C119.473 455.81 119.238 501.752 116.612 528.24C116.227 532.614 114.627 543.277 111.211 553L160.851 562C161.686 557.087 162.936 553.176 163.707 551.315Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Arms_440_Elbow,
      end: ClothingSegmentBounds.Arms_450_Forearm_50,
      path: (
        <path
          key={id_i++}
          d="M110.211 552C109.956 552.727 109.69 553.448 109.415 554.161C103.103 569.2 90.3266 609.288 86.3447 656L138.964 666.682L139.023 666.5C155.15 616.949 158.989 580.981 158.989 570.827C158.989 567.339 159.343 563.984 159.85 561L144.684 558.25L130.426 555.665L110.211 552Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Arms_450_Forearm_50,
      end: ClothingSegmentBounds.Arms_460_Forearm_85,
      path: (
        <path
          key={id_i++}
          d="M86.3447 656C86.0442 659.525 85.7938 663.089 85.6 666.682C83.6965 701.977 79.7513 726.934 75.6003 747L117.935 754.5C121.677 725.931 127.885 699.68 131.723 687.486C134.375 680.324 136.782 673.379 138.964 666.682L86.3447 656Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Arms_460_Forearm_85,
      end: ClothingSegmentBounds.Arms_470_Wrist,
      path: (
        <path
          key={id_i++}
          d="M117.935 754.5L75.6003 747C72.3288 762.815 68.9294 775.593 66.3011 788L114.778 797C114.847 783.206 116.092 768.572 117.935 754.5Z"
          fill="#5D9EFF"
        />
      ),
    },
  ];

  const BODY = [
    {
      start: ClothingSegmentBounds.Body_10_Top_Of_Neck,
      end: ClothingSegmentBounds.Body_20_Middle_Of_Neck,
      path: (
        <path
          key={id_i++}
          d="M282.5 172C270.5 172 252.139 174.199 244.459 175.299C244.74 184.112 244.871 200.493 244.032 215H282.5L282.5 172Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_20_Middle_Of_Neck,
      end: ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      path: (
        <path
          key={id_i++}
          d="M241.923 234.269C238.118 253.499 186 267 165.84 267.5H166.252H282.5L282.5 215H244.032C243.609 222.297 242.941 229.121 241.923 234.269Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_30_Above_Upper_Chest,
      end: ClothingSegmentBounds.Body_40_Upper_Chest_60,
      path: (
        <path
          key={id_i++}
          d="M282.5 314L282.5 267.5H166.252V314H282.5Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_40_Upper_Chest_60,
      end: ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      path: (
        <path
          key={id_i++}
          d="M166.252 331C166.703 333.701 167.036 338.777 166.505 345H282.5L282.5 314H166.252V331Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_50_Above_Lower_Chest,
      end: ClothingSegmentBounds.Body_60_Lower_Chest_30,
      path: (
        <path
          key={id_i++}
          d="M167.262 362.486C167.525 363.055 167.773 363.562 168 364C168.626 366.755 169.253 371.053 169.84 376H283.5V346H167.262V362.486Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_60_Lower_Chest_30,
      end: ClothingSegmentBounds.Body_70_Lower_Chest_85,
      path: (
        <path
          key={id_i++}
          d="M172.047 399C172.337 402.64 172.576 405.925 172.749 408.5C172.565 417.862 172.358 427.068 172.164 435H283.5V376H169.84C170.697 383.209 171.472 391.798 172.047 399Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_70_Lower_Chest_85,
      end: ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
      path: (
        <path
          key={id_i++}
          d="M171.924 444.435C172.213 446.727 172.621 449.646 173.134 453H283.5V435H172.164C172.08 438.41 171.999 441.585 171.924 444.435Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_80_Above_Upper_Abdomen,
      end: ClothingSegmentBounds.Body_90_Upper_Abdomen_20,
      path: (
        <path
          key={id_i++}
          d="M176 473.887H282.5L282.5 452H172.134C173.086 458.217 174.402 465.925 176 473.887Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_90_Upper_Abdomen_20,
      end: ClothingSegmentBounds.Body_100_Upper_Abdomen_60,
      path: (
        <path
          key={id_i++}
          d="M181.868 498.355C182.121 503.425 182.729 511.416 183.762 520H282.5V473.887H176C177.677 482.24 179.664 490.873 181.868 498.355Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_100_Upper_Abdomen_60,
      end: ClothingSegmentBounds.Body_110_Upper_Abdomen_95,
      path: (
        <path
          key={id_i++}
          d="M189.933 550.916C190.256 552.705 190.521 555.091 190.615 557.867H282.5V520H183.762C185.08 530.951 187.09 542.867 189.933 550.916Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_110_Upper_Abdomen_95,
      end: ClothingSegmentBounds.Body_120_Waist,
      path: (
        <path
          key={id_i++}
          d="M282.5 557.867H190.615C190.717 560.875 190.618 564.34 190.173 568H282.5L282.5 557.867Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_120_Waist,
      end: ClothingSegmentBounds.Body_130_Lower_Abdomen_10,
      path: (
        <path
          key={id_i++}
          d="M187.047 581H282.5L282.5 568H190.173C189.661 572.208 188.693 576.675 187.047 581Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_130_Lower_Abdomen_10,
      end: ClothingSegmentBounds.Body_140_Lower_Abdomen_33,
      path: (
        <path
          key={id_i++}
          d="M181.868 590.657C178.077 595.825 173.877 601.98 169.696 610H282.5V581H187.047C185.766 584.367 184.074 587.649 181.868 590.657Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_140_Lower_Abdomen_33,
      end: ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      path: (
        <path
          key={id_i++}
          d="M155.59 648H282.5V610H169.696C164.725 619.536 159.782 631.71 155.59 648Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_150_Lower_Abdomen_67,
      end: ClothingSegmentBounds.Body_160_Lower_Abdomen_80,
      path: (
        <path
          key={id_i++}
          d="M150.389 673H282.5V648H155.59C153.677 655.43 151.921 663.717 150.389 673Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_160_Lower_Abdomen_80,
      end: ClothingSegmentBounds.Body_170_Hips,
      path: (
        <path
          key={id_i++}
          d="M282.5 700.906V699V673H150.389C148.997 681.443 147.789 690.71 146.82 700.906H234.5H282.5Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_170_Hips,
      end: ClothingSegmentBounds.Body_180_Hip_Area_60,
      path: (
        <path
          key={id_i++}
          d="M147.82 701.906C147.397 705.752 145.791 715.752 142.748 724.982C141.765 727.962 140.19 735.218 138.679 746H283.5V701.993L235.315 701.906H147.82Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_180_Hip_Area_60,
      end: ClothingSegmentBounds.Body_190_Below_Groin,
      path: (
        <path
          key={id_i++}
          d="M281.246 781.388C281.256 781.349 281.266 781.309 281.276 781.269C282.681 775.534 283.5 769.127 283.5 762.002V762V746H138.679C137.372 755.322 136.112 767.28 135.324 781.388H281.246Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_190_Below_Groin,
      end: ClothingSegmentBounds.Body_200_Upper_Thigh_55,
      path: (
        <path
          key={id_i++}
          d="M273.356 803.182C273.312 802.26 273.265 801.369 273.216 800.508C276.548 795.213 279.398 788.875 281.246 781.388H135.324C134.835 790.137 134.527 799.713 134.502 810H273.568C273.528 807.664 273.459 805.382 273.356 803.182Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_200_Upper_Thigh_55,
      end: ClothingSegmentBounds.Body_210_Thigh_5,
      path: (
        <path
          key={id_i++}
          d="M273.053 836C273.181 833.372 273.292 830.693 273.38 828C273.58 821.938 273.666 815.801 273.568 810H134.502C134.488 815.782 134.562 821.789 134.744 828C134.822 830.631 134.918 833.298 135.035 836H273.053Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_210_Thigh_5,
      end: ClothingSegmentBounds.Body_220_Thigh_25,
      path: (
        <path
          key={id_i++}
          d="M267.283 884.228C268.298 880.126 269.397 869.699 269.819 864.998C270.493 858.641 271.453 847.385 272.053 835H134.035C134.798 852.65 136.439 871.795 139.338 892H266.132C266.524 889.395 266.91 886.809 267.283 884.228Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_220_Thigh_25,
      end: ClothingSegmentBounds.Body_230_Thigh_80,
      path: (
        <path
          key={id_i++}
          d="M139.338 892C140.061 897.038 140.862 902.141 141.747 907.303C147.903 942.236 157.694 996.939 165.663 1039.5H258.979C260.876 1016.48 259.417 1006.23 259 998C257.175 948.71 262.021 919.265 266.132 892H139.338Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_230_Thigh_80,
      end: ClothingSegmentBounds.Body_240_Knee,
      path: (
        <path
          key={id_i++}
          d="M258.979 1039.5H165.663C169.392 1059.41 172.722 1076.67 175.094 1088H252.559C256.055 1067.26 257.981 1051.61 258.979 1039.5Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_240_Knee,
      end: ClothingSegmentBounds.Body_250_Calf_15,
      path: (
        <path
          key={id_i++}
          d="M177.561 1099C177.013 1111.55 175.188 1124.38 173.666 1133H249.061C248.281 1119.41 249.814 1104.44 251 1097C251.552 1093.9 252.071 1090.9 252.559 1088H175.094C176.104 1092.83 176.941 1096.58 177.561 1099Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_250_Calf_15,
      end: ClothingSegmentBounds.Body_260_Calf_50,
      path: (
        <path
          key={id_i++}
          d="M172.18 1140.62C167.62 1157.43 159.1 1200.19 161.5 1236.77C162.321 1249.28 164.826 1261.11 168.031 1274H239.484C240.693 1268.13 242.028 1262.92 243.5 1258.56C255.1 1224.21 253.333 1169.9 251 1147.03C249.951 1142.84 249.349 1138.01 249.061 1133H173.666C173.102 1136.19 172.58 1138.81 172.18 1140.62Z"
          fill="#5D9EFF"
        />
      ),
    },
    {
      start: ClothingSegmentBounds.Body_260_Calf_50,
      end: ClothingSegmentBounds.Body_270_Ankle,
      path: (
        <path
          key={id_i++}
          d="M168.031 1274C176.544 1308.23 190 1349.98 190 1432C189.99 1434.18 189.832 1437.77 189.407 1442H230.322C229.628 1435.13 229.187 1428.82 229 1425.5C228.855 1385.78 231.174 1314.35 239.484 1274H168.031Z"
          fill="#5D9EFF"
        />
      ),
    },
  ];

  // const allSvgs2 = [...ARM_2, ...BODY_2, PATH_GROIN];

  // const sleeveStart =
  //   isRightSide || (!isRightSide && clothingSegmentsData.sleeves_is_symmetrical)
  //     ? clothingSegmentsData.right_sleeve_start_back
  //     : clothingSegmentsData.left_sleeve_start_back;
  let sleeveStart;
  // Sleeves
  // Standard procedure, front/back isn't same so use their own values
  if (!clothingSegmentsData.sleeves_front_back_is_same) {
    sleeveStart =
      isRightSide ||
      (!isRightSide && clothingSegmentsData.sleeves_is_symmetrical)
        ? clothingSegmentsData.right_sleeve_start_back
        : clothingSegmentsData.left_sleeve_start_back;
  }
  // Otherwise, if they are the same, use front value if this is back
  else if (!clothingSegmentsData.sleeves_is_symmetrical) {
    sleeveStart = isRightSide
      ? clothingSegmentsData.right_sleeve_start_front
      : clothingSegmentsData.left_sleeve_start_front;
  } else {
    sleeveStart = clothingSegmentsData.right_sleeve_start_front;
  }
  // const sleeveEnd =
  //   isRightSide || (!isRightSide && clothingSegmentsData.sleeves_is_symmetrical)
  //     ? clothingSegmentsData.right_sleeve_end_back
  //     : clothingSegmentsData.left_sleeve_end_back;
  let sleeveEnd;
  // Standard procedure, front/back isn't same so use their own values
  if (!clothingSegmentsData.sleeves_front_back_is_same) {
    sleeveEnd =
      isRightSide ||
      (!isRightSide && clothingSegmentsData.sleeves_is_symmetrical)
        ? clothingSegmentsData.right_sleeve_end_back
        : clothingSegmentsData.left_sleeve_end_back;
  }
  // Otherwise, if they are the same, use front value if this is back
  else if (!clothingSegmentsData.sleeves_is_symmetrical) {
    sleeveEnd = isRightSide
      ? clothingSegmentsData.right_sleeve_end_front
      : clothingSegmentsData.left_sleeve_end_front;
  } else {
    sleeveEnd = clothingSegmentsData.right_sleeve_end_front;
  }

  // const bodyStart =
  //   isRightSide || (!isRightSide && clothingSegmentsData.body_is_symmetrical)
  //     ? clothingSegmentsData.right_body_start_back
  //     : clothingSegmentsData.left_body_start_back;
  let bodyStart;
  // Body
  // Standard procedure, front/back isn't same so use their own values
  if (!clothingSegmentsData.body_front_back_is_same) {
    bodyStart =
      isRightSide || (!isRightSide && clothingSegmentsData.body_is_symmetrical)
        ? clothingSegmentsData.right_body_start_back
        : clothingSegmentsData.left_body_start_back;
  }
  // Otherwise, if they are the same, use front value if this is back
  else if (!clothingSegmentsData.body_is_symmetrical) {
    bodyStart = isRightSide
      ? clothingSegmentsData.right_body_start_front
      : clothingSegmentsData.left_body_start_front;
  } else {
    bodyStart = clothingSegmentsData.right_body_start_front;
  }
  // const bodyEnd =
  //   isRightSide || (!isRightSide && clothingSegmentsData.body_is_symmetrical)
  //     ? clothingSegmentsData.right_body_end_back
  //     : clothingSegmentsData.left_body_end_back;
  let bodyEnd;
  // Standard procedure, front/back isn't same so use their own values
  if (!clothingSegmentsData.body_front_back_is_same) {
    bodyEnd =
      isRightSide || (!isRightSide && clothingSegmentsData.body_is_symmetrical)
        ? clothingSegmentsData.right_body_end_back
        : clothingSegmentsData.left_body_end_back;
  }
  // Otherwise, if they are the same, use front value if this is back
  else if (!clothingSegmentsData.body_is_symmetrical) {
    bodyEnd = isRightSide
      ? clothingSegmentsData.right_body_end_front
      : clothingSegmentsData.left_body_end_front;
  } else {
    bodyEnd = clothingSegmentsData.right_body_end_front;
  }

  // Ensure that any segment start and ends are a number that cannot be null
  // Prevents a bug showing segments if one value happens to be null
  const effectiveSleeveStart = sleeveStart
    ? sleeveStart
    : Number.POSITIVE_INFINITY;
  const effectiveSleeveEnd = sleeveEnd ? sleeveEnd : Number.NEGATIVE_INFINITY;
  const effectiveBodyStart = bodyStart ? bodyStart : Number.POSITIVE_INFINITY;
  const effectiveBodyEnd = bodyEnd ? bodyEnd : Number.NEGATIVE_INFINITY;
  const segmentsArm = ARM.filter((clothingSegment) => {
    const { start, end } = clothingSegment;
    if (start >= effectiveSleeveStart && end <= effectiveSleeveEnd)
      return clothingSegment;
  });
  const segmentsBody = BODY.filter((clothingSegment) => {
    const { start, end } = clothingSegment;
    if (start >= effectiveBodyStart && end <= effectiveBodyEnd)
      return clothingSegment;
  });
  const svgs = [...segmentsArm, ...segmentsBody];

  return (
    <svg
      // @ts-ignore
      style={segmentRightStyle}
      width={IMAGE_WIDTH}
      height={IMAGE_HEIGHT}
      viewBox="0 0 565 1568"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*{allSvgs}*/}
      {svgs.map(({ path }) => {
        return path;
      })}
    </svg>
  );
}

export { ClothingSegmentsBack };
