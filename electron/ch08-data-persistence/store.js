const fs = require('node:fs')
const path = require('node:path')
const { app } = require('electron')

// ============================================================
// 简易 Store 类 — 基于 JSON 文件的键值存储
// ============================================================
//
// 【核心概念】
// 这是 electron-store 库的简化版本，帮助你理解底层原理：
// 1. 数据存储在 userData 目录下的 JSON 文件中
// 2. 支持嵌套键访问 (如 'settings.fontSize')
// 3. 支持默认值（深度合并）
// 4. 每次修改自动写入磁盘
//
// 生产环境建议使用 electron-store 库，它更健壮
// ============================================================

function deepMerge(target, source) {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

class Store {
  constructor(options = {}) {
    const userDataPath = app.getPath('userData')
    this.path = path.join(userDataPath, options.name || 'config.json')
    const loaded = this._load()
    this.data = options.defaults ? deepMerge(options.defaults, loaded) : loaded
  }

  _load() {
    try {
      if (fs.existsSync(this.path)) {
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
      }
    } catch (error) {
      console.error('Store load error:', error)
    }
    return {}
  }

  _save() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2), 'utf-8')
    } catch (error) {
      console.error('Store save error:', error)
    }
  }

  get(key) {
    if (!key) return this.data
    return key.split('.').reduce((obj, k) => obj?.[k], this.data)
  }

  set(key, value) {
    const keys = key.split('.')
    let obj = this.data
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in obj)) obj[keys[i]] = {}
      obj = obj[keys[i]]
    }
    obj[keys[keys.length - 1]] = value
    this._save()
  }

  delete(key) {
    const keys = key.split('.')
    let obj = this.data
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]]
      if (!obj) return
    }
    delete obj[keys[keys.length - 1]]
    this._save()
  }

  getAll() {
    return { ...this.data }
  }
}

module.exports = Store
