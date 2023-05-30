export function seive(n){
    const p = new Array(n+5);
    for(let i=0;i < n+5; i++) {
        p[i] = 0;
    }
    const animations = [];
    const primes = [];
    animations.push(["None", 1])
    for(let i = 2;i<=n;i++){
        if( p[i] === 0 ){
            animations.push(["prime", i])
            primes.push(i);
            for(let j = i*i;j<=n;j+=i){
                animations.push(["visited", j])
                p[j] = 1;
            }
        }
    }
    return animations;
}
