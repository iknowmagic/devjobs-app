import type { Meta, StoryObj } from '@storybook/react'
import JobCard from './JobCard'

const meta: Meta<typeof JobCard> = {
  title: 'Components/JobCard',
  component: JobCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof JobCard>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
