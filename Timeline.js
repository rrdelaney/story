function Timeline (root) {
  this.steps = []
  this.root = root
}

Timeline.prototype.add = function (step) {
  this.steps.push(step)

  return this
}

Timeline.prototype.run = function () {
  var $root = $(this.root)
  var $document = $(document)

  function runStep (steps, index, max) {
    if (index === max) return

    var step = steps[index]
    var page = $(step.template)
    $root.append(page)

    if (step.on) step.on($document, page)

    var awaitStep = step.wait
      ? new Promise(function (resolve) { return step.wait(resolve) })
      : Promise.resolve()

    return awaitStep.then(function () {
      if (step.name) $document.trigger('@' + step.name)
      return new Promise(function (resolve) {
        step.run(resolve, page)
      })
    }).then(function () {
      if (step.name) $document.trigger('!' + step.name)
      return runStep(steps, index + 1, max)
    })
  }

  if (this.steps.length > 0) runStep(this.steps, 0, this.steps.length)
}

Timeline.wait = function (ms) {
  return function (done) {
    setTimeout(done, ms)
  }
}
