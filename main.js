let fs = require("fs");

let newarr = function(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(n);
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



let findSubstrs = function(entire_string){
    let root = {
        str:entire_string
    }
    let edge_nodes = [root];
    
    
    for(let i = Math.floor(str.length/2); i > 1; i--){
        let substrDataMap = {};//maps from subid to substr
        let toSubid = {};//maps from substr to subid
        let strmap = {};//stores all string matched
        let allOccurances = newarr(str.length-i+1);//global occurances of subids
        let subidg = 1;
        //find max sub length
        
        let singleFlag = getSecondMax(edge_nodes.map(e=>e.str.length)) < i;
        for(sub of edge_nodes){
            let str = sub.str;
            for(let offset = 0; offset < i; offset++){
                if(singleFlag && offset+i*2 > str.length)continue;//all sections would overlap with each other so no use
                for(let j = offset; j <= str.length-i; j+= offset){
                    let substr = str.slice(j,j+i);
                    if(!(substr in strmap)){
                        strmap[substr] = [sub,j,subidg++];
                    }else{
                        let o0 = strmap[substr];
                        let subid = o0[2];
                        //already has its duplicate found, which is very pog!
                        if(!(subid in substrDataMap)){//second occurance
                            substrDataMap[subid] = {
                                str:substr,
                                id:subid,
                                occurances:[o0.slice(0,2)]
                            }
                            allOccurances[subid] = subid;
                        }
                        allOccurances[j] = subid;
                        substrDataMap[subid].occurances.push(j);
                    }
                }
            }
        }
    }
    
    let result = [str];//will be mix of string and substring objects
    
}

let findSubstrs = function(str){
    let results = {};
    for(let i = Math.floor(str.length/2); i > 1; i--){
        let substrDataMap = {};//maps from subid to substr
        let toSubid = {};//maps from substr to subid
        let allOccurances = newarr(str.length-i+1);//global occurances of subids
        for(let offset = 0; offset < i; offset++){
            if(offset+i*2 > str.length)continue;//all sections would overlap with each other so no use
            for(let j = offset; j <= str.length-i; j++){
                let substr = str.slice(j,j+i);
                if(!(substr in toSubId)){
                    toSubId[substr] = j;
                }else{
                    //already has subid, which is very pog!
                    let subid = toSubId[substr];
                    if(!(subid in substrDataMap)){//second occurance
                        substrDataMap[subid] = {
                            str:substr,
                            occurances:[subid]
                        }
                        allOccurances[subid] = subid;
                    }
                    allOccurances[j] = subid;
                    substrDataMap[subid].occurances.push(j);
                }
            }
        }
        
        let succ = {};
        for(let subid in substrDataMap){
            let data = substrDataMap[subid];
            let occ = data.occurances;
            let prev = -1;
            let occ2 = [];
            for(let j of occ){
                if(allOccurances[j] == 0)continue;
                if(prev !== -1 && prev+i > j){
                    continue;
                }
                occ2.push(j);
                prev = j;
            }
            if(occ2.length < 2)continue;
            for(let j of occ2){
                //zero out the allOccurances field
                for(let k = j; k < j+i; k++){
                    allOccurances[k] = 0;
                }
            }
            succ[subid] = {
                str:data.str,
                occurances:occ2
            };
        }
        
    }
};



let main = function(){
    let str = fs.readFileSync("./mandelbrot.bf")+"";
    
}
