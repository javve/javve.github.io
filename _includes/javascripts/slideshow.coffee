$('.slideshow').each ->
  $me = $ @
  $slidesContainer = $me.find('.slides')
  $slides = $slidesContainer.find('.slide')
  $slidesContainer.width $slides.width() * $slides.size()
  active = ''
  resizeTimeout = null

  setActive = (name) ->
    active = name
    $me.find('[data-slide-link]').removeClass 'active'
    $me.find('[data-slide-link="'+name+'"]').addClass 'active'
    $slides.each (i) ->
      if $(@).data('slide-name') == name
        dynamics.animate($slidesContainer[0], {
          translateX: (i * $slides.width() * -1)
        }, {
          type: dynamics.spring,
          frequency: 150,
          friction: 400,
          duration: 1700
        })

  setActive $($slides[0]).data('slide-name')
  $me.find('[data-slide-link]').each ->
    $(@).on 'click', (e) ->
      e.preventDefault()
      setActive $(@).data('slide-link')

  $(window).resize ->
    clearTimeout resizeTimeout
    resizeTimeout = setTimeout ->
      setActive active
    , 100
  $me.find('[data-slide-hide-cover="true"]').on 'click', ->
    $me.find('.slide-cover').addClass 'hide'
    setTimeout ->
      $me.removeClass 'show-cover'
    , 300
