

function factorial(n){
    let p =  2;
    let output = "";

    while (n >= p*p) {
        if(n%p == 0){
            output += p + " * ";
            n/=p;
        }else{
            p++;
        }
    }

    output += n;
    return output;
}




function run(){
    const input = document.getElementById("input").value;
    const answer = document.getElementById("answer");

    answer.innerHTML = factorial(input);

}