

//检查是否数据
export var checkIsDouble = function(value) {
	var patrn = /^(-)?\d+(\.\d+)?$/;
	return !(patrn.exec(value) == null);
};

export function number_format(number, decimals, dec_point, thousands_sep) {

	if (number == 0 || number == 0.00) {
		return 0;
	}
	/*
	 * 参数说明：
	 * number：要格式化的数字
	 * decimals：保留几位小数
	 * dec_point：小数点符号
	 * thousands_sep：千分位符号
	 * */
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {

			return parseFloat(n).toFixed(prec);
		};

	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, "$1" + sep + "$2");
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}



//金额符号
export function moneySymbol(money, bit) {
	if (!money) {
		return money;
	}
	if (bit !== undefined) {
		return number_format(money, bit, '.', ',');
	} else {
		let lastpointindex = (money + "").indexOf(".");
		if (lastpointindex > 0) {
			return number_format(money, (money + "").length - lastpointindex - 1, '.', ',');
		} else {
			return number_format(money, 0, '.', ',');
		}
	}
}



//通过属性来分组
export var groupByAttribute = function(array, attribute) {
	let map = {};
	if (array) {
		for (let item of array) {
			let key = item[attribute];
			let group = map[key];
			if (group) {
				group.push(item);
			} else {
				let list = [item];
				map[key] = list;
			}
		}
	}

	return map;
};


//通过属性来
export var groupByAttributeSingle = function(array, attribute="id") {
	let map = {};
	if (array) {
		for (let item of array) {
			let key = item[attribute];
			map[key] = item;

		}
	}

	return map;
};


/**
 *文字小数 或者 小数 保留小数位数
 * @param value 计算的值
 * @param bit 保留的位数 ，如果没有就保留2位
 * @param defalut 结果异常时，返回的值
 * @returns {number}
 */
export var toFixed = function(value, bit, defalut) {


	if (value) {
		value = parseFloat(value);
		if (value !== 0) {
			bit = bit === undefined ? 2 : bit;
			return parseFloat(value.toFixed(bit));
		}
	}
	return defalut ? defalut : 0;
};




export var sumValue = function(v1, v2, bit) {
	let value = (v1.toFixed(bit)) * 1 + (v2.toFixed(bit)) * 1;
	return value.toFixed(2) * 1;
};


/**
 * 计算总页数
 * @param total 总条数
 * @param pageSigle 每页显示个数
 * @returns {number}
 */
export var computedPageTotal = function(total, pageSigle) {
	if (total <= 0 || pageSigle <= 0) {
		return 0;
	}
	let pageCount = total / pageSigle;
	if ((pageCount + "").indexOf(".") !== -1) {
		pageCount = parseInt(pageCount) + 1;
	}
	return pageCount;
};

export var pushArray = function(base, datas) {
	if (datas && datas instanceof Array) {
		for (let data of datas) {
			base.push(data);
		}
	}
};



export var str2Date = function(strTime) {
	var date = strTime.replace(/-/g, '/');
	var timestamp = new Date(date).getTime();
	// 根据毫秒数构建 Date 对象
	return new Date(timestamp);
};


export var str2DateDay = function(strTime) {
	var date = strTime.substring(0, 10);
	var timestamp = new Date(date).getTime();
	// 根据毫秒数构建 Date 对象
	return new Date(timestamp);
};


export function dateChange(num = 1, date = false) {
	if (!date) {
		date = new Date(); //没有传入值时,默认是当前日期
		date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	} else {
		date = date2Str(date);
		date = str2Date(date);
	}
	date = Date.parse(new Date(date)) / 1000; //转换为时间戳
	date += (86400) * num; //修改后的时间戳
	var newDate = new Date(parseInt(date) * 1000); //转换为时间
	return date2Str(newDate);
}

export var date2Str = function(date) {
	if (!(date instanceof Date)) {
		return "";
	}
	var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	if (month < 10) {
		month = "0" + month;
	}
	var day = date.getDate(); //获取当前日(1-31)
	if (day < 10) {
		day = "0" + day;
	}
	var dateString = year + "-" + month + "-" + day;
	return dateString;
};


export var dateTime2Str = function(date) {
	if (!(date instanceof Date)) {
		return "";
	}
	var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var day = date.getDate(); //获取当前日(1-31)
	let HH = date.getHours();
	let mm = date.getMinutes();
	let ss = date.getSeconds();
	var dateString = year + "-" + month + "-" + day + " " + HH + ":" + mm + ":" + ss;
	return dateString;
};


export var uuid = function() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");

	return uuid;
}

export var copy = function(data) {
	if (data) {
		return JSON.parse(JSON.stringify(data));
	}
}

//计算相差的月份
export var computedMonth = function(start, end) {
	var date2Mon;
	var startDate = start.getDate() + start.getHours() / 24 + start.getMinutes() / 24 / 60;
	var endDate = end.getDate() + end.getHours() / 24 + end.getMinutes() / 24 / 60;
	if (endDate >= startDate) {
		date2Mon = 0;
	} else {
		date2Mon = -1;
	}
	return (end.getYear() - start.getYear()) * 12 + end.getMonth() - start.getMonth() + date2Mon;
}



var checkMonth = function(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

export var addMonth = function(num, start) {
	start = str2Date(date2Str(start));
	let lastDate = start.setMonth(start.getMonth() + num); // 输出日期格式为毫秒形式1551398400000

	lastDate = new Date(lastDate);
	let lastYear = lastDate.getFullYear();
	let lastMonth = checkMonth(lastDate.getMonth() + 1);
	lastDate = lastYear + '-' + lastMonth;
	return lastDate;
}


export var computedSex = function(zjhm) {
	let bm = zjhm && zjhm.length === 18 ? zjhm.substring(16, 17) : '';
	let sex = bm && bm % 2 === 0 ? "女" : "男";
	return sex;
}


export var computedAgeToKey = function(zjhm) {
	let bm = zjhm && zjhm.length === 18 ? zjhm.substring(16, 17) : '';
	let sex = bm && bm % 2 === 0 ? 2 : 1;
	return sex;

}



export var computedAge = function(identityCard, nowDateTime = new Date()) {
	var len = (identityCard + "").length;
	if (len == 0) {
		return "";
	} else {
		if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
		{
			return "";
		}
	}
	var strBirthday = "";
	if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
	{
		strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12,
			2);
	}
	if (len == 15) {
		strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard
			.substr(10, 2);
	}
	//时间字符串里，必须是“/”
	var birthDate = new Date(strBirthday);
	//var nowDateTime = new Date();
	var age = nowDateTime.getFullYear() - birthDate.getFullYear();
	//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
	if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() &&
			nowDateTime.getDate() < birthDate.getDate())) {
		age--;
	}
	return isNaN(age) ? "" : age;
}


//条目移动
/* var itemMove = function(list,item,value){
	 let index = list.indexOf(item);
	let tem2 =list[index+value];
	list.splice(index,1,tem2);
	list.splice(index+value,1,item);

}
exports.itemMove = itemMove; */

export var itemMove = function(list,item,value){
	 let index =-1;
	for (var i = 0; i < list.length; i++) {
		if(list[i].id == item.id){
			index = i;
			break;
		}
	}
	let tem =list[index];
	let tem2 =list[index+value];
	list.splice(index,1,tem2);
	list.splice(index+value,1,tem);
}

export var arrayReplace = function(srcArray,descArray){
    if(srcArray&&srcArray.length >0 ){
      srcArray.splice(0,srcArray.length);
    }
    if(descArray && descArray.length >0){
      srcArray.push(...descArray);
    }
};

/**
 * 替换数组中的对象
 * @param array
 * @param po
 * @param key
 * @returns {boolean}
 */
export var replaceModel= function (array,po,key="id") {

  if(array && array.length >0 && po  && po[key] ){
    let id = po[key];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if(item[key] === id){
        array.splice(i,1,po);
        return true;
      }
    }
  }else{
    return false;
  }
};

export var arrayDeleteModel =  function  (array,data,key='id') {

  for (var i = 0; i < array.length; i++) {
    if(array[i][key] === data[key]){
      array.splice(i,1);
      break;
    }
  }
}

export var arrayToDataLevel= function (parent, array,pid="pid") {

    if(parent && array){
      for (let data of array){

        if( parent.id === data[pid]){
          let children = parent.children;
          if(!children){
            parent.children = [];
            children = parent.children;
          }
          children.push(data);
          data.parent =copy(parent);

          arrayToDataLevel(data,array);
        }
      }
    }

};

/**
 * 对象属性分解成数组
 * @param {Object} map
 */
export var mapToArray = function (map,key="key",value="value") {
	if(map){
		let array = [];
		for(let k in map){
			let item = {};
			item[key] = k;
			item[value] = map[k];
			array.push(item);
		}
		return array;
	}

};

export var arrayLevelExpand = function (array,childrenkey="children") {
	let result = [];
	
	var wh =  function(result,array,childrenkey){
		if(array && array instanceof Array){
			array.forEach(item=>{
				 result.push(item);
				 wh(result,item[childrenkey],childrenkey);
			})
		}
	}
	wh(result,array,childrenkey);
	return result;
};



/**
 * replaceattr 如果是数组那么就有替换顺序
 */
export var replaceAttr =  function(array,replaceattr,childrenkey,isdeletekey=true) {

	if(array && array instanceof Array){
		for(let item of array){
			if(replaceattr instanceof Array){
				for (var i = 0; i < replaceattr.length; i+=2) {
					let before = replaceattr[i];
					let after = replaceattr[i+1];
					item[after] = item[before];
					if(isdeletekey){
						delete  item[before];
					}
				}
			}else{
				for(let key in replaceattr){
					let keyreplace = replaceattr[key];
					if(keyreplace){
						item[keyreplace] = item[key];
						if(isdeletekey){
							delete item[key];
						}
					}
				}
			}
			
			//递归替换下一级数据
			if(childrenkey){
				let children = item[childrenkey];
				replaceAttr(children,replaceattr,childrenkey,isdeletekey);
			}
		}
	}
}
export var padRight = function(str,len,symbol="*"){
	if(str){
		while(str.length < len){
			str += symbol; 
		}
		return str;
	}
}

export var parse = function(str){
	if(str){
		
		
		let index = str.indexOf("/*");

		while(index !== -1){
			let end = str.indexOf("*/",index);
			str = str.substring(0,index) + str.substring(end+2);
			index = str.indexOf("/*");
		}
		
		return JSON.parse(str);
	}
}
