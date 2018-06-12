;var crh =(function(){
    /**
     * randomWord 产生任意长度随机字母数字组合
     * @param randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
     * @param min
     * @param max
     * @returns {string}
     *
     *
     *生成 3 - 32 位随即字符串
     *randomWord(true,3,32);
     *生成 32 位随机字符串
     *randomWord(false,32);
     */
    function randomWorld(randomFlag,min,max){
        var str="",range=min,
            arr=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
                'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
                'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                'W', 'X', 'Y', 'Z'];
        //随机产生
        if(randomFlag){
            range=Math.round(Math.random()*(max-min))+min;
        }
        for(var i=0;i<range;i++){
            pos=Math.round(Math.random()*(arr.length-1));
            str+=arr[pos];
        }
        return str;
    }

    /**
     * createUUID c创建UUID
     * @returns {string} 返回字符串
     */
    function createUUid(){
        var d=new Date().getTime();
        //使用字符串的replace和正则来替换  字符  下方是替换x和y
        var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            //将匹配到的x和y进行替换新生成的
            return (c == 'x' ? r : (r & 0x8 | 0x8)).toString(16);
        });
        return uuid;
    }

    /**
     * @param str 对应手机号码
     * @returns {boolean} 结果返回 true 和 false。
     * true 为正确手机号码
     * false 为错误手机号码
     */
    function verifyPhoneFormat_flag(str){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    }

    /**
     * @param code 对省份证号码
     * @returns {boolean} 结果返回 true 和 false。
     * true 为正确
     * false 为错误
     */
    function verifyIdCodeFormat_flag(code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误,结尾是字母请注意大小写";
                    pass =false;
                }
            }
        }
        //return [pass,tip]
        return pass;
    }

    /**
     * JS判断两个数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @returns {boolean} 返回true 或 false
     */
    function arrayEqual_flag(arr1,arr2)
    {
            //直接就相同
            if(arr1 === arr2){
                return true;
            }
            //长度不同
            if(arr1.length != arr2.length){
                return false;
            }
            //在长度相等的情况下其中有一个不相等则为不相等
             for(var i=0;i<arr1.length;i++){
                 if(arr1[i] !== arr2[1]){
                     return false;
                 }
             }
    }

    /**
     * 格式化金额
     * @param money
     * @param type  0 不带小数位   不写带两位00
     * @returns {*}
     */
    function convert_money(money,type){
        if (/[^0-9\.]/.test(money))
            return "0";
        if (money == null || money == "")
            return "0";
        console.log(money);
        money = money.toString().replace(/^(\d*)$/, "$1.");
        console.log(money);
        money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        console.log(money);
        money = money.replace(".", ",");
        console.log(money);
        var re = /(\d)(\d{3},)/;
        while (re.test(money))
            money = money.replace(re, "$1,$2");
            money = money.replace(/,(\d\d)$/, ".$1");
            if (type == 0) {// 不带小数位(默认是有小数位)
                var a = money.split(".");
                if (a[1] == "00") {
                    money = a[0];
                }
            }
        return money;
    }

    /**
     * 字符串长度截取
     * @param str 给定的字符串
     * @param len 给定的长度
     * @returns {string} 返回截取之后的字符串
     */
    function cutStr(str, len) {
        var temp,
            icount = 0,
            patrn = /[^\x00-\xff]/,
            strre = "";
        for (var i = 0; i < str.length; i++) {
            if (icount < len - 1) {
                temp = str.substr(i, 1);
                if (patrn.exec(temp) == null) {
                    icount = icount + 1
                } else {
                    icount = icount + 2
                }
                strre += temp
            } else {
                break;
            }
        }
        return strre + "...";
    }

    /**
     * 判断是否为网址
     * @param strUrl URL地址
     * @returns {boolean} 返回真或者假
     * @constructor
     */
    function url_flag(strUrl) {
        var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
        if (regular.test(strUrl)) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 验证是否为网址
     * @param str_url
     * @returns {Boolean}
     */
    function checkURL_flag(str_url){
        var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re=new RegExp(strRegex);
        //re.test()
        if (re.test(str_url)){
            return (true);
        }else{
            return (false);
        }
    }

    /**
     * 限制只能是整数，不能是小数
     * @param curObj
     */
    function clearNoInt(curObj){
        curObj.value = curObj.value.replace(/[^\d]/g,"");  //清除“数字”和“.”以外的字符
    }

    /**
     * JS允许输入小数位的数字
     * @param curObj
     */
    function clearNoFloat(curObj){
        curObj.value = curObj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
        curObj.value = curObj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.
        curObj.value = curObj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
        curObj.value = curObj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    }

    /**
     * JS检测字符串是否为空
     * @param str
     * @returns {boolean}
     */
    function checkIsEmpty(str) {
        if (null != str && undefined != str && "" != str) {
            return false;
        }
        return true;
    }

    /**
     * JS过滤字符串中所有空格
     * @param string
     * @returns {string}
     */
    function ignoreSpaces(string) {
        var temp = "";
        string = '' + string;
        //先分割成数组在进行数组拼接
        splitstring = string.split(" ");
        for(i = 0; i < splitstring.length; i++)
            temp += splitstring[i];
        return temp;
    }

    /**
     * BASE64加密
     * @param str
     * @returns {string}
     */
    function base64Encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    /**
     * BASE64解密
     * @param str
     * @returns {string}
     */
    function base64Decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    /**
     * 检测是否支持transition
     * @returns {boolean}
     */
    function supportTransition () {
        var s = document.createElement('p').style,
            r = 'transition' in s ||
                'WebkitTransition' in s ||
                'MozTransition' in s ||
                'msTransition' in s ||
                'OTransition' in s;
        s = null;
        return r;
    }

    /**
     * 将驼峰字符串转为下划线字符串
     * @param str
     * @returns {*}
     */
    function convertCamelCase(str) {
        if (typeof (str) != 'string') {
            console.error('[convertCamelCase] argument is not String.');
            return str;
        }
        var pattern = /[A-Z]/g;
        return str.replace(pattern, function(match, index) {
            if (index != 0) {
                return '_' + match.toLowerCase();
            } else {
                return match.toLowerCase();
            }
        });
    }

    /**
     * 将object转为form data(id=1&name=ye21st)，方便post提交
     * @param {Object} obj [数据对象]
     * @return {String}
     */
    function encodeFormData(obj) {
        if (!obj) return;
        var pairs = [];
        for (var name in obj) {
            if (!obj.hasOwnProperty(name)) continue;
            if (typeof obj[name] == 'function') continue;
            var value = obj[name].toString();
            name = encodeURIComponent(name.replace('%20', '+'));
            value = encodeURIComponent(value.replace('%20', '+'));
            pairs.push(name + '=' + value);
        }
        return pairs.join('&');
    }

    /**
     * JS检查输入的字符是否具有特殊字符
     * @param str 字符串
     * @returns true 或 false; true表示包含特殊字符 主要用于注册信息的时候验证
     */
    function checkQuote_flag(str) {
        var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
        items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
        items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
        str = str.toLowerCase();
        for ( var i = 0; i < items.length; i++) {
            if (str.indexOf(items[i]) >= 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * JS检查输入的邮政编码是否正确
     * @param str
     * @returns {Boolean}
     */
    function checkPostcode_flag(str){
        if (str.match(/^[1-9][0-9]{5}$/) == null) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * JS将手机号格式化，中间部分以 * 号代替
     * @param phone
     * @returns {string | * | void}
     */
    function phoneToStar( phone ) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }

    /**
     * 判断是否是邮箱的正确格式
     * @param str 对应的需要验证的邮箱地址
     * @returns {boolean} 返回真或假
     */
    function isEmail(str) {
        var emailRegx = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
        return emailRegx.test(str);
    }

    return{
        randomWorld: randomWorld,
        createUUid:createUUid,
        verifyPhoneFormat_flag:verifyPhoneFormat_flag,
        verifyIdCodeFormat_flag:verifyIdCodeFormat_flag,
        arrayEqual_flag:arrayEqual_flag,
        convert_money:convert_money,
        cutStr:cutStr,//需要改善
        url_flag:url_flag,
        checkURL_flag:checkURL_flag,
        clearNoInt:clearNoInt,
        clearNoFloat:clearNoFloat,
        checkIsEmpty:checkIsEmpty,
        base64Encode:base64Encode,
        base64Decode:base64Decode,
        supportTransition:supportTransition,
        convertCamelCase:convertCamelCase,
        checkQuote_flag:checkQuote_flag,
        checkPostcode_flag:checkPostcode_flag,
        phoneToStar:phoneToStar,
        isEmail:isEmail,
    };
})();


