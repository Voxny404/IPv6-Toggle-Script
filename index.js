const { exec, spawn } = require('child_process');
const readline = require('readline');

console.ok = (message)  => console.log('\x1b[32m%s\x1b[0m', message);

// Function to check IPv6 status
function checkIPv6Status(callback) {

    const checkCmd = 'route print -6 | findstr "::/0"'; // Check for the IPv6 default route
    exec(checkCmd, (err, stdout) => {
        if (err || !stdout) {
            console.log('IPv6 is currently \x1b[31mdisabled.\x1b[0m');
            callback(false); // IPv6 disabled
        } else {
            console.log('IPv6 is currently \x1b[32menabled.\x1b[0m');
            callback(true); // IPv6 enabled
        }
    });
  
}

// Function to disable IPv6
async function disableIPv6() {
    const disableIPv6Cmd = 'powershell Set-NetAdapterBinding -Name "*" -ComponentID ms_tcpip6 -Enabled $false';
    
    exec(disableIPv6Cmd, (err, stdout, stderr) => 
        err ? console.error('Failed to disable IPv6:', stderr) 
            : console.ok('IPv6 disabled successfully:', stdout)
    );
    await waitBeforeExit()
  }

// Function to enable IPv6
async function enableIPv6() {
    const enableIPv6Cmd = 'powershell Set-NetAdapterBinding -Name "*" -ComponentID ms_tcpip6 -Enabled $true';
    
    exec(enableIPv6Cmd, (err, stdout, stderr) =>  
        err ? console.error('Failed to enable IPv6:', stderr) 
            : console.ok('IPv6 enabled successfully:', stdout)
    );

    await waitBeforeExit()
}

function promptAction(isIPv6Enabled) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  
    const message = isIPv6Enabled
      ? 'Do you want to disable IPv6? (yes/no): '
      : 'Do you want to enable IPv6? (yes/no): ';
    
    rl.question(message, (answer) => {
      
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === "y") {
            isIPv6Enabled ? disableIPv6() : enableIPv6();
        } else console.log('No changes made.');
      
      rl.close();
    });
}

if (!process.env.ELEVATED) {
    console.log('Restarting with administrative privileges...');
  
    // Reconstruct the command-line arguments for the script
    const args = process.argv.slice(1).map((arg) => `"${arg}"`).join(' ');
    
    // PowerShell command to restart the script with admin privileges
    const elevateCommand = `Start-Process -FilePath node -ArgumentList '${args}' -Verb RunAs`;

    // Spawn PowerShell to execute the elevation command
    const child = spawn('powershell.exe', ['-Command', elevateCommand], {
        stdio: 'inherit',
        env: { ...process.env, ELEVATED: 'true' }, // Add the ELEVATED flag
    });

    child.on('close', (code) => {
        if (code !== 0) console.error('Failed to elevate privileges.');
        process.exit(0)
    });

} else {
    console.log('Running with elevated privileges...');
    checkIPv6Status((isIPv6Enabled) => promptAction(isIPv6Enabled));
}

function waitBeforeExit() {
    console.log('Closing ...');
    return new Promise(res => setTimeout(() => res(), 3000))
}
