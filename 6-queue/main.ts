class QueueNode<Data> {
  public data: Data;
  public next: QueueNode<Data> | null;

  constructor(data: Data, next?: QueueNode<Data> | null) {
    this.data = data;
    this.next = next ?? null;
  }
}

class Queue<Data> {
  private first: QueueNode<Data> | null;
  private last: QueueNode<Data> | null;
  public size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  public isEmpty() {
    if (this.first === null && this.last === null && this.size === 0) {
      return true;
    }
    return false;
  }

  public enqueue(data: Data) {
    const nodeToEnqueue = new QueueNode(data);
    if (this.isEmpty()) {
      this.first = nodeToEnqueue;
      this.last = nodeToEnqueue;
    } else {
      if (this.last) {
        this.last.next = nodeToEnqueue;
        this.last = nodeToEnqueue;
      }
    }
    this.size++;
    return this.size;
  }

  public dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const nodeDataToDequeue = this.first?.data;
    if (this.first === this.last && this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first?.next as QueueNode<Data>;
    }
    this.size--;
    return nodeDataToDequeue as Data;
  }

  public peek() {
    return this.first;
  }
}
