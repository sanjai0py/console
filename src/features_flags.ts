import DrapeauService from '#services/drapeau_service'
import env from '#start/env'

/**
 * Authentication feature flags.
 */
DrapeauService.defineFeatureFlag('sign_up', () => env.get('ALLOW_PUBLIC_SIGNUP'))

DrapeauService.defineFeatureFlag(
  'sign_in:github',
  () => !!env.get('GITHUB_CLIENT_ID') && !!env.get('GITHUB_CLIENT_SECRET')
)

/**
 * Deployment feature flags.
 */
DrapeauService.defineFeatureFlag(
  'deployments:github',
  () =>
    !!env.get('GITHUB_APP_ID') &&
    !!env.get('GITHUB_APP_PRIVATE_KEY') &&
    !!env.get('GITHUB_APP_WEBHOOK_SECRET')
)
