import React from "react"
import { Route, Routes } from "react-router-dom"

function convert_file_path_to_route_path(key) {
    const match = key.match(/pages\/(.*)\.(jsx|tsx)$/)

    if (!match) {
        throw new Error(`invalid page path : ${key}`)
    }

    const path_without_pages = match[1]
    const segments = path_without_pages.split('/')

    const route_segments = segments.map(segment => {
        if (segment === 'index') return ''
        if (segment.startsWith('[...') && segment.endsWith(']')) return '*'
        if (segment.startsWith('[') && segment.endsWith(']')) return `:${segment.slice(1, -1)}`
        return segment
    })

    let filtered_segments = [...route_segments]
    while (filtered_segments.length > 0 && filtered_segments[filtered_segments.length - 1] === '') {
        filtered_segments.pop()
    }

    let route_path = filtered_segments.join('/')
    return route_path === '' ? '/' : `/${route_path}`
}

export function generateRoutes(pages) {
    return Object.entries(pages).map(([key, module]) => {
        const route_path = convert_file_path_to_route_path(key)
        const Component = module.default
        return <Route key={route_path} path={route_path} element={<Component />} />
    })
}

export function FileSystemRouter({ pages }) {
    return <Routes>{generateRoutes(pages)}</Routes>;
}