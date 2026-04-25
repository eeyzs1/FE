import { createSignal, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { JSX } from "solid-js";
import HelloSolid from "./studies/01-hello-solid";
import JsxBasics from "./studies/02-jsx-basics";
import ComponentBasics from "./studies/03-components";
import SignalsDeep from "./studies/04-signals";
import EffectsDemo from "./studies/05-effects";
import MemosDemo from "./studies/06-memos";
import StoresDemo from "./studies/07-stores";
import PropsDemo from "./studies/08-props";
import ContextDemo from "./studies/09-context";
import LifecycleDemo from "./studies/10-lifecycle";
import StateManagementDemo from "./studies/11-state-management";
import ConditionalRendering from "./studies/12-conditional-rendering";
import ListRendering from "./studies/13-list-rendering";
import ErrorBoundaryDynamic from "./studies/14-error-dynamic-portal";
import ResourceDemo from "./studies/15-resource";
import SuspenseTransition from "./studies/16-suspense-transition";
import ReactiveUtils from "./studies/17-reactive-utils";
import AdvancedStore from "./studies/18-advanced-store";
import RefsDemo from "./studies/19-refs";
import DirectivesDemo from "./studies/20-directives";
import StylingDemo from "./studies/21-styling";
import TypeScriptDemo from "./studies/22-typescript";
import "./App.css";

interface StudyItem {
  id: string;
  label: string;
  phase: string;
  component: () => JSX.Element;
}

const studies: StudyItem[] = [
  { id: "01", label: "Hello SolidJS", phase: "阶段一", component: HelloSolid },
  { id: "02", label: "JSX 基础", phase: "阶段一", component: JsxBasics },
  { id: "03", label: "组件基础", phase: "阶段一", component: ComponentBasics },
  { id: "04", label: "Signals 深入", phase: "阶段二", component: SignalsDeep },
  { id: "05", label: "Effects 效果", phase: "阶段二", component: EffectsDemo },
  { id: "06", label: "Memos 派生值", phase: "阶段二", component: MemosDemo },
  { id: "07", label: "Stores 状态管理", phase: "阶段二", component: StoresDemo },
  { id: "08", label: "Props 属性传递", phase: "阶段三", component: PropsDemo },
  { id: "09", label: "Context 上下文", phase: "阶段三", component: ContextDemo },
  { id: "10", label: "组件生命周期", phase: "阶段三", component: LifecycleDemo },
  { id: "11", label: "状态管理模式", phase: "阶段三", component: StateManagementDemo },
  { id: "12", label: "条件渲染", phase: "阶段四", component: ConditionalRendering },
  { id: "13", label: "列表渲染", phase: "阶段四", component: ListRendering },
  { id: "14", label: "ErrorBoundary/Dynamic/Portal", phase: "阶段四", component: ErrorBoundaryDynamic },
  { id: "15", label: "createResource 数据获取", phase: "阶段五", component: ResourceDemo },
  { id: "16", label: "Suspense 与 Transition", phase: "阶段五", component: SuspenseTransition },
  { id: "17", label: "batch/untrack/on", phase: "阶段六", component: ReactiveUtils },
  { id: "18", label: "高级响应式工具", phase: "阶段六", component: AdvancedStore },
  { id: "19", label: "Refs 引用", phase: "阶段七", component: RefsDemo },
  { id: "20", label: "自定义指令", phase: "阶段七", component: DirectivesDemo },
  { id: "21", label: "样式", phase: "阶段七", component: StylingDemo },
  { id: "22", label: "TypeScript", phase: "阶段八", component: TypeScriptDemo },
];

const studyMap = new Map(studies.map((s) => [s.id, s.component]));

const navStyle = {
  width: "260px",
  "min-width": "260px",
  "border-right": "1px solid #e5e4e7",
  padding: "16px",
  overflow: "auto",
  background: "#fafafa",
} as const;

const navTitleStyle = { margin: "0 0 16px", "font-size": "18px", color: "#4a2c8a" } as const;

const homeBtnBaseStyle = {
  width: "100%",
  padding: "8px",
  "margin-bottom": "12px",
  border: "1px solid #ddd",
  "border-radius": "4px",
  cursor: "pointer",
  "text-align": "left",
} as const;

const studyBtnBaseStyle = {
  display: "block",
  width: "100%",
  padding: "6px 8px",
  "margin-bottom": "2px",
  border: "none",
  "border-radius": "4px",
  cursor: "pointer",
  "text-align": "left",
  "font-size": "13px",
} as const;

const mainStyle = { flex: 1, overflow: "auto" } as const;

const welcomeStyle = { padding: "40px", "max-width": "800px", margin: "0 auto" } as const;

const gridStyle = {
  display: "grid",
  "grid-template-columns": "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "12px",
} as const;

const cardStyle = {
  padding: "12px",
  border: "1px solid #e5e4e7",
  "border-radius": "8px",
  cursor: "pointer",
  transition: "all 0.2s",
} as const;

function App() {
  const [currentStudy, setCurrentStudy] = createSignal<string | null>(null);

  const currentComponent = () => {
    const id = currentStudy();
    if (!id) return null;
    return studyMap.get(id) ?? null;
  };

  return (
    <div style={{ display: "flex", "min-height": "100vh" }}>
      <nav style={navStyle}>
        <h2 style={navTitleStyle}>
          SolidJS 大师之路
        </h2>
        <button
          onClick={() => setCurrentStudy(null)}
          style={{
            ...homeBtnBaseStyle,
            background: currentStudy() === null ? "#4a2c8a" : "#fff",
            color: currentStudy() === null ? "#fff" : "#333",
          }}
        >
          📖 教程首页
        </button>
        <For each={studies}>
          {(study) => (
            <button
              onClick={() => setCurrentStudy(study.id)}
              style={{
                ...studyBtnBaseStyle,
                background: currentStudy() === study.id ? "#4a2c8a" : "transparent",
                color: currentStudy() === study.id ? "#fff" : "#333",
              }}
            >
              <span style={{ color: currentStudy() === study.id ? "#ddd" : "#999", "font-size": "11px" }}>
                {study.phase}
              </span>{" "}
              {study.id}. {study.label}
            </button>
          )}
        </For>
      </nav>

      <main style={mainStyle}>
        <Show
          when={currentStudy() === null}
          fallback={
            <Show when={currentComponent()} keyed>
              {(comp) => <Dynamic component={comp} />}
            </Show>
          }
        >
          <div style={welcomeStyle}>
            <h1 style={{ "font-size": "36px", "margin-bottom": "8px" }}>SolidJS 大师之路</h1>
            <p style={{ color: "#666", "font-size": "16px", "margin-bottom": "32px" }}>
              从零基础到精通，系统掌握 SolidJS 的每一个核心概念
            </p>
            <p style={{ "line-height": "1.8" }}>
              从左侧导航选择一个章节开始学习。每个章节都包含可交互的示例代码，
              帮助你理解 SolidJS 的核心概念。
            </p>
            <h2 style={{ "margin-top": "32px" }}>学习路径</h2>
            <div style={gridStyle}>
              <For each={studies}>
                {(study) => (
                  <div
                    onClick={() => setCurrentStudy(study.id)}
                    style={cardStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#4a2c8a";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e4e7";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ "font-size": "11px", color: "#999" }}>{study.phase}</div>
                    <div style={{ "font-weight": "500" }}>{study.id}. {study.label}</div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </main>
    </div>
  );
}

export default App;
