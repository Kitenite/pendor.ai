export class Snapshot<T> {
    private original: string;
    private current: string;

    constructor(private data: T) {
        this.original = JSON.stringify(data);
        this.current = this.original;
    }

    // Capture current state
    capture() {
        this.current = JSON.stringify(this.data);
    }

    // Check if the data has changed since the last capture
    hasChanged(): boolean {
        return this.original !== this.current;
    }

    // Reset to the last captured state
    reset() {
        this.data = JSON.parse(this.current);
    }

    // Get the data for direct modifications
    getData(): T {
        return this.data;
    }
}