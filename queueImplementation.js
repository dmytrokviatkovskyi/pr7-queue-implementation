// Завдання: Реалізувати структуру даних "Черга" за принципом FIFO (з використанням масиву та вузлів),
// яка повертає кількість елементів, додає нові, видаляє наявні та виводить усі елементи черги.

class ArrayQueue {
  constructor(capacity = 13) {
    // Initialize fixed-size array and Head/Tail pointers
    this.capacity = capacity;
    this.data = new Array(capacity).fill(null);
    this.head = 0;
    this.tail = 0;
  }

  isEmpty() {
    // Queue is empty when Head and Tail point to the same cell
    return this.head === this.tail;
  }

  isFull() {
    // Queue is full when advancing Tail reaches Head
    return (this.tail + 1) % this.capacity === this.head;
  }

  size() {
    // Return current number of elements in the queue
    return (this.tail - this.head + this.capacity) % this.capacity;
  }

  enqueue(value) {
    // Add a new element at Tail and advance Tail pointer
    if (this.isFull()) {
      throw new Error("Queue is full.");
    }
    this.data[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
  }

  dequeue() {
    // Remove and return the element at Head (FIFO)
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    const removedValue = this.data[this.head];
    this.data[this.head] = null;
    this.head = (this.head + 1) % this.capacity;
    return removedValue;
  }

  display() {
    // Print all queue elements from Head to Tail
    if (this.isEmpty()) {
      console.log("ArrayQueue is empty.");
      return;
    }
    const elements = [];
    let index = this.head;
    while (index !== this.tail) {
      elements.push(this.data[index]);
      index = (index + 1) % this.capacity;
    }
    console.log("ArrayQueue:", elements.join(" -> "));
  }
}

class Node {
  constructor(data) {
    // Store node value and initialize next pointer as null
    this.data = data;
    this.next = null;
  }
}

class NodeQueue {
  constructor() {
    // Initialize Head and Tail node references
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  isEmpty() {
    // Check if the queue has no nodes
    return this.head === null;
  }

  size() {
    // Return current number of nodes
    return this.count;
  }

  enqueue(value) {
    // Create a new node and attach it to Tail
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.count++;
  }

  dequeue() {
    // Remove and return the Head node value (FIFO)
    if (this.isEmpty()) {
      throw new Error("Queue is empty.");
    }
    const removedValue = this.head.data;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }
    this.count--;
    return removedValue;
  }

  display() {
    // Traverse nodes from Head to Tail and print values
    if (this.isEmpty()) {
      console.log("NodeQueue is empty.");
      return;
    }
    const elements = [];
    let current = this.head;
    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }
    console.log("NodeQueue:", elements.join(" -> "));
  }
}

// Test array-based queue
const arrayQueue = new ArrayQueue();
[6, 4, 6, 2, 7].forEach((item) => arrayQueue.enqueue(item));
arrayQueue.display();
console.log("Size:", arrayQueue.size());
console.log("Dequeued:", arrayQueue.dequeue());
arrayQueue.display();

// Test node-based queue
const nodeQueue = new NodeQueue();
[12, 25, 8].forEach((item) => nodeQueue.enqueue(item));
nodeQueue.display();
console.log("Size:", nodeQueue.size());
console.log("Dequeued:", nodeQueue.dequeue());
nodeQueue.display();
