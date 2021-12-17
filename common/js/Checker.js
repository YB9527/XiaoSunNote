 function isNull(value){
	 if(value === null || value === undefined || value === ""){
	 	 return true;
	 }
 }

export function checkNull(value,errortip="不能为空"){
	if(isNull(value)){
		return errortip;
	}
}


export function  checkSelectNull(value,errortip="必选"){
	if(isNull(value)){
		return errortip;
	}
}


export function   checkZJHM(value,errortip="证件号码必须是18位"){
	if (isNull(value) || value.length !== 18) {
		return errortip;
	}
}


export function checkPhoneNuber(value,errortip="联系电话必须是11位"){
	
	if (isNull(value) || value.length !== 11) {
		return errortip;
	}
}

/**
 * 值得大于且是int 类型
 */
export function  moreThanInt0 (value,errortip="值必须大于0整数"){
	
	if (isNull(value) ) {
		return errortip;
	}else {
		var isnum = /^\d+$/.test(value);
		if(  !isnum || parseInt(value) <= 0){
			return errortip;
		}
	}
}

/**
 * 大于0
 */
export function  moreThan0 (value,errortip="值必须大于0"){
	
	if (isNull(value) ) {
		return errortip;
	}else {
		var isfloat = /^\d+(\.)?\d*$/g.test(value);
		if(  !isfloat || parseInt(value) <= 0){
			return errortip;
		}
	}
	
}


export function checkLength(value,{len,errortip}){
	if (isNull(value) || value.length !== len) {
		return errortip?errortip:"长度必须是："+len+"位";
	}
}

