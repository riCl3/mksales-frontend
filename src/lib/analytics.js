import { GA_MEASUREMENT_ID } from './constants'

const isAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function'

export function trackEvent(eventName, params = {}) {
  if (!isAvailable() || !GA_MEASUREMENT_ID) return
  window.gtag('event', eventName, params)
}

export function trackSearch(query, resultsCount) {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
  })
}

export function trackProductView(name, slug, category) {
  trackEvent('view_item', {
    item_name: name,
    item_id: slug,
    item_category: category || 'Uncategorized',
  })
}
