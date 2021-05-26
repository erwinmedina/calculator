let calculation = {};
let currentResults = 0;

calculation.handleSum = function(x,y) {
    currentResults = x+y;
    return currentResults;
}

calculation.handleSumChained = function(x) {
    return currentResults += x;
}

calculation.handleSubtract = function(x,y) {
    return x-y;
}
calculation.handleTimes = function(x,y) {
    return x*y;
}
calculation.handleDivide = function(x,y) {
    return x/y;
}
calculation.currentResults = currentResults;

module.exports = calculation;