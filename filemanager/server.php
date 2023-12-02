<?php

	header('Access-Control-Allow-Origin: *'); 

	$request = $_POST["request"];
		
	$path = isset($_POST["path"]) ? $_POST["path"] : "";
		
	$previousPath = isset($_POST["previousPath"]) ? $_POST["previousPath"] : "";
		
	$filename = isset($_POST["filename"]) ? $_POST["filename"] : "";
		
	$path1 = isset($_POST["path1"]) ? $_POST["path1"] : "";
		
	$path2 = isset($_POST["path2"]) ? $_POST["path2"] : "";
		
	$content = isset($_POST["content"]) ? $_POST["content"] : "";
		
	$copyOrCut = isset($_POST["copyOrCut"]) ? $_POST["copyOrCut"] : "";
		
	$overwriteFile = isset($_POST["overwriteFile"]) ? $_POST["overwriteFile"] : "";
		

		if($request == "uploadFiles") {
		
			for($i = 0; $i < count($_FILES); $i++) {
			
				$currentFile = "file" . $i;
			
				move_uploaded_file($_FILES[$currentFile]["tmp_name"], $_POST["path"] . $_FILES[$currentFile]["name"]);
				
			}
			
		}
			
		if($request == "rename") {
			
			if(rename($path1, $path2)) {
			
				$data[] = array("status" => "success", "filename" => $path2, "request" => $request);
				
			}
				
			else {
				
				$data[] = array("status" => "error", "filename" => $path2, "request" => $request);
				
			}
			
			echo json_encode($data);
			
		}
		
		if($request == "getFileContent") {
			
			$filePath = $path1 . $path2;
			
			if($content = file_get_contents($filePath)) {
			
				$data[] = array("status" => "success", "filename" => $path2, "content" => $content, "request" => $request);
				
			}
				
			else {
				
				$data[] = array("status" => "success", "filename" => $path2, "content" => "", "request" => $request);
				
			//	$data[] = array("status" => "error", "filename" => $filename, "request" => $request);
				
			}
			
			echo json_encode($data);
			
		}
		
		if($request == "saveFileContent") {
			
			$filePath = $path1 . $path2;
			
			if($content = file_put_contents($filePath, $content)) {
			
				$data[] = array("status" => "success", "filename" => $path2, "content" => $content, "request" => $request);
				
			}
				
			else {
				
				$data[] = array("status" => "error", "filename" => $filename, "request" => $request);
				
			}
			
			echo json_encode($data);
			
		}
		
		if($request == "makeFolder") {
			
			if(!file_exists($path1)) {
			
				if(mkdir($path1)) {
				
					$data[] = array("status" => "success", "filename" => $filename, "path1" => $path1, "request" => $request);
				
					}
				
					else {
				
						$data[] = array("status" => "error", "filename" => $filename, "path1" => $path1, "request" => $request);
				
					}
					
				}
				
				else {
				
					$data[] = array("status" => "error", "cause" => "folderExists", "filename" => $filename, "path1" => $path1, "request" => $request);
				
				}
			
				echo json_encode($data);
			
		}
		
		if($request == "createFile") {
			
			if(!file_exists($path1)) {
			
				if(file_put_contents($path1 . $path2, "")) {
				
					$data[] = array("status" => "success", "filename" => $filename, "path1" => $path1, "request" => $request);
				
				}
				
				else {
				
					$data[] = array("status" => "error", "filename" => $filename, "path1" => $path1, "request" => $request);
				
				}
					
			}
				
			else {
				
				$data[] = array("status" => "error", "cause" => "folderExists", "filename" => $filename, "path1" => $path1, "request" => $request);
				
			}
			
		//	echo json_encode($data);
			
		}
		
		if($request == "delete") {
			
			if(is_dir($path1)) {
			
				if(rmdir($path1)) {
				
					$data[] = array("status" => "success", "filename" => $filename, "path1" => $path1, "request" => $request, "fileOrFolder" => "directory");
				
				}
				
				else {
				
					$data[] = array("status" => "error", "filename" => $filename, "path1" => $path1, "request" => $request, "fileOrFolder" => "directory");
				
				}
			
			}
			
			else {
			
				if(unlink($path1)) {
				
					$data[] = array("status" => "success", "filename" => $filename, "path1" => $path1, "request" => $request, "fileOrFolder" => "file");
				
				}
				
				else {
				
					$data[] = array("status" => "error", "filename" => $filename, "path1" => $path1, "request" => $request, "fileOrFolder" => "file");
				
				}
			
			}
			
			echo json_encode($data);
				
		}
		
		if($request == "paste") {
			
			$newFilePath = $path2 . $filename;
			
			function requestOverwrite() {
				
				global $filename, $path1, $path2, $request, $copyOrCut;
			
				$data[] = array("status" => "error", "cause" => "fileExists", "filename" => $filename, "path1" => $path1, "path2" => $path2, "request" => $request, "copyOrCut" => $copyOrCut);
				
				echo json_encode($data);
				
			}
				
			!file_exists($newFilePath) || $overwriteFile == "true" or die(requestOverwrite());
		
				if($copyOrCut == "copy") {
					
					$command = copy($path1, $newFilePath);
					
				}
				
				else if($copyOrCut == "cut") {
		
					$command = rename($path1, $newFilePath);
					
				}
				
				else {}
					
				if($command) {
				
					$data[] = array("status" => "success", "filename" => $filename, "path1" => $path1, "path2" => $path2, "request" => $request, "copyOrCut" => $copyOrCut);
						
					echo json_encode($data);
				
				}
				
				else {
				
					$data[] = array("status" => "error", "filename" => $filename, "path1" => $path1, "request" => $request, "copyOrCut" => $copyOrCut);
						
					echo json_encode($data);
				
				}
				
		}
		
		if($request == "File manager") {
		
			$fullPath = $previousPath . $path;
		
			file_exists($fullPath) or die("Empty file $fullPath ");
		
			$data = array();
					
			if(is_dir($fullPath)) {
				
				foreach(scandir($fullPath) as $item) {
					
					if($item !== ".") {
						
						if($fullPath[strlen($fullPath) - 1] !== "/") {
						
							$fullPath = $fullPath . "/";
						
						}
						
						if(is_dir($fullPath . $item)) {
					
							$data[] = array("filename" => $item, "fullPath" => $fullPath, "type" => "folder", "format" => "none");
							
						}
						 
						else {
				
							$format = substr($fullPath . $item, strrpos($fullPath . $item, ".") + 1);
				
							$data[] = array("filename" => $item, "type" => "file", "fullPath" => $fullPath, "format" => $format);
					
						}
			
					}
					
				}
				
			}
				
			else {
				
				$format = substr($path, strrpos($path, ".") + 1);
				
				$data[] = array("fullPath" => $_POST["previousPath"], "type" => "file", "format" => $format);
					
			}
		
		
			echo json_encode($data);
				
		}
		
		exit();
		
 ?>