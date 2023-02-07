/** Node: node for a doubly linked list. */

class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
      this.prev = null;
    }
  }
  
  /** LinkedList: chained together nodes. */
  
  class DoublyLinkedList {
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
        newNode.prev = this.tail;
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
        this.head.prev = newNode
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
      let mid = Math.floor((this.length - 1) / 2);
      let curr = idx <= mid ? this.head : this.tail;
      let count = idx <= mid ? 0 : this.length - 1;
  
      if (idx <= mid) {
        while (count < idx) {
          count++;
          curr = curr.next;
        }
      } else {
        while (count > idx) {
          count--;
          curr = curr.prev;
        }
      }
      return node ? curr : curr.val;
    }
  
    /** setAt(idx, val): set val at idx to val */
  
    setAt(idx, val) {
      if (idx >= this.length || idx < 0) return;
  
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
      prev.next.prev = newNode
      newNode.next = prev.next;
      newNode.prev = prev
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
        prev.next.prev = prev
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

module.exports = DoublyLinkedList;
