$(function () {
    // $('body').height($('body')[0].clientHeight);
    initpage();
    $(window).resize(function () {
        initpage();
    })

    function initpage() {
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
        var _html = document.getElementsByTagName('html')[0];
        view_width > 640 ? _html.style.fontSize = 640 / 16 + 'px' : _html.style.fontSize = view_width / 16 + 'px';
    }
});

var sllTop;
var divsTop = 330;/*document.getElementsByClassName('content')[0].offsetTop; 获取当前对象到其上级层顶部的距离*/
window.onscroll = function () {
    var onBtn = document.getElementById('top-box');
    sllTop = document.documentElement.scrollTop || document.body.scrollTop;//如果浏览器不支持第一个事件则选择第二

    if (sllTop >= 40) {
        $('.header-con').css('padding', '0');
        $('.logo img').css({'width': '50', 'margin-top': '5px', 'margin-left': '10px'});
    } else {
        $('.header-con').css('padding', '10px 0');
        $('.logo img').css({'width': '60', 'margin-top': '0px', 'margin-left': '0px'});
    }

    if (sllTop > 240) {
        $('#tbox2').css('display', 'block')
    } else {
        $('#tbox2').css('display', 'none');
    }
    if (sllTop >= divsTop) {
        $('.left-list').css('position', 'fixed');
    } else {
        $('.left-list').css('position', '');
    }
    tlistTop();

};

$(function () {
    $(".taoba").click(function (event) {
        var i = $(this).index();
        var id = $('.dingwei')[i];
        $("html,body").animate({scrollTop: $(id).offset().top - 80}, 800);
    });


    $(".list-text").click(function (event) {
        var i2 = $(this).index();
        var id2 = $('.sethome-con')[i2];
        $("html,body").animate({scrollTop: $(id2).offset().top - 80}, 800);
    });
});

function tlistTop() {
    var sethome_conHeight;
    var tihsHeight;
    var list_text = document.getElementsByClassName('fa-caret-right');
    if (list_text.length === 0) {
        return false;  //如果匹配到0个元素，则将函数返回，不继续执行
    }
    arr1 = []; //存储元素的top距离页面顶部的高度
    for (var i = 0; i <= 4; i++) {
        thisHeight = document.getElementsByClassName('sethome-con')[i].offsetTop + divsTop - 80;
        arr1.push(thisHeight); //将循环获取到的值添加到数组里面
    }

    if (sllTop >= arr1[0]) {
        list_text[0].style.opacity = 1;
        list_text[1].style.opacity = 0;
        list_text[2].style.opacity = 0;
        list_text[3].style.opacity = 0;
        list_text[4].style.opacity = 0;
    }
    if (sllTop >= arr1[1]) {
        list_text[0].style.opacity = 0;
        list_text[1].style.opacity = 1;
        list_text[2].style.opacity = 0;
        list_text[3].style.opacity = 0;
        list_text[4].style.opacity = 0;
    }
    if (sllTop >= arr1[2]) {
        list_text[0].style.opacity = 0;
        list_text[1].style.opacity = 0;
        list_text[2].style.opacity = 1;
        list_text[3].style.opacity = 0;
        list_text[4].style.opacity = 0;
    }
    if (sllTop >= arr1[3]) {
        list_text[0].style.opacity = 0;
        list_text[1].style.opacity = 0;
        list_text[2].style.opacity = 0;
        list_text[3].style.opacity = 1;
        list_text[4].style.opacity = 0;
    }
    if (sllTop >= arr1[4]) {
        list_text[0].style.opacity = 0;
        list_text[1].style.opacity = 0;
        list_text[2].style.opacity = 0;
        list_text[3].style.opacity = 0;
        list_text[4].style.opacity = 1;
    }
}

$('#gotop').click(function () {
    $('body,html').animate({
            scrollTop: 0
        },
        800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
})


/*选择搜索引擎*/
$('.Select-box ul').hover(function () {
    $(this).css('height', 'auto')
}, function () {
    $(this).css('height', '40px')
});
$('.Select-box-2 ul').hover(function () {
    $(this).css('height', 'auto')
}, function () {
    $(this).css('height', '47px')
});

// 全局变量，用于跟踪当前搜索引擎
var currentEngine = 'baidu';

// 修改搜索引擎切换功能
$('.Select-box-2 li').click(function () {
    var _tihs = $(this).attr('class');
    var _html = $(this).html();
    var _name = 'wd';
    var _action = 'https://www.baidu.com/s';

    if (_tihs == 'this_s') {
        return "";
    }
    if (_tihs == 'baidu_s') {
        _action = 'https://www.baidu.com/s';
        _name = 'wd';
        currentEngine = 'baidu';
    } else if (_tihs == 'google_s') {
        _action = 'https://www.google.com/search';
        _name = 'q';
        currentEngine = 'google';
    } else if (_tihs == 'bing_s') {
        _action = 'https://www.bing.com/search';
        _name = 'q';
        currentEngine = 'bing';
    } else if (_tihs == 'duckduckgo_s') {
        _action = 'https://duckduckgo.com/';
        _name = 'q';
        currentEngine = 'duckduckgo';
    } else if (_tihs == 'yahoo_s') {
        _action = 'https://search.yahoo.com/search';
        _name = 'p';
        currentEngine = 'yahoo';
    }

    $('.baidu form').attr('action', _action);
    $('.this_s').html(_html);
    $('#kw-2').attr('name', _name);
    $('.Select-box-2 ul').css('height', '48px');

    setCookie("_search_", _html + "_nln_" + _action + "_nln_" + _name);

    // 清空当前的联想结果
    oUl.style.display = 'none';
    oUl.innerHTML = '';
});

// Cookie操作函数
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function _search_() {
    var aCookie = document.cookie.split(";");

    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (aCrumb[0].toString().trim() == 'order_list') {
            continue;
        }
        var name = unescape(aCrumb[0].trim());

        if (aCrumb[0].toString().trim().indexOf("_search_") > -1) {

            var link = getCookie(name).split("_nln_");

            $('.baidu form').attr('action', link[1]);
            $('.this_s').html(link[0]);
            $('#kw-2').attr('name', link[2]);
            $('.Select-box-2 ul').css('height', '48px');

            // 根据保存的搜索引擎设置currentEngine
            if (link[1].indexOf('google.com') > -1) {
                currentEngine = 'google';
            } else if (link[1].indexOf('bing.com') > -1) {
                currentEngine = 'bing';
            } else if (link[1].indexOf('duckduckgo.com') > -1) {
                currentEngine = 'duckduckgo';
            } else if (link[1].indexOf('yahoo.com') > -1) {
                currentEngine = 'yahoo';
            } else {
                currentEngine = 'baidu';
            }
        }
    }
}

_search_();

//清空输入框内容
$('.qingkong').click(function () {
    cls();
    $(this).css('display', 'none')
});

function cls() {
    var sum = 0;
    var t = document.getElementsByTagName("INPUT");
    for (var i = 0; i < t.length; i++) {
        if (t[i].type == 'text') {
            ++sum;
            t[i].value = "";//清空
        }
    }
}

//清空输入框按钮的显示和隐藏
function if_btn() {
    var btn_obj = document.getElementById("kw") || document.getElementById("kw-2");
    var cls_btn = document.getElementById("qingkong");
    var btn_obj_val;
    var times;
    //当元素获得焦点时
    if (btn_obj == '' || btn_obj == null) {
        return false;  //如果没有找到这个元素，则将函数返回，不继续执行
    }
    btn_obj.onfocus = function () {
        times = setInterval(function () {
            btn_obj_val = btn_obj.value;
            if (btn_obj_val != 0) {
                cls_btn.style.display = "block";
            } else {
                cls_btn.style.display = "none";
            }
        }, 200);
    }
    //元素失去焦点时
    btn_obj.onblur = function () {
        clearInterval(times);
    }

}

if_btn();

$('.muban li').click(function () {
    _index = $(this).index();
    $(this).addClass('shaw').siblings().removeClass('shaw');
    $('.muban-list ul').eq(_index).fadeIn(250).siblings().fadeOut(0);
});
$('.ruanjian-tab li').click(function () {
    _index = $(this).index();
    $(this).addClass('shaw').siblings().removeClass('shaw');
    $('.ruanjian-list ul').eq(_index).fadeIn(250).siblings().fadeOut(0);
});

$('.list-link-4').hover(function () {
    //获取当前元素的title内容，赋值给_thisTit
    var _thisTit = $(this).attr('data-title');
    //tips提示内容为_thisTit（即等于当前鼠标滑过元素的title内容），吸附对象为当前鼠标滑过对象
    if (_thisTit != "") {	//判断条件，当前元素的data-title不等于空才执行下面的代码
        layer.tips(_thisTit, this, {
            tips: [1, '#1E9FFF'],
            time: 99999,
        });
    }

}, function () {
    $('.layui-layer-tips').css('display', 'none')
});

var btn = $("#kw-2"), oUl = $(".keylist")[0];

$("#qingkong").click(function () {
    oUl.style.display = 'none';
})

// 修改搜索联想功能
btn.keyup(function (e) {
    if (e.keyCode == 13 || e.keyCode == 40 || e.keyCode == 38) {
        e.preventDefault();
        return;
    }
    var value = this.value.trim();
    if (value) {
        if (currentEngine === 'baidu') {
            fetchBaiduSuggestions(value);
        } else if (currentEngine === 'google') {
            fetchGoogleSuggestions(value);
        } else if (currentEngine === 'bing') {
            fetchBingSuggestions(value);
        } else if (currentEngine === 'duckduckgo') {
            fetchDuckDuckGoSuggestions(value);
        } else if (currentEngine === 'yahoo') {
            fetchYahooSuggestions(value);
        } else {
            fetchBaiduSuggestions(value);
        }
    } else {

        oUl.style.display = 'none';
    }
});

function fetchBaiduSuggestions(query) {
    // 使用更新的百度联想API
    var script = document.createElement('script');
    script.src = 'https://suggestion.baidu.com/su?wd=' + encodeURIComponent(query) + '&p=3&cb=handleBaiduSuggestions&json=1&pwd=' + encodeURIComponent(query);
    document.body.appendChild(script);
    script.onerror = function () {
        // 如果新接口失败，尝试旧接口
        var fallbackScript = document.createElement('script');
        fallbackScript.src = 'https://www.baidu.com/sugrec?prod=pc&wd=' + encodeURIComponent(query) + '&cb=handleBaiduSuggestionsFallback';
        document.body.appendChild(fallbackScript);
        fallbackScript.onerror = handleError;
        fallbackScript.onload = function () {
            document.body.removeChild(fallbackScript);
        };
        document.body.removeChild(script);
    };
    script.onload = function () {
        document.body.removeChild(script);
    };
}

function fetchGoogleSuggestions(query) {
    // 使用更稳定的谷歌联想API
    var script = document.createElement('script');
    script.src = 'https://clients1.google.com/complete/search?client=youtube&ds=yt&q=' + encodeURIComponent(query) + '&callback=handleGoogleSuggestions';
    document.body.appendChild(script);
    script.onerror = function () {
        // 如果失败，尝试备用接口
        var fallbackScript = document.createElement('script');
        fallbackScript.src = 'https://suggestqueries.google.com/complete/search?client=chrome&q=' + encodeURIComponent(query) + '&callback=handleGoogleSuggestions';
        document.body.appendChild(fallbackScript);
        fallbackScript.onerror = handleError;
        fallbackScript.onload = function () {
            document.body.removeChild(fallbackScript);
        };
        document.body.removeChild(script);
    };
    script.onload = function () {
        document.body.removeChild(script);
    };
}

function fetchBingSuggestions(query) {
    // 必应联想API
    var script = document.createElement('script');
    script.src = 'https://api.bing.com/osjson.aspx?query=' + encodeURIComponent(query) + '&JsonType=callback&JsonCallback=handleBingSuggestions';
    document.body.appendChild(script);
    script.onerror = function () {
        // 如果必应失败，回退到百度联想
        console.warn('Bing suggestions failed, falling back to Baidu');
        fetchBaiduSuggestions(query);
        document.body.removeChild(script);
    };
    script.onload = function () {
        document.body.removeChild(script);
    };
}

function fetchDuckDuckGoSuggestions(query) {
    // DuckDuckGo联想API
    var script = document.createElement('script');
    var url = 'https://duckduckgo.com/ac/?q=' + encodeURIComponent(query) + '&callback=handleDuckDuckGoSuggestions';
    script.src = url;
    document.body.appendChild(script);
    script.onerror = function (e) {
        // 如果DuckDuckGo失败，回退到百度联想
        console.error('DuckDuckGo script onerror event fired.', e);
        console.warn('DuckDuckGo suggestions failed, falling back to Baidu');
        fetchBaiduSuggestions(query);
        document.body.removeChild(script);
    };
    script.onload = function () {

        // Do not remove the script tag here to avoid race conditions.
    };
}

function fetchYahooSuggestions(query) {
    // 雅虎联想API
    var script = document.createElement('script');
    script.src = 'https://search.yahoo.com/sugg/chrome?output=fxjson&command=' + encodeURIComponent(query) + '&callback=handleYahooSuggestions';
    document.body.appendChild(script);
    script.onerror = function () {
        // 如果雅虎失败，回退到百度联想
        console.warn('Yahoo suggestions failed, falling back to Baidu');
        fetchBaiduSuggestions(query);
        document.body.removeChild(script);
    };
    script.onload = function () {
        document.body.removeChild(script);
    };
}

// 确保所有回调函数在全局作用域
window.handleBaiduSuggestions = function (data) {
    if (data && data.s) {
        // 新的百度API格式
        displaySuggestions(data.s, 'baidu');
    } else if (data && data.g) {
        // 旧的百度API格式
        var suggestions = data.g.map(item => item.q);
        displaySuggestions(suggestions, 'baidu');
    } else {
        hidesuggestions();
    }
};

window.handleBaiduSuggestionsFallback = function (data) {
    // 处理旧版百度API的回调
    if (data && data.g) {
        var suggestions = data.g.map(item => item.q);
        displaySuggestions(suggestions, 'baidu');
    } else {
        hidesuggestions();
    }
};

window.handleGoogleSuggestions = function (data) {
    if (data && data[1] && Array.isArray(data[1])) {
        // Google返回的数据格式：["查询词", [["联想词1", 0, [数据]], ["联想词2", 0, [数据]], ...], {...}]
        // 需要提取data[1]中每个子数组的第一个元素
        var suggestions = [];
        for (var i = 0; i < data[1].length; i++) {
            if (Array.isArray(data[1][i]) && data[1][i][0]) {
                suggestions.push(data[1][i][0]);
            }
        }

        if (suggestions.length > 0) {
            displaySuggestions(suggestions, 'google');
        } else {
            hidesuggestions();
        }
    } else {
        hidesuggestions();
    }
};

window.handleBingSuggestions = function (data) {
    if (data && data[1] && Array.isArray(data[1])) {
        var suggestions = data[1];
        displaySuggestions(suggestions, 'bing');
    } else {
        hidesuggestions();
    }
};

// 确保DuckDuckGo回调函数在全局作用域
window.handleDuckDuckGoSuggestions = function (data) {
    if (Array.isArray(data)) {
        // 转换成纯字符串数组
        var suggestions = data
            .filter(function (item) {
                return item && item.phrase;
            })
            .map(function (item) {
                return item.phrase;
            });


        if (suggestions.length > 0) {
            displaySuggestions(suggestions, 'duckduckgo');
        } else {
            hidesuggestions();
        }
    } else {
        hidesuggestions();
    }
};

// 确保雅虎回调函数在全局作用域
window.handleYahooSuggestions = function (data) {
    if (data && data[1] && Array.isArray(data[1])) {
        // 雅虎可能使用类似谷歌的格式
        var suggestions = data[1];
        displaySuggestions(suggestions, 'yahoo');
    } else if (data && data.r && Array.isArray(data.r)) {
        // 或者使用 data.r 格式
        var suggestions = data.r.map(function (item) {
            return item.k || item;
        });
        displaySuggestions(suggestions, 'yahoo');
    } else {
        hidesuggestions();
    }
};

function displaySuggestions(suggestions, engine) {
    var oUl = document.querySelector(".keylist");
    if (!oUl) {
        console.error("Cannot find .keylist element");
        return;
    }

    if (!suggestions || suggestions.length === 0) {
        hidesuggestions();
        return;
    }

    var str = '';
    var maxResults = Math.min(suggestions.length, 8); // 最多显示8个结果
    for (var i = 0; i < maxResults; i++) {
        var suggestion = suggestions[i];

        if (suggestion && suggestion.trim()) {
            var listItem = '<li class="' + engine + '-suggestion">' + suggestion.trim() + '</li>';

            str += listItem;
        }
    }
    if (str) {
        oUl.innerHTML = str;
        oUl.style.display = 'block';
    } else {
        hidesuggestions();
    }

}

function hidesuggestions() {
    var oUl = document.querySelector(".keylist");
    if (oUl) {
        oUl.style.display = 'none';
    }
}

function handleError() {
    console.error('Failed to fetch suggestions');
    hidesuggestions();
}

$(".keylist").on('click', 'li', function () {
    var value = $(this).text();
    btn.val(value);
    $('#su-2').click();
    oUl.style.display = 'none';
});

//利用键盘控制选择搜索联想词
$(document).keydown(function (e) {

    if (e.keyCode == 13 && oUl.style.display == 'block') {
        btn.val($(".keylist li.active").html().trim());
        $('#su-2').click();
        oUl.style.display = 'none';
        //alert('你按下了Enter');
    } else if (e && e.keyCode == 40 && oUl.style.display == 'block') { //下
        //active
        if ($(".keylist li.active").length > 0) {
            var k1 = $(".keylist li.active")
            k1.next().addClass("active");
            k1.removeClass("active");
        } else {
            var k0 = $($(".keylist li")[0]);
            k0.addClass("active");
        }
    } else if (e && e.keyCode == 38 && oUl.style.display == 'block') { // 上

        var k1 = $(".keylist li.active")
        k1.prev().addClass("active");
        k1.removeClass("active");
    } else {
        //btn.keyup();
    }

});

// 文件夹功能 - 文件夹数据配置
var folderData = {
    'ai-platforms': {
        title: 'AI 平台',
        items: [
            {name: 'Hugging Face', url: 'https://huggingface.co/'},
            {name: 'ChatGPT', url: 'https://chatgpt.com/'},
            {name: 'Claude', url: 'https://claude.ai/'},
            {name: 'Gemini', url: 'https://gemini.google.com/'},
            {name: 'Google AI Studio', url: 'https://aistudio.google.com/'},
            {name: 'Poe', url: 'https://poe.com/'},
            {name: 'Copilot', url: 'https://copilot.microsoft.com/'},
            {name: 'Meta AI', url: 'https://www.meta.ai/'},
            {name: 'Grok', url: 'https://grok.com/'},
            {name: 'Deepseek', url: 'https://chat.deepseek.com/'},
            {name: '豆包', url: 'https://www.doubao.com/chat/'},
            {name: 'Kimi', url: 'https://kimi.moonshot.cn/'},
            {name: '通义', url: 'https://www.tongyi.com/'},
            {name: 'Qwen Chat', url: 'https://chat.qwen.ai/'},
            {name: '文心一言', url: 'https://yiyan.baidu.com/'},
            {name: 'Character.AI', url: 'https://character.ai/'},
            {name: 'Midjourney', url: 'https://www.midjourney.com/'},
            {name: 'Stable Diffusion', url: 'https://stability.ai/'},
            {name: 'Runway', url: 'https://runwayml.com/'},
            {name: 'Suno AI', url: 'https://suno.com/home'},
            {name: 'Genspark', url: 'https://www.genspark.ai/'},
            {name: 'J1 Assistant', url: 'https://matter.ai/'}
        ]
    },
    'ai-tools': {
        title: 'AI 导航',
        items: [
            {name: 'AI 工具集', url: 'https://ai-bot.cn/'},
            {name: 'ToolAI', url: 'https://www.toolai.io/'},
            {name: 'FuturePedia', url: 'https://www.futurepedia.io/'},
            {name: 'AI 导航', url: 'https://ai.nancheng.fun/'},
            {name: 'AIHub', url: 'https://aihub.cn/'},
            {name: 'AI产品榜', url: 'https://top.aibase.com/'},
            {name: 'AI研究所', url: 'https://www.aiyjs.com/'},
            {name: 'AI工具箱', url: 'https://ai.toolbox.com/'},
            {name: 'Awesome AI', url: 'https://awesomeai.tools/'},
            {name: 'AI集市', url: 'https://ai.market/'},
            {name: 'GPT应用导航', url: 'https://gpt.candobear.com/'},
            {name: 'AI神器', url: 'https://shenqi.io/'},
            {name: 'AI帮个忙', url: 'https://aibang.run/'},
        ]
    }
    // 可以在这里添加更多文件夹配置
};

// 文件夹功能
$(document).ready(function () {
    $(document).on('click', '.folder-link', function (e) {
        e.preventDefault();
        var folderId = $(this).data('folder');
        var folderConfig = folderData[folderId];

        if (folderConfig) {
            openFolder(folderConfig);
        }
    });

    $(document).on('click', '.folder-close', function () {
        closeFolder();
    });

    $(document).on('click', '.folder-popup', function (e) {
        if (e.target === this) {
            closeFolder();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC键
            closeFolder();
        }
    });

    $(document).on('click', '.folder-item', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        if (url && url !== '#') {
            window.open(url, '_blank');
        }
    });
});

function openFolder(folderConfig) {
    var popup = $('#folder-popup');
    var folderGrid = $('#folder-grid');
    var folderTitle = $('.folder-title');

    // 设置标题
    folderTitle.text(folderConfig.title);

    // 清空并生成文件夹内容
    folderGrid.empty();

    if (folderConfig.items && folderConfig.items.length > 0) {
        folderConfig.items.forEach(function (item) {
            var itemHtml = '<a href="' + item.url + '" class="folder-item" target="_blank" rel="nofollow">' +
                item.name + '</a>';
            folderGrid.append(itemHtml);
        });
    }

    // 显示浮窗
    popup.fadeIn(300);

    // 防止页面滚动
    $('body').css('overflow', 'hidden');
}

// 关闭文件夹浮窗
function closeFolder() {
    var popup = $('#folder-popup');

    popup.fadeOut(300);

    $('body').css('overflow', 'auto');
}





