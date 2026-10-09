// Product reveal content. No specs, no readings. Part names come from hardwareStory (Phase 3 naming).
// To drop in the real product media later, set e.g. image: '/media/sentinel-product.webp' (transparent PNG/WebP works)
// or video: '/media/sentinel-product.mp4'. Nothing else needs to change.
export const PRODUCT_MEDIA = { image: null, video: null }

// Inputs on the left, outputs on the right.
export const PRODUCT_CALLOUTS = {
  left: ['esp32', 'dht11', 'jsn-sr04t', 'phone-accel'],
  right: ['led-green', 'led-red', 'buzzer'],
}

export const PRODUCT_COPY = {
  caption: 'SEVEN PARTS / ONE DEVICE', // continues the last line of the assembly section
  name: 'SENTINEL',
  lines: ['INTELLIGENT MONITORING.', 'BUILT FOR REAL-TIME AWARENESS.'],
  statement: 'Sentinel brings environmental, proximity and motion sensing into one unified monitoring system.',
  next: ['SENSORS', 'SENTINEL', 'REAL-TIME DATA'], // hands off to DataFlow
}
