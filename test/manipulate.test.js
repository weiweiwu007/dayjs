import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../src'
import '../src/locale/zh-cn'
import '../src/locale/ar'

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('StartOf EndOf', () => {
  it('StartOf EndOf Year ... with s and upper case', () => {
    const testArr = ['Year', 'year', 'YearS', 'month', 'day', 'date',
      'week', 'hour', 'minute', 'second']
    testArr.forEach((d) => {
      expect(dayjs().startOf(d).valueOf()).toBe(moment().startOf(d).valueOf())
      expect(dayjs().endOf(d).valueOf()).toBe(moment().endOf(d).valueOf())
    })
  })

  it('StartOf EndOf Other -> no change', () => {
    expect(dayjs().startOf('otherString').valueOf()).toBe(moment().startOf('otherString').valueOf())
    expect(dayjs().endOf('otherString').valueOf()).toBe(moment().endOf('otherString').valueOf())
  })

  it('StartOf week with locale', () => {
    const testDate = [undefined, '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16']
    const testLocale = ['zh-cn', 'ar', 'en']
    testDate.forEach((d) => {
      testLocale.forEach((l) => {
        expect(dayjs(d).locale(l).startOf('week').date())
          .toBe(moment(d).locale(l).startOf('week').date())
        expect(dayjs(d).locale(l).endOf('week').date())
          .toBe(moment(d).locale(l).endOf('week').date())
      })
    })
  })
})


it('Add Time days', () => {
  expect(dayjs().add(1, 'ms').valueOf()).toBe(moment().add(1, 'ms').valueOf())
  expect(dayjs().add(1, 'milliseconds').valueOf()).toBe(moment().add(1, 'milliseconds').valueOf())
  expect(dayjs().add(1, 's').valueOf()).toBe(moment().add(1, 's').valueOf())
  expect(dayjs().add(1, 'seconds').valueOf()).toBe(moment().add(1, 'seconds').valueOf())
  expect(dayjs().add(1, 'm').valueOf()).toBe(moment().add(1, 'm').valueOf())
  expect(dayjs().add(1, 'minutes').valueOf()).toBe(moment().add(1, 'minutes').valueOf())
  expect(dayjs().add(1, 'h').valueOf()).toBe(moment().add(1, 'h').valueOf())
  expect(dayjs().add(1, 'hours').valueOf()).toBe(moment().add(1, 'hours').valueOf())
  expect(dayjs().add(1, 'w').valueOf()).toBe(moment().add(1, 'w').valueOf())
  expect(dayjs().add(1, 'weeks').valueOf()).toBe(moment().add(1, 'weeks').valueOf())
  expect(dayjs().add(1, 'd').valueOf()).toBe(moment().add(1, 'd').valueOf())
  expect(dayjs().add(1, 'days').valueOf()).toBe(moment().add(1, 'days').valueOf())
  expect(dayjs().add(1, 'M').valueOf()).toBe(moment().add(1, 'M').valueOf())
  expect(dayjs().add(1, 'y').valueOf()).toBe(moment().add(1, 'y').valueOf())
  expect(dayjs('20111031').add(1, 'months').valueOf()).toBe(moment('20111031').add(1, 'months').valueOf())
  expect(dayjs('20160131').add(1, 'months').valueOf()).toBe(moment('20160131').add(1, 'months').valueOf())
  expect(dayjs('20160229').add(1, 'year').valueOf()).toBe(moment('20160229').add(1, 'year').valueOf())

  expect(dayjs().add('2', 'years').valueOf()).toBe(moment().add('2', 'years').valueOf())
})

describe('Month-end arithmetic', () => {
  const cases = [
    ['2020-01-31', 'add', '2020-02-29'],
    ['2021-01-31', 'add', '2021-02-28'],
    ['2020-03-31', 'subtract', '2020-02-29'],
    ['2021-03-31', 'subtract', '2021-02-28']
  ]

  cases.forEach(([date, operation, expected]) => {
    it(`${date} ${operation} one month preserves noon and the original`, () => {
      const original = dayjs(`${date}T12:00:00.000`)
      const timestamp = original.valueOf()
      const result = original[operation](1, 'month')

      expect(result.format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(`${expected} 12:00:00.000`)
      expect(result).not.toBe(original)
      expect(original.valueOf()).toBe(timestamp)
    })
  })
})

it('Add Time with decimal', () => {
  expect(dayjs().add(0.4, 'day').valueOf()).toBe(moment().add(0.4, 'day').valueOf())
  expect(dayjs().add(0.5, 'day').valueOf()).toBe(moment().add(0.5, 'day').valueOf())
  expect(dayjs().add(0.4, 'week').valueOf()).toBe(moment().add(0.4, 'week').valueOf())
  expect(dayjs().add(0.5, 'week').valueOf()).toBe(moment().add(0.5, 'week').valueOf())
})

it('Subtract Time days', () => {
  expect(dayjs().subtract(1, 'days').valueOf()).toBe(moment().subtract(1, 'days').valueOf())
})
