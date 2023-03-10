import { Renderer } from "./renderer-interface"
import { ScopeConfig, ScopeRenderer } from "./scope"

export interface Renders {
    scope: Renderer<ScopeConfig>
}

export const renders = { scope: ScopeRenderer }