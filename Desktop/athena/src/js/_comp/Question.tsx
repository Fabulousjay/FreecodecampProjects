export const hasWord = (array: string[], word: string) => array.includes(word);

export const mostCommonWord = (words: string) => {
  const array = words.split(" ");
  const stringCount: { [key: string]: number } = {};
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
 * Resolves all functions without regard for order
 * @param array
 */
export const resolveAll = (array: any[]) => {
  const promiseFunctions = array.map(
    (func) => new Promise((resolve) => resolve(func())),
  );

  (async () => await Promise.all(promiseFunctions))();
};

// export const resolveOneByOne = (array: any[]) => {
//   const promiseFunctions = array.map(func =>
//     new Promise((resolve) => resolve(func))
//   );

//   (async () => {
//     await promiseFunctions.reduce(async (previousPromise, nextAsyncFunction) => {
//       await previousPromise;
//       await nextAsyncFunction();
//     }, Promise.resolve());
//   })();

//   // (async function() {
//   //   const asyncFunctions = [resolveInTwoSeconds, resolveInThreeSeconds, resolveInFiveSeconds];
//   //   // outputs 2 after 2 seconds
//   //   // outputs 3 after 5 seconds
//   //   // outputs 5 after 8 seconds
//   //   await asyncFunctions.reduce(async (previousPromise, nextAsyncFunction) => {
//   //     await previousPromise;
//   //     const result = await nextAsyncFunction();
//   //     console.log(result);
//   //   }, Promise.resolve());
//   // })();
// }
