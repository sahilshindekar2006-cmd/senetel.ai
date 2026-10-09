import { CONTROL_UNITS, SENSORS, OUTPUTS } from './sensorData'

// Story metadata only. No readings. Real ESP32 telemetry will live elsewhere (see sensorData.js).
// To use real media later, set e.g. media: { image: '/media/esp32.jpg', video: '/media/esp32.mp4' }.
export const STORY_VIDEOS = { components: '/videos/components.mp4', assembly: '/videos/assembly.mp4' }
export const TONE_COLOR = { info: '#4fd8ff', trusted: '#3dffa2', fault: '#ff5d5d', neutral: '#7c8799' }

const BY_ID = Object.fromEntries([...CONTROL_UNITS, ...SENSORS, ...OUTPUTS].map((c) => [c.id, c]))
const TONES = { esp32: 'info', 'led-green': 'trusted', 'led-red': 'fault' }
const ORDER = ['esp32', 'dht11', 'jsn-sr04t', 'phone-accel', 'led-green', 'led-red', 'buzzer'] // story order, unchanged

// name = professional title (primary), hardware = actual part (secondary), role = function.
export const COMPONENTS = ORDER.map((id) => ({
  id,
  name: BY_ID[id].title,
  hardware: BY_ID[id].hardware,
  category: BY_ID[id].category, // SENSING | CONTROL | OUTPUT
  role: BY_ID[id].summary,
  tone: TONES[id] || 'neutral',
}))

export const SYSTEM_PARTS = COMPONENTS.map(({ id, name, hardware, tone }) => ({ id, label: name, hardware, tone }))

const noMedia = { image: null, video: null }
export const SHOWCASE = COMPONENTS.map(({ id, name, hardware, category, role }) => ({ id, name, hardware, category, role, media: noMedia }))

export const ASSEMBLY_LAYERS = [
  { id: 'phone', label: 'MOTION SENSOR', note: 'ACCELEROMETER', tone: 'neutral' },
  { id: 'esp32', label: 'CONTROL UNIT', note: 'ESP32', tone: 'info' },
  { id: 'dht11', label: 'ENVIRONMENTAL SENSOR', note: 'DHT11', tone: 'neutral' },
  { id: 'jsn', label: 'PROXIMITY SENSOR', note: 'JSN-SR04T', tone: 'neutral' },
  { id: 'out', label: 'OUTPUT', note: 'LED + BUZZER', tone: 'trusted' },
]
