let toJSON = function(root){
    let nodes = getAllTreeNodes(root);
    for(let i = 0; i < nodes.length; i++){
        nodes[i].idx = i;
    }
    let arr = [];
    for(let node of nodes){
        let {str,cnt,children} = node;
        arr.push({
            str,cnt,children:children.map(n=>n.idx)
        });
    }
    return JSON.stringify(arr);
};

let fromJSON = function(str){
    let nodes = JSON.parse(str);
    let root = nodes[0];
    for(let node of nodes){
        node.children = node.children.map(idx=>nodes[idx]);
    }
    return root;
};

let toJSONCompress = function(root){
    let nodes = getAllTreeNodes(root);
    for(let i = 0; i < nodes.length; i++){
        nodes[i].idx = i;
    }
    let arr = [];
    for(let node of nodes){
        let {str,cnt,children} = node;
        if(node.children.length === 0){
            arr.push(str);
        }else{
            arr.push(children.map(n=>n.idx));
        }
    }
    return JSON.stringify(arr);
};

module.exports = {toJSON,fromJSON,toJSONCompress};