// Static hardware metadata + the reading contract. UI imports from here; nothing here knows about React.
// Real ESP32 readings will arrive through a source that emits objects shaped like `createEmptyReading`.

// title / category / hardware / summary are the user-facing naming. id and name stay as internal references.
export const CONTROL_UNITS = [
  { id: 'esp32', name: 'ESP32', kind: 'controller', title: 'CONTROL UNIT', category: 'CONTROL', hardware: 'ESP32', summary: 'Processing & system control' },
]

export const SENSORS = [
  { id: 'dht11', name: 'DHT11', kind: 'sensor', title: 'ENVIRONMENTAL SENSOR', category: 'SENSING', hardware: 'DHT11', summary: 'Temperature & humidity sensing', source: 'esp32', measures: { temperature: '°C', humidity: '%' } },
  { id: 'jsn-sr04t', name: 'JSN-SR04T', kind: 'sensor', title: 'PROXIMITY SENSOR', category: 'SENSING', hardware: 'JSN-SR04T', summary: 'Distance detection', source: 'esp32', measures: { distance: 'cm' } },
  { id: 'phone-accel', name: 'Phone accelerometer', kind: 'sensor', title: 'MOTION SENSOR', category: 'SENSING', hardware: 'PHONE ACCELEROMETER', summary: 'Movement & vibration detection', source: 'phone', measures: { x: 'm/s²', y: 'm/s²', z: 'm/s²' } },
]

export const OUTPUTS = [
  { id: 'led-green', name: 'Green LED', kind: 'output', title: 'STATUS INDICATOR', category: 'OUTPUT', hardware: 'GREEN LED', summary: 'Normal / safe state', meaning: 'trusted' },
  { id: 'led-red', name: 'Red LED', kind: 'output', title: 'ALERT INDICATOR', category: 'OUTPUT', hardware: 'RED LED', summary: 'Warning / fault state', meaning: 'fault' },
  { id: 'buzzer', name: 'Buzzer', kind: 'output', title: 'AUDIBLE ALERT', category: 'OUTPUT', hardware: 'BUZZER', summary: 'Immediate audio warning', meaning: 'alarm' },
]

export const TRUST_STATUS = Object.freeze({
  UNKNOWN: 'unknown',
  TRUSTED: 'trusted',
  DRIFTING: 'drifting',
  FAULTY: 'faulty',
})

/**
 * @typedef {Object} SensorReading
 * @property {string} sensorId   id from SENSORS
 * @property {number} timestamp  ms since epoch
 * @property {Record<string, number|null>} values  keyed by SENSORS[].measures
 * @property {string} status     one of TRUST_STATUS
 * @property {number|null} trustScore  0..1, set by the AI engine
 */
export const createEmptyReading = (sensorId) => ({
  sensorId,
  timestamp: Date.now(),
  values: Object.fromEntries(
    Object.keys(SENSORS.find((s) => s.id === sensorId)?.measures ?? {}).map((k) => [k, null]),
  ),
  status: TRUST_STATUS.UNKNOWN,
  trustScore: null,
})
