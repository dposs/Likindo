@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\bin\jwt-encode" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\bin\jwt-encode" %*
)