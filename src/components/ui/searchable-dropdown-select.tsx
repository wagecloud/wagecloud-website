'use client'

import React from 'react'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, ChevronDown, X, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

interface Option {
  id: string
  label: string
  category?: string
}

interface SearchableDropdownSelectProps {
  value?: string[] | string
  options: Option[]
  placeholder?: string
  onSelectionChange?: (selected: string[]) => void
  multiSelect?: boolean
  className?: string
  infiniteRef?: React.Ref<HTMLDivElement>
  hasNextPage?: boolean
}

export function SearchableDropdownSelect({
  value = [],
  options,
  placeholder = 'Select options...',
  onSelectionChange,
  multiSelect = false,
  infiniteRef,
  hasNextPage = false,
  className,
}: Readonly<SearchableDropdownSelectProps>) {
  const [searchTerm, setSearchTerm] = useState('')
  if (typeof value === 'string') {
    value = [value] // Ensure value is always an array
  }
  const [selectedItems, setSelectedItems] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options
    return options.filter(
      option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
        || option.category?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [options, searchTerm])

  // Group options by category
  const groupedOptions = useMemo(() => {
    const groups: Record<string, Option[]> = {}
    filteredOptions.forEach((option) => {
      const category = option.category ?? 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(option)
    })
    return groups
  }, [filteredOptions])

  const handleSelect = (optionId: string) => {
    let newSelection: string[]

    if (multiSelect) {
      if (selectedItems.includes(optionId)) {
        newSelection = selectedItems.filter(id => id !== optionId)
      }
      else {
        newSelection = [...selectedItems, optionId]
      }
    }
    else {
      newSelection = [optionId]
      setIsOpen(false)
    }

    setSelectedItems(newSelection)
    onSelectionChange?.(newSelection)
  }

  const removeSelectedItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSelection = selectedItems.filter(id => id !== itemId)
    setSelectedItems(newSelection)
    onSelectionChange?.(newSelection)
  }

  const getSelectedLabels = () => {
    return selectedItems.map(id => options.find(opt => opt.id === id)?.label).filter(Boolean)
  }

  const getDisplayText = () => {
    const selectedLabels = getSelectedLabels()
    if (selectedLabels.length === 0) return placeholder
    if (selectedLabels.length === 1) return selectedLabels[0]
    return `${selectedLabels.length} selected`
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={cn('relative w-full', className)} ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full justify-between text-left font-normal h-10 px-3',
          !selectedItems.length && 'text-muted-foreground',
        )}
        type="button"
      >
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {multiSelect && selectedItems.length > 1
            ? (
                <span>{getDisplayText()}</span>
              )
            : (
                <>
                  {getSelectedLabels()
                    .slice(0, 2)
                    .map((label, index) => (
                      <Badge key={label} variant="secondary" className="text-xs px-1.5 py-0.5 h-5 flex items-center gap-1">
                        {label}
                        {multiSelect && (
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={e => removeSelectedItem(selectedItems[index], e)}
                          />
                        )}
                      </Badge>
                    ))}
                  {selectedItems.length === 0 && <span>{placeholder}</span>}
                  {selectedItems.length > 2 && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                      +
                      {selectedItems.length - 2}
                    </Badge>
                  )}
                </>
              )}
        </div>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search options..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
                autoFocus
              />
            </div>
          </div>

          {/* Options List */}
          <ScrollArea className="max-h-60 overflow-y-auto">
            {Object.keys(groupedOptions).length === 0
              ? (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    No options found for &quot;
                    {searchTerm}
                    &quot;
                  </div>
                )
              : (
                  <div className="p-1">
                    {Object.entries(groupedOptions).map(([category, categoryOptions], categoryIndex) => (
                      <div key={category}>
                        {Object.keys(groupedOptions).length > 1 && (
                          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{category}</div>
                        )}

                        <div className="space-y-0.5">
                          {categoryOptions.map(option => (
                            <div
                              key={option.id}
                              className="flex items-center space-x-2 px-2 py-1.5 rounded-sm hover:bg-accent cursor-pointer transition-colors"
                              onClick={() => handleSelect(option.id)}
                            >
                              {multiSelect && (
                                <Checkbox
                                  checked={selectedItems.includes(option.id)}
                                  // onChange={() => {}} // Handled by parent click
                                  className="pointer-events-none"
                                />
                              )}
                              <span className="flex-1 text-sm">{option.label}</span>
                              {selectedItems.includes(option.id) && <Check className="h-4 w-4 text-primary" />}
                            </div>
                          ))}
                          <Skeleton
                            ref={infiniteRef}
                            className={cn('h-8 w-full rounded-full flex items-center justify-center', {
                              hidden: !hasNextPage,
                            })}
                          >
                            loading...
                          </Skeleton>
                        </div>

                        {categoryIndex < Object.keys(groupedOptions).length - 1 && <Separator className="my-1" />}
                      </div>
                    ))}
                  </div>
                )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
