class NoDupArray{
    arr = [];
    objmap = new Map();
    constructor(arr0 = []){
        for(let v of arr0){
            this.push(v);
        }
    }
    get(i){
        return this.arr[i];
    }
    push(obj){
        let {arr,objmap} = this;
        if(objmap.has(obj)){
            //console.log("alteady has object");
            return null;
        }
        objmap.set(obj,true);
        arr.push(obj);
        return obj;
    }
};


NoDupArray.prototype[Symbol.iterator] = function() {
    let i = 0;
    let arr = this.arr;
    return {
        next: function() {
           return { value: arr[i++], done: i > arr.length }
        }
    };
};

module.exports = NoDupArray;

//test cases
/*
let a = {val:"a"};let b = {val:"b"};
arr = new NoDupArray();
arr.push(b)
arr.push(a)
for(val of arr){console.log(val)}
*/