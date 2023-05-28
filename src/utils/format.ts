import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
//format默认值'YYYY-MM-DD HH:mm:ss'
export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss'
) {
  const formatAt = dayjs.utc(utcString).utcOffset(8).format(format)
  return formatAt
}
