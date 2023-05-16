export * from './client';
export * from './interpreter'

declare global {
    interface String {
        escape(): string | null
        unescape(): string | null
    }
}