require('babel-polyfill');
/*
    [Rtimer 定时器类]
    @param  {[type]}    object      [传入参数]
    @Data   {[type]}    string      必需 结束的时间
    @split  {[type]}    string      必需 时间的分割符
    @ele    {[type]}    'string'    必需 放入倒计时容器
    @lang   {[type]}    'string'    可选 描述时间语言
    @cb     {[type]}    function    可选 结束触发的方法
*/
class Rtimer {
    constructor(param) {
        this.Data       = param.Data    || '';
        this.split      = param.split   || '';
        this.ele        = param.ele     || null;
        this.lang       = param.lang    || null;
        this.cb         = param.cb      || null;

        this.endUnix    = '';
        this.timeLang   = '';

        this.EndDataUnix();
        this.LangType();
        this.CalculaterTime();
    }

    /*
        [EndDataUnix 转换结束时间格式]
        @output  {[enData]}    number
    */
    EndDataUnix() {
        const that      = this;

        const Data      = that.Data;
        const split     = that.split;
        const arrDate   = Data.split(split);
        let   endDate   = new Date();

        for (let [key, value] of arrDate.entries()) {
            let isCurrent = false;
            if (key === 0) {
                endDate.setFullYear(value);
                isCurrent = true;
            }
            if (key === 1 && value <= 12) {
                endDate.setMonth(--value);
                isCurrent = true;
            }
            if (key === 2 && value <= 31) {
                endDate.setDate(value);
                isCurrent = true;
            }
            if (key === 3 && value <= 24) {
                endDate.setHours(value);
                isCurrent = true;
            }
            if (key === 4 && value < 60) {
                endDate.setMinutes(value);
                isCurrent = true;
            }
            if (key === 5 && value < 60) {
                endDate.setSeconds(value);
                isCurrent = true;
            }

            if (!isCurrent) {
                console.log('请输入正确格式');
                return false;
            }
        }

        that.endUnix = endDate.getTime();
    }

    /*
        [LangType 设置时间语言]
        @output  {[enData]}    number to ['day', 'hour', 'minute', 'second']
    */
    LangType() {
        const that = this;
        let lang   = that.lang;
        let ZH     = ['天', '小时', '分钟', '秒'];
        let UK     = ['day', 'h', 'm', 's'];
        switch(lang) {
            case('zh'):
                that.timeLang = ZH;
                return;
            case('uk'):
                that.timeLang = UK;
                return;
            default:
                that.timeLang = new Array(4).fill('');
                return;
        }
    }

    /*
        [CalculaterTime 计算剩余时间]
        @output  {[type]}    number
    */
    CalculaterTime() {
        const that  = this;

        const now   = new Date().getTime();
        const end   = that.endUnix;

        if (now - end > 0) {
            that.cb();

        } else {
            let ele        = that.ele;
            let Mixtimer   = end - now;

            const D_Seconds     = 1000 * 60 * 60 * 24;
            const H_Seconds     = 1000 * 60 * 60;
            const M_Seconds     = 1000 * 60;
            const seconds       = 1000;

            let d          = Math.floor(Mixtimer / D_Seconds);
            let h          = Math.floor((Mixtimer - d * D_Seconds) / H_Seconds);
            let m          = Math.floor((Mixtimer - d * D_Seconds - h * H_Seconds) / M_Seconds);
            let s          = Math.floor((Mixtimer - d * D_Seconds - h * H_Seconds - m * M_Seconds) / seconds);

            let r          = Array.from([d, h, m, s]);

            for (let key of r.keys()) {
                r[key] = `<span class="Rtimer-item"><em>${that.IsZero(r[key])}</em>${that.timeLang[key]}</span>`;
            }

            let RTimerHtml = r.join('');
            document.querySelector(ele).innerHTML = RTimerHtml;

            const timer = setTimeout(function () {
                clearTimeout(timer);
                that.CalculaterTime();
            }, 1000);
        }
    }

    /*
        [IsZero 剩余时间是否为零]
        @return  {[type]}    string || number
    */
    IsZero(value) {
        value =  value >= 10? value: (10 > value >= 1? '0' + value: '00');
        return value;
    }
}

window.Rtimer = Rtimer;