import {v4 as uuidv4} from 'uuid';

export default class SinglyLinkedList {
    constructor(head, tail) {
        this.head = head;
        this.tail = tail;
        this.length = 0;
    }

    addToTail(value, color) {
        const newNode = new Node(value, color);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length += 1;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.length += 1
        }
    }

    removeFromTail() {
        if(this.length === 0) {
            return undefined;
        }
        if(this.length === 1) {
            this.length = 0;
            this.head = null;
            this.tail = null;
            return undefined;
        }

        let node = this.head;
        const prevTail = this.tail;
        while (node.next !== this.tail) {
            node = node.next;
        }
        this.tail = node;
        this.tail.next = null;
        this.length -= 1
        return prevTail;
    }

    removeFromHead() {
         if(this.length === 0) {
            return undefined;
         }
         const currentHead = this.head;

         if(this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length -= 1
            return currentHead;
         }
         this.head = this.head.next;
         this.length -= 1;
         return currentHead;
    }

    removeAtIdx(index) {
        if(this.length === 0 || index < 0 || index > this.length - 1) {
            return null;
        }
        if(index === 0) {
            this.removeFromHead();
            return true;
        }
        if(index === this.length - 1) {
            this.removeFromTail();
            return true;
        }

        const previous = this.getValatIdx(index-1);
        const removed = previous.next;

        previous.next = removed.next;
        this.length -= 1;

        return removed;
    }

    InsertAtBegin(value, color) {
        const newNode = new Node(value, color);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length += 1
        } else {
            const currentHead = this.head;
            this.head = newNode;
            this.head.next = currentHead;
            this.length += 1;
        }

        return this;
    }

    InsetAtIdx(value, color, index) {
        if(index <0 || index > this.length) {
            return false;
        }
        if(index === 0) {
            this.InsertAtBegin(value, color);
            return true;
        }
        if(index === this.length) {
            this.addToTail(value, color);
            return true;
        }
        const node = new Node(value, color);
        let current = this.head;
        let previous = this.head;

        for(let i=0; i < index; i++) {
            previous = current;
            current = current.next;
        }
        previous.next = node;
        node.next = current;
        this.length += 1;
    }

    getValatIdx(index) {
        if(this.length === 0 || this.length - 1 < index) {
            return null;
        }

        let node = this.head;

        for(let i=0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    updateNodeValAtIdx(value, color, index) {
        const posNode = this.getValatIdx(index);
        if(posNode) {
            posNode.value = value;
            posNode.color = color;
            return true;
        }
        return false;
    }

    reverseLL() {
        if(this.length === 0) {
            return true;
        }
        let current = this.head;
        this.head = this.tail;
        this.tail = current;

        let previous = null;
        let next;

        for(let i=0; i < this.length; i++) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        return this;
    } 

}



class Node {
    constructor(value, color) {
        this.value = value;
        this.color = color;
        this.key = uuidv4();
        this.next = null;
    }
}