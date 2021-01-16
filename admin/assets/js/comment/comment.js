// 获取评论列表接口
function getCommentList() {
    $.ajax({
        type: 'get',
        url: 'admin/comments',
        success: function (res) {
            var tags = template('table-tpl', res);
            $('.layui-table tbody').html(tags);
        }
    })
}
getCommentList();

// 删除评论接口
$('.layui-table').on('click', '.delete', function (e) {
    var id = $(e.target).data('id');
    layer.confirm('您确定要删除吗？', function (index) {
        $.ajax({
            type: 'delete',
            url: 'admin/comments/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    getCommentList();
                }
            }
        })
        layer.close(index);
    })
})