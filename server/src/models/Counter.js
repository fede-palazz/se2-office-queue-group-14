class Counter {
    /**
     * Constructor for the Counter class
     * @param {number} counter_id - The unique id of the counter
     * @param {string} counter_name - The name of the counter
     */
    constructor(counter_id, counter_name) {
        this.counter_id = counter_id;
        this.counter_name = counter_name;
    }
}

export { Counter };