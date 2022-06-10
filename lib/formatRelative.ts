import { format } from 'date-fns'

export function formatRelative(date: number | Date): string {
  let diff = Math.abs(Date.now() - new Date(date).getTime()) / 1000 / 3600 | 0
  if (diff < 1) return 'now'
  if (diff === 1) return `1 hour ago`
  if (diff < 24) return `${diff} hours ago`
  diff = diff / 24 | 0
  if (diff == 1) return `1 day ago`
  if (diff < 30) return `${diff} days ago`
  return format(date, 'dd MMM yyyy')
}
