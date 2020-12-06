# Thanks to frgnca for using this module he made. 
# Go ahead and check his amazing work https://github.com/frgnca/. 
# Link to module repository https://github.com/frgnca/AudioDeviceCmdlets/.

$location = ($profile | split-path)+ "\Modules\AudioDeviceCmdlets\AudioDeviceCmdlets.dll"

New-Item "$($profile | split-path)\Modules\AudioDeviceCmdlets" -Type directory -Force

# Install the module from github.
(New-Object System.Net.WebClient).DownloadFile('https://github.com/frgnca/AudioDeviceCmdlets/releases/download/v3.0/AudioDeviceCmdlets.dll', $location)

# Import the module
Import-Module AudioDeviceCmdlets

# Write-AudioDevice is a custom function made by frgnca. This function has a argument that will log the audio playback stream many times within a second. 

Write-AudioDevice -PlaybackStream

# Once again, amazing work this.