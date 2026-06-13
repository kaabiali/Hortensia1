type LogLevel = 'info' | 'warn' | 'error'

function log(level: LogLevel, event: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [${level.toUpperCase()}] [${event}]`
  if (meta) {
    console[level](prefix, JSON.stringify(meta))
  } else {
    console[level](prefix)
  }
}

export const logger = {
  info: (event: string, meta?: Record<string, unknown>) => log('info', event, meta),
  warn: (event: string, meta?: Record<string, unknown>) => log('warn', event, meta),
  error: (event: string, meta?: Record<string, unknown>) => log('error', event, meta),
}
