<!DOCTYPE html PUBLIC -//W3C//DTD XHTML 1.0 Strict//EN http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd>

	<html lang="en">
	
		<head>
	
			<title>File manager</title>
			
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			
			<meta http-equiv=”Pragma” content=”no-cache”>

			<meta http-equiv=”Expires” content=”-1″>
			
			<meta http-equiv="Cache-Control" content="no-store">
			
			<meta name="viewport" content="user-scalable=no"> 
			
			<link rel="stylesheet" href="styles/index.css" type="text/css"/>
	 
			<script src="scripts/JQuery.js"></script>
		
			<script src="scripts/index.js"></script>
		
			<script src="scripts/main.js"></script>
		
			<script src="scripts/actions.js"></script>
		
		</head>
 
		<body>
			
			<div id="sideNav"></div>
			
			<div id="main">
			
				<div id="header">
				
					<label id="topPath"></label>
					
					<br>
					
					<span id="iconHolder">
					
						<svg class="icon" id="icnMkdir" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.5 13c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.82v-20h7c1.695 1.942 2.371 3 4 3h13v7.82c-1.169-1.124-2.754-1.82-4.5-1.82-3.584 0-6.5 2.916-6.5 6.5 0 1.747.695 3.331 1.82 4.5z"/></svg>
						
						<svg class="icon" id="icnNewFile" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v2.501c-.771-.322-1.614-.501-2.5-.501-3.584 0-6.5 2.916-6.5 6.5 0 1.747.696 3.331 1.82 4.5zm-.252-23.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
					
						<svg class="icon" id="icnUpload" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10h-5l9-10 9 10h-5v10h-8v-10zm11 9v3h-14v-3h-2v5h18v-5h-2z"/></svg>
					
						<svg class="icon" id="icnPaste" style="display: none; color: blue; transform: rotate(90deg)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
					
						<svg class="icon" id="icnSave" style="display: none; color: blue;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></svg>
						
						<svg class="icon" id="icnBack" style="display: none; color: blue;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.222 18.917c5.666-5.905-.629-10.828-5.011-7.706l1.789 1.789h-6v-6l1.832 1.832c7.846-6.07 16.212 4.479 7.39 10.085z"/></svg>
							
						<span id="copiedIcons" class="hidden">
					
							<svg class="icon" id="icnOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
							
							<svg class="icon" id="icnCopy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
					
							<svg class="icon" id="icnCut" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.026 14.116c-3.475 1.673-7.504 3.619-8.484 4.09-1.848.889-3.542-1.445-3.542-1.445l8.761-4.226 3.265 1.581zm7.93 6.884c-.686 0-1.393-.154-2.064-.479-1.943-.941-2.953-3.001-2.498-4.854.26-1.057-.296-1.201-1.145-1.612l-14.189-6.866s1.7-2.329 3.546-1.436c1.134.549 5.689 2.747 9.614 4.651l.985-.474c.85-.409 1.406-.552 1.149-1.609-.451-1.855.564-3.913 2.51-4.848.669-.321 1.373-.473 2.054-.473 2.311 0 4.045 1.696 4.045 3.801 0 1.582-.986 3.156-2.613 3.973-1.625.816-2.765.18-4.38.965l-.504.245.552.27c1.613.789 2.754.156 4.377.976 1.624.819 2.605 2.392 2.605 3.97 0 2.108-1.739 3.8-4.044 3.8zm-2.555-12.815c.489 1.022 1.876 1.378 3.092.793 1.217-.584 1.809-1.893 1.321-2.916-.489-1.022-1.876-1.379-3.093-.794s-1.808 1.894-1.32 2.917zm-3.643 3.625c0-.414-.335-.75-.75-.75-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75zm6.777 3.213c-1.215-.588-2.604-.236-3.095.786-.491 1.022.098 2.332 1.313 2.919 1.215.588 2.603.235 3.094-.787.492-1.021-.097-2.33-1.312-2.918z"/></svg>
							
							<svg class="icon" id="icnRename" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.995 6c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v12c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-18.5.5h17v11h-17zm4 2.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75v6.5c0 .414.336.75.75.75s.75-.336.75-.75z" fill-rule="nonzero"/></svg>
					
							<svg class="icon" id="icnDelete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"></svg>
							
							<svg class="icon" id="icnDownload" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z"/></svg>
						
						</span>
		
					<!--	<svg class="icon"></svg> -->
					
					</span>
				
				</div>
			
				<div id="fileManager">
	 
	 				<div id="head">
	 				
	 					<input id="inpFullPath" class="hidden" value="../">
	 					
	 					<input id="selectedItemUrl" class="hidden">
	 					
	 					<input id="copiedItemUrl" class="hidden">
	 					
	 					<input id="copyOrCut" class="hidden">
	 					
	 					<input id="overwriteFile" class="hidden">
	 					
	 					<form id="frmOpenPath">
	 					
	 						<input id="inpOpenPath">
	 					
	 						<button type="submit" id="btnOpenPath">Go</button>
	 						
	 					</form>
	 					
	 				</div>
	 
	 				<div id="main"></div>
	 
				 </div>
			
			</div>
			 
		</body>

	</html>
	
 <?php
//rename("../undefined", "../scrabblit");
	if(isset($_POST['submit'])) {
		
		$countfiles = count($_FILES['file']['name']);
		
		$location = "../" . $_POST["uploadDir"] . "/";
		
		echo "<hr>Number of files: $countfiles<hr>Location: $location<hr>";
		
		for($i=0; $i<$countfiles; $i++) {
			
			$filename = $_FILES['file']['name'][$i];
			
			if(move_uploaded_file($_FILES['file']['tmp_name'][$i], $location . $filename)) {
			
				echo "uploaded $filename<hr>";
			
			}
			
			else {
			
				echo "Error uploading $filename<hr>";
			
			}
		}
		
	}
	
?>