import { useState } from "react";
import { imageUrl, hueFor } from "../utils/topicImage";

export default function TopicImage({ topic, group, className = "" }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const h = hueFor(topic);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={topic}
        className={`flex items-center justify-center text-white text-4xl font-bold ${className}`}
        style={{ background: `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 60) % 360} 70% 40%))` }}
      >
        {topic.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={imageUrl(topic, group)}
      alt={topic}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} ${loaded ? "" : "animate-pulse bg-slate-200"}`}
    />
  );
}
