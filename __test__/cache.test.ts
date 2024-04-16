import { LRUCache } from "../src/cache";

describe('LRUCache', () => {
    let cache: LRUCache;

    beforeEach(() => {
        cache = new LRUCache(2); 
    });

    it('should set and get values correctly', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');

        expect(cache.get('key1')).toBe('value1');
        expect(cache.get('key2')).toBe('value2');
    });

    it('should return undefined for non-existent keys', () => {
        expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('should delete values correctly', () => {
        cache.set('key1', 'value1');
        cache.delete('key1');

        expect(cache.get('key1')).toBeUndefined();
    });

    it('should clear the cache correctly', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.clear();

        expect(cache.get('key1')).toBeUndefined();
        expect(cache.get('key2')).toBeUndefined();
    });

    it('should evict least recently used item when reaching capacity', () => {
        cache.set('key1', 'value1');
        cache.set('key2', 'value2');
        cache.set('key3', 'value3'); 

        expect(cache.get('key1')).toBeUndefined();
        expect(cache.get('key2')).toBe('value2');
        expect(cache.get('key3')).toBe('value3');
    });
});
