import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default async (ctx, inject) => {
  const runtimeConfig = ctx.$config && ctx.$config.googleAnalytics || {}
  const moduleOptions = <%= serialize(options) %>
  const options = {...moduleOptions, ...runtimeConfig}

  if (typeof options.asyncID === 'function') {
    options.id = await options.asyncID(ctx)
  }

  const id = options.id
  delete options.id

  Vue.use(VueGtag, {...{config: {id}}, ...options}, ctx.app.router)

  ctx.$gtag = Vue.$gtag
  inject('gtag', Vue.$gtag)

  // Aliases for backwards compatibility
  ctx.$ga = Vue.$gtag
  inject('ga', Vue.$gtag)
}
