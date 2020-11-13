$ArrComputers =  "."

Clear-Host

foreach ($Computer in $ArrComputers) {

	$computerVideo = Get-WmiObject Win32_VideoController

	Write-Host $computerVideo.description -ForegroundColor "white"

}
