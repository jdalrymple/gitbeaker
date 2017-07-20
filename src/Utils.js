function parse(value){
	if (typeof value === "number") return value;
	else if (value.toString().includes("/")) return encodeURIComponent(value);
    else return  parseInt(value,10);
}

function defaultPaging(options){
	options.page = options.page || 1;
    options.per_page = options.per_page || 100;
}

module.exports = {
	parse,
	defaultPaging
}