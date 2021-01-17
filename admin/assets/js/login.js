var layer = layui.layer;
$('.login-form form').on('submit', function (e) {
    e.preventDefault();
    var params = $(this).serialize();
    $.ajax({
        url: 'api/login',
        type: 'post',
        data: params,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                location.href = 'index.html';
                localStorage.setItem('mytoken', res.token);
            }
            // console.log(res);
        }
    })
})