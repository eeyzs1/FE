import type { InjectionKey, Ref } from 'vue'

// ==================== InjectionKey 定义 ====================
//
// 💡 最佳实践：
// - 使用 Symbol 作为 key，避免全局命名冲突
// - 使用 InjectionKey<T> 泛型，让 provide/inject 自动推导类型
// - 集中管理 injection keys，方便维护和查找
// - 不使用字符串 key，因为字符串无法提供类型安全

export const themeKey: InjectionKey<Ref<'light' | 'dark'>> = Symbol('theme')
export const appNameKey: InjectionKey<Ref<string>> = Symbol('appName')
