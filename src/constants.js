// report
export const CHART = 'График'
export const COMP_TABLE = 'Таблица сравнений'
export const ORDERS_TABLE = 'Таблица заявок'
export const CHART_TYPES = {
    DYNAMIC: {
        label: 'Динамика',
        name: 'dynamic'
    },
    CLASSIFIERS: {
        label: 'Классификаторы за период',
        name: 'column'
    },
    COMPANIES: {
        label: 'Компании по классификаторам',
        name: 'bar'
    }
}

// layers
export const START = 'START'
export const STATUSES = 'STATUSES'
export const DATE_RANGES = 'DATE_RANGES'
export const REPORT = 'REPORT'
export const LOADING = 'LOADING'

// categories
export const COMPANIES = 'Компании'
export const CLASSIFIERS = 'Классификаторы'
export const ADDRESSES = 'Адреса'
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