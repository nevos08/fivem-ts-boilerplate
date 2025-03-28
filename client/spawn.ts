const interval = setInterval(() => {
  if (NetworkIsPlayerActive(PlayerId())) {
    clearInterval(interval)

    DisplayRadar(false)
    DoScreenFadeOut(0)

    Wait(1000)

    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()

    // TODO Emit event to spawn the player
  }
})
