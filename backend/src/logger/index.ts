// * 3 - Create the logger
import logger from 'pino'
import dayjs from 'dayjs'

// Format logger with prettyPrint
const log = logger({
  prettyPrint: true,
  base: { pid: false },
  // Format timestamp with dayjs
  timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log
