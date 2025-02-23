function sameAmount(str, rexp1, rexp2) {
    rexp1 = new RegExp(rexp1, "g");
    rexp2 = new RegExp(rexp2, "g");
    let val1 = str.match(rexp1);
    let val2 = str.match(rexp2);
    return val1 !== null && val2 !== null && val1.length === val2.length;
}