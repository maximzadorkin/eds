const protocol = 'https'
const domain = 'dev.dcorpse.keenetic.pro'
const port = ''

const getLink = () => {
    const link = `${protocol}://${domain}`
    return port ? `${link}:${port}` : link
}

const typesLink = value =>
    `/api/eds/?type=${value}`
const specsLink = (cat, value) =>
    `/api/eds/specifications/?category=${cat}&spec=${value}`
const ReportStatistic = (chart, a, b) => `/api/eds/getpoints/?chart=${chart}&a1=${a}&a2=${b}`
const ReportXlsLink = `/api/eds/test`



export const ApiTypes = value =>
    `${getLink()}${typesLink(value)}`
export const ApiSpecs = (cat, value) =>
    `${getLink()}${specsLink(cat, value)}`
export const ApiReport = () =>`${getLink()}/api/eds/getappsbyfilter/?`
export const ApiStatistic = (chart = 'dynamic', a = '', b = '') => `${getLink()}${ReportStatistic(chart, a, b)}`
export const ApiReportXls = `${getLink()}${ReportXlsLink}`

