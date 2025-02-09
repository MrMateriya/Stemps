type TSequentialTaskQueue = {
  add: (parameter: task) => Promise<void>,
  clear: () => void,
  getLength: () => number,
}

type queue = Array<() => Promise<void>>
type task = () => Promise<void>

class SequentialTaskQueue implements TSequentialTaskQueue {
  private queue: queue
  private isRunning: boolean

  constructor() {
    this.queue = []
    this.isRunning = false
  }

  add(task: task): Promise<void> {
    return new Promise((resolve, reject) => {
      const wrappedTask = () => {
        return Promise.resolve(task())
          .then(resolve)
          .catch(reject)
      }

      this.queue.push(wrappedTask)

      if (!this.isRunning) {
        this.runNextTask()
      }
    })
  }

  clear(): void {
    this.isRunning = false
    this.queue = []
  }


  runNextTask(): void {
    if (this.queue.length === 0) {
      this.isRunning = false
      return;
    }

    this.isRunning = true
    const nextTask: task = this.queue.shift()!

    nextTask()
      .finally(() => {
        this.runNextTask()
      })
  }

  getLength(): number {
    return this.queue.length
  }
}

export { SequentialTaskQueue, type TSequentialTaskQueue }