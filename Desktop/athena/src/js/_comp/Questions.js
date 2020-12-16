/**
 * Question 1
 * @param array
 * @param word
 */
export const hasWord = (array, word) => array.includes(word);

/**
 * Question 2
 *
 * @param words
 */
export const mostCommonWord = (words) => {
  const array = words.split(" ");
  const stringCount = {};
  const common = { count: 0, value: "" };

  array.map(
    (item) =>
      (stringCount[item] =
        stringCount[item] === undefined ? 1 : ++stringCount[item]),
  );

  Object.entries(stringCount).map(([key, value]) => {
    if (common.count <= value) {
      common.count = value;
      common.value = key;
    }
  });

  return common.value;
};

/**
 * Question 3
 *
 * Resolves all functions without regard for order
 * @param array
 */
export const resolveAll = (array) => {
  const promiseFunctions = array.map(
    (func) => new Promise((resolve) => resolve(func())),
  );

  (async () => await Promise.all(promiseFunctions))();
};

/**
 * Question 4
 *
 * @param array
 */
export const resolveOneByOne = (array) => {
  (async function () {
    const trigger = async (func) =>
      await new Promise((resolve) => resolve(func()));

    await array.reduce(
      (p, spec) => p.then(() => trigger(spec)),
      Promise.resolve(null),
    );
  })();
};

/**
 * Question 5
 */
export class LinkedList {
  constructor(value) {
    this.head = {
      value,
      next: null,
    };

    this.length = 1;
  }

  add(value) {
    const newNode = { value };
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return this;
  }

  find(val) {
    let thisNode = this.head;

    while (thisNode) {
      if (thisNode.value === val) {
        return thisNode;
      }

      thisNode = thisNode.next;
    }

    return thisNode;
  }

  prev(val) {
    let thisNode = this.head;

    while (thisNode) {
      if (thisNode.value === val) {
        return thisNode.next;
      }

      thisNode = thisNode.next;
    }

    return thisNode;
  }
}
