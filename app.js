$(function(){

			//init
			fnInit();

			//add
			$("#add").on('click',function(){
				var currentList = fnGetData('redirectList');
				var path_id = $.md5($("#old").val());
	            var old_path = $("#old").val();
	            var new_path = $("#new").val();
	            var updateList = [];
	            var addnew = {
	            	"path_id": path_id,
	                "old_path": old_path,
	                "new_path": new_path
	            };
	            for (var i = 0; i < currentList.length; i++) {
	                if (currentList[i]['path_id'] != path_id) {
	                    updateList.push(currentList[i]);
	                }
	            }
	            updateList.push(addnew);
	            sessionStorage.setItem('redirectList', JSON.stringify(updateList));
	            $(".addField").val('');
	            fnUpdate();
			})

			//remove
			$(document).on('click', ".removeBtn",function(){
				var currentList = fnGetData('redirectList');
	            var path_id = $(this).val();
	            var toggledata = "#"+$(this).attr("toggle-data");
	            var updateList = [];
	            for (var i = 0; i < currentList.length; i++) {
	                if (currentList[i]['path_id'] != path_id) {
	                    updateList.push(currentList[i]);
	                }
	            }
	            $(toggledata).remove();
	            sessionStorage.setItem('redirectList', JSON.stringify(updateList));
	            fnUpdateOutPutPannel();
			})

			//edit
			$(document).on('click', ".editBtn",function(){
				var currentList = fnGetData('redirectList');
	            var path_id = $(this).val();
	            var old_path = $("#wrap_"+path_id+" .old_path").val();
	            var new_path = $("#wrap_"+path_id+" .new_path").val();
	            var updateList = [];
	            var update = {
	            	"path_id": path_id,
	                "old_path": old_path,
	                "new_path": new_path
	            };
	            for (var i = 0; i < currentList.length; i++) {
	                if (currentList[i]['path_id'] == path_id) {
	                    updateList.push(update);
	                }else{
	                	updateList.push(currentList[i]);
	                }
	            }
	            sessionStorage.setItem('redirectList', JSON.stringify(updateList));
	            fnUpdateOutPutPannel();
			})

			//add404
			$("#add404").on('click',function(){
				var path_id = $.md5('404');
				var path_url = $("#404path").val();
				var updateList = [];
	            var update = {
	            	"path_id": path_id,
	                "path_url": path_url
	            };
	            updateList.push(update);
	            sessionStorage.setItem('404List', JSON.stringify(updateList));
	            fnUpdate404Pannel();
	            fnUpdateOutPutPannel();
			})

			//switch
			$(".func-btn").on('click',function(){
				var form = $(this).attr("href")+"_form";
				$(".func-form").fadeOut(200);
				$(form).show(200);
			})

			//open
			$("#open_btn").on('click',function(){
				$("#open_form .data").click();
			})
			$("#open_form .data").on('change',function(e){
			    e.preventDefault();
			    var fdata = new FormData(document.getElementById('open_form'));
				$.ajax({
					url: 'generate/open.php',
					method: 'post',
					cache: false,
		            enctype: 'multipart/form-data',
		            processData: false, 
		            contentType: false, 
					data: fdata,
		            success: function (response) {
		            	sessionStorage.setItem('redirectList', response);
		            	data = $.parseJSON(response);
		            	sessionStorage.setItem('404List', decodeURI(data['404List']));
		            	sessionStorage.setItem('redirectList', decodeURI(data['redirectList']));
		            	fnUpdate();
				    }
				})	
			})

			//save
			$("#save_btn").on('click',function(e){
				var data1 = encodeURI(sessionStorage.getItem('404List'));
				var data2 = encodeURI(sessionStorage.getItem('redirectList'));
				var save = {
	            	"404List": data1,
	                "redirectList": data2
	            };
			    e.preventDefault();
			    form = $('#save_form');
			    $('.data',form).val(encodeURI(JSON.stringify(save)));
			    form.submit();
			})

		})
	
		//init
		function fnInit(){
			fnUpdate();
		}

		//get data from apps
		function fnGetData(name){
			return currentList = (sessionStorage.getItem(name) == undefined) ? [] : $.parseJSON(sessionStorage.getItem(name));
		}

		//updte all
		function fnUpdate(){
			fnUpdateListPannel();
			fnUpdateOutPutPannel();
			fnUpdate404Pannel();
		}

		//update 301 pannel
		function fnUpdateListPannel(){
			var currentList = fnGetData('redirectList');
			var list = "";
			for (var i = 0; i < currentList.length; i++) {
	            list += '<div id="wrap_'+currentList[i]['path_id']+'" class="redir-wrap box">'+
	            			'<div class="row">'+
	            				'<label for="">Old</label>'+
	            				'<input class="old_path box" type="text" value="'+currentList[i]['old_path']+'">'+
	            			'</div>'+
	            			'<div class="row">'+
	            				'<label for="">New</label>'+
	            				'<input class="new_path box" type="text" value="'+currentList[i]['new_path']+'">'+
	            			'</div>'+
	            			'<div class="func">'+
	            				'<button class="removeBtn box" value="'+currentList[i]['path_id']+'" toggle-data="wrap_'+currentList[i]['path_id']+'">Del</button>'+
	            				'<button class="editBtn box" value="'+currentList[i]['path_id']+'">Edit</button>'+
	            			'</div>'+
	            		'</div>';
	        }
	        $("#list").html(list);
		}

		//update 404 pannel
		function fnUpdate404Pannel(){
			var currentList = fnGetData('404List');
			for (var i = 0; i < currentList.length; i++) {
				$("#404path").val(currentList[i]['path_url']);
	        }
		}

		//update output
		function fnUpdateOutPutPannel(){
			var list = "";
			var currentList = '';

			//404
			currentList = fnGetData('404List');
			if (currentList.length > 0) {
				list += (currentList[0]['path_url'] != '') ? "ErrorDocument 404 "+currentList[0]['path_url']+"\n" : "";
			}

			//301
			currentList = fnGetData('redirectList');
			if (currentList.length > 0) {
				list += "rewriteengine on\n";
				list += "RewriteCond %{REQUEST_FILENAME} !-f\n"+
						"RewriteCond %{REQUEST_FILENAME} !-d\n"+
						"RewriteCond %{REQUEST_URI} !^.*(.css|.js|.gif|.png|.jpg|.jpeg)$\n";

				for (var i = 0; i < currentList.length; i++) {
		            list += 'Redirect 301 '+currentList[i]['old_path']+' '+currentList[i]['new_path']+'\n';
		        }
		    }

	        $("#output").val(list);
		}