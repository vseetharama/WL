# PHP + XAMPP + VS Code — Quick setup for this workspace

This repository contains front-end files for web labs. Below are quick, copy-paste friendly steps to configure VS Code to use your local PHP (XAMPP) and optional XDebug debugging.

## 1) Set PHP executable in VS Code

- Open VS Code settings (Ctrl+comma).
- Search for `php.executablePath` and set it to the path of your PHP executable, typically:

  `C:\\xampp\\php\\php.exe`

- I added a workspace setting at `.vscode/settings.json` that sets:

```json
{
  "php.executablePath": "C:\\xampp\\php\\php.exe",
  "php.validate.executablePath": "C:\\xampp\\php\\php.exe"
}
```

If your XAMPP is installed in a different folder, update the path accordingly.

## 2) Configure XDebug (optional — for breakpoints)

1. Open your `php.ini` (usually `C:\\xampp\\php\\php.ini`).
2. Add or update these lines (adjust the `zend_extension` path to your php_xdebug.dll):

```
[XDebug]
zend_extension = "C:\\xampp\\php\\ext\\php_xdebug.dll"
xdebug.mode = debug
xdebug.start_with_request = yes
xdebug.client_port = 9003
```

3. Restart Apache from the XAMPP Control Panel.

## 3) VS Code debug configuration (listen for XDebug)

- I added `.vscode/launch.json` with an example configuration listening on port `9003`.

Update the `pathMappings` value so your workspace folder maps to the server path (the project folder under `htdocs`). Example:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for XDebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "pathMappings": {
        "${workspaceFolder}": "C:\\xampp\\htdocs\\my_project"
      }
    }
  ]
}
```

Replace `my_project` with your actual folder name placed under `C:\\xampp\\htdocs`.

Note: you must have the PHP Debug extension (e.g., "PHP Debug" by Felix Becker) installed for this to work.

## 4) Place the project in XAMPP's htdocs

Move/copy the project folder into `C:\\xampp\\htdocs\\my_project` so PHP files are accessible via HTTP. Example PowerShell snippet:

```powershell
# Copy this workspace folder into htdocs (adjust paths to match your setup)
Copy-Item -Path "${env:USERPROFILE}\\path\\to\\your\\workspace\\my_project" -Destination "C:\\xampp\\htdocs\\my_project" -Recurse
```

Or simply move the folder using Explorer.

## 5) Open files in browser

- Ensure Apache is running in the XAMPP Control Panel.
- Open the file in your browser via the server URL, e.g.:

  `http://localhost/my_project/lab1.html` or `http://localhost/my_project/index.php`

- If you prefer to open a file directly from VS Code's Explorer in your default browser, use the "Open in Default Browser" extension (right-click a `.php` or `.html` file and choose the command). That will open the local file path; for PHP you need the server URL (http://localhost/...) to run PHP.

## 6) Debugging flow

1. Set a breakpoint in VS Code in a PHP file.
2. Start the "Listen for XDebug" debug configuration.
3. Open the page in the browser (the `http://localhost/...` URL) — XDebug will connect to VS Code and hit breakpoints.

## Notes & troubleshooting

- If XDebug doesn't connect, confirm the client port (9003) matches both `php.ini` and `.vscode/launch.json`.
- Make sure any firewall doesn't block the port.
- If VS Code still complains about debug type, ensure the PHP Debug extension is installed and enabled.

---

Files added to this repo:

- `.vscode/settings.json` — sets `php.executablePath` for this workspace.
- `.vscode/launch.json` — example debug configuration for XDebug (update `pathMappings`).
- `README.md` — this instructional file.

If you'd like, I can: update `pathMappings` to match a specific project folder name in your repo, or add a task to start Apache via the XAMPP CLI. Tell me which project folder you will expose under `htdocs` and I'll update the launch config accordingly.
