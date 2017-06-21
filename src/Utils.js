function parse(value){
	if (typeof value === "number") return value;
	else if (value.toString().includes("/")) return encodeURIComponent(value);
    else return  parseInt(issueId);
}

module.exports = {
	parse
}