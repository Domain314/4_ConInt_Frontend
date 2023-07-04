import { mount } from '@vue/test-utils'
import { Mock, vi } from 'vitest'
import Register from '../src/components/RegisterForm.vue'

vi.mock('@/api', () => ({
    registerUser: vi.fn().mockResolvedValue({ id: '1' }),
}))

// Mock localStorage and router
const mockRouterPush = vi.fn()
const mockLocalStorage = vi.fn()
global.localStorage.setItem = mockLocalStorage
const userGroupA = 'A'
const userGroupB = 'B'

test('Register Component renders correct text for userGroup A', async () => {
    let wrapper = mount(Register, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { userGroup: userGroupA, username: '', password: '' }
        },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h2').text()).toContain('Register for')
})

test('Register Component renders correct text for userGroup B', async () => {
    let wrapper = mount(Register, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { userGroup: userGroupB, username: '', password: '' }
        },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h2').text()).toContain('Register for')
})

test('Register Component correctly handles form submission', async () => {
    let wrapper = mount(Register, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { userGroup: userGroupB, username: '', password: '' }
        },
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(mockRouterPush).toHaveBeenCalledWith('/todos')
})

test('Register Component correctly handles go to login button click', async () => {
    let wrapper = mount(Register, {
        global: {
            mocks: {
                $router: {
                    push: mockRouterPush,
                },
            },
        },
        data() {
            return { userGroup: userGroupB, username: '', password: '' }
        },
    })
    await wrapper.find('button[type="button"]').trigger('click')
    expect(mockRouterPush).toHaveBeenCalledWith('/login')
})

