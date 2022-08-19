


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

class Node{
    children = [];//if edge node this will be empty
    constructor(str){
        this.str = str;
    }
    refreshStates(){
        this.states = newarr(this.str.length);
    }
    setStates(i,width){
        for(; i < i+width; i++){
            if(i < 0)continue;
            this.states[i] = 1;
        }
    }
};



let findsubstrs = function(str0){
    let root = new Node(str0);
    let leafs = [root];
    let histogram = [];
    
    for(let width = Math.floor(str0.length/2); width > 0; width--){
        //contains all substrings at this level
        let strmap = {};
        let duplicatemap = {};
        let idgen = 1;
        
        let singleFlag = getSecondMax(leafs.map(e=>e.str.length)) < width;
        for(let nodeptr = 0; nodeptr < leafs.length; nodeptr++){
            let node = leafs[nodeptr];
            let str = node.str;
            
            //loop through the string positions
            for(let offset = 0; offset < width; offset++){
            if(singleFlag && offset+i*2 > str.length)continue;//all sections would overlap with each other so no use
            for(let i = offset; i <= str.length-width; i += width){
            
                let substr = str.slice(i,i+width);
                console.log(substr);
                if(!(substr in strmap)){//first time
                    strmap[substr] = [nodeptr,i];
                }else if(!(substr in duplicatemap)){//second time
                    let [nodeptr0,i0] = strmap[substr];
                    duplicatemap[substr] = {
                        str:substr,
                        locations:[[nodeptr0,i0],[nodeptr,i]]
                    };
                }else{
                    duplicatemap[substr].locations.push([nodeptr,i]);
                }
                
            }}
        }
        
        for(let node of leafs){
            node.refreshStates();
        }
        
        //sorting based on first locations ascending order
        let duplicates = Object.values(duplicatemap).sort((a,b)=>{
            let r = a.locations[0][0]-b.locations[0][0];
            if(r !== 0){
                return r;
            }else{
                return a.locations[0][1]-b.locations[0][1];
            }
        });
        
        //mapping the locations to child nodes
        for(let dup of duplicates){
            dup.locations = dup.locations.filter(([nodeptr,i])=>{
                let node = leafs[nodeptr];
                return node.states[i] === 0;
            });
            //is size 1 or 0 skip
            if(dup.locations.length < 2){
                continue;//not big enough
            }
            //                    //parent node pointer     slicing parent node pointer
            let subnodestr = leafs[dup.locations[0][0]].str.slice(i,width);
            let subnode = new Node(subnodestr);
            histogram.push(subnode);
            for(let [nodeptr,i] of dup.locations){
                let node = leafs[nodeptr];
                node.setStates(i-width+1,width*2-1);//blanking out the section it occupies plus the width offset before so it doesn't collide
                node.children.push([subnode,i]);
            }
        }
        
        let leafs2 = [];
        for(let node of leafs){
            let str = node.str;
            //sort the offspring in ascending order
            let offsprings = node.children.sort((a,b)=>{
                return a[1]-b[1];
            });
            if(offsprings.length === 0){
                //no duplicate offsprings
                leafs2.push(node);
            }else{
                let children2 = [];
                node.children = children2;
                let prev = 0;//previous ending
                for(let [subnode,i] of offsprings){
                    //string section
                    if(prev !== i){
                        let strnode = new Node(str.slice(prev,i));
                        children2.push(strnode);
                        leafs2.push(strnode);
                    }
                    children2.push(subnode);
                    leafs2.push(subnode);
                }
                //tail string
                if(offsprings[offsprings.length-1][1] < str.length-1){
                    let strnode = new Node(str.slice(offsprings[offsprings.length-1][1],str.length));
                    children2.push(strnode);
                    leafs2.push(strnode);
                }
            }
        }
        leafs = leafs2;
    }
    
    console.log(histogram.map(h=>h.str));
    //clean up the tree (direct offspring with the same size will be shortened)
    //yet to be implemented
    
};












