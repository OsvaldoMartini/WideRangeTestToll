## Some node Commands
``
npm ls typescript                       - List tree some package
npm ls -g                               - List global packages
npm uninstall -g PACKAGE_NAME           - remove Global
npm outdated -g --depth=0               - Which Global package need update
npm update -g                           - Update all global packages,
find . -name "node_modules" -type d -prune | xargs du -chs      - (Linux) List all node_modules found in a Directory
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" echo %d"      - (Windows) List all node_modules found in a Directory
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +      - (Linux) Delete all node_modules found in a Directory
FOR /d /r . %d in (node_modules) DO @IF EXIST "%d" rm -rf "%d"      - (Windows) Delete all node_modules found in a Directory
``
