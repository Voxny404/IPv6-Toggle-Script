# IPv6 Toggle Script
This is a Node.js script designed to enable or disable IPv6 on your Windows machine. It provides an interactive prompt for toggling the IPv6 setting, ensuring that you can manage IPv6 without permanently disabling it for the entire system. The script automatically requests administrative privileges when run.

## Features
- Checks the current IPv6 status (enabled or disabled).
- Prompts the user to enable or disable IPv6 interactively.
- Automatically elevates privileges if necessary.
- Displays clear logs of actions taken.

## Requirements
- Operating System: (tested on Windows 10/11 and Linux PopOS).
- Node.js: Ensure you have Node.js installed (v12+ recommended).
- PowerShell: Used internally for managing network settings.
- Ip: Used internally for managing network settings on linux.

## Installation
1. Clone this repository:
````
git clone https://github.com/yourusername/IPv6-Toggle-Script.git
cd ipv6-toggle
````
2. Install Node.js if it’s not already installed on your machine: Download Node.js

## Usage
1. Open a terminal in the script's directory.
2. Run the script:
````
node index.js
````
3. If not run with administrative privileges on windows, the script will restart itself with elevated rights.
4. The script will:
- Check if IPv6 is currently enabled or disabled.
- Prompt you to toggle the IPv6 status.
- Log the outcome of the action.
5. After completing the action, the program will remain open until you manually close it or press Ctrl+C.

## Notes
- Administrative Privileges: The script uses PowerShell / Terminal commands that require admin rights. It will automatically elevate privileges when needed.
- Safe to Use: The script does not make any permanent or destructive changes. You can re-enable IPv6 at any time.

## Contributions
Feel free to fork this repository and submit pull requests to improve functionality or compatibility.