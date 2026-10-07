const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

// AI-generated illustration for a topic (free Pollinations endpoint, no API key).
export const imageUrl = (topic, group = "") =>
  `https://image.pollinations.ai/prompt/${encodeURIComponent(
    `${topic} ${group} concept, flat vector illustration, colorful, no text`
  )}?width=640&height=400&nologo=true&seed=${hash(topic)}`;

// Offline / failure fallback: a gradient hue derived from the topic text.
export const hueFor = (topic) => hash(topic) % 360;
