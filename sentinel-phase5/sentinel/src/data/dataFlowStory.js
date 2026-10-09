import { COMPONENTS } from './hardwareStory'

// Data flow story content. Architecture explanation only: no readings, no specs, no live connection.
// Names come from hardwareStory (Phase 3 naming); the one-line details are the story copy.
export const FLOW_VIDEO = '/videos/sensor.mp4' // optional dim background; a missing file falls back to the dark stage

const part = (id) => COMPONENTS.find((c) => c.id === id)

export const FLOW_INPUTS = [
  { id: 'dht11', detail: 'Temperature and humidity' },
  { id: 'jsn-sr04t', detail: 'Distance measurement' },
  { id: 'phone-accel', detail: 'Movement and vibration information' },
].map((i) => ({ ...i, name: part(i.id).name, hardware: part(i.id).hardware }))

export const FLOW_CONTROL = {
  id: 'esp32',
  name: part('esp32').name,
  hardware: part('esp32').hardware,
  label: 'DATA COLLECTION & CONTROL',
}

// The three physical output devices of the build, shown as a conceptual output stage.
export const FLOW_OUTPUT = {
  title: 'MONITORING OUTPUT',
  note: 'CONCEPTUAL VIEW',
  parts: ['led-green', 'led-red', 'buzzer'].map((id) => part(id).name),
}

// a / b = scroll window (0..1 of the pinned progress) in which each caption is visible.
export const FLOW_STAGES = [
  { n: '01', text: 'SENSOR INPUTS', a: -0.2, b: 0.08 },
  { n: '02', text: 'SIGNALS TO THE CONTROL UNIT', a: 0.08, b: 0.36 },
  { n: '03', text: 'CONTROL UNIT', a: 0.36, b: 0.58 },
  { n: '04', text: 'MONITORING OUTPUT / CONCEPTUAL', a: 0.58, b: 0.82 },
]

export const FLOW_COPY = {
  caption: 'DATA FLOW / ARCHITECTURE',
  disclaimer: 'ILLUSTRATIVE / NOT LIVE DATA',
  link: 'DATA PROCESSING',
  summary: ['MULTIPLE SIGNALS.', 'ONE UNIFIED MONITORING SYSTEM.'],
}
