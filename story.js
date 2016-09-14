/*
Instantiate Timeline with root element for operations

elem is always a jquery element

step objects => {
  name?: string [name of step]
  template: string [template for the element you will be controlling]
  wait?: (done) => void [after done is called run will start]
  run: (done, elem) => void [runs the step, template is mounted]
  on: (t, elem) => void [call t.on to listen to a step happening]
}

Listening:
  Call t.on to listen to other steps. @eventName is the start of an event
  !eventName is the end of an event
*/

var story = new Timeline('#root')

story.add({
  template: '<div class="page">HELLO!</div>',
  run: function (done, elem) {
    elem.fadeIn(done)
  },

  on: function (t, elem) {
    t.on('!hola', function () {
      elem.fadeOut()
    })
  }
})

story.add({
  name: 'hola',
  template: '<div class="page">HOla!</div>',
  wait: Timeline.wait(1000),
  run: function (done, elem) {
    elem.fadeIn(done)
  }
})

$(function () {
  story.run()
})
