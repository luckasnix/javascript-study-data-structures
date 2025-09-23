class StackNode<Data> {
  public data: Data;
  public prev: StackNode<Data> | null;

  constructor(data: Data, prev?: StackNode<Data> | null) {
    this.data = data;
    this.prev = prev ?? null;
  }
}

class Stack<Data> {
  private first: StackNode<Data> | null;
  private last: StackNode<Data> | null;
  public size: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  private isEmpty() {
    if (this.first === null && this.last === null && this.size === 0) {
      return true;
    }
    return false;
  }

  public push(data: Data) {
    const nodeToPush = new StackNode(data);
    if (this.isEmpty()) {
      this.first = nodeToPush;
      this.last = nodeToPush;
    } else {
      nodeToPush.prev = this.last;
      this.last = nodeToPush;
    }
    this.size++;
    return this.size;
  }

  public pop() {
    if (this.isEmpty()) {
      return null;
    }
    const nodeDataToPop = this.last?.data;
    if (this.first === this.last && this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.last = this.last?.prev as StackNode<Data>;
    }
    this.size--;
    return nodeDataToPop as Data;
  }

  public peek() {
    return this.last;
  }
}
