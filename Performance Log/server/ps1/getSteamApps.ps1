# Get the directories in the steamapps directory. This will return a object.
$steamApps = Get-ChildItem -Directory "C:\Program Files (x86)\Steam\steamapps\common";

# Creats a empty object.
$steamArray = @{};

# Loop trough the steamApps object
foreach($app in $steamApps) {

    # Get the directory name. This will return a array of files and directories.
    $appDir = Get-ChildItem -Path "C:\Program Files (x86)\Steam\steamapps\common\$($app)";

    # Loop trough the appDir array.
    foreach($file in $appDir) {

        # Check if name of the file is equal to "steam_appid.txt".
        if($file.Name -eq "steam_appid.txt") {

            # Read the file and return only a string or a array.
            $steamAppId = Get-Content "C:\Program Files (x86)\Steam\steamapps\common\$($app)\$($file.Name)" | Out-String -Stream;
            
            # Get the last write time value of the file.
            $itemProperty = Get-ItemPropertyValue  -Path "C:\Program Files (x86)\Steam\steamapps\common\$($app)\$($file.Name)" -Name LastWriteTime

            # Check if the type of steamAppId is a string or a array
            if($steamAppId.GetType() -eq [string]) {

                # Add the item to the array
                $steamArray[$app.ToString()] = @{
                    id = $steamAppId;
                    lastEdited = $itemProperty;
                };
            } else {

                # Get the first element of the array and add it to the array.
                $steamArray[$app.ToString()] = @{
                    id = $steamAppId[0];
                    lastEdited = $itemProperty;
                };
            }
        }
    }
}

# Convert the psobject to a json-object.
$compressedArray = $steamArray | ConvertTo-Json -Compress;

# Write the compressed array into the console.
Write-Host $compressedArray