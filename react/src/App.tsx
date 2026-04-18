import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import Layout from './components/Layout'
import Home from './pages/Home'

const Ch1JSX = lazy(() => import('./pages/chapter1/Ch1JSX'))
const Ch1Components = lazy(() => import('./pages/chapter1/Ch1Components'))
const Ch1Props = lazy(() => import('./pages/chapter1/Ch1Props'))
const Ch1State = lazy(() => import('./pages/chapter1/Ch1State'))
const Ch1Lifecycle = lazy(() => import('./pages/chapter1/Ch1Lifecycle'))
const Ch1Events = lazy(() => import('./pages/chapter1/Ch1Events'))
const Ch1Lists = lazy(() => import('./pages/chapter1/Ch1Lists'))
const Ch1ErrorBoundary = lazy(() => import('./pages/chapter1/Ch1ErrorBoundary'))

const Ch2UseEffect = lazy(() => import('./pages/chapter2/Ch2UseEffect'))
const Ch2UseRef = lazy(() => import('./pages/chapter2/Ch2UseRef'))
const Ch2UseMemo = lazy(() => import('./pages/chapter2/Ch2UseMemo'))
const Ch2UseCallback = lazy(() => import('./pages/chapter2/Ch2UseCallback'))
const Ch2UseContext = lazy(() => import('./pages/chapter2/Ch2UseContext'))
const Ch2CustomHooks = lazy(() => import('./pages/chapter2/Ch2CustomHooks'))
const Ch2React19 = lazy(() => import('./pages/chapter2/Ch2React19'))
const Ch2Router = lazy(() => import('./pages/chapter2/Ch2Router'))
const Ch2TypeScript = lazy(() => import('./pages/chapter2/Ch2TypeScript'))

const Ch3Button = lazy(() => import('./pages/chapter3/Ch3Button'))
const Ch3Input = lazy(() => import('./pages/chapter3/Ch3Input'))
const Ch3Form = lazy(() => import('./pages/chapter3/Ch3Form'))
const Ch3Table = lazy(() => import('./pages/chapter3/Ch3Table'))
const Ch3Modal = lazy(() => import('./pages/chapter3/Ch3Modal'))
const Ch3Message = lazy(() => import('./pages/chapter3/Ch3Message'))
const Ch3Layout = lazy(() => import('./pages/chapter3/Ch3Layout'))
const Ch3Select = lazy(() => import('./pages/chapter3/Ch3Select'))
const Ch3DatePicker = lazy(() => import('./pages/chapter3/Ch3DatePicker'))
const Ch3CheckboxRadio = lazy(() => import('./pages/chapter3/Ch3CheckboxRadio'))
const Ch3Upload = lazy(() => import('./pages/chapter3/Ch3Upload'))
const Ch3OtherEntry = lazy(() => import('./pages/chapter3/Ch3OtherEntry'))

const Ch4Theme = lazy(() => import('./pages/chapter4/Ch4Theme'))
const Ch4Intl = lazy(() => import('./pages/chapter4/Ch4Intl'))
const Ch4FormAdvanced = lazy(() => import('./pages/chapter4/Ch4FormAdvanced'))
const Ch4ProTable = lazy(() => import('./pages/chapter4/Ch4ProTable'))
const Ch4CardTabs = lazy(() => import('./pages/chapter4/Ch4CardTabs'))
const Ch4TooltipPopover = lazy(() => import('./pages/chapter4/Ch4TooltipPopover'))
const Ch4ListDescriptions = lazy(() => import('./pages/chapter4/Ch4ListDescriptions'))
const Ch4BadgeAvatarTimeline = lazy(() => import('./pages/chapter4/Ch4BadgeAvatarTimeline'))
const Ch4Notification = lazy(() => import('./pages/chapter4/Ch4Notification'))
const Ch4ProgressSpin = lazy(() => import('./pages/chapter4/Ch4ProgressSpin'))
const Ch4MenuDropdown = lazy(() => import('./pages/chapter4/Ch4MenuDropdown'))
const Ch4PaginationSteps = lazy(() => import('./pages/chapter4/Ch4PaginationSteps'))
const Ch4TreeTimeline = lazy(() => import('./pages/chapter4/Ch4TreeTimeline'))
const Ch4Drawer = lazy(() => import('./pages/chapter5/Ch5Drawer'))
const Ch4AlertResult = lazy(() => import('./pages/chapter5/Ch5AlertResult'))

const Ch5UtilityFirst = lazy(() => import('./pages/chapter5/Ch5UtilityFirst'))
const Ch5Layout = lazy(() => import('./pages/chapter5/Ch5Layout'))
const Ch5Responsive = lazy(() => import('./pages/chapter5/Ch5Responsive'))
const Ch5DarkMode = lazy(() => import('./pages/chapter5/Ch5DarkMode'))
const Ch5Animation = lazy(() => import('./pages/chapter5/Ch5Animation'))
const Ch5Custom = lazy(() => import('./pages/chapter5/Ch5Custom'))
const Ch5Typography = lazy(() => import('./pages/chapter5/Ch5Typography'))
const Ch5BackgroundsBorders = lazy(() => import('./pages/chapter5/Ch5BackgroundsBorders'))
const Ch5FiltersTransforms = lazy(() => import('./pages/chapter5/Ch5FiltersTransforms'))
const Ch5Interactivity = lazy(() => import('./pages/chapter5/Ch5Interactivity'))

const Ch6Dashboard = lazy(() => import('./pages/chapter6/Ch6Dashboard'))
const Ch6Admin = lazy(() => import('./pages/chapter6/Ch6Admin'))

const Ch7Perf = lazy(() => import('./pages/chapter7/Ch7Perf'))
const Ch7Pattern = lazy(() => import('./pages/chapter7/Ch7Pattern'))
const Ch7Deploy = lazy(() => import('./pages/chapter7/Ch7Deploy'))
const Ch7Testing = lazy(() => import('./pages/chapter7/Ch7Testing'))

const PageFallback = () => (
  <div className="flex items-center justify-center h-96">
    <Spin size="large" tip="加载中..." />
  </div>
)

function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ch1/jsx" element={<Ch1JSX />} />
          <Route path="ch1/components" element={<Ch1Components />} />
          <Route path="ch1/props" element={<Ch1Props />} />
          <Route path="ch1/state" element={<Ch1State />} />
          <Route path="ch1/lifecycle" element={<Ch1Lifecycle />} />
          <Route path="ch1/events" element={<Ch1Events />} />
          <Route path="ch1/lists" element={<Ch1Lists />} />
          <Route path="ch1/error-boundary" element={<Ch1ErrorBoundary />} />
          <Route path="ch2/useeffect" element={<Ch2UseEffect />} />
          <Route path="ch2/useref" element={<Ch2UseRef />} />
          <Route path="ch2/usememo" element={<Ch2UseMemo />} />
          <Route path="ch2/usecallback" element={<Ch2UseCallback />} />
          <Route path="ch2/usecontext" element={<Ch2UseContext />} />
          <Route path="ch2/custom-hooks" element={<Ch2CustomHooks />} />
          <Route path="ch2/react19" element={<Ch2React19 />} />
          <Route path="ch2/router" element={<Ch2Router />} />
          <Route path="ch2/typescript" element={<Ch2TypeScript />} />
          <Route path="ch3/button" element={<Ch3Button />} />
          <Route path="ch3/input" element={<Ch3Input />} />
          <Route path="ch3/form" element={<Ch3Form />} />
          <Route path="ch3/table" element={<Ch3Table />} />
          <Route path="ch3/modal" element={<Ch3Modal />} />
          <Route path="ch3/message" element={<Ch3Message />} />
          <Route path="ch3/layout" element={<Ch3Layout />} />
          <Route path="ch3/select" element={<Ch3Select />} />
          <Route path="ch3/datepicker" element={<Ch3DatePicker />} />
          <Route path="ch3/checkbox-radio" element={<Ch3CheckboxRadio />} />
          <Route path="ch3/upload" element={<Ch3Upload />} />
          <Route path="ch3/other-entry" element={<Ch3OtherEntry />} />
          <Route path="ch4/theme" element={<Ch4Theme />} />
          <Route path="ch4/intl" element={<Ch4Intl />} />
          <Route path="ch4/form-advanced" element={<Ch4FormAdvanced />} />
          <Route path="ch4/protable" element={<Ch4ProTable />} />
          <Route path="ch4/card-tabs" element={<Ch4CardTabs />} />
          <Route path="ch4/tooltip-popover" element={<Ch4TooltipPopover />} />
          <Route path="ch4/list-descriptions" element={<Ch4ListDescriptions />} />
          <Route path="ch4/badge-avatar-timeline" element={<Ch4BadgeAvatarTimeline />} />
          <Route path="ch4/notification" element={<Ch4Notification />} />
          <Route path="ch4/progress-spin" element={<Ch4ProgressSpin />} />
          <Route path="ch4/menu-dropdown" element={<Ch4MenuDropdown />} />
          <Route path="ch4/pagination-steps" element={<Ch4PaginationSteps />} />
          <Route path="ch4/tree-timeline" element={<Ch4TreeTimeline />} />
          <Route path="ch4/drawer" element={<Ch4Drawer />} />
          <Route path="ch4/alert-result" element={<Ch4AlertResult />} />
          <Route path="ch5/utility-first" element={<Ch5UtilityFirst />} />
          <Route path="ch5/layout" element={<Ch5Layout />} />
          <Route path="ch5/responsive" element={<Ch5Responsive />} />
          <Route path="ch5/dark-mode" element={<Ch5DarkMode />} />
          <Route path="ch5/animation" element={<Ch5Animation />} />
          <Route path="ch5/custom" element={<Ch5Custom />} />
          <Route path="ch5/typography" element={<Ch5Typography />} />
          <Route path="ch5/backgrounds-borders" element={<Ch5BackgroundsBorders />} />
          <Route path="ch5/filters-transforms" element={<Ch5FiltersTransforms />} />
          <Route path="ch5/interactivity" element={<Ch5Interactivity />} />
          <Route path="ch6/dashboard" element={<Ch6Dashboard />} />
          <Route path="ch6/admin" element={<Ch6Admin />} />
          <Route path="ch7/perf" element={<Ch7Perf />} />
          <Route path="ch7/pattern" element={<Ch7Pattern />} />
          <Route path="ch7/deploy" element={<Ch7Deploy />} />
          <Route path="ch7/testing" element={<Ch7Testing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
