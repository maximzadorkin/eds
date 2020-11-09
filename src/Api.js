export const protocol = 'https'
export const domain = 'dev.dcorpse.keenetic.pro'
export const port = ''

export const getLink = () => {
    const link = `${protocol}://${domain}`
    return port ? `${link}:${port}` : link
}
export const typesLink = value =>
    `/api/eds/?type=${value}`
export const catsLink = (type, value) =>
    `/api/eds/?type=${type}&category=${value}&method=1`
export const specsLabelsLink = (type, cat) =>
    `/api/eds/?type=${type}&category=${cat}&method=2`
export const specsLink = (cat, value) =>
    `/api/eds/specifications/?category=${cat}&spec=${value}`
export const ReportTableLink = `/api/EDSChart/`
export const ReportXlsLink = `/api/EDSChart/file.xlsx/?`


export const ApiTypes = value =>
    `${getLink()}${typesLink(value)}`
// export const ApiCats = (type, value) =>
//     `${getLink()}${catsLink(type, value)}`
export const ApiSpecsLabels = (cat) =>
    `${getLink()}${specsLabelsLink('', cat)}`
export const ApiSpecs = (cat, value) =>
    `${getLink()}${specsLink(cat, value)}`
export const ApiReportTable = `${getLink()}${ReportTableLink}`
export const ApiReportXls = `${getLink()}${ReportXlsLink}`


// export const ApiTypes = value => `${getLink()}/types`
// export const ApiCats = (type, value) => `${getLink()}/cats`
// export const ApiSpecsLabels = (type, cat) => `${getLink()}/labels`
// export const ApiSpecs = (cat, value) => `${getLink()}/specs`
// export const ApiReportTable = () => `${getLink()}/table`
