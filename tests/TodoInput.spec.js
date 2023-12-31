import { mount } from '@vue/test-utils'
import TodoInput from '../src/components/TodoInput.vue'

test('should emit "new-todo" event with correct value on enter key press', async () => {
    const wrapper = mount(TodoInput)

    // Mock a value for the input
    const inputValue = 'Test Todo'
    await wrapper.setValue(inputValue)

    // Simulate pressing the enter key
    await wrapper.trigger('keyup.enter')

    // Check if 'new-todo' event is emitted with the correct value
    expect(wrapper.emitted()).toHaveProperty('new-todo')
    expect(wrapper.emitted()['new-todo'][0]).toEqual([null])
})

test('should clear the input value after pressing enter', async () => {
    const wrapper = mount(TodoInput)

    // Mock a value for the input
    const inputValue = 'Test Todo'
    await wrapper.setValue(inputValue)

    // Simulate pressing the enter key
    await wrapper.trigger('keyup.enter')

    // Check if the input value is cleared after pressing enter
    expect(wrapper.vm.value).toBeNull()
})
