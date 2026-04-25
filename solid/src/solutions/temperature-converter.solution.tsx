import { createSignal } from "solid-js";

export default function TemperatureConverterSolution() {
  const [celsius, setCelsius] = createSignal(0);
  const [fahrenheit, setFahrenheit] = createSignal(32);

  const updateCelsius = (value: string) => {
    const c = parseFloat(value) || 0;
    setCelsius(c);
    setFahrenheit(Math.round(c * 9 / 5 + 32));
  };

  const updateFahrenheit = (value: string) => {
    const f = parseFloat(value) || 0;
    setFahrenheit(f);
    setCelsius(Math.round((f - 32) * 5 / 9));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>温度转换器 — 参考答案</h2>
      <div style={{ display: "flex", gap: "16px", "align-items": "center" }}>
        <label>
          摄氏度:
          <input
            type="number"
            value={celsius()}
            onInput={(e) => updateCelsius(e.currentTarget.value)}
            style={{ width: "80px", "margin-left": "8px" }}
          />
        </label>
        <span>⇄</span>
        <label>
          华氏度:
          <input
            type="number"
            value={fahrenheit()}
            onInput={(e) => updateFahrenheit(e.currentTarget.value)}
            style={{ width: "80px", "margin-left": "8px" }}
          />
        </label>
      </div>
    </div>
  );
}
