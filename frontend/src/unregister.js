try {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(registration) {
      console.log('removing registration', registration)
      registration.unregister()
    })
  })
} catch (e) {
  console.log('failed to unregister all service workers', e)
}
