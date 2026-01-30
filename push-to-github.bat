@echo off
echo ========================================
echo FoodAI - Push to GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install with default settings
    echo 3. Restart terminal and run this script again
    echo.
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
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

REM Commit
echo Committing changes...
git commit -m "Add FoodAI prototype - Complete web application with 8 pages and interactive features"
echo.

REM Push to remote
echo Pushing to GitHub...
echo You may be asked to enter your GitHub credentials...
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
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to push to GitHub
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed - Use personal access token
    echo 2. No write permission - Ask repo owner to add you as collaborator
    echo 3. Branch conflicts - Pull latest changes first
    echo.
    echo See GIT_SETUP.md for detailed instructions
    echo.
)

pause
