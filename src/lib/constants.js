export const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cms.mksales.co.in'

export const GRAPHQL_ENDPOINT = `${WORDPRESS_URL}/graphql`
export const CF7_FEEDBACK_URL = `${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/8992/feedback`

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID