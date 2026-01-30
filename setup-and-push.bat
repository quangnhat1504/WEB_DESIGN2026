@echo off
echo ========================================
echo FoodAI - Complete Setup and Push
echo ========================================
echo.

REM Step 1: Check if Git is installed
echo [Step 1/3] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Git is not installed!
    echo.
    echo Would you like to install Git now? (Y/N)
    set /p install=
    if /i "%install%"=="Y" (
        call install-git.bat
        echo.
        echo ========================================
        echo Git has been installed!
        echo Please CLOSE this window and run this script again
        echo ========================================
        pause
        exit /b 0
    ) else (
        echo.
        echo Cannot proceed without Git. Exiting...
        pause
        exit /b 1
    )
)

echo Git is installed: 
git --version
echo.

REM Step 2: Configure Git (if needed)
echo [Step 2/3] Configuring Git...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Please enter your name for Git commits:
    set /p name=Name: 
    git config --global user.name "%name%"
    
    echo.
    echo Please enter your email for Git commits:
    set /p email=Email: 
    git config --global user.email "%email%"
    echo.
    echo Git configured successfully!
)
echo.

REM Step 3: Push to GitHub
echo [Step 3/3] Pushing to GitHub...
echo.

REM Initialize git if not already done
if not exist .git (
    echo Initializing Git repository...
    git init
    git remote add origin https://github.com/quangnhat1504/WEB_DESIGN2026.git
    echo.
)

REM Create and switch to ttung05 branch
echo Creating/switching to branch ttung05...
git checkout -b ttung05 2>nul
if %errorlevel% neq 0 (
    git checkout ttung05
)
echo.

REM Add all files
echo Adding all files...
git add .
echo.

REM Show what will be committed
echo Files to be committed:
git status --short
echo.

echo Press any key to continue with commit and push...
pause >nul

REM Commit
echo.
echo Committing changes...
git commit -m "Add FoodAI prototype - Complete web application with 8 pages and interactive features"
echo.

REM Push to remote
echo Pushing to GitHub...
echo.
echo NOTE: You may be asked to authenticate with GitHub
echo If using a password doesn't work, you need a Personal Access Token
echo Generate one at: https://github.com/settings/tokens
echo.

git push -u origin ttung05

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Code pushed to GitHub
    echo ========================================
    echo.
    echo Branch: ttung05
    echo Repository: https://github.com/quangnhat1504/WEB_DESIGN2026
    echo View your code: https://github.com/quangnhat1504/WEB_DESIGN2026/tree/ttung05
    echo.
    echo Next steps:
    echo 1. Visit the URL above to verify your files
    echo 2. Create a Pull Request if you want to merge to main branch
    echo 3. Share the link with your team
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to push to GitHub
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed
    echo    - Use Personal Access Token instead of password
    echo    - Generate at: https://github.com/settings/tokens
    echo.
    echo 2. No write permission
    echo    - Ask repo owner to add you as collaborator
    echo.
    echo 3. Branch already exists with different commits
    echo    - Try: git pull origin ttung05
    echo    - Then run this script again
    echo.
)

pause
