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
}
