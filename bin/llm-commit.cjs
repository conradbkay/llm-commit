#!/usr/bin/env node

const EXIT_CODES = {
  SUCCESS: 0,
  ERROR: 1
}

function setupErrorHandlers() {
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
    process.exit(EXIT_CODES.ERROR)
  })

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Promise Rejection:', reason)
    process.exit(EXIT_CODES.ERROR)
  })

  function shutdown() {
    process.exit(EXIT_CODES.SUCCESS)
  }

  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT. Shutting down...')
    shutdown()
  })
  process.on('SIGTERM', shutdown)
}

;(async () => {
  try {
    setupErrorHandlers()

    const { run } = await import('../lib/cli.js')
    await run()
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fatal Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    } else {
      console.error('Fatal Error:', error)
    }

    process.exit(EXIT_CODES.ERROR)
  }
})()
