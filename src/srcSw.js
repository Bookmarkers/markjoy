import {registerRoute} from 'workbox-routing'
import {StaleWhileRevalidate} from 'workbox-strategies'

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
)

workbox.core.skipWaiting()
workbox.core.clientsClaim()

registerRoute(
  ({request}) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
)

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
