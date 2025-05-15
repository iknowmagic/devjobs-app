import type { Meta, StoryObj } from '@storybook/react'
import JobsList from './JobsList'

const meta: Meta<typeof JobsList> = {
  title: 'Components/JobsList',
  component: JobsList,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof JobsList>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
