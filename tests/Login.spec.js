import { mount } from '@vue/test-utils'
import { Mock, vi } from 'vitest'

import Login from '../src/components/LoginForm.vue'

vi.mock('@/api', () => ({
    loginUser: vi.fn().mockResolvedValue({ id: '1' }),
}))

const mockRouterPush = vi.fn()
const mockLocalStorage = vi.fn()
global.localStorage.setItem = mockLocalStorage

test('Login Component renders correct text', async () => {
    let wrapper = mount(Login, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { username: '', password: '' }
        },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h2').text()).toContain('hsdggin')
})

test('Login Component correctly handles form submission', async () => {
    let wrapper = mount(Login, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { username: '', password: '' }
        },
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(mockRouterPush).toHaveBeenCalledWith('/todos')
})

test('Login Component correctly handles go to register button click', async () => {
    let wrapper = mount(Login, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { username: '', password: '' }
        },
    })
    await wrapper.find('button[type="button"]').trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/register')
})
