$(function(){

			//init
			fnInit();

			//add
			$("#add").on('click',function(){
				var currentList = fnGetData('redirectList');
				var path_id = $.md5($("#old").val());
	            var old_path = $("#old").val();
	            var new_path = $("#new").val();
	            var type = $("#type_301").val();
	            var pattern = $("#pattern").val();
	            var updateList = [];
	            var addnew = {
	            	"path_id": path_id,
	                "old_path": old_path,
	                "new_path": new_path,
	                "type": type,
	                "pattern": pattern
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

			
			$(document).on('change',".ruleSelect", function(){
				var toggle_group_ID = '#'+$(this).attr('toggle-group');
				var toggle_val = $(this).val();
				switch (toggle_val){
					case '2':
						$('.patternRow',toggle_group_ID).show(200);
					break;
					default:
						$('.patternRow',toggle_group_ID).hide(200);
					break;
				}
			})
			$(".ruleSelect").change();

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
	            var type = $("#wrap_"+path_id+" .type_301").val();
	            var pattern = $("#wrap_"+path_id+" .pattern").val();
	            var updateList = [];
	            var update = {
	            	"path_id": path_id,
	                "old_path": old_path,
	                "new_path": new_path,
	                "type": type,
	                "pattern": pattern
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
			fnUpdateSortUI();
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
	            			'<div class="move_btn"><span class="icon-move"></span></div>'+
	            			'<div class="row">'+
	            				'<label for="">Old</label>'+
	            				'<input class="old_path box" type="text" value="'+currentList[i]['old_path']+'" placeholder="Old path">'+
	            			'</div>'+
	            			'<span class="icon-arrow-right"></span>'+
	            			'<div class="row">'+
	            				'<label for="">New</label>'+
	            				'<input class="new_path box" type="text" value="'+currentList[i]['new_path']+'" placeholder="New path">'+
	            			'</div>'+
	            			'<div class="row patternRow">'+
								'<label for="">Pattern</label>'+
								'<input type="text" class="addField box pattern" value="'+currentList[i]['pattern']+'" placeholder="Pattern">'+
							'</div>'+
	            			'<div class="row">'+
	            				fnType301Option(currentList[i]['type'],'wrap_'+currentList[i]['path_id'])+
	            			'</div>'+
	            			'<div class="func">'+
	            				'<button class="removeBtn box" value="'+currentList[i]['path_id']+'" toggle-data="wrap_'+currentList[i]['path_id']+'"><span class="icon-minus"></span></button>'+
	            				'<button class="editBtn box" value="'+currentList[i]['path_id']+'"><span class="icon-pen"></span></button>'+
	            			'</div>'+
	            		'</div>';
	        }
	        $("#list").html(list);
		}

		//301 type selection
		function fnType301Option(option,id){
			var options = [
				'Redirect',
				'RedirectMatch',
				'Rewrite Multi-url with 1 pattern'
			];

			var options_output = '';

			for (var i =0 ;i< options.length;i++){
				var active = (option == i)? 'selected' : '';
				options_output += '<option value="'+i+'" '+active+'>'+options[i]+'</option>';
			}

	        return '<select class="type_301 box select ruleSelect" toggle-group="'+id+'">'+options_output+'</select>';
		}

		//update 404 pannel
		function fnUpdate404Pannel(){
			var currentList = fnGetData('404List');
			if (currentList != null) {
				for (var i = 0; i < currentList.length; i++) {
					$("#404path").val(currentList[i]['path_url']);
			    }
			}
		}

		//update output
		function fnUpdateOutPutPannel(){
			var list = "";
			var currentList = '';

			//404
			currentList = fnGetData('404List');
			if (currentList != null) {
				if (currentList.length > 0) {
					list += (currentList[0]['path_url'] != '') ? "ErrorDocument 404 "+currentList[0]['path_url']+"\n" : "";
				}
			}

			//301
			currentList = fnGetData('redirectList');
			if (currentList.length > 0) {
				list += "rewriteengine on\n";
				//list += "RewriteCond %{REQUEST_FILENAME} !-f\n"+
				//		"RewriteCond %{REQUEST_FILENAME} !-d\n"+
				//		"RewriteCond %{REQUEST_URI} !^.*(.css|.js|.gif|.png|.jpg|.jpeg)$\n";

				for (var i = 0; i < currentList.length; i++) {
					switch(currentList[i]['type']){
						case '1':
							list += 'RedirectMatch 301 '+currentList[i]['old_path']+' '+currentList[i]['new_path']+'\n';
						break;
						case '2':
							list += 'RewriteCond %{REQUEST_URI} ^.*('+currentList[i]['old_path']+')$\n'+
									'RewriteRule ^.*'+currentList[i]['pattern']+'.* '+currentList[i]['new_path']+' [R=301,NC,L]\n';
						break;
						default:
							list += 'Redirect 301 '+currentList[i]['old_path']+' '+currentList[i]['new_path']+'\n';
						break;
					}
		        }
		    }

	        $("#output").val(list);
		}

		//update jquery ui sortable
        function fnUpdateSortUI(){
            var current, update;
            $( ".list-wrapper" ).sortable({
                connectWith: ".item",
                handle: ".move_btn",
                placeholder: "portlet-placeholder ui-corner-all",
                axis: "y",
                start: function(e, ui) {
                    current = ui.item.index();
                },
                stop: function(e, ui) {
                    update = ui.item.index();
                    fnUpdateSort(current,update);
                }
            });
        }

        //update sortable data
        function fnUpdateSort(current,update){
            var currentList = fnGetData('redirectList');
            var currentItem = currentList[current];
            var updateItem = currentList[update];

            currentList.splice(update, 1, currentItem);
            currentList.splice(current, 1, updateItem);

            sessionStorage.setItem('redirectList', JSON.stringify(currentList));

            fnUpdate();
        }