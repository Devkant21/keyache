// types/index.d.ts

declare module 'keyache' {
    import { BSTCache } from './cache';

    export const cache: BSTCache;
}

declare class Node {
    public key: string;
    public value: any;
    public left: Node | null;
    public right: Node | null;

    constructor(key: string, value: any);
}

declare class BinarySearchTree {
    private root: Node | null;

    constructor();

    insert(key: string, value: any): void;
    search(key: string): any | undefined;
    delete(key: string): void;
    clear(): void;
}

declare class BSTCache {
    private bst: BinarySearchTree;

    constructor();

    set(key: string, value: any): void;
    get(key: string): any | undefined;
    delete(key: string): void;
    clear(): void;
}
