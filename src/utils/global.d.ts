export {}

declare global {
    interface Window {
        pug: {
            compile: (source: string, options?: Record<string, any>) => Function
        }
    }
}
