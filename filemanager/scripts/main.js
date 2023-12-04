$(document).ready(function() {

	loadFolders("", "");
	
	$("#frmOpenPath").submit(function() {
		
		event.preventDefault();
			
		loadFolders( $("#inpOpenPath").val(), "input" );
				
	});
			
	$("#icnUpload").click(function() {
	
		var defaultText = "Click to add files";
			
		alertBox("Upload files", '<label id="error"></label> <div id="portalsHolder"></div> <label id="portalsAdder" class="lblPortals" style="background-color: purple">Add</label>', 2, "Upload", 'compileFiles("' + defaultText + '")', "Cancel", '$("#alertHolder").remove()');
		
		var index = 0;
		
		addPortal();
		
		function addPortal() {
		
			$("#portalsHolder").append('<div class="lblPortalsHolder"> <button class="btnRemove" onclick="$(this).parent().remove()">x</button> <input class="inpPortals" style="display: none" type="file" id="portal' + index + '"> <label class="lblPortals" for="portal' + index + '">' + defaultText + '</label> <br> </div>');
		
			$("[class=inpPortals]").off("change");
		
			$("[class=inpPortals]").change(function() {
				
				var filenameArray = $(this).val().split("\\");
				
				var filename = filenameArray[filenameArray.length - 1];
		
				$("#" + $(this).attr("id") + " + label").html(filename);
			
				allowAddOrNot();

			});
			
			allowAddOrNot();

			index++;
			
		}
		
		function allowAddOrNot() {
			
			$("#portalsAdder").off("click");
		
			for(var i = 0; i < $("[class=inpPortals]").length; i++) {
			
				if($(".lblPortals").eq(i).html() == "" || $(".lblPortals").eq(i).html() == defaultText) {
				
					$("#portalsAdder").off("click");
		
					$("#portalsAdder").css("backgroundColor", "blue");
						
				}
					
				else {
				
					$("#portalsAdder").off("click");
		
					$("#portalsAdder").click(function() {
		
						addPortal();
		
					}).css("backgroundColor", "purple");
		
				}
				
			}
		
		}
		
	});
			
	$("#icnCopy").click(function() {
			
		$("#copiedItemUrl").val($("#selectedItemUrl").val());
		
		$("#icnPaste").css("display", "inline-block");
		
		$("#copyOrCut").val("copy");
				
		$("#copiedIcons").css("display", "none");
				
	});
			
	$("#icnCut").click(function() {
			
		$("#copiedItemUrl").val($("#selectedItemUrl").val());
		
		$("#icnPaste").css("display", "inline-block");
		
		$("#copyOrCut").val("cut");
				
		$("#copiedIcons").css("display", "none");
				
	});
			
	$("#icnPaste").click(function() {
			
		$("#icnPaste").css("display", "none");
		
		performAction("paste", $("#copiedItemUrl").val(), $("#inpFullPath").val());
				
		$("#copiedItemUrl").val("");
			
	});
			
	$("#icnOpen").click(function() {
			
		var filePathArray = $("#selectedItemUrl").val().split("/");
				
		loadFolders(String(filePathArray.splice(filePathArray.length - 1, 1)));
				
		$("#copiedIcons").css("display", "none");
				
		$("#selectedItemUrl").val("");
			
	});
			
	$("#icnMkdir").click(function() {
			
		alertBox("New folder", '<input id="inpDirName" placeholder="Enter directory name">', 2, "Make folder", 'performAction("makeFolder", $("#inpFullPath").val() + $("#inpDirName").val()); $("#alertHolder").remove()', "Cancel", '$("#alertHolder").remove()');
			
	});
			
	$("#icnNewFile").click(function() {
			
		alertBox("New file", '<input id="inpFilename" placeholder="filename.extension">', 2, "Create file", 'performAction("createFile", $("#inpFullPath").val() + $("#inpFilename").val()); $("#alertHolder").remove()', "Cancel", '$("#alertHolder").remove()');
			
	});
			
	$("#icnRename").click(function() {
			
		var fullPathArray = $("#selectedItemUrl").val().split("/");
				
		var originalName = fullPathArray[fullPathArray.length - 1];
				
		fullPathArray.splice(fullPathArray.length - 1, 1);
		
		var path = fullPathArray.join("/");
		
		var originalFullPath = path + '/' + originalName;
		
		alertBox("Rename item", '<input id="newItemName" placeholder="Enter new name" value="' + originalName + '">', 2, "Rename", 'performAction("rename", "' + originalFullPath + '", "' + path + "/" + '" + $("#newItemName").val()); $("#alertHolder").remove()', "Cancel", '$("#alertHolder").remove()');
		
	});
	
	$("#icnDelete").click(function() {
			
		alertBox("Delete item?", "Do you really want to permanently delete this item?", 2, "Delete", '$("#alertHolder").remove(); performAction("delete", $("#selectedItemUrl").val())', "Cancel", '$("#alertHolder").remove()');
			
	});
	
	$("#icnDownload").click(function() {
			
		alertBox("Download item?", "", 2, '<a href="' + $("#selectedItemUrl").val() + '" style="color: white" download>Download</a>', '$("#alertHolder").remove(); ', "Cancel", '$("#alertHolder").remove()');
			
	});
	
});

		function compileFiles(defaultText) {
			
			var fd = new FormData();
			
			var fileChosen;
			
			for(var i = 0; i < $("[class=inpPortals]").length; i++) {
		
				if($(".lblPortals").eq(i).html() !== "" && $(".lblPortals").eq(i).html() !== defaultText) {
					
					fileChosen = true;
				
					fd.append('file' + i, $("[class=inpPortals]").eq(i)[0].files[0]);		
								
				}
					
			}
			
			if(fileChosen) {
			
				$("#alertHolder").remove(); 
				
			fd.append("request", "uploadFiles");
			
			fd.append("path", $("#inpFullPath").val());
			
			$.ajax({
				type: "POST",
				url: "server.php",
			//	dataType: "JSON",
				data: fd,
				contentType: false,
				processData: false,
				success: function(response) {
				
					alertBox("Upload successful", "", 1, "Ok", '$("#alertHolder").remove()');
					
					loadFolders();
				
				},
				error: function(response) {
					
					alertBox("Upload error", "There was an error uploading your files. Please try again", 1, "Ok", '$("#alertHolder").remove()');
				
					alert( JSON.stringify(response) );
					
					removeLoader();
				
				}
			});
				
			}
			
			else {
			
				$("#alertBox #error").html("You have to upload at least one file").css("display", "block");
			
			}
			
		}
			
	function loadFolders(path, invocation) {
	
		displayLoader();
				
		var url = "server.php";
		
		if(invocation == "input" || invocation == "command") {
		
			var previousPath = "";
		
		}
		
		else {
		
			if(path == "..") {
				
				var fullPathArray = $("#inpFullPath").val().split("/");
				
				fullPathArray.splice(fullPathArray.length - 2, 2);
				
				var path = "";
				
				var previousPath = fullPathArray.join("/");
				
			}
			
			else {
		
				var previousPath = $("#inpFullPath").val();
				
			}
		
		}
		
		$.ajax({
			type: "POST",
			url: url,
			crossDomain: true,
			dataType: "JSON",
			data: {
				request: "File manager",
				previousPath: previousPath,
				path: path
			},
			success: function(response) {
				
				if(response[0].type == "folder") {
			
					$("#fileManager #main").html("");
	
					for(var i = 0; i < response.length; i++) {
					
						var filename = response[i].filename;
			
						var type = response[i].type;
				
						var item = folderOrFile(filename, type, fileType(response[i].format));
			
						$("#fileManager #main").append(item);
					
					}
				
					$("#inpFullPath").val(response[0].fullPath);
				
					$("#inpOpenPath").val($("#inpFullPath").val());
					
					var allSlashes = new RegExp("/", "g");
					
					$("#topPath").html($("#inpFullPath").val().replace(allSlashes, " > "));
				
					setEvent();
				
				}
				
				else {
					
					openFile(fileType(response[0].format), path, response[0].format, response[0].fullPath);
					
				}

			},
			error: function(response) {
			
				removeLoader();
				
				alert( JSON.stringify(response) );
				
			}
		});
		
	}
	
	function fileType(format) {
	
		var imageFormats = ["jpg", "jpeg", "png", "gif"];
	
		var textFormats = ["txt", "jpeg", "html", "css", "js", "php", "sql", "asp", "java", "xml", "cs", "xaml", "", "error_log"];
	
		if(imageFormats.indexOf(format) !== -1) {
		
			return "image";
					
		}
				
		else if(textFormats.indexOf(format) !== -1) {
					
			return "text";
						
		}
					
		else {
		
			return "unknown";
						
		}
	
	}
	
	function setEvent() {
	
		for(var i = 0; i < $("#fileManager #main .item").length; i++) {
		
			var currentItem = $("#fileManager #main .item").eq(i);
			
			$(currentItem).dblclick(function() {
			
				$("#selectedItemUrl").val("");
			
				loadFolders( $(this).children(".filename").attr("id"), "");
				
				$("#copiedIcons").css("display", "none");
				
			});
			
			$(currentItem).click(function() {
				
				$("#fileManager #main .item").css("backgroundColor", "#FFF0F0");
				
				$(this).css("backgroundColor", "indigo");
				
				$("#selectedItemUrl").val($("#inpOpenPath").val() + $(this).children(".filename").attr("id"));
				
				$("#copiedIcons").css("display", "inline-block");
				
			});
			
		}
	
	}
	
	function openFile(fileType, filename, format, filePath) {
		
		if(fileType == "image") {
	
			$("#fileManager #main").html('<div id="imageViewer" class="fileOpener"> <div id="header"> <label id="filename">' + filename + '</label> <label id="fileDescription">' + format.toUpperCase() + " " + fileType + '</label> </div> <div id="content"> <img src="' + $("#inpFullPath").val() + filename + '" id="image"></img> </div> </div>');
			
		}
	
		else if(fileType == "text") {
	
			$("#fileManager #main").html('<div id="textEditor" class="fileOpener"> <div id="header"> <label id="filename">' + filename + '</label> <label id="fileDescription">' + format.toUpperCase() + " " + fileType + '</label> </div> <div id="content"> <textarea id="textarea"></textarea> </div> </div>');
			
			$("#content #textarea").val("Loading . . .");
			
			performAction("getFileContent", filePath, filename);
			
			$("#icnBack").css("display", "inline-block").click(function() {
			
				$("#icnBack").css("display", "none").off("click");
				
				$("#icnSave").css("display", "none").off("click");
				
				loadFolders($("#inpFullPath").val(), "command");
				
			});
			
			$("#icnSave").css("display", "inline-block").click(function() {
				
				performAction("saveFileContent", filePath, filename);
			
			});

		}
		
		else {}
		
		removeLoader();
					
	}
	
	function folderOrFile(item, type, fileType) {
			
		var filename = item;
			
		if(type == "folder") {
		
			if(item == "..") {
			
				filename = "Upper folder";
				
				var svg = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: blue; border: 1px solid blue; border-radius: 50%;"><path d="M8 10h-5l9-10 9 10h-5v10h-8v-10zm11"/></svg>';
				
			}
					
			else {
			
				var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: yellow"><path d="M24 22h-24v-14h7.262c1.559 0 2.411-.708 5.07-3h11.668v17zm-16.738-16c.64 0 1.11-.271 2.389-1.34l-2.651-2.66h-7v4h7.262z"/></svg>';
				
			}
		
		}
			
		else if(type == "file") {
			
			if(fileType == "image") {
			
				var svg = 'i';
				
			}
		
			else if(fileType == "text") {
			
				var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: lightblue"><path d="M13.744 8s1.522-8-3.335-8h-8.409v24h20v-13c0-3.419-5.247-3.745-8.256-3zm.256 11h-8v-1h8v1zm4-3h-12v-1h12v1zm0-3h-12v-1h12v1zm-3.432-12.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>';
				
			}
		
			else {
			
				var svg = '?';
				
			}
			
		}
			
		else {
			
			var svg = '<svg></svg>';
		
		}
			
		return( '<div class="item">' + svg + '<label class="filename" id="' + item + '">' + filename + '</label>' + '</div>' );
		
	}
		