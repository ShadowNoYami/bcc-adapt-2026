import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  CheckCheck,
  Fingerprint,
  Mic,
  ShieldAlert,
  Volume2,
} from "lucide-react";

const ones = [
  "",
  "один",
  "два",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
];
const teens = [
  "десять",
  "одиннадцать",
  "двенадцать",
  "тринадцать",
  "четырнадцать",
  "пятнадцать",
  "шестнадцать",
  "семнадцать",
  "восемнадцать",
  "девятнадцать",
];
const tens = [
  "",
  "",
  "двадцать",
  "тридцать",
  "сорок",
  "пятьдесят",
  "шестьдесят",
  "семьдесят",
  "восемьдесят",
  "девяносто",
];
const hundreds = [
  "",
  "сто",
  "двести",
  "триста",
  "четыреста",
  "пятьсот",
  "шестьсот",
  "семьсот",
  "восемьсот",
  "девятьсот",
];
function group(n: number, feminine = false) {
  const last = n % 10,
    two = n % 100;
  const unit =
    feminine && last === 1
      ? "одна"
      : feminine && last === 2
        ? "две"
        : ones[last];
  return [
    hundreds[Math.floor(n / 100)],
    two >= 10 && two < 20
      ? teens[two - 10]
      : [tens[Math.floor(two / 10)], unit].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(" ");
}
function suffix(n: number, forms: string[]) {
  const last = n % 10;
  return forms[
    n % 100 >= 11 && n % 100 <= 14
      ? 2
      : last === 1
        ? 0
        : last >= 2 && last <= 4
          ? 1
          : 2
  ];
}
export function words(n: number) {
  const million = Math.floor(n / 1e6),
    thousand = Math.floor(n / 1000) % 1000;
  return [
    million &&
      group(million) +
        " " +
        suffix(million, ["миллион", "миллиона", "миллионов"]),
    thousand &&
      group(thousand, true) +
        " " +
        suffix(thousand, ["тысяча", "тысячи", "тысяч"]),
    group(n % 1000),
    "тенге",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Transfer() {
  const [amount, setAmount] = useState("100000"),
    [recipient, setRecipient] = useState("Арман"),
    [stage, setStage] = useState<"draft" | "review" | "done">("draft");
  const [seconds, setSeconds] = useState(0),
    [holding, setHolding] = useState(false),
    [speechNote, setSpeechNote] = useState("");
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sum = Number(amount),
    valid = /^\d{1,9}$/.test(amount) && sum >= 1,
    risk = sum >= 50000 || recipient === "Новый получатель";
  const stop = () => {
    if (hold.current !== null) clearTimeout(hold.current);
    hold.current = null;
    setHolding(false);
  };
  useEffect(() => {
    if (stage !== "review") return;
    const cancel = () => stop();
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    return () => {
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
      if (hold.current !== null) clearTimeout(hold.current);
    };
  }, [stage]);
  useEffect(() => {
    if (stage !== "review" || !risk) return;
    const end = Date.now() + 5000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setSeconds(left);
      if (!left) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [stage, risk]);
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );
  function startHold() {
    if (
      hold.current !== null ||
      seconds > 0 ||
      stage !== "review" ||
      document.hidden
    )
      return;
    setHolding(true);
    hold.current = setTimeout(() => {
      hold.current = null;
      setHolding(false);
      setStage("done");
      navigator.vibrate?.(40);
    }, 1500);
  }
  function speak() {
    if (!window.speechSynthesis) {
      setSpeechNote("Озвучка недоступна в этом браузере.");
      return;
    }
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(words(sum));
    msg.lang = "ru-RU";
    msg.onerror = () =>
      setSpeechNote("Озвучка недоступна. Сумма приведена прописью.");
    window.speechSynthesis.speak(msg);
  }
  return (
    <div className="transfer-box">
      <div className="smallcap">
        <span className="light-dot" /> Симулятор перевода
      </div>
      {stage === "done" ? (
        <div role="status" className="success">
          <CheckCheck size={44} />
          <h3>Демо-перевод подтверждён</h3>
          <p>
            {sum.toLocaleString("ru-RU")} ₸ · {recipient}
          </p>
          <p className="fine">Деньги остались на месте.</p>
          <button className="btn forest" onClick={() => setStage("draft")}>
            Повторить
          </button>
        </div>
      ) : (
        <>
          <div className="fields">
            <label>
              Получатель
              <select
                aria-label="Получатель"
                value={recipient}
                disabled={stage !== "draft"}
                onChange={(e) => setRecipient(e.target.value)}
              >
                {["Арман", "Айдана", "Новый получатель"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Сумма в тенге
              <input
                inputMode="numeric"
                value={amount}
                disabled={stage !== "draft"}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setSpeechNote("");
                }}
                aria-invalid={!valid}
                aria-describedby="words"
              />
            </label>
          </div>
          <div className="spoken" id="words">
            <AudioLines size={20} />
            <span>
              {valid ? words(sum) : "Введите целое число от 1 до 999 999 999 ₸"}
            </span>
            {valid && (
              <button aria-label="Озвучить сумму" onClick={speak}>
                <Volume2 size={18} />
              </button>
            )}
          </div>
          {speechNote && <p role="status">{speechNote}</p>}
          {stage === "draft" ? (
            <>
              <button
                className="voice-example"
                onClick={() => {
                  setAmount("5000");
                  setRecipient("Арман");
                  setSpeechNote("Пример голосового черновика заполнен.");
                }}
              >
                <Mic size={17} />
                Пример команды «5 000 тенге Арману»
              </button>
              <button
                className="btn forest full"
                disabled={!valid}
                onClick={() => {
                  setSeconds(risk ? 5 : 0);
                  setStage("review");
                  setSpeechNote("");
                }}
              >
                Проверить перевод
              </button>
            </>
          ) : (
            <>
              {risk && (
                <div className="warning">
                  <ShieldAlert />
                  <span>
                    <b>Проверьте реквизиты.</b> Если вас торопят или просят
                    перевести на «безопасный счёт», остановитесь.
                  </span>
                </div>
              )}
              <p role="status" className="fine">
                {seconds
                  ? "Пауза перед подтверждением · " + seconds + " с"
                  : "Сверьте сумму и получателя. Удерживайте кнопку мышью, пальцем или пробелом."}
              </p>
              <button
                className={"btn forest full hold " + (holding ? "holding" : "")}
                disabled={seconds > 0}
                onPointerDown={(e) => {
                  if (e.button !== 0) return;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  startHold();
                }}
                onPointerUp={stop}
                onLostPointerCapture={stop}
                onPointerCancel={stop}
                onBlur={stop}
                onKeyDown={(e) => {
                  if ([" ", "Enter"].includes(e.key)) {
                    e.preventDefault();
                    if (!e.repeat) startHold();
                  }
                }}
                onKeyUp={(e) => {
                  if ([" ", "Enter"].includes(e.key)) {
                    e.preventDefault();
                    stop();
                  }
                }}
              >
                <Fingerprint size={19} />
                {seconds ? "Подождите " + seconds + " с" : "Удерживать 1,5 с"}
              </button>
              <button
                className="text-btn"
                onClick={() => {
                  stop();
                  setStage("draft");
                }}
              >
                Изменить черновик
              </button>
            </>
          )}
        </>
      )}
      <small className="demo-note">
        Учебный сценарий · без списания средств
      </small>
    </div>
  );
}
