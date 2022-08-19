let newarr = function(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(0);
    }
    return arr;
};


let getSecondMax = function(arr){
    let max1 = 0;
    let max2 = 0;
    for(let v of arr){
        if(v > max1){
            max2 = v;
            max1 = v;
        }else if(v > max2){
            max2 = v;
        }
    }
    return max2;
};


module.exports = {newarr,getSecondMax};