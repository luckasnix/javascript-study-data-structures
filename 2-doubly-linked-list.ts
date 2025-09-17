class DoublyLinkedListNode<NodeData> {
  public data: NodeData;
  public prev: DoublyLinkedListNode<NodeData> | null;
  public next: DoublyLinkedListNode<NodeData> | null;

  constructor(
    data: NodeData,
    prev?: DoublyLinkedListNode<NodeData>,
    next?: DoublyLinkedListNode<NodeData>,
  ) {
    this.data = data;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

class DoublyLinkedList<NodeData> {
  public head: DoublyLinkedListNode<NodeData> | null;
  public tail: DoublyLinkedListNode<NodeData> | null;
  public length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public push(data: NodeData) {
    const node = new DoublyLinkedListNode(data);
    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  public pop() {
    if (this.head === this.tail && this.length > 0) {
      const oldTailData = this.tail?.data;
      this.head = null;
      this.tail = null;
      this.length--;
      return oldTailData;
    } else if (this.tail && this.tail.prev) {
      const oldTailData = this.tail?.data;
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      return oldTailData;
    }
    return undefined;
  }

  public shift() {
    if (this.head === this.tail && this.length > 0) {
      const oldHeadData = this.head?.data;
      this.head = null;
      this.tail = null;
      this.length--;
      return oldHeadData;
    } else if (this.head && this.head.next) {
      const oldHeadData = this.head?.data;
      this.head = this.head.next;
      this.head.prev = null;
      this.length--;
      return oldHeadData;
    }
    return undefined;
  }

  public unshift(data: NodeData) {
    const node = new DoublyLinkedListNode(data);
    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.length++;
    return this;
  }

  public get(index: number) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    if (!this.head || !this.tail) {
      return undefined;
    }
    let nodeToGet = null;
    const lastIndex = this.length - 1;
    const middleIndex = Math.floor(lastIndex / 2);
    if (index <= middleIndex) {
      nodeToGet = this.head;
      for (let counter = 0; counter <= index; counter++) {
        if (counter === index) {
          return nodeToGet;
        }
        if (!nodeToGet.next) {
          return undefined;
        }
        nodeToGet = nodeToGet.next;
      }
    } else {
      nodeToGet = this.tail;
      for (let counter = lastIndex; counter >= index; counter--) {
        if (counter === index) {
          return nodeToGet;
        }
        if (!nodeToGet.prev) {
          return undefined;
        }
        nodeToGet = nodeToGet.prev;
      }
    }
  }

  public set(index: number, data: NodeData) {
    const nodeToSet = this.get(index);
    if (!nodeToSet) {
      return undefined;
    }
    nodeToSet.data = data;
    return nodeToSet;
  }

  public insert(index: number, data: NodeData) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      return !!this.unshift(data);
    }
    if (index === this.length) {
      return !!this.push(data);
    }
    const prevNode = this.get(index - 1);
    const nextNode = prevNode?.next;
    if (prevNode && nextNode) {
      const nodeToInsert = new DoublyLinkedListNode(data);
      prevNode.next = nodeToInsert;
      nodeToInsert.prev = prevNode;
      nextNode.prev = nodeToInsert;
      nodeToInsert.next = nextNode;
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  public remove(index: number) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    if (index === 0) {
      this.shift()
      return undefined;
    }
    if (index === this.length - 1) {
      this.pop()
      return undefined;
    }
    const nodeToRemove = this.get(index);
    const prevNode = nodeToRemove?.prev;
    const nextNode = nodeToRemove?.next;
    if (nodeToRemove && prevNode && nextNode) {
      prevNode.next = nextNode, nextNode.prev = prevNode;
      nodeToRemove.prev = null, nodeToRemove.next = null;
      this.length--;
      return nodeToRemove;
    } else {
      return undefined;
    }
  }

  public reverse() {
    if (this.length > 1 && this.head && this.tail) {
      let curNode = this.head;
      for (let counter = 0; counter < this.length; counter++) {
        const prevNode = curNode.prev;
        const nextNode = curNode.next;
        curNode.prev = nextNode;
        curNode.next = prevNode;
        if (nextNode) {
          curNode = nextNode;
        }
      }
      const oldHead = this.head;
      const oldTail = this.tail;
      this.head = oldTail;
      this.tail = oldHead;
    }
    return this;
  }
}
