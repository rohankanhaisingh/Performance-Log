StartScript
@NoOuput

ReadFile -Path "../user/settings.json" -StoreAs "Settings"
Bind -Key "CTRL+S" -Action Output

Function Output

Settings -Save
Echo -Text "Settingsfile has been saved"

End

EndScript