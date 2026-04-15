import type { InjectionKey, Ref } from 'vue'

export const themeKey: InjectionKey<Ref<'light' | 'dark'>> = Symbol('theme')
export const appNameKey: InjectionKey<Ref<string>> = Symbol('appName')
