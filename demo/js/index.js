var f=function(){
    var _ = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _u = _('nej.u'),
        _ui= _('nej.ui'),
        _p = _('nej.ut');
    //获取节点
    var _parent=_e._$get('test');
    //滚动效果
    var _roll=function(_target,_index){
        if(!_target.style.left) _target.style.left=(_index*3)+"px";
        else _target.style.left=(parseInt(_target.style.left)>(600-_index*3))?
                                    "0px":parseInt(_target.style.left)+3*_index+"px";
    };
    //车速数组
    var _carSpeed=[0,0,0,0];
    //item节点点击事件
    var _onItemClick=function(_event,_index){
        var _target=_v._$getElement(_event);
        _carSpeed[_index-1]+=1;
        _target.innerHTML=_target.innerHTML.substring(0,2)+"x"+_carSpeed[_index-1];
        setInterval(_roll._$bind(this,_target,_index),1000);
    }
    //item回调函数
    var _cbWithItem=function(_item,_index,_list){
        if(_index%2==0)_item.style.backgroundColor="#B4EEB4";
        _v._$addEvent(_item,"click",_onItemClick._$bind2(this,_index+1));
    }
    //获取Item节点
    var _xItems=_e._$getByClassName(_e._$getChildren(_parent)[1],"x-item");
    //给Item节点添加事件
    _u._$forEach(_xItems,_cbWithItem,this);
    
    //获取input节点
    var _input=_e._$get('input');
    //给input节点添加事件
    _v._$addEvent(_input,'click',onInputClick);
    function onInputClick(_event){
        _v._$stop(_event);//因为日历控件是卡片，在document上接收到click 事件都会回调到卡片，所以阻止掉事件
        var _datepick = _ui._$$DatePick._$allocate({
                    parent: _input.parentNode,
                    clazz: 'm-dt',
                    onchange: onChange
                }); 
    }
    //选中时回调，把值设到input中
    function onChange(_value){
        _input.value = _u._$format(_value,'yyyy-MM-dd');
    }
    
    //ajax回调函数
    var _cbShowAjaxData=function(_data){
        var _ajax=_e._$get('ajax');
        for(var i=0,l=(_data.length<5?_data.length:5);i<l;i++){
            var _tempP=_e._$create("p",null,_ajax);
            _tempP.innerHTML="title:"+_data[i].title+"<br/>"+_data[i].shortPublishDateStr
                +" "+_data[i].publishTimeStr+" 访问"+_data[i].accessCount+" 评论"+_data[i].commentCount;
        }
    };
    //ajax请求数据
    _j._$request("http://nej.netease.com/api/getFriendsLatestBlogs",{
        sync:false,
        type:"json",
        data:null,
        query:"userid=126770605",
        method:"GET",
        onload:_cbShowAjaxData
    });
    //
    var _ac = _p._$$AnimBounce._$allocate({from:{offset:20,velocity:1000},acceleration:500,springtension:0.5,onstop:_onBounceStop,onupdate:_onBounceUpdate})
    _ac._$play();
    function _onBounceStop(_offset){
        //todo
    }
    function _onBounceUpdate(_offset){
        _e._$get('ball').style.left = _offset.offset +'px';
    }
};

define(['{lib}ui/datepick/datepick.js','{lib}util/animation/bounce.js','{lib}util/ajax/xdr.js'],f);