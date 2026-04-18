"use client";

import { Agentation as AgentationToolbar } from "agentation";

/**
 * Visual feedback toolbar for the designer.
 * Mounted globally — click elements in the running app to grab selectors + notes.
 * Only renders in development; the bundle is tree-shaken in production.
 */
export function Agentation() {
  if (process.env.NODE_ENV === "production") return null;
  return <AgentationToolbar />;
}
