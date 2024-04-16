class AVLNode {
    public key: string;
    public value: any;
    public left: AVLNode | null;
    public right: AVLNode | null;
    public height: number;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

// AVL Tree class
class AVLTree {
    private root: AVLNode | null;

    constructor() {
        this.root = null;
    }

    // Utility function to get the height of a node
    private getHeight(node: AVLNode | null): number {
        return node ? node.height : 0;
    }

    // Utility function to update the height of a node
    private updateHeight(node: AVLNode): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    // Utility function to perform left rotation
    private leftRotate(node: AVLNode): AVLNode {
        const newRoot = node.right!;
        node.right = newRoot.left;
        newRoot.left = node;
        this.updateHeight(node);
        this.updateHeight(newRoot);
        return newRoot;
    }

    // Utility function to perform right rotation
    private rightRotate(node: AVLNode): AVLNode {
        const newRoot = node.left!;
        node.left = newRoot.right;
        newRoot.right = node;
        this.updateHeight(node);
        this.updateHeight(newRoot);
        return newRoot;
    }

    // Utility function to balance the AVL tree
    private balance(node: AVLNode): AVLNode {
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left!) < 0) {
                node.left = this.leftRotate(node.left!);
            }
            return this.rightRotate(node);
        }

        if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right!) > 0) {
                node.right = this.rightRotate(node.right!);
            }
            return this.leftRotate(node);
        }

        return node;
    }

    // Utility function to get the balance factor of a node
    private getBalanceFactor(node: AVLNode): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Method to insert a key-value pair into the AVL tree
    insert(key: string, value: any): void {
        this.root = this.insertRec(this.root, key, value);
    }

    private insertRec(node: AVLNode | null, key: string, value: any): AVLNode {
        if (!node) {
            return new AVLNode(key, value);
        }

        if (key < node.key) {
            node.left = this.insertRec(node.left, key, value);
        } else if (key > node.key) {
            node.right = this.insertRec(node.right, key, value);
        } else {
            node.value = value;
        }

        this.updateHeight(node);
        return this.balance(node);
    }

    // Method to search for a key in the AVL tree
    search(key: string): any | undefined {
        let currentNode = this.root;

        while (currentNode) {
            if (key === currentNode.key) {
                return currentNode.value;
            } else if (key < currentNode.key) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return undefined;
    }

    // Method to delete a key from the AVL tree
    delete(key: string): void {
        this.root = this.deleteRec(this.root, key);
    }

    private deleteRec(node: AVLNode | null, key: string): AVLNode | null {
        if (!node) {
            return null;
        }

        if (key < node.key) {
            node.left = this.deleteRec(node.left, key);
        } else if (key > node.key) {
            node.right = this.deleteRec(node.right, key);
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            } else {
                const successor = this.getMinNode(node.right);
                node.key = successor.key;
                node.value = successor.value;
                node.right = this.deleteRec(node.right, successor.key);
            }
        }

        this.updateHeight(node);
        return this.balance(node);
    }

    private getMinNode(node: AVLNode): AVLNode {
        let currentNode = node;
        while (currentNode.left) {
            currentNode = currentNode.left;
        }
        return currentNode;
    }

    // Method to clear the AVL tree
    clear(): void {
        this.root = null;
    }
}


export class LRUCache {
    private avl: AVLTree;
    private capacity: number;
    private cacheMap: Map<string, AVLNode>;

    constructor(capacity: number) {
        this.avl = new AVLTree();
        this.capacity = capacity;
        this.cacheMap = new Map();
    }

    set(key: string, value: any): void {
        const existingNode = this.cacheMap.get(key);

        if (existingNode) {
            existingNode.value = value;
            this.cacheMap.delete(key);
            this.cacheMap.set(key, existingNode);
        } else {
            if (this.cacheMap.size >= this.capacity) {
                const leastUsedKey = this.cacheMap.keys().next().value;
                this.cacheMap.delete(leastUsedKey);
                this.avl.delete(leastUsedKey);
            }

            const newNode = new AVLNode(key, value);
            this.cacheMap.set(key, newNode);
            this.avl.insert(key, value);
        }
    }

    get(key: string): any | undefined {
        const node = this.cacheMap.get(key);

        if (node) {
            this.cacheMap.delete(key);
            this.cacheMap.set(key, node);
            return node.value;
        }

        const value = this.avl.search(key);

        if (value !== undefined) {
            const newNode = new AVLNode(key, value);
            this.cacheMap.set(key, newNode);
        }

        return value;
    }

    delete(key: string): void {
        if (this.cacheMap.has(key)) {
            this.cacheMap.delete(key);
            this.avl.delete(key);
        }
    }

    clear(): void {
        this.avl.clear();
        this.cacheMap.clear();
    }
}