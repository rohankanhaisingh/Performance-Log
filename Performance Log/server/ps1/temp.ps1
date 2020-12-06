# This is also a self-made powershell script. 
# This script should get the information about the temperature but it doesn't work because the access to the root class is denied if you don't run this script with admin permission.

# I am also not using this script in the project because its not working yet.

# Custom function.
function Get-Temperature {
    
    # Get a list of information from the root/wmi class and store it into a variable.
    $temp = Get-WmiObject MSAcpi_ThermalZoneTemperature -Namespace "root/wmi" 

    # Some epic stuff to convert the original temperature value to a Celcius degree value.
    $currentTempCelsius = $temp.CurrentTemperature / 10 - 273.15

    return $currentTempCelsius
}

$Temperature = Get-Temperature

Write-Host $Temperature