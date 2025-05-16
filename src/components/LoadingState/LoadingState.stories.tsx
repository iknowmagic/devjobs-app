import type { Meta, StoryObj } from '@storybook/react'
import LoadingState from './LoadingState'

const meta: Meta<typeof LoadingState> = {
  title: 'Components/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof LoadingState>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
