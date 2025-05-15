import type { Meta, StoryObj } from '@storybook/react'
import JobModal from './JobModal'

const meta: Meta<typeof JobModal> = {
  title: 'Components/JobModal',
  component: JobModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof JobModal>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
