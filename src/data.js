import pinkColor from "../public/assets/headphone/textures/pink.png"
import greenColor from "../public/assets/headphone/textures/green.png"
import skyBlueColor from "../public/assets/headphone/textures/blue.png"
import silverColor from "../public/assets/headphone/textures/white.png"
import spaceGrayColor from "../public/assets/headphone/textures/gray.png"


export const features = [
  {
    title: 'Active Noise Cancellation',
    description: 'Blocks outside noise for immersive sound.',
    step: 1,
  },
  {
    title: 'Spatial Audio with Dynamic Head Tracking',
    description: 'Surround sound that moves with your head.',
    step: 2,
  },
  {
    title: 'Custom Acoustic Design',
    description: 'Apple-designed drivers deliver ultra-low distortion.',
    step: 3,
  },
  {
    title: 'Memory Foam Ear Cushions',
    description: 'All-day listening with ANC and spatial audio on.',
    step: 4,
  },
]


export const colorOptions = [
  { 
    name: "Space Gray",
    hex: "#484848",
    img: spaceGrayColor
  },
  { 
    name: "Silver",
    hex: "#EDEDED",
    img: silverColor
  },
  { 
    name: "Sky Blue",
    hex: "#A8C6DB",
    img: skyBlueColor
  },
  {
    name: "Green",
    hex: "#A8CBB1",
    img: greenColor 
  },
  { 
    name: "Pink",
    hex: "#F3C3CF",
    img: pinkColor
  },
];