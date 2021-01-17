$(function () {
    var form = layui.form;

    // 获取
    function getLinkList() {
        $.ajax({
            type: 'get',
            url: 'admin/links',
            success: function (res) {
                var tb = template('table-tpl', res)
                $('.layui-table tbody').html(tb)
            }
        })
    }

    getLinkList();

    // 删除
    $('.layui-table tbody').on('click', 'delete', function (e) {
        var id = $(e.target).data('id');


        layer.confirm('是否删除', function (index) {
            $.ajax({
                type: 'delete',
                url: 'admin/links/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        layer.close(index)
                        getLinkList();
                    }
                }
            })
        })
    });


    // 添加
    $('#add-link').click(function () {
        // 弹窗
        var index = layer.open({
            type: 1,
            title: '添加友情链接',
            content: $('#add-form-tpl').html(),
            area: ['400px', '250px']

        })

        $('#urlIcon').click(function () {
            $('#linkFile').click()
        });
        $('#linkFile').change(function (e) {
            const url = URL.createObjectURL(e.target.files[0])
            $('#preIcon').attr('src', url)
        });

        $('#add-form').submit(function (e) {
            e.preventDefault();
            var fd = new FormData(this);

            $.ajax({
                type: 'post',
                url: 'admin/links',
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    if (res.status == 0) {
                        layer.close(index)
                        getLinkList()
                    }
                }
            })
        })



    })

    // 编辑友情链接接口
    $('.layui-table').on('click', '.edit', function (e) {
        var op = layer.open({
            type: 1,
            title: '编辑友情链接',
            content: $('#edit-form-tpl').html(),
            area: ['500px', '400px']
        })
        var id = $(e.target).data('id');
        $.ajax({
            type: 'get',
            url: 'admin/links/' + id,
            success: function (res) {
                form.val('editForm', res.data);
                $('#preIcon').attr('src', 'http://localhost:8888/uploads/' + res.data.linkicon)
            }
        })
        $('#urlIcon').click(function () {
            $('#linkFile').click();
        })
        let file = null
        $('#linkFile').change(function (e) {
            const objectURL = URL.createObjectURL(e.target.files[0])
            file = e.target.files[0]
            $('#preIcon').attr('src', objectURL)
        })

        $('#edit-form').submit(function (e) {
            e.preventDefault();
            var fd = new FormData(this)
            if (file) {
                fd.append('linkicon', file)
            }
            $.ajax({
                type: 'put',
                url: 'admin/links/' + id,
                data: fd,
                processData: false,
                contentType: false,
                success: function (res) {
                    layer.msg(res.message);
                    layer.close(op);
                    getLinkList();
                }
            })
        })
    })
});