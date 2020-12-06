# This is a self-made script that will return a list from the WMIObject VideoController object.
# I am currently not using this script because the information I get from this script, is not what I am looking for.

# I found a way to get the exact information about the graphics card using the 'wmic' command in powershell/cmd.

Clear-Host # Clear the console window. 

# Create a custom function.
function Get-VideoControllerInformation {

	# Return the list of information about the videocontroller.
	return Get-WmiObject Win32_VideoController
}

# Create a variable and assign the return value from the function to it.
$VideoContoller = Get-VideoControllerInformation

# Write the value from VideoController into the console window with a lime text color.
Write-Host $VideoContoller -ForegroundColor Green