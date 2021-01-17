$(function () {
    var form = layui.form;

    // 获取ID
    var id = new URLSearchParams(location.search).get('id');

    function EditUser() {
        $.ajax({
            type: 'get',
            url: 'admin/users/' + id,
            success: function (res) {
                if (res.status === 0) {
                    form.val('editForm', res.data)
                } else {
                    layer.msg(res.message)
                }
            }
        })
    }
    EditUser();


    $('.layui-form').submit(function (e) {
        e.preventDefault()
        var bd = $(this).serialize()

        $.ajax({
            type: 'put',
            url: 'admin/users',
            data: bd,
            success: function (res) {
                layer.msg(res.message)
            }

        })



    })





})