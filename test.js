Array.prototype.clone = function() {
  return this.slice(0);
};
/*
var proofs=[
["Kayla"],
["Zak"],
["Kahlua"],
["Child","Zak"],
["Child","Kayla"],
["Couple","x","y"]
];

var expansions=[
"True",
"True",
"True",
"Kahlua",
"Kahlua",
["&",["==",["Child","x"],"child"],["==",["Child","y"],"child"]]
];
*/


var proofs=[
  ["True"],
  ["False"],
  [["Not"],["True"]],
  [["Not"],["False"]],
  [["And"],["True"],["True"]],
  [["And"],["True"],["False"]],
  [["And"],["False"],["True"]],
  [["And"],["False"],["False"]],
  ["Test"],
  ["Test"]
];

var expansions=[
  [],
  [],
  ["False"],
  ["True"],
  ["True"],
  ["False"],
  ["False"],
  ["False"],
  ["True"],
  ["False"]
];

/*
Kayla
Zak
Kahlua

Child(Zak)=Kahlua
Child(Kayla)=Kahlua

Child(x)==Kahlua

Couple(x,y)=(Child(x)==child)&(Child(y)==child)



AND(x,y)
And(True,True)=True
And(True,False)=False
And(False,True)=False
And(False,False)=True

*/

/*
["Not","True"] => ["False"]

["And","True",["Not","False"]] => ["And","True","True"]
["And","True","True"] => ["True"]
*/



var test=["And",["Not","False"],"True"];
test=[["And"],["True"],["x"]];
console.log("***",evaluate(test,proofs,expansions,2));






function evaluate(expr,proofs,expansions,count){


  if(count==null){
    count=Infinity;
  }
  var proofs=proofs.clone();
  var expansions=expansions.clone();

  var out=[];

  //Return possible expressions
  for(var i=0;i<proofs.length&out.length<count;i++){
    if(compare(expr,proofs[i])){
      out.push(expansions[i]);
    }
  }

  //Substitute for variables




  if(out.length<count&&expr.constructor===Array){//More Possible Options
    for(var i=0;i<expr.length;i++){
      var results=evaluate(expr[i],proofs,expansions,count);

      for(var j=0;j<results.length;j++){
        var newExpr=expr.clone();
        newExpr[i]=results[j];
        var newResults=evaluate(newExpr,proofs,expansions,count);
        for(var k=0;k<newResults.length;k++){
          out.push(newExpr);
        }

      }


    }

  }
  console.log(expr,"=>",out);
  return out;
}




/*
function evaluate(expr,proofs,expansions,count){
  if(count==null){
    count=Infinity;
  }
  var proofs=proofs.clone();
  var expansions=expansions.clone();

  var out=[];

  //Return possible expressions
  for(var i=0;i<proofs.length&out.length<count;i++){
    if(compare(expr,proofs[i])){
      out.push(expansions[i]);
    }
  }


  if(out.length<count&&expr.constructor===Array){//More Possible Options
    //Try substitutions for Sub Terms
    for(var i=0;i<expr.length&out.length<count;i++){
      var results=evaluate(expr[i],proofs,expansions,count-out.length);
      for(var j=0;j<results.length;j++){
        var newExpr=expr.clone();
        newExpr[i]=results[j];
        var subResults=evaluate(newExpr,proofs,expansions,count-out.length);
        for(var k=0;k<subResults.length;k++){
          out.push(subResults[k]);
        }

      }

    }

  }
  console.log(expr,out);
  return out;
}
*/



/*
function evaluate(expr,symbols,expansions){
var proofs=symbols.clone();
var expansions=expansions.clone();

//Check if free variables need to be accounted for
for(var i=0;i<proofs.length;i++){
if(freeVariable(expr[i],proofs)){

for(var j=0;j<proofs.length;j++){//Try all substitutions
var newProof=proofs.clone();
var newExpansions=expansions.clone();
newProof.unshift(expr[i]);//Add Definition
newExpansions.unshift(proofs[j]);//Add Definition
if(!compare(evaluate(expr,symbols,expansions),["False"])){
return evaluate(expr,newProof,newExpansions);
}
}
return ["False"];
}
}


//Check if current expansion exists
for(var i=0;i<proofs.length;i++){//See if Symbol expansion exists
if(compare(expr,proofs[i])){
return expansions[i];
}
}

return ["False"];
}
*/


function compare(arr1,arr2){
  return JSON.stringify(arr1)==JSON.stringify(arr2);
}


function freeVariable(str,proofs){
  for(var i=0;i<proofs.length;i++){
    if(compare([str],proofs[i])){
      return false;
    }
  }
  return true;
}
