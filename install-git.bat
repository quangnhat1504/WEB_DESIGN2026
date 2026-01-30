@echo off
echo ========================================
echo Auto Install Git for Windows
echo ========================================
echo.

REM Check if Git is already installed
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Git is already installed!
    git --version
    echo.
    echo Do you want to continue anyway? (Y/N)
    set /p continue=
    if /i not "%continue%"=="Y" exit /b 0
)

echo Downloading Git for Windows...
echo Please wait, this may take a few minutes...
echo.

REM Download Git installer using PowerShell
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe' -OutFile '%TEMP%\GitInstaller.exe'}"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to download Git installer
    echo Please download manually from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo.
echo Download complete! Starting installation...
echo.
echo IMPORTANT: During installation:
echo - Click "Next" to accept default settings
echo - Make sure "Git from the command line and also from 3rd-party software" is selected
echo - Click "Install" when ready
echo.
pause

REM Run the installer
start /wait %TEMP%\GitInstaller.exe

REM Clean up
del %TEMP%\GitInstaller.exe

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Please CLOSE this terminal and open a NEW one
echo Then run: push-to-github.bat
echo.
pause
