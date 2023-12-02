	function performAction(action, path1, path2) {
		
		displayLoader();
				
		var url = "server.php";
		
		var path1Array = path1.split("/");
		
		var filename = path1Array[path1Array.length - 1];

			$.ajax({
				type: "POST",
				url: url,
				crossDomain: true,
				dataType: "JSON",
				data: {
					request: action,
					filename: filename,
					path1: path1,
					path2: path2,
					content: $(".fileOpener #textarea").val(),
					copyOrCut: $("#copyOrCut").val(),
					overwriteFile: $("#overwriteFile").val()
				},
				success: function(response) {
					
					removeLoader();
				
					if(response[0].request == "paste") {
					
						if(response[0].copyOrCut == "copy") {
						
							if(response[0].status == "success") {
					
								alertBox("Success copying file", "The file, \"" + response[0].filename + "\" has been copied successfully", 1, "Ok", '$("#alertHolder").remove()');
						
								loadFolders($("#inpFullPath").val(), "command");
				
							}
						
							else if(response[0].status == "error") {
						
								if(response[0].cause == "fileExists") {
					
									alertBox("File exists", "The file, \"" + response[0].filename + "\" already exists in this folder. Overwrite?", 2, "Overwrite", '$("#alertHolder").remove(); $("#overwriteFile").val("true"), performAction("paste", "' + response[0].path1 + '", "' + response[0].path2 + '"); $("#overwriteFile").val("")', "Cancel", '$("#alertHolder").remove()');
						
									loadFolders($("#inpFullPath").val(), "command");
							
								}
				
								else {
						
									alertBox("Error copying file", "There was an error copying this file. Please try again", 1, "Ok", '$("#alertHolder").remove()');
						
								}
						
							}
						
							else {
						
								alertBox("Error copying file", "There was an error copying this file. Please try again", 1, "Ok", '$("#alertHolder").remove()');
						
							}
						
						}
						
						else if(response[0].copyOrCut == "cut") {
						
							if(response[0].status == "success") {
					
								alertBox("Success moving file", "The file, \"" + response[0].filename + "\" has been moved successfully", 1, "Ok", '$("#alertHolder").remove()');
						
								loadFolders($("#inpFullPath").val(), "command");
				
							}
						
							else if(response[0].status == "error") {
						
								if(response[0].cause == "fileExists") {
					
									alertBox("File exists", "The file \"" + response[0].filename + "\" already exists in this folder. Overwrite?", 2, "Overwrite", '$("#alertHolder").remove(); $("#overwriteFile").val("true"); performAction("paste", "' + response[0].path1 + '", "' + response[0].path2 + '");  $("#overwriteFile").val("")', "Cancel", '$("#alertHolder").remove()');
						
									loadFolders($("#inpFullPath").val(), "command");
							
								}
				
								else {
						
									alertBox("Error copying file", "There was an error moving this file. Please try again", 1, "Ok", '$("#alertHolder").remove()');
						
								}
						
							}
						
							else {
						
								alertBox("Error copying file", "There was an error moving this file. Please try again", 1, "Ok", '$("#alertHolder").remove()');
						
							}
						
						}
						
						else {}
						
					}
					
					else if(response[0].request == "delete") {
					
						if(response[0].status == "success") {
					
							alertBox("Success deleting " + response[0].fileOrFolder, "The " + response[0].fileOrFolder + ", \"" + response[0].filename + "\" has been deleted successfully", 1, "Ok", '$("#alertHolder").remove()');
						
							loadFolders($("#inpFullPath").val(), "command");
				
						}
						
						else if(response[0].status == "error") {
						
							alertBox("Error deleting " + response[0].fileOrFolder, "There was an error deleting this " + response[0].fileOrFolder + ", \"" + response[0].filename + "\". Please ensure folder is empty and try again", 1, "Ok", '$("#alertHolder").remove()');
							
						}
						
						else {}
					
					}
					
					else if(response[0].request == "makeFolder") {
					
						if(response[0].status == "success") {
					
							alertBox("Success making folder", "Folder, \"" + response[0].filename + "\" has been made successfully", 2, "Open", '$("#alertHolder").remove(); loadFolders("' + response[0].path1 + '", "command")', "Ok", '$("#alertHolder").remove()');
						
							loadFolders($("#inpFullPath").val(), "command");
				
						}
						
						else if(response[0].status == "error") {
							
							if(response[0].cause == "folderExists") {
							
								alertBox("Folder exists", "This folder, " + "\"" + response[0].filename + "\" already exists in this directory", 1, "Ok", '$("#alertHolder").remove()');
								
							}
							
							else {
						
								alertBox("Error making folder", "There was an error making  this folder, " + "\"" + response[0].filename + "\". Please try again", 1, "Ok", '$("#alertHolder").remove()');
								
							}
							
						}
						
						else {}
					
					}
					
					else if(response[0].request == "getFileContent") {
					
						if(response[0].status == "success") {
					
							$("#content #textarea").val(response[0].content);
				
						}
						
						else {
							
							alertBox("Error loading file", "There was an error loading  this file, " + "\"" + response[0].filename + "\". Please try again", 1, "Ok", '$("#alertHolder").remove(); $(".fileOpener").remove(); loadFolders($("#inpFullPath").val(), "command")');
								
						}
						
					}
					
					else if(response[0].request == "saveFileContent") {
					
						if(response[0].status == "success") {
					
							alertBox("Save successful", "File " + "\"" + response[0].filename + "\" has been saved successfully", 1, "Ok", '$("#alertHolder").remove()');
				
						}
						
						else {
							
							alertBox("Error saving file", "There was an error saving  this file, " + "\"" + response[0].filename + "\". Please try again", 1, "Ok", '$("#alertHolder").remove()');
								
						}
						
					}
					
					else if(response[0].request == "rename") {
					
						if(response[0].status == "success") {
					
							alertBox("Item renamed", "Item " + "\"" + response[0].filename + "\" has been renamed successfully", 1, "Ok", '$("#alertHolder").remove()');
				
							loadFolders($("#inpFullPath").val(), "command");
				
						}
						
						else {
							
							alertBox("Error renaming item", "There was an error renaming this item, " + "\"" + response[0].filename + "\". Please try again", 1, "Ok", '$("#alertHolder").remove()');
								
						}
						
					}
					
					else if(response[0].request == "createFile") {
						
						if(response[0].status == "success") {
					
							alertBox("Success creating file", "The file, \"" + response[0].filename + "\" has been created successfully", 2, "Open", '$("#alertHolder").remove()', "Ok", '$("#alertHolder").remove()');
						
							loadFolders($("#inpFullPath").val(), "command");
				
						}
						
						else if(response[0].status == "error") {
						
							alertBox("Error creating file", "There was an error creating your file, \"" + response[0].filename + "\". Please try again", 1, "Ok", '$("#alertHolder").remove()');
						
						}
						
						else {}
						
					}
						
					else {}

				},
				error: function(response) {
				alert(JSON.stringify(response));
				
				removeLoader();
					
				//	alertBox("Error", "There was an error carrying out this operation. Please try again", 1, "Ok", '$("#alertHolder").remove()');
					
				}
				
			});
	
	}
	
	
	function alertBox(headText, message, buttonNo, btnText1, btnAction1, btnText2, btnAction2) {
		
		if(buttonNo == 1) {
		
			var footButtons = '<button onclick=\'' + btnAction1 + '\' id="button1">' + btnText1 + '</button>';
			
		}
		
		else {
		
			var footButtons = '<button onclick=\'' + btnAction1 + '\' id="button1">' + btnText1 + '</button> <button onclick=\'' + btnAction2 + '\' id="button2">' + btnText2 + '</button>';
			
		}
		
		var alertBox = $('<div id="alertHolder"> <div id="alertBox"> <div id="head">' + headText + '</div> <div id="body">' + message + '</div> <div id="foot">' + footButtons + '</div></div></div>');
		
		$("body").append(alertBox);
	
	}
	
	function displayLoader() {
	
		$("#fileManager #main").append('<div id="fullLoader"> <div id="loader"></div> </div>');
	
	}
	
	function removeLoader() {
	
		$("#fileManager #main #fullLoader").remove();
	
	}