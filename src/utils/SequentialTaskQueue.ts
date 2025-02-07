type task = () => Promise<void>;

interface ISequentialTaskQueue {
  add: (parameter: task) => Promise<void>,
  clear: () => void,
  getLength: () => number,
}

class SequentialTaskQueue implements ISequentialTaskQueue {
  private queue: Array<() => Promise<void>>
  private isRunning: boolean;

  constructor() {
    this.queue = []; // Очередь задач
    this.isRunning = false; // Флаг, указывающий, выполняется ли задача в данный момент
  }

  // Добавление задачи в очередь
  add(task: task): Promise<void> {
    return new Promise((resolve, reject) => {
      // Обертываем задачу, чтобы можно было обработать её завершение
      const wrappedTask = () => {
        return Promise.resolve(task())
          .then(resolve) // Разрешаем промис, если задача выполнена успешно
          .catch(reject); // Отклоняем промис, если задача завершилась с ошибкой
      };

      // Добавляем задачу в очередь
      this.queue.push(wrappedTask);

      // Запускаем выполнение очереди, если она не выполняется
      if (!this.isRunning) {
        this.runNextTask();
      }
    });
  }

  clear(): void {
    this.isRunning = false;
    this.queue = []
  }

  // Запуск следующей задачи из очереди
  runNextTask(): void {
    if (this.queue.length === 0) {
      this.isRunning = false; // Очередь пуста, останавливаем выполнение
      return;
    }

    this.isRunning = true; // Устанавливаем флаг выполнения
    const nextTask: task = this.queue.shift()!; // Извлекаем следующую задачу из очереди

    // Выполняем задачу и после её завершения запускаем следующую
    nextTask()
      .finally(() => {
        this.runNextTask(); // Рекурсивно запускаем следующую задачу
      });
  }

  getLength(): number {
    return this.queue.length;
  }
}

export { SequentialTaskQueue, type ISequentialTaskQueue }