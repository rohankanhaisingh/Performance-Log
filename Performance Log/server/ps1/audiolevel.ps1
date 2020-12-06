# Thanks to frgnca for using this module he made. 
# Link to module repository https://github.com/frgnca/AudioDeviceCmdlets/.

# Get the location to the Modules directory for powershell scripts.
$location = ($profile | split-path) + "\Modules\AudioDeviceCmdlets\AudioDeviceCmdlets.dll"

# Check if the module exists or not.
if (Get-Module -ListAvailable -Name $location) {
    Import-Module AudioDeviceCmdlets

    $Volume = Get-AudioDevice -PlaybackVolume

    Write-Host $Volume
}  else {
    Write-Host "Module does not exist." -ForegroundColor Red 
}
