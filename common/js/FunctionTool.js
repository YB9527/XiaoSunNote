var setParams = function(data){
	if(!data.wait){
		data.wait = 100
	}
	if(!data.params){
		data.params = []
	}
}

var debounceFirstFunction={}

/**只运行第一次
 * @param {Object} tag
 * @param {Object} fn
 * @param {Object} wait
 */
export function debounceFirst(tag,fn,wait){
	if(!wait){
		wait = 100;
	}
	let exe = debounceFirstFunction[tag];
	if(!exe){
		debounceFirstFunction[tag] = fn;
		setTimeout(()=>{
			//console.log(debounceFirstFunction[tag]);
			debounceFirstFunction[tag]();
			debounceFirstFunction[tag] = undefined;
		},wait);
	}
}




var debounceFunction={}


/**
 * 只运行最后一次
 */
export function debounce(tag,fn,data={wait:100,params:[]}){
	setParams(data);
	let exe = debounceFunction[tag];
	if(exe){
		delete debounceFunction[tag];
		clearTimeout(exe);
	}
	exe = setTimeout(()=>{
		fn(...data.params);
	},data.wait);
	debounceFunction[tag] = exe;
}





var throttleFunction={}


/**
 * 每段时间运行
 * @param {Object} tag
 * @param {Object} fn
 * @param {Object} wait
 */
export function throttle(tag,fn,wait){
	if(!wait){
		wait = 100;
	}
	if(!throttleFunction[tag]){
		setTimeout(()=>{
			throttleFunction[tag]();
			throttleFunction[tag] = undefined;
		},wait)
	}
	throttleFunction[tag] = fn;
}

