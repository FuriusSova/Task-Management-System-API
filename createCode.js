exports.generateCode = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        let rand = Math.random();
        let rand1 = (rand * (9 - 0 + 1)) + 0;
        let rand2 = Math.floor(rand1);
        code += rand2;
    }
    return code;
};