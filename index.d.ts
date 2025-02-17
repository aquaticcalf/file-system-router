import React from 'react'
import { Route } from 'react-router-dom'

export function generateRoutes(
  pages: Record<string, { default: React.ComponentType }>
): Array<React.ReactElement<typeof Route>>

export function FileSystemRouter(props: {
  pages: Record<string, { default: React.ComponentType }>
}): React.ReactElement