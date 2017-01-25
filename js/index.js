/**
 * Created by FLY on 2017/1/24.
 */

var f = function ($, p, o, f, r) {
    // var _ = NEJ.P,
    //     _e = _("nej.e"),
    //     _v = _("nej.v"),
    //     _j = _("nej.j"),
    //     _u = _("nej.u"),
    //     _ui = _("nej.ui"),
    //     _p = _("nej.ut"),
    //     $ = _("nej.$");

    //添加项目
    var addItem = function (val) {
        var $list = $(".todo-list");
        var $item = $("<li> <div class='view'> <input class='toggle' type='checkbox'> <label>" + val + "</label> <button class='destroy'></button> </div> <input class='edit' value='" + val + "'> </li>");
        $list._$insert($item, "append");
    };

    //删除项目
    var delItem = function ($target) {
        var $li = $target._$parent("li");
        $li._$remove();
    };

    //编辑项目
    var updateItem = function ($label) {
        var $input = $label._$parent("li")._$children(".edit");
        var width = parseInt($label._$style("width"));
        $input._$style("display", "block");
        $input._$style("width", width+60+"px");
        $input._$style("margin-left", "60px");
        $label._$style("display", "none");
    };

    //项目失焦


    //筛选项目
    var searchItem = function () {

    };

    //完成项目

    //newTodo 文本框的回车事件
    var $newTodo = $("[data-id=new-todo]");
    $newTodo._$on("keydown", function (ev) {
        if (ev.keyCode == 13) {
            var text = $newTodo._$val();
            if (text != "") {
                addItem(text);
            }
        }
    });

    //add按钮点击事件
    var $add = $("[data-id=add]");
    $add._$on("click", function () {
        var text = $newTodo._$val();
        addItem(text);
    });

    var $list = $(".todo-list");
    $list._$on("click", function (ev) {
        var $target = $(ev.target);

        //删除按钮点击事件
        if ($target._$hasClassName("destroy")) {
            delItem($target);
        }




    });

    //编辑项目双击事件
    $list._$on("dblclick", function (ev) {
        if (ev.target.tagName == "LABEL") {
            var $label = $(ev.target);
            updateItem($label);
        }
    });


};

NEJ.define(["{lib}util/chain/NodeList.js", "{lib}util/ajax/xdr.js"], f);

