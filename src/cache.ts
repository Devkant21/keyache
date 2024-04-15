// Node class for BST
class Node {
    public key: string;
    public value: any;
    public left: Node | null;
    public right: Node | null;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree class
class BinarySearchTree {
    private root: Node | null;

    constructor() {
        this.root = null;
    }

    insert(key: string, value: any): void {
        this.root = this.insertRec(this.root, key, value);
    }

    private insertRec(node: Node | null, key: string, value: any): Node {
        if (node === null) {
            return new Node(key, value);
        }

        if (key < node.key) {
            node.left = this.insertRec(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.insertRec(node.right, key, value);
        } else {
            node.value = value;
        }

        return node;
    }

    search(key: string): any | undefined {
        return this.searchRec(this.root, key);
    }

    private searchRec(node: Node | null, key: string): any | undefined {
        if (node === null) {
            return undefined;
        }

        if (key < node.key) {
            return this.searchRec(node.left, key);
        } else if (key > node.key) {
            return this.searchRec(node.right, key);
        } else {
            return node.value;
        }
    }

    delete(key: string): void {
        this.root = this.deleteRec(this.root, key);
    }

    private deleteRec(node: Node | null, key: string): Node | null {
        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = this.deleteRec(node.left, key);
        } else if (key > node.key) {
            node.right = this.deleteRec(node.right, key);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            } else if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            } else {
                const minNode = this.findMinNode(node.right);
                node.key = minNode.key;
                node.value = minNode.value;
                node.right = this.deleteRec(node.right, minNode.key);
            }
        }

        return node;
    }

    private findMinNode(node: Node): Node {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    clear(): void {
        this.root = null;
    }
}

// Cache class using Binary Search Tree
export class BSTCache {
    private bst: BinarySearchTree;

    constructor() {
        this.bst = new BinarySearchTree();
    }

    set(key: string, value: any): void {
        this.bst.insert(key, value);
    }

    get(key: string): any | undefined {
        return this.bst.search(key);
    }

    delete(key: string): void {
        this.bst.delete(key);
    }

    clear(): void {
        this.bst.clear();
    }
}


