$ArrComputers =  "."

Clear-Host

function Get-VideoControllerInformation {

	$info = Get-WmiObject Win32_VideoController
	
	return $info
}
