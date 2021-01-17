var laypage = layui.laypage;
var layer = layui.layer;
var form = layui.form;
// 设置全局变量
var data = {
    pagenum: 1, // 获取第1页的数据 
    pagesize: 3, // 每页显示3条数据 
};
list();

function list() {
    $.ajax({
        url: 'admin/users',
        data: data,
        success: function (res) {
            if (res.status == 0) {
                var str = '';
                $.each(res.data, function (index, item) {
                    str += `<tr>
                        <td>${item.id}</td>
                        <td>${item.username}</td>
                        <td>${item.nickname}</td>
                        <td>${item.email}</td>
                        <td>
                          <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs edit">
                            <a style="color: #fff" target="iframeArea" href="./edit.html?id=${item.id}">编辑</a>
                          </button>
                          <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                          <button data-id="${item.id}" type="button" class="layui-btn layui-btn-xs layui-btn-normal modify">重置密码</button>
                        </td>
                      </tr>`;
                    // console.log(item);
                })
                $("tbody").html(str);
                page(res.total);
            }
        }
    });
}

// ------------------------------------分页
function page(total) {
    laypage.render({
        elem: 'articlePage', // 初始化分页器  DOM节点的id值；
        count: total, // 数据总数，从服务器获取
        limit: data.pagesize, //  每页显示的条数
        curr: data.pagenum, //在第几页  模块自动根据提交数，渲染出分页器
        limit: data.pagesize,
        limits: [3, 10, 20, 50, 100],
        layout: ['count', 'prev', 'page', 'next', 'skip', 'limit'],
        jump: function (obj, first) {
            if (first == undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                list();
            }
        }
    });
};
// ------------------------------------------------------删除
$('tbody').on('click', '.delete', function () {
    var id = $(this).attr("data-id");
    console.log(id);
    layer.confirm("您确认要删除该文章么？", function (index) {
        $.ajax({
            url: "admin/users/" + id,
            type: 'delete',
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    layer.close(index);
                    // 业务：重新加载数据，回到第一页；
                    data.pagenum = 1;
                    list();
                }
            }
        })
    });
})

$('tbody').on('click', '.modify', function (e) {

    var id = $(e.target).data('id');
    // 弹窗
    var index = layer.open({
            type: 1,
            title: '重置密码',
            content: $('#repwd-form-tpl').html(),
            area: ['400px', '200px']
        }

    )

    // 重置密码
    $('#repwd-form').submit(function (e) {
        e.preventDefault()
        console.log($('#newpwd').val());
        $.ajax({
            type: 'put',
            url: 'admin/users/' + id,
            data: {
                password: $('#newpwd').val()
            },
            success: function (res) {
                layer.msg(res.message)
                layer.close(index)
            }
        })
    })
})