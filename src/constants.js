// report
export const CHART = 'График'
export const COMP_TABLE = 'Таблица сравнений'
export const ORDERS_TABLE = 'Таблица заявок'
export const CHART_TYPES = {
    DYNAMIC: 'Динамика',
    FOR_PERIOD: 'Классификаторы за период',
    COMPANIES: 'Компании по классификаторам'
}

// layers
export const START = 'START'
export const STATUSES = 'STATUSES'
export const CATEGORY = 'CATEGORY'
export const SPECIFICATION = 'SPECIFICATION'
export const DATE_RANGES = 'DATE_RANGES'
export const REPORT = 'REPORT'
export const LOADING = 'LOADING'

// categories
export const COMPANIES = 'Компании'
export const ADDRESSES = 'Адреса'
export const CLASSIFIERS = 'Классификаторы'
export const mapCategoryToProperty = cat => {
    const companies = 'Companies'
    const addrs = 'Addresses'
    const classifs = 'Classifiers'
    switch (cat) {
        case COMPANIES:
            return companies
        case ADDRESSES:
            return addrs
        case CLASSIFIERS:
            return classifs
        default:
            return companies
    }
}