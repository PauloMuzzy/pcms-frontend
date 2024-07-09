import { FindOptionListProps } from '@/services/option-list/find-option-list'

export interface OptionResponseModel {
  label: string
  value: string
}

export function convertOptions(
  options: FindOptionListProps[]
): OptionResponseModel[] {
  return options.map((option) => ({
    label: option.name,
    value: option.id
  }))
}
