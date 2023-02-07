/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx, node = false) {
    if (idx >= this.length || idx < 0) return;
    let curr = this.head;
    let count = 0;

    while (curr !== null && count < idx) {
      count++;
      curr = curr.next;
    }
    return node ? curr : curr.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let node = this.getAt(idx, true);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) return;
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let newNode = new Node(val);
    let prev = this.getAt(idx - 1, true);
    newNode.next = prev.next;
    prev.next = newNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) return;
    let val;
    let first = idx === 0;
    let last = idx === this.length - 1;
    let prev = this.getAt(idx - 1, true);

    if (first) {
      val = this.head.val;
      this.head = this.head.next;
      if (this.length === 1) this.tail = null;
    } else if (last && !first) {
      val = this.tail.val;
      prev.next = null;
      this.tail = prev;
    } else {
      val = prev.next.val;
      prev.next = prev.next.next;
    }

    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.length) return 0;
    let curr = this.head;
    let total = 0;
    while (curr !== null) {
      total += curr.val;
      curr = curr.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
