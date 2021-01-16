function getPicList() {
    $.ajax({
        type: 'get',
        url: 'admin/swipers',
        success: function (res) {
            var tags = template('table-tpl', res);
            $('.layui-table tbody').html(tags);
        }
    })
}
getPicList();


// 切换状态接口
$('.layui-table').on('click', '.layui-badge', function (e) {
    var id = $(this).attr('data-id');
    var status = $(this).attr('data-status');
    var data = {
        status: status
    }
    $.ajax({
        type: 'put',
        url: 'admin/swipers/' + id,
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                getPicList();
            }
        }
    })
})


// 删除轮播图接口
$('.layui-table').on('click', '.delete', function (e) {
    var id = $(e.target).data('id');
    layer.confirm('您确定要删除吗？', function (index) {
        $.ajax({
            type: 'delete',
            url: 'admin/swipers/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    getPicList();
                }
            }
        })
        layer.close(index);
    })

})


// 上传轮播图接口
$('#uploadSwiper').click(function () {
    $('#myfile').click();
    $('body').on('change', '#myfile', function (e) {
        var params = e.target.files;
        var fd = new FormData();
        $.each(params, function (index, item) {
            fd.append('swipers', item);
        })
        $.ajax({
            type: 'post',
            url: 'admin/swipers',
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                layer.msg(res.message);
                getPicList();
            }
        })
    });
})