class SinglyLinkedListNode {
  public data: unknown;
  public next: SinglyLinkedListNode | null;

  constructor(data: unknown) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  public head: SinglyLinkedListNode | null;
  public tail: SinglyLinkedListNode | null;
  public length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  public push(data: unknown) {
    const nodeToPush = new SinglyLinkedListNode(data);
    if (!this.head) {
      this.head = nodeToPush;
      this.tail = nodeToPush;
    } else {
      if (this.tail) {
        this.tail.next = nodeToPush;
      }
      this.tail = nodeToPush;
    }
    this.length++;
    return true;
  }

  public pop() {
    if (!this.head) {
      return false;
    }
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return true;
    }
    let currentNode: SinglyLinkedListNode | null = this.head;
    while (currentNode !== null) {
      if (this.tail === currentNode.next) {
        currentNode.next = null;
        this.tail = currentNode;
        this.length--;
        return true;
      }
      currentNode = currentNode.next;
    }
  }

  public shift() {
    if (!this.head) {
      return false;
    }
    const newHead = this.head.next;
    if (newHead === null) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = newHead;
    }
    this.length--;
    return true;
  }

  public unshift(data: unknown) {
    const nodeToUnshift = new SinglyLinkedListNode(data);
    if (!this.head) {
      this.head = nodeToUnshift;
      this.tail = nodeToUnshift;
    } else {
      const currentHead = this.head;
      nodeToUnshift.next = currentHead;
      this.head = nodeToUnshift;
    }
    this.length++;
    return true;
  }

  public get(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let currentNode = this.head;
    if (currentNode === null) {
      return null;
    }
    for (let counter = 0; counter <= index; counter++) {
      if (index === counter) {
        return currentNode;
      }
      if (currentNode.next === null) {
        return null;
      }
      currentNode = currentNode.next;
    }
  }

  public set(index: number, data: unknown) {
    const nodeToSet = this.get(index);
    if (!nodeToSet) {
      return false;
    }
    nodeToSet.data = data;
    return true;
  }

  public insert(index: number, data: unknown) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === this.length) {
      return this.push(data);
    }
    if (index === 0) {
      return this.unshift(data);
    }
    const nodeBefore = this.get(index - 1);
    const nodeAfter = nodeBefore?.next;
    if (nodeBefore && nodeAfter) {
      const nodeToInsert = new SinglyLinkedListNode(data);
      nodeToInsert.next = nodeAfter;
      nodeBefore.next = nodeToInsert;
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  public remove(index: number) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    if (index === 0) {
      return this.shift();
    }
    const nodeBefore = this.get(index - 1);
    const nodeToRemove = nodeBefore?.next;
    const nodeAfter = nodeToRemove?.next;
    if (nodeBefore && nodeToRemove && nodeAfter) {
      nodeBefore.next = nodeAfter;
      this.length--;
      return true;
    } else {
      return false;
    }
  }

  public reverse() {
    this.tail = this.head;
    let prevNode: SinglyLinkedListNode | null = this.tail;
    let curNode: SinglyLinkedListNode | null = this.tail?.next ?? null;
    let nextNode: SinglyLinkedListNode | null = null;
    for (let counter = 0; counter < this.length; counter++) {
      if (counter === this.length - 1) {
        this.head = prevNode;
        if (this.tail?.next) {
          this.tail.next = null;
        }
      } else {
        nextNode = curNode?.next ?? null;
        if (curNode) {
          curNode.next = prevNode;
        }
        prevNode = curNode ?? null;
        curNode = nextNode;
      }
    }
  }

  public rotate(offset: number) {
    let index: number = offset;
    if (offset === 0) {
      return this;
    }
    if (offset < 0) {
      index = Math.abs(this.length + offset);
    }
    if (offset > (this.length - 1)) {
      index = offset % this.length;
    }
    const newTail = this.get(index - 1);
    const newHead = newTail?.next ?? null;
    if (this.head && this.tail && newTail && newHead) {
      this.tail.next = this.head;
      newTail.next = null;
      this.tail = newTail;
      this.head = newHead;
    }
    return this;
  }
}
