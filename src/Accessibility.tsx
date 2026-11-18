import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  CircleHelp,
  CreditCard,
  Receipt,
  Signal,
  Wallet,
  Wifi,
  BatteryFull,
  Contrast,
  Hand,
  PanelsTopLeft,
} from "lucide-react";

export function Phone({
  scale,
  contrast,
  large,
  simple,
  kazakh = false,
}: {
  scale: number;
  contrast: boolean;
  large: boolean;
  simple: boolean;
  kazakh?: boolean;
}) {
  const actions = [
    [ArrowUpRight, kazakh ? "Аудару" : "Перевести"],
    [Receipt, kazakh ? "Төлеу" : "Оплатить"],
    [CircleHelp, kazakh ? "Көмек" : "Помощь"],
    [CreditCard, "Карты"],
    [Wallet, "Депозиты"],
    [PanelsTopLeft, "Ещё"],
  ] as const;
  return (
    <div
      className={
        "phone " +
        (contrast ? "contrast " : "") +
        (large ? "large " : "") +
        (simple || scale >= 140 ? "one" : "")
      }
      style={{ "--scale": scale / 100 } as CSSProperties}
      aria-label="Макет смартфона"
    >
      <div className="sys">
        <span>9:41</span>
        <span>
          <Signal />
          <Wifi />
          <BatteryFull />
        </span>
      </div>
      <div className="phone-title">
        bcc.kz <em>Adapt</em>
      </div>
      <div className="balance">
        <small>{kazakh ? "Қаражатым" : "Мои финансы"}</small>
        <b>1 240 000 ₸</b>
      </div>
      <div className="phone-actions">
        {actions.slice(0, simple ? 3 : 6).map(([Icon, name]) => (
          <div key={name}>
            <Icon />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="home-bar" />
    </div>
  );
}
export default function Accessibility() {
  const [scale, setScale] = useState(125),
    [contrast, setContrast] = useState(false),
    [large, setLarge] = useState(false),
    [simple, setSimple] = useState(true);
  const toggles = [
    [Contrast, "Высокий контраст", contrast, setContrast],
    [Hand, "Крупные кнопки", large, setLarge],
    [PanelsTopLeft, "Упрощённый интерфейс", simple, setSimple],
  ] as const;
  return (
    <div className="lab">
      <div className="lab-controls">
        <div className="smallcap">Настройки профиля</div>
        <div className="range-head">
          <label htmlFor="font-size">Масштаб текста</label>
          <output htmlFor="font-size">{scale}%</output>
        </div>
        <input
          id="font-size"
          type="range"
          min="100"
          max="200"
          step="5"
          value={scale}
          onChange={(e) => setScale(+e.target.value)}
        />
        <div className="range-ends">
          <span>100%</span>
          <span>200%</span>
        </div>
        {toggles.map(([Icon, label, val, set]) => (
          <button
            key={label}
            role="switch"
            aria-checked={val}
            className="switch-row"
            onClick={() => set(!val)}
          >
            <Icon size={19} />
            <span>{label}</span>
            <i className={"switch " + (val ? "on" : "")} />
          </button>
        ))}
        <p className="fine">
          От 140% действия выстраиваются в одну колонку. Проверьте, как меняется
          экран справа.
        </p>
      </div>
      <div className="phone-stage">
        <Phone {...{ scale, contrast, large, simple }} />
      </div>
    </div>
  );
}
