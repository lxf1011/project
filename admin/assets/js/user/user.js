$('.layui-table tbody').on('click', '.layui-btn-normal', function (e) {

    var id = $(e.taget).data('id');
    // 弹窗
    var index = layer.open({
            type: 1,
            title: '重置密码'，
            content: $('#repwd-form-tpl').html(),
            area: ['400px', '200px']
        }

    )

    // 重置密码
    $('#rewd-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'put',
            url: 'admin/users/' + id,
            data: {
                password: $('#repwd-form input[name=password]').val()
            },
            success: function (res) {
                layer.msg(res.message)
                layer.close(index)
            }
        })
    })


})