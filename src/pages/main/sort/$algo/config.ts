import { sleep } from "@/utils";

export const ALGO = ['bubble', 'selection']

let current = 0;

const runSelection = async (arr: any[], setArr, onFlagChange, config) => {
    current = current + 1;
    const thisCurrent = current;
    const { delay } = config;
    var len = arr.length;
    var minIndex, temp;
    if (thisCurrent !== current) return;
    onFlagChange({ minIndex })
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        if (thisCurrent !== current) return;
        onFlagChange({ minIndex: i, i });
        for (var j = i + 1; j < len; j++) {
            if (thisCurrent !== current) return;
            onFlagChange({ j });
            if (arr[j].value < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;
                if (thisCurrent !== current) return;
                onFlagChange({ minIndex: j })            // 将最小数的索引保存
            }
            await sleep(delay);
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        if (thisCurrent !== current) return;
        setArr([...arr]);
        await sleep(delay);
    }
    if (thisCurrent !== current) return;
    return arr;
}

export const ALGO_CONFIG = {
    selection: {
        algo: 'selection',
        name: '选择',
        code: `function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}`,
        run: runSelection,
    }
}
