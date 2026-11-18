import { AudioLines, Fingerprint, Nfc } from "lucide-react";
import bank from "./assets/centercredit.svg";

// Each path is one strand of a folded ribbon, sampled in projection.
function ribbon(strand: number) {
  const u = strand / 75;
  return Array.from({ length: 200 }, (_, i) => {
    const t = i / 199;
    const angle = t * 7.1 - 1.1;
    const width = (u - 0.5) * 142;
    const x =
      27 + t * 532 + Math.sin(angle) * 77 + width * Math.cos(angle + 0.38);
    const y =
      299 -
      t * 188 -
      Math.sin(angle * 1.12) * 114 +
      width * Math.sin(angle + 0.5);
    return (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2);
  }).join(" ");
}
const strands = Array.from({ length: 76 }, (_, i) => ribbon(i));

export function Ribbon() {
  return (
    <svg
      className="ribbon"
      viewBox="0 0 640 430"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="silk"
          x1="0"
          y1=".7"
          x2="1"
          y2=".2"
          gradientUnits="objectBoundingBox"
        >
          <stop stopColor="#346343" />
          <stop offset=".23" stopColor="#b5e9ae" />
          <stop offset=".44" stopColor="#45b57c" />
          <stop offset=".62" stopColor="#113d2e" />
          <stop offset=".8" stopColor="#99edba" />
          <stop offset="1" stopColor="#2e9a6c" />
        </linearGradient>
      </defs>
      <g stroke="url(#silk)" strokeWidth="1.2">
        {strands.map((d, i) => (
          <path d={d} key={i} />
        ))}
      </g>
    </svg>
  );
}
export function HeroArt() {
  return (
    <div
      className="hero-art"
      role="img"
      aria-label="Концепт карты BCC Adapt с персональным профилем доступности"
    >
      <div className="art-grid" />
      <Ribbon />
      <div className="concept-card">
        <div className="card-top">
          <img src={bank} alt="" />
          <Nfc size={23} />
        </div>
        <div className="emboss">
          <Fingerprint size={79} strokeWidth={0.8} />
        </div>
        <div className="card-end">
          <span>Adapt</span>
          <small>DEMO CARD</small>
        </div>
      </div>
      <div className="art-tag">
        <span className="signal">
          <AudioLines size={22} />
        </span>
        <span>
          <small>Голосовой профиль</small>
          <b>
            RU <i>/</i> ҚАЗ
          </b>
        </span>
      </div>
    </div>
  );
}
