Cyber Tiny Planet GLB Viewer Folder
===================================

Files in this folder:
- cyber_tiny_planet_lively_full.glb
- Launch_GLB_Viewer.cmd
- View_GLB_Model.ps1

How to use:
1. Keep the .glb file and the scripts in the same folder.
2. Double click Launch_GLB_Viewer.cmd.
3. The script will auto-detect the .glb file.
4. It will start a local HTTP server and open the viewer in your browser.
5. Leave the command window open while viewing.
6. Press Enter in the command window when finished.

For future renders:
- Copy Launch_GLB_Viewer.cmd and View_GLB_Model.ps1 into the folder with any .glb file.
- Double click Launch_GLB_Viewer.cmd.
- If there is more than one .glb in the folder, the script will ask which one to open.

Requirements:
- Windows PowerShell
- Python installed and available as py, python, or python3
- Browser internet access so Google model-viewer can load

Troubleshooting:
- Do not open _glb_viewer_index.html directly.
- Always launch with Launch_GLB_Viewer.cmd.
- If the browser says model-viewer could not load, check internet access and refresh.
- If the command window says Python was not found, install Python or use Windows 3D Viewer.
- The local viewer URL is copied to your clipboard each time the launcher runs.
