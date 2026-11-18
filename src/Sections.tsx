import { useState } from "react";
import {
  Activity,
  AudioLines,
  Banknote,
  Check,
  ChevronRight,
  Cpu,
  Database,
  Eye,
  Fingerprint,
  Hand,
  LayoutGrid,
  LockKeyhole,
  Mic,
  ScanEye,
  ShieldCheck,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import Accessibility from "./Accessibility";
import Transfer from "./Transfer";

export const names = [
  "Обзор",
  "Проблема",
  "Решение",
  "Путь пользователя",
  "Безопасный перевод",
  "Архитектура",
  "Внедрение",
  "Экономика",
  "Дорожная карта",
];
export const ids = [
  "overview",
  "barriers",
  "solution",
  "profile",
  "transfer",
  "architecture",
  "budget",
  "economics",
  "roadmap",
];
export function Head({
  index,
  title,
  lead,
}: {
  index: number;
  title: string;
  lead?: string;
}) {
  return (
    <header className="section-head">
      <div className="smallcap section-label">
        <span>
          {String(index + 1).padStart(2, "0")} / {names.length}
        </span>
        {names[index]}
      </div>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

export function Problem() {
  const rows = [
    [
      ScanEye,
      "Мелкие детали",
      "Баннеры, мелкий шрифт и тесная навигация мешают найти нужное действие.",
    ],
    [
      Users,
      "Сложный старт",
      "Часть клиентов прерывает регистрацию, когда рядом нет помощника.",
    ],
    [
      Banknote,
      "Лишний ноль",
      "Мелкие цифры и незаметная ошибка в реквизитах повышают риск неверного перевода.",
    ],
    [
      Wallet,
      "Возврат в отделение",
      "Простые операции переходят к сотрудникам, в банкоматы и контакт-центр.",
    ],
  ] as const;
  return (
    <>
      <Head
        index={1}
        title="Где прерывается цифровой путь"
        lead="Для пожилых людей, слабовидящих и пользователей с ограниченной моторикой даже привычная операция может потребовать помощи."
      />
      <div className="problem-grid">
        {rows.map(([I, title, body]) => (
          <article key={title}>
            <I />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
export function Solution() {
  const data = [
    [
      Eye,
      "Зрение",
      "100–200%",
      "Масштаб текста и высококонтрастные темы. Целевой контраст текста — до 7:1.",
    ],
    [
      Hand,
      "Моторика",
      "64–72 dp",
      "Крупные зоны касания и фильтр повторных нажатий длительностью 600 мс.",
    ],
    [
      LayoutGrid,
      "Простота",
      "1 колонка",
      "Основные действия на первом плане. Профиль меняет плотность привычного интерфейса.",
    ],
    [
      AudioLines,
      "Голос",
      "RU / ҚАЗ",
      "Озвучка, голосовой черновик и совместимость Android-прототипа с TalkBack.",
    ],
  ] as const;
  return (
    <>
      <Head
        index={2}
        title="Один профиль. Четыре настройки."
        lead="Accessibility Profile Engine объединяет системные параметры и короткую калибровку. Банковские функции сохраняются."
      />
      <div className="solution-grid">
        {data.map(([I, title, v, desc]) => (
          <article key={title}>
            <div className="icon-title">
              <I />
              {title}
            </div>
            <strong>{v}</strong>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </>
  );
}
export function Journey() {
  return (
    <>
      <Head
        index={3}
        title="Настройте свой экран"
        lead="Цель калибровки — около 30 секунд. Если пользователь бездействует 4,5 секунды, приложение предлагает озвучку. Затем он выбирает читаемый размер суммы, пробует касание и задаёт режим, язык и голос."
      />
      <Accessibility />
    </>
  );
}
export function Safety() {
  return (
    <>
      <Head index={4} title="Голос заполняет черновик" />
      <div className="two-col">
        <div className="story-list">
          {[
            [
              Mic,
              "Команда",
              "«Перевести пять тысяч тенге Арману». Пример команды заполняет два поля.",
            ],
            [
              Eye,
              "Проверка",
              "Сумма цифрами и прописью помогает заметить лишний ноль.",
            ],
            [
              ShieldCheck,
              "Антифрод-пауза",
              "Новый получатель или сумма от 50 000 ₸ запускают предупреждение и паузу на 5 секунд. Порог задаётся в правилах проекта.",
            ],
            [
              Fingerprint,
              "Подтверждение",
              "Только удержание в течение 1,5 секунды завершает сценарий. На совместимом устройстве срабатывает вибрация.",
            ],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Mic;
            return (
              <div className="story" key={String(title)}>
                <I />
                <div>
                  <h3>{String(title)}</h3>
                  <p>{String(desc)}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Transfer />
      </div>
    </>
  );
}
const modules = [
  {
    name: "Flutter",
    icon: Smartphone,
    title: "Входные сигналы",
    text: "Настройки Android, язык RU / ҚАЗ и три микро-теста описывают потребности пользователя.",
  },
  {
    name: "Accessibility Profile Engine",
    icon: Cpu,
    title: "Локальные правила",
    text: "Детерминированный движок вычисляет профиль доступности. Riverpod передаёт состояние виджетам, параметры сериализуются в JSON.",
  },
  {
    name: "UI & Voice Layer",
    icon: AudioLines,
    title: "Интерфейс и голос",
    text: "От масштаба 140% экран перестраивается. TalkBack Guard координирует озвучку, локальный парсер заполняет черновик.",
  },
  {
    name: "Secure Storage",
    icon: LockKeyhole,
    title: "Хранение профиля",
    text: "В архитектуре MVP предусмотрены Flutter Secure Storage и Android Keystore. Синхронизация профиля по API входит в план интеграции.",
  },
];
export function Architecture() {
  const [current, set] = useState(0);
  const item = modules[current];
  return (
    <>
      <Head
        index={5}
        title="Решение принимают локальные правила"
        lead="Архитектура Flutter MVP. Платёжный контур работает без внешних генеративных моделей."
      />
      <div className="nodes">
        {modules.map(({ name, icon: I }, i) => (
          <div key={name}>
            <button
              aria-pressed={i === current}
              onFocus={() => set(i)}
              onMouseEnter={() => set(i)}
              onClick={() => set(i)}
            >
              <I />
              <b>{name}</b>
            </button>
            {i < 3 && <ChevronRight className="connector" />}
          </div>
        ))}
      </div>
      <div className="module-info" aria-live="polite">
        <Database />
        <div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </div>
      <div className="metric-row">
        <div>
          <b>140%</b>порог перестройки
        </div>
        <div>
          <b>&lt; 1 КБ</b>JSON-профиль по кейсу
        </div>
        <div>
          <b>0 AI API</b>в платёжном контуре
        </div>
      </div>
    </>
  );
}

const expenses = [
  [
    "UI-Kit и адаптивное ядро",
    "3 нед.",
    "2 Flutter Middle+",
    "Темы и виджеты",
    2400000,
  ],
  [
    "Голос и локализация",
    "2 нед.",
    "Flutter + лингвист",
    "Парсер RU / ҚАЗ",
    1200000,
  ],
  ["Синхронизация", "1 нед.", "Backend Go / Java", "JSON API", 750000],
  ["QA и пилот", "2 нед.", "QA Automation", "Аудит и тесты", 950000],
] as const;
export function Budget() {
  return (
    <>
      <Head
        index={6}
        title="Восемь недель на интеграцию"
        lead="Предварительная оценка команды. Срок промышленного запуска зависит от банковских API, требований безопасности и согласований."
      />
      <div className="budget-layout">
        <div className="budget-summary">
          <svg className="budget-ring" viewBox="0 0 120 120" aria-hidden="true">
            {expenses.map(([name, , , , cost], i) => {
              const total = expenses.reduce((sum, row) => sum + row[4], 0);
              const start = expenses
                .slice(0, i)
                .reduce((sum, row) => sum + row[4], 0);
              const share = (cost / total) * 100;
              return (
                <circle
                  key={name}
                  cx="60"
                  cy="60"
                  r="50"
                  pathLength="100"
                  className={"tone-" + i}
                  fill="none"
                  strokeWidth="12"
                  strokeDasharray={`${share - 0.8} ${100 - share + 0.8}`}
                  strokeDashoffset={(-start / total) * 100}
                />
              );
            })}
          </svg>
          <div className="budget-top">
            <span>Бюджет внедрения</span>
            <strong>
              5,3 <em>млн ₸</em>
            </strong>
          </div>
        </div>
        <div className="budget-breakdown">
          <div className="stack-bar" aria-hidden="true">
            {expenses.map(([name, , , , cost], i) => (
              <i key={name} className={"tone-" + i} style={{ flex: cost }} />
            ))}
          </div>
          <div className="expense-list">
            {expenses.map(([name, duration, team, result, cost], i) => (
              <div key={name}>
                <span className={"swatch tone-" + i} />
                <span>
                  <b>{name}</b>
                  <small>
                    {team} · {result}
                  </small>
                </span>
                <span>{duration}</span>
                <strong>{cost.toLocaleString("ru-RU")} ₸</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="fine">
        В модели расходы на внешние LLM API — 0 ₸. Эксплуатация, безопасность и
        поддержка оцениваются отдельно.
      </p>
    </>
  );
}
export function Economics() {
  const [percent, set] = useState(100);
  const annual = (42.5 * percent) / 100,
    payback = Math.ceil(5.3 / (annual / 12));
  const fmt = (n: number) =>
    n.toLocaleString("ru-RU", { maximumFractionDigits: 2 });
  return (
    <>
      <Head
        index={7}
        title="Когда окупится внедрение?"
        lead="Сценарная модель проекта. Предполагаемый эффект предстоит проверить по регистрации клиентов 60+, обращениям, объёму операций и результатам антифрода."
      />
      <div className="economy">
        <div>
          <div className="smallcap">Годовой эффект по кейсу</div>
          <h3>
            42,5 <em>млн ₸</em>
          </h3>
          {[
            ["Нагрузка на отделения и контакт-центр", 18.5],
            ["Сохранение средств и операций в приложении", 24],
          ].map(([l, n], i) => (
            <div className="effect" key={l}>
              <span>{l}</span>
              <b>{fmt(+n)} млн ₸</b>
              <div>
                <i
                  className={"tone-" + i}
                  style={{ width: (+n / 42.5) * 100 + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="projection">
          <label htmlFor="effect">
            Доля достигнутого эффекта <b>{percent}%</b>
          </label>
          <input
            id="effect"
            type="range"
            min="10"
            max="100"
            step="5"
            value={percent}
            onChange={(e) => set(+e.target.value)}
          />
          <div className="forecast" aria-live="polite">
            <span>
              <b>{fmt(annual)}</b> млн ₸ / год
            </span>
            <span>
              <b>≈ {payback}</b> мес. до окупаемости
            </span>
          </div>
          <p className="fine">
            Разовый бюджет 5,3 млн ₸ делится на равномерный месячный эффект.
            Срок округлён вверх до целого месяца.
          </p>
        </div>
      </div>
    </>
  );
}

export function Roadmap() {
  return (
    <>
      <Head
        index={8}
        title="Следующий шаг — пилот"
        lead="Независимый UX-аудит и проверка с реальными клиентами покажут, какие сценарии готовы к интеграции."
      />
      <div className="ready">
        <Activity />
        <b>19 / 19</b>
        <span>
          автотестов по материалам кейса
          <br />6 экранов · Flutter / Android · RU / ҚАЗ
          <br />
          По данным команды, анализатор прошёл без ошибок.
        </span>
      </div>
      <div className="timeline">
        {[
          [
            "Январь 2027",
            "Проверка сценариев",
            "Фокус-группа пожилых и незрячих пользователей.",
          ],
          [
            "Февраль 2027",
            "Развитие функций",
            "QR-настройка от близкого и озвучка квитанций ЖКХ.",
          ],
          [
            "Март 2027",
            "Интеграция с bcc.kz",
            "Подготовка промышленного релиза после согласований.",
          ],
        ].map(([date, title, desc]) => (
          <article key={date}>
            <div className="smallcap">{date}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <div className="closing">
        <Check size={17} /> Независимая конкурсная разработка · ITU
        HACKATHON-2026
      </div>
    </>
  );
}
