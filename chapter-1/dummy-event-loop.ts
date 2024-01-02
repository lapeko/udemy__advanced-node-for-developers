const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

const shouldContinue = () => {
  // Check one: is there a pending setTimeout, setInterval, or setImmediate?
  // Check two: is there a pending OS task, like a TCP socket connection or port listening?
  // Check three: is there a pending long-running operation, like fs module reading a file?
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
};

while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called. setTimeout, setInterval
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Pause execution. Continue when...
  //  - a new pendingOSTask is done
  //  - a new pendingOperation is done
  //  - a timer is about to complete
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
}
