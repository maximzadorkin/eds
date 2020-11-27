const protocol = 'https'
const domain = 'dev.dcorpse.keenetic.pro'
const port = ''

const getLink = () => {
    const link = `${protocol}://${domain}`
    return port ? `${link}:${port}` : link
}

const typesLink = value =>
    `/api/eds/?type=${value}`
//export const catsLink = (type, value) =>
  //  `/api/eds/?type=${type}&category=${value}&method=1`
const specsLabelsLink = (type, cat) =>
    `/api/eds/?type=${type}&category=${cat}&method=2`
const specsLink = (cat, value) =>
    `/api/eds/specifications/?category=${cat}&spec=${value}`
const ReportStatistic = (chart, a, b) => `/api/eds/getpoints/?chart=${chart}&a1=${a}&a2=${b}`
const ReportXlsLink = `/api/EDSChart/file.xlsx/?`



export const ApiTypes = value =>
    `${getLink()}${typesLink(value)}`
export const ApiSpecsLabels = (cat) =>
    `${getLink()}${specsLabelsLink('', cat)}`
export const ApiSpecs = (cat, value) =>
    `${getLink()}${specsLink(cat, value)}`
export const ApiStatistic = (chart = '', a = '', b = '') => `${getLink()}${ReportStatistic(chart, a, b)}`
export const ApiReportXls = `${getLink()}${ReportXlsLink}`

