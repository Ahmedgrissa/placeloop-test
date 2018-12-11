let n = 3;

const getNumberOfTotalCubes = (n) => {
    return Math.pow(n, 3);
}

const getNumberOfInternalCubes = (n) => {
    return Math.pow(n - 2, 3);
}

const getNumberOfPeripheryCubes = (n) => {
    if(n===1 ){ 
        return 1;
    } else {
        return getNumberOfTotalCubes(n) - getNumberOfInternalCubes(n);
    }
}

const numberOfPeripheryCubes = getNumberOfPeripheryCubes(n);
console.log(numberOfPeripheryCubes);