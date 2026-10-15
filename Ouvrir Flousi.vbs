
Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")

folder = FSO.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = folder

WshShell.Run "cmd.exe /c npm.cmd start", 0, False

WScript.Sleep 2000
WshShell.Run "http://127.0.0.1:3000", 1, False
