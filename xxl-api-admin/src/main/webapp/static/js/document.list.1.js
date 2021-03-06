$(function() {

	//console.log("projectId : " + $("#projectId").val());
	apiContentShow($("#projectId").val());
	var localDocId = null;
    
	/**
	 * 新增，分组
	 */
	$("#addDoc").click(function(){
		$('#addDocModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var addDocModalValidate = $("#addDocModal .form").validate({
		errorElement : 'span',
		errorClass : 'help-block',
		focusInvalid : true,
		rules : {
			docTitle : {
				required : true,
				minlength: 2,
				maxlength: 32
			}
		},
		messages : {
			docTitle : {
				required :"请输入“分组名称”",
				minlength: "长度不可少于2",
				maxlength: "长度不可多余32"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},
		errorPlacement : function(error, element) {
			element.parent('div').append(error);
		},
		submitHandler : function(form) {
			document.location = base_url + '/gt-document/addDoc' + '?productId=' + $("#addDocModal .form input[name='productId']").val()
										 + '&docTitle=' + $("#addDocModal .form input[name='docTitle']").val();
			/*$.post(base_url + "/gt-document/addDoc",  $("#addDocModal .form").serialize(), function(data, status) {
				if (data.code == "200") {
					$('#addDocModal').modal('hide');
					setTimeout(function () {
						ComAlert.show(1, "新增成功", function(){
							window.location.reload();
						});
					}, 315);
				} else {
					ComAlert.show(2, (data.msg || "新增失败") );
				}
			});*/
		}
	});
	$("#addDocModal").on('hide.bs.modal', function () {
		$("#addDocModal .form")[0].reset();
		addDocModalValidate.resetForm();
		$("#addDocModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote
	});

	/**
	 * 更新，分组
	 */
	$("#updateGroup").click(function(){
		$('#updateGroupModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	var updateGroupModalValidate = $("#updateGroupModal .form").validate({
		errorElement : 'span',
		errorClass : 'help-block',
		focusInvalid : true,
		rules : {
			name : {
				required : true,
				minlength: 2,
				maxlength: 12
			},
			order : {
				required : true,
				digits: true,
				min:1,
				max:1000
			}
		},
		messages : {
			name : {
				required :"请输入“分组名称”",
				minlength: "长度不可少于2",
				maxlength: "长度不可多余12"
			},
			order : {
				required :"请输入“分组排序”",
				digits: "只能输入整数",
				min: "输入值不能小于1",
				max: "输入值不能大于1000"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},
		errorPlacement : function(error, element) {
			element.parent('div').append(error);
		},
		submitHandler : function(form) {
			$.post(base_url + "/group/update",  $("#updateGroupModal .form").serialize(), function(data, status) {
				if (data.code == "200") {
					$('#updateGroupModal').modal('hide');
					setTimeout(function () {
						ComAlert.show(1, "更新成功", function(){
							window.location.reload();
						});
					}, 315);
				} else {
					ComAlert.show(2, (data.msg || "更新失败") );
				}
			});
		}
	});
	$("#updateGroupModal").on('hide.bs.modal', function () {
		$("#updateGroupModal .form")[0].reset();
		updateGroupModalValidate.resetForm();
		$("#updateGroupModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote
	});

	/**
	 * 删除分组
	 */
	$("#deleteGroup").click(function(){
		var id = $(this).attr("_id");
		var productId = $(this).attr("_productId");

		ComConfirm.show("确认删除该接口分组?", function(){
			$.ajax({
				type : 'POST',
				url : base_url + "/group/delete",
				data : {
					"id" : id
				},
				dataType : "json",
				success : function(data){
					if (data.code == 200) {
						ComAlert.show(1, "删除成功", function(){
							window.location.href = base_url + '/group?productId=' + productId;
						});
					} else {
						ComAlert.show(2, (data.msg || "删除失败") );
					}
				},
			});
		});

	});
	
	$("#pubApi").click(function(){
		$('#pubApiModal').modal({backdrop: false, keyboard: false}).modal('show');
	});
	
	var pubApiModalValidate = $("#pubApiModal .form").validate({
		errorElement : 'span',
		errorClass : 'help-block',
		focusInvalid : true,
		rules : {
			apiName : {
				required : true,
				minlength: 2,
				maxlength: 12
			},
			requestUrl : {
				required : true,
				minlength: 2,
				maxlength: 100
			}
		},
		messages : {
			apiName : {
				required :"请输入“接口名称”",
				minlength: "长度不可少于2",
				maxlength: "长度不可多余12"
			},
			requestUrl : {
				required :"请输入“接口URL”",
				minlength: "长度不可少于2",
				maxlength: "长度不可多余100"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},
		errorPlacement : function(error, element) {
			element.parent('div').append(error);
		},
		submitHandler : function(form) {
			$.post(base_url + "/document/pubApiDoc",  $("#pubApiModal .form").serialize(), function(data, status) {
				if (data.code == "200") {
					$('#pubApiModal').modal('hide');
					setTimeout(function () {
						ComAlert.show(1, "发布成功", function(){
							window.location.reload();
						});
					}, 315);
				} else {
					ComAlert.show(2, (data.msg || "发布失败") );
				}
			});
		}
	});
	$("#pubApiModal").on('hide.bs.modal', function () {
		$("#pubApiModal .form")[0].reset();
		addDocModalValidate.resetForm();
		$("#pubApiModal .form .form-group").removeClass("has-error");
		$(".remote_panel").show();	// remote
	});
	
	/**
	 * 关键字搜索
	 */
	$("#searchUrl").bind('input porpertychange',function(){
		var searchUrl = $("#searchUrl").val();
		$('#documentList').find('tbody tr').each(function(){
			var requestUrl = $(this).attr('requestUrl');
			if (searchUrl) {
				if (requestUrl.indexOf(searchUrl) != -1) {
					$(this).show();
				} else {
					$(this).hide();
				}

			} else {
				$(this).show();
			}
		});

	});


	/**
	 * 标记星级，星级较高，排序靠前
	 */
	$(".markStar").click(function(){
		var $this = $(this);
		var id = $($this).attr("_id");
		var _starLevel = $($this).attr("_starLevel");

		// 星标等级：0-普通接口、1-一星接口
		var toStarLevel;
		var toStarHtm;
		if (_starLevel == 1) {
			toStarLevel = 0;
			toStarHtm = '<i class="fa fa-star-o text-yellow"></i>';
		} else {
			toStarLevel = 1;
			toStarHtm = '<i class="fa fa-star text-yellow"></i>';
		}

		$.ajax({
			type : 'POST',
			url : base_url + "/document/markStar",
			data : {
				"id" : id,
				"starLevel":toStarLevel
			},
			dataType : "json",
			success : function(data){
				if (data.code == 200) {
					$($this).attr("_starLevel", toStarLevel);
					$($this).html(toStarHtm);
				} else {
					ComAlert.show(2, (data.msg || "操作失败") );
				}
			},
		});

	});

	$(".deleteDocument").click(function(){
		var id = $(this).attr("_id");
		var name = $(this).attr("_name");

		ComConfirm.show("确认删除该接口["+name+"]，将会删除该接口下测试记录和Mock数据?", function(){
			$.ajax({
				type : 'POST',
				url : base_url + "/document/delete",
				data : {
					"id" : id
				},
				dataType : "json",
				success : function(data){
					if (data.code == 200) {
						ComAlert.show(1, "删除成功", function(){
							window.location.reload();
						});
					} else {
						ComAlert.show(2, (data.msg || "删除失败") );
					}
				},
			});
		});

	});


	/*
	// 新增-添加参数
	$("#addModal .addParam").on('click', function () {
		var html = '<div class="form-group newParam">'+
				'<label for="lastname" class="col-sm-2 control-label">参数&nbsp;<button class="btn btn-danger btn-xs removeParam" type="button">移除</button></label>'+
				'<div class="col-sm-4"><input type="text" class="form-control" name="key" placeholder="请输入参数key[将会强转为String]" maxlength="200" /></div>'+
				'<div class="col-sm-6"><input type="text" class="form-control" name="value" placeholder="请输入参数value[将会强转为String]" maxlength="200" /></div>'+
			'</div>';
		$(this).parents('.form-group').parent().append(html);
		
		$("#addModal .removeParam").on('click', function () {
			$(this).parents('.form-group').remove();
		});
	});
	*/

});

/**
 * ajax请求接口文档
 */
var apiContentShow = function(projectId){
	console.log("projectId:" + projectId);
	$.ajax({
		url : base_url+"/gt-document/getDocIndex",
		type : "post",
		data : {"productId":projectId},
		success : function(resData){
			console.log(resData);
            $('#contentsTree').treeview({
                color: "#428bca",
                //enableLinks: true,
                showBorder: false,
                data: resData,
                //levels: nodeLevel,
                onNodeSelected : function(event, node){
                    if (null == node.nodes) {  //叶子节点
                        //删除之前的div缓存
                        $('#apidoc-md-view').empty();
                        //currentId = node.id;
                        console.log(node);
                        console.log(node.id);
                        apiView(node.docId);
                    }
                }
            });
		}
	});
}

var apiView = function(id){
	console.log("id is : " + id);
	localDocId = id;
    $.get( base_url + "/gt-document/getDocMd",
        {
            "docId" : id
        },
        function(markdown) {
            $('#apidoc-name h3 font').text(markdown.gtDoc.docTitle);
			editormdView = editormd.markdownToHTML("apidoc-md-view", {
				markdown        : markdown.gtDoc.docContent ,//+ "\r\n" + $("#append-test").text(),
				htmlDecode      : "style,script,iframe",  // you can filter tags decode
				tocm            : true,    // Using [TOCM]
				emoji           : true,
				taskList        : true,
				tex             : true,  // 默认不解析
				flowChart       : true,  // 默认不解析
				sequenceDiagram : true,  // 默认不解析
			});
		});
	}

$("#editDoc").click(function(){
	console.log("editDoc");
	document.location = base_url + '/gt-document/addDoc' + '?docId=' + localDocId;
});
