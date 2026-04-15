import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFetch } from '../useFetch'
import { ref } from 'vue'

describe('useFetch', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.restoreAllMocks()
  })

  it('should initialize with null data and not loading', () => {
    const { data, error, isLoading } = useFetch<string>('')

    expect(data.value).toBeNull()
    expect(error.value).toBeNull()
    expect(isLoading.value).toBe(false)
  })

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, title: 'Test Todo' }
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    const url = ref('https://jsonplaceholder.typicode.com/todos/1')
    const { data, isLoading } = useFetch<typeof mockData>(url)

    await vi.waitFor(() => {
      expect(isLoading.value).toBe(false)
    })

    expect(data.value).toEqual(mockData)
  })

  it('should handle fetch errors', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response)

    const url = ref('https://example.com/not-found')
    const { error, isLoading } = useFetch(url)

    await vi.waitFor(() => {
      expect(isLoading.value).toBe(false)
    })

    expect(error.value).toBe('HTTP 404')
  })

  it('should handle network errors', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValueOnce(new Error('Network error'))

    const url = ref('https://example.com/fail')
    const { error, isLoading } = useFetch(url)

    await vi.waitFor(() => {
      expect(isLoading.value).toBe(false)
    })

    expect(error.value).toBe('Network error')
  })

  it('should not fetch when url is empty', () => {
    const url = ref('')
    useFetch(url)

    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('should set isLoading during fetch', async () => {
    let resolveFetch!: (value: any) => void
    const fetchPromise = new Promise(resolve => {
      resolveFetch = resolve
    })
    vi.mocked(globalThis.fetch).mockReturnValueOnce(fetchPromise as any)

    const url = ref('https://example.com/loading')
    const { isLoading } = useFetch(url)

    expect(isLoading.value).toBe(true)

    resolveFetch({ ok: true, json: () => Promise.resolve({}) })

    await vi.waitFor(() => {
      expect(isLoading.value).toBe(false)
    })
  })
})
