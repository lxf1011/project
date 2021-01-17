layer = layui.layer;
form = layui.form;

form.verify({
    same: function (value) {
        var psw = $('.layui-form input[name=password]').val();
        if (value !== psw) {
            return '两次输入的密码不一样'
        }
    }
})

$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        url: '/admin/users',
        type: 'post',
        data: params,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = 'user.html';
                var dd = window.parent.document.querySelector('#userlist');
                $(dd).addClass('layui-this').next().removeClass('layui-this');
            }
        }
    })
});